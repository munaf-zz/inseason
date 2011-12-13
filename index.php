<!doctype html>
<html>
<head>
  <title>SI 649 - Assignment 3 - What's in Season?</title>
  <!-- Scripts -->
  <script type="text/javascript" src="js/lib/jsOAuth-1.3.1.js"></script>
  <script type="text/javascript" src="js/lib/d3.min.js"></script>
  <script type="text/javascript" src="js/lib/d3.time.min.js"></script>
  <!-- Styles -->
  <link rel="stylesheet" type="text/css" href="css/lib/bootstrap.min.css" />
  <link rel="stylesheet" type="text/css" href="css/viz.css" />
</head>
<body>

<?php
require_once('fs-lib/FatSecretAPI.php');
require_once('fs-lib/config.php');

$API = new FatSecretAPI(API_KEY, API_SECRET);

$token;
$secret;

try {
	$API->ProfileCreate(null, $token, $secret);
	print '<div>auth_token: ' . $token . '</div>';
	print '<div>auth_secret: ' . $secret . '</div>';
}
catch(FatSecretException $ex) {
	print '<div>Error: ' . $ex->getCode() . ' - ' . $ex->getMessage() . '</div>';
}

$auth = array(token=>$token, secret=>$secret);
$sessionKey;

try {
    $API->ProfileRequestScriptSessionKey($auth, null, null, null, true, $sessionKey);
    setCookie("fatsecret_session_key", $sessionKey); 
    print '<div>session_key: ' . $sessionKey . '</div><br />';
}
catch(FatSecretException $ex) {
	print '<div>Error: ' . $ex->getCode() . ' - ' . $ex->getMessage() . '</div>';
}
?>

  <div class="container">
    <div class="row" id="headline">
      <h1>What's Good to Eat Near You?</h1>
    </div>
    <div class="row" id="vizview">
      <div class="span5" id="filters">
        <div class="row" id="location">
          <form>
            <fieldset>
              <legend>Location</legend>
              <div class="clearfix">
                <label for="zipcode">Zip Code</label>
                <div class="input">
                  <input class="span2" id="zipcode" name="zipcode" size="5" type="text">
                  <button class="btn primary">Submit</button>
                </div>
              </div>
              <div class="clearfix">
                <label for="radius">Radius</label>
                <div class="input">
                  <input id="radius" name="radius" type="range" min="0" max="500" step="100" value="0">
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        <div class="row" id="nutrition">
          <form>
            <fieldset>
              <legend>Nutritional Filters</legend>
              <div class="clearfix">
                <div class="input">
                  <ul class="inputs-list">
                    <li>
                      <label>
                        <input type="checkbox" name="nutritionBox" value="protein">
                        <span>Protein</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox" name="nutritionBox" value="calcium">
                        <span>Calcium</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox" name="nutritionBox" value="sodium">
                        <span>Sodium</span>
                      </label>
                    </li>
                    <li> 
                      <label>
                        <input type="checkbox" name="nutritionBox" value="fiber">
                        <span>Fiber</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox" name="nutritionBox" value="vitaminc">
                        <span>Vitamin C</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox" name="nutritionBox" value="potassium">
                        <span>Potassium</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox" name="nutritionBox" value="fat">
                        <span>Fat</span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
      <div class="span11" id="viz">
      </div>
    </div>
    <div class="row" id="nutrition">
      <table class="zebra-striped">
        <thead>
          <th>Name</th>
          <th>Protein (g)</th>
          <th>Calcium (mg)</th>
          <th>Sodium (mg)</th>
          <th>Fiber (g)</th>
          <th>Vitamin C (mg)</th>
          <th>Potassium (mg)</th>
          <th>Fat (g)</th>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </div>
  <script type="text/javascript" src="js/fatsecret.js"></script>
  <script type="text/javascript" src="js/viz.js"></script>
</body>
</html>

