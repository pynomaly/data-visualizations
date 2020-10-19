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

var iconPath = "M256 156l16 48c3,8 -10,12 -13,4l-16 -48c-17,9 -28,26 -28,46 0,28 23,50 51,50 45,0 67,-55 36,-86 -12,-12 -29,-17 -46,-14zm-64 -73c-6,-6 3,-16 10,-9 1,2 3,2 6,2l16 0c3,0 6,2 7,5 7,21 14,42 21,62 21,-4 43,2 59,18 40,39 12,109 -45,109 -35,0 -64,-29 -64,-64 0,-25 14,-48 37,-58l-5 -16 -77 78c-1,1 -3,2 -5,2l-21 0c-3,33 -31,58 -63,58 -36,0 -64,-29 -64,-64 0,-45 45,-76 87,-60l22 -42 -8 -27 -13 0c-9,0 -9,-13 0,-13l36 0c9,0 9,13 0,13l-9 0 6 21 97 0 -3 -9 -11 0c-6,0 -12,-2 -16,-6zm-73 39l-16 30c16,11 26,28 28,47l12 0 -24 -77zm-22 42l-18 35 39 0c-2,-14 -10,-27 -21,-35zm21 48l-50 0c-5,0 -9,-5 -6,-9l23 -45c-33,-12 -68,13 -68,48 0,28 23,50 51,50 25,0 46,-18 50,-44zm109 -101l-98 0 26 82 74 -75 -2 -7z"

var chart = am4core.create("chartdiv", am4charts.SlicedChart);
chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
chart.paddingLeft = 150;
chart.language.locale["_decimalSeparator"] = ",";
chart.language.locale["_thousandSeparator"] = "."; 


chart.data = [{
    "name": "Resto de vehículos",
    "value": 540,
    "disabled":true,
    "color": am4core.color("#000")
}, {
    "name": "Bicicletas",
    "value": 327,
}];

var series = chart.series.push(new am4charts.PictorialStackedSeries());
series.dataFields.value = "value";
series.dataFields.category = "name";
series.alignLabels = true;
// this makes only A label to be visible
series.labels.template.propertyFields.disabled = "disabled";
series.ticks.template.propertyFields.disabled = "disabled";


series.maskSprite.path = iconPath;
series.ticks.template.locationX = 1;
series.ticks.template.locationY = 0;

series.labelsContainer.width = 150;
series.labelsContainer.paddingRight = 200;
series.slices.template.propertyFields.fill = "color";

chart.legend = new am4charts.Legend();
chart.legend.position = "top";
chart.legend.paddingRight = 150;
chart.legend.paddingBottom = 40;

let marker = chart.legend.markers.template.children.getIndex(0);
chart.legend.markers.template.width = 30;
chart.legend.markers.template.height = 30;
marker.cornerRadius(20,20,20,20);