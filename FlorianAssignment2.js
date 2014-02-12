/* PLEASE NOTE that Handlebars was not referenced as a script on the AST site.
I therefore downloaded the page and latest version of handlebars and included
the script reference to handlebars-1.0.rc.1.min.js */

/* add the template scripts */
var studentsTemplate ='<script id="students-template" type="text/x-handlebars-template"><table><thead><th>First</th><th>Last</th><th>UvA ID</th><th>Email</th></thead><tbody>{{#students}}<tr><td>{{first}}</td><td>{{last}}</td><td>{{uvaID}}</td><td>{{email}}</td></tr>{{/students}}</tbody></table></script>';
$(".content").append(studentsTemplate);

var assignmentsTemplate ='<script id="assignments-template" type="text/x-handlebars-template"><table><thead><th>#</th><th>Description</th><th>Deadline</th><th>Done</th></thead><tbody>{{#assignments}}<tr><td>{{no}}</td><td>{{desc}}</td><td>{{dead}}</td><td>{{done}}</td></tr>{{/assignments}}</tbody></table></script>';
$(".content").append(assignmentsTemplate);

/* initialize the data objects */
var studentData = { students: [
    {"first": "Florian", "last": "Kuhlewind", "uvaID": "0282847", "email": "florian.kuhlewind@gmail.com"},
    {"first": "Anouk", "last": "Bouwer", "uvaID": "1482037", "email": "anouk.brouwer@live.nl"},
    {"first": "Paula", "last": "Carmicino", "uvaID": "0374836", "email": "fpaula.carmicino@gmail.com"},
    {"first": "Sjoerd", "last": "Handgraaf", "uvaID": "8037483", "email": "sjoerd.handgraaf@gmail.com"}, 
    {"first": "Ricci", "last": "Hessling", "uvaID": "4830278", "email": "ricci.hessling@gmail.com"}
    ]};
var assignmentData = { assignments: [
    {"no": "1", "desc": "Use jQuery to modify this page", "dead": "February 7th", "done": "yes"},
    {"no": "2", "desc": "Use Handlebars to add two tables", "dead": "February 14th", "done": "yes"},
    {"no": "3", "desc": "not known yet", "dead": "February 21st", "done": "no"}
    ]};

var studentTemplateScript = $("#students-template").html();
var assignmentTemplateScript = $("#assignments-template").html();

/* compile the templates*/
var theStudentTemplate = Handlebars.compile(studentTemplateScript);
var theAssignmentTemplate = Handlebars.compile(assignmentTemplateScript);   

/* append the tables */
$(".info").append("<h1>Students</h1>").append(theStudentTemplate (studentData));
$(".info").append("<h1>Assignments</h1>").append(theAssignmentTemplate (assignmentData));
