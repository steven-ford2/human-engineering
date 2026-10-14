# Flagship capstone — Engineer and defend a task-to-validation system

**Submission format:** public/synthetic teaching dossier. **No uncontrolled workplace documentation or actual platform operational instructions.** An authorized employer variant would require independent source controls, reviews and approvals.

## Mission statement
Develop an evidence-linked task, cognitive decision, information/control and human–system evaluation package for a complex operator problem. Demonstrate not only that the analysis is methodologically competent but that it yields **different and better-specified engineering decisions and measurable tests** than a design-first approach. The organizational standard produced at the end is a **draft candidate**, not approved policy.

## Choose a scenario track
**A:** selected versus controlling guidance mode under delayed/failed activation and concurrent tasks.
**B:** interrupted checklist with ambiguous verification and state-dependent resumption.
**C:** maintainer diagnosis with intermittent and contradictory system data, equipment constraints, authorization.
**D:** team information handoff where message receipt differs from shared comprehension/action.
A or B are strongest for PVI and procedure design; C is strong for maintainer HSI; D for team SA and C2-inspired coordination. Use public simulated data only.

## Required output directory (proposed)
```
capstone-submission/
  00-study-charter.md
  01-source-evidence-ledger.csv
  02-scenarios-and-mission-element-matrix.md
  03-function-task-actor-model.md
  04-hta-and-timeline.md
  05-gdta-decisions-information.csv
  06-cta-evidence-and-probes.md
  07-cwa-constraint-model.md [if warranted; otherwise method-selection rationale]
  08-control-loop-and-system-state.md
  09-critical-task-error-safety.md
  10-requirements-design-trade.md
  11-constructs-measures-test-protocol.md
  12-adjudication-and-qa.md
  13-15-minute-defense-script.md
```
Use template CSVs from `task-analysis/templates/` and define stable IDs.

## Detailed evidence-linked demands
### Charter and sampling
Document intended **engineering decision**, users, scenarios, approval/security limits, available and excluded data, method choices, state/automation assumptions and known gaps. Define source types and review depth accurately. Include a scenario coverage matrix with frequent, stressed, degraded, failed and recovery conditions justified by the question.

### Human work model
Provide function and role allocation, HTA with plans for parallel, choice, interruption and recovery, and an event timeline. Record differences between intended versus actual work (if empirical evidence exists). Never fabricate observations. For the synthetic cases use explicitly fictional operator statements.

### Cognitive model
At minimum: goal/decision/information requirements; uncertainties and decision alternatives; systematic ACTA-style probes plus either real authorized benign elicitation or synthetic responses clearly labeled as hypothesized. Explain why CDM or CWA/WDA would add value; apply at least one of them rigorously or document a strong nonuse rationale.

### System/architecture model
Separate requested, received, accepted, executing, active and achieved states as meaningful. Explain which signals are authoritative, derived, delayed, failed, stale or unknown, and the implications for human authority and recovery. Represent control actions, inhibit guards and feedback. If the system's actual implementation is unknown, show the required questions and assumptions rather than invented avionics facts.

### Design and requirements
Select >=3 consequential operator needs. For each: task/decision goal, source and confidence, required vs available gap, control authority and potential adverse consequence. Produce >=2 implementation strategies for each major design objective where meaningful. Explicitly identify why one might be better, how it might fail, and how to disconfirm the prediction. Derive >=5 allocation-aware, verifiable candidate requirements and an engineering trade study.

### Verification, validation and measurement
For >=3 major design claims: precise construct, manipulation, scenario conditions, ground truth, primary outcomes, process/supporting measures, scoring, missingness, safety/critical-error cases, analysis plan, task performance tradeoffs, threshold rationale. Draw from simulator logs where possible. No claim of safety or superiority from questionnaire or eye movement differences alone.

### Quality and transfer
Provide source/evidence ledger, open/contested issues, reviewer comments, correction log and version. Propose an operational SOP change or method modification informed by lessons learned and a **calibration study** to show other analysts can apply the approach.

## Defense — 15 minutes presentation + adversarial panel
1. 2 min problem and why it matters to real operator decisions.
2. 3 min scenario and task/cognitive work model, including uncovered uncertainty.
3. 3 min information/control sources and design trade.
4. 4 min V&V claim, variables, ground truth and limitations.
5. 3 min quality, reproducibility and organizational adoption requirements.

## Scoring (100 locally defined points)
- Study charter/scenario evidence 15
- HTA/CTA and expert cognition rigor 20
- Source/state/control and allocation 15
- Need-to-requirement/design decisions 20
- Construct-valid validation/test design 20
- Reproducibility/provenance/defense 10

### Hard-stop failures
- Unsupported purported real aircraft operating instructions or misclassified proprietary material.
- Claims of performed pilot interviews or simulator trials when none occurred.
- Safety-critical need unsupported and not openly qualified.
- No independent measure of actual task/system state for a claim about operational effectiveness.
- Critical command-state confusion left unmodeled in cases where that is the studied failure.

## Reviewer card
Ask: 'Where did this need come from?', 'Is the data authoritative?', 'Which state is the pilot actually observing?', 'What failure breaks your proposed solution?', 'Would your metric call a harmful design an improvement?', and 'Can another analyst independently reach the same classification and engineering decision?'

## Submission maturity
Complete as **course/synthetic capstone** when all deliverables exist and have source status. Complete as **credible organizational draft** only after independent review. Acceptable **program standard** requires contract/process tailoring, stakeholder authorization, adequate real-domain evidence and configuration management.
