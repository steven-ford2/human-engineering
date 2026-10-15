# Stick/inceptor paper intake and first study-evidence pass

## Objective and acceptance criteria

Ingest the user's 2026-10-15 pasted list of 34 candidate papers into a durable research queue; add only source-checked, measure-matched studies to the public measure finder. Preserve the physical-deflection versus force versus normalized-command distinction and source-specific operational definitions of aggressiveness and duty cycle. Do not imply the queue is exhaustive or that a cited paper validated a universal workload proxy.

## Branch and source of truth

Branch: `codex/stick-inceptor-study-evidence` from `origin/main` at `db07baa` (before this task's edits). Canonical catalog: `domains/pvi-measurement/catalog/measurement-evidence.json` and `measures.json`. Research records: `docs/research/stick-inceptor-paper-intake.md` and `docs/research/stick-inceptor-primary-source-audit.md`. Interface: `platform/app/measures.js` renders linked study cards from the catalog; no UI code change was needed for these records.

## Completed

- Preserved all 34 user-supplied titles as leads, visibly separated from curated evidence.
- Checked full original/published texts for Hebbar and Pashilkar 2016, Hanson et al. 2014, Niewind 2012 (two DLR reports), Mayer and Cox 2003, Carter and Stoliker 2000, Schaefer et al. 2011, and Brandon et al. 1995. Checked original abstracts/metadata for several other leads; the audit names access limits.
- Added five detailed study records for Hebbar 2016, Hanson 2014, Niewind 2012 (two linked reports from one simulator-data family), and Carter 2000. Their cards state task, operationalization, population/context, appraisal, primary link, and locator. Mayer's normalized flight-control command, Brandon's stick-force plots, and Schaefer's pitch-versus-roll trace were not misfiled as direct stick-deflection workload measures.
- Clarified the source-defined units for stick aggressiveness and added a targeted regression test for the distinct duty-cycle definitions and catalog mappings.

## Verification

- `python tools/codex/check.py platform`: passed after all edits; 6 tooling tests, 7 build tests, 32 Node tests, Pages build with 0 warnings, 137 local links with 0 broken.
- `node --test platform/tests/test_measurement.mjs`: passed 14/14 after the new targeted test.
- Manual catalog integrity check: 38 total study records, unique IDs, no broken measure IDs; 34 numbered intake titles.
- Confirmed the built `platform/dist/measurement-data/measurement-evidence.json` contains the Hanson record. A rendered-browser spot check was not completed because the Playwright prerequisite `npx` is unavailable in this workspace; do not call it a visual pass.
- The first PR CI run failed only at its hard-coded public-artifact assertion of exactly 33 studies after the catalog grew to 38. Updated the workflow to require at least 38 studies; the matching built-artifact assertion passed locally. Await the next GitHub validation run before considering CI green.

## Remaining and next action

This is a bounded first pass, not completion of the 34-paper appraisal. Next, obtain original full texts for the still-unappraised leads, prioritize direct control-input operationalizations, and add a study card only when the signal/calculation/task and locator can be verified. In particular, seek accessible full articles for Babu 2022 and Hebbar/Pashilkar 2017 before recording detailed procedures. If browser tooling becomes available, visually inspect PIW, stick duty cycle, and stick spectral power pages at desktop and narrow widths.

## Sources and decisions

See the two research notes for exact URLs and page/section locators. Primary reviewed sources include [DRDO 2016](https://publicationsdrdo.in/index.php/dsj/article/download/9196/5442), [NASA 2014](https://ntrs.nasa.gov/citations/20140005730), [DLR 2012 /74](https://elib.dlr.de/88208/), [DLR 2012 /69](https://elib.dlr.de/88213/), [NASA 2003](https://ntrs.nasa.gov/citations/20040013308), and [NASA 2000](https://ntrs.nasa.gov/citations/20000080122). The user-supplied snippets served as leads only. “Duty cycle” is percentage of time active in Hebbar/Niewind but peaks/reversals per second in Hanson; no shared cutoff is asserted. The two Niewind reports share a 24-pilot simulator dataset and are not independent replications.
