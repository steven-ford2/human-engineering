# Week 04 — Observing work, interviewing experts, and temporal analysis

**Course:** Flagship Task Analysis and Cognitive Engineering | **Mode:** lecture + method lab + engineering transfer | **Evidence key:** [PRIMARY]/[STANDARD]/[SYNTHESIS]/[HYPOTHESIS]. Public and synthetic cases only.

## Objectives
1. Design a non-leading, authorized fieldwork protocol.
2. Represent actual observations, retrospective accounts and analyst explanations separately.
3. Analyze interrupted, concurrent and time-bound tasks without assuming a single sequence.

## Teaching lecture

### Experts know more than their retrospective narrative contains
An expert often performs high-value perception and decision steps fluently, describing an event afterward as 'I knew something was wrong.' That narrative may omit the cues, timing, competing priorities, rejected alternatives and prior experience that made a judgment possible. A fixed interview that asks only 'what button did you press next?' can return an accurate action chronology and still miss the work's most significant cognitive demands. Observation can expose state, concurrency, and workarounds; carefully designed interviews can expose hidden reasoning. Neither method is an infallible window into cognition.

### A minimum study protocol
Define the engineering purpose and population first. Determine what can be observed or recorded legally and safely; secure required permissions. Prepare an interviewer guide that begins with tasks and goals, not concepts. Establish a plan for obtaining consent and for storing evidence only in approved environments. Include current and degraded conditions relevant to the research question. Allocate analyst roles: interviewer, note-taker, technical clarifier, and later independent reviewer if possible.

Use a **funnel structure**: narrative first; then chronological reconstruction; then decisions/cues; then counterfactual and nonnominal conditions; then optional review of existing interface. Ask the operator to recall a *specific instance* rather than to speculate exclusively about average behavior. Where simulation is used, treat the simulation scenario and its limitations as part of the data, not a transparent view of real operations.

### Keep evidence types separate
Create a transcript/event record with four layers:
- **Observable:** event or spoken phrase independently recorded, with time/location/source.
- **Reported:** participant's account, perception or explanation, with quotation limits/consent.
- **Inferred:** analyst interpretation, alternative hypotheses and confidence basis.
- **Specified:** a procedure, system requirement or engineering state description from an authorized document.

'The pilot was overloaded' is usually an interpretation, not a camera-recorded fact. 'The operator stopped task B after event X and made three repeated inputs' may be observable. A credible report says which was measured and which mechanism remains hypothetical.

### Time is part of work
Aviation task analyses require more than mean task durations. Model **deadlines**, concurrent workload, serial dependencies, information latency, action duration, mode transitions, interruptions, resumption costs and uncertain temporal estimates. Work at three scales: events in seconds; phases over minutes; and preparation/review/coordination across the sortie or maintenance period. Do not insert unverified timings in real requirements.

A swimlane chart can have pilot, teammate, automation, communications and aircraft-state rows. Connect handoffs and state dependencies, not only person-to-person communications. A data packet may arrive late even while the pilot's actions are correct; a received command may not yet have effect. The chart must make those distinctions observable.

### Quality threats
**Leading prompts:** 'The new alert would help, right?' encourages compliance. Ask what must be detected and what happens without it. **Recall bias:** a retrospective timeline can be incomplete or reconstructed. **Observer effects:** a participant may behave differently when watched. **Sampling:** one experienced pilot is not representative of all pilots or mission circumstances. **Interpretive drift:** if analysts generate codes after seeing preferred design proposals, findings may become circular. Use multiple sources and preserve contradictions instead of smoothing them out.

### Transfer to engineering
A timing/concurrency artifact can show that a control demanding a sustained glance competes with an immediate flightpath control task. But the exact effect requires a task-valid evaluation. This is a hypothesis leading to test design, not a guaranteed workload penalty.

## Worked aerospace case — [HYPOTHESIS]

**Illustrative event log (hypothetical sequence; deliberately no numerical time thresholds):**

| Event | Pilot | Automation/system | Analyst interpretation |
|---|---|---|---|
| E1 | requests a mode | command received | intent has been communicated |
| E2 | attends radio | acceptance is delayed | information may no longer be sampled |
| E3 | glances at status | previous mode remains active | assumption of activation may be wrong |
| E4 | begins corrective response | input inhibited | repeated input is not proof of control |
| E5 | rechecks status | failure explanation available | comprehension must be separately assessed |

A poor analyst writes: *E3 pilot failed to notice mode*. The event log alone cannot demonstrate that; a comprehension probe or subsequent action may be needed.

## Repeatable method protocol — [SYNTHESIS]

Write study question; choose operator group; determine permissible data sources; prepare consent and recording/retention method; draft non-leading questions; pilot protocol; capture direct events with timestamps where feasible; separately capture reported reasoning; map events to system state; member-check factual ambiguities; triangulate; update task timeline and open question log; review inference strength.

## Guided laboratory and deliverable

For a benign non-employer example (e.g., operating a home-studio signal chain or preparing a complex activity), observe 20–30 minutes of actual work with consent, then interview the participant after. Make a 12-event timeline, flag three interpretations that observations alone cannot justify, and write six non-leading probes about goals, expert cues, interruptions and error recovery. Adapt the format **synthetically** to case A mode management.

## Retrieval and adversarial checks
1. What is the difference between a retrospective judgment and observed behavior?
2. Why is a temporal graph sometimes more informative than an HTA hierarchy?
3. What is the methodological defect in interviewing only after showing a proposed interface?
4. How do you document operator disagreement with a system engineer's description?
5. What changes when task A and B overlap instead of occurring in sequence?

## Completion and critique standard

Pass when the raw event log and analyst interpretation are distinguishable, time/concurrency are represented and all user study procedures comply with study permissions.

## Primary/supporting reading
[Elicitation playbook](../../../methods/elicitation-playbook.md); [FAA HF-STD-004A §5.1.10.1](https://hf.tc.faa.gov/publications/2016-09-human-factors-engineering-requirements/); [Working Minds publisher](https://mitpress.mit.edu/9780262033510/working-minds/)

## Engineering integration prompt
Take one claim from your output and identify: the operator decision, the inferred information/control need, the system-state/source behavior that can deliver it, the candidate allocated requirement, and a **task-valid observable test outcome**. If any link relies solely on a proposed UI element or on unsupported timing, flag it and revise.

## Reflection
What would this analytical method *fail* to detect? Which alternative method or operational observation would expose that failure? Record your answer in [weekly practicum](../../../training/practice-log.md).
