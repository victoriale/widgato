"use strict";!function(){var e="http://w1.synapsys.us/widgets/deepdive/rails/rails.js",t=document.currentScript||function(){for(var t=document.getElementsByTagName("script"),n=t.length-1;n>=0;n--)if(-1!=t[n].src.indexOf(e))return t[n]}(),n=t.src.split("?")[1];if("undefined"==typeof n)return console.warn("Skyscraper Rails - Must specify query string.\n      Paramters:\n      [selector] - selector of content that the rails are aligned with. (ex. selector=section.main-container)\n      [adMarginTop] - amount of pixels the skyscraper ads should be pushed down from the top of the page. Defaults to 0 if not specified (ex. adMarginTop=100)\n    "),!1;var i,s,d=n.split("&");d.forEach(function(e){var t=e.split("=");switch(t[0]){case"selector":i=decodeURIComponent(t[1]);break;case"adMarginTop":s=decodeURIComponent(t[1])}});try{if("undefined"==typeof i)throw'Must specify unique content selector for Skyscraper Rails. (ex. "selector=section.main-container")';if("undefined"!=typeof s&&isNaN(s))throw'Ad Margin Top must be a number. (ex "adMarginTop=100")'}catch(o){return console.warn("Skyscraper Rails - "+o),!1}var r=s||0,a=document.querySelector(i);if(null===a)return console.warn("Skyscraper Rails - Could not find container that matches selector."),!1;var l,c,p=document.getElementsByTagName("body")[0],f="https:"===location.protocol?"https":"http",m=!1,g=!1,u=500,h=function(){l=document.createElement("section"),l.className="ddto-left-rail ddto-rail-visible",l.innerHTML='\n      <div id="ddto-left-ad">\n        <img class="ddto-left-ad-presented" src="'+f+'://w1.synapsys.us/widgets/deepdive/images/logo_left.png">\n      </div>\n    ',c=document.createElement("section"),c.className="ddto-right-rail ddto-rail-visible",c.innerHTML='\n      <div id="ddto-right-ad">\n        <img class="ddto-right-ad-presented" src="'+f+'://w1.synapsys.us/widgets/deepdive/images/logo_right.png">\n      </div>\n    ',l.style.left=y(),c.style.left=b(),p.insertBefore(c,p.firstChild),p.insertBefore(l,p.firstChild);var e=document.getElementById("ddto-left-ad"),t=document.createElement("script");t.src=f+"://content.synapsys.us/embeds/mlb/deepdive_160x600/mlb.js",e.insertBefore(t,e.firstChild);var n=document.getElementById("ddto-right-ad"),i=document.createElement("script");i.src=f+"://content.synapsys.us/embeds/mlb/deepdive_160x600/mlb.js",n.insertBefore(i,n.firstChild),m=!0,g=!0},y=function(){var e=a.getBoundingClientRect().left;return e-u+"px"},b=function(){var e=a.getBoundingClientRect().left,t=a.offsetWidth;return e+t+"px"},v=document.createElement("style");v.dataset.resource_from="skyscraper-rails-embed",v.innerHTML="\n    .ddto-left-rail{\n      width: "+u+"px;\n      position: fixed;\n      top: 0;\n      bottom: 0;\n      background-image: url('"+f+"://w1.synapsys.us/widgets/deepdive/images/baseball_left.jpg');\n      display: none;\n      background-color: #000;\n      background-repeat: no-repeat;\n      z-index: 100;\n    }\n    .ddto-left-rail.ddto-rail-visible{\n      display: block;\n    }\n    #ddto-left-ad{\n      width: 160px;\n      height: 600px;\n      position: absolute;\n      top: "+r+"px;\n      right: 0;\n    }\n    .ddto-left-ad-presented{\n      position: absolute;\n      bottom: -76px;\n      right: 15px;\n    }\n    .ddto-right-rail{\n      width: "+u+"px;\n      position: fixed;\n      top: 0;\n      bottom: 0;\n      background-image: url('"+f+"://w1.synapsys.us/widgets/deepdive/images/baseball_right.jpg');\n      display: none;\n      background-color: #000;\n      background-repeat: no-repeat;\n      z-index: 100;\n    }\n    .ddto-right-rail.ddto-rail-visible{\n      display: block;\n    }\n    #ddto-right-ad{\n      width: 160px;\n      height: 600px;\n      position: absolute;\n      top: "+r+"px;\n      left: 0;\n    }\n    .ddto-right-ad-presented{\n      position: absolute;\n      bottom: -76px;\n      left: 15px;\n    }\n  ",document.head.appendChild(v),p.offsetWidth-a.offsetWidth>=320&&h(),window.addEventListener("resize",function(){m=0!==document.getElementsByClassName("ddto-left-rail").length&&0!==document.getElementsByClassName("ddto-right-rail").length,g=m?0!==document.getElementsByClassName("ddto-left-rail ddto-rail-visible").length&&0!==document.getElementsByClassName("ddto-right-rail ddto-rail-visible").length:!1;var e=p.offsetWidth,t=a.offsetWidth;!m&&e-t>=320&&h(),m&&g&&320>e-t&&(g=!1,l.className="ddto-left-rail",c.className="ddto-right-rail"),m&&!g&&e-t>=320&&(g=!0,l.className="ddto-left-rail ddto-rail-visible",c.className="ddto-right-rail ddto-rail-visible"),m&&(l.style.left=y(),c.style.left=b())})}();
