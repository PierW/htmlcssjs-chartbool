$(document).ready(init);

function getGraph(arr) {

  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    type : "line",
    data: {
      labels : ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
      datasets : [{
        label : "Fatturato",
        backgroundColor: "rgb(0,0,0,0.2)",
        borderColor: "rgb(97,206,79)",
        data : arr
      }]
    },
    options : {}
  });
}

function pushData() {

  $.ajax({
    url: "http://157.230.17.132:4021/sales",
    method: "GET",
    success: function(apiData, stato) {

      if (stato == "success") {

        var array = [0,0,0,0,0,0,0,0,0,0,0,0];

        for (var i = 0; i < apiData.length; i++) {

          var splitData = apiData[i].date.split("/");
          var month = Number(splitData[1]);
          var amount = apiData[i].amount;
              array[month-1] += amount;
        }

        getGraph(array);
      }
    },
    error: function(richiesta, stato, errori) {

      alert("Errore di connessione: " + errori);
    },
  });
}



function init() {

  pushData();
}
