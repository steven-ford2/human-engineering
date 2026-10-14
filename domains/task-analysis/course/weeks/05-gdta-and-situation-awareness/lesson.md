# Week 05 — Goal-directed task analysis: from goals to situation awareness requirements

**Evidence convention:** [PRIMARY] original method/source; [ABSTRACT] limited record; [SYNTHESIS] instructional engineering method; [HYPOTHESIS] teaching case. Do not transform [HYPOTHESIS] into a real cockpit requirement.

## Objectives
1. Develop a goal hierarchy that identifies decisions rather than screen features.
2. Derive information needs across perception, comprehension and projection where operationally warranted.
3. Distinguish SA *requirements* from SA *measurement* and from data availability.

## Conceptual lecture

### The question before the variable
'What data does a pilot need?' sounds reasonable but lacks a criterion. An answer may be a long inventory of quantities that are technologically available, historically displayed, or familiar to pilots. GDTA reverses the inquiry: **what operational goals must the pilot accomplish, which decisions determine goal attainment, and what information makes those decisions possible?**

Endsley's 1993 fighter study explicitly used unstructured interviews, goal-directed task analysis, and structured questionnaires with experienced pilots to identify SA requirements and their relative priorities. That source is a strong model for the sequence of inquiry, not automatic evidence that any particular inventory is complete for a different fighter mission or avionics architecture. This course adopts goal–decision–information as the *analysis structure*; participants must still inspect the full published work before claiming its particular questionnaire method.

### Three SA levels without three mandatory boxes
L1 **perception**: information about what is currently present or happening, such as a mode status, source validity or an approaching limit cue.
L2 **comprehension**: meaning of those facts in relation to operator goals, such as realizing that a selected mode has not yet become controlling and that a planned action would be ineffective.
L3 **projection**: estimating future relevant states: if the mode remains inhibited, what will happen to the intended trajectory or task sequence?

These are analytic distinctions, not a requirement to populate all three for every tiny subtask. The designer should understand which decision depends on which level, and avoid treating comprehension as equivalent to displaying more L1 values. Conversely, a task may support L2 understanding through a single integrated indication; decomposing information needs need not predetermine how integration must look.

### Source and quality semantics matter
Information needed is not necessarily information available. The analyst records the *meaning* of the required fact, source and uncertainty, time-to-use, acceptable age, integrity, ambiguities, display environment and relevant concurrent tasks. A source can be available and misleading: a displayed value may be valid but stale; syntactically correct but from the wrong coordinate frame; accurate but unrelated to the decision; acknowledged but not authoritative for the active mode.

Document conflicting information and whether operators can diagnose the source conflict. The requirement may be *to know that information is unavailable*, not to display a false value with unjustified precision.

### Avoid a common category error
Asking 'what should the pilot be looking at?' may produce a monitoring strategy. Asking 'what is the pilot trying to decide now?' identifies the decision criterion. A glance pattern is later evidence about attention allocation, not the definition of SA. Likewise, using an SA probe technique in a simulation to score a participant's answer is distinct from eliciting the SA requirements that such a probe should target.

### Prioritization is contextual
You can prioritize by operational consequence, deadline, frequency, vulnerability to false/missing information, expected exposure and specific hazard. These dimensions should remain transparent and separate before aggregation. A rare high-consequence need can deserve far greater engineering attention than a frequently consulted low-stakes status. An 'importance 5/5' score without definition merely conceals judgment.

### Design implication
A strong GDTA can lead to information that is *not currently displayed*; equally, it can show that some constantly visible values need not be shown during every mode. A safe design does not maximize bits per display; it supports correct judgments at the right opportunity cost.

## Worked synthetic aerospace case

**Synthetic guidance-mode GDTA:** G0 maintain intended guidance. G1 establish actual control. D1 'Is requested mode controlling?' Needs: last requested state; command acceptance; actual control authority and active mode; status source validity. G2 decide intervention. D2 'Is retaining current control acceptable?' Needs: flight path context, availability/inhibition causes, consequences, anticipated effect of state change. G3 confirm success. D3 'Has effect been achieved?' Needs: active state transition plus independently observed aircraft-state response as warranted.

The information list is not a list of PVI widgets. A designer could supply a single integrated, well-coded active/selected mode indication or several context-specific cues, subject to validation. **Bad inferential link:** 'operator must know mode -> mode text should be 14pt red -> gaze dwell increases -> effective SA'. Neither implementation nor outcome follows without additional argument.

## Step-by-step method

Define mission outcome and stable scenario → ask goals independent of interface → identify time/place-specific decisions → elicit alternative choices and their consequences → ask which cues/relationships/projections differentiate choices → capture required versus actually available information, with provenance and uncertainty → confirm with multiple SMEs and technical architecture → use trace to generate alternative concept hypotheses and corresponding SA/performance measures.

## Practical lab

Produce a goal/decision/information tree for case A plus three degraded/inhibited variants. Write at least 10 information needs with explicit decision IDs and availability. Mark which are L1/L2/L3 and why; label six source-quality attributes. Design three scenario-based SA questions that do not trivially reproduce what a single display label says.

## Retrieval / critique
1. Why is a parameter catalog not a GDTA?
2. Can L1 indicators be correct while L2 understanding is wrong? Give example.
3. What makes a 'required' cue required rather than merely familiar?
4. When might less frequently sampled information have the highest criticality?
5. What distinguishes an SA requirement from a SAGAT-style probe or other SA measure?

## Pass/revise gate

Pass when every high-priority information need has a goal/decision/consequence/operating-state justification and available-versus-required distinction; no candidate display is called validated.

## Sources and readings
[Endsley 1993 fighter SA requirements (publisher abstract)](https://doi.org/10.1207/s15327108ijap0302_5); Endsley & Jones (2011), *Designing for Situation Awareness* (full book to acquire); [information-needs template](../../../templates/information-needs.csv)

## Integration transfer
Create one trace from **operator goal → task/decision → elicited expertise/information need → alternative concept → suitable primary task measure**. Include source evidence and a plausible disconfirming observation. If the trace stops at an expert quote, the job is unfinished.

## Portfolio artifact
Save the associated source-tagged analysis, unresolved questions, concept implications and independent reviewer notes. Use the [weekly practice log](../../../training/practice-log.md).
