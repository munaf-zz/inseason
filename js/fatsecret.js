// FatSecret API
// http://platform.fatsecret.com/api/Default.aspx?screen=rapih
// Uses jsOAuth: http://bytespider.github.com/jsOAuth/

var FS_API = "http://platform.fatsecret.com/rest/server.api";

var FS_CONFIG = {
  consumerKey:    "4d8469cc5a794a91abab7e12b6f625b7",
  consumerSecret: "6216b13c7b464447b8fe9149ff5e5394"
};

var FS = new OAuth(FS_CONFIG);

// Returns food ID based on search term
function fs_food_search(str) {
  var url = FS_API + "?format=json&method=foods.search&search_expression="+str;
  var id = null;
  FS.get(url, function(data) {
    // Process JSON response
  });
}

// Returns nutrition info using food ID 
function fs_nutrition(food_id) {
}

// Returnns array of nutrition info based on array of food IDs
function fs_all_nutritions(foodarray) {
}

function fs_failure(data) {
  console.error(data)
  alert("Can't connect to FatSecret API (see console)");
}
