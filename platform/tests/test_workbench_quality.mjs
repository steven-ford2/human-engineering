import test from 'node:test';
import assert from 'node:assert/strict';
import { createEntity, createProject } from '../app/workbench-model.js';
import { auditQuality, summarizeQuality, qualityReportCsv, qualityReportMarkdown } from '../app/workbench-quality.js';

const project = () => createProject(new Date('2026-10-11T12:00:00Z'));
function add(p, type, values={}) {
  const r = Object.assign(createEntity(type, p), values);
  p[type].push(r); return r;
}
test('flags task context and observable end-state gaps independently', () => {
  const p=project();const task=add(p,'tasks',{name:'Maintain a valid reference'});
  const codes=auditQuality(p).filter(f=>f.id===task.id).map(f=>f.code);
  assert.deepEqual(codes.sort(),['TASK_END_STATE','TASK_SCENARIO']);
  task.scenarioIds=['SC-001'];task.completionState='Stable mode confirmed';
  assert.equal(auditQuality(p).filter(f=>f.id===task.id).length,0);
});
test('finds decisions, information freshness and command-feedback gaps', () => {
  const p=project();
  add(p,'decisions',{question:'Is this mode active?'});
  add(p,'informationNeeds',{label:'Mode state'});
  add(p,'controlNeeds',{label:'Change mode'});
  const codes=new Set(auditQuality(p).map(f=>f.code));
  for(const code of ['DECISION_ALTERNATIVES','DECISION_TIMING','INFO_TIMELINESS','CONTROL_FEEDBACK','CONTROL_INHIBITS'])assert.ok(codes.has(code),code);
});
test('performance requirement threshold and basis are reviewed', () => {
  const p=project();const r=add(p,'requirements',{claim:'Respond within bounded latency',type:'performance'});
  const codes=auditQuality(p).filter(f=>f.id===r.id).map(f=>f.code);
  assert.ok(codes.includes('REQUIREMENT_THRESHOLD'));
  assert.ok(codes.includes('REQUIREMENT_BASIS'));
  r.threshold='<= 300 ms'; r.rationale='Recorded test observation';
  assert.equal(auditQuality(p).filter(f=>f.id===r.id).length,0);
});
test('test criteria and accepted evidence provenance are checked', () => {
  const p=project();const r=add(p,'tests',{name:'Mode-transition bench test',status:'accepted'});
  let found=auditQuality(p).filter(f=>f.id===r.id);
  assert.ok(found.some(f=>f.code==='TEST_CRITERION'));
  assert.ok(found.some(f=>f.code==='ACCEPTED_EVIDENCE_REVIEW'));
  const e=add(p,'evidence',{title:'Method report',accessStatus:'appraised'});
  r.evidenceIds=[e.id];r.metric='Milliseconds';r.successCriterion='Threshold met';
  found=auditQuality(p).filter(f=>f.id===r.id);
  assert.equal(found.length,0);
});
test('duplicate labels are review prompts, not assumed duplicate identities', () => {
  const p=project();
  add(p,'tasks',{name:'Switch modes'});
  add(p,'tasks',{name:' switch   modes '});
  assert.equal(auditQuality(p).filter(f=>f.code==='POSSIBLE_DUPLICATE').length,1);
});
test('reports remain structured and exported CSV neutralizes spreadsheet formulas', () => {
  const p=project();add(p,'tasks',{id:'=CMD',name:'Task'});
  const report=summarizeQuality(p);
  assert.equal(report.total,report.warnings+report.advisories);
  assert.equal(report.affected,1);
  const csv=qualityReportCsv(p);
  assert.ok(csv.includes("'=CMD"));
  assert.ok(csv.startsWith('"severity","type","record_id"'));
  assert.ok(qualityReportMarkdown(p).includes('# Quality review'));
  assert.ok(qualityReportMarkdown(p).includes('human review is required'));
});
