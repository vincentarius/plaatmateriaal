apikey = "5eb84e82ce64705c9963f8a1";
getPlaatmateriaal = {
    "async": true,
    "crossDomain": true,
    "url": "https://plaatmateriaal-e1ed.restdb.io/rest/plaatmateriaaltype",
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": apikey,
      "cache-control": "no-cache"
    }
};

function lijstPlaatmateriaal() { 
  $.ajax(getPlaatmateriaal).done(function (response) {
    var txt = ""
    for ( let i = 0 ; i < response.length ; i++ ) {
      txt += "<option " + "value=" + response[i]._id + ">" + response[i].plaatmateriaaltype;
    }
    document.getElementById("plaatmateriaalSelectie").innerHTML = txt;
  });   
  toonVoorraad();     
};

function voegToePlaatmateriaal() {
  var x = document.getElementById("mySubmit").value;

    var jsondata = {"plaatmateriaaltype": x};
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://plaatmateriaal-e1ed.restdb.io/rest/plaatmateriaaltype",
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "x-apikey": apikey,
        "cache-control": "no-cache"
      },
      "processData": false,
      "data": JSON.stringify(jsondata)
    }
    
    $.ajax(settings).done(function (response) {
      document.getElementById("toevoegBevestiging").innerHTML = response["plaatmateriaaltype"] + " is toegevoegd!";
    });
    lijstPlaatmateriaal();
    document.getElementById("mySubmit").value = "";
};

function verwijderPlaatmateriaal() {
  var e = document.getElementById("plaatmateriaalSelectie");
  var keuzeNaam = e.options[e.selectedIndex].text;
  var keuze = e.options[e.selectedIndex].value;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://plaatmateriaal-e1ed.restdb.io/rest/plaatmateriaaltype/" + keuze,
        "method": "DELETE",
        "headers": {
          "content-type": "application/json",
          "x-apikey": apikey,
          "cache-control": "no-cache"
        }
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        document.getElementById("toevoegBevestiging").innerHTML = keuzeNaam +  " Is verwijderd."
      });
      lijstPlaatmateriaal();
}

function toonVoorraad() {
  var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://plaatmateriaal-e1ed.restdb.io/rest/voorraad",
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "x-apikey": apikey,
        "cache-control": "no-cache"
      }
    }
    
    $.ajax(settings).done(function (response) {
      
      txt = "<table border='1'> <tr><th>Plaatmateriaaltype</th><th>lengte</th><th>breedte</th><th>dikte</th><th>aantal</th></tr>"
      for (x in response) {
        txt += "<tr>";
        txt += "<td>" + response[x].plaatmateriaaltype + "</td>"
             + "<td>" + response[x].lengte + "</td>"
             + "<td>" + response[x].breedte + "</td>"
             + "<td>" + response[x].dikte + "</td>"
             + "<td>" + response[x].aantal + "</td>";
        txt += "</tr>"
      }
      txt += "</table>"    
      document.getElementById("voorraad").innerHTML = txt;
      });
      // var txt = ""
      // for ( let i = 0 ; i < response.length ; i++ ) {
      //   txt += "<div>" + response[i].aantal + " stuks " + response[i].plaatmateriaaltype + " van " + response[i].lengte + " lang en " + response[i].breedte + " breed en " + response[i].dikte + " dik";
      // }
      // document.getElementById("voorraad").innerHTML = txt;

};

function voegToeAanVoorraad() {
  var e = document.getElementById("plaatmateriaalSelectie");
  var keuze = e.options[e.selectedIndex].text;
  var lengte = document.getElementById("lengte").value;
  var breedte = document.getElementById("breedte").value;
  var dikte = document.getElementById("dikte").value;
  var aantal = document.getElementById("aantal").value;
  
  var jsondata = {"lengte":lengte,"breedte":breedte,"dikte":dikte,"aantal":aantal,"plaatmateriaaltype": keuze};
  
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://plaatmateriaal-e1ed.restdb.io/rest/voorraad",
    "method": "POST",
    "headers": {
      "content-type": "application/json",
      "x-apikey": apikey,
      "cache-control": "no-cache"
    },
    "processData": false,
    "data": JSON.stringify(jsondata)
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
  toonVoorraad();
};