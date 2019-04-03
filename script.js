$(document).ready(init);

function getGraph(arr) {

  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    type : "line",
    data: {
      labels : ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
      datasets : [{
        label : "Fatturato",
        backgroundColor: "rgb(97,206,79)",
        borderColor: "rgb(247,247,247)",
        data : arr
      }]
    },
    options : {}
  });
}

function init() {

var array = [1,2,3,4,5,6,7,8,9,10,11,12];
  getGraph(array);
}
