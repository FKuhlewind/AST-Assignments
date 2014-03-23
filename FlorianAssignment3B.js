$("body").append("<p>Click this text to update with most recent data</p>");
var width = 700;
var height = 400;
var padding = 30;

$("p").on("click", function () {

  var eventsTemplate = {
    "events|5-20": [{
      "name|1-2": "@LOREM ",
      "rating|1-5": 0,
      "ficticious|0-1": true,
    }]
  };
  var events = $.mockJSON.generateFromTemplate(eventsTemplate);
  var eventsJSON = JSON.stringify(events);  
  localStorage.setItem("assignment", eventsJSON);

$("svg").remove();
var myObject = JSON.parse(localStorage.assignment);
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
});
