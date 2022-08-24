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
		SelectItem
	} from 'carbon-components-svelte';

	import type { Search_Query } from './search_api';
	import type { Location_Response } from './location_api';
	import type { Search_Response } from './search_api';

	export let data: { params: Search_Query; results: [Search_Response, Location_Response] };

	let params: Search_Query;
	let search_results: Search_Response;
	let location_response: Location_Response;

	$: {
		// reactive variables that are changed when the data prop changes (data comes from the server)
		params = data.params;
		search_results = data.results[0];
		location_response = data.results[1];
		// console.log(search_results, location_response);
	}
</script>

<svelte:head>
	<title>Properties</title>
	<meta name="description" content="Search for specific properties" />
</svelte:head>

<Form on:submit method="GET">
	<!-- PURCHASE RADIO BUTTONS -->
	<FormGroup>
		<RadioButtonGroup name="purchase_type" selected={params.purchase_type.toString()}>
			<RadioButton value="1" name="purchase_type" labelText="Buy" />
			<RadioButton value="2" name="purchase_type" labelText="Short Term Rent" />
			<RadioButton value="3" name="purchase_type" labelText="Long Term Rent" />
			<RadioButton value="4" name="purchase_type" labelText="Featured" />
		</RadioButtonGroup>
	</FormGroup>

	<!--  LOCATION SELECT -->
	<FormGroup>
		<Select labelText="Location" name="location" selected={params.location}>
			<SelectItem value="" text="Choose an option" />
			<SelectItem value="area1" text="Area1" />
			<SelectItem value="area2" text="Area2" />
			<SelectItem value="area3" text="Area3" />
		</Select>
	</FormGroup>

	{#if location_response && location_response.status}
		<AutoComplete items={location_response.LocationData?.ProvinceArea.Locations.Location} />
	{/if}
	<!--  PRICE RANGE SELECT -->
	<FormGroup class="inline_select">
		<Select labelText="Min Price" name="min_price" selected={params.min_price}>
			{#each [...Array(21).keys()] as i}
				<SelectItem value={i * 100000 + ''} text={number_to_euro(i * 100000)} />
			{/each}
		</Select>

		<Select labelText="Max Price" name="max_price" selected={params.max_price}>
			{#each [...Array(21).keys()] as i}
				<SelectItem value={i * 100000 + ''} text={number_to_euro(i * 100000)} />
			{/each}
		</Select>
	</FormGroup>

	<!--  LOCATION SELECT -->
	<FormGroup>
		<Select labelText="Min Bedrooms" name="min_bedrooms" selected={params.min_bedrooms}>
			<SelectItem value="0" text="Min Bedrooms" />
			{#each [...Array(6).keys()] as i}
				<SelectItem value={i + 1 + ''} text={i + 1 + ''} />
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
	{:else if search_results}
		<!-- ERROR MESSAGE INSTEAD OF PROPERTIES -->
		{search_results.transaction.errordescription}
	{/if}
</div>

<style>
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

	.submit_button {
		cursor: pointer;
		padding: 10px;
		background-color: var(--cds-interactive-01, #0f62fe);
		color: white;
		border: none;
		border-radius: 5px;
		font-size: 1.1rem;
	}
</style>
