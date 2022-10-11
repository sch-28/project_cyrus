<script lang="ts">
	import propertymanagement from '$lib/assets/propertymanagement.jpg';
	import reviews1 from '$lib/assets/Reviews1.jpg';
	import reviews2 from '$lib/assets/Reviews2.jpg';
	</script>

<svelte:head>
	<title>Property Management Services</title>
	<meta name="description" content="Property Management Services Overview" />
</svelte:head>

<section>
	<div class="text_content">
		<h1>Property Management</h1>
		<h3>Whether you have an existing property you want to generate income with, or you are looking to purchase a property to rent short- or long-term, we 
			offer our full range of flexible services. 
		</h3>
		<br />
	</div>
	<div>
		<img class="responsive" src={propertymanagement} alt="Property Management"/>
	</div>

<div> <br />
You can choose to hire us for all services, some, or even just one of the services. We adapt to you; contact us for an initial discussion.

</div>
</section>
<section>
	<div class="text_content2">
		<h1>References & Reviews</h1>
		<h3>Great guest interaction leads to great reviews, which in turn leads to repeat (and direct) bookings, which increase profits.</h3>
	<span>These are some of the positive reviews which enabled Cyrus to become a Superhost on Airbnb in record time:</span>


<style>
* {box-sizing: border-box;}
.mySlides {display: none;}
img {vertical-align: middle;}

/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
  margin-bottom: 50px;
}

/* The dots/bullets/indicators */
.dot {
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active {
  background-color: #717171;
}

/* Fading animation */
.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

@keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}
</style>

<body>

	<div class="slideshow-container">

<div class="mySlides fade">
	<img class="reviews1" src={reviews1} alt="Reviews 1" />
</div>

<div class="mySlides fade">
	<img class="reviews2" src={reviews2} alt="Reviews2" />
</div>

<br>

<div style="text-align:center">
  <span class="dot"></span> 
  <span class="dot"></span> 
</div>

<script>
	let slideIndex = 0;
	showSlides();
	
	function showSlides() {
	  let i;
	  let slides = document.getElementsByClassName("mySlides");
	  let dots = document.getElementsByClassName("dot");
	  for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";  
	  }
	  slideIndex++;
	  if (slideIndex > slides.length) {slideIndex = 1}    
	  for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	  }
	  slides[slideIndex-1].style.display = "block";  
	  dots[slideIndex-1].className += " active";
	  setTimeout(showSlides, 7000); // Change image every 7 seconds
	}
	</script>

</body>

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

	.text_content2 {
		display: flex;
		align-items: center;
		flex-direction: column;
		text-align: center;
	}
	.responsive {
		width: 100%;
 		height: auto;
	}
</style>
