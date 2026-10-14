# Scenario-to-verification flagship pathways for aviation human factors

**Status:** Primary-source synthesis and repository gap analysis  
**Completed:** 2026-10-14  
**Scope:** Four worked planning pathways that connect an operational scenario and task analysis to a defensible verification package.  
**Boundary:** This note proposes a planning method. It does not create program requirements, certification findings, flight-test authorization, safety acceptance, or universal human-performance thresholds.

## Why this pass was needed

The repository already has unusual breadth. At inspection, the Measurement Atlas contained 279 measure records, 17 standards-mapping records, 33 study records and nine standards/guidance records. The task-analysis domain already defines the core ontology:

> mission/scenario → function → allocation → task → decision → information/control need → behavior → requirement → testable claim/measure → evidence

The two current research notes also establish the necessary scientific boundaries:

- [Aviation measures and standards crosswalk](./aviation-measures-and-standards-crosswalk.md) separates direct criteria, means-of-compliance guidance, supporting evidence and controlled/unverified mappings.
- [Psychometric evaluation and core measure evidence](./psychometrics-and-core-measure-evidence.md) separates reliability, validity, factor evidence, study context and the decision a score is intended to support.

What is still missing is a practitioner-facing intermediate artifact: a **verification case** that makes one inspectable argument from task/scenario to acceptance and evidence closure. The existing `requirements-tests.csv` is a strong traceability start, but it does not yet carry every authority, configuration, instrumentation, uncertainty, coverage and disposition field needed to defend a verification decision.

This pass used the catalog, both research notes, the task-analysis schema, measurement framework, standards guide, templates, and synthetic mode-transition case. It then returned only to official sources already acquired and cited in the repository. No broad new web search was performed.

## Five highest-value gaps

### Gap 1 — No verification-case object joins the existing records

The repository has scenario, task, decision, need, requirement, measure/test and evidence entities, but no single object freezes the claim, authority, configuration, conditions, acceptance rule and evidence-disposition chain for a particular verification decision.

This is not clerical. MIL-STD-46855A §5.3.1 (PDF pp. 16–17) calls for planned data, analysis methods, quantitative measures and criteria, participant descriptors, questionnaires, procedures and reporting. MIL-HDBK-516D repeatedly structures evidence by method and maturity—analysis, examination, demonstration, lab, ground and flight. A finder result alone cannot carry that argument.

**Needed bridge:** `verification_case_id` linking exact scenario/task/need/hazard/requirement versions to an approved criterion, procedure, condition matrix, measures, artifacts and disposition.

### Gap 2 — Acceptance authority and threshold provenance are not first-class

The task-analysis material correctly warns against inventing latency or success thresholds. The catalog also correctly distinguishes MIL-HDBK-516D guidance from a requirement. What remains implicit is who approves an acceptance rule and what type of basis it has.

**Needed bridge:** every primary outcome needs an `acceptance_basis_type` and authority:

- invoked numeric criterion;
- program-derived limit from hazard/task timing;
- approved certification-basis criterion;
- desired/adequate performance definition for handling qualities;
- statistically justified equivalence/non-inferiority margin;
- diagnostic/no pass-fail use.

A confidence interval, p-value, mean questionnaire score or “no significant difference” is not an acceptance rule unless the decision basis says it is.

### Gap 3 — Scenario coverage is not yet a verification condition matrix

The task-analysis templates capture environment, mode, concurrency and degraded states, but a verification plan must resolve these into test cells and justify omissions. The official sources make this concrete:

- MIL-HDBK-516D §9.2.1.1 (PDF pp. 517–518) calls for readability at design eye, full-sun daytime up to 10,000 fc, night/dark conditions, minimum/maximum station lighting, and representative helmets/visors.
- §9.2.8.4 (PDF pp. 529–530) calls for visual-alert evaluation across ambient lighting, optical-gear combinations, operational stressors and cascading failures.
- §6.1.3 (PDF p. 89) calls for assessment across flight phases, loadings, configurations and environments for critical display characteristics.
- §9.4.1 (PDF p. 548) calls for trained/qualified crewmembers, normal procedures, selected worst-case emergency procedures, high-fidelity simulation and objective plus subjective evidence.

**Needed bridge:** a condition matrix that lists factor, level, source/rationale, criticality, test stage, coverage status and accepted limitation.

### Gap 4 — Evidence roles are mapped but not enforced at pathway level

The catalog contains physical, task-performance, psychometric, gaze, physiological and ergonomic measures. The research notes state the distinctions, but a practitioner can still assemble a plan that substitutes a workload or comfort score for the claim that actually matters.

FAA Version 3.0 Appendix B (report pp. 354–356) recommends collecting both objective and subjective evidence and warns that preference may differ from performance. MIL-HDBK-516D §9.4.1 similarly calls for objective performance to corroborate subjective workload/SA scores.

**Needed bridge:** each measure in a verification case must have one explicit role:

- `primary_acceptance`;
- `corroborating_objective`;
- `engineering_characterization`;
- `diagnostic_psychometric`;
- `exploratory_mechanism`;
- `safety_monitoring`.

Only a measure whose role and criterion were approved can drive the finding.

### Gap 5 — Artifact, data-quality and discrepancy closure are under-specified

The templates identify evidence, ground truth and confounds, but they do not yet force a manifest of raw data, calibrated instrumentation, uncertainty, exclusions, software/configuration versions, participant/gear coverage, deviations, discrepancy ownership and authority closure.

MIL-STD-46855A §§5.3.2–5.3.3 requires representative conditions and users, assessment against acceptance/rejection criteria, and analysis of failures and errors. A verification result must therefore remain reproducible and traceable after the test team leaves.

**Needed bridge:** an evidence manifest and discrepancy log bound to the frozen verification case.

## The flagship verification-case pattern

Use the following seven gates for all four pathways.

| Gate | Question | Minimum output |
|---|---|---|
| V0 Authority and scope | What decision is authorized, under which exact requirement/certification basis, for which configuration? | Approved scope, authority, exact revision/clause, applicability/tailoring record, configuration baseline |
| V1 Operational chain | What scenario, task, decision, need and hazard create the claim? | Stable SC/T/D/IN/CN/HE IDs, actor population, failure mechanism, intended outcome |
| V2 Acceptance argument | What must be true, by what rule, and why is that rule authoritative? | Operationalized claim, primary outcome, threshold/margin, units, basis type, approving authority |
| V3 Evidence design | Which independent evidence streams address the requirement and failure mechanism? | Engineering, task-performance and supporting/diagnostic measures with roles |
| V4 Coverage and readiness | Are conditions, participants, instrumentation, fidelity, calibration and data-quality rules adequate? | Condition matrix, participant/gear matrix, readiness review, dry-run results, stopping/exclusion rules |
| V5 Execution and analysis | Were the approved procedure and configuration followed, and how is uncertainty handled? | Raw data, event logs, calibration, deviations, prespecified scoring/analysis, confidence/uncertainty |
| V6 Finding and closure | What passed, failed or remains indeterminate, and who accepts the disposition? | Requirement-level finding, limitations, discrepancy/corrective action, retest need, authority disposition |

### Minimum verification-case fields

```text
verification_case_id
decision_to_be_made
decision_authority
system_configuration_and_software_baseline
scenario_task_decision_need_hazard_ids
requirement_id_and_exact_text
requirement_source_revision_clause_and_tailoring
verification_claim_and_predicted_failure_mechanism
primary_outcome_operational_definition_and_units
acceptance_rule_basis_type_source_and_approver
measure_ids_with_evidence_roles
independent_ground_truth
condition_matrix_and_coverage_rationale
participant_population_boundary_cases_and_gear
test_stage: analysis | inspection | demonstration | lab | HITL | ground | flight
instrumentation_calibration_time_sync_and_uncertainty
data_quality_missingness_exclusion_and_stopping_rules
analysis_and_tradeoff_rules
artifact_manifest
deviations_discrepancies_corrective_actions
finding: pass | fail | indeterminate | not_tested
limitations_transfer_boundary_and_authority_disposition
```

## Pathway 1 — Flight-deck display legibility and visual alerting

### Decision this pathway can support

Whether a configured display/alert presentation is physically viewable and enables the intended pilot population to detect, identify, understand and correctly act on specified visual alerts within program-approved operational constraints.

It cannot support the broader claim that the entire alerting system is safe from photometry or preference alone.

### V0–V1: requirement and operational chain

**Representative scenario:** A pilot maintaining a primary flight task receives a warning/caution/advisory under daylight or night/NVIS conditions. The alert may occur alone or during a cascading failure. The pilot must detect it, discriminate its priority, identify the condition, select the correct response and preserve higher-priority aircraft control.

**Task-analysis chain:**

```text
SC alert under stated lighting/gear/failure conditions
→ T maintain flight and respond to alert
→ D what condition/priority is present and what action is required?
→ IN alert state, urgency, affected system, corrective-action information
→ HE miss, confusion, false alarm, wrong action, delayed action, attentional capture
→ R physical viewability + correct recognition/action under defined conditions
→ TEST physical display properties + representative-user task performance
```

**Potential direct criteria if invoked:**

- MIL-STD-1472H §5.2.1.2.1 requires a display luminance adjustability ratio of at least 50:1; §5.2.1.2.2 requires capability of at least 35 cd/m²; §5.2.1.2.3 requires usability across expected ambient illumination (public PDF p. 107).
- §5.2.1.3 requires visible display content across the expected ambient range; §§5.2.1.4.2–5.2.1.4.3 specify reflection criteria under stated viewing geometry (p. 107).
- §5.2.2.7 specifies electronic-display character/background contrast (public PDF p. 109).

**Means-of-compliance guidance:** MIL-HDBK-516D §9.2.1.1 (PDF pp. 517–518) and §9.2.8.4 (pp. 529–530). The latter explicitly calls for human-in-the-loop evaluation of perception, recognition and corrective action under ambient lighting, optical-gear combinations, operational stressors and cascading failures.

### V2: acceptance argument

Use separate findings:

1. **Engineering criterion finding:** measured physical property versus each applicable invoked clause or program display specification.
2. **Task-performance finding:** detect/identify/act performance versus task- or hazard-derived limits approved by the program.
3. **Diagnostic finding:** workload, confidence, comments or gaze used to explain performance—not to override failure of the first two.

Do not invent a universal alert-detection percentage or action-time limit. Derive it from the event timeline, hazard analysis, aircraft-control priority, procedure and approved requirement.

### V3: evidence design

| Evidence role | Candidate measures | Required interpretation |
|---|---|---|
| Primary acceptance | Alert detection, correct alert identification, correct corrective action, critical miss/wrong-action count, response within approved deadline | Score against independent injected-state/event truth and approved action rubric |
| Engineering characterization / direct criterion | Luminance, dimming range, target/background contrast, uniformity, specular/diffuse reflection, angular character/symbol size, color/chromaticity, NVIS radiance where applicable | Preserve instrument, geometry, eye point, ambient source, calibration and uncertainty |
| Corroborating objective | Flight-path/primary-task error, false-alarm response, alert confusion matrix, head-down time | Prevent a fast alert response from masking degraded aircraft control or wrong interpretation |
| Diagnostic psychometric | NASA-TLX or Bedford for a defined task segment | Subjective workload only; pair with performance and name exact version/scoring |
| Exploratory mechanism | Gaze/AOI sequence | May explain search; does not prove recognition or comprehension |

### V4: minimum condition matrix

- Day/full-sun condition up to the 10,000 fc demonstration context stated by MIL-HDBK-516D §9.2.1.1.
- Night/dark and, if applicable, NVIS configuration under MIL-STD-3009.
- Minimum and maximum installed lighting; representative external/artificial sources.
- Design-eye and applicable viewing-envelope positions.
- Required helmet and clear/tinted visor; every operationally relevant optical-train combination.
- Nominal alert, competing alerts and representative cascading-failure scenario.
- Primary-task concurrency and operational stressors.
- Production-representative display, dimming logic, software, symbology and alert data source.

If a condition is not tested, mark it `not_tested` with the authority-approved rationale; do not silently generalize.

### V5–V6: artifacts and finding

**Artifact manifest:** invoked-requirement extract; tailoring/certification-basis record; test card; display and lighting configuration; photometer/spectroradiometer calibration; geometry diagram; raw physical measurements; time-synchronized simulator/aircraft event log; response scoring rubric; participant/gear matrix; video where authorized; analysis code/output; deviations; discrepancy log; final authority disposition.

**Non-claims:**

- MIL-HDBK-516D is guidance, not a requirement.
- MIL-HDBK-516D §9.2.8.4 cross-references MIL-STD-411 and MIL-L-85762. Their current status and applicable text were not established in this pass; verify before adopting those subcriteria.
- Passing luminance/contrast criteria does not prove comprehension or correct action.
- A favorable workload score does not cure a critical miss or wrong action.

## Pathway 2 — HUD/HMD optical, tracking and operational integration

### Decision this pathway can support

Whether a configured HUD/HMD optical path, imagery, tracker, helmet integration and timing support specified outside-view and aircraft-control tasks across the approved user, gear and operating envelope.

### V0–V1: requirement and operational chain

**Representative scenario:** During an outside-view task—such as taxi, takeoff, maneuvering, approach or landing—the pilot must acquire and interpret conformal or referenced information while preserving real-world visibility, flight-path control and hazard detection through head movement, lighting changes and representative aircraft dynamics.

**Task-analysis chain:**

```text
SC outside-view task with specified display mode, light, gear, maneuver and failure state
→ T visually acquire, align, interpret and act while controlling aircraft
→ D is the symbol/image correctly registered and operationally usable now?
→ IN outside scene, aircraft state, symbol meaning, display/tracker validity
→ CN head/eye movement, declutter/mode control, display adjustment
→ HE occlusion, misregistration, parallax, lag, jitter, double image, loss of orientation, neck restriction
→ R optical/temporal/ergonomic criterion + task-level performance criterion
→ TEST bench geometry/timing + representative-user HITL/ground/flight progression
```

**Potential direct criteria if invoked:** MIL-STD-1472H §§5.2.2.15–5.2.2.16 (public PDF pp. 115–116) address HUD transmission, eye box, angular displacement, symbol dimensions/luminance/line width and HMD FOV/FOR, unobstructed view, declutter, cognitive load, helmet vibration, weight distribution, movement, alignment, stability and depth perception. Simulator/virtual-environment latency and update clauses are in §§5.12.1.4.1–5.12.1.4.4 (public PDF pp. 326–327).

**Means-of-compliance guidance:**

- MIL-HDBK-87213B §4.2.1.25.1 (PDF p. 81) recommends look-angle measurements from specified eye positions and normally a theodolite for HUD FOV; §4.2.1.25.2 (pp. 81–82) calls for eye-position/field-angle data for parallax. Its §4.2.1.25.4 series addresses accuracy, registration, displacement, distortion and boresight.
- MIL-HDBK-516D §9.4.4.1 (PDF pp. 549–550) treats the entire optical path—transparency, HUD/HMD and visor—and calls for task-region analysis, physical-aircraft demonstration under day, night and NVD/NVIS conditions where applicable, and flight confirmation.
- MIL-HDBK-516D §6.1.3 (PDF p. 89) calls for analysis, piloted simulation and flight assessment when primary/standby display characteristics are critical to mission-task-element handling qualities, including latency across flight phases, loadings, configurations and environments.

### V2: acceptance argument

Partition the claim:

1. **Optical/engineering conformance:** each approved numeric/qualitative criterion has its own result.
2. **Task support:** search, recognition, spatial orientation, flight technical performance and hazard response meet program-approved operational criteria.
3. **Human integration:** required population can fit, align, move, view controls/outside scene and perform for the specified duration without an unacceptable failure mechanism.
4. **Symptoms/experience:** sickness, discomfort and workload characterize limitations and risk; they are not substitutes for the first three.

### V3: evidence design

| Evidence role | Candidate measures | Required interpretation |
|---|---|---|
| Primary acceptance | Mission/task success, target/hazard detect-identify-act, flight-path tracking error, approach/landing or maneuver outcomes, correct symbol interpretation | Ground truth and tolerances must be task- and program-specific |
| Engineering characterization / direct criterion | HUD eye box/FOV, transmission/reflection, luminance/contrast, angular displacement, parallax, boresight, distortion; HMD FOV/FOR, exit pupil/eye relief, static/dynamic tracker error, motion-to-photon latency, jitter/update, registration drift | Test across eye/head pose, field angle, display mode, light and configuration; report distributions/maps, not only averages |
| Ergonomic corroboration | Helmet mass and CG, head mobility, cable load, stability, control/outside-view occlusion, fit/alignment accommodation | Tie to representative population, equipment and mission duration |
| Diagnostic psychometric / safety monitoring | SSQ, discomfort, NASA-TLX/Bedford, structured optical/usability comments | Diagnose symptoms, burden and observed failure mechanisms; report adverse events/dropout |
| Exploratory mechanism | Eye tracking/scanning | Requires calibration and data-quality report; NASA/TP-2017-219623 reported severe gaze-data loss when HWD hardware obstructed cameras |

### V4: minimum condition matrix

- Design eye/eye box boundary positions and representative head poses/field angles.
- Intended anthropometric and helmet-fit range, eyewear, visor/filter, oxygen mask and other gear.
- Day, high ambient/direct-sun background where required, night and NVD/NVIS conditions.
- Symbology only versus video/overlay; declutter and failure/degraded modes.
- Aircraft/load/configuration/flight-phase combinations that drive tracking, vibration, latency or handling.
- Static and dynamic head motion; calibration/boresight and drift/reacquisition states.
- Nominal plus optical/tracker/data-source failure or misleading-information cases justified by safety analysis.
- Representative task duration and motion exposure for neck burden and sickness.

### V5–V6: artifacts and finding

**Artifact manifest:** optical prescription/configuration; coordinate-frame/timebase definition; theodolite/fixture setup; eye-position and field-angle matrix; FOV/eye-box and error maps; photometric/spectral data; tracker and latency traces; helmet mass/CG and fit records; simulator fidelity statement; aircraft-state and flight-technical data; participant/gear matrix; SSQ/adverse-event record; deviations and authority disposition.

**Non-claims:**

- MIL-HDBK-87213B is guidance with sample blanks. §4.2.1.26 states HMD-specific verification is TBD, and several subordinate HMD verification paragraphs are also TBD (PDF pp. 95–101). Do not promote its examples to universal thresholds.
- An optics-bench pass does not prove operational integration.
- A positive comfort/usability rating does not prove conformality, tracking accuracy, flight safety or acceptable handling qualities.
- MIL-STD-1787D symbology text is controlled; only its public scope/status was verified. No clause-level public mapping is claimed.
- MIL-HDBK-516D §9.4.4.7 cites AC 20-167A, which FAA AC 20-167B superseded. Preserve the handbook citation in provenance, but review the current AC for present FAA guidance.

## Pathway 3 — Workload, mode management and handling qualities

### Decision this pathway can support

Whether trained and qualified pilots can accomplish defined normal/degraded/emergency tasks with acceptable objective performance and an authority-approved workload/handling-qualities basis, without hiding control or mode-management failures inside an average subjective score.

### V0–V1: requirement and operational chain

This pathway can directly reuse the synthetic [flight-deck mode-transition case](../../domains/task-analysis/cases/flight-deck-mode-transition.md) while preserving its synthetic status.

**Representative scenario:** The pilot must distinguish selected from controlling mode, manage accepted/deferred/rejected transitions, recover from unexpected state behavior, maintain flight path and handle a concurrent communication task.

**Task-analysis chain:**

```text
SC mode request: activated | deferred | rejected, with nominal | concurrent | degraded conditions
→ T assess mode, command if needed, verify achieved state, recover
→ D what is controlling, did the command take effect, what next action is safe?
→ IN/CN selected/requested/accepted/executing/active/achieved state and recovery authority
→ HE mode confusion, inappropriate retry, fixation, flight-path excursion, delayed/failed recovery
→ R distinguish/act/recover within approved task and flight-performance limits
→ TEST state classification + command/recovery + flight/control performance + workload/handling ratings
```

**Potential direct/program criteria if invoked:** MIL-STD-1472H §§4.2.3–4.2.4 (public PDF p. 22) addresses workload/capability and system performance. MIL-STD-46855A §§5.1.2–5.1.2.3 (PDF pp. 10–11) calls for task/workload analysis across visual, auditory, motor and cognitive demand, timing, mental effort and stress; §§5.3–5.3.3 (pp. 16–17) addresses quantitative T&E, representative users/conditions and error analysis.

**Means-of-compliance guidance:** MIL-HDBK-516D §9.4.1 (PDF p. 548) calls for functional/task analysis, a government-accepted workload method, situation-awareness evaluation and objective speed/accuracy/heading corroboration. It calls for high-fidelity HITL simulation with trained and qualified crewmembers across normal and selected worst-case emergency procedures, followed by flight verification for normal procedures. For display characteristics affecting a mission task element, §6.1.3 (p. 89) links analysis, piloted simulation and flight test to the applicable handling-qualities level.

### V2: acceptance argument

- **Mode/task performance:** approve classification, command, recovery, critical-error and deadline criteria from the task/hazard timeline.
- **Flight/control performance:** approve path, attitude, speed, control-activity or other task tolerances before data collection.
- **Handling qualities:** define desired and adequate performance for the exact task/configuration before applying Cooper–Harper.
- **Workload:** use the government/program-accepted method and define how it contributes to the decision. A scale value must not compensate for unsafe objective performance.
- **Tradeoff rule:** any critical error or loss of primary-task control remains visible; do not average it away in a composite score.

### V3: evidence design

| Evidence role | Candidate measures | Required interpretation |
|---|---|---|
| Primary acceptance | Correct mode-state classification; correct/unsafe commands; successful transition/recovery; flight-path/attitude/speed within approved tolerances; critical omissions | Time-synchronize against independent simulator/aircraft selected/accepted/active/achieved states |
| Corroborating objective | Decision latency, recovery time, control input/RMS/reversals, secondary-task cost, communication correctness | Use to identify failure mechanism and performance reserve |
| Diagnostic psychometric | Bedford for spare mental capacity; NASA-TLX/Raw TLX for reported multi-dimensional task load; SART only as self-perceived SA | Name version, timing and scoring; pair with objective performance |
| Handling-qualities evidence | Cooper–Harper rating with declared desired/adequate criteria, pilot comments and achieved performance | Ordinal, task/configuration-specific; not generic workload or usability |
| Exploratory mechanism | Gaze or physiology | Hypothesis-specific and confound-controlled; not a pass/fail proxy |

The original [Cooper–Harper NASA TN D-5153](https://ntrs.nasa.gov/citations/19690013177) defines a handling-qualities decision tree tied to task performance and required pilot compensation. NASA's [official TLX resource](https://www.nasa.gov/human-systems-integration-division/nasa-task-load-index-tlx/) defines NASA-TLX as subjective workload. These constructs must remain separate.

### V4: minimum condition matrix

- Accepted/active, accepted/deferred and rejected/inhibited mode outcomes.
- Nominal, high-concurrency, degraded, failure and recovery cases.
- Primary flight task with representative secondary communication/monitoring demand.
- Trained/qualified pilot population, familiarization and stable proficiency criterion.
- Representative flight phases, loadings, configurations and environments for any §6.1.3 claim.
- Display latency or other manipulated characteristic at approved levels when it is part of the failure mechanism.
- High-fidelity simulator model with documented limitations and independently logged state truth.
- Flight-test confirmation only under separately authorized safety and test plans.

### V5–V6: artifacts and finding

**Artifact manifest:** functional/task analysis; mode/state model; hazard link; desired/adequate performance definitions; simulator validation/fidelity statement; crew qualification/familiarization; scenario scripts; independent state/event logs; aircraft/control data; observer/error adjudication; exact workload/handling scale and instructions; pilot comments; analysis with participant/scenario effects and uncertainty; deviations/discrepancies; authority disposition.

**Non-claims:**

- MIL-HDBK-516D cannot itself be cited as the requirement.
- MIL-STD-1797B is controlled. Its public metadata establishes scope/status, not a public clause mapping.
- Cooper–Harper is handling qualities, not workload or general usability. A modified scale is a different instrument.
- NASA-TLX or Bedford alone does not prove adequate performance, reserve, safety or airworthiness.
- Failure to detect a statistically significant difference is not equivalence.
- Simulator evidence does not automatically transfer to flight; document fidelity, transfer claim and confirmation plan.

## Pathway 4 — Pilot accommodation, reach, visibility and ergonomics

### Decision this pathway can support

Whether the defined pilot population, while clothed, equipped and restrained as operationally required, can see, reach, fully actuate and safely use applicable controls/displays across relevant normal and emergency tasks and station adjustments.

### V0–V1: requirement and operational chain

**Representative scenario:** Pilots at multivariate accommodation-envelope boundaries perform normal control/display tasks and an emergency/recovery sequence at applicable seat/restraint positions with helmet, visor, mask, clothing and survival/protective equipment.

**Task-analysis chain:**

```text
SC normal + emergency task at seat/equipment/configuration boundaries
→ T view, reach, identify, grasp, fully actuate, release/recover and egress as applicable
→ D can the action be completed safely now and is the correct state achieved?
→ IN/CN visual access, control identity/state, authority, travel/force and feedback
→ HE obstruction, excessive reach/force/posture, restricted motion, inadvertent actuation, missed view, incomplete travel
→ R specified multivariate population accommodation and task operability
→ TEST model/analysis + representative HITL mockup/aircraft measurement + operational demonstration
```

**Potential direct criteria if invoked:** MIL-STD-1472H §5.8.3.1 requires accommodation of the multivariate central 90 percent—95 percent preferred—of suitably clothed/equipped males and females in the target population; §5.8.3.2 states a multivariate central 99 percent for life-critical systems/equipment unless otherwise specified (public PDF p. 239). Section 5.8.4 (pp. 239–240) requires appropriate anthropometric data, clothing/equipment adjustments, clearance and adjustable-dimension treatment and warns that percentiles are not additive; it calls for multivariate methods and boundary cases when dimensions must be accommodated simultaneously.

**Means-of-compliance guidance:** MIL-HDBK-516D §9.2.1.3 (PDF p. 518) calls for design-eye analysis and representative-population/equipment demonstration of unobstructed safety-critical controls/displays. Section 9.2.2.1 (pp. 519–520) calls for HITL testing in a production-representative mockup or aircraft, required gear, restraints, extreme seat positions, measured clearances/reaches and body dimensions to determine the station accommodation envelope.

### V2: acceptance argument

1. Freeze the approved target population and anthropometric database/version.
2. Identify design-critical combinations from the actual task—not generic “small” and “large” users.
3. State whether the system is general, special-population or life-critical and which invoked criterion applies.
4. Approve every task/control/display that must be accommodated and the necessary travel, force, clearance, visibility and feedback.
5. A finding requires joint task success across relevant dimensions and gear, not separate marginal percentile statements.

### V3: evidence design

| Evidence role | Candidate measures | Required interpretation |
|---|---|---|
| Primary acceptance | Full control actuation; task completion; unobstructed critical-display/control visibility; safe reach/clearance; emergency action and egress where applicable | Evaluate each required task/control across approved boundary cases and station settings |
| Engineering characterization / direct criterion | Reach and clearance distances, actuation force/margin, seat/restraint adjustment, FOV/occlusion, head/limb range, helmet clearance, control travel | Preserve reference frame, measurement method, gear and body dimensions |
| Model/analysis support | Multivariate accommodation model, digital human model, vision plots, collision/interference analysis | Validate model assumptions and confirm consequential results with representative hardware/users |
| Diagnostic psychometric | Body-part discomfort or Borg CR10 exertion, after exact task/duration | Supporting burden/symptom evidence; not proof of accommodation by itself |
| Safety monitoring | Pain, excessive exertion, contact, loss of circulation, near-miss/inadvertent activation | Predefined stop criteria and medical/safety process where required |

### V4: minimum condition matrix

- Male and female multivariate boundary cases from the approved target-population data, not independent univariate percentile mannequins.
- Applicable clothing, helmet/HMD, eyewear/visor, mask, body armor/survival/protective equipment, gloves and footwear.
- Extreme and intermediate seat positions; operational restraint states.
- Normal, degraded, emergency and recovery tasks; right/left hand where required.
- Static reach plus full control travel, repeated/continuous action and required force.
- Design-eye and head-movement envelope, external/internal visibility and occlusion.
- Production-representative geometry and installed adjacent equipment/cables.
- Mission duration or repetition sufficient to expose fatigue, discomfort, helmet stability or neck burden where those are part of the claim.

### V5–V6: artifacts and finding

**Artifact manifest:** target-population definition; database and dimensional-variable list; multivariate method/boundary-case derivation; digital-model version and assumptions; participant body measurements; equipment sizes/configuration; seat/restraint settings; mockup/aircraft configuration survey; dimension/force/FOV records; task video/photos where authorized; task/error scoring; discomfort/safety monitoring; exceptions; uncovered population estimate with method; discrepancies and authority disposition.

**Non-claims:**

- Accommodating a fifth-percentile female and 95th-percentile male in one dimension does not establish multivariate accommodation.
- Adding marginal percentile coverages does not yield joint accommodation.
- A digital model alone does not prove task operability when geometry, soft tissue, clothing, force, movement or equipment interaction is consequential.
- Comfort is not the same as reach, clearance, visibility, control authority or safe egress.
- The 90/95/99 percent values are not free-standing universal goals; use the exact invoked clause, target population and program tailoring.

## Cross-pathway evidence architecture

| Layer | Display / alerting | HUD / HMD | Workload / handling | Accommodation / ergonomics |
|---|---|---|---|---|
| Operational outcome | Detect–understand–act while preserving flight task | Perform outside-view task, control aircraft, detect hazards | Correct mode/action/recovery and aircraft state | Complete required task/control action safely |
| Independent truth | Injected alert/state and approved action rubric | Reference geometry/pose/time and aircraft/task state | Simulator/aircraft mode and state logs | Surveyed geometry, force/travel, body dimensions and task state |
| Engineering evidence | Photometry, contrast, reflections, geometry, NVIS | Optics, registration, tracker, latency, FOV, mass/CG | Display latency and aircraft/control dynamics as applicable | Reach, clearance, force, FOV, restraint/seat geometry |
| Human task evidence | Detection, identification, action, error/time | Recognition, hazard response, FTE, task success | Mode classification, command/recovery, FTE/control | Reach/operate/view/egress completion and error |
| Psychometric/support | TLX/Bedford; comments | SSQ, comfort, TLX/Bedford | Bedford, TLX, SART; Cooper–Harper only for HQ | Discomfort/Borg exertion |
| Typical maturity path | Bench/lab → production-representative HITL → ground/flight where applicable | Optical bench → HITL → aircraft ground → flight | Analysis/HITL → flight confirmation | Digital/model → mockup HITL → production aircraft ground/demo |
| Finding boundary | Physical pass plus correct task use | Optical pass plus operational integration | Workload rating cannot hide unsafe objective performance | Marginal percentiles/comfort cannot prove joint accommodation |

## Acceptance and analysis rules common to all pathways

1. **One requirement, one visible finding.** Multiple measures may support it, but do not collapse unrelated failure modes into one opaque composite.
2. **Predeclare critical failures.** A safety-critical miss, wrong action, loss of control or inability to actuate must not be averaged away.
3. **Use denominators.** Report events/opportunities, participants, scenarios and configurations—not only percentages.
4. **Report uncertainty.** Include measurement uncertainty for instruments and interval/precision information for human outcomes.
5. **Preserve ordinal scales.** Bedford and Cooper–Harper ratings are not interval data by assumption; retain decision paths and comments.
6. **Separate missing from passing.** `not_tested`, `data_invalid`, `indeterminate` and `not_applicable_with_rationale` are different states.
7. **Preserve transfer boundaries.** A lab, mockup, simulator, ground or flight result supports only the stated configuration, population, task and environment unless an approved argument extends it.
8. **Close the loop.** Every failed/indeterminate result creates a discrepancy, limitation, redesign, retest or explicit authority disposition.

## Unresolved and controlled-access gaps

- **MIL-STD-1787D:** public status/scope only; full current symbology content is distribution-controlled. No clause-level public mapping.
- **MIL-STD-1797B:** public status/scope only; full current handling-qualities text is controlled. Cooper–Harper's original NASA source is public, but the program's MIL-STD-1797B criteria must come through authorized access.
- **MIL-STD-411:** MIL-HDBK-516D cites its alerting clauses, and a 2019 validation notice for MIL-STD-411F was located, but a definitive current public detail record/full-text review was not completed. Treat those cross-references as unresolved until checked in ASSIST/authorized holdings.
- **MIL-L-85762:** MIL-HDBK-516D §9.2.8.4 cross-references it for illuminated visual signals. Current status/applicability was not established in this pass.
- **MIL-HDBK-87213B HMD verification:** the public handbook leaves §4.2.1.26 and several child verification paragraphs TBD. Program-specific methods and criteria are required.
- **FAA enhanced-vision supersession:** MIL-HDBK-516D cites AC 20-167A; FAA published AC 20-167B on 8 Sep 2025. Applicability must be reconciled in the certification basis.
- **Program authority missing:** the repository cannot supply the contract, approved certification basis, hazard classification, mission-task tolerances, target population, flight-test safety release or authority decisions for a real program.
- **Psychometric transfer:** reliability/validity evidence remains version-, population-, task- and decision-specific. Missing evidence must remain visibly missing rather than borrowed from another setting.

## Primary and official sources used

- U.S. Department of Defense. [MIL-STD-1472H, Human Engineering](https://quicksearch.dla.mil/qsdocdetails.aspx?ident_number=36903), 15 Sep 2020; Notice 1, 10 Apr 2026. Inspected public-PDF pages 22, 107, 109, 115–116, 239–240 and 326–327 and the clauses cited above.
- U.S. Department of Defense. [MIL-HDBK-516D, Airworthiness Certification Criteria](https://quicksearch.dla.mil/qsDocDetails.aspx?ident_number=212162), 29 May 2026. Guidance only; inspected §§6.1.3, 9.2.1.1–9.2.2.1, 9.2.8.4, 9.4.1, 9.4.4.1 and the methods/conditions cited above.
- U.S. Department of Defense. [MIL-STD-46855A, Human Engineering Requirements for Military Systems, Equipment, and Facilities](https://quicksearch.dla.mil/qsdocdetails.aspx?ident_number=113938), 24 May 2011; Notice 3, 23 Sep 2025. Inspected §§5.1.2–5.1.2.3 and §§5.3–5.3.3.
- U.S. Department of Defense. [MIL-HDBK-87213B, Electronically/Optically Generated Airborne Displays](https://quicksearch.dla.mil/qsDocDetails.aspx?ident_number=123715), 2 Mar 2020; Notice 1, 10 Dec 2024. Guidance only; inspected §§4.2.1.25–4.2.1.26, including the TBD HMD content.
- FAA. [Human Factors Considerations in the Design and Evaluation of Flight Deck Displays and Controls, Version 3.0](https://rosap.ntl.bts.gov/view/dot/87936), DOT/FAA/AM-24/23, 2024. Inspected Appendix B (report pp. 354–356), Appendix C.1 (pp. 364–365) and Appendix C.6 (pp. 381–387).
- Cooper, G. E., and Harper, R. P., Jr. [*The Use of Pilot Rating in the Evaluation of Aircraft Handling Qualities*](https://ntrs.nasa.gov/citations/19690013177), NASA TN D-5153, 1969. Official NASA record/full report; original Cooper–Harper source.
- NASA Human Systems Integration Division. [NASA Task Load Index](https://www.nasa.gov/human-systems-integration-division/nasa-task-load-index-tlx/). Official instrument/manual access point.
- Arthur, J. J., et al. [*Evaluation of a Head-Worn Display System as an Equivalent Head-Up Display for Low Visibility Commercial Operations*](https://ntrs.nasa.gov/citations/20170007195), NASA/TP-2017-219623, 2017. Empirical evidence-pattern example, not a normative standard.

## Provenance and confidence

All normative/guidance claims above come from official public full text already inspected for the repository. Exact revision, section and page are stated where used. Repository counts and gaps reflect the files inspected on 14 October 2026. The four pathways and verification-case schema are original synthesis. Controlled, unresolved and program-specific information is labeled rather than inferred.
