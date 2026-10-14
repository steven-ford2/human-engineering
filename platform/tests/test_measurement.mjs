import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, resolve} from 'node:path';
import {filterMeasures, validateCatalog} from '../app/measures.js';
const here=dirname(fileURLToPath(import.meta.url));
const root=resolve(here,'../..');
const c=JSON.parse(readFileSync(resolve(root,'domains/pvi-measurement/catalog/measures.json'),'utf8'));
const designs=JSON.parse(readFileSync(resolve(root,'domains/pvi-measurement/catalog/study-designs.json'),'utf8'));
test('catalog has unique measures and all construct/source relationships resolve',()=>{
  assert.equal(validateCatalog(c).length,0);
  assert.ok(c.measures.length>=180);
  assert.ok(c.constructs.length>=25);
  assert.ok(c.sources.length>=15);
  assert.equal(new Set(c.measures.map(m=>m.id)).size,c.measures.length);
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
