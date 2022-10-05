<script lang="ts">
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
		{#if fav.results.Property}
			<nav class="level property">
				<!-- Left side -->

				<a class="level-left" sveltekit:prefetch href="/property/{fav.filter}/{fav.ref}">
					<div class="level-item">
						<div class="property_image">
							{#if fav.results.Property?.Pictures.Count > 0}
								<img
									src={fav.results.Property.Pictures.Picture[0].PictureURL}
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
								{number_to_euro(fav.results.Property.Price)}
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
		<div class="field">
			<label class="label" for="name">Name</label>
			<div class="control">
				<input class="input " type="text" placeholder="" id="name" />
			</div>
		</div>

		<div class="field">
			<label class="label" for="email">Email</label>
			<div class="control">
				<input class="input " type="email" placeholder="" id="email" />
			</div>
		</div>

		<div class="field">
			<label class="label" for="properties">Properties</label>
			<div class="control">
				<div class="refs input" id="properties">
					{#each $favorites.favorites as fav}
						<div class="tags has-addons">
							<span class="tag">{fav.ref}</span>
							<span class="tag is-delete" on:click={() => remove_favorite(fav.ref)} />
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="field">
			<label class="label" for="message">Message</label>
			<div class="control">
				<textarea class="textarea" placeholder="" id="message" />
			</div>
		</div>

		<div class="control" style="margin-left:auto;">
			<button class="button is-link" style="margin-left:auto;">Submit</button>
		</div>
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

	.refs {
		display: flex;
		gap: 5px;

		flex-wrap: wrap;
		height: fit-content;
	}
	.refs .tags,
	.refs .tag {
		margin-bottom: 0;
	}
</style>
