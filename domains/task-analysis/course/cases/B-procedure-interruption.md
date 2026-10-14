# Case B — Interrupted checklist, command status and resumption

**Classification:** deliberately synthetic / educational. No aircraft operating instructions.

## Scenario briefing
A simulated operator must execute a state-dependent procedure that contains a branch and final system-state verification. Interruption occurs at one of several points. A message that an action is 'complete' may represent interface progress, command acknowledgment or actual configuration—do not assume equivalence.

## Fictional participant remarks — exercise stimuli, NOT interview evidence
- 'I normally remember the last item I read.'
- 'If the system changes while I am responding to a call, I may have to re-establish current state rather than jump to the next line.'
- 'Our team sometimes disagrees about whether a step was verified or merely entered.'
- 'The UI currently remembers the checked item, not the physical effect.'

## Synthetic event record
| Event ID | Pilot/procedure operator | System behavior | Observation status |
|---|---|---|---|
| B-E01 | begins branch review | candidate configuration A | constructed fact |
| B-E02 | requests change | command received | constructed fact |
| B-E03 | receives external communication | command acceptance still pending | constructed fact |
| B-E04 | returns to progress view | progress indicator marked 'done' | constructed fact |
| B-E05 | decides whether to move on | actual system remains A | constructed ground truth |
| B-E06 | performs or omits confirmation | system could remain A or change | branching condition |
| B-E07 | final configuration checked | selected outcome may be correct/wrong | measure opportunity |

## Conditions
B1: no interruption and normal effect.
B2: interruption after command issued, before feedback received.
B3: resumption after inhibited command; UI falsely suggests completion.
B4: a task handoff between monitoring and control roles.
B5: delayed system response between two checklist actions.

## Questions requiring empirical investigation
- What cues do operators actually use to know where they are?
- What causes them to repeat or skip an action?
- Is progress a memory aid, an authoritative record, or both?
- What are the correct stopping and restart criteria under the specific system?
- How do roles coordinate verification?

## Expected products
HTA with nonnominal plans, GDTA, cognitive demand table, control/feedback state model, two process designs, and test outcome rubric measuring actual final state, omissions/commissions, resumption strategy, task concurrency and team errors. Do not invent procedure steps for an actual aircraft.

See expanded [procedure worked case](../../cases/procedure-interruption-and-recovery.md).
