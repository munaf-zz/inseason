// FatSecret API
// http://platform.fatsecret.com/api/Default.aspx?screen=rapih
// Uses a lightly modified version of jsOAuth: http://bytespider.github.com/jsOAuth/

var FS_API = "http://platform.fatsecret.com/rest/server.api";

// Replaced Munaf's (seemingly broken) API keys with my own.
var FS_CONFIG = {
  consumerKey: "af74e371df6944b1872993af862cc2d2",
  consumerSecret: "b37852881e45426f870067ef7c313d50"
};

var FS = new OAuth(FS_CONFIG);

// Returns food ID based on search term
function fs_food_search(food) {
  var id = null;
  // Part of the problem with FatSecret + OAuth has to do with CORS. The browser is
  // not accepting the response (or not allowing it in the first place).
  // You can tell because if you look in the dev console network tab you'll see the
  // request status marked as 403 Cancelled. To get around this, you can start Chrome
  // in a no-security sandbox mode that is useful for dev using:
  //
  //   /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security --allow-file-access-from-files --allow-file-access --user-data-dir=chrome-test
  //
  // NOTE: This will create a user profile directory for Chrome called chrome-test
  // in the pwd.
  var ops = {
    // I have modified jsOAuth so that both GET and POST work correctly now.
  	method: 'POST',
  	url: FS_API,
  	success: function(data) {
  	  console.log(JSON.parse(data.text));
  	  console.log(JSON.parse(data.text).foods.food[0].food_description);
  	},
  	failure: function(data) {
  	  console.error(JSON.parse(data.text));
      alert("Can't connect to FatSecret API (see console)");
  	},
  	headers: {
  	  // CORS is still an issue. Best bet is to run with security disabled for now.
  		'Access-Control-Allow-Origin': '*'
  	},
  	data: {
  	  'format': 'json',
  	  'method': 'foods.search',
  	  'search_expression': food
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
