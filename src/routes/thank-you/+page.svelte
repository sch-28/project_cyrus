<svelte:head>
	<title>Thank You</title>
	<meta name="description" content="thank-you" />
</svelte:head>
<div class="wrapper">
	<div class="content">
		Thank you for contacting us. We will be in touch shortly to help you with your enquiry.
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
