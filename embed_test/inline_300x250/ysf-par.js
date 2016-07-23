//establish environment variables for the ad-stack based on which widget is being called
(function() {
   var protocolToUse = (location.protocol == "https:") ? "https" : "http";
   var embedURL = protocolToUse + "://content.synapsys.us/embeds/inline_300x250/ysf-par.js";
   var widgetURL = "";
   var domain = (function() {
      var myHost = "";
      
      try {
         myHost = top.location.host;
      } catch (e) {}
      
      if (typeof(myHost) == 'undefined' || myHost == '') {
        var ref = "", w1=window, j=73;
        try {
            while(j--) {
                ref=w1.document.referrer;
                if(typeof(w1.$sf)!='undefined') window.$sf=w1.$sf;
                w1=w1.parent;
            }
        }
        catch (e2) {
            //always happen
            //console.log("Unhandled exception:", e2);
        }
        if(typeof(window.$sf)!='undefined')
        {
            // full host
            var matches = ref.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
            // if you need it, this regexp returns 2nd lavel domain in matches[1]
            //var matches = ref.match(/^https?\:\/\/(?:[^\/?#]+)\.([^\/?#\.]+\.[^\/?#\.]+)(?:[\/?#]|$)/i);
            var pref = matches && matches[1]; // domain will be null if no match is found
            if (pref != null) myHost = pref;            
        } 
      }
      var tempHost = myHost.split(".");
      switch (tempHost.length) {
         case 0:  //crash me, please
         case 1:  //crash me, please
            break;
         case 2:  //exactly what we want
            break;
         default: //break it down
            if ((tempHost[tempHost.length - 2] == "co" && tempHost[tempHost.length - 1] == "uk")
            || (tempHost[tempHost.length - 2] == "com" && tempHost[tempHost.length - 1] == "au")
            || (tempHost[tempHost.length - 2] == "go" && tempHost[tempHost.length - 1] == "com")) {
               myHost = tempHost[tempHost.length - 3] + "." + tempHost[tempHost.length - 2] + "." + tempHost[tempHost.length - 1];
            } else {
               myHost = tempHost[tempHost.length - 2] + "." + tempHost[tempHost.length - 1]; //no matter how many layers of subdomain there are, this should return only the domain
            }
            break;
      }
      
      return myHost;
   })();
   var adUnitName = domain.split(".").join("_") + "_finance_widget_300x250";
   
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
      remn: false, //if this is being served as a remnant
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
   
   //for IE 5-8 compatibility
   //From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
   if (!Object.keys) {
     Object.keys = (function() {
       'use strict';
       var hasOwnProperty = Object.prototype.hasOwnProperty,
           hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
           dontEnums = [
             'toString',
             'toLocaleString',
             'valueOf',
             'hasOwnProperty',
             'isPrototypeOf',
             'propertyIsEnumerable',
             'constructor'
           ],
           dontEnumsLength = dontEnums.length;

       return function(obj) {
         if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
           throw new TypeError('Object.keys called on non-object');
         }

         var result = [], prop, i;

         for (prop in obj) {
           if (hasOwnProperty.call(obj, prop)) {
             result.push(prop);
           }
         }

         if (hasDontEnumBug) {
           for (i = 0; i < dontEnumsLength; i++) {
             if (hasOwnProperty.call(obj, dontEnums[i])) {
               result.push(dontEnums[i]);
             }
           }
         }
         return result;
       };
     }());
   }
   
   var newScript = document.createElement("script");
   newScript.src = protocolToUse + "://content.synapsys.us/l/n/index-ysf.php?"+Object.keys(q).map(function(key){return encodeURIComponent(key)+"="+encodeURIComponent(q[key])}).join("&");
   currentScript.parentNode.insertBefore(newScript, currentScript);
   
})();

