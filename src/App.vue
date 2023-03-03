<template>
  <div class="header">
    <div class="p-relative filtro">
      <div class="p-center"><font-awesome-icon icon="fa-solid fa-filter" /></div>
    </div>
    <div class="p-relative hora">
      <div class="p-center">{{hora}}</div>
    </div>
    <div class="p-relative data">
      <div class="p-center-data">{{data}}</div>
    </div>
    <div class="p-relative logo">
      <img class="p-center-logo" src="./assets/runtec_logo.png">
    </div>
  </div>
  <mapPeru/>
</template>

<script>
import mapPeru from './components/mapPeru.vue'

export default {
  name: 'App',
  components: {
    mapPeru,
  },
  data(){
    return {
      hora: undefined,
      data: undefined,
      objWeekDay: {
        0: "DOM",
        1: "SEG",
        2: "TER",
        3: "QUA",
        4: "QUI",
        5: "SEX",
        6: "SAB",
      },
      objMonth: {
        0: "JANEIRO",
        1: "FEVEREIRO",
        2: "MARÇO",
        3: "ABRIL",
        4: "MAIO",
        5: "JUNHO",
        6: "JULHO",
        7: "AGOSTO",
        8: "SETEMBRO",
        9: "OUTRUBRO",
        10: "NOVEMBRO",
        11: "DEZEMBRO",
      },
    }
  },
  mounted(){
    let auxDataHora = new Date();

    this.hora = `${auxDataHora.getHours() < 10 ? "0"+auxDataHora.getHours() : auxDataHora.getHours()}:${auxDataHora.getMinutes() < 10 ? "0"+auxDataHora.getMinutes() : auxDataHora.getMinutes()}`;
    setInterval(() => {
      let auxDataHora = new Date();
      this.hora = `${auxDataHora.getHours() < 10 ? "0"+auxDataHora.getHours() : auxDataHora.getHours()}:${auxDataHora.getMinutes() < 10 ? "0"+auxDataHora.getMinutes() : auxDataHora.getMinutes()}`;
    }, 1000);

    this.data = `${this.objWeekDay[auxDataHora.getDay()]}, ${auxDataHora.getDate() < 10 ? "0"+auxDataHora.getDate() : auxDataHora.getDate()} DE ${this.objMonth[auxDataHora.getMonth()]} DE ${auxDataHora.getFullYear()}`
    setInterval(() => {
      let auxDataHora = new Date();
      this.data = `${this.objWeekDay[auxDataHora.getDay()]}, ${auxDataHora.getDate() < 10 ? "0"+auxDataHora.getDate() : auxDataHora.getDate()} DE ${this.objMonth[auxDataHora.getMonth()]} DE ${auxDataHora.getFullYear()}`
    }, 60000);
  }
}
</script>

<style>
body{
  margin: 0;
}
.header{
  height: 10vh;
  width: 100vw;
  background-color: #252351;
  color: white;
  font-size: 150%;
  display: flex;
}
.p-relative{
  height: 100%;
  position: relative;
}
.p-center{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.p-center-data{
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
}
.p-center-logo{
  height: 60%;
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
}
.filtro{
  height: 100%;
  width: 5%;
}
.hora{
  height: 100%;
  width: 10%;
  background-color: white;
  color: #252351;
}
.data{
  height: 100%;
  width: 50%;
}
.logo{
  height: 100%;
  width: 35%;
}
#chartdiv{
  background-color: #3aa6ff;
}
</style>
