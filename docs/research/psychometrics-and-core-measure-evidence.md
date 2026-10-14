# Psychometric evaluation and core measure evidence

**Status:** source-audited research note, not a completed systematic review  
**Last source check:** 2026-10-14  
**Scope:** psychometric evaluation for human-factors, usability, workload and situation-awareness measures, followed by focused evidence dossiers for measures already represented in the Human Engineering Measurement Atlas.

## Evidence boundary

This note separates three kinds of evidence:

- **Original instrument source:** defines the instrument, construct, administration and scoring.
- **Validation or comparison study:** examines measurement properties or compares the instrument with another method.
- **Use study:** shows how an instrument was operationalized in a particular experiment. Use is not, by itself, validation.

A coefficient or factor structure belongs to the population, task, language, administration, scoring rule and instrument version actually studied. It must not be copied into an Atlas profile as though it were a permanent property of the measure. The 2014 *Standards for Educational and Psychological Testing* define validity in relation to the interpretation and use of scores, and organize evidence around test content, response processes, internal structure, relations to other variables and the consequences of testing ([AERA, APA & NCME, 2014, ch. 1, pp. 11–31](https://www.testingstandards.net/uploads/7/6/6/4/76643089/standards_2014edition.pdf)).

The search for this note was deliberately focused rather than exhaustive. It covered official instrument sources, original methods papers, publisher records, NASA/FAA/DTIC/EUROCONTROL technical material and directly relevant primary applications. Secondary reviews were used only to locate original sources, not as the evidentiary basis for instrument claims.

## 1. What makes a measurement argument defensible

### 1.1 Start with the proposed interpretation and decision

Do not begin with a favorite questionnaire. State:

1. the construct and its boundary;
2. the intended population, task and environmental conditions;
3. the unit of analysis;
4. the score and scoring rule;
5. the comparison or decision the score will support; and
6. the consequences of a false positive, false negative or non-invariant score.

Examples:

- A NASA-TLX score can support an inference about **reported workload for a defined task and administration**, not a direct inference that an interface is unsafe.
- A SUS score can support an inference about **perceived overall usability after system exposure**, not an inference that a pilot can detect an alert or read a symbol at a required luminance contrast.
- A Cooper–Harper rating can support an inference about **handling qualities for a specified task with declared desired and adequate performance criteria**, not general interface satisfaction.
- Eye position directly supports an inference about recorded gaze direction after calibration and data-quality checks; fixation does not by itself establish comprehension or situation awareness.

### 1.2 Five sources of validity evidence

The 2014 *Standards* treat validity as a cumulative argument, not a set of interchangeable labels ([AERA, APA & NCME, 2014, pp. 13–22](https://www.testingstandards.net/uploads/7/6/6/4/76643089/standards_2014edition.pdf)). For human-systems measures, the five evidence sources translate as follows.

| Evidence source | Aviation/human-factors question | Suitable evidence | Failure mode |
| --- | --- | --- | --- |
| Content | Do the items/tasks cover the construct and operational domain? | Task analysis, SME review, content map, missing-domain review | A generic usability scale is presented as complete coverage of flight-deck usability |
| Response process | Are respondents using the intended judgment process? | Cognitive interview, think-aloud during development, comprehension probe, timing and missingness | Pilots interpret “performance” as aircraft performance while the researcher intended self-performance |
| Internal structure | Do item relations support the proposed score? | EFA, CFA, residual diagnostics, reliability conditional on dimensionality | A multidimensional index is forced into a reflective one-factor model because alpha is available |
| Relations to other variables | Are pre-specified convergent, discriminant, criterion and known-groups relations observed? | Correlation/regression with task performance, alternate measures and manipulated demand | High correlation with another self-report is treated as proof of objective operational validity |
| Consequences | What follows from use of the score or cutoff? | Classification error, subgroup impact, decision analysis, false-alarm/miss costs | A sample percentile becomes a certification threshold without an external authority |

“Face validity” is useful for acceptability and comprehensibility but is not a substitute for this evidence chain. Likewise, a significant condition effect demonstrates sensitivity under that manipulation; it does not establish construct specificity.

## 2. Reliability, precision and agreement

The *Standards* distinguish reliability/precision from validity and require the intended replication to be specified: different items, occasions, raters, forms or some combination ([AERA, APA & NCME, 2014, ch. 2, pp. 33–47](https://www.testingstandards.net/uploads/7/6/6/4/76643089/standards_2014edition.pdf)).

| Question | Design and statistic | What to report | Important limitation |
| --- | --- | --- | --- |
| Do reflective items cohere at one occasion? | Alpha and preferably model-based omega, after dimensionality is evaluated | Estimate, interval, item set, scoring, sample, missing-data handling | Alpha is not proof of unidimensionality or validity; more redundant items can raise it |
| Are scores stable when the construct should be stable? | Test–retest correlation/ICC, paired differences, limits of agreement | Interval, intervening events, stability assumption, ICC form and CI | Workload should change when tasks change; indiscriminate test–retest can be conceptually wrong |
| Do raters agree on coded events or ratings? | Kappa for nominal categories; weighted kappa for ordered categories; ICC for continuous ratings | Rater training, independence, adjudication, prevalence, statistic variant and CI | Correlation between raters does not equal agreement |
| Are alternate forms equivalent? | Randomized/counterbalanced forms and score-equating evidence | Form construction, order, carryover and uncertainty | Similar means do not establish person-level equivalence |
| How precise is an individual score? | Standard error of measurement or posterior/IRT information conditional on score | Conditional interval, model and reliability basis | A single global reliability value hides changing precision over the scale |
| Is a change larger than measurement noise? | Standard error of change/minimal detectable change plus responsiveness analysis | Time interval, anchor, confidence level and change distribution | Statistical detectability is not operational importance |

[Cronbach (1951)](https://doi.org/10.1007/BF02310555) introduced coefficient alpha as an item-sampling/equivalence coefficient and explicitly noted that tests divisible into distinct subtests should be divided before applying it. [Shrout and Fleiss (1979)](https://doi.org/10.1037/0033-2909.86.2.420) show that intraclass correlations differ according to rater sampling and whether a single rating or an average is the target. [Cohen (1960)](https://doi.org/10.1177/001316446002000104) introduced chance-corrected agreement for two raters classifying nominal categories. The statistic therefore has to match the replication and data structure; “reliability” is not one universal number.

### Instrument-family implications

- **Reflective multi-item questionnaires:** assess dimensionality first, then alpha/omega for each defensible score. Include confidence intervals. Do not calculate one alpha across dimensions merely because a total is reported.
- **Index/composite workload procedures:** internal consistency may be irrelevant or actively misleading when dimensions are intentionally non-interchangeable. Test sensitivity, scoring reproducibility and external relations instead.
- **Single-item ratings (ISA, Bedford, Cooper–Harper outcome):** alpha is undefined. Examine repeated-condition stability, rater/pilot agreement where meaningful, sensitivity, ordering and relations to independent evidence.
- **Performance and telemetry:** report sensor precision, clock synchronization, valid windows, filtering, algorithm/version stability and repeatability at the pilot/scenario level.
- **Observer-coded behavior:** measure coder agreement before adjudication and report both raw disagreement and the post-adjudication dataset.

## 3. Factor analysis and item-level structure

### 3.1 Exploratory factor analysis (EFA)

EFA is appropriate when the latent structure is genuinely uncertain. [Fabrigar, Wegener, MacCallum and Strahan (1999)](https://doi.org/10.1037/1082-989X.4.3.272) distinguish common-factor analysis from principal components and emphasize that extraction, factor retention and rotation should follow the research goal and data. A defensible workflow is:

1. establish that a reflective latent-variable model is plausible;
2. use an estimator appropriate for the item distribution (ordered categorical responses should not automatically be treated as continuous normal data);
3. choose the number of factors using multiple sources: theory, scree/parallel analysis, interpretability and residuals;
4. use oblique rotation when constructs may correlate;
5. report the full loading matrix, cross-loadings, communalities, factor correlations, sample and estimator; and
6. replicate the solution in new data before treating it as the instrument structure.

[Horn (1965)](https://doi.org/10.1007/BF02289447) proposed comparison of observed roots with roots attributable to sampling error, the basis of parallel analysis. An eigenvalue-greater-than-one rule alone is not adequate evidence for factor retention.

### 3.2 Confirmatory factor analysis (CFA)

CFA tests a prespecified measurement model. The profile for a study should retain:

- estimator and treatment of ordinal data;
- sample size and missing-data method;
- factor loadings with uncertainty;
- factor correlations;
- residual/local-misfit diagnostics;
- global fit indices and their confidence intervals where available;
- theoretically justified correlated residuals or cross-loadings; and
- comparison with plausible alternative models.

[Hu and Bentler (1999)](https://doi.org/10.1080/10705519909540118) evaluated combinations of fit indices through simulation. Their values were conditional on the models and conditions studied. [Marsh, Hau and Wen (2004)](https://doi.org/10.1207/S15328007SEM1103_2) specifically warn against converting conditional simulation results into universal “golden rules.” The Atlas should show fit indices as evidence, not turn any one cutoff into a green badge.

### 3.3 Reading factor loadings

A loading estimates the modeled relation between an item and a factor under a particular specification. A large loading does not establish:

- that the item is free of bias;
- that the scale is unidimensional;
- that the factor has the intended substantive meaning;
- that the score predicts operational outcomes; or
- that the loading will replicate in pilots, maintainers, remote operators or a different language.

The interface should show loadings **by study and model**, never as a single permanent item attribute. Each matrix needs the item wording/version, population, context, estimator, factor labels, uncertainty and any cross-loadings.

## 4. Measurement invariance and differential item functioning

Before comparing latent means or score distributions across aircraft type, display condition, pilot experience, language, sex/gender, age, visual correction, simulator versus aircraft, or repeated occasions, examine whether the measure operates comparably. [Meredith (1993)](https://doi.org/10.1007/BF02294825) provides the foundational factor-analytic treatment of measurement and factorial invariance.

For multi-group CFA, retain at least:

1. **configural evidence:** comparable factor pattern;
2. **loading/metric evidence:** comparable item–factor relations;
3. **intercept/threshold evidence:** comparable origins needed for latent-mean interpretation; and
4. **residual/strict evidence:** comparable residuals when the proposed inference requires it.

Pass/fail labels should not be based on one change-index threshold. Report the sequence, identification choices, estimator, group sizes, absolute and comparative fit, parameter differences and substantive effect. Partial invariance must identify which parameters were freed and why.

For item response theory (IRT), differential item functioning asks whether respondents at the same latent level have different probabilities of selecting a response because of group or condition. DIF is evidence of non-equivalence; calling it bias additionally requires a substantive explanation.

## 5. IRT and item information

[Samejima’s graded-response work](https://www.ets.org/research/policy_research_reports/publications/report/1968/hprd.html) models ordered scored responses and evaluates item/score information and conditional standard errors. It can be useful when an instrument has enough items, respondents and response-category coverage to support the model.

For human-factors questionnaires, IRT can answer questions that alpha cannot:

- where on the latent range an item is discriminating;
- whether response categories are ordered and used;
- where the test is precise or weak;
- whether a shorter form retains information; and
- whether items function differently across groups or contexts.

Do not force IRT onto two-item instruments, small specialist samples or intentionally multidimensional workload composites. Record model family, dimensionality, local-independence checks, category thresholds, discrimination estimates, item/test information, fit, sample and DIF analysis. A visually attractive item-information curve without those conditions is not validation.

## 6. Sensitivity, responsiveness, floor/ceiling effects and uncertainty

The COSMIN Delphi taxonomy separates reliability, measurement error, validity and responsiveness and distinguishes interpretability from a measurement property ([Mokkink et al., 2010](https://doi.org/10.1016/j.jclinepi.2010.02.006); [COSMIN checklist paper](https://doi.org/10.1007/s11136-010-9606-8)). Although developed for health instruments, that terminology is useful for keeping human-factors claims separate.

- **Sensitivity to condition:** can the score detect a known or manipulated task difference?
- **Responsiveness:** can the score validly detect change over time in the target construct?
- **Measurement error:** how much change can occur without a true construct change under the stated model?
- **Floor/ceiling:** are responses compressed at an endpoint, leaving little ability to distinguish or detect change?
- **Interpretability:** what substantive meaning can be assigned to a score or change?

[Terwee et al. (2007)](https://pubmed.ncbi.nlm.nih.gov/17161752/) proposed quality criteria including floor/ceiling effects and interpretability for health-status questionnaires. Those thresholds are useful as screening conventions in that domain, not universal pass/fail limits for aviation scales. The Atlas should show endpoint percentages and distributions rather than silently applying a universal cutoff.

For every reported coefficient, effect, score or threshold, retain uncertainty: confidence/credible interval, sample size, number of independent pilots, scenario/task clustering and missingness. Thousands of telemetry samples from one pilot remain one pilot for population generalization.

## 7. Core measure dossiers

### 7.1 NASA Task Load Index (NASA-TLX) and Raw TLX

**Original instrument sources**

- [Hart (1986), *NASA Task Load Index (TLX): Paper and Pencil Package, Version 1.0*](https://ntrs.nasa.gov/citations/20000021488): official administration package. NASA states that development involved more than 40 laboratory, simulation and in-flight experiments. The original procedure uses six dimension ratings and pairwise weighting.
- [Hart and Staveland (1988), *Development of NASA-TLX: Results of Empirical and Theoretical Research*](https://doi.org/10.1016/S0166-4115(08)62386-9): original theoretical and empirical chapter.
- [NASA Ames TLX page](https://www.nasa.gov/human-systems-integration-division/nasa-task-load-index-tlx/): current first-party instrument, manual and publication access point.

**Validation/comparison evidence**

- [Nygren (1991)](https://doi.org/10.1177/001872089103300102) examined the measurement properties of NASA-TLX and SWAT and argued that their different psychometric structures make them sensitive to different kinds of workload measurement.
- [Hill et al. (1992)](https://doi.org/10.1177/001872089203400405) compared TLX, SWAT, Modified Cooper–Harper and Overall Workload across five studies involving three U.S. Army systems. All were sensitive to workload levels; TLX and Overall Workload were consistently stronger on the study’s factor-validity and operator-acceptance comparisons.
- Byers, Bittner and Hill (1989), *Traditional and Raw Task Load Index (TLX) Correlations: Are Paired Comparisons Necessary?*, is the frequently cited conference-book comparison of weighted and unweighted TLX. An [accessible copy is available from a secondary repository](https://www.researchgate.net/publication/235079776_Traditional_and_raw_task_load_index_TLX_correlations_Are_paired_comparisons_necessary), but a publisher-hosted primary copy was not located in this pass. Treat weighted TLX and Raw TLX as distinct scoring procedures and verify the chapter itself before importing any quantitative claim from it.
- [Hart (2006), *NASA-TLX; 20 Years Later*](https://humansystems.arc.nasa.gov/groups/TLX/downloads/HFES_2006_Paper.pdf) reviews use and modification of the instrument. It is a retrospective author review, not a new universal reliability study.

**Primary application examples**

- [Hancock and Robinson (1989)](https://ntrs.nasa.gov/citations/19900039239) used NASA-TLX and SWAT after tracking trials manipulating control order, feedback and input device; perceived-workload patterns mirrored several performance effects and the two workload scales had equivalent sensitivity in that experiment.
- [Zheng et al. (2019)](https://pubmed.ncbi.nlm.nih.gov/31227035/) compared simulator and flight-test workload; the abstract reports a simulator-to-flight NASA-TLX correlation of 0.864. This is context-specific cross-setting evidence, not proof that simulator TLX always predicts flight workload.
- [Ballard and Stewart (2025)](https://ntrs.nasa.gov/citations/20250003867) compared post-run NASA-TLX with retrospective minute-by-minute ratings from a contrived flight-simulator scenario to investigate what temporal summary a post-run score represents.

**Interpretation and cautions**

- Report whether the canonical weighted method or Raw TLX was used, the exact response scale, administration timing and any item wording changes.
- The six dimensions are designed to diagnose different contributors. A high alpha is neither required nor sufficient for the composite.
- The performance item is self-evaluative and direction/scoring must be explicit.
- For long missions, define the recalled time window; peak, average and end-of-run experience can differ.
- Use task performance, errors, control activity or physiology as separate convergent/discriminant evidence rather than treating TLX as ground truth.

### 7.2 System Usability Scale (SUS)

**Original source**

- Brooke’s 1996 chapter, *SUS: A “Quick and Dirty” Usability Scale*, is the original instrument source. An [accessible reproduction of the chapter](https://hell.meiert.org/core/pdf/sus.pdf) contains the original ten items, administration guidance and scoring instructions; it is not the publisher’s copy. When the repository stores or reproduces items, rights and wording should be checked against the source edition in *Usability Evaluation in Industry*.

**Validation evidence**

- [Bangor, Kortum and Miller (2008)](https://doi.org/10.1080/10447310802205776) analyzed 2,324 questionnaires from 206 studies across product types. They reported alpha 0.911 in that dataset and a one-component loading pattern in their analysis. These values are evidence from their product/test mix, not a reliability guarantee for aviation systems.
- [Lewis and Sauro (2009)](https://doi.org/10.1007/978-3-642-02806-9_12) analyzed two independent datasets and proposed Usability and Learnability factors, with reported alphas 0.91 and 0.70. The original SUS guidance, however, specified a total composite and did not make individual items independently interpretable.

**Interpretation and cautions**

- SUS measures perceived overall usability after exposure. It does not diagnose luminance, symbol legibility, mode awareness or mission performance.
- Preserve the canonical 10-item wording and scoring if benchmark comparability is the objective; document substitutions such as “system” to a named product.
- Do not treat the 0–100 transformed score as a percentage correct.
- Do not expose “learnability” as settled truth without identifying the factor model and evidence source; mixed positive/negative wording can contribute method variance.
- For a cockpit/HMD study, pair SUS with task success, error/recovery, time, visual-performance and workload measures selected from the task model.

### 7.3 ASQ and PSSUQ/CSUQ

**Original and validation sources**

- [Lewis (1991), ASQ](https://doi.org/10.1145/122672.122692) used a three-item after-scenario questionnaire across three usability tests with eight common scenarios. The paper reports evidence of reliability, sensitivity and concurrent validity for those studies.
- [Lewis (1995), IBM questionnaires](https://doi.org/10.1080/10447319509526110) reports ASQ alpha estimates of 0.90–0.96 across tested scenarios; PSSUQ total alpha 0.97; and PSSUQ subscale alphas of 0.96, 0.91 and 0.91 in the source analyses. A preliminary 48-person PSSUQ factor analysis and a 377-response CSUQ study supported three named factors: System Usefulness, Information Quality and Interface Quality.

**Interpretation and cautions**

- ASQ is scenario-level; PSSUQ is post-study; CSUQ adapts PSSUQ wording for field rather than test settings. Version and item count must be recorded.
- The published coefficients are sample-specific. Aviation/HMD use requires new score distributions and reliability/structure evidence.
- Information-quality items may be directly useful for avionics information presentation, but do not replace objective information-access or comprehension tests.

### 7.4 UMUX-LITE

**Original and validation source**

- [Lewis, Utesch and Maher (2013)](https://doi.org/10.1145/2470654.2481287) created a two-item measure of perceived usefulness and ease. The two studies reported reliability estimates 0.83 and 0.82 and correlations with SUS of 0.81 and 0.85.

**Interpretation and cautions**

- It is efficient when questionnaire burden is constrained, but two items cannot localize an interface failure mechanism.
- Each item is effectively a single indicator of a distinct content domain; do not overinterpret a two-item aggregate as a richly tested factor model.
- Any conversion to a SUS-like metric must name the published formula/version. A converted score is not a directly observed SUS score.

### 7.5 Situation Awareness Rating Technique (SART)

**Original instrument source**

- [Taylor (1990), *Situational Awareness Rating Technique: The Development of a Tool for Aircrew Systems Design*](https://doi.org/10.4324/9781315087924-8) developed SART from structured knowledge elicitation with 84 RAF test and operational aircrew. The original work used principal-components analysis and clustering to organize ten dimensions into demand, supply and understanding groupings.

**Validation/comparison evidence**

- [Selcon, Taylor and Koritsas (1991)](https://doi.org/10.1518/107118191786755706) compared 10-dimensional and 3-dimensional SART with NASA-TLX in a computer-graphics flight-simulation evaluation involving 12 RAF pilots.
- [Endsley et al. (1998)](https://doi.org/10.1177/154193129804200119) directly compared SART and SAGAT in a display evaluation. Both were sensitive/diagnostic for display effects, but SART correlated strongly with subjective confidence, a simple subjective SA rating and subjective performance; SART and SAGAT were not correlated.
- [Braarud (2021)](https://doi.org/10.1016/j.ergon.2021.103233) studied NASA-TLX and SART in 18 licensed control-room operators across 12 scenarios. The source reports alpha of 0.86 and 0.83 for NASA-TLX and 0.74 and 0.71 for three-item SART at post-session and post-video administrations, respectively. It found no clear evidence that the SART index measured situation awareness in that setting. These coefficients reflect repeated scenario ratings from six three-person teams and must not be presented as independent-person estimates from a large sample.

**Primary aerospace application**

- [Shelton et al. (2015), NASA head-worn-display flight test](https://ntrs.nasa.gov/citations/20150010973) administered three-dimensional SART after taxi and approach trials alongside workload, flight technical error and display-attribute ratings. This is a strong example of triangulation: SART was not the only dependent variable.

**Interpretation and cautions**

- SART is a post-task self-report of perceived SA-related dimensions, not direct proof that the operator knew the true system state.
- Demand and supply content overlaps conceptually with workload. Pre-specify how SART should relate to workload, objective state knowledge and performance.
- Record 3-D versus 10-D version, scale anchors, scoring equation and recall interval.

### 7.6 SAGAT

**Original/defining source**

- [Endsley (1995), *Measurement of Situation Awareness in Dynamic Systems*](https://doi.org/10.1518/001872095779049499) describes freeze-probe measurement, requirements-derived queries and evidence concerning intrusion and validity.

**Comparison evidence**

- [Endsley et al. (1998)](https://doi.org/10.1177/154193129804200119) found SAGAT and SART were not correlated in their display study, even though both showed useful sensitivity/diagnosticity. The methods should not be presented as interchangeable.
- [Endsley et al. (2000), NASA rotorcraft sensitivity study](https://ntrs.nasa.gov/citations/20000109865) compared SAGAT, SART and objective performance under manipulations intended to affect pilot SA.

**Interpretation and cautions**

- Query content must be derived from an explicit situation-awareness requirements analysis for the scenario.
- Preserve item-level accuracy, difficulty, response latency and missingness. A single proportion can conceal poor coverage or one overly easy probe family.
- Freeze timing and blanking can alter task flow; evaluate intrusion and randomize/space freezes where the design permits.
- Score truth against time-synchronized scenario state, not evaluator recollection.

### 7.7 Bedford Workload Rating Scale

**Original instrument source**

- [Roscoe and Ellis (1990), RAE Technical Report 90019, *A Subjective Rating Scale for Assessing Pilot Workload in Flight: A Decade of Practical Use*](https://apps.dtic.mil/sti/citations/ADA227864) describes the ten-point, decision-tree scale based on spare capacity and reports flight-trial use with pilots.

**Government guidance and use evidence**

- [FAA flight-deck display guidance, Appendix C](https://rosap.ntl.bts.gov/view/dot/12411) reproduces the Bedford decision tree and positions it as one of several workload scales usable in flight-deck evaluation.
- [FAA Technical Note DOT/FAA/CT-TN95/49, Appendix A](https://rosap.ntl.bts.gov/view/dot/12781/dot_12781_DS1.pdf) summarizes validation/use evidence and notes Roscoe’s recommendation to use short, well-defined flight tasks to improve rating reliability.
- [Stanton et al. (2020)](https://doi.org/10.1007/s10111-019-00591-2) administered Bedford immediately after simulated rotary-wing approach/landing phases when evaluating a head-up display in degraded visual conditions.

**Interpretation and cautions**

- Treat the outcome as ordered categories derived through the decision tree. Do not assume equal intervals merely because the labels are numbered 1–10.
- Define the task segment and “spare capacity” frame during training.
- Pair the rating with task performance and the nature of any secondary tasks; spare capacity is not equivalent to satisfaction or visual usability.

### 7.8 Cooper–Harper Handling Qualities Rating

**Original instrument source**

- [Cooper and Harper (1969), NASA TN D-5153](https://ntrs.nasa.gov/citations/19690013177) defines the decision tree for handling qualities, required pilot compensation and desired/adequate task performance.

**Use and interpretation evidence**

- [Bailey et al. (2009), NASA/TM-2009-215767](https://ntrs.nasa.gov/citations/20090025299) reviews experience applying Cooper–Harper in aircraft/spacecraft handling-qualities work. It emphasizes that the scale is ordinal, absolute for a specified task/configuration, and should be interpreted with pilot comments and task-performance data.
- [Rogers et al. (2008)](https://ntrs.nasa.gov/citations/20080012495) used Cooper–Harper after simulated transport-aircraft rudder maneuvers to evaluate combinations of pedal force, breakout force and travel.

**Interpretation and cautions**

- It is a handling-qualities measure, not a general workload, display-usability or acceptance scale.
- Desired and adequate performance criteria must be defined before ratings.
- Preserve the pilot’s path through the decision tree, comments, configuration and achieved performance. Avoid arithmetic that assumes an interval scale.
- A “modified Cooper–Harper” instrument is a different measure and must name the modification and evidence base.

### 7.9 Subjective Workload Assessment Technique (SWAT)

**Original instrument sources**

- [Reid, Shingledecker and Eggemeier (1981)](https://doi.org/10.1177/1071181381025001134) reported development and tests of construct and concurrent validity for an early SWAT scale using conjoint measurement.
- [Reid and Nygren (1988)](https://doi.org/10.1016/S0166-4115(08)62387-0) defines the three dimensions—time load, mental effort load and psychological stress load—and the two-stage scale-development/event-scoring procedure.
- [Reid, Potter and Bressler (1989), AAMRL-TR-89-023](https://apps.dtic.mil/sti/citations/ADA215405) is the public-release user guide for SWAT Version 3.1.

**Validation/comparison evidence**

- [Nygren (1991)](https://doi.org/10.1177/001872089103300102) argues that SWAT functions as a cognitive model sensitive to individual differences, whereas NASA-TLX has properties supporting a more general prediction model.
- [Hill et al. (1992)](https://doi.org/10.1177/001872089203400405) found all four studied workload scales acceptable/sensitive, while TLX and Overall Workload were stronger on their factor-validity and operator-acceptance comparisons.
- [Hancock and Robinson (1989)](https://ntrs.nasa.gov/citations/19900039239) found TLX and SWAT equivalent in sensitivity to the manipulated tracking-task variables in that experiment.

**Interpretation and cautions**

- Record the exact SWAT version, individual/group scaling procedure and software/scoring implementation.
- The pretask ordering/scaling phase is not optional if canonical person-specific SWAT scoring is claimed.
- SWAT’s three ordered dimensions and conjoint scale should not be replaced by an undocumented simple mean.

### 7.10 Instantaneous Self-Assessment (ISA)

**Defining/operational sources**

- [EUROCONTROL ERGO Version 2 note](https://www.eurocontrol.int/publication/ergo-version-2-instantaneous-self-assessment-workload-real-time-environment) documents the system for prompting and collecting ISA workload ratings during real-time air-traffic-control simulations.
- [EUROCONTROL CASCADE real-time simulation report](https://www.eurocontrol.int/sites/default/files/library/004_CASCADE_Stream_1_Real-time_Simulation.pdf) used a five-level ISA scale at two-minute intervals and states the anchors from under-utilized to excessive.

**Validation and application evidence**

- [Tattersall and Foord (1996)](https://doi.org/10.1080/00140139608964495) compared ISA with post-task workload ratings, heart-rate measures and tracking performance. ISA correlated with several comparators and was sensitive to task difficulty, but primary tracking performance was poorer when a response was required, whether manual or spoken.
- [EUROCONTROL AMRUFRA validation](https://www.eurocontrol.int/sites/default/files/library/012_AMRUFRA_real-time_validation.pdf) collected ISA every two minutes during exercises and NASA-TLX after each exercise, preserving the distinction between momentary and retrospective workload.

**Interpretation and cautions**

- ISA is single-item and ordered; alpha is inapplicable.
- Prompt frequency, response window, modality and missing prompts are part of the measure.
- The probe can interfere with the primary task. That reactivity must be evaluated, especially in visually or manually demanding flight tasks.
- Model repeated ratings within pilot and scenario; prompt-level rows are not independent participants.

## 8. Cross-instrument evidence map

| Decision need | Primary candidate | Essential companion evidence | Do not substitute |
| --- | --- | --- | --- |
| Overall perceived workload after a short defined task | Weighted NASA-TLX or Raw TLX, with scoring named | Task performance, errors, control activity, task condition | A high TLX score alone for an unsafe-system conclusion |
| Momentary workload profile | ISA or synchronized brief probes | Prompt reactivity, performance around probe, mixed-effects model | Treating prompts as independent pilots |
| Pilot spare capacity after a maneuver | Bedford | Defined task segment, secondary-task opportunity, performance | SUS or generic satisfaction |
| Aircraft handling qualities | Cooper–Harper | Desired/adequate criteria, pilot comments, achieved performance | Modified wording presented as canonical C–H |
| Overall perceived system usability | SUS, PSSUQ or UMUX-LITE | Success, time, error/recovery and scenario coverage | Mission safety or legibility |
| Task-level ease/satisfaction | ASQ | Scenario-specific outcome and observation | Post-study total usability alone |
| Self-perceived situation awareness | SART | Objective state-knowledge probe and performance | Direct knowledge accuracy |
| Direct scenario-state knowledge | SAGAT | Requirements-derived queries, synchronized truth, intrusion study | Confidence or self-rating alone |
| HMD/HUD visual acceptability | Visual-performance and comfort measures selected for the requirement | Luminance/contrast, acuity/recognition, head/eye geometry, flight technical error | SUS as a display-legibility test |

## 9. Data model recommended for each Atlas measure

The present catalog has useful summary fields, but a scientifically defensible “open a measure” page needs evidence records rather than a single reliability or validity paragraph.

### 9.1 Measure identity

- canonical name and version;
- original source and first publication;
- construct definition and exclusions;
- item/task count and response format;
- administration timing and burden;
- scoring formula, direction, range and missing-data rule;
- permissions/licensing and item-display rights;
- modified/translated variants as separate identities.

### 9.2 Study evidence record

- citation, DOI/official URL, publication type and evidence role (`original`, `validation`, `comparison`, `application`);
- population, expertise, sample size and independent-unit count;
- aircraft/simulator/system, task, scenario duration and environmental/display conditions;
- exact instrument version and modifications;
- administration timing and modality;
- score analyzed and statistical model;
- reliability/precision result with CI and coefficient type;
- validity hypothesis, comparator and result;
- factor/IRT model and item-level results where present;
- floor/ceiling, missingness and exclusions;
- authors’ stated limitation and a separate curator limitation;
- applicability tags and evidence status (`reported`, `replicated`, `conflicting`, `not studied`).

### 9.3 Item evidence record

- exact item/version and rights status;
- factor loading(s), standard error/CI, cross-loading and model;
- item-rest relation where appropriate;
- response distribution and endpoint percentage;
- IRT discrimination, thresholds and information where appropriate;
- DIF/invariance result by named grouping variable;
- translation/adaptation evidence;
- source study link.

### 9.4 “Should it have been used this way?” appraisal

Keep appraisal structured and attributable:

- construct match;
- population/task match;
- version and scoring fidelity;
- administration timing match;
- independence/model match;
- evidence triangulation;
- threshold authority;
- modification consequences;
- conclusion: `supported`, `supported with limitations`, `unclear`, or `not supported by cited evidence`.

The conclusion must link to the evidence and never be generated from a coefficient alone.

## 10. Immediate corrections suggested by this pass

These are research findings for a later catalog/interface change; this note does not edit the catalog.

1. The current SART, Bedford, SWAT and ISA catalog entries point to NASA-TLX sources. Replace those with the instrument-specific original sources above.
2. Keep weighted NASA-TLX and Raw TLX separate, with explicit scoring/version labels.
3. Add numeric published evidence only as study records. The PSSUQ/ASQ and UMUX-LITE coefficients currently in the catalog should name the source study, population/data source and version rather than appear as global properties.
4. Change “reliability” from one object on a measure to a list of context-specific evidence records.
5. Add a factor/IRT tab that is empty when no item-level study has been acquired. Do not synthesize loadings.
6. Add a study-use tab with method, population, task, administration and appraisal fields. Citation count or a title list is insufficient.
7. Add explicit `ordinal` analysis cautions to Bedford and Cooper–Harper.
8. Add prompt-reactivity evidence to ISA and freeze-intrusion evidence to SAGAT.
9. Add a visible “not established in this population/task” state rather than treating missing evidence as failure or silently borrowing coefficients.

## 11. Primary-source bibliography

### Measurement science

- American Educational Research Association, American Psychological Association, & National Council on Measurement in Education. (2014). [*Standards for Educational and Psychological Testing*](https://www.testingstandards.net/uploads/7/6/6/4/76643089/standards_2014edition.pdf). **Role:** authoritative testing standard.
- Cohen, J. (1960). [A coefficient of agreement for nominal scales](https://doi.org/10.1177/001316446002000104). *Educational and Psychological Measurement, 20*(1), 37–46. **Role:** original kappa method.
- Cronbach, L. J. (1951). [Coefficient alpha and the internal structure of tests](https://doi.org/10.1007/BF02310555). *Psychometrika, 16*, 297–334. **Role:** original alpha paper.
- Fabrigar, L. R., Wegener, D. T., MacCallum, R. C., & Strahan, E. J. (1999). [Evaluating the use of exploratory factor analysis in psychological research](https://doi.org/10.1037/1082-989X.4.3.272). *Psychological Methods, 4*(3), 272–299. **Role:** methodological evaluation.
- Horn, J. L. (1965). [A rationale and test for the number of factors in factor analysis](https://doi.org/10.1007/BF02289447). *Psychometrika, 30*, 179–185. **Role:** original parallel-analysis method.
- Hu, L., & Bentler, P. M. (1999). [Cutoff criteria for fit indexes in covariance structure analysis](https://doi.org/10.1080/10705519909540118). *Structural Equation Modeling, 6*(1), 1–55. **Role:** simulation study of fit indices.
- Marsh, H. W., Hau, K.-T., & Wen, Z. (2004). [In search of golden rules](https://doi.org/10.1207/S15328007SEM1103_2). *Structural Equation Modeling, 11*(3), 320–341. **Role:** critique of universal fit cutoffs.
- Meredith, W. (1993). [Measurement invariance, factor analysis and factorial invariance](https://doi.org/10.1007/BF02294825). *Psychometrika, 58*, 525–543. **Role:** foundational invariance treatment.
- Mokkink, L. B., et al. (2010). [The COSMIN study reached international consensus on taxonomy, terminology, and definitions of measurement properties](https://doi.org/10.1016/j.jclinepi.2010.02.006). *Journal of Clinical Epidemiology, 63*(7), 737–745. **Role:** Delphi taxonomy.
- Mokkink, L. B., et al. (2010). [The COSMIN checklist for assessing the methodological quality of studies on measurement properties](https://doi.org/10.1007/s11136-010-9606-8). *Quality of Life Research, 19*, 539–549. **Role:** Delphi methods checklist.
- Samejima, F. (1968/1969). [Estimation of latent ability using a response pattern of graded scores](https://www.ets.org/research/policy_research_reports/publications/report/1968/hprd.html). ETS RB-68-02 / *Psychometrika* Monograph Supplement 17. **Role:** original graded-response development.
- Shrout, P. E., & Fleiss, J. L. (1979). [Intraclass correlations: Uses in assessing rater reliability](https://doi.org/10.1037/0033-2909.86.2.420). *Psychological Bulletin, 86*(2), 420–428. **Role:** ICC selection.
- Terwee, C. B., et al. (2007). [Quality criteria were proposed for measurement properties of health status questionnaires](https://pubmed.ncbi.nlm.nih.gov/17161752/). *Journal of Clinical Epidemiology, 60*(1), 34–42. **Role:** quality criteria including floor/ceiling and interpretability.

### Instruments and human-factors applications

- Bangor, A., Kortum, P. T., & Miller, J. T. (2008). [An empirical evaluation of the System Usability Scale](https://doi.org/10.1080/10447310802205776). *International Journal of Human–Computer Interaction, 24*(6), 574–594. **Role:** SUS validation/benchmark dataset.
- Bailey, R. E., et al. (2009). [Cooper–Harper experience report for spacecraft handling qualities applications](https://ntrs.nasa.gov/citations/20090025299). NASA/TM-2009-215767. **Role:** interpretive/use review based on flight-test experience.
- Ballard, K., & Stewart, M. (2025). [Comparing post-run and retrospective minute-by-minute workload scores](https://ntrs.nasa.gov/citations/20250003867). **Role:** NASA-TLX temporal-interpretation application.
- Braarud, P. Ø. (2021). [Investigating the validity of subjective workload rating (NASA-TLX) and subjective situation-awareness rating (SART) for cognitively complex human–machine work](https://doi.org/10.1016/j.ergon.2021.103233). *International Journal of Industrial Ergonomics, 86*, 103233. **Role:** reliability and validity study in licensed control-room operators.
- Brooke, J. (1996). [SUS: A “Quick and Dirty” Usability Scale](https://hell.meiert.org/core/pdf/sus.pdf). In P. W. Jordan et al. (Eds.), *Usability Evaluation in Industry*, 189–194. **Role:** original SUS source; link is an accessible reproduction, not the publisher copy.
- Cooper, G. E., & Harper, R. P., Jr. (1969). [The use of pilot rating in the evaluation of aircraft handling qualities](https://ntrs.nasa.gov/citations/19690013177). NASA TN D-5153. **Role:** original Cooper–Harper source.
- Endsley, M. R. (1995). [Measurement of situation awareness in dynamic systems](https://doi.org/10.1518/001872095779049499). *Human Factors, 37*(1), 65–84. **Role:** defining SAGAT source and validation discussion.
- Endsley, M. R., Selcon, S. J., Hardiman, T. D., & Croft, D. G. (1998). [A comparative analysis of SAGAT and SART for evaluations of situation awareness](https://doi.org/10.1177/154193129804200119). *Proceedings of the HFES Annual Meeting, 42*(1), 82–86. **Role:** direct comparison.
- Hancock, P. A., & Robinson, M. A. (1989). [The effects of control order, feedback, practice, and input device on tracking performance and perceived workload](https://ntrs.nasa.gov/citations/19900039239). **Role:** NASA-TLX/SWAT application.
- Hart, S. G. (1986). [NASA Task Load Index: Paper and Pencil Package, Version 1.0](https://ntrs.nasa.gov/citations/20000021488). NASA Ames. **Role:** official instrument manual.
- Hart, S. G. (2006). [NASA-TLX; 20 years later](https://humansystems.arc.nasa.gov/groups/TLX/downloads/HFES_2006_Paper.pdf). **Role:** author retrospective.
- Hart, S. G., & Staveland, L. E. (1988). [Development of NASA-TLX](https://doi.org/10.1016/S0166-4115(08)62386-9). In *Human Mental Workload*, 139–183. **Role:** original theory/development.
- Hill, S. G., et al. (1992). [Comparison of four subjective workload rating scales](https://doi.org/10.1177/001872089203400405). *Human Factors, 34*(4), 429–439. **Role:** cross-instrument comparison.
- Lewis, J. R. (1991). [Psychometric evaluation of an after-scenario questionnaire for computer usability studies: The ASQ](https://doi.org/10.1145/122672.122692). *ACM SIGCHI Bulletin, 23*(1), 78–81. **Role:** original ASQ validation.
- Lewis, J. R. (1995). [IBM computer usability satisfaction questionnaires](https://doi.org/10.1080/10447319509526110). *International Journal of Human–Computer Interaction, 7*(1), 57–78. **Role:** ASQ/PSSUQ/CSUQ instruments and psychometrics.
- Lewis, J. R., & Sauro, J. (2009). [The factor structure of the System Usability Scale](https://doi.org/10.1007/978-3-642-02806-9_12). In *Human Centered Design*, 94–103. **Role:** SUS factor study.
- Lewis, J. R., Utesch, B. S., & Maher, D. E. (2013). [UMUX-LITE: When there’s no time for the SUS](https://doi.org/10.1145/2470654.2481287). *CHI 2013*, 2099–2102. **Role:** original UMUX-LITE validation.
- Nygren, T. E. (1991). [Psychometric properties of subjective workload measurement techniques](https://doi.org/10.1177/001872089103300102). *Human Factors, 33*(1), 17–33. **Role:** NASA-TLX/SWAT psychometric analysis.
- Reid, G. B., & Nygren, T. E. (1988). [The Subjective Workload Assessment Technique](https://doi.org/10.1016/S0166-4115(08)62387-0). In *Human Mental Workload*, 185–218. **Role:** defining SWAT source.
- Reid, G. B., Shingledecker, C. A., & Eggemeier, F. T. (1981). [Application of conjoint measurement to workload scale development](https://doi.org/10.1177/1071181381025001134). *Proceedings of the Human Factors Society Annual Meeting, 25*(1). **Role:** early SWAT development/validation.
- Roscoe, A. H., & Ellis, G. A. (1990). [A subjective rating scale for assessing pilot workload in flight: A decade of practical use](https://apps.dtic.mil/sti/citations/ADA227864). RAE TR 90019. **Role:** original Bedford source.
- Selcon, S. J., Taylor, R. M., & Koritsas, E. (1991). [Workload or situational awareness? TLX vs. SART for aerospace systems design evaluation](https://doi.org/10.1518/107118191786755706). *Proceedings of the HFES Annual Meeting, 35*(2). **Role:** SART/TLX comparison.
- Shelton, K. J., et al. (2015). [Flight test of a head-worn display as an equivalent-HUD for terminal operations](https://ntrs.nasa.gov/citations/20150010973). NASA. **Role:** HWD/HUD use study.
- Stanton, N. A., et al. (2020). [Seeing through the mist: Evaluation of a head-up display in a simulated degraded visual environment](https://doi.org/10.1007/s10111-019-00591-2). *Cognition, Technology & Work, 22*. **Role:** Bedford/HUD application.
- Tattersall, A. J., & Foord, P. S. (1996). [An experimental evaluation of instantaneous self-assessment as a measure of workload](https://doi.org/10.1080/00140139608964495). *Ergonomics, 39*(5), 740–748. **Role:** ISA validation/reactivity.
- Taylor, R. M. (1990). [Situational Awareness Rating Technique: The development of a tool for aircrew systems design](https://doi.org/10.4324/9781315087924-8). AGARD-CP-478. **Role:** original SART source.
- Zheng, Y., Lu, Y., Jie, Y., & Fu, S. (2019). [Predicting workload experienced in a flight test by measuring workload in a flight simulator](https://pubmed.ncbi.nlm.nih.gov/31227035/). *Aerospace Medicine and Human Performance, 90*(7). **Role:** NASA-TLX simulator/flight application.

