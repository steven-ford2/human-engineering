# Five-pass Measurement Atlas interface quality

## Objective and acceptance criteria
Improve the Measurement Atlas through five explicit quality iterations. Keep the main workflow focused on finding a measure, deciding whether it fits a study or verification need, understanding how to use it, and inspecting evidence and limitations. Remove inventory counts and update-history-style metadata from the primary interface. Preserve all research content, sources, links, filters, and verification boundaries. Verify desktop and phone-width behavior, keyboard access, navigation, and repository consistency.

## Branch and source of truth
Branch: `codex/five-pass-interface-quality`, based on `origin/main`.

Canonical research remains under `domains/pvi-measurement/`. Interface changes belong under `platform/app/`; no source assertions or research records should be changed for this task unless a verified defect is found.

## Completed
- Captured and inspected the current Finder, representative measure profile, Verification studio, and coworker walkthrough in the live GitHub Pages site.
- Confirmed the main information-hierarchy problem: inventory counts and the full filter taxonomy appear before the user receives help framing a decision.

## Verification
Pending implementation. Required final checks: `python tools/codex/check.py full`, built Pages preview, desktop and phone-width browser QA, keyboard flow, route/link consistency, and browser console review.

## Remaining and next action
Implement and commit five bounded interface passes, testing after each meaningful change; then open, merge, and verify a pull request and deployed Pages result.

## Sources and decisions
- Current product screenshots captured 2026-10-14 from the live GitHub Pages site.
- User decision: do not foreground update status, resource totals, or similar inventory metadata.
- Default primary question: “Can I use this measure for this study or test, and exactly how?” Psychometric evidence, prior uses, standards relevance, and caveats should be progressively revealed.
- This is an information-architecture and interaction change. It does not alter scientific claims or standards authority.
