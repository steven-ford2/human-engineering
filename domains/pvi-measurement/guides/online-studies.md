# Online quantitative UX designs for pilot–vehicle interfaces

Remote studies can investigate **symbols, modes, annunciation meaning, preference, information retrieval, text readability, and decision comprehension**. They do not substitute for aircraft/simulator operational validation; physical legibility, eye-display registration and reaction time require controlled hardware and software conditions.

## Decision-first matrix

| Question | Good approach | Measure | Avoid claiming |
|---|---|---|---|
| Which symbol communicates state better? | Balanced monadic or within-person timed identification | Accuracy, latency, confidence | That preference proves comprehension |
| Which alert representation leads to better prioritization? | Consequence-grounded vignette/forced choice | Correct triage, missed/false alarm | Certification from remote exposure |
| Which aspects are valued most? | MaxDiff / best–worst across balanced subsets | Relative utilities | Absolute usability or safety |
| Which full display is favored? | Sequential monadic plus paired choice | Per-design rating and preference | That liking predicts flying performance |
| Which functionality tradeoffs are acceptable? | DCE/conjoint with controlled feature combinations | Attribute utilities | Stable estimates from 6 respondents |
| Which indication is legible? | Timed recognition at measured visual angles | Recognition curve | Absolute thresholds on uncalibrated screens |

## 25 reusable study designs

### 1. Counterbalanced within-subject A/B
**Purpose:** Pilot sees both conditions. **Primary outcomes:** Paired accuracy/time/SEQ differences. **Protocol:** Use alternate item forms; balance A→B vs B→A. **Validity limitation:** Carryover and fatigue; n pilots, not n trials. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 2. Parallel monadic
**Purpose:** Each participant sees one design. **Primary outcomes:** Between-group accuracy/satisfaction contrast. **Protocol:** Randomize assignment and hold stimulus equal. **Validity limitation:** Small n inefficient; baseline imbalance. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 3. Sequential monadic
**Purpose:** Each pilot evaluates independently then directly compares. **Primary outcomes:** Condition scores plus final preference. **Protocol:** Collect objective data before direct comparison. **Validity limitation:** Ordering bias and motivated preference. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 4. Paired forced choice
**Purpose:** Pilot chooses between two designs for a fixed goal. **Primary outcomes:** Choice proportion. **Protocol:** Randomize left-right and order. **Validity limitation:** Preference is not correctness. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 5. Best–worst scaling / MaxDiff
**Purpose:** Pick most and least important items from balanced subsets. **Primary outcomes:** Relative utilities / best-minus-worst scores. **Protocol:** Balanced incomplete block design and repeated exposures. **Validity limitation:** Latent utilities weakly identified with small n. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 6. Discrete-choice experiment
**Purpose:** Choose alternatives with several controlled features. **Primary outcomes:** Feature tradeoff utilities. **Protocol:** Fractional-factorial choice design; limit attributes. **Validity limitation:** Heavy sample demand; model assumptions. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 7. Conjoint ratings
**Purpose:** Rate randomized bundles of interface attributes. **Primary outcomes:** Marginal effects on ratings. **Protocol:** Block stimuli, use neutral anchors. **Validity limitation:** Rating responses not revealed preferences. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 8. Full ranking
**Purpose:** Rank a limited list of design attributes. **Primary outcomes:** Rank concordance. **Protocol:** Randomize presentation order. **Validity limitation:** No magnitude between ranks. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 9. Constant-sum allocation
**Purpose:** Assign 100 points across usability priorities. **Primary outcomes:** Relative importance proportions. **Protocol:** Check totals and explain unavoidable tradeoffs. **Validity limitation:** Ipsative compositions; cannot analyze items as independent. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 10. Vignette state prediction
**Purpose:** Read synthetic mode state then predict next action. **Primary outcomes:** Correctness, latency, confidence. **Protocol:** Predeclare state machine; randomly vary display only. **Validity limitation:** Tests interpretation not full simulator competence. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 11. Timed symbol comprehension
**Purpose:** Expose new symbology briefly. **Primary outcomes:** Correct identification and response time. **Protocol:** Equivalent symbols, fixed timing, device stratification. **Validity limitation:** Uncalibrated remote contrast, visual angle. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 12. Alert triage judgments
**Purpose:** Order response priorities in a synthetic compound alert. **Primary outcomes:** Rank accuracy, harm-weighted misranking. **Protocol:** Expert review of consequences and response windows. **Validity limitation:** Priority depends on operational context. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 13. Signal-detection displays
**Purpose:** Target-present and target-absent screens. **Primary outcomes:** d-prime, criterion, RT. **Protocol:** Fix prevalence; record missed targets and false alarms. **Validity limitation:** Small n yields unstable extreme rates. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 14. Confidence calibration
**Purpose:** Ask confidence 0–100 for objective response. **Primary outcomes:** Brier score / calibration. **Protocol:** Sufficient mixed-difficulty items. **Validity limitation:** Few responses cannot estimate individual calibration. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 15. Information retrieval challenge
**Purpose:** Find correct instrument value in display. **Primary outcomes:** Time and accuracy. **Protocol:** Matched demands; cancel timing if incorrect. **Validity limitation:** Screen reading versus understanding. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 16. Recognition-memory comparison
**Purpose:** Recall important annunciated state after delay. **Primary outcomes:** Delayed correctness. **Protocol:** Equivalent lure difficulty and delay. **Validity limitation:** Memory not identical to situational awareness. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 17. Adaptive threshold staircase
**Purpose:** Identify characters over changing contrasts/exposures. **Primary outcomes:** Psychometric threshold. **Protocol:** Predefine adaptive algorithm/catch trials. **Validity limitation:** Online devices cannot establish physical luminance threshold. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 18. ABAB single-case
**Purpose:** Alternate intervention and baseline on repeatable tasks. **Primary outcomes:** Change in per-phase individual trend. **Protocol:** Stable baseline and reversible effect. **Validity limitation:** Learning violates reversibility. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 19. Multiple-baseline single-case
**Purpose:** Stagger intervention across tasks/pilots. **Primary outcomes:** Cross-baseline timing contrast. **Protocol:** Enough stable observations and independent replication. **Validity limitation:** History and drift. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 20. Repeated diary / experience sampling
**Purpose:** Brief evaluations after real or simulated tasks over time. **Primary outcomes:** Within-person trends. **Protocol:** Timestamp event and same questionnaire anchor. **Validity limitation:** Recall, self-selection, incomplete episodes. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 21. Instrumented prototype A/B
**Purpose:** Randomized UI variants logged during use. **Primary outcomes:** Task completion, errors, navigation. **Protocol:** Equal fidelity; verify instrumentation. **Validity limitation:** Prototype might not represent physical cockpit. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 22. Balanced incomplete-block comparison
**Purpose:** Each respondent evaluates subset of many designs. **Primary outcomes:** Relative task accuracy or preference. **Protocol:** Network-connected comparisons and design balance. **Validity limitation:** Sparse comparisons lead to unreliable ranking. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 23. Response-surface experiment
**Purpose:** Manipulate symbol size/contrast/clutter continuously. **Primary outcomes:** Performance function and interactions. **Protocol:** Limited-dimensional factorial or central composite plan. **Validity limitation:** Uncalibrated online stimuli. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 24. Interrupted task resumption
**Purpose:** Insert competing task at scripted moment. **Primary outcomes:** Resumption time, omission count. **Protocol:** Match interruption relevance and duration. **Validity limitation:** Artificial interruption may differ from operations. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.

### 25. Voice versus HOTAS crossover
**Purpose:** Compare equivalent command goals under both modalities. **Primary outcomes:** Command accuracy, latency, repetition. **Protocol:** Counterbalance modality and command vocabulary. **Validity limitation:** Speech acoustics/device confounds. **Small-N:** Pilot-level uncertainty and individual trajectories; the count of trials does not multiply independent participant n.


## Worked 12-participant symbol comprehension study (illustrative logistics, not a power calculation)

Recruit 12 qualified/target-representative pilots as a formative *example*, record prior exposure and training. Show two alternative synthetic sensor-state indicators for four statuses (normal, failed, inhibited, stale). Create at least two equivalent scenes per status. Randomize condition order A/B and task items; maintain fixed presentation duration, zoom instructions and accessible controls. Record chosen meaning, answer time, confidence 0–100, and a short post-task ease response. Only after both blocks collect paired preference.

**Primary estimand:** mean participant-level paired difference in correct state identification. Secondary: correct-answer latency, confusion matrices, confidence calibration, and SEQ by condition. Incorrect/failed trials must be visible; a low completion time on wrong answers is not superior. With 12 participants the result is formative and imprecise; report effects and uncertainty, do not declare population equivalence.

## Vignette: automation mode

*A synthetic flight-guidance controller reports NAV active and APP armed. Its capture guard is not satisfied. If no new command arrives, which mode will be controlling?*

Use response alternatives grounded in a versioned synthetic state machine, not undocumented assumptions about actual aircraft. Present alternative display designs with the same system truth and score both **state identification** and **next-state prediction**. Include confidence to distinguish accurate understanding from guessing.

## MaxDiff design example

Ask which of five cues is **most** and **least** useful for rapidly detecting unavailable sensor information: explicit word, shape change, stable location, source annunciator, or sound. Vary the subsets across respondents with near-balanced exposure, randomize screen positions, fit a suitable choice model, and show interval estimates. In small samples favor exploratory within-pilot best-minus-worst and transparent counts; population utilities can be highly unstable.

## Good administration practice

1. Eligibility and scenario familiarity; avoid collecting employer, program or restricted aircraft details.
2. Explain neutral synthetic task goal without revealing desired answer.
3. Capture objective choices, errors, and response timestamps before asking evaluative ratings.
4. Use validated ASQ/SEQ/TLX/SUS only as written and at appropriate timepoints; do not collect an entire large battery on every trial.
5. Randomize order and layout; log device class, scaling, task version, exposure time and missingness.
6. Analyze within-pilot paired effects where appropriate; cluster observations by pilot and scenario; predeclare primary outcome, multiplicity plan and stopping.
7. Present objective-versus-preference disagreement rather than averaging them into one score.
8. For low n, use accurate counts, uncertainty intervals, graphical individual differences, rater/coding repeatability, and limitations.

**Selected sources:** [ISO 9241-11](https://www.iso.org/standard/63500.html); [FAA usability evaluation Appendix C](https://rosap.ntl.bts.gov/view/dot/12411); [Lewis 1995](https://doi.org/10.1080/10447319509526110); [Louviere et al., Best–Worst Scaling](https://www.cambridge.org/core/books/bestworst-scaling/); [Endsley 1995](https://doi.org/10.1518/001872095779049499).
