<script lang="ts">
	import { CAPTCHA_SITE_KEY } from '$env/static/private';
	import { favorites } from '$lib/store';

	let form: HTMLFormElement;
	let token_input: HTMLInputElement;

	function remove_favorite(ref: string) {
		favorites.update((v) => {
			return { favorites: v.favorites.filter((v) => v.ref != ref) };
		});
	}
	async function submit_form(e: Event) {
		e.preventDefault();

		if (!form.checkValidity()) {
			form.reportValidity();
			return;
		}

		await new Promise((resolve, reject) => {
			// grecaptcha.ready needs a callback so we create a promise to await
			grecaptcha.ready(resolve);
		});
		// grecaptcha.execute returns a promise so we can await it
		grecaptcha.execute(CAPTCHA_SITE_KEY, { action: 'submit' }).then(function (new_token: string) {
			token_input.value = new_token;
			form.submit();
		});
	}
</script>

<form action="/api/mail" method="post" bind:this={form}>
	<input type="hidden" name="token" bind:this={token_input} />
	<div class="field">
		<label class="label" for="name">Name</label>
		<div class="control">
			<input class="input " type="text" placeholder="" id="name" name="name" required />
		</div>
	</div>

	<div class="field">
		<label class="label" for="email">Email</label>
		<div class="control">
			<input class="input " type="email" placeholder="" id="email" name="email" required />
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
			<textarea class="textarea" placeholder="" id="message" name="message" />
		</div>
	</div>

	<div class="control" style="margin-left:auto;">
		<button
			class="button is-link"
			style="margin-left:auto;"
			type="submit"
			value={$favorites.favorites.map((f) => f.ref).join(',')}
			name="references"
			on:click={submit_form}>Submit</button
		>
	</div>
</form>

<style>
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
