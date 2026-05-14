# Project Overview

## Project Summary

This project is a personal portfolio for Dimas, a software engineer and web developer with 2+ years of experience. The finished site should present a concise, high-signal professional profile through a single homepage and a custom 404 page.

The current repository is still a scaffolded SvelteKit starter. This document describes the target product, not the current UI. Implementation work should preserve that distinction.

## Goals

- Present Dimas as a capable modern software engineer with both frontend and backend skills.
- Create a memorable visual identity without drifting into novelty-first design.
- Keep the site lightweight, fully static, and GitHub Pages compatible.
- Build a polished mobile-first experience with restrained, premium-feeling motion.
- Make the final codebase easy to maintain by centralizing content and theme decisions.

## Target Audience

- Recruiters scanning quickly for role fit, technical maturity, and professionalism.
- Hiring managers evaluating clarity, taste, and engineering discipline.
- Other developers reviewing craft, layout quality, and implementation detail.
- Potential collaborators who need contact details and a fast sense of technical profile.

## UX Direction

### Product Intent

The site should feel like a professional portfolio first and an artistic experiment second. Visual personality is important, but it must support comprehension rather than compete with it.

### Experience Goals

- The hero section should establish identity in under 5 seconds.
- The page should feel curated, not content-heavy.
- Navigation should remain visible without needing a traditional top bar.
- Section transitions should help reading flow and orientation.
- Contact actions should be immediately discoverable and low-friction.

## Visual Philosophy

### Core Theme

The visual language combines:

- Earth/forest atmosphere
- Clean editorial composition
- Subtle developer references
- Contemporary interface polish

### Product Interpretation

This theme should be implemented as:

- Deep forest green as the primary grounding color
- Warm cream as the primary reading surface
- Antique gold used sparingly for emphasis and state changes
- A balance of structured grid layout and slightly organic motion
- Code-adjacent typographic moments that feel deliberate rather than gimmicky

### What To Avoid

- Gamer aesthetics
- Neon cyberpunk palettes
- Heavy glassmorphism
- Over-decorated hero illustrations
- Dark-on-dark sections with weak readability
- Excessive animation or "loading for drama"

## Page Inventory

### Required Routes

- `/` - main portfolio homepage
- `404` experience for GitHub Pages fallback and in-app error route coverage

### Route Responsibilities

- The homepage contains all user-facing portfolio content.
- The custom 404 page should preserve the same visual language and offer a clear path back home.

## Homepage Section Inventory

### Hero

- Introduce Dimas by name and role
- Show code-inspired decorative tags
- Include a strong CTA that scrolls to contact
- Feature a large stylized "D" as the signature visual anchor

### About

- Show profile image
- Explain who Dimas is, what he builds, and how he works
- Summarize typical tools and technologies

### Career

- Render a latest-to-oldest timeline
- Emphasize role, company/worksite, date, and concise summary
- Support detailed responsibilities in a hover/focus popover or touch-safe alternate disclosure

### Contact

- Show direct contact methods only
- Include GitHub, LinkedIn, Instagram, email, and CV link
- Keep the interaction short and external-action oriented

## Content Principles

- Copy should be specific and concise.
- Empty placeholder prose like "I am passionate about technology" is not acceptable.
- Every section must support a hiring or collaboration outcome.
- Structured content must come from typed TypeScript data, not hardcoded inline strings scattered through components.

## Non-Goals

- No blog
- No CMS
- No backend
- No contact form
- No auth
- No client-side fetching for essential content
- No multi-page navigation beyond the homepage and error handling
- No WebGL, Three.js, or heavy visual engines

## Success Criteria

- A first-time visitor can understand identity, experience, and contact options immediately.
- The site feels distinctive without harming readability or performance.
- The implementation can be built entirely as a prerendered SvelteKit app.
- Another coding agent can implement the product without needing to invent architecture, content shape, or motion rules.
