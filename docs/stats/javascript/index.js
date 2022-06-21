var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1UyLm10dokjffi5glQINoHRaCqYH0ewD-dn-0T34V6RU/edit#gid=0';
var miscSpreadsheet = 'https://docs.google.com/spreadsheets/d/1UyLm10dokjffi5glQINoHRaCqYH0ewD-dn-0T34V6RU/edit#gid=1152025324';

$('#skip_rate').sheetrock({
	url: miscSpreadsheet,
  query: "select AB",
  fetchSize: 5,
});

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

$('#num_of_attempts').sheetrock({
  url: miscSpreadsheet,
	 query: "select L",
  fetchSize: 5
});

$('#best_time').sheetrock({
  url: miscSpreadsheet,
	 query: "select V",
  fetchSize: 5
});

$('#last_time').sheetrock({
  url: miscSpreadsheet,
	 query: "select W",
  fetchSize: 5
});

$('#average_time').sheetrock({
  url: miscSpreadsheet,
	 query: "select N",
  fetchSize: 5
});

$('#average_time_delta').sheetrock({
  url: miscSpreadsheet,
	query: "select O",
  fetchSize: 5,
	callback: function (error, options, response) {
		if (response.rows[1].cells.O.charAt(0) == "-") {
			document.getElementById('average_time_delta_div').className="text-success font-weight-bold mr-1";
			document.getElementById('average_time_delta_arrow').className="fa fa-arrow-up"; 
		} else {
			document.getElementById('average_time_delta_div').className="text-danger font-weight-bold mr-11";
			document.getElementById('average_time_delta_arrow').className="fa fa-arrow-down"; 
		}
  }
});

$('#average_time_last_five').sheetrock({
  url: miscSpreadsheet,
	query: "select P",
  fetchSize: 5
});

$('#average_time_delta_last_five').sheetrock({
  url: miscSpreadsheet,
	query: "select Q",
  fetchSize: 5,
	callback: function (error, options, response) {
		if (response.rows[1].cells.Q.charAt(0) == "-") {
			document.getElementById('average_time_delta_last_five_div').className="text-success font-weight-bold mr-1";
			document.getElementById('average_time_delta_last_five_arrow').className="fa fa-arrow-up"; 
		} else {
			document.getElementById('average_time_delta_last_five_div').className="text-danger font-weight-bold mr-11";
			document.getElementById('average_time_delta_last_five_arrow').className="fa fa-arrow-down"; 
		}
  }
});

$('#average_time_skip').sheetrock({
  url: miscSpreadsheet,
	 query: "select R",
  fetchSize: 5
});

$('#average_time_delta_skip').sheetrock({
  url: miscSpreadsheet,
	query: "select S",
  fetchSize: 5,
	callback: function (error, options, response) {
		if (response.rows[1].cells.S.charAt(0) == "-") {
			document.getElementById('average_time_delta_skip_div').className="text-success font-weight-bold mr-1";
			document.getElementById('average_time_delta_skip_arrow').className="fa fa-arrow-up"; 
		} else {
			document.getElementById('average_time_delta_skip_div').className="text-danger font-weight-bold mr-11";
			document.getElementById('average_time_delta_skip_arrow').className="fa fa-arrow-down"; 
		}
  }
});

$('#average_time_no_skip').sheetrock({
  url: miscSpreadsheet,
	 query: "select T",
  fetchSize: 5
});

$('#average_time_delta_no_skip').sheetrock({
  url: miscSpreadsheet,
	query: "select U",
  fetchSize: 5,
	callback: function (error, options, response) {
		if (response.rows[1].cells.U.charAt(0) == "-") {
			document.getElementById('average_time_delta_no_skip_div').className="text-success font-weight-bold mr-1";
			document.getElementById('average_time_delta_no_skip_arrow').className="fa fa-arrow-up"; 
		} else {
			document.getElementById('average_time_delta_no_skip_div').className="text-danger font-weight-bold mr-11";
			document.getElementById('average_time_delta_no_skip_arrow').className="fa fa-arrow-down"; 
		}
  }
});
