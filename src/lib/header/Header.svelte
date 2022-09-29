<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/assets/Logo_white.png';

	$: is_url = (url: string) => {
		return $page.url.pathname === url;
	};
</script>

<header>
	<ul>
		<li class:active={is_url('/')}>
			<a sveltekit:prefetch href="/">
				<img src={logo} alt="logo" />
			</a>
		</li>
		<li class:active={is_url('/properties')} style="margin-left: auto;">
			<a sveltekit:prefetch href="/properties">Properties</a>
		</li>
		<li class:active={is_url('/propertymanagement')}>
			<a sveltekit:prefetch href="/propertymanagement">Property Management</a>
		</li>
		<li class:active={is_url('https://varzirealty.staydirectly.com/')}>
			<a sveltekit:prefetch href="https://varzirealty.staydirectly.com/">Short-Term Rentals</a>
		</li>
		<li class:active={is_url('/guide')}>
			<a sveltekit:prefetch href="/guide">FAQs</a>
		</li>
		<li class:active={is_url('/about')}>
			<a sveltekit:prefetch href="/about">About us</a>
		</li>
	</ul>
</header>

<style>
	/* li.active{
        background-color: gray;
    } */

	header {
		box-shadow: 0 2px 2.5px rgba(0, 0, 0, 0.1);
		width: 100%;
	}

	ul {
		display: flex;
		justify-content: center;
		gap: 30px;
		max-width: 1024px;
		margin-left: auto;
		margin-right: auto;
	}

	li a {
		color: black;
		text-decoration: none;
		font-size: 1.15rem;
	}

	li {
		padding: 10px;
		border-radius: 5px;
		display: flex;
		align-items: center;
	}

	li:hover {
		/* background-color: rgba(0, 0, 0, 0.1); */
	}

	li img {
		width: 150px;
		cursor: pointer;
	}
</style>
