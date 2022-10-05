<script lang="ts">
	import { number_to_euro } from '$lib/util';
	import type { Detail_Response } from './detail_api';
	import Favorite from 'carbon-icons-svelte/lib/Favorite.svelte';
	import { favorites } from '$lib/store';
	import FavoriteFilled from 'carbon-icons-svelte/lib/FavoriteFilled.svelte';
	export let data: { ref: string; results: Detail_Response; filter: string };

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

	function show_image(index: number) {
		selected_image = index;
	}

	$: is_favorite = $favorites.favorites.find((f) => f.ref == data.ref);

	function add_favorite() {
		if (is_favorite) {
			favorites.update((v) => {
				return { favorites: v.favorites.filter((v) => v.ref != data.ref) };
			});
		} else {
			favorites.update((v) => {
				v.favorites.push(data);
				return v;
			});
		}
	}
</script>

<svelte:head>
	<title>Property {data.ref}</title>
	<meta name="description" content="Detailed view of a property" />
</svelte:head>

{#if data && data.results.status}
	<button class="carousel_button left" on:click={() => show_next_image(-1)}>Previous</button>
	<button class="carousel_button right" on:click={() => show_next_image(1)}>Next</button>
	<div class="bubbles">
		{#each Array(+data.results.Property.Pictures.Count) as i, index}
			<div
				class="bubble"
				class:selected={index == selected_image}
				on:click={() => show_image(index)}
			/>
		{/each}
	</div>
	<div class="image_carousel ">
		{#if data.results.Property.Pictures.Count > 0}
			<img
				src={data.results.Property.Pictures.Picture[selected_image].PictureURL}
				alt=""
				class="selected_image"
			/>
		{/if}
	</div>
	<div class="spacer" />
	<strong style="margin: 0 auto 20px auto;">{data.ref}</strong>
	<div class="stats">
		{#if +data.results.Property.Bedrooms}
			<div class="stat">
				<span>{data.results.Property.Bedrooms}</span>
				<span>Bedrooms</span>
			</div>
		{/if}
		{#if +data.results.Property.Bathrooms}
			<div class="stat">
				<span>{data.results.Property.Bathrooms}</span>
				<span>Bathrooms</span>
			</div>
		{/if}
		{#if +data.results.Property.Built}
			<div class="stat">
				<span>{data.results.Property.Built}m²</span>
				<span>Built</span>
			</div>
		{/if}
		{#if +data.results.Property.GardenPlot}
			<div class="stat">
				<span>{data.results.Property.GardenPlot}m²</span>
				<span>Garden/Plot</span>
			</div>
		{/if}
		{#if +data.results.Property.Terrace}
			<div class="stat">
				<span>{data.results.Property.Terrace}m²</span>
				<span>Terrace</span>
			</div>
		{/if}
		<div class="stat">
			{#if data.results.Property.Price}
				{number_to_euro(+data.results.Property.Price)}
			{:else}
				Short Term: {number_to_euro(data.results.Property.RentalPrice1)} / Week
				<br />
				Long Term: {number_to_euro(data.results.Property.RentalPrice2)} / Month
			{/if}
			<span>Asking Price</span>
		</div>
	</div>
	<div class="favorite" on:click={add_favorite}>
		{#if !is_favorite}
			<Favorite size={32} />
		{:else}
			<FavoriteFilled size={32} />
		{/if}
	</div>
	<p class="description">{data.results.Property.Description}</p>
{/if}

<style>
	.favorite {
		margin: 25px auto;
	}
	.bubbles {
		top: calc(100vh - 225px);
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 5px;
	}

	.bubble {
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.3);
		padding: 6px;
		cursor: pointer;
	}

	.bubble.selected {
		background-color: rgba(255, 255, 255, 0.8);
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
		height: calc(100vh - 225px);
	}
	.image_carousel {
		position: absolute;
		top: 100;
		left: 0;
		width: 100%;
		height: calc(100vh - 250px);
	}
	.carousel_button {
		position: absolute;
		top: calc(calc(100vh - 50px) / 2);
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
