//$(document).ready( function () {
//});


//// THIS WORKS PARTIALLY
// append script
//var fbScript = "<script src='https://cdn.firebase.com/v0/firebase.js'></script>";
//$("head").append(fbScript);
// create reference and read data
//var vibDataRef = new Firebase('https://vib-data.firebaseIO.com');
//vibDataRef.on('value', function(data) {
//	vibData = data.val();
//	});
	
//// NOT AT ALL
//d3.json("https://vib-data.firebaseIO.com", function(d){
//    vibData = json;
//	});
//vibData = $.ajax( 'https://vib-data.firebaseIO.com' , () );


var width = 700;
var height = 700;
var padding = 30;


d3.json('https://vib-data.firebaseio.com/.json', function(data) {
vibData = data;
});


var arr = $.map( vibData.Dev, function( obj, i ) { return obj; } ); 

xMax = d3.max(arr, function(d) { return d;});




xMax = d3.max(myObject.events, function(d) { return d.rating;}); // get highest value
yMax = myObject.events.length; // get number of values

//create scale functions
var xScale = d3.scale.linear()
    .domain([0, xMax])
    .range([padding, width-(padding*2)]);
var yScale = d3.scale.ordinal()
    .domain(d3.range(yMax))
    .rangeRoundBands([height-padding, padding], 0.1);
//define X axis
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .ticks(xMax);

// create svg 
var mySVG = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);    
//Create bars
mySVG.selectAll("rect")
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

