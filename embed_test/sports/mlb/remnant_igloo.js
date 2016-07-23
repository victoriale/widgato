/**
 * @function
 * This function creates and inserts the embed code for the igloo ad rotator.
 *
 * @author William Klausmeyer @ SNT Media
 */
(function(){
  // Build the basic parts of the query that will be the same no matter what
  var embed_query = {
    "type": "dynamic_mlb",
    "adW": "300",
    "adH": "250",
    "widW": "300",
    "widH": "350",
    "remn": true,
    "rand": Math.round(Math.random() * Math.pow(10, 10))
  };

  // Get the DOM portion of the URL
  embed_query.dom = (function(){
    // Set variables
    var topHost = top.location.host.split(".");
    var dom = false;
    var len = topHost.length;
    // Parse the host
    switch ( len ) {
      case 0:
      case 1:
        // Break. Some error.
        break;
      case 2:
        // Exactly the info we want
        dom = topHost.join(".");
        break;
      default:
        // Handle 3+ sections
        if ( topHost[len - 2] == "co" && topHost[len - 1] == "uk" ) {
          dom = topHost.splice(len - 3, 3).join(".");
        } else {
          dom = topHost.splice(len - 2, 2).join(".");
        }
    }
    // Return the dom (if found)
    if ( dom !== false ) {
      return dom;
    }
  })();

  // Get the current script
  var currentScript = document.currentScript || (function() {
    var scripts = document.getElementsByTagName("script");
    for ( var i = 0; i < scripts.length; i++ ) {
      if ( scripts[i].src.indexOf(embed_query.src) != -1 ) {
        return scripts[i];
      }
    }
  })();

  // Create the query string
  var query_string = Object.keys(embed_query).map(function(key){
    return encodeURIComponent(key) + "=" + encodeURIComponent(embed_query[key]);
  }).join("&");

  // Create and insert the igloo script
  var script = document.createElement("script");
  script.src = "//content2.synapsys.us/l/n/igloo.php?" + query_string;
  currentScript.parentNode.insertBefore(script, currentScript);

  // Delete the script embed so IE doesn't put too many items on the same place
  currentScript.parentNode.removeChild(currentScript);
})();
