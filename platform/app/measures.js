// Construct-first measurement explorer. Static JSON, no external service.
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const C = (v,a) => a.find(x=>x.id===v)?.label || v;
let catalogPromise, designsPromise, evidencePromise;
const DEFAULT_FILTERS={q:'',construct:'',family:'',modality:'',timing:'',standard:'',application:'',evidence:'',show:60};
const filters={...DEFAULT_FILTERS};
const familyLabels={survey:'Questionnaire',behavior:'Behavioral',eye:'Eye tracking',stick:'HOTAS / inceptor',touch:'Touch',voice:'Voice',flight:'Flight telemetry',probe:'Scenario probe',physio:'Physiological',display:'Display / optical',ergonomic:'Ergonomic'};
const STUDY_SET_KEY='he.measure-study-set.v1';

function load(){
  if(!catalogPromise) catalogPromise=fetch('./measurement-data/measures.json').then(r=>{if(!r.ok)throw Error('Measures unavailable ('+r.status+')');return r.json()});
  if(!designsPromise) designsPromise=fetch('./measurement-data/study-designs.json').then(r=>{if(!r.ok)throw Error('Designs unavailable ('+r.status+')');return r.json()});
  if(!evidencePromise) evidencePromise=fetch('./measurement-data/measurement-evidence.json').then(r=>{if(!r.ok)throw Error('Evidence library unavailable ('+r.status+')');return r.json()});
  return Promise.all([catalogPromise,designsPromise,evidencePromise]);
}

export function validateCatalog(c){
 const issues=[], ids=new Set(), sourceIds=new Set((c.sources||[]).map(s=>s.id)), constructIds=new Set((c.constructs||[]).map(x=>x.id));
 for(const x of c.measures||[]){
  if(!x.id||ids.has(x.id))issues.push('Duplicate/missing measure: '+x.id);ids.add(x.id);
  if(!x.definition||!x.operationalization||!x.units||!x.reliability?.assessment||!x.validity?.limitations)issues.push('Incomplete measure: '+x.id);
  for(const z of x.constructs||[])if(!constructIds.has(z))issues.push('Unknown construct: '+z+' in '+x.id);
  for(const z of x.sourceIds||[])if(!sourceIds.has(z))issues.push('Unknown source: '+z+' in '+x.id);
 }
 return issues;
}

export function validateEvidence(c,e){
 const issues=[],measureIds=new Set((c.measures||[]).map(x=>x.id)),standardIds=new Set((e.standards||[]).map(x=>x.id)),mappingIds=new Set((e.standardMappings||[]).map(x=>x.id)),studyIds=new Set(),pathwayIds=new Set();
 for(const s of e.studies||[]){
  if(!s.id||studyIds.has(s.id))issues.push('Duplicate/missing study: '+s.id);studyIds.add(s.id);
  if(!s.title||!s.url||!s.locator||!s.appraisal)issues.push('Incomplete study: '+s.id);
  for(const id of s.measureIds||[])if(!measureIds.has(id))issues.push('Unknown measure '+id+' in study '+s.id);
 }
 for(const m of e.standardMappings||[]){
  if(!standardIds.has(m.standardId))issues.push('Unknown standard: '+m.standardId);
  if(!m.locator||!m.relationship||!m.verificationUse||!m.caveat)issues.push('Incomplete standard mapping: '+m.id);
  for(const id of m.measureIds||[])if(!measureIds.has(id))issues.push('Unknown measure '+id+' in mapping '+m.id);
 }
 for(const id of Object.keys(e.measureProfiles||{}))if(!measureIds.has(id))issues.push('Unknown profiled measure: '+id);
 for(const p of e.verificationPathways||[]){
  if(!p.id||pathwayIds.has(p.id))issues.push('Duplicate/missing verification pathway: '+p.id);pathwayIds.add(p.id);
  if(!p.title||!p.question||!p.summary||!p.claim||!p.scenario||!p.task||!p.failureMechanisms?.length||p.evidenceGroups?.length<3||!p.conditions?.length||!p.artifacts?.length||!p.decisionRules?.length||!p.boundaries?.length||!p.sources?.length)issues.push('Incomplete verification pathway: '+p.id);
  for(const id of p.standardMappingIds||[])if(!mappingIds.has(id))issues.push('Unknown standard mapping '+id+' in pathway '+p.id);
  for(const g of p.evidenceGroups||[]){
   if(!g.role||!g.purpose||!g.measureIds?.length)issues.push('Incomplete evidence group in pathway '+p.id);
   for(const id of g.measureIds||[])if(!measureIds.has(id))issues.push('Unknown measure '+id+' in pathway '+p.id);
  }
  for(const s of p.sources||[])if(!s.label||!s.url||!s.locator)issues.push('Incomplete source in pathway '+p.id);
 }
 return issues;
}

export function filterMeasures(measures,f={}){
 let text=String(f.q||'').toLocaleLowerCase().trim();
 return measures.filter(m=>{
  if(f.construct&&!m.constructs.includes(f.construct))return false;
  if(f.family&&m.family!==f.family)return false;
  if(f.modality&&!m.modality.includes(f.modality))return false;
  if(f.timing&&!m.timing.includes(f.timing))return false;
  if(f.standard&&!(m._standardIds||m.standardIds||[]).includes(f.standard))return false;
  if(f.application&&!(m._applications||m.applications||[]).includes(f.application))return false;
  if(f.evidence==='profile'&&!m._profile)return false;
  if(f.evidence==='studied'&&!m._studyCount)return false;
  if(f.evidence==='mapped'&&!(m._standardIds||[]).length)return false;
  if(f.evidence==='needs-appraisal'&&(m._profile||m._studyCount))return false;
  if(!text)return true;
  const hay=[m.name,m.id,m.definition,m.operationalization,m.units,m.family,m.timing,(m.sourceIds||[]).join(' '),(m.constructs||[]).join(' '),m.validity?.limitations,(m._searchEvidence||'')].join(' ').toLocaleLowerCase();
  return text.split(/\s+/).every(w=>hay.includes(w));
 });
}

export function enrich(c,e){
 const profiles=e.measureProfiles||{};
 for(const m of c.measures){
  const maps=(e.standardMappings||[]).filter(x=>(x.measureIds||[]).includes(m.id));
  const studies=(e.studies||[]).filter(x=>(x.measureIds||[]).includes(m.id));
  m._standardIds=[...new Set(maps.map(x=>x.standardId))];
  m._applications=[...new Set([...(m.applications||[]),...maps.flatMap(x=>x.applications||[]),...studies.flatMap(x=>x.applications||[])])];
  m._studyCount=studies.length;
  m._mapCount=maps.length;
  m._profile=profiles[m.id]||null;
  m._searchEvidence=[...maps.map(x=>x.locator+' '+x.verificationUse),...studies.map(x=>x.title+' '+x.context+' '+x.appraisal),profiles[m.id]?.summary||''].join(' ');
 }
 return c;
}

const select=(id,label,opts,selected)=>'<label class="m-field"><span>'+esc(label)+'</span><select id="'+id+'"><option value="">All '+esc(label.toLowerCase())+'</option>'+opts.map(([v,t])=>'<option value="'+esc(v)+'" '+(v===selected?'selected':'')+'>'+esc(t)+'</option>').join('')+'</select></label>';
const info=(head,value)=>'<div class="m-meta"><dt>'+esc(head)+'</dt><dd>'+esc(value)+'</dd></div>';
const statusPill=(label,tone='neutral')=>'<span class="m-status '+tone+'">'+esc(label)+'</span>';
const link=(url,label,cls='')=>'<a class="'+cls+'" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+' ↗</a>';
const standardName=(id,e)=>e.standards.find(x=>x.id===id)?.shortTitle||id;

function measurementNav(active='finder'){
 const rows=[['finder','#/measures','Finder'],['verification','#/measures/verification','Verification studio'],['guide','#/measures/guide','Coworker guide'],['psychometrics','#/measures/psychometrics','Psychometrics'],['standards','#/measures/standards','Standards'],['designs','#/measures/designs','Study designs']];
 return '<nav class="m-subnav" aria-label="Measurement Atlas sections">'+rows.map(([id,href,label])=>'<a class="'+(id===active?'active':'')+'" href="'+href+'">'+label+'</a>').join('')+'</nav>';
}

function profileCoverage(m,studies,maps){
 const profile=m._profile;let score=0;
 if(profile?.administration)score++;if(profile?.reliabilityEvidence?.length)score++;if(profile?.validityEvidence?.length)score++;if(profile?.factorEvidence?.length)score++;if(studies.length)score++;if(maps.length)score++;
 const label=score>=5?'Deep profile':score>=3?'Evidence profile':'Candidate profile';
 const tone=score>=5?'good':score>=3?'partial':'neutral';
 return {score,label,tone};
}

function evidenceRow(title,body,source,kind='evidence'){
 return '<article class="m-evidence-row"><div>'+statusPill(kind,kind==='limitation'?'warn':'neutral')+'<h3>'+esc(title)+'</h3><p>'+esc(body)+'</p></div>'+(source?'<small>'+esc(source)+'</small>':'')+'</article>';
}

function factorTable(rows){
 if(!rows?.length)return '<div class="m-empty-evidence"><strong>No factor/item evidence is curated yet.</strong><p>This does not mean none exists. Check the original instrument literature before assuming a structure or scoring model.</p></div>';
 return '<div class="m-table-wrap"><table class="m-table"><thead><tr><th>Study / model</th><th>Sample and estimator</th><th>Reported structure</th><th>Interpretation</th></tr></thead><tbody>'+rows.map(x=>'<tr><td><strong>'+esc(x.model)+'</strong><small>'+esc(x.source)+'</small></td><td>'+esc(x.sample)+'<br/><small>'+esc(x.estimator||'Estimator not reported in this catalog')+'</small></td><td>'+esc(x.result)+(x.itemLoadings?.length?'<details class="m-item-loadings"><summary>View '+x.itemLoadings.length+' reported item loadings</summary><table><thead><tr><th>Item</th><th>Factor</th><th>Loading</th></tr></thead><tbody>'+x.itemLoadings.map(i=>'<tr><td>'+esc(i.item)+'</td><td>'+esc(i.factor)+'</td><td>'+esc(i.loading)+'</td></tr>').join('')+'</tbody></table></details>':'<small class="m-no-loadings">No verified item-loading matrix stored.</small>')+'</td><td>'+esc(x.interpretation)+'</td></tr>').join('')+'</tbody></table></div>';
}

function studyCard(x){
 return '<article class="m-study"><header><div>'+statusPill(x.evidenceType||'study use',x.evidenceType==='instrument development'?'good':'neutral')+'<h3>'+esc(x.title)+'</h3></div><span>'+esc(x.year)+'</span></header><p><strong>How it was used:</strong> '+esc(x.use)+'</p><p><strong>Population / context:</strong> '+esc(x.context)+'</p><p><strong>Appraisal:</strong> '+esc(x.appraisal)+'</p><footer>'+link(x.url,x.citation||'Open source')+'<small>'+esc(x.locator)+'</small></footer></article>';
}

function mappingCard(x,e){
 const s=e.standards.find(z=>z.id===x.standardId);
 return '<article class="m-mapping"><header><div>'+statusPill(x.relationship,x.relationship==='direct-test-method'?'good':'partial')+'<h3>'+esc(s?.shortTitle||x.standardId)+' · '+esc(x.locator)+'</h3></div></header><p>'+esc(x.verificationUse)+'</p><p class="m-caveat"><strong>Boundary:</strong> '+esc(x.caveat)+'</p>'+(s?link(s.url,'Official document record'):'')+'</article>';
}

function pathwayBrief(p,c,e){
 const measure=id=>c.measures.find(x=>x.id===id)?.name||id;
 const mappings=(p.standardMappingIds||[]).map(id=>e.standardMappings.find(x=>x.id===id)).filter(Boolean);
 return [
  p.title,
  'Question: '+p.question,
  'Claim: '+p.claim,
  'Scenario: '+p.scenario,
  'Task: '+p.task,
  'Failure mechanisms: '+p.failureMechanisms.join('; '),
  ...p.evidenceGroups.map(g=>g.role+': '+g.measureIds.map(measure).join(', ')+' — '+g.purpose),
  'Conditions: '+p.conditions.join('; '),
  'Evidence artifacts: '+p.artifacts.join('; '),
  'Standards/guidance: '+mappings.map(x=>(e.standards.find(s=>s.id===x.standardId)?.shortTitle||x.standardId)+' '+x.locator).join('; '),
  'Boundaries: '+p.boundaries.join('; ')
 ].join('\n');
}

function readStudySet(){
 try{return [...new Set(JSON.parse(localStorage.getItem(STUDY_SET_KEY)||'[]'))].filter(x=>typeof x==='string').slice(0,4)}catch{return []}
}
function writeStudySet(ids){localStorage.setItem(STUDY_SET_KEY,JSON.stringify(ids.slice(0,4)))}
function toggleStudySet(id){
 const ids=readStudySet(),index=ids.indexOf(id);
 if(index>=0)ids.splice(index,1);else if(ids.length<4)ids.push(id);else return {ids,full:true};
 writeStudySet(ids);return {ids,full:false};
}
function studySetBar(c){
 const selected=readStudySet().map(id=>c.measures.find(m=>m.id===id)).filter(Boolean);
 if(!selected.length)return '';
 return '<section class="m-study-set" aria-label="Study set"><div><span>STUDY SET</span><strong>Compare the measures you are seriously considering</strong><div class="m-study-set-items">'+selected.map(m=>'<a href="#/measures/'+encodeURIComponent(m.id)+'">'+esc(m.name)+'</a>').join('')+'</div></div><div class="m-study-set-actions"><a class="m-action dark" href="#/measures/compare">Compare selection →</a><button id="m-study-set-clear">Clear</button></div></section>';
}
function compareBrief(selected){
 return selected.map(m=>[m.name,'What it measures: '+m.definition,'Collection: '+m.operationalization,'Units: '+m.units,'Timing: '+m.timing,'Reliability plan: '+m.reliability.assessment,'Interpretation boundary: '+m.validity.limitations,'Analysis: '+m.analysis].join('\n')).join('\n\n---\n\n');
}
function comparePage(root,c,e){
 const selected=readStudySet().map(id=>c.measures.find(m=>m.id===id)).filter(Boolean);
 if(!selected.length){root.innerHTML='<div class="m-shell">'+measurementNav('finder')+'<div class="m-hero"><div class="m-overline">CANDIDATE COMPARISON</div><h1>Your study set is empty</h1><p>Open a measure profile and add a serious candidate. The study set stays in this browser and can hold up to four measures.</p><div class="m-hero-actions"><a class="m-action" href="#/measures">Find a measure →</a></div></div></div>';return;}
 const rows=[['What it measures',m=>m.definition],['Method and timing',m=>(familyLabels[m.family]||m.family)+' · '+m.timing],['Units',m=>m.units],['How to collect it',m=>m.operationalization],['Reliability plan',m=>m.reliability.assessment],['Interpretation boundary',m=>m.validity.limitations],['Analysis',m=>m.analysis],['Aviation use',m=>(m._applications||[]).join(', ')||'Context-specific']];
 root.innerHTML='<div class="m-shell">'+measurementNav('finder')+'<div class="m-crumb"><a href="#/measures">← Back to finder</a></div><div class="m-hero"><div class="m-overline">CANDIDATE COMPARISON</div><h1>Compare the evidence roles—not just the labels</h1><p>Use this view to decide whether candidates are alternatives or complementary measures. A short questionnaire, observed task result, engineering measurement, and safety-margin indicator may answer different parts of the same claim.</p><div class="m-hero-actions"><button class="m-action m-copy-brief" id="m-copy-comparison">Copy comparison</button><a class="m-action" href="#/measures">Add another candidate</a></div></div><div class="m-compare-wrap"><table class="m-compare"><thead><tr><th>Decision point</th>'+selected.map(m=>'<th><a href="#/measures/'+encodeURIComponent(m.id)+'">'+esc(m.name)+'</a><button data-remove-measure="'+esc(m.id)+'">Remove</button></th>').join('')+'</tr></thead><tbody>'+rows.map(([label,value])=>'<tr><th>'+esc(label)+'</th>'+selected.map(m=>'<td>'+esc(value(m))+'</td>').join('')+'</tr>').join('')+'</tbody></table></div><div class="m-boundary"><strong>Selection boundary:</strong> this comparison organizes recorded information; it does not rank measures or establish that evidence transfers to your population, task, equipment, or decision rule.</div></div>';
 root.querySelectorAll('[data-remove-measure]').forEach(b=>b.addEventListener('click',()=>{toggleStudySet(b.dataset.removeMeasure);comparePage(root,c,e)}));
 root.querySelector('#m-copy-comparison')?.addEventListener('click',async()=>{const b=root.querySelector('#m-copy-comparison');try{await navigator.clipboard.writeText(compareBrief(selected));b.textContent='Comparison copied';}catch{b.textContent='Copy unavailable';}});
}

function verificationPage(root,c,e,id){
 const pathways=e.verificationPathways||[];
 if(!id){
  root.innerHTML='<div class="m-shell">'+measurementNav('verification')+'<div class="m-hero m-verification-hero"><div><div class="m-overline">TASK-TO-EVIDENCE WORKFLOW</div><h1>What must the evidence prove?</h1><p>Choose the operational question closest to yours. Each worked pathway connects a synthetic aviation scenario to the task, credible failures, a bounded claim, complementary measures, test conditions, decision gates, and review artifacts.</p></div><div class="m-pathway-principle"><span>BEGIN WITH</span><strong>One bounded operational claim</strong><small>Then assign each measure a clear evidence role.</small></div></div><div class="m-process" aria-label="Verification planning chain"><span>Scenario</span><i>→</i><span>Task</span><i>→</i><span>Failure</span><i>→</i><span>Claim</span><i>→</i><span>Measures</span><i>→</i><span>Evidence</span></div><section class="m-pathway-grid">'+pathways.map((p,i)=>'<a class="m-pathway-card" href="#/measures/verification/'+encodeURIComponent(p.id)+'"><span class="m-pathway-index">0'+(i+1)+'</span><div><div class="m-overline">'+esc(p.label)+'</div><h2>'+esc(p.title)+'</h2><p>'+esc(p.question)+'</p><small>Inspect the evidence roles, test envelope, decision gates, and authority boundaries</small></div><span class="m-pathway-open">Open worked plan →</span></a>').join('')+'</section><div class="m-boundary"><strong>Planning boundary:</strong> these are worked evidence architectures, not approved test plans. Confirm the program requirement, authority, configuration, population, hazards, acceptance rule, and test limitations before use.</div></div>';
  return;
 }
 const p=pathways.find(x=>x.id===id);
 if(!p){root.innerHTML='<div class="m-note">Unknown verification pathway. <a href="#/measures/verification">Back to the studio</a></div>';return;}
 const mappings=(p.standardMappingIds||[]).map(mid=>e.standardMappings.find(x=>x.id===mid)).filter(Boolean);
 const measureCard=id=>{const m=c.measures.find(x=>x.id===id);if(!m)return '';return '<a class="m-role-measure" href="#/measures/'+encodeURIComponent(id)+'"><span>'+esc(familyLabels[m.family]||m.family)+'</span><strong>'+esc(m.name)+'</strong><small>'+esc(m.definition)+'</small><b>Inspect evidence →</b></a>'};
 root.innerHTML='<div class="m-shell">'+measurementNav('verification')+'<div class="m-crumb"><a href="#/measures/verification">← Verification studio</a> / '+esc(p.label)+'</div><div class="m-hero"><div class="m-overline">VERIFICATION PATHWAY · '+esc(p.label)+'</div><h1>'+esc(p.title)+'</h1><p>'+esc(p.summary)+'</p><div class="m-hero-actions"><button class="m-action m-copy-brief" id="m-copy-brief">Copy planning brief</button><a class="m-action" href="#/workbench">Build trace in workbench →</a></div></div><div class="m-pathway-layout"><main><section class="m-claim-board"><div><span>QUESTION</span><p>'+esc(p.question)+'</p></div><div><span>BOUNDED CLAIM</span><p>'+esc(p.claim)+'</p></div></section><section><div class="m-section-head"><div><div class="m-overline">ENGINEERING CHAIN</div><h2>From operational context to observable evidence</h2></div></div><div class="m-chain"><article><span>01 / SCENARIO</span><p>'+esc(p.scenario)+'</p></article><article><span>02 / HUMAN TASK</span><p>'+esc(p.task)+'</p></article><article><span>03 / CREDIBLE FAILURES</span><ul>'+p.failureMechanisms.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></article></div></section><section><div class="m-section-head"><div><div class="m-overline">CONVERGING EVIDENCE</div><h2>Do not let one convenient score carry the claim</h2></div></div><div class="m-evidence-stack">'+p.evidenceGroups.map((g,i)=>'<article><header><span>0'+(i+1)+'</span><div><h3>'+esc(g.role)+'</h3><p>'+esc(g.purpose)+'</p></div></header><div class="m-role-grid">'+g.measureIds.map(measureCard).join('')+'</div></article>').join('')+'</div></section><section><div class="m-section-head"><div><div class="m-overline">TEST ENVELOPE</div><h2>Conditions that must survive into the procedure</h2></div></div><ul class="m-check-grid">'+p.conditions.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></section><section><div class="m-section-head"><div><div class="m-overline">TRACEABLE OUTPUT</div><h2>Evidence package</h2></div></div><ol class="m-artifact-list">'+p.artifacts.map((x,i)=>'<li><span>'+String(i+1).padStart(2,'0')+'</span><p>'+esc(x)+'</p></li>').join('')+'</ol></section><section><div class="m-section-head"><div><div class="m-overline">SOURCE AUTHORITY</div><h2>Applicable criteria and guidance</h2></div></div>'+mappings.map(x=>mappingCard(x,e)).join('')+'</section></main><aside class="m-pathway-aside"><div><div class="m-overline">INTERPRETATION GATES</div><h2>Before a decision</h2><ul>'+p.decisionRules.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div><div class="m-no-claim"><strong>This pathway does not establish</strong><ul>'+p.boundaries.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div><div><h2>Primary / official sources</h2>'+p.sources.map(x=>'<div class="m-source">'+link(x.url,x.label)+'<small>'+esc(x.locator)+'</small></div>').join('')+'</div></aside></div></div>';
 root.querySelector('#m-copy-brief')?.addEventListener('click',async()=>{const b=root.querySelector('#m-copy-brief');try{await navigator.clipboard.writeText(pathwayBrief(p,c,e));b.textContent='Planning brief copied';}catch{b.textContent='Copy unavailable';}});
}

function detail(root,c,e,m){
 const refs=m.sourceIds.map(id=>c.sources.find(s=>s.id===id)).filter(Boolean);
 const studies=(e.studies||[]).filter(x=>(x.measureIds||[]).includes(m.id));
 const maps=(e.standardMappings||[]).filter(x=>(x.measureIds||[]).includes(m.id));
 const p=m._profile||{};
 const reliability=p.reliabilityEvidence||[];const validity=p.validityEvidence||[];
 const availability=[p.administration?'Administration guidance':'',reliability.length||m.reliability.published?'Reliability evidence':'',validity.length?'Validity evidence':'',studies.length?'Prior use':'',maps.length?'Verification relevance':''].filter(Boolean);
 const inSet=readStudySet().includes(m.id);
 root.innerHTML='<div class="m-shell">'+measurementNav('finder')+studySetBar(c)+'<div class="m-crumb"><a href="#/measures">← Back to finder</a> / '+esc(familyLabels[m.family]||m.family)+'</div><div class="m-hero m-profile-hero"><div><div class="m-overline">MEASURE DECISION PROFILE · '+esc(m.id)+'</div><h1>'+esc(m.name)+'</h1><p>'+esc(p.summary||m.definition)+'</p><div class="m-chips">'+m.constructs.map(x=>'<a class="m-chip" href="#/measures/filter/'+encodeURIComponent(x)+'">'+esc(C(x,c.constructs))+'</a>').join('')+'</div><div class="m-hero-actions"><button class="m-action m-set-toggle" id="m-set-toggle" aria-pressed="'+inSet+'">'+(inSet?'Remove from study set':'Add to study set')+'</button>'+(readStudySet().length?'<a class="m-action" href="#/measures/compare">Compare study set</a>':'')+'</div></div><div class="m-profile-state"><span class="m-profile-state-label">AVAILABLE TO INSPECT</span>'+(availability.length?availability.map(x=>'<span class="m-profile-signal">'+esc(x)+'</span>').join(''):'<span class="m-profile-signal">Definition and operationalization</span>')+'</div></div>'+
 '<section class="m-decision-board" aria-label="Measure fit summary"><div><span>WHAT IT CAN TELL YOU</span><p>'+esc(m.definition)+'</p></div><div><span>HOW TO COLLECT IT</span><p>'+esc(m.operationalization)+'</p></div><div class="caution"><span>DO NOT INTERPRET WITHOUT</span><p>'+esc(m.validity.limitations)+'</p></div></section>'+
 '<nav class="m-jump" aria-label="Inspect this measure"><a href="#measure-use">Use and scoring</a><a href="#measure-reliability">Reliability</a><a href="#measure-validity">Validity</a><a href="#measure-factors">Factors and items</a><a href="#measure-studies">Prior studies</a><a href="#measure-standards">Standards</a><a href="#measure-analysis">Analysis</a></nav><div class="m-layout"><main class="m-detail m-profile-detail">'+
 '<details class="m-profile-section" id="measure-use" open><summary><span>Use and scoring</span><small>What to collect, when, and how to score it</small></summary><div><dl class="m-metadata">'+info('Units',m.units)+info('Collection time',m.timing)+info('Data modality',m.modality.join(', '))+info('Aggregation',m.aggregation)+info('Evidence status',m.evidenceStatus)+info('Applications',(m._applications||[]).join(', ')||'Context-specific')+'</dl>'+(p.administration?'<div class="m-callout"><h3>Administration and scoring</h3><p>'+esc(p.administration)+'</p>'+(p.licensing?'<p><strong>Access / licensing:</strong> '+esc(p.licensing)+'</p>':'')+'</div>':'<div class="m-empty-evidence"><strong>Administration record not yet curated.</strong><p>Use the cited original source and do not improvise item wording or scoring for a named instrument.</p></div>')+'</div></details>'+
 '<details class="m-profile-section" id="measure-reliability"><summary><span>Reliability evidence</span><small>Whether scores or observations are dependable for this use</small></summary><div><p>'+esc(m.reliability.assessment)+'</p>'+(m.reliability.published?'<p class="m-fact"><strong>Catalog summary:</strong> '+esc(m.reliability.published)+'</p>':'<p class="m-warning">No transferable numerical reliability coefficient is supplied. Estimate dependability for the actual study protocol.</p>')+(reliability.length?reliability.map(x=>evidenceRow(x.label,x.result,x.source,'evidence')).join(''):'')+'</div></details>'+
 '<details class="m-profile-section" id="measure-validity"><summary><span>Validity and interpretation</span><small>What supports the intended meaning—and what can confound it</small></summary><div><p>'+esc(m.validity.basis)+'</p><p><strong>Important confound:</strong> '+esc(m.validity.limitations)+'</p>'+(validity.length?validity.map(x=>evidenceRow(x.label,x.result,x.source,x.kind||'evidence')).join(''):'')+'</div></details>'+
 '<details class="m-profile-section" id="measure-factors"><summary><span>Factor and item evidence</span><small>Structure, loadings, response behavior, and scoring implications</small></summary><div><p>Factor results belong to a particular sample, item wording, response scale, estimator, and model. They are evidence about an interpretation—not permanent properties of a questionnaire.</p>'+factorTable(p.factorEvidence)+'</div></details>'+
 '<details class="m-profile-section" id="measure-studies"><summary><span>Studies and documented uses</span><small>How prior researchers used the measure and whether that use was justified</small></summary><div><p>Instrument-development, validation, and application records are separated so use alone is not mistaken for validation.</p>'+(studies.length?studies.map(studyCard).join(''):'<div class="m-empty-evidence"><strong>No study-use record has been appraised for this measure yet.</strong><p>The source anchors at right may establish identity or precedent, but the catalog does not convert them into an unverified study claim.</p></div>')+'</div></details>'+
 '<details class="m-profile-section" id="measure-standards"><summary><span>Standards and verification use</span><small>Which criterion this evidence may support and the authority boundary</small></summary><div><p>Mappings identify candidate evidence for a criterion. A score or test result does not by itself demonstrate compliance or airworthiness.</p>'+(maps.length?maps.map(x=>mappingCard(x,e)).join(''):'<div class="m-empty-evidence"><strong>No clause-level mapping is curated.</strong><p>Do not infer a military-standard relationship from a similar-sounding construct.</p></div>')+'</div></details>'+
 '<details class="m-profile-section" id="measure-analysis"><summary><span>Analysis and small samples</span><small>How to summarize the result without overclaiming</small></summary><div><p>'+esc(m.analysis)+'</p><p><strong>Small-N caveat:</strong> '+esc(m.smallN)+'</p><p><strong>Context to define:</strong> '+esc(m.context)+'</p></div></details></main><aside class="m-sources"><div class="m-research-gap"><strong>Before you use this measure</strong><p>Resolve these questions with evidence from your own protocol and population.</p><ul>'+(p.researchNeeds||['Representative-population reliability','Construct evidence in the intended task','Instrumentation and scoring verification','Decision threshold authority']).map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div><h2>Source anchors</h2><p>These references support identity, framework, or precedent. Study and standards records carry their own locators and appraisal.</p>'+refs.map(x=>'<div class="m-source">'+link(x.url,x.title)+'<span>'+esc(x.authors)+' ('+esc(x.year)+')</span><small>'+esc(x.scope)+'</small></div>').join('')+'<a class="m-back" href="#/measures">← Return to finder</a></aside></div></div>';
 root.querySelectorAll('.m-jump a').forEach(a=>a.addEventListener('click',()=>{const target=root.querySelector(a.getAttribute('href'));if(target?.tagName==='DETAILS')target.open=true;}));
 root.querySelector('#m-study-set-clear')?.addEventListener('click',()=>{writeStudySet([]);detail(root,c,e,m)});
 root.querySelector('#m-set-toggle')?.addEventListener('click',()=>{const result=toggleStudySet(m.id);if(result.full){const b=root.querySelector('#m-set-toggle');b.textContent='Study set is full';return;}detail(root,c,e,m)});
}

function designList(root,c,d){
 const lookup=new Map(d.designs.map(x=>[x.id,x]));const selected=decodeURIComponent(location.hash.split('/')[3]||'').split('?')[0];
 if(selected&&lookup.has(selected)){const x=lookup.get(selected);root.innerHTML='<div class="m-shell">'+measurementNav('designs')+'<div class="m-crumb"><a href="#/measures/designs">← Study designs</a></div><div class="m-hero"><div class="m-overline">QUANTITATIVE STUDY DESIGN</div><h1>'+esc(x.name)+'</h1><p>'+esc(x.description)+'</p></div><div class="m-detail"><h2>Primary outcomes</h2><p>'+esc(x.outcome)+'</p><h2>Design and counterbalancing</h2><p>'+esc(x.protocol)+'</p><h2>Validity threats</h2><p>'+esc(x.limitations)+'</p><h2>Small-N caution</h2><p>'+esc(x.smallN)+'</p><a href="#/measures/designs">View other designs →</a></div></div>';return;}
 root.innerHTML='<div class="m-shell">'+measurementNav('designs')+'<div class="m-crumb"><a href="#/measures">Measures</a> / Research designs</div><div class="m-hero"><div class="m-overline">MEASUREMENT PLANNING</div><h1>Study design patterns</h1><p>'+d.designs.length+' research patterns for comparing interfaces, testing comprehension, eliciting tradeoffs, and making bounded inferences with limited pilot populations.</p></div><div class="m-grid">'+d.designs.map(x=>'<a class="m-card" href="#/measures/designs/'+encodeURIComponent(x.id)+'"><span class="m-card-tag">METHOD</span><h2>'+esc(x.name)+'</h2><p>'+esc(x.outcome)+'</p><span class="m-card-bottom">Open method →</span></a>').join('')+'</div><div class="m-note">Design methods do not have generic psychometric reliability coefficients. Select by estimand and task, then plan precision using the design and feasible pilot sample.</div></div>';
}

function guidePage(root){
 root.innerHTML='<div class="m-shell">'+measurementNav('guide')+'<div class="m-hero"><div class="m-overline">COWORKER WALKTHROUGH</div><h1>Show the decision path, not the catalog</h1><p>Use one concrete question to demonstrate how the finder moves from a decision to candidates, then into evidence quality and a verification plan. The links below keep the demonstration focused.</p><div class="m-hero-actions"><a class="m-action" href="#/measures?application=flight-deck-display">Start with display evidence →</a><a class="m-action" href="#/measures/after-scenario-questionnaire-asq">Open an evidence-rich profile</a><a class="m-action" href="#/measures/verification/display-alert-legibility">Open the worked verification plan</a></div></div><section class="m-demo-launch" aria-label="Live demonstration route"><a href="#/measures?application=flight-deck-display"><span>FIND</span><strong>Frame the question and narrow candidates</strong></a><a href="#/measures/after-scenario-questionnaire-asq"><span>JUDGE</span><strong>Inspect use, reliability, validity, and prior studies</strong></a><a href="#/measures/verification/display-alert-legibility"><span>PLAN</span><strong>Assign complementary evidence roles</strong></a></section><ol class="m-demo-steps"><li><div class="m-demo-number">01</div><div><h2>Start with the decision</h2><p>Say: “We need evidence that pilots can detect and correctly interpret this alert in bright and dark cockpit conditions.” Name the population, task, state, environment, and consequence of failure before selecting a metric.</p></div></li><li><div class="m-demo-number">02</div><div><h2>Choose the closest outcome</h2><p>Open the display evidence set. Use search first; open advanced filters only when the context, method, timing, evidence type, or governing document changes the decision.</p><div class="m-preset-grid"><a href="#/measures?application=flight-deck-display" class="m-preset"><strong>Flight-deck displays</strong><span>Luminance, contrast, legibility, alerts</span></a><a href="#/measures?application=pilot-workload" class="m-preset"><strong>Pilot workload</strong><span>Ratings, performance, eye, control, physiology</span></a><a href="#/measures?application=pilot-ergonomics" class="m-preset"><strong>Pilot ergonomics</strong><span>Reach, clearance, strength, posture, comfort</span></a><a href="#/measures?standard=mil-std-1472h" class="m-preset"><strong>MIL-STD-1472H</strong><span>Candidate evidence by mapped criterion</span></a></div></div></li><li><div class="m-demo-number">03</div><div><h2>Judge one candidate</h2><p>Read the answer-first summary, then open only the evidence needed for the decision: administration, reliability, validity, factor/item structure, prior uses, standards relevance, or analysis. Add serious candidates to the study set rather than keeping many tabs open.</p><a class="m-action dark" href="#/measures/after-scenario-questionnaire-asq">Inspect an evidence-rich profile →</a></div></li><li><div class="m-demo-number">04</div><div><h2>Build a converging set</h2><p>Open the display and alert pathway. Show how task performance, engineering measurements, human ratings, conditions, and review artifacts carry different parts of the claim. Disagreement is diagnostic; it should not be averaged away automatically.</p><a class="m-action dark" href="#/measures/verification/display-alert-legibility">Open the worked pathway →</a></div></li><li><div class="m-demo-number">05</div><div><h2>Share the decision context</h2><p>Copy the filtered view for the same candidate set, or copy the verification brief for the question, claim, evidence roles, conditions, and boundaries.</p></div></li></ol><div class="m-boundary"><strong>Say this out loud:</strong> “The finder helps us choose and document evidence. It does not certify the design, transfer published coefficients to our sample, or make a handbook criterion contractually binding.”</div></div>';
}

function psychometricsPage(root,e){
 const groups=[...new Set((e.psychometricConcepts||[]).map(x=>x.group))];
 root.innerHTML='<div class="m-shell">'+measurementNav('psychometrics')+'<div class="m-hero"><div class="m-overline">SCIENTIFIC QUALITY / INTERPRETATION</div><h1>Psychometrics field guide</h1><p>Reliability, validity, factor structure, item behavior, invariance, responsiveness, and decision accuracy belong to a specified interpretation and use. Use this guide to plan the evidence a measure needs—not to collect reassuring coefficients after the fact.</p></div><div class="m-psych-intro"><div><span>START HERE</span><h2>A defensible measurement argument</h2><p>Define the construct and intended decision; document content and response processes; test scoring and internal structure; examine reliability for the relevant source of variation; evaluate relationships and known groups; then check fairness, responsiveness, uncertainty, and consequences.</p></div><a href="#/measures" class="m-action dark">Apply this in the finder →</a></div>'+groups.map(g=>'<section class="m-concept-section"><div class="m-section-head"><div><div class="m-overline">'+esc(g)+'</div><h2>'+esc(g)+'</h2></div></div><div class="m-concept-grid">'+e.psychometricConcepts.filter(x=>x.group===g).map(x=>'<details class="m-concept"><summary><span>'+esc(x.name)+'</span><small>'+esc(x.question)+'</small></summary><div><p>'+esc(x.definition)+'</p><p><strong>Use it when:</strong> '+esc(x.use)+'</p><p><strong>Watch for:</strong> '+esc(x.misuse)+'</p><p><strong>Minimum record:</strong> '+esc(x.record)+'</p>'+link(x.url,x.source)+'</div></details>').join('')+'</div></section>').join('')+'<div class="m-boundary"><strong>Factor-analysis boundary:</strong> do not run EFA or CFA simply because a questionnaire has several items. Establish a plausible reflective measurement model, use an estimator suitable for the response scale, report item-level results and uncertainty, and avoid stable-structure claims from very small or unrepresentative samples.</div></div>';
}

function standardsPage(root,e,id){
 if(id){const s=e.standards.find(x=>x.id===id);if(!s){root.innerHTML='<div class="m-note">Unknown standard. <a href="#/measures/standards">Back to standards</a></div>';return;}const maps=e.standardMappings.filter(x=>x.standardId===s.id);root.innerHTML='<div class="m-shell">'+measurementNav('standards')+'<div class="m-crumb"><a href="#/measures/standards">← Standards explorer</a></div><div class="m-hero"><div class="m-overline">'+esc(s.status.toUpperCase())+' · '+esc(s.publisher)+'</div><h1>'+esc(s.shortTitle)+'</h1><p>'+esc(s.title)+' · '+esc(s.revisionDate)+'</p><div class="m-chips">'+statusPill(maps.length+' mapped evidence groups','partial')+'</div></div><div class="m-layout"><main class="m-detail"><h2>What this document does</h2><p>'+esc(s.scope)+'</p><div class="m-warning"><strong>Authority boundary:</strong> '+esc(s.authorityNote)+'</div><h2>Mapped evidence</h2>'+maps.map(x=>mappingCard(x,e)).join('')+'</main><aside class="m-sources"><h2>Official record</h2>'+link(s.url,s.title)+'<p>'+esc(s.sourceNote)+'</p><a class="m-back" href="#/measures?standard='+encodeURIComponent(s.id)+'">Find mapped measures →</a></aside></div></div>';return;}
 root.innerHTML='<div class="m-shell">'+measurementNav('standards')+'<div class="m-hero"><div class="m-overline">TRACEABLE VERIFICATION SUPPORT</div><h1>Standards explorer</h1><p>Browse candidate measurement evidence by current public military standards, handbooks, specifications, and civil guidance. Exact revision, authority, locator, and relationship are recorded so “related to” is not mistaken for “complies with.”</p></div><div class="m-standard-grid">'+e.standards.map(s=>{const n=e.standardMappings.filter(x=>x.standardId===s.id).length;return '<article class="m-standard-card"><div>'+statusPill(s.status,s.status==='active'?'good':'warn')+'<h2>'+esc(s.shortTitle)+'</h2><p>'+esc(s.title)+'</p></div><dl>'+info('Revision / date',s.revisionDate)+info('Mapped evidence groups',n)+'</dl><footer><a href="#/measures/standards/'+encodeURIComponent(s.id)+'">Inspect mappings →</a><a href="#/measures?standard='+encodeURIComponent(s.id)+'">Find measures →</a></footer></article>'}).join('')+'</div><div class="m-boundary"><strong>Current-baseline note:</strong> MIL-HDBK-516D superseded 516C in May 2026. The handbook states that it is guidance and cannot itself be cited as a requirement; a program-approved certification basis controls applicability.</div></div>';
}

function readHashFilters(){
 const params=new URLSearchParams(location.hash.split('?')[1]||'');
 for(const k of ['q','construct','family','modality','timing','standard','application','evidence'])filters[k]=params.get(k)||'';
 filters.show=60;
}
function syncHash(){
 const p=new URLSearchParams();for(const k of ['q','construct','family','modality','timing','standard','application','evidence'])if(filters[k])p.set(k,filters[k]);
 const next='#/measures'+(p.size?'?'+p.toString():'');history.replaceState(null,'',next);
}

function list(root,c,d,e,{read=true}={}){
 if(read)readHashFilters();
 const opts=k=>[...new Set(c.measures.flatMap(m=>k==='modality'?m.modality:[m[k]]).filter(Boolean))].sort().map(x=>[x,k==='family'?familyLabels[x]||x:x]);
 const appOpts=(e.applications||[]).map(x=>[x.id,x.label]);const standardOpts=e.standards.map(x=>[x.id,x.shortTitle]);
 const evidenceOpts=[['profile','Curated measure profile'],['studied','Appraised study record'],['mapped','Standards / guidance mapping'],['needs-appraisal','No profile or appraised study yet']];
 const all=filterMeasures(c.measures,filters),available=all.slice(0,filters.show);
 const chips=c.constructs.map(x=>'<button class="m-topic '+(x.id===filters.construct?'active':'')+'" data-construct="'+esc(x.id)+'" aria-pressed="'+(x.id===filters.construct)+'">'+esc(x.label)+'</button>').join('');
 const hasFilters=['q','construct','family','modality','timing','standard','application','evidence'].some(k=>filters[k]);
 root.innerHTML='<div class="m-shell">'+measurementNav('finder')+studySetBar(c)+
 '<div class="m-hero m-finder-hero"><div class="m-overline">MEASUREMENT ATLAS / DECISION-FIRST FINDER</div><h1>What do you need to learn?</h1><p>Start with the decision the evidence must support. Then choose a context, inspect candidate measures, and open a profile to judge administration, reliability, validity, prior use, and verification relevance.</p><div class="m-hero-actions"><a class="m-action" href="#/measures/guide">Start the guided walkthrough →</a><a class="m-action" href="#/measures/verification">Plan verification</a><a class="m-action" href="#/measures/psychometrics">Judge scientific quality</a></div></div>'+
 '<section class="m-decisions" aria-labelledby="m-decision-title"><div class="m-decision-intro"><div class="m-overline">START WITH THE OUTCOME</div><h2 id="m-decision-title">Choose the question closest to yours</h2><p>You can refine the evidence set afterward.</p></div><button data-preset="application" data-value="flight-deck-display"><strong>Can the pilot see and interpret it?</strong><span>Displays, alerts, luminance, contrast, legibility</span></button><button data-preset="application" data-value="pilot-workload"><strong>Is workload acceptable?</strong><span>Ratings, performance, attention, control, physiology</span></button><button data-preset="construct" data-value="situation-awareness"><strong>Do they understand what is happening?</strong><span>Situation awareness, comprehension, state knowledge</span></button><button data-preset="application" data-value="pilot-ergonomics"><strong>Does it fit the pilot?</strong><span>Reach, clearance, posture, force, comfort</span></button><button data-preset="application" data-value="hmd-hud-vision"><strong>Does the HMD or HUD support the task?</strong><span>Optics, tracking, vision, imagery, integration</span></button><a href="#/measures/standards"><strong>What supports verification?</strong><span>Browse measures through military and civil guidance</span></a></section>'+
 '<section class="m-filter-panel" aria-label="Find measurements"><div class="m-section-head"><div><h2>Search candidates</h2><p>Search across definitions, evidence, outcomes, standards, and signals.</p></div><button id="m-copy-link" class="m-copy">Copy this view</button></div><label class="m-field m-search"><span>What are you measuring?</span><input id="m-query" type="search" value="'+esc(filters.q)+'" placeholder="Try contrast, NASA-TLX, reach, alert comprehension…"/></label><details class="m-advanced" '+(hasFilters?'open':'')+'><summary>Advanced filters <span>context, standard, evidence, method, sensor, timing, construct</span></summary><div class="m-filters six">'+select('m-application','Aviation context',appOpts,filters.application)+select('m-standard','Standard / guidance',standardOpts,filters.standard)+select('m-evidence','Evidence record',evidenceOpts,filters.evidence)+select('m-family','Method',opts('family'),filters.family)+select('m-modality','Sensor or collection',opts('modality'),filters.modality)+select('m-timing','Timing',opts('timing'),filters.timing)+'</div><h3>Construct</h3><div class="m-topics"><button class="m-topic '+(!filters.construct?'active':'')+'" data-construct="" aria-pressed="'+(!filters.construct)+'">All constructs</button>'+chips+'</div><button class="m-clear" id="m-clear">Clear filters</button></details></section>'+
 '<section aria-label="Measurement results"><div class="m-results"><div><h2>'+(hasFilters?'Candidates for this question':'Suggested starting points')+'</h2><span aria-live="polite">'+(all.length?esc(all.length+' matches'):'No matches')+'</span></div></div><div class="m-grid">'+available.map(m=>{const maps=m._standardIds||[],evidenceLabels=[m._profile?'Administration guidance':'',m._studyCount?'Documented use':'',maps.length?'Verification relevance':''].filter(Boolean);const badges=evidenceLabels.length?evidenceLabels.map((x,i)=>statusPill(x,i===0?'good':i===2?'partial':'neutral')).join(''):statusPill('Basic definition','neutral');return '<a class="m-card" href="#/measures/'+encodeURIComponent(m.id)+'"><div class="m-card-top"><span class="m-card-tag">'+esc(familyLabels[m.family]||m.family)+' · '+esc(m.timing)+'</span><div class="m-card-status">'+badges+'</div></div><h2>'+esc(m.name)+'</h2><p>'+esc(m.definition)+'</p><div class="m-card-chips">'+m.constructs.slice(0,3).map(x=>'<span>'+esc(C(x,c.constructs))+'</span>').join('')+'</div>'+(maps.length?'<div class="m-standard-tags">'+maps.slice(0,2).map(x=>'<span>'+esc(standardName(x,e))+'</span>').join('')+'</div>':'')+'<span class="m-card-bottom">Decide whether this fits →</span></a>'}).join('')+'</div>'+(all.length>available.length?'<button class="m-more" id="m-more">Show more measures</button>':'')+(all.length?'<div class="m-note">Open a profile before selecting a measure. Published evidence may not transfer to your population, task, equipment, environment, scoring, or decision threshold.</div>':'<div class="m-empty-evidence"><strong>No measures match this combination.</strong><p>Remove one advanced filter or search for the outcome rather than an instrument name.</p></div>')+'</section></div>';
 const update=()=>{syncHash();list(root,c,d,e,{read:false})};
 root.querySelector('#m-query').addEventListener('input',evt=>{let pos=evt.target.selectionStart;filters.q=evt.target.value;filters.show=60;update();const el=root.querySelector('#m-query');el.focus();el.setSelectionRange(pos,pos)});
 for(const [id,key] of [['m-application','application'],['m-standard','standard'],['m-evidence','evidence'],['m-family','family'],['m-modality','modality'],['m-timing','timing']])root.querySelector('#'+id).addEventListener('change',evt=>{filters[key]=evt.target.value;filters.show=60;update()});
 root.querySelectorAll('[data-construct]').forEach(b=>b.addEventListener('click',()=>{filters.construct=b.dataset.construct;filters.show=60;update()}));
 root.querySelectorAll('[data-preset]').forEach(b=>b.addEventListener('click',()=>{Object.assign(filters,{...DEFAULT_FILTERS,[b.dataset.preset]:b.dataset.value});update()}));
 root.querySelector('#m-clear')?.addEventListener('click',()=>{Object.assign(filters,DEFAULT_FILTERS);update()});
 root.querySelector('#m-more')?.addEventListener('click',()=>{filters.show+=60;list(root,c,d,e,{read:false})});
 root.querySelector('#m-copy-link').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);root.querySelector('#m-copy-link').textContent='View copied';}catch{root.querySelector('#m-copy-link').textContent='Copy unavailable';}});
 root.querySelector('#m-study-set-clear')?.addEventListener('click',()=>{writeStudySet([]);list(root,c,d,e,{read:false})});
}

export async function mountMeasures(root,ctx={}){
 root.innerHTML='<div class="loading">Loading measurement evidence…</div>';
 try{
  let [c,d,e]=await load();if(!root.isConnected||!location.hash.startsWith('#/measures'))return;c=enrich(c,e);
  const issues=[...validateCatalog(c),...validateEvidence(c,e)];if(issues.length){root.innerHTML='<div class="m-note">Catalog validation failed: '+issues.length+' issue(s). Please inspect the source data.</div>';return;}
  const path=ctx.path||[];
  if(path[1]==='verification'){verificationPage(root,c,e,path[2]);return;}
  if(path[1]==='compare'){comparePage(root,c,e);return;}
  if(path[1]==='guide'){guidePage(root);return;}
  if(path[1]==='psychometrics'){psychometricsPage(root,e);return;}
  if(path[1]==='standards'){standardsPage(root,e,path[2]);return;}
  if(path[1]==='designs'){designList(root,c,d);return;}
  if(path[1]==='filter'){filters.construct=path[2]||'';history.replaceState(null,'','#/measures?construct='+encodeURIComponent(filters.construct));list(root,c,d,e);return;}
  const id=path[1];if(id){const m=c.measures.find(x=>x.id===id);if(m){detail(root,c,e,m);return;}root.innerHTML='<div class="m-note">Unknown measure. <a href="#/measures">Back to catalog</a></div>';return;}
  list(root,c,d,e);
 }catch(err){root.innerHTML='<div class="m-note">Measurement data unavailable: '+esc(err.message)+' . Rebuild with python platform/build.py.</div>'}
}
