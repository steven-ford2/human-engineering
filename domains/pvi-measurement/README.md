# Pilot–Vehicle Interaction Measurement Atlas

A construct-first library of **279 quantitative candidate measures across 34 constructs** for usability, workload, situation awareness, flight-deck displays, HUD/HMD and vision science, pilot control behavior, physical ergonomics, and simulator/online experimental evaluation.

**Interactive browser:** Launch the local Atlas and open **Measures** (`#/measures`). Start with the **Coworker guide**, use aviation and standards presets, then open any measure profile to inspect operationalization, source-bounded reliability/validity evidence, factor/item evidence, appraised study uses, and candidate verification mappings.

## Contents
- [Machine-readable catalog](catalog/measures.json) — 279 versioned records with modality, timing, definition, operationalization, reliability appraisal, limitations, pilot-task context, analysis and research pointers.
- [Evidence library](catalog/measurement-evidence.json) — standards, clause-level mappings, appraised studies, deep measure profiles, and psychometric concepts used by the interactive interface.
- [Source index](catalog/sources.md) — selected primary/official source identities and links. A source cross-reference is *not* proof that every candidate measurement was validated by that source.
- [Small-N online study designs](guides/online-studies.md) — vignette comparison, paired designs, MaxDiff, best–worst, discrete-choice, monadic and preference/comprehension experiments.
- [Measurement and reliability](guides/reliability-validity.md) — psychometrics, repeatability, generalizability, telemetry fidelity and analysis practices.
- [Standards and verification](guides/standards-and-verification.md) — how to use mapped evidence without turning a handbook, measure, or study into an unsupported compliance claim.
- [Pilot simulator protocols](guides/simulator-protocols.md) — PFR/attitude, alerting, automation, sensor interpretation and HOTAS studies.
- [Questionnaire and event templates](templates/study-design.md) — reusable source-aware protocols; no instrument copyrighted item reproduction.
- [Measurement selection worksheet](templates/measure-selection.csv) — blank data dictionary worksheet.

## Browse hierarchy
Choose a construct (e.g. effectiveness, ease, situation awareness, visual workload, mode awareness); then compare objective vs subjective measures and collection instrumentation. Ingest these measures into a preregistered experiment *after* defining mission task, correct state, pilot population, scenario and expected failure modes.

## Evidence classification
1. **Named validated instrument:** published instrument development or psychometric research exists. Any coefficient is source- and sample-specific.
2. **Research precedent:** published paper used related measurement; not automatic construct validity in another aircraft/task.
3. **Candidate operational measure:** engineered measurement approach with explicit formula, requiring local reliability and validity work.

NASA-TLX, SUS, UMUX-LITE, ASQ, PSSUQ and Cooper–Harper each have administration/scoring constraints. Do not alter instruments and still imply the original psychometrics apply. To use original instruments, consult their linked authoritative manuals/papers.

## Boundaries
All examples use invented public-release scenarios. No real-world aircraft performance limits, classified systems, restricted designs, pilot-program data or approval claims are supplied. FAA guidance applies to specified contexts and does not automatically establish certification compliance. The catalog intentionally does **not** prescribe ideal gaze patterns, universal stick-workload cutoffs or numeric acceptance thresholds.

Research source: 32 catalog anchors plus study-specific citations in the evidence library; latest catalog editorial update: October 2026.
