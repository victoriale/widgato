//establish environment variables for the ad-stack based on which widget is being called
(function() {
   var protocolToUse = (location.protocol == "https:") ? "https" : "http";
   var embedURL = protocolToUse + "://content.synapsys.us/embeds/inline_300x250/partner.js";
   var widgetURL = "";
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
               myHost = tempHost[tempHost.length - 3] + "." + tempHost[tempHost.length - 2] + "." + tempHost[tempHost.length - 1];
            } else if (tempHost[tempHost.length - 3].indexOf("chatter") !== -1) {
               //for Tribune's Chatter sites
               myHost = tempHost[tempHost.length - 3] + "." + tempHost[tempHost.length - 2] + "." + tempHost[tempHost.length - 1];
            } else {
               myHost = tempHost[tempHost.length - 2] + "." + tempHost[tempHost.length - 1]; //no matter how many layers of subdomain there are, this should return only the domain
            }
            break;
      }
      return myHost;
   })();
   //set temp domain just incase to keep the original domain name
   var tempDom = domain;
   tempDom = domain.toLowerCase();

   //determines if the current domain partner or remnant
   //if we are on finance partner site and set the remnant and adUnitName variables
   if(tempDom == 'myhomerunzone.com'){
      domain = top.location.pathname.split('/')[1];
      var boolRemn = false;
      var adUnitName = domain.split(".").join("_") + "_sports_widget_300x250";
   }else{
      var boolRemn = true;
      var adUnitName = domain.split(".").join("_") + "_remnant_300x250";
   }

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
      cat: "",
      type: "finance_inline",  //the widget's type
      subd: false,   //deprecated; intended to indicate if this was going to show up on the old finance subdomains
      remn: boolRemn, //if this is being served as a remnant
      src: embedURL, //this
      name: adUnitName,
      widU: widgetURL,  //full url to the widget's live code
      widW: 0,  //the widget's width
      widH: 0,  //the widget's height
      adW: 300,  //the ad's width
      adH: 250,  //the ad's height
      ofx: 0,  //offset in the X direction that the ad-stack needs to be adjusted to match the designated ad-space for this widget
      ofy: 0,  //offset in the Y direction that the ad-stack needs to be adjusted to match the designated ad-space for this widget
      rand: Math.random() * 10000000000000000000,
   }

   var newScript = document.createElement("script");
   newScript.src = protocolToUse + "://content.synapsys.us/l/n/index-mdb.php?"+Object.keys(q).map(function(key){return encodeURIComponent(key)+"="+encodeURIComponent(q[key])}).join("&");
   currentScript.parentNode.insertBefore(newScript, currentScript);

})();
