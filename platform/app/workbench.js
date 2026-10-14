import {
  ENTITY_TYPES, FIELD_DEFINITIONS, allowedBases, allowedStatuses, createEntity
} from './workbench-model.js';
import { WorkbenchStore } from './workbench-store.js';
import { buildTraceRows, coverageSummary, relationshipSummary, validateProject } from './workbench-analysis.js';
import { recordsFromCsv, recordsToCsv } from './workbench-csv.js';
import { summarizeQuality, qualityReportCsv, qualityReportMarkdown } from './workbench-quality.js';

const ACTIVE_TYPES = ['scenarios', 'tasks', 'decisions', 'informationNeeds', 'controlNeeds', 'requirements', 'tests', 'evidence'];

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function titleFor(type, record) {
  return record?.[ENTITY_TYPES[type].titleField]?.trim() || `Untitled ${ENTITY_TYPES[type].singular.toLowerCase()}`;
}

function pluralLabel(type) {
  return type === 'informationNeeds' ? 'Information needs' :
    type === 'controlNeeds' ? 'Control needs' : type[0].toUpperCase() + type.slice(1);
}

function download(name, contents, type) {
  const url = URL.createObjectURL(new Blob([contents], { type }));
  const link = document.createElement('a'); link.href = url; link.download = name; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function optionList(values, selected) {
  return values.map(value => `<option value="${esc(value)}" ${value === selected ? 'selected' : ''}>${esc(value)}</option>`).join('');
}

function relationOptions(project, type, selected = []) {
  const selectedValues = new Set(Array.isArray(selected) ? selected : [selected]);
  return (project[type] || []).map(record => `<option value="${esc(record.id)}" ${selectedValues.has(record.id) ? 'selected' : ''}>${esc(record.id)} · ${esc(titleFor(type, record))}</option>`).join('');
}

function fieldControl(project, record, definition) {
  const [field, label, kind, required = false, options] = definition;
  const value = record[field] ?? (kind.includes('many') || kind === 'relation-mixed' ? [] : '');
  const attributes = `data-field="${esc(field)}" ${required ? 'required' : ''}`;
  let control;
  if (kind === 'textarea') control = `<textarea ${attributes} rows="3">${esc(value)}</textarea>`;
  else if (kind === 'select') control = `<select ${attributes}>${optionList(options, value)}</select>`;
  else if (kind === 'relation-one') control = `<select ${attributes}><option value="">No parent</option>${relationOptions(project, options, value)}</select>`;
  else if (kind === 'relation-many') control = `<select ${attributes} multiple size="${Math.min(5, Math.max(2, (project[options] || []).length))}">${relationOptions(project, options, value)}</select>`;
  else if (kind === 'relation-mixed') control = `<select ${attributes} multiple size="5">${options.map(type => `<optgroup label="${esc(pluralLabel(type))}">${relationOptions(project, type, value)}</optgroup>`).join('')}</select>`;
  else control = `<input ${attributes} type="text" value="${esc(value)}" />`;
  return `<label class="wb-field ${kind === 'textarea' || kind.includes('relation') ? 'wb-field-wide' : ''}"><span>${esc(label)}${required ? ' <b aria-hidden="true">*</b>' : ''}</span>${control}</label>`;
}

function collectForm(form, record) {
  const next = { ...record };
  for (const element of form.querySelectorAll('[data-field]')) {
    next[element.dataset.field] = element.multiple ? [...element.selectedOptions].map(option => option.value) : element.value.trim();
  }
  next.modifiedAt = new Date().toISOString();
  return next;
}

function recordEditor(project, type, record) {
  if (!record) return `<section class="wb-detail wb-detail-empty"><div class="wb-empty-icon" aria-hidden="true">⌁</div><h2>Select a record</h2><p>Choose a record from the list or create one to begin.</p></section>`;
  const fields = FIELD_DEFINITIONS[type].map(definition => fieldControl(project, record, definition)).join('');
  const relationships = relationshipSummary(project, record.id);
  const relationshipItems = (heading, items) => `<div><h3>${heading} <span>${items.length}</span></h3>${items.length ? items.map(item => `<button type="button" data-open-record="${esc(item.type)}:${esc(item.record.id)}"><b>${esc(item.record.id)}</b><span>${esc(item.title)}</span><small>${esc(item.label)}</small></button>`).join('') : '<p>None recorded.</p>'}</div>`;
  return `<section class="wb-detail" aria-labelledby="wbEditorTitle">
    <div class="wb-detail-head"><div><div class="overline">${esc(ENTITY_TYPES[type].singular)} · ${esc(record.id)}</div><h2 id="wbEditorTitle">${esc(titleFor(type, record))}</h2></div><div class="wb-inline-actions"><button data-duplicate="${esc(record.id)}">Duplicate</button><button class="wb-danger" data-delete="${esc(record.id)}">Delete</button></div></div>
    <form id="wbEditorForm" class="wb-form">
      ${fields}
      <fieldset class="wb-governance"><legend>Provenance and review</legend>
        <label class="wb-field"><span>Basis</span><select data-field="basis">${optionList(allowedBases(), record.basis)}</select></label>
        <label class="wb-field"><span>Status</span><select data-field="status">${optionList(allowedStatuses(), record.status)}</select></label>
        <label class="wb-field"><span>Evidence IDs</span><select data-field="evidenceIds" multiple size="3">${relationOptions(project, 'evidence', record.evidenceIds)}</select></label>
        <label class="wb-field"><span>Reviewer</span><input data-field="reviewer" value="${esc(record.reviewer)}" /></label>
        <label class="wb-field wb-field-wide"><span>Open questions</span><textarea data-field="openQuestions" rows="2">${esc(record.openQuestions)}</textarea></label>
      </fieldset>
      <div class="wb-form-actions"><span class="wb-save-note">Changes are saved when you choose Save record.</span><button class="primary-button" type="submit">Save record</button></div>
    </form><section class="wb-relationships" aria-label="Record relationships">${relationshipItems('Links from this record', relationships.outgoing)}${relationshipItems('Linked to this record', relationships.incoming)}</section>
  </section>`;
}

function recordsView(project, state) {
  const type = state.activeType;
  const definition = ENTITY_TYPES[type];
  const query = state.query.toLowerCase();
  const rows = project[type].filter(record => !query || `${record.id} ${titleFor(type, record)} ${record.status} ${record.basis}`.toLowerCase().includes(query));
  const selected = project[type].find(record => record.id === state.selectedId) || null;
  return `<div class="wb-workspace">
    <aside class="wb-records" aria-label="${esc(pluralLabel(type))} records">
      <div class="wb-records-head"><div><h2>${esc(pluralLabel(type))}</h2><p>${esc(definition.description)}</p></div><div class="wb-record-actions"><button aria-label="Export these records as CSV" title="Export these records as CSV" data-export-csv>⇩</button><label aria-label="Import CSV into this register" title="Import CSV into this register">⇧<span class="sr-only">Import CSV</span><input id="wbImportCsv" type="file" accept="text/csv,.csv" hidden></label><button class="wb-add" data-add="${esc(type)}">+ Add</button></div></div>
      <label class="wb-filter"><span class="sr-only">Filter ${esc(pluralLabel(type))}</span><input id="wbRecordFilter" type="search" value="${esc(state.query)}" placeholder="Filter ${esc(pluralLabel(type).toLowerCase())}…" /></label>
      <div class="wb-record-list">${rows.map(record => `<button class="wb-record ${record.id === state.selectedId ? 'active' : ''}" data-select="${esc(record.id)}"><span><b>${esc(record.id)}</b><strong>${esc(titleFor(type, record))}</strong></span><small>${esc(record.status)} · ${esc(record.basis)}</small></button>`).join('') || `<div class="wb-list-empty">No matching records.</div>`}</div>
    </aside>
    ${recordEditor(project, type, selected)}
  </div>`;
}

function taskHierarchy(project) {
  const tasks = project.tasks;
  const byParent = new Map();
  for (const task of tasks) {
    const parent = tasks.some(candidate => candidate.id === task.parentId) ? task.parentId : '';
    if (!byParent.has(parent)) byParent.set(parent, []);
    byParent.get(parent).push(task);
  }
  const visited = new Set();
  function branch(parentId) {
    return (byParent.get(parentId) || []).map(task => {
      if (visited.has(task.id)) return `<li class="wb-tree-cycle"><span>${esc(task.id)}</span> Cycle detected</li>`;
      visited.add(task.id);
      const children = branch(task.id);
      return `<li><button data-open-record="tasks:${esc(task.id)}"><b>${esc(task.id)}</b><span>${esc(titleFor('tasks', task))}</span><small>${esc(task.status)} · ${esc(task.actor || 'actor not recorded')}</small></button>${children ? `<ol>${children}</ol>` : ''}</li>`;
    }).join('');
  }
  const tree = branch('');
  const unvisited = tasks.filter(task => !visited.has(task.id));
  return `<section class="wb-standalone"><div class="wb-view-head"><div><div class="overline">HIERARCHICAL TASK ANALYSIS</div><h2>Task hierarchy</h2><p>Parent–child structure is editorial organization. It does not establish sequence, causality, or evidence by itself.</p></div><button class="primary-button" data-open-type="tasks">Edit tasks</button></div>
    ${tasks.length ? `<ol class="wb-task-tree">${tree}</ol>` : '<div class="wb-empty"><h2>No tasks yet</h2><p>Create a root task, then assign parent tasks to form the hierarchy.</p></div>'}
    ${unvisited.length ? `<div class="wb-warning"><strong>Unresolved hierarchy</strong><p>${unvisited.length} task(s) could not be placed because of a parent cycle. Open Validation for details.</p></div>` : ''}
  </section>`;
}

function traceCell(items) {
  return items.length ? items.map(item => `<button data-open-record="${esc(item.type)}:${esc(item.record.id)}"><b>${esc(item.record.id)}</b>${esc(item.title)}</button>`).join('') : '<span class="wb-gap">Gap</span>';
}

function traceability(project) {
  const rows = buildTraceRows(project);
  return `<section class="wb-standalone"><div class="wb-view-head"><div><div class="overline">END-TO-END LINKAGE</div><h2>Traceability matrix</h2><p>Each row starts at a requirement and resolves explicit upstream and downstream ID links. A gap is an absent recorded link, not proof that no relationship exists.</p></div><button class="primary-button" data-open-type="requirements">Edit requirements</button></div>
    ${rows.length ? `<div class="wb-table-wrap"><table class="wb-trace-table"><thead><tr><th>Scenarios</th><th>Tasks</th><th>Decisions</th><th>Information / control needs</th><th>Requirement</th><th>Tests</th><th>Evidence</th></tr></thead><tbody>${rows.map(row => `<tr><td>${traceCell(row.scenarios)}</td><td>${traceCell(row.tasks)}</td><td>${traceCell(row.decisions)}</td><td>${traceCell(row.needs)}</td><td>${traceCell([row.requirement])}</td><td>${traceCell(row.tests)}</td><td>${traceCell(row.evidence)}</td></tr>`).join('')}</tbody></table></div>` : '<div class="wb-empty"><h2>No requirements to trace</h2><p>Add a requirement and connect it to information or control needs, tasks, decisions, scenarios, and tests.</p></div>'}
  </section>`;
}


function qualityView(project) {
  const report = summarizeQuality(project);
  const issues = report.findings;
  return `<section class="wb-standalone"><div class="wb-view-head"><div><div class="overline">ENGINEERING REVIEW</div><h2>Quality review</h2><p>Heuristic prompts for missing analytical detail, undocumented state feedback, verification gaps, and unappraised evidence. These are not pass/fail certification criteria.</p></div><div class="wb-validation-counts"><span class="warning">${report.warnings} review flags</span><span>${report.advisories} considerations</span></div></div>
    <div class="wb-inline-actions"><button class="secondary-button" data-export-quality-csv>Export quality review CSV</button><button class="secondary-button" data-export-quality-md>Export review Markdown</button></div>
    <p class="microtext">${report.affected} records with prompts · ${report.total} findings. Each item links to its editable record. A blank audit does not establish completeness or operational validity.</p>
    ${issues.length ? `<div class="wb-issue-list">${issues.map(issue => `<button data-open-record="${esc(issue.type)}:${esc(issue.id)}" class="${issue.severity === 'warning' ? 'warning' : 'advisory'}"><span>${issue.severity === 'warning' ? '△' : 'i'}</span><b>${esc(issue.id)}</b><em>${esc(issue.code)}</em><p>${esc(issue.message)}</p></button>`).join('')}</div>` : '<div class="wb-success"><strong>No quality-review prompts</strong><p>Run source appraisal, domain expert review and empirical validation separately.</p></div>'}
  </section>`;
}

function validationView(project) {
  const issues = validateProject(project);
  const errors = issues.filter(issue => issue.severity === 'error').length;
  const warnings = issues.length - errors;
  return `<section class="wb-standalone"><div class="wb-view-head"><div><div class="overline">MODEL QUALITY</div><h2>Validation</h2><p>Automated checks find structural omissions and broken links. They do not establish factual accuracy, source quality, operational validity, or engineering approval.</p></div><div class="wb-validation-counts"><span class="error">${errors} errors</span><span class="warning">${warnings} warnings</span></div></div>
    ${issues.length ? `<div class="wb-issue-list">${issues.map(issue => `<button data-open-record="${esc(issue.type)}:${esc(issue.id)}" class="${esc(issue.severity)}"><span>${issue.severity === 'error' ? '!' : '△'}</span><b>${esc(issue.id)}</b><em>${esc(pluralLabel(issue.type))}</em><p>${esc(issue.message)}</p></button>`).join('')}</div>` : '<div class="wb-success"><strong>No structural issues detected</strong><p>The current model passes the automated link, required-field, ID, cycle, and coverage checks. Review the underlying evidence and domain validity separately.</p></div>'}
  </section>`;
}

function overview(project) {
  const count = ACTIVE_TYPES.reduce((sum, type) => sum + project[type].length, 0);
  const coverage = coverageSummary(project);
  const issues = validateProject(project);
  return `<section class="wb-overview">
    <div class="wb-metrics"><article><strong>${count}</strong><span>Engineering records</span></article><article><strong>${coverage.overall}%</strong><span>Average link coverage</span></article><article><strong>${issues.length}</strong><span>Structural issues</span></article><article><strong>Local</strong><span>Storage boundary</span></article></div>
    <div class="wb-overview-grid"><article class="wb-panel"><div class="overline">START THE ANALYSIS</div><h2>Define coverage, then decompose the work</h2><p>Create bounded scenarios before decomposing operator goals into a parent–child task hierarchy. Record unknowns explicitly and distinguish observed, reported, specified, inferred, and hypothetical material.</p><div class="wb-inline-actions"><button class="primary-button" data-open-type="scenarios">Open scenarios →</button><button class="secondary-button" data-open-type="tasks">Open tasks →</button></div></article>
    <article class="wb-panel"><div class="overline">PROJECT BOUNDARY</div><h2>${esc(project.project.title)}</h2><p>${esc(project.project.description || 'No purpose statement has been recorded yet.')}</p><dl><div><dt>Status</dt><dd>${esc(project.project.status)}</dd></div><div><dt>Last saved</dt><dd>${esc(new Date(project.project.modifiedAt).toLocaleString())}</dd></div></dl></article></div>
    <article class="wb-panel wb-coverage"><div class="overline">TRACE COVERAGE</div><h2>Explicit linkage</h2><p>Coverage counts recorded links only. It does not judge whether a link is correct or sufficiently supported.</p>${coverage.measures.map(measure => `<div class="wb-coverage-row"><div><span>${esc(measure.label)}</span><b>${measure.complete}/${measure.total}</b></div><div class="wb-bar" role="meter" aria-label="${esc(measure.label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${measure.percent}"><i style="width:${measure.percent}%"></i></div></div>`).join('')}</article>
    <details class="wb-shortcuts"><summary>Keyboard shortcuts and interaction help</summary><div><kbd>Ctrl/⌘ S</kbd><span>Save the open record</span><kbd>Alt 1–5</kbd><span>Overview, hierarchy, traceability, validation, quality review</span><kbd>Ctrl/⌘ Z</kbd><span>Undo a workbench change when focus is outside a field</span><kbd>Ctrl/⌘ Y</kbd><span>Redo a workbench change when focus is outside a field</span></div></details>
  </section>`;
}

function shell(project, state, store) {
  return `<section class="wb-shell" aria-labelledby="wbTitle">
    <header class="wb-hero"><div><div class="overline">LOCAL ENGINEERING WORKSPACE</div><h1 id="wbTitle">Task-analysis workbench</h1><p>Build an auditable chain from operational scenarios to tasks, decisions, needs, requirements, tests, and evidence.</p></div><div class="wb-local-badge"><span aria-hidden="true">●</span> Local-only data</div></header>
    <div class="wb-project-card"><label>Project title<input id="wbProjectTitle" value="${esc(project.project.title)}" /></label><label>Purpose<textarea id="wbProjectDescription" rows="2" placeholder="State the analytical purpose and boundary.">${esc(project.project.description)}</textarea></label><div class="wb-project-meta"><span>Status: ${esc(project.project.status)}</span><span>Schema v${project.schemaVersion}</span><span>Autosaved in this browser</span></div></div>
    <div class="wb-toolbar"><nav class="wb-tabs" aria-label="Workbench views" role="tablist"><button role="tab" aria-selected="${state.view === 'overview'}" data-view="overview" class="${state.view === 'overview' ? 'active' : ''}">Overview</button><button role="tab" aria-selected="${state.view === 'hierarchy'}" data-view="hierarchy" class="${state.view === 'hierarchy' ? 'active' : ''}">Task hierarchy</button><button role="tab" aria-selected="${state.view === 'trace'}" data-view="trace" class="${state.view === 'trace' ? 'active' : ''}">Traceability</button><button role="tab" aria-selected="${state.view === 'validation'}" data-view="validation" class="${state.view === 'validation' ? 'active' : ''}">Validation</button><button role="tab" aria-selected="${state.view === 'quality'}" data-view="quality" class="${state.view === 'quality' ? 'active' : ''}">Quality review</button>${ACTIVE_TYPES.map(type => `<button role="tab" aria-selected="${state.view === 'records' && state.activeType === type}" data-open-type="${esc(type)}" class="${state.view === 'records' && state.activeType === type ? 'active' : ''}">${esc(pluralLabel(type))}</button>`).join('')}</nav><div class="wb-tool-actions"><div class="wb-history"><button data-undo ${store.canUndo() ? '' : 'disabled'} aria-label="Undo last workbench change">↶ Undo</button><button data-redo ${store.canRedo() ? '' : 'disabled'} aria-label="Redo workbench change">↷ Redo</button></div><button data-export-json>Export JSON</button><label>Import JSON<input id="wbImportJson" type="file" accept="application/json,.json" hidden></label></div></div>
    <div id="wbView">${state.view === 'overview' ? overview(project) : state.view === 'hierarchy' ? taskHierarchy(project) : state.view === 'trace' ? traceability(project) : state.view === 'validation' ? validationView(project) : state.view === 'quality' ? qualityView(project) : recordsView(project, state)}</div>
    <div id="wbStatus" class="sr-only" role="status" aria-live="polite"></div>
  </section>`;
}

export function mountWorkbench(root) {
  const store = new WorkbenchStore();
  const state = { view: 'overview', activeType: 'scenarios', selectedId: '', query: '' };
  const render = () => { root.innerHTML = shell(store.project, state, store); bindTransientInputs(); };
  const announce = message => { const status = root.querySelector('#wbStatus'); if (status) status.textContent = message; };
  const focusEditor = () => requestAnimationFrame(() => root.querySelector('#wbEditorTitle')?.focus?.() || root.querySelector('#wbEditorForm [data-field]')?.focus());
  const resetViewScroll = () => requestAnimationFrame(() => root.scrollIntoView({ block: 'start', behavior: 'instant' }));

  function bindTransientInputs() {
    root.querySelector('#wbRecordFilter')?.addEventListener('input', event => {
      state.query = event.target.value;
      render();
      const input = root.querySelector('#wbRecordFilter'); input.focus(); input.setSelectionRange(input.value.length, input.value.length);
    });
  }

  store.subscribe(() => render());
  render();

  root.addEventListener('change', event => {
    if (event.target.id === 'wbImportCsv' && event.target.files[0]) {
      event.target.files[0].text().then(text => {
        const imported = recordsFromCsv(state.activeType, text, store.project);
        if (!imported.length) throw new Error('No data rows were found.');
        const existing = new Set(store.project[state.activeType].map(record => record.id));
        const conflicts = imported.filter(record => existing.has(record.id)).map(record => record.id);
        if (conflicts.length) throw new Error(`Duplicate IDs already exist: ${conflicts.slice(0, 8).join(', ')}`);
        store.transact(`Imported ${imported.length} ${pluralLabel(state.activeType).toLowerCase()} from CSV`, draft => { draft[state.activeType].push(...imported); });
      }).catch(error => alert(`CSV was not imported: ${error.message}`));
      return;
    }
    if (event.target.id === 'wbImportJson' && event.target.files[0]) {
      event.target.files[0].text().then(text => {
        const candidate = JSON.parse(text);
        if (confirm(`Replace the current local project with “${candidate?.project?.title || 'imported project'}”? The current project remains available through Undo until this page is closed.`)) store.replace(candidate);
      }).catch(error => alert(`The project was not imported: ${error.message}`));
      return;
    }
    if (event.target.id === 'wbProjectTitle' || event.target.id === 'wbProjectDescription') {
      const title = root.querySelector('#wbProjectTitle').value.trim() || 'Untitled task-analysis project';
      const description = root.querySelector('#wbProjectDescription').value.trim();
      store.transact('Updated project metadata', draft => { draft.project.title = title; draft.project.description = description; });
    }
  });

  root.addEventListener('submit', event => {
    if (event.target.id !== 'wbEditorForm') return;
    event.preventDefault();
    const index = store.project[state.activeType].findIndex(record => record.id === state.selectedId);
    if (index < 0) return;
    const next = collectForm(event.target, store.project[state.activeType][index]);
    store.transact(`Saved ${next.id}`, draft => { draft[state.activeType][index] = next; });
    announce(`${next.id} saved.`);
  });

  root.addEventListener('click', event => {
    const target = event.target.closest('[data-view],[data-open-type],[data-open-record],[data-add],[data-select],[data-delete],[data-duplicate],[data-undo],[data-redo],[data-export-json],[data-export-csv],[data-export-quality-csv],[data-export-quality-md]');
    if (!target) return;
    if (target.dataset.view) { state.view = target.dataset.view; state.selectedId = ''; state.query = ''; render(); resetViewScroll(); }
    if (target.dataset.openType) { state.view = 'records'; state.activeType = target.dataset.openType; state.selectedId = store.project[state.activeType][0]?.id || ''; state.query = ''; render(); resetViewScroll(); }
    if (target.dataset.openRecord) { const [type, id] = target.dataset.openRecord.split(':'); state.view = 'records'; state.activeType = type; state.selectedId = id; state.query = ''; render(); resetViewScroll(); }
    if (target.dataset.add) {
      const type = target.dataset.add; const record = createEntity(type, store.project);
      state.selectedId = record.id;
      store.transact(`Created ${record.id}`, draft => { draft[type].push(record); });
      focusEditor(); announce(`${record.id} created.`);
    }
    if (target.dataset.select) { state.selectedId = target.dataset.select; render(); }
    if (target.dataset.delete && confirm(`Delete ${target.dataset.delete}? References to this record will be reported by validation.`)) {
      const id = target.dataset.delete;
      store.transact(`Deleted ${id}`, draft => { draft[state.activeType] = draft[state.activeType].filter(record => record.id !== id); });
      state.selectedId = store.project[state.activeType][0]?.id || '';
    }
    if (target.dataset.duplicate) {
      const source = store.project[state.activeType].find(record => record.id === target.dataset.duplicate);
      if (source) {
        const fresh = createEntity(state.activeType, store.project);
        const duplicate = { ...JSON.parse(JSON.stringify(source)), id: fresh.id, status: 'draft', createdAt: fresh.createdAt, modifiedAt: fresh.modifiedAt };
        const titleField = ENTITY_TYPES[state.activeType].titleField;
        duplicate[titleField] = `${titleFor(state.activeType, source)} (copy)`;
        state.selectedId = duplicate.id;
        store.transact(`Duplicated ${source.id} as ${duplicate.id}`, draft => { draft[state.activeType].push(duplicate); });
        focusEditor(); announce(`${duplicate.id} created from ${source.id}.`);
      }
    }
    if (target.hasAttribute('data-undo')) store.undo();
    if (target.hasAttribute('data-redo')) store.redo();
    if (target.hasAttribute('data-export-json')) {
      const slug = store.project.project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'task-analysis-project';
      download(`${slug}.json`, JSON.stringify(store.project, null, 2), 'application/json');
    }
    if (target.hasAttribute('data-export-quality-csv')) {
      download('quality-review.csv', qualityReportCsv(store.project), 'text/csv;charset=utf-8');
      announce('Quality review CSV exported.');
    }
    if (target.hasAttribute('data-export-quality-md')) {
      download('quality-review.md', qualityReportMarkdown(store.project), 'text/markdown;charset=utf-8');
      announce('Quality review Markdown exported.');
    }
    if (target.hasAttribute('data-export-csv')) {
      const slug = state.activeType.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
      download(`${slug}.csv`, recordsToCsv(state.activeType, store.project[state.activeType]), 'text/csv;charset=utf-8');
    }
  });

  root.addEventListener('keydown', event => {
    const typing = /INPUT|TEXTAREA|SELECT/.test(event.target.tagName);
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') { event.preventDefault(); root.querySelector('#wbEditorForm')?.requestSubmit(); }
    if ((event.ctrlKey || event.metaKey) && !typing && event.key.toLowerCase() === 'z') { event.preventDefault(); store.undo(); announce('Last workbench change undone.'); }
    if ((event.ctrlKey || event.metaKey) && !typing && event.key.toLowerCase() === 'y') { event.preventDefault(); store.redo(); announce('Last workbench change restored.'); }
    if (event.altKey && ['1', '2', '3', '4', '5'].includes(event.key)) { event.preventDefault(); state.view = ['overview', 'hierarchy', 'trace', 'validation', 'quality'][Number(event.key) - 1]; render(); resetViewScroll(); }
  });
}
