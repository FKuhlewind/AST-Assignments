// define basic values
var width = 700;
var height = 700;
var padding = 80;
var addToAxis = 0.1; 

//get JSON data
d3.json('https://vib-data.firebaseio.com/.json', function(data) {


vibData = data;
// define which values to display on Axis initially
xD = 4;
yD = 5;

// calculate dixplay range for axis
xExt = d3.extent(vibData[xD], function(d) { return d;});
yExt = d3.extent(vibData[yD], function(d) { return d;});

fromX = xExt[0] - ( (xExt[1]-xExt[0]) * addToAxis );
toX = xExt[1] + ( (xExt[1]-xExt[0]) * addToAxis );
fromY = yExt[0] - ( (yExt[1]-yExt[0]) * addToAxis );
toY = yExt[1] + ( (yExt[1]-yExt[0]) * addToAxis );

// get data and label variables
xyData = [ [vibData[xD][0], vibData[yD][0]] , [vibData[xD][1], vibData[yD][1]] , [vibData[xD][2], vibData[yD][2]] , [vibData[xD][3], vibData[yD][3]] , [vibData[xD][4], vibData[yD][4]] , [vibData[xD][5], vibData[yD][5]] , [vibData[xD][6], vibData[yD][6]] , [vibData[xD][7], vibData[yD][7]] , [vibData[xD][8], vibData[yD][8]] , [vibData[xD][9], vibData[yD][9]] ];
xLabel = vibData[xD][10];
yLabel = vibData[yD][10];

//create scale functions
var xScale = d3.scale.linear()
    .domain([fromX, toX])
    .range([padding, width-(padding)]);
var yScale = d3.scale.linear()
    .domain([fromY, toY])
    .range([height-padding, padding]);
    
//define X axis
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .ticks(5);
//define Y axis
var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(5);

//create svg 
var mySVG = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);    
//create circles
mySVG.selectAll("circle")
    .data(xyData)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
                return xScale(d[0]);})
    .attr("cy", function(d) {
            	return yScale(d[1]);})
    .attr("r", 5);

//create X axis
mySVG.append("g")
    .attr("class", "x axis")	
    .attr("transform", "translate(0," + (height - padding) + ")")
    .style({ 'stroke': 'Black', 'fill': 'none', 'stroke-width': '1px'})
    .call(xAxis);
//create Y axis
mySVG.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + padding + ",0)")
    .style({ 'stroke': 'Black', 'fill': 'none', 'stroke-width': '1px'})
    .call(yAxis);

//create axis labels and main title
mySVG.append("text")
        .attr("x", width/2 )
        .attr("y", padding/2 )
        .style("text-anchor", "middle")
        .text("Vibrato Analysis")
        .style({ 'stroke': 'Black', 'fill': 'black', 'stroke-width': '0.5px' });
mySVG.append("text")
	.attr("class", "x text")
        .attr("x", width/2 )
        .attr("y", height-(padding/2) )
        .style("text-anchor", "middle")
        .text(xLabel)
        .style({ 'stroke': 'Black', 'fill': 'black', 'stroke-width': '0.5px' });
mySVG.append("text")
	.attr("class", "y text")
	.text(yLabel)
        .attr("x", padding/2)
        .attr("y", height/2)
        .style("text-anchor", "middle")
        .style({ 'stroke': 'Black', 'fill': 'black', 'stroke-width': '0.5px' })
        .style("writing-mode", "tb");

//aooend update choice options
var myDrop='<form style="display:inline" name="myform"><div><p style="display:inline">x-Axis:    </p><select id="xAxisChoice"><option value=0>Vibrato Time</option><option value=1>Pitch Deviation</option><option value=2>Number of cycles</option><option value=3>Mean Pitch</option><option selected value=4>Rate</option><option value=5>Extent</option><option value=6>Mx Extent Position</option><option value=7>Duration</option></select><p style="display:inline">    y-Axis:   </p><select id="yAxisChoice"><option value=0>Vibrato Time</option><option value=1>Pitch Deviation</option><option value=2>Number of cycles</option><option value=3>Mean Pitch</option><option value=4>Rate</option><option selected value=5>Extent</option><option value=6>Mx Extent Position</option><option value=7>Duration</option></select><a><p id="update" style="display:inline">     Choose values to display and click this text to update</p></a></div></form>'
$('body').append(myDrop);

//update with new data on click
d3.select("#update")
	.on("click", function() {

	//get JSON data
	d3.json('https://vib-data.firebaseio.com/.json', function(data) {
						vibData = data;
						});

	// get info on which values to display on Axis
	xD = document.getElementById("xAxisChoice").value;
	yD = document.getElementById("yAxisChoice").value;

	// calculate display range for axis
	xExt = d3.extent(vibData[xD], function(d) { return d;});
	yExt = d3.extent(vibData[yD], function(d) { return d;});

	fromX = xExt[0] - ( (xExt[1]-xExt[0]) * addToAxis );
	toX = xExt[1] + ( (xExt[1]-xExt[0]) * addToAxis );
	fromY = yExt[0] - ( (yExt[1]-yExt[0]) * addToAxis );
	toY = yExt[1] + ( (yExt[1]-yExt[0]) * addToAxis );

	// get data and label variables
	xyData = [ [vibData[xD][0], vibData[yD][0]] , [vibData[xD][1], vibData[yD][1]] , [vibData[xD][2], vibData[yD][2]] , [vibData[xD][3], vibData[yD][3]] , [vibData[xD][4], vibData[yD][4]] , [vibData[xD][5], vibData[yD][5]] , [vibData[xD][6], vibData[yD][6]] , [vibData[xD][7], vibData[yD][7]] , [vibData[xD][8], vibData[yD][8]] , [vibData[xD][9], vibData[yD][9]] ];
	xLabel = vibData[xD][10];
	yLabel = vibData[yD][10];

	//update scale domains
	var xScale = d3.scale.linear()
	  	.domain([fromX, toX])
	  	.range([padding, width-(padding)]);
	var yScale = d3.scale.linear()
	    	.domain([fromY, toY])
	    	.range([height-padding, padding]);

	//define X axis
	var xAxis = d3.svg.axis()
    		.scale(xScale)
    		.orient("bottom")
	 	.ticks(5);
	//define Y axis
	var yAxis = d3.svg.axis()
	 	.scale(yScale)
    		.orient("left")
		.ticks(5);

	//update circles
	mySVG.selectAll("circle")
    		.data(xyData)
    		.transition()
    		.duration(1000)
    		.attr("cx", function(d) {
                	return xScale(d[0]);})
    		.attr("cy", function(d) {
            		return yScale(d[1]);});
            
    	
	//update x and y axis
	mySVG.select(".x.axis")
    		.transition()
    		.duration(500)
    		.call(xAxis);
    	mySVG.select(".y.axis")
    		.transition()
    		.duration(500)
    		.call(yAxis);

	//update text labels
	mySVG.select(".x.text")
		.text(xLabel)
    		.transition()
    		.duration(1000);
    		
    	mySVG.select(".y.text")
    		.transition()
    		.duration(1000)
    		.text(yLabel);
	});
});
