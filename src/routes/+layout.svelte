<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import '../app.css';
	import 'carbon-components-svelte/css/white.css';
	import 'bulma/css/bulma.css';
	import { onMount } from 'svelte';
	import { number_to_euro } from '$lib/util';

	function format_value(value: string) {
		// remove any invalid characters
		const number = Number(String(value).replace(/[^0-9,-]+/g, ''));
		// remove € sign and whitepsaces
		const formatted_number = number_to_euro(number).replace('€', '').replace(/\s+/g, '');
		return formatted_number;
	}

	function format_input(input: HTMLInputElement) {
		const value = input.value;

		input.value = format_value(value);
	}

	import { page } from '$app/stores';
	import { browser } from '$app/env';
	import { CAPTCHA_SITE_KEY } from '$env/static/private';

	page.subscribe(() => {
		if (!browser) return;
		// query all currency input fields
		const input_refs = Array.from(
			document.querySelectorAll("input[type='currency'")
		) as HTMLInputElement[];

		for (let input_ref of input_refs) {
			init_input(input_ref);
			input_ref.oninput = (event) => {
				format_input(input_ref);
			};
		}
	});

	function init_input(input_ref: HTMLInputElement) {
		setTimeout(() => format_input(input_ref), 0);
	}
</script>

<svelte:head>
	<script src="https://www.google.com/recaptcha/api.js?render={CAPTCHA_SITE_KEY}"></script>
</svelte:head>

<Header />

<main>
	<slot />
</main>

<Footer />

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
		padding-top: 0;
	}
</style>
