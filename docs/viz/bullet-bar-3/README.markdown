# Bullet Bar (3)

A Pen created on CodePen.io. Original URL: [https://codepen.io/pynomaly/pen/dyXoMYL](https://codepen.io/pynomaly/pen/dyXoMYL).

In some scenarios, showing multiple column series side-by-side (clustered) is the best and most "standard" way to display multiple column series. However, when each series has equal and fairly limited number of items, layering series on top of each other presents a much more impactful visualization.

To achieve that with amCharts 4, you just disable clustering on each series (<code>series.clustered = false</code>) and then make columns in one of them wider (or narrower) than the other (<code>series2.columns.template.width = am4core.percent(50)</code>).
