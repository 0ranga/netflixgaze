var data = {
  //"name": "Films mis en avant en position 1:1",
  "children": [
    { "name": "#1 Stranger Things - Netflix", "mcap": 69 },
    { "name": "#2 Disenchantment - Netflix ", "mcap": 46 },
    { "name": "#3 The Walking Dead - Autres", "mcap": 38 },
    { "name": "#4 Attack of Titans - Autres", "mcap": 28},
    { "name": "#5 Narcos - Netflix", "mcap": 28 }
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
