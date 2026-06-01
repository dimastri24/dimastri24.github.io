<script lang="ts">
    import { resolve } from '$app/paths';
    import { page } from '$app/state'; 
    import { siteMetadata } from '$lib/data';
    import './layout.css';

    let status = $derived(page.status); 
    let error = $derived(page.error);

    let statusLabel = $derived(status === 404 ? 'Page not found' : 'Unexpected interruption');
    let title = $derived(`${statusLabel} | ${siteMetadata.name}`);
    
    let message = $derived(
        error?.message ||
            (status === 404
                ? 'The page you requested does not exist or has moved.'
                : 'Something went wrong while rendering this page.')
    );
    let pathname = $derived(page.url.pathname);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section
	class="relative flex min-h-screen items-center overflow-hidden bg-[var(--bg-section-dark)] px-6 py-12 text-[var(--text-on-dark)] sm:px-8"
>
	<div class="pointer-events-none absolute inset-0">
		<div
			class="absolute top-[-10rem] left-[-8rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(198,162,106,0.16)_0%,_rgba(198,162,106,0)_72%)] blur-3xl"
		></div>
		<div
			class="absolute right-[-8rem] bottom-[-10rem] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,_rgba(255,251,221,0.08)_0%,_rgba(255,251,221,0)_72%)] blur-3xl"
		></div>
	</div>

	<div class="mx-auto w-full max-w-3xl">
		<div
			class="surface-card-dark relative overflow-hidden rounded-[var(--radius-xl)] px-6 py-8 sm:px-8 sm:py-10"
		>
			<div
				class="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(255,251,221,0),rgba(255,251,221,0.28),rgba(255,251,221,0))]"
			></div>

			<div class="space-y-6 sm:space-y-7">
				<div class="space-y-3">
					<p class="text-code text-xs tracking-[0.24em] text-[var(--accent-strong)] uppercase">
						Status {status}
					</p>
					<h1 class="text-display text-4xl leading-[0.95] font-semibold sm:text-5xl">
						{statusLabel}
					</h1>
					<p class="max-w-2xl text-base leading-8 text-[var(--text-muted-dark)] sm:text-lg">
						{message}
					</p>
				</div>

				<div
					class="rounded-[var(--radius-lg)] border border-[var(--color-line-dark)] bg-[rgba(255,255,255,0.03)] px-4 py-4"
				>
					<p class="text-code text-[0.7rem] tracking-[0.18em] text-[var(--text-muted-dark)] uppercase">
						Request path
					</p>
					<p class="mt-2 break-all text-sm leading-7 text-[var(--text-on-dark)] sm:text-base">
						{pathname}
					</p>
				</div>

				<div class="flex flex-wrap items-center gap-3">
					<a
						href={resolve('/')}
						class="transition-standard text-code inline-flex items-center justify-center rounded-[var(--radius-pill)] border border-[var(--accent)] bg-[rgba(255,251,221,0.06)] px-5 py-3 text-xs tracking-[0.2em] uppercase hover:-translate-y-[1px] hover:border-[var(--accent-strong)] hover:bg-[rgba(255,251,221,0.1)]"
					>
						Return home
					</a>

					<a
						href={resolve('/#contact')}
						class="transition-standard text-code inline-flex items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-line-dark)] px-5 py-3 text-xs tracking-[0.2em] text-[var(--text-muted-dark)] uppercase hover:-translate-y-[1px] hover:border-[rgba(255,251,221,0.24)] hover:text-[var(--text-on-dark)]"
					>
						Open contact
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
