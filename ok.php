<?php
$amount = floatval($_REQUEST['amount']);
$balance = floatval($_REQUEST['balance']);

?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../../../favicon.ico">

    <title>Easy QR</title>

    <!-- Bootstrap core CSS -->
    <link href="../../dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="pricing.css" rel="stylesheet">

  </head>

  <body>

    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 class="my-0 mr-md-auto font-weight-normal"><img src="/assets/easyqr-logo-hor.png" width="150" class="rounded mx-auto d-block"></h5>
      <nav class="my-2 my-md-0 mr-md-3">
		<a class="p-2 text-dark" href="/pricing.html">Pricing</a>
        <a class="p-2 text-dark" href="/stat.html">Reports</a>        
        <a class="p-2 text-dark" href="#">Support</a>
        <a class="p-2 text-dark" href="#">Pricing</a>
      </nav>
      <a class="btn btn-outline-primary" href="#">Sign up</a>
    </div>
	





	
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">Success</h1>
    </div>

    <div class="container">

	
	<?php 
	
if(!$amount){
	?>
	    <div class="card-deck mb-3">
		<div style="width: 100%;">Your payment successfully proceed!</div>
      </div>
	<?php
}
elseif($amount > 0){
	?>
	<div class="card-deck mb-3">
		<div style="width: 100%;">Your payment of <?php echo (round($amount, 2));?> € successfully proceed!</div>
		
		<?php
		if($balance){
			echo '<div style="width: 100%;">Your available balance is '.(round($balance, 2)).' €.</div>';
		}
		
		?>
    </div>
	<?php
}

?>


      <footer class="pt-4 my-md-5 pt-md-5 border-top">
        <div class="row">
          <div class="col-12 col-md">
			<h5>Easy QR</h5>
            <small class="d-block mb-3 text-muted">&copy; 2018</small>
          </div>
          <div class="col-6 col-md">
            <h5>Features</h5>
            <ul class="list-unstyled text-small">
              <li><a class="text-muted" href="#">Killing features</a></li>
              <li><a class="text-muted" href="#">Our technologies</a></li>
              <li><a class="text-muted" href="#">Stuff for developers</a></li>
              <li><a class="text-muted" href="#">API documentation</a></li>
              <li><a class="text-muted" href="#">Corporate Blog</a></li>
            </ul>
          </div>
          <div class="col-6 col-md">
            <h5>Resources</h5>
            <ul class="list-unstyled text-small">
              <li><a class="text-muted" href="#">Partners</a></li>
              <li><a class="text-muted" href="#">Legal background</a></li>
              <li><a class="text-muted" href="#">Facilities</a></li>
              <li><a class="text-muted" href="#">Our network</a></li>
            </ul>
          </div>
          <div class="col-6 col-md">
            <h5>About</h5>
            <ul class="list-unstyled text-small">
              <li><a class="text-muted" href="#">Team</a></li>
              <li><a class="text-muted" href="#">Locations</a></li>
              <li><a class="text-muted" href="#">Privacy</a></li>
              <li><a class="text-muted" href="#">Terms</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    
    <script src="../../assets/js/vendor/popper.min.js"></script>
    <script src="../../dist/js/bootstrap.min.js"></script>
    <script src="../../assets/js/vendor/holder.min.js"></script>
    <script>
      Holder.addTheme('thumb', {
        bg: '#55595c',
        fg: '#eceeef',
        text: 'Thumbnail'
      });
    </script>
  </body>
</html>
