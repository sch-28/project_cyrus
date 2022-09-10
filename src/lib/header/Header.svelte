<script lang="ts">
	import { page } from '$app/stores';

	$: is_url = (url: string) => {
		return $page.url.pathname === url;
	};
</script>

<header>
	<ul>
		<li class:active={is_url('/')}>
			<a sveltekit:prefetch href="/">Home</a>
		</li>
		<li class:active={is_url('/properties')}>
			<a sveltekit:prefetch href="/properties">Properties</a>
		</li>
		<li class:active={is_url('/propertymanagement')}>
			<a sveltekit:prefetch href="/propertymanagement">Property Management</a>
		</li>
		<li class:active={is_url('https://varzirealty.staydirectly.com/')}>
			<a sveltekit:prefetch href="https://varzirealty.staydirectly.com/">Short-Term Rentals</a>
		</li>
		<li class:active={is_url('/guide')}>
			<a sveltekit:prefetch href="/guide">Guides & FAQs</a>
		</li>
		<li class:active={is_url('https://wa.me/34689105197')}>
			<a sveltekit:prefetch href="https://wa.me/34689105197">Contact via Whatsapp </a>
		</li>
	
	</ul>
</header>

<style>
	/* li.active{
        background-color: gray;
    } */

	ul {
		display: flex;
		justify-content: center;
		gap: 30px;
		padding: 10px;
		box-shadow: 0 2px 2.5px rgba(0, 0, 0, 0.1);
	}

	li a {
		color: black;
		text-decoration: none;
		font-size: 1.15rem;
	}

	li {
		padding: 10px;
        border-radius: 5px;
	}

	li:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
</style>
