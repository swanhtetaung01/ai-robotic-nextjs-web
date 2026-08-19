# AI Robotic — project docs

Context for anyone (human or agent) picking this project up. Written so a new session
can get productive **without re-reading the whole codebase or redoing the research**.

## Read in this order

| # | Document | Read it when |
|---|---|---|
| 1 | [project-context.md](project-context.md) | **Always start here.** What this site is, the stack, the design system, how content is wired, and the environment gotchas that will otherwise bite you. |
| 2 | [decisions.md](decisions.md) | Before changing anything visual, commercial, or structural — the *why* behind choices that look arbitrary. |
| 3 | [history.md](history.md) | To see what was built when, and what was tried and rejected. |
| 4 | [research/cenobots-research.md](research/cenobots-research.md) | Product specs, competitor analysis, ROI figures, and customer proof. The source for all robot copy. |

## What is source of truth for what

Docs describe intent. **Code and assets are authoritative for facts** — never trust a
doc over the file it describes, and update the doc when the file changes.

| Subject | Source of truth |
|---|---|
| Robot names, specs, features, copy | `lib/robots.ts` |
| Which photo appears where | `lib/robot-images.ts` |
| Colors, fonts, spacing, motifs | `app/globals.css` (`@theme` block) |
| Page structure and layout | `app/**/page.tsx` |
| Product specs as published by manufacturers | [research/cenobots-research.md](research/cenobots-research.md) |
| Commercial decisions (pricing, branding) | [decisions.md](decisions.md) |

## House rules

- **A commit message is supplied with every change.** The user runs the commits.
- **Never invent a spec.** If a manufacturer does not publish a figure, it stays `—`.
  See [decisions.md](decisions.md#d-010).
- **No prices anywhere on the site.** Quote-only. See [decisions.md](decisions.md#d-003).
