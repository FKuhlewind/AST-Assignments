// define basic values
var width = 500;
var height = 500;
var padding = 80;
var addToAxis = 0.1; 
xD = 4; yD = 5; // define values to display initially
myDataRef = new Firebase('https://vib-data.firebaseio.com/');

// define functions
function getDisplayRange () {
	// calculate display range for axis
	xExt = d3.extent(vibData[xD], function(d) { return d;});
	yExt = d3.extent(vibData[yD], function(d) { return d;});
	fromX = xExt[0] - ( (xExt[1]-xExt[0]) * addToAxis );
	toX = xExt[1] + ( (xExt[1]-xExt[0]) * addToAxis );
	fromY = yExt[0] - ( (yExt[1]-yExt[0]) * addToAxis );
	toY = yExt[1] + ( (yExt[1]-yExt[0]) * addToAxis );
	};
function getData () {
	// get data and label variables
	xyData = [	
			[vibData[xD][0], vibData[yD][0]] ,
			[vibData[xD][1], vibData[yD][1]] ,
			[vibData[xD][2], vibData[yD][2]] ,
			[vibData[xD][3], vibData[yD][3]] ,
			[vibData[xD][4], vibData[yD][4]] ,
			[vibData[xD][5], vibData[yD][5]] ,
			[vibData[xD][6], vibData[yD][6]] ,
			[vibData[xD][7], vibData[yD][7]] ,
			[vibData[xD][8], vibData[yD][8]] ,
			[vibData[xD][9], vibData[yD][9]]
		];
	xLabel = vibData[xD][10];
	yLabel = vibData[yD][10];
	};
function updateScaleDomains () {
	xScale = d3.scale.linear()
    		.domain([fromX, toX])
    		.range([padding, width-(padding)]);
	yScale = d3.scale.linear()
    		.domain([fromY, toY])
    		.range([height-padding, padding]);
	};
function defineXYaxis () {
	xAxis = d3.svg.axis()
    		.scale(xScale)
    		.orient("bottom")
    		.ticks(5);
	yAxis = d3.svg.axis()
    		.scale(yScale)
    		.orient("left")
    		.ticks(5);
	};
function createForm () {
	$("#myForm").remove();
	d3.json('https://vib-data.firebaseio.com/.json', function(data) {
		vibData = data; 
		vL = vibData.length;
		
		$('body').append('<form style="display:inline" id="myForm"><br/><u>Select values to be displayed: </u><br/><p style="display:inline">x-Axis:</p><select id="xAxisChoice">').delay(200);
		
		$.each( vibData , function( index, value ) {
  			//alert( index + ": " + value[10] );
			$('body').append('<option value='+index+'>'+value[10]+'</option>');
			});
		
		$('body').append('</select><p style="display:inline">    y-Axis:   </p><select id="yAxisChoice">').delay(200);
		
		$.each( vibData , function( index, value ) {
  			//alert( index + ": " + value[10] );
			$('body').append('<option value='+index+'>'+value[10]+'</option>');
			});
	
		$('body').append('</select><br/><a><i id="update">Click this text to update diagram</i></a></form>');
		
		});
	
	};

////// actual START of script
//get JSON data
d3.json('https://vib-data.firebaseio.com/.json', function(data) {

vibData = data;

getDisplayRange();
getData();
updateScaleDomains();
defineXYaxis();

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
var myDrop='<form style="display:inline" id="myForm"><br/><u>Select values to be displayed: </u><br/><div><p style="display:inline">x-Axis:    </p><select id="xAxisChoice"><option value=0>Vibrato Time</option><option value=1>Pitch Deviation</option><option value=2>Number of cycles</option><option value=3>Mean Pitch</option><option selected value=4>Rate</option><option value=5>Extent</option><option value=6>Mx Extent Position</option><option value=7>Duration</option></select><p style="display:inline">    y-Axis:   </p><select id="yAxisChoice"><option value=0>Vibrato Time</option><option value=1>Pitch Deviation</option><option value=2>Number of cycles</option><option value=3>Mean Pitch</option><option value=4>Rate</option><option selected value=5>Extent</option><option value=6>Mx Extent Position</option><option value=7>Duration</option></select><br/><a><i id="update">Click this text to update diagram</i></a></div></form>'
$('body').append(myDrop);
var newValuesForm='<form id="newValues"><br/><u>Enter new Values to be stored: </u><br/>01: <input type="number" id="val1" style="width: 50px;">02: <input type="number" id="val2" style="width: 50px;">03: <input type="number" id="val3" style="width: 50px;">04: <input type="number" id="val4" style="width: 50px;">05: <input type="number" id="val5" style="width: 50px;"><br/>06: <input type="number" id="val6" style="width: 50px;">07: <input type="number" id="val7" style="width: 50px;">08: <input type="number" id="val8" style="width: 50px;">09: <input type="number" id="val9" style="width: 50px;">10: <input type="number" id="val10" style="width: 50px;"><br/>Data type and unit (e.g. <i>Rate [Hz]</i>):<input type="text" id="newLabel" ><br/><a><i id="storeData">Click this text to store new data</i></a></form>';
$('body').append(newValuesForm);

d3.select("#storeData")
	.on("click", function() {

	i = vibData.length;
	
	myDataRef.child(i).child(0).set( document.getElementById("val1").value );
	myDataRef.child(i).child(1).set( document.getElementById("val2").value );
	myDataRef.child(i).child(2).set( document.getElementById("val3").value );
	myDataRef.child(i).child(3).set( document.getElementById("val4").value );
	myDataRef.child(i).child(4).set( document.getElementById("val5").value );
	myDataRef.child(i).child(5).set( document.getElementById("val6").value );
	myDataRef.child(i).child(6).set( document.getElementById("val7").value );
	myDataRef.child(i).child(7).set( document.getElementById("val8").value );
	myDataRef.child(i).child(8).set( document.getElementById("val9").value );
	myDataRef.child(i).child(9).set( document.getElementById("val10").value );
	myDataRef.child(i).child(10).set( document.getElementById("newLabel").value );
	
	d3.json('https://vib-data.firebaseio.com/.json', function(data) {
			vibData = data; 
			alert("New data stored successfully, you can now select and display it above");
			});
	
	
	createForm();
	/// update fropdown menu with handlebars
	/// remove values from form
			
	});

//update with new data on click
d3.select("#update")
	.on("click", function() {

	//get JSON data
	d3.json('https://vib-data.firebaseio.com/.json', function(data) {
	
	vibData = data;
						
	// get info on which values to display on Axis
	xD = document.getElementById("xAxisChoice").value;
	yD = document.getElementById("yAxisChoice").value;

	getDisplayRange();
	getData();
	updateScaleDomains();
	defineXYaxis();

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
});
