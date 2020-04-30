var width = window.innerWidth,
    height = window.innerHeight,
    radius = height/3;
var circle_angle = d3.scale.ordinal()
    .rangePoints([0, 360], 1);
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    svg. 
    append("text")             
  .attr("transform", "translate(700,80)") 
  .attr("id","dyncnt")
  .style("font-family","'Apple Chancery,cursive'")
  .style("font-size", "64")
  .style("fill", "#671019")
  .style("font-weight", "bold")
  .style("visibility", "hidden")

svg.append("circle").attr("cx",width/3).attr("cy",height/6).attr("r", 10).style("fill", "#000")
svg.append("circle").attr("cx",width/3).attr("cy",height/8.5).attr("r", 10).style("fill", "#b99f2e")
svg.append("text").attr("x", width/2.85).attr("y", height/6).text("House - Unknown").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", width/2.85).attr("y", height/8.5).text("House - Hufflepuff").style("font-size", "15px").attr("alignment-baseline","middle")
 
svg.append("circle").attr("cx",width/3).attr("cy",height/14).attr("r", 10).style("fill", "#234723")
svg.append("circle").attr("cx",width/3).attr("cy",height/45).attr("r", 10).style("fill", "#0b304a")
svg.append("text").attr("x", width/2.85).attr("y", height/14).text("House - Slytherin").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", width/2.85).attr("y", height/45).text("House - Ravenclaw").style("font-size", "15px").attr("alignment-baseline","middle")
 
svg.append("circle").attr("cx",width/3).attr("cy",(height/45)-30).attr("r", 10).style("fill", "#6F121C")
svg.append("text").attr("x", width/2.85).attr("y", (height/45)-30).text("House - Gryffindor").style("font-size", "15px").attr("alignment-baseline","middle")


var customcolor = ["#f00","#00f","#0f0","#ff0","#0ff"];

//set names to nodes in graph (maps  nodes to name)

  var map_node_names = d3.map(),
      links = [];
  radial_dataset.forEach(function(d) { map_node_names.set(d.name, d); });
  radial_dataset.forEach(function(source) {
    source.connections.forEach(function(target) {
      links.push({source: source.name, target: target});
    });
  });
  circle_angle.domain(radial_dataset.map(function(d) { return d.name; }));

  

  var link = svg.append("g")
      .attr("class", "links")
      .selectAll("path")
      .data(links)
      .enter().append("path")
      .attr("d", curve)
      
      .attr("fill", "none")
      .attr("stroke", (function(d) { return "rgba(105,105,105,0.5)"; }))
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", "1.5px");
  var node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(radial_dataset)
      .enter().append("g")
      .attr("transform", function(d) { return "rotate(" + circle_angle(d.name) + ")translate(" + radius + ",0)"; });
  node.append("circle")
      .attr("r", 10)
	    .attr("fill", function(d){
          if(d.group == "Slytherin"){ return '#234723';}
          else if (d.group == "Gryffindor"){ return '#6F121C';}
          else if (d.group == "Hufflepuff"){ return '#b99f2e';}
          else if (d.group == "Ravenclaw"){ return '#0b304a';}
          else if (d.group == "unknown"){ return '#000';}
      });

    var bundle = d3.layout.bundle();
    var line = d3.svg.line.radial()
    .interpolate("bundle")
    .tension(.85)
    .radius(function(d) { return d.y; })
    .angle(function(d) { return d.x / 180 * Math.PI; });

  node.append("text")
      .attr("dy", ".35em")
      .attr("x",25)
      .text(function(d) { return d.character; })
      .style("fill", function(d){
          if(d.group == "Slytherin"){ return '#234723';}
          else if (d.group == "Gryffindor"){ return '#6F121C';}
          else if (d.group == "Hufflepuff"){ return '#b99f2e';}
          else if (d.group == "Ravenclaw"){ return '#0b304a';}
          else if (d.group == "unknown"){ return '#000';}
      })
      // to flip the names
      .filter(function(d) { return (circle_angle(d.name) + 90) % 360 > 180; }) 
      .attr("x", -25)
      .attr("transform", "rotate(-180)")
      .style("text-anchor", "end")


function curve(link) {
  var link_source_data = circle_angle(link.source) / 180 * Math.PI,
      link_target_data = circle_angle(link.target) / 180 * Math.PI,
      x0 = Math.cos(link_source_data) * radius, y0 = Math.sin(link_source_data) * radius,
      x1 = Math.cos(link_target_data) * radius, y1 = Math.sin(link_target_data) * radius,
      dx = x0 - x1,
      dy = y0 - y1,
      l = Math.sqrt(dx * dx + dy * dy);

  return "M" + x0 + "," + y0 + "A" + l * 2 + "," + l * 2 + " 0 0 1 " + x1 + "," + y1;
}

function ColorHouse(house){
    if(house == "Slytherin"){ return '#234723';}
          else if (house == "Gryffindor"){ return '#6F121C';}
          else if (house == "Hufflepuff"){ return '#b99f2e';}
          else if (house == "Ravenclaw"){ return '#0b304a';}
          else if (house == "unknown"){ return '#ccc';}
}
var bio_x= -(width/2.1);
var bio_y=-((320));

var pic_x= -(width/2);
var pic_y= -(height/2.2);

var glass_x= -(width/4)+825;
var glass_y= -(height/2);


var imgcontainer = svg.append('svg:image')
.attr("class","thumbimg")
.attr("x", pic_x+25).attr("y", pic_y+175) 
.style("width","300px")
.style("height","300px")

var glasscontainer = svg.append('svg:image')
.attr("class","thumbimg")
.attr("x", glass_x).attr("y", glass_y) 
.style("width","300px")
.style("height","300px")

glasscontainer
      .attr("xlink:href",function(){return "img/glass.png"})
      .style("visibility","hidden");

//dislpay th bio of the character
var biotxt= svg.append("text")     
      .attr("class","test")
      .attr("transform", "translate("+bio_x+","+bio_y+")") 
      .style("width","20px")
      .style("font-weight", "bold")
      .style("display","inline-block")

    
node.selectAll("circle")
    .on("mouseover", function(d,i){
       d3.select(this)
       .attr("r", 15)
      .style("font-size", "60")
      .style("visibility", "visible");

      d3.select(this).text(d.character)
      .attr("dy", ".75em")

      var imgpath = "img/";
      imgcontainer
      .attr("xlink:href",function(){return imgpath+d.character+".jpg"})
      .style("visibility","visible");

        link.style('stroke',function(l){
            console.log(d.name,l.source,l.target);
            if(d.name===l.source || d.name=== l.target){
                return "#000"
            }else { 
                return "rgba(105,105,105,0.1)"
            }
        })

        link.style('fill',function(l){
            console.log(d.name,l.source,l.target);
            if(d.name===l.source || d.name=== l.target){
                return "rgba(0,0,0,0.15)"
            }else { 
                return "none"
            }
        })

        biotxt
        .text(d.character+" :" + '\n' + d.bio)
        .style("font-family","'Apple Chancery,cursive'")
        .style("fill", "#671019")
        .style("font-size", "1.5em")
        .style("fontStyle","italic")
        .style("visibility", "visible");

    })
    .on("mouseout", function(d,i){
            d3.select(this)
            .attr("r",10)

            link.style('stroke',function(l){ 
                return "rgba(105,105,105,0.5)"
            })

            link.style('fill',function(l){
           
            });
            svg.selectAll('path').attr("fill","none");
            
            biotxt.style("visibility","hidden");
            imgcontainer.style("visibility","hidden");
      
    });
