# Migrate task analysis and usability measurement

## Objective and acceptance criteria

Move the canonical task-analysis and usability-measurement domains from `steven-ford2/fighterjets2` into this repository, preserve the source material and provenance, add a dedicated interactive interface, and verify navigation, builds, tests and link consistency. Remove the migrated collections from FighterJets II only after this destination is complete.

## Branch and source of truth

- Branch: `codex/migrate-task-analysis-interface`
- Destination: `domains/task-analysis/`, `domains/pvi-measurement/`, `platform/`
- Source snapshot: `steven-ford2/fighterjets2` commit `c9bcca6c36f45f15bd746b65e99fed6ef3e5f72f`

## Completed

- Preserved all 67 canonical source-domain files; three destination files have intentional repository-label or current-count updates recorded in `MIGRATION.md` and the commit diff.
- Added a Human Engineering visual system, two-domain navigation, a task-analysis workbench, a 212-measure/31-construct Measurement Atlas, 25 study-design patterns, methods reading, knowledge and study tools.
- Added browser-local migration from the legacy FighterJets II workbench key, validation and Pages workflows, repository check profiles, and explicit public/private interpretation boundaries.
- Updated the pre-existing Codex scaffold without removing its workflow, task, research, methods or evidence structure.

## Verification

- `python tools/codex/check.py tooling` — passes locally on Windows.
- `python tools/codex/check.py full` — passes locally on Windows.
- Browser QA — home, construct filtering, a NASA-TLX evidence profile, legacy workbench recovery and quality review inspected in the in-app browser.
- File preservation audit — 67 source files present, zero missing; 64 byte-identical and three intentionally updated metadata/readme files.

## Remaining and next action

Open the pull request, confirm GitHub Actions and Pages deployment, merge it, then complete and publish the coordinated FighterJets II removal commit.

## Sources and decisions

- The source repository commit above is the migration source of record.
- `MIGRATION.md` defines the boundary: authored task-analysis and PVI-measurement domains move here; HMD source-corpus items that merely mention those subjects remain in FighterJets II.
- Catalog totals are read from the transferred JSON: 212 measures, 31 constructs, 20 sources and 25 study-design patterns.
