# Method selection protocol: task analysis is not one method

## Classification
**HTA:** procedural goals, subtasks, plans, timing and exceptions.
**GDTA:** operational goal -> decision -> information/SA requirement. Separate L1 perception, L2 comprehension, L3 projection; do not assume every question needs all three levels.
**ACTA:** practical expert-demand elicitation, frequently comprising task diagram, knowledge audit and simulation interview; use to expose cues/traps/novice–expert differences.
**CDM:** use a consequential, memorable *actual* incident; reconstruct timeline, identify decision points, then conduct multiple passes probing cues, options, uncertainty, goals and errors. Retrospective account is not direct observation.
**CWA/WDA:** constraints, means–ends relationships, adaptability and alternative strategies; use when pre-scripted task steps cannot encompass safe successful work.
**Contextual observation:** reveal normal workflow, workarounds, cues, and constraints not recalled in interviews; distinguish observed behavior from what participants say.
**Task timeline/sequences:** track overlap, deadlines, interruptions, cross-team dependencies and state changes.
**HRA/SHERPA/STPA:** independently examine foreseeable errors/unsafe control; integrate with the task model but avoid claiming they are information-needs elicitation methods.
**Requirements engineering:** turn supported needs into testable allocated outcomes while preserving rationale.
**Validation:** use representative operational scenarios and criterion-referenced performance rather than superficial interface preference.

## Decision table
| Condition | Baseline | Additional methods | Warning |
|---|---|---|---|
| Stable, step-driven task | HTA and observation | timeline, SHERPA | Actual work may deviate from nominal procedures |
| Operator decisions driven by cues | GDTA | ACTA; CDM for high-stakes events | Listing displayed parameters is NOT an information-needs analysis |
| High expertise / tacit judgment | GDTA | ACTA or CDM | Novices and experts reveal different knowledge |
| Dynamic/unanticipated system states | scenario + state model | CWA/WDA, STPA | Linear decomposition misses adaptive work |
| Shared control with automation | GDTA, HTA, state model | function allocation, team CTA | Distinguish requested, commanded, accepted, active and achieved states |
| Distributed crew/team work | collaboration map | team CTA, communication timeline | Single-user task model misses coordination |
| Maintenance / physical work | HTA and contextual inquiry | reach/force/workplace hazard methods | Physical tools/PPE/accessibility are first-class constraints |
| Rapid early concept | lightweight GDTA/HTA | selective expert probes | Mark every conjecture and do not overstate confidence |

## Minimum rationale for choosing or rejecting a method
1. Study decision and stakes.
2. Actual versus anticipated work.
3. Expertise and access to participants.
4. Variability, failures, time pressure, cross-role coordination.
5. Available artifacts and feasibility of observation/simulation.
6. Required confidence and data quality.
7. Specific outputs that designers, SE, safety or testers require.

## Layered depth
- **L0 scoping:** mission, stakeholders, major scenarios, system context, known hazards; no claim of complete task analysis.
- **L1 baseline:** representative scenarios, goal/task/function IDs, basic decision and needs structure, review.
- **L2 enhanced:** ACTA/GDTA depth, timing, concurrency, uncertainty, error, controls/feedback, requirements trace.
- **L3 critical:** rare/degraded/high-consequence branches, CDM or CWA where justified, safety integration, scenario validation, independent review.
Selection must be justified; criticality, novelty and uncertainty are not the same variable.

## Deliverables from each method
HTA -> hierarchical goal tree and explicit plans.
GDTA -> goal/decision/information requirements map.
ACTA -> cognitive demands table with cues/strategies/error traps.
CDM -> event timeline, decision points, alternatives and counterfactual probes.
CWA -> abstraction hierarchy and constraint relationships.
System model -> modes/states/commands/feedback and allocation.
Testing -> claim/measure/scenario/criterion/evidence matrix.

## Stop conditions
Stop expanding subtask granularity when further decomposition fails to reveal actionable design, coordination, training, safety or performance implications; mark this judgment and revisit if a downstream requirement cannot be justified.
