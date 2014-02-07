$(document).ready(function(){

// CHANGE LAYOUT

// change background color and font in body
$('body').css({'background-color': 'greenyellow', 'font-family': 'Cambria'});

// for the tables, change background, font color and weight
$('table').css({'background-color': 'green', 'color': 'brown', 'font-weight': 'bold'});

// change color and font weight for all h1 elements
$('h1').css({'color': '#660066', 'font-weight': 'bold'});

// align text to center for .session-info and all h1 which descent from .session
$('.session-info, .schedule h1').css({'text-align': 'center'});


// REPLACE ELEMENTS

// change deadlines
$('.deadlines li:first').text('deadline 1: Whenever you feel like handing it in');
$('.deadlines li:last').text('deadline 2: Some time after you have met the first deadline');

// replace instructor and staff table with a picture of iceland
$(".info table").replaceWith('<img src="http://charterforcompassion.org/sites/default/files/images/1iceland.jpg"/>');

// MAKE THE SITE INTERACTIVE

// for all tables inside .session enable slideToggle by clicking on their respective h1

$('.schedule h1').on('click', function () { $(this).siblings("table").slideToggle("slow")});

});
