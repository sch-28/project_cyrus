<script lang="ts">
	import type { Property } from 'src/routes/properties/search_api';
	import HospitalBed from 'carbon-icons-svelte/lib/HospitalBed.svelte';
	import ShapeIntersect from 'carbon-icons-svelte/lib/ShapeIntersect.svelte';
	import { number_to_euro } from '$lib/util';

	export let property: Property;
</script>
<div class="property">
	<div class="property_image_wrapper">
		<img src={property.MainImage} class="property_image" alt="property" />
	</div>
	<div class="property_info">
		<span class="property_title">
			{property.Description}
		</span>
		<div class="property_stats">
			<div class="stat">
				<HospitalBed />
				{property.Bedrooms}
			</div>
			<div class="stat">
				<ShapeIntersect />
				{property.Built} m²
			</div>
		</div>
		<div class="property_price">
			<span>Asking Price</span>

			<div>
				{#if property.Price}
					{number_to_euro(+property.Price)}
				{:else}
					Short Term: {number_to_euro(property.RentalPrice1)} / Week
                    <br>
					Long Term: {number_to_euro(property.RentalPrice2)} / Month
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.property {
		height: 400px;
		width: 300px;
		border: 1px solid rgba(0, 0, 0, 0.125);
		display: flex;
		flex-direction: column;
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
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
		height: 58px;
	}

	.property_stats {
		display: flex;
		gap: 10px;
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
		margin: auto 0;
	}
</style>
