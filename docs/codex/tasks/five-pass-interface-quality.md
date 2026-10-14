# Five-pass Measurement Atlas interface quality

## Objective and acceptance criteria
Improve the Measurement Atlas through five explicit quality iterations. Keep the main workflow focused on finding a measure, deciding whether it fits a study or verification need, understanding how to use it, and inspecting evidence and limitations. Remove inventory counts and update-history-style metadata from the primary interface. Preserve all research content, sources, links, filters, and verification boundaries. Verify desktop and phone-width behavior, keyboard access, navigation, and repository consistency.

## Branch and source of truth
Branch: `codex/five-pass-interface-quality`, based on `origin/main`.

Canonical research remains under `domains/pvi-measurement/`. Interface changes belong under `platform/app/`; no source assertions or research records should be changed for this task unless a verified defect is found.

## Completed
- Captured and inspected the current Finder, representative measure profile, Verification studio, and coworker walkthrough in the live GitHub Pages site.
- Confirmed the main information-hierarchy problem: inventory counts and the full filter taxonomy appear before the user receives help framing a decision.
- Pass 1 — rebuilt the Finder around outcome questions, search-first interaction, progressive advanced filters, evidence-meaning labels, and shareable state; removed coverage and inventory totals from the primary workflow.
- Pass 2 — rebuilt measure profiles around “what it can tell you,” “how to collect it,” and “do not interpret without,” with progressive evidence sections for administration, reliability, validity, factor/item evidence, prior studies, standards, and analysis.
- Pass 3 — added a browser-local study set and comparison table for up to four serious candidates; comparison exposes evidence roles and interpretation boundaries without ranking measures.
- Pass 4 — simplified Verification studio entry cards and the coworker guide around operational questions and a direct live demonstration route; removed measure/mapping totals and home-screen inventory metadata.
- Pass 5 — ranked direct context fits and inspectable evidence first, removed remaining non-decision counts from measurement planning and standards pages, repaired SPA-safe profile evidence navigation and the global skip link, improved responsive/dark-theme presentation, and added ranking coverage.

## Verification
- `python tools/codex/check.py full` — PASS: 6 tooling tests, 7 build tests, 28 Node tests, Pages build, and 137 local Markdown links; no build warnings or broken local links.
- Local HTTP preview at desktop width — inspected Finder, answer-first profile, comparison, Verification studio, guide, psychometrics, standards, and study-design routes.
- Phone-width preview at 390 × 844 — inspected Finder and profile reflow, horizontal subnavigation, study-set controls, hero actions, and progressive evidence layout.
- Interaction checks — decision preset updates the shareable URL; workload results rank direct, inspectable measures first; live NASA-TLX search retains input focus; study-set add/remove/compare works; profile evidence controls open and focus the requested section without corrupting the hash route; skip link preserves the SPA route and focuses main content.
- Light and dark appearance inspected. Browser console messages observed were Chrome-extension message-channel errors, not application exceptions.

## Remaining and next action
Complete. Pull request #5 was squash-merged to `main` as `f449619`; verify the deployed GitHub Pages routes after the Pages workflow finishes.

## Sources and decisions
- Current product screenshots captured 2026-10-14 from the live GitHub Pages site.
- User decision: do not foreground update status, resource totals, or similar inventory metadata.
- Default primary question: “Can I use this measure for this study or test, and exactly how?” Psychometric evidence, prior uses, standards relevance, and caveats should be progressively revealed.
- This is an information-architecture and interaction change. It does not alter scientific claims or standards authority.
