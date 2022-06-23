// Load the Visualization API and the corechart package.
google.charts.load('current', { 'packages': ['corechart'] });

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawRunTimesLineChart);
google.charts.setOnLoadCallback(drawDeadcheckTimesColumnChart);
google.charts.setOnLoadCallback(drawCharacterTimesColumnChart);
google.charts.setOnLoadCallback(initialize_everything);

var globalData;

var metricSheetMapping = {
	num_of_attempts: { position: ['L', 2] },
	best_time: { position: ['V', 2] },
	last_time: { position: ['W', 2] },
	average_time: { position: ['N', 2] },
	average_time_delta: { position: ['O', 2], delta: true },
	average_time_last_five: { position: ['P', 2] },
	average_time_delta_last_five: { position: ['Q', 2], delta: true },
	average_time_ultros: { position: ['X', 2] },
	average_time_delta_ultros: { position: ['Y', 2], delta: true },
	skip_rate: { position: ['AD', 2] },
	average_time_skip: { position: ['R', 2] },
	average_time_delta_skip: { position: ['S', 2], delta: true },
	average_time_no_skip: { position: ['T', 2] },
	average_time_delta_no_skip: { position: ['U', 2], delta: true }
}
$(window).onload = function () {
	initialize_everything(function () {
		console.log('loading');

	});
}

function initialize_everything(callback) {
	// Fetching the formula Google Sheet
	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1UyLm10dokjffi5glQINoHRaCqYH0ewD-dn-0T34V6RU/gviz/tq?gid=1152025324&headers=1');
	query.setQuery("select *")

	query.send(function (response) {
		var data = response.getDataTable();

		setMetricElems(data)
	})
}

function setMetricElems(data) {
	// Loop through metricSheetMapping to create divs for single metrics
	Object.keys(metricSheetMapping).forEach(key => {
		var span = document.getElementById(key);
		var value = data.Wf[metricSheetMapping[key].position[1] - 2].c[getIndexByColumn(data.bf, metricSheetMapping[key].position[0])].f;
		span.textContent = value

		// For delta metrics, sets the elems for the up/down arrows
		if (metricSheetMapping[key].delta === true) {
			if (value.charAt(0) == "-") {
				document.getElementById(key + '_div').className = "text-success font-weight-bold mr-1";
				document.getElementById(key + '_arrow').className = "fa fa-arrow-up";
			} else {
				document.getElementById(key + '_div').className = "text-danger font-weight-bold mr-11";
				document.getElementById(key + '_arrow').className = "fa fa-arrow-down";
			}
		}
	});
}

function getIndexByColumn(columns, columnLetter) {
	// Converts human-readable Sheets info (ie cell C2) to the proper index in the DataTable object
	for (let index = 0; index < columns.length; ++index) {
		if (columns[index].id == columnLetter) {
			return index
		}
	}
}

function drawRunTimesLineChart() {
	var opts = {
		title: 'Run Times',
		titlePosition: 'none',
		legend: {
			'position': "none"
		},
		hAxis:
		{
			textPosition: 'none',
			gridlines: {
				color: 'transparent'
			},
		},
		vAxis: {
			title: 'Time',
			format: 'HH:mm:ss',
			gridlines: {
				multiple: 10,
				units: {
					format: ['HH:mm:ss']
				}
			}
		},
		pointSize: 5,
		trendlines: {
			0: {
				type: 'linear',
				color: 'blue',
				lineWidth: 2,
				opacity: 0.3,
				showR: true,
				pointSize: 0,
				tooltip: false
			}
		},
		focusTarget: 'category',
		chartArea: { left: 100, top: 40, bottom: 40, right: 30, width: "100%", height: "100%" },
		height: 400
	};
	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1UyLm10dokjffi5glQINoHRaCqYH0ewD-dn-0T34V6RU/edit#gid=0&headers=1&tq=');
	query.setQuery('select V')

	// Nested query to get the skip-only datapoints
	query.send(function (response) {
		var skip_data = response.getDataTable();
		query.setQuery('select A,B')

		query.send(function (response) {
			var data = response.getDataTable();
			data.addColumn({ 'type': 'string', 'role': 'style' });

			// Setting color style for any runs that use the skip
			for (var i = 0; i < skip_data.getNumberOfRows(); i++) {
				if (skip_data.Wf[i].c[0].v == 'Yes') {
					data.setCell(i, 2, 'point {fill-color: red');
				}
			};

			// var chart = new google.visualization.LineChart(document.getElementById('run_times_chart_div'));
			// chart.draw(data, opts)
		});

	});
}

function drawDeadcheckTimesColumnChart() {
	var opts = {
		titlePosition: 'none',
		legend: {
			'position': "none"
		},
		hAxis: {
			ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], //Hard-code deadcheck intervals
			title: 'Number of Dead Checks',
			gridlines: {
				color: 'transparent'
			},
		},
		vAxis: {
			title: 'Time',
		},
		focusTarget: 'category',
		chartArea: { left: 100, top: 40, bottom: 40, right: 30, width: "100%", height: "100%" },
		height: 350,
		animation: {
			duration: 2500,
			startup: true
		}
	};

	var deadCheckQuery = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1UyLm10dokjffi5glQINoHRaCqYH0ewD-dn-0T34V6RU/gviz/tq?gid=540902420&headers=1');
	deadCheckQuery.setQuery("select E,F,G limit 11")

	deadCheckQuery.send(function (response) {
		var data = response.getDataTable();
		data.addColumn({ type: 'string', role: 'annotation' });

		// Annotate number of runs within bars
		for (var i = 0; i < data.getNumberOfRows(); i++) {
			data.setCell(i, 3, String(data.Wf[i].c[2].v))
		};

		// Some janky crap to make sure the duration time is correct.  Thanks Google.
		var view = new google.visualization.DataView(data);
		view.setColumns([0, {
			calc: function (dt, row) {
				// initialize variables
				var timeFormat = '';
				var timeValue = 0;
				var duration = [dt.getValue(row, 1).getHours(), dt.getValue(row, 1).getMinutes(), dt.getValue(row, 1).getSeconds()];

				// calculate total time
				duration.forEach(function (value, index) {
					// determine time part
					switch (index) {
						// hours
						case 0:
							timeFormat += value;
							timeValue += (value * 60);
							break;

						// minutes
						case 1:
							timeFormat += ':' + value;
							timeValue += value;
							break;

						// seconds
						case 2:
							if (value < 10) {
								timeFormat += ':0' + value;
							} else {
								timeFormat += ':' + value;
							}
							timeValue += (value / 60);
							break;

						// miliseconds
						case 3:
							timeValue += (value / 60000);
							break;
					}
				});

				// build object notation
				return {
					v: timeValue,
					f: timeFormat
				};
			},
			label: data.getColumnLabel(1),
			type: 'number'
		}, 3]);

		// get range of duration in minutes
		var range = view.getColumnRange(1);

		// determine max number of hours for y-axis
		var maxHours = Math.ceil(range.max - 60);
		var roundTo = parseInt('1' + Array(maxHours.toFixed(0).length).join('0'));
		var maxHours = Math.ceil((range.max - 60) / roundTo) * roundTo;

		// build y-axis ticks
		var ticks = [];
		var min_time;
		for (var hour = 0; hour <= maxHours; hour += roundTo) {
			var time_format
			if (hour == 0) {
				time_format = '1:00:00'
				min_time = hour + 60
			} else {
				time_format = '1:' + hour + ':00';
			}
			ticks.push({
				v: hour + 60,
				f: time_format
			});
		}

		opts.vAxis.ticks = ticks;
		opts.vAxis.viewWindow = {
			min: min_time
		}

		// var chart = new google.visualization.ColumnChart(document.getElementById('dead_check_times_chart_div'));
		// chart.draw(view.toDataTable(), opts);
	});

}

function drawCharacterTimesColumnChart() {
	var opts = {
		titlePosition: 'none',
		legend: {
			'position': "none"
		},
		hAxis: {
			title: 'Character',
			gridlines: {
				color: 'transparent'
			},
			slantedText: true, slantedTextAngle: 90
		},
		vAxis: {
			title: 'Time',
		},
		focusTarget: 'category',
		chartArea: { left: 100, top: 40, bottom: 70, right: 30, width: "100%", height: "100%" },
		height: 350,
		animation: {
			duration: 2500,
			startup: true
		}
	};

	var miscQuery = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1UyLm10dokjffi5glQINoHRaCqYH0ewD-dn-0T34V6RU/gviz/tq?gid=1152025324&headers=1');
	miscQuery.setQuery("select I,J,K limit 14")

	miscQuery.send(function (response) {
		var data = response.getDataTable();
		data.addColumn({ type: 'string', role: 'annotation' });

		// Annotate number of runs within bars
		for (var i = 0; i < data.getNumberOfRows(); i++) {
			data.setCell(i, 3, String(data.Wf[i].c[2].v))
		};

		// Some janky crap to make sure the duration time is correct.  Thanks Google.
		var view = new google.visualization.DataView(data);
		view.setColumns([0, {
			calc: function (dt, row) {
				// initialize variables
				var timeFormat = '';
				var timeValue = 0;
				var duration = [dt.getValue(row, 1).getHours(), dt.getValue(row, 1).getMinutes(), dt.getValue(row, 1).getSeconds()];

				// calculate total time
				duration.forEach(function (value, index) {
					// determine time part
					switch (index) {
						// hours
						case 0:
							timeFormat += value;
							timeValue += (value * 60);
							break;

						// minutes
						case 1:
							timeFormat += ':' + value;
							timeValue += value;
							break;

						// seconds
						case 2:
							if (value < 10) {
								timeFormat += ':0' + value;
							} else {
								timeFormat += ':' + value;
							}
							timeValue += (value / 60);
							break;

						// miliseconds
						case 3:
							timeValue += (value / 60000);
							break;
					}
				});

				// build object notation
				return {
					v: timeValue,
					f: timeFormat
				};
			},
			label: data.getColumnLabel(1),
			type: 'number'
		}, 3]);

		// get range of duration in minutes
		var range = view.getColumnRange(1);

		// determine max number of hours for y-axis
		var maxTime = Math.ceil((range.max - 60) / 5) * 5;
		var minTime = Math.floor((range.min - 60) / 5) * 5;

		// build y-axis ticks
		var ticks = [];
		var min_time;
		for (var hour = minTime; hour <= maxTime; hour += 2.5) {
			var time_format
			if (hour == 0) {
				time_format = '1:00:00'
			} else {
				time_format = '1:' + Math.floor(hour);
				if (hour % 1 != 0) {
					time_format += ':30'
				} else {
					time_format += ':00'
				}
			}

			ticks.push({
				v: hour + 60,
				f: time_format
			});
		}

		opts.vAxis.ticks = ticks;

		// var chart = new google.visualization.ColumnChart(document.getElementById('character_times_chart_div'));
		// chart.draw(view.toDataTable(), opts);
	});

}

