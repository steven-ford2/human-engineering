# Week 02 — Mission analysis and scenario selection

**Course:** Flagship Task Analysis and Cognitive Engineering | **Mode:** lecture + method lab + engineering transfer | **Evidence key:** [PRIMARY]/[STANDARD]/[SYNTHESIS]/[HYPOTHESIS]. Public and synthetic cases only.

## Objectives
1. Develop a representative design-reference-scenario family and Mission Element Matrix.
2. Separate statistically representative sampling, purposive critical-case sampling, and completeness of an engineering coverage model.
3. Make assumptions, interfaces and unknown modes visible before eliciting needs.

## Teaching lecture

### Your study cannot find a task it never asks about
Task analysis often begins with an apparently sensible subject: *the pilot uses the sensor-control page*. This is a product boundary. A better start is the operational purpose: what is the pilot trying to establish, change, maintain or infer in a mission state? Starting from the page excludes tasks accomplished through automation, communication, other displays, and non-interface strategies. It can also conceal exceptions where that page is unavailable.

The mission-level approach in the Guyton/Kuhlken/Lowe MBHSE paper begins with capability and requirement inputs, use cases and reference scenarios/CONOPS. Their **Mission Element Matrix (MEM)** helps show which mission elements appear in which scenarios. Their scenario guidance emphasizes frequently occurring and consequential operations, stressed and failed conditions, critical functions, novel capabilities and interactions between people and systems. This is a valuable structural input, not empirical proof that a particular scenario set is complete.

### The four-dimensional sampling problem
**Operating state:** phase, task goals, aircraft/system mode, configuration, roles, dependencies.
**Perturbation:** nominal versus degraded sensor, failed actuation, missed communication, unexpected branch, partial automation.
**Human state:** novice/expert expertise, task concurrency, time pressure, attention allocation, physical/visual constraints, night/low visibility where relevant.
**Consequence:** routine usability, mission impact, safety consequence, difficult recovery or maintenance effect.

Crossing all factors creates a combinatorial explosion. Therefore do **not** promise to analyze every theoretical combination. Construct an explicit selection rationale: common baseline cases; consequence-critical cases; uncertain, novel or architecture-critical cases; and representative interactions. Keep an open-issues ledger for uncovered cells and use pairwise or combinatorial techniques only when assumptions about interaction structure make them defensible.

### Scenario as a contract
A scenario should contain: identity; actor; goal; initiator; start state; relevant environment; system and automation configuration; data availability; control constraints; concurrent activities; events/branches; success end state; failure/degraded end states; sources; and unknowns. Avoid embedding a final screen arrangement. The purpose is a testable work setting.

### Coverage is not validity
A 100%-filled MEM merely shows that every *listed* mission element has a scenario entry. It does not establish that the list is adequate, that the scenarios represent reality, that key decisions are modeled, or that operators will succeed in these conditions. Document the mission-element source and record dissent from SMEs. Coverage has at least three meanings: structural (requirements represented), operational (important real work sampled), and human (roles and variation represented).

### Operational boundaries and ethics
For a real defense project, scoping includes export-control and information-handling rules, role access, consent to interviews, mission/source permissions, simulator safety, and approvals. The fictional cases in this repository deliberately omit sensitive tactics, platform-specific data and numerical mission envelopes. Do not conflate open-source instructional cases with an employer's authoritative mission definition.

### From coverage to study design
The scenario matrix informs later **experimental strata**. If degraded states drive information needs, test stimuli must include degraded states; otherwise the analysis–evaluation chain breaks. Conversely, not every scenario must appear in every experiment. Test designs should target the causal claim and sample the context where failure is plausible.

## Worked aerospace case — [HYPOTHESIS]

**Synthetic coverage table** (cells marked Y represent selected coverage, not actual fleet operations):

| Mission element | S1 normal | S2 busy | S3 inhibit | S4 degraded | S5 recovery |
|---|:---:|:---:|:---:|:---:|:---:|
| Determine actual control mode | Y | Y | Y | Y | Y |
| Request valid state transition | Y | Y | Y |  | Y |
| Verify command effect | Y | Y | Y | Y | Y |
| Recover from unexpected state |  | Y | Y | Y | Y |
| Coordinate competing attention |  | Y |  | Y | Y |

This representation exposes candidate omissions: **why omit degraded-state command request?** Perhaps the command cannot be issued; perhaps no one has investigated. The right output is a question and owner, not an automatic 'N/A'.

## Repeatable method protocol — [SYNTHESIS]

1. Specify the engineering decision supported. 2. Assemble authorized mission goals, capability descriptions and users. 3. Create mission elements with stable IDs and meanings. 4. Define mode/roles/context. 5. Draft reference scenarios with explicit initial/end states and perturbations. 6. Populate MEM and mark uncertainties. 7. Review against expert exceptions, hazards, software state configurations and expected task concurrency. 8. Record acceptance criteria for coverage and changes to scenario basis.

## Guided laboratory and deliverable

Create SC-01 to SC-06 using [mode-management case A](../../cases/A-mode-management.md). Make a MEM with at least six elements. Explain each included/omitted cell. Write a one-page rationale for choosing one high-frequency scenario, two high-consequence scenarios, one novel capability scenario and one recovery scenario. Write a separate paragraph explaining why your sample is **not** statistically representative of all pilot behavior.

## Retrieval and adversarial checks
1. Why does beginning with a menu or display page bias the analysis?
2. Which missing scenario most threatens the validity of a selected-mode indicator experiment?
3. How does a mission-element matrix differ from a combinatorial test matrix?
4. Which aspects of scenario coverage are irreducibly judgments rather than percentages?
5. When is '100% mission element coverage' a misleading headline?

## Completion and critique standard

Pass when an independent reviewer can reconstruct why each scenario is included and distinguish structural coverage from external operational validity.

## Primary/supporting reading
[Guyton et al. 2025](https://github.com/steven-ford2/FighterJets/blob/main/references/task-analyses-mbse.md), mission level/MEM; [FAA HF-STD-004A](https://hf.tc.faa.gov/publications/2016-09-human-factors-engineering-requirements/); [scenario template](../../../templates/scenarios.csv)

## Engineering integration prompt
Take one claim from your output and identify: the operator decision, the inferred information/control need, the system-state/source behavior that can deliver it, the candidate allocated requirement, and a **task-valid observable test outcome**. If any link relies solely on a proposed UI element or on unsupported timing, flag it and revise.

## Reflection
What would this analytical method *fail* to detect? Which alternative method or operational observation would expose that failure? Record your answer in [weekly practicum](../../../training/practice-log.md).
