# Deriving valid test measures from task analysis and CTA

## Design principle
**Mission effect -> operator task -> decision/need -> predicted failure mechanism -> test claim -> observable behavior -> measure -> threshold -> interpretation.** Do not start with whichever psychophysiological sensor happens to be available.

## The operational measurement ladder
1. **Mission/function outcome:** correct outcome, hazard avoided, recovery achieved.
2. **Task performance:** completion, accuracy, tolerance, elapsed time, deadline met, step/order violation, aborted task.
3. **Decision quality:** correct alternative given available evidence, time to commitment, updates under new cues, bias and false alarm/miss.
4. **Information comprehension/SA:** perception of relevant data, correct interpretation, appropriate projection or uncertainty; independent probes and latency if justified.
5. **Control-loop performance:** selection vs active state identification, command validity, correct actuation, acknowledgment, actual achieved state, reversals/recovery.
6. **Process/attentional mechanism:** sampling, distribution of gaze, switching, communication, interruption recovery, subjective workload; supportive not inherently diagnostic.
7. **Experience/usability:** confidence, perceived effort, trust, preference and acceptability; not sufficient evidence of safe operation alone.

## Selection matrix
| CTA-derived need/claim | Potential measure | Need-to-measure warning |
|---|---|---|
| Detect degraded source before decision | detection probability, latency, false alarms, task outcome | Detecting a graphic is not the same as interpreting it |
| Interpret currently controlling mode | correct classification, confusion matrix, delayed response | Avoid cueing participants with the answer |
| Predict future limit exceedance | forecast error/decision suitability in scenario | Need ground truth and defensible scoring rule |
| Keep aircraft on performance envelope while changing mode | deviation from flight path or control tolerances; secondary-task cost | Appropriate aircraft/task conditions and simulator validity |
| Recover from unexpected failed command | recognition/recovery probability, elapsed time, unsafe actions | Inject meaningful, representative failure |
| Monitor several concurrent sources | event detection by salience/task relevance, sampling strategy, missed critical events | A 'balanced' gaze pattern may be less appropriate than selective attention |
| Execute procedure with correct intent | appropriate branching, missed/incorrect steps, state verification | Blindly completing checklist steps may still be wrong |
| Maintain coordination in team task | message completeness, latency, shared state agreement, cross-check success | Individual metrics miss distributed coordination |

## Eye-tracking and physiology — construct validity
- Fixation on element **does not prove comprehension**. Absence of fixation does not always prove non-perception (peripheral vision, valid anticipatory strategies, sample loss).
- Fixation count/dwell time must be interpreted relative to opportunity, visual salience and task priority, not universally as 'better'.
- Saccade pattern or pupil diameter can be influenced by luminance, workload, individual variation, instrumentation and competing task demands.
- HRV, EEG, EDA, fNIRS and pupil metrics are not interchangeable with workload and require a theory of the cognitive/physiological link and confound controls.
- SAGAT probes can assess specified SA elements but may alter the task and require probe coverage and scoring validity; also consider post-trial queries and task-based behavioral evidence.
- NASA-TLX assesses subjective workload and cannot alone establish functional adequacy, workload reserve, or physiological capacity.
- Prefer triangulation across **performance + targeted cognition probe + workload/process** when feasible.

## Test design protocol
A. Specify claim and source/analyst rationale.
B. Define representative scenario, actor proficiency, mode, timing, concurrency, visual conditions and failure opportunities.
C. Define dependent variable(s) operationally, unit, scoring, instrument, missingness rules, data quality.
D. Choose manipulated design factors and realistic levels (e.g., feedback availability, mode-status representation).
E. Control/order/counterbalance learning, flight proficiency, practice, scenario difficulty, simulator fidelity.
F. Determine hypotheses and meaningful effects; predefine exclusions, stopping and analysis where applicable.
G. Establish **independent** ground truth from simulator/system log and adjudicated scoring.
H. Evaluate safety-relevant tradeoffs, not a sole omnibus usability index.
I. Report confidence intervals, uncertainty and practical significance; failure rates need exposure denominator and precision.
J. Map outcomes back to requirements, decisions, sources and design changes.

## When comparing interface concepts
Use equivalence/non-inferiority logic only if suitable margins are established and sample size supports it; failing to reject a difference is not equivalence. If response time improves but errors rise, do not average them into a composite that hides safety-critical tradeoffs. Use participant and scenario as appropriate units/random effects in repeated-measures analyses.

## When testing procedures
Task analysis provides initiation criteria, needed prerequisites, branch/exception rules, division of labor, state checks and stopping/recovery conditions. Evaluate **correct effect on aircraft state**, not merely checklist completion. Test realistic interruption, workload, and abnormal scenarios; audit performance changes after training/adoption.

## Required crosswalk row
`TEST-ID | SC-ID | T-ID | D-ID | IN/CN-ID | claim | failure mechanism | primary outcome | secondary measure | threshold/rationale | acquisition method | verification/validation | evidence/status`

## Reporting
Distinguish engineering verification (specified requirement satisfied) from operational validation (the resulting system supports the intended human task). Neither a high SUS score nor a statistically significant eye-movement difference guarantees operational validity.
