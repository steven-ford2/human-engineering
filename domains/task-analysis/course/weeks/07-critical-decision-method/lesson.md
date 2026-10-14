# Week 07 — Critical Decision Method: decision points in difficult incidents

**Evidence convention:** [PRIMARY] original method/source; [ABSTRACT] limited record; [SYNTHESIS] instructional engineering method; [HYPOTHESIS] teaching case. Do not transform [HYPOTHESIS] into a real cockpit requirement.

## Objectives
1. Conduct retrospective critical-event analysis through multiple purposeful sweeps.
2. Record event chronology, cues, expectations, alternatives, uncertainty and counterfactuals without confusing recollection with observation.
3. Identify incident-specific demands that inspire scenarios and verification hypotheses.

## Conceptual lecture

### Why the unusual event is analytically valuable
Everyday expert performance often hides its hardest discrimination steps because the cues are familiar and the decision is rapid. Difficult incidents can make a decision point visible: the operator must abandon a routine expectation, recognize an anomaly, or choose among imperfect actions under time pressure. The **Critical Decision Method (CDM)** is an interview approach from naturalistic decision-making research for reconstructing the cognitive demands of actual critical incidents. It should not be treated as a generic opinion survey or as a method that directly observes cognition.

### What makes an incident suitable?
A remembered event with identifiable challenge, meaningful decisions, and a participant who had direct responsibility. Avoid asking for classified or employer-restricted incidents in this personal training environment. A benign high-stakes technical event (failed recording chain during live performance, disrupted workflow, emergency drill from public training) can serve for practice.

### Four passes (practitioner organization)
**1. Incident selection / narrative:** Ask for the whole story with minimal interruption. Clarify boundaries, stakeholders and what made it challenging.
**2. Timeline reconstruction:** Reconstruct events, key states and action sequences; mark where sources conflict or chronology is uncertain.
**3. Deep decision probing:** At each consequential point, ask what was noticed, what was expected, what goals competed, what options were considered or dismissed, how much time seemed available, and which facts were uncertain.
**4. What-if and contrast:** Explore whether absent/altered cues would have changed interpretation, what a less experienced operator might miss, and how a different state might require a different strategy. These are **counterfactual reports**, never facts about what actually occurred.

This is a useful teaching organization; exact original question sets and coding guidelines should be learned from primary CDM materials rather than assumed from this summary.

### Decision point as a record
Create an indexed D-ID with: pre-event expectation; triggering anomaly; source and timing of cues; current believed state; actual state if externally verifiable; alternatives; perceived consequences; decision; strategy; downstream outcome; possible biases; and retrospective-confidence note. Include at least one alternative explanation. A narrative that simply maps the event to a known 'error' after the outcome is known may introduce hindsight bias.

### Cognitive mechanisms to investigate
Expertise may involve recognition of patterns without deliberating over a long option list, mental simulation of potential consequences, updating after contradictory cues, explicit handling of missing data, and prioritization under limited time. Do not force every participant's explanation into one favored theory. Compare their accounts to system records and diverse operators where feasible.

### Translation to interface and procedure design
An incident can identify a critical missing state cue or a misleading mode transition. It may also show a robust **operator recovery strategy** that a future procedure or display could support. But one incident is not a frequency estimate. A defensible design path is: incident → plausible causal mechanism → task/decision need → scenario variations → test against alternate explanations.

### Bias management
Memory can conflate sequence, states and reasons. Operators may rationalize choices after an outcome is known. Questions about 'what you *should* have done' differ from what was perceived at the time. Coding must distinguish evidence from reconstructed explanation and note if a participant viewed logs or a replay before interview.

## Worked synthetic aerospace case

**Hypothetical case A decision point D-07:** Pilot intended to enter mode B. Display gave selection feedback. Flight response contradicted expected guidance. Operator had to choose whether to retry command, remain in prior control strategy, or investigate inhibit state. Interview questions: 'What did you notice first? At that instant what did you think was controlling? Which other cue could you have checked? What made another retry attractive? What would you do if the active indication itself were stale?' Test consequence: build a deferred-activation scenario that can distinguish understanding of requested versus achieved status. **None of these are actual pilot interview findings.**

## Step-by-step method

Select one genuine appropriate event and participant → uninterrupted story → chronological timeline with source quality → identify 3–5 important decisions → deep decision probes (cues, beliefs, alternatives, expectations, priorities, time) → counterfactual probes → reconcile with any independent artifacts → code findings into a decision-requirements table → review interpretation and state uncertainty → propose testable design/training questions.

## Practical lab

Choose a consented, non-sensitive incident from a domain you know. Conduct a 30-minute multi-pass interview. Create a timeline containing at least three decision points, a source-confidence column and five counterfactual prompts. Write a separate *design-relevant hypothesis* for each decision. Compare whether HTA would have exposed the same finding.

## Retrieval / critique
1. What error arises when you treat a retrospective statement as a contemporaneous observation?
2. Why can a rare critical incident be valuable despite not providing a population frequency estimate?
3. What is the difference between an alternative actually considered and one later suggested during interview?
4. How might knowledge of the outcome bias interviewer and participant?
5. When would a different method be preferable to CDM?

## Pass/revise gate

Pass when decision points are time-anchored and evidence-labeled, factual versus hypothetical alternatives are separated and at least one candidate conclusion is challenged with an alternative explanation.

## Sources and readings
Hoffman, Crandall & Shadbolt (1998), [CDM article](https://doi.org/10.1518/001872098779480442); Klein/Calderwood/MacGregor (1989), original CDM research; Crandall et al. (2006), *Working Minds*.

## Integration transfer
Create one trace from **operator goal → task/decision → elicited expertise/information need → alternative concept → suitable primary task measure**. Include source evidence and a plausible disconfirming observation. If the trace stops at an expert quote, the job is unfinished.

## Portfolio artifact
Save the associated source-tagged analysis, unresolved questions, concept implications and independent reviewer notes. Use the [weekly practice log](../../../training/practice-log.md).
