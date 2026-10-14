# Task analysis quality and maturity assessment rubric v0.1

**Scoring:** 0 = absent; 1 = mentioned but unsupported; 2 = adequate evidence, partial detail; 3 = strong and inspectable. Numeric scores facilitate discussion, not official compliance or empirical weighting.

| Dimension | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Operational scope/actors | absent | generic mission | clear users and boundaries | scenario coverage and explicit exclusions |
| Function/task/decision ontology | conflated | partially defined | clear unique records | consistent cross-linked model |
| Elicitation quality | guesses | SME preference only | systematic elicitation | triangulated, non-leading, exceptions tested |
| Cognitive demands | action-only | a few cues | goal/decision/cues captured | expertise, uncertainty and prediction analyzed |
| Information needs | feature list | raw parameters | decision-linked needs | timing, quality, provenance, gaps and failure |
| Control needs | button list | intentions | authority/feedback | state, inhibition, recovery, timing analyzed |
| Context/branches | nominal only | some nonnominal | relevant degraded cases | prioritized and justified coverage |
| Human limits/workload | absent | labels only | timed/concurrent work | measured/predicted with assumptions and limitations |
| Error and safety | absent | known concerns | traceable error/hazard linkage | failure mechanisms and recovery validated |
| Requirements linkage | absent | suggestions | verifiable/allocated requirements | traceable, quality checked, config managed |
| Test derivation | preference alone | undirected metrics | claim-specific outcome measures | justified thresholds, confounds, construct validity |
| Provenance/reproducibility | no sources | anecdotal | references/status | independent review and adjudication documented |

## Hard-stop omissions regardless of total
- Classified/export-controlled or employer-restricted information improperly stored.
- Any safety-critical design decision without a stated evidence/uncertainty basis.
- Claims of proven design sufficiency from only subjective preference or proxy measurements.
- Task analysis without identifiable operator goal and operational context.
- Missing command-state feedback path where required by the control intent.
- Fabricated performance targets, timestamps, sources or "validated" labels.

## Reviewer instructions
1. Blind review artifacts before hearing author rationale.
2. Pick 3 consequential proposed interface choices and trace each back to task → decision/need → evidence.
3. Pick 3 quantitative test measures and trace back to construct/claim and outcome.
4. Challenge one degraded scenario and one task handoff.
5. Record disagreements in an issue log; do not silently average divergent categorical interpretations.
6. Assign corrective action, owner, evidence needed and closure decision.

## Calibration approach
Use a frozen common dataset and at least two independent analysts. For each categorical element compare presence and labels, and for linked relationships compare pairwise agreement. Examine asymmetric omissions in critical scenarios separately. Interpret kappa/alpha or similar statistics in light of prevalence, unit boundaries, sample size and adjudication; do not declare expert-quality analysis from a single headline agreement number.
