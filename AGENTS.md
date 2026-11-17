# Site and Updates workflow

This is Kai's personal Quarto site. Preserve its casual voice and existing visual identity.

## Updates / patch notes

- `updates.qmd` is the cross-project landing page; `blog.qmd` remains for longer writing.
- Prefer regular, small posts, roughly weekly when meaningful work exists. Base them on actual commits rather than filling a calendar. No change worth sharing means no post.
- Agents may perform bounded, read-only reviews of relevant commits, diffs, PRs and release evidence to prepare drafts. Do not turn every internal commit into a public item or expand into unrelated audits.
- Drafts may cover published features, upcoming features, screenshots, small fixes, stability and direction. Separate **shipped** from **in progress** and tentative ideas. A merged commit alone does not prove deployment.
- Cite exact repository/commit/PR or compare links for factual changes. Check surrounding code where needed, describe the effect for a reader, and state verification limits. Do not invent tests or outcomes.
- Use real screenshots, with descriptive alt text and useful captions. Verify version and whether they show a released feature or a preview. Never publish private user records, credentials, private chat/account pages, or unapproved personal details.

## Human review is required

- Prepare public-safe post drafts in `_drafts/updates/` (use `template.md`), outside the rendered site. Keep `draft: true` while unapproved. This repository is public: render exclusion does NOT make a committed file private. Keep the private cross-project journal, tracker, sensitive evidence and internal notes in a separate private workspace, never in this repository.
- Show the proposed text and media to Kai. Explicit human approval is required for every post before moving it into `updates/<slug>/index.qmd` and removing `draft: true`.
- Approval of this workflow is not approval of future posts. Do not auto-publish, schedule publication, merge, or deploy without authorization. A request to draft is not a request to publish.
- Before publication, remove the landing page's “first notes coming soon” block once an approved post exists. Render and inspect desktop/mobile output and links. Do not hand-edit generated HTML as the source of truth.

## Project directory

- Keep each project’s live app, repository and related writing/update links together with clear labels.
- Distinguish public apps, sign-in/access-required apps, public source and private/unavailable source. Never guess a URL or make a private resource public to complete the directory.
- Use a verified public ChatGPT creator profile, not account settings or a private conversation URL. Keep missing destinations as editorial TODOs, not misleading live buttons.
- Do not add a support/payment link until its exact destination has been provided or verified and publishing it is authorized.

## Build and checks

Follow `README.md` for the complete locked Python/R/Quarto build. For content-only previews, render the changed `.qmd` pages with Quarto. Keep drafts excluded from render. Review generated output before including it in an authorized publication; `docs/` is the deployed artifact.
