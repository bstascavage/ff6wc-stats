// Load the Visualization API and the corechart package.
google.charts.load('current', { 'packages': ['corechart'] });

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(initialize_everything);

var metricsConfig = {
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

var chartsConfig = {
	run_times_chart: {
		x_axis: {
			column: 'A',
			type: 'number'
		},
		y_axis: {
			column: 'B',
			type: 'datetime'
		},
		annotation: {
			column: 'G',
			type: 'string',
			color: 'red',
			role: 'style'
		},
		opts: {
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
				},
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
			height: 400,
			// Animations are disabled in till I can figure out the performance issues
			// animation: {
			// 	duration: 25,
			// 	startup: true,
			// 	easing: 'linear'
			// }
		}
	},
	char_times_chart: {
		x_axis: {
			column: 'I',
			type: 'string'
		},
		y_axis: {
			column: 'J',
			type: 'datetime'
		},
		annotation: {
			column: 'K',
			type: 'string',
			role: 'annotation'
		},
		opts: {
			title: 'Character times',
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
			// Animations are disabled in till I can figure out the performance issues
			// animation: {
			// 	duration: 2000,
			// 	startup: true,
			// 	easing: 'inAndOut'
			// }
		}
	},
	dead_checks_times_chart: {
		x_axis: {
			column: 'AK',
			type: 'number'
		},
		y_axis: {
			column: 'AL',
			type: 'datetime'
		},
		annotation: {
			column: 'AM',
			type: 'string',
			role: 'annotation'
		},
		opts: {
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
			// animation: {
			// 	duration: 2500,
			// 	startup: true
			// }
		}
	}
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
		var queryData = response.getDataTable();

		// Start setting divs
		setMetricElems(queryData)
		google.charts.setOnLoadCallback(drawRunTimesLineChart(queryData));
		google.charts.setOnLoadCallback(drawCharacterTimesColumnChart(queryData));
		google.charts.setOnLoadCallback(drawDeadcheckTimesColumnChart(queryData));
	})
}

function drawDeadcheckTimesColumnChart(queryData) {
	var chart_name = 'dead_checks_times_chart'
	var data = populateDataTable(queryData, chart_name)

	// Set number of runs with that dead check count as an annotation
	var annotations = getColumnIndex(queryData, chartsConfig[chart_name].annotation.column)
	data.addColumn({ 'type': chartsConfig[chart_name].annotation.type, role: chartsConfig[chart_name].annotation.role });

	for (var rowIndex = 0; rowIndex < data.Wf.length; rowIndex++) {
		if (queryData.Wf[rowIndex].c[annotations] !== null) {
			data.setCell(rowIndex, 2, String(queryData.Wf[rowIndex].c[annotations].v))
		}
	}

	// Some janky crap to make sure the duration time is correct.  Thanks Google.
	// TODO: move to its own function to combine with drawCharacterTimesColumnChart()
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
	}, 2]);

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

	chartsConfig[chart_name].opts.vAxis.ticks = ticks
	chartsConfig[chart_name].opts.vAxis.viewWindow = {
		min: min_time
	}

	var chart = new google.visualization.ColumnChart(document.getElementById(chart_name + '_div'));
	chart.draw(view.toDataTable(), chartsConfig[chart_name].opts);
}

function drawCharacterTimesColumnChart(queryData) {
	var chart_name = 'char_times_chart'
	var data = populateDataTable(queryData, chart_name)

	// Set number of runs with that given character as an annotation
	var annotations = getColumnIndex(queryData, chartsConfig[chart_name].annotation.column)
	data.addColumn({ 'type': chartsConfig[chart_name].annotation.type, role: chartsConfig[chart_name].annotation.role });

	for (var rowIndex = 0; rowIndex < data.Wf.length; rowIndex++) {
		if (queryData.Wf[rowIndex].c[annotations] !== null) {
			data.setCell(rowIndex, 2, String(queryData.Wf[rowIndex].c[annotations].v))
		}
	}

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
	}, 2]);

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

	chartsConfig[chart_name].opts.vAxis.ticks = ticks

	var chart = new google.visualization.ColumnChart(document.getElementById(chart_name + '_div'));
	chart.draw(view.toDataTable(), chartsConfig[chart_name].opts);
}

function drawRunTimesLineChart(queryData) {
	// Draws a linechart for average times
	var chart_name = 'run_times_chart'
	var data = populateDataTable(queryData, chart_name)

	// Set point annotation color for runs that use the skip
	var annotations = getColumnIndex(queryData, chartsConfig[chart_name].annotation.column)
	data.addColumn({
		type: chartsConfig[chart_name].annotation.type,
		role: chartsConfig[chart_name].annotation.role
	});

	for (var rowIndex = 0; rowIndex < data.Wf.length; rowIndex++) {
		if (queryData.Wf[rowIndex].c[annotations]) {
			var annotation = ''
			if (queryData.Wf[rowIndex].c[annotations].v == 'Yes') {
				annotation = 'point {fill-color: ' + chartsConfig[chart_name].annotation.color
				data.setCell(rowIndex, 2, annotation)
			}
		}
	}

	var chart = new google.visualization.LineChart(document.getElementById(chart_name + '_div'));
	chart.draw(data, chartsConfig[chart_name].opts);

	// This is logic to animate the chart's drawing.
	// It is commented out due to performance reasons, would like to enable one day

	// LineChart is dumb and we have to redraw it on every datapoint
	// var rowIndex = 0;

	// drawChart();
	// setInterval(drawChart, 50);

	// function drawChart() {
	// 	if (rowIndex < queryData.Wf.length) {
	// 		if (queryData.Wf[rowIndex].c[xAxis] !== null) {
	// 			var annotation = ''
	// 			if (queryData.Wf[rowIndex].c[annotations]) {
	// 				if (queryData.Wf[rowIndex].c[annotations].v == 'Yes') {
	// 					annotation = 'point {fill-color: ' + chartsConfig.run_times_chart.annotation.color
	// 				}
	// 			}

	// 			data.addRows([[queryData.Wf[rowIndex].c[xAxis], queryData.Wf[rowIndex].c[yAxis], annotation]])
	// 			chart.draw(data, chartsConfig.run_times_chart.opts);
	// 			rowIndex++
	// 		}
	// 	}
	// }
}

function populateDataTable(queryData, chart_name) {
	//Populates X,Y data for a chart
	var data = new google.visualization.DataTable({
		cols: [
			{
				type: chartsConfig[chart_name].x_axis.type,
				label: getColumnName(queryData, chartsConfig[chart_name].x_axis.column)
			},
			{
				type: chartsConfig[chart_name].y_axis.type,
				label: getColumnName(queryData, chartsConfig[chart_name].y_axis.column)
			},
		]
	});

	var xAxis = getColumnIndex(queryData, chartsConfig[chart_name].x_axis.column)
	var yAxis = getColumnIndex(queryData, chartsConfig[chart_name].y_axis.column)

	for (var rowIndex = 0; rowIndex < queryData.Wf.length; rowIndex++) {
		if (queryData.Wf[rowIndex].c[xAxis] !== null) {
			data.addRows([[
				queryData.Wf[rowIndex].c[xAxis],
				queryData.Wf[rowIndex].c[yAxis]]])
		};
	}

	return data
}

function setMetricElems(queryData) {
	// Loop through metricsConfig to create divs for single metrics
	Object.keys(metricsConfig).forEach(key => {
		var span = document.getElementById(key);
		var value = queryData.Wf[metricsConfig[key].position[1] - 2].c[getColumnIndex(queryData, metricsConfig[key].position[0])].f;
		span.textContent = value

		// For delta metrics, sets the elems for the up/down arrows
		if (metricsConfig[key].delta === true) {
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

function getColumnIndex(queryData, columnLetter) {
	var columns = queryData.bf
	// Converts human-readable Sheets info (ie cell C2) to the proper index in the DataTable object
	for (let index = 0; index < columns.length; ++index) {
		if (columns[index].id == columnLetter) {
			return index
		}
	}
}

function getColumnName(queryData, columnLetter) {
	// Converts human-readable Sheets column name to the proper label in the DataTable object
	var columns = queryData.bf
	for (let index = 0; index < columns.length; ++index) {
		if (columns[index].id == columnLetter) {
			return columns[index].label
		}
	}
}
