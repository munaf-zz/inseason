var STATES = new Array("Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming");

$(document).ready(function() {
  
// Event Handler
// Triggered when state dropdown changes
// Should update visualization + FatSecret Table
$('#stateSelect').change(function() {
  var selected = $('#stateSelect option:selected').html();
  var index = 0;
  for (var i=0; i < STATES.length; i++) {
    if (STATES[i] == selected) {
      index = i;
      break;
    }
  }
  CURRENT_STATE = index;
  filterVizState(CURRENT_STATE);
  refreshTable();
});

// Updates the global STATE_DATA frame.
// Also updates/renders the visualization using the new data.
function filterVizState(state) {
  STATE_DATA = arcsPerState(state);
  arcs.data(STATE_DATA);
  vis.render();
}

});

