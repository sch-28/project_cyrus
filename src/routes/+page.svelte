<script lang="ts">
	import header_image from '$lib/assets/headerImage.jfif';
	import report_svg from '$lib/assets/report.svg';

	let selected_type: string = '0';
	let selected_price: string = '500.000';

	function search() {}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="TODO" />
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

		<div class="control">
			<a
				class="button is-link"
				sveltekit:prefetch
				href={`/properties?property_type=${selected_type}&max_price=${selected_price}`}>Search</a
			>
		</div>
	</div>
</section>

<section class="description">
	<div class="text_content">
		<h1>Our Landlord Services</h1>
		<h3>We have everything covered.</h3>
		<br />
		<span
			>We manage all stages of your property’s vacation rental and ensure that your home is kept to
			a high standard. Click on each of our services below to find out more!</span
		>
	</div>
</section>

<section class="evaluation">
	<div class="evaluation_wrapper">
		<div class="evaluation_text">
			<h1>Your Property Has Potential</h1>
			<h3>Find out how much you could be making.</h3>
			<br />
			<span
				>Fill out this quick and easy form to get a better idea of just how much your property could
				be generating for you every month of the year!</span
			>
			<img src={report_svg} alt="home evaluation report" class="report_svg" />
		</div>
		<div class="evaluation_form">
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
				<label class="label" for="address">Property Address</label>
				<div class="control">
					<input class="input " type="text" placeholder="" id="address" />
				</div>
			</div>

			<div class="field">
				<label class="label" for="bedrooms">Number of Bedrooms</label>
				<div class="control">
					<input class="input " type="number" placeholder="" id="bedrooms" />
				</div>
			</div>

			<div class="field">
				<label class="label" for="name">Type of Property</label>
				<div class="control">
					<input class="input " type="text" placeholder="" id="name" />
				</div>
			</div>

			<div class="control">
				<button class="button is-link">Submit</button>
			</div>
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
		display: flex;
		/* flex-wrap: wrap; */
		justify-content: center;
		gap: 5rem;
	}

	.evaluation_form {
		width: 50%;
	}

	.evaluation_form input {
		width: 100%;
	}

	.evaluation_text {
		width: 50%;
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
</style>
