"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},centipede=function(){function a($){var _={mlb:{hex:"#bc2027",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/03/baseball_stock.jpg"},nfl:{hex:"#004e87",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/03/football_stock.jpg"},ncaaf:{hex:"#004e87",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/03/football_stock.jpg"},nba:{hex:"#f26f26",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/03/basketball_stock.jpg"},college_basketball:{hex:"#f26f26",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/03/basketball_stock.jpg"},finance:{hex:"#3098ff",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/03/finance_stock.jpg"},weather:{hex:"#43B149",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/03/real_estate_stock.jpg"},crime:{hex:"#43B149",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/03/real_estate_stock.jpg"},demographics:{hex:"#43B149",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/03/real_estate_stock.jpg"},politics:{hex:"#43B149",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/03/real_estate_stock.jpg"},disaster:{hex:"#43B149",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/03/real_estate_stock.jpg"},celebrities:{hex:"#6459d3",fallbackImage:"images.synapsys.us/01/fallback/stock/2017/04/actor.jpg"}};return null!=$&&""!=$&&_[$]?_[$]:_.finance}function b(){for(var $=N;$==N;)$=Math.floor(50*Math.random()),0==$&&($=1);N=$;var _;if(_=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),_.onreadystatechange=function(){if(_.readyState==XMLHttpRequest.DONE)if(200==_.status){var ca=JSON.parse(_.responseText);c(ca)}else{var da=_.statusText;if(500==_.status)try{da=JSON.parse(_.responseText).message}catch(ea){console.log("No JSON message")}if(da="HTTP Error ("+_.status+"): "+da,10<P++)throw da}},N=$,null==A.category||""==A.category)_.open("GET",D+"?partner="+("undefined"==typeof A.dom?"":A.dom)+"&group="+A.group+"&rand="+$,!0),_.send();else if(T=a(A.category),"nfl"==A.category||"ncaaf"==A.category||"nflncaaf"==A.category){if("nfl"==A.category)var aa=p+"w1.synapsys.us/widgets/js/tdl_list_array.json";else if("ncaaf"==A.category)var aa=p+"w1.synapsys.us/widgets/js/tdl_list_array_ncaaf.json";else if("nflncaaf"==A.category)if(N=Math.floor(2*Math.random()+1),1==N){var aa=p+"w1.synapsys.us/widgets/js/tdl_list_array_ncaaf.json";A.category="ncaaf"}else{var aa=p+"w1.synapsys.us/widgets/js/tdl_list_array.json";A.category="nfl"}var ba=new XMLHttpRequest;ba.onreadystatechange=function(){if(4===ba.readyState&&200===ba.status){initData=JSON.parse(ba.responseText),N=Math.floor(Math.random()*(initData.length-1)+1);var ca=new Date,da=new Date("09/15/"+ca.getFullYear());ca.getMonth()==da.getMonth()&&ca.getDate()>=da.getDate()?(_.open("GET",p+A.env+"touchdownloyal-api.synapsys.us/list/"+initData[N]+"&season="+ca.getFullYear(),!0),_.send()):ca.getMonth()>da.getMonth()?(_.open("GET",p+A.env+"touchdownloyal-api.synapsys.us/list/"+initData[N]+"&season="+ca.getFullYear(),!0),_.send()):(_.open("GET",p+A.env+"touchdownloyal-api.synapsys.us/list/"+initData[N]+"&season="+(ca.getFullYear()-1),!0),_.send())}},ba.open("GET",aa,!0),ba.send(null)}else _.open("GET",D+"?partner="+("undefined"==typeof A.dom?"":A.dom)+"&cat="+A.category+"&rand="+$,!0),_.send()}function c($){if((null==A.category||""==A.category)&&null!=A.group&&""!=A.group&&(T=a($.category)),"nfl"==A.category||"ncaaf"==A.category){$=$.data,$.l_title=$.listInfo.listName;var _=[];if("team"==$.listData[0].rankType)for(var aa=0;aa<$.listData.length;aa++)_.push({li_img:p+"images.synapsys.us"+$.listData[aa].teamLogo,li_value:$.listData[aa].stat,li_tag:$.listData[aa].statDescription,li_title:$.listData[aa].teamName,li_sub_txt:$.listData[aa].divisionName,li_rank:$.listData[aa].rank});else for(var aa=0;aa<$.listData.length;aa++)_.push({li_img:p+"images.synapsys.us"+$.listData[aa].playerHeadshotUrl,li_value:$.listData[aa].stat,li_tag:$.listData[aa].statDescription,li_title:$.listData[aa].playerFirstName+" "+$.listData[aa].playerLastName,li_sub_txt:$.listData[aa].teamName,li_rank:$.listData[aa].rank})}else if("entertainment"==A.group||"celebrities"==$.category)for(var _=[],aa=0;aa<$.l_data.length;aa++)null==$.l_data[aa].data_point_2&&($.l_data[aa].data_point_2=""),null==$.l_data[aa].data_value_2&&($.l_data[aa].data_value_2=""),_.push({li_img:$.l_data[aa].li_img,li_value:$.l_data[aa].data_value_2,li_tag:$.l_data[aa].data_point_2,li_title:$.l_data[aa].li_title,li_sub_txt:$.l_data[aa].li_sub_txt,li_rank:$.l_data[aa].li_rank});else var _=$.l_data;_=_.slice(0,25),_=_.reverse(),_[0].li_value&&(_[0].li_value=_[0].li_value.replace(_[0].li_tag,""));var ba=_[0].li_img.replace("'","");if(null==ba||""==ba||-1!=ba.indexOf("no_")||-1!=ba.indexOf("no-")||-1!=ba.indexOf("actor.jpg")){ba=p+T.fallbackImage;var ca="width: auto; height:100%; top: 0; left: 50%; transform: translateY(0); transform: translateX(-50%);",da="fallback"}else var ca="",da="";("entertainment"==A.group||"celebrities"==$.category)&&(ca="width: auto; height:100%; top: 0; left: 50%; transform: translateY(0); transform: translateX(-50%);"),ga="finance"==A.category||"money"==A.group?"style=\"background-image:url('"+ba+"?width=200')\"":"style=\"background-color: black;\"",E.innerHTML=null!=$.l_alt_title&&""!=$.l_alt_title?$.l_alt_title:$.l_title,G.innerHTML="\n    <style>\n      .profile_image_div.fallback::before {\n        background-color: "+T.hex+";\n      }\n    </style>\n      <div class=\"worm_block\">\n        <div class=\"list_item\">\n          <div class=\"profile_image_div "+da+"\" "+ga+">\n          <div class=\"num\" style=\"border-color:"+T.hex+"\"><div class=\"num_text\">#<b>"+_[0].li_rank+"</b></div></div>\n            <img class=\"profile_image\" src=\""+ba+"?width=200\" style=\""+ca+"\">\n          </div>\n          <div class=\"info\">\n            <div class=\"name\">\n              "+_[0].li_title.replace("Corporation","Corp")+"\n            </div>\n            <div class=\"value\">\n              "+_[0].li_value+"\n            </div>\n            <div class=\"stat_type\">\n              "+_[0].li_tag+"\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"worm_block\">\n      <div class=\"ad_spacer\"></div>\n        <div id=\"first_ad_"+q+"\" class=\"ad_item\" style=\"background-color: gray; width: 300px; height: 250px;\">\n\n        </div>\n      </div>\n    ",-1==location.host.indexOf("synapsys.us")&&-1==location.host.indexOf("localhost")&&-1==location.host.indexOf("127.0.0.1")?w.parentElement.getElementsByClassName("widget_zone")[0]?setTimeout(function(){S=y.getElementById("first_ad_"+q),S.appendChild(w.parentElement.getElementsByClassName("widget_zone")[0]),S.getElementsByClassName("widget_zone")[0].style.opacity=1},400):setTimeout(function(){S=y.getElementById("first_ad_"+q);var ia=y.createElement("script");ia.type="text/javascript",ia.src=null!=A.group&&""!=A.group&&null!=A.p&&""!=A.p?"//content.synapsys.us/embeds/placement.js?p="+A.p+"&type=centipede_"+A.group+"&style=inline&league=no_centipede":"//content.synapsys.us/embeds/inline_300x250/partner.js",S.appendChild(ia)},400):setTimeout(function(){S=y.getElementById("first_ad_"+q)},400);for(var ga,ea="",fa=25,aa=1;aa<_.length&&aa<fa;aa++){if(_[aa].li_value&&(_[aa].li_value=_[aa].li_value.replace(_[aa].li_tag,"")),ba=_[aa].li_img.replace("'",""),null==ba||""==ba||-1!=ba.indexOf("no_")||-1!=ba.indexOf("no-")||-1!=ba.indexOf("fallback")){ba=p+T.fallbackImage;var ca="width: auto; height:100%; top: 0; left: 50%; transform: translateY(0); transform: translateX(-50%);",da="fallback"}else var ca="",da="";if(("entertainment"==A.group||"celebrities"==$.category)&&(ca="width: auto; height:100%; top: 0; left: 50%; transform: translateY(0); transform: translateX(-50%);"),1==Math.abs(aa%2)&&(ea+="<div class=\"worm_block\">"),ga="finance"==A.category||"money"==A.group?"style=\"background-image:url('"+ba+"?width=200')\"":"style=\"background-color: black;\"",ea+="\n          <div class=\"list_item\">\n            <div class=\"profile_image_div "+da+"\" "+ga+">\n            <div class=\"num\" style=\"border-color:"+T.hex+"\"><div class=\"num_text\">#<b>"+_[aa].li_rank+"</b></div></div>\n              <img class=\"profile_image\" alt=\""+ba+"?width=200\" style=\""+ca+"\">\n            </div>\n            <div class=\"info\">\n              <div class=\"name\">\n                "+_[aa].li_title+"\n              </div>\n              <div class=\"value\">\n                "+_[aa].li_value+"\n              </div>\n              <div class=\"stat_type\">\n                "+_[aa].li_tag+"\n              </div>\n            </div>\n          </div>\n      ",0==aa%2&&(ea+="</div>"),aa&&0==aa%4&&(ea+="\n        <div class=\"worm_block\">\n        <div class=\"ad_spacer\"></div>\n          <div class=\"ad_item\">\n\n          </div>\n        </div>"),aa==_.length-1||aa==fa-1){ea+="\n        </div>\n        <div class=\"worm_block\">\n          <div class=\"next_list\" style=\"background-color:"+T.hex+";\" id=\"next_list\">\n          <div class=\"next_arrow\">\n            <svg width=\"17\" height=\"30\" viewBox=\"0 0 17 30\">\n                <path fill=\"#FFF\" fill-rule=\"nonzero\" d=\"M16.89 14.463l-14.967 14.9s-.801.555-1.577-.218c-.778-.772 0-1.449 0-1.449L13.663 14.44.976 1.81s-.66-.791.05-1.496c.707-.706 1.696 0 1.696 0l14.168 14.15z\"/>\n            </svg>\n          </div>\n          Next List\n          </div>\n        </div>\n        ",G.innerHTML+=ea,clearInterval(ha);var ha=setInterval(function(){y.getElementById("next_list")&&(clearInterval(ha),A.event&&(A.event.event="widget-list",W=$.l_param+","+$.l_sort+","+$.l_input,A.event.l=W,m({action:"snt_tracker",snt_data:A.event},10)),y.getElementById("next_list").addEventListener("touchend",d),y.getElementById("next_list").addEventListener("click",d),w.classList.add("widget_loaded"))},300)}}}function d(){U=!1,S.getElementsByClassName("widget_zone")[0]&&(S.getElementsByClassName("widget_zone")[0].style.opacity=0,w.parentElement.appendChild(S.getElementsByClassName("widget_zone")[0])),G.innerHTML="",S.style.left="0px",G.scrollLeft=0,b()}function k($){G.scrollLeft+=Z-$.clientX,Z=$.clientX}function m($,_){var aa=[window],ba=window,ca=0;_="undefined"==typeof _?10:_;try{for(;ca++<_&&ba!==window.top;)ba=ba.parent,aa.push(ba)}catch(ea){}for(var da=0;da<aa.length;da++)aa[da].postMessage($,"*")}function o(){for(var ba,$=0,_=G.scrollLeft,aa=0;aa<H.length;aa++)if(ba=H[aa],_+150>=ba.offsetLeft&&_+150<=ba.offsetLeft+ba.offsetWidth&&20<_){var _ret=function(){var da=function(){_=G.scrollLeft,Q=!1;var ea=Math.abs(M)-1;_<L-ea||_>L+ea?aa==H.length-2||30<$?(Q=!0,R=!1,setTimeout(function(){R=!0},500),clearInterval(O)):(0<M&&_>L?M=-1:0>M&&_<L&&(M=1),$++,G.scrollLeft=_+M,!0!=Q&&window.requestAnimationFrame(da)):_<L||_>L?aa==H.length-2||30<$?(Q=!0,R=!1,setTimeout(function(){R=!0},500),clearInterval(O)):(0<M&&_>L?M=-1:0>M&&_<L&&(M=1),$++,G.scrollLeft=_+1,!0!=Q&&window.requestAnimationFrame(da)):(Q=!0,R=!1,setTimeout(function(){R=!0},500),clearInterval(O))};return L=ba.offsetLeft,M=_<L?10:-10,clearInterval(O),window.requestAnimationFrame(da),ba=aa,1<=H[aa].getElementsByClassName("ad_item").length?(E.style.opacity="0",document.getElementById(A.pause_variable).ig_rotation_control=!0):(E.style.opacity="1",document.getElementById(A.pause_variable).ig_rotation_control=!1),{v:void 0}}();if("object"===("undefined"==typeof _ret?"undefined":_typeof(_ret)))return _ret.v}else if(20>G.scrollLeft)return L=0,M=G.scrollLeft<L?1:-1,O=setInterval(function(){_=G.scrollLeft,Q=!1;var ca=0;G.scrollLeft<L-ca||G.scrollLeft>L+ca?aa==H.length-1||30<$?(Q=!0,R=!1,setTimeout(function(){R=!0},500),clearInterval(O)):G.scrollLeft+=M:(Q=!0,R=!1,setTimeout(function(){R=!0},500),clearInterval(O))},15),void(ba=0)}var p="https:"==location.protocol?"https://":"http://",q=document.getElementsByClassName("centipedeIframe");q=q.length;var u="centipede.js",v=document.currentScript||function(){for(var $=document.getElementsByTagName("script"),_=$.length-1;0<=_;_--)if(-1!=$[_].src.indexOf(u))return $[_]}();if(window.frameElement){var w=document.createElement("div");w.id="friendlyIframe_"+q,w.className="centipedeIframe",w.width="300",w.height="250",w.style.border="none",v.parentNode.insertBefore(w,v);var x=w,y=document}else{var w=document.createElement("iframe");w.id="friendlyIframe_"+q,w.className="centipedeIframe",w.width="300",w.height="250",w.src="about:blank",w.style.border="none",v.parentNode.insertBefore(w,v);var x=w.contentWindow,y=x.document}var z="\n    <style>\n    /* google fonts */\n    /* latin-ext */\n    @font-face {\n      font-family: 'Lato';\n      font-style: normal;\n      font-weight: 400;\n      src: local('Lato Regular'), local('Lato-Regular'), url(http://fonts.gstatic.com/s/lato/v13/8qcEw_nrk_5HEcCpYdJu8BTbgVql8nDJpwnrE27mub0.woff2) format('woff2');\n      unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n    }\n    /* latin */\n    @font-face {\n      font-family: 'Lato';\n      font-style: normal;\n      font-weight: 400;\n      src: local('Lato Regular'), local('Lato-Regular'), url(http://fonts.gstatic.com/s/lato/v13/MDadn8DQ_3oT6kvnUq_2r_esZW2xOQ-xsNqO47m55DA.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n    }\n    /* latin-ext */\n    @font-face {\n      font-family: 'Lato';\n      font-style: normal;\n      font-weight: 700;\n      src: local('Lato Bold'), local('Lato-Bold'), url(http://fonts.gstatic.com/s/lato/v13/rZPI2gHXi8zxUjnybc2ZQFKPGs1ZzpMvnHX-7fPOuAc.woff2) format('woff2');\n      unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n    }\n    /* latin */\n    @font-face {\n      font-family: 'Lato';\n      font-style: normal;\n      font-weight: 700;\n      src: local('Lato Bold'), local('Lato-Bold'), url(http://fonts.gstatic.com/s/lato/v13/MgNNr5y1C_tIEuLEmicLmwLUuEpTyoUstqEm5AMlJo4.woff2) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n    }\n    body {\n      border: none;\n      margin: 0;\n      padding: 0;\n      -webkit-overflow-scrolling: touch;\n      -webkit-user-select: none;\n      -khtml-user-select: none;\n      -moz-user-select: none;\n      -o-user-select: none;\n      user-select: none;\n    }\n    img {\n      -webkit-user-select: none;\n      -khtml-user-select: none;\n      -moz-user-select: none;\n      -o-user-select: none;\n      user-select: none;\n      -webkit-user-drag: none;\n      -khtml-user-drag: none;\n      -moz-user-drag: none;\n      -o-user-drag: none;\n      user-drag: none;\n    }\n    .icon {\n      background-position: 50%;\n      background-repeat: no-repeat;\n      height: 30px;\n      width: 30px;\n    }\n    .wrapper {\n      position: absolute;\n      overflow: hidden;\n      width: 300px;\n      height: 250px;\n      background-color: #f7f7f7;\n      border: 1px solid #e1e1e1;\n      box-sizing: border-box;\n    }\n    .edge_shader {\n      position: absolute;\n      right:-5px;\n      top:0;\n      width: 3px;\n      height: 100%;\n      box-shadow:  -5px 0 10px rgba(0,0,0,0.8);\n      z-index: 999;\n      transition: opacity 0.2s ease-in-out;\n    }\n    .helper {\n      box-sizing: border-box;\n      position: absolute;\n      right:0px;\n      left:0px;\n      width: 100%;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      padding: 5px 10px;\n      font-family: lato, helvetica;\n      font-weight: 900;\n      color: #666666;\n      font-size: 12px;\n      -webkit-backdrop-filter: blur(3px);\n      backdrop-filter: blur(3px);\n      background-color: rgba(248, 248, 248, 0.8);\n      transition: opacity 0.2s ease-in-out;\n      z-index: 9;\n    }\n    .helper2 {\n      pointer-events: none;\n      position: absolute;\n      box-sizing: border-box;\n      width: 35px;\n      right:0px;\n      top: 50%;\n      transform: translateY(-50%);\n      padding: 10px 5px 10px 10px;\n      font-family: lato, helvetica;\n      /*font-weight: 300;*/\n      font-size: 20px;\n      color: white;\n      fill: white;\n      border-top-left-radius: 15px;\n      border-bottom-left-radius: 15px;\n      overflow: hidden;\n      -webkit-backdrop-filter: blur(3px);\n      backdrop-filter: blur(3px);\n      background-color: rgba(0, 0, 0, 0.8);\n      box-shadow: 0 2px 2px 0 rgba(0,0,0,0.26), 0 0 0 1px rgba(0,0,0,0.09);\n      opacity: 1;\n      transition: opacity 0.2s ease-in-out;\n      z-index: 9;\n    }\n    .helper2 .icon {\n      animation:swipe 2s infinite;\n    }\n    @keyframes swipe {\n      0%{\n        -webkit-transform: translateX(50px);\n        -moz-transform: translateX(50px);\n        -ms-transform: translateX(50px);\n        -o-transform: translateX(50px);\n        transform: translateX(50px);\n        opacity: 0.1;\n      }\n      50% {\n        -webkit-transform: translateX(-5px);\n        -moz-transform: translateX(-5px);\n        -ms-transform: translateX(-5px);\n        -o-transform: translateX(-5px);\n        transform: translateX(-5px);\n        opacity:1;\n      }\n      100% {\n        -webkit-transform: translateX(-50px);\n        -moz-transform: translateX(-50px);\n        -ms-transform: translateX(-50px);\n        -o-transform: translateX(-50px);\n        transform: translateX(-50px);\n        opacity:0.1;\n      }\n    }\n    .worm {\n      position: absolute;\n      width: 300px;\n      height: 250px;\n      overflow-x: scroll;\n      overflow-y: hidden;\n      white-space: nowrap;\n      background-color: #f7f7f7;\n      animation:bounce 2s infinite;\n      cursor: move;\n      -ms-overflow-style: none;\n    }\n    .worm.stopAnim {\n      transform: translateX(0); //force hw accel\n      -webkit-animation: 0;\n      animation: 0;\n    }\n    @keyframes bounce {\n      0%, 20%, 50%, 80%, 100% {\n        -webkit-transform: translateX(0);\n        -moz-transform: translateX(0);\n        -ms-transform: translateX(0);\n        -o-transform: translateX(0);\n        transform: translateX(0); }\n      40% {\n        -webkit-transform: translateX(12px);\n        -moz-transform: translateX(12px);\n        -ms-transform: translateX(12px);\n        -o-transform: translateX(12px);\n        transform: translateX(12px); }\n      60% {\n        -webkit-transform: translateX(3px);\n        -moz-transform: translateX(3px);\n        -ms-transform: translateX(3px);\n        -o-transform: translateX(3px);\n        transform: translateX(3px); } }\n    .worm_block {\n      position: relative;\n      display: inline-block;\n      height: 250px;\n      padding-left: 5px;\n    }\n    .worm_block:nth-of-type(1) {\n      padding-left: 2px!important;\n    }\n    .worm_block:nth-of-type(2) {\n      padding-left: 0px;\n    }\n    // .worm_block:nth-of-type(3n+1) {\n    //   padding-left: 0px;\n    // }\n    .worm_block:last-of-type {\n      margin: 0;\n      padding: 0;\n    }\n    .list_item {\n      overflow: hidden;\n      position: relative;\n      display: inline-block;\n      height: 218px;\n      width: 138px;\n      margin-bottom:4px;\n      background-color: white;\n      border-radius: 2px;\n      border: solid 1px #e1e1e1;\n      margin-left: 2px;\n    }\n    .ad_spacer {\n      width: 296px;\n      height: 100%;\n    }\n    .worm_block:nth-of-type(3n+5) {\n      margin-left:2px;\n    }\n    .ad_item {\n      position: absolute;\n      height: 100%;\n      top:0;\n      z-index: 99;\n    }\n    .profile_image_div {\n      width: 100%;\n      height: 123px;\n      display: block;\n      overflow:hidden;\n      position: absolute;\n      background-size: 1000% 1000%;\n      image-rendering: optimizeSpeed;             /*                     */\n      image-rendering: -moz-crisp-edges;          /* Firefox             */\n      image-rendering: -o-crisp-edges;            /* Opera               */\n      image-rendering: -webkit-optimize-contrast; /* Chrome (and Safari) */\n      image-rendering: optimize-contrast;         /* CSS3 Proposed       */\n      -ms-interpolation-mode: nearest-neighbor;   /* IE8+                */\n      /*border-bottom: 1px solid rgba(50,50,50,0.1);*/\n    }\n    .profile_image_div.fallback::before {\n      content: \"\";\n      height: 100%;\n      width: 100%;\n      top:0;\n      left:0;\n      position: absolute;\n      z-index: 99;\n      opacity: 0.6;\n    }\n    .profile_image {\n      position: absolute;\n      width: 100%;\n      top: 50%;\n      transform: translateY(-50%);\n    }\n    .num {\n      font-family: lato, helvetica;\n      position: absolute;\n      right: -5px;\n      top: -20px;\n      width: 0;\n      height: 0;\n      border-top: 30px solid transparent;\n      border-bottom: 30px solid transparent;\n      border-left: 30px solid black;\n      transform: rotate(-45deg);\n      z-index: 100;\n      outline: 1px solid rgba(255,255,255,0.4);\n    }\n    .num_text {\n    \tfont-size: 12px;\n      color: white;\n      width: 20px;\n      top: -9px;\n      right: 9px;\n      text-align: center;\n      font-weight: lighter;\n      position: absolute;\n      transform: rotate(45deg);\n    }\n    .info {\n      width: 100%;\n      position: absolute;\n      top: 130px;\n      font-family: lato, helvetica;\n      text-align: center;\n    }\n    .name {\n      font-size: 14px;\n      max-width 95%;\n      display: -webkit-box;\n      -webkit-line-clamp: 2;\n      -webkit-box-orient: vertical;\n      white-space: normal;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      padding: 0 5px;\n    }\n    .symbl, .location {\n      font-size: 12px;\n      color: #bebebe;\n      max-width 95%;\n      padding: 0 5px;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n    .location {\n      margin-bottom: 5px;\n      max-width 95%;\n      padding: 0 5px;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n    .value {\n      font-size: 20px;\n      color: #272727;\n      font-weight: 900;\n      margin-top: 3px;\n      display: -webkit-box;\n      -webkit-line-clamp: 2;\n      -webkit-box-orient: vertical;\n      white-space: normal;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      padding: 0 5px;\n    }\n    .stat_type {\n      font-size: 12px;\n      color: #666666;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      padding: 0 5px;\n    }\n    .next_list {\n      font-family: lato, helvetica;\n      font-size: 12px;\n      position: relative;\n      top: -96px;\n      width: 56px;\n      margin: 0 5px 0 0;\n      padding: 80px 10px 88px 10px;\n      text-align: center;\n      color: white;\n    }\n    .next_arrow {\n      font-size: 30px;\n      margin-bottom: 5px;\n    }\n    </style>\n    <div class=\"wrapper\">\n      <div class=\"helper\" id=\"helper_"+q+"\">\n      </div>\n      <div class=\"helper2\" id=\"helper2_"+q+"\">\n        <div class=\"icon swipe_right\">\n          <svg version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"10 10 80 80\" enable-background=\"new 0 0 100 100\" xml:space=\"preserve\"><g><path  d=\"M36,31.345c0-0.912,0-1.778,0-2.591c-2-1.458-3.402-3.814-3.402-6.476c0-4.416,3.55-8.01,7.965-8.01   c4.418,0,7.881,3.594,7.881,8.01c0,2.662-1.443,5.019-3.443,6.477v2.59c3-1.704,5.631-5.125,5.631-9.066   c0-5.635-4.531-10.219-10.166-10.219s-10.103,4.584-10.103,10.219C30.362,26.221,33,29.642,36,31.345z\"/><path  d=\"M70.07,43.118h-2.762c-0.777,0-1.574,0.188-2.275,0.53c-0.362-2.075-2.176-3.658-4.353-3.658h-2.763   c-0.909,0-1.759,0.278-2.462,0.752c-0.608-1.715-2.246-2.944-4.165-2.944h-2.763c-0.805,0-1.559,0.216-2.21,0.593V22.278   c0-3.198-2.602-5.8-5.8-5.8c-3.196,0-5.8,2.602-5.8,5.8v30.591c-1.239,0.589-2.389,1.381-3.389,2.379l-2.264,2.265   c-4.739,4.739-4.739,12.447,0,17.186l6.31,6.311c0.31,0.31,0.635,0.596,0.97,0.867c2.103,3.621,6.032,6.064,10.525,6.064h15.467   c6.701,0,12.15-5.429,12.15-12.102V47.536C74.488,45.1,72.507,43.118,70.07,43.118z M72.279,75.839   c0,5.454-4.459,9.892-9.941,9.892H46.871c-1.821,0-3.525-0.497-4.995-1.353c-1.219-0.729-2.577-1.788-3.82-3.981   c-0.717-1.365-1.127-2.914-1.127-4.558c0-0.61-0.495-1.105-1.104-1.105c-0.611,0-1.105,0.495-1.105,1.105   c0,0.503,0.035,0.997,0.095,1.482l-4.186-4.186c-3.876-3.876-3.876-10.184,0-14.061l2.265-2.264   c0.557-0.557,1.173-1.029,1.826-1.434v7.567c0,0.611,0.494,1.105,1.105,1.105c0.609,0,1.104-0.494,1.104-1.105V22.278   c0-1.979,1.61-3.591,3.59-3.591c1.98,0,3.591,1.612,3.591,3.591v28.378c0,0.611,0.494,1.105,1.104,1.105   c0.609,0,1.104-0.494,1.104-1.105v-8.44c0-1.217,0.991-2.208,2.21-2.208h2.763c1.217,0,2.209,0.991,2.209,2.208v8.452   c0,0.61,0.493,1.104,1.104,1.104c0.609,0,1.105-0.493,1.105-1.104v-6.259c0-1.217,0.99-2.209,2.208-2.209h2.763   c1.218,0,2.209,0.992,2.209,2.209v6.247c0,0.611,0.494,1.105,1.105,1.105c0.608,0,1.104-0.494,1.104-1.105v-4.005   c0-0.644,1.137-1.324,2.21-1.324h2.762c1.218,0,2.209,0.991,2.209,2.209V75.839z\"/><path  d=\"M62.912,68H49.009l1.428-1.348c0.432-0.432,0.432-1.09,0-1.521c-0.432-0.433-1.131-0.412-1.562,0.02   l-3.311,3.321c-0.103,0.102-0.185,0.229-0.241,0.364c-0.056,0.134-0.086,0.279-0.086,0.427s0.03,0.294,0.086,0.427   c0.052,0.124,0.129,0.233,0.22,0.329c0.008,0.008,0.011,0.021,0.019,0.028l3.313,3.313c0.215,0.216,0.498,0.323,0.782,0.323   c0.281,0,0.564-0.107,0.78-0.323c0.432-0.432,0.432-1.315,0-1.747L49.007,70h13.905c0.61,0,1.104-0.39,1.104-0.999   C64.017,68.39,63.522,68,62.912,68z\"/></g></svg>\n        </div>\n      </div>\n    <div class=\"worm\" id=\"worm_"+q+"\">\n    </div>\n  </div>\n    ";window.frameElement?x.innerHTML=z:y.write(z);var A={dom:"chicagotribune.com",category:"nba",rand:"1",env:"prod-"};if(null!=decodeURIComponent(location.search.substr(1))&&""!=decodeURIComponent(location.search.substr(1)))A=JSON.parse(decodeURIComponent(location.search.substr(1)));else{var B=v.src.split(u+"?")[1];if(""!=B&&null!=B)try{A=JSON.parse(decodeURI(B))}catch($){console.log($)}}"prod-"!=A.env&&"dev-"!=A.env&&(A.env="prod-");var D=p+A.env.replace("prod-","")+"dw.synapsys.us/list_api.php",E=y.getElementById("helper_"+q),F=y.getElementById("helper2_"+q),G=y.getElementById("worm_"+q),H=G.getElementsByClassName("worm_block"),J=!1,K,L=0,M=0,N,O,P=0,Q=!0,R=!0,S,T,U=!1,V=!1,W="";"undefined"==typeof A.group&&("undefined"==typeof A.category||-1==["finance","nba","college_basketball","weather","crime","demographics","politics","disaster","mlb","nfl","ncaaf","nflncaaf","celebrities"].indexOf(A.category))&&(A.category="finance"),w.classList.add("centipede_"+A.category),b();var X=!1;try{var Y=Object.defineProperty({},"passive",{get:function get(){X=!0}});window.addEventListener("test",null,Y)}catch($){}G.addEventListener("scroll",function(){if(Q){if(!0!=J&&A.event&&(A.event.event="widget-interaction",A.event.l=W,m({action:"snt_tracker",snt_data:A.event},10)),!1==U){U=!0,clearInterval($);var $=setInterval(function(){if(G.getElementsByClassName("profile_image")[0]){clearInterval($);for(var ba=G.getElementsByClassName("profile_image"),ca=1;ca<ba.length;ca++)ba[ca].src=ba[ca].alt}},500)}J=!0,20<this.scrollLeft?!1==V&&(F.style.opacity="0",G.classList.add("stopAnim"),V=!0):(G.classList.remove("stopAnim"),E.style.opacity="1",F.style.opacity="1",V=!1);var _=S.getBoundingClientRect();if(-600>_.left||600<_.left){var aa=G.getElementsByClassName("ad_spacer")[Math.floor((this.scrollLeft+450)/900)].parentElement.offsetLeft+150;S.style.left=aa-S.offsetWidth+"px"}clearTimeout(K),K=setTimeout(function(){!0==R&&o(),G.removeEventListener("mousemove",k),J=!1},300)}}),G.addEventListener("touchend",function(){if(!1==J);else var _=setInterval(function(){!1==J&&clearTimeout(_)},250)},!!X&&{passive:!0}),G.addEventListener("touchstart",function(){Q=!0,R=!1,setTimeout(function(){R=!0},500),clearInterval(O)},!!X&&{passive:!0});var Z;G.addEventListener("mousedown",function($){Z=$.clientX,G.addEventListener("mousemove",k,!!X&&{passive:!0})},!!X&&{passive:!0}),G.addEventListener("mouseup",function(){G.removeEventListener("mousemove",k)},!!X&&{passive:!0})};if("complete"==document.readyState)centipede();else var initLoops=0,initDelay=setInterval(function(){"complete"==document.readyState||10<initLoops?(clearInterval(initDelay),centipede()):initLoops++},500);
