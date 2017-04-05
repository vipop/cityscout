function prepareGraphs(){
  google.charts.load('current', {'packages':['corechart']});
}

function loadGraphs(tempLang,tempClimate,tempUtility){

  google.charts.setOnLoadCallback(function(){
    var i;
    for(i = 0 ; i < tempLang.length;i++){
      drawLanguageChart(tempLang[i].lang,tempLang[i].theId);
    }
  });
  google.charts.setOnLoadCallback(function(){
    var i;
    for(i = 0 ; i < tempClimate.length;i++){
        console.log("tempClimate:");
        console.log(tempClimate);
		drawTempChart(tempClimate[i].climate.high_avg, tempClimate[i].climate.low_avg, tempClimate[i].theTemp);
		drawFallChart(tempClimate[i].climate.snowfall, tempClimate[i].climate.rainfall, tempClimate[i].theFall);
	}
  });
   google.charts.setOnLoadCallback(function(){
    var i;
	for(i = 0 ; i < tempUtility.length;i++){
        console.log(tempUtility[i].uti);
      drawUtilityChart(tempUtility[i].uti, tempUtility[i].theId);
    }
  });
}
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
                 'width': 'auto',
                 'height': 'auto',
				 'chartArea': {'width': '100%', 'height': '85%'},
                 'legend': {  'textStyle': { 'color': '#101010' },
                              'position': 'bottom'},
                  'colors': ['#2c5a71', 'whitesmoke', '#3e606f', '#406d80', '#29768a']
              };
  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(container_lang);
  chart.draw(data, options);
}
function drawTempChart(high_avg,low_avg,container_temp) {
    console.log(high_avg + " " + low_avg);
    var data = google.visualization.arrayToDataTable([
    ["Element", "Value", { role: "style" } ],
    ["High", parseFloat(high_avg), "#b87333"],
    ["Low", parseFloat(low_avg), "silver"]]);

	var view = new google.visualization.DataView(data);
	var options = {
    title: "Average Annual Temperature(C)",
    width: 'auto',
    height: 'auto',
    bar: {groupWidth: "100%"},
    legend: { position: "none" },
  };
  var chart = new google.visualization.BarChart(container_temp);
  chart.draw(view, options);
}
function drawFallChart(snowfall,rainfall,container_fall) {
  var data = google.visualization.arrayToDataTable([
    ["Element", "Value", { role: "style" } ],
    ["Snowfall", parseInt(snowfall), "#b87333"],
    ["Rainfall", parseInt(rainfall), "silver"]]);
    var view = new google.visualization.DataView(data);
	var options = {
    title: "Average Annual Rainfall and Snowfall (cm)",
    width: 'auto',
    height: 'auto',
    bar: {groupWidth: "100%"},
    legend: { position: "none" },
  };
  var chart = new google.visualization.BarChart(container_fall);
  chart.draw(view, options);
}
function drawUtilityChart(utility,container_utility) {
  console.log(utility);
z
  var data = google.visualization.arrayToDataTable([
    ["Element", "Value", { role: "style" } ],
    [utility[0].type, parseInt(utility[0].cost),"#b87333"] /*,
    [utility[1].type, parseInt(utility[1].cost),"silver"],
    [utility[2].type, parseInt(utility[2].cost),"color: #e5e4e2"]*/
  ]);

  var view = new google.visualization.DataView(data);

  var options = {
    title: "Average Monthly Costs",
    width: 'auto',
    height: 'auto',
    bar: {groupWidth: "100%"},
    legend: { position: "none" },
  };
  var chart = new google.visualization.ColumnChart(container_utility);
  chart.draw(view, options);
}
