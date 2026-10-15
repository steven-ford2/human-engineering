import {readFileSync, writeFileSync} from 'node:fs';

const catalogUrl = new URL('../domains/pvi-measurement/catalog/measures.json', import.meta.url);
const evidenceUrl = new URL('../domains/pvi-measurement/catalog/measurement-evidence.json', import.meta.url);
const inventoryCsvUrl = new URL('../docs/research/measure-study-search-inventory.csv', import.meta.url);
const inventoryMarkdownUrl = new URL('../docs/research/measure-study-search-inventory.md', import.meta.url);
const resultsTemplateUrl = new URL('../docs/research/measure-study-results-template.csv', import.meta.url);

const catalog = JSON.parse(readFileSync(catalogUrl, 'utf8'));
const evidence = JSON.parse(readFileSync(evidenceUrl, 'utf8'));

const csvCell = value => {
  const text = Array.isArray(value) ? value.join(' | ') : String(value ?? '');
  return `"${text.replaceAll('"', '""')}"`;
};

const csv = rows => `${rows.map(row => row.map(csvCell).join(',')).join('\n')}\n`;
const phraseQuery = name => `"${name.replaceAll('"', '')}"`;
const broadQuery = measure => {
  const baseName = measure.name
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .replace(/[–—/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const construct = (measure.constructs[0] || '').replaceAll('-', ' ');
  return `${baseName} ${construct} (study OR experiment OR evaluation OR validation)`.trim();
};

const guidanceByStatus = {
  'published-instrument-evidence':
    'Search the exact instrument name and any acronym in the name. Include development, validation, translation, adaptation, and applied-use papers, but identify the exact version used.',
  'source-backed-candidate-measure':
    'The label names a source-backed engineering or human-performance quantity, not necessarily a titled instrument. Search the exact label, its operationalization, and nearby terminology used in the cited source domain.',
  'candidate-operational-measure':
    'The exact phrase may be Atlas wording. Search both the label and the operationalized quantity; accept a study only when the paper clearly measured the same quantity or named instrument.'
};

const studyIdsByMeasure = new Map();
for (const study of evidence.studies || []) {
  for (const measureId of study.measureIds || []) {
    const ids = studyIdsByMeasure.get(measureId) || [];
    ids.push(study.id);
    studyIdsByMeasure.set(measureId, ids);
  }
}

const profileIds = new Set(Object.keys(evidence.measureProfiles || {}));
const seenIds = new Set();
const seenNames = new Set();
for (const measure of catalog.measures) {
  if (seenIds.has(measure.id)) throw new Error(`Duplicate measure id: ${measure.id}`);
  if (seenNames.has(measure.name)) throw new Error(`Duplicate measure name: ${measure.name}`);
  if (!guidanceByStatus[measure.evidenceStatus]) {
    throw new Error(`Unknown evidence status for ${measure.id}: ${measure.evidenceStatus}`);
  }
  seenIds.add(measure.id);
  seenNames.add(measure.name);
}

const inventoryHeader = [
  'catalog_order',
  'measure_id',
  'measure_name',
  'evidence_status',
  'family',
  'constructs',
  'applications',
  'definition',
  'operationalization',
  'units',
  'source_ids',
  'existing_atlas_study_ids',
  'has_atlas_profile',
  'exact_phrase_query',
  'broader_scholar_query',
  'search_guidance'
];

const inventoryRows = catalog.measures.map((measure, index) => [
  index + 1,
  measure.id,
  measure.name,
  measure.evidenceStatus,
  measure.family,
  measure.constructs,
  measure.applications,
  measure.definition,
  measure.operationalization,
  measure.units,
  measure.sourceIds,
  studyIdsByMeasure.get(measure.id) || [],
  profileIds.has(measure.id) ? 'yes' : 'no',
  phraseQuery(measure.name),
  broadQuery(measure),
  guidanceByStatus[measure.evidenceStatus]
]);

const resultHeader = [
  'measure_id',
  'measure_name',
  'search_database',
  'search_queries',
  'search_date',
  'qualifying_use_found_yes_or_no',
  'no_use_screening_notes',
  'match_type_exact_variant_or_related',
  'study_title',
  'authors',
  'year',
  'doi_or_stable_url',
  'full_citation',
  'access_level_full_text_abstract_or_metadata',
  'publication_type',
  'field_or_domain',
  'population_and_sample',
  'task_and_setting',
  'measure_version_or_variant',
  'measure_role_outcome_predictor_covariate_screening_or_other',
  'administration_timing',
  'administration_details',
  'scoring_and_aggregation',
  'statistical_analysis',
  'reported_reliability',
  'reported_validity',
  'factor_or_item_evidence',
  'measure_specific_finding',
  'appropriateness_of_use',
  'limitations_or_possible_misuse',
  'exact_locator_page_section_table_or_figure',
  'short_verbatim_excerpt_max_25_words',
  'researcher_notes',
  'checked_by',
  'checked_on'
];

const alphabetical = [...catalog.measures].sort((a, b) => a.name.localeCompare(b.name));
const listLines = alphabetical.map((measure, index) => {
  const studies = studyIdsByMeasure.get(measure.id) || [];
  const existing = studies.length ? `; Atlas study records: ${studies.join(', ')}` : '';
  return `${index + 1}. **${measure.name}** — \`${measure.id}\`; ${measure.evidenceStatus}; ${measure.constructs.join(', ')}${existing}`;
});

const markdown = `# Measure study-search inventory

This is a deterministic export of all ${catalog.measures.length} records in \`domains/pvi-measurement/catalog/measures.json\`, generated by \`tools/export_measure_study_search.mjs\`. It is a literature-search handoff, not a claim that all records are standardized instruments or that every record has already been searched exhaustively.

Use [the CSV inventory](./measure-study-search-inventory.csv) for Google Scholar or another research workflow. It includes the exact catalog label, constructs, operationalization, source IDs, existing Atlas study links, and two starter queries. The exact phrase is useful for named instruments. For engineered operational measures, use the broader query and the operationalization because the Atlas label may not be the terminology used by a paper.

Return findings in [the results template](./measure-study-results-template.csv), with one row per measure–study use. A paper can therefore appear in several rows if it uses several measures. Do not collapse different versions, translations, adaptations, scoring rules, populations, or tasks into one record.

## Evidence rules for the external search

- A study must actually administer, calculate, observe, or analyze the measure. Merely mentioning or citing it is not a use.
- Record whether the match is the exact measure, a named variant, or only a related operationalization. Related evidence must not be presented as exact use.
- Prefer full text. If only an abstract or metadata record was inspected, say so and leave unsupported fields as \`not reported\`.
- Capture the exact version, population, task, timing, administration, scoring, analysis role, measure-specific result, psychometric evidence, and page/section/table/figure locator.
- Judge appropriateness from the paper's actual construct, design, sample, scoring, and inference. Separate the authors' statements from the researcher's appraisal.
- Never invent missing coefficients, validity evidence, factor loadings, sample details, or findings. Do not reproduce copyrighted questionnaire items.
- Keep any verbatim excerpt to 25 words or fewer; use paraphrase for the substantive record.
- If a legitimate, reasonably broad search finds no actual use, record the databases, exact queries, search date, and \`no qualifying use found\` rather than manufacturing a match.

## Complete alphabetical inventory

${listLines.join('\n')}
`;

writeFileSync(inventoryCsvUrl, csv([inventoryHeader, ...inventoryRows]), 'utf8');
writeFileSync(resultsTemplateUrl, csv([resultHeader]), 'utf8');
writeFileSync(inventoryMarkdownUrl, markdown, 'utf8');

console.log(`Exported ${catalog.measures.length} unique measures.`);
console.log(`Inventory CSV: ${inventoryCsvUrl.pathname}`);
console.log(`Inventory Markdown: ${inventoryMarkdownUrl.pathname}`);
console.log(`Results template: ${resultsTemplateUrl.pathname}`);
