var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1UyLm10dokjffi5glQINoHRaCqYH0ewD-dn-0T34V6RU/edit#gid=0';

// var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1qT1LyvoAcb0HTsi2rHBltBVpUBumAUzT__rhMvrz5Rk/edit#gid=0';
// Compile the Handlebars template for HR leaders.
// var HRTemplate = Handlebars.compile($('#hr-template').html());


$('#runs').sheetrock({
  url: mySpreadsheet,
	query: "select A, B where (A <10) order by A desc",
  // query: "select A,B,C,D,E,L where E = 'Both' order by L desc",
  fetchSize: 10
});

// Load top five HR leaders.
// $('#hr').sheetrock({
//   url: mySpreadsheet,
//   query: "select A,C,D,I order by I desc",
// 	  // query: "select A, B where (A <10) order by A desc",
//   fetchSize: 5
// });
