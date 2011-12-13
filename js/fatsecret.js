// FatSecret API
// http://platform.fatsecret.com/api/Default.aspx?screen=rapih
// Uses jsOAuth: http://bytespider.github.com/jsOAuth/

// NOTE: FS API is currently non-functional! Waiting on them to reset.

var FS_API = "http://platform.fatsecret.com/rest/server.api";

// Replaced Munaf's (seemingly broken) API keys with my own.
var FS_CONFIG = {
  consumerKey:    "af74e371df6944b1872993af862cc2d2",
  consumerSecret: "b37852881e45426f870067ef7c313d50",
  signatureMethod: "HMAC-SHA1"
};

var FS = new OAuth(FS_CONFIG);

// Returns food ID based on search term
function fs_food_search(str) {
  var url = FS_API + "?format=json&method=foods.search&search_expression=" + str;
  var id = null;
  // Part of the problem with FatSecret + OAuth has to do with CORS. I think the
  // browser is not accepting the response (or not allowing it in the first place).
  // You can tell because if you look in the dev console network tab you'll see the
  // request status marked as cancelled. You can start Chrome in a no-security
  // sandbox mode that is useful for dev using:
  //
  // /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security --allow-file-access-from-files --allow-file-access --user-data-dir=chrome-test
  //
  // NOTE: This will create a user profile directory for Chrome called chrome-test
  // in the pwd.
  //
  // When you make the request under that instance instead of a 403 you will get a
  // response with an error saying that oauth_signature_method is missing. That's
  // BS though because if you check the headers it is most definitely there and it
  // is set correctly, so I'm not sure what the deal is. All I know is I've spent
  // way too much time trying to get this thing to work. Not sure what to try next.
  //
  // Later...
  // Further ramblings: It seems as though the (awful) FatSecret API wants all the
  // oauth params not just included in the auth header, but actually put on the
  // HTTP request as well. *sigh* So now I'm looking into modifying the jsoauth
  // component to do that more easily, since we also need the generated SHA1 sig
  // as well. (Yeah.)
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
