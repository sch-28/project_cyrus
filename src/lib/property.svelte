<script lang="ts">
	import type { Property } from 'src/routes/properties/search_api';
	import HospitalBed from 'carbon-icons-svelte/lib/HospitalBed.svelte';
	import ShapeIntersect from 'carbon-icons-svelte/lib/ShapeIntersect.svelte';
	import { number_to_euro } from '$lib/util';
	import ShapeExcept from 'carbon-icons-svelte/lib/ShapeExcept.svelte';
	import ShapeExclude from 'carbon-icons-svelte/lib/ShapeExclude.svelte';
	import { favorites } from '$lib/store';
	import type { Property_Detail } from 'src/routes/property/[filter]/[ref]/detail_api';
	import Favorite from 'carbon-icons-svelte/lib/Favorite.svelte';
	import FavoriteFilled from 'carbon-icons-svelte/lib/FavoriteFilled.svelte';
	import { goto } from '$app/navigation';

	export let property: Property;
	export let filter: string;

	$: is_favorite = $favorites.favorites.find((f) => f.ref == property.Reference);

	function add_favorite() {
		if (is_favorite) {
			favorites.update((v) => {
				return { favorites: v.favorites.filter((v) => v.ref != property.Reference) };
			});
		} else {
			favorites.update((v) => {
				v.favorites.push({
					ref: property.Reference,
					// We dont have enough information compared to the single property request, but we dont need it anyways
					property: property as unknown as Property_Detail,
					filter: filter
				});

				return v;
			});
		}
	}

	function show_property() {
		goto(`/property/${filter}/${property.Reference}`);
	}
</script>

{#if property}
	<div class="wrapper">
		<div class="favorite" on:click={add_favorite}>
			{#if !is_favorite}
				<Favorite size={32} />
			{:else}
				<FavoriteFilled size={32} />
			{/if}
		</div>
		<div class="property" on:click={show_property}>
			<div class="property_image_wrapper">
				<img src={property.MainImage} class="property_image" alt="property" />
			</div>
			<div class="property_info">
				<span class="property_title">
					{property.Description}
				</span>
				<div class="property_id">
					<span>
						{property.Location}
					</span>
					<span>
						{property.Reference}
					</span>
				</div>

				<div class="property_stats">
					{#if +property.Bedrooms}
						<div class="stat">
							<HospitalBed />
							{property.Bedrooms}
						</div>
					{/if}
					{#if +property.Built}
						<div class="stat">
							<ShapeExcept />
							{property.Built} m²
						</div>
					{/if}
					{#if +property.GardenPlot}
						<div class="stat">
							<ShapeIntersect />
							{property.GardenPlot} m²
						</div>
					{/if}
					{#if +property.Terrace}
						<div class="stat">
							<ShapeExclude />
							{property.Terrace} m²
						</div>
					{/if}
				</div>
				<div class="property_price">
					<div>
						{#if property.Price}
							{number_to_euro(+property.Price)}
						{:else}
							Short Term: {number_to_euro(property.RentalPrice1)} / Week
							<br />
							Long Term: {number_to_euro(property.RentalPrice2)} / Month
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.wrapper {
		position: relative;
	}
	.favorite {
		position: absolute;
		right: 10px;
		top: 10px;
	}
	.property {
		height: 420px;
		width: 310px;
		border: 1px solid rgba(0, 0, 0, 0.125);
		display: flex;
		flex-direction: column;
	}

	.property_id {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		gap: 5px;
		margin-top: 10px;

		font-size: 0.8rem;
		font-weight: 300;
	}

	.property_image {
		height: 200px;
		width: 100%;
	}

	.property_info {
		padding: 10px;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.property_title {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		height: 30px;
	}

	.property_stats {
		display: flex;
		gap: 5px;
		width: 100%;
		align-items: center;
		justify-content: center;
		border-top: 1px solid rgba(0, 0, 0, 0.125);
		margin-top: 15px;
		padding-top: 15px;
	}

	.property_price {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: auto;
		margin-left: auto;
	}
</style>
