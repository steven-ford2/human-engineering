# Repository map
The repository now combines a portable Codex workflow with the migrated task-analysis and usability-measurement corpus and its static application.

| Task | Start here |
| --- | --- |
| Project scope | README.md |
| Domain registry | workspace.json |
| Task-analysis research | domains/task-analysis/README.md |
| Usability and PVI measurement | domains/pvi-measurement/README.md |
| Interactive application | platform/README.md |
| Migration provenance | MIGRATION.md |
| Human engineering research | docs/research/README.md |
| Methods and measurement | docs/methods/README.md |
| Evidence and provenance | docs/evidence/README.md |
| Durable task handoff | docs/codex/tasks/ |
| Agent tooling | tools/codex/; codex-project.json |

Add source-backed research under the appropriate canonical domain. Do not duplicate either FighterJets repository without an explicit task. Run `python tools/codex/check.py platform` for the application and corpus checks or `full` for the complete configured profile.
