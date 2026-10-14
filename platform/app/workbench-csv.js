import { ENTITY_TYPES, FIELD_DEFINITIONS, createEntity } from './workbench-model.js';

const FIELD_ALIASES = {
  task_goal: 'goal', actor_role: 'actor', task_actions: 'actions', task_plan: 'plan',
  operational_completion_state: 'completionState', operational_question: 'question',
  decision_consequence: 'consequence', required_data_semantics: 'requiredData',
  availability_gap: 'gap', timeliness_requirement: 'timeliness',
  invalid_or_inhibited_conditions: 'inhibitedConditions', cancel_revert_recovery: 'recovery',
  rationale_and_evidence: 'rationale', quantitative_threshold: 'threshold',
  primary_metric: 'metric', metric_operational_definition: 'operationalDefinition',
  source_ids: 'evidenceIds', evidence_ids: 'evidenceIds'
};

const snakeToCamel = value => value.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
const camelToSnake = value => value.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

export function parseCsv(text) {
  const rows = []; let row = []; let cell = ''; let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const character = text[i];
    if (quoted) {
      if (character === '"' && text[i + 1] === '"') { cell += '"'; i += 1; }
      else if (character === '"') quoted = false;
      else cell += character;
    } else if (character === '"') quoted = true;
    else if (character === ',') { row.push(cell); cell = ''; }
    else if (character === '\n') { row.push(cell.replace(/\r$/, '')); rows.push(row); row = []; cell = ''; }
    else cell += character;
  }
  if (cell.length || row.length) { row.push(cell.replace(/\r$/, '')); rows.push(row); }
  return rows.filter(candidate => candidate.some(value => value.trim() !== ''));
}

function csvCell(value) {
  const text = Array.isArray(value) ? value.join(';') : String(value ?? '');
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function knownFields(type) {
  return ['id', ...FIELD_DEFINITIONS[type].map(field => field[0]), 'basis', 'status', 'evidenceIds', 'reviewer', 'openQuestions'];
}

export function recordsToCsv(type, records) {
  if (!ENTITY_TYPES[type]) throw new Error(`Unknown record type: ${type}`);
  const headers = knownFields(type);
  return `${headers.map(camelToSnake).join(',')}\r\n${records.map(record => headers.map(header => csvCell(record[header])).join(',')).join('\r\n')}\r\n`;
}

export function recordsFromCsv(type, text, project) {
  if (!ENTITY_TYPES[type]) throw new Error(`Unknown record type: ${type}`);
  const rows = parseCsv(text);
  if (rows.length < 2) return [];
  const headers = rows[0].map(header => header.trim().replace(/^\uFEFF/, ''));
  const known = new Set(knownFields(type));
  const relationFields = new Set(FIELD_DEFINITIONS[type].filter(field => field[2].startsWith('relation')).map(field => field[0]).concat('evidenceIds'));
  return rows.slice(1).map(values => {
    const record = createEntity(type, project); const importedFields = {};
    headers.forEach((header, index) => {
      let field = FIELD_ALIASES[header] || snakeToCamel(header);
      if (field.endsWith('Id') && header === `${ENTITY_TYPES[type].prefix.toLowerCase()}_id`) field = 'id';
      if (header.endsWith('_id') && index === 0) field = 'id';
      const value = values[index]?.trim() || '';
      if (known.has(field)) record[field] = relationFields.has(field) ? value.split(';').map(item => item.trim()).filter(Boolean) : value;
      else if (value) importedFields[header] = value;
    });
    if (Object.keys(importedFields).length) record.importedFields = importedFields;
    return record;
  });
}
