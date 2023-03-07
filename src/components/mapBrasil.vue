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
      objStatesData: {
        AC: {color: am5.color("#252351"), lat: 4.122675, lon: -83.402303, noPrazo: 1, total: 2, atrasada: 3},
        AL: {color: am5.color("#FECA19"), lat: 1.722675, lon: -83.402303, noPrazo: 1, total: 2, atrasada: 3},
        AP: {color: am5.color("#252351"), lat: -0.622675, lon: -83.402303, noPrazo: 1, total: 2, atrasada: 3},
        AM: {color: am5.color("#252351"), lat: -3.022675, lon: -83.402303, noPrazo: 1, total: 2, atrasada: 3},
        BA: {color: am5.color("#FECA19"), lat: -5.372675, lon: -83.402303, noPrazo: 1, total: 2, atrasada: 3},
        CE: {color: am5.color("#FECA19"), lat: -7.772675, lon: -83.402303, noPrazo: 1, total: 2, atrasada: 3},
        DF: {color: am5.color("#E8385F"), lat: -10.122675, lon: -83.402303, noPrazo: 1, total: 2, atrasada: 3},
        ES: {color: am5.color("#009757"), lat: -12.422675, lon: -83.402303, noPrazo: 1, total: 2, atrasada: 3},
        GO: {color: am5.color("#E8385F"), lat: -14.722675, lon: -83.402303, noPrazo: 1, total: 2, atrasada: 3},
        MA: {color: am5.color("#FECA19"), lat: -17.022675, lon: -83.402303, noPrazo: 1, total: 2, atrasada: 3},
        MT: {color: am5.color("#E8385F"), lat: -19.322675, lon: -83.402303, noPrazo: 1, total: 2, atrasada: 3},
        MS: {color: am5.color("#E8385F"), lat: -21.522675, lon: -83.402303, noPrazo: 1, total: 2, atrasada: 3},
        MG: {color: am5.color("#009757"), lat: -23.722675, lon: -83.402303, noPrazo: 1, total: 2, atrasada: 3},
        PA: {color: am5.color("#252351"), lat: -25.872675, lon: -83.402303, noPrazo: 1, total: 2, atrasada: 3},
        PB: {color: am5.color("#FECA19"), lat: 4.122675, lon: -34.632773, noPrazo: 1, total: 2, atrasada: 3},
        PR: {color: am5.color("#5D686E"), lat: 1.722675, lon: -34.632773, noPrazo: 1, total: 2, atrasada: 3},
        PE: {color: am5.color("#FECA19"), lat: -0.622675, lon: -34.632773, noPrazo: 1, total: 2, atrasada: 3},
        PI: {color: am5.color("#FECA19"), lat: -3.022675, lon: -34.632773, noPrazo: 1, total: 2, atrasada: 3},
        RJ: {color: am5.color("#009757"), lat: -5.372675, lon: -34.632773, noPrazo: 1, total: 2, atrasada: 3},
        RN: {color: am5.color("#FECA19"), lat: -7.772675, lon: -34.632773, noPrazo: 1, total: 2, atrasada: 3},
        RS: {color: am5.color("#5D686E"), lat: -10.122675, lon: -34.632773, noPrazo: 1, total: 2, atrasada: 3},
        RO: {color: am5.color("#252351"), lat: -12.422675, lon: -34.632773, noPrazo: 1, total: 2, atrasada: 3},
        RR: {color: am5.color("#252351"), lat: -14.722675, lon: -34.632773, noPrazo: 1, total: 2, atrasada: 3},
        SC: {color: am5.color("#5D686E"), lat: -17.022675, lon: -34.632773, noPrazo: 1, total: 2, atrasada: 3},
        SP: {color: am5.color("#009757"), lat: -19.322675, lon: -34.632773, noPrazo: 1, total: 2, atrasada: 3},
        SE: {color: am5.color("#FECA19"), lat: -21.522675, lon: -34.632773, noPrazo: 1, total: 2, atrasada: 3},
        TO: {color: am5.color("#FECA19"), lat: -23.722675, lon: -34.632773, noPrazo: 1, total: 2, atrasada: 3},
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

    let brasilSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_brazilLow,
      })
    );
    
    brasilSeries.events.on("datavalidated", function() {
      chart.goHome();
    });

    brasilSeries.mapPolygons.template.setAll({
      tooltipText: "[BOLD]{name}[/]\n{dados}",
      interactive: true,
      templateField: "polygonSettings"
    });

    brasilSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color("#F89C1B")
    });

    brasilSeries.mapPolygons.template.events.on("click", (ev) => {
      var dataItem = ev.target.dataItem;
      brasilSeries.zoomToDataItem(dataItem);
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

    let brasilData = [];
    Object.keys(this.objStatesData).forEach(state => {
      brasilData.push({
        id: `BR-${state}`,
        polygonSettings: {
          fill: this.objStatesData[state].color
        },
        dados: `T: ${this.objStatesData[state].total} | P: ${this.objStatesData[state].noPrazo} | A: ${this.objStatesData[state].atrasada}`
      });

      if(this.objStatesData[state].lat && this.objStatesData[state].lon){
        pointSeries.pushDataItem({ latitude: this.objStatesData[state].lat, longitude: this.objStatesData[state].lon });
      }
    });
    brasilSeries.data.setAll(brasilData);

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
