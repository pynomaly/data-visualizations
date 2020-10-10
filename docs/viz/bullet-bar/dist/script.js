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

// Locale
chart.language.locale["_date_millisecond"] = "mm:ss SSS";
chart.language.locale["_date_second"] = "HH:mm:ss";
chart.language.locale["_date_minute"] = "HH:mm";
chart.language.locale["_date_hour"] = "HH:mm";
chart.language.locale["_date_day"] = "MM/dd";
chart.language.locale["_date_week"] = "ww";
chart.language.locale["_date_month"] = "MMM";
chart.language.locale["_date_year"] = "yyyy";
chart.language.locale["_decimalSeparator"] = ",";
chart.language.locale["_thousandSeparator"] = "."; 


// Add percent sign to all numbers
chart.numberFormatter.numberFormat = "#.#'%'";

// Add data
chart.data = [{
    "pregunta": "A favor",
    "Población general": 48.4,
    "País Valencià": 44.8
}, {
    "pregunta": "En contra",
    "Población general": 10.5,
    "País Valencià": 5.1
}, {
    "pregunta": "En blanco",
    "Población general": 5.7,
    "País Valencià": 5.9
}, {
    "pregunta": "No habría votado",
    "Población general": 6.7,
    "País Valencià": 8
}, {
    "pregunta": "No lo sé",
    "Población general": 23.8,
    "País Valencià": 30.2
}, {
    "pregunta": "Prefiero no contestar",
    "Población general": 4.9,
    "País Valencià": 6
}];

// Create axes
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "pregunta";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 40;


var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
//valueAxis.title.text = "Tasa de crecimiento del PIB";
//valueAxis.title.fontWeight = 800;
valueAxis.min = 0;
valueAxis.cursorTooltipEnabled = false;
valueAxis.fontSize = 12;



// Create series
var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueY = "Población general";
series.dataFields.categoryX = "pregunta";
series.clustered = false;
//series.tooltipText = "PIB en {categoryX} (2004): [bold]{valueY}[/]";
series.tooltipText = "Población general: [bold]{valueY}[/]";
series.fill = am4core.color("#000000");
series.strokeWidth = 0;
series.columns.template.width = am4core.percent(50);

  
var series2 = chart.series.push(new am4charts.ColumnSeries());
series2.dataFields.valueY = "País Valencià";
series2.dataFields.categoryX = "pregunta";
series2.clustered = false;
series2.columns.template.width = am4core.percent(25);
//series2.tooltipText = "PIB en {categoryX} (2005): [bold]{valueY}[/]";
series2.tooltipText = "País Valencià: [bold]{valueY}[/]";
series2.fill = am4core.color("#ffcc21");
series2.strokeWidth = 0;


chart.cursor = new am4charts.XYCursor();
chart.cursor.lineX.disabled = true;
chart.cursor.lineY.disabled = true;

// Add chart title
//var title = chart.titles.create();
//title.text = "Si hubieras podido votar en el referéndum";
//title.fontSize = 25;
//title.fontWeight = 600;
//title.marginBottom = 10;

// Configure axis label
var label = categoryAxis.renderer.labels.template;
label.truncate = false;
label.wrap = true;
label.maxWidth = 110;
label.tooltipText = "{category}";
label.fontSize = 12;

categoryAxis.events.on("sizechanged", function(ev) {
  var axis = ev.target;
  var cellWidth = axis.pixelWidth / (axis.endIndex - axis.startIndex);
  if (cellWidth < axis.renderer.labels.template.maxWidth) {
    axis.renderer.labels.template.rotation = -90;
    axis.renderer.labels.template.horizontalCenter = "right";
    axis.renderer.labels.template.verticalCenter = "middle";
  }
  else {
    axis.renderer.labels.template.rotation = 0;
    axis.renderer.labels.template.horizontalCenter = "middle";
    axis.renderer.labels.template.verticalCenter = "top";
  }
});

// responsive


chart.responsive.enabled = true;
chart.responsive.useDefault = false

chart.responsive.rules.push({
  relevant: function(target) {
    if (target.pixelWidth <= 400) {
      return true;
    }
    
    return false;
  },
  state: function(target, stateId) {
    
    if (target instanceof am4charts.Chart) {
      var state = target.states.create(stateId);
      state.properties.paddingTop = 0;
      state.properties.paddingRight = 15;
      state.properties.paddingBottom = 10;
      state.properties.paddingLeft = 15;
      return state;
    }
    
    if (target instanceof am4core.Scrollbar) {
      var state = target.states.create(stateId);
      state.properties.marginBottom = -10;
      return state;
    }
    
    if (target instanceof am4charts.Legend) {
      var state = target.states.create(stateId);
      state.properties.paddingTop = 3;
      state.properties.paddingRight = 0;
      state.properties.paddingBottom = 3;
      state.properties.paddingLeft = 0;
      state.properties.marginLeft = 0;
      return state;
    }
    
    if (target instanceof am4charts.AxisRendererY) {
      var state = target.states.create(stateId);
      state.properties.inside = true;
      state.properties.maxLabelPosition = 0.99;
      return state;
    }
    
    if ((target instanceof am4charts.AxisLabel) && (target.parent instanceof am4charts.AxisRendererY)) { 
      var state = target.states.create(stateId);
      state.properties.dy = -15;
      state.properties.paddingTop = 3;
      state.properties.paddingRight = 5;
      state.properties.paddingBottom = 3;
      state.properties.paddingLeft = 5;
      
      // Create a separate state for background
      target.setStateOnChildren = true;
      var bgstate = target.background.states.create(stateId);
      bgstate.properties.fill = am4core.color("#fff");
      bgstate.properties.fillOpacity = 0.2;
      
      return state;
    }
    
    

    
    return null;
  }
});
