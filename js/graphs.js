
function prepareGraphs(){

  google.charts.load('current', {'packages':['corechart']});
}

function loadGraphs(tempLang,tempClimate){ //languages,container_lang,climate,container_climate) {
 
  // Load the Visualization API and the corechart package.
  
  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(function(){
    var i;
    for(i = 0 ; i < tempLang.length;i++){
      drawLanguageChart(tempLang[i].lang,tempLang[i].theId);

    }
  });
  google.charts.setOnLoadCallback(function(){
    var i;
    for(i = 0 ; i < tempClimate.length;i++){
      drawClimateChart(tempClimate[i].climate,tempClimate[i].theId);

    }
  });
  //google.charts.setOnLoadCallback(drawClimateChart);
}

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.


function drawLanguageChart(languages,container_lang) {
  // Create the data table. 
  var rowArray=[];
  for (var i = 0; i < languages.length; i++) {
    languages[i];
    var array=[];
    array.push(languages[i].name);
    array.push(parseInt(languages[i].population));
    rowArray.push(array);
  }

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Language');
  data.addColumn('number', 'People');
  data.addRows(rowArray);
  // Set chart options
  var options = {'title': 'Languages',
                 'titlePosition': 'none',
                 'backgroundColor': '#ffffff',
                 'is3D': 'true',
                 'width': 300,
                 'height': 300,
                 'chartArea': {'width': '100%', 'height': '85%'},
                 'legend': {  'textStyle': { 'color': '#101010' },
                              'position': 'bottom'},
                  'colors': ['#2c5a71', 'whitesmoke', '#3e606f', '#406d80', '#29768a']
              };
  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(container_lang);
  chart.draw(data, options);
}

function drawClimateChart(climate,container_climate) {
  var data = google.visualization.arrayToDataTable([
    ["Element", "Value", { role: "style" } ],
    ["High", parseInt(climate.high_avg), "#b87333"],
    ["Low", parseInt(climate.low_avg), "silver"],
    ["Rainfall", parseInt(climate.rainfall), "gold"],
    ["Snowfall", parseInt(climate.snowfall), "color: #e5e4e2"]
  ]);

  var view = new google.visualization.DataView(data);


  var options = {
    title: "Average Annual Climate",
    width: 300,
    height: 300,
    bar: {groupWidth: "100%"},
    legend: { position: "none" },
  };
  var chart = new google.visualization.BarChart(container_climate);
  chart.draw(view, options);
  }