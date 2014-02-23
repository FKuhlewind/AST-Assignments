// create svg object and append to /initia
var svgCanvas = '<svg id="flo" width="500" height="300"><rect x="0" y="0" width="500" height="300" fill="#e5e5e3" stroke="#bcbcb2"/><g fill="white" text-anchor="middle" font-size="14"><g data-assgn="0"><rect x="10" y="60" width="140" height="30" stroke="#bcbcb2"/><text x="80" y="80" fill="black">Assignment 1</text></g><g data-assgn="1"><rect x="10" y="100" width="140" height="30" stroke="#bcbcb2"/><text x="80" y="120" fill="black" >Assignment 2</text></g><g data-assgn="2"><rect x="10" y="140" width="140" height="30" stroke="#bcbcb2"/><text x="80" y="160" fill="black" >Assignment 3</text></g><text id="desc" x="250" y="47" fill="black" ></text><g stroke="#bcbcb2"><rect x="10" y="200" width="140" height="90" /><rect x="20" y="220" width="120" height="60" fill="black" /><rect x="160" y="60" width="330" height="230" /></g><text x="80" y="215" fill="black">Deadline</text></g><g font-size="20" text-anchor="middle" fill="black"><text id="assi" x="250" y="25"></text><text id="dead" x="80" y="260" font-weight="bold" fill="white"></text><text x="225" y="280" >TIME</text><text x="325" y="280" >PAIN</text><text x="425" y="280" >FUN</text></g></svg>'
$("body").append(svgCanvas);

// create data object
var assignments = [
    {   name : "Assignment 1", desc : "Use jQuery to replace some of the elements on the AST page",
        dead : "Feb 7th", time : "8", pain : "6", fun : "4"},
    {   name : "Assignment 2", desc : "Use Handlebars to add a student and assignment table",
        dead : "Feb 14th", time : "3", pain : "8", fun : "3"},
    {   name : "Assignment 3", desc : "Use d3 and display a data object with an SVG bar chart",
        dead : "Feb 26th", time : "10", pain : "4", fun : "9"}
    ];

//init with data
asNo = 0;
evalData = [assignments[asNo].time, assignments[asNo].pain, assignments[asNo].fun];
// create svg data elements
var svg1 = d3.select("#flo").append("svg").attr("width", 500).attr("height", 300);
svg1.selectAll("rect")
   .data(evalData).enter().append("rect")
   .attr("x", function(d, i) { return (i * 100) + 210;  })
   .attr("y", function(d) { return 75 + (180 - (d*18)); })
   .attr("width", 30 )
   .attr("height", function(d) { return d * 18; })
   .attr("fill", function(d) {return "rgb(" + (d * 25) + ", 0, 0)"; })
// Update text elements
$("#dead").text(assignments[asNo].dead);
$("#assi").text(assignments[asNo].name);
$("#desc").text(assignments[asNo].desc);

// on click, update with new data
$("g").on("click", function () {
    var asNo=$(this).data("assgn");
    evalData = [assignments[asNo].time, assignments[asNo].pain, assignments[asNo].fun];
    svg1.selectAll("rect").data(evalData)
   .transition().duration(500).ease("linear")
   .attr("y", function(d) { return 75 + (180 - (d*18)); })
   .attr("height", function(d) { return d * 18; })
   .attr("fill", function(d) {return "rgb(" + (d * 25) + ", 0, 0)"; })
    $("#dead").text(assignments[asNo].dead).hide().fadeIn(500);
    $("#assi").text(assignments[asNo].name).hide().fadeIn(500);
    $("#desc").text(assignments[asNo].desc).hide().fadeIn(500);
});
