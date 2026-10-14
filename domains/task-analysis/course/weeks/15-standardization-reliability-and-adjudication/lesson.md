# Week 15 — Standardizing the method: repeatability, QA and organizational adoption

**Integrated lecture | research → analysis → design → validation.** Synthetic, public cases; not an authorized aircraft operating procedure.

## Objectives
- Understand the specialized method, related constructs and inference limits.
- Execute a repeatable analysis or evaluation exercise with explicit evidence.
- Derive falsifiable PVI/procedure engineering and test decisions.

## Teaching lecture

### Standards should standardize *decisions and evidence quality*, not merely forms
A beautiful template filled inconsistently by analysts does not standardize task analysis. The organization's real goal is that two trained analysts studying comparable work produce artifacts whose meanings, relations and underlying evidence are compatible and which result in defensible requirements and test decisions. This requires method selection rules, clear semantics, interviewer training, source handling, quality gates, adjudication, controlled changes and evidence that results can be used.

### Separate agreement, accuracy and utility
**Inter-analyst reliability:** do analysts code the same task boundaries, decisions, needs and relation types similarly?
**Operational validity:** do captured models correspond to real work and meaningful expertise? Agreement between two analysts who both use an incorrect procedure is not validity.
**Engineering utility:** do findings improve requirement allocation, discovery of critical exceptions, concept selection or test coverage?
**Cost/feasibility:** how much effort and access does the standardized process require?
A method can excel on one axis and fail another. Do not optimize only kappa or completion time.

### Frozen dossier pilot
Provide two analysts the same synthetic/public case, identical coding guide and permission boundaries. Ask both to produce independent scenario set, HTA, decisions, information and controls, source evidence, requirements and measures. Compare:
- Unitization: did they identify the same units?
- Inclusion: which tasks/decisions/needs are missing or added?
- Classification: task versus decision versus cue/need.
- Semantic equivalence: different wording of same requirement.
- Linking: does the same need connect to the same decision and test?
- Criticality: do differences affect high-consequence design decisions?
Do **not** collapse all divergences into one uninterpretable percent. Some matches require adjudication of terminology, while omission of a rare safety-critical scenario needs separate review.

### Coding manual
Define each data field with positive examples, negative examples, edge cases and a 'do not infer' warning. For 'information required' give an instance where a displayed variable is not necessary, and one where a relation among variables matters. For 'action feedback' distinguish request received, command accepted and actual state achieved. For 'time constraint' require a source for the deadline. Create a source basis controlled vocabulary.

### Gate criteria
**G0** access and purpose approved, safe handling.
**G1** relevant scenarios and coverage documented, missing cases assigned owners.
**G2** tasks/decisions/needs independently intelligible, source basis and uncertainty preserved.
**G3** consequential needs link to feasible allocated functions, system states, controls, requirements and validation claims.
**G4** claims subjected to appropriate SME/user/test review; deviations remain visible.

A gate is a decision process involving evidence and accountable reviewers, not a spreadsheet magic formula. A critical unknown should not be hidden behind 'all fields populated'.

### Failure of completeness scores
If an analyst invents entries to reach 100%, your metric rewards false certainty. Score **coverage with evidence**, **open/contested issues** and **consequential defects**, not forced emptiness removal. A study can be high quality while documenting unresolved uncertainty if it identifies what evidence is needed next.

### Implementation inside an engineering team
Begin with small public/synthetic pilot; then run an authorized real-domain pilot using appropriate systems and approvals. Train facilitators in cognitive interviewing, not only data entry. Obtain reviews from operator SMEs, SE/architecture, PVI, safety and testing. Maintain a standard change-control route, source/version links, and a process for analysts to challenge field definitions. Gate the process based on useful decisions, not number of recorded tasks.

### Position relative to contractual obligations
MIL/FAA standards, project DIDs and organizational process are different authority levels. A personal training course cannot approve contract interpretation. Tailor the method to the actual baselined program and get appropriate process authority before claiming standardization.

## Worked case [HYPOTHESIS]

**Pilot problem:** Analyst A creates IN-01 'display mode label' and Analyst B creates IN-01 'know actual controlling mode.' Their apparent low text agreement masks a deeper issue: A coded a design solution while B captured a need. The coding manual must resolve this conceptual boundary, not merely align labels.

**A more serious discrepancy:** A codes only nominal and inhibited transitions; B identifies delayed activation under high concurrent load. Compare consequence and source basis. If both are warranted, the standard needs stronger scenario selection questions.

**Utility study:** Judge whether the standardized approach causes designers/testers to catch a requirement or critical test condition the prior approach missed, and whether the additional analysis time is justified.

## Method execution [SYNTHESIS]

Freeze dossier → independently analyze → develop a controlled category guide → blind-code using shared definitions → compare inclusion, semantic labels, edges and critical omissions → adjudicate without overwriting minority evidence → revise operational definitions and training → rerun on distinct case → solicit downstream design/test utility feedback → issue controlled process revision with limitations.

## Laboratory / portfolio

Design a pilot for at least two independent analysts and two case types. Produce sampling rules, coding guide, adjacency/semantic matching method, disagreement log and change-control route. Write a simulated results table showing different agreement on tasks vs information needs, then explain what action each discrepancy warrants. Document security permissions for any later real-program study.

## Adversarial retrieval
1. How can high inter-analyst agreement coexist with wrong operational conclusions?
2. Why is category presence not the same as relationship agreement?
3. What is an appropriate response to meaningful disagreement between two experienced SMEs?
4. How can process completion metrics incentivize fabricated certainty?
5. When is a method considered standardized but not yet validated?

## Essential reading
[Draft standard process](../../../practice/standard-process.md); [quality rubric](../../../practice/quality-rubric.md); [DoD HSI guidebook](https://www.cto.mil/wp-content/uploads/2024/07/HSI-Guidebook-C1-2024.pdf); [FAA HF-STD-004A](https://hf.tc.faa.gov/publications/2016-09-human-factors-engineering-requirements/)

## Mastery gate

Pass when the calibration scheme separates units, semantic categories, relations, critical omissions and downstream decision usefulness; disputed evidence is preserved and standards authority remains appropriately bounded.

## Transfer task
Using the same scenario as last week, add or revise two relations in the trace: **goal/decision → source or operator need → requirement/design → task measure**. State which earlier inference was too strong. Place the work in [weekly log](../../../training/practice-log.md).
