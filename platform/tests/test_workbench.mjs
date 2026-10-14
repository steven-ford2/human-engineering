import test from 'node:test';
import assert from 'node:assert/strict';
import {
  LEGACY_WORKBENCH_STORAGE_KEY, WORKBENCH_SCHEMA_VERSION, WORKBENCH_STORAGE_KEY, createEntity, createProject, normalizeProject
} from '../app/workbench-model.js';
import { buildTraceRows, coverageSummary, relationshipSummary, validateProject } from '../app/workbench-analysis.js';
import { parseCsv, recordsFromCsv, recordsToCsv } from '../app/workbench-csv.js';
import { WorkbenchStore } from '../app/workbench-store.js';

const when = new Date('2026-10-11T12:00:00.000Z');

test('project schema creates every engineering collection', () => {
  const project = createProject(when);
  assert.equal(project.schemaVersion, WORKBENCH_SCHEMA_VERSION);
  for (const name of ['scenarios', 'tasks', 'decisions', 'informationNeeds', 'controlNeeds', 'requirements', 'tests', 'evidence']) assert.deepEqual(project[name], []);
  assert.equal(project.project.createdAt, when.toISOString());
});

test('entities receive stable prefixed IDs and provenance defaults', () => {
  const project = createProject(when);
  project.tasks.push({ id: 'T-001' });
  const task = createEntity('tasks', project, when);
  assert.equal(task.id, 'T-002');
  assert.equal(task.basis, 'unknown');
  assert.deepEqual(task.scenarioIds, []);
});

test('normalization rejects unrelated JSON and upgrades valid projects', () => {
  assert.throws(() => normalizeProject({ hello: 'world' }), /does not contain/);
  const project = normalizeProject({ schemaVersion: 1, project: { title: 'Imported' }, tasks: [{ id: 'T-001' }] });
  assert.equal(project.schemaVersion, WORKBENCH_SCHEMA_VERSION);
  assert.equal(project.project.title, 'Imported');
  assert.equal(project.tasks.length, 1);
  assert.deepEqual(project.tests, []);
});

test('normalization makes imported scalar relationship fields safe', () => {
  const project = normalizeProject({ project: { title: 'Imported' }, tasks: [{ id: 'T-001', scenarioIds: 'SC-001;SC-002', evidenceIds: 'EV-001' }] });
  assert.deepEqual(project.tasks[0].scenarioIds, ['SC-001', 'SC-002']);
  assert.deepEqual(project.tasks[0].evidenceIds, ['EV-001']);
});

test('CSV parser supports commas, quotes, and embedded newlines', () => {
  const rows = parseCsv('id,name,notes\r\nSC-001,"Approach, nominal","Line 1\nLine 2"\r\n');
  assert.deepEqual(rows, [['id', 'name', 'notes'], ['SC-001', 'Approach, nominal', 'Line 1\nLine 2']]);
});

test('CSV register round trip preserves relations and quoted prose', () => {
  const project = createProject(when);
  const task = createEntity('tasks', project, when);
  Object.assign(task, { name: 'Monitor, decide', scenarioIds: ['SC-001', 'SC-002'], goal: 'Maintain "known" state' });
  const csv = recordsToCsv('tasks', [task]);
  const imported = recordsFromCsv('tasks', csv, createProject(when));
  assert.equal(imported[0].name, task.name);
  assert.deepEqual(imported[0].scenarioIds, task.scenarioIds);
  assert.equal(imported[0].goal, task.goal);
});

function tracedProject() {
  const project = createProject(when);
  project.scenarios.push({ id: 'SC-001', name: 'Bounded scenario', objective: 'Analyze work', evidenceIds: [] });
  project.tasks.push({ id: 'T-001', name: 'Assess state', goal: 'Establish state', scenarioIds: ['SC-001'], parentId: '', evidenceIds: [] });
  project.decisions.push({ id: 'D-001', question: 'What action is appropriate?', taskIds: ['T-001'], scenarioIds: [], evidenceIds: [] });
  project.informationNeeds.push({ id: 'IN-001', label: 'Current state', operationalQuestion: 'What is the state?', decisionIds: ['D-001'], taskIds: [], evidenceIds: [] });
  project.requirements.push({ id: 'R-001', claim: 'The design shall present current state.', parentNeedIds: ['IN-001'], taskIds: [], decisionIds: [], scenarioIds: [], evidenceIds: [] });
  project.tests.push({ id: 'TEST-001', name: 'State presentation test', method: 'Inspect presentation.', requirementIds: ['R-001'], evidenceIds: [], resultStatus: 'not-run' });
  return project;
}

test('trace engine resolves complete upstream and downstream lineage', () => {
  const row = buildTraceRows(tracedProject())[0];
  assert.deepEqual(row.scenarios.map(item => item.record.id), ['SC-001']);
  assert.deepEqual(row.tasks.map(item => item.record.id), ['T-001']);
  assert.deepEqual(row.decisions.map(item => item.record.id), ['D-001']);
  assert.deepEqual(row.needs.map(item => item.record.id), ['IN-001']);
  assert.deepEqual(row.tests.map(item => item.record.id), ['TEST-001']);
});

test('relationship inspector returns incoming and outgoing links', () => {
  const links = relationshipSummary(tracedProject(), 'D-001');
  assert(links.incoming.some(item => item.record.id === 'IN-001'));
  assert(links.outgoing.some(item => item.record.id === 'T-001'));
});

test('validation identifies missing fields, broken links, and parent cycles', () => {
  const project = createProject(when);
  project.tasks.push({ id: 'T-001', name: '', goal: '', parentId: 'T-001', scenarioIds: ['SC-404'], status: 'accepted', basis: 'unknown', evidenceIds: [] });
  const messages = validateProject(project).map(issue => issue.message);
  assert(messages.some(message => message.includes('Task name is required')));
  assert(messages.some(message => message.includes('SC-404')));
  assert(messages.some(message => message.includes('cycle')));
  assert(messages.some(message => message.includes('unknown basis')));
});

test('coverage reports explicit trace completeness without overstating validity', () => {
  const coverage = coverageSummary(tracedProject());
  assert.equal(coverage.measures.find(item => item.label === 'Requirements with tests').percent, 100);
  assert.equal(coverage.measures.find(item => item.label === 'Records with evidence').percent, 0);
});

test('store persists transactions and supports undo and redo', () => {
  const memory = new Map();
  const storage = { getItem: key => memory.get(key) ?? null, setItem: (key, value) => memory.set(key, value) };
  const store = new WorkbenchStore(storage);
  store.transact('Rename project', project => { project.project.title = 'Changed'; });
  assert.equal(store.project.project.title, 'Changed');
  assert(store.undo());
  assert.equal(store.project.project.title, 'Untitled task-analysis project');
  assert(store.redo());
  assert.equal(store.project.project.title, 'Changed');
});

test('store recovers the legacy FighterJets II browser project once', () => {
  const memory = new Map();
  const legacy = createProject(when);
  legacy.project.title = 'Recovered analysis';
  memory.set(LEGACY_WORKBENCH_STORAGE_KEY, JSON.stringify(legacy));
  const storage = { getItem: key => memory.get(key) ?? null, setItem: (key, value) => memory.set(key, value) };
  const store = new WorkbenchStore(storage);
  assert.equal(store.project.project.title, 'Recovered analysis');
  assert.ok(memory.has(WORKBENCH_STORAGE_KEY));
});
