<template>
  <div id="chartdiv"></div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_peruLow from "@amcharts/amcharts5-geodata/peruRuntecLow";

export default {
  name: 'mapPeru',
  props: {
  },
  data(){
    return {
      objStatesData: {
        AM: {color: am5.color("#252351"), lat: -1.602249, lon: -85.911071, noPrazo: 1, total: 2, atrasada: 3},
        AN: {color: am5.color("#E8385F"), lat: -2.702249, lon: -85.911071, noPrazo: 4, total: 5, atrasada: 6},
        AP: {color: am5.color("#009757"), lat: -3.772249, lon: -85.911071, noPrazo: 1, total: 2, atrasada: 3},
        AR: {color: am5.color("#009757"), lat: -4.842249, lon: -85.911071, noPrazo: 1, total: 2, atrasada: 3},
        AY: {color: am5.color("#009757"), lat: -5.912249, lon: -85.911071, noPrazo: 1, total: 2, atrasada: 3},
        CJ: {color: am5.color("#E8385F"), lat: -6.992249, lon: -85.911071, noPrazo: 1, total: 2, atrasada: 3},
        CA: {color: am5.color("#5D686E"), lat: -8.062249, lon: -85.911071, noPrazo: 1, total: 2, atrasada: 3},
        CU: {color: am5.color("#009757"), lat: -9.122249, lon: -85.911071, noPrazo: 1, total: 2, atrasada: 3},
        HU: {color: am5.color("#FECA19"), lat: -10.192249, lon: -85.911071, noPrazo: 1, total: 2, atrasada: 3},
        HC: {color: am5.color("#FECA19"), lat: -11.252249, lon: -85.911071, noPrazo: 1, total: 2, atrasada: 3},
        IC: {color: am5.color("#009757"), lat: -12.312249, lon: -85.911071, noPrazo: 1, total: 2, atrasada: 3},
        JU: {color: am5.color("#FECA19"), lat: -13.372249, lon: -85.911071, noPrazo: 1, total: 2, atrasada: 3},
        LL: {color: am5.color("#E8385F"), lat: -14.422249, lon: -85.911071, noPrazo: 1, total: 2, atrasada: 3},
        LA: {color: am5.color("#E8385F"), lat: -15.472249, lon: -85.911071, noPrazo: 1, total: 2, atrasada: 3},
        LI: {color: am5.color("#5D686E"), lat: -1.602249, lon: -68.411071, noPrazo: 1, total: 2, atrasada: 3},
        LP: {color: am5.color("#5D686E"), lat: -2.702249, lon: -68.411071, noPrazo: 1, total: 2, atrasada: 3},
        LO: {color: am5.color("#252351"), lat: -3.772249, lon: -68.411071, noPrazo: 1, total: 2, atrasada: 3},
        MA: {color: am5.color("#252351"), lat: -4.842249, lon: -68.411071, noPrazo: 10, total: 20, atrasada: 30},
        MO: {color: am5.color("#009757"), lat: -5.912249, lon: -68.411071, noPrazo: 1, total: 2, atrasada: 3},
        PA: {color: am5.color("#FECA19"), lat: -6.992249, lon: -68.411071, noPrazo: 1, total: 2, atrasada: 3},
        PI: {color: am5.color("#E8385F"), lat: -8.062249, lon: -68.411071, noPrazo: 1, total: 2, atrasada: 3},
        PU: {color: am5.color("#009757"), lat: -9.122249, lon: -68.411071, noPrazo: 1, total: 2, atrasada: 3},
        SA: {color: am5.color("#252351"), lat: -10.192249, lon: -68.411071, noPrazo: 4, total: 5, atrasada: 6},
        TA: {color: am5.color("#009757"), lat: -11.252249, lon: -68.411071, noPrazo: 1, total: 2, atrasada: 3},
        TU: {color: am5.color("#E8385F"), lat: -12.312249, lon: -68.411071, noPrazo: 1, total: 2, atrasada: 3},
        UC: {color: am5.color("#252351"), lat: -13.372249, lon: -68.411071, noPrazo: 1, total: 2, atrasada: 3},
        LT: {color: am5.color("#009757"), lat: -14.422249, lon: -68.411071, noPrazo: 1, total: 2, atrasada: 3},
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
        geoJSON: am5geodata_peruLow
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
                    <div style="width: 30px; height: 30px; background-color: #9d9999; color: white; position: relative; font-weight: bold">
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
