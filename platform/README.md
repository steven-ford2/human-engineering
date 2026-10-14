# Human Engineering HTML workspace

The interface is a static, buildless browser application generated from the two domains registered in `workspace.json`. It combines a source reader, knowledge index, local study state, the task-analysis workbench, and an evidence-aware measurement explorer with a guided demo, psychometrics field guide, standards crosswalk, and detailed measure profiles.

## Build and serve

```bash
python -m pip install -r platform/requirements.txt
python platform/build.py --profile pages
python -m http.server --bind 127.0.0.1 --directory platform/dist 8000
```

Open `http://127.0.0.1:8000/`.

## Persistence

- Reading progress, notes, bookmarks, and recall history use `human-engineering-atlas-state-v1`.
- Workbench projects use `human-engineering-task-workbench-v2`.
- On first load, the workbench can recover the legacy `fighterjets-ii-task-workbench-v2` value when the new key is absent, then persists under the new key.
- Neither store is synchronized or treated as a confidential vault. Export JSON backups before clearing browser data.

## Public build

The two registered domains contain public-source research and original authored material selected for this public repository. The Pages workflow builds the exact registered tree, validates the measure catalog and workbench model, checks local Markdown links, and publishes `platform/dist` only after validation.

The builder sanitizes rendered Markdown, compiles CSV/JSON as inspectable data pages, emits search and concept indexes, and copies the measurement JSON into a dedicated explorer data directory. It does not call external services or modify source files.

