<?php
$amount = floatval($_REQUEST['amount']);
$source = $_REQUEST['source'];

if($source == "eac")
	$source_full = "Electricity Authority of Cyprus";
if($source == "free")
	$source_full = "Siga-siga Ltd";
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../../../favicon.ico">

    <title>Pricing example for Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <link href="../../dist/css/bootstrap.min.css" rel="stylesheet">
	<script src="https://canvasjs.com/assets/script/jquery-1.11.1.min.js"></script>

    <!-- Custom styles for this template -->
    <link href="pricing.css" rel="stylesheet">
  </head>

  <body>
  
<script type="text/javascript">  
function pay(){
	  $.post(
	  "http://104.40.194.149:3000/start",
	  {
		amount: "<?php echo $amount; ?>",
		source: "<?php echo $source; ?>"
	  },
	  onAjaxSuccess
	);
	 
	function onAjaxSuccess(data)
	{
	  window.location.replace(data);
	}
}
</script>

	<?php
		if($source == "eac"){
		?>
		<div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm" style="height:115px; background-image: url('/assets/eac-header.png');">
		  
		</div>
		<?php
		}
		else
		{
	?>
		<div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
		  <h5 class="my-0 mr-md-auto font-weight-normal"><img src="/assets/easyqr-logo-hor.png" width="150" class="rounded mx-auto d-block"></h5>
		  <nav class="my-2 my-md-0 mr-md-3">
			<a class="p-2 text-dark" href="/pricing.html">Pricing</a>
			<a class="p-2 text-dark" href="#">Features</a>        
			<a class="p-2 text-dark" href="#">Support</a>
			<a class="p-2 text-dark" href="#">Pricing</a>
		  </nav>
		  <a class="btn btn-outline-primary" href="#">Sign up</a>
		</div>
		<?php
		}
	?>

	<div class="container" style="padding-top:10px;  
	<?php
	if($source == "eac") echo "
	background-image: url('/assets/eac-bg.png'); background-position: right;
    height: 310px;
	background-color: #dbebf6;
    background-repeat: no-repeat;";
	?>
	" >
<?php 
if(!$amount && !$source){
	?>
	    <div class="card-deck mb-3">
		<div style="width: 100%;">Invalid data provided</div>
      </div>
	<?php
}
elseif($amount > 0){
	?>
	<div class="card-deck mb-3" <?php if($source == "eac") echo 'style="padding:20px;"'; ?>">
		<div style="width: 100%;">You are going to pay <?php echo (round($amount, 2));?> €  
		<?php
			if($source_full)
				echo "to ".$source_full;
			elseif ($source)
				echo "to ".$source;
		?></div>
		<div style="padding-top:10px;">
			<button type="submit" class="btn btn-primary" onclick="return pay();">Make payment</button>
		</div>
    </div>
	<?php
}
?>

	<?php 
	if($source == "free")
	{
		?>
		 <div class="card-deck mb-3" style="padding-top:100px;">
			<div class="border-top" style="width: 100%; padding-top:20px; padding-bottom:10px;">Service is provided by Easy QR. Generate QR codes for your customers!</div>
			<button type="submit" class="btn btn-secondary">Get your free subscription</button>
		  </div>
		
		<?php
	}
	?>
    
    <?php
	
		if($source == "eac"){
		?>
		<footer class="pt-4 my-md-5 pt-md-5" style="padding:20px;">
			<div class="row">
			  <div class="col-12 col-md" style="padding: 0px;">
				
				<small class="d-block mb-3 text-muted">Powered by Easy QR &copy; 2018</small>
			  </div>
			  <div class="col-6 col-md">
				
			  </div>
			  <div class="col-6 col-md">
				
			  </div>
			  <div class="col-6 col-md">
				
			  </div>
			</div>
		  </footer>
		  
		<?php
		}
		else
		{
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
		<?php
		}
	?>



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
