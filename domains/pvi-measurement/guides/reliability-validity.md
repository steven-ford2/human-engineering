# Reliability, validity and sensor/evidence quality

The interactive **Psychometrics** section expands this guide into 21 inspectable concepts, while deep measure profiles keep every reported coefficient, model, population, and use attached to its source. The underlying research audit is [Psychometrics and core measure evidence](../../../docs/research/psychometrics-and-core-measure-evidence.md).

A **metric** is an observed value. A **construct** is what the research claims that value reflects. Stick movement directly measures inceptor activity, not mental workload; gaze fixations directly measure eye position/sampling, not situation awareness or comprehension.

| Measure family | Reliability evaluation | Common misuse |
|---|---|---|
| Reflective multi-item survey | Alpha/omega with CI, dimensionality, invariance | Transferring historic alpha to edited/new items |
| Single-item perceived ease | Repeated-task/test-retest + external validity | Cronbach alpha of one item |
| Annotated error/event | Inter-rater kappa, coding agreement, adjudication | Assuming all errors have equal consequence |
| Reaction time / touch / HOTAS | Sensor and clock checks, within-task retest, participant ICC | Treating raw events as independent pilots |
| Eye tracking | AOI mapping, calibration, valid-gaze fraction, per-task repeatability | Fixation = attention comprehension |
| Voice | Transcription double-code, ASR/SNR, false accept/reject | Word error rate = semantic success |
| Flight telemetry | Model state validity, sample frequency, synchronized ground truth, scenario retest | Flight error equals bad interface |
| Control activity / PIW | Stick scaling, deadzone, derivative filtering, trial/axis stability | PIW equals cognitive load |
| Physiology | Pilot baseline, signal quality, artifact rejection | Pupil/HRV/EEG uniquely determines workload |

## Empirical examples and limits

Lewis (1995) found ASQ alpha about **.90–.96** across its tested scenarios and PSSUQ total alpha about **.97** in his source data. Lewis, Utesch & Maher (2013) reported UMUX-LITE reliability **.82–.83**. These are published **sample-specific** results, not guaranteed reliability for fighter pilots, edited wording, small n or unusual scenarios.

NASA-TLX combines several workload-related dimensions. Simple internal consistency is not a universal validity test for this multidimensional/index-style construct. Cooper–Harper is a handling-qualities decision tree, **not** a general usability questionnaire. HMD gaze and situation-awareness probes should be cross-validated against scored task-state knowledge.

## Validity is an argument about use

For the intended score interpretation and decision, build evidence from:

1. **Content** — a construct/domain map, task analysis, expert review and missing-domain check.
2. **Response processes** — cognitive interviews, comprehension checks, rater training and evidence that people use the intended judgment process.
3. **Internal structure** — dimensionality, factor/item behavior, residuals and reliability conditional on the scoring model.
4. **Relations to other variables** — prespecified convergent, discriminant, criterion and known-groups patterns.
5. **Consequences** — classification error, subgroup impact, false-pass/false-fail costs and the authority for any threshold.

Do not say only that a measure is “validated.” Name the exact version, population, task, score, interpretation, decision and evidence.

## Factor and item analysis

Use EFA when the structure is genuinely uncertain, with common-factor methods, an estimator/correlation appropriate for the item scale, defensible factor retention and an oblique rotation when factors may correlate. Use CFA for a prespecified model and report all item loadings, cross-loadings or fixed-zero assumptions, residuals, estimator, item treatment, fit measures, uncertainty and model changes.

A loading is evidence from one sample, wording, response scale, estimator and model. It is not a permanent item property. Check measurement invariance before comparing group or time means, and differential item functioning when equally positioned groups may respond differently. Very small or unrepresentative pilot samples rarely support stable factor or IRT models; prioritize content, response-process evidence, transparent item distributions and external task evidence until an adequately designed sample is available.

## Required measurement schema

Each study should specify: measure ID; source/construct; observed signal; formula and units; event onset/termination; valid data windows; exclusion/censoring; recording version and precision; flight phase/aircraft dynamics; pilot training; interference and mode states; scenario truth source; reliability check; convergent/discriminant hypotheses; primary statistical model; participant clustering; and any decision threshold **with an independent authority**.

## Stick-derived workload interpretation

[Niewind (2012)](https://elib.dlr.de/88208/), [Hanson et al. (2014)](https://ntrs.nasa.gov/citations/20140005730) and [van Weelden et al. (2023)](https://arxiv.org/abs/2309.09619) describe duty cycle, aggressiveness and PIW with different processing definitions. Always identify the exact method, sampling/filtering, control axis, task and flight-control laws. Increase in stick activity can reflect turbulence, tracking precision, compensatory pilot gain, aircraft dynamics, divided attention or cognitive load.

Analyze stick movement together with flight-path error, secondary-task performance and post-scenario workload ratings to test **construct validity**. A reduced stick input alone might indicate lower demand *or failure to actively control the aircraft*.

## Inference

One pilot with 10 trials containing 100,000 telemetry samples is still **one independently sampled pilot**. Treat pilot as unit of generalization, model repeated tasks and scenarios (hierarchical/random effects or transparent participant-level paired contrasts), and show confidence/credible intervals and failure cases. For small n, avoid unwarranted null conclusions, unstable questionnaire factor analysis and post-hoc cutoff hunting.

**Reference basis:** [FAA flight-deck evaluation](https://rosap.ntl.bts.gov/view/dot/12411), [NASA TLX](https://www.nasa.gov/human-systems-integration-division/nasa-task-load-index-tlx/), [Endsley SA probes](https://doi.org/10.1518/001872095779049499), [Lewis questionnaires](https://doi.org/10.1080/10447319509526110).
