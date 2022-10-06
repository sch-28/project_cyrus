<script>
	import whatsapp_logo from '$lib/assets/whatsapp.png';
</script>

<svelte:head>
	<title>Error</title>
	<meta name="description" content="thank-you" />
</svelte:head>
<div class="wrapper">
	<div class="content">
		Something went wrong while trying to send your data. Try contacting with Whatsapp instead.
		<div class="whatsapp">
			<a href="https://wa.me/34689105197">
				<img class="whatsapp_logo" src={whatsapp_logo} alt="whatsapp logo" width="50" />
			</a>
		</div>
		<a href="/" class="button">Home</a>
	</div>
</div>

<style>
	.wrapper {
		height: calc(100vh - 75px);
		display: flex;
	}
	.content {
		margin: auto auto;
		display: flex;
		flex-direction: column;

		width: 40vw;
		text-align: center;

		gap: 20px;
	}
</style>
