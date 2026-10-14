import { ENTITY_TYPES, FIELD_DEFINITIONS } from './workbench-model.js';

export function indexProject(project) {
  const index = new Map();
  for (const [type, definition] of Object.entries(ENTITY_TYPES)) {
    for (const record of project[type] || []) index.set(record.id, { type, record, title: record[definition.titleField] || record.id });
  }
  return index;
}

function unique(values) { return [...new Set(values.filter(Boolean))]; }
function recordsFor(index, ids) { return unique(ids).map(id => index.get(id)).filter(Boolean); }

export function lineageForRequirement(project, requirement) {
  const index = indexProject(project);
  const needs = recordsFor(index, requirement.parentNeedIds || []);
  const decisionIds = needs.flatMap(item => item.record.decisionIds || []).concat(requirement.decisionIds || []);
  const decisions = recordsFor(index, decisionIds);
  const taskIds = needs.flatMap(item => item.record.taskIds || []).concat(decisions.flatMap(item => item.record.taskIds || []), requirement.taskIds || []);
  const tasks = recordsFor(index, taskIds);
  const scenarioIds = decisions.flatMap(item => item.record.scenarioIds || []).concat(tasks.flatMap(item => item.record.scenarioIds || []), requirement.scenarioIds || []);
  const scenarios = recordsFor(index, scenarioIds);
  const tests = (project.tests || []).filter(test => (test.requirementIds || []).includes(requirement.id)).map(test => index.get(test.id));
  const evidenceIds = [requirement, ...needs.map(item => item.record), ...decisions.map(item => item.record), ...tasks.map(item => item.record), ...tests.map(item => item.record)].flatMap(record => record.evidenceIds || []);
  return { requirement: index.get(requirement.id), needs, decisions, tasks, scenarios, tests, evidence: recordsFor(index, evidenceIds) };
}

export function buildTraceRows(project) {
  return (project.requirements || []).map(requirement => lineageForRequirement(project, requirement));
}

export function validateProject(project) {
  const issues = [];
  const index = indexProject(project);
  const allIds = new Map();
  const add = (severity, type, id, message) => issues.push({ severity, type, id, message });
  for (const [type, definition] of Object.entries(ENTITY_TYPES)) {
    for (const record of project[type] || []) {
      if (allIds.has(record.id)) add('error', type, record.id, `Duplicate ID also used by ${allIds.get(record.id)}.`);
      else allIds.set(record.id, type);
      if (!record.id?.startsWith(`${definition.prefix}-`)) add('warning', type, record.id, `ID does not use the ${definition.prefix}- prefix.`);
      for (const [field, label, kind, required] of FIELD_DEFINITIONS[type]) {
        const value = record[field];
        if (required && (!value || (Array.isArray(value) && !value.length))) add('error', type, record.id, `${label} is required.`);
        if (kind.startsWith('relation')) {
          for (const id of Array.isArray(value) ? value : value ? [value] : []) if (!index.has(id)) add('error', type, record.id, `${label} references missing record ${id}.`);
        }
      }
      for (const id of record.evidenceIds || []) if (!index.has(id) || index.get(id).type !== 'evidence') add('error', type, record.id, `Evidence link ${id} is missing or is not an evidence record.`);
      if (record.status === 'accepted' && record.basis === 'unknown') add('warning', type, record.id, 'Accepted record still has an unknown basis.');
    }
  }
  const taskMap = new Map((project.tasks || []).map(task => [task.id, task]));
  for (const task of project.tasks || []) {
    const path = new Set([task.id]); let parent = task.parentId;
    while (parent) {
      if (path.has(parent)) { add('error', 'tasks', task.id, 'Task parent links contain a cycle.'); break; }
      path.add(parent); parent = taskMap.get(parent)?.parentId;
    }
  }
  for (const requirement of project.requirements || []) {
    if (!(requirement.parentNeedIds || []).length && !(requirement.taskIds || []).length && !(requirement.decisionIds || []).length) add('warning', 'requirements', requirement.id, 'Requirement has no upstream need, task, or decision link.');
    if (!(project.tests || []).some(test => (test.requirementIds || []).includes(requirement.id))) add('warning', 'requirements', requirement.id, 'Requirement has no linked verification or validation test.');
  }
  for (const test of project.tests || []) if (test.resultStatus !== 'not-run' && !(test.evidenceIds || []).length) add('warning', 'tests', test.id, 'Recorded test result has no linked evidence.');
  return issues.sort((a, b) => (a.severity === 'error' ? -1 : 1) - (b.severity === 'error' ? -1 : 1) || a.id.localeCompare(b.id));
}

export function coverageSummary(project) {
  const measures = [
    ['Tasks assigned to scenarios', project.tasks, item => item.scenarioIds?.length],
    ['Decisions assigned to tasks', project.decisions, item => item.taskIds?.length],
    ['Needs assigned to decisions or tasks', [...project.informationNeeds, ...project.controlNeeds], item => item.decisionIds?.length || item.taskIds?.length],
    ['Requirements with upstream trace', project.requirements, item => item.parentNeedIds?.length || item.taskIds?.length || item.decisionIds?.length],
    ['Requirements with tests', project.requirements, item => project.tests.some(test => test.requirementIds?.includes(item.id))],
    ['Records with evidence', Object.keys(ENTITY_TYPES).filter(type => type !== 'evidence').flatMap(type => project[type]), item => item.evidenceIds?.length]
  ].map(([label, items, predicate]) => {
    const complete = items.filter(predicate).length;
    return { label, complete, total: items.length, percent: items.length ? Math.round(complete / items.length * 100) : 0 };
  });
  const applicable = measures.filter(measure => measure.total);
  const overall = applicable.length ? Math.round(applicable.reduce((sum, measure) => sum + measure.percent, 0) / applicable.length) : 0;
  return { overall, measures };
}

export function relationshipSummary(project, id) {
  const index = indexProject(project);
  if (!index.has(id)) return { incoming: [], outgoing: [] };
  const incoming = []; const outgoing = [];
  for (const [type, recordDefinition] of Object.entries(ENTITY_TYPES)) {
    for (const record of project[type] || []) {
      const relationFields = FIELD_DEFINITIONS[type].filter(field => field[2].startsWith('relation')).map(field => [field[0], field[1]]);
      relationFields.push(['evidenceIds', 'Evidence']);
      for (const [field, label] of relationFields) {
        const ids = Array.isArray(record[field]) ? record[field] : record[field] ? [record[field]] : [];
        if (record.id === id) for (const targetId of ids) { const target = index.get(targetId); if (target) outgoing.push({ ...target, label }); }
        if (ids.includes(id)) incoming.push({ type, record, title: record[recordDefinition.titleField] || record.id, label });
      }
    }
  }
  return { incoming, outgoing };
}
