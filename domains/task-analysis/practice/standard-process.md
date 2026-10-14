# Proposed repeatable task-analysis standard — working draft v0.1

**NON-NORMATIVE:** The purpose is to propose an engineering process for review; no organizational/program approval is implied.

## Scope
Use for flightcrew, maintainer and related human-system work that drives requirements, PVI, procedures or test scenarios. The unit of control is a *versioned evidence-linked task/decision/need record*, not a slide deck.

## Governance
| Role | Responsibility |
|---|---|
| HSE/TA lead | Study plan, method selection, source provenance, scope and quality |
| Operator SME | Operational truth, exceptions, credibility check |
| SE/architecture owner | Functions, allocations, states, interfaces, signal availability |
| PVI design owner | Solution concepts, constraints, design decisions and rationale |
| Safety lead | Hazard links and risk acceptance process |
| Test lead | Operational measures, scenario design, verification and validation |
| Configuration owner | IDs, baselines, change impact and permissions |

## Eleven stages
**0. Initiation.** Define decision supported, questions, users, maturity, restricted-data protections, approvals. Output Study Plan.
**1. Operational universe.** Inventory missions, mission elements, functions, tasks, roles, environments, modes and failure/degraded cases. Output Coverage Matrix.
**2. Select scenarios.** Sample frequent, high-impact, stress, novelty, multi-actor, hazardous, degraded and recovery cases with rationale. Output Versioned Scenarios.
**3. Function/actor model.** Define function and subfunction operationally and allocation including dynamic authority. Output Allocation Map + State Diagram.
**4. Observe/elicitation.** Conduct contextual observation, HTA/GDTA and CTA selected from method guide. Output Evidence Log.
**5. Task model.** Capture hierarchy, plans, actors, initiation, decisions, timing, concurrency, outcomes and branches. Output Task Registry.
**6. Information needs.** For each operational question define cues/data, comprehension, projection, quality, timing, current availability and gap. Output Needs Registry.
**7. Control needs.** For each operator intent define command semantics, context, feedback, inhibition, error containment, reversion and recovery. Output Control Registry.
**8. Risk/workload.** Integrate safety, error, attention, time and operator constraints. Output Crosswalk.
**9. Requirements and architecture.** Allocate functional outcomes, data sources/signals/states, human performance and interface system requirements. Output Trace Matrix.
**10. Validate / baseline / maintain.** Blind SME walkthroughs, simulated scenarios, inter-analyst reviews and evidence quality check. Baseline accepted items and track change impact.

## Review gates
**G0 Authority:** approved scope, permitted sources, user sampling/ethical requirements, system/data access.
**G1 Scenario:** coverage matrix includes justified nominal, critical, degraded and recovery conditions; unresolved gaps explicit.
**G2 Analysis:** task/decision/need IDs are unambiguous; cognitive demands and actual needs distinguished from UI solutions; provenance populated.
**G3 Requirements:** critical paths tie mission -> decision -> need -> verifiable requirement -> source/system -> test.
**G4 Validation:** representative users/scenarios support claim, unresolved deviations and implementation tradeoffs documented.
No gate should be signed solely because all spreadsheet cells are populated.

## Mandatory integrity rules
- A **task** is operator/system work; a **decision** is a selection among alternatives; a **need** is a required information/action capacity; a **requirement** is a verifiable constraint/behavior. Distinct IDs.
- Every P0 critical item links to source evidence, scenario, operator population, reviewer and disposition.
- Distinguish **observed**, **reported**, **specified**, **inferred**, **assumed**, **validated** and **hypothetical**.
- Record negative outcomes: unavailable cues, inhibited controls, failed commands, mode confusion, recovery.
- Multiple-to-many: one need can support multiple decisions, and a decision may require many cues.
- Use objective thresholds only with an engineering rationale and provenance.
- Document change impacts when sensors, modes, displays, procedures, airworthiness conditions or software behaviors change.

## Change-control schema
Each change: change ID, linked parent ID, old/new value, reason, evidence, impacted requirements/tests, owner, date, approvals, status. Never silently overwrite unresolved expert disagreement.

## Process quality pilot
Select 2–3 **public or synthetic** cases with different characteristics. Have two analysts work independently from the same dossier. Compare scope, task structures, decisions, needs and requirements; code presence/absence and semantic agreement separately. Adjudicate with a third reviewer and test whether derived design/test decisions differ. Update the standard where disagreement arises from ambiguity.

## Definition of done (per studied function)
A traceable, reviewed, sufficiently complete explanation of: intended outcome; initiating and completion states; task plan and decisions; evidence and timing requirements; control authority and feedback; state/exception behavior; error recovery; human limits and workload; system/architecture allocation; measurable operational success; sources and uncertainties.
