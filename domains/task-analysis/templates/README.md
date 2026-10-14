# Reusable working CSV templates

These are **proposed, generic and non-program-authoritative** templates. They are intentionally normalized rather than a universal giant spreadsheet. Import into a program-approved tool and manage version/provenance there.

1. `scenarios.csv` — coverage, modes and initial/end conditions.
2. `tasks.csv` — operator goal, triggers, plans and performance.
3. `decisions.csv` — decisions, alternatives, cues and deadlines.
4. `information-needs.csv` — decision-linked information requirements and required–available gaps.
5. `control-needs.csv` — intent, authority, signal/state/feedback/exception analysis.
6. `requirements-tests.csv` — trace requirements into objective, observable tests.
7. `verification-cases.csv` — freeze one reviewable verification argument from authority and configuration through conditions, measure roles, artifacts, findings, discrepancies and disposition. This companion register is not currently imported by the browser workbench.

## Link semantics
IDs: SC-, F-, T-, D-, IN-, CN-, R-, TEST-, EV- followed by stable number or UUID. Store multi-link values as `;`-delimited IDs only as a **transitional CSV convenience**; real database links should be normalized into join tables. **Do not automatically treat human-readable prose as source evidence.**

### Mandatory review behavior
- All rows include `status`, `basis` and `evidence_ids`; unknowns and assumptions are explicit.
- Use `observed`, `reported`, `specified`, `inferred` and `hypothetical` accurately.
- Mode/authority requirements are distinct from screen placement decisions.
- An empty `required_by_time` field means **not established**, never zero/irrelevant.
- For quantitative values specify units, reference frame, conditions and source/rationale.
- Prioritize controlled access and program-approved environments for real Boeing information.

## Import/use
Begin with one scenario, 3–5 tasks, 2–3 decisions, then connect information/control needs. Add objective measures only once the required operational outcomes are clear. The blank CSVs are not evidence that every named field is appropriate for every task.

For a verification case, assign each measure one explicit role: `primary_acceptance`, `corroborating_objective`, `engineering_characterization`, `diagnostic_psychometric`, `exploratory_mechanism`, or `safety_monitoring`. Record the acceptance-basis type and approving authority separately. The worked aviation pathways and source boundaries are in [Scenario-to-verification flagship pathways](../../../docs/research/scenario-to-verification-flagship-pathways.md).
