
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
  var options = { 'title': 'Languages',
                  'titlePosition': 'none',
                  'backgroundColor': '#ffffff',
                  'is3D': 'true',
                  'width': 'auto',
                  'height': 'auto',
				          'chartArea': {'width': '100%', 'height': '85%'},
                  'legend': {  'textStyle': { 'color': '#101010' },
                  'position': 'bottom'}
              };
  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(container_lang);
  options.series={};
    for(var i = 0;i < data.getNumberOfRows();i++){
        options.series[i]={color:getRandomColor()}
    }
  chart.draw(data, options);
}

function drawTempChart(high_avg,low_avg,container_temp) {
    console.log(high_avg + " " + low_avg);
    var data = google.visualization.arrayToDataTable([
    ["Element", "Value", { role: "style" } ],
    ["High", parseFloat(high_avg), "#EC644B"],
    ["Low", parseFloat(low_avg), "#446CB3"]]);

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
    ["Snowfall", parseInt(snowfall), "#E4F1FE"],
    ["Rainfall", parseInt(rainfall), "#5C97BF"]]);
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
  var color1="#b87333";
  var color2="#b73ff2";
  var color3="#0ff210";
  var colors =[color1,color2,color3]
  var rowArray=[];
  rowArray.push(["Element", "Value", { role: "style" } ]);
  for (var i = 0; i < utility.length; i++) {
    
    var array=[];
    array.push(utility[i].type);
    array.push(parseInt(utility[i].cost));
    array.push(colors[i]);

    rowArray.push(array);
  }

  var data = google.visualization.arrayToDataTable(rowArray); 
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

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}   
