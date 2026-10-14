# Task-analysis schema and traceability contract v0.1

## Why normalize
A one-row-per-task spreadsheet creates duplicates and erases many-to-many relationships. Use separate records with stable IDs, shared controlled terminology and link tables. No need should be conflated with its selected visual rendering.

## Entity specifications
| Entity | Key fields |
|---|---|
| mission | M-ID; objective; success criteria; authoritative source; configuration |
| scenario | SC-ID; initial/end states; actors; environment; mission phase; branches; mode/failure conditions; coverage tag |
| function | F-ID; objective; inputs/outputs; states; allocation; dependencies |
| task | T-ID; actor; goal; trigger; plan; sequence/parallelism; completion; timing; error possibilities |
| decision | D-ID; decision question; alternatives; triggers; consequences; deadline; confidence/uncertainty |
| information need | IN-ID; operational question; L1 cues/data; L2 relationships; L3 predicted states; thresholds; freshness; accuracy; integrity; availability gap; modality constraints |
| control need | CN-ID; intended state influence; authority; preconditions; command variable/range; time budget; inhibit/recovery; demanded feedback |
| source | SRC-ID; sensor/subsystem/operator; semantics; timebase; frame; units; quality; validity states |
| behavioral interface | BI-ID; command, acknowledgment, acceptance, active state, success/failure, UI/design behavior |
| hazard/error | HE-ID; unsafe behavior/error; context; consequence; detection; recovery; risk link |
| requirement | R-ID; type; statement; rationale; parent links; allocation; quantitative criterion; V&V method |
| measure/test | TEST-ID; claim; scenario; population; task; measure; instrument; success criterion; confounds |
| evidence | EV-ID; source/participant; collection method; citation/timecode; observed/reported/inferred; uncertainty; review status |

## Relationships
```
mission 1..n scenario
scenario n..m function/task
function 1..n task (allocated actors)
task n..m decision
decision n..m information_need
task/decision n..m control_need
information_need n..m source
control_need n..m behavioral_interface
task/need n..m hazard_error
need/hazard n..m requirement
requirement n..m measure_test
ANY claim n..m evidence
```
Model changes and supersession explicitly. This is conceptual cardinality, to be tailored to approved tools.

## Core controlled vocabularies (initial, require organizational review)
status: `draft | under_review | accepted | contested | superseded | rejected`
claim_basis: `observed | elicited | specified | measured | inferred | assumed | hypothetical`
criticality: `routine | consequential | safety_critical | mission_critical` (labels are proposal; do not substitute for approved safety classification)
information_level: `perception | comprehension | projection`
action_type: `selection | toggle | continuous_adjustment | direct_manipulation | message | authorization | override | abort`
command_status: `not_issued | requested | received | accepted | rejected | executing | achieved | failed | cancelled`
automation_authority: `human | automatic | mixed | supervisory | dynamic`
scenario_condition: `nominal | high_workload | degraded | failure | recovery | novel`

## Requirement writing discipline
Need: 'The pilot must know whether selected guidance is actually controlling.' [operational statement]
Functional requirement: 'The system shall make the actual guidance-active state distinguishable from a merely selected state under defined operating conditions.' [allocation-level behavior]
Possible interface requirement: allocate modality/location only after candidate assessment and design rationale.
Test claim: 'Pilot identifies actual controlling state within a justified task-specific time budget, with predefined acceptable errors.'
**Do not invent a universal detection latency or success percentage.** Establish thresholds from safety, task demands, existing requirements and validation evidence.

## Required per-record metadata
id, label, definition, owner, version, lifecycle_status, scenario_context, configuration, evidence_refs, evidence_basis, confidence_basis, created_at, updated_at, reviewed_by, open_questions, related_requirements.

## Example data artifact
See [synthetic case](../cases/flight-deck-mode-transition.md) and the [measurement crosswalk](./measurement-framework.md).

## Quality checks for a validator
- IDs unique and stable; no orphan decision/need/requirement.
- Each need maps to a decision, goal or explicit exception.
- Each test has target construct, task context, operational success criterion and instrument.
- No unsupported 'shall' created from subjective preference.
- Every safety-critical claim has stated status of safety review and hazard reference if applicable.
- Context includes system state and failure path; 'N/A' requires rationale rather than silent blank.
