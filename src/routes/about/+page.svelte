<script lang="ts">
	import founder_image from '$lib/assets/founder.jpg';
	import whatsapp_logo from '$lib/assets/whatsapp.png';
	import Form from '$lib/form.svelte';
</script>

<svelte:head>
	<title>About Varzi Realty</title>
	<meta name="description" content="About the founder and the company" />
</svelte:head>

<img class="founder_image" src={founder_image} alt="Cyrus Varzi" />

<h1>About Cyrus</h1>
<h3>This is Cyrus from Marbella</h3>
<br />
<span>
Cyrus is an IESE (Barcelona) MBA Graduate of Class of 2017, with a background in real estate, project management and consulting,  having worked for multinational companies across the globe for several years.
</span>
<br />
<span>
Cyrus speaks English, Spanish, German and Farsi and has developed a strong knowledge of the real estate market in Marbella, as well as all aspects of the buying & selling process.<br />
He has also developed the neccessary contacts to ensure transfers from abroad reach Spanish Banks and are cleared before settling.

</span>
<div class="spacer" />
<div class="container">
<h1>Send a message via the form below or via </h1> &nbsp; &nbsp;
<div class="whatsapp">
	<a sveltekit:prefetch href="https://wa.me/34689105197">
		<img class="whatsapp_logo" src={whatsapp_logo} alt="whatsapp logo" />
	</a>
</div>
</div>

<Form />

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
	.container {
  display: flex;
 
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
	.whatsapp_logo {
		width: 50px;
	}
	.whatsapp {
		margin: 0 auto;
		display: block;
	}
</style>
