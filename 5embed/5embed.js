var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
var temp = location.search;
var query = {};
var target;
var href = window.top.location;
var currentIndex = 0;
var widgetData;
var tries = 0;
//Waits for the DOMContent to load
document.addEventListener("DOMContentLoaded", function(event) {
  console.log('DOM LOADED');
  /*
  create function to get API
  */
  var apiUrl = "http://dw.synapsys.us/list_api.php?partner=latimes.com&cat=mlb&rand=27";
  var test = runAPI(apiUrl);
  console.log(test);

  onLoad()
});

function setCategoryColors(category){

}

/**
* @function onLoad
* Once the DOM has loaded, Adds a function to the "onLoad" event OR runs the function if the page is
* already loaded
*
* @param function func - The function to run when the page has loaded
*/
function onLoad(func) {
  if ( document.readyState == "complete" || document.readyState == "interactive" ) {
    func();
  } else if ( document.addEventListener ) {
    document.addEventListener('DOMContentLoaded', func);
  } else if ( document.attachEvent ) {
    document.attachEvent('onreadystatechange', function(){
      if ( document.readyState == "complete" ) {
        func();
      }
    });
  }
} // --> onLoad

/**
* @function runAPI
* function that makes an asynchronous request using http and setting a global variable equal to the response of the text.
* fail safe of retrying 10 times before sending error message
*
* @param function apiUrl -
*/
function runAPI(apiUrl){
  //variable that stores the response of an http request
  if (window.XMLHttpRequest) {
      var xhttp = new XMLHttpRequest();
  } else {
      var xhttp = new ActiveXObject('Microsoft.XMLHTTP')
  }
  xhttp.onreadystatechange = function() {
      if (this.readyState == XMLHttpRequest.DONE) {
          if (this.status == 200) {
              // On success parse out the response
              widgetData = JSON.parse(this.responseText);
              // onLoad(func);//send in the name of the function that needs to be ran once data has been confirmed
              console.log(widgetData);
              return widgetData;
          } else {
              // Error handling
              // Get the message
              var msg = this.statusText;
              if (this.status == 500) {
                  try {
                      msg = JSON.parse(this.responseText).message
                  } catch (e) {
                      console.log('No JSON message')
                  }
              }
              msg = 'HTTP Error (' + this.status + '): ' + msg;
              if (tries++ > 10) {
                  throw msg
              }
              setTimeout(runAPI(apiUrl), 500)
          }
      }
  };

  xhttp.open("GET", apiUrl, true);
  xhttp.send();
};



function createWidget() {
  console.log('creating Widget');
  console.log(widgetData);

  // // Display the first item
  // di();
} // --> create_widget
