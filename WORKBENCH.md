# Task-analysis engineering workbench

The workbench is a browser-local application for building an explicit engineering chain:

`scenario → task → decision → information/control need → requirement → test → evidence`

The chain is a model of recorded links. It is not proof that the links are correct, complete, authoritative, or approved.

## Start and protect the data

1. Build and serve the Atlas using the commands in `README.md`.
2. Open `http://127.0.0.1:8000/#/workbench`.
3. Set the project title and purpose before entering records.
4. Export JSON at the end of each working session. Browser storage can be cleared by the browser or user.
5. Store an export only in an approved location. The application never writes it into this repository automatically.

All authoring data is stored under `human-engineering-task-workbench-v2` in the current browser profile. On the same origin, a legacy `fighterjets-ii-task-workbench-v2` project is recovered when the new key is empty. The canonical research Markdown and CSV under `domains/` are read-only from the application's perspective.

## Recommended engineering sequence

1. Define scenarios with explicit initial states, triggers, success states, failure states, actors, and basis.
2. Create root tasks and add child tasks. Use the hierarchy view to inspect decomposition and Validation to detect parent cycles.
3. Attach decisions to tasks. Record alternatives, cues, uncertainties, time available, and consequence.
4. Derive information and control needs. Keep information semantics separate from display placement and control intent separate from widget choice.
5. Write requirements only after connecting them to upstream needs, tasks, decisions, or scenarios.
6. Define objective tests and operational definitions. A result status other than `not-run` should link to evidence.
7. Register evidence with a precise locator and an honest access status: discovered, acquired, read, or appraised.
8. Review Traceability, Validation, and coverage. Resolve issues or record why they remain open.
9. Export a versioned JSON backup and the CSV registers needed for review or another approved tool.

## Record governance

- `basis` distinguishes unknown, observed, reported, specified, inferred, and hypothetical records.
- `status` distinguishes draft, in-review, accepted, and retired records.
- `evidenceIds` are explicit links; prose that mentions a source is not automatically evidence.
- Deleting a record does not silently rewrite its inbound links. Validation reports the broken references so the analyst decides how to repair them.
- Coverage is the percentage of records with expected links. It does not score source quality or operational validity.
- Automated validation checks IDs, required fields, references, task cycles, test coverage, evidence links, and selected status/basis conflicts. Human review remains necessary.

## Import and export

**JSON** preserves the full project, relationships, metadata, and activity log. Import replaces the current browser project after confirmation; Undo can restore the previous state until the page is closed.

**CSV** operates on the currently open register. Multi-record links use semicolon-delimited IDs for compatibility with the existing templates. Quoted commas, quotes, and line breaks are supported. Unknown non-empty columns are retained in `importedFields` in the JSON model rather than silently discarded. CSV import refuses IDs already present in that register.

The combined `requirements-tests.csv` template can be imported into Requirements, but test-specific columns not represented in the requirement editor remain preserved as imported fields. Create formal Test records for executable verification traceability.

## Keyboard and accessibility

- `Ctrl/Command + S`: save the open record.
- `Alt + 1`, `2`, `3`, `4`: open Overview, Task hierarchy, Traceability, and Validation.
- `Ctrl/Command + Z` and `Ctrl/Command + Y`: undo and redo when focus is outside an editing field.
- All authoring controls have programmatic labels, visible focus indicators, and keyboard-operable navigation. Tables scroll horizontally on narrow screens, and animation respects the Atlas reduced-motion rule.

## Known boundaries

- One browser profile is the persistence boundary; there is no multi-user editing, authentication, server synchronization, or conflict resolution.
- Undo/redo history lasts only for the open page session. JSON export is the durable recovery mechanism.
- The model does not evaluate the truth, classification, licensing, or release status of content.
- The interface is not a certification, safety-case, requirements-management, or configuration-control authority.
- The application can be published as static GitHub Pages, but project records remain browser-local and are never written to GitHub automatically.

## Quality review panel (extended workbench)

Open **Quality review** to inspect advisory prompts on task context/end states, decision alternatives/time, information timeliness, control inhibits/feedback, test criteria, performance thresholds, evidence review status, and possibly repeated statements. Each prompt opens its affected editable record.

Download the review as **CSV** (for structured triage) or **Markdown** (for human review notes). CSV string fields are escaped and leading spreadsheet formulas are neutralized; do not treat CSV export as evidence acceptance. The rules are not a completeness model, safety analysis, SAE/FAA/DoD compliance determination, or independent validation. Use **Validation** for broken references, required-field checks, and task cycles.

The hosted Pages interface stores workbench project edits in the visitor's *own browser*, not in GitHub or a shared server. Export JSON backups frequently; losing browser storage loses the working records.
