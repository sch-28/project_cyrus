<svelte:head>
	<title>Home</title>
	<meta name="description" content="TODO" />
	<!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
<!-- JavaScript Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous"></script>
</svelte:head>


<!-- Make sure you don't change the form action-->
<form target ="thankyou" class=jotform-form action="https://api.staticforms.xyz/submit" method="post" name="form_contact">
	<!-- Replace with accesKey sent to your email -->
	<input type="hidden" name="accessKey" value="407a6bee-b1f7-4d34-ab6a-dbaee6250f3c"> <!-- Required -->
	<input type="text" name="name" placeholder="Your Name"> <!-- Optional --><br>
	<input type="text" name="email"placeholder="Your E-Mail Address"> <!-- Optional --><br>
	<input type="text" name="phone"placeholder="Your Telephone Number"> <!-- Optional --><br>
	<input type="text" name="subject"placeholder="Subject"> <!-- Optional --><br>
	<textarea rows="8" name="message" placeholder="Your Message"></textarea> <!-- Optional --><br>
	<!-- If you want form to redirect to a specific url after submission -->
	<input type="hidden" name="redirectTo" value="https://varzi-realty.com/thank-you">
	<!-- If we receive data in this field submission will be ignored -->
	<input type="text" name="honeypot" style="display: none;"> <!-- Optional -->
	<input type="submit" value="Submit" />
	
</form>
