# Week 13 — What to measure: construct validity from operator tasks

**Integrated lecture | research → analysis → design → validation.** Synthetic, public cases; not an authorized aircraft operating procedure.

## Objectives
- Understand the specialized method, related constructs and inference limits.
- Execute a repeatable analysis or evaluation exercise with explicit evidence.
- Derive falsifiable PVI/procedure engineering and test decisions.

## Teaching lecture

### Do not let the available instruments define the research question
A lab has an eye tracker, workload questionnaire, response-time logging and a physiological sensor. That is a list of instruments, not a measurement plan. An interface study begins with a claim derived from the task analysis: **the operator must detect a failed transition early enough to preserve the intended operational state**, or **a revised procedure must permit accurate state-based resumption after interruption**. What constitutes success? Which event qualifies as failure? Which confounds can cause the observed differences? Only then should we choose measurements.

### Map the causal claim
Write the chain **operational objective → task → decision → failure mechanism → intervention → primary outcome → secondary process measures**. A metric is valid to the degree that interpretation of its scores supports the intended claim in the target context; validity does not inhere in the eye tracker or questionnaire. Avoid substituting 'a significant difference occurred' for 'the design better supports the mission'.

### Seven families of outcomes
**Outcome:** correct achieved aircraft/system state, controlled trajectory, safe completion, expected task result.
**Task execution:** time, omission/commission, branch correctness, retries, timing constraints, recovery success.
**Decision:** correct classification or intervention under the available evidence, delay to decision, false/missed events, calibration of confidence.
**Situation awareness:** accurate knowledge of relevant current and projected states via targeted probes/independent behavioral evidence; possible intrusion by probe itself must be assessed.
**Control-loop:** distinguish requested/accepted/active/achieved state; track who had authority; detect failure and apply appropriate recovery.
**Cognitive process/attention:** gaze distribution, switching, dwell, revisits, information selection, communication, subjective workload, physiological responses.
**Experience and acceptance:** confidence, perceived usability, frustration, perceived workload, preference.

Not every study needs all families. In consequential cases, include an outcome measure plus a mechanism-sensitive measure. A decrease in workload without preserved task performance may be actively bad.

### Construct confusion around gaze
A fixation can index overt sampling opportunity, not guaranteed comprehension. An off-display glance may be appropriate visual scanning of the flight environment rather than a failure to use the interface. More time spent viewing a status could mean sustained attention, confusion, difficulty finding the answer or a critical need to verify. A pupil-diameter difference may reflect illumination, effort, emotion and hardware issues. For every measure state **which plausible alternate explanations exist**, and select controls to help distinguish them.

### Workload and SA ratings
NASA-TLX is a subjective workload rating used in many HF investigations; it is not a direct instrument for safety, mission achievement or neural capacity. SAGAT-style SA probes target particular knowledge states but probe timing and item selection can change task behavior and impose validity constraints. Correlation with one metric does not make constructs identical. Separate a person reporting high confidence from the accuracy of the belief.

### Thresholds and denominators
A response time without a task-relevant deadline is hard to interpret. Derive safe/tolerable performance windows from mission constraints, hazards, validated models, representative simulation and program requirements. If no defensible threshold exists, explicitly identify it as a research objective. For omissions, distinguish counts from rates per opportunity. For rare failures, report exposure denominators and confidence intervals instead of an apparently exact percentage from tiny samples.

### Causal inference
Randomization/counterbalancing can support a design comparison but cannot fix a misdefined dependent variable. Conversely, ground-truth logs can establish whether an operator achieved the right state but may not explain the error mechanism. Triangulate selectively: mission outcome as principal result, cognitive question as a diagnostic, gaze/workload as supporting explanation.

## Worked case [HYPOTHESIS]

**A-3 inhibited command:** Hypothesis: representation B helps distinguish selected from active state. Primary outcome: correct actual-state classification under predefined scenarios and inappropriate attempts to rely on inactive mode; secondary outcomes: recognition latency, safe recovery, aircraft-control tolerance, specific SA answers. Supporting: gaze to confirmation area and perceived workload. Alternate interpretation: B may elicit slower, more cautious interaction; performance could improve only because participants scrutinize it more. Test both task accuracy and cost of attention allocation.

**B interruption case:** A digital checklist shows fewer post-interruption clicks. But final achieved state accuracy is unchanged or worse. Conclusion: the click metric did not support the claimed operational advantage.

## Method execution [SYNTHESIS]

Write the explicit construct → operationalize target and failure → identify independent ground truth → choose primary performance outcome(s) → choose mechanism/process measures only as needed → specify units/events/opportunities/missingness → collect plausible confounds and controls → derive thresholds or label as unknown → set interpretation and uncertainty plan before seeing data.

## Laboratory / portfolio

Given cases A and B, develop six hypotheses, ten measurement specifications, and for each identify: construct, numerator/denominator or scale, truth source, sampling rule, expected direction, alternative interpretation, and confounds. Select one eye-tracking and one workload metric and write an explicit argument why neither alone is proof of operational success.

## Adversarial retrieval
1. How can an eye-tracking result look 'better' while pilot performance worsens?
2. What is the difference between measure reliability and construct validity?
3. How should 'no error in 8 trials' be interpreted?
4. When is a task completion-time improvement unimportant or harmful?
5. Why might an SA probe contaminate the task it assesses?

## Essential reading
[Measurement framework](../../../practice/measurement-framework.md); Endsley (1995), SA measurement; Hart & Staveland (1988), NASA-TLX; [Sauro & Lewis processed source](https://github.com/steven-ford2/FighterJets/blob/main/references/quantifying-the-user-experience-jeff-sauro-james-r-lewis.md); [Lazar et al. processed source](https://github.com/steven-ford2/FighterJets/blob/main/references/research-methods-in-human-computer-interaction-jonathan-lazar-jinjuan-feng-and-harry-hochheiser.md)

## Mastery gate

Pass when primary measurements correspond to decision/task outcomes, thresholds and denominators are justified/flagged, and three alternative explanations for an observed effect are articulated.

## Transfer task
Using the same scenario as last week, add or revise two relations in the trace: **goal/decision → source or operator need → requirement/design → task measure**. State which earlier inference was too strong. Place the work in [weekly log](../../../training/practice-log.md).
