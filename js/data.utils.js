// Global color mapping object.
var COLORS = {
  'red': "#ff9896",
  'blue': "#aec7e8",
  'green': "#98df8a",
  'orange': "#ffbb78",
  'yellow': "#ffff99",
  'purple': "#c5b0d5"
};

// Generates an array geared for searching FatSecret.
// Called when minute hand is dropped over a specific month.
// state, month are indexes for the global data array.
function selectedFoods(state, month) { 
  var i,
      searchList = [], 
      foods = data[state].months[month].foods;

  for (i = 0; i < foods.length; i++) 
    searchList.push(foods[i].food);

  return searchList;
}

// Generates an object of color arcs, year-round for a specific state.
// Called when "states" dropdown changes.
function arcsPerState(state) { 
  var mnths, fds, arcs = [];
  var i, j, c;

  function ind(col) {
    var out = NaN;
    for (var i=0; i<arcs.length; i++) {
      if (arcs[i]['color'] == col) {
        out = i;
        break;
      }
    }
    return out;
  }

  mnths = data[state].months;
  for (i=0; i<mnths.length; i++) {
    fds = mnths[i].foods;
    for (j=0; j<fds.length; j++) {
      for (c=0; c<fds[j].colors.length; c++) {
        x = ind(fds[j].colors[c]);

        if (x >= 0) {
          arcs[x]['foods'].push(fds[j]);
          arcs[x]['len'] = i - arcs[x]['start'];
        }
        else {
          arcs.push({
            color: fds[j].colors[c],
            start: i,
            len: 0,
            foods: [fds[j]]
          });
        }
      }
    }
  }
  return arcs; // array of arcs, labeled by color
}
