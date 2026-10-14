# Week 1 / Lesson 1 — What is the object of task analysis?

## Learning target
Given an operational statement, correctly distinguish **mission outcome, function, task, decision, cognitive demand, information need, control need, interface solution, requirement, and measure**. This is the basic coding grammar for everything that follows.

## Foundational distinctions
**Mission objective:** desired operational result ('maintain safe flight and intended guidance').
**Function:** a capability or transformation provided by human/system ('manage guidance mode').
**Task:** goal-directed work by an actor ('verify which mode is controlling').
**Decision:** selection among alternatives under context ('continue in the current mode or change it?').
**Cognitive demand:** mental operation and expertise requirement ('interpret inconsistent requested/active states').
**Information need:** proposition/operator knowledge needed ('whether active mode matches requested mode').
**Control need:** outcome the operator must be able to influence ('request a valid transition with feedback').
**Interface solution:** a design embodiment ('mode label in the primary flight display').
**Requirement:** verifiable system/human constraint ('the system shall distinguish selected from active mode under defined conditions').
**Measure:** a valid observable that tests a stated claim ('correct active-mode classification by ground truth, and task time').

## Deliberately confusing examples
A pilot says: 'Put the mode in the upper-left corner.' That is an **interface preference**, not the underlying need. Ask: *What question does locating it there allow you to answer, and under what conditions?*
A designer says: 'The operator needs airspeed.' That may be a **candidate datum**, but an adequate need analysis asks which judgment needs airspeed, under which phase, at what quality/timing, and whether another representation could satisfy the decision.
A test engineer says: 'We will measure fixation duration on the indicator.' That is a **process variable**, not a performance claim. Ask what successful detection/comprehension/action entails.
A systems engineer says: 'The command is acknowledged.' Ask **received? accepted? executing? achieved?** Each may be a different system fact.

## 25-minute pencil-and-paper exercise
### Part A: classify each statement with the most precise type
1. 'Arrive at a state appropriate for the operating condition.'
2. 'The crew must determine which guidance law is actually engaged.'
3. 'A mode-selection request is rejected under these preconditions.'
4. 'A bold annunciation occupies the top of the display.'
5. 'Pilots may confuse a selected state with an active state.'
6. 'The pilot must predict whether the present control law will maintain the intended trajectory.'
7. 'System shall indicate unsuccessful selection when a command is inhibited.'
8. 'Time to correctly report actual mode during a transition.'
9. 'Change guidance mode.'
10. 'Which of two permitted guidance alternatives fits the current conditions?'

### Part B: write your own trace
For the synthetic mode case, write one entry each for M, F, T, D, IN, CN, R and TEST with one sentence and a source-basis label. Draw relationships; do not write a screen location or a color before the need.

### Part C: adversarial review
1. Remove the display. Which statements are still meaningful?
2. Alter the system so selection succeeds but activation is delayed. What extra information/feedback is required?
3. What evidence supports your chosen test threshold?
4. Identify two plausible performance measures that may disagree and why.

## Answer key (Part A)
1 objective; 2 task (and associated decision requirement); 3 system behavioral fact/constraint; 4 interface solution; 5 cognitive error hazard hypothesis; 6 information/cognitive prediction need; 7 candidate system requirement; 8 measure; 9 task or control action (needs context to distinguish); 10 decision. **Ambiguities are intentional.** The correct analytical habit is to demand operational definitions, not blindly assign one tag.

## Completion criterion
Submit a 1-page ontology table and a valid eight-link trace. Check against [quality rubric](../practice/quality-rubric.md). If an entry is not defensible without invoking a presumed display implementation, revise it.

## Primary reading
- [Existing Guyton 2025 processed paper](https://github.com/steven-ford2/FighterJets/blob/main/references/task-analyses-mbse.md), mission/function/task sections and Table 1.
- MIL-STD-46855A task-analysis sections (obtain official revision from ASSIST).
- [Overall methods guide](../methods/method-selection.md).
