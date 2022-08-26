<script lang="ts">
	import { number_to_euro } from '$lib/util';
	import type { Detail_Response } from './detail_api';

	export let data: { ref: string; results: Detail_Response };

	let selected_image = 0;

	let results: Detail_Response;
	$: {
		results = data.results;
	}

	function show_next_image(dir: -1 | 1) {
		if (!data.results.status) return;

		let new_index = selected_image + dir;

		const image_count = data.results.Property.Pictures.Count;

		if (new_index < 0) new_index = image_count - 1;
		if (new_index == image_count) {
			new_index = 0;
		}

		selected_image = new_index;
	}
</script>

<svelte:head>
	<title>Property {data.ref}</title>
	<meta name="description" content="Detailed view of a property" />
</svelte:head>
{#if data && data.results.status}
	<button class="carousel_button left" on:click={() => show_next_image(-1)}>Previous</button>
	<button class="carousel_button right" on:click={() => show_next_image(1)}>Next</button>

	<div class="image_carousel spacer">
		{#if data.results.Property.Pictures.Count > 0}
			<img
				src={data.results.Property.Pictures.Picture[selected_image].PictureURL}
				alt=""
				class="selected_image"
			/>
		{/if}
	</div>
	<div class="spacer" />

	<div class="stats">
		<div class="stat">
			<span>{data.results.Property.Bedrooms}</span>
			<span>Bedrooms</span>
		</div>
		<div class="stat">
			<span>{data.results.Property.Bathrooms}</span>
			<span>Bathrooms</span>
		</div>
		<div class="stat">
			<span>{data.results.Property.Built}m²</span>
			<span>Plot Surface</span>
		</div>
		<div class="stat">
			<span>{data.results.Property.Terrace}m²</span>
			<span>Terrace</span>
		</div>
		<div class="stat">
			Asking Price
			<br />
			{#if data.results.Property.Price}
				{number_to_euro(+data.results.Property.Price)}
			{:else}
				Short Term: {number_to_euro(data.results.Property.RentalPrice1)} / Week
				<br />
				Long Term: {number_to_euro(data.results.Property.RentalPrice2)} / Month
			{/if}
		</div>
	</div>
	<p class="description">{data.results.Property.Description}</p>
{/if}

<style>
	.description {
		margin-top: 50px;
	}
	.stats {
		display: flex;
		gap: 20px;
		width: 100%;
		justify-content: center;
	}
	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5px;
	}
	.spacer {
		height: calc(100vh - 150px);
	}
	.image_carousel {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		z-index: -1;
	}
	.carousel_button {
		position: absolute;
		top: calc(calc(100vh - 150px) / 2);
		transform: translateY(-50%);
		border: none;
		padding: 15px;
		background: #000000ba;
		color: white;
		width: 100px;
		font-weight: 600;
		z-index: 10;
		cursor: pointer;
		pointer-events: all;
	}

	.carousel_button.right {
		right: 0;
	}
	.carousel_button.left {
		left: 0;
	}

	.image_carousel .selected_image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
