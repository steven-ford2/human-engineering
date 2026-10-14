# Week 03 — Hierarchical task analysis and plans

**Course:** Flagship Task Analysis and Cognitive Engineering | **Mode:** lecture + method lab + engineering transfer | **Evidence key:** [PRIMARY]/[STANDARD]/[SYNTHESIS]/[HYPOTHESIS]. Public and synthetic cases only.

## Objectives
1. Apply goal-oriented hierarchy and HTA plan operators coherently.
2. Model sequencing, optional branches, parallel work, repetitions and stopping conditions.
3. Explain why HTA alone cannot establish latent expert decision requirements.

## Teaching lecture

### Task decomposition is a theory of performance
HTA represents work in a hierarchy of goals, subgoals and **plans** governing how subordinate goals are achieved. The plan is not decorative. Without it, a tree of task names tells the engineer that components exist but not how they interact, where order matters, or which branch is selected. Stanton's 2006 review identifies HTA as an enduring method adapted far beyond initial training design, including interface evaluation, function allocation, errors and workload. This course uses that established method, then attaches cognitive and engineering artifacts that HTA by itself does not guarantee.

### Goal language versus a button description
Weak: 'click tab, tap option, read banner'. Stronger: 'establish the controlling mode and verify whether a proposed transition achieved the intended control state'. In HTA the top goal must describe the operator's operational attainment rather than the interface sequence. A modern interface can reorder actions without changing the goal; conversely, a physically identical click may serve different goals under different conditions.

### Decomposition rule
For each parent, ask what subordinate work must be completed **to satisfy the parent**. If parent G0 is 'restore a valid configuration after interruption', possible children include reconstruct actual state, determine completed actions, choose a safe resume point, perform remaining valid steps and verify end conditions. 'Look at menu' is an optional means, not an inevitable child. Label each subgoal with an actor and the relevant trigger; do not write an indefinite hierarchy.

**Plan grammar:** sequential (1 then 2); conditional (if state is X do 3, else 4); selection (one of 3/4 according to decision D); parallel (maintain control while processing communication); iteration (repeat monitoring until exit); optional (perform when condition holds); stop/recovery (abort or branch after observed failure). Express the plan explicitly in text or formal representation and make exit conditions testable.

### Granularity and stopping
HTA is a selective model. Decompose until your level of detail supports design, training, human-error, workload, allocation or test choices. Over-decomposition produces large lists of movements that may not illuminate the judgment problem. Under-decomposition hides control feedback and decisions. Use a *design question* to select depth: if we need to know whether a checklist supports interruptions, expand the resumption and verification branch; do not detail unrelated normal operations to the same depth.

### Actual versus prescribed work
A published checklist may show one ideal sequence. Observed operators may execute parallel steps or recover after interruption differently. Neither record should overwrite the other. One describes normative procedure; another describes work-as-done. Discrepancies must be investigated rather than categorized as user error by assumption.

### Add cognitive markers
HTA nodes can carry D-ID markers for decision points, IN-ID information requirements, CN-ID controls, error mechanisms, interruptions, time limits and sources. Yet they remain associated **views**, not interchangeable nodes. A task-level verb like 'evaluate' is a placeholder until the analyst asks *evaluate what evidence for which alternative?* That is why the next major phase introduces GDTA and ACTA.

### Usability and verification transfer
From HTA you can derive path-based task cases: nominal, missing prerequisite, incorrect state, interruption and recovery. A good checklist evaluation measures state attainment, branch correctness and omission/commission, rather than counting how quickly all boxes are checked.

## Worked aerospace case — [HYPOTHESIS]

**Worked hierarchy: synthetic interruption.**

```
0 Restore intended system state after checklist interruption
  1 Re-establish operating context and authority
  2 Determine actual system and prior-action states
  3 Identify remaining valid work
  4 Perform remaining action(s)
  5 Confirm achieved system state
  6 If inconsistency exists, enter defined safe recovery/hold process
Plan 0: 1→2→3; if state supports continuation then 4→5;
        if any verification fails then 6;
        throughout, preserve higher-priority aircraft-control work.
```
For subgoal 2, the analysis must specify **how the operator knows** a command completed. For 3, the analyst must identify **when repeating an action would be unsafe**. These are GDTA and control-state questions; HTA locates but does not resolve them.

**Bad version:** '0 complete checklist; 1 open checklist; 2 tick every item; 3 done'. It treats UI progress as mission outcome and has no branch, timing or state verification.

## Repeatable method protocol — [SYNTHESIS]

Interview/observe task context → top-level goal → 3–7 meaningful subgoals as needed → explicit plan notation → recursively expand ambiguous/critical branches → annotate source and exceptional contexts → inspect with SME and system owner → keep numbering/version stable → extract decision/needs questions. Use a task table alongside the diagram; drawings alone are hard to audit.

## Guided laboratory and deliverable

Create two HTAs: (A) generic mode transition, (B) checklist interruption. For each provide four plan forms: conditional, parallel, recovery and termination. Annotate one decision question, two data-quality concerns and one work-as-prescribed versus work-as-observed uncertainty. Produce a counterexample where completing every visible step does **not** achieve the true top-level goal.

## Retrieval and adversarial checks
1. What essential information is missing if a hierarchical diagram has no plans?
2. Why is 'activate guidance' a potentially ambiguous goal?
3. When should you stop expanding a task node?
4. How can a perfect HTA still miss the cognitive expertise that distinguishes novices from experts?
5. How does an interrupted procedure illustrate the difference between action-complete and state-achieved?

## Completion and critique standard

Pass when parent/subgoal semantics and all plans are coherent and independently executable **at a task-model level**, not as real aircraft instructions; all recovery branches have explicit termination conditions.

## Primary/supporting reading
[Stanton 2006, original HTA review](https://doi.org/10.1016/j.apergo.2005.06.003); [Brunel archive](https://bura.brunel.ac.uk/handle/2438/1423); [task template](../../../templates/tasks.csv)

## Engineering integration prompt
Take one claim from your output and identify: the operator decision, the inferred information/control need, the system-state/source behavior that can deliver it, the candidate allocated requirement, and a **task-valid observable test outcome**. If any link relies solely on a proposed UI element or on unsupported timing, flag it and revise.

## Reflection
What would this analytical method *fail* to detect? Which alternative method or operational observation would expose that failure? Record your answer in [weekly practicum](../../../training/practice-log.md).
