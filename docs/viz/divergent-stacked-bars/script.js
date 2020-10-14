/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.language.locale["_decimalSeparator"] = ",";
chart.language.locale["_thousandSeparator"] = "."; 


// Title
var title = chart.titles.push(new am4core.Label());
title.text = "[bold]Herramientas de investigación utilizadas por estudiantes[/]";
title.fontSize = 25;
title.marginBottom = 15;

// Add data
chart.data = [{
  "category": "Motores de búsqueda",
  "negative1": -0.1,
  "negative2": -0.9,
  "positive1": 5,
  "positive2": 94
}, {
  "category": "Enciclopedias online",
  "negative1": -2,
  "negative2": -4,
  "positive1": 19,
  "positive2": 75
}, {
  "category": "Compañeros/as",
  "negative1": -2,
  "negative2": -10,
  "positive1": 46,
  "positive2": 42
}, {
  "category": "Redes sociales",
  "negative1": -2,
  "negative2": -13,
  "positive1": 33,
  "positive2": 52
}, {
  "category": "Manuales",
  "negative1": -6,
  "negative2": -19,
  "positive1": 34,
  "positive2": 41
}, {
  "category": "Webs de noticias",
  "negative1": -3,
  "negative2": -23,
  "positive1": 49,
  "positive2": 25
}, {
  "category": "Libros de texto",
  "negative1": -5,
  "negative2": -28,
  "positive1": 49,
  "positive2": 18
}, {
  "category": "Bibliotecas",
  "negative1": -14,
  "negative2": -34,
  "positive1": 37,
  "positive2": 16
}, {
  "category": "Otros libros impresos",
  "negative1": -9,
  "negative2": -41,
  "positive1": 38,
  "positive2": 12
}, {
  "category": "Bases de datos",
  "negative1": -18,
  "negative2": -36,
  "positive1": 29,
  "positive2": 17
}, {
  "category": "Webs para estudiantes",
  "negative1": -17,
  "negative2": -39,
  "positive1": 34,
  "positive2": 10
}];


// Create axes
var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "category";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.minGridDistance = 20;
categoryAxis.renderer.axisFills.template.disabled = false;
categoryAxis.renderer.axisFills.template.fillOpacity = 0.05;


var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.min = -100;
valueAxis.max = 100;
valueAxis.renderer.minGridDistance = 50;
valueAxis.renderer.ticks.template.length = 3;
valueAxis.renderer.ticks.template.disabled = false;
valueAxis.renderer.ticks.template.strokeOpacity = 0.3;
valueAxis.renderer.labels.template.adapter.add("text", function(text) {
  return text + "%";
})
valueAxis.cursorTooltipEnabled = false;


// Legend
chart.legend = new am4charts.Legend();
chart.legend.position = "top";
//chart.cursor = new am4charts.XYCursor();
//chart.cursor.xAxis = valueAxis.value;


// Use only absolute numbers
chart.numberFormatter.numberFormat = "#.#s";

// Create series
function createSeries(field, name, color) {
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueX = field;
  series.dataFields.categoryY = "category";
  series.stacked = true;
  series.name = name;
  series.stroke = color;
  series.fill = color;
  series.columns.template.tooltipText = "{name}: {valueX.value}%";
  //series.columns.template.tooltipY = 0;
  series.columns.template.strokeOpacity = 0;

  
  
  var label = series.bullets.push(new am4charts.LabelBullet);
  label.label.text = "{valueX}%";
  label.label.fill = am4core.color("#000");
  label.label.strokeWidth = 0;
  label.label.truncate = false;
  label.label.hideOversized = true;
  label.locationX = 0.5;
  

  return series;
}

//var interfaceColors = new am4core.InterfaceColorSet();
var positiveColor = am4core.color("#2a9d8f");
var negativeColor = am4core.color("#e76f51");

createSeries("negative2", "Poco", negativeColor.lighten(0.5));
createSeries("negative1", "Nunca", negativeColor);
createSeries("positive1", "A veces", positiveColor.lighten(0.5));
createSeries("positive2", "A menudo", positiveColor);

// Coloca "Nunca" de primero en la leyenda
chart.legend.events.on("layoutvalidated", function(event){
  chart.legend.itemContainers.each((container)=>{
    if(container.dataItem.dataContext.name == "Nunca"){
      container.toBack();
    }
  })
})