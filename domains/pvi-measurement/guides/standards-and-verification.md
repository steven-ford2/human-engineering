# Standards, measures, and verification evidence

The Measurement Atlas maps candidate evidence to current public standards and guidance so a team can plan a test—not declare compliance from a search result.

## The boundary that matters

A measure produces an observation. A requirement defines what must be true. A verification method connects an applicable requirement, controlled test conditions, an acceptance rule, and recorded evidence. Keep those roles separate.

> Operational scenario → user task → required information or control → applicable requirement → test condition → measure and acceptance criterion → evidence artifact → result and discrepancy disposition

Use the interface labels this way:

- **Direct criterion if invoked:** the source contains a criterion that may be a requirement after the exact revision/clause is invoked and tailored for the program.
- **Program requirement if invoked:** the source defines required human-engineering program work when invoked; it does not mandate one universal questionnaire.
- **Means-of-compliance guidance:** the source describes evidence an authority may accept. It does not itself impose the requirement.
- **Supporting guidance / supplemental benchmark:** useful methods or comparison points whose applicability must be established.
- **Metadata-only context:** public scope/status was verified, but controlled or unavailable text was not used for a clause-level claim.

## Current DoD anchors

### MIL-STD-1472H

The current public ASSIST record is **MIL-STD-1472H, Notice 1** (Notice dated 10 April 2026; base revision dated 15 September 2020). It includes candidate criteria for workload and system performance, visual displays, HUD/HMD, anthropometric accommodation, and simulators.

Treat a mapped measure as direct verification evidence only after the program confirms the exact invoked revision, clause, tailoring, configuration, user population, test condition, and acceptance criterion.

[Official ASSIST record](https://quicksearch.dla.mil/qsdocdetails.aspx?ident_number=36903)

### MIL-HDBK-516D—not 516C

**MIL-HDBK-516D**, dated 29 May 2026, superseded 516C. The handbook states that it is guidance and cannot itself be cited as a requirement. Its crew-station, display, alerting, control-accommodation, vision, workload, and handling-qualities criteria are candidates for an authority-approved certification basis and means of compliance.

Do not write “516D compliant.” Record the approving authority, selected/tailored criterion, means of compliance, configuration, evidence reference, result, and closure status.

[Official ASSIST record](https://quicksearch.dla.mil/qsDocDetails.aspx?ident_number=212162)

### Related sources

- [MIL-STD-46855A](https://quicksearch.dla.mil/qsdocdetails.aspx?ident_number=113938) supports human-engineering task/workload analysis, representative-user testing, quantitative criteria, discrepancies, and error analysis when invoked.
- [MIL-HDBK-87213B](https://quicksearch.dla.mil/qsDocDetails.aspx?ident_number=123715) provides detailed airborne-display measurement guidance; it is guidance, sample specification language contains blanks, and some HMD verification text is unresolved.
- [MIL-STD-3009](https://quicksearch.dla.mil/qsDocDetails.aspx?ident_number=209352) covers NVIS-compatible aircraft lighting and display emissions in its stated scope.
- [MIL-STD-1797B](https://quicksearch.dla.mil/qsDocDetails.aspx?ident_number=70037) is the current public handling-qualities record, but its full text is controlled. The Atlas exposes metadata context, not an invented clause crosswalk.

## Build a defensible evidence package

For a display-readability claim, combine as applicable:

1. Physical measurements—luminance, contrast, uniformity, reflection, character angular size, color, resolution, latency, or geometry—with calibration and uncertainty.
2. Representative-user task evidence—detection, recognition, reading, diagnosis, action, errors, time, and operational outcome—under specified lighting, equipment, posture, motion, workload, and failure states.
3. Supporting evidence—workload, comfort, situation awareness, gaze, preference, symptoms, and comments—without substituting these for physical or task criteria.
4. Traceability—the applicable requirement, exact revision/clause, program tailoring, test procedure, configuration, raw data, analysis, result, discrepancy, and authority disposition.

For anthropometric or ergonomic claims, record the approved target population and multivariate boundary cases. A few percentile manikins do not demonstrate simultaneous reach, clearance, visibility, restraint, strength, helmet, and posture accommodation.

## Claims not supported by a finder result

- “This measure is MIL-STD-1472 compliant.”
- “The system is MIL-HDBK-516D compliant.”
- “A value shown in MIL-HDBK-87213B is a universal requirement.”
- “A workload, usability, comfort, or situation-awareness score proves safety or certification.”
- “A NASA/FAA finding or threshold automatically transfers to a fighter aircraft, another display, or another mission.”
- “A metadata-only or controlled standard has a verified clause mapping.”

The source audit and full clause inventory are in [Aviation measures and standards crosswalk](../../../docs/research/aviation-measures-and-standards-crosswalk.md).
