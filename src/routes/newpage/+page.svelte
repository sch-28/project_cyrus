<svelte:head>
	<title>To be added</title>
	<meta name="description" content="to be added" />
</svelte:head>

<section>
	<div class="text_content">
		<h1>Placeholder Title</h1>
		<h3>Placeholder Subtitle</h3>
		<br />
		<span>Placeholder Text</span>
	</div>
</section>

<section>
	<div class="tile is-ancestor">
		<div class="tile">
			<div class="left">
				<h1>Placeholder Title</h1>
				<h3>Placeholder Subtitle</h3>
				<br />
				<span>Placeholder Text</span>
			</div>
		</div>
		<div class="tile">
			<div class="right">Image</div>
		</div>
	</div>
</section>

<style>
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
		margin: 0 auto;
		display: block;
		min-height: 70px;
		margin-bottom: 7rem;
		width: 100%;
	}

	.text_content {
		display: flex;
		align-items: center;
		flex-direction: column;
		text-align: center;
	}
</style>
