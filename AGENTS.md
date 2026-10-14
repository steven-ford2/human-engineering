# Human Engineering agent instructions

Purpose: public-source task analysis, cognitive work engineering, usability measurement, and human-systems research.

- Canonical research materials live under `domains/` and are not silently rewritten.
- `workspace.json` is the only domain registry. The static renderer lives in `platform/`.
- Preserve provenance, source links, technical terminology, and the boundary between source evidence, derivative synthesis, assumptions, and proposed methods.
- Do not invent study results, instrument properties, psychometric coefficients, thresholds, standards requirements, or measured outcomes.
- Treat candidate measures as context-dependent operationalizations, not universal proxies for workload, situation awareness, usability, safety, or performance.
- Keep the engineering chain explicit: scenario -> task -> decision -> information/control need -> requirement -> test -> evidence.
- Public Pages content must remain suitable for public release. Never add restricted, proprietary, employer, export-controlled, CUI, or classified material.
- Tests: `python -m unittest discover -s platform/tests -v`; `node --check platform/app/app.js`; `node --test platform/tests/test_measurement.mjs platform/tests/test_workbench.mjs platform/tests/test_workbench_quality.mjs`; `python platform/build.py --profile pages`; `python tools/check_links.py`.

