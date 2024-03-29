<script lang="ts">
	import header_image from '$lib/assets/headerImage.jfif';
	import report_svg from '$lib/assets/report.svg';
	import { locations } from './properties/locations';
	import { favorites } from '$lib/store';
	import AutoComplete from 'simple-svelte-autocomplete';
	import { CAPTCHA_SITE_KEY } from '$env/static/private';
	let selected_type: string = '0';
	let selected_price: string = '';
	let selected_locations: string[] = ['Marbella'];
	let selected_purchase_type: string = '1';

	let form: HTMLFormElement;
	let token_input: HTMLInputElement;

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

<svelte:head>
	<title>Varzi Realty - Marbella Real Estate</title>
	<meta name="description" content="Marbella Real Estate and Property Management" />
</svelte:head>

<section class="landing">
	<div class="header_image" style={`background-image: url(${header_image})`} />
	<div class="quick_search">
		<div class="field">
			<label class="label" for="property_type">Types</label>
			<div class="select">
				<select name="property_type" id="property_type" bind:value={selected_type}>
					<option value="0">All types </option>
					<option value="1">Apartment</option>
					<option value="2">House</option>
					<option value="3">Plot</option>
					<option value="4">Commerical</option>
				</select>
			</div>
		</div>
		<div class="currency_input_wrapper">
			<div class="field">
				<label class="label" for="max_price">Max Price</label>
				<input
					class="input "
					name="max_price"
					id="max_price"
					type="currency"
					bind:value={selected_price}
					min="0"
				/>
			</div>
		</div>
		<div class="autocomplete_container">
			<label class="label" for="autocomplete_location">Location</label>
			<AutoComplete
				inputId="autocomplete_location"
				items={locations}
				bind:selectedItem={selected_locations}
				placeholder="All locations"
				showClear
				multiple
			/>
		</div>
		<div class="control">
			<a
				class="button is-link"
				sveltekit:prefetch
				href={`/properties?property_type=${selected_type}&max_price=${selected_price}&locations=${selected_locations.join(
					','
				)}&purchase_type=${selected_purchase_type}`}>Search</a
			>
		</div>
	</div>
</section>

<section class="description">
	<div class="text_content">
		<h1>We find the right property for your golden visa</h1>
		<h3>Our area of expertise is in properties between €500.000 and €3.000.000</h3>
		<br />
		<span>We are with you from selection to financing to purchasing and after-sales service.</span>
	</div>
</section>

<section class="evaluation">
	<div class="evaluation_wrapper tile is-ancestor">
		<div class="evaluation_text tile">
			<h1>What are you looking to buy?</h1>
			<h3>
				If you care about more than just rental yield, please let us know and we will send you a
				customised list of properties.
			</h3>
			<br />
			<span
				>We will help you select the right property for you, to live in and / or rent it out while
				you are abroad.</span
			>
			<img src={report_svg} alt="home evaluation report" class="report_svg" />
		</div>
		<div class="evaluation_form tile">
			<form action="/api/mail" method="post" bind:this={form}>
				<input type="hidden" name="token" bind:this={token_input} />

				<div class="field">
					<label class="label" for="name">Your Name</label>
					<div class="control">
						<input class="input " type="text" placeholder="" id="name" required name="name" />
					</div>
				</div>

				<div class="field">
					<label class="label" for="email">Your Email</label>
					<div class="control">
						<input class="input " type="email" placeholder="" id="email" required name="email" />
					</div>
				</div>

				<div class="field">
					<label class="label" for="address">Property Location</label>
					<div class="control">
						<input class="input " type="text" placeholder="" id="address" required name="address" />
					</div>
				</div>

				<div class="field">
					<label class="label" for="bedrooms">Number of Bedrooms</label>
					<div class="control">
						<input
							class="input "
							type="number"
							placeholder=""
							id="bedrooms"
							required
							name="bedrooms"
						/>
					</div>
				</div>

				<div class="field">
					<label class="label" for="type"
						>Type of Property (Apartment, Villa, Townhouse, etc.)</label
					>
					<div class="control">
						<input class="input " type="text" placeholder="" id="type" required name="type" />
					</div>
				</div>

				<div class="field">
					<label class="label" for="message">Any other details or requirements</label>
					<div class="control">
						<textarea
							class="textarea"
							placeholder=""
							rows="3"
							id="message"
							required
							name="message"
						/>
					</div>
				</div>

				<input
					type="hidden"
					value={$favorites.favorites.map((f) => f.ref).join(',')}
					name="references"
				/>

				<div class="control">
					<button type="submit" class="button is-link" on:click={submit_form}>Submit</button>
					<a class="button" href={''} target="_self">Reset</a>
				</div>
			</form>
		</div>
	</div>
</section>

<style>
	.quick_search {
		z-index: 3;
		position: relative;
		background-color: rgba(0, 0, 0, 0.5);
		padding: 20px;
		border-radius: 1rem;
		margin: auto auto;
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.currency_input_wrapper::after {
		content: '€';
		position: absolute;
		top: 50%;
		transform: translateY(-12%);
		right: 10px;
	}

	.currency_input_wrapper {
		position: relative;
	}

	.quick_search a {
		margin-top: 2rem;
	}

	.quick_search label {
		color: white;
	}

	h1 {
		font-weight: 600;
		font-size: 2.5rem;
	}

	h3 {
		font-size: 1.5rem;
		color: #00b8bc;
	}

	span {
		font-size: 1.25rem;
		line-height: 2rem;
	}
	section {
		min-height: 70px;
		margin-bottom: 7rem;
		width: 100%;
	}

	section.landing {
		height: 55vh;
		display: flex;
	}

	.report_svg {
		width: 150px;
		margin-top: auto;
	}
	.text_content {
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 0 25%;
		text-align: center;
	}

	.evaluation_wrapper {
		/* display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 5rem; */
		gap: 5rem;
	}

	.evaluation_form {
		display: flex;
		flex-direction: column;
	}

	.evaluation_form input {
		width: 100%;
	}

	.evaluation_text {
		display: flex;
		align-items: center;
		flex-direction: column;
		text-align: center;
	}

	.header_image {
		position: absolute;
		width: 100%;
		left: 0;
		background-position: center;
		height: 55vh;
		text-align: center;
		display: block;
		background-size: cover;
	}

	.autocomplete_container {
		display: flex;
		flex-direction: column;
	}

	:global(.input-container) {
		position: relative;
		border-color: #dbdbdb !important;
	}
	@media screen and (max-width: 1023px) {
		:global(.autocomplete-list) {
			max-height: calc(6 * (1rem + 10px) + 15px) !important;
		}
		.text_content {
			padding: 0 5%;
		}
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
		height: 2.4em !important;

		background-color: white !important;
		border-color: #dbdbdb !important;
		border-radius: 4px !important;
		color: #363636 !important;
	}

	:global(.autocomplete::after) {
		border-color: #485fc7 !important;
		right: 1.125em;
		z-index: 4;

		border: 3px solid transparent;
		border-radius: 2px;
		border-right: 0;
		border-top: 0;
		content: ' ';
		display: block;
		height: 0.625em;
		margin-top: -0.25em !important;
		pointer-events: none;
		position: absolute;
		top: 50%;
		transform: rotate(-45deg);
		transform-origin: center;
		width: 0.625em;
	}
</style>
