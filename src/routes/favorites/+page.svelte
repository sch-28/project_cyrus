<script lang="ts">
	import Form from '$lib/form.svelte';
	import Property from '$lib/property.svelte';
	import { favorites } from '$lib/store';
	import { number_to_euro } from '$lib/util';

	function remove_favorite(ref: string) {
		favorites.update((v) => {
			return { favorites: v.favorites.filter((v) => v.ref != ref) };
		});
	}
</script>

<h1>Favorites</h1>
<div class="properties">
	{#each $favorites.favorites as fav}
		{#if fav.property}
			<nav class="level property">
				<!-- Left side -->

				<a class="level-left" sveltekit:prefetch href="/property/{fav.filter}/{fav.ref}">
					<div class="level-item">
						<div class="property_image">
							{#if fav.property.Pictures && fav.property.Pictures.Count > 0}
								<img
									src={fav.property.Pictures.Picture[0].PictureURL}
									alt="property thumbnail"
								/>
							{:else if fav.property.MainImage}
							<img
									src={fav.property.MainImage}
									alt="property thumbnail"
								/>
							{/if}
						</div>
					</div>
					<div class="level-item">
						<div class="field ">
							<div class="id">
								<strong>{fav.ref}</strong>
							</div>
							<div class="stats">
								{#if fav.property.Price}
									{number_to_euro(+fav.property.Price)}
								{:else}
									Short Term: {number_to_euro(fav.property.RentalPrice1)} / Week
									<br />
									Long Term: {number_to_euro(fav.property.RentalPrice2)} / Month
								{/if}
							</div>
						</div>
					</div>
				</a>

				<!-- Right side -->
				<div class="level-right">
					<p class="level-item">
						<button class="button is-danger" on:click={() => remove_favorite(fav.ref)}
							>Remove</button
						>
					</p>
				</div>
			</nav>
		{/if}
	{/each}
	{#if !$favorites || $favorites.favorites.length == 0}
		<div class="empty">You have no properties saved.</div>
	{/if}
	<br />
	<h1>Contact</h1>
	<div class="contact_form">
		<Form />
	</div>
</div>

<style>
	.properties {
		margin-top: 15px;
	}
	.property_image {
		width: 100px;
		height: 75px;
		display: flex;
	}
	.property_image img {
		margin: auto 0;
		display: block;
	}

	.property {
		box-shadow: 0 0 3px 1px #00000024;
		margin-bottom: 15px;
	}

	.level-right {
		margin-right: 10px;
	}

	h1 {
		font-weight: 600;
		font-size: 2.5rem;
	}

	.level-left {
		color: black;
	}
</style>
