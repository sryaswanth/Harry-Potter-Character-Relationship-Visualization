
var container = d3.select('#d3Id'),
      width = window.innerWidth/1.05,
      height = window.innerHeight-100,
      margin = {top: 100, right: 50, bottom: 80, left: 100},
      barPadding = .5,
      axisTicks = {qty: 5};
var svg = container 
     .append("svg")
     .attr("width", width)
     .attr("height", height)
     .append("g")
     .attr("transform", `translate(${margin.left},${margin.top})`);

var x_scale_axis_line = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding)
var x_axis_data = d3.scaleBand()
var y_scale_axis_line = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])

var xAxis = d3.axisBottom(x_scale_axis_line);
var yAxis = d3.axisLeft(y_scale_axis_line) .ticks(10)
              .tickFormat(d3.format(".2s"));
x_scale_axis_line.domain(models.map(d => d.Name))
x_axis_data.domain(['Production_budget', 'Worldwide_boxoffice']).range([0, x_scale_axis_line.bandwidth()])
y_scale_axis_line.domain([0, d3.max(models, d => d.Worldwide_boxoffice +100000000)])

var Name = svg.selectAll("rect")
  .data(models)
  .enter().append("g")
  .attr("transform", d => `translate(${x_scale_axis_line(d.Name)},0)`);
 
  /* Add Production_budget bars */
Name.selectAll(".bar.Production_budget")
  .data(d => [d])
  .enter()
  .append("rect")
  .attr("class", "bar Production_budget")
.style("fill","#00539CFF")
  .attr("x", d => x_axis_data('Production_budget'))
  .attr("y", d => y_scale_axis_line(d.Production_budget))
  
  .attr("width", x_axis_data.bandwidth())
  .attr("height", d => {
    return height - margin.top - margin.bottom - y_scale_axis_line(d.Production_budget)
  });
  var prod_indicator =  svg.append("line").style("fill", "none"); 
  var world_indicator =  svg.append("line").style("fill", "none"); 


/* Add Worldwide_boxoffice bars */
Name.selectAll(".bar.Worldwide_boxoffice")
  .data(d => [d])
  .enter()
  .append("rect") 
.style("fill","#6F121C")
  .attr("x", d => x_axis_data('Worldwide_boxoffice'))
  .attr("y", d => y_scale_axis_line(d.Worldwide_boxoffice))
  .attr("width", x_axis_data.bandwidth())
  .attr("height", d => {
    return height - margin.top - margin.bottom - y_scale_axis_line(d.Worldwide_boxoffice)
  });

  var coll_values = svg.append("text")
              .attr("x",  (width/6)+ 325 )
              .attr("y",  (height/2)-1200 )  
              .attr("fill", "#000");

  var profit = svg.append("text")
              .attr("x",  (width/6)+ 325 )
              .attr("y",  (height/2)-1300 ) 
              .attr("fill", "#000");
  
  Name.selectAll("rect")
    .on("mouseover", function(d,i){

  // Production Cost Line indicator 
    prod_indicator
      .style("stroke", "#00539CFF")
      .style("opacity", 0.8)
      .style("stroke-width", 3)
      .style("visibility", "visible")
      .attr("x1", x_scale_axis_line(0))    
      .attr("y1", y_scale_axis_line(d.Production_budget))
      .attr("x2", x_scale_axis_line(d.Name)+     x_axis_data.bandwidth())    
      .attr("y2", y_scale_axis_line(d.Production_budget))

      // Worldwide Box office Line indicator 
    world_indicator
      .style("stroke", "#6F121C")
      .style("opacity", 0.8)
      .style("stroke-width", 3)
      .style("visibility", "visible") 
      .attr("x1", x_scale_axis_line(0))    
      .attr("y1", y_scale_axis_line(d.Worldwide_boxoffice))
      .attr("x2", x_scale_axis_line(d.Name)+     x_axis_data.bandwidth())    
      .attr("y2", y_scale_axis_line(d.Worldwide_boxoffice))

  var Profit_Percentage = ((((d.Worldwide_boxoffice - d.Production_budget)/d.Production_budget)*100).toFixed(2)); 

  profit
  .style("visibility","visible")
  .attr("x",  ((width/2)-400))
  .attr("y",  (-50) )
  .text(d.Name+"- Profit Percentage :"+Profit_Percentage+"%")
  .attr("font-size", "20px")
  .attr("fill", "#000")

  var prod_bud = ((d.Production_budget)/1000000).toFixed(2);
  var box_off= ((d.Worldwide_boxoffice)/1000000).toFixed(2);
  var suf = (box_off>999?"B":"M");
  if(box_off>999){ (box_off= (box_off/ 1000).toFixed(2)) }
  

  coll_values
  .style("visibility","visible")
  .attr("x",  ((width/2)-400))
  .attr("y",  (0) )
  .text("Production: "+ "$"+(prod_bud)+ "M "+  "  Box Office: " + "$"+(box_off)+ suf )
  .attr("font-size", "20px")
  .attr("fill", "#000")
   })

   .on("mouseout", function(d,i){
      profit.style("visibility","hidden")
      coll_values.style("visibility","hidden")
      world_indicator
      .style("visibility", "hidden") 
      prod_indicator
      .style("visibility", "hidden"); 
   })


  // Add the X Axis
 svg.append("g")
     .attr("class", "x axis")
     .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
     .call(xAxis);

// Add the Y Axis
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);


     //x-axis text 
var x_axis_txt= svg.append("text")     
  .attr("class","test")
  .style("width","20px")
  .style("font-weight", "bold")
  .style("display","inline-block")



  x_axis_txt
    .text("Movie Titles")
    .style("font-family","'Apple Chancery,cursive'")
    .attr("x",width/2.5)
    .attr("y",height/1.2)
    .style("fill", "#000")
    .style("font-size", "1.5em")
    .style("fontStyle","italic")
    .style("visibility", "visible");

  svg.append("text")
    .style("font-family","'Apple Chancery,cursive'")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("fontStyle","italic")
    .style("font-size", "1.5em")
    .text("Value in Dollars");


svg.append("circle").attr("cx",width/1.27).attr("cy",(height/4)-250).attr("r", 12).style("fill", "#00539CFF")
svg.append("circle").attr("cx",width/1.27).attr("cy",(height/4)-200).attr("r", 12).style("fill", "#6F121C")
svg.append("text").attr("x", width/1.25).attr("y", (height/4)-250).text("Production Budget").style("font-size", "20px").attr("alignment-baseline","middle")
svg.append("text").attr("x", width/1.25).attr("y", (height/4)-200).text("Box Office Collection").style("font-size", "20px").attr("alignment-baseline","middle")
 
