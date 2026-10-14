// Construct-first measurement explorer. Static JSON, no external service.
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const C = (v,a) => a.find(x=>x.id===v)?.label || v;
let catalogPromise, designsPromise, evidencePromise;
const DEFAULT_FILTERS={q:'',construct:'',family:'',modality:'',timing:'',standard:'',application:'',show:60};
const filters={...DEFAULT_FILTERS};
const familyLabels={survey:'Questionnaire',behavior:'Behavioral',eye:'Eye tracking',stick:'HOTAS / inceptor',touch:'Touch',voice:'Voice',flight:'Flight telemetry',probe:'Scenario probe',physio:'Physiological',display:'Display / optical',ergonomic:'Ergonomic'};

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
 const issues=[],measureIds=new Set((c.measures||[]).map(x=>x.id)),standardIds=new Set((e.standards||[]).map(x=>x.id)),studyIds=new Set();
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
  if(!text)return true;
  const hay=[m.name,m.id,m.definition,m.operationalization,m.units,m.family,m.timing,(m.sourceIds||[]).join(' '),(m.constructs||[]).join(' '),m.validity?.limitations,(m._searchEvidence||'')].join(' ').toLocaleLowerCase();
  return text.split(/\s+/).every(w=>hay.includes(w));
 });
}

function enrich(c,e){
 const profiles=e.measureProfiles||{};
 for(const m of c.measures){
  const maps=(e.standardMappings||[]).filter(x=>(x.measureIds||[]).includes(m.id));
  const studies=(e.studies||[]).filter(x=>(x.measureIds||[]).includes(m.id));
  m._standardIds=[...new Set(maps.map(x=>x.standardId))];
  m._applications=[...new Set([...(m.applications||[]),...maps.flatMap(x=>x.applications||[]),...studies.flatMap(x=>x.applications||[])])];
  m._studyCount=studies.length;
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
 const rows=[['finder','#/measures','Finder'],['guide','#/measures/guide','Coworker guide'],['psychometrics','#/measures/psychometrics','Psychometrics'],['standards','#/measures/standards','Standards'],['designs','#/measures/designs','Study designs']];
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

function detail(root,c,e,m){
 const refs=m.sourceIds.map(id=>c.sources.find(s=>s.id===id)).filter(Boolean);
 const studies=(e.studies||[]).filter(x=>(x.measureIds||[]).includes(m.id));
 const maps=(e.standardMappings||[]).filter(x=>(x.measureIds||[]).includes(m.id));
 const p=m._profile||{};const coverage=profileCoverage(m,studies,maps);
 const reliability=p.reliabilityEvidence||[];const validity=p.validityEvidence||[];
 root.innerHTML='<div class="m-shell">'+measurementNav('finder')+'<div class="m-crumb"><a href="#/measures">← All measures</a> / '+esc(familyLabels[m.family]||m.family)+'</div><div class="m-hero m-profile-hero"><div><div class="m-overline">MEASUREMENT PROFILE · '+esc(m.id)+'</div><h1>'+esc(m.name)+'</h1><p>'+esc(m.definition)+'</p><div class="m-chips">'+m.constructs.map(x=>'<a class="m-chip" href="#/measures/filter/'+encodeURIComponent(x)+'">'+esc(C(x,c.constructs))+'</a>').join('')+'</div></div><div class="m-profile-state">'+statusPill(coverage.label,coverage.tone)+'<strong>'+studies.length+'</strong><span>curated study records</span><strong>'+maps.length+'</strong><span>standards mappings</span></div></div><div class="m-jump" aria-label="On this profile"><a href="#measure-use">Use</a><a href="#measure-reliability">Reliability</a><a href="#measure-validity">Validity</a><a href="#measure-factors">Factors/items</a><a href="#measure-studies">Studies</a><a href="#measure-standards">Standards</a></div><div class="m-layout"><main class="m-detail"><section id="measure-use"><h2>What it measures and how to use it</h2><p>'+esc(m.operationalization)+'</p><dl class="m-metadata">'+info('Units',m.units)+info('Collection time',m.timing)+info('Data modality',m.modality.join(', '))+info('Aggregation',m.aggregation)+info('Evidence level',m.evidenceStatus)+info('Applications',(m._applications||[]).join(', ')||'Context-specific')+'</dl>'+(p.administration?'<div class="m-callout"><h3>Administration and scoring</h3><p>'+esc(p.administration)+'</p>'+(p.licensing?'<p><strong>Access / licensing:</strong> '+esc(p.licensing)+'</p>':'')+'</div>':'<div class="m-empty-evidence"><strong>Administration record not yet curated.</strong><p>Use the cited original source and do not improvise item wording or scoring for a named instrument.</p></div>')+'</section><section id="measure-reliability"><h2>Reliability evidence</h2><p>'+esc(m.reliability.assessment)+'</p>'+(m.reliability.published?'<p class="m-fact"><strong>Catalog summary:</strong> '+esc(m.reliability.published)+'</p>':'<p class="m-warning">No transferable numerical reliability coefficient is supplied. Estimate dependability for the actual study protocol.</p>')+(reliability.length?reliability.map(x=>evidenceRow(x.label,x.result,x.source,'evidence')).join(''):'')+'</section><section id="measure-validity"><h2>Validity and interpretation</h2><p>'+esc(m.validity.basis)+'</p><p><strong>Important confound:</strong> '+esc(m.validity.limitations)+'</p>'+(validity.length?validity.map(x=>evidenceRow(x.label,x.result,x.source,x.kind||'evidence')).join(''):'')+'</section><section id="measure-factors"><h2>Factor and item evidence</h2><p>Factor results belong to a particular sample, item wording, response scale, estimator, and model. They are evidence about an interpretation—not permanent properties of a questionnaire.</p>'+factorTable(p.factorEvidence)+'</section><section id="measure-studies"><div class="m-section-head"><div><h2>Studies and documented uses</h2><p>Instrument-development, validation, and application records are separated so use alone is not mistaken for validation.</p></div>'+statusPill(studies.length+' curated',studies.length?'good':'neutral')+'</div>'+(studies.length?studies.map(studyCard).join(''):'<div class="m-empty-evidence"><strong>No study-use record has been appraised for this measure yet.</strong><p>The source anchors at right may establish identity or precedent, but the catalog does not convert them into an unverified study claim.</p></div>')+'</section><section id="measure-standards"><div class="m-section-head"><div><h2>Standards and verification use</h2><p>Mappings identify candidate evidence for a criterion. A score or test result does not by itself demonstrate compliance or airworthiness.</p></div>'+statusPill(maps.length+' mappings',maps.length?'partial':'neutral')+'</div>'+(maps.length?maps.map(x=>mappingCard(x,e)).join(''):'<div class="m-empty-evidence"><strong>No clause-level mapping is curated.</strong><p>Do not infer a military-standard relationship from a similar-sounding construct.</p></div>')+'</section><section><h2>Analysis and small samples</h2><p>'+esc(m.analysis)+'</p><p><strong>Small-N caveat:</strong> '+esc(m.smallN)+'</p><p>'+esc(m.context)+'</p></section></main><aside class="m-sources"><h2>Source anchors</h2><p>References support instrument identity, framework, or precedent. Each study and standards mapping above has its own locator and appraisal.</p>'+refs.map(x=>'<div class="m-source">'+link(x.url,x.title)+'<span>'+esc(x.authors)+' ('+esc(x.year)+')</span><small>'+esc(x.scope)+'</small></div>').join('')+'<div class="m-source m-research-gap"><strong>What still needs local evidence?</strong><small>'+esc((p.researchNeeds||['Representative-population reliability','Construct evidence in the intended task','Instrumentation and scoring verification','Decision threshold authority']).join(' · '))+'</small></div><a class="m-back" href="#/measures">← Return to results</a></aside></div></div>';
}

function designList(root,c,d){
 const lookup=new Map(d.designs.map(x=>[x.id,x]));const selected=decodeURIComponent(location.hash.split('/')[3]||'').split('?')[0];
 if(selected&&lookup.has(selected)){const x=lookup.get(selected);root.innerHTML='<div class="m-shell">'+measurementNav('designs')+'<div class="m-crumb"><a href="#/measures/designs">← Study designs</a></div><div class="m-hero"><div class="m-overline">QUANTITATIVE STUDY DESIGN</div><h1>'+esc(x.name)+'</h1><p>'+esc(x.description)+'</p></div><div class="m-detail"><h2>Primary outcomes</h2><p>'+esc(x.outcome)+'</p><h2>Design and counterbalancing</h2><p>'+esc(x.protocol)+'</p><h2>Validity threats</h2><p>'+esc(x.limitations)+'</p><h2>Small-N caution</h2><p>'+esc(x.smallN)+'</p><a href="#/measures/designs">View other designs →</a></div></div>';return;}
 root.innerHTML='<div class="m-shell">'+measurementNav('designs')+'<div class="m-crumb"><a href="#/measures">Measures</a> / Research designs</div><div class="m-hero"><div class="m-overline">MEASUREMENT PLANNING</div><h1>Study design patterns</h1><p>'+d.designs.length+' research patterns for comparing interfaces, testing comprehension, eliciting tradeoffs, and making bounded inferences with limited pilot populations.</p></div><div class="m-grid">'+d.designs.map(x=>'<a class="m-card" href="#/measures/designs/'+encodeURIComponent(x.id)+'"><span class="m-card-tag">METHOD</span><h2>'+esc(x.name)+'</h2><p>'+esc(x.outcome)+'</p><span class="m-card-bottom">Open method →</span></a>').join('')+'</div><div class="m-note">Design methods do not have generic psychometric reliability coefficients. Select by estimand and task, then plan precision using the design and feasible pilot sample.</div></div>';
}

function guidePage(root){
 root.innerHTML='<div class="m-shell">'+measurementNav('guide')+'<div class="m-hero"><div class="m-overline">10-MINUTE COWORKER WALKTHROUGH</div><h1>From question to defensible measure</h1><p>Use this script to demonstrate the finder without treating a familiar questionnaire, sensor, or military standard as automatic proof.</p><div class="m-stat"><span><strong>1</strong> define the claim</span><span><strong>2</strong> filter candidates</span><span><strong>3</strong> inspect evidence</span><span><strong>4</strong> plan verification</span></div></div><ol class="m-demo-steps"><li><div class="m-demo-number">01</div><div><h2>Start with the decision</h2><p>Say: “We need evidence that pilots can detect and correctly interpret this alert in bright and dark cockpit conditions.” Name the population, task, state, environment, and consequence of failure before selecting a metric.</p></div></li><li><div class="m-demo-number">02</div><div><h2>Open a useful preset</h2><p>Choose one of the prepared aviation searches below. Then narrow by construct, method, collection timing, or governing document.</p><div class="m-preset-grid"><a href="#/measures?application=flight-deck-display" class="m-preset"><strong>Flight-deck displays</strong><span>Luminance, contrast, legibility, alerts</span></a><a href="#/measures?application=pilot-workload" class="m-preset"><strong>Pilot workload</strong><span>Ratings, performance, eye, control, physiology</span></a><a href="#/measures?application=pilot-ergonomics" class="m-preset"><strong>Pilot ergonomics</strong><span>Reach, clearance, strength, posture, comfort</span></a><a href="#/measures?standard=mil-std-1472h" class="m-preset"><strong>MIL-STD-1472H</strong><span>Candidate evidence by mapped criterion</span></a></div></div></li><li><div class="m-demo-number">03</div><div><h2>Open one profile</h2><p>Walk through operational definition, reliability, validity, factor/item evidence, documented study uses, and standard mappings. Point out the “what still needs local evidence” box.</p></div></li><li><div class="m-demo-number">04</div><div><h2>Build a converging set</h2><p>For a workload claim, combine subjective report with task performance and mechanism-relevant behavioral or physiological evidence. Disagreement is diagnostic; it should not be averaged away automatically.</p></div></li><li><div class="m-demo-number">05</div><div><h2>Share the filtered view</h2><p>Filters are written into the page address. Copy the browser URL so your coworker opens the same candidate set.</p><a class="m-action dark" href="#/measures?application=flight-deck-display">Start the live demonstration →</a></div></li></ol><div class="m-boundary"><strong>Say this out loud:</strong> “The finder helps us choose and document evidence. It does not certify the design, transfer published coefficients to our sample, or make a handbook criterion contractually binding.”</div></div>';
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
 for(const k of ['q','construct','family','modality','timing','standard','application'])filters[k]=params.get(k)||'';
 filters.show=60;
}
function syncHash(){
 const p=new URLSearchParams();for(const k of ['q','construct','family','modality','timing','standard','application'])if(filters[k])p.set(k,filters[k]);
 const next='#/measures'+(p.size?'?'+p.toString():'');history.replaceState(null,'',next);
}

function list(root,c,d,e,{read=true}={}){
 if(read)readHashFilters();
 const opts=k=>[...new Set(c.measures.flatMap(m=>k==='modality'?m.modality:[m[k]]).filter(Boolean))].sort().map(x=>[x,k==='family'?familyLabels[x]||x:x]);
 const appOpts=(e.applications||[]).map(x=>[x.id,x.label]);const standardOpts=e.standards.map(x=>[x.id,x.shortTitle]);
 const all=filterMeasures(c.measures,filters),available=all.slice(0,filters.show);
 const chips=c.constructs.map(x=>{let count=c.measures.filter(m=>m.constructs.includes(x.id)).length;return '<button class="m-topic '+(x.id===filters.construct?'active':'')+'" data-construct="'+esc(x.id)+'" aria-pressed="'+(x.id===filters.construct)+'">'+esc(x.label)+' <small>'+count+'</small></button>'}).join('');
 root.innerHTML='<div class="m-shell">'+measurementNav('finder')+'<div class="m-hero"><div class="m-overline">HUMAN ENGINEERING / EVIDENCE-AWARE FINDER</div><h1>Measurement Atlas</h1><p>Find aviation, usability, workload, display, vision, performance, and ergonomic measures; then inspect how each candidate has been defined, studied, and mapped to verification guidance.</p><div class="m-stat"><span><strong>'+c.measures.length+'</strong> measures</span><span><strong>'+c.constructs.length+'</strong> constructs</span><span><strong>'+e.studies.length+'</strong> appraised study records</span><span><strong>'+e.standards.length+'</strong> standards / guidance sources</span></div><div class="m-hero-actions"><a class="m-action" href="#/measures/guide">Show a coworker in 10 minutes →</a><a class="m-action" href="#/measures/psychometrics">Open psychometrics guide</a></div></div><section class="m-quick" aria-label="Quick aviation searches"><div><span>QUICK STARTS</span><strong>Open a useful evidence set</strong></div><button data-preset="application" data-value="flight-deck-display">Flight-deck displays</button><button data-preset="application" data-value="hmd-hud-vision">HMD / HUD / vision</button><button data-preset="application" data-value="pilot-workload">Pilot workload</button><button data-preset="application" data-value="pilot-ergonomics">Pilot ergonomics</button><button data-preset="standard" data-value="mil-std-1472h">MIL-STD-1472H</button><button data-preset="standard" data-value="mil-hdbk-516d">MIL-HDBK-516D</button></section><section class="m-filter-panel" aria-label="Filter measurements"><div class="m-section-head"><div><h2>Find measurements</h2><p>Filters are shareable: copy this page address after narrowing the results.</p></div><a href="#/measures/standards">Browse by standard →</a></div><label class="m-field m-search"><span>Search names, definitions, evidence, standards, outcomes, or signals</span><input id="m-query" type="search" value="'+esc(filters.q)+'" placeholder="e.g., contrast, NASA-TLX, reach, 9.2.1.1"/></label><div class="m-filters five">'+select('m-application','Aviation context',appOpts,filters.application)+select('m-standard','Standard / guidance',standardOpts,filters.standard)+select('m-family','Method',opts('family'),filters.family)+select('m-modality','Sensor or collection',opts('modality'),filters.modality)+select('m-timing','Timing',opts('timing'),filters.timing)+'</div><h3>Browse by construct</h3><div class="m-topics"><button class="m-topic '+(!filters.construct?'active':'')+'" data-construct="" aria-pressed="'+(!filters.construct)+'">All constructs</button>'+chips+'</div><button class="m-clear" id="m-clear">Clear filters</button></section><section aria-label="Measurement results"><div class="m-results"><div><h2>Matching measures</h2><span>'+all.length+' results · showing '+available.length+'</span></div><button id="m-copy-link" class="m-copy">Copy filtered link</button></div><div class="m-grid">'+available.map(m=>{const maps=(m._standardIds||[]),studyCount=m._studyCount||0;return '<a class="m-card" href="#/measures/'+encodeURIComponent(m.id)+'"><div class="m-card-top"><span class="m-card-tag">'+esc(familyLabels[m.family]||m.family)+' · '+esc(m.timing)+'</span>'+statusPill(studyCount?studyCount+' studies':'candidate',studyCount?'good':'neutral')+'</div><h2>'+esc(m.name)+'</h2><p>'+esc(m.definition)+'</p><div class="m-card-chips">'+m.constructs.slice(0,3).map(x=>'<span>'+esc(C(x,c.constructs))+'</span>').join('')+'</div>'+(maps.length?'<div class="m-standard-tags">'+maps.slice(0,2).map(x=>'<span>'+esc(standardName(x,e))+'</span>').join('')+'</div>':'')+'<span class="m-card-bottom">Evidence · studies · psychometrics · standards →</span></a>'}).join('')+'</div>'+(all.length>available.length?'<button class="m-more" id="m-more">Show more ('+(all.length-available.length)+' remaining)</button>':'')+'</section><div class="m-note">Named instruments require their original instructions and permissions. Telemetry reliability is scenario-specific. Browser or remote image tests do not establish physical display performance or certification compliance.</div></div>';
 const update=()=>{syncHash();list(root,c,d,e,{read:false})};
 root.querySelector('#m-query').addEventListener('input',evt=>{let pos=evt.target.selectionStart;filters.q=evt.target.value;filters.show=60;update();const el=root.querySelector('#m-query');el.focus();el.setSelectionRange(pos,pos)});
 for(const [id,key] of [['m-application','application'],['m-standard','standard'],['m-family','family'],['m-modality','modality'],['m-timing','timing']])root.querySelector('#'+id).addEventListener('change',evt=>{filters[key]=evt.target.value;filters.show=60;update()});
 root.querySelectorAll('[data-construct]').forEach(b=>b.addEventListener('click',()=>{filters.construct=b.dataset.construct;filters.show=60;update()}));
 root.querySelectorAll('[data-preset]').forEach(b=>b.addEventListener('click',()=>{Object.assign(filters,{...DEFAULT_FILTERS,[b.dataset.preset]:b.dataset.value});update()}));
 root.querySelector('#m-clear').addEventListener('click',()=>{Object.assign(filters,DEFAULT_FILTERS);update()});
 root.querySelector('#m-more')?.addEventListener('click',()=>{filters.show+=60;list(root,c,d,e,{read:false})});
 root.querySelector('#m-copy-link').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);root.querySelector('#m-copy-link').textContent='Link copied';}catch{root.querySelector('#m-copy-link').textContent='Copy unavailable';}});
}

export async function mountMeasures(root,ctx={}){
 root.innerHTML='<div class="loading">Loading measurement evidence…</div>';
 try{
  let [c,d,e]=await load();if(!root.isConnected||!location.hash.startsWith('#/measures'))return;c=enrich(c,e);
  const issues=[...validateCatalog(c),...validateEvidence(c,e)];if(issues.length){root.innerHTML='<div class="m-note">Catalog validation failed: '+issues.length+' issue(s). Please inspect the source data.</div>';return;}
  const path=ctx.path||[];
  if(path[1]==='guide'){guidePage(root);return;}
  if(path[1]==='psychometrics'){psychometricsPage(root,e);return;}
  if(path[1]==='standards'){standardsPage(root,e,path[2]);return;}
  if(path[1]==='designs'){designList(root,c,d);return;}
  if(path[1]==='filter'){filters.construct=path[2]||'';history.replaceState(null,'','#/measures?construct='+encodeURIComponent(filters.construct));list(root,c,d,e);return;}
  const id=path[1];if(id){const m=c.measures.find(x=>x.id===id);if(m){detail(root,c,e,m);return;}root.innerHTML='<div class="m-note">Unknown measure. <a href="#/measures">Back to catalog</a></div>';return;}
  list(root,c,d,e);
 }catch(err){root.innerHTML='<div class="m-note">Measurement data unavailable: '+esc(err.message)+' . Rebuild with python platform/build.py.</div>'}
}
