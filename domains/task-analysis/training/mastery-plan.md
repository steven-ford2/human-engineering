# Task Analysis Mastery: 16-week structured program + one-year expert-practice pathway

**Audience:** PhD-trained HF/cognitive psychologist and aerospace HSE practitioner; assumes basic experimental design, perception, cognition and statistical inference. **Purpose:** high-quality analysis and engineering output, not accumulating book summaries.

**Pace:** 5–7 hours/week baseline: 90 min reading, 90 min method replication, 90–150 min worked case, 30–60 min self-critique and inter-rater review. Optional 10–15 minute daily recall/annotation. Starting with a small, bounded case is preferable to premature live-program deployment.

## Learning objectives: observable exit criteria
1. Explain when HTA, GDTA, ACTA, CDM, CWA and safety analyses are warranted or inappropriate.
2. Conduct an interview that elicits decision cues and tacit knowledge, not just current feature preferences.
3. Build independently intelligible task, decision, information and control-need records with explicit sources.
4. Produce a mission-to-requirement chain with valid human/system allocation and operational-state constraints.
5. Translate CTA findings into design alternatives without presupposing UI elements.
6. Define metrics that genuinely assess the target construct, account for test confounds and predict real-task utility.
7. Calibrate multiple analysts, measure consistency and adjudicate disagreement.
8. Defend a derived requirement and its verification/validation rationale to SE/PVI/safety/test stakeholders.

## Phase 1 — Analyze tasks correctly (Weeks 1–4)
### Week 1: Ontology and purpose
**Read:** MIL-STD-46855A relevant sections and DID descriptions; Guyton et al. 2025; Kirwan/Ainsworth introductory sections.
**Study:** mission vs function vs task vs decision vs information vs control; observed vs reported vs inferred; capability vs interface feature.
**Lab:** decompose a generic flight-deck mode change into mission/function/task/decision/need. Write 10 examples and 10 counterexamples of a true operator need.
**Deliverable:** one-page glossary and initial diagram; **gate:** another analyst can correctly classify >=90% of a 20-item training quiz (internal practice target; not empirical standard).

### Week 2: HTA and scenario framing
**Read:** Stanton HTA, Shepherd, Diaper & Stanton selected chapters.
**Lab:** construct HTA of a normal checklist or maintainer servicing task, including plan operators (order, selection, repeat, stop) and exceptions. Include a second scenario differing in preconditions.
**Deliverable:** versioned HTA + scenario coverage table.
**Gate:** no orphan actions; plan syntax explicit; each branch has initiation/exit criteria.

### Week 3: Task time, concurrency, context
**Read:** Kirwan/Ainsworth timeline/workload methods; FAA flight-deck V2 relevant tasks/workload sections.
**Lab:** annotate a simulator/video or self-authored scenario as event timeline with simultaneous pilot, communication and automation events; separately label observations versus interpretations.
**Deliverable:** synchronized timeline and actor lane map.
**Gate:** every time-critical decision has an event and deadline hypothesis with evidence status.

### Week 4: Fieldwork and quality
**Read:** Hackos/Redish, Beyer/Holtzblatt; observational/interview bias literature.
**Lab:** pilot a 30–45 min interview with a consented subject in a benign familiar domain; avoid private program work. Conduct an independent analysis or blind peer check.
**Deliverable:** study plan, transcript/notes, task model, audit trail, quality issues.
**Gate:** document disagreements, non-leading probes and changes prompted by evidence.

## Phase 2 — Expert cognition and information needs (Weeks 5–8)
### Week 5: Goal-directed task analysis
**Read:** Endsley 1993 fighter study, Endsley & Jones goal-directed analysis chapters.
**Study:** distinguish goals, decisions, SA elements; L1 cues, L2 relations, L3 projections; requirements vs SA assessment.
**Lab:** construct complete GDTA for the generic mode-transition case. Ask 'what must the pilot answer and why?' before listing symbols.
**Deliverable:** goal → decision → information matrix with timing and current availability gap.
**Gate:** no unlinked information needs or unexamined representational assumptions.

### Week 6: ACTA
**Read:** Militello & Hutton (1998) closely; Crandall/Klein/Hoffman selected methods.
**Lab:** task diagram, knowledge audit and simulation interview on a cognitively demanding but unclassified task. Prompt novice–expert differences, cues, anomalies and uncertainty.
**Deliverable:** cognitive demands table; evidence tags per row.
**Gate:** at least three design-relevant insights that could not be inferred from action sequence alone.

### Week 7: CDM and decision points
**Read:** Hoffman/Crandall/Shadbolt (1998); Klein CDM/naturalistic decision making.
**Lab:** elicit and reconstruct one difficult real benign decision, four passes; annotate elicited retrospective claims separately from external facts.
**Deliverable:** timeline, decision requirements table, counterfactual prompts.
**Gate:** specify which findings are portable, contingent, or weakly evidenced.

### Week 8: Cognitive work analysis
**Read:** Vicente (1999), Naikar (2013); Rasmussen/Pejtersen selected sections.
**Lab:** develop an abstraction hierarchy for a simplified flight-guidance or aircraft-energy management work domain and compare against HTA.
**Deliverable:** constraint model showing at least three valid strategies and relevant constraints.
**Gate:** explicitly state what CWA revealed that HTA/GDTA did not.

## Phase 3 — From analyses to engineered design (Weeks 9–12)
### Week 9: Information/data fidelity
**Read:** Guyton Table 1 again; FAA flight-deck V2; Course 16 sections on signal provenance.
**Lab:** trace one data element physical/estimated state → processing → validity/quality → presented meaning → pilot decision.
**Deliverable:** normalized information registry, signal lineage and degraded-state table.
**Gate:** information availability is distinguished from accuracy, integrity, recency, comprehension and confidence.

### Week 10: Controls, modes, automation and authority
**Read:** Parasuraman/Sheridan/Wickens (2000); Sarter/Woods mode awareness; Bainbridge.
**Lab:** model command/acknowledgment/acceptance/active/achieved state; permissions, inhibition, timeout, reversion and failure.
**Deliverable:** state machine + control need registry + operator-action/feedback trace.
**Gate:** an SME can answer whether the pilot knows if commanded versus actual mode differs.

### Week 11: Requirements and safety
**Read:** ISO 29148; MIL-STD-882E; Leveson/STPA; HEDAD/HESAR documents.
**Lab:** for five real needs, write outcome requirements, allocate system/human responsibility and identify error/safety links. Label test method for each.
**Deliverable:** need → requirement → behavior → test trace with source/rationale.
**Gate:** each requirement is unambiguous and feasibly verifiable; no arbitrary numerical criterion.

### Week 12: Interface/procedure design choices
**Read:** Barshi et al. (2016), FAA flight-deck v2, Endsley & Jones relevant design sections.
**Lab:** propose two substantially different solutions for one need: information organization + state feedback; or alternative procedure sequences. Test concept against target failures.
**Deliverable:** design trade study: tasks supported, expected benefits, risks, constraints and test hypotheses.
**Gate:** a design can be rejected on task performance grounds rather than preference only.

## Phase 4 — Test and standardize (Weeks 13–16)
### Week 13: Measure the right construct
**Read:** Endsley SA measurement; Hart/Staveland NASA-TLX; relevant eye tracking performance and validity literature.
**Lab:** derive metrics from 6 CTA-derived claims. Build outcome/mechanism matrix. Identify one misleading metric for each and why.
**Deliverable:** operationalized measurement plan (performance, cognition, workload/process).
**Gate:** no gaze, physiological or self-report proxy is called direct proof of task/SA success.

### Week 14: Experimental and procedure test design
**Read:** Sauro/Lewis; Lazar/Feng/Hochheiser; NASA flight-deck procedure validation sections.
**Lab:** construct comparative simulation evaluation with counterbalancing, ground truth, performance thresholds, confounds, scoring and plausible missingness.
**Deliverable:** test protocol + analysis plan + traceability matrix.
**Gate:** predefined hypotheses and error tradeoffs, feasible interpretation of null results.

### Week 15: Repeatability and peer review
**Read:** assessment/reliability methodology matched to task and data scale.
**Lab:** second independent analyst codes an identical synthetic dossier; compare classifications, links, missing decision/need fields and priority judgments; adjudicate discrepancies.
**Deliverable:** inter-analyst discrepancy log + revised method and coding manual.
**Gate:** reliability improvement demonstrated or clear limitations documented (no universal kappa target).

### Week 16: Capstone defense
**Case:** full, public/synthetic fighter-relevant PVI or generic flight-deck work-domain problem, with nominal, high-demand, degraded and recovery conditions.
**Deliverable:** study plan, scenario matrix, HTA + GDTA + justified ACTA/CWA, information/control registries, mode model, requirements, verification/validation design, limitations and executive design brief.
**Gate:** independent reviewer can reconstruct every major design/test decision from the evidence, identify gaps, and reproduce core classifications.

## Weekly learning loop (repeat for 16 weeks)
| Day | Practice | Output |
|---|---|---|
| Mon | Read source 30–45 min + reconstruct method from memory | 1-page method specification |
| Tue | Repeat a source example + diagram | Clean analyst artifact |
| Wed | Apply to an aerospace/synthetic case | Versioned work product |
| Thu | Interview/alternative-method comparison or red-team | Disagreements and blind spots |
| Fri | Derive design/test decision + critique against rubric | Evidence-backed decision memo |
| Weekend optional | 60–90 min deeper primary reading or hands-on modeling | Consolidated notebook |

## Months 5–12: from proficient to credible domain expert
**Months 5–6:** 2 independent end-to-end cases; 1 maintainer and 1 flightcrew; use at least 3 different elicitation approaches and compare their yield.
**Months 7–8:** work with an authorized multidisciplinary team on a properly controlled project; test whether outputs actually inform architecture, requirements and prototype decisions. No employer content in this personal repo.
**Months 9–10:** standardize naming, training, coding and change-control; blind analyst replication; quantitative data-quality and utility assessment.
**Months 11–12:** publish (subject to approvals) an internal methods guide and technical report; train peers, conduct reviewer calibration, audit two designs/tests, and refine your methods. Consider an external methods paper using only approved or synthetic data.

## Definition of 'expert'
Not achieved by finishing 16 weeks or knowing acronyms. Require repeated original studies, independent peer critique, demonstrated usefulness for design/validation, methodological judgment about **when not to use a method**, and credible evidence that other analysts can follow the standard.

## Resource order
1. MIL-STD-46855A / CTAR/HESAR/HEDAD
2. Stanton/Diaper/Kirwan for HTA and method discipline
3. Endsley (1993)/Endsley & Jones for GDTA
4. Militello & Hutton and Working Minds for ACTA/CDM
5. Vicente/Naikar for CWA
6. Guyton et al. + INCOSE/29148 for model/requirements
7. FAA V2, Barshi, Parasuraman, Sarter & Woods, Leveson for design and safety
8. Sauro/Lewis, Lazar et al., NASA-TLX/SA research for tests
