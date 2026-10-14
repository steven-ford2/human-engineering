# Initial evidence synthesis and review agenda

Date: 2026-10-09. **Evidence grades used here:** [TEXT] = project/repository primary text actually inspected; [ABSTRACT] = publisher/NASA abstract checked; [SYNTHESIS] = proposed integrated methodology, not a claim made by a single source.

## Distinguish five analytical objects
1. **Work domain**: constraints and means–ends relationships, especially under unexpected conditions (Vicente; Naikar). [SYNTHESIS]
2. **Task structure**: goals, subgoals, plans, sequencing and exceptions (HTA and related approaches). [SYNTHESIS]
3. **Cognitive demand**: uncertain cues, assessments, tacit expertise, decision alternatives, mental simulation (ACTA/CDM). [ABSTRACT]
4. **Information and control need**: what must be known or influenced, by when and with what quality, independent of preferred display solution. [SYNTHESIS]
5. **Allocated, testable behavior**: functions/data/feedback/error handling allocated to system and verified via operationally relevant tasks. [SYNTHESIS]

## Strong source-specific findings
### Guyton, Kuhlken and Lowe (2025) [TEXT; existing repository source]
- MTA has mission, function and task levels.
- Mission analysis uses reference scenarios/CONOPS and mission element matrix to check coverage.
- Function analysis documents decomposition and allocations (including potentially dynamic human/automation allocations).
- Task analysis Table 1 encompasses task criticality; decisions; information required/available and L1/L2/L3; workload; action/feedback; communication; errors; safety; automation; HMI control/display needs.
- SysML instance data and diagrams aim to maintain task-to-system traceability.
- **Not demonstrated by the article alone:** validation that its full taxonomy is exhaustive across operational contexts, or inter-rater reliability of actual task coders.
Source: [repository copy](https://github.com/steven-ford2/FighterJets/blob/main/references/task-analyses-mbse.md), [DOI](https://doi.org/10.54941/ahfe1006105).

### Endsley (1993) [ABSTRACT]
The published abstract identifies unstructured interviews, goal-directed task analysis and structured questionnaires of experienced fighter pilots to derive and prioritize SA requirements. This is unusually close to the current use case. Full text must be inspected before adopting its exact interview protocol or priority algorithm.
Source: https://doi.org/10.1207/s15327108ijap0302_5 .

### Militello and Hutton (1998) [ABSTRACT/FULL PUBLIC LINK]
ACTA offers a pragmatic knowledge-elicitation toolkit; review task diagram, knowledge audit and simulation interview, then reproduce their intended outputs in a synthetic aviation application.
Source: https://web.mit.edu/16.459/www/Militello98.pdf .

### Hoffman, Crandall and Shadbolt (1998) [ABSTRACT]
CDM uses multiple retrospective passes with prompts and can produce incident timelines and decision-requirement records. Evaluate retrospective bias, critical-incident sampling, and expertise differences.
Source: https://doi.org/10.1518/001872098779480442 .

### Barshi et al. (2016) [TEXT; project PDF]
NASA describes an iterative, cross-disciplinary flight-deck procedure development process. Procedure design must be evaluated under representative operational circumstances; task analysis is an input rather than a guarantee of usability. Source: https://ntrs.nasa.gov/citations/20160013263 .

### FAA flight-deck HF Version 2 (2016) [TEXT; project PDF]
Report covers flight-deck displays, controls, alerts, intended function, error management, workload and automation. Use it as a downstream design/evaluation constraints map; not as the sole elicitation method.

## Research questions to answer BEFORE establishing an organizational standard
- Q1. Which fields are mandated by applicable contracts and HSI process, and which are our method-level recommendations?
- Q2. What is the minimum task-level record, and when is deep CTA or CWA mandatory?
- Q3. What unit of analysis permits unambiguous links among scenario, function, task, decision, information need and software signal?
- Q4. How is analyst–SME disagreement captured, adjudicated and revisited?
- Q5. Which scenario coverage metrics detect missing rare, degraded, high-consequence and cross-team conditions?
- Q6. What does a meaningful 'information need' look like without a presupposed cockpit display?
- Q7. How to model state/authority, action feedback, inhibition, unsuccessful commands and recovery?
- Q8. How do design requirements become observables and success/failure thresholds under realistic test loads?
- Q9. How will a second analyst reproduce the approach and outcomes?
- Q10. Which program data can legitimately be used in a personal repository? Default: no non-public program data.

## Likely methodological answer, to be stress-tested
Use **scenario coverage + mission/function decomposition** as the backbone, **HTA** for procedural work, **GDTA** for goals–decisions–information needs, **ACTA/CDM** for tacit expert judgments, **CWA** for adaptive/degraded work, **error/safety analysis** for hazards, and **requirements/behavior models** for downstream design and validation. This stack is an integration proposal, not a universal requirement.

## Evidence extraction quality controls
- Never invent page-specific references or purported direct quotes.
- Record one entry per claim: claim ID, source ID, page, verbatim note or precise paraphrase, method, applicability, confidence and open question.
- Separate empirical results from authors' recommendations and from engineering inference.
- Note when study subjects, tasks or settings differ from fighter aviation.
- Expose incompatible definitions and uncertain/missing evidence.
