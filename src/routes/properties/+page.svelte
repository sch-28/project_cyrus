<script lang="ts">
	import AutoComplete from 'simple-svelte-autocomplete';
	import Property from '$lib/property.svelte';
	import Form from 'carbon-components-svelte/src/Form/Form.svelte';
	import FormGroup from 'carbon-components-svelte/src/FormGroup/FormGroup.svelte';
	import RadioButtonGroup from 'carbon-components-svelte/src/RadioButtonGroup/RadioButtonGroup.svelte';
	import RadioButton from 'carbon-components-svelte/src/RadioButton/RadioButton.svelte';
	import PaginationNav from 'carbon-components-svelte/src/PaginationNav/PaginationNav.svelte';
	import type { Search_Query } from './search_api';
	import type { Location_Response } from './location_api';
	import type { Search_Response } from './search_api';
	import { goto } from '$app/navigation';

	export let data: {
		params: Search_Query;
		results: [Search_Response, Location_Response];
		filter: string;
	};

	let params: Search_Query;
	let search_results: Search_Response;
	let location_results: Location_Response;

	let selected_locations: string[] = ['Marbella'];

	$: {
		// reactive variables that are changed when the data prop changes (data comes from the server)
		params = data.params;
		search_results = data.results[0];
		location_results = data.results[1];
		update_selected_locations(params.locations);
	}

	$: {
		update_locations(selected_locations);
	}

	function update_locations(new_locations: string[]) {
		params.locations = new_locations;
	}

	function update_selected_locations(new_locations: string[]) {
		selected_locations = new_locations;
	}

	function change_page(new_page: number) {
		const url_params = new URLSearchParams(window.location.search);
		url_params.set('page', (+new_page + 1).toString());
		if (params.page != new_page + 1) goto('?' + url_params.toString());
	}

	function submit_form() {
		const form = document.getElementById('form') as HTMLFormElement | null;
		form?.submit();
	}
</script>

<svelte:head>
	<title>Properties</title>
	<meta name="description" content="Search for specific properties" />
</svelte:head>
<Form on:submit method="GET" id="form">
	<FormGroup class="inline_select">
		<!--  LOCATION SELECT -->
		{#if location_results && location_results.status}
			<div class="autocomplete_container">
				<label class="label" for="autocomplete_location">Location</label>
				<AutoComplete
					inputId="autocomplete_location"
					items={location_results.LocationData?.ProvinceArea.Locations.Location}
					bind:selectedItem={selected_locations}
					placeholder="All locations"
					showClear
					multiple
				/>
				<input type="hidden" name="locations" value={selected_locations.join(',')} />
			</div>
		{/if}
	</FormGroup>

	<!--  PRICE RANGE SELECT -->
	<FormGroup class="inline_select">
		<div class="currency_input_wrapper">
			<div class="field">
				<label class="label" for="min_price">Min Price</label>
				<input
					class="input "
					name="min_price"
					bind:value={params.min_price}
					type="currency"
					min="0"
					id="min_price"
				/>
			</div>
		</div>
		<div class="currency_input_wrapper">
			<div class="field">
				<label class="label" for="max_price">Max Price</label>
				<input
					class="input "
					name="max_price"
					bind:value={params.max_price}
					type="currency"
					min="0"
					id="max_price"
				/>
			</div>
		</div>
	</FormGroup>

	<FormGroup class="inline_select">
		<div class="field">
			<label class="label" for="bedrooms">Min Bedrooms</label>
			<input
				class="input"
				name="min_bedrooms"
				bind:value={params.min_bedrooms}
				type="number"
				min="0"
				max="6"
				id="bedrooms"
			/>
		</div>
		<div class="field">
			<label class="label" for="property_type">Types</label>
			<div class="select">
				<select value={params.property_type} name="property_type" id="property_type">
					<option value="0">All types </option>
					<option value="1">Apartment</option>
					<option value="2">House</option>
					<option value="3">Plot</option>
					<option value="4">Commerical</option>
				</select>
			</div>
		</div>
	</FormGroup>

	<!-- Main container -->
	<nav class="level">
		<!-- Left side -->
		<div class="level-left">
			<div class="level-item">
				<button class="button is-link " type="submit">Search</button>
			</div>
			<div class="level-item">
				<a sveltekit:prefetch href="/properties" target="_self">Reset</a>
			</div>
		</div>

		<!-- Right side -->
		<div class="level-right">
			<div class="level-item">
				<div class="select">
					<select bind:value={params.sort} on:change={submit_form} name="sort">
						<option value="0">Price Ascending</option>
						<option value="1">Price Descending</option>
					</select>
				</div>
			</div>
		</div>
	</nav>
</Form>
<!-- DISPLAY RESULTS -->
<div class="results">
	{#if search_results && search_results.status}
		<!-- PROPERTIES IF FOUND -->
		<div class="properties">
			{#each search_results.Property as property}
				<Property {property} filter={data.filter} />
			{/each}
		</div>
		<PaginationNav
			class="pagination"
			total={Math.ceil(search_results.QueryInfo.PropertyCount / 9)}
			on:change={(x) => change_page(x.detail.page)}
			page={params.page - 1}
			shown={5}
		/>
	{:else if search_results}
		<!-- ERROR MESSAGE INSTEAD OF PROPERTIES -->
		<div class="error-list">
			{typeof search_results.transaction.errordescription === 'string'
				? search_results.transaction.errordescription
				: Object.entries(search_results.transaction.errordescription)
						.map(([key, value]) => `${key}: ${value}`)
						.join('\n')}
		</div>
	{/if}
</div>

<style>
	.error-list {
		white-space: pre-line;
	}
	.field,
	select,
	.select {
		width: 100%;
	}
	.currency_input_wrapper::after {
		content: '€';
		position: absolute;
		top: 50%;
		transform: translateY(15%);
		right: 10px;
	}
	.currency_input_wrapper {
		display: flex;
		width: 100%;
		position: relative;
	}

	:global(.pagination) {
		display: flex;
		justify-content: center;
	}
	.results {
		margin-top: 30px;
	}
	.properties {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 15px;
	}

	:global(.inline_select) {
		display: flex;
		gap: 5px;
	}

	:global(.bx--fieldset) {
		margin-bottom: 1rem !important;
	}

	:global(.bx--form-item) {
		width: 50%;
	}

	:global(.bx--radio-button__appearance) {
		margin-top: 0;
	}

	.autocomplete_container {
		display: flex;
		width: 100%;
		flex-direction: column;
	}

	:global(.input-container) {
		position: relative;
		border-color: #dbdbdb !important;
	}

	@media screen and (max-width: 1023px) {
		:global(.autocomplete-list) {
			max-height: calc(6 * (1rem + 10px) + 15px) !important;
		}
	}

	:global(.autocomplete input) {
		font-size: 0.875rem;
		font-weight: 400;
		line-height: 1.28572;
		letter-spacing: 0.16px;
		outline: 2px solid rgba(0, 0, 0, 0);
		outline-offset: -2px;
		display: block;
		width: 100%;
		height: 2.5rem;
		padding: 0 3rem 0 1rem;
		border: none;
		border-bottom: 1px solid #8d8d8d;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background-color: #f4f4f4;
		border-radius: 0;
		color: #161616;
		cursor: pointer;
		font-family: inherit;
		opacity: 1;
		transition: outline 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
		height: 2.4em !important;

		background-color: white !important;
		border-color: #dbdbdb !important;
		border-radius: 4px !important;
		color: #363636 !important;
	}

	:global(.autocomplete::after) {
		border-color: #485fc7 !important;
		right: 1.125em;
		z-index: 4;

		border: 3px solid transparent;
		border-radius: 2px;
		border-right: 0;
		border-top: 0;
		content: ' ';
		display: block;
		height: 0.625em;
		margin-top: -0.25em !important;
		pointer-events: none;
		position: absolute;
		top: 50%;
		transform: rotate(-45deg);
		transform-origin: center;
		width: 0.625em;
	}
</style>
