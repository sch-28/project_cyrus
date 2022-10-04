<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import Footer from '$lib/footer/Footer.svelte';
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

	page.subscribe(() => {
		if (!browser) return;
		// query all currency input fields
		const input_refs = Array.from(
			document.querySelectorAll("input[type='currency'")
		) as HTMLInputElement[];

		for (let input_ref of input_refs) {
			setTimeout(() => format_input(input_ref), 0);
			input_ref.oninput = (event) => {
				format_input(input_ref);
			};
		}
	});
</script>

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
