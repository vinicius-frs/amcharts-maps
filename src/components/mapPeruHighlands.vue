<template>
  <div id="chartdiv"></div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_peruHighlandsLow from "@amcharts/amcharts5-geodata/peruHighlandsLow";

export default {
  name: 'mapPeru',
  props: {
  },
  data(){
    return {
      objStatesData: {
        APU: {color: am5.color("#009757"), lat: -4.772249, lon: -82.911071, noPrazo: 1, total: 2, atrasada: 3},
        AYA: {color: am5.color("#009757"), lat: -6.772249, lon: -82.911071, noPrazo: 1, total: 2, atrasada: 3},
        CAJ: {color: am5.color("#009757"), lat: -8.772249, lon: -82.911071, noPrazo: 1, total: 2, atrasada: 3},
        CUS: {color: am5.color("#009757"), lat: -10.772249, lon: -82.911071, noPrazo: 1, total: 2, atrasada: 3},
        HUC: {color: am5.color("#009757"), lat: -12.772249, lon: -82.911071, noPrazo: 1, total: 2, atrasada: 3},
        HUV: {color: am5.color("#009757"), lat: -4.772249, lon: -68.411071, noPrazo: 1, total: 2, atrasada: 3},
        JUN: {color: am5.color("#009757"), lat: -6.772249, lon: -68.411071, noPrazo: 1, total: 2, atrasada: 3},
        PAS: {color: am5.color("#009757"), lat: -8.772249, lon: -68.411071, noPrazo: 1, total: 2, atrasada: 3},
        PUN: {color: am5.color("#009757"), lat: -10.772249, lon: -68.411071, noPrazo: 1, total: 2, atrasada: 3},
        LKT: {color: am5.color("#009757"), lat: -12.772249, lon: -68.411071, noPrazo: 1, total: 2, atrasada: 3},
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
        geoJSON: am5geodata_peruHighlandsLow
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
