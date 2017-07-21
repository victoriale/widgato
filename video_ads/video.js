var embedURL = "truvid.js";
var currentScript = document.currentScript || (function() {
  var scripts = document.getElementsByTagName('script');
  for ( var i = scripts.length - 1; i >= 0; i-- ) {
    if ( scripts[i].src.indexOf(embedURL) != -1 ) {
      return scripts[i];
    }
  }
})();
var input;
if (decodeURIComponent(location.search.substr(1)) != null && decodeURIComponent(location.search.substr(1)) != "") {
  try {
    input = JSON.parse(decodeURIComponent(location.search.substr(1)));
  }
  catch(e) {
    console.log("Page level query string JSON invalid. Falling back to embed query string");
    var queryString = currentScript.src.split(embedURL+"?")[1];
    if (queryString != "" && queryString != null) {
      try {
        input = JSON.parse(decodeURI(queryString));
      }
      catch(e) {
        console.log("Embed level query string JSON invalid");
        console.log(e);
      }
    }
  }
}
else {
  var queryString = currentScript.src.split(embedURL+"?")[1];
  if (queryString != "" && queryString != null) {
    try {
      input = JSON.parse(decodeURI(queryString));
    }
    catch(e) {
      console.log("Embed level query string JSON invalid");
      console.log(e);
    }
  }
}
function sendPostMessageToIgloo(postObject, maxLoops) {
  // Initialize variables
  var postWindows = [window];
  var currentWindow = window;
  var currentLoop = 0;
  maxLoops = typeof maxLoops === 'undefined' ? 10 : maxLoops;

  // Build all of the windows to send the message to
  try {
    // Loop through all of the windows
    while ( currentLoop++ < maxLoops && currentWindow !== window.top ) {
      // Move up a layer
      currentWindow = currentWindow.parent;

      // Add to the postMessage array
      postWindows.push(currentWindow);

    }
  } catch (e) {}
  // Send the post messages
  for ( var i = 0; i < postWindows.length; i++ ) {
    postWindows[i].postMessage(postObject, '*');
  }
}
window.addEventListener("message", receiveMessage, false);
function receiveMessage(event) {
  console.log(event);
  if (typeof event.data === "string" && event.data.indexOf("truvid") != -1 && event.data.indexOf("playerLoaded") != -1) {
    if (input.event) { // if we are in igloo v3 or >
      // send the event identifiers to yeti analytics
      input.event.event = "videoplayer-loaded";
      sendPostMessageToIgloo({action: 'snt_tracker', snt_data: input.event}, 10);
    }
  }
}
var friendlyIframe = document.createElement('iframe');
//create friendly iframe to place ourselves inside
friendlyIframe.className = "SNTVideoIframe"
friendlyIframe.width = '300';
friendlyIframe.height = '250';
friendlyIframe.src = 'about:blank';
friendlyIframe.style.border = 'none';
currentScript.parentNode.insertBefore(friendlyIframe, currentScript);
var iframeContent = friendlyIframe.contentWindow;
var doc = iframeContent.document;
doc.write('<body style="margin:0;"><scr'+'ipt type="text/javascript" src="http://stg.truvidplayer.com/index.php?sub_user_id=188&widget_id=1706&playlist_id=1297&cb='+(Math.random()*10000000000000000)+'"></scr'+'ipt></body>');
