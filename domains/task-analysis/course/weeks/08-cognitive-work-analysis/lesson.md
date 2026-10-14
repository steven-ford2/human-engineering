# Week 08 — Cognitive Work Analysis: constraints, adaptation and ecological design

**Evidence convention:** [PRIMARY] original method/source; [ABSTRACT] limited record; [SYNTHESIS] instructional engineering method; [HYPOTHESIS] teaching case. Do not transform [HYPOTHESIS] into a real cockpit requirement.

## Objectives
1. Explain why a predefined task sequence cannot cover all adaptive behavior.
2. Build and critique a small work-domain abstraction hierarchy with means–ends links.
3. Differentiate WDA from full CWA and HTA/GDTA, then connect constraints to display/control design.

## Conceptual lecture

### Work is not always a script
A task-centered analysis asks, 'what steps does an operator take to accomplish this job?' But in a dynamic aircraft, the operational goal may remain stable while technology fails, workload spikes, commands are inhibited, roles change, and expected information disappears. A competent operator may need to **adapt** rather than execute a memorized plan. Cognitive Work Analysis (CWA) provides a framework for analyzing the constraints and opportunities governing such adaptive work.

CWA is not synonymous with HTA, and *Work Domain Analysis (WDA)* is only one part of the broader program. The Oxford handbook identifies five analyses: work domain, control tasks, strategies, social/organizational cooperation, and worker competencies. Naikar's work-domain book develops concepts of **abstraction, decomposition, means–ends and part–whole relationships** and the practical problem of creating and validating models. This course uses a small WDA artifact to expose what step-based analysis misses, without pretending that a one-week exercise equals a full CWA study.

### What is an abstraction hierarchy?
One practical organization consists of: **functional purpose**, **values/priority measures**, **purpose-related functions**, **object-related processes**, and **physical objects**. These level names and how a model is tailored must be checked against the selected WDA method and domain. The important logic is the **means–ends relation**: at the level above, what end does a function serve? At the level below, by what means can it be achieved? A sound abstraction model does not turn into a shopping list of interface components.

### Separate constraints from procedure
If maintaining adequate flightpath control is the goal, available modes, aircraft states, limits and physical capabilities constrain what can be done. An HTA could describe a common selection sequence. An abstraction hierarchy describes why that sequence may succeed, fail or require an alternative under different aircraft/system conditions. The model should allow multiple strategies within invariant constraints.

### Sample abstraction (pedagogical, deliberately simplified)
**Purpose:** preserve safe, intended flightpath guidance.
**Values:** safety margins; trajectory adherence; effective workload/attention allocation.
**Purpose functions:** determine relevant flight state; select viable guidance strategy; monitor the achieved state; respond to anomalies.
**Processes:** acquire source data, transform/filter/estimate state, validate commands, execute guidance logic, communicate active and failed state.
**Physical/technical objects:** sensors, flight-control computation, displays, mode command inputs, effectors.

This is not an approved aircraft functional architecture. Some elements could be miscategorized in a rigorous WDA depending on system boundary. **Critiquing the hierarchy is part of the laboratory**, not a defect to hide.

### Boundary discipline
Choose whether the domain includes only pilot–aircraft interaction, or also communication teammates, maintenance, flight planning, and external support. The boundary determines what seems invariant. If you exclude automation, you may blame the pilot for failures actually caused by unavailable control authority; if you include everything, the model may become too complex to use. Multiple stakeholder views or complementary models can be appropriate.

### Bridge to ecological interface design
When constraints and process relationships matter directly for safe decisions, a design may need to make them perceptually and cognitively accessible. This is an *ecological* design idea: externalize meaningful relationships rather than merely overlay more alarms. A novel interface must still be tested; making a model visible is not proof that operators understand it. Do not assume every system is best served by a full ecological representation.

### Method combination
Use scenario/HTA/GDTA to study common operations and decision needs, ACTA/CDM to expose expertise and difficult cases, WDA to stress-test what happens when the expected plan becomes unworkable. The right balance depends on program maturity, risk, novelty and available evidence.

## Worked synthetic aerospace case

**Two strategies, same constraint:** In a hypothetical simulator a guidance request is inhibited. Strategy A: continue with an existing appropriate control mode while monitoring the intended trajectory. Strategy B: alter the task plan under authorized conditions, then transition when prerequisites are met. Both strategies must respect aircraft and task constraints. A rigid task flow may prescribe A, while a work-domain model describes conditions under which A or B could be valid. No real-world flight procedure is implied.

**Potential interface requirement:** communicate which state/function constraints govern whether the mode can become active, where doing so supports the operator's decision without overload. The control/feedback state model must reflect real software authority.

## Step-by-step method

Establish purpose, study boundaries and stakeholders → gather public/authorized sources and scenario constraints → choose abstraction/decomposition axes → create hierarchical nodes → connect explicit *why/how* means–ends links → challenge with novel/degraded states and alternative strategies → validate interpretations with domain/engineering experts → connect useful constraints to information/control needs, design concepts and experiments.

## Practical lab

Construct a five-level abstraction hierarchy for case A and annotate 10 means–ends links. For each link write how an analyst would confirm or falsify it. Challenge the model with a stale mode-status source and with loss of automation. Explain in 400 words what WDA adds that a polished HTA cannot alone provide.

## Retrieval / critique
1. Why is a work domain model not just a longer task tree?
2. What is the difference between the abstraction hierarchy and an aircraft parts breakdown?
3. Which aspect of full CWA does WDA omit?
4. How can a model show two valid operator strategies without prescribing one?
5. What evidence would you require before calling a constraint representation effective?

## Pass/revise gate

Pass when at least two genuinely different strategies are demonstrably consistent with a shared constraint model, and each critical means–ends link has a defensible basis or unresolved-question flag.

## Sources and readings
Vicente (1999), *Cognitive Work Analysis*; [Naikar (2013) book outline](https://www.routledge.com/Work-Domain-Analysis-Concepts-Guidelines-and-Cases-1st-Edition/Naikar/p/book/9780805861297); [Oxford Handbook CWA overview](https://academic.oup.com/edited-volume/34402/chapter-abstract/296618307)

## Integration transfer
Create one trace from **operator goal → task/decision → elicited expertise/information need → alternative concept → suitable primary task measure**. Include source evidence and a plausible disconfirming observation. If the trace stops at an expert quote, the job is unfinished.

## Portfolio artifact
Save the associated source-tagged analysis, unresolved questions, concept implications and independent reviewer notes. Use the [weekly practice log](../../../training/practice-log.md).
