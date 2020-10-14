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
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);
// Themes end



var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.responsive.enabled = true;

// Set locale
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

chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.data = [
  {
    country: "USA",
    visits: 23725
  },
  {
    country: "China",
    visits: 1882
  },
  {
    country: "Japón",
    visits: 1809
  },
  {
    country: "Alemania",
    visits: 1322
  },
  {
    country: "UK",
    visits: 1122
  },
  {
    country: "Francia",
    visits: 1114
  },
  {
    country: "India",
    visits: 984
  },
  {
    country: "España",
    visits: 711
  },
  {
    country: "Países Bajos",
    visits: 665
  },
  {
    country: "Rusia",
    visits: 580
  }
];

var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.dataFields.category = "country";
categoryAxis.renderer.minGridDistance = 40;
categoryAxis.fontSize = 13;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;
valueAxis.max = 24000;
valueAxis.strictMinMax = true;
valueAxis.renderer.minGridDistance = 30;

// axis break
var axisBreak = valueAxis.axisBreaks.create();
axisBreak.startValue = 2100;
axisBreak.endValue = 22900;
//axisBreak.breakSize = 0.005;

// fixed axis break
var d = (axisBreak.endValue - axisBreak.startValue) / (valueAxis.max - valueAxis.min);
axisBreak.breakSize = 0.05 * (1 - d) / d; // 0.05 means that the break will take 5% of the total value axis height

// make break expand on hover
var hoverState = axisBreak.states.create("hover");
hoverState.properties.breakSize = 1;
hoverState.properties.opacity = 0.1;
hoverState.transitionDuration = 1500;

axisBreak.defaultState.transitionDuration = 1000;
/*
// this is exactly the same, but with events
axisBreak.events.on("over", function() {
  axisBreak.animate(
    [{ property: "breakSize", to: 1 }, { property: "opacity", to: 0.1 }],
    1500,
    am4core.ease.sinOut
  );
});
axisBreak.events.on("out", function() {
  axisBreak.animate(
    [{ property: "breakSize", to: 0.005 }, { property: "opacity", to: 1 }],
    1000,
    am4core.ease.quadOut
  );
});*/

var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.categoryX = "country";
series.dataFields.valueY = "visits";
series.columns.template.tooltipText = "{valueY.value}";
series.columns.template.tooltipY = 0;
series.columns.template.strokeOpacity = 0;
series.columns.template.width = am4core.percent(50);

// create color list
chart.colors.list = [
  am4core.color("#845EC2"),
  am4core.color("#D65DB1"),
  am4core.color("#FF6F91"),
  am4core.color("#FF9671"),
  am4core.color("#FFC75F"),
  am4core.color("#F9F871")
];

// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
series.columns.template.adapter.add("fill", function(fill, target) {
  return chart.colors.getIndex(target.dataItem.index);
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
    
    // if ((target instanceof am4core.Rectangle) && (target.parent instanceof am4charts.AxisLabel) && (target.parent.parent instanceof am4charts.AxisRendererY)) { 
    //   var state = target.states.create(stateId);
    //   state.properties.fill = am4core.color("#f00");
    //   state.properties.fillOpacity = 0.5;
    //   return state;
    // }
    
    return null;
  }
});