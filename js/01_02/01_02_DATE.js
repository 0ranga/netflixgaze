var data = {
  //"name": "Films mis en avant en position 1:1",
  "children": [
    { "name": "Stranger Things - 2016", "mcap": 69 },
    { "name": "Disenchantment - 2018", "mcap": 46 },
    { "name": "The Walking Dead - 2010", "mcap": 38 },
    { "name": "Attack of Titans - 2013", "mcap": 28},
    { "name": "Narcos - 2015-2017", "mcap": 28 }
  ]
};

var color = d3.scale.category20c();

var treemap =
  d3.layout.treemap()
  // use 100 x 100 px, which we'll apply as % later


  .size([100, 100])
  .sticky(false)
  .value(function(d) { return d.mcap; });

var div = d3.select(".viz02");

function position() {
  this
    .style("left", function(d) { return d.x + "%"; })
    .style("top", function(d) { return d.y + "%"; })
    .style("width", function(d) { return d.dx + "%"; })
  .style("height", function(d) { return d.dy + "%"; });
}

function getLabel(d) {
  return d.name;
}

var node =
  div.datum(data).selectAll(".node")
  .data(treemap.nodes)
  .enter().append("div")
  .attr("class", "node")
  .call(position)
  //.style("background", function(d) { return color(getLabel(d)); })
//.style("background", function(d) { return color(getLabel(d)); })
  .text(getLabel);
