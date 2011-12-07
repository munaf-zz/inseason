var w = 620,
    h = 400,
    r = Math.min(w, h) / 1.8,
    s = .09,
    wedge = 360 / 12 * Math.PI / 180;

var arc = d3.svg.arc()
    .startAngle(function(d) { return d.start * wedge; })
    .endAngle(function(d) { return d.end * wedge; })
    .innerRadius(function(d) { return d.index * r; })
    .outerRadius(function(d) { return (d.index + s) * r; });

var vis = d3.select("#viz").append("svg")
    .attr("width", w)
    .attr("height", h)
  .append("g")
    .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

var g = vis.selectAll("g")
    .data(fields)
  .enter().append("g");

g.append("path")
    .style("fill", function(d) { return d.color; })
    .attr("d", arc);

g.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "1em")
    .text(function(d) { return d.name; });

// Generate the fields for the current date/time.
function fields() {
  return [
    {index: 0.1, name: "Apples",      color: "red", start: 0, end: 3},
    {index: 0.2, name: "Blueberries", color: "blue", start: 0, end: 6},
    {index: 0.3, name: "Spinach",     color: "green", start: 1, end: 4},
    {index: 0.4, name: "Banana",      color: "yellow", start: 5, end: 11},
  ];
}
