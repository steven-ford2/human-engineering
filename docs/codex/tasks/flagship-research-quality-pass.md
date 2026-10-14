# Flagship research and quality pass

## Objective and acceptance criteria
Increase the repository's scientific and practical value without indiscriminate catalog growth. Use a gap-driven research pass to connect task analysis, measurement selection, standards/guidance, and verification evidence in a practitioner-ready workflow. Preserve public-source and authority boundaries, improve the HTML interface, verify desktop/mobile behavior, run the full repository checks, and publish through a pull request.

## Branch and source of truth
Branch: `codex/flagship-research-quality-pass`, based on `origin/main` at `0e1e852`.

Canonical paths:
- `domains/task-analysis/`
- `domains/pvi-measurement/`
- `docs/research/`
- `platform/app/`
- `tools/build_measurement_evidence.mjs`

## Completed
- Confirmed a clean baseline on the merged measurement-expansion work.
- Audited evidence coverage: 279 measures; 14 curated measure profiles; 33 appraised study records covering 31 measures; 103 measures with standards/guidance mappings; 163 measures without any of those three enhanced evidence links. Separately, 248 measures have no curated profile or appraised-study record and are now exposed as the targeted-appraisal queue even when a standards mapping exists.
- Selected the high-leverage gap: the task-analysis workbench and Measurement Atlas lack a single interactive workflow that turns a scenario/task claim into a bounded verification evidence plan.
- Completed one tightly scoped primary-source research pass for practitioner verification pathways by reusing the official sources already acquired and cited in the repository; no broad new web search was needed.
- Added a source-cited flagship research note identifying five blocking gaps and developing four pathways: display/alert legibility, HUD/HMD integration, workload/mode-management/handling qualities, and pilot accommodation/ergonomics.
- Added four structured verification pathways to the evidence library, with validated cross-references to measures and standards mappings. The generator now fails on unknown measure IDs instead of silently dropping them.
- Built the interactive Verification Studio with a task-to-evidence chain, complementary evidence-role stacks, condition and artifact checklists, criteria/guidance cards, interpretation gates, source links, deep links into every measure profile, a workbench bridge, and a copyable planning brief.
- Improved the finder with shareable evidence-status filtering, honest curation/queue counts, and separate profile/study/mapping badges. Updated the coworker guide and home workspace navigation.
- Added a blank verification-case CSV register plus linked task-analysis, standards, research-index, domain, and root documentation.
- Added automated pathway integrity, evidence-filter, and public-artifact checks.

## Verification
- `python tools/codex/check.py full` passes: 6 tooling tests, 7 Python platform tests, and 27 JavaScript tests; 70-page Pages build with zero warnings; 137 local links in 57 Markdown files with zero broken links.
- Real-browser desktop checks passed for the pathway index, the display/alert detail workflow, all 18 linked measure roles, five source-authority mappings, and the planning-brief copy interaction.
- Real-browser finder check confirmed the new profile filter writes `evidence=profile` into the address and returns exactly 14 curated profiles.
- Responsive check at 390 × 844 confirmed the pathway detail and filtered finder have no document-level horizontal overflow (`scrollWidth == clientWidth == 375` in the viewport content area). The phone layout was visually reviewed.
- The browser reported only generic extension message-channel errors with no application stack; syntax, behavior, build, and navigation checks remained clean.

## Remaining and next action
Commit, open a pull request, allow repository checks to complete, merge, then verify the deployed GitHub Pages routes.

## Sources and decisions
- Breadth alone is not the target: absence of an enhanced evidence record means “not yet appraised,” not “no evidence exists.”
- Requirements, official guidance, empirical validation, psychometrics, and candidate operational measures remain separate evidence classes.
- A verification pathway is a planning aid. It cannot establish contractual applicability, certification, airworthiness, or scientific validity by itself.
- Only public sources are in scope; controlled full texts remain metadata-only until legitimately accessed through an authorized channel.
- The new verification-case register is a companion planning artifact; it is not yet a native browser-workbench register/import target.
