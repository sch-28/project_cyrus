<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/assets/Logo_white.png';
	import Favorite from 'carbon-icons-svelte/lib/Favorite.svelte';
	import whatsapp_logo from '$lib/assets/whatsapp.png';

	$: is_url = (url: string) => {
		return $page.url.pathname === url;
	};
	let expand_menu = false;
</script>

<nav class="navbar " aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item" sveltekit:prefetch href="/">
			<img src="Logo_white.png" width="200" alt="logo" />
		</a>

		<a
			data-sveltekit-prefetch
			href={'javascript:;'}
			class:is-active={expand_menu}
			on:click={() => (expand_menu = !expand_menu)}
			role="button"
			class="navbar-burger "
			aria-label="menu"
			aria-expanded="false"
		>
			<span aria-hidden="true" />
			<span aria-hidden="true" />
			<span aria-hidden="true" />
		</a>
	</div>

	<div class="navbar-menu" class:is-active={expand_menu}>
		<div class="navbar-start" />

		<div class="navbar-end">
			<a class="navbar-item" sveltekit:prefetch href="/properties">Properties for Sale</a>
			<a class="navbar-item" sveltekit:prefetch href="https://varzirealty.staydirectly.com/">Short-Term Rentals</a>
			<a class="navbar-item" sveltekit:prefetch href="/investmentanalysis">Golden Visa & Investment Analysis</a>
			<a class="navbar-item" sveltekit:prefetch href="/about">About</a>
			<a class="navbar-item" sveltekit:prefetch href="https://wa.me/34689105197">
				<img src={whatsapp_logo} width="30" alt="whatsapp" />
			</a>
			<a class="navbar-item favorites" sveltekit:prefetch href="/favorites">
				<span>Favorites</span>
				<Favorite size={20} />
			</a>
		</div>
	</div>
</nav>

<style>
	:global(.navbar-item img) {
		max-height: unset !important;
	}

	.navbar {
		max-width: 1024px;
		margin: 0 auto;
	}

	.favorites {
		display: flex;
		gap: 5px;
	}
</style>
