# Human Engineering

Human Engineering is a public, source-conscious workspace for moving from observed work to defensible human-system requirements and measurement plans. It brings together the complete task-analysis curriculum and workbench previously maintained in `fighterjets2` with the complete PVI usability and workload measurement catalog.

[Codex workflow](CODEX.md) · [Repository map](docs/codex/REPO_MAP.md) · [Migration provenance](MIGRATION.md)

## Interactive interface

The static HTML application provides four connected modes:

- **Task-analysis workbench** — author scenarios, hierarchical tasks, decisions, information needs, control needs, requirements, tests, and evidence; review traceability, structural diagnostics, coverage, and quality; exchange complete JSON projects and per-register CSV.
- **Measurement Atlas** — search and filter 279 candidate measures across 34 constructs and aviation contexts; open evidence-rich profiles with reliability, validity, factor/item results, appraised study uses, and clause-level verification mappings; browse 25 study-design patterns.
- **Psychometrics field guide** — learn validity-evidence types, reliability/precision, EFA/CFA, item loadings, invariance, DIF, IRT, responsiveness, and decision uncertainty without treating a coefficient as a permanent property of a measure.
- **Standards explorer** — find candidate evidence grouped by current MIL-STD-1472H, MIL-HDBK-516D, MIL-STD-46855A, MIL-HDBK-87213B, MIL-STD-3009, and supplemental FAA/NASA sources, with authority and transfer boundaries kept visible.
- **Methods and curriculum** — read the 16-week course, field methods, worked synthetic cases, templates, evidence synthesis, assessment material, and measurement guidance.
- **Knowledge and study tools** — follow cross-document concepts, keep local notes and bookmarks, and practice source-authored recall prompts.

All browser-authored data stay in the current browser unless explicitly exported. The interface has no server write path.

## Run locally

```bash
python -m pip install -r platform/requirements.txt
python platform/build.py --profile pages
python -m http.server --bind 127.0.0.1 --directory platform/dist 8000
```

Open `http://127.0.0.1:8000/`.

## Verify

```bash
python tools/codex/check.py full
```

The full profile runs the Python build tests, JavaScript syntax and behavior suites, the curated Pages build, and the repository link audit.

## Research boundaries

The repository contains public research, original synthesis, reusable templates, and synthetic examples. Candidate measures are not automatically valid for a new task, population, simulator, display, or operational context. A high questionnaire score, a physiological difference, or a successful structural trace does not by itself establish safety, certification, operational validity, or causal efficacy. Verify original instrument manuals and current standards before professional use.

See [MIGRATION.md](MIGRATION.md) for file-level provenance and [WORKBENCH.md](WORKBENCH.md) for operation and data safeguards.
