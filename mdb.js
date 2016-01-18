console.log("pnsports?");(function() {
   //local constants
   var CLICKY_ID = "",
      PF_WIDGET_URL = "file:///C:/Users/User/Desktop/Work/SNT-Widgets/w_sports/ai_article.html?%7B%22dom%22%3A%22businessinsider.com%22%2C%22loc%22%3A%7B%22loc%22%3A%7B%22nfl%22%3A%5B%5D%7D%7D%2C%22c_id%22%3Anull%2C%22remn%22%3A%22true%22%2C%22bord%22%3A%22false%22%7D",
      PF_WIDGET_EMBED_SRC = "file:///C:/Users/User/Desktop/Work/SNT-Widgets/remnant.js",
      PF_WIDGET_WIDTH = "300",
      PF_WIDGET_HEIGHT = "600",
      PF_WIDGET_TYPE = "sports_ai_article",
      PF_WIDGET_OFFSET_X = "0",
      PF_WIDGET_OFFSET_Y = "0",
      AD_STACK_WIDTH = "300",
      AD_STACK_HEIGHT = "250",
      AD_STACK_OFFSET_X = "0",
      AD_STACK_OFFSET_Y = "-250",
      AD_UNIT_NAME = "businessinsider_com_remnant_300x250",
      REALVU_CONFIG = {s: "300x250", c: "E115", p: "3173"},
      OPENX_AUID = "538098529",
      OPENX_CS = "2ef73de7e0",
      BREAL_ID = "",
      CRITEO_ZONEID = "283548",
      RUBICON_KW = "businessinsider_com_remnant_300x250",
      RUBICON_SITE = "73308",
      RUBICON_ZONESIZE = "347680-15",
      NATIVE_CHANNEL_ID = "",
      SOVRN_ZONE_ID = "320026";

   var protocolToUse = (location.protocol == "https:") ? "https" : "http";
   var pathForSecure = (location.protocol == "https:") ? "s" : "l";
   

   var activate_tracker = function(attachToMe) {
      trackerSource = protocolToUse + "://content.synapsys.us/t/1436337860/tracker-rem.js"; //insert Clicky
      _$('<script src="//static.getclicky.com/js" type="text/javascript"></script>').appendTo(attachToMe);
      setTimeout(function() {
         _$('<script type="text/javascript">try{ clicky.init(' + CLICKY_ID + '); }catch(e){console.log(e)}</script>').appendTo(attachToMe);
      }, 1000);
   
      //tracker version is used for directory structure, to defeat caching
      var scripts = document.getElementsByTagName("script");
      var i;  //only one tracker per page, please
      for (i = 0; i < scripts.length && scripts[i].src != trackerSource; i++) {}
      if (scripts[i] == undefined || scripts[i].src != trackerSource) {
         //add tracker script
         _$("<script></script>", {src: trackerSource}).appendTo(attachToMe);

         //add geo script
         // if (Math.floor(Math.random() * 10000) < 1) {
            // _$("<script></script>", {src: protocolToUse + "://api.synapsys.us/etc/gc/"}).appendTo(attachToMe);
         // }
      }
   };

   
   var _$,
      currentScript = document.currentScript || (function() {
         var scripts = document.getElementsByTagName("script");
         for (var i = scripts.length - 1; i >= 0; i--) {
            if (scripts[i].src.indexOf(PF_WIDGET_EMBED_SRC) != -1) {
               return scripts[i];
            }
         }
      })();

   if (window.jQuery === undefined || window.jQuery.fn.jquery !== "2.1.4") {
      var st = document.createElement("script");
      st.setAttribute("type","text/javascript");
      st.setAttribute("src", protocolToUse + "://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js");

      if (st.readyState) {
         st.onreadystatechange = function () {  //
            if (this.readyState == "complete" || this.readyState == "loaded") { scriptLoadHandler(); }
         };
      } else { st.onload = scriptLoadHandler; }

      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(st);
   } else {
      _$ = window.jQuery;
      main();
   }


   function scriptLoadHandler() {
      _$ = window.jQuery.noConflict(true);
      main();
   }


   // clean up the main function, please
   function main() {
      var div_main_widget,
         ifr_main_widget,
         div_ad_stack,
         div_ad_queue = [],
         cycleQueue,
         clearQueue,
         dequeue_ad,
         passback = false,
         receivePassbackCall,
         setupPassbackCatcher,
         paint_house,
         paint_realvu,
         pattern_realvu_div = "div_realvu_ad_",
         pattern_realvu_ifr = "ifr_realvu_ad_",
         paint_openx,
         pattern_openx_div = "div_openx_ad_",
         // pattern_openx_ifr = "ifr_openx_ad_",
         paint_ims,
         pattern_ims_div = "div_ims_ad_",
         pattern_ims_ifr = "ifr_ims_ad_",
         paint_breal,
         pattern_breal_div = "div_breal_ad_",
         pattern_breal_ifr = "ifr_breal_ad_",
         paint_conversant,
         pattern_conversant_div = "div_conversant_ad_",
         pattern_conversant_ifr = "ifr_conversant_ad_",
         paint_criteo,
         pattern_criteo_div = "div_criteo_ad_",
         pattern_criteo_ifr = "ifr_criteo_ad_",
         paint_rubicon,
         pattern_rubicon_div = "div_rubicon_ad_",
         pattern_rubicon_ifr = "ifr_rubicon_ad_",
         paint_native,
         pattern_native_div = "div_native_ad_",
         pattern_native_ifr = "ifr_native_ad_",
         paint_sovrn,
         pattern_sovrn_div = "div_sovrn_ad_",
         pattern_sovrn_ifr = "ifr_sovrn_ad_",
         randNum,
         timer_queue_paint = null,
         timer_passback_catcher = null,
         timer_onLoad = null,
         timer_visibility = null,
         timer_adCycle = null,
         timer_realvu = null,
         timer_openx = null,
         timer_ims = null,
         show_div,
         playAdCycle,
         hoverTrigger,
         isElementVisible,
         checkVisibility,
         prevOnDisplay = "none",
         adOnDisplay = "none",
         onLoad = {  //upon initial load
            iter: 0,
            order: [
               'realvu',
'criteo',
'openx'            ],
            timing: [
               19000 + Math.ceil(Math.random() * 2000),
9000 + Math.ceil(Math.random() * 2000),
40000 + Math.ceil(Math.random() * 20000)            ],
            replay: false
         },
         onHover = { //upon widget mouse-over
            iter: 0,
            order: [
               'criteo',
'realvu'            ],
            timing: [
               9000 + Math.ceil(Math.random() * 2000),
19000 + Math.ceil(Math.random() * 2000)            ],
            replay: true
         },
/*          onLowVis = {   //when ad area leaves the screen
            iter: 0,
            order: [
               "house"
            ],
            timing: [
               delay_standard
            ],
            replay: false
         }, */
         onVisible = {  //when ad area enters the screen
            iter: 0,
            order: [
               'criteo',
'realvu'            ],
            timing: [
               9000 + Math.ceil(Math.random() * 2000),
19000 + Math.ceil(Math.random() * 2000)            ],
            replay: true   //whether the onVisible cycle should repeat continuously
         },
         delay_paint = 1,  //how much time allowed for pre-loading ads
         delay_visibility = 3500,   //how much time to wait before running the onVisible
         delay_onLoad = onLoad.timing.reduce(function(a, b) {  //how much time the initial ad displays
            return a + b;
         }),
         delay_standard = 33000, //how much time to display standard ads
         delay_realvu = 33000,
         delay_openx = 33000,
         delay_ims = 33000,
         delay_breal = 33000,
         delay_conversant = 33000,
         delay_criteo = 33000,
         browserVisible = true,
         getTopIframe;

      _$(window).load(function() {
         window.loaded = true;
      });


      randNum = function() {
         return Math.floor((Math.random() * 99999) + 10000);
      };


      div_main_widget = _$("<div></div>", {
         id: "div_pfwidget_" + PF_WIDGET_TYPE + randNum(),
         "ad_unit_name": AD_UNIT_NAME
      }).css({
         display: "block",
         height: PF_WIDGET_HEIGHT,
         width: PF_WIDGET_WIDTH,
         margin: 0,
         border: 0,
         overflow: "hidden",
         position: "relative",
         backgroundColor: "#fff",
      }).insertBefore(_$(currentScript));

      if (PF_WIDGET_HEIGHT > 0) {   //for ad-stack only implementations
         ifr_main_widget = _$("<iframe></iframe>", {
            id: "ifr_pfwidget_" + PF_WIDGET_TYPE,
            frameBorder: "0",
            scrolling: "no",
            allowTransparency: "true",
            src: PF_WIDGET_URL
         }).css({
            display: "block",
            height: PF_WIDGET_HEIGHT,
            width: PF_WIDGET_WIDTH,
            margin: 0,
            "margin-left": PF_WIDGET_OFFSET_X + "px",
            "margin-top": PF_WIDGET_OFFSET_Y + "px",
            border: 0,
            overflow: "hidden"
         }).appendTo(div_main_widget);
      }


      //no ad-stack height means no ad-stack; widget only
      if (AD_STACK_HEIGHT > 0) {
         div_ad_stack = _$("<div></div>", {
            id: "div_ad_stack_" + randNum()
         }).css({
            width: AD_STACK_WIDTH,
            height: AD_STACK_HEIGHT,
            overflow: "hidden",
            position: "relative",
            margin: 0,
            "margin-left": AD_STACK_OFFSET_X + "px",
            "margin-top": AD_STACK_OFFSET_Y + "px",
            backgroundColor: "#fff",
            "background-repeat": "no-repeat",
            "background-position": "center",
            "background-image": "none"
         }).insertAfter(div_main_widget);
      }


      // activate_tracker(div_ad_stack);
      activate_tracker(div_main_widget);


      //adds the specified ad to the queue, and after the specified delay, at the specified z-index, simultaneously displays the new ad and removes the old ad (if any)
      cycleQueue = function(ad_network, zInd, delay) {
         if (prevOnDisplay == "none" || (adOnDisplay == "onHover" && prevOnDisplay != "onHover")) {
            delay = 0;
         } else {
            delay = delay || delay_paint;
         }

         switch (ad_network) {
            case "house":
               div_ad_queue.push(paint_house(zInd));
               break;
            case "realvu":
               div_ad_queue.push(paint_realvu(zInd));
               break;
            case "openx":
               div_ad_queue.push(paint_openx(zInd));
               break;
            case "ims":
               div_ad_queue.push(paint_ims(zInd));
               break;
            case "breal":
               div_ad_queue.push(paint_breal(zInd));
               break;
            case "conversant":
               div_ad_queue.push(paint_conversant(zInd));
               break;
            case "criteo":
               div_ad_queue.push(paint_criteo(zInd));
               break;
            case "rubicon":
               div_ad_queue.push(paint_rubicon(zInd));
               break;
            case "native":
               div_ad_queue.push(paint_native(zInd));
               break;
            case "sovrn":
               div_ad_queue.push(paint_sovrn(zInd));
               break;
            default:
               console.log("PF_ERROR: Unknown ad_network " + ad_network + ". No ad drawn.");
               break;
         }; //add to these as new ad networks are added to the ad-stack

         //keep these next two lines only until pre-loading is working
         div_ad_queue[0].css({"z-index" : zInd + 1});
         show_div(div_ad_queue[div_ad_queue.length - 1]);
         timer_queue_paint = setTimeout(function () {
            div_ad_queue[div_ad_queue.length - 1].appendTo(div_ad_stack);
            // if (div_ad_queue[1]) div_ad_queue[1].css({"z-index" : 51});

            // show_div(div_ad_queue[0]);
            if (div_ad_queue.length > 1) {
               div_ad_queue[0].slideUp(function () {
                  clearQueue(div_ad_queue.length - 1);
               });
            };
         }, delay); // end of timer_queue_paint
      }; // >> end of cycleQueue()


      //remove all ads waiting in the queue except the ad located at the given index
      clearQueue = function(ind) {
         if (div_ad_queue[ind]) {
            for (var i = div_ad_queue.length - 1; i >= 0; i--) {
               if (i != ind) {
                  div_ad_queue[i].remove();
                  div_ad_queue.splice(i, 1);
               }
            }
         }
      }; // >> end of clearQueue


      //take action on passback notifications
      receivePassbackCall = function(message) {
         var ind;

         if (message.data.func &&
               message.data.func.indexOf(PF_WIDGET_TYPE) != -1 &&
               message.data.func.indexOf("_passback_notification") != -1) {

            // if (div_ad_queue[1]) {
               // ind = 1;
            // } else {
               // ind = 0;
            // }

            //notify tracker of the passback
            // top.postMessage({
               // "notification" : message.data.func,
               // "adNetwork" : div_ad_queue[ind].id.substring(("div_").length, div_ad_queue[ind].id.indexOf("_ad_")),
               // "placement" : div_ad_queue[ind].id.substring(pattern_realvu_div.length),
               // "rand" : div_ad_queue[ind].getAttribute("rand")
            // }, window.location.host);

            passback = true;

            var doNothing = function(){console.log("message event removed");};

            //two passback notifications seem to get fired, so we avoid the second one by killing the listener and restarting it after a short delay
            if (top.removeEventListener) {
               top.removeEventListener("message", doNothing(), false);
            } else {
               if (top.detachEvent) {
                  top.detachEvent("onmessage", doNothing(), false);
               }
            }
            setTimeout(function() {
               clearTimeout(timer_passback_catcher);
               setupPassbackCatcher();
            }, delay_standard / 2);
         }
/* this goes into the ad networks' passback code
<script>top.postMessage({"func":"pfwidget_fin_local_passback_call", "params":[window.location.host]}, "http://www.tampabay.com");</script>
<script>top.postMessage({"func":"pfwidget_fin_national_passback_call", "params":[window.location.host]}, "http://www.tampabay.com");</script>
*/
      }; // >> end of receivePassbackCall()


      setupPassbackCatcher = function() {
         //listen for passback notifications
         if (top.addEventListener) {
            top.addEventListener("message", receivePassbackCall, false);
            // top.addEventListener("message", function(e){if (e.data.func) {console.log(e);console.log("passback message: " + e.data.func);console.log("origin: " + e.origin);console.log("host: " + e.data.params);console.log("parsed: " + e.data.func.substr(e.data.func.indexOf("_com_" || "_net_") + 5));}}, false);
         } else {
            if (top.attachEvent) {
               top.attachEvent("onmessage", receivePassbackCall, false);
            }
         }

         //take action on passback detections
         timer_passback_catcher = setInterval(function () {
            if (passback === true) {
console.log("passback detected");
               // clearTimeout(timer_queue_paint);
               passback = false;
               // if (div_ad_queue[1]) dequeue_ad(0);
            }
         }, 250); // end of timer_passback_catcher
      }; // >> end of setupPassbackCatcher()


      paint_house = function(zInd) {
         var div_house = _$("<div></div>", {
            id: "house ad",
            "rand": randNum()
         }).css({
            backgroundColor: "transparent",
            width: AD_STACK_WIDTH,
            height: AD_STACK_HEIGHT,
            overflow: "hidden",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            "z-index": zInd
         }).appendTo(div_ad_stack);

         var houseAdUrl;

/*          if (top.location.host.substr(top.location.host.indexOf("finance.") == 0)) {
            houseAdUrl = top.location.protocol + top.location.host + "/list-companies?id=236&type=location&price-low=1&market-cap-low=1&order=mk-desc";
         } else {
            houseAdUrl = top.location.protocol + "//finance." + top.location.host.substr(top.location.host.indexOf("www.") + 4) + "/list-companies?id=236&type=location&price-low=1&market-cap-low=1&order=mk-desc";
         }
         
         div_house.append(_$("<a></a>", {
            href: houseAdUrl,
            target: "_blank"
         }).append("<img src=protocolToUse + '://content.synapsys.us/l/i/Global-House-300x250.jpg' alt='passfail' width=300 height=250 />")); */

         houseAdUrl = '//w1.synapsys.us/images/';
         
         var ifr_house = _$("<iframe></iframe>", {
            id: randNum(),
            src: houseAdUrl,
            scrolling: "no",
            frameBorder: 0,
            allowTransparency: "true"
         }).css({
            width: "100%",
            height: "100%"
         }).appendTo(div_house);

         return div_house;
      }


      paint_realvu = function(zInd) {
         var div_realvu = _$("<div></div>", {
            id: pattern_realvu_div + REALVU_CONFIG.p,
            "pfw_type": PF_WIDGET_TYPE,
            "rand": randNum()
         }).css({
            backgroundColor: "transparent",
            width: AD_STACK_WIDTH,
            height: AD_STACK_HEIGHT,
            overflow: "hidden",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            "z-index": zInd
         }).appendTo(div_ad_stack);

         // window.realvu_units = window.realvu_units || [];
         window.realvu_units = [];
         window.realvu_units.push(REALVU_CONFIG);

         _$("<div></div>", {
            id: "realvu" + REALVU_CONFIG.p
         })
         .appendTo(div_realvu);

         _$("<script></script>")
            .appendTo(div_realvu)
               .on("load",function() {
                  var currentObject = div_realvu.find('iframe[name="realvu_ad_unit"]');

                  _$(currentObject).on("load",function() {
                     _$(currentObject).off("load");
                     realvu_st = (new Date()).getTime();
                  });
               })
               .attr("src", protocolToUse + "://pr.realvu.net/realvu_pr2.js");

         return div_realvu;
      }; // >> end of paint_realvu()


      paint_openx = function(zInd) {
         var div_openx = _$("<div></div>", {
            id: pattern_openx_div + OPENX_AUID,
            "pfw_type": PF_WIDGET_TYPE,
            "rand": randNum()
         }).css({
            backgroundColor: "transparent",
            width: AD_STACK_WIDTH,
            height: AD_STACK_HEIGHT,
            overflow: "hidden",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            "z-index": zInd
         }).appendTo(div_ad_stack);

         var c = {};
         // c.content = "personal finance";
         OX_ads = [];
         OX_ads.push(
            {
               slot_id: OPENX_AUID,
               auid: OPENX_AUID
            },
            c
         );
         _$("<div id='" + OPENX_AUID + "' style='width:300px;height:250px;margin:0;padding:0'></div>").appendTo(div_openx);
         _$("<script type='text/javascript' src='" + protocolToUse + "://us-ads.openx.net/w/1.0/jstag'></script>").appendTo(div_openx);

         return div_openx;
      } // >> end of paint_openx();


      paint_breal = function(zInd) {
         var div_breal = _$("<div></div>", {
            id: pattern_breal_div + BREAL_ID,
            "pfw_type": PF_WIDGET_TYPE,
            "rand": randNum()
         }).css({
               backgroundColor: "transparent",
               width: AD_STACK_WIDTH,
               height: AD_STACK_HEIGHT,
               overflow: "hidden",
               position: "absolute",
               top: 0,
               left: 0,
               opacity: 0,
               "z-index": zInd,
               "pointer-events": "none"
            }).appendTo(div_ad_stack);

         var ifr_breal = _$("<iframe></iframe>", {
            id: pattern_breal_ifr + randNum(),
            src: protocolToUse + "://content.synapsys.us/" + pathForSecure + "/ad-breal.php?id=" + BREAL_ID + "&size=" + AD_STACK_WIDTH + "x" + AD_STACK_HEIGHT,
            scrolling: "no",
            frameBorder: 0,
            allowTransparency: "true"
         }).css({
            width: "100%",
            height: "100%"
         }).appendTo(div_breal);

         return div_breal;
      }  // >> end of paint_breal()


      paint_conversant = function(zInd) {
         var div_conversant = _$("<div></div>", {
            id: pattern_conversant_div + CONVERSANT_SID,
            "pfw_type": PF_WIDGET_TYPE,
            "rand": randNum()
         }).css({
               backgroundColor: "transparent",
               width: AD_STACK_WIDTH,
               height: AD_STACK_HEIGHT,
               overflow: "hidden",
               position: "absolute",
               top: 0,
               left: 0,
               opacity: 0,
               "z-index": zInd,
               "pointer-events": "none"
            }).appendTo(div_ad_stack);

         _$('<a href="' + protocolToUse + '://media.fastclick.net/w/click.here?sid=' + CONVERSANT_SID + '&m=' + CONVERSANT_MEDIA_ID + '&c=1" target="_blank"><img src="' + protocolToUse + '://media.fastclick.net/w/get.media?sid=' + CONVERSANT_SID + '&m=' + CONVERSANT_MEDIA_ID + '&tp=' + CONVERSANT_MEDIA_TYPE + '&d=s&c=1&vcm_acv=1.4" width="' + AD_STACK_WIDTH + '" height="' + AD_STACK_HEIGHT + '" border="1"></a>').appendTo(div_conversant);

         return div_conversant;
      }  // >> end of paint_conversant()


      paint_criteo = function(zInd) {
         var div_criteo = _$("<div></div>", {
            id: pattern_criteo_div + CRITEO_ZONEID,
            "pfw_type": PF_WIDGET_TYPE,
            "rand": randNum()
         }).css({
               backgroundColor: "transparent",
               width: AD_STACK_WIDTH,
               height: AD_STACK_HEIGHT,
               overflow: "hidden",
               position: "absolute",
               top: 0,
               left: 0,
               opacity: 0,
               "z-index": zInd,
               "pointer-events": "none"
            }).appendTo(div_ad_stack);

         var ifr_criteo = _$("<iframe></iframe>", {
            id: pattern_criteo_ifr + randNum(),
            src: protocolToUse + "://content.synapsys.us/" + pathForSecure + "/ad-criteo.html?zoneid=" + CRITEO_ZONEID,
            scrolling: "no",
            frameBorder: 0,
            allowTransparency: "true"
         }).css({
            width: "100%",
            height: "100%"
         }).appendTo(div_criteo);

         return div_criteo;
      }  // >> end of paint_criteo()


      paint_rubicon = function(zInd) {
         var div_rubicon = _$("<div></div>", {
            id: pattern_rubicon_div + RUBICON_SITE,
            "pfw_type": PF_WIDGET_TYPE,
            "rand": randNum()
         }).css({
               backgroundColor: "transparent",
               width: AD_STACK_WIDTH,
               height: AD_STACK_HEIGHT,
               overflow: "hidden",
               position: "absolute",
               top: 0,
               left: 0,
               opacity: 0,
               "z-index": zInd,
               "pointer-events": "none"
            }).appendTo(div_ad_stack);

         var ifr_rubicon = _$("<iframe></iframe>", {
            id: pattern_rubicon_ifr + randNum(),
            src: protocolToUse + "://content.synapsys.us/" + pathForSecure + "/ad-rubicon.html?site=" + RUBICON_SITE + "&zone=" + RUBICON_ZONESIZE + "&kw=" + RUBICON_KW,
            scrolling: "no",
            frameBorder: 0,
            allowTransparency: "true"
         }).css({
            width: "100%",
            height: "100%"
         }).appendTo(div_rubicon);

         return div_rubicon;
      }  // >> end of paint_rubicon()
      
      
      paint_native = function(zInd) {
         var div_native = _$("<div></div>", {
            id: pattern_native_div + NATIVE_CHANNEL_ID,
            "pfw_type": PF_WIDGET_TYPE,
            "rand": randNum()
         }).css({
               backgroundColor: "transparent",
               width: AD_STACK_WIDTH,
               height: AD_STACK_HEIGHT,
               overflow: "hidden",
               position: "absolute",
               top: 0,
               left: 0,
               opacity: 0,
               "z-index": zInd,
               "pointer-events": "none"
            }).appendTo(div_ad_stack);
            
         var ifr_native = _$("<iframe></iframe>", {
            id: pattern_native_ifr + randNum(),
            src: "http://content.synapsys.us/l/ad-native.html?cid=" + NATIVE_CHANNEL_ID,
            scrolling: "no",
            frameBorder: 0,
            allowTransparency: "true"
         }).css({
            width: "100%",
            height: "100%"
         }).appendTo(div_native);
         
         return div_native;
      }  // >> end of paint_native()   


      paint_sovrn = function(zInd) {
         var div_sovrn = _$("<div></div>", {
            id: pattern_sovrn_div + SOVRN_ZONE_ID,
            "pfw_type": PF_WIDGET_TYPE,
            "rand": randNum()
         }).css({
               backgroundColor: "transparent",
               width: AD_STACK_WIDTH,
               height: AD_STACK_HEIGHT,
               overflow: "hidden",
               position: "absolute",
               top: 0,
               left: 0,
               opacity: 0,
               "z-index": zInd,
               "pointer-events": "none"
            }).appendTo(div_ad_stack);
            
         var ifr_sovrn = _$("<iframe></iframe>", {
            id: pattern_sovrn_ifr + randNum(),
            src: "http://content.synapsys.us/l/ad-sovrn.php?zid=" + SOVRN_ZONE_ID,
            scrolling: "no",
            frameBorder: 0,
            allowTransparency: "true"
         }).css({
            width: "100%",
            height: "100%"
         }).appendTo(div_sovrn);
         
         return div_sovrn;
      }  // >> end of paint_sovrn()    
      

      show_div = function(divToShow) {
         divToShow.css({
            "opacity": 1,
            "pointer-events": "auto"
         });
      }  // >> end of show_div


      //recursively play through an entire ad cycle
      playAdCycle = function(adCycle, delay) {
         timer_adCycle = setTimeout(function () {
            cycleQueue(adCycle.order[adCycle.iter], 50);

            if (adCycle.iter + 1 < adCycle.order.length) {
               playAdCycle(adCycle, adCycle.timing[adCycle.iter]);
               adCycle.iter++;
            } else if (adCycle.replay == true) {
               playAdCycle(adCycle, adCycle.timing[adCycle.iter]);
               adCycle.iter = 0;
            }
         }, delay);
      }; // >> end of playAdCycle


      hoverTrigger = function() {
         if (adOnDisplay != "onHover") {
            clearTimeout(timer_queue_paint);
            timer_queue_paint = null;
            clearTimeout(timer_visibility);
            timer_visibility = null;
            clearTimeout(timer_adCycle);
            timer_adCycle = null;
            clearTimeout(timer_onLoad);
            timer_onLoad = null;
/*             if (div_ad_queue.length > 1) {
               dequeue_ad(0);
            }; */
            prevOnDisplay = adOnDisplay;
            adOnDisplay = "onHover";
            playAdCycle(onHover, 0);
         };
      };


      //Check condition element is at all visible
      // -el is the element to be checked
      isElementVisible = function(el) {
         var isVisible = false;

         if (el) {
            el = el.getBoundingClientRect();

            var topIframe = getTopIframe();
            var tempRect = {};
            if (typeof topIframe.getBoundingClientRect === 'function') {
               tempRect = topIframe.getBoundingClientRect();
            } else {
               tempRect.top = 0;
               tempRect.left = 0;
            }

            var rect = {};
            rect.top = tempRect.top + el.top;
            rect.left = tempRect.left + el.left;
            rect.bottom = rect.top + el.height;
            rect.right = rect.left + el.width;

            //Destroyed persistent frame. Don't trigger any events here.
            if (rect.height < 1 || rect.width < 1) {
               isVisible = false;
            } else {
               var window_bottom = top.innerHeight,
                  window_top = 0,
                  window_right = top.innerWidth,
                  window_left = 0;

               isVisible = (((   window_top < rect.top      &&    rect.top < window_bottom)  || //if the top is on-screen
                              (  window_top < rect.bottom   && rect.bottom < window_bottom)) && //if the bottom is on-screen
                              ((window_left < rect.left     &&   rect.left < window_right)   || //if the left is on-screen
                              ( window_left < rect.right    &&  rect.right < window_right)));   //if the right is on-screen
               // return isVisible;
            };
         }
         return isVisible;
      }; //isElementVisible


      getTopIframe = function() {
         var currentWindow = self,
            parentIframe = self;

         //if the current window is already the top window, then frameElement will be null
         for (var i = 0; i < 10 && currentWindow.frameElement !== null; i++) {
            if ((currentWindow.parent === top)) {
               parentIframe = currentWindow.frameElement;
               break;
            }
            currentWindow = currentWindow.parent;
         }
         return parentIframe;
      }


      checkVisibility = function() {
         // if (timer_onLoad == null && (isElementVisible(div_ad_stack[0]) == true || isElementVisible(div_main_widget[0]) == true)) {
// console.log(isElementVisible(div_ad_stack[0]),timer_onLoad,timer_visibility,prevOnDisplay,adOnDisplay);
         if (timer_onLoad == null && isElementVisible(div_ad_stack[0]) == true) {
            if (adOnDisplay != "onHover" && adOnDisplay != "onVisible" && timer_visibility == null) {
               timer_visibility = setTimeout(function() {
                  timer_visibility = null;
                  if (isElementVisible(div_ad_stack[0]) == true) {
                     prevOnDisplay = adOnDisplay;
                     adOnDisplay = "onVisible";
                     playAdCycle(onVisible, 0);
                  }
               }, delay_visibility);
            }
         } else if (adOnDisplay == "none") {
         } else if (adOnDisplay != "onLoad" && adOnDisplay != "onLowVis") {
            clearTimeout(timer_queue_paint);
            timer_queue_paint = null;
            clearTimeout(timer_visibility);
            timer_visibility = null;
            clearTimeout(timer_adCycle);
            timer_adCycle = null;
            prevOnDisplay = adOnDisplay;
            adOnDisplay = "onLowVis";
         };
      }; //checkVisibility



      // setupPassbackCatcher();

      //no ad-stack means no ads
      if (AD_STACK_HEIGHT > 0) {
         prevOnDisplay = adOnDisplay;
         adOnDisplay = "onLoad";
         playAdCycle(onLoad, 0);
         timer_onLoad = setTimeout (function () {
            timer_onLoad = null;
            checkVisibility();
         }, delay_onLoad);

         //let's wait for the widget to settle into place on the page before allowing the bindings to fire
         div_main_widget.ready(function() {
            checkVisibility();
            _$(top).on("resize scroll", checkVisibility);

            // div_main_widget.on("mouseenter", hoverTrigger);
         }, true);
      }


      //visibility api code as seen on http://stackoverflow.com/a/21935031
      _$(document).ready(function() {
         var hidden, visibilityState, visibilityChange;

         if (typeof top.document.hidden !== "undefined") {
            hidden = "hidden", visibilityChange = "visibilitychange", visibilityState = "visibilityState";
         } else
         //for IE compatibility
         if (typeof top.document.msHidden !== "undefined") {
            hidden = "msHidden", visibilityChange = "msvisibilitychange", visibilityState = "msVisibilityState";
         }

         var document_hidden = top.document[hidden];

         top.document.addEventListener(visibilityChange, function() {
            if(document_hidden != top.document[hidden]) {
               if(top.document[hidden]) {
                  // Document hidden
                  browserVisible = false;
               } else {
                  // Document shown
                  browserVisible = true;
               }

               document_hidden = top.document[hidden];
            }
         });
      });
   }; // >> end of main()
})();