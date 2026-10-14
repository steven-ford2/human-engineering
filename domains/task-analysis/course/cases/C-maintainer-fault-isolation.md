# Case C — Maintainer diagnosing intermittent equipment status

**Synthetic and generic. No platform-specific technical data, repair steps, equipment parameters, or maintenance authorization.**

## Operational objective
A maintainer must determine whether a generic subsystem can be returned to a nominal **simulated** service state, whether the evidence is insufficient, or whether an authorized escalation is needed. Conflicting data make the diagnosis ambiguous. There is a limited work window, tool availability constraint, and second technician who may offer a different hypothesis.

## Inputs (intentionally fictional)
- The system logs 'fault present' intermittently, but later returns normal.
- A built-in self-test returns a 'pass' after an earlier error.
- Independent environmental/source condition varies between checks.
- A diagnostic display collapses fault acknowledged, currently detected and historically recorded into the same visual indicator.
- Access, line-of-sight, tool availability, PPE and two-person verification may constrain work.
- Technical documents and fault criteria are not supplied. **This missingness is part of the analysis**, not permission to invent troubleshooting procedures.

## Roles
M-01 primary maintainer, M-02 second-check maintainer, SY-01 generic diagnostic system, SYS-02 authoritative documentation/approval authority.

## Decision requirements
- D-C1 Is evidence consistent with a currently active fault, historical event, or uncertain condition?
- D-C2 Which available diagnostic evidence can genuinely discriminate among causal hypotheses?
- D-C3 When must work stop pending authoritative instructions, permission or suitable equipment?
- D-C4 What evidence is adequate to determine actual return to a permissible state?

## Cognitive demands to investigate
Pattern recognition across intermittent logs; temporal integration; alternative diagnoses; evaluating source reliability; recognizing a misleading 'pass'; predicting whether the problem will recur; decision under fatigue/time limitations; team handoff and documentation quality.

## HTA challenge
Write a **task model of evidence-gathering and decision-making**, not a mechanical troubleshooting instruction. Mark points where authorized manuals and qualified personnel are required. Distinguish 'display shows pass' from 'equipment cleared for service'.

## ACTA interview challenge
Task diagram (4–6 coarse segments); 10 knowledge-audit probes about subtle cues, anomalies, novice traps, conflicting data, alternative strategies and stop conditions; simulation interview at three points as data changes. Every fictional statement is labeled synthetic.

## CWA challenge
Work purpose: justified determination of operational readiness; priorities: safety, evidence integrity, traceable decision, resource use; functions: diagnose, verify, communicate/escalate; processes: gather/validate/evaluate states; objects: tools, subsystem records, test equipment, documentation.

## Design and evaluation
Candidate needs: separate current/historical/acknowledged status, represent timestamp/validity, make basis of self-test 'pass' intelligible, preserve uncertainty, support documentation/handoff. Evaluation must assess **correct diagnosis classification and appropriate escalation**, not fastest closure. Avoid any real equipment repair guidance.
