$(document).ready(init);

// MILESTONE 1: STEP 1 SENZA MOMENT
// function getGraph(arr) {
//
//   var ctx = document.getElementById("myChart").getContext("2d");
//   var chart = new Chart(ctx, {
//     type : "line",
//     data: {
//       labels : ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
//       datasets : [{
//         label : "Fatturato",
//         backgroundColor: "rgb(0,0,0,0.2)",
//         borderColor: "rgb(97,206,79)",
//         data : arr
//       }]
//     },
//     options : {}
//   });
// }
//
// function pushData() {
//
//   $.ajax({
//     url: "http://157.230.17.132:4021/sales",
//     method: "GET",
//     success: function(apiData, stato) {
//
//       if (stato == "success") {
//
//         var array = [0,0,0,0,0,0,0,0,0,0,0,0];
//
//         for (var i = 0; i < apiData.length; i++) {
//
//           var splitData = apiData[i].date.split("/");
//           var month = Number(splitData[1]);
//           var amount = apiData[i].amount;
//               array[month-1] += amount;
//         }
//
//         getGraph(array);
//       }
//     },
//     error: function(richiesta, stato, errori) {
//
//       alert("Errore di connessione: " + errori);
//     },
//   });
// }

// MILESTONE 1: STEP 1 CON MOMENT

  function getApiData() {

    $.ajax({
      url: "http://157.230.17.132:4021/sales",
      method: "GET",
      success: (apiData, stato) => {

        if (stato == "success") {

          pushData2(apiData);
          countSalesman(apiData)
        }
      },
      error: (richiesta, stato,  errori) => {
        alert("Errore di connessione" + errori);
      },
    });
  }

function getObjectCounter() {

  var months = {};
  var mom = moment();
      mom.locale("it");

  for (var i = 0; i < 12; i++) {

        mom.month(i);
    var month = mom.format("MMMM");
        months[month] = 0;
  }
  return months;
}


function pushData2(object) {

  var counter = getObjectCounter();

  for (var i = 0; i < object.length; i++) {

    var element = object[i];
    var data = element.date;
    var amount = element.amount;

    var mom = moment(data, "DD/MM/YYYY");
    var month = mom.locale("it").format("MMMM");

    counter[month] += amount;
  }
  getGraph2(counter);
}

function getGraph2(object) {

  var monthArr = Object.keys(object);
  var amountArr = Object.values(object);

  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    type : "line",
    data : {
      labels : monthArr,
      datasets : [{
        label : "Fatturato",
        backgroundColor : "rgb(0,0,0,0.2)",
        borderColor : "rgb(97,206,79)",
        data : amountArr
      }]
    },
    option : {}
  });
}


// Milestone 1: step 2 (lanciata a riga 63)

function countSalesman(object) {

  var obj = {};

  for (var i = 0; i < object.length; i++) {

    var salesman = object[i].salesman;
    var eachAmount = object[i].amount;

    if (obj[salesman] == null) { //Se non esiste lo imposto a 0 (altrimenti darebbe errore: NaN)
      obj[salesman] = 0;
    }
    obj[salesman] += eachAmount;
  }
  getGraphCake(obj);
}

function getGraphCake(object) {

  var sellers = Object.keys(object);
  var amount = Object.values(object);

  var ctx = document.getElementById("myChart2").getContext("2d");
  var chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: sellers,
      datasets: [{
        label: "Ammontare Vendite",
        backgroundColor: ["rgb(255,99,132)",
                          "rgb(255,205,86)",
                          "rgb(54,162,235)",
                          "rgb(75,192,192)"],
        borderColor: "rgb(0,0,0)",
        data: amount
      }]
    },
    options: {
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var allData = data.datasets[tooltipItem.datasetIndex].data;
                                var tooltipLabel = data.labels[tooltipItem.index];
                                var tooltipData = allData[tooltipItem.index];
                                var total = 0;
                                for (var i in allData) {
                                    total += parseFloat(allData[i]); //Usato parseFloat nel caso i valori siano sottoforma di stringa (non è questo il caso)
                                }
                                var tooltipPercentage = Math.round((tooltipData / total) * 100);
                                return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage + '%)';
                            }
                        }
                    }
                }
  });
}

function init() {

  // pushData(); //Senza Moment
  getApiData(); //Con Moment
}
