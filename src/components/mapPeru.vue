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
      objStatesData: {
        AMA: {color: am5.color("#FECA19"), lat: -3.602249, lon: -78.411071, noPrazo: 1, atencao: 2, atrasada: 3},
        ANC: {color: am5.color("#E8385F"), lat: -4.877157, lon: -83.057286, noPrazo: 4, atencao: 5, atrasada: 6},
        APU: {color: am5.color("#FECA19"), lat: -4.877157, lon: -83.057286, noPrazo: 1, atencao: 2, atrasada: 3},
        ARE: {color: am5.color("#E8385F"), lat: -4.877157, lon: -83.057286, noPrazo: 1, atencao: 2, atrasada: 3},
        AYA: {color: am5.color("#FECA19"), lat: -4.877157, lon: -83.057286, noPrazo: 1, atencao: 2, atrasada: 3},
        CAJ: {color: am5.color("#E8385F"), lat: -4.877157, lon: -83.057286, noPrazo: 1, atencao: 2, atrasada: 3},
        CAL: {color: am5.color("#E8385F"), lat: -4.877157, lon: -83.057286, noPrazo: 1, atencao: 2, atrasada: 3},
        CUS: {color: am5.color("#FECA19"), lat: -4.877157, lon: -83.057286, noPrazo: 1, atencao: 2, atrasada: 3},
        HUC: {color: am5.color("#FECA19"), lat: -4.877157, lon: -83.057286, noPrazo: 1, atencao: 2, atrasada: 3},
        HUV: {color: am5.color("#E8385F"), lat: -4.877157, lon: -83.057286, noPrazo: 1, atencao: 2, atrasada: 3},
        ICA: {color: am5.color("#E8385F"), lat: -4.877157, lon: -83.057286, noPrazo: 1, atencao: 2, atrasada: 3},
        JUN: {color: am5.color("#FECA19"), lat: -4.877157, lon: -83.057286, noPrazo: 1, atencao: 2, atrasada: 3},
        LAL: {color: am5.color("#E8385F"), lat: -4.877157, lon: -83.057286, noPrazo: 1, atencao: 2, atrasada: 3},
        LAM: {color: am5.color("#E8385F"), lat: -6.077157, lon: -82.057286, noPrazo: 1, atencao: 2, atrasada: 3},
        LIM: {color: am5.color("#E8385F"), lat: -4.877157, lon: -83.057286, noPrazo: 1, atencao: 2, atrasada: 3},
        LMA: {color: am5.color("#E8385F"), lat: -4.877157, lon: -83.057286, noPrazo: 1, atencao: 2, atrasada: 3},
        LOR: {color: am5.color("#252351"), lat: -2.877157, lon: -73.057286, noPrazo: 1, atencao: 2, atrasada: 3},
        MDD: {color: am5.color("#252351"), lat: -10.877157, lon: -70.557286, noPrazo: 1, atencao: 2, atrasada: 3},
        MOQ: {color: am5.color("#E8385F"), lat: -4.877157, lon: -83.057286, noPrazo: 1, atencao: 2, atrasada: 3},
        PAS: {color: am5.color("#FECA19"), lat: -4.877157, lon: -83.057286, noPrazo: 1, atencao: 2, atrasada: 3},
        PIU: {color: am5.color("#E8385F"), lat: -4.877157, lon: -83.057286, noPrazo: 1, atencao: 2, atrasada: 3},
        PUN: {color: am5.color("#FECA19"), lat: -4.877157, lon: -83.057286, noPrazo: 1, atencao: 2, atrasada: 3},
        SAM: {color: am5.color("#252351"), lat: -6.360896, lon: -76.868080, noPrazo: 4, atencao: 5, atrasada: 6},
        TAC: {color: am5.color("#E8385F"), lat: -4.877157, lon: -83.057286, noPrazo: 1, atencao: 2, atrasada: 3},
        TUM: {color: am5.color("#E8385F"), lat: -3.177157, lon: -83.257286, noPrazo: 1, atencao: 2, atrasada: 3},
        UCA: {color: am5.color("#252351"), lat: -8.877157, lon: -73.557286, noPrazo: 1, atencao: 2, atrasada: 3},
        LKT: {color: am5.color("#FECA19"), lat: -4.877157, lon: -83.057286, noPrazo: 1, atencao: 2, atrasada: 3},
      },
      auxIdx: -1,
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
      thisVue.auxIdx++;
      return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
          html:   `<div style="display: flex; gap: 5px">
                    <div style="width: 30px; height: 30px; background-color: green; color: white; position: relative">
                      <span id="noPrazo_${Object.keys(thisVue.objStatesData)[thisVue.auxIdx]}" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"></span>
                    </div>
                    <div style="width: 30px; height: 30px; background-color: yellow; color: black; position: relative">
                      <span id="atencao_${Object.keys(thisVue.objStatesData)[thisVue.auxIdx]}" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"></span>
                    </div>
                    <div style="width: 30px; height: 30px; background-color: red; color: black; position: relative">
                      <span id="atrasada_${Object.keys(thisVue.objStatesData)[thisVue.auxIdx]}" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"></span>
                    </div>
                  </div>`
        })
      });
    });

    let peruData = [];
    Object.keys(this.objStatesData).forEach(state => {
      peruData.push({
        id: `PE-${state}`,
        polygonSettings: {
          fill: this.objStatesData[state].color
        }
      });

      if(this.objStatesData[state].lat && this.objStatesData[state].lon){
        pointSeries.pushDataItem({ latitude: this.objStatesData[state].lat, longitude: this.objStatesData[state].lon });
      }
    });
    peruSeries.data.setAll(peruData);

    setTimeout(() => {
      Object.keys(this.objStatesData).forEach(state => {
        if(this.objStatesData[state].lat && this.objStatesData[state].lon){
          document.getElementById(`noPrazo_${state}`).textContent = this.objStatesData[state].noPrazo;
          document.getElementById(`atencao_${state}`).textContent = this.objStatesData[state].atencao;
          document.getElementById(`atrasada_${state}`).textContent = this.objStatesData[state].atrasada;
        }
      });
    }, 500);
  }
}
</script>

<style scoped>
#chartdiv{
  height: 90vh;
  width: 100vw;
}
</style>
