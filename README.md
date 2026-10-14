# Human Engineering

Human Engineering is a public, source-conscious workspace for moving from observed work to defensible human-system requirements and measurement plans. It brings together the complete task-analysis curriculum and workbench previously maintained in `fighterjets2` with the complete PVI usability and workload measurement catalog.

## Interactive interface

The static HTML application provides four connected modes:

- **Task-analysis workbench** — author scenarios, hierarchical tasks, decisions, information needs, control needs, requirements, tests, and evidence; review traceability, structural diagnostics, coverage, and quality; exchange complete JSON projects and per-register CSV.
- **Measurement Atlas** — search and filter 212 candidate measures across 31 constructs; inspect operational definitions, units, collection timing, reliability/validity cautions, small-sample guidance, and source anchors; explore 25 study-design patterns.
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
python -m unittest discover -s platform/tests -v
node --check platform/app/app.js
node --check platform/app/measures.js
node --check platform/app/workbench.js
node --test platform/tests/test_measurement.mjs platform/tests/test_workbench.mjs platform/tests/test_workbench_quality.mjs
python platform/build.py --profile pages
python tools/check_links.py
```

## Research boundaries

The repository contains public research, original synthesis, reusable templates, and synthetic examples. Candidate measures are not automatically valid for a new task, population, simulator, display, or operational context. A high questionnaire score, a physiological difference, or a successful structural trace does not by itself establish safety, certification, operational validity, or causal efficacy. Verify original instrument manuals and current standards before professional use.

See [MIGRATION.md](MIGRATION.md) for file-level provenance and [WORKBENCH.md](WORKBENCH.md) for operation and data safeguards.

