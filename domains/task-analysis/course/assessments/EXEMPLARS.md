# Scored exemplars — Weeks 3, 5, 10 and 13

**Purpose:** demonstrate acceptable reasoning, common wrong answers, and the difference between completeness and quality. All aircraft/system facts are illustrative hypotheses. Multiple correct answers are possible.

## Example 1 — Week 3 HTA (score guide: 12 points)
**Scenario:** return to checklist safely after interruption while system state may have changed.

### Strong model
- G0: establish intended configuration without unsafe omission/commission.
- G1 verify authorization and relevant current state.
- G2 reconstruct previously commanded and achieved effects.
- G3 identify remaining valid items and dependencies.
- G4 execute/verify permitted actions.
- G5 confirm target state and communicate resolution.
- G6 hold/escalate/recover when state uncertainty remains.
- Plan: G1 → G2 → G3; if safe conditions satisfied, G4 → G5; otherwise G6. Continue higher-priority concurrent control throughout.

### Score
(3) goals express outcomes not UI manipulations; (3) plan operators handle conditional/parallel/recovery; (2) source/evidence distinction; (2) meaningful decomposition choice; (2) method boundary (HTA cannot prove expert decision cues).

### Weak answer
Open checklist → check every row → end. Fails goal-state test, ignores deferred command, lacks exception branch and plan meaning.

## Example 2 — Week 5 GDTA (score guide: 12 points)
**Goal:** ensure selected guidance corresponds to the desired actual control.
**Decision D-01:** Has requested mode become controlling?
**Information IN-01:** selected/requested status and its meaning [L1].
**IN-02:** actual controlling/active state and authoritative source validity [L1].
**IN-03:** relationship between requested and actual modes, including pending/rejected [L2].
**IN-04:** implications for anticipated flight behavior under current state [L3 when relevant].
**Decision D-02:** Does operator need to intervene or maintain current strategy?
**IN-05:** feasible mode availability/authority/inhibit reason [L1/L2].
**IN-06:** expected consequences of permitted alternatives [L3].
All tags are **hypothetical** until proper expert and technical validation.

**Score:** (3) decision-centered; (3) distinct information levels and source quality; (3) required/available gaps, timing and provenance; (3) alternatives and limitations. **Weak:** 'show active mode in a green box', and call it a full GDTA.

## Example 3 — Week 10 state/control (score guide: 12 points)
| Transition | Guard / condition | Operator feedback need | Source truth |
|---|---|---|---|
| idle→requested | request emitted | input initiated | input event |
| requested→rejected | guard false | rejection and relevant reason | command validation |
| requested→accepted | guard true | accepted vs merely received | command status |
| accepted→pending | execution delayed | pending and controlling state | executive/controller |
| pending→active | actual active transition | actual controlling status | authoritative state |
| active→terminated | revocation or other permitted event | loss/change of authority | executive/controller |
| rejected→recovery | new strategy/hold | safe alternative availability | task/authority state |

**Score:** (3) semantics not conflated; (3) all major guards/recoveries; (3) actual source and feedback; (3) a task-valid test. **Weak:** selected = active, without examining system reality.

## Example 4 — Week 13 measurement (score guide: 12 points)
**Claim:** design B lowers incorrect belief about controlling mode under delayed/rejected requests.
**Manipulation:** status concept A vs B; preserve underlying transition logic and scenario difficulty.
**Primary DV 1:** binary correctness of 'which mode is controlling?' given independent simulator truth at fixed decision opportunity.
**Primary DV 2:** count/rate of actions assuming wrong active mode, per opportunity.
**Key safety/mission DV:** preserve primary flightpath task within **study-justified** tolerance; no threshold invented.
**Supporting:** recognition latency, targeted belief probe, task-specific gaze sampling, post-trial workload.
**Confounds:** cue salience, training/carryover, source data fidelity, situation difficulty, probe cueing, participant expertise.
**Score:** (3) target construct and independent ground truth; (3) primary operational measures; (3) realistic conditions/denominator and uncertainty; (3) alternative interpretations.

### Weak answer
'Design B increased fixation time by 20%, therefore it improves SA.' No construct link, task truth, alternative explanation, sample information or measure of actual decision quality. The illustrative 20% is an invented number within the *weak example*, not a claimed study finding.

## General reviewer questions
- If the person never uses the current proposed UI, does their operational need still exist?
- Could an interface pass the stated test while failing the mission?
- Are decision opportunities and failure denominators explicitly defined?
- Are state transitions known or hypothesized?
- Which independent source would falsify this judgment?
