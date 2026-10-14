# Aviation measures and standards crosswalk

**Research status:** Primary-source research pass 1  
**Last verified:** 2026-10-14  
**Scope:** Candidate measures and verification evidence for aircraft, cockpit, simulator, HUD/HMD, vision, display, pilot-accommodation, workload, usability, and task-performance work.  
**Evidence boundary:** This note inventories defensible mappings. It does not certify a product, create a requirement, or establish that a measure is valid for every population or use.

## Executive findings

1. The current public ASSIST record for the human-engineering design standard is **MIL-STD-1472H, Notice 1**, dated 10 April 2026. The H base revision is dated 15 September 2020. Its criteria can support direct verification only when the applicable clauses are part of the program's contractually selected and tailored requirements.
2. The current aircraft airworthiness handbook is **MIL-HDBK-516D**, dated 29 May 2026—not MIL-HDBK-516C. The handbook explicitly states that it is guidance and cannot itself be cited as a requirement. A program may use it to develop an authority-approved certification basis and means of compliance.
3. **MIL-HDBK-87213B, Notice 1**, dated 10 December 2024, is the most detailed public DoD source located for airborne electronic/optical display verification methods. It too is guidance, contains sample specification language and blanks, and leaves some HMD verification paragraphs marked TBD. Its methods are useful; its sample values are not automatically requirements.
4. The strongest defensible verification package combines instrumented physical measurements, representative-user task performance, human-in-the-loop evaluation, and traceability to a tailored requirement. A questionnaire by itself is not proof of compliance, safety, or mission effectiveness.
5. The FAA's current general flight-deck human-factors reference is **Human Factors Considerations in the Design and Evaluation of Flight Deck Displays and Controls, Version 3.0** (2024). It recommends pairing objective and subjective measures and supplies evaluation procedures, but it is not an automatic means of compliance.
6. NASA-TLX, Bedford, Cooper-Harper, SSQ, SART, and similar scales can be useful supporting measures in their proper constructs. They do not replace observable performance, physical display measurements, error analysis, or an applicable acceptance criterion.

## How to read a standards mapping

Each proposed mapping should carry one of these labels in the measurement finder:

- **Direct criterion:** the source contains an applicable design or performance criterion. This label is only defensible after confirming the exact revision, clause, system scope, contract/certification basis, tailoring, and acceptance condition.
- **Means-of-compliance guidance:** the source describes a possible analysis, inspection, demonstration, simulation, ground test, or flight test. It does not itself impose the requirement.
- **Supporting evidence:** the measure can help characterize performance, workload, sickness, usability, or a causal mechanism, but the source does not say that the measure alone verifies the requirement.
- **Context only:** the source defines an environmental, safety, or process context. It is not a human-performance measure.
- **Unverified mapping:** a plausible relationship lacks accessible clause-level evidence. It must not appear as a confirmed standards mapping.

The minimum traceability chain is:

> operational scenario → user task → required decision/information/control → applicable requirement → test condition → measure and acceptance criterion → evidence artifact → result and discrepancy disposition

### Confidence and access coding used in this note

- **High / public full text:** official revision/status metadata and the cited clause or report passage were inspected. Clause-level entries in the measure inventory use this level unless stated otherwise.
- **High for metadata, not clause content:** the official status/scope record was inspected but the current document text is controlled. MIL-STD-1787D and MIL-STD-1797B are in this category; their clause-level content is not represented.
- **Guidance-only confidence:** the source and passage are verified, but its legal/engineering role is non-normative until selected in an approved program basis. MIL-HDBK-516D and MIL-HDBK-87213B are in this category.
- **Unresolved:** current authoritative text/status or a precise locator was not verified. MIL-STD-411 and the candidate NATO documents are in this category and must not be shown as confirmed mappings.

## Current official documents and claim boundaries

| Artifact | Current revision/status verified from official source | What it contributes | Claim boundary | Official source |
|---|---|---|---|---|
| MIL-STD-1472 | **MIL-STD-1472H, Notice 1**, 10 Apr 2026; base H, 15 Sep 2020; active | Human-engineering design criteria, including displays, HUD/HMD, anthropometry, workload, and simulators | A clause is a direct criterion only if applicable and selected/tailored for the program. Demonstrated task suitability may count only as allowed by §4.5.1 and the procuring activity. | [ASSIST record](https://quicksearch.dla.mil/qsdocdetails.aspx?ident_number=36903) |
| MIL-HDBK-516 | **MIL-HDBK-516D**, 29 May 2026; active | Airworthiness certification-criteria framework and candidate methods of compliance, including crew systems, displays, control accommodation, alerts, and handling qualities | The handbook states that it is guidance only and cannot be cited as a requirement. Do not write “516D compliant”; identify the approved criterion and means of compliance. | [ASSIST record](https://quicksearch.dla.mil/qsDocDetails.aspx?ident_number=212162) |
| MIL-STD-46855 | **MIL-STD-46855A, Notice 3**, 23 Sep 2025; base A, 24 May 2011; active | Human-engineering program tasks, task/workload analysis, test planning, representative users, quantitative measures, and discrepancy analysis | Program/process requirements must be invoked and tailored. It does not make a named questionnaire universally required. | [ASSIST record](https://quicksearch.dla.mil/qsdocdetails.aspx?ident_number=113938) |
| MIL-HDBK-87213 | **MIL-HDBK-87213B, Notice 1**, 10 Dec 2024; base B, 2 Mar 2020; active | Aircraft-display measurement and verification guidance for legibility, photometry, HUD/HMD geometry, imagery, color, NVIS, latency, and related characteristics | Guidance only. Sample specification paragraphs include blanks; some HMD verification paragraphs are TBD. Do not adopt example numbers without a program requirement. | [ASSIST record](https://quicksearch.dla.mil/qsDocDetails.aspx?ident_number=123715) |
| MIL-STD-3009 | **MIL-STD-3009, Notice 2**, 4 Apr 2024; base, 2 Feb 2001; active | NVIS-compatible aircraft lighting, illuminated controls, and display-emission compatibility | Applies to NVIS compatibility, not all cockpit-lighting or general legibility questions. | [ASSIST record](https://quicksearch.dla.mil/qsDocDetails.aspx?ident_number=209352) |
| MIL-STD-1787 | **MIL-STD-1787D**, 16 Mar 2018; active | Aircraft display symbology scope, including primary flight-reference formats and symbol content/geometry | Public ASSIST metadata was available, but the D text is controlled (distribution statement D). No clause-level mappings were made here. | [ASSIST record](https://quicksearch.dla.mil/qsDocDetails.aspx?ident_number=37143) |
| MIL-STD-1797 | **MIL-STD-1797B, Notice 1**, 9 Apr 2012; base B, 15 Feb 2006; active | Military piloted-aircraft flying/handling qualities and mission performance | The B text is controlled. Cooper-Harper is relevant to handling qualities, but no clause-level 1797B claim is made here. | [ASSIST record](https://quicksearch.dla.mil/qsDocDetails.aspx?ident_number=70037) |
| MIL-STD-1474 | **MIL-STD-1474E, Notice 2**, 11 Mar 2025; base E, 15 Apr 2015; active | Acoustic limits and testing relevant to personnel safety, speech intelligibility, and detection | Exact acceptance claims require inspection and invocation of the applicable clause; this pass did not create a detailed acoustic crosswalk. | [ASSIST record](https://quicksearch.dla.mil/qsDocDetails.aspx?ident_number=36905) |
| MIL-STD-810 | **MIL-STD-810H, Change 1**, 18 May 2022; active | Environmental tailoring and laboratory-test context | Defines environmental exposures; it is not a usability scale or a substitute for human-performance evidence. | [ASSIST record](https://quicksearch.dla.mil/qsDocdetails.aspx?ident_number=35978) |
| MIL-STD-882 | **MIL-STD-882E, Change 1**, 27 Sep 2023; active | System-safety process and hazard-risk traceability | Useful for linking human error and crew-system hazards to risk controls; it is not a psychometric measure. | [ASSIST record](https://quicksearch.dla.mil/qaDocDetails.aspx?ident_number=36027) |
| FAA flight-deck HF reference | **Version 3.0**, DOT/FAA/AM-24/23, 2024 | Current FAA reference for human-factors design/evaluation questions and methods across flight-deck controls and displays | Reference/guide, not an automatic means of compliance. Its applicability depends on the certification project and regulation. | [ROSA P record](https://rosap.ntl.bts.gov/view/dot/87936), [official PDF](https://rosap.ntl.bts.gov/view/dot/87936/dot_87936_DS1.pdf) |
| FAA AC 25-11 | **AC 25-11B**, 7 Oct 2014; active | Transport-airplane electronic flight-deck display guidance: viewability, luminance, contrast, color, response, glare/reflection, text and symbols | Applies within its stated civil certification scope and is an acceptable method, not the only method. | [FAA record](https://www.faa.gov/regulations_policies/advisory_circulars/index.cfm/go/document.information/documentID/1025969) |
| FAA AC 25.1302 | **AC 25.1302-1**, 3 May 2013; active | Flightcrew-interface design, intended tasks, integration, and design-related error | Applies to the cited Part 25 regulation; it does not certify a military system. | [FAA record](https://www.faa.gov/regulations_policies/advisory_circulars/index.cfm/go/document.information/documentID/1021086) |
| FAA AC 20-175 | **AC 20-175**, 8 Dec 2011; active | Flight-deck control devices, including task workload, error rate, and speed/accuracy evidence | Certification guidance in its stated scope; not a universal control-usability threshold. | [FAA record](https://www.faa.gov/regulations_policies/advisory_circulars/index.cfm/go/document.information/documentid/1019692) |
| FAA Human Factors Design Standard | **DOT/FAA/HF-STD-001B**, Dec 2016 | FAA human-factors criteria for workload/design evaluation, displays, HUD/HMD/see-through displays, workplace design and anthropometry/biomechanics | An FAA organizational design standard, not an automatic military-airworthiness requirement. Confirm the program/organization that invokes it. | [Official FAA PDF](https://hf.tc.faa.gov/publications/2016-12-human-factors-design-standard/full_text.pdf) |
| FAA enhanced-flight-vision guidance | **AC 20-167B**, 8 Sep 2025 | Current enhanced-flight-vision-system guidance | MIL-HDBK-516D §9.4.4.7 names canceled AC 20-167A. Preserve that historical cross-reference but display a supersession warning and use 20-167B for current FAA guidance. | [Official FAA PDF](https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_20-167B.pdf) |
| NASA human spaceflight standard | **NASA-STD-3001 Volume 2, Revision F**, 14 Jul 2026; active | Supplemental HITL/task/usability/workload/SA/legibility and display-performance benchmark | Human spaceflight standard, not automatically applicable to aircraft or military airworthiness. Use only when invoked or as clearly labeled supplemental context. | [NASA standards record](https://standards.nasa.gov/node/237) |

### Other official sources reviewed

- [FAA Human Factors in Aviation Safety](https://www.faa.gov/aircraft/air_cert/design_approvals/human_factors) currently points to Version 3.0 of the flight-deck human-factors report. Older FAA pages and AC 00-74 point to Version 2; Version 3.0 is the current reference located in this pass.
- [AC 25-7D, Change 1](https://www.faa.gov/regulations_policies/advisory_circulars/index.cfm/go/document.information/documentid/1033309) supports transport-airplane flight-test evaluation, including handling qualities, within its stated scope.
- [AC 23.1311-1C](https://www.faa.gov/regulations_policies/advisory_circulars/index.cfm/go/document.information/documentID/1019680) addresses electronic displays in the legacy Part 23 context.
- [AC 25.1322-1](https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_25.1322-1.pdf) addresses flightcrew alerting in its stated certification scope.
- [AC 20-185A](https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_20-185A.pdf) addresses synthetic-vision and ASA-SVS applications in its stated certification scope.
- NATO states that promulgated STANAGs are managed through the [NATO Standardization Document Database](https://www.nato.int/cps/en/natohq/stanag.htm). No current, public, clause-level NATO text directly supporting this crosswalk was verified. STANAG 3370 is therefore an unresolved lead, not a confirmed mapping.

### Supplemental NASA-STD-3001 Volume 2 measures

The active Revision F record supplies useful spaceflight-specific benchmarks: §3.2 [V2 3006] addresses task analysis and iterative human-in-the-loop assessment; §§5.1.1–5.1.7 address time/accuracy, NMSUS usability, error rate, Bedford workload, Borg CR10 physical exertion, SAGAT/SART situation awareness and legibility; §10.2.3 [V2 10152] gives a display-latency criterion for piloting/time-critical tasks; and §10.4.2.4 [V2 10048] covers visual-display resolution, brightness, contrast, gamut, ambient light, glare, reflection, vibration and position. These are not aircraft requirements unless an authorized program adopts them.

## Source-backed measure and evidence inventory

The table names a measure family, not a guarantee that a particular instrument is reliable, valid, licensed for reuse, or appropriate for a given decision.

| Need / measure family | What to record | Source-backed relationship | Evidence artifacts | Mapping strength |
|---|---|---|---|---|
| Task completion and mission performance | Success/failure, completion time, steps, sequence, accuracy, omissions, commissions, recovery, interruption and assistance | MIL-STD-1472H §§4.2.3–4.2.4; MIL-STD-46855A §§5.1.2–5.1.2.3 and §§5.3–5.3.3; FAA Version 3.0 Appendix B and Appendix C.6 | Time-stamped event log, observer record, system log, video, scoring rubric, discrepancy record | Direct where a tailored performance criterion exists; otherwise supporting evidence |
| Human error and recoverability | Error type, precursor, detection, consequence, recovery path, time to recover, residual hazard | MIL-STD-46855A §5.3.3 requires failure/error analysis and differentiation among equipment, human-system incompatibility, and human error; MIL-STD-882E supplies safety-process context | Error taxonomy, causal analysis, hazard-log link, scenario replay, corrective-action disposition | Direct program-process evidence when invoked; safety linkage otherwise contextual |
| Workload: multi-source | Objective performance plus subjective workload, separated by mental, visual, auditory, motor, temporal, communication and stress contributors | MIL-STD-1472H §4.2.3; MIL-STD-46855A §5.1.2.3; FAA Version 3.0 Appendix B recommends objective and subjective data | NASA-TLX or Bedford response, task/error/time data, dual-task or resource-specific measures, observer notes | Supporting evidence; no questionnaire alone proves acceptable workload |
| NASA Task Load Index | Six ratings: mental demand, physical demand, temporal demand, performance, effort, frustration; administration/scoring version must be recorded | NASA's [official TLX page](https://www.nasa.gov/human-systems-integration-division/nasa-task-load-index-tlx/) defines the six subscales; FAA Version 3.0 discusses subjective workload alongside objective performance | Raw item ratings, weighting procedure if used, score calculation, collection timing, concurrent performance | Supporting evidence only |
| Bedford workload scale | Pilot-rated spare mental capacity / workload using the exact version and training | FAA Version 3.0 Appendix C.6 identifies Bedford as a workload metric and states that participants should be trained on the scale | Rating, decision path, rater training record, task condition, performance data | Supporting evidence only |
| Handling qualities | Pilot control difficulty and compensation in a specified aircraft/task/environment; do not relabel as general workload | FAA Version 3.0 Appendix C.6 identifies Cooper-Harper as a handling-qualities scale, not a workload scale; MIL-HDBK-516D §6.1.3 relates critical display characteristics to flying qualities; MIL-STD-1797B is the relevant controlled military scope | Cooper-Harper decision path/rating, pilot comments, task performance, control activity, vehicle state, configuration | Potential criterion evidence only within the approved handling-qualities basis; otherwise supporting |
| Flight technical performance | Localizer/glideslope error, RMS error, maximum deviation, threshold crossing height, touchdown point, sink rate, rollout centerline error, taxi speed/time, takeoff tracking | NASA/TP-2017-219623 used these measures in a low-visibility HWD/HUD-equivalence experiment | Synchronized aircraft-state data, approach/landing event markers, derived-metric script, trace plots | Supporting empirical measures; acceptance thresholds must come from the program/test basis |
| Display luminance and dimming | Luminance at defined eye point, target and background, range, dimming ratio, ambient condition, spectral/temporal settings | MIL-STD-1472H §§5.2.1.2.1–5.2.1.2.3 specify adjustability, minimum luminance, and ambient coverage; MIL-HDBK-87213B §4.2.1.6 describes spot-photometer measurement; AC 25-11B addresses luminance/viewability | Calibrated photometer data, measurement geometry, ambient illumination, dimming-command data, uncertainty budget | Direct for invoked 1472H criterion; 87213B/FAA are guidance |
| Display contrast | Target/background luminance and contrast formulation, polarity, color, font/line, ambient illumination and viewing geometry | MIL-STD-1472H §5.2.1.3 and §5.2.2.7; MIL-HDBK-87213B §4.2.1.6; FAA Version 3.0 Appendix C.1 | Photometric readings, contrast calculation, ambient/light-source record, calibrated images, task-legibility results | Direct for invoked 1472H criterion; supporting for task-level legibility |
| Luminance uniformity | Maximum, minimum, spatial map, ratio and measurement grid | MIL-STD-1472H §5.2.2.4 | Calibrated luminance map, point data, ratio calculation, warm-up/configuration record | Direct for invoked criterion |
| Glare, reflection and veiling effects | Specular and diffuse reflection, source geometry, surface state, ambient level, observer position, visibility impact | MIL-STD-1472H §§5.2.1.4.2–5.2.1.4.3; FAA Version 3.0 Appendix C.1; AC 25-11B | Reflectance/photometric test, controlled light-source geometry, representative-user viewability trial | Direct for invoked 1472H criterion; FAA guidance in its scope |
| Character/symbol legibility | Character/symbol height in visual angle, stroke/line width, spacing, font, luminance/contrast, viewing distance/angle and recognition error | MIL-STD-1472H §§5.2.2.7 and 5.2.2.15.9.1–5.2.2.15.9.7; FAA Version 3.0 Appendix C.1; AC 25-11B | Angular-size calculation, optical measurement, recognition/reading accuracy and time, viewing-envelope test | Direct for invoked 1472H criteria; task evidence strengthens verification |
| Spatial resolution / image quality | Pixel/angular resolution, CTF/MTF, grayscale discrimination, line-pair or target-recognition performance, viewing distance and optical condition | MIL-HDBK-87213B verification topics include resolution and CTF/MTF; MIL-STD-1472H §5.2.2.16 includes HMD grayscale and mission-derived FOV/FOR | Optical-bench data, MTF/CTF curve, standardized target images, recognition performance | Guidance/supporting unless a tailored requirement supplies the criterion |
| Flicker, jitter, refresh and update | Jitter amplitude and time window, refresh/update rate, dropped frames, flicker frequency, exposure duration and task effect | MIL-STD-1472H §§5.2.2.2–5.2.2.3 and §§5.12.1.4.2–5.12.1.4.4 | High-speed video/photodiode/oscilloscope trace, frame-timing log, instrument calibration, user performance/symptom report | Direct for invoked 1472H criteria |
| End-to-end latency / motion-to-photon | Stimulus or motion input to correct rendered/displayed response, distribution not only mean, phase/task/configuration | MIL-STD-1472H §§5.12.1.4.1.1–5.12.1.4.1.2 and §5.12.1.4.4; MIL-HDBK-516D §§6.1.3 and 11.3.3.2; MIL-HDBK-87213B §4.1 | Synchronized high-speed camera or electronic timing, input/display timestamps, percentile distribution, piloted task test | Direct only where the applicable program criterion is invoked; otherwise guidance/supporting |
| HUD field of view and eye box | Horizontal/vertical FOV, look angles, eye-box dimensions, eye positions, occlusion, task coverage | MIL-STD-1472H §5.2.2.15.4; MIL-HDBK-87213B §4.2.1.25.1 recommends measurements from eye positions, normally with a theodolite | Theodolite/fixture data, eye-position model, measured volume, photographs/drawings, representative-user task check | Direct for invoked 1472H criterion; handbook method is guidance |
| HUD registration, parallax, distortion and boresight | Angular error by eye point and field angle, combiner displacement/distortion, dynamic/static alignment | MIL-STD-1472H §5.2.2.15.5; MIL-HDBK-87213B §§4.2.1.25.2 and 4.2.1.25.4.3–4.2.1.25.4.7 | Theodolite/precision-fixture results, error maps, calibration record, environmental configuration, flight confirmation where applicable | Direct for invoked 1472H criterion; 87213B supplies candidate methods |
| HUD luminance and combiner transmission | Symbol/raster luminance, ambient background, combiner transmission/reflection, viewing position | MIL-STD-1472H §§5.2.2.15.3 and 5.2.2.15.9.5–5.2.2.15.9.6; MIL-HDBK-87213B §§4.2.1.25.7–4.2.1.25.9 | Spectroradiometer/photometer data, solar/ambient simulator, combiner transmission/reflection data | Direct for invoked 1472H criteria; handbook methods are guidance |
| HMD FOV/FOR and real-world access | Mission/task-derived FOV and field of regard, unobstructed access to real world/controls/displays, peripheral vision, search/recognition/spatial orientation | MIL-STD-1472H §5.2.2.16; MIL-HDBK-87213B §4.2.1.26 topics include eye relief, exit pupil and peripheral vision | Optical geometry, perimetry/field drawings, search/recognition task data, control-access demonstration | 1472H contains direct design criteria; 87213B HMD methods are incomplete and partly TBD |
| HMD head tracking and conformality | Tracker static/dynamic accuracy, lag, registration/conformality over head pose, dropout/reacquisition | MIL-HDBK-87213B §4.2.1.26 includes head-tracker accuracy and lag; MIL-STD-1472H HMD and simulator-latency clauses provide related task/sensory constraints | Optical/reference tracker, pose-swept error map, end-to-end latency, dropout log, representative task test | Guidance/supporting unless a program requirement provides thresholds |
| HMD fit, weight, center of gravity and neck burden | Mass, CG/moments, pressure/contact, fit range, stability, restriction, discomfort/fatigue, performance over mission duration | MIL-STD-1472H §5.2.2.16 requires balanced distribution and minimization of neck strain/fatigue/movement; MIL-HDBK-87213B §4.2.1.26 calls for mission-context human-factors study rather than a universal weight limit | Instrumented mass/CG, fit checks, range-of-motion, endurance/task trial, discomfort/fatigue ratings, representative protective gear | Direct qualitative design objective if invoked; no universal numeric cutoff was verified |
| NVIS compatibility | NVIS radiance, chromaticity, luminance/contrast, readability and interference with actual NVG/configuration | MIL-STD-3009; MIL-HDBK-516D §9.2.1.1 calls for night/dark evaluation using representative helmet/clear visor and MIL-STD-3009; MIL-HDBK-87213B includes NVIS verification topics | Spectroradiometric data, NVG-compatible lighting configuration, representative-user read/detect task, dark-condition demonstration | Direct only for invoked MIL-STD-3009 clauses; 516D/87213B provide guidance |
| Optical filters and visors | Clarity, color/color contrast, spectral transmittance, luminous contrast, acuity effect under representative combinations | MIL-STD-1472H §§5.13.2.13.1.2–5.13.2.13.1.3 | Spectral transmittance, photometry, acuity/recognition test, all operational filter/visor/display combinations | Direct for invoked criteria |
| Visual alert detection and action | Detect, distinguish, identify, interpret and take correct action across lighting, workload, stress and optical gear | MIL-HDBK-516D §9.2.8.4 | Instrumented lab/HITL/ground/flight trials, response time, accuracy, miss/false-alarm/error analysis | Means-of-compliance guidance for a tailored certification criterion |
| Speech intelligibility | Correctly identified words or standardized transmission metric under representative noise, communications chain and gear | MIL-HDBK-516D §9.2.7.1 identifies at least 80% Modified Rhyme Test or STIPA 0.41, with a limitation on STIPA where vocoders or center clipping are used | MRT trial, STIPA measurement where allowed, full audio chain/configuration/noise record, participant descriptors | Candidate 516D certification criterion/method; handbook still cannot itself be cited as a requirement |
| Alert timing | End-to-end event-to-alert delay and message presentation duration | MIL-HDBK-516D §11.3.1.2 gives candidate safety-critical warning and message-timing criteria and cites MIL-STD-411 | Electronic timing trace, fault injection, event/alert timestamps, lab/ground/flight evidence | Guidance pending an approved certification criterion; current MIL-STD-411 revision must be separately verified |
| Anthropometric accommodation | Multivariate user coverage, body dimensions, clothing/equipment, reach, clearance, vision, ingress/egress, adjustability and boundary cases | MIL-STD-1472H §§5.8.3.1–5.8.4; MIL-HDBK-516D §§9.2.1.3 and 9.2.2.1 | Population/database rationale, multivariate boundary cases, digital model, production-representative mockup or aircraft demonstration, representative gear | Direct for invoked 1472H criteria; 516D adds means-of-compliance guidance |
| Simulator fidelity and representative task demand | Same tasks, decisions, vulnerabilities, workload/stress drivers, failures and degraded modes as operational use | MIL-STD-1472H §5.12.1.4.6; MIL-STD-46855A §§5.3.1–5.3.2 | Scenario specification, task traceability, simulator configuration, fidelity limitations, discrepancy log, performance comparison | Direct/supporting depending on invoked criteria and intended use of simulator evidence |
| Simulator sickness | Symptom incidence/severity and operational impact, linked to latency, flicker, update, visual motion and exposure | MIL-STD-1472H §5.12.1.4 identifies sensory-conflict design concerns; NASA/TP-2017-219623 used the Simulator Sickness Questionnaire | Pre/post and repeated SSQ, dropout/adverse-event log, exposure duration, latency/refresh configuration, recovery time | SSQ is supporting evidence, not a standalone 1472H pass/fail test |
| Situation awareness | Task-state knowledge and decision performance; subjective SA ratings only as complementary evidence | NASA/TP-2017-219623 used SART and SA-SWORD in an HWD/HUD experiment | Objective event/task probes where feasible, decision accuracy/time, SART/SA-SWORD ratings, scenario timestamps | Supporting empirical evidence; no direct universal standard mapping verified |
| Eye tracking / visual scanning | Gaze availability/quality, fixation or dwell definitions, AOI logic, head pose, occlusion, dropouts and relation to task performance | NASA/TP-2017-219623 attempted eye tracking but reported roughly 70% bad gaze quality because the HWD obstructed the cameras | Raw/filtered gaze, data-quality report, calibration, dropout map, synchronized task events | Diagnostic/supporting only; gaze does not by itself establish comprehension or acceptable workload |
| Physical exertion | Perceived exertion with the exact Borg scale/version, task demand, body region and duration | NASA-STD-3001 Volume 2 Revision F §5.1 includes Borg CR10 in its human-spaceflight measures | Raw rating, scale instructions, collection timing, task duration, concurrent biomechanical/performance data | Direct only if NASA-STD-3001 applies; supplemental otherwise |

## Important exact MIL-STD-1472H criteria for the finder

These clauses were inspected in the public standard. Store the exact section and revision with any record; do not detach the number from its test conditions.

### System performance and workload

- **§4.2.3:** user workload—including accuracy, time, cognitive and communication demands—must not exceed user capabilities.
- **§4.2.4:** specified user capabilities must enable achievement of system measures of effectiveness and performance.
- **§4.5.1:** design compliance is the default; evidence of suitability and task performance can be used as permitted by the procuring activity.
- **§4.20.2:** programs should measure human performance and performance-shaping factors early and during test and evaluation.

### General visual-display measurements

- **§5.2.1.2.1:** display luminance adjustability ratio of at least 50:1.
- **§5.2.1.2.2:** minimum display luminance of 35 cd/m².
- **§5.2.1.2.3:** adjustment across the expected ambient-illumination range.
- **§5.2.1.3:** target/background contrast must remain visible across the expected ambient range.
- **§§5.2.1.4.2–5.2.1.4.3:** limits for specular and diffuse reflection; test geometry and units must be preserved with the result.
- **§5.2.2.2:** geometric instability/jitter criterion over a one-second interval.
- **§5.2.2.4:** luminance-uniformity ratio, with a preferred tighter ratio.
- **§5.2.2.7:** minimum and preferred character-to-background contrast ratios.

### HUD

- **§5.2.2.15:** addresses compatibility with the outside-view task, information limitation, windshield transmission, eye box, angular displacement, symbol geometry, luminance and line width.
- **§§5.2.2.15.9.1–5.2.2.15.9.4:** angular height and raster-line criteria for alphanumeric and non-alphanumeric symbols.
- **§§5.2.2.15.9.5.1–5.2.2.15.9.5.2:** symbol-luminance criteria under direct-sun/high-ambient backgrounds.
- **§§5.2.2.15.9.6–5.2.2.15.9.7:** luminance adjustment and line width.

### HMD and simulators

- **§5.2.2.16:** covers HMD symbol placement, grayscale, mission/task-derived FOV/FOR, real-world and control access, clutter reduction, cognitive load, symbology, helmet vibration, weight distribution, stability and binocular/eye-dominance considerations.
- **§§5.12.1.4.1.1–5.12.1.4.1.2:** simulator system-transport-delay and HMD-latency criteria, including more stringent preferred values.
- **§§5.12.1.4.2–5.12.1.4.4:** flicker, refresh, scene-update and critical fast-stimulus criteria.
- **§5.12.1.4.6:** psychological fidelity includes tasks, decisions, vulnerabilities, workload and stress.

The interface should display the full criterion context on demand. A bare number without the source, section, test condition, unit and tailoring status is unsafe to use.

## MIL-HDBK-516D airworthiness evidence bundles

The following are candidate criteria and methods that an airworthiness authority may select and tailor. They are not requirements merely because they appear in the handbook.

- **§6.1.3, display characteristics:** analysis/simulation, piloted simulation or laboratory work, and flight test can assess whether displays critical to a mission-task element degrade flying qualities beyond the approved level. Latency should be assessed across relevant phases, loading, configurations and environments.
- **§9.2.1.1, control/display readability:** demonstrations should cover the design eye, representative helmet/visors, bright full-sun and night/dark conditions, and lighting extremes at the control station.
- **§9.2.1.3, interior field of view:** design-eye analysis plus representative-population/equipment mockup and flight-task visibility evidence.
- **§9.2.2.1, control accommodation:** production-representative human-in-the-loop mockup or aircraft evidence for the intended anthropometric population, reach, clearance, seats, restraints and equipment.
- **§9.2.7.1, speech intelligibility:** Modified Rhyme Test and, where technically valid, STIPA are candidate means with stated values in the criterion.
- **§§9.2.8.2–9.2.8.4, alerts:** perception, recognition, discrimination and correct action under concurrent stimuli, lighting, optical gear and representative stressors.
- **§11.3.1.2, warning/caution/advisory timing:** electronic timing and lab/ground/flight evidence for the approved alerting criterion.
- **§§11.3.2 and 11.3.3, safety-critical information and controls:** document review, safety analysis, failure analysis, lab/ground/flight test, reliability analysis and end-to-end response measurement.

For each 516D-linked record, store the approving authority, selected criterion, tailoring rationale, means of compliance, configuration, evidence reference and closure status.

## FAA evaluation method inventory

FAA Version 3.0 Appendix B recommends representative normal, non-normal and failure scenarios and explicitly recommends collecting both objective and subjective data. It identifies objective measures such as task time, steps, accuracy and errors/missteps. The report explains that preference can diverge from performance and that people are not reliable estimators of their own response times and errors.

Appendix C.1 provides a broad flight-deck evaluation checklist. Measurement-finder categories supported there include:

- display size and resolution;
- luminance, contrast, grayscale and chromaticity;
- glare, reflections, defects, refresh, update and response;
- day/night lighting, brightness adjustment and viewing envelope;
- text and symbol size, font, spacing, color, contrast, illumination and legibility;
- overlays, declutter, control accessibility, labeling and tactile qualities;
- turbulence, vibration and bright-light operation;
- workload, fatigue, errors, modes, recovery and training.

Appendix C.6 describes Bedford, Cooper-Harper and a modified Hindson safety/hazard scale and provides observer-oriented metrics such as task steps, elapsed time, interruptions, hesitation, corrections, reaches, reading/force demands, head-down time, help/search behavior, frustration and label interpretation. The FAA also notes limitations in example cards, including ambiguous “acceptable” wording, excessive response choices and nonspecific control/display criteria. Those example forms should not be copied into a pass/fail tool without resolving those limitations.

## NASA HWD/HUD study as an example—not a standard

[NASA/TP-2017-219623](https://ntrs.nasa.gov/citations/20170007195), *Evaluation of a Head-Worn Display System as an Equivalent Head-Up Display for Low Visibility Commercial Operations*, is a useful example of a multi-method evaluation. It combined:

- approach, touchdown, rollout, taxi and takeoff performance;
- localizer/glideslope RMS and maximum deviation;
- AFFTC workload ratings, NASA-TLX and SSQ;
- SART and SA-SWORD;
- comfort, optical-performance, boresight, brightness, color, conformality and usability ratings; and
- eye tracking, with a prominent data-quality failure because the display obstructed the cameras.

This study demonstrates an evidence pattern, not universal thresholds or a universal HMD validation. Its population, equipment, scenarios, display configuration and stated limitations must travel with any study-use record.

## Recommended measurement-finder record schema

### Identity and construct

- Stable measure ID, name, acronym, version and instrument owner.
- Construct actually measured; do not substitute “workload,” “usability,” “situation awareness” and “handling qualities.”
- Objective, subjective, observer-rated, physical/photometric, physiological or model-derived evidence type.
- Unit, scale range, anchors, directionality, scoring algorithm and missing-data rule.

### Administration and applicability

- Population, expertise, training, sample size and inclusion/exclusion.
- Platform, mission phase, task, failure/degraded mode and concurrent tasks.
- Environment: illumination, vibration/turbulence, noise, motion, temperature, altitude where relevant.
- Personal equipment: helmet/HMD, visor/filter, NVG, oxygen mask, gloves, clothing and restraints.
- Exact collection timing, repetition, duration, counterbalancing and adverse-event procedure.

### Scientific-quality fields

- Reliability evidence by type: internal consistency, test-retest, inter-rater, alternate-form, measurement error. Never expose one coefficient as generic “reliability.”
- Validity evidence by type: content, response process, internal structure/factor evidence, relations with other variables, known-groups/criterion evidence, and consequences of use.
- Factor model: sample, estimator, ordinal/continuous treatment, factor count, item loadings/cross-loadings, residuals, fit indices, invariance groups and model changes.
- Responsiveness/sensitivity, floor/ceiling effects, minimal detectable change or meaningful-change evidence where established.
- Population/language/version transfer limits and whether the cited evidence studied the same intended use.

### Study-use instance

- Full citation and persistent link.
- Study design, sample, platform, scenario and measure version.
- How administered and scored; modifications from the original.
- Role in the study: endpoint, manipulation check, covariate, screen, diagnostic or descriptive measure.
- Result with uncertainty/effect size where reported.
- Why the use was defensible, limitations, and any observed misuse. This evaluative field should cite evidence and distinguish author statements from repository synthesis.

### Standards mapping object

Each mapping should include:

```text
document_title
exact_revision_and_notice
status_as_of_date
section_or_paragraph
mapping_type: direct_criterion | means_of_compliance_guidance | supporting_evidence | context_only | unverified
applicable_system_and_task
tailoring_or_certification_basis_required
acceptance_criterion_and_its_source
test_conditions
verification_artifact_types
access_status: public_full_text | public_metadata_only | controlled | unresolved
last_verified_date
official_url
analyst_note_and_confidence
```

The interface should prevent `public_metadata_only`, `controlled`, and `unverified` records from being displayed as clause-confirmed mappings.

## Practical high-priority measures for the demonstration

For a same-day demonstration, the most useful initial finder set is:

1. Task success, time, accuracy, steps, errors and recovery.
2. NASA-TLX and Bedford, always shown beside objective performance.
3. Cooper-Harper, explicitly labeled handling qualities rather than workload.
4. Display luminance, contrast, uniformity, reflection/glare, character angular size and line width.
5. Refresh/update, jitter/flicker and end-to-end latency.
6. HUD eye box/FOV, parallax, registration, distortion, boresight and combiner transmission.
7. HMD FOV/FOR, head-tracker error/lag, fit, weight/CG, real-world/control access and neck burden.
8. NVIS radiance/chromaticity and NVG-configured readability.
9. Anthropometric accommodation, reach, clearance and field of view with representative gear.
10. Modified Rhyme Test/STIPA for speech intelligibility, with the 516D technical limitation visible.
11. SSQ with exposure, latency, refresh and dropout context.
12. Flight technical error, approach/landing/rollout measures and task-linked situation-awareness evidence.

Useful filters are **standard/document**, **mapping strength**, **cockpit/HUD/HMD/simulator**, **objective/subjective/physical**, **mission phase**, **lighting/NVIS**, **human-performance construct**, **public-access status**, and **verification artifact**.

## Claims the repository should not make

- A named measure is “MIL-STD-1472 compliant.” A measure produces evidence; the configured system is evaluated against an applicable criterion.
- A system is “MIL-HDBK-516D compliant.” The handbook is guidance, not a requirement.
- A value in MIL-HDBK-87213B is a universal threshold. It contains sample specification content, blanks and unresolved HMD verification text.
- A mapping to MIL-STD-1787D or MIL-STD-1797B is clause-verified from public text. Only public metadata/scope was verified here.
- NASA-TLX, Bedford, SSQ, SART or a usability rating alone proves safety, acceptable workload, mission effectiveness or certification compliance.
- Cooper-Harper is a general workload scale. It is a handling-qualities rating method.
- Eye-tracking dwell or fixation proves comprehension or situation awareness.
- A NASA/FAA study threshold automatically transfers to a fighter aircraft, a different display, a different task or an operational acceptance decision.
- “MIL-STD-516C” is the current airworthiness handbook. The current public ASSIST record is MIL-HDBK-516D.
- An FAA advisory document automatically applies to a military acquisition or establishes the only acceptable method.

## Open research and access gaps

1. Verify the current revision and public-access status of MIL-STD-411 before adding a direct alerting crosswalk; MIL-HDBK-516D cites it, but this pass did not establish the current ASSIST record.
2. Obtain authorized access, if available, to the controlled MIL-STD-1787D, MIL-STD-1797B and JSSG-2010-2 texts before creating clause-level mappings.
3. Conduct a separate psychometric review for each questionnaire/version/population. This standards pass does not establish reliability, validity or factor structure for every instrument.
4. Confirm licensing, ownership, permission to reproduce items, and administration manuals before embedding any instrument.
5. Build study-use records from full-text studies, not abstracts, and record modifications and data-quality failures.
6. Confirm project-specific contract requirements, certification basis, authority decisions, tailoring and acceptance criteria before using the finder for verification planning.
7. Add a detailed acoustic/intelligibility crosswalk after inspecting the applicable clauses of MIL-STD-1474E and the exact installed communications chain.
8. Verify candidate NATO records—including STANAG 7201, STANAG 3705, AEP-4685 and STO-AG-300-V36—through the NATO Standardization Documents Database or an authorized source before creating any clause-level mapping.

## Primary references

- U.S. Department of Defense. [MIL-STD-1472H, Human Engineering](https://quicksearch.dla.mil/qsdocdetails.aspx?ident_number=36903), 15 Sep 2020; Notice 1, 10 Apr 2026. Public-PDF pages 22 (§§4.2.3–4.2.4), 107 (§§5.2.1.2–5.2.1.4), 109 (§5.2.2.7), 115–116 (§§5.2.2.15–5.2.2.16), and 239–240 (§§5.8.3–5.8.4) were inspected, as were the simulator clauses cited above.
- U.S. Department of Defense. [MIL-HDBK-516D, Airworthiness Certification Criteria](https://quicksearch.dla.mil/qsDocDetails.aspx?ident_number=212162), 29 May 2026. Sections 6.1.3 (PDF p. 89), 9.2.1.1–9.2.1.3 (PDF pp. 517–519), 9.2.2.1, 9.2.7.1, 9.2.8.2–9.2.8.4 (including PDF pp. 529–530), 9.4.1–9.4.6 (including PDF pp. 548–549), and 11.3 were inspected in the public full text.
- U.S. Department of Defense. [MIL-STD-46855A, Human Engineering Requirements for Military Systems, Equipment, and Facilities](https://quicksearch.dla.mil/qsdocdetails.aspx?ident_number=113938), 24 May 2011; Notice 3, 23 Sep 2025. Sections 5.1.2–5.1.2.3 (PDF pp. 10–11) and 5.3–5.3.3 (PDF pp. 16–17) were inspected.
- U.S. Department of Defense. [MIL-HDBK-87213B, Electronically/Optically Generated Airborne Displays](https://quicksearch.dla.mil/qsDocDetails.aspx?ident_number=123715), 2 Mar 2020; Notice 1, 10 Dec 2024. Sections 4.1, 4.2.1.6, 4.2.1.25 and 4.2.1.26 were inspected.
- FAA. [Human Factors Considerations in the Design and Evaluation of Flight Deck Displays and Controls, Version 3.0](https://rosap.ntl.bts.gov/view/dot/87936), DOT/FAA/AM-24/23, 2024. Appendix B (report pp. 354–356), Appendix C.1 (pp. 364–365) and Appendix C.6 (pp. 381–387) were inspected.
- FAA. [AC 25-11B, Electronic Flight Displays](https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_25-11B.pdf), 7 Oct 2014.
- FAA. [AC 25.1302-1, Installed Systems and Equipment for Use by the Flightcrew](https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_25_1302-1.pdf), 3 May 2013.
- FAA. [AC 20-175, Controls for Flight Deck Systems](https://www.faa.gov/regulations_policies/advisory_circulars/index.cfm/go/document.information/documentid/1019692), 8 Dec 2011.
- FAA. [Human Factors Design Standard, DOT/FAA/HF-STD-001B](https://hf.tc.faa.gov/publications/2016-12-human-factors-design-standard/full_text.pdf), Dec 2016.
- FAA. [AC 20-167B, Airworthiness Approval of Enhanced Flight Vision System Equipment](https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_20-167B.pdf), 8 Sep 2025.
- NASA. [NASA-STD-3001, Volume 2, Revision F](https://standards.nasa.gov/node/237), 14 Jul 2026.
- NASA Human Systems Integration Division. [NASA Task Load Index (TLX)](https://www.nasa.gov/human-systems-integration-division/nasa-task-load-index-tlx/). Official instrument overview accessed 14 Oct 2026.
- Arthur, J. J., et al. [Evaluation of a Head-Worn Display System as an Equivalent Head-Up Display for Low Visibility Commercial Operations](https://ntrs.nasa.gov/citations/20170007195), NASA/TP-2017-219623, 2017. Full report inspected.

## Provenance note

Revision/status claims were checked against official DLA ASSIST, FAA, NASA and NATO pages on 14 October 2026. Clause-level claims were made only where public full text was inspected. Controlled or metadata-only documents are explicitly labeled. The inventory and recommended schema are original synthesis based on those sources.
