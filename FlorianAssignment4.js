// define basic values
var width = 700;
var height = 700;
var padding = 30;
var addToAxis = 0.1; 

//get JSON data
d3.json('https://vib-data.firebaseio.com/.json', function(data) {
						vibData = data;
						});

// define which values to display on Axis
xD = 5;
yD = 4;

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
    .range([padding, width-(padding*2)]);
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


// create svg 
var mySVG = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);    
//Create circles
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
    .attr("transform", "translate(0," + (height - padding) + ")")
    .style({ 'stroke': 'Black', 'fill': 'none', 'stroke-width': '1px'})
    .call(xAxis);
//create Y axis
mySVG.append("g")
    .attr("transform", "translate(" + padding + ",0)")
    .style({ 'stroke': 'Black', 'fill': 'none', 'stroke-width': '1px'})
    .call(yAxis);

    
    
    
    
// add labels
mySVG.selectAll("text")
   .data(myObject.events)
   .enter()
   .append("text")
   .text ( function name(d) {
  	return d.name;
	})
    .attr("y", function(d, i) {
                 return yScale(i) + yScale.rangeBand() / 2;})
    .attr("x", function(d) {
            return xScale(0)+10;})
    .attr("alignment-baseline" , "middle")
    .style({ 'stroke': 'Black', 'fill': 'black', 'stroke-width': '0.5px' });

