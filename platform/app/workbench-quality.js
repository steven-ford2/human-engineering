// Advisory review prompts. These are explicit heuristics, not human factors or flight certification claims.
export function auditQuality(project) {
  const findings = [];
  const flag = (type, record, code, severity, message) =>
    findings.push({ type, id: record.id, code, severity, message });
  const present = value => typeof value === 'string' ? Boolean(value.trim()) :
    Array.isArray(value) ? value.length > 0 : Boolean(value);
  for (const task of project.tasks || []) if (!present(task.scenarioIds))
    flag('tasks', task, 'TASK_SCENARIO', 'warning', 'Task has no explicit scenario context.');
  for (const task of project.tasks || []) if (!present(task.completionState))
    flag('tasks', task, 'TASK_END_STATE', 'warning', 'Task has no observable completion state.');
  for (const d of project.decisions || []) if (!present(d.alternatives))
    flag('decisions', d, 'DECISION_ALTERNATIVES', 'warning', 'Decision alternatives have not been elicited.');
  for (const d of project.decisions || []) if (!present(d.availableTime))
    flag('decisions', d, 'DECISION_TIMING', 'advisory', 'Decision timing is uncharacterized; record if a temporal constraint exists.');
  for (const item of project.informationNeeds || []) if (!present(item.timeliness))
    flag('informationNeeds', item, 'INFO_TIMELINESS', 'advisory', 'Information update/timeliness requirement has not been considered.');
  for (const item of project.controlNeeds || []) if (!present(item.feedback))
    flag('controlNeeds', item, 'CONTROL_FEEDBACK', 'warning', 'Control-state feedback is not described.');
  for (const item of project.controlNeeds || []) if (!present(item.inhibitedConditions))
    flag('controlNeeds', item, 'CONTROL_INHIBITS', 'advisory', 'Invalid/inhibited control conditions are undocumented.');
  for (const req of project.requirements || []) if (req.type === 'performance' && !present(req.threshold))
    flag('requirements', req, 'REQUIREMENT_THRESHOLD', 'warning', 'Performance requirement has no measurable threshold.');
  for (const req of project.requirements || []) if (!present(req.rationale) && !present(req.evidenceIds))
    flag('requirements', req, 'REQUIREMENT_BASIS', 'warning', 'Requirement has neither rationale nor supporting evidence.');
  for (const test of project.tests || []) if (!present(test.successCriterion) || !present(test.metric))
    flag('tests', test, 'TEST_CRITERION', 'warning', 'Test is missing a primary metric or an explicit success criterion.');
  for (const type of ['tasks','decisions','informationNeeds','controlNeeds','requirements','tests'])
    for (const record of project[type] || []) if (record.status === 'accepted' && !(record.evidenceIds || []).some(id => (project.evidence || []).some(e => e.id === id && e.accessStatus === 'appraised')))
      flag(type, record, 'ACCEPTED_EVIDENCE_REVIEW', 'advisory', 'Accepted record has no linked evidence item recorded as critically appraised.');
  for (const [type, field] of [['scenarios','name'],['tasks','name'],['decisions','question'],['requirements','claim'],['tests','name']]) {
    const seen = new Map();
    for (const record of project[type] || []) {
      const text = String(record[field] || '').trim().replace(/\s+/g, ' ').toLowerCase();
      if (!text) continue;
      if (seen.has(text)) flag(type, record, 'POSSIBLE_DUPLICATE', 'advisory', `Similar label/statement to ${seen.get(text)}; confirm distinct identity.`);
      else seen.set(text, record.id);
    }
  }
  // NEXT_AUDIT_CHECK
  return findings;
}

export function summarizeQuality(project) {
  const findings = auditQuality(project);
  return {
    total: findings.length,
    warnings: findings.filter(item => item.severity === 'warning').length,
    advisories: findings.filter(item => item.severity === 'advisory').length,
    affected: new Set(findings.map(item => item.id)).size,
    findings
  };
}

function csvCell(value) {
  const raw = String(value ?? '');
  const neutral = /^[\t\r\n\s]*[=+@-]/.test(raw) ? "'" + raw : raw;
  return '"' + neutral.replace(/"/g, '""') + '"';
}

export function qualityReportCsv(project) {
  const rows = [['severity','type','record_id','rule','review_prompt']];
  for (const item of auditQuality(project))
    rows.push([item.severity,item.type,item.id,item.code,item.message]);
  return rows.map(row => row.map(csvCell).join(',')).join('\r\n') + '\r\n';
}

export function qualityReportMarkdown(project) {
  const title = String(project.project?.title || 'Untitled project').replace(/[\r\n]+/g, ' ');
  const findings = auditQuality(project);
  const safe = value => String(value).replace(/[|\r\n]/g, ' ').trim();
  const lines = [`# Quality review — ${title}`, '', 'Automated advisory prompts only; human review is required.', '',
    '| Severity | Record | Review prompt |', '| --- | --- | --- |'];
  for (const item of findings)
    lines.push(`| ${safe(item.severity)} | ${safe(item.id)} | ${safe(item.message)} |`);
  if (!findings.length) lines.push('| — | — | No modeled gaps detected by these advisory rules |');
  return lines.join('\n') + '\n';
}
