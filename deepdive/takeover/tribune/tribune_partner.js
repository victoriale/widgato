"use strict";!function(){var n=window;try{for(;n!==top;)n=n.parent}catch(e){console.error("ddh - couldn/'t access the top window")}var t,a,i,o=n.location.hostname,d="#004e87";o=o.replace(/www./,"");var r,s,l="https:"===location.protocol?"https":"http",m=l+"://w1.synapsys.us/widgets/deepdive/images/baseball_hero.jpg",c="/?utm_source=Tribune&utm_medium=Siderails&utm_campaign=Baseball%20Takeover",p="/?utm_source=Tribune&utm_medium=TopSection&utm_campaign=Baseball%20Takeover";switch(o){case"baltimoresun.com":a=t=131,i=1280,r="md",s=n.document.querySelector(".trb_masthead");break;case"capitalgazette.com":a=t=131,i=1280,r="md",s=n.document.querySelector(".trb_masthead");break;case"chicagotribune.com":a=t=131,i=1280,r="il",s=n.document.querySelector(".trb_masthead");break;case"courant.com":a=t=131,i=1280,r="ct",s=n.document.querySelector(".trb_masthead");break;case"dailypress.com":a=t=131,i=1280,r="va",s=n.document.querySelector(".trb_masthead");break;case"latimes.com":a=t=131,i=1280,r="ca",s=n.document.querySelector(".trb_masthead");break;case"mcall.com":a=t=131,i=1280,r="pa",s=n.document.querySelector(".trb_masthead");break;case"orlandosentinel.com":a=t=131,i=1280,r="fl",s=n.document.querySelector(".trb_masthead");break;case"sandiegouniontribune.com":a=89,t=0,i=1280,r="ca",s=n.document.querySelector(".target-bg");break;case"southflorida.com":a=t=131,i=1280,r="fl",s=n.document.querySelector(".trb_masthead");break;case"sun-sentinel.com":a=t=131,i=1280,r="fl",s=n.document.querySelector(".trb_masthead");break;default:a=t=131,i=1280,r="il",s=n.document.querySelector(".trb_allContentWrapper")}o="http://baseball."+o;var h,g,f,b,u,v=500,y=n.document.getElementsByTagName("body")[0],x=y.offsetWidth,w=4,k=!1,T=!1,I=[],S=function(){g=n.document.createElement("a"),g.className="to-left-rail",g.href=o+c,g.target="_blank",g.innerHTML='\n      <div id="to-left-ad">\n        <img class="to-left-ad-presented" src="'+l+'://w1.synapsys.us/widgets/deepdive/images/logo_left.png">\n      </div>\n    ',f=n.document.createElement("a"),f.className="to-right-rail",f.href=o+c,f.target="_blank",f.innerHTML='\n      <div id="to-right-ad">\n        <img class="to-right-ad-presented" src="'+l+'://w1.synapsys.us/widgets/deepdive/images/logo_right.png">\n      </div>\n    ',y.insertBefore(f,y.firstChild),y.insertBefore(g,y.firstChild);var e=n.document.getElementById("to-left-ad"),t=n.document.createElement("script");t.src=l+"://content.synapsys.us/embeds/mlb/deepdive_160x600/partner.js",e.insertBefore(t,e.firstChild);var a=n.document.getElementById("to-right-ad"),i=n.document.createElement("script");i.src=l+"://content.synapsys.us/embeds/mlb/deepdive_160x600/partner-right.js",a.insertBefore(i,a.firstChild),k=!0},_=function(){h=n.document.createElement("div"),h.className="ddh-container",h.innerHTML='\n      <div class="ddh-media">\n        <button class="ddh-media-close">\n          <span class="ddh-icon-times"></span><br>\n          <span class="ddh-close-text">CLOSE</span>\n        </button>\n        <div class="ddh-media-content">\n          <div id="ddh-media-video"></div>\n          <a target="_blank" href="'+o+p+'">\n            <div class="ddh-media-right-content">\n              <img width="280px" height="40px" src="'+l+'://w1.synapsys.us/widgets/deepdive/images/baseball_logo.png?">\n              <div class="ddh-media-right-title">\n                Who\'s Hot and Who\'s Not?\n                <div class="ddh-media-right-title-border"></div>\n              </div>\n              <ul class="ddh-media-right-list">\n                <li>\n                  <img src="'+l+'://w1.synapsys.us/widgets/deepdive/images/baseball_icon.png" >Stats\n                </li>\n                <li>\n                  <img src="'+l+'://w1.synapsys.us/widgets/deepdive/images/baseball_field_icon.png" >Stories\n                </li>\n                <li>\n                  <img src="'+l+'://w1.synapsys.us/widgets/deepdive/images/baseball_hat_icon.png" >Profiles\n                </li>\n              </ul>\n              <div class="ddh-media-cta">\n                FIND OUT NOW\n                <span class="ddh-icon-arrow-right"></span>\n              </div>\n            </div>\n          </a>\n        </div>\n      </div>\n    ';var e=n.document.createElement("div");e.className="ddh-bar",e.innerHTML='\n      <div class="ddh-bar-title">\n        <img src="'+l+'://w1.synapsys.us/widgets/deepdive/images/baseball_icon.png" >\n        TODAY\'S MLB GAMES\n      </div>\n\n      <ul class="ddh-bar-schedule"></ul>\n    ',s.insertBefore(h,s.firstChild);var t=new XMLHttpRequest;t.onreadystatechange=function(){if(4===t.readyState&&200===t.status){var e=JSON.parse(t.responseText),a=n.document.getElementById("ddh-media-video"),i=n.document.createElement("iframe");i.frameBorder="0",i.width="650px",i.height="366px",i.setAttribute("allowfullscreen",""),i.src=e.data[0].videoLink+"&autoplay=on&sound=off",a.appendChild(i)}},t.open("GET",l+"://prod-homerunloyal-api.synapsys.us/article/video/batch/division/"+r+"/1/1",!0),t.send();var a=n.document.getElementsByClassName("ddh-media-close")[0];a.addEventListener("click",function(){var e=n.document.getElementsByClassName("ddh-media")[0];e.parentElement.removeChild(e),h.className="ddh-container ddh-closed"});var i=E(),d=new Date((new Date).getTime()+3600*i.offset*1e3),m=d.getUTCFullYear(),c=d.getUTCMonth()+1;c=1===c.toString().length?"0"+c:c;var g=d.getUTCDate(),f=m+"-"+c+"-"+g;h.appendChild(e);var v=new XMLHttpRequest;v.onreadystatechange=function(){if(4===v.readyState&&200===v.status){var t=JSON.parse(v.responseText);u=B(t.data,i.offset,i.tzAbbrev,g),b=u.length;var a=s.offsetWidth;w=a>=1080?4:3;for(var o=0;w>o;o++)"undefined"!=typeof u[o]&&I.push(o);for(var d=0,r=I.length;r>d;d++){var l=I[d],m=n.document.createElement("li");m.className="ddh-bar-game",m.innerHTML=u[l].htmlMarkup;var c=n.document.getElementsByClassName("ddh-bar-schedule")[0];c.appendChild(m)}var p=n.document.createElement("div");p.className="ddh-bar-nav",p.innerHTML='\n          <button class="ddh-bar-button ddh-prev" >\n            <span class="ddh-icon-angle-left"></span>\n          </button>\n          <button class="ddh-bar-button ddh-next">\n            <span class="ddh-icon-angle-right"></span>\n          </button>\n        ',e.appendChild(p);var h=n.document.getElementsByClassName("ddh-bar-button ddh-next")[0];h.addEventListener("click",function(){L();for(var e=0;w>e;e++){var t=I[e]+w;t>=b&&(t-=b),"undefined"!=typeof u[t]&&(I[e]=t)}for(var a=0,i=I.length;i>a;a++){var o=I[a],d=n.document.createElement("li");d.className="ddh-bar-game",d.innerHTML=u[o].htmlMarkup;var r=n.document.getElementsByClassName("ddh-bar-schedule")[0];r.appendChild(d)}});var f=n.document.getElementsByClassName("ddh-bar-button ddh-prev")[0];f.addEventListener("click",function(){L();for(var e=0;w>e;e++){var t=I[e]-w;0>t&&(t+=b),"undefined"!=typeof u[t]&&(I[e]=t)}for(var a=0,i=I.length;i>a;a++){var o=I[a],d=n.document.createElement("li");d.className="ddh-bar-game",d.innerHTML=u[o].htmlMarkup;var r=n.document.getElementsByClassName("ddh-bar-schedule")[0];r.appendChild(d)}})}},v.open("GET",l+"://prod-homerunloyal-api.synapsys.us/league/boxScores/"+f,!0),v.send(),T=!0},E=function(){var n,e,t,a,i=(new Date).getUTCFullYear(),o=(new Date).getTime();for(n=new Date(i,2,7,0,0,0,0),n.setDate(7+(7-n.getDay())),n.setUTCHours(7),n=n.getTime(),e=new Date(i,10,1,0,0,0,0);0!==e.getDay();)e.setDate(e.getDate()+1);return e.setUTCHours(6),e=e.getTime(),n>=o||o>e?(t=-5,a="EST"):(t=-4,a="EDT"),{offset:t,tzAbbrev:a}},C=function(n,e,t){var n=new Date(n+3600*e*1e3),a=n.getUTCHours(),i=a>=12?"PM":"AM";a=a>12?a-12:a;var o=n.getUTCMinutes();o=1===o.toString().length?"0"+o.toString():o;var d=a+":"+o+i+" "+t;return d},N=function(n,e,t){var a=new Date(n+3600*t*1e3),a=a.getUTCDate();return e===a},M=function(n){return n.sort(function(n,e){return n.timestamp-e.timestamp})},D=function(n){var e=n%10,t=n%100;return 1==e&&11!=t?n+"st":2==e&&12!=t?n+"nd":3==e&&13!=t?n+"rd":n+"th"},B=function(n,e,t,a){var i=[],d=[],r=[];for(var s in n){var l=n[s];switch(l.gameInfo.eventStatus){case"pre-event":if(l.gameInfo.live===!1)N(l.gameInfo.startDateTimestamp,a,e)&&i.push({homeTeam:l.homeTeamInfo.abbreviation,homeScore:"-",awayTeam:l.awayTeamInfo.abbreviation,awayScore:"-",timestamp:l.gameInfo.startDateTimestamp,eventStatus:l.gameInfo.eventStatus,htmlMarkup:'\n                  <a target="_blank" href="'+o+"/articles/pregame-report/"+l.gameInfo.eventId+'" class="ddh-bar-game-link">\n                    <ul class="ddh-bar-game-teams">\n                      <li>\n                        '+l.homeTeamInfo.abbreviation+'\n                        <span class="ddh-bar-game-teamscore">\n                          -\n                        </span>\n                      </li>\n                      <li>\n                        '+l.awayTeamInfo.abbreviation+'\n                        <span class="ddh-bar-game-teamscore">\n                          -\n                        </span>\n                      </li>\n                    </ul>\n                    <span class="ddh-bar-game-time">\n                      '+C(l.gameInfo.startDateTimestamp,e,t)+"\n                    </span>\n                  </a>\n                "});else if(N(l.gameInfo.startDateTimestamp,a,e)){if(l.gameInfo.inningsPlayed<=3)var m=o+"/articles/pregame-report/"+l.gameInfo.eventId;else if(l.gameInfo.inningsPlayed>3&&l.gameInfo.inningsPlayed<=5)var m=o+"/articles/third-inning-report/"+l.gameInfo.eventId;else if(l.gameInfo.inningsPlayed>5&&l.gameInfo.inningsPlayed<=7)var m=o+"/articles/fifth-inning-report/"+l.gameInfo.eventId;else if(l.gameInfo.inningsPlayed>7)var m=o+"/articles/seventh-inning-report/"+l.gameInfo.eventId;var c;c="top"===l.gameInfo.inningHalf?'<span class="ddh-game-inning-top"></span>':"bottom"===l.gameInfo.inningHalf?'<span class="ddh-game-inning-bottom"></span>':"",d.push({homeTeam:l.homeTeamInfo.abbreviation,homeScore:l.homeTeamInfo.score,awayTeam:l.awayTeamInfo.abbreviation,awayScore:l.awayTeamInfo.score,timestamp:l.gameInfo.startDateTimestamp,eventStatus:l.gameInfo.eventStatus,htmlMarkup:'\n                  <a target="_blank" href="'+m+'" class="ddh-bar-game-link">\n                    <ul class="ddh-bar-game-teams">\n                      <li>\n                        '+l.awayTeamInfo.abbreviation+'\n                        <span class="ddh-bar-game-teamscore">\n                          '+l.awayTeamInfo.score+"\n                        </span>\n                      </li>\n                      <li>\n                        "+l.homeTeamInfo.abbreviation+'\n                        <span class="ddh-bar-game-teamscore">\n                          '+l.homeTeamInfo.score+'\n                        </span>\n                      </li>\n                    </ul>\n                    <span class="ddh-bar-game-time">\n                      '+c+(l.gameInfo.inningsPlayed?D(l.gameInfo.inningsPlayed):C(l.gameInfo.startDateTimestamp,e,t))+"\n                    </span>\n                  </a>\n                "})}break;case"Final":case"post-event":N(l.gameInfo.startDateTimestamp,a,e)&&r.push({homeTeam:l.homeTeamInfo.abbreviation,homeScore:l.homeTeamInfo.score,awayTeam:l.awayTeamInfo.abbreviation,awayScore:l.awayTeamInfo.score,timestamp:l.gameInfo.startDateTimestamp,eventStatus:l.gameInfo.eventStatus,htmlMarkup:'\n                <a target="_blank" href="'+o+"/articles/postgame-report/"+l.gameInfo.eventId+'" class="ddh-bar-game-link">\n                  <ul class="ddh-bar-game-teams">\n                    <li>\n                      '+l.homeTeamInfo.abbreviation+'\n                      <span class="ddh-bar-game-teamscore">\n                        '+(l.homeTeamInfo.score||"-")+"\n                      </span>\n                    </li>\n                    <li>\n                      "+l.awayTeamInfo.abbreviation+'\n                      <span class="ddh-bar-game-teamscore">\n                        '+(l.awayTeamInfo.score||"-")+'\n                      </span>\n                    </li>\n                  </ul>\n                  <span class="ddh-bar-game-time">\n                    FINAL\n                  </span>\n                </a>\n              '})}}i=M(i),d=M(d),r=M(r);var p=d.concat(i,r);return p},L=function(){for(var e=n.document.getElementsByClassName("ddh-bar-schedule")[0];e.hasChildNodes();)e.removeChild(e.firstChild)},z=n.document.createElement("link");z.rel="stylesheet",z.type="text/css",z.href="https://fonts.googleapis.com/css?family=Lato:300,400",n.document.head.appendChild(z);var H=n.document.createElement("style");H.innerHTML='\n  @charset "UTF-8";\n\n  @font-face {\n    font-family: "takeover-deep-dive";\n    src:url("'+l+'://w1.synapsys.us/widgets/deepdive/fonts/font_middlelayer.php?type=eot");\n    src:url("'+l+'://w1.synapsys.us/widgets/deepdive/fonts/font_middlelayer.php?type=eot_iefix") format("embedded-opentype"),\n      url("'+l+'://w1.synapsys.us/widgets/deepdive/fonts/font_middlelayer.php?type=woff") format("woff"),\n      url("'+l+'://w1.synapsys.us/widgets/deepdive/fonts/font_middlelayer.php?type=ttf") format("truetype"),\n      url("'+l+'://w1.synapsys.us/widgets/deepdive/fonts/font_middlelayer.php?type=svg") format("svg");\n    font-weight: normal;\n    font-style: normal;\n\n  }\n\n  [data-icon]:before {\n    font-family: "takeover-deep-dive" !important;\n    content: attr(data-icon);\n    font-style: normal !important;\n    font-weight: normal !important;\n    font-variant: normal !important;\n    text-transform: none !important;\n    speak: none;\n    line-height: 1;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  [class^="ddh-icon-"]:before,\n  [class*=" ddh-icon-"]:before {\n    font-family: "takeover-deep-dive" !important;\n    font-style: normal !important;\n    font-weight: normal !important;\n    font-variant: normal !important;\n    text-transform: none !important;\n    speak: none;\n    line-height: 1;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  .ddh-icon-arrow-right:before {\n    content: "\\61";\n  }\n  .ddh-icon-angle-right:before {\n    content: "\\62";\n  }\n  .ddh-icon-angle-left:before {\n    content: "\\63";\n  }\n  .ddh-icon-times:before {\n    content: "\\64";\n  }\n\n  .to-left-rail{\n    width: '+v+"px;\n    position: fixed;\n    top: 0;\n    right: calc(50% + 640px);\n    bottom: 0;\n    background-image: url('"+l+"://w1.synapsys.us/widgets/deepdive/images/baseball_left.jpg');\n    display: none;\n    background-color: #000;\n    background-repeat: no-repeat;\n    background-position: top right;\n    contain: strict;\n  }\n  @media(min-width: 1600px){\n    .to-left-rail{\n      display: block;\n    }\n  }\n  // .to-left-rail.to-rail-visible{\n  //   display: block;\n  // }\n  #to-left-ad{\n    width: 160px;\n    height: 600px;\n    position: absolute;\n    top: "+a+"px;\n    right: 0;\n  }\n  .to-left-ad-presented{\n    position: absolute;\n    bottom: -76px;\n    right: 15px;\n  }\n  .to-right-rail{\n    width: "+v+"px;\n    position: fixed;\n    top: 0;\n    left: calc(50% + 640px);\n    bottom: 0;\n    background-image: url('"+l+"://w1.synapsys.us/widgets/deepdive/images/baseball_right.jpg');\n    display: none;\n    background-color: #000;\n    background-repeat: no-repeat;\n    contain: strict;\n  }\n  @media(min-width: 1600px){\n    .to-right-rail{\n      display: block;\n    }\n  }\n  // .to-right-rail.to-rail-visible{\n  //   display: block;\n  // }\n  #to-right-ad{\n    width: 160px;\n    height: 600px;\n    position: absolute;\n    top: "+a+"px;\n    left: 0;\n  }\n  .to-right-ad-presented{\n    position: absolute;\n    bottom: -76px;\n    left: 15px;\n  }\n\n  .ddh-container{\n    width: 100%;\n    margin: -40px 0 40px;\n    font-family: Lato, Helvetica;\n    display: none;\n    height: 496px;\n    contain: strict;\n  }\n  .ddh-container.ddh-closed{\n    height: 50px;\n  }\n  @media(min-width: 990px){\n    .ddh-container{\n      display: block;\n    }\n  }\n  // .ddh-container.ddh-visible{\n  //   display: block;\n  // }\n  .ddh-media{\n    background-color: #363636;\n    padding: 40px 0;\n    position: relative;\n    background-size: cover;\n    background-image: url('"+m+"');\n  }\n  .ddh-media-content{\n    width: 970px;\n    height: 366px;\n    margin: 0 auto;\n    background-color: #000;\n  }\n  #ddh-media-video{\n    width: 650px;\n    height: 366px;\n    background-color: #464646;\n    float: left;\n  }\n  .ddh-media-right-content{\n    box-sizing: border-box;\n    border: 5px solid #e1e1e1;\n    background-image: url('"+l+"://w1.synapsys.us/widgets/deepdive/images/right_bgimage.jpg');\n    float: right;\n    width: 320px;\n    height: 366px;\n    background-color: #363636;\n    color: #fff;\n    padding: 15px;\n    text-align: center;\n  }\n  .ddh-media-right-title{\n    font-size: 22px;\n    display: inline-block;\n    margin-top: 20px;\n  }\n  .ddh-media-right-title-border{\n    width: 100%;\n    height: 2px;\n    margin-top: 5px;\n    background: #b91614; /* For browsers that do not support gradients */\n    background: -webkit-linear-gradient(left, #b91614 , #1b3e6d); /* For Safari 5.1 to 6.0 */\n    background: linear-gradient(to right, #b91614 , #1b3e6d); /* Standard syntax */\n  }\n  .ddh-media-right-list{\n    list-style-type: none;\n    margin: 15px 0 35px 0;\n    padding: 0 0 0 35px;\n    text-align: left;\n    font-size: 24px;\n  }\n  .ddh-media-right-list>li{\n    margin-bottom: 10px;\n  }\n  .ddh-media-right-list>li>img{\n    width: 30px;\n    vertical-align: middle;\n    margin-right: 15px;\n  }\n  .ddh-media-cta{\n    width: 266px;\n    height: 55px;\n    line-height: 55px;\n    background-color: #bc2027;\n    color: #fff;\n    display: inline-block;\n    border-radius: 30px;\n    font-size: 24px;\n    font-weight: 300;\n    text-decoration: none;\n  }\n  .ddh-media-cta>.ddh-icon-arrow-right{\n    vertical-align: middle;\n    margin-left: 10px;\n  }\n\n  .ddh-media-close{\n    width: 50px;\n    height: 50px;\n    background-color: #000 !important;\n    opacity: 0.33;\n    border-radius: 50%;\n    color: #fff !important;\n    position: absolute;\n    top: 10px;\n    right: 10px;\n    border: none;\n    font-weight: 300;\n    cursor: pointer;\n    font-size: 12px;\n    line-height: 1;\n    z-index: 10;\n    padding: 0;\n  }\n  .ddh-media-close>.ddh-icon-times{\n    font-size: 30px;\n    vertical-align: middle;\n  }\n  .ddh-media-close>.ddh-close-text{\n    display: none;\n  }\n  .ddh-media-close:focus{\n    outline: none;\n  }\n  @media(min-width: 1180px){\n    .ddh-media-close{\n      width: 90px;\n      height: 90px;\n    }\n    .ddh-media-close>.ddh-icon-times{\n      font-size: 40px;\n    }\n    .ddh-media-close>.ddh-close-text{\n      display: inline;\n    }\n  }\n\n  .ddh-bar{\n    width: 100%;\n    min-width: 990px;\n    height: 50px;\n    line-height: 50px;\n    background-color: "+d+";\n    color: #fff;\n  }\n  .ddh-bar-title{\n    font-size: 18px;\n    float: left;\n    box-sizing: border-box;\n    height: 50px;\n    line-height: 50px;\n    padding: 0 10px;\n    width: auto;\n  }\n  .ddh-bar-title>img{\n    vertical-align: middle;\n    margin-right: 3px;\n    -ms-transform: rotate(90deg); /* IE 9 */\n    -webkit-transform: rotate(90deg); /* Chrome, Safari, Opera */\n    transform: rotate(90deg);\n  }\n  .ddh-bar-schedule{\n    list-style-type: none;\n    float: left;\n    margin: 0 5px 0 0;\n    padding: 0;\n    height: 100%;\n  }\n  .ddh-bar-game{\n    display: inline-block;\n    width: 166px;\n    height: 50px;\n    border-right: 1px solid #2c2c2c;\n    box-sizing: border-box;\n    overflow: hidden;\n  }\n  .ddh-bar-game:last-child{\n    border-right: none;\n  }\n  .ddh-bar-game-link{\n    display: block;\n    width: 100%;\n    height: 100%;\n    padding: 0 10px 0 15px;\n    box-sizing: border-box;\n    text-decoration: none;\n    color: #fff !important;\n  }\n  .ddh-bar-game-teams{\n    list-style-type: none;\n    margin: 0;\n    padding: 0;\n    width: 57px;\n    line-height: normal;\n    display: inline-block;\n    vertical-align: middle;\n    font-size: 14px;\n  }\n  .ddh-game-inning-top:before{\n    content: '';\n    width: 0;\n    height: 0;\n    border-style: solid;\n    border-width: 0 7px 9px 7px;\n    border-color: transparent transparent #fff transparent;\n    margin-right: 5px;\n    display: inline-block;\n  }\n  .ddh-game-inning-bottom:before{\n    content: '';\n    width: 0;\n    height: 0;\n    border-style: solid;\n    border-width: 9px 7px 0 7px;\n    border-color: #fff transparent transparent transparent;\n    margin-right: 5px;\n    display: inline-block;\n  }\n  .ddh-bar-game-teamscore{\n    float: right;\n  }\n  .ddh-bar-game-time{\n    font-size: 12px;\n    float: right;\n    font-weight: 400;\n  }\n  .ddh-bar-nav{\n    float: left;\n    margin-right: 5px;\n  }\n  .ddh-bar-button{\n    width: 30px;\n    height: 30px;\n    line-height: 30px;\n    border-radius: 5px;\n    background-color: #fff !important;\n    border: none;\n    color: #000 !important;\n    padding: 0;\n    margin: 0 3px 0 0;\n    vertical-align: middle;\n    cursor: pointer;\n    font-size: 24px;\n  }\n  .ddh-bar-button>span{\n    vertical-align: middle;\n  }\n  .ddh-bar-button:focus{\n    outline: none;\n  }\n  ",n.document.head.appendChild(H);var q=s.offsetWidth;x-q>=320&&S(),q>=990&&_(),n.addEventListener("resize",function(){var e=n.document.getElementsByTagName("body")[0].offsetWidth,t=s.offsetWidth;if(1080>t&&3!==w&&T){w=3,I.pop(),L();for(var a=0,i=I.length;i>a;a++){var o=I[a],d=n.document.createElement("li");d.className="ddh-bar-game",d.innerHTML=u[o].htmlMarkup;var r=n.document.getElementsByClassName("ddh-bar-schedule")[0];r.appendChild(d)}}else if(t>=1080&&4!==w&&T){w=4;var l=I[I.length-1];I[I.length]=l+1>=b?0:l+1,L();for(var a=0,i=I.length;i>a;a++){var o=I[a],d=n.document.createElement("li");d.className="ddh-bar-game",d.innerHTML=u[o].htmlMarkup;var r=n.document.getElementsByClassName("ddh-bar-schedule")[0];r.appendChild(d)}}!k&&e-t>=320&&S(),!T&&e>=990&&_()})}();
