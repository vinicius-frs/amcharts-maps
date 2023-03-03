<template>
  <div id="chartdiv"></div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_brazilLow from "@amcharts/amcharts5-geodata/brazilLow";

export default {
  name: 'mapBrasil',
  props: {
  },
  data(){
    return {
      objStateColors: {
        AC: am5.color("#252351"),
        AL: am5.color("#FECA19"),
        AP: am5.color("#252351"),
        AM: am5.color("#252351"),
        BA: am5.color("#FECA19"),
        CE: am5.color("#FECA19"),
        DF: am5.color("#E8385F"),
        ES: am5.color("#009757"),
        GO: am5.color("#E8385F"),
        MA: am5.color("#FECA19"),
        MT: am5.color("#E8385F"),
        MS: am5.color("#E8385F"),
        MG: am5.color("#009757"),
        PA: am5.color("#252351"),
        PB: am5.color("#FECA19"),
        PR: am5.color("#5D686E"),
        PE: am5.color("#FECA19"),
        PI: am5.color("#FECA19"),
        RJ: am5.color("#009757"),
        RN: am5.color("#FECA19"),
        RS: am5.color("#5D686E"),
        RO: am5.color("#252351"),
        RR: am5.color("#252351"),
        SC: am5.color("#5D686E"),
        SP: am5.color("#009757"),
        SE: am5.color("#FECA19"),
        TO: am5.color("#FECA19")
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

    let brasilSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_brazilLow,
      })
    );

    brasilSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
      templateField: "polygonSettings",
    });

    brasilSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color("#F89C1B")
    });

    brasilSeries.mapPolygons.template.events.on("click", (ev) => {
      var dataItem = ev.target.dataItem;
      brasilSeries.zoomToDataItem(dataItem);
    });

    let brasilData = [];
    Object.keys(this.objStateColors).forEach(state => {
      brasilData.push({
        id: `BR-${state}`,
        polygonSettings: {
          fill: this.objStateColors[state]
        }
      });
    });
    brasilSeries.data.setAll(brasilData);
  }
}
</script>

<style scoped>
#chartdiv{
  height: 90vh;
  width: 100vw;
}
</style>
