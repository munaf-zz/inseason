// FatSecret API
// http://platform.fatsecret.com/api/Default.aspx?screen=rapih
// Uses a lightly modified version of jsOAuth: http://bytespider.github.com/jsOAuth/

var FS_API = "http://platform.fatsecret.com/rest/server.api";

// These are Naim's API keys
var FS_CONFIG = {
  consumerKey: "af74e371df6944b1872993af862cc2d2",
  consumerSecret: "b37852881e45426f870067ef7c313d50"
};

var FS = new OAuth(FS_CONFIG);

// "Cache" object for foods
var FOOD_CACHE = new Array();

// Fetches food objects for each food name given
function fs_getFoods(foods, clientCallback) {
  
  for (i in foods) {
    
    if (FOOD_CACHE[foods[i]]) {
      console.log("Cache hit on " + foods[i]);
      clientCallback(FOOD_CACHE[foods[i]]);
    }
    else {
      console.log("Querying FS for " + foods[i]);
      fs_foodSearch(foods[i], clientCallback);
    }
  }
}

// Returns food ID based on search term
function fs_foodSearch(clientFood, clientCallback) {
  
  fs_call('foods.search', {'search_expression': clientFood}, function(data) {
    
	  var result = JSON.parse(data.text);
	  
	  if (result.error) {
	    console.log("Error in fs_foodSearch");
	    console.log(result.error.message);
	    alert("There was a problem with the FatSecret API (see console)");
	    return;
	  }
	  
	  var foodList = result.foods.food;
	  var foodRE = new RegExp(clientFood, 'i');
	  
	  // Find the best match and pass it on to getFood
	  for (i in foodList) {
	    
	    // Get item that matches the food as given and has generic type
	    if (foodList[i].food_name.match(foodRE) &&
	        foodList[i].food_type == "Generic") {
	      console.log("Found match for " + clientFood + " with id=" + foodList[i].food_id);
	      fs_getFood(foodList[i], clientFood, clientCallback);
	      break;
	    }
	  }
	});
}

function fs_getFood(foodObj, clientFood, clientCallback) {
  
  fs_call('food.get', {'food_id': foodObj.food_id}, function(data) {
    
    var result = JSON.parse(data.text);
	  
	  if (result.error) {
	    console.log("Error in fs_getFood");
	    console.log(result.error.message);
	    //alert("There was a problem with the FatSecret API (see console)");
	    return;
	  }
	  
	  result['ourFoodName'] = clientFood;
	  
    console.log("Storing " + foodObj.food_name + " (clientName=" + clientFood + ") in cache");
    FOOD_CACHE[clientFood] = result;
    
    clientCallback(result);    
  });
}

// Performs a request to the FS API for the given method
function fs_call(method, methodData, callback) {
  
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
  
  var data = {
    'format': 'json',
	  'method': method
  }
  
  // Copy in methodData
  for (key in methodData)
    data[key] = methodData[key];
  
  var ops = {
    // Modified jsOAuth so GET and POST both work.
  	method: 'POST',
  	url: FS_API,
  	success: callback,
  	failure: function(data) {
  	  console.error(JSON.parse(data.text));
      //alert("Can't connect to FatSecret API (see console)");
  	},
  	headers: {
  	  // CORS is still an issue. Best bet is to run with security disabled for now.
  		'Access-Control-Allow-Origin': '*'
  	},
  	data: data
  };
  
  FS.request(ops);
}
