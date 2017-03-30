var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
var temp = location.search;
var query = {};
var target;
var href = window.top.location;

//Waits for the DOMContent to load
document.addEventListener("DOMContentLoaded", function(event) {
  if (temp != null) {
    getAPI();
  }
});

function getCategory(){

}

function getAPI(apiUrl){
  if (window.XMLHttpRequest) {
      var xhttp = new XMLHttpRequest();
  } else {
      var xhttp = new ActiveXObject('Microsoft.XMLHTTP')
  }
  xhttp.onreadystatechange = function() {
    console.log(this);
      if (this.readyState == XMLHttpRequest.DONE) {
          if (this.status == 200) {
              // r = JSON.parse(i.responseText);
              // c(u)
          } else {
              // var e = i.statusText;
              // if (i.status == 500) {
              //     try {
              //         e = JSON.parse(i.responseText).message
              //     } catch (t) {
              //         console.log('No JSON message')
              //     }
              // }
              // e = 'HTTP Error (' + i.status + '): ' + e;
              // if (n++ > 10) {
              //     throw e
              // }
              // setTimeout(m, 500)
          }
      }
  };

  xhttp.open("GET", apiUrl, true);
  xhttp.send();

  console.log(xhttp);
};
