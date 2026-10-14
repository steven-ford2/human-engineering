// Construct-first measurement explorer. Static JSON, no external service.
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const C = (v,a) => a.find(x=>x.id===v)?.label || v;
let catalogPromise, designsPromise;
const filters = {q:'',construct:'',family:'',modality:'',timing:'',show:60};
const familyLabels={survey:'Questionnaire',behavior:'Behavioral',eye:'Eye tracking',stick:'HOTAS / inceptor',touch:'Touch',voice:'Voice',flight:'Flight telemetry',probe:'Scenario probe',physio:'Physiological'};
function load(){
  if(!catalogPromise) catalogPromise=fetch('./measurement-data/measures.json').then(r=>{if(!r.ok)throw Error('Measures unavailable ('+r.status+')');return r.json()});
  if(!designsPromise) designsPromise=fetch('./measurement-data/study-designs.json').then(r=>{if(!r.ok)throw Error('Designs unavailable ('+r.status+')');return r.json()});
  return Promise.all([catalogPromise,designsPromise]);
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
export function filterMeasures(measures, f={}){
 let text=String(f.q||'').toLocaleLowerCase().trim();
 return measures.filter(m=>{
 if(f.construct&&!m.constructs.includes(f.construct))return false;
 if(f.family&&m.family!==f.family)return false;
 if(f.modality&&!m.modality.includes(f.modality))return false;
 if(f.timing&&!m.timing.includes(f.timing))return false;
 if(!text)return true;
 const hay=[m.name,m.id,m.definition,m.operationalization,m.units,m.family,m.timing,m.sourceIds.join(' '),m.constructs.join(' '),m.validity.limitations].join(' ').toLocaleLowerCase();
 return text.split(/\s+/).every(w=>hay.includes(w));
 });
}
const select=(id,label,opts,selected)=>'<label class="m-field"><span>'+esc(label)+'</span><select id="'+id+'"><option value="">All '+esc(label.toLowerCase())+'</option>'+opts.map(([v,t])=>'<option value="'+esc(v)+'" '+(v===selected?'selected':'')+'>'+esc(t)+'</option>').join('')+'</select></label>';
const info=(head,value)=>'<div class="m-meta"><dt>'+esc(head)+'</dt><dd>'+esc(value)+'</dd></div>';
function detail(root,c,m){
 const refs=m.sourceIds.map(id=>c.sources.find(s=>s.id===id)).filter(Boolean);
 root.innerHTML='<div class="m-shell"><div class="m-crumb"><a href="#/measures">← All measures</a> / '+esc(familyLabels[m.family]||m.family)+'</div><div class="m-hero"><div class="m-overline">MEASUREMENT PROFILE · '+esc(m.id)+'</div><h1>'+esc(m.name)+'</h1><p>'+esc(m.definition)+'</p><div class="m-chips">'+m.constructs.map(x=>'<a class="m-chip" href="#/measures/filter/'+encodeURIComponent(x)+'">'+esc(C(x,c.constructs))+'</a>').join('')+'</div></div><div class="m-layout"><main class="m-detail"><h2>Operational definition</h2><p>'+esc(m.operationalization)+'</p><dl class="m-metadata">'+info('Units',m.units)+info('Collection time',m.timing)+info('Data modality',m.modality.join(', '))+info('Aggregation',m.aggregation)+info('Evidence level',m.evidenceStatus)+'</dl><h2>Reliability</h2><p>'+esc(m.reliability.assessment)+'</p>'+(m.reliability.published?'<p class="m-fact"><strong>Published instrument evidence:</strong> '+esc(m.reliability.published)+'</p>':'<p class="m-warning">No transferable numerical reliability coefficient supplied. Estimate with your study protocol.</p>')+'<h2>Validity and interpretation</h2><p>'+esc(m.validity.basis)+'</p><p><strong>Important confound:</strong> '+esc(m.validity.limitations)+'</p><h2>Analysis and small samples</h2><p>'+esc(m.analysis)+'</p><p><strong>Small-N caveat:</strong> '+esc(m.smallN)+'</p><p>'+esc(m.context)+'</p></main><aside class="m-sources"><h2>Source anchors</h2><p>These references support instrument identity, domain framework or metric precedent; they are not a claim of individual validation in all contexts.</p>'+refs.map(x=>'<div class="m-source"><a href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer">'+esc(x.title)+' ↗</a><span>'+esc(x.authors)+' ('+esc(x.year)+')</span><small>'+esc(x.scope)+'</small></div>').join('')+'<a class="m-back" href="#/measures">← Return to results</a></aside></div></div>';
}
function designList(root,c,d){
 const lookup=new Map(d.designs.map(x=>[x.id,x]));const selected=decodeURIComponent(location.hash.split('/')[3]||'');
 if(selected&&lookup.has(selected)){
 const x=lookup.get(selected);
 root.innerHTML='<div class="m-shell"><div class="m-crumb"><a href="#/measures/designs">← Study designs</a></div><div class="m-hero"><div class="m-overline">QUANTITATIVE STUDY DESIGN</div><h1>'+esc(x.name)+'</h1><p>'+esc(x.description)+'</p></div><div class="m-detail"><h2>Primary outcomes</h2><p>'+esc(x.outcome)+'</p><h2>Design and counterbalancing</h2><p>'+esc(x.protocol)+'</p><h2>Validity threats</h2><p>'+esc(x.limitations)+'</p><h2>Small-N caution</h2><p>'+esc(x.smallN)+'</p><a href="#/measures/designs">View other designs →</a></div></div>';return;
 }
 root.innerHTML='<div class="m-shell"><div class="m-crumb"><a href="#/measures">Measures</a> / Research designs</div><div class="m-hero"><div class="m-overline">QUANTITATIVE REMOTE AND SMALL-N UX</div><h1>Study design patterns</h1><p>'+d.designs.length+' research patterns for comparing interfaces, testing comprehension, eliciting tradeoffs and making honest inferences with limited pilot populations.</p><a href="#/measures" class="m-back">← Measurement catalog</a></div><div class="m-grid">'+d.designs.map(x=>'<a class="m-card" href="#/measures/designs/'+encodeURIComponent(x.id)+'"><span class="m-card-tag">METHOD</span><h2>'+esc(x.name)+'</h2><p>'+esc(x.outcome)+'</p><span class="m-card-bottom">Open method →</span></a>').join('')+'</div><div class="m-note">Design methods do not have generic psychometric reliability coefficients. Select by estimand and task, then power/precision-plan based on design and feasible pilot sample.</div></div>';
}
function list(root,c,d){
 const q=new URLSearchParams(location.hash.split('?')[1]||'');if(q.has('construct'))filters.construct=q.get('construct');
 const opts=k=>[...new Set(c.measures.flatMap(m=>k==='modality'?m.modality:[m[k]]))].sort().map(x=>[x,k==='family'?familyLabels[x]||x:x]);
 const all=filterMeasures(c.measures,filters), available=all.slice(0,filters.show);
 const chips=c.constructs.map(x=>{let count=c.measures.filter(m=>m.constructs.includes(x.id)).length;return '<button class="m-topic '+(x.id===filters.construct?'active':'')+'" data-construct="'+esc(x.id)+'" aria-pressed="'+(x.id===filters.construct)+'">'+esc(x.label)+' <small>'+count+'</small></button>'}).join('');
 root.innerHTML='<div class="m-shell"><div class="m-hero"><div class="m-overline">HUMAN ENGINEERING / CONSTRUCT-FIRST MEASUREMENT</div><h1>Measurement Atlas</h1><p>Browse evidence-tagged usability, workload, situation awareness, comprehension, perception, interaction, and task-performance measures by construct, collection method, and timing. These are research candidates—not universal validated proxies.</p><div class="m-stat"><span><strong>'+c.measures.length+'</strong> measures</span><span><strong>'+c.constructs.length+'</strong> constructs</span><span><strong>'+c.sources.length+'</strong> sources</span><span><strong>'+d.designs.length+'</strong> study designs</span></div><a class="m-action" href="#/measures/designs">Explore survey and experimental designs →</a></div><section class="m-filter-panel" aria-label="Filter measurements"><h2>Find measurements</h2><label class="m-field m-search"><span>Search terms, definitions, outcomes, or signals</span><input id="m-query" type="search" value="'+esc(filters.q)+'" placeholder="e.g., recovery time, error, TLX, comprehension"/></label><div class="m-filters">'+select('m-family','Type',opts('family'),filters.family)+select('m-modality','Sensor or collection method',opts('modality'),filters.modality)+select('m-timing','Timing',opts('timing'),filters.timing)+'</div><h3>Browse by construct</h3><div class="m-topics"><button class="m-topic '+(!filters.construct?'active':'')+'" data-construct="" aria-pressed="'+(!filters.construct)+'">All constructs</button>'+chips+'</div><button class="m-clear" id="m-clear">Clear filters</button></section><section aria-label="Measurement results"><div class="m-results"><h2>Matching measures</h2><span>'+all.length+' results · showing '+available.length+'</span></div><div class="m-grid">'+available.map(m=>'<a class="m-card" href="#/measures/'+encodeURIComponent(m.id)+'"><span class="m-card-tag">'+esc(familyLabels[m.family]||m.family)+' · '+esc(m.timing)+'</span><h2>'+esc(m.name)+'</h2><p>'+esc(m.definition)+'</p><div class="m-card-chips">'+m.constructs.slice(0,3).map(x=>'<span>'+esc(C(x,c.constructs))+'</span>').join('')+'</div><span class="m-card-bottom">Definition · reliability · validity · sources →</span></a>').join('')+'</div>'+(all.length>available.length?'<button class="m-more" id="m-more">Show more ('+(all.length-available.length)+' remaining)</button>':'')+'</section><div class="m-note">For normalized instruments, consult the original manual. Telemetry-derived reliability is scenario-specific. Remote image tests do not establish physical display legibility or operational certification.</div></div>';
 const update=()=>list(root,c,d);
 root.querySelector('#m-query').addEventListener('input',e=>{let pos=e.target.selectionStart;filters.q=e.target.value;filters.show=60;update();const el=root.querySelector('#m-query');el.focus();el.setSelectionRange(pos,pos)});
 for(const [id,key] of [['m-family','family'],['m-modality','modality'],['m-timing','timing']])root.querySelector('#'+id).addEventListener('change',e=>{filters[key]=e.target.value;filters.show=60;update()});
 root.querySelectorAll('[data-construct]').forEach(b=>b.addEventListener('click',()=>{filters.construct=b.dataset.construct;filters.show=60;update()}));
 root.querySelector('#m-clear').addEventListener('click',()=>{Object.assign(filters,{q:'',construct:'',family:'',modality:'',timing:'',show:60});update()});
 root.querySelector('#m-more')?.addEventListener('click',()=>{filters.show+=60;update()});
}
export async function mountMeasures(root,ctx={}){
 root.innerHTML='<div class="loading">Loading measurement catalog…</div>';
 try{
  const [c,d]=await load();if(!root.isConnected||!location.hash.startsWith('#/measures'))return;
  const issues=validateCatalog(c);if(issues.length){root.innerHTML='<div class="m-note">Catalog validation failed: '+issues.length+' issue(s). Please inspect the source data.</div>';return;}
  const path=ctx.path||[];if(path[1]==='designs'){designList(root,c,d);return;}
  if(path[1]==='filter'){filters.construct=path[2]||'';filters.show=60;list(root,c,d);return;}const id=path[1];if(id){const m=c.measures.find(x=>x.id===id);if(m){detail(root,c,m);return;}root.innerHTML='<div class="m-note">Unknown measure. <a href="#/measures">Back to catalog</a></div>';return}
  list(root,c,d);
 }catch(e){root.innerHTML='<div class="m-note">Measurement data unavailable: '+esc(e.message)+' . Rebuild with python platform/build.py.</div>'}
}
