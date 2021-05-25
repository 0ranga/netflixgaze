var data = {
  //"name": "Films mis en avant en position 1:1",
  "children": [
    { "name": "01 Stranger Things - 69 vues", "mcap": 69 },
    { "name": "02 Disenchantment - 46 vues", "mcap": 46 },
    { "name": "03 The Walking Dead - 38 vues", "mcap": 38 },
    { "name": "04 Attack of Titans - 28 vues", "mcap": 28},
    { "name": "04 Narcos - 28 vues", "mcap": 28 }
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
