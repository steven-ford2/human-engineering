# Worked case: flight-deck checklist interruption and resumption
**Synthetic, non-platform-specific, public educational example. Not a flight procedure, authorization, or operating instruction.**

## Problem definition
A crew member is executing a checklist for a routine simulated operating transition. An external communication interrupts performance. The crew must resume at the correct step, avoid omissions/commissions, verify the actual system state, and preserve aircraft control and crew coordination. During some trials an ambiguous status cue or non-response appears. The checklist design must support the operational *goal*, not mere line-item completion.

## Work-domain and scenario
**Success:** intended safe target aircraft configuration achieved and positively established.
**User roles:** flying pilot and checklist-performing/monitoring crew member, or a defined single-pilot variant (must be separately analyzed).
**Key contrasts:** no-interruption, interruption after action but before verification, interruption at branching decision, status mismatch.
**Controls:** acknowledgment/status cues, checklist progress representation, interaction/confirmation, unambiguous restart path.
**Constraints:** working memory, concurrent flight control, coordination, state changes while interrupted, interrupted command completion.
No specific flight deck, actual checklist, timing target, or crew roles are asserted as fact.

## HTA (hypothesis to confirm)
```
G0 Achieve and verify intended configuration
  T1 Identify applicable checklist and entry criteria
  T2 Check current conditions and applicable branch
  T3 Execute and/or verify checklist items
  T4 Handle competing communication/interruption as appropriate
  T5 Re-establish actual checklist position and system state
  T6 Continue, defer, repeat verification or terminate as appropriate
  T7 Confirm checklist outcome against actual system state
Plan: T1->T2->T3; interruptions may invoke T4->T5;
      T5 routes to appropriate T3, T6 or T7, based on state;
      terminate only when T7 is satisfied.
```

## GDTA questions
| Goal | Required decision | Necessary information |
|---|---|---|
| Complete correct procedure | Is this the applicable checklist/branch? | Entry criteria, system mode/condition and intended transition |
| Avoid skipped/doubled action | Which actions are completed vs merely read or commanded? | execution evidence, last verified state, changed state during interruption |
| Resume safely | At which operational point should work resume? | current actual state, checklist plan, prior confirmed actions, dependencies |
| Establish successful outcome | Was required state achieved, not just item acknowledged? | independent final state indications and unresolved deviations |

## CTA interview prompts
- Tell the story of an interruption during an actual procedure. What was happening just before it?
- What cues tell you exactly where to resume? Which cues can be unreliable?
- How do experts distinguish 'action done' from 'verification completed'?
- Have you seen a case where following the printed sequence faithfully was insufficient?
- How are responsibilities handed off between pilots during and after the interruption?
- Which deliberate recovery steps would a novice miss?
- What changes under single-pilot conditions?
- In what situations would repeating a command be inappropriate?

## Information/control needs
IN-P1 = evidence of relevant aircraft/system state and checklist eligibility.
IN-P2 = progress state distinguishing not started, read, commanded, independently verified.
IN-P3 = whether system state changed while attention was diverted.
CN-P1 = capability to suspend/resume checklist interaction without misleading completion.
CN-P2 = capability to reverify/reconcile progress against actual state.
CN-P3 = capability to handle unsuccessful or inappropriate action without masking it.

## Procedural design tradeoffs to examine
- Progress memory: checkmarks alone vs status linked to verification.
- Action/verification coupling: when must a second source or independent state check be required?
- Interrupt recovery: explicit restart cues vs forcing linear replay.
- Crew coordination: explicit ownership and verbal challenge-response, context-dependent.
- Automation/state feedback: does a completed UI row correspond to an actual achieved aircraft state?
These are *candidates to test*, not proven design recommendations.

## Measurement plan: task-derived
| Claim | Primary operational measure | Supporting/process measure | Validity concern |
|---|---|---|---|
| Appropriate checklist/branch chosen | correct entry/branch choice in scripted ground-truth scenarios | decision time, post hoc justification | Good speed with wrong checklist is failure |
| No omission/commission after interruption | critical omissions/commissions per opportunity | recovery strategy, gaze, workload | Need a complete exposure and step opportunity count |
| Correct resumption | proportion of trials with correct state-based restart | time to resume and reorient | Correct line number alone may not mean correct aircraft state |
| Target configuration achieved | independently verified correct final simulator state | checklist interaction log | 'All items checked' is not ground truth |
| Maintain higher-priority tasks | flight-path/control tolerance preserved | secondary-task costs, NASA-TLX | Task priority shifts require scenario control |

## Proposed experimental comparison
**Within/between participant options:** method A vs B for progress and interruption recovery, counterbalance order if within subjects; use appropriate separation/practice.
**Scenario strata:** baseline vs interruption-before-verification vs mode/status mismatch; include nominal and realistically stressed conditions.
**Ground truth:** simulator state log and pre-agreed adjudicated critical error criteria.
**Confounds:** simulator experience, procedure familiarity, difficulty, interruptions as explicit cues, workload changes caused by experimental script, team communications.
**Analysis:** report binary critical failures with denominators and intervals; distinguish safe error-free completion from merely faster completion. Avoid averaging rare unsafe events into a broad usability index.
**No invented acceptance percentage:** thresholds require safety/function and feasibility justification.

## Explicit difference between verification and validation
**Verification:** does the checklist system follow its stated logic and accurately maintain progress status?
**Validation:** can the intended user, during representative interruptions and failures, accomplish the correct configuration safely using the design/procedure?
