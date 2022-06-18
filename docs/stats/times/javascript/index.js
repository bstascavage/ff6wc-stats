var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1UyLm10dokjffi5glQINoHRaCqYH0ewD-dn-0T34V6RU/edit#gid=0';
var miscSpreadsheet = 'https://docs.google.com/spreadsheets/d/1UyLm10dokjffi5glQINoHRaCqYH0ewD-dn-0T34V6RU/edit#gid=1152025324'
// $('#runs').sheetrock({
//   url: mySpreadsheet,
// 	query: "select A, B order by A desc",
//   // query: "select A,B,C,D,E,L where E = 'Both' order by L desc",
//   fetchSize: 5
// });

$('#num_of_dragons').sheetrock({
  url: miscSpreadsheet,
  query: "select U",
  fetchSize: 5,
});

$('#num_of_dead_checks').sheetrock({
  url: miscSpreadsheet,
  query: "select V",
  fetchSize: 1,
});
$('#highest_level').sheetrock({
  url: miscSpreadsheet,
  query: "select W",
  fetchSize: 1,
});

