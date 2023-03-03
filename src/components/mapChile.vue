<template>
  <div id="chartdiv"></div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_chileLow from "@amcharts/amcharts5-geodata/chileLow";

export default {
  name: 'mapChile',
  props: {
  },
  data(){
    return {
      objStateColors: {
        AI: am5.color("#F89C1B"),
        AN: am5.color("#252351"),
        AR: am5.color("#009757"),
        AP: am5.color("#252351"),
        AT: am5.color("#FECA19"),
        BI: am5.color("#009757"),
        CO: am5.color("#FECA19"),
        LI: am5.color("#E8385F"),
        LL: am5.color("#5D686E"),
        LR: am5.color("#5D686E"),
        MA: am5.color("#F89C1B"),
        ML: am5.color("#E8385F"),
        NB: am5.color("#009757"),
        RM: am5.color("#E8385F"),
        TA: am5.color("#252351"),
        VS: am5.color("#E8385F"),
      }
    }
  },
  mounted() {
    let root = am5.Root.new("chartdiv");

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        minZoomLevel: 0.9
      })
    );

    let chileSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_chileLow
      })
    );

    chileSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
      templateField: "polygonSettings"
    });

    chileSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color("#F89C1B")
    });

    chileSeries.mapPolygons.template.events.on("click", (ev) => {
      var dataItem = ev.target.dataItem;
      chileSeries.zoomToDataItem(dataItem);
    });

    let chileData = [];
    Object.keys(this.objStateColors).forEach(state => {
      chileData.push({
        id: `CL-${state}`,
        polygonSettings: {
          fill: this.objStateColors[state]
        }
      });
    });
    chileSeries.data.setAll(chileData);
  }
}
</script>

<style scoped>
#chartdiv{
  height: 90vh;
  width: 100vw;
}
</style>
