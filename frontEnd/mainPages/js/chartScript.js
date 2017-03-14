// Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Language');
        data.addColumn('number', 'People');
        data.addRows([
          ['English', 40],
          ['French', 20],
          ['Mandarin', 10],
          ['Spanish', 15],
          ['Tagalog', 15]
        ]);

        // Set chart options
        var options = {'title': 'Languages',
                       'titlePosition': 'none',
                       'backgroundColor': '#ffffff',
                       'is3D': 'true',
                       'width': 600,
                       'height': 500,
                       'chartArea': {'width': '100%', 'height': '85%'},
                       'legend': {  'textStyle': { 'color': '#101010' },
                                    'position': 'bottom'},
                        'colors': ['#2c5a71', 'whitesmoke', '#3e606f', '#406d80', '#29768a']
                    };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart-div'));
        chart.draw(data, options);
      }