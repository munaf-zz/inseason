
// Working data set for currently selected state.
var CURRENT_STATE = 0;
var CURRENT_MONTH = undefined;
var OTHER_MONTH = undefined;
var STATE_DATA = arcsPerState(CURRENT_STATE);

// Global color mapping object.
var COLORS = {
  "red": {ind: 0, hex: "#ff9896"},
  "blue": {ind: 1, hex: "#aec7e8"},
  "green": {ind: 2, hex: "#98df8a"},
  "orange": {ind: 3, hex: "#ffbb78"},
  "yellow": {ind: 4, hex: "#ffff99"},
  "purple": {ind: 5, hex: "#c5b0d5"},
  "white": {ind: 6, hex: "#ffffff"}
};

// Global month mapping array.
var MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

// Given a MONTHS array index, return the wedge index we need to fill 
// in on the viz circle.
// In protovis, January  -> 3-4 O'clock
//              February -> 4-5 O'clock, etc... 
// In our assumptions, January -> 12 O'clock
function alignMonth(month_idx) {
  if (month_idx < 9)
    return month_idx + 3;
  else
    return month_idx - 9;
}

function alignMonthName(month_name) {
  var base, offset;
  for (var i = 0; i < MONTHS.length; i++) {
    if (MONTHS[i] == month_name) {
      base = i;
      break;
    }
  }
  return MONTHS[alignMonth(base)];
}

// Generates an array geared for searching FatSecret.
// Called when minute hand is dropped over a specific month.
// state, month are indexes for the global data array.
function selectedFoods(state, month) { 
  var i,
      searchList = [], 
      foods = data[state].months[month].foods || [];

  for (i = 0; i < foods.length; i++) 
    searchList.push(foods[i].food);

  return searchList;
}

function arcsPerState(state) {
  
  var months = data[state].months;
  var foods, food, arcs = [];
  var monthColors = {};
  
  for (monthIdx in months) {
      
    foods = months[monthIdx].foods;
    if (foods.length == 0) continue;
    
    monthColors = {
      'red': [],
      'blue': [],
      'green': [],
      'orange': [],
      'yellow': [],
      'purple': [],
      'white': []
    };
    
    // Collect all the foods by color for this month
    for (color in monthColors) {
      for (foodIdx in foods) {
        food = foods[foodIdx];
        for (colIdx in food.colors) {
          if (food.colors[colIdx] == color) {
            monthColors[color].push(food);
          }
        }
      }
    }
    
    // Collect all the arcs
    for (color in monthColors) {
      if (monthColors[color].length > 0) {
        arcs.push({
          start: monthIdx,
          foods: monthColors[color],
          color: color
        });
      }
    }
  }
  
  return arcs;
}
