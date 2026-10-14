# Week 16 — Integrated mission-to-validation capstone: defend the engineering chain

**Integrated lecture | research → analysis → design → validation.** Synthetic, public cases; not an authorized aircraft operating procedure.

## Objectives
- Understand the specialized method, related constructs and inference limits.
- Execute a repeatable analysis or evaluation exercise with explicit evidence.
- Derive falsifiable PVI/procedure engineering and test decisions.

## Teaching lecture

### The final product is a defensible explanation of the human–system control loop
A final task-analysis portfolio should allow an engineer, pilot/maintainer SME, safety lead and test engineer to see *why* a design requirement exists, which assumption would invalidate it, and what evidence would demonstrate actual improvement. The capstone therefore simulates an engineering design review, not a memorization test.

### Problem framing
Select one **public or synthetic** operator-centered scenario from the dossier collection. Define mission/task goals, actors and automation allocation, operating states, adversarial branches, engineering limitations, and the specific decision your analysis will support. State the source basis for every fact and the status of all assumptions.

### Apply methods selectively
A common portfolio uses:
- **Mission/task:** scenario coverage and MEM, actor/function allocation, HTA with explicit plans.
- **Cognition:** GDTA goal–decision–information links; ACTA or CDM to capture difficulty/strategies (invented synthetic quotes stay hypothetical); selective WDA where adaptability/constraints matter.
- **Engineering:** normalized info/control needs; source lineage; requested/accepted/actual state; error and safety links; alternative UI/procedure designs; allocated requirements.
- **Evaluation:** testable claims, independent ground truth, realistic failure/workload scenarios, primary outcomes, supporting process measures, design/analysis plan, limits of inference.
- **Standardization:** QA rubric, independent review and revision log.

### Demonstrate trace semantics
Choose three critical design decisions. For each, show a complete trace from mission/goal and scenario, through observed/elicited/assumed decision requirement, to engineering source and candidate requirement, and to operational evidence. A red-team reviewer should be able to falsify the choice by pointing to a missing need, invalid source, bad allocation or ineffective measure. Make that review possible.

### Handle uncertainty as an engineered property
An expert analyst knows what has **not** been learned. If no real pilot interview was performed, do not pretend your cognitive-demand hypotheses were elicited. If no simulator trial was run, do not claim the design improves accuracy. If the data source cannot support required precision, do not promise a perfect status display. If a study threshold is not yet derived, write 'threshold pending operational/safety justification'. This makes the dossier credible, not weak.

### Cross-functional challenge
A systems engineer may ask whether the selected data field has an authoritative owner. A pilot may question whether the proposed recovery path is realistic. A test engineer may observe that the probe itself cued the correct answer. A safety engineer may identify unaddressed state transitions. The capstone must expose such questions, assign evidence needed and revise accordingly.

### Real operational transfer
Course completion does not authorize use of a synthetic procedure in flight or commit company requirements. The real transfer is a **methods SOP candidate** plus evidence from approved analyst calibration and authorized user/architecture/safety study. A credible organization-wide standard emerges after iteration and stakeholder endorsement, not from a single complete binder.

### A final method judgment
Do not assume more analysis always yields better design. Some tasks can be handled with rapid HTA/GDTA plus validation; others need intensive CWA, CDM and safety integration. The expert selects the smallest adequate stack for the consequential question while remaining honest about the evidence boundary. The sophistication lies in restraint as much as breadth.

## Worked case [HYPOTHESIS]

**Complete synthetic example in miniature:** Pilot must know actual guidance mode when a requested transition is accepted but delayed. Goal→D: judge if new control can be relied upon. IN: distinct actual versus requested state and status-quality. CN: ability to refrain/recover, with system feedback. State model: requested→accepted→pending→active, or rejected. R candidate: expose active versus selected semantics under named conditions. Concept A/B: separate indication vs integrated transition state. Test: valid mode-state classification, inappropriate control actions and safe flightpath preservation in deferred/inhibited scenarios. Evidence: independent simulator truth and participant decisions. Unknowns: real performance deadline, operator variation, mode model, true failure conditions, display ecology. This chain is coherent **but only hypothetical until empirical/domain validation**.

## Method execution [SYNTHESIS]

Read capstone specification → create frozen scenario/source inventory → build complementary views → identify three critical design/test claims → write a source-linked evidence map → convene independent blind reviewer → answer red-team questions → revise artifacts with explicit changes → produce SOP candidate and research plan for approved future use.

## Laboratory / portfolio

Complete the [capstone technical dossier](../../capstone/CAPSTONE.md), run the [defense rubric](../../ASSESSMENT.md), and create a 15-minute spoken defense that traces one information need and one control need to an architecture requirement and a test outcome. Record all unknowns and next evidence-gathering steps. Include a reflective memo on which analytical method added the highest-value insight and which method was unnecessary.

## Adversarial retrieval
1. What is the strongest evidence that your derived requirement addresses an actual operational need?
2. Which result would cause you to reject your preferred interface?
3. Can a system pass requirement verification yet fail task validation? Give example.
4. How does your method handle competing expert interpretations?
5. What additional evidence would be required before this becomes an approved organizational process?

## Essential reading
[Capstone specification](../../capstone/CAPSTONE.md); [case collection](../../cases/A-mode-management.md); [87-source register](../../../literature/reference-register.md); [Guyton et al. MBHSE paper](https://github.com/steven-ford2/FighterJets/blob/main/references/task-analyses-mbse.md)

## Mastery gate

Pass only after an independent reviewer can reconstruct the important claims/links and distinguish hypothesized design benefit from tested performance; do not misrepresent missing data or program authorization.

## Transfer task
Using the same scenario as last week, add or revise two relations in the trace: **goal/decision → source or operator need → requirement/design → task measure**. State which earlier inference was too strong. Place the work in [weekly log](../../../training/practice-log.md).
