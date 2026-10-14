# Exemplar trace: guidance mode ambiguity [HYPOTHETICAL TRAINING]

This table demonstrates *form and logic*. Its content has not been validated by an aviation program, experienced pilot interview, flight-safety authority or simulator experiment.

| Stage | ID | Claim | Evidence status | Disconfirmation plan |
|---|---|---|---|---|
| Operational goal | M-A | Maintain intended safe guidance | synthetic scenario | expert review of actual goal |
| Scenario | SC-A3 | request may be accepted but actual transition delayed | fictional state machine | engineering state-table review |
| Function | F-A1 | select/monitor controlling guidance | constructed allocation | system owner review |
| Task | T-A2 | establish actual controlling status after a request | hypothesized work step | operator walk-through |
| Decision | D-A2 | should pilot rely on newly requested mode? | hypothetical cognitive decision | CTA study and scenario probe |
| Information need | IN-A3 | distinguish requested/accepted from active control | analysis-derived need | pilot interview and critical incidents |
| Control need | CN-A2 | request transition and diagnose inhibit/failure | analysis-derived need | system authority and failure analysis |
| Source | SRC-A1 | independent actual control state may be available | **unknown** architecture | confirm authoritative logic/signal |
| Requirement | R-A1 | distinguish requested vs controlling state under defined conditions | candidate allocated requirement | technical feasibility + review |
| Concept | UI-A/UI-B | separate statuses or explicit state-transition feedback | two alternative designs | comparative simulator trials |
| Primary metric | TEST-A1 | correct active-state identification with simulator truth | test proposal | execute controlled scenarios |
| Safety-relevant outcome | TEST-A2 | incorrect reliance or failed recovery count per opportunity | test proposal | ground-truth event coding |
| Supporting metric | TEST-A3 | gaze/time/workload as process evidence | exploratory proposal | test confounds and measurement quality |

## The engineering argument
If the operator must make a consequential decision based on *actual controlling state*, showing only *selected state* fails semantically. This claim is a **conditional argument**: it is only relevant where operator belief and actual state can diverge and where the decision matters. The simulated source model posits that those states can diverge; real system owners must confirm whether and how this happens in their architecture.

A real requirement might need timeliness, integrity, available display channel, alerts, transition guards and quantified detection criteria. None are specified here because a public case cannot establish values with operational authority.

## Alternative hypothesis
Operators may already reliably infer actual state from flight behavior or different information sources, rendering additional persistent annunciation redundant or distracting. A valid evaluation must consider this possibility rather than choosing only scenarios designed to force one conclusion.

## Why the example matters
The model shows what a reviewer can examine: a decision linked to needed knowledge, traceable data source, responsible system behavior, specific design alternatives and independent **task** outcomes. The falsification plan shows where the analyst has not earned certainty.
