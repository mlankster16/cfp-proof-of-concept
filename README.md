# Duke Coursera Specialization CFP: proof of concept

A static GitHub Pages site that gives Duke faculty the essentials for applying to the Duke Coursera Specialization Call for Proposals. This is a working proof of concept. The structure, behaviour, and visual system are ready to review; several content decisions are still open and appear as highlighted placeholders.

## Source of truth

Copy on these pages mirrors the CFP content draft (Word/Google Doc) reviewed by CTL. When copy changes, change the doc first, then update the site to match. Don't rewrite copy on the site directly.

## Important: this repo is public

GitHub Pages sites are public, even from a private repo, unless the organization uses GitHub Enterprise Cloud with Pages access control. Commit history is public too.

- Only commit content that's approved for faculty.
- Never commit internal material from the CFP Internal Planning Document: revenue share percentages, internal context for Priority 1 (gift connection, selection likelihood), budget confirmations, or review notes.
- Keep drafts and internal notes in the private review doc, not in HTML comments, branches, or issues.

## Files

    index.html                 Main CFP page (single scrolling page, sticky "On this page" menu)
    high-demand-topics.html    Priority 2 appendix (placeholder structure: 5 categories x 5 topics)
    form-preview.html          Every proposal form question, printable, for drafting offline
    site.css                   All styles and design tokens
    site.js                    Placeholder links, current-section highlight, fit check
    assets/ctl-logo-white.png  Duke CTL logo
    .nojekyll                  So GitHub Pages serves files as-is

Plain HTML, CSS, and vanilla JS. No framework, no build step, no dependencies beyond Google Fonts (EB Garamond, Open Sans).

## Visual system

Shared with the Coursera Development Pathways site and the Coursera Design Guide (https://mlankster16.github.io/coursera-design-guide/): same shell, brand bar, header, type, and color tokens. The CFP's own accent is teal (`--teal`, `--teal-text`), used for the deadline, current nav item, and key-dates timeline. Tokens are CSS variables at the top of `site.css`.

## Placeholders for open decisions

Two conventions, both searchable:

- **Text:** `<span class="tbd">[description]</span>` renders with a yellow highlight.
- **Links:** `<a href="#" data-tbd="description">` gets a dashed yellow outline and a tooltip, and doesn't navigate. `site.js` applies this automatically.

To fill one in, replace the span with final text, or set a real `href` and remove `data-tbd`. Before launch, `grep -n 'tbd' *.html site.js` should return nothing (except the class definitions in `site.css`, which can then be removed along with the draft banner).

Current open items:

| Item | Where it appears |
|---|---|
| Submission deadline | Hero, key dates, how to apply, apply banner |
| Submissions open date | Hero, key dates |
| Proposal form link | Nav Apply button, hero, how to apply, fit check result, form preview |
| Contact email | Footer (all pages) |
| Eligibility (faculty types) | Hero at a glance |
| Faculty time estimate (60 to 90 hours per Course) | Hero at a glance, what you'd commit to |
| Expected launch range | What you'd commit to |
| How incentives are divided among multiple instructors | Incentives and ownership |
| IP language (pending Provost confirmation) and Appendix M link | Incentives and ownership |
| AI at Duke report link | About this call |
| Example Duke Coursera Specialization link | What a Specialization includes |
| Box or Google folder for materials | How to apply, form preview Section D |
| Estimated time to complete the form | Apply banner |
| Coursera Development Pathways URL | Footer (all pages) |
| Program or fellowship name, if used | Not yet on the site; may affect title and hero |

## Proposed form question

`form-preview.html` includes a question in each Course block of Section E, marked "Proposed addition, under review": which learner-facing materials already exist, and whether the faculty member has taught with them. It's shown with a dashed gold border. If the question isn't adopted, remove those blocks and change "the proposal form asks about each" in `index.html` (What you need to apply) to "describe both in your proposal."

## Fit check (`#fit-check` on index.html)

Six questions shown one at a time, then a summary. Answers stay in memory only; nothing is stored or sent. Each answer carries one level, based on the CFP review criteria:

- `ready`: meets the criterion
- `address`: worth working on before applying
- `major`: a Required criterion isn't met, or availability is a clear no

Overall result: any `major` gives "This call may not be the right fit right now"; otherwise any `address` gives "Your idea may fit, with a few things to work through"; otherwise "Your idea looks like a good fit for this call." Results are grouped under "Worth talking with us about first," "To work on before you apply," and "What looks ready."

| Question | Options and levels | Criterion |
|---|---|---|
| Priority track | P1 / P2 / P3 ready; Not sure address | Topic alignment (Required) |
| Three related Courses | Yes ready; Maybe address; No major | Specialization structure (Required) |
| Materials now | Taught-with learner materials ready (mentions shorter-timeline conversation); expertise materials ready; new idea major | Existing materials (Required) |
| 9 to 12 months from mid-Spring 2027 | Yes ready; Later start address (mentions 2028 shortlist); No major | Availability |
| Outside approvals or complex production | No ready; Yes address; Not sure address | Feasibility |
| Talked with dean | Yes ready; Not yet address | Dean acceptance of award |

All question text, options, and result notes live in the `QUESTIONS` array in `site.js`. The fit check is a planning aid and says so in its intro and result. It shouldn't be worded as predicting selection.

Accessibility: options are real `<button>` elements, focus moves to each new question heading and to the result heading, progress text is in an `aria-live` region, and a `<noscript>` message points to the review criteria.

## Suggested next steps for the build

1. Create the repo, copy these files to the root, and enable Pages (Settings, Pages, deploy from `main`, root).
2. Verify fonts load (the screenshots used during prototyping fell back to system fonts).
3. Test the fit check reaches all three result states, including Back and Start over.
4. Check keyboard navigation, visible focus, and layout at 390px, 820px, and 1200px.
5. Check print preview on `index.html` and `form-preview.html` (nav, fit check, and draft banner are hidden in print).
6. Consider a "hide placeholder highlights" toggle for stakeholder demos, if useful.

## Acceptance checklist

- No console errors on any page.
- Every internal link and anchor resolves.
- At 820px and below, grids collapse to one column and the header nav wraps cleanly.
- The draft banner and all `tbd` markers are removed before the site is shared as final.
