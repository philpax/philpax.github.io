---
name: project-idea
description: Interview the user about a project idea, research prior art, and draft a concise note in content/notes/Projects/Ideas/. Use when the user wants to capture, develop, or revise a project idea for the notes.
---

# Project ideas

Capture an idea with enough detail to revisit it. A note records a possibility, not a commitment to build. Stop the interview once the idea is clear enough to record. Do not turn it into a complete design, feasibility study, or delivery plan.

## Output requirements

Every approval draft contains the complete note in this order, including the model attribution at the top and unchanged sections:

```markdown
*Drafted by <model name>.*

## Abstract

What the idea is, what it enables, and why it is worth exploring. Usually two or three sentences.

<!-- more -->

## Implementation

The mechanism that defines the idea, with relevant constraints or open questions. Usually one or two short prose paragraphs, without bullets. Leave nonessential implementation choices open.

## Prior art

- [Project or reference](URL): What it does and how it relates to the idea.
```

Place `<!-- more -->` after the Abstract and before Implementation. The site uses the attribution and Abstract before the marker as the preview and requires nonempty content after the marker to render a note.

Aim for roughly 200 to 400 words, including prior art. This is a soft target, not a minimum. A simple idea can be shorter. Do not add separate motivation, requirements, roadmap, or risk sections by default. Motivation belongs in the Abstract. If research finds no useful references, state that briefly under Prior art without claiming novelty. If research cannot be completed, state the limitation.

## Workflow

1. **Read the context once.** Read repository instructions, note naming conventions, and the Projects/Ideas indexes at the start, unless already available in the session. Identify the required validation commands and whether indexes need manual updates before saving. Check for an existing note about the idea. Use directory discovery for directories and file reads for files. Read relevant local notes or code only when they can answer a factual question. Do not rediscover conventions, probe unrelated package files, or inspect site internals after saving unless a concrete issue requires it. Establish the drafting model's identity from explicit session information or an operator-supplied name. If neither is available, ask for the attribution label without suggesting a guessed model or version.

2. **Interview for meaning and motivation.** Start from the description already supplied. Establish the central idea and what makes it useful or interesting before asking about secondary implementation choices. Ask about motivation only if it is not already clear. Ask questions that materially affect the note, not every choice an implementer will eventually face. Track settled choices and dependent questions. Ask independent questions together in small rounds; defer dependent questions until their prerequisites are answered. Use a structured question tool when available, with a self-contained briefing for each question. Recommend an answer only when there is a reason for it. Find facts through inspection or research rather than asking the user to supply them. Stop once the idea, motivation, and defining mechanism are clear enough to record. Point out direct contradictions or existing solutions without requiring a case for pursuing the project.

3. **Research and check prior art.** Once the idea is specific enough, search the web automatically for existing solutions and relevant techniques. Use alternative terminology when useful. Prefer original project pages, repositories, documentation, or papers. For each retained external reference, open the source and check the passage supporting the description and comparison. Search snippets alone do not verify a source. Keep only references that add useful context, usually a few, and stop once the relevant comparisons are supported. Do not search for extra libraries or implementation details merely to expand the note. Distinguish source claims from inferences. Describe technical differences without unsupported judgements about quality or legitimacy. Do not invent differences, include weak matches to meet a count, or infer novelty from an unsuccessful search. If sources cannot be opened or claims remain unverified, omit those claims and report the limitation. For delegated research, specify the scope, established idea and constraints, and a request for checked URLs, supporting passages, and brief relevance summaries. Use verified delegated findings without repeating the same research. Include local prior art when relevant.

4. **Resolve material findings.** Ask a follow-up only when research or an ambiguity changes the central idea, a defining constraint, or the comparison with prior art. Leave other choices open. Include library choices, API names, protocol flags, encoding details, or similar specifics only when essential to the idea or explicitly requested. Do not add milestones, intermediate versions, or alternative projects by default.

5. **Present a complete draft.** Apply the output requirements and pre-approval check below. Present the proposed filename and the complete note before asking for approval, including after revisions. Never replace a section with a statement that it carries over from an earlier draft. Keep the complete draft visible at approval; if a question tool hides earlier messages, include it in the question's context. Do not include the interview transcript, research log, or an extra list of implementation decisions to settle. Wait for approval before creating or updating the note.

6. **Save and verify.** Save exactly the approved note under `content/notes/Projects/Ideas/<Title_with_underscores>.md`, following existing filename conventions. Do not overwrite a different idea. Notes have no frontmatter; the filename supplies the title, so omit a repeated H1. Preserve the section indexes and use the validation instructions identified at the start. Check links to local notes and headings. Report the saved path and any unresolved research or validation limitation without repeating the note. Do not commit or push as part of this skill.

## Pre-approval check

Check silently before each approval request:

- The italic model attribution appears at the top, followed by the complete Abstract, Implementation, and Prior art, including unchanged content after revisions. No horizontal rule separates the attribution from the content. Exactly one `<!-- more -->` marker separates the Abstract from Implementation, with nonempty content on both sides.
- The Abstract includes the user's motivation. Implementation uses short prose without bullets, milestones, or nonessential specifics. The note contains no invented preferences or repeated informal framing.
- Retained source claims and comparisons have checked support. The attribution uses a confirmed drafting model name. Research limitations and important unknowns are stated accurately.

## Prose

Use direct language, concrete claims, short sentences, and consistent terminology. Keep headings and links, with lists for prior-art references. Avoid promotional language, rhetorical contrasts, decorative emphasis, and unnecessary asides. Keep each paragraph on one source line.

Preserve the meaning of informal descriptions without repeatedly copying or amplifying their wording. A casual description such as "incredibly cursed" need not become the note's framing. State the mechanism and motivation instead. Personal wording and first-person statements are permitted when they accurately reflect the user's account. Do not invent experience, motivation, or preferences. These principles are self-contained; do not import a separate prose skill or require its full rules or third-person prose.

## Attribution

Every idea starts with the italic paragraph `*Drafted by <model name>.*` before the Abstract, without a horizontal rule. This attribution is the exception to the guidance against decorative emphasis. Use the drafting model's confirmed name, including a variant label when supplied. For example, the operator-supplied label `GPT-6.1-Sol` produces `*Drafted by GPT-6.1-Sol.*` Do not infer model identity from an assistant persona or product name. A research subagent's model does not replace the drafting model in the attribution.

When revising an existing note, preserve its original drafting attribution. If another model materially redrafts the text, append `Revised by <model name>.` within the same italic paragraph in the complete draft for approval. Save that attribution only with approval of the complete draft. Do not replace an original drafting credit with the model that merely researched or made a small edit.

## Interview reference

The interview procedure adapts the dependency-aware rounds and separation of facts from decisions in [Matt Pocock's grilling skill](https://raw.githubusercontent.com/mattpocock/skills/refs/heads/main/skills/productivity/grilling/SKILL.md). It stops when the idea is clear enough for a concise note rather than requiring every design decision to be resolved.
