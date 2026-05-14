# Deployment

## Target Platform

- GitHub Pages
- Static hosting only
- GitHub Actions as the deployment path

## Deployment Model

The site will be built as a fully prerendered SvelteKit application using `@sveltejs/adapter-static`. There is no backend and no server runtime after deployment.

## Required SvelteKit Configuration

## Adapter

Use `@sveltejs/adapter-static` with GitHub Pages-compatible fallback behavior.

Required direction:

- static pages and assets output to the build directory
- fallback file generated as `404.html`

## Base Path

GitHub Pages often serves project sites from a repository subpath:

- `https://username.github.io/web-portfolio`

Because of that, production builds must set:

- `kit.paths.base = '/web-portfolio'` or the repository-name equivalent

Recommended pattern:

- dev: empty base path
- CI build: `BASE_PATH='/${{ github.event.repository.name }}'`

## Root Page Options

Standardize these at the root layout level:

- `prerender = true`
- trailing slash policy compatible with static hosting
- keep SSR enabled

Do not set root `ssr = false`.

## Internal Link And Asset Rules

- Prefer imported assets for images used by components.
- Keep host-level fixed-name files in `static/`.
- Any logic that generates internal links or asset-aware URLs must respect SvelteKit path handling.
- Avoid hardcoded absolute root paths that assume `/`.

## GitHub Actions Workflow

Create a workflow at:

- `.github/workflows/deploy.yml`

### Required Behavior

- trigger on push to the main branch
- install Node
- install npm dependencies
- build with `BASE_PATH`
- upload the build artifact
- deploy using GitHub Pages actions

### Workflow Expectations

- Node version should be pinned to a modern supported version
- npm caching should be enabled
- build output path must match adapter output
- Pages permissions must be granted in the deploy job

## GitHub Repository Settings

Required repository configuration:

- Pages source should use GitHub Actions
- default branch should be the branch targeted by the workflow

If project-site deployment is used instead of `username.github.io`, the repo-name-derived base path must stay in sync with the actual repository name.

## Build And Deploy Steps

### Local Validation

1. Install dependencies with `npm install`.
2. Run `npm run check`.
3. Run `npm run lint`.
4. Run `npm run build`.
5. Confirm the build output contains the homepage and `404.html`.

### CI Build

1. Checkout repository
2. Setup Node
3. Install dependencies
4. Export `BASE_PATH`
5. Run `npm run build`
6. Upload the build directory as the Pages artifact
7. Deploy artifact to GitHub Pages

## Required Output Checks

After a successful build, verify:

- homepage HTML exists
- static assets are emitted
- `404.html` exists
- output paths work under the expected base path

## Post-Deploy Verification Checklist

- Visit the production GitHub Pages URL.
- Confirm the homepage loads without broken styles or missing assets.
- Confirm sidebar navigation works from the deployed subpath.
- Confirm profile image and icons resolve correctly.
- Confirm direct refresh on an invalid route serves the custom 404 experience.
- Confirm contact links open correctly.
- Confirm mobile layout still behaves correctly on the deployed host.

## Optional Static Host Files

If deployment ever moves away from GitHub Actions artifact publishing and relies on a static folder pushed directly, consider adding:

- `.nojekyll` in `static/`

That prevents Jekyll from interfering with files and folders that begin with underscores. It is not the primary deployment assumption for this project, but it is the correct fallback note to retain.
