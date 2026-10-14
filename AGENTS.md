# Human Engineering agent instructions

Purpose: Public-source human engineering research scaffold; no pre-existing application or corpus.

## Working method
- For a new task read CODEX.md, docs/codex/REPO_MAP.md, and the relevant source entry point. Read docs/codex/STATUS.md only for setup state; inspect git and task handoffs for current work.
- Use rg --files and scoped rg searches before reading entire directories. Without rg, use python tools/codex/context.py "literal terms" --path <course-or-domain> --limit 20.
- Read only relevant source sections. Do not bulk-read the corpus, inline base64 images, or duplicate canonical material across repositories.
- Treat short phone requests as complete tasks: infer routine implementation details, implement, verify, and produce a concise result. Ask only for missing decisions that change scope or outcome.
- Keep one task on one branch; never overwrite concurrent work. Use PRs for subsequent implementation work unless the user requests a direct commit.
- For a long task, maintain docs/codex/tasks/<task-slug>.md using the handoff template. Record exact paths, completed work, check results, blockers and the next action. Commit handoffs with the work; do not rely on chat memory.
- Report which checks actually ran, their results, and any existing failures. A dry run is not a test pass.
- Do not modify unrelated research or change deployment settings as part of a setup or editing task.

## Technical and source quality
- Write at postgraduate engineering depth. Preserve established technical terminology and define uncommon terms.
- Distinguish primary-source facts, derivative synthesis, assumptions, illustrative models and unverified claims. Cite exact edition/revision and page/section where actually inspected.
- Never invent quotations, standard clauses, source access, measurements, aircraft capabilities, implementation status or test results.
- Keep source text, figures, locator metadata, provenance and rights boundaries intact. Structural coverage and word counts do not establish scientific or instructional quality.

## Commands
- Setup once per environment: python tools/codex/setup.py
- Agent tooling checks: python tools/codex/check.py tooling
- No platform/full profile exists until an application or corpus is implemented.
- Profile command inventory: python tools/codex/check.py <profile> --dry-run
