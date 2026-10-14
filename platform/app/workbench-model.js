export const WORKBENCH_SCHEMA_VERSION = 2;
export const WORKBENCH_STORAGE_KEY = 'human-engineering-task-workbench-v2';
export const LEGACY_WORKBENCH_STORAGE_KEY = 'fighterjets-ii-task-workbench-v2';

export const ENTITY_TYPES = {
  scenarios: { singular: 'Scenario', prefix: 'SC', titleField: 'name', description: 'Operational contexts and coverage boundaries.' },
  tasks: { singular: 'Task', prefix: 'T', titleField: 'name', description: 'Hierarchical operator goals, actions, and completion states.' },
  decisions: { singular: 'Decision', prefix: 'D', titleField: 'question', description: 'Operational choices, alternatives, cues, and deadlines.' },
  informationNeeds: { singular: 'Information need', prefix: 'IN', titleField: 'label', description: 'Information required to perceive, understand, and project state.' },
  controlNeeds: { singular: 'Control need', prefix: 'CN', titleField: 'label', description: 'Operator intent, authority, state transitions, and feedback.' },
  requirements: { singular: 'Requirement', prefix: 'R', titleField: 'claim', description: 'Traceable, testable design and system requirements.' },
  tests: { singular: 'Test', prefix: 'TEST', titleField: 'name', description: 'Objective verification and validation methods and results.' },
  evidence: { singular: 'Evidence item', prefix: 'EV', titleField: 'title', description: 'Source locators and observations that support the model.' }
};

const COLLECTIONS = Object.keys(ENTITY_TYPES);
const STATUS = ['draft', 'in-review', 'accepted', 'retired'];
const BASIS = ['unknown', 'observed', 'reported', 'specified', 'inferred', 'hypothetical'];

export const FIELD_DEFINITIONS = {
  scenarios: [
    ['name', 'Scenario name', 'text', true], ['objective', 'Operational objective', 'textarea', true],
    ['phase', 'Mission or work phase', 'text'], ['actorRoles', 'Actor roles', 'text'],
    ['initialState', 'Initial state', 'textarea'], ['trigger', 'Trigger', 'textarea'],
    ['successEndState', 'Success end state', 'textarea'], ['failedEndState', 'Failed end state', 'textarea'],
    ['priority', 'Priority', 'select', false, ['low', 'medium', 'high', 'critical']]
  ],
  tasks: [
    ['name', 'Task name', 'text', true], ['goal', 'Operator goal', 'textarea', true],
    ['parentId', 'Parent task', 'relation-one', false, 'tasks'], ['scenarioIds', 'Scenarios', 'relation-many', false, 'scenarios'],
    ['actor', 'Actor role', 'text'], ['trigger', 'Trigger', 'textarea'], ['preconditions', 'Preconditions', 'textarea'],
    ['actions', 'Actions', 'textarea'], ['plan', 'Plan / branching logic', 'textarea'],
    ['completionState', 'Operational completion state', 'textarea'], ['possibleErrors', 'Possible errors', 'textarea'],
    ['recoveryActions', 'Recovery actions', 'textarea']
  ],
  decisions: [
    ['question', 'Operational question', 'textarea', true], ['taskIds', 'Tasks', 'relation-many', true, 'tasks'],
    ['scenarioIds', 'Scenarios', 'relation-many', false, 'scenarios'], ['alternatives', 'Alternatives', 'textarea'],
    ['triggerEvent', 'Trigger event', 'textarea'], ['availableTime', 'Available time', 'text'],
    ['deadlineRationale', 'Deadline rationale', 'textarea'], ['relevantCues', 'Relevant cues', 'textarea'],
    ['expertReasoning', 'Expert reasoning', 'textarea'], ['uncertainties', 'Uncertainties', 'textarea'],
    ['consequence', 'Decision consequence', 'textarea']
  ],
  informationNeeds: [
    ['label', 'Information need', 'text', true], ['operationalQuestion', 'Operational question', 'textarea', true],
    ['decisionIds', 'Decisions', 'relation-many', true, 'decisions'], ['taskIds', 'Tasks', 'relation-many', false, 'tasks'],
    ['requiredData', 'Required data semantics', 'textarea'], ['currentAvailability', 'Current availability', 'textarea'],
    ['gap', 'Availability gap', 'textarea'], ['timeliness', 'Timeliness / update requirement', 'textarea'],
    ['uncertaintyCommunication', 'Uncertainty communication', 'textarea'], ['consequenceIfMissing', 'Consequence if missing', 'textarea']
  ],
  controlNeeds: [
    ['label', 'Control need', 'text', true], ['operatorIntent', 'Operator intent', 'textarea', true],
    ['taskIds', 'Tasks', 'relation-many', true, 'tasks'], ['decisionIds', 'Decisions', 'relation-many', false, 'decisions'],
    ['affectedFunction', 'Affected function', 'text'], ['stateTransition', 'State transition', 'textarea'],
    ['authority', 'Authority', 'textarea'], ['preconditions', 'Preconditions', 'textarea'],
    ['inhibitedConditions', 'Invalid / inhibited conditions', 'textarea'], ['feedback', 'Required feedback', 'textarea'],
    ['recovery', 'Cancel / revert / recovery', 'textarea']
  ],
  requirements: [
    ['claim', 'Requirement statement', 'textarea', true], ['type', 'Requirement type', 'select', false, ['functional', 'performance', 'interface', 'human-factors', 'safety', 'training']],
    ['parentNeedIds', 'Information / control needs', 'relation-mixed', true, ['informationNeeds', 'controlNeeds']],
    ['taskIds', 'Tasks', 'relation-many', false, 'tasks'], ['decisionIds', 'Decisions', 'relation-many', false, 'decisions'],
    ['scenarioIds', 'Scenarios', 'relation-many', false, 'scenarios'], ['rationale', 'Rationale and evidence', 'textarea'],
    ['threshold', 'Quantitative threshold', 'text'], ['thresholdBasis', 'Threshold basis', 'textarea'],
    ['verificationMethod', 'Verification method', 'textarea'], ['validationMethod', 'Validation method', 'textarea']
  ],
  tests: [
    ['name', 'Test name', 'text', true], ['requirementIds', 'Requirements', 'relation-many', true, 'requirements'],
    ['method', 'Method', 'textarea', true], ['metric', 'Primary metric', 'text'], ['operationalDefinition', 'Metric operational definition', 'textarea'],
    ['successCriterion', 'Success criterion', 'textarea'], ['groundTruth', 'Ground truth', 'textarea'],
    ['confounds', 'Confounds', 'textarea'], ['resultStatus', 'Result status', 'select', false, ['not-run', 'passed', 'failed', 'inconclusive']],
    ['resultSummary', 'Result summary', 'textarea']
  ],
  evidence: [
    ['title', 'Evidence title', 'text', true], ['type', 'Evidence type', 'select', false, ['primary-source', 'secondary-source', 'observation', 'interview', 'test-result', 'assumption-log']],
    ['locator', 'Page / section / record locator', 'text'], ['url', 'Source URL or repository path', 'text'],
    ['accessStatus', 'Access status', 'select', false, ['discovered', 'acquired', 'read', 'appraised']],
    ['notes', 'Evidence notes', 'textarea']
  ]
};

export function makeId(prefix, existing = []) {
  const used = new Set(existing.map(item => item.id));
  let number = 1;
  while (used.has(`${prefix}-${String(number).padStart(3, '0')}`)) number += 1;
  return `${prefix}-${String(number).padStart(3, '0')}`;
}

export function createProject(now = new Date()) {
  const timestamp = now.toISOString();
  return {
    schemaVersion: WORKBENCH_SCHEMA_VERSION,
    project: {
      id: globalThis.crypto?.randomUUID?.() ?? `project-${now.getTime()}`,
      title: 'Untitled task-analysis project', description: '', scope: '', owner: '',
      status: 'draft', createdAt: timestamp, modifiedAt: timestamp
    },
    scenarios: [], tasks: [], decisions: [], informationNeeds: [],
    controlNeeds: [], requirements: [], tests: [], evidence: [],
    activity: [{ at: timestamp, action: 'created', detail: 'Project workspace created.' }]
  };
}

export function createEntity(type, project, now = new Date()) {
  const definition = ENTITY_TYPES[type];
  if (!definition) throw new Error(`Unknown entity type: ${type}`);
  const record = {
    id: makeId(definition.prefix, project[type]), status: 'draft', basis: 'unknown',
    evidenceIds: [], reviewer: '', openQuestions: '', createdAt: now.toISOString(), modifiedAt: now.toISOString()
  };
  for (const [field, , kind, , options] of FIELD_DEFINITIONS[type]) {
    if (field in record) continue;
    record[field] = kind.includes('many') || kind === 'relation-mixed' ? [] :
      kind === 'select' ? options[0] : '';
  }
  return record;
}

export function normalizeProject(candidate) {
  if (!candidate || typeof candidate !== 'object' || !candidate.project) throw new Error('The file does not contain a task-analysis project.');
  const normalized = createProject();
  normalized.project = { ...normalized.project, ...candidate.project };
  for (const key of COLLECTIONS) {
    normalized[key] = Array.isArray(candidate[key]) ? candidate[key].filter(item => item && typeof item === 'object').map(item => {
      const record = { status: 'draft', basis: 'unknown', evidenceIds: [], reviewer: '', openQuestions: '', ...item };
      for (const [field, , kind, , options] of FIELD_DEFINITIONS[key]) {
        if (kind === 'relation-many' || kind === 'relation-mixed') record[field] = Array.isArray(record[field]) ? record[field] : String(record[field] || '').split(';').map(value => value.trim()).filter(Boolean);
        else if (record[field] === undefined) record[field] = kind === 'select' ? options[0] : '';
      }
      record.evidenceIds = Array.isArray(record.evidenceIds) ? record.evidenceIds : String(record.evidenceIds || '').split(';').map(value => value.trim()).filter(Boolean);
      return record;
    }) : [];
  }
  normalized.activity = Array.isArray(candidate.activity) ? candidate.activity.slice(-100) : [];
  normalized.schemaVersion = WORKBENCH_SCHEMA_VERSION;
  return normalized;
}

export function allowedStatuses() { return STATUS.slice(); }
export function allowedBases() { return BASIS.slice(); }
export function collectionNames() { return COLLECTIONS.slice(); }
