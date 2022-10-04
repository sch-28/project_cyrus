<script lang="ts">
	import founder_image from '$lib/assets/founder.jpg';
	import superhost_image from '$lib/assets/superhost.png';
	import airbng_image from '$lib/assets/airbnb.png';
	import booking_image from '$lib/assets/booking.png';

	import whatsapp_logo from '$lib/assets/whatsapp.png';
</script>

<svelte:head>
	<title>Contact</title>
	<meta name="description" content="Contact ..." />
</svelte:head>

<img class="founder_image" src={founder_image} alt="Cyrus Varzi" />
<div class="awards">
	<div class="award">
		<img src={superhost_image} alt="Airbnb Superhost Logo" />
		<span>Airbnb Superhost</span>
	</div>
	<div class="award">
		<img src={airbng_image} alt="Airbnb Logo" />
		<span>22 Airbnb Reviews</span>
	</div>
	<div class="award">
		<img src={booking_image} alt="Booking Logo" />
		<span>9 Booking Reviews</span>
	</div>
</div>
<h1>About us</h1>
<h3>This is Cyrus from Marbella</h3>
<br />
<span>
	Varzi Realty is a Marbella-based real estate company, founded by Cyrus Varzi, focused on three key
	areas:
</span>
<br />
<ol>
	<li>Managing owners’ properties for short-term rentals</li>
	<li>
		Guiding potential buyers through the entire process of selecting & buying properties in Marbella
	</li>
	<li>Investing in properties under its own umbrella to refurbish and rent out</li>
</ol>
<br />
<span>
	If you have any questions or are interested in any of our services please do not hesitate to
	contact us either via the below form.
</span>
<div class="spacer" />
<h1>Send us a message!</h1>
<div class="whatsapp">
	<a sveltekit:prefetch href="https://wa.me/34689105197">
		<img class="whatsapp_logo" src={whatsapp_logo} alt="whatsapp logo" />
	</a>
</div>

<div class="contact_form">
	<div class="field">
		<label class="label" for="name">Name</label>
		<div class="control">
			<input class="input " type="text" placeholder="" id="name" />
		</div>
	</div>

	<div class="field">
		<label class="label" for="name">Email</label>
		<div class="control">
			<input class="input " type="email" placeholder="" id="name" />
		</div>
	</div>

	<div class="field">
		<label class="label" for="name">Message</label>
		<div class="control">
			<textarea class="textarea" placeholder="" />
		</div>
	</div>

	<div class="control" style="margin-left:auto;">
		<button class="button is-link" style="margin-left:auto;">Submit</button>
	</div>
</div>

<style>
	h1,
	h3 {
		margin-left: auto;
		margin-right: auto;
	}
	h1 {
		font-weight: 600;
		font-size: 2.5rem;
	}

	h3 {
		font-size: 1.5rem;
		color: #00b8bc;
	}

	.spacer {
		margin-top: 100px;
	}
	.awards {
		display: flex;
		justify-content: center;
		margin-bottom: 35px;
		margin-top: 35px;
		gap: 10px;
	}
	.award {
		display: flex;
		gap: 5px;
		max-width: 150px;
		font-weight: 200;
		align-items: center;
	}
	.award span {
		line-height: 1.5rem;
	}
	span {
		font-size: 1.25rem;
		line-height: 2rem;
	}

	.founder_image {
		border-radius: 50%;
		width: 300px;
		height: 300px;
		object-fit: cover;
		object-position: top;
		margin-left: auto;
		margin-right: auto;
	}
	ol {
		list-style: decimal;
	}

	li {
		font-size: 1.25rem;
		line-height: 2rem;
		margin-left: 1em;
	}
	.whatsapp_logo {
		width: 50px;

	}
	.whatsapp{
		margin: 0 auto;
		display: block;
	}
</style>
