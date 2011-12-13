// FatSecret API
// http://platform.fatsecret.com/api/Default.aspx?screen=rapih
// Uses jsOAuth: http://bytespider.github.com/jsOAuth/

// NOTE: FS API is currently non-functional! Waiting on them to reset.

var FS_API = "http://platform.fatsecret.com/rest/server.api";

var FS_CONFIG = {
  consumerKey:    "af74e371df6944b1872993af862cc2d2",
  consumerSecret: "b37852881e45426f870067ef7c313d50",
  signatureMethod: "HMAC-SHA1"
};

var FS = new OAuth(FS_CONFIG);

// Returns food ID based on search term
function fs_food_search(str) {
  var url = FS_API + "?format=json&method=foods.search&search_expression="+str;
  var id = null;
  // Part of the problem with FatSecret + OAuth has to do with CORS. I think the
  // browser is not accepting the response (or not allowing it in the first place).
  // You can tell because if you look in the Network tab you'll see the request
  // status marked as cancelled. You can start Chrome in a no-security sandbox mode
  // that is useful for dev using:
  // /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security --allow-file-access-from-files --allow-file-access --user-data-dir=chrome-test
  // When you make the request under that instance instead of a 403 you will get a
  // response with an error saying that oauth_signature_method is missing.
  var ops = {
  	method: 'GET',
  	url: url,
  	success: fs_success,
  	failure: fs_failure,
  	headers: {
  		'Access-Control-Allow-Origin': '*'
  	}
  };
  FS.request(ops);
}

// Returns nutrition info using food ID
function fs_nutrition(food_id) {
}

// Returnns array of nutrition info based on array of food IDs
function fs_all_nutritions(foodarray) {
}

function fs_success(data) {
  console.log(data);
}

function fs_failure(data) {
  console.error(data);
  alert("Can't connect to FatSecret API (see console)");
}
