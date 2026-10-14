# Week 01 — The true unit of analysis: operational work

**Course:** Flagship Task Analysis and Cognitive Engineering | **Mode:** lecture + method lab + engineering transfer | **Evidence key:** [PRIMARY]/[STANDARD]/[SYNTHESIS]/[HYPOTHESIS]. Public and synthetic cases only.

## Objectives
1. Discriminate mission, function, task, decision, cognitive demand, information need, control need, signal, requirement, design and measure.
2. Construct a trace with explicit inferential links and distinguish evidence from assumptions.
3. Detect when a proposed design prematurely dictates the results of a task analysis.

## Teaching lecture

### Why an action list fails
Imagine the record: *pilot presses mode switch; pilot checks label; pilot continues flight*. This is not useless, but it does not identify the operational problem. Why change the mode? Which aircraft state matters? What does the operator infer from the label? What if the last command was received but not accepted? What if the state changes without an input? What if keeping the aircraft on its required trajectory conflicts with staring at the display? A conventional list of actions may conceal the reasons actions are warranted, the uncertainty that makes them difficult, and the states under which they become dangerous.

A task analysis must retain **intent and context**. Decompose an operator's work as the pursuit of an outcome under constraints. The moment design teams mistake an observed button press for a basic human requirement, they may optimize that button while failing the work.

### The ten constructs
1. **Mission/operational objective:** meaningful system-of-systems outcome; not a UI goal.
2. **Scenario:** stateful case defining operator(s), starting conditions, demands, mode, timing and what can go wrong.
3. **Function:** transformation or capability that may be allocated to a human, equipment, software or combinations.
4. **Task:** goal-directed work of a specified actor, possibly made of subgoals, steps and plans.
5. **Decision:** committing, deferring or changing a choice among alternatives in a given context.
6. **Cognitive demand:** detecting cues; integrating evidence; inferring state; anticipating consequences; selecting strategies under uncertainty and time constraints.
7. **Information need:** what the actor must know, discriminate, comprehend, predict or judge, with quality/timeliness and source conditions. A display parameter is only one possible representation.
8. **Control need:** what the actor must be able to influence, under what authority and preconditions, and how receipt, acceptance and actual effect are communicated.
9. **Requirement and design:** a need motivates a verifiable statement; design chooses an allocation and implementation. They must remain distinguishable.
10. **Measure:** an operationalized variable indexing the intended outcome or mechanism in a controlled context, with instrument, scoring and criterion.

These constructs are **course ontology [SYNTHESIS]** built to preserve traceability. They do not claim to reproduce a single publisher's taxonomy. Guyton and colleagues provide mission/function/task layers and identify the richness of task-level attributes; the ontology extends that to downstream analysis and testing. The FAA standard provides an example of task- and critical-task attributes, including time, criticality, error tolerance, decision uncertainty, operator-required versus available information, and feedback; whether FAA rules apply to a specific program is a separate matter.

### The design-independent test
Take any proposed need and remove the proposed interface. Does the need still make sense? 'A large green box must sit over the instrument' fails the test; it describes a solution. 'The operator must determine whether the selected guidance is actually controlling' remains meaningful even with no visual display. Not all requirements can remain solution-independent forever—once allocated, implementation constraints can legitimately shape derived requirements—but elicitation must avoid confusing the upstream *why* with the downstream *how*.

### The epistemic test
Every analytical record must say **how it is known**. Did the operator demonstrate it? Report it? Did a public document prescribe it? Did the analyst infer it? Was it fabricated as a teaching example? Without source status, a neat analysis can acquire false authority. Triangulation is not a ritual; a discrepancy between written procedure and practice may identify the most consequential design issue.

### Trace as causal argument, not a filing exercise
A link from T-03 to IN-04 has value only if the analyst can explain how this information changes the decision. A link from IN-04 to R-09 requires evidence that the requirement actually addresses the information gap under the stated context. A link from R-09 to TEST-02 requires a test outcome sensitive to the predicted failure mechanism. A database full of linked rows can still contain invalid reasoning.

## Worked aerospace case — [HYPOTHESIS]

**Synthetic guidance example.** Objective: retain appropriate control of the aircraft while changing a guidance function. Function: allocate guidance-mode selection and monitoring to pilot/system. Task: compare intended versus actual controlling mode. Decision: maintain, transition, or intervene? Cognitive demand: understand how mode availability and transition states relate to current operation. Information need: distinguish **requested, accepted and active/controlling** status with sufficient validity for the decision. Control need: request a valid transition; detect inhibition; recover after unsuccessful transition. Candidate requirement: system differentiates selected and active status under defined modes. Candidate experiment: compare mode-state classification and actual-control recovery in accepted, deferred and inhibited simulation branches, using the simulator log as truth.

**A flawed alternate trace:** 'Pilot wants to see active mode in top-left; place active label top-left; measure eye fixations on top-left.' It assumes visual placement without eliciting need, equates looking with comprehension, and may miss the operational outcome.

**Edge case:** A pilot may *correctly* spend zero time looking at an indicator in a period when visual attention must be allocated elsewhere. Low fixation count cannot alone establish low awareness.

## Repeatable method protocol — [SYNTHESIS]

**Step 1.** Set a bounded operational objective and scenario. **Step 2.** Write one record for each construct before connecting records. **Step 3.** Ask what evidence makes each linkage credible. **Step 4.** Identify at least one alternative representation or way of completing the task. **Step 5.** Design a counterexample where the feature works but the mission outcome fails. **Step 6.** Tag conjectures and open questions explicitly.

## Guided laboratory and deliverable

Construct two eight-link traces—one for **mode management** and one for **interrupted checklist restoration**. For each, specify the source of claim, an operator decision, required and available information, an action/control feedback loop, one candidate requirement and one *independent* measure of task outcome. Then challenge one link in each: why is the required data needed? What if that data are absent? Use `templates/` CSVs as optional scaffolding.

## Retrieval and adversarial checks
1. Can a system function exist without a pilot task? Can a task exist without using an interface? Explain.
2. What is wrong with inferring a need for a map from a pilot asking for a larger map?
3. How can the measured time to select a button improve while operational performance worsens?
4. What is the difference between the **ground truth** of active mode and the operator's belief about active mode?
5. Identify two places in a requirement trace where analyst inference must be labeled.

## Completion and critique standard

Pass when every construct is operationally defined and the trace remains interpretable without the selected screen implementation. Record any ambiguous classifications instead of forcing artificial certainty.

## Primary/supporting reading
[Guyton et al. 2025, processed source](https://github.com/steven-ford2/FighterJets/blob/main/references/task-analyses-mbse.md); [FAA HF-STD-004A §5.1.10](https://hf.tc.faa.gov/publications/2016-09-human-factors-engineering-requirements/); [course schema](../../../practice/data-dictionary.md)

## Engineering integration prompt
Take one claim from your output and identify: the operator decision, the inferred information/control need, the system-state/source behavior that can deliver it, the candidate allocated requirement, and a **task-valid observable test outcome**. If any link relies solely on a proposed UI element or on unsupported timing, flag it and revise.

## Reflection
What would this analytical method *fail* to detect? Which alternative method or operational observation would expose that failure? Record your answer in [weekly practicum](../../../training/practice-log.md).
