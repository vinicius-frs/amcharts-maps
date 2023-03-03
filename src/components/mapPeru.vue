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
      },
      objAuxLabels: {
        noPrazo: 2,
        atencao: 4,
        atrasada: 3
      }
    }
  },
  mounted() {
    const thisVue = this;

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

    let pointSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
      })
    );
    pointSeries.bullets.push(function() {
      return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
          html:   `<div style="display: flex; gap: 5px">
                    <div style="width: 30px; height: 30px; background-color: green; color: white; position: relative">
                      <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">${thisVue.objAuxLabels.noPrazo}</span>
                    </div>
                    <div style="width: 30px; height: 30px; background-color: yellow; color: black; position: relative">
                      <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">${thisVue.objAuxLabels.atencao}</span>
                    </div>
                    <div style="width: 30px; height: 30px; background-color: red; color: black; position: relative">
                      <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">${thisVue.objAuxLabels.atrasada}</span>
                    </div>
                  </div>`
        })
      });
    });

    pointSeries.pushDataItem({ latitude: -7.360896, longitude: -76.868080 });

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
