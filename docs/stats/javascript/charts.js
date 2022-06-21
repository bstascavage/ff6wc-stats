// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawRunTimesLineChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawRunTimesLineChart() {
	// Instantiate and draw our chart, passing in some options.
	var opts = {title:'Run Times',
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
							chartArea:{left:100,top:40,bottom: 40, right: 30,width:"100%",height:"100%"},
								 height: 400};
	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1UyLm10dokjffi5glQINoHRaCqYH0ewD-dn-0T34V6RU/edit#gid=0&headers=1&tq=');
	query.setQuery('select V')

	query.send( function(response) {
		var skip_data = response.getDataTable();
		query.setQuery('select A,B')

		query.send( function(response) {
			var data = response.getDataTable();
			data.addColumn( {'type': 'string', 'role': 'style'} );
			for (var i=0;i<skip_data.getNumberOfRows();i++) {
				if (skip_data.Wf[i].c[0].v == 'Yes') {
					data.setCell(i, 2, 'point {fill-color: red');
				} 
			};
			
			var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
			chart.draw(data, opts)
		});
		
	});
}


