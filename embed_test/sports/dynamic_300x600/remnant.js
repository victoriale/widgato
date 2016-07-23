//establish environment variables for the ad-stack based on which widget is being called
(function() {
   var protocolToUse = (location.protocol == "https:") ? "https" : "http";
   var embedURL = protocolToUse + "://content.synapsys.us/embeds/sports/dynamic_300x600/remnant.js";
   var widgetURL = protocolToUse + "://w1.synapsys.us/widgets/dynamic_widget/dynamic_widget.html";
   var domain = (function() {
      var myHost = top.location.host;
      var tempHost = myHost.split(".");
      switch (tempHost.length) {
         case 0:  //crash me, please
         case 1:  //crash me, please
            break;
         case 2:  //exactly what we want
            break;
         default: //break it down
            //AT&T uses att.yahoo.com, so here's the exception to avoid a collision with yahoo.com
            if (tempHost[tempHost.length - 3] == "att" && tempHost[tempHost.length - 2] == "yahoo" && tempHost[tempHost.length - 1] == "com") {
               myHost = "att.yahoo.com";
            } else if ((tempHost[tempHost.length - 2] == "co" && tempHost[tempHost.length - 1] == "uk")
            || (tempHost[tempHost.length - 2] == "com" && tempHost[tempHost.length - 1] == "au")
            || (tempHost[tempHost.length - 2] == "go" && tempHost[tempHost.length - 1] == "com")) {
               myHost = tempHost[tempHost.length - 3] + "." + tempHost[tempHost.length - 2] + "." + tempHost[tempHost.length - 1]; //for compatibility with all co.uk TLDs
            } else {
               myHost = tempHost[tempHost.length - 2] + "." + tempHost[tempHost.length - 1]; //no matter how many layers of subdomain there are, this should return only the domain
            }
            break;
      }
      return myHost;
   })();
   var adUnitName = domain.split(".").join("_") + "_remnant_300x250";
   
   var currentScript = document.currentScript || (function() {
      var scripts = document.getElementsByTagName("script");
      for (var i = scripts.length - 1; i >= 0; i--) {
         if (scripts[i].src.indexOf(embedURL) != -1) {
            return scripts[i];
         }
      }
   })();
      
   var q = {
      dom: domain,   //the domain according to the client
      cat: "mlb",
      type: "dynamic_mlb",
      subd: false,   //deprecated; intended to indicate if this was going to show up on the old finance subdomains
      remn: true, //if this is being served as a remnant
      src: embedURL, //this
      name: adUnitName,
      widU: widgetURL,  //full url to the widget's live code
      widW: 300,  //the widget's width
      widH: 350,  //the widget's height
      adW: 300,  //the ad's width
      adH: 250,  //the ad's height
      ofx: 0,  //offset in the X direction that the ad-stack needs to be adjusted to match the designated ad-space for this widget
      ofy: 350,  //offset in the Y direction that the ad-stack needs to be adjusted to match the designated ad-space for this widget
      rand: Math.random() * 10000000000000000000,
   }
   
   var newScript = document.createElement("script");
   newScript.src = protocolToUse + "://content.synapsys.us/l/n/index-mdb.php?"+Object.keys(q).map(function(key){return encodeURIComponent(key)+"="+encodeURIComponent(q[key])}).join("&");
   currentScript.parentNode.insertBefore(newScript, currentScript);
   
})();
