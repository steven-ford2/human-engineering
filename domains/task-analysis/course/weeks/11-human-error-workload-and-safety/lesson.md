# Week 11 — Critical-task analysis, workload and system safety

**Type:** graduate teaching lesson, engineering method and synthetic laboratory. **Source labels:** published framework vs [SYNTHESIS] engineering integration vs [HYPOTHESIS] case must be kept separate.

## Learning objectives
- Describe the core analytical problem and classify its variables correctly.
- Execute the method protocol in a synthetic aircraft/operator scenario, maintaining provenance.
- Convert its findings into a falsifiable design/requirements/test implication and critique one serious weakness.

## Teaching lecture

### A task model becomes safety-relevant when it explains failure paths
If an analysis covers only successful nominal sequences it cannot adequately inform design for exception handling. But safety is not achieved by appending a generic 'human error possible' tag. A safety-integrated task analysis identifies mechanisms: unavailable information, misleading confirmation, difficult discrimination, overtaxed visual attention, misplaced authority, unexpected transitions, incompatible team assumptions, inaccessible physical controls, or procedure branches that do not match actual state.

### Three distinct questions
**Error prediction:** What could the human do or fail to do in this task and state? Task-based techniques such as SHERPA support structured error-mode exploration.
**Safety constraints:** What unsafe control actions or hazardous system behaviors must be prevented or mitigated? STPA from Leveson's systems-theoretic safety approach considers control interactions and constraints beyond a simple operator blame model.
**Workload/performance:** What perceptual, cognitive, motor or time demands exist, and do they interfere with higher-priority work? NASA-TLX is a subjective rating and does not establish safety or reserve capacity on its own.

These approaches overlap but have different objects. An unsafe controller command may come from a software implementation rather than an operator misstep. A high cognitive workload estimate may signal a design issue without showing that a hazardous error will occur. Preserve link types and avoid inflating a single 'severity' score into scientific proof.

### A critical task demands deeper characterization
FAA HF-STD-004A §5.1.10.1 asks, among other things, that task analysis examine time requirements, sequencing and simultaneity; accuracy, precision, completeness, feedback/error tolerance, human decisions under uncertainty/time/workload stress, performance criteria and task difficulty. Its subsequent critical-task provisions distinguish required versus available information, decision evaluation and actions and consider body movements, workspace, tools, staffing, feedback and environment. **These are example normative statements in that standard's intended acquisition setting**, not automatic DoD program obligations.

### Workload has a structure
Use a demand inventory covering **what is being processed** (visual/auditory/spatial/verbal), **when** (overlap, deadlines), **how much attention/control** (continuous/manual), and **why competing demand arises** (information not accessible, high switching cost, interruption, mode surprise). Wickens's multiple-resource theory can motivate potential modality conflicts but is not a substitute for representative testing.

For high-G or visually stressful fighter scenarios, physiological and sensor conditions can matter greatly, but real operating-envelope limits, test permissions, and aircraft-specific constraints must remain in approved controlled work. The public case may name candidate factors without inventing numeric thresholds or flight physiology conclusions.

### Error mechanisms to mitigation
Trace **scenario → task/decision → missing or conflicting cue / failed authority → possible human/system action → consequence → design/procedural/architecture safety option → evidence/verification**. Include error recovery; the best system cannot prevent every error but can sometimes support detection and controlled recovery. Ask whether a proposed mitigation simply shifts the workload or causes a new hidden mode.

### Avoid a single-operator fallacy
At the crew or maintenance team level, a hazard may emerge through misaligned beliefs, responsibility transfer, or incomplete communication. Separate per-actor tasks, shared system state and coordination protocol. Procedure designers must consider *which actor knows the system actually changed*.

## Worked synthetic example [HYPOTHESIS]

**Synthetic checklist interruption:** an operator marks step complete when the control was requested but the actuator is inhibited. The procedure then advances. Task error label: commission or premature verification; system contributor: progress representation conflates read/commanded/achieved; hazard hypothesis: final configuration wrong. Mitigation options: independent confirmation; informative inhibit status; resumption/verification branch; redesigned control availability. Do not declare any option safe from paper logic alone. Primary outcome in validation: proportion with correct final simulator configuration and recovery from failed commands; also count omissions/commissions with exposure denominator.

## Practical method [SYNTHESIS]

Analyze a critical scenario → identify task and intended state → enumerate human/system unsafe paths without prejudging blame → use task-based error prompts and system-level causal constraints → assess concurrency, timing, visual/motor demand and plausible workload → add error detection and recovery → produce candidate mitigation alternatives → document source/safety-owner review → define test scenarios with independent outcomes.

## Applied lab and work product

Build critical-task record for case B checklist and case C maintainer. Identify eight error or unsafe-control paths total, including architecture-induced errors and team handoffs. Create a demand/concurrency timeline and a safety crosswalk. For every proposed mitigation identify a new potential adverse side effect.

## Retrieval and red-team questions
1. How does a safety constraint differ from a list of operator errors?
2. Why is NASA-TLX not a direct safety criterion?
3. What can a task timeline reveal about workload that a mean completion time cannot?
4. Which situations require maintainer physical-workspace information?
5. Can an error-free interface trial still fail the operational objective?

## Source-linked reading
[FAA HF-STD-004A §5.1.10](https://hf.tc.faa.gov/publications/2016-09-human-factors-engineering-requirements/); Leveson (2012), *Engineering a Safer World*; MIL-STD-882E (program applicability verify); [flight-deck procedure NASA report](https://ntrs.nasa.gov/citations/20160013263); [measurement framework](../../../practice/measurement-framework.md)

## Pass/revise criterion

Pass when every critical failure path states operational context, underlying mechanisms, potential consequence, detection/recovery and evidence status—not merely a generic severity adjective.

## Cross-method challenge
What would an HTA-only, GDTA-only, ACTA-only or design-first analyst miss in this case? Write two explicit limitations and a plan to acquire disconfirming evidence. Enter findings into [weekly practice log](../../../training/practice-log.md).
