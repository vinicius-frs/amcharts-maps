<template>
  <div id="chartdiv"></div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_peruCoastLow from "@amcharts/amcharts5-geodata/peruCoastLow";

export default {
  name: 'mapPeru',
  props: {
  },
  data(){
    return {
      objStatesData: {
        ANC: {color: am5.color("#E8385F"), lat: -3.702249, lon: -85.911071, noPrazo: 4, total: 5, atrasada: 6},
        ARE: {color: am5.color("#E8385F"), lat: -5.702249, lon: -85.911071, noPrazo: 1, total: 2, atrasada: 3},
        CAL: {color: am5.color("#E8385F"), lat: -7.702249, lon: -85.911071, noPrazo: 1, total: 2, atrasada: 3},
        ICA: {color: am5.color("#E8385F"), lat: -9.702249, lon: -85.911071, noPrazo: 1, total: 2, atrasada: 3},
        LAL: {color: am5.color("#E8385F"), lat: -11.702249, lon: -85.911071, noPrazo: 1, total: 2, atrasada: 3},
        LAM: {color: am5.color("#E8385F"), lat: -13.702249, lon: -85.911071, noPrazo: 1, total: 2, atrasada: 3},
        LIM: {color: am5.color("#E8385F"), lat: -3.702249, lon: -68.911071, noPrazo: 1, total: 2, atrasada: 3},
        LMA: {color: am5.color("#E8385F"), lat: -5.702249, lon: -68.911071, noPrazo: 1, total: 2, atrasada: 3},
        MOQ: {color: am5.color("#E8385F"), lat: -7.702249, lon: -68.911071, noPrazo: 1, total: 2, atrasada: 3},
        PIU: {color: am5.color("#E8385F"), lat: -9.702249, lon: -68.911071, noPrazo: 1, total: 2, atrasada: 3},
        TAC: {color: am5.color("#E8385F"), lat: -11.702249, lon: -68.911071, noPrazo: 1, total: 2, atrasada: 3},
        TUM: {color: am5.color("#E8385F"), lat: -13.702249, lon: -68.911071, noPrazo: 1, total: 2, atrasada: 3},
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
        minZoomLevel: 0.9,
        homeZoomLevel: 0.9,
      })
    );

    let peruSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_peruCoastLow
      })
    );

    peruSeries.events.on("datavalidated", function() {
      chart.goHome();
    });

    peruSeries.mapPolygons.template.setAll({
      tooltipText: "[BOLD]{name}[/]\n{dados}",
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
          // <div style="background-color: #5D686E; width: 110px; padding-top: 5px; text-align: center; color: white; font-weight: bold">${Object.keys(thisVue.objStatesData)[thisVue.auxIdx]}</div>
          html:   `
                  <div style="display: flex; gap: 5px; padding: 5px; background-color: #5D686E;">
                    <div style="width: 45px; height: 30px; background-color: #9d9999; color: white; position: relative; font-weight: bold">
                      <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">${Object.keys(thisVue.objStatesData)[thisVue.auxIdx]}</span>
                    </div>
                    <div style="width: 30px; height: 30px; background-color: #9d9999; color: white; position: relative; font-weight: bold">
                      <span id="total_${Object.keys(thisVue.objStatesData)[thisVue.auxIdx]}" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"></span>
                    </div>
                    <div style="width: 30px; height: 30px; background-color: #009757; color: white; position: relative; font-weight: bold">
                      <span id="noPrazo_${Object.keys(thisVue.objStatesData)[thisVue.auxIdx]}" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"></span>
                    </div>
                    <div style="width: 30px; height: 30px; background-color: #E8385F; color: white; position: relative; font-weight: bold">
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
        },
        dados: `T: ${this.objStatesData[state].total} | P: ${this.objStatesData[state].noPrazo} | A: ${this.objStatesData[state].atrasada}`
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
          document.getElementById(`total_${state}`).textContent = this.objStatesData[state].total;
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
