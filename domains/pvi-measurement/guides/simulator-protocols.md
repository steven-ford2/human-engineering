# Worked simulator protocols (synthetic, non-operational)

Each protocol requires human-factors approval, scenario/task pretesting and a pilot-population rationale. Numerical pass/fail criteria require separate documented programmatic authority.

## HMD primary-flight-reference evaluation

**Question:** Does the presentation improve recognition and recovery in defined unusual-attitude scenarios?

**Setup:** Scripted matched initial conditions and flight dynamics, comparable HMD latencies/registration, sufficient training, randomized presentation order, matched disturbances and secondary-task conditions.

**Primary:** Recovery success, onset-to-stable-recovery latency, altitude loss, safety-envelope time. **Secondary:** First appropriate control latency, pitch/roll errors, stick aggressiveness and duty cycle (publication-specific formulas). **Diagnostic:** Gaze/head AOIs on displayed reference, brief workload rating, direct comprehension probes in separate trials.

**Caveats:** Severe outlier losses must remain visible, gaze does not directly prove comprehension, and aggressive control can be compensation not cognitive workload.

## Warnings, cautions and advisories

Script plausible but synthetic abnormal-condition triggers with recorded active/suppressed mode truth. Score **correct prioritization, alert-state comprehension, timely appropriate intervention, hazard exposure**. Record detection, acknowledgment, false responses and display transitions, not only acknowledgment time. Cross-check whether the pilot's chosen action was actually appropriate to the documented state.

## Automation state comprehension

Synthetic state machine with commanded/armed/active/inhibited/failed states and guarded transitions. Compare UI designs using **state identification, correct behavior prediction, mode-error count, detection latency** and confidence calibration. Run vignette study before expensive simulator iteration.

## Tactical multifunction display

Standardized data-finding tasks while pilot maintains an equivalent primary flight-control objective. Measure **correct data retrieval, search latency, interaction steps, detours, inappropriate selections, gaze transitions and primary-flight cost**. Balance target position/menu depth and prior familiarity.

## Voice versus HOTAS/touch

Counterbalanced benign synthetic command set with declared signal-to-noise, push-to-talk and vocabulary. Measure **semantic command success, false acceptance/rejection, repetitions, recognition and execution latency**. Word error rate is secondary; it is not a command-safety statistic.

## Instrumentation dictionary

Capture synchronized clocks for simulator truth state, control inputs, annunciation state, touch coordinates, voice segments/ASR confidence, head- and world-referenced gaze, visual frame changes and scenario events. Store pilot/scenario/trial IDs. Document filtering, deadzones, missingness, software versions and exclusions.

### Example scenario matrix

| ID | Initial state | Trigger | Intended task | Ground truth |
|---|---|---|---|---|
| SYN-PFR-01 | Stable flight | Scripted attitude change | Restore prespecified stable condition | Simulator state log |
| SYN-MODE-01 | NAV active, APP armed | Guard unmet | Predict mode and respond appropriately | Versioned state machine |
| SYN-ALT-01 | Multi-alert | Synthetic fault | Classify and prioritize | Hazard-logic record |

Do not publish sensitive real aircraft thresholds or employer/proprietary data. See [measurement catalog](../catalog/measures.json) and [FAA V2 Appendix C](https://rosap.ntl.bts.gov/view/dot/12411).
