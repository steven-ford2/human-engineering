import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, resolve} from 'node:path';
import {enrich, filterMeasures, rankMeasures, validateCatalog, validateConstructGroups, validateEvidence} from '../app/measures.js';
const here=dirname(fileURLToPath(import.meta.url));
const root=resolve(here,'../..');
const c=JSON.parse(readFileSync(resolve(root,'domains/pvi-measurement/catalog/measures.json'),'utf8'));
const evidence=JSON.parse(readFileSync(resolve(root,'domains/pvi-measurement/catalog/measurement-evidence.json'),'utf8'));
const designs=JSON.parse(readFileSync(resolve(root,'domains/pvi-measurement/catalog/study-designs.json'),'utf8'));
test('catalog has unique measures and all construct/source relationships resolve',()=>{
  assert.equal(validateCatalog(c).length,0);
  assert.ok(c.measures.length>=275);
  assert.ok(c.constructs.length>=34);
  assert.ok(c.sources.length>=30);
  assert.equal(new Set(c.measures.map(m=>m.id)).size,c.measures.length);
});
test('construct-first navigation includes each catalog construct exactly once',()=>{
  assert.deepEqual(validateConstructGroups(c.constructs),[]);
  assert.ok(validateConstructGroups([...c.constructs,{id:'new-construct'}]).includes('Ungrouped construct: new-construct'));
});
test('weighted and Raw TLX profiles contain complete, distinct procedures',()=>{
  const weighted=evidence.measureProfiles['nasa-task-load-index-weighted'];
  const raw=evidence.measureProfiles['raw-nasa-tlx'];
  const expected=['Mental Demand','Physical Demand','Temporal Demand','Performance','Effort','Frustration'];
  for(const profile of [weighted,raw]){
    assert.ok(profile.administrationSteps.length>=4);
    assert.ok(profile.scoringSteps.length>=3);
    assert.deepEqual(profile.dimensionGuide.map(d=>d.name),expected);
    assert.ok(profile.dimensionGuide.every(d=>d.meaning&&d.anchors));
    assert.ok(profile.procedureSource.url.startsWith('https://www.nasa.gov/'));
  }
  assert.equal(weighted.pairwiseComparisons,true);
  assert.equal(raw.pairwiseComparisons,undefined);
  assert.match(weighted.scoringSteps.join(' '),/sum to 15/);
  assert.match(raw.scoringSteps.join(' '),/divide by 6/);
  assert.match(weighted.dimensionGuide[3].anchors,/Good \(0\).*Poor \(100\)/);
});
test('controlled MIL-STD-1787D is identified without invented clause mappings',()=>{
  const standard=evidence.standards.find(s=>s.id==='mil-std-1787d');
  assert.equal(standard.shortTitle,'MIL-STD-1787D');
  assert.match(standard.status,/controlled text/);
  assert.match(standard.authorityNote,/no clause-level measure mapping/);
  assert.equal(evidence.standardMappings.filter(m=>m.standardId===standard.id).length,0);
});
test('study, profile and standards evidence resolves to catalog records',()=>{
  assert.equal(validateEvidence(c,evidence).length,0);
  assert.ok(evidence.studies.length>=30);
  assert.ok(evidence.standards.length>=9);
  assert.ok(evidence.standardMappings.length>=15);
  assert.ok(evidence.psychometricConcepts.length>=20);
  assert.ok(Object.keys(evidence.measureProfiles).length>=14);
  assert.equal(evidence.verificationPathways.length,4);
  const mapped=new Set(evidence.standardMappings.flatMap(x=>x.measureIds));
  assert.ok(mapped.has('display-luminance-adjustment-ratio'));
  assert.ok(mapped.has('nasa-task-load-index-weighted'));
  assert.ok(mapped.has('anthropometric-accommodation-rate'));
});
test('verification pathways resolve complete, complementary evidence stacks',()=>{
  const expected=new Set(['display-alert-legibility','hud-hmd-integration','workload-mode-handling','pilot-accommodation']);
  assert.deepEqual(new Set(evidence.verificationPathways.map(x=>x.id)),expected);
  for(const p of evidence.verificationPathways){
    assert.ok(p.evidenceGroups.length>=3,p.id);
    assert.ok(p.standardMappingIds.length>=4,p.id);
    assert.ok(p.conditions.length>=6,p.id);
    assert.ok(p.artifacts.length>=6,p.id);
    assert.ok(p.boundaries.length>=4,p.id);
  }
});
test('finder evidence-status facets expose both curated records and research queue',()=>{
  const enriched=enrich(structuredClone(c),evidence);
  assert.equal(filterMeasures(enriched.measures,{evidence:'profile'}).length,Object.keys(evidence.measureProfiles).length);
  assert.ok(filterMeasures(enriched.measures,{evidence:'studied'}).length>=30);
  assert.ok(filterMeasures(enriched.measures,{evidence:'mapped'}).length>=100);
  assert.ok(filterMeasures(enriched.measures,{evidence:'needs-appraisal'}).length>=150);
});
test('decision-first ranking favors direct context fit and inspectable evidence',()=>{
  const rankedCatalog=enrich(structuredClone(c),evidence);
  const ranked=rankMeasures(filterMeasures(rankedCatalog.measures,{application:'pilot-workload'}),{application:'pilot-workload'});
  assert.equal(ranked[0].applications.includes('pilot-workload'),true);
  assert.equal(Boolean(ranked[0]._profile||ranked[0]._studyCount),true);
});
test('aviation expansion covers display, vision, ergonomics and handling',()=>{
  assert.ok(filterMeasures(c.measures,{family:'display'}).length>=34);
  assert.ok(filterMeasures(c.measures,{family:'ergonomic'}).length>=12);
  assert.ok(filterMeasures(c.measures,{construct:'visual-performance'}).length>=25);
  assert.ok(filterMeasures(c.measures,{construct:'anthropometric-accommodation'}).length>=5);
  assert.ok(filterMeasures(c.measures,{q:'NVIS'}).length>=3);
});
test('all measures have operational unit, evidence and reliability caveat',()=>{
  for(const m of c.measures){
    assert.ok(m.operationalization.length>20,m.id);
    assert.ok(m.reliability.assessment.length>20,m.id);
    assert.ok(m.validity.limitations.length>5,m.id);
    assert.ok(m.aggregation&&m.analysis&&m.smallN,m.id);
    assert.ok(m.sourceIds.length,m.id);
  }
});
test('query and construct facets work together',()=>{
  assert.ok(filterMeasures(c.measures,{q:'stick',construct:'motor-workload'}).length>=5);
  assert.ok(filterMeasures(c.measures,{construct:'situation-awareness'}).length>=5);
  assert.ok(filterMeasures(c.measures,{family:'survey'}).length>=20);
  assert.ok(filterMeasures(c.measures,{modality:'touchscreen'}).length>=8);
  assert.equal(filterMeasures(c.measures,{q:'no-such-instrument-xyz'}).length,0);
});
test('survey timing distinguishes post-test from post-task',()=>{
  const get=id=>c.measures.find(m=>m.id===id);
  assert.equal(get('system-usability-scale-sus').timing,'post-test');
  assert.equal(get('after-scenario-questionnaire-asq').timing,'post-task');
  assert.equal(get('single-ease-question-seq').timing,'post-task');
  assert.equal(get('simulator-sickness-questionnaire-ssq').timing,'pre/post-test');
});
test('online quantitative study designs are distinct and specified',()=>{
  assert.ok(designs.designs.length>=20);
  assert.equal(new Set(designs.designs.map(d=>d.id)).size,designs.designs.length);
  for(const d of designs.designs)assert.ok(d.outcome&&d.protocol&&d.limitations&&d.smallN);
});
