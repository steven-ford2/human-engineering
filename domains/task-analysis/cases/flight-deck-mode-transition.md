# Worked case: generic flight-deck guidance-mode transition
**STATUS: Synthetic teaching example. Not a real aircraft, training procedure, platform specification, or operating instruction.**

## Design reference scenario
A pilot has selected a guidance function while maintaining controlled flight. Under a time-constrained operating condition, the pilot must determine whether the mode is merely selected or actively controlling, then potentially transition to an alternative approved mode. The simulator model may (a) accept and activate, (b) accept but defer activation, or (c) reject/inhibit the request. A secondary communication task may occur at the same time. No platform-specific timings or flight performance values are assumed.

## Hierarchy and task plan (illustrative HTA)
```
G0 Maintain intended guidance safely
  T1 Detect operational need to assess mode
  T2 Determine selected/commanded/actual guidance state
    T2.1 Sample status cues
    T2.2 Interpret differences and constraints
  T3 Decide whether to retain or change mode
  T4 If change warranted, issue valid command
  T5 Determine command acceptance and active/achieved state
  T6 If rejected, delayed or unexpected, manage flight and recover
Plan: T1 -> T2 -> T3; if change required T4 -> T5;
      if command outcome mismatched T6; otherwise continue monitoring.
Concurrent: maintain flight path and external communication as applicable.
```
Decomposition is analyst hypothesis to test with an authorized SME/representative simulation.

## GDTA
| Goal | Decision | Information requirement | SA component |
|---|---|---|---|
| Maintain safe intended guidance | Is actual control consistent with intended mode? | selected mode, actual controlling mode, constraints | L1 mode cues; L2 command/active relationship |
| Preserve control during changes | Is mode change appropriate now? | operational context, availability, consequences, competing duties | L2 implications; L3 likely trajectory/state |
| Verify execution | Did the command produce the intended effect? | request receipt, acceptance/rejection, transitioning state, active/achieved state | L1/L2 and possible L3 |

## ACTA cognitive demands
| Demand | Potential expert cue | Novice vulnerability | Elicitation question |
|---|---|---|---|
| Detect subtle mode mismatch | Distinguish request/selection from actual controlling mode | Assumes selection equals activation | What tells you the mode is *really* controlling? |
| Interpret inhibition | State combination or explicit reject feedback | Repeatedly commands without diagnosing | How do you know why an input had no effect? |
| Coordinate switching with primary task | Competing control and attention requirements | Fixates on interface during flight-path control | When do you defer interface work? |
**All examples hypothetical until validated by real users/data.**

## Candidate control needs
- CN-01: Ability to request a permitted guidance-mode change while preserving other required aircraft-control capability.
- CN-02: Ability to recognize invalid/unavailable command conditions.
- CN-03: Ability to determine request acknowledgment, acceptance, actual activation and achieved outcome.
- CN-04: Means to revert/manage unexpected or failed transitions with appropriate authority and feedback.

## Requirements derivation (working concepts)
| Need | Design-independent allocated requirement candidate | Uncertainty |
|---|---|---|
| IN-01 pilot must distinguish selected from controlling state | System shall distinguish requested/selected state from actual active state under specified conditions | Confirmation and response timing to derive from task/safety analysis |
| IN-02 pilot must know why change unavailable | System shall communicate relevant rejection/inhibition condition at the appropriate operational decision point | Exact detail/modality TBD |
| CN-03 verification of mode transition | System shall provide feedback sufficient to determine whether the requested state was achieved | Measurable criterion and allocations TBD |

## Experimental comparison
**Independent variable:** mode-state representation A versus B, with identical simulated underlying control behavior.
**Scenario factors:** accepted/activated vs accepted/deferred vs rejected; nominal vs high-concurrency/secondary-task.
**Primary outcomes:** correct mode-state classification; unsafe/incorrect commands; successful transition/recovery; flight-path performance within context-specific limits.
**Secondary:** classification/decision latency, NASA-TLX, targeted SA queries, gaze patterns as supporting exploratory process data.
**Ground truth:** independently logged simulator selected/accepted/active/achieved states, event time stamps and adjudicated operator task scoring.
**Potential confounds:** familiarity, trial order, scenario difficulty, annunciation salience, practice, flight-control task performance, simulation fidelity, task prioritization.
**Important:** a shorter gaze duration on an indicator can mean efficient coding, avoidance, or missed information. It is not a stand-alone success metric.

## Failure-focused test sequence
A. Pilot chooses a mode and system activates it; verify understanding.
B. System accepts request but delays becoming active; assess mismatch recognition.
C. System rejects/inhibits an attempted transition; assess correct interpretation and recovery without inappropriate retries.
D. Introduce concurrent communication workload; assess preservation of higher-priority tasks.
E. Trigger unexpected but clearly simulated state transition and assess reorientation; test authorization and safety precautions in real simulator work.

## What this case demonstrates
The **same** task analysis can drive: information needs, controls, state modeling, candidate requirements, interface design questions, scenario injection conditions and primary outcome measures. Further SME/test evidence is required before choosing real-system details or pass/fail thresholds.
