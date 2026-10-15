# Construct-first measures and standards

## Objective and acceptance criteria
Make finding a measure by construct the primary landing workflow; expand every measure with auditable study-use evidence from any legitimate research domain; and add clause-addressable browsers for MIL-STD-1472, the human-factors portions of MIL-HDBK-516C, and MIL-STD-1787. Tie standards to appropriate measures and interface/pilot–vehicle-interaction examples without implying that a measure alone establishes compliance. Preserve existing content, links, evidence boundaries, and public-release suitability. Verify research cross-references, navigation, desktop/mobile behavior, and repository consistency.

## Branch and source of truth
Branch: `codex/construct-first-standards-research`, based on `origin/main` at task start.

Canonical paths:
- `domains/pvi-measurement/catalog/`
- `domains/pvi-measurement/guides/`
- `docs/research/`
- `platform/app/`

## Completed
- Confirmed the user wants research from any domain that actually used a measure, not aviation studies only.
- Confirmed MIL-STD-1787 is the requested display-symbology standard.
- Agreed to defer the exhaustive paper search while the user uses Gemini/Google Scholar, preserving Codex credits for evidence integration, standards work, and interface development.
- Added `tools/export_measure_study_search.mjs`, which deterministically exports all canonical measures and rejects duplicate IDs, duplicate names, and unknown evidence-status values.
- Generated a 279-row Scholar-ready CSV, a complete alphabetical Markdown inventory, and a row-level study-use results template that also records search database, queries, date, and no-result screening notes.
- Included each measure's constructs, operationalization, units, source IDs, existing Atlas study links, profile status, exact-label query, broader starter query, and evidence-status-specific search guidance.
- Added explicit evidence rules so exact uses, variants, related operationalizations, abstract-only evidence, missing information, and unsuccessful searches remain distinguishable.

## Verification
- Exact catalog/export comparison — PASS: 279 catalog records, 279 CSV rows, 279 unique IDs, 279 unique names, and complete Markdown name coverage.
- Deterministic regeneration by SHA-256 comparison — PASS for the CSV inventory, Markdown inventory, and results template.
- `python tools/codex/check.py full` — PASS: 6 tooling tests, 7 Python platform tests, 28 JavaScript tests, 70-page Pages build with zero warnings, and 137 local Markdown links with zero breakage.

## Remaining and next action
Give the inventory and template to the user for the external Scholar pass. Ingest returned rows with source-level validation, then implement the construct-first landing page and clause-level standards browsers.

## Sources and decisions
- The canonical catalog is `domains/pvi-measurement/catalog/measures.json`; the inventory must reflect it exactly rather than introduce a second hand-maintained list.
- Candidate operational measures may not appear under the Atlas label in papers. Search and appraisal must use the defined quantity and operationalization while distinguishing exact, variant, and related matches.
- “Used” means administered, calculated, observed, or analyzed in the study; citation or discussion alone is not study use.
- No clause, coefficient, result, access level, or source inspection will be inferred or invented.
