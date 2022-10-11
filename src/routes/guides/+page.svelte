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
		<div class="grid-item">Golden Visa Guide</div>
		<div class="grid-item">Buyer Guide</div>
		<div class="grid-item">Seller Guide</div>
		<div class="grid-item">Vacation Rental Guide</div>
		<div class="grid-item">Investment Guide</div>
		<div class="grid-item">Tax considerations</div>

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
		max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.grid-item {
	background-color: #00b8bc;
  color: white;
  padding: 1rem;
  height: 4rem;
}
</style>
