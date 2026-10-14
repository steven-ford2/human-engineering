# Dossier A — Selected versus controlling guidance
**Fictional synthetic training environment. Not a description of a specific aircraft's procedure or software.**

The participant is piloting in a simulated setting. A requested guidance mode may be **received**, **accepted**, **pending execution**, **active/controlling**, **rejected**, or **terminated**. Status can disagree with the last button selected. The display may show selection without conveying actual activation. A secondary communication task competes for the pilot's attention. Flightpath control remains the higher-level objective.

## Stakeholder statements (constructed for exercise)
- SME-A (experienced operator): 'A button is an intent. I want to know what actually controls the aircraft.'
- SME-B (junior operator): 'If it's highlighted I assume it's on.'
- Software representative: 'Command receipt and mode activation are different state variables. The mode may be inhibited under certain conditions.'
- Test engineer: 'I have button logs and eye-tracker data; the simulator also records actual controlling mode.'
All statements **are fictional inputs**; they must not be presented as empirical interview data.

## Scenario variants
A1 request accepted and mode activates; A2 accepted but activation delayed; A3 inhibited with no activation; A4 accepted, active, then disengages; A5 loss of one status source; A6 mode management during concurrent radio task. Add a new branch when data validity is compromised.

## Analyst jobs
1. Write an HTA with plans and recovery.
2. Produce GDTA: at least three decisions and six distinct needs.
3. Specify selected/requested/accepted/active/achieved state definitions; differentiate signal provenance and failure.
4. Write two interface-independent requirements and at least two design alternatives.
5. Design ground-truth-based outcomes for recognition, unsafe commands, actual state and preserving flight control.
6. Delineate all purely hypothetical timings and safety thresholds.

## Internal known-ground-truth schema (no fabricated numeric values)
`event,requested_mode,accepted_command,controlling_mode,system_available,mode_inhibit_reason,primary_task_state`

## Hidden defect for red team
A UI designer may deliver a gorgeous selected-mode indicator yet never expose the actual controlling state; a test of selecting the button could score 100% and still miss the hazardous confusion.

Prior related case: [mode-transition example](../../cases/flight-deck-mode-transition.md).
