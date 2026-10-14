# Detailed syllabus / research-first instruction contract

## Course description
A graduate-level, applications-focused methods course in analyzing professional work and turning the findings into defensible aerospace interface, control, procedure, requirement and human-performance verification/validation decisions. The course bridges conventional task analysis, expert cognitive elicitation, cognitive work analysis, MBHSE, workload/error/safety and experimental design.

## Outcomes at mastery
Students will:
1. Frame studies around meaningful mission/maintenance work and sample representative, critical, degraded and novel scenarios with justified coverage.
2. Execute documented **HTA, GDTA, ACTA, CDM, and selected CWA/WDA** with explicit method limitations and inspectable artifacts.
3. Distinguish operators' actions from hidden cues, comprehension, temporal projections, goals, tradeoffs and strategies; triangulate and document the basis of claims.
4. Convert the analysis into design-independent **information and control needs**, including accuracy, validity, timing, authority, inhibition, feedback and recovery.
5. Trace needs into architecture, requirements, UI/procedure alternatives, human/system allocation and safety constraints.
6. Derive task-valid experimental outcomes, behavioral diagnostics, and supporting gaze/psychophysiology/workload measures; expose confounds and evidence weakness.
7. Define a reusable analysis process and train/calibrate a second analyst.
8. Defend findings and decisions in front of an interdisciplinary SME/SE/PVI/test review board.

## Time / cadence
- Mondays: 60–90 min lesson plus primary literature.
- Tuesdays: 60–90 min reproducible example, diagrams and paper exercise.
- Wednesdays: 60–90 min lab with synthetic dossier; use CSV templates.
- Thursdays: 45–75 min adversarial review / scenario variant / peer critique.
- Fridays: 30–60 min artifact defense, retrieval questions and design/test translation.
- Optional: listen to narrated lecture or record one's own 10-minute explanation during commute; listening alone does **not** substitute for method execution.

## Four phases and gates
**Phase I: Weeks 1–4, operational/task discipline.** Gate: independent review of scenario coverage, HTA plan grammar, provenance and uncertainty.
**Phase II: Weeks 5–8, cognitive/constraint discipline.** Gate: integrated goal-decision-information model and ACTA/CDM/CWA selectivity; show insights absent from simple task lists.
**Phase III: Weeks 9–12, design engineering.** Gate: need-to-architecture-to-requirement trace; mode/feedback exceptions; two alternative concepts with falsifiable hypotheses.
**Phase IV: Weeks 13–16, evidence/standardization.** Gate: test design with ground truth, justified thresholds and error/tradeoff interpretation; blind reviewer replay and capstone defense.

## Prerequisites
Basic statistics including repeated measures and uncertainty, cognitive psychology, qualitative/quantitative HF methods, and willingness to draw diagrams and write structured requirements. Read course 16 FighterJets material in parallel when architecture or software signals are unfamiliar.

## Case rotation
- **A: Guidance-mode ambiguity**, pilot, closed-loop control, source validity.
- **B: Checklist interruption and restoration**, procedures and memory/coordination.
- **C: Ground maintenance fault isolation**, maintainer, constrained resources and physical environment.
- **D: Simulated team information handoff**, distributed SA and coordination under uncertainty.
These are synthetic analytical *dossiers*, never aircraft instructions. See `cases/`.

## Evaluation and passing standard
20% concept retrieval and method boundary quizzes; 25% annotated individual method artifacts; 20% requirements/design crosswalk; 15% validation/test design; 20% final capstone. These weights are **proposed course rules**, not published psychometric standards. Passing requires >=80/100 on weighted rubric AND no hard-stop errors involving provenance, ungrounded safety claims, or major orphan critical decisions. The capstone requires independent review; a course self-score alone is not evidence of organizational readiness.

## Evidence and citation discipline
Use links to official standards, authoritative books and primary research; for accessible copyrighted works link/annotate rather than reproduce. Assign source status (full text reviewed, selected section, abstract/metadata, or original engineering synthesis). A source in this repo may be processed text, not original page-perfect facsimile. Numerical thresholds used in instructional cases must be explicitly tagged hypothetical and must NOT migrate to actual design/test requirements.

## Deliverables ledger
W01 ontology and semantic classification; W02 scenario/MEM; W03 HTA; W04 observation timeline + interview; W05 GDTA; W06 ACTA diagram/audit/sim interview; W07 CDM timeline/probes; W08 WDA abstraction hierarchy; W09 information-source gap map; W10 control loop/state chart; W11 critical-task/hazard/workload crosswalk; W12 design alternatives and trace requirements; W13 measure-specification matrix; W14 test plan + analysis plan; W15 calibration study and SOP change log; W16 capstone technical dossier and review presentation.

## Anti-patterns to detect continuously
A 'need' described only as an existing UI element. A goal mislabeled as an action. Analysis solely of normative documentation without actual work. An interview asking users which button color they want. Confusing selected/commanded/active/achieved states. Claiming fixation equals comprehension. Measuring checklist clicks instead of actual configuration. Allowing simulator performance metrics to ignore primary flight-control demands. Treating every stakeholder preference as a binding requirement. Using the most elaborate method with no operational benefit.

## Programmatic use
The teaching materials can inspire a future standard. The project **does not claim** a new company standard has been approved. To standardize an organization, negotiate scope and contractual baseline, perform an actual calibration/utility pilot, control revisions, and place controlled project evidence in an authorized environment.
