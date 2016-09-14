"use strict";!function(e){function t(){var e=document.createElement("base");e.target="_parent",document.head.appendChild(e);var t=document.createElement("link");t.rel="stylesheet",t.type="text/css",t.dataset.resource_from="boxscores-embed",t.href="https://fonts.googleapis.com/css?family=Lato:300,400",document.head.appendChild(t);var a=document.createElement("link");a.rel="stylesheet",a.type="text/css",a.dataset.resource_from="boxscores-embed",a.href=x+"://w1.synapsys.us/widgets/deepdive/fonts/styles.css",document.head.appendChild(a);var n=document.createElement("style");n.dataset.resource_from="boxscores-embed",n.innerHTML="\n      .boxscores-e-bar{\n        width: 100%;\n        min-width: 640px;\n        height: 50px;\n        line-height: 50px;\n        background-color:"+D+";\n        color: #fff;\n        font-family: Lato;\n        overflow: hidden;\n      }\n      .boxscores-e-title{\n        font-size: 18px;\n        float: left;\n        padding: 0 10px;\n        box-sizing: border-box;\n        line-height: 48px;\n      }\n      .boxscores-e-schedule{\n        list-style-type: none;\n        float: left;\n        margin: 0 5px 0 0;\n        padding: 0;\n        height: 100%;\n      }\n      .boxscores-e-game{\n        display: inline-block;\n        width: 166px;\n        height: 50px;\n        border-right: 1px solid"+z+";\n        box-sizing: border-box;\n        overflow: hidden;\n      }\n      .boxscores-e-game:last-child{\n        border-right: none;\n      }\n      .boxscores-e-game-link{\n        display: block;\n        width: 100%;\n        height: 100%;\n        padding: 0 10px;\n        box-sizing: border-box;\n        text-decoration: none;\n        color: #fff;\n      }\n      .boxscores-e-football .boxscores-e-game-link{\n        padding: 0 7px 0 10px;\n      }\n      .boxscores-e-game-link:hover{\n        color: #fff;\n      }\n      .boxscores-e-game-teams{\n        list-style-type: none;\n        margin: 0;\n        padding: 0;\n        width: 57px;\n        height: 100%;\n        line-height: normal;\n        display: inline-block;\n        vertical-align: middle;\n        font-size: 13px;\n        padding-top: 8px;\n        box-sizing: border-box;\n        float: left;\n      }\n      .boxscores-e-football .boxscores-e-game-teams{\n        width: 70px;\n      }\n      .boxscores-e-game-inning-top:before{\n        content: '';\n        width: 0;\n        height: 0;\n        border-style: solid;\n        border-width: 0 7px 9px 7px;\n        border-color: transparent transparent #fff transparent;\n        margin-right: 5px;\n        display: inline-block;\n      }\n      .boxscores-e-game-inning-bottom:before{\n        content: '';\n        width: 0;\n        height: 0;\n        border-style: solid;\n        border-width: 9px 7px 0 7px;\n        border-color: #fff transparent transparent transparent;\n        margin-right: 5px;\n        display: inline-block;\n      }\n      .boxscores-e-game-teamscore{\n        float: right;\n      }\n      .boxscores-e-game-time{\n        font-size: 12px;\n        float: right;\n        font-weight: 400;\n      }\n      .boxscores-e-game-time.boxscores-e-2-lines{\n        line-height: normal;\n        padding-top: 10px;\n      }\n      .boxscores-e-nav{\n        float: left;\n        margin-right: 5px;\n        line-height: 50px;\n      }\n      .boxscores-e-nav-button{\n        width: 30px;\n        height: 30px;\n        border-radius: 5px;\n        background-color: #fff;\n        color: "+N+";\n        border: none;\n        margin: 0 3px 0 0;\n        vertical-align: middle;\n        cursor: pointer;\n        font-size: 24px;\n        padding: 0;\n        line-height: normal;\n      }\n      .boxscores-e-nav-button>i{\n        vertical-align: middle;\n        margin-top: 1px;\n        display: inline-block;\n      }\n      .boxscores-e-nav-button:focus{\n        outline: none;\n      }\n    ",document.head.appendChild(n)}function a(){for(var e=document.getElementsByClassName("boxscores-e-schedule")[0];e.hasChildNodes();)e.removeChild(e.firstChild)}function n(e){var t=e%10,a=e%100;return 1==t&&11!=a?e+"st":2==t&&12!=a?e+"nd":3==t&&13!=a?e+"rd":e+"th"}function o(e,t,a){t||(t=250);var n,o;return function(){var s=a||this,r=+new Date,i=arguments;n&&n+t>r?(clearTimeout(o),o=setTimeout(function(){n=r,e.apply(s,i)},t+n-r)):(n=r,e.apply(s,i))}}function s(e,t,a){return e=e.sort(function(e,n){return t>0?e[a]<n[a]?-1:e[a]>n[a]?1:0:e[a]>n[a]?-1:e[a]<n[a]?1:0})}function r(e){var t=document.createElement("li"),a=e.timeClass?e.timeClass+" boxscores-e-game-time":"boxscores-e-game-time";return t.className=e.gameClass?e.gameClass+" boxscores-e-game":"boxscores-e-game",t.innerHTML='\n      <a class="boxscores-e-game-link" href="'+e.link+'">\n        <ul class="boxscores-e-game-teams">\n          <li>\n            '+e.homeTeam+' <span class="boxscores-e-game-teamscore">'+e.homeScore+"</span>\n          </li>\n          <li>\n            "+e.awayTeam+' <span class="boxscores-e-game-teamscore">'+e.awayScore+'</span>\n          </li>\n        </ul>\n        <span class="'+a+'">\n          '+e.bottomData+"\n        </span>\n      </a>\n    ",t}function i(t){var t=new Date(t+3600*e.easternTime.offset*1e3),a=t.getUTCHours(),n=a>=12?"PM":"AM";a=a>12?a-12:a;var o=t.getUTCMinutes();o=1===o.toString().length?"0"+o.toString():o;var s=a+":"+o+n+" "+e.easternTime.tzAbbrev;return s}function m(t,a){var o=[],m=[],l=[],c=[],d=[],f=function(t,a){var n=new Date(t+3600*e.easternTime.offset*1e3),o=n.getUTCDay(),s=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];return s[o]+"<br>"+a};for(var p in t){var g=t[p],b=!1,v=new Date(g.eventStartTime+3600*e.easternTime.offset*1e3).getUTCDate(),h=(new Date).getTime();if(v==e.todayObject.date&&(b=!0),b){if("N"===g.liveStatus&&g.eventStartTime>h){var x,y,T,w;"nfl"===a?(x=g.team1Record.split("-"),y=x[0]+"-"+x[1],T=g.team2Record.split("-"),w=T[0]+"-"+T[1]):(y="-",w="-");var I={homeTeam:g.team1Abbreviation,homeScore:y,awayTeam:g.team2Abbreviation,awayScore:w,timestamp:g.eventStartTime,datetime:i(g.eventStartTime),eventId:g.eventId,gameClass:"boxscores-e-football",timeClass:"boxscores-e-2-lines"};I.bottomData=f(I.timestamp,I.datetime),"nfl"===a?I.link=u+"/nfl/articles/pregame-report/"+g.eventId:"ncaaf"===a?I.link=u+"/ncaaf/articles/pregame-report/"+g.eventId:I.link="#",I.gameNode=r(I),o.push(I)}else if("Y"===g.liveStatus&&g.eventStartTime<h){var I={homeTeam:g.team1Abbreviation,homeScore:g.team1Score?g.team1Score:"-",awayTeam:g.team2Abbreviation,awayScore:g.team2Score?g.team2Score:"-",timestamp:g.eventStartTime,datetime:i(g.eventStartTime),eventId:g.eventId,gameClass:"boxscores-e-football"};I.bottomData=g.eventQuarter?n(g.eventQuarter):I.datetime,"nfl"===a?I.link=u+"/nfl/articles/live-report/"+g.eventId:"ncaaf"===a?I.link=u+"/ncaaf/articles/live-report/"+g.eventId:I.link="#",I.gameNode=r(I),m.push(I)}else if("N"===g.liveStatus&&g.eventStartTime<h){var I={homeTeam:g.team1Abbreviation,homeScore:"-",awayTeam:g.team2Abbreviation,awayScore:"-",timestamp:g.eventStartTime,datetime:i(g.eventStartTime),eventId:g.eventId,gameClass:"boxscores-e-football",timeClass:"boxscores-e-2-lines"};I.bottomData=f(I.timestamp,"Final"),"nfl"===a?I.link=u+"/nfl/articles/postgame-report/"+g.eventId:"ncaaf"===a?I.link=u+"/ncaaf/articles/postgame-report/"+g.eventId:I.link="#",I.gameNode=r(I),l.push(I)}}else if(g.eventStartTime>h){var x,y,T,w;"nfl"===a?(x=g.team1Record.split("-"),y=x[0]+"-"+x[1],T=g.team2Record.split("-"),w=T[0]+"-"+T[1]):(y="-",w="-");var I={homeTeam:g.team1Abbreviation,homeScore:y,awayTeam:g.team2Abbreviation,awayScore:w,timestamp:g.eventStartTime,datetime:i(g.eventStartTime),eventId:g.eventId,gameClass:"boxscores-e-football",timeClass:"boxscores-e-2-lines"};I.bottomData=f(I.timestamp,I.datetime),"nfl"===a?I.link=u+"/nfl/articles/pregame-report/"+g.eventId:"ncaaf"===a?I.link=u+"/ncaaf/articles/pregame-report/"+g.eventId:I.link="#",I.gameNode=r(I),c.push(I)}else if(g.eventStartTime<h){var I={homeTeam:g.team1Abbreviation,homeScore:g.team1Score?g.team1Score:"-",awayTeam:g.team2Abbreviation,awayScore:g.team2Score?g.team2Score:"-",timestamp:g.eventStartTime,datetime:i(g.eventStartTime),eventId:g.eventId,gameClass:"boxscores-e-football",timeClass:"boxscores-e-2-lines"};I.bottomData=f(I.timestamp,"Final"),"nfl"===a?I.link=u+"/nfl/articles/postgame-report/"+g.eventId:"ncaaf"===a?I.link=u+"/ncaaf/articles/postgame-report/"+g.eventId:I.link="#",I.gameNode=r(I),d.push(I)}}o=s(o,1,"timestamp"),m=s(m,1,"timestamp"),l=s(l,1,"timestamp"),c=s(c,1,"timestamp"),d=s(d,1,"timestamp");var S=m.concat(o,l,c,d);return S}function l(t){var a=[],o=[],m=[];for(var l in t){var c=t[l],d=!1,f=new Date(c.gameInfo.startDateTimestamp+3600*e.easternTime.offset*1e3).getUTCDate();if(f==e.todayObject.date?d=!0:c.gameInfo.live&&(d=!0),d)switch(c.gameInfo.eventStatus){case"pre-event":if(c.gameInfo.live===!1){var p={homeTeam:c.homeTeamInfo.abbreviation,homeScore:"-",awayTeam:c.awayTeamInfo.abbreviation,awayScore:"-",timestamp:c.gameInfo.startDateTimestamp,datetime:i(c.gameInfo.startDateTimestamp),eventStatus:c.gameInfo.eventStatus,eventId:c.gameInfo.eventId,gameClass:"boxscores-e-baseball"};p.bottomData=p.datetime,p.link=u+"/articles/pregame-report/"+p.eventId,p.gameNode=r(p),a.push(p)}else{var p={homeTeam:c.homeTeamInfo.abbreviation,homeScore:c.homeTeamInfo.score,awayTeam:c.awayTeamInfo.abbreviation,awayScore:c.awayTeamInfo.score,timestamp:c.gameInfo.startDateTimestamp,datetime:i(c.gameInfo.startDateTimestamp),eventStatus:c.gameInfo.eventStatus,eventId:c.gameInfo.eventId,gameClass:"boxscores-e-baseball"};"top"===c.gameInfo.inningHalf?p.bottomData='<i class="boxscores-e-game-inning-top"></i>'+(c.gameInfo.inningsPlayed?n(c.gameInfo.inningsPlayed):p.datetime):"bottom"===c.gameInfo.inningHalf?p.bottomData='<i class="boxscores-e-game-inning-bottom"></i>'+(c.gameInfo.inningsPlayed?n(c.gameInfo.inningsPlayed):p.datetime):p.bottomData="",c.gameInfo.inningsPlayed<=3?p.link=u+"/articles/pregame-report/"+p.eventId:c.gameInfo.inningsPlayed>3&&c.gameInfo.inningsPlayed<=5?p.link=u+"/articles/third-inning-report/"+p.eventId:c.gameInfo.inningsPlayed>5&&c.gameInfo.inningsPlayed<=7?p.link=u+"/articles/fifth-inning-report/"+p.eventId:c.gameInfo.inningsPlayed>7&&(p.link=u+"/articles/seventh-inning-report/"+p.eventId),p.gameNode=r(p),o.push(p)}break;case"post-event":var p={homeTeam:c.homeTeamInfo.abbreviation,homeScore:c.homeTeamInfo.score,awayTeam:c.awayTeamInfo.abbreviation,awayScore:c.awayTeamInfo.score,timestamp:c.gameInfo.startDateTimestamp,datetime:i(c.gameInfo.startDateTimestamp),eventStatus:c.gameInfo.eventStatus,eventId:c.gameInfo.eventId,gameClass:"boxscores-e-baseball"};p.bottomData="Final",p.link=u+"/articles/postgame-report/"+p.eventId,p.gameNode=r(p),m.push(p)}}a=s(a,1,"timestamp"),o=s(o,1,"timestamp"),m=s(m,1,"timestamp");var g=o.concat(a,m);return g}e.embedSource="http://w1.synapsys.us/widgets/deepdive/boxscores/boxscores_2-0.js",e.boxscoresLoaded=!1,e.help=function(){console.warn("Boxscores Bar - Must specify query string.\n      Paramters:\n      [vertical] - vertical of the boxscores embed. Options are (mlb, nfl, and ncaaf)\n    ")},e.easternTime=function(){var e,t,a,n,o=(new Date).getUTCFullYear(),s=(new Date).getTime();for(e=new Date(o,2,7,0,0,0,0),e.setDate(7+(7-e.getDay())),e.setUTCHours(7),e=e.getTime(),t=new Date(o,10,1,0,0,0,0);0!==t.getDay();)t.setDate(t.getDate()+1);return t.setUTCHours(6),t=t.getTime(),e>=s||s>t?(a=-5,n="ET"):(a=-4,n="ET"),{offset:a,tzAbbrev:n}}(),e.todayObject=function(e){var t=new Date((new Date).getTime()+3600*e*1e3),a=t.getUTCMonth()+1,n=t.getUTCDate(),o={today:t,year:t.getUTCFullYear(),month:1===a.toString().length?"0"+a:a,date:1===n.toString().length?"0"+n:n};return o.dateInput=o.year+"-"+o.month+"-"+o.date,o}(e.easternTime.offset);var c=window;try{for(;c!==top;)c=c.parent}catch(d){console.error("boxscores - couldn/'t access the top window")}var f,p,g,b,v,h=c.location,u=h.hostname.replace(/www./,""),x="https"===c.protocol?"https":"http",y=[],T=document.currentScript||function(){for(var e=document.getElementsByTagName("script"),t=e.length-1;t>=0;t--)if(-1!=e[t].src.indexOf(skyscraperRails.embedSource))return e[t]}();f=T.parentNode;var w=T.src.split("?")[1];if("undefined"==typeof w)return e.help(),!1;var I,S=w.split("&");S.forEach(function(e){var t=e.split("=");switch(t[0]){case"vertical":I=decodeURIComponent(t[1])}});try{if("undefined"==typeof I)throw"Must speicify vertical of boxscores bar. (Options are mlb, nfl, and ncaaf)"}catch(d){return console.warn("Boxscores Bar - "+d),!1}var C,k,D,N,E,z,B;switch(I){case"mlb":C=x+"://prod-homerunloyal-api.synapsys.us/league/boxScores/"+e.todayObject.dateInput,k=["myhomerunzone.com","dev.myhomerunzone.com","qa.myhomerunzone.com"],D="#004e87",N="#000",E="TODAY'S MLB GAMES",z="#2c2c2c",B=function(e){return l(e)};break;case"nfl":C=x+"://prod-touchdownloyal-api.synapsys.us/boxScores/league/nfl/"+e.todayObject.dateInput,k=["mytouchdownzone.com","dev.mytouchdownzone.com","qa.mytouchdownzone.com"],D="#272727",N="#fc501d",E="NFL THIS WEEK",z="#000",B=function(e){return m(e,"nfl")},e.easternTime.offset=0;break;case"ncaaf":C=x+"://prod-touchdownloyal-api.synapsys.us/boxScores/league/fbs/"+e.todayObject.dateInput,k=["mytouchdownzone.com","dev.mytouchdownzone.com","qa.mytouchdownzone.com"],D="#272727",N="#fc501d",E="NCAAF THIS WEEK",z="#000",B=function(e){return m(e,"ncaaf")},e.easternTime.offset=0;break;default:C=x+"://prod-homerunloyal-api.synapsys.us/league/boxScores/"+e.todayObject.dateInput,k=["myhomerunzone.com","dev.myhomerunzone.com","qa.myhomerunzone.com"],D="#004e87",N="#000",E="TODAY'S MLB GAMES",z="#2c2c2c",B=function(){return l(data)}}for(var A=!1,M=0,L=k.length;L>M;M++)if(k[M]===u){A=!0;break}if(A){var O=h.pathname.split("/"),P=O[1];u+="/"+P}u=x+"://"+u,e.resize=function(){if(p=f.offsetWidth,e.boxscoresLoaded)if(p>=1170&&5!==g){g=5,a();var t=g-y.length;if(t>0){for(var n=0;t>n;n++){var o=y[y.length-1];y.push(o+1>=b?0:o+1)}for(var s=0,r=y.length;r>s;s++){var i=y[s],m=document.getElementsByClassName("boxscores-e-schedule")[0];m.appendChild(v[i].gameNode)}}}else if(1170>p&&p>=1010&&4!==g){g=4,a();var t=g-y.length;if(t>0){for(var n=0;t>n;n++){var o=y[y.length-1];y.push(o+1>=b?0:o+1)}for(var s=0,r=y.length;r>s;s++){var i=y[s],m=document.getElementsByClassName("boxscores-e-schedule")[0];m.appendChild(v[i].gameNode)}}else{t=Math.abs(t);for(var n=0;t>n;n++)y.pop();for(var s=0,r=y.length;r>s;s++){var i=y[s],m=document.getElementsByClassName("boxscores-e-schedule")[0];m.appendChild(v[i].gameNode)}}}else if(1010>p&&p>=820&&3!==g){g=3,a();var t=g-y.length;if(t>0){for(var n=0;t>n;n++){var o=y[y.length-1];y.push(o+1>=b?0:o+1)}for(var s=0,r=y.length;r>s;s++){var i=y[s],m=document.getElementsByClassName("boxscores-e-schedule")[0];m.appendChild(v[i].gameNode)}}else{t=Math.abs(t);for(var n=0;t>n;n++)y.pop();for(var s=0,r=y.length;r>s;s++){var i=y[s],m=document.getElementsByClassName("boxscores-e-schedule")[0];m.appendChild(v[i].gameNode)}}}else if(820>p&&2!==g){g=2,a();var t=g-y.length;if(t>0);else{t=Math.abs(t);for(var n=0;t>n;n++)y.pop();for(var s=0,r=y.length;r>s;s++){var i=y[s],m=document.getElementsByClassName("boxscores-e-schedule")[0];m.appendChild(v[i].gameNode)}}}},e.buildBoxscores=function(){if(e.boxscoresLoaded)return!1;var t=document.createElement("section");t.className="boxscores-e-bar",t.innerHTML='\n      <div class="boxscores-e-title">\n        '+E+'\n      </div>\n\n      <ul class="boxscores-e-schedule"></ul>\n\n      <div class="boxscores-e-nav">\n        <button id="boxscores-e-left" class="boxscores-e-nav-button boxscores-e-prev">\n          <i class="ddh-icon-angle-left"></i>\n        </button>\n        <button id="boxscores-e-right" class="boxscores-e-nav-button boxscores-e-next">\n          <i class="ddh-icon-angle-right"></i>\n        </button>\n      </div>\n    ';var n=new XMLHttpRequest;n.onreadystatechange=function(){if(4===n.readyState&&200===n.status){var o=JSON.parse(n.responseText);if(v=B(o.data),b=v.length,f.insertBefore(t,T),1>=b){var s=document.getElementsByClassName("boxscores-e-nav")[0];s.parentNode.removeChild(s)}p=f.offsetWidth,g=p>=1340?5:p>=1180?4:p>=990?3:2;for(var r=0;g>r;r++)"undefined"!=typeof v[r]&&y.push(r);for(var i=0,m=y.length;m>i;i++){var l=y[i],c=document.getElementsByClassName("boxscores-e-schedule")[0];c.appendChild(v[l].gameNode)}var d=document.getElementById("boxscores-e-right");d.addEventListener("click",function(){a();for(var e=0;g>e;e++){var t=y[e]+g;t>=b&&(t-=b),"undefined"!=typeof v[t]&&(y[e]=t)}for(var n=0,o=y.length;o>n;n++){var s=y[n],r=document.getElementsByClassName("boxscores-e-schedule")[0];r.appendChild(v[s].gameNode)}});var h=document.getElementById("boxscores-e-left");h.addEventListener("click",function(){a();for(var e=0;g>e;e++){var t=y[e]-g;0>t&&(t+=b),"undefined"!=typeof v[t]&&(y[e]=t)}for(var n=0,o=y.length;o>n;n++){var s=y[n],r=document.getElementsByClassName("boxscores-e-schedule")[0];r.appendChild(v[s].gameNode)}}),e.boxscoresLoaded=!0}else 4===n.readyState&&200!==n.status},n.open("GET",C,!0),n.send()},t(),e.buildBoxscores(),window.addEventListener("resize",o(e.resize,100))}(window.boxscoresBar=window.boxscoresBar||{});
