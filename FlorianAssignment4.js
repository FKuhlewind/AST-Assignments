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
// get Min and Max values
xExt = d3.extent(vibData[xD], function(d) { return d;});
yExt = d3.extent(vibData[yD], function(d) { return d;});
//xAdd = ((xExt[1]-xExt[0])*addToAxis);
fromX = xExt[0] - ( (xExt[1]-xExt[0]) * addToAxis );
toX = xExt[1] + ( (xExt[1]-xExt[0]) * addToAxis );
//yAdd = ((yExt[1]-yExt[0])*addToAxis);
fromY = yExt[0] - ( (yExt[1]-yExt[0]) * addToAxis );
toY = yExt[1] + ( (yExt[1]-yExt[0]) * addToAxis );
// get data and label variables
xData = vibData[xD].slice(0,9);
xLabel = vibData[xD].slice(10);
yData = vibData[yD].slice(0,9);
yLabel = vibData[yD].slice(10);

//create scale functions
var xScale = d3.scale.linear()
    .domain([fromX, toX])
    .range([padding, width-(padding*2)]);
var yScale = d3.scale.linear()
    .domain([fromY, toY])
    .range([h-padding, padding]);
    
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
    .data(myObject.events)
    .enter()
    .append("rect")
    .attr("y", function(d, i) {
                 return yScale(i);})
    .attr("x", function(d) {
            return xScale(0);})
    .attr("height", yScale.rangeBand())
    .attr("width", function(d) {
                 return xScale(d.rating)-padding;})
    .style("fill", function (d) {
            if (!d.ficticious) {return "#ff6666"}
            else {return "#8180ff"} ;});   
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
//create X axis
mySVG.append("g")
    .attr("transform", "translate(0," + (height - padding) + ")")
    .style({ 'stroke': 'Black', 'fill': 'none', 'stroke-width': '1px'})
    .call(xAxis);
    
    
//// delete later
[
  
  [1.64, 0.76, 0.64,  0, 0.53, 0.6, 0.53, 0.98, 1.34, 0.37, "Vibrato Time [s]"]
,
  
  [10.08, -4.1, -4.25, -3.1, 18.82, 2, 28.95, -41.8, -6.1, 1.4, "Pitch Deviation [Hz]"]
,
  
  [9.5, 4, 3.5, 0, 3, 3.5, 3.5, 4.5, 8, 2.5, "Number of Cycles"]
,
  
  [372, 293, 277, 493, 594, 370, 447, 287, 369, 494, "Mean Pitch [Hz]"]
,
  
  [5.95, 6.41, 5.96, 0, 7.13, 7.36, 6.73, 5.85, 5.96, 6.7, "Rate [Hz]"]
,
 
  [92.55, 45.98, 86.18, 0, 56.94, 40.42, 79.81, 82.76, 62.12, 67.26, "Extent [Hz]"]
,
  
  [0.53, 0.38, 0.57, 0, 0.83, 0.57,  0.43, 0.44, 0.19, 0.8, "Max Extent Position [s]"]
,
  
  [1.89, 0.76, 1.06, 0.46, 0.53, 0.6, 0.65, 0.98, 1.51, 0.72, "Duration [s]"]
]

