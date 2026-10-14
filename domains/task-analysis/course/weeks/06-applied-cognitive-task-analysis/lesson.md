# Week 06 — Applied Cognitive Task Analysis: discovering tacit expertise

**Evidence convention:** [PRIMARY] original method/source; [ABSTRACT] limited record; [SYNTHESIS] instructional engineering method; [HYPOTHESIS] teaching case. Do not transform [HYPOTHESIS] into a real cockpit requirement.

## Objectives
1. Differentiate ACTA task diagram, knowledge audit, simulation interview and output representation.
2. Use non-leading probes to reveal cues, strategies and novice vulnerabilities.
3. Translate demands into falsifiable design/training implications without overclaiming generalizability.

## Conceptual lecture

### Expertise becomes invisible to its owner
The expert operator says: 'You can tell when this is going badly.' An analyst who copies this statement has learned almost nothing. Which cues? Why do they signify trouble? What alternate explanation would mislead the novice? Which corrective strategies are available? What would invalidate the expert's first judgment?

Militello and Hutton's ACTA was created because many cognitively rich methods were too resource-intensive for ordinary design practitioners. Their toolkit supports practical elicitation of **cognitive demands** and transformation of findings into usable design/training outputs. The published 1998 article describes three interviews; the typical ACTA structure is *task diagram, knowledge audit, simulation interview*, with a cognitive demands table as a representation/synthesis output.

### Interview 1: task diagram
First obtain a **coarse overview**, not a complete HTA. Ask the SME to break the job into a small handful of broad chunks and mark which chunks demand expertise, tough judgments, unusual pattern detection or high uncertainty. The goal is to decide where deeper elicitation has the highest return. If the interview over-expands trivial motor details before locating difficult judgments, the method has failed its purpose.

### Interview 2: knowledge audit
Probe expertise in targeted contexts. Example categories include how operators notice the situation is atypical; how they establish the big picture; use patterns and anomalies; anticipate events; deal with uncertainty or exceptions; invent expedient but safe strategies; and identify errors common to less experienced people. Ask for **specific examples**, not general claims. Capture: situation, cue, significance, strategy, reason the situation is difficult, novice error, and any confidence or verification mechanism. Do not conflate a recalled anecdote with a prevalence estimate.

### Interview 3: simulation interview
Present a concrete unfolding scenario, ideally using authorized simulation or a synthetic paper vignette. Pause before a consequential decision and ask: *What matters now? What would you expect next? What could be wrong with this picture? What are the choices? What would a novice miss?* Change a cue or make it contradictory; assess how the expert would revise the plan. Prompt the expert to reveal interpretation, not merely choose a button.

### Synthesis and integration
A cognitive-demands table is useful when it **names a design problem**. A row about subtle source-quality discrepancies can motivate input validation, uncertainty representation, appropriate alerting or a training scenario. It cannot dictate one specific graphic. Connect the row to scenario ID, goal/decision ID and exact elicitation evidence; then consider alternative design support and a targeted experiment.

**Danger: interviewer demand characteristics.** Once an SME guesses the design the analyst wants, responses may shift toward supporting that concept. Use neutral phrasing, ask what would make a cue misleading, and elicit counterexamples. Under time pressure, confirm terms with actual event examples and distinguish novice/expert self-reports from independently measured expertise effects.

### How ACTA complements HTA and GDTA
HTA finds **where** work and branches occur. GDTA finds **what goals and information** organize decisions. ACTA finds **why this decision is hard, how experts recognize and manage it, and which cues an inexperienced operator may misuse**. None can replace source/architecture analysis to establish whether a given data object really exists in the proposed system.

## Worked synthetic aerospace case

**Hypothetical ACTA cognitive demand record:**
Situation: request to change guidance mode under concurrent communication.
Difficult decision: whether selected status corresponds to actual control.
Expert cue: contrast selection with an independent active-state cue and aircraft response where applicable.
Novice vulnerability: assumes UI highlight entails actuation.
Strategy: verify controlling state before relying on expected mode behavior.
Possible design support: reduce ambiguity between **selection** and **execution** while protecting attention.
Test hypothesis: one presentation yields fewer inappropriate control actions in accepted-but-deferred/inhibited trials.

The "expert cue" is a **teaching hypothesis**, not validated pilot testimony. A proper study would first elicit and corroborate it.

## Step-by-step method

Prepare approved scope → 20–30-minute broad task-diagram interview → identify cognitive hot spots → select knowledge-audit probes and request concrete examples → simulation interview with meaningful decisions → compile table of situation, cues, judgments, mistakes, strategies and sources → review semantic accuracy with SME → translate selectively into alternate design/training concepts and measurable outcomes.

## Practical lab

Create a six-chunk ACTA task diagram for a fictional maintainer isolating an intermittently reported fault (case C). Write 12 audit questions across anomalies, patterns, priorities, forecasting and novice mistakes. Script a 3-point simulation interview in which the fault message conflicts with an actual independent check. Produce a cognitive-demands table with at least five rows, and mark every example as hypothetical until source-checked.

## Retrieval / critique
1. Why does ACTA begin coarsely instead of with a deeply expanded HTA?
2. What makes 'checking a signal' a cognitive skill rather than merely an action?
3. Why might novice–expert differences be confounded by experience with a particular UI?
4. Which kind of result could refute a proposed ACTA-based design improvement?
5. How would you avoid presenting an elicited strategy as universally safe procedure?

## Pass/revise gate

Pass when three ACTA interview techniques have distinct objectives/outputs and at least four cognitive-demand records state cue, interpretation, expert strategy, novice trap, context and provenance.

## Sources and readings
[Militello & Hutton 1998](https://doi.org/10.1080/001401398186108); [PubMed abstract](https://pubmed.ncbi.nlm.nih.gov/9819578/); [public ACTA manuscript](https://web.mit.edu/16.459/www/Militello98.pdf); Crandall/Klein/Hoffman (2006), *Working Minds*.

## Integration transfer
Create one trace from **operator goal → task/decision → elicited expertise/information need → alternative concept → suitable primary task measure**. Include source evidence and a plausible disconfirming observation. If the trace stops at an expert quote, the job is unfinished.

## Portfolio artifact
Save the associated source-tagged analysis, unresolved questions, concept implications and independent reviewer notes. Use the [weekly practice log](../../../training/practice-log.md).
