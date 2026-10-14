# Week 12 — From cognitive task analysis to interface and procedure design

**Type:** graduate teaching lesson, engineering method and synthetic laboratory. **Source labels:** published framework vs [SYNTHESIS] engineering integration vs [HYPOTHESIS] case must be kept separate.

## Learning objectives
- Describe the core analytical problem and classify its variables correctly.
- Execute the method protocol in a synthetic aircraft/operator scenario, maintaining provenance.
- Convert its findings into a falsifiable design/requirements/test implication and critique one serious weakness.

## Teaching lecture

### A good analysis is not a list to hand over to UI designers
The purpose of an engineering task analysis is to inform consequential decisions: what the system must do, what information it must generate, what the human must know, what control authority must exist, and how a design should allocate attention, control and recovery opportunities. Without explicit transfer, a beautifully coded analysis may never affect architecture. Conversely, premature implementation decisions may distort the needs analysis to rationalize features already designed.

### Four stages of design translation
**1. Need, independent of solution.** Operational question, control intent, timing, quality, consequence and context.
**2. Allocation decision.** Does the need imply architecture/source changes, improved automation behavior, better feedback/visibility, revised procedure, training, or combinations?
**3. Candidate solutions and tradeoffs.** Develop at least two different feasible implementation concepts when the design decision matters; examine their benefit, complexity, data dependencies, failure effects, cognitive cost and recovery.
**4. Requirement and validation.** Write verifiable functional/interface requirements linked back to evidence and identify a separate plan to show operators can achieve the goal.

### Requirements are not wishes
A weak requirement says 'The display shall be intuitive.' A stronger requirement states which operational state must be distinguishable, in which conditions, from what competing status, to support which decision. Quantitative thresholds should follow validated operational time demands, hazards, standards and evidence rather than the analyst's intuition. ISO/IEC/IEEE 29148 offers a requirements-engineering reference; verify the actual source and program tailoring when translating the course's example format into formal work.

### The difference between requirements and rationale
One information need may support several competing design solutions; an allocated architecture behavior can satisfy several needs. Maintain the many-to-many links. The rationale explains why the requirement exists; verification states how to check implementation conformance; validation investigates whether representative users and tasks succeed. A screenshot is neither a complete specification nor operational validation.

### Procedures are designed systems
NASA's Barshi and colleagues describe a seven-step procedure-design process: determine need, establish process, understand issues, craft solutions, write procedures, implement, and evaluate/monitor. This is not merely a writing style guide. The contents of good procedures depend on operational intent, crew/system roles, triggers, action sequencing, branch conditions, verification and recovery. The 2025 NASA 4P work emphasizes further decisions when no procedure fits; its abstract does not establish a universal prescription for every cockpit.

### Trade studies should be falsifiable
Propose distinct concepts. Example A: show selected versus active mode side by side and expose inhibit reason; Example B: use a single mode state representation with explicit transition status and contextual diagnostics. Which better supports mode comprehension with low visual burden? The answer is empirical and depends on scenario, display ecology and workload. Define claims and tests **before** choosing the winner.

### When an information need cannot be fulfilled
Do not silently approximate. If there is no authoritative signal, mark the source issue in the system architecture and allocate a feasible mitigation. A display cannot make an uncertain value certain. If automation is responsible for a decision, clarify operator supervisory needs and failures rather than copying the former manual checklist unchanged.

### Teaching-to-organization translation
A standardized method should include mandatory artifact relationships and review criteria, but allow method depth appropriate to risk, novelty and decision complexity. The goal is consistent evidence quality and traceability, not making every analyst fill hundreds of identical fields.

## Worked synthetic example [HYPOTHESIS]

**Synthetic design trace:**
- D-A1: Is guidance B actually controlling?
- IN-A1: determine selected, accepted and actual controlling state with context-valid sources.
- Candidate source behavior: authoritative active-mode state with rejection/inhibit feedback.
- Requirement hypothesis: system shall allow the operator to distinguish selection from actual controlling mode under specified transitions.
- Design A: distinct selected/active indications.
- Design B: explicit pending/active/failed transition feedback.
- V&V: verify exact software state mappings; validate correct operator state discrimination and safe flightpath management during surprise mode trials.

**Procedure translation:** For interruption recovery, a branching state-verification step might outperform blindly restarting at the last checkmark. Test with correct final aircraft state and omission/commission, not checklist satisfaction alone.

## Practical method [SYNTHESIS]

Select consequential decision from analysis → verify need evidence/operating state → check architecture feasibility and safety constraints → allocate functional behaviors and data ownership → invent alternatives with different causal mechanisms → predict tradeoffs and failure modes → draft testable requirements linked to sources → plan verification separately from scenario-based user validation → record design decision and change impact.

## Applied lab and work product

Produce one-page design trade study for case A and one procedure redesign for case B. Trace at least five needs to system responsibilities, two alternative concept strategies and three independently scored primary performance outcomes. Challenge the work with a 'no authoritative state signal' case and propose a non-deceptive interim engineering decision.

## Retrieval and red-team questions
1. What makes a design claim falsifiable?
2. Why can a correct icon fail the real information need?
3. When should you change architecture rather than graphical presentation?
4. What is the difference between conformance verification and operational validation?
5. What did NASA's seven-step process add beyond good checklist wording?

## Source-linked reading
[Barshi et al. (2016), NASA](https://ntrs.nasa.gov/citations/20160013263); [NASA 2025 4P concept](https://ntrs.nasa.gov/citations/20250004433); ISO/IEC/IEEE 29148:2018; [reusable trace CSV](../../../templates/requirements-tests.csv); [course 16](https://github.com/steven-ford2/FighterJets/blob/main/courses/16-pvi-systems-integration-mbhse/README.md)

## Pass/revise criterion

Pass when each consequential requirement links back to an evidenced decision/need and to a feasible system behavior and discriminative operational test; design alternatives are genuinely different.

## Cross-method challenge
What would an HTA-only, GDTA-only, ACTA-only or design-first analyst miss in this case? Write two explicit limitations and a plan to acquire disconfirming evidence. Enter findings into [weekly practice log](../../../training/practice-log.md).
