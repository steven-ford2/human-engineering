# Expand measurement evidence and standards coverage

## Objective and acceptance criteria
Expand the Measurement Atlas so a coworker can learn the finder quickly, open a dedicated profile for each measure, inspect source-bounded psychometric and study-use evidence, understand core psychometric concepts, and browse aviation/HMD/HUD/vision/ergonomics measures by applicable public military or civil guidance. Preserve honest evidence boundaries, update the HTML interface, validate desktop/mobile navigation, and publish through the repository workflow.

## Branch and source of truth
Branch: `codex/expand-measurement-evidence`, based on `origin/main` at `e748455`.

Canonical paths:
- `domains/pvi-measurement/catalog/`
- `domains/pvi-measurement/guides/`
- `domains/pvi-measurement/research/`
- `platform/app/`

## Completed
- Inspected the current 212-measure catalog, renderer, tests, and repository instructions.
- Completed two primary-source research passes: psychometric quality/study use and aviation/standards coverage.
- Added 67 source-backed aviation, HUD/HMD, visual-performance, NVIS, simulator, handling, anthropometric, and ergonomic candidate measures (279 total across 34 constructs).
- Added the evidence library with 33 appraised study records, 14 deep measure profiles, 21 psychometric concepts, 9 current standards/guidance records, and 17 clause-level mapping groups.
- Rebuilt the Measurement Atlas interface with shareable aviation/standards filters, a 10-minute coworker walkthrough, evidence-rich measure profiles, a psychometrics field guide, standards explorer, and item-loading display support.
- Added/updated durable research notes, source index, measurement guidance, standards-verification guide, READMEs, and validation tests.

## Verification
- Unit-level measurement catalog/evidence validation passes (`node --test platform/tests/test_measurement.mjs`).
- Full repository validation passes (`python tools/codex/check.py full`): 6 tooling tests, 7 Python platform tests, 25 JavaScript tests, a 69-page public build with zero warnings, and 131 local Markdown links with zero breakage.
- Real-browser desktop checks passed for the finder, HMD/HUD preset (94 results), show-more state (60 → 94 without reset), SUS deep profile (3 studies, standards mapping, 10 cited item loadings), 9-source standards explorer, MIL-HDBK-516D authority note, five-step coworker guide, and 21-concept psychometrics guide.
- Responsive checks at 390 × 844 found and fixed two horizontal-overflow defects (late search-button CSS override and profile grid min-content width). Finder and profile then measured no document-level horizontal overflow.
- Final full repository validation repeated clean after responsive fixes. Hosted Pages verification remains pending.
- Initial GitHub validation reached and passed every code/build/link step, then the public-artifact guard failed because it still asserted the pre-expansion totals. Updated the guard to assert the new catalog/evidence totals; rerun pending.

## Remaining and next action
Commit, open a PR, merge after checks, and verify GitHub Pages.

## Sources and decisions
- Published reliability coefficients are not transferable properties of an instrument; profiles must keep population, protocol, estimator, and locator attached.
- A standard mapping will distinguish direct requirement/guidance, verification-evidence candidate, and contextual relevance. It will not claim compliance from a measure alone.
- MIL-HDBK-516D (29 May 2026) superseded 516C. The UI identifies it as guidance that cannot itself be cited as a requirement.
- Item-loading matrices are stored only when the exact study table was inspected. The initial interface includes the 10 item loadings from Borsci et al. (2009), Table 3, for that study's correlated two-factor SUS model; all other profiles display an explicit evidence gap rather than invented values.
