#!/usr/bin/env python3
"""Build the Human Engineering workspace from registered research domains.

No network calls and no publishing: render registered Markdown, CSV and JSON into a local reader.
Requires markdown-it-py and bleach. Run from the repository root or with --root.
"""
from __future__ import annotations
import argparse, hashlib, html, json, re, shutil
from collections import Counter, defaultdict
from datetime import date
from pathlib import Path
from urllib.parse import quote
import bleach
from markdown_it import MarkdownIt
from reference_library import load_libraries, compile_reference, copy_assets, strip_frontmatter

ROOT = Path(__file__).resolve().parents[1]
CANDIDATE = []
# Domain registry is read from workspace.json at build time.
EXCLUDED = {'AGENTS.md','PLANS.md','LICENSE.md'}
MAX_DOC_SIZE = 550_000
MD = MarkdownIt('default', {'html':False, 'linkify':False, 'typographer':True}).enable(['table','strikethrough'])
TAGS = set(bleach.sanitizer.ALLOWED_TAGS) | {'h1','h2','h3','h4','h5','h6','p','pre','code','blockquote','hr','table','thead','tbody','tr','th','td','img','details','summary','div','span','input','sup','sub','del'}
ATTRS={'a':['href','title'],'img':['src','alt','title','loading'],'th':['scope'],'td':['colspan','rowspan'],'div':['class'],'span':['class'],'code':['class'],'h1':['id'],'h2':['id'],'h3':['id'],'h4':['id'],'h5':['id'],'h6':['id'],'input':['type','checked','disabled']}
CONCEPTS = [
 ('human-factors','Human factors engineering','Design and evaluation of systems with respect to human capabilities, limitations, work, and context.',['human factors','human-systems','human systems engineering']),
 ('task-analysis','Task analysis','Systematic representation of goals, work, decisions, constraints, information needs, and actions.',['task analysis','mission task analysis','task decomposition']),
 ('cognitive-task-analysis','Cognitive task analysis','Methods for eliciting and representing expert knowledge, cues, strategies, and difficult decisions.',['cognitive task analysis','CTA','critical decision method']),
 ('hierarchical-task-analysis','Hierarchical task analysis','Goal decomposition with plans and conditions that explain how subtasks are organized.',['hierarchical task analysis','HTA','goal plan']),
 ('cognitive-work-analysis','Cognitive work analysis','Constraint-based analysis of work domains, control tasks, strategies, social organization, and worker competencies.',['cognitive work analysis','CWA','work domain analysis']),
 ('scenarios','Scenario coverage','Explicit coverage of operating contexts, actors, triggers, end states, hazards, and variability.',['scenario coverage','scenario selection','mission envelope matrix']),
 ('decisions','Operational decisions','Choices, cues, alternatives, uncertainty, and time pressure embedded in work.',['decision requirements','decision point','decision ladder','naturalistic decision making']),
 ('information-needs','Information needs','Data and meaning required to perceive, understand, project, decide, and coordinate.',['information need','information requirements','goal directed task analysis','GDTA']),
 ('control-needs','Control and feedback needs','Operator intent, authority, state transitions, feedback, and recovery independent of a specific widget.',['control need','control requirements','feedback requirement']),
 ('requirements','Human-system requirements','Traceable, testable claims derived from work, evidence, and explicitly bounded assumptions.',['human-system requirement','human factors requirement','requirement derivation']),
 ('traceability','Traceability','Explicit links from scenario and task evidence through needs, requirements, tests, and results.',['traceability','trace matrix','evidence chain']),
 ('verification-validation','Verification and validation','Evidence that specified requirements are satisfied and intended work is supported in representative use.',['verification','validation','operational validation']),
 ('usability','Usability','Effectiveness, efficiency, and experience interpreted in a specified context of use.',['usability','system usability scale','SUS','user experience']),
 ('workload','Mental workload','Task demands and human resource allocation assessed with construct-appropriate, context-dependent evidence.',['workload','mental workload','task load','NASA-TLX']),
 ('situation-awareness','Situation awareness','Perception, understanding, and projection of operationally relevant states.',['situational awareness','situation awareness','SAGAT']),
 ('attention','Attention and visual sampling','Selection, allocation, and shifting of perceptual resources across competing tasks and cues.',['visual attention','attention allocation','eye tracking','scan pattern']),
 ('performance','Task performance','Observable accuracy, timing, tolerance, outcome, error, and recovery behavior tied to defined work.',['task performance','completion time','error rate','recovery time']),
 ('construct-validity','Construct validity','The degree to which evidence supports the interpretation assigned to a measure in a particular use.',['construct validity','convergent validity','discriminant validity','criterion validity']),
 ('reliability','Reliability','Consistency or dependability of observations, ratings, instruments, or derived measures under specified conditions.',['reliability','inter-rater reliability','test-retest','internal consistency']),
 ('study-design','Study design','The relation among estimand, sample, manipulation, measurement, analysis, and credible inference.',['study design','experimental design','counterbalancing','within-subject']),
 ('evidence','Evidence and provenance','Source identity, access status, locator, appraisal, and the boundary between observation and inference.',['evidence','provenance','source register','appraisal']),
]

def slug(s):
    s=re.sub(r'[^a-z0-9]+','-',s.lower().strip()).strip('-')
    return s[:75] or 'section'

def textify(s):
    s=re.sub(r'!\[([^]]*)\]\([^)]*\)',r'\1',s)
    s=re.sub(r'\[([^]]+)\]\([^)]*\)',r'\1',s)
    s=re.sub(r'[`*_>#|{}~]+',' ',s)
    return re.sub(r'\s+',' ',s).strip()

def heading_and_html(raw):
    tokens=MD.parse(raw)
    title=None; h=[]; used=Counter()
    for i,t in enumerate(tokens[:-1]):
        if t.type=='heading_open' and tokens[i+1].type=='inline':
            name=tokens[i+1].content.strip()
            if not name:continue
            if title is None and t.tag=='h1':title=name
            ident=slug(name);used[ident]+=1
            if used[ident]>1:ident+=f'-{used[ident]}'
            t.attrSet('id',ident)
            h.append({'depth':int(t.tag[1]),'title':textify(name),'id':ident})
    rendered=MD.renderer.render(tokens,MD.options,{})
    # The reading shell already displays the canonical title in a semantic h1.
    # Avoid repeating the same title as the first visible article heading.
    rendered=re.sub(r'^\s*<h1(?:\s+[^>]*)?>.*?</h1>\s*', '', rendered, count=1, flags=re.S)
    return title,h,bleach.clean(rendered,tags=TAGS,attributes=ATTRS,protocols=['http','https','mailto'],strip=True)

def get_questions(raw):
    cards=[]
    for mt in re.finditer(r'(?im)^\*\*Recall:\*\*\s*(.*?)(?=^\s*##\s|\Z)',raw,re.S|re.M):
        block=mt.group(1)
        found=re.findall(r'(?m)^\s*\d+[.)]\s+(.+?)(?=\n\s*\d+[.)]|\Z)',block,re.S)
        if not found and block.strip():found=[block.strip()]
        for val in found[:8]:
            q=textify(val);q=q.split('**Read:**')[0].strip()
            if 10<=len(q)<=350:cards.append(q)
    for mt in re.finditer(r'(?im)^#{2,4}\s+(?:retrieval|review questions|recall questions|check your understanding)[^\n]*\n(.*?)(?=^\s*##\s|\Z)',raw,re.S|re.M):
        found=re.findall(r'(?m)^\s*\d+[.)]\s+(.+?)(?=\n\s*\d+[.)]|\Z)',mt.group(1),re.S)
        for val in found[:6]:
            q=textify(val)
            if 10<=len(q)<=350:cards.append(q)
    return list(dict.fromkeys(cards))[:12]

def raw_links(raw):
    return re.findall(r'\]\(([^)\s#]+)(?:#[^)]*)?\)',raw)

def build(root:Path,out:Path,profile:str='local'):
    if profile not in {'local','pages'}: raise ValueError('Unknown build profile')
    out.mkdir(parents=True,exist_ok=True)
    pages=out/'pages';pages.mkdir(exist_ok=True)
    courses=[]; docs=[]; docs_by_path={}; questions=[]; warnings=[]; index=[]
    for i,name in enumerate(CANDIDATE,1):
        path=root/'courses'/name
        if not path.is_dir():continue
        intro=path/'README.md'
        if not intro.is_file(): continue
        title=textify(heading_and_html(intro.read_text(encoding='utf-8'))[0] or name.replace('-',' ').title())
        courses.append({'id':name,'number':f'{i:02}','title':title,'source':str(path.relative_to(root)),'group':'fighter'})
    registry_file = root/'workspace.json'
    if not registry_file.is_file():raise SystemExit('Missing workspace.json domain registry.')
    registry = json.loads(registry_file.read_text(encoding='utf-8'))
    # Pages only includes explicit editorially selected material; never publish the private PDF corpus.
    references, external_files = load_libraries(root, registry) if profile == 'local' else ({}, {})
    domain_configs = {d['path']: d for d in registry['domains']}
    EXTRA = [(d['path'],str(d['number']),d['title']) for d in registry['domains']]
    for name,num,title in EXTRA:
        path=root/name
        if path.is_dir() and (path/'README.md').is_file():
            courses.append({'id':name.replace('/','-'),'number':num,'title':title,'source':name,'group':'specialty'})
    for course in courses:
        base=root/course['source']
        course['docs']=[]
        config = domain_configs.get(course['source'], {})
        allowed = config.get('pagesAllowedPaths') if profile == 'pages' else None
        for file in sorted(p for p in base.rglob('*') if p.is_file() and p.suffix.lower() in {'.md','.csv','.json'}):
            relative = file.relative_to(base).as_posix()
            if allowed is not None and not any(relative == prefix.rstrip('/') or (prefix.endswith('/') and relative.startswith(prefix)) for prefix in allowed):continue
            if any(file.relative_to(base).as_posix().startswith(p.rstrip('/') + '/') for p in domain_configs.get(course['source'], {}).get('excludedPaths', [])):continue
            if file.name in EXCLUDED or any(x in file.parts for x in ('node_modules','dist','.git')):continue
            path=file.relative_to(root).as_posix()
            key='D'+hashlib.sha256(path.encode()).hexdigest()[:13]
            raw=file.read_text(encoding='utf-8',errors='replace')
            reference = references.get(path)
            metadata = None
            search_text = None
            if reference:
                raw, metadata, search_text = compile_reference(root, out, file, key, reference)
            raw = strip_frontmatter(raw)
            download_url = None
            if not reference and file.stat().st_size>MAX_DOC_SIZE:
                destination = out / path
                destination.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(file, destination)
                download_url = './' + quote(path, safe='/')
                raw = f'# {file.stem.replace("_", " ").replace("-", " ").title()}\n\nThis large source data file is available as a local download.\n\n[Open complete source file]({download_url})\n'
            if file.suffix.lower()=='.md' or download_url:
                heading, headings, rendered=heading_and_html(raw)
            else:
                heading=file.stem.replace('_',' ').replace('-',' ').title()
                headings=[]
                rendered='<pre><code>'+html.escape(raw)+'</code></pre>'
            name=file.name
            if reference:kind='paper'
            elif file.suffix.lower() in {'.csv','.json'}:kind='data'
            elif name=='README.md':kind='overview'
            elif 'micro-study-sheets' in file.parts:kind='micro-study'
            elif 'cases' in file.parts:kind='case'
            elif 'labs' in file.parts:kind='lab'
            elif 'assessments' in file.parts or 'exam' in name:kind='assessment'
            elif 'lessons' in file.parts:kind='lesson'
            elif 'modules' in file.parts:kind='module'
            elif 'syllabus' in name.lower() or 'course-design' in name.lower():kind='syllabus'
            else:kind='reference'
            text=textify(raw)
            title=textify(heading or file.stem.replace('-',' ').title())[:180]
            intro=text[:220]
            if reference:
                title=metadata['title']
                intro=' · '.join(str(metadata[k]) for k in ('year','category','publication_type') if metadata[k]) + ' · ' + metadata['status']
            record={'id':key,'course':course['id'],'path':path,'title':title,'kind':kind,'intro':intro,'sections':headings,'length':len(text),'sourceUrl':'https://github.com/steven-ford2/human-engineering/blob/main/'+quote(path,safe='/')}
            if metadata:
                record['reference']=metadata
            if download_url:
                record['downloadUrl']=download_url
            docs.append(record);docs_by_path[path]=record;course['docs'].append(key)
            index.append({'id':key,'text':(title+' '+intro+' '+(search_text if reference else textify(file.read_text(encoding='utf-8',errors='replace'))[:9000])).lower()})
            q=[] if reference else get_questions(raw)
            for j,question in enumerate(q):questions.append({'id':f'{key}-Q{j+1}','docId':key,'course':course['id'],'question':question})
            # Store sanitized rendered HTML and raw-text for section anchor browsing.
            (pages/f'{key}.json').write_text(json.dumps({'id':key,'html':rendered,'path':path,'title':title,'links':raw_links(raw),'sections':headings},ensure_ascii=False),encoding='utf-8')
    for course in courses:
        course['count']=len(course['docs'])
        course.pop('docs')
    if not docs:raise SystemExit('No documents found in approved course directories. Refusing empty deployment.')
    image_count = copy_assets(root, out, references)
    concepts=[]; titles={r['id']:(r['title']+' '+r['intro']).lower() for r in docs}
    for cid,title,definition,terms in CONCEPTS:
        matches=[]
        for row in docs:
            m=titles[row['id']]
            if any(re.search(r'(?<!\w)'+re.escape(term.lower())+r'(?!\w)',m) for term in terms):matches.append(row['id'])
        concepts.append({'id':cid,'title':title,'description':definition,'aliases':terms,'docIds':matches[:100],'count':len(matches)})
    # Build wiki 'see-also' based on co-occurrence on document titles/excerpts only; label as shared context, not causal.
    for concept in concepts:
        ranking=[]; a=set(concept['docIds'])
        for other in concepts:
            if other['id']==concept['id']:continue
            overlap=len(a & set(other['docIds']))
            if overlap:ranking.append((overlap,other['id']))
        concept['relatedIds']=[id for score,id in sorted(ranking,reverse=True)[:6]]
    # Source-relative links are retained as provenance but not silently rewritten to incorrect targets.
    (out/'manifest.json').write_text(json.dumps({'edition':'1.0.0','profile':profile,'generatedOn':str(date.today()),'courses':courses,'docs':docs,'concepts':concepts,'questions':questions,'warnings':warnings,'externalFiles':external_files,'referenceStats':{'documents':len(references),'pageImages':image_count}},ensure_ascii=False,separators=(',',':')),encoding='utf-8')
    (out/'search.json').write_text(json.dumps(index,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
    # Public-authorized, original measurement catalog for the dedicated explorer.
    measurement_source = root/'domains'/'pvi-measurement'/'catalog'
    if measurement_source.is_dir():
        measurement_out = out/'measurement-data'
        measurement_out.mkdir(parents=True,exist_ok=True)
        for name in ('measures.json','study-designs.json','measurement-evidence.json'):
            if (measurement_source/name).is_file():
                shutil.copy2(measurement_source/name,measurement_out/name)
    shutil.copytree(Path(__file__).parent/'app',out,dirs_exist_ok=True)
    (out/'.nojekyll').write_text('',encoding='utf-8')
    print(f'Built {len(courses)} course entries, {len(docs)} pages, {len(questions)} real recall questions, {len(concepts)} curated topics; {len(warnings)} warnings')
    return {'courses':len(courses),'docs':len(docs),'questions':len(questions),'concepts':len(concepts)}

if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--root',type=Path,default=ROOT);ap.add_argument('--out',type=Path);ap.add_argument('--profile',choices=['local','pages'],default='local')
    a=ap.parse_args();root=a.root.resolve(); out=(a.out or (root/'platform'/'dist')).resolve();build(root,out,profile=a.profile)
