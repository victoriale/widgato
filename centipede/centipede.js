
"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},centipede=function(){function a(ba){var ca={mlb:{hex:"#bc2027",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/03/baseball_stock.jpg"},nfl:{hex:"#004e87",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/03/football_stock.jpg"},ncaaf:{hex:"#004e87",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/03/football_stock.jpg"},nba:{hex:"#f26f26",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/03/basketball_stock.jpg"},college_basketball:{hex:"#f26f26",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/03/basketball_stock.jpg"},finance:{hex:"#3098ff",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/03/finance_stock.jpg"},weather:{hex:"#43B149",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/03/weather_stock.jpg"},crime:{hex:"#43B149",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/03/real_estate_stock.jpg"},demographics:{hex:"#43B149",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/03/real_estate_stock.jpg"},politics:{hex:"#43B149",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/03/real_estate_stock.jpg"},disaster:{hex:"#43B149",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/03/real_estate_stock.jpg"},celebrities:{hex:"#6459d3",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/04/actor.jpg"}};return null!=ba&&""!=ba&&ca[ba]?ca[ba]:ca.finance}function b(){for(var ba=Q;ba==Q;)ba=Math.floor(50*Math.random()),0==ba&&(ba=1);Q=ba;var ca;if(ca=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),ca.onreadystatechange=function(){if(ca.readyState==XMLHttpRequest.DONE)if(200==ca.status){var ha=JSON.parse(ca.responseText);c(ha)}else{var ia=ca.statusText;if(500==ca.status)try{ia=JSON.parse(ca.responseText).message}catch(ja){console.log("No JSON message")}if(ia="HTTP Error ("+ca.status+"): "+ia,10<S++)throw ia}},Q=ba,null!=D.category&&""!=D.category){if(W=a(D.category),"nfl"==D.category||"ncaaf"==D.category||"nflncaaf"==D.category){if("nfl"==D.category)var da=q+"w1.synapsys.us/widgets/js/tdl_list_array.json";else if("ncaaf"==D.category)var da=q+"w1.synapsys.us/widgets/js/tdl_list_array_ncaaf.json";else if("nflncaaf"==D.category)if(Q=Math.floor(2*Math.random()+1),1==Q){var da=q+"w1.synapsys.us/widgets/js/tdl_list_array_ncaaf.json";D.category="ncaaf"}else{var da=q+"w1.synapsys.us/widgets/js/tdl_list_array.json";D.category="nfl"}var ea=new XMLHttpRequest;ea.onreadystatechange=function(){if(4===ea.readyState&&200===ea.status){initData=JSON.parse(ea.responseText),Q=Math.floor(Math.random()*(initData.length-1)+1);var ha=new Date,ia=new Date("09/15/"+ha.getFullYear());ha.getMonth()==ia.getMonth()&&ha.getDate()>=ia.getDate()?(ca.open("GET",q+D.env+"touchdownloyal-api.synapsys.us/list/"+initData[Q]+"&season="+ha.getFullYear(),!0),ca.send()):ha.getMonth()>ia.getMonth()?(ca.open("GET",q+D.env+"touchdownloyal-api.synapsys.us/list/"+initData[Q]+"&season="+ha.getFullYear(),!0),ca.send()):(ca.open("GET",q+D.env+"touchdownloyal-api.synapsys.us/list/"+initData[Q]+"&season="+(ha.getFullYear()-1),!0),ca.send())}},ea.open("GET",da,!0),ea.send(null)}else if("weather"==D.category||"weather"==D.group){var fa=null!=D.group&&""!=D.group?"group":"cat",ga=null!=D.group&&""!=D.group?D.group:D.category;p(),ca.open("GET",G+"?"+fa+"="+ga+"&rand="+ba+"&location="+y[0].state.toLowerCase()+"&loc_type=state",!0),ca.send()}else ca.open("GET",G+"?partner="+("undefined"==typeof D.dom?"":D.dom)+"&cat="+D.category+"&rand="+ba,!0),ca.send();}else if("weather"==D.category||"weather"==D.group){var fa=null!=D.group&&""!=D.group?"group":"cat",ga=null!=D.group&&""!=D.group?D.group:D.category;p(),ca.open("GET",G+"?"+fa+"="+ga+"&rand="+ba+"&location="+y[0].state.toLowerCase()+"&loc_type=state",!0),ca.send()}else ca.open("GET",G+"?partner="+("undefined"==typeof D.dom?"":D.dom)+"&group="+D.group+"&rand="+ba,!0),ca.send()}function c(ba){if((null==D.category||""==D.category)&&null!=D.group&&""!=D.group&&(W=a(ba.category)),"nfl"==D.category||"ncaaf"==D.category){ba=ba.data,ba.l_title=ba.listInfo.listName;var ca=[];if("team"==ba.listData[0].rankType)for(var da=0;da<ba.listData.length;da++)ca.push({li_img:q+"images.synapsys.us"+ba.listData[da].teamLogo,li_value:ba.listData[da].stat,li_tag:ba.listData[da].statDescription,li_title:ba.listData[da].teamName,li_sub_txt:ba.listData[da].divisionName,li_rank:ba.listData[da].rank});else for(var da=0;da<ba.listData.length;da++)ca.push({li_img:q+"images.synapsys.us"+ba.listData[da].playerHeadshotUrl,li_value:ba.listData[da].stat,li_tag:ba.listData[da].statDescription,li_title:ba.listData[da].playerFirstName+" "+ba.listData[da].playerLastName,li_sub_txt:ba.listData[da].teamName,li_rank:ba.listData[da].rank})}else if("entertainment"==D.group||"celebrities"==ba.category||"weather"==D.group||"weather"==ba.category)for(var ca=[],da=0;da<ba.l_data.length;da++)null==ba.l_data[da].data_point_2&&(ba.l_data[da].data_point_2=""),null==ba.l_data[da].data_value_2&&(ba.l_data[da].data_value_2=""),ca.push({li_img:ba.l_data[da].li_img,li_value:ba.l_data[da].data_value_2,li_tag:ba.l_data[da].data_point_2,li_title:ba.l_data[da].li_title,li_sub_txt:ba.l_data[da].li_sub_txt,li_rank:ba.l_data[da].li_rank});else var ca=ba.l_data;ca=ca.slice(0,25),ca=ca.reverse(),ca[0].li_value&&(ca[0].li_value=ca[0].li_value.replace(ca[0].li_tag,""));var ea=ca[0].li_img.replace("'","");if(null==ea||""==ea||-1!=ea.indexOf("no_")||-1!=ea.indexOf("no-")||-1!=ea.indexOf("actor.jpg")){ea=q+W.fallbackImage;var fa="width: auto; height:100%; top: 0; left: 50%; transform: translateY(0); transform: translateX(-50%);",ga="fallback"}else{var fa="",ga="";if("weather"==D.group||"weather"==ba.category){var ga="fallback";fa="width: auto; height:100%; top: 0; left: 50%; transform: translateY(0); transform: translateX(-50%);"}}("entertainment"==D.group||"celebrities"==ba.category)&&(fa="width: auto; height:100%; top: 0; left: 50%; transform: translateY(0); transform: translateX(-50%);"),ja="finance"==D.category||"money"==D.group?"style=\"background-image:url('"+ea+"?width=200')\"":"style=\"background-color: black;\"",H.innerHTML=null!=ba.l_alt_title&&""!=ba.l_alt_title?ba.l_alt_title:ba.l_title,J.innerHTML="\n    <style>\n      .profile_image_div.fallback::before {\n        background-color: "+W.hex+";\n      }\n    </style>\n      <div class=\"slider_block\">\n        <div class=\"list_item\">\n          <div class=\"profile_image_div "+ga+"\" "+ja+">\n          <div class=\"num\" style=\"border-color:"+W.hex+"\"><div class=\"num_text\">#<b>"+ca[0].li_rank+"</b></div></div>\n            <img class=\"profile_image\" src=\""+ea+"?width=200\" style=\""+fa+"\">\n          </div>\n          <div class=\"info\">\n            <div class=\"name\">\n              "+ca[0].li_title.replace("Corporation","Corp")+"\n            </div>\n            <div class=\"value\">\n              "+ca[0].li_value+"\n            </div>\n            <div class=\"stat_type\">\n              "+ca[0].li_tag+"\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"slider_block\">\n      <div class=\"ad_spacer\"></div>\n        <div id=\"first_ad_"+u+"\" class=\"ad_item\" style=\"background-color: gray; width: 300px; height: 250px;\">\n\n        </div>\n      </div>\n    ",-1==location.host.indexOf("synapsys.us")&&-1==location.host.indexOf("localhost")&&-1==location.host.indexOf("127.0.0.1")?z.parentElement.getElementsByClassName("widget_zone")[0]?(console.log("centipede detected igloo v3"),setTimeout(function(){V=B.getElementById("first_ad_"+u),V.appendChild(z.parentElement.getElementsByClassName("widget_zone")[0]),V.getElementsByClassName("widget_zone")[0].style.opacity=1},400)):setTimeout(function(){console.log("centipede detected igloo v2"),V=B.getElementById("first_ad_"+u);var la=B.createElement("script");la.type="text/javascript",la.src="//content.synapsys.us/embeds/inline_300x250/partner.js",V.appendChild(la)},400):setTimeout(function(){V=B.getElementById("first_ad_"+u)},400);for(var ja,ha="",ia=25,da=1;da<ca.length&&da<ia;da++){if(ca[da].li_value&&(ca[da].li_value=ca[da].li_value.replace(ca[da].li_tag,"")),ea=ca[da].li_img.replace("'",""),null==ea||""==ea||-1!=ea.indexOf("no_")||-1!=ea.indexOf("no-")||-1!=ea.indexOf("fallback")){ea=q+W.fallbackImage;var fa="width: auto; height:100%; top: 0; left: 50%; transform: translateY(0); transform: translateX(-50%);",ga="fallback"}else{var fa="",ga="";if("weather"==D.group||"weather"==ba.category){var ga="fallback";fa="width: auto; height:100%; top: 0; left: 50%; transform: translateY(0); transform: translateX(-50%);"}}if(("entertainment"==D.group||"celebrities"==ba.category)&&(fa="width: auto; height:100%; top: 0; left: 50%; transform: translateY(0); transform: translateX(-50%);"),1==Math.abs(da%2)&&(ha+="<div class=\"slider_block\">"),ja="finance"==D.category||"money"==D.group?"style=\"background-image:url('"+ea+"?width=200')\"":"style=\"background-color: black;\"",ha+="\n          <div class=\"list_item\">\n            <div class=\"profile_image_div "+ga+"\" "+ja+">\n            <div class=\"num\" style=\"border-color:"+W.hex+"\"><div class=\"num_text\">#<b>"+ca[da].li_rank+"</b></div></div>\n              <img class=\"profile_image\" alt=\""+ea+"?width=200\" style=\""+fa+"\">\n            </div>\n            <div class=\"info\">\n              <div class=\"name\">\n                "+ca[da].li_title+"\n              </div>\n              <div class=\"value\">\n                "+ca[da].li_value+"\n              </div>\n              <div class=\"stat_type\">\n                "+ca[da].li_tag+"\n              </div>\n            </div>\n          </div>\n      ",0==da%2&&(ha+="</div>"),da&&0==da%4&&(ha+="\n        <div class=\"slider_block\">\n        <div class=\"ad_spacer\"></div>\n          <div class=\"ad_item\">\n\n          </div>\n        </div>"),da==ca.length-1||da==ia-1){ha+="\n        </div>\n        <div class=\"slider_block\">\n          <div class=\"next_list\" style=\"background-color:"+W.hex+";\" id=\"next_list\">\n          <div class=\"next_arrow\">\n            <svg width=\"17\" height=\"30\" viewBox=\"0 0 17 30\">\n                <path fill=\"#FFF\" fill-rule=\"nonzero\" d=\"M16.89 14.463l-14.967 14.9s-.801.555-1.577-.218c-.778-.772 0-1.449 0-1.449L13.663 14.44.976 1.81s-.66-.791.05-1.496c.707-.706 1.696 0 1.696 0l14.168 14.15z\"/>\n            </svg>\n          </div>\n          Next List\n          </div>\n        </div>\n        ",J.innerHTML+=ha,clearInterval(ka);var ka=setInterval(function(){B.getElementById("next_list")&&(clearInterval(ka),D.event&&(D.event.event="widget-list",Z=ba.l_param+","+ba.l_sort+","+ba.l_input,D.event.l=Z,m({action:"snt_tracker",snt_data:D.event},10)),B.getElementById("next_list").addEventListener("touchend",d),B.getElementById("next_list").addEventListener("click",d),z.classList.add("widget_loaded"))},300)}}}function d(){X=!1,V.getElementsByClassName("widget_zone")[0]&&(V.getElementsByClassName("widget_zone")[0].style.opacity=0,z.parentElement.appendChild(V.getElementsByClassName("widget_zone")[0])),J.innerHTML="",V.style.left="0px",J.scrollLeft=0,b()}function k(ba){J.scrollLeft+=aa-ba.clientX,aa=ba.clientX}function m(ba,ca){var da=[window],ea=window,fa=0;ca="undefined"==typeof ca?10:ca;try{for(;fa++<ca&&ea!==window.top;)ea=ea.parent,da.push(ea)}catch(ha){}for(var ga=0;ga<da.length;ga++)da[ga].postMessage(ba,"*")}function o(){for(var ea,ba=0,ca=J.scrollLeft,da=0;da<K.length;da++)if(ea=K[da],ca+150>=ea.offsetLeft&&ca+150<=ea.offsetLeft+ea.offsetWidth&&20<ca){var _ret=function(){var ga=function(){ca=J.scrollLeft,T=!1;var ha=Math.abs(P)-1;ca<O-ha||ca>O+ha?da==K.length-2||30<ba?(T=!0,U=!1,setTimeout(function(){U=!0},500),clearInterval(R)):(0<P&&ca>O?P=-1:0>P&&ca<O&&(P=1),ba++,J.scrollLeft=ca+P,!0!=T&&window.requestAnimationFrame(ga)):ca<O||ca>O?da==K.length-2||30<ba?(T=!0,U=!1,setTimeout(function(){U=!0},500),clearInterval(R)):(0<P&&ca>O?P=-1:0>P&&ca<O&&(P=1),ba++,J.scrollLeft=ca+1,!0!=T&&window.requestAnimationFrame(ga)):(T=!0,U=!1,setTimeout(function(){U=!0},500),clearInterval(R))};return O=ea.offsetLeft,P=ca<O?10:-10,clearInterval(R),window.requestAnimationFrame(ga),ea=da,1<=K[da].getElementsByClassName("ad_item").length?(H.style.opacity="0",parent[D.pause_variable]=!0):(H.style.opacity="1",parent[D.pause_variable]=!1),{v:void 0}}();if("object"===("undefined"==typeof _ret?"undefined":_typeof(_ret)))return _ret.v}else if(20>J.scrollLeft)return O=0,P=J.scrollLeft<O?1:-1,R=setInterval(function(){ca=J.scrollLeft,T=!1;var fa=0;J.scrollLeft<O-fa||J.scrollLeft>O+fa?da==K.length-1||30<ba?(T=!0,U=!1,setTimeout(function(){U=!0},500),clearInterval(R)):J.scrollLeft+=P:(T=!0,U=!1,setTimeout(function(){U=!0},500),clearInterval(R))},15),void(ea=0)}function p(){var ba=new XMLHttpRequest;ba.onreadystatechange=function(){4===ba.readyState&&200===ba.status&&(y=JSON.parse(ba.responseText))},ba.open("GET","//waldo.synapsys.us/getlocation/2",!1),ba.send(null)}var q="https:"==location.protocol?"https://":"http://",u=document.getElementsByClassName("centipedeIframe");u=u.length;var v="centipede.js",w=document.currentScript||function(){for(var ba=document.getElementsByTagName("script"),ca=ba.length-1;0<=ca;ca--)if(-1!=ba[ca].src.indexOf(v))return ba[ca]}(),y;if(window.frameElement){var z=document.createElement("div");z.id="friendlyIframe_"+u,z.className="centipedeIframe",z.width="300",z.height="250",z.style.border="none",w.parentNode.insertBefore(z,w);var A=z,B=document}else{var z=document.createElement("iframe");z.id="friendlyIframe_"+u,z.className="centipedeIframe",z.width="300",z.height="250",z.src="about:blank",z.style.border="none",w.parentNode.insertBefore(z,w);var A=z.contentWindow,B=A.document}var C="\n    <style>\n    /* google fonts */\n    /* latin-ext */\n    @font-face {\n      font-family: 'Lato';\n      font-style: normal;\n      font-weight: 400;\n      src: local('Lato Regular'), local('Lato-Regular'), url(http://fonts.gstatic.com/s/lato/v13/8qcEw_nrk_5HEcCpYdJu8BTbgVql8nDJpwnrE27mub0.woff2) format('woff2');\n      unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n    }\n    /* latin */\n    @font-face {\n      font-family: 'Lato';\n      font-style: normal;\n      font-weight: 400;\n      src: local('Lato Regular'), local('Lato-Regular'), url(http://fonts.gstatic.com/s/lato/v13/MDadn8DQ_3oT6kvnUq_2r_esZW2xOQ-xsNqO47m55DA.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n    }\n    /* latin-ext */\n    @font-face {\n      font-family: 'Lato';\n      font-style: normal;\n      font-weight: 700;\n      src: local('Lato Bold'), local('Lato-Bold'), url(http://fonts.gstatic.com/s/lato/v13/rZPI2gHXi8zxUjnybc2ZQFKPGs1ZzpMvnHX-7fPOuAc.woff2) format('woff2');\n      unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n    }\n    /* latin */\n    @font-face {\n      font-family: 'Lato';\n      font-style: normal;\n      font-weight: 700;\n      src: local('Lato Bold'), local('Lato-Bold'), url(http://fonts.gstatic.com/s/lato/v13/MgNNr5y1C_tIEuLEmicLmwLUuEpTyoUstqEm5AMlJo4.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n    }\n    body {\n      border: none;\n      margin: 0;\n      padding: 0;\n      -webkit-overflow-scrolling: touch;\n      -webkit-user-select: none;\n      -khtml-user-select: none;\n      -moz-user-select: none;\n      -o-user-select: none;\n      user-select: none;\n    }\n    img {\n      -webkit-user-select: none;\n      -khtml-user-select: none;\n      -moz-user-select: none;\n      -o-user-select: none;\n      user-select: none;\n      -webkit-user-drag: none;\n      -khtml-user-drag: none;\n      -moz-user-drag: none;\n      -o-user-drag: none;\n      user-drag: none;\n    }\n    .icon {\n      background-position: 50%;\n      background-repeat: no-repeat;\n      height: 30px;\n      width: 30px;\n    }\n    .wrapper {\n      position: absolute;\n      overflow: hidden;\n      width: 300px;\n      height: 250px;\n      background-color: #f7f7f7;\n      border: 1px solid #e1e1e1;\n      box-sizing: border-box;\n    }\n    .edge_shader {\n      position: absolute;\n      right:-5px;\n      top:0;\n      width: 3px;\n      height: 100%;\n      box-shadow:  -5px 0 10px rgba(0,0,0,0.8);\n      z-index: 999;\n      transition: opacity 0.2s ease-in-out;\n    }\n    .helper {\n      box-sizing: border-box;\n      position: absolute;\n      right:0px;\n      left:0px;\n      width: 100%;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      padding: 5px 10px;\n      font-family: lato, helvetica;\n      font-weight: 900;\n      color: #666666;\n      font-size: 12px;\n      -webkit-backdrop-filter: blur(3px);\n      backdrop-filter: blur(3px);\n      background-color: rgba(248, 248, 248, 0.8);\n      transition: opacity 0.2s ease-in-out;\n      z-index: 9;\n    }\n    .helper2 {\n      pointer-events: none;\n      position: absolute;\n      box-sizing: border-box;\n      width: 35px;\n      right:0px;\n      top: 50%;\n      transform: translateY(-50%);\n      padding: 10px 5px 10px 10px;\n      font-family: lato, helvetica;\n      /*font-weight: 300;*/\n      font-size: 20px;\n      color: white;\n      fill: white;\n      border-top-left-radius: 15px;\n      border-bottom-left-radius: 15px;\n      overflow: hidden;\n      -webkit-backdrop-filter: blur(3px);\n      backdrop-filter: blur(3px);\n      background-color: rgba(0, 0, 0, 0.8);\n      box-shadow: 0 2px 2px 0 rgba(0,0,0,0.26), 0 0 0 1px rgba(0,0,0,0.09);\n      opacity: 1;\n      transition: opacity 0.2s ease-in-out;\n      z-index: 9;\n    }\n    .helper2 .icon {\n      animation:swipe 2s infinite;\n    }\n    @keyframes swipe {\n      0%{\n        -webkit-transform: translateX(50px);\n        -moz-transform: translateX(50px);\n        -ms-transform: translateX(50px);\n        -o-transform: translateX(50px);\n        transform: translateX(50px);\n        opacity: 0.1;\n      }\n      50% {\n        -webkit-transform: translateX(-5px);\n        -moz-transform: translateX(-5px);\n        -ms-transform: translateX(-5px);\n        -o-transform: translateX(-5px);\n        transform: translateX(-5px);\n        opacity:1;\n      }\n      100% {\n        -webkit-transform: translateX(-50px);\n        -moz-transform: translateX(-50px);\n        -ms-transform: translateX(-50px);\n        -o-transform: translateX(-50px);\n        transform: translateX(-50px);\n        opacity:0.1;\n      }\n    }\n    .slider {\n      position: absolute;\n      width: 300px;\n      height: 250px;\n      overflow-x: scroll;\n      overflow-y: hidden;\n      white-space: nowrap;\n      background-color: #f7f7f7;\n      animation:bounce 2s infinite;\n      cursor: move;\n      -ms-overflow-style: none;\n    }\n    .slider.stopAnim {\n      transform: translateX(0); //force hw accel\n      -webkit-animation: 0;\n      animation: 0;\n    }\n    @keyframes bounce {\n      0%, 20%, 50%, 80%, 100% {\n        -webkit-transform: translateX(0);\n        -moz-transform: translateX(0);\n        -ms-transform: translateX(0);\n        -o-transform: translateX(0);\n        transform: translateX(0); }\n      40% {\n        -webkit-transform: translateX(12px);\n        -moz-transform: translateX(12px);\n        -ms-transform: translateX(12px);\n        -o-transform: translateX(12px);\n        transform: translateX(12px); }\n      60% {\n        -webkit-transform: translateX(3px);\n        -moz-transform: translateX(3px);\n        -ms-transform: translateX(3px);\n        -o-transform: translateX(3px);\n        transform: translateX(3px); } }\n    .slider_block {\n      position: relative;\n      display: inline-block;\n      height: 250px;\n      padding-left: 5px;\n    }\n    .slider_block:nth-of-type(1) {\n      padding-left: 2px!important;\n    }\n    .slider_block:nth-of-type(2) {\n      padding-left: 0px;\n    }\n    // .slider_block:nth-of-type(3n+1) {\n    //   padding-left: 0px;\n    // }\n    .slider_block:last-of-type {\n      margin: 0;\n      padding: 0;\n    }\n    .list_item {\n      overflow: hidden;\n      position: relative;\n      display: inline-block;\n      height: 218px;\n      width: 138px;\n      margin-bottom:4px;\n      background-color: white;\n      border-radius: 2px;\n      border: solid 1px #e1e1e1;\n      margin-left: 2px;\n    }\n    .ad_spacer {\n      width: 296px;\n      height: 100%;\n    }\n    .slider_block:nth-of-type(3n+5) {\n      margin-left:2px;\n    }\n    .ad_item {\n      position: absolute;\n      height: 100%;\n      top:0;\n      z-index: 99;\n    }\n    .profile_image_div {\n      width: 100%;\n      height: 123px;\n      display: block;\n      overflow:hidden;\n      position: absolute;\n      background-size: 1000% 1000%;\n      image-rendering: optimizeSpeed;             /*                     */\n      image-rendering: -moz-crisp-edges;          /* Firefox             */\n      image-rendering: -o-crisp-edges;            /* Opera               */\n      image-rendering: -webkit-optimize-contrast; /* Chrome (and Safari) */\n      image-rendering: optimize-contrast;         /* CSS3 Proposed       */\n      -ms-interpolation-mode: nearest-neighbor;   /* IE8+                */\n      /*border-bottom: 1px solid rgba(50,50,50,0.1);*/\n    }\n    .profile_image_div.fallback::before {\n      content: \"\";\n      height: 100%;\n      width: 100%;\n      top:0;\n      left:0;\n      position: absolute;\n      z-index: 99;\n      opacity: 0.6;\n    }\n    .profile_image {\n      position: absolute;\n      width: 100%;\n      top: 50%;\n      transform: translateY(-50%);\n    }\n    .num {\n      font-family: lato, helvetica;\n      position: absolute;\n      right: -5px;\n      top: -20px;\n      width: 0;\n      height: 0;\n      border-top: 30px solid transparent;\n      border-bottom: 30px solid transparent;\n      border-left: 30px solid black;\n      transform: rotate(-45deg);\n      z-index: 100;\n      outline: 1px solid rgba(255,255,255,0.4);\n    }\n    .num_text {\n    \tfont-size: 12px;\n      color: white;\n      width: 20px;\n      top: -9px;\n      right: 9px;\n      text-align: center;\n      font-weight: lighter;\n      position: absolute;\n      transform: rotate(45deg);\n    }\n    .info {\n      width: 100%;\n      position: absolute;\n      top: 130px;\n      font-family: lato, helvetica;\n      text-align: center;\n    }\n    .name {\n      font-size: 14px;\n      max-width 95%;\n      display: -webkit-box;\n      -webkit-line-clamp: 2;\n      -webkit-box-orient: vertical;\n      white-space: normal;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      padding: 0 5px;\n    }\n    .symbl, .location {\n      font-size: 12px;\n      color: #bebebe;\n      max-width 95%;\n      padding: 0 5px;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n    .location {\n      margin-bottom: 5px;\n      max-width 95%;\n      padding: 0 5px;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n    .value {\n      font-size: 20px;\n      color: #272727;\n      font-weight: 900;\n      margin-top: 3px;\n      display: -webkit-box;\n      -webkit-line-clamp: 2;\n      -webkit-box-orient: vertical;\n      white-space: normal;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      padding: 0 5px;\n    }\n    .stat_type {\n      font-size: 12px;\n      color: #666666;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      padding: 0 5px;\n    }\n    .next_list {\n      font-family: lato, helvetica;\n      font-size: 12px;\n      position: relative;\n      top: -96px;\n      width: 56px;\n      margin: 0 5px 0 0;\n      padding: 80px 10px 88px 10px;\n      text-align: center;\n      color: white;\n    }\n    .next_arrow {\n      font-size: 30px;\n      margin-bottom: 5px;\n    }\n    </style>\n    <div class=\"wrapper\">\n      <div class=\"helper\" id=\"helper_"+u+"\">\n      </div>\n      <div class=\"helper2\" id=\"helper2_"+u+"\">\n        <div class=\"icon swipe_right\">\n          <svg version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"10 10 80 80\" enable-background=\"new 0 0 100 100\" xml:space=\"preserve\"><g><path  d=\"M36,31.345c0-0.912,0-1.778,0-2.591c-2-1.458-3.402-3.814-3.402-6.476c0-4.416,3.55-8.01,7.965-8.01   c4.418,0,7.881,3.594,7.881,8.01c0,2.662-1.443,5.019-3.443,6.477v2.59c3-1.704,5.631-5.125,5.631-9.066   c0-5.635-4.531-10.219-10.166-10.219s-10.103,4.584-10.103,10.219C30.362,26.221,33,29.642,36,31.345z\"/><path  d=\"M70.07,43.118h-2.762c-0.777,0-1.574,0.188-2.275,0.53c-0.362-2.075-2.176-3.658-4.353-3.658h-2.763   c-0.909,0-1.759,0.278-2.462,0.752c-0.608-1.715-2.246-2.944-4.165-2.944h-2.763c-0.805,0-1.559,0.216-2.21,0.593V22.278   c0-3.198-2.602-5.8-5.8-5.8c-3.196,0-5.8,2.602-5.8,5.8v30.591c-1.239,0.589-2.389,1.381-3.389,2.379l-2.264,2.265   c-4.739,4.739-4.739,12.447,0,17.186l6.31,6.311c0.31,0.31,0.635,0.596,0.97,0.867c2.103,3.621,6.032,6.064,10.525,6.064h15.467   c6.701,0,12.15-5.429,12.15-12.102V47.536C74.488,45.1,72.507,43.118,70.07,43.118z M72.279,75.839   c0,5.454-4.459,9.892-9.941,9.892H46.871c-1.821,0-3.525-0.497-4.995-1.353c-1.219-0.729-2.577-1.788-3.82-3.981   c-0.717-1.365-1.127-2.914-1.127-4.558c0-0.61-0.495-1.105-1.104-1.105c-0.611,0-1.105,0.495-1.105,1.105   c0,0.503,0.035,0.997,0.095,1.482l-4.186-4.186c-3.876-3.876-3.876-10.184,0-14.061l2.265-2.264   c0.557-0.557,1.173-1.029,1.826-1.434v7.567c0,0.611,0.494,1.105,1.105,1.105c0.609,0,1.104-0.494,1.104-1.105V22.278   c0-1.979,1.61-3.591,3.59-3.591c1.98,0,3.591,1.612,3.591,3.591v28.378c0,0.611,0.494,1.105,1.104,1.105   c0.609,0,1.104-0.494,1.104-1.105v-8.44c0-1.217,0.991-2.208,2.21-2.208h2.763c1.217,0,2.209,0.991,2.209,2.208v8.452   c0,0.61,0.493,1.104,1.104,1.104c0.609,0,1.105-0.493,1.105-1.104v-6.259c0-1.217,0.99-2.209,2.208-2.209h2.763   c1.218,0,2.209,0.992,2.209,2.209v6.247c0,0.611,0.494,1.105,1.105,1.105c0.608,0,1.104-0.494,1.104-1.105v-4.005   c0-0.644,1.137-1.324,2.21-1.324h2.762c1.218,0,2.209,0.991,2.209,2.209V75.839z\"/><path  d=\"M62.912,68H49.009l1.428-1.348c0.432-0.432,0.432-1.09,0-1.521c-0.432-0.433-1.131-0.412-1.562,0.02   l-3.311,3.321c-0.103,0.102-0.185,0.229-0.241,0.364c-0.056,0.134-0.086,0.279-0.086,0.427s0.03,0.294,0.086,0.427   c0.052,0.124,0.129,0.233,0.22,0.329c0.008,0.008,0.011,0.021,0.019,0.028l3.313,3.313c0.215,0.216,0.498,0.323,0.782,0.323   c0.281,0,0.564-0.107,0.78-0.323c0.432-0.432,0.432-1.315,0-1.747L49.007,70h13.905c0.61,0,1.104-0.39,1.104-0.999   C64.017,68.39,63.522,68,62.912,68z\"/></g></svg>\n        </div>\n      </div>\n    <div class=\"slider\" id=\"slider_"+u+"\">\n    </div>\n  </div>\n    ";window.frameElement?A.innerHTML=C:B.write(C);var D={dom:"chicagotribune.com",category:"nba",rand:"1",env:"prod-"};if(null!=decodeURIComponent(location.search.substr(1))&&""!=decodeURIComponent(location.search.substr(1)))try{D=JSON.parse(decodeURIComponent(location.search.substr(1)))}catch(ba){console.log("Page level query string JSON invalid. Falling back to embed query string");var E=w.src.split(v+"?")[1];if(""!=E&&null!=E)try{D=JSON.parse(decodeURI(E))}catch(ca){console.log("Embed level query string JSON invalid"),console.log(ca)}}else{var E=w.src.split(v+"?")[1];if(""!=E&&null!=E)try{D=JSON.parse(decodeURI(E))}catch(ba){console.log("Embed level query string JSON invalid"),console.log(ba)}}"prod-"!=D.env&&"dev-"!=D.env&&(D.env="prod-");var G=q+D.env.replace("prod-","")+"dw.synapsys.us/list_api.php",H=B.getElementById("helper_"+u),I=B.getElementById("helper2_"+u),J=B.getElementById("slider_"+u),K=J.getElementsByClassName("slider_block"),M=!1,N,O=0,P=0,Q,R,S=0,T=!0,U=!0,V,W,X=!1,Y=!1,Z="";"undefined"==typeof D.group&&("undefined"==typeof D.category||-1==["finance","nba","college_basketball","weather","crime","demographics","politics","disaster","mlb","nfl","ncaaf","nflncaaf","celebrities"].indexOf(D.category))&&(D.category="finance"),z.classList.add("centipede_"+D.category),b();var $=!1;try{var _=Object.defineProperty({},"passive",{get:function get(){$=!0}});window.addEventListener("test",null,_)}catch(ba){}J.addEventListener("scroll",function(){if(T){if(!0!=M&&D.event&&(D.event.event="widget-interaction",D.event.l=Z,m({action:"snt_tracker",snt_data:D.event},10)),!1==X){X=!0,clearInterval(ba);var ba=setInterval(function(){if(J.getElementsByClassName("profile_image")[0]){clearInterval(ba);for(var ea=J.getElementsByClassName("profile_image"),fa=1;fa<ea.length;fa++)ea[fa].src=ea[fa].alt}},500)}M=!0,20<this.scrollLeft?!1==Y&&(I.style.opacity="0",J.classList.add("stopAnim"),Y=!0):(J.classList.remove("stopAnim"),H.style.opacity="1",I.style.opacity="1",Y=!1);var ca=V.getBoundingClientRect();if(-600>ca.left||600<ca.left){var da=J.getElementsByClassName("ad_spacer")[Math.floor((this.scrollLeft+450)/900)].parentElement.offsetLeft+150;V.style.left=da-V.offsetWidth+"px"}clearTimeout(N),N=setTimeout(function(){!0==U&&o(),J.removeEventListener("mousemove",k),M=!1},300)}}),J.addEventListener("touchend",function(){if(!1==M);else var ca=setInterval(function(){!1==M&&clearTimeout(ca)},250)},!!$&&{passive:!0}),J.addEventListener("touchstart",function(){T=!0,U=!1,setTimeout(function(){U=!0},500),clearInterval(R)},!!$&&{passive:!0});var aa;J.addEventListener("mousedown",function(ba){aa=ba.clientX,J.addEventListener("mousemove",k,!!$&&{passive:!0})},!!$&&{passive:!0}),J.addEventListener("mouseup",function(){J.removeEventListener("mousemove",k)},!!$&&{passive:!0})};if("complete"==document.readyState)centipede();else var initLoops=0,initDelay=setInterval(function(){"complete"==document.readyState||10<initLoops?(clearInterval(initDelay),centipede()):initLoops++},500);
