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

## 2026-10-15: twenty focused usability passes

Each pass asked what makes the next measurement decision clearer or removes a distraction. Changes are in the local Pages interface; the 20 entries describe distinct improvements, not 20 independent literature searches.

1. Landing: route an unqualified visit to the construct-first measure finder.
2. Global order: put Find a measure first in the main navigation.
3. Domain order: put the finder and standards before reading/authoring links in the sidebar.
4. Page framing: make the first screen ask for the outcome/construct, not catalog metadata.
5. Quick entry: show eight high-utility construct choices without opening a filter panel.
6. Complete coverage: group every catalog construct exactly once; test rejects omissions and duplicates.
7. Long-list usability: provide search inside the full grouped construct list.
8. State clarity: show the selected construct's definition and an immediate remove action.
9. Local narrowing: search measure name, task, signal, or outcome within the selected construct.
10. Progressive disclosure: keep application, standard, evidence, method, modality, and timing filters closed until needed.
11. Filter reversibility: show applied filters as removable pills with clear-all.
12. Shareability: preserve construct and sort choices in the URL.
13. Scannability: show a manageable first page of 12 candidates with expansion.
14. Candidate comparison: put family, collection timing, and collection method directly on cards.
15. Evidence boundaries: distinguish appraised study use, curated guidance, standards relevance, and the unappraised queue.
16. Navigation continuity: return from a profile to its filtered construct view.
17. Profile focus: remove raw IDs and redundant availability/resource counts from the first view.
18. Study review: place documented uses immediately after use/scoring, with application records first and a three-card initial view.
19. Standard context: link mapped criteria back to their standard page, retaining caveats.
20. Universal findability: include measures in global search and make keyboard Enter follow the selected measure/document result.

Follow-up from the user: renamed saved candidates as a **test bed shortlist**, kept existing browser-local selections, removed the arbitrary four-measure cap and duplicate profile bar, and made the comparison page explicitly about measures saved for a test bed. The weighted and Raw NASA-TLX profiles now contain separately sourced, step-by-step administration/scoring procedures, six dimension definitions/anchors, Performance direction, and the weighted 15-pair checklist. See `docs/research/nasa-tlx-administration-and-scoring.md` for the NASA primary-source audit. MIL-STD-1787D is represented only by verified ASSIST metadata because its current full text is controlled; no clause mapping is invented.

Current validation: `python tools/codex/check.py full` passed (6 tooling tests, 7 Python platform tests, 31 JavaScript tests, 70-page Pages build, zero build warnings, zero broken local links). Browser QA covered finder, weighted and Raw TLX profiles, test bed saving/comparison, global search keyboard navigation, MIL-STD-1787D access boundary, 390-pixel phone and 1440-pixel desktop layouts, and dark-theme contrast. No horizontal overflow at either tested width.

## Remaining and next action
Give the inventory and template to the user for the external Scholar pass. Ingest returned rows with source-level validation. Expand the standard browser clause by clause only where public, authorized text is available; MIL-STD-1787D remains metadata-only until authorized text is provided. Do not present these interim source-backed mappings as a complete standard-by-standard treatment or a comprehensive study-use review.

## Sources and decisions
- The canonical catalog is `domains/pvi-measurement/catalog/measures.json`; the inventory must reflect it exactly rather than introduce a second hand-maintained list.
- Candidate operational measures may not appear under the Atlas label in papers. Search and appraisal must use the defined quantity and operationalization while distinguishing exact, variant, and related matches.
- “Used” means administered, calculated, observed, or analyzed in the study; citation or discussion alone is not study use.
- No clause, coefficient, result, access level, or source inspection will be inferred or invented.
