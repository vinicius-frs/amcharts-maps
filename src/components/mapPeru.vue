<template>
  <div id="chartdiv"></div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_peruLow from "@amcharts/amcharts5-geodata/peruLow";

export default {
  name: 'mapPeru',
  props: {
  },
  data(){
    return {
      objStateColors: {
        AMA: am5.color("#FECA19"),
        ANC: am5.color("#E8385F"),
        APU: am5.color("#FECA19"),
        ARE: am5.color("#E8385F"),
        AYA: am5.color("#FECA19"),
        CAJ: am5.color("#E8385F"),
        CAL: am5.color("#E8385F"),
        CUS: am5.color("#FECA19"),
        HUC: am5.color("#FECA19"),
        HUV: am5.color("#E8385F"),
        ICA: am5.color("#E8385F"),
        JUN: am5.color("#FECA19"),
        LAL: am5.color("#E8385F"),
        LAM: am5.color("#E8385F"),
        LIM: am5.color("#E8385F"),
        LMA: am5.color("#E8385F"),
        LOR: am5.color("#252351"),
        MDD: am5.color("#252351"),
        MOQ: am5.color("#E8385F"),
        PAS: am5.color("#FECA19"),
        PIU: am5.color("#E8385F"),
        PUN: am5.color("#FECA19"),
        SAM: am5.color("#252351"),
        TAC: am5.color("#E8385F"),
        TUM: am5.color("#E8385F"),
        UCA: am5.color("#252351"),
        LKT: am5.color("#FECA19"),
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

    let peruSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_peruLow
      })
    );

    peruSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
      templateField: "polygonSettings"
    });

    peruSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color("#F89C1B")
    });

    peruSeries.mapPolygons.template.events.on("click", (ev) => {
      var dataItem = ev.target.dataItem;
      peruSeries.zoomToDataItem(dataItem);
    });

    let peruData = [];
    Object.keys(this.objStateColors).forEach(state => {
      peruData.push({
        id: `PE-${state}`,
        polygonSettings: {
          fill: this.objStateColors[state]
        }
      });
    });
    peruSeries.data.setAll(peruData);
  }
}
</script>

<style scoped>
#chartdiv{
  height: 90vh;
  width: 100vw;
}
</style>
