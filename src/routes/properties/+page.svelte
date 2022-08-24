<script lang="ts">
	import AutoComplete from 'simple-svelte-autocomplete';
	import Property from '$lib/property/property.svelte';
	import { number_to_euro } from '$lib/util';
	import {
		Form,
		FormGroup,
		RadioButtonGroup,
		RadioButton,
		Select,
		SelectItem,
		PaginationNav
	} from 'carbon-components-svelte';

	import { Property_Types, Search_Query } from './search_api';
	import type { Location_Response } from './location_api';
	import type { Search_Response } from './search_api';
	import { goto } from '$app/navigation';

	export let data: { params: Search_Query; results: [Search_Response, Location_Response] };

	let params: Search_Query;
	let search_results: Search_Response;
	let location_results: Location_Response;

	$: {
		// reactive variables that are changed when the data prop changes (data comes from the server)
		params = data.params;
		search_results = data.results[0];
		location_results = data.results[1];
		console.log(search_results);
	}

	function change_page(new_page: number) {
		const url_params = new URLSearchParams(window.location.search);
		url_params.set('page', (+new_page + 1).toString());
		if (params.page != new_page + 1) goto('?' + url_params.toString());
	}

	function submit_form() {
		const form = document.getElementById('form') as HTMLFormElement | null;
		params = new Search_Query();
		form?.submit();
	}
</script>

<svelte:head>
	<title>Properties</title>
	<meta name="description" content="Search for specific properties" />
</svelte:head>

<Form on:submit method="GET" id="form">
	<!-- PURCHASE RADIO BUTTONS -->
	<FormGroup>
		<RadioButtonGroup
			name="purchase_type"
			selected={params.purchase_type.toString()}
			on:click={submit_form}
		>
			<RadioButton value="1" name="purchase_type" labelText="Buy" />
			<RadioButton value="2" name="purchase_type" labelText="Short Term Rent" />
			<RadioButton value="3" name="purchase_type" labelText="Long Term Rent" />
			<RadioButton value="4" name="purchase_type" labelText="Featured" />
		</RadioButtonGroup>
	</FormGroup>

	<!--  LOCATION SELECT -->
	<FormGroup legendText="Location">
		{#if location_results && location_results.status}
			<AutoComplete
				items={location_results.LocationData?.ProvinceArea.Locations.Location}
				name="location"
				bind:selectedItem={params.location}
				placeholder="All locations"
				showClear
			/>
		{/if}
	</FormGroup>

	<!--  PRICE RANGE SELECT -->
	<FormGroup class="inline_select">
		<Select labelText="Min Price" name="min_price" bind:selected={params.min_price}>
			{#each [...Array(21).keys()] as i}
				<SelectItem value={i * 100000 + ''} text={number_to_euro(i * 100000)} />
			{/each}
		</Select>

		<Select labelText="Max Price" name="max_price" bind:selected={params.max_price}>
			{#each [...Array(21).keys()] as i}
				<SelectItem value={i * 100000 + ''} text={number_to_euro(i * 100000)} />
			{/each}
		</Select>
	</FormGroup>

	<FormGroup class="inline_select">
		<!--  BEDROOM SELECT -->
		<Select labelText="Min Bedrooms" name="min_bedrooms" bind:selected={params.min_bedrooms}>
			<SelectItem value="0" text="Min Bedrooms" />
			{#each [...Array(6).keys()] as i}
				<SelectItem value={i + 1 + ''} text={i + 1 + ''} />
			{/each}
		</Select>
		<!--  TYPE SELECT -->
		<Select labelText="Types" name="property_type" bind:selected={params.property_type}>
			<SelectItem value="0" text="All types" />
			{#each Object.values(Property_Types) as type, index}
				<SelectItem value={index + 1 + ''} text={type} />
			{/each}
		</Select>
	</FormGroup>

	<button type="submit" class="submit_button">Search</button>
</Form>
<!-- DISPLAY RESULTS -->
<div class="results">
	{#if search_results && search_results.status}
		<!-- PROPERTIES IF FOUND -->
		<div class="properties">
			{#each search_results.Property as property}
				<Property {property} />
			{/each}
		</div>
		<PaginationNav
			class="pagination"
			total={Math.ceil(search_results.QueryInfo.PropertyCount / 9)}
			on:change={(x) => change_page(x.detail.page)}
		/>
	{:else if search_results}
		<!-- ERROR MESSAGE INSTEAD OF PROPERTIES -->
		{search_results.transaction.errordescription}
	{/if}
</div>

<style>
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
		justify-content: space-evenly;
		gap: 20px;
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

	.submit_button {
		cursor: pointer;
		padding: 10px;
		background-color: var(--cds-interactive-01, #0f62fe);
		color: white;
		border: none;
		border-radius: 5px;
		font-size: 1.1rem;
	}

	:global(.autocomplete.select) {
		width: 50%;
	}

	:global(.input-container) {
		position: relative;
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
		height: 2.5rem !important;
	}

	:global(.autocomplete::after) {
		border: unset !important;
		border-bottom: 1px solid !important;
		border-left: 1px solid !important;
		border-radius: unset !important;

		height: 0.4em !important;
		margin-top: 0 !important;
		width: 0.4em !important;
		border-color: #383737 !important;
	}
</style>
