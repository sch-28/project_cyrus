<svelte:head>
	<title>Guides to Marbella Real Estate</title>
	<meta name="description" content="Guides to Marbella Real Estate sales, purchases and investments" />
</svelte:head>

<section>
	<div class="text_content">
		<h1>Guides to Marbella Real Estate</h1>
		<h3>General considerations to buying and selling</h3>
		<br />
		<span>We have guides for owners, buyers and investors. We hope they will help you in making
			your decision. We are always available for any questions you may have via one of the contact forms on the site or via Whatsapp</span>
	</div>
</section>

<section>
	<div class="grid-container">
		<div class="grid-item">Blog post 1</div>
		<div class="grid-item">Blog post 2</div>
		<div class="grid-item">Blog post 3</div>
		<div class="grid-item">Blog post 4</div>
		<div class="grid-item">Blog post 5</div>
		<div class="grid-item">Blog post 6</div>
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

	.grid-container {
  display: grid;
  column-gap: 50px;
  row-gap: 50px;
  grid-template-columns: auto auto auto;
  padding: 10px;
}

.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 100px;
  font-size: 30px;
  text-align: center;
}
</style>
