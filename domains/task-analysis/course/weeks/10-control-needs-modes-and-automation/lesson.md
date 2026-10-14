# Week 10 — Control needs, states, authority and human–automation coordination

**Type:** graduate teaching lesson, engineering method and synthetic laboratory. **Source labels:** published framework vs [SYNTHESIS] engineering integration vs [HYPOTHESIS] case must be kept separate.

## Learning objectives
- Describe the core analytical problem and classify its variables correctly.
- Execute the method protocol in a synthetic aircraft/operator scenario, maintaining provenance.
- Convert its findings into a falsifiable design/requirements/test implication and critique one serious weakness.

## Teaching lecture

### The most expensive interface ambiguity may be a verb
A requirement says *the pilot shall be able to activate mode B*. What is 'activate'? Is the pilot requesting, commanding, authorizing, toggling, scheduling or directly controlling B? Does acceptance imply execution? Under what preconditions? What happens if an override or sensor fault changes the authority? Without these distinctions, the control is underspecified even when its physical shape is fixed.

### Control-loop decomposition
For each intent write **request → receipt → validation/authorization → acceptance/rejection → transition/execution → actual state → achieved operational outcome → feedback/recovery**. These stages may be combined in simple systems and separated in complex ones, but the analyst must establish which are distinguishable. The right operator feedback depends on the decision and consequences: an imperceptibly fast safe change may need less explicit state display than an inhibited, irreversible or delayed high-impact transition. Do not assert universal annunciation rules.

### States versus modes
A *state* is a system condition at a moment; a *mode* is an operating regime with changed behaviors/constraints. Mode identity and availability can depend on other systems. A pilot's selected mode, an automation's internal active mode and the achieved aircraft response may not match. State modeling requires unambiguous transition guards, actors, events, conditions, outputs, timeouts, exceptional transitions and recovery. The diagram needs both **happy path** and adverse transitions.

### Authority and function allocation
A function can be allocated to the human, automation, a shared team or a dynamically reassigned actor. Parasuraman/Sheridan/Wickens's framework addresses types and levels of human involvement in automation. Use the framework to ask: is automation gathering information, analyzing it, choosing actions, or implementing them? Where can the human see, veto, supervise or regain control? The right answer depends on performance, safety, latency and operator trust calibration. Bainbridge's *Ironies of Automation* motivates special attention to the monitoring and exceptional tasks that remain with humans after routine work is automated.

### Mode confusion as a cognitive engineering problem
The issue is not merely forgetting a label. An operator may have an incorrect mental model of the present mode or transition, perhaps induced by feedback that conflates selected and actual states, ambiguous automation behavior, or missing cues under workload. Analyze **what the system does, what the operator believes it does, and what action that belief permits**. The resulting testing must observe belief/action and independently log actual state.

### Detailed control need record
CN-ID, goal, actor and authority; affected function; requested state; allowed initial states; preconditions; command characteristics; mode availability; inhibition and arbitration; deadline; error/tolerance/reversal; acknowledgment; accepted/rejected; active/achieved feedback; coordination with other controls; degraded behavior; training/procedure implications. If a button can only be pressed under a special aircraft state, that is part of the task context, not an incidental UI note.

### Anti-pattern
A designer makes every selected switch illuminate instantly, and the pilot perceives confident feedback. In deferred/inhibited cases the animation increases a false belief. Salient feedback is not necessarily accurate feedback; **meaningful feedback must be tied to the intended system state**.

## Worked synthetic example [HYPOTHESIS]

**Synthetic state machine**
```
Idle -> Requested [pilot issues input]
Requested -> Rejected [guard fails, reason available]
Requested -> Accepted [guard passes]
Accepted -> Pending [execution deferred]
Accepted/Pending -> Active [actual controlling state changes]
Active -> Terminated [system or human event]
Rejected/Pending -> Recovery [appropriate operator response]
```
Possible invalid model: *button highlight = active*. A-3 inhibited trial defeats the assumption. Primary test: correct actual-state decisions and inappropriate repeated commands, using state machine log as truth. Secondary: recognition time, source sampling under concurrent workload.

## Practical method [SYNTHESIS]

Derive operator intent first → distinguish physical input and logical command → enumerate system states/events → ask who has authority in each state → define preconditions/guards/inhibits → draw state-transition table → define feedback at decision points → analyze invalid, delayed, revoked and reversed commands → trace each function into requirements and behavioral tests.

## Applied lab and work product

Develop state-transition table with at least 9 transitions for case A. Identify three controls or responses that should be inhibited in some conditions. For every transition specify what operator perceives, what software records, how actual state is checked, and what happens if feedback is lost. Compare alternative feedback designs.

## Retrieval and red-team questions
1. What exactly is proved by a command acknowledgment?
2. Can mode be selected but not active? What test reveals misunderstanding?
3. When is a control *authority* question more important than layout?
4. What are at least four distinct exception transitions a state model should include?
5. What metric assesses *correct control* rather than button interaction efficiency?

## Source-linked reading
[Parasuraman/Sheridan/Wickens (2000)](https://doi.org/10.1109/3468.844354); Sarter & Woods (1995), mode confusion; Bainbridge (1983), Ironies of Automation; [PVI course 16](https://github.com/steven-ford2/FighterJets/blob/main/courses/16-pvi-systems-integration-mbhse/README.md)

## Pass/revise criterion

Pass when transition conditions, actual state and expected feedback are explicit and verified against operator decisions and error recovery.

## Cross-method challenge
What would an HTA-only, GDTA-only, ACTA-only or design-first analyst miss in this case? Write two explicit limitations and a plan to acquire disconfirming evidence. Enter findings into [weekly practice log](../../../training/practice-log.md).
