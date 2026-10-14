# Week 14 — Designing experiments and operational procedure evaluations

**Integrated lecture | research → analysis → design → validation.** Synthetic, public cases; not an authorized aircraft operating procedure.

## Objectives
- Understand the specialized method, related constructs and inference limits.
- Execute a repeatable analysis or evaluation exercise with explicit evidence.
- Derive falsifiable PVI/procedure engineering and test decisions.

## Teaching lecture

### A good test is a causal question under realistic conditions
By Week 14, the analysis should have produced decisions and requirements precise enough to test. 'Is design A preferable?' is underspecified. 'Compared with design B, does A reduce incorrect judgments about actual control mode during deferred activation while maintaining flightpath task accuracy under concurrent communication?' is actionable. The question ties **the manipulation** to **an operational failure mechanism** within explicit context.

### Build a test specification
Identify population, proficiency, operational role, sample rationale, experimental conditions, tasks and stimuli, controlled data sources, order and learning, what the simulator faithfully represents and omits, performance goals, primary outcomes, secondary measures, missing-data handling, training/practice, debrief/probes, inclusion/exclusion criteria, analysis plan, risks and debrief.

**Independent-variable integrity:** If A and B differ in salience, physical location, information availability and mode logic simultaneously, a performance effect does not identify which cause mattered. Sometimes testing packages is appropriate, but interpretation must match what was manipulated. State the causal boundary.

### Repeated measures and independence
Within-participant comparisons reduce between-person variation but introduce training, sequence, fatigue and carryover. Counterbalance where possible; use task/scenario orders that do not reveal the expected failure. Between-participant design can avoid learning effects but may need more participants. For repeated measures, distinguish *trials* from *independent people*, and account for participant/scenario variability in inference. Do not treat 300 correlated trials from ten participants as 300 independent subject observations.

### Ground truth and event coding
A simulator can log command receipt, accepted/rejected, pending, active state, achieved behavior and task outcomes. Synchronize PVI event times, eye movements, performance/flight data and interviewer probes; verify clocks or document timing uncertainty. Use independent reference state to score decisions. For checklist tests, log both step interaction and actual system configuration.

### Failure injection with validity
A failure or unexpected mode event must be realistic for the **claim**, not theatrically surprising or structured to favor one interface. Predefine injected conditions; validate scenario plausibility with domain SMEs and system architects in authorized environments. Degraded scenarios can be valuable even if infrequent, but conclusions should not be generalized to rates in actual service without appropriate evidence.

### Analysis is not a software default
Set primary hypothesis and meaningful error tradeoffs in advance. For binary correct/incorrect outcomes, analyze probability with participant and scenario dependence appropriate to data. For decision latencies, inspect censoring or no-response and right-skew as well as speed-accuracy tradeoff. A result 'p > .05' is not proof of equivalence. For safety-relevant failures, show individual events and severity/conditions, not solely mean composite scores. Report uncertainty intervals and practical engineering significance.

### Test procedure design, not just visual interfaces
NASA's flight-deck procedure guidance emphasizes development, implementation, evaluation and monitoring. The test should include correct procedure selection, execution conditions, handoffs, interrupt recovery, forbidden repeats, state attainment and downstream error consequences. Count the correct **effect on system state**, not merely task-page clicks.

### Interpret absent or mixed effects
If task accuracy is equal and response time improves, ask whether timing matters to the mission and whether sample precision supports that conclusion. If workload reduces while error increases, treat the tradeoff explicitly. If a display performs well under nominal conditions but fails after mode rejection, the task analysis may identify why that branch matters enough to invalidate a favorable aggregate result.

## Worked case [HYPOTHESIS]

**Case A factorial proposal:** two feedback concepts crossed with transition state (normal / deferred / inhibited) and concurrency (single / dual task). Primary outcomes: actual-mode classification accuracy and consequential unsafe actions, with actual simulator state truth. Additional outcome: primary control deviations. Context factor: experimenter-induced failure path. Confound: B could have more visually salient cues; design and interpret accordingly.

**Case B procedure proposal:** alternate checklist progress methods tested under no interruption, interruption before verification and command failure. Score final configuration, omitted/incorrect critical steps, restart accuracy, not only completed checkmarks.

## Method execution [SYNTHESIS]

State population and decision → specify construct and primary outcomes → build scenario conditions and independent variables → check stimulus and ground truth → choose sampling/assignment and training → specify realistic concurrency and error opportunities → plan logging/synchronization and measurement reliability → set estimand and statistical approach with uncertainty → pilot for comprehension and fidelity → run authorized study → report operationally meaningful conclusions and limitations.

## Laboratory / portfolio

Write an 8–12-page study protocol for one synthetic comparison. Include a randomization/counterbalance table, subject characteristics, failure injections, simulator state variables, primary metric definition, a three-row confound control table, a scoring sheet and example interpretation of a mixed result (faster response but more errors).

## Adversarial retrieval
1. What changes interpretation when your 'N' is trials rather than operators?
2. What is the difference between a usability preference study and a safety-relevant task-based evaluation?
3. Why is no significant difference not evidence of equality?
4. How can failure injection invalidate a study even when logs are accurate?
5. Which outcome should take precedence when interface speed improves but task safety degrades?

## Essential reading
[NASA Designing Flightdeck Procedures](https://ntrs.nasa.gov/citations/20160013263); [measurement guide](../../../practice/measurement-framework.md); [Sauro & Lewis](https://github.com/steven-ford2/FighterJets/blob/main/references/quantifying-the-user-experience-jeff-sauro-james-r-lewis.md); [Lazar et al.](https://github.com/steven-ford2/FighterJets/blob/main/references/research-methods-in-human-computer-interaction-jonathan-lazar-jinjuan-feng-and-harry-hochheiser.md)

## Mastery gate

Pass when a reviewer could implement the scenario and scoring without consulting the author about core variables and could distinguish the resulting test's justified claims from overgeneralization.

## Transfer task
Using the same scenario as last week, add or revise two relations in the trace: **goal/decision → source or operator need → requirement/design → task measure**. State which earlier inference was too strong. Place the work in [weekly log](../../../training/practice-log.md).
