# Migration ledger

- Source repository: `steven-ford2/fighterjets2`.
- Source tree: `c9bcca6c36f45f15bd746b65e99fed6ef3e5f72f` (October 13, 2026).
- Destination repository: `steven-ford2/human-engineering`.
- `domains/task-analysis/**`: 58 files transferred with directory structure, links, references, templates, course material, cases, literature, training, and production metadata preserved.
- `domains/pvi-measurement/**`: 9 files transferred, including the 201-measure / 31-construct catalog, 25 study-design patterns, source register, guides, and templates.
- Task-analysis workbench modules, quality review, data model, CSV/JSON exchange, styling, operating guide, development record, and automated tests were transferred.
- Measurement explorer modules, styling, and automated catalog tests were transferred.
- The HTML reader/build system was adapted into a dedicated Human Engineering interface. Repository identity, browser-storage keys, source URLs, navigation, and public Pages automation were updated for the destination.

The migration boundary is authored task-analysis and measurement-library content. HMD reference conversions that merely mention task analysis, workload, usability, or measurement remain in `fighterjets2` because they are part of that repository's source corpus, not the authored task-analysis or PVI-measurement domains.

Git history in `fighterjets2` remains the immutable provenance record for the source state. The destination preserves the source tree and records the transfer explicitly rather than claiming an independent origin.

