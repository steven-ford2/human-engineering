# Case D — Distributed team state reconciliation

**Synthetic joint-team coordination case. No tactics, military C2 procedures or classified information.**

## Study purpose
Two fictional operators share responsibility for a simulated information-management task. A data producer sends a status update; a receiver may have outdated state; an automated process receives the message but does not guarantee the receiver interpreted it. The team must identify whether shared state has been established before acting.

## Fictional traces
| Event | Operator A belief | Operator B belief | System record |
|---|---|---|---|
| D-E1 | state S1 | S1 | S1 |
| D-E2 update | S2 | S1 | update queued |
| D-E3 received | S2 | S1 | message delivered to endpoint |
| D-E4 acknowledged | S2 | 'S2 seen' | acknowledgment recorded |
| D-E5 action | expects B acts on S2 | perhaps B still treats S1 authoritative | state and action logged |

The conditions separate **transmission, receipt, acknowledgement, comprehension, acceptance, adoption and achieved coordination**. This is an instructional model, not a description of real military communications.

## Study questions
- What does each actor need to know about other actors' beliefs or intended actions?
- Which cross-checks truly establish a shared operational understanding?
- When is asynchronous update better than explicit handoff?
- How does stale information propagate through a team?
- How are roles, authority, fallback and disagreement handled?

## Methods
HTA task plans for each actor and handoffs; GDTA at individual/team levels; ACTA prompts about coordinating uncertainty; CWA of roles/resources; system state and communication source provenance; interruption-timeline analysis.

## Design hypotheses
Option 1: visible sender/receiver state and explicit independent acceptance.
Option 2: shared state model with per-role changes and conflict cues.
Both require empirical evaluation of team action, incorrect assumptions, redundant communication and secondary task burden.

## Measure
Primary: correct team action given true shared state and avoided premature action. Supporting: quality and latency of cross-check, message reconciliation errors, confidence calibration. Log independent ground truth and two actors' beliefs without assuming endpoint acknowledgment equals cognitive comprehension.
