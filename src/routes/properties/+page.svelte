<script lang="ts">
	import {
		Form,
		FormGroup,
		Checkbox,
		RadioButtonGroup,
		RadioButton,
		Select,
		SelectItem,
		Button
	} from 'carbon-components-svelte';
	import type { Error_Response, Response, Search_Query, Success_Response } from './api';

	export let data: { params: Search_Query; results: Response };

	let params: Search_Query;
	let results: Success_Response;
	let error: Error_Response;
	$: {
		params = data.params;

		if (data.results.transaction.status === 'success') {
			results = data.results as Success_Response;
		} else {
			error = data.results as Error_Response;
		}
	}
</script>

<svelte:head>
	<title>Properties</title>
	<meta name="description" content="Search for specific properties" />
</svelte:head>

<Form on:submit method="GET">
	<!-- PURCHASE RADIO BUTTONS -->
	<FormGroup>
		<RadioButtonGroup name="purchase_type" selected={params.purchase_type}>
			<RadioButton value="buy" name="purchase_type" labelText="Buy" />
			<RadioButton value="rent" name="purchase_type" labelText="Rent" />
			<RadioButton value="dev" name="purchase_type" labelText="Developments" />
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

	<!--  PRICE RANGE SELECT -->
	<FormGroup class="inline_select">
		<Select labelText="Min Price" name="min_price" selected={params.min_price}>
			{#each [...Array(21).keys()] as i}
				<SelectItem
					value={i * 100000 + ''}
					text={(i * 100000).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
				/>
			{/each}
		</Select>

		<Select labelText="Max Price" name="max_price" selected={params.max_price}>
			{#each [...Array(21).keys()] as i}
				<SelectItem
					value={i * 100000 + ''}
					text={(i * 100000).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
				/>
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

{#if results.transaction.status === 'success'}
	{#each results.Property as property}
		{JSON.stringify(property)}
	{/each}
{:else}
	{error.transaction.errordescription}
{/if}

<style>
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
