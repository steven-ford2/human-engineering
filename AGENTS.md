# Human Engineering agent instructions

Purpose: public-source task analysis, cognitive work engineering, usability measurement, and human-systems research.

## Working method

- For a new task read `CODEX.md`, `docs/codex/REPO_MAP.md`, and the relevant source entry point. Read `docs/codex/STATUS.md` only for setup state; inspect Git and task handoffs for current work.
- Use `rg --files` and scoped `rg` searches before reading entire directories. Without `rg`, use `python tools/codex/context.py "literal terms" --path <course-or-domain> --limit 20`.
- Read only relevant source sections. Do not bulk-read the corpus, inline base64 images, or duplicate canonical material across repositories.
- Treat short phone requests as complete tasks: infer routine implementation details, implement, verify, and produce a concise result. Ask only for missing decisions that change scope or outcome.
- Keep one task on one branch; never overwrite concurrent work. Use PRs for subsequent implementation work unless the user requests a direct commit.
- For a long task, maintain `docs/codex/tasks/<task-slug>.md` using the handoff template. Record exact paths, completed work, check results, blockers and the next action.
- Report which checks actually ran, their results, and any existing failures. A dry run is not a test pass.
- Do not modify unrelated research or deployment settings outside the task's scope.

## Technical and source quality

- Canonical research materials live under `domains/` and are not silently rewritten. `workspace.json` is the domain registry; the static renderer lives in `platform/`.
- Write at postgraduate engineering depth. Preserve established terminology, provenance, source links and rights boundaries.
- Distinguish primary-source facts, derivative synthesis, assumptions, illustrative models and unverified claims. Cite exact edition/revision and page/section where actually inspected.
- Never invent quotations, standard clauses, source access, measurements, aircraft capabilities, implementation status, study results, psychometric coefficients, thresholds or test results.
- Treat candidate measures as context-dependent operationalizations, not universal proxies for workload, situation awareness, usability, safety or performance.
- Keep the engineering chain explicit: scenario -> task -> decision -> information/control need -> requirement -> test -> evidence.
- Public Pages content must remain suitable for public release. Never add restricted, proprietary, employer, export-controlled, CUI or classified material.
- Structural coverage, word counts and trace percentages do not establish scientific or instructional quality.

## Commands

- Setup: `python tools/codex/setup.py`
- Tooling checks: `python tools/codex/check.py tooling`
- Platform checks: `python tools/codex/check.py platform`
- Full checks: `python tools/codex/check.py full`
