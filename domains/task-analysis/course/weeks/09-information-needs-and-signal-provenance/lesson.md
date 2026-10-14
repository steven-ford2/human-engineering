# Week 09 — Information needs, information quality and signal provenance

**Type:** graduate teaching lesson, engineering method and synthetic laboratory. **Source labels:** published framework vs [SYNTHESIS] engineering integration vs [HYPOTHESIS] case must be kept separate.

## Learning objectives
- Describe the core analytical problem and classify its variables correctly.
- Execute the method protocol in a synthetic aircraft/operator scenario, maintaining provenance.
- Convert its findings into a falsifiable design/requirements/test implication and critique one serious weakness.

## Teaching lecture

### A pilot doesn't consume 'signals'; a pilot must judge
The software architecture and the operator's cognitive architecture meet at the interface, but they describe different things. A discrete avionics bus field, fused track, estimated flight state or controller mode is an **engineering representation**. What the pilot needs is often a proposition: *Is the reported state reliable enough to support my decision? What does this status imply about what the system will do?* A value without meaning, timestamp, validity, units or source ownership can satisfy a display specification and still fail an operator.

### Separate semantics, source, condition and representation
A rigorous IN record begins with **goal and decision**. Ask what proposition or relation must be known. Then specify source semantics (sensor/system, raw vs inferred vs commanded), quality constraints, temporal demand, update rate and staleness tolerance, operating mode, quality flags, degraded states, competing attention and error consequence. Only after this do you specify alternative perceptual encodings or retrieval actions.

**Semantic type mismatch:** a requested mode state is not an engaged mode state. A last-issued command is not an independently verified effect. A position estimate in one coordinate frame is not a coordinate in another. A message received is not necessarily acknowledged by another actor. If the data model treats those as synonyms, the interface cannot repair the logical error by using a brighter color.

### Required versus available
An information requirement can fail in at least six ways: unavailable, stale, incorrect, insufficiently precise, valid but out of context, or available but cognitively inaccessible under real work. Represent those cases separately and investigate whether a quality cue is itself an information need. Avoid implicitly promising data that the architecture cannot deliver: an analyst should flag the unallocated function/source as a program issue rather than writing a display-level requirement for impossible certainty.

### Reliability without false precision
Do not assume a human can infer every hidden variable or that a more complete interface always improves decisions. Data fusion may reduce burden while hiding contradictory inputs; high detail may assist diagnosis while distracting from time-constrained control. Design may need to preserve actionable uncertainty and distinguish source unknown from source failed. The appropriate choice is task- and safety-dependent and must be evaluated.

### Build the signal-to-decision digital thread
**Physical/system condition → measurement or logical source → processing/inference → data object → transport/update → PVI representation → pilot interpretation → decision → operator input → system effect.** Mark data provenance, reference frames, state owner, failure behavior and availability at each link. **One need can depend on many sources; one source can serve many decisions.** Do not model the entire avionics architecture as one task row.

### Requirements after verification of possibility
A need may imply changes at several levels: sensor integrity or architecture, state management, data handling, alert allocation, display information architecture, or training. Before selecting where to fix it, ask whether the engineering system can generate reliable information, and whether the crew really needs to perceive, comprehend or predict it in the target scenario.

## Worked synthetic example [HYPOTHESIS]

**A-2 deferred activation:** the request field says B, command acceptance says true, controlling state remains A. IN-A2 is *determine whether B is actually controlling*. Current UI highlighting B reports **selection**, not active control, so the representation has failed the semantic need even though the source data are internally correct. Engineering options: expose separate active state, redesign selection-state language, or prevent ambiguous command confirmation, depending on architecture and human study. Test with ground-truth source logs and correct classification/recovery; gaze is diagnostic only.

## Practical method [SYNTHESIS]

Start at D-ID → write operational question → list needed relations and source semantics → identify authoritative data objects, owner and transformation → record update/validity/quality/mode constraints → compare actual availability with requirement → analyze failure and source disagreement → propose allocations and design alternatives → design experiment with contradictory/stale as well as nominal trials.

## Applied lab and work product

Write 12 IN records for case A. Include *required-vs-available*, one inferred/estimated value, one contradictory source, an age/latency concern, and a non-source (unknown) state. Diagram at least six nodes in the data lineage. Identify which unmet needs require architectural work rather than UI styling.

## Retrieval and red-team questions
1. What does data presence fail to establish about information adequacy?
2. Can a perfectly accurate mode selection field be misleading? Explain.
3. How would you prove a displayed estimated state is sufficiently current?
4. Where must validity/uncertainty enter the task-to-display trace?
5. Which measure tests whether the pilot correctly distinguishes status truth from reported intent?

## Source-linked reading
[Guyton et al. 2025](https://github.com/steven-ford2/FighterJets/blob/main/references/task-analyses-mbse.md); [Course 16 architecture](https://github.com/steven-ford2/FighterJets/blob/main/courses/16-pvi-systems-integration-mbhse/README.md); [information-needs CSV](../../../templates/information-needs.csv)

## Pass/revise criterion

Pass when critical information needs have data semantics, provenance, quality and mode contexts. A missing authoritative source is escalated, never silently replaced with an icon.

## Cross-method challenge
What would an HTA-only, GDTA-only, ACTA-only or design-first analyst miss in this case? Write two explicit limitations and a plan to acquire disconfirming evidence. Enter findings into [weekly practice log](../../../training/practice-log.md).
