PlotGraph();

function PlotGraph(){
var type= positive_network_data;
var svg = d3.select("svg"),
width = +svg.attr("width"),
height = +svg.attr("height");
// sly, gry, rav, unkno, huffl 
var custom_colors=["#234723","#6F121C","#0B304A","#ccc","#B99F2E"];
 var color = d3.scaleOrdinal(custom_colors); 

var simulation = d3.forceSimulation()
.force("link", d3.forceLink().id(function(d) { return d.id; }))
.force("charge", d3.forceManyBody().strength(10))
.force("center", d3.forceCenter(width / 2, height / 2))
.force('collision', d3.forceCollide().radius(function(d) {
return 34;
}))

const index_link = {};
type.links.forEach(d => {
  index_link[`${d.source.index},${d.target.index}`] = 1;
});

function fn_connections(a, b) {
  if (index_link[`${a.index},${b.index}`] || index_link[`${b.index},${a.index}`] || a.index === b.index == true ){
  }
  
  return index_link[`${a.index},${b.index}`] || index_link[`${b.index},${a.index}`] || a.index === b.index;
}

// for fading out the nodes
function fade(opacity) {
  //
  return d => {
    node.style('stroke-opacity', function (o) {
      const thisOpacity = fn_connections(d, o) ? 1 : opacity;
      this.setAttribute('fill-opacity', thisOpacity); 
      return thisOpacity;
    });
    link.style('stroke-opacity', o => (o.source === d || o.target === d ? 1 : opacity));
  };
}


var graph_container = svg.call(d3.zoom().on("zoom", function () {
  graph_container.attr("transform", d3.event.transform)
}))
.append("g");

var link = graph_container
  .attr("class", "links")
  .selectAll("line")
  .data(type.links)
  .enter().append("line")
  .attr("stroke-width", function(d) { return ("1") });

 var node = graph_container
  .attr("class", "nodes")
  .selectAll("g")
  .data(type.nodes)
  .enter().append("g")

 node.append("circle")
  .attr("r",function(d){  
    return 3 + d.Weight ;
  })
  .attr("fill", function(d) { return color(d.House); })
  .call(d3.drag()
      .on("start", on_drag_start)
      .on("drag", on_drag)
      .on("end", on_drag_end));

node.append("text")
  .text(function(d) {
    return d.name;
  })
  .style("color","#fff")
  .attr('x', 6)
  .attr('y', 3);

simulation
  .nodes(type.nodes)
  .on("tick", fn_ticked);

simulation.force("link")
  .links(type.links);

  // Character name displayed on the top of the graph
	let txt_character = graph_container.append("text")             
  .attr("transform", "translate(700,80)") 
  .attr("id","dyncnt")
  .style("font-family","'Apple Chancery,cursive'")
  .style("font-size", "64")
  .style("fill", "#671019")
  .style("font-weight", "bold")
  .style("visibility", "hidden")

  
	node.selectAll("circle")
		.on("mouseover", function(d,i){
      txt_character.text(d.name)
      .style("visibility", "visible");  
      link.style('stroke-width', function(l) {
        if (d === l.source || d === l.target){
          return 3;
        }
        else{
          return 1;
        }
      });

      link.style('stroke', function(l) {
        if (d === l.source || d === l.target){
          return '#3d3d3d';
        }
        else{
          return 'rgba(105, 105, 105, 0.01)';
        }
      });
    })

    .on("mouseout", function(d,i){
			d3.select(this)
				.transition()
				.duration(100)
				.style("stroke", "none");	
            
      txt_character.style("visibility","hidden");
      link.style("stroke",'rgba(105, 105, 105, 0.993)'); 
      link.style('stroke-width', function(l) {
          return 1;
      });
			
    });
    
    graph_container.append("circle").attr("cx",width/1.15).attr("cy",height/1.5).attr("r", 10).style("fill", "#000")
    graph_container.append("text").attr("x", width/1.13).attr("y", height/1.5).text("House - Unknown").style("font-size", "15px").attr("alignment-baseline","middle")
    
    graph_container.append("circle").attr("cx",width/1.15).attr("cy",height/1.6).attr("r", 10).style("fill", "#b99f2e")
    graph_container.append("text").attr("x", width/1.13).attr("y", height/1.6).text("House - Hufflepuff").style("font-size", "15px").attr("alignment-baseline","middle")
    
    graph_container.append("circle").attr("cx",width/1.15).attr("cy",height/1.9).attr("r", 10).style("fill", "#234723")
    graph_container.append("text").attr("x", width/1.13).attr("y", height/1.9).text("House - Slytherin").style("font-size", "15px").attr("alignment-baseline","middle")
    
    graph_container.append("circle").attr("cx",width/1.15).attr("cy",height/1.73).attr("r", 10).style("fill", "#0b304a")
    graph_container.append("text").attr("x", width/1.13).attr("y", height/1.73).text("House - Ravenclaw").style("font-size", "15px").attr("alignment-baseline","middle")
    
    graph_container.append("circle").attr("cx",width/1.15).attr("cy",(height/2)-15).attr("r", 10).style("fill", "#6F121C")
    graph_container.append("text").attr("x", width/1.13).attr("y", (height/2)-15).text("House - Gryffindor").style("font-size", "15px").attr("alignment-baseline","middle")

// function to zoom th force layout graph by mouse pad
var graph_zoom = d3.zoom()
.scaleExtent([0.5, 10])
.on("zoom", zoom_actions);
graph_zoom(svg); 

//Zoom functions 
function zoom_actions(){ 
  graph_container.attr("transform", d3.event.transform)
}

// positions the nodes randomly in the graph
function fn_ticked() {
link
    .attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });

node
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    })
}

function on_drag_start(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
  }

  function on_drag(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
  }

  function on_drag_end(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
  }
}






