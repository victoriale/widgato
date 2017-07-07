"use strict";!function(){function e(e){return"://"+e+"-homerunloyal-api.synapsys.us/league/boxScores/"}var n=window;try{for(;n!==top;)n=n.parent}catch(e){console.error("boxscores - couldn/'t access the top window")}var a=n.location,t=a.hostname.replace(/www./,"");if("myhomerunzone.com"===t||"dev.myhomerunzone.com"===t||"qa.myhomerunzone.com"===t){var o=a.pathname.split("/"),s=o[1];t+="/"+s}var r,i,l,m,c,d=[],p="https:"===location.protocol?"https":"http",g=!1,h=location!=parent.location?document.referrer:document.location.href,f=function(e){var n=document.createElement("a");return n.href=e,""==n.host&&(n.href=n.href),n}(h).hostname,b=function(e){return e=null!=e.match(/^localhost/)||null!=e.match(/^dev/)?"dev":null!=e.match(/^qa/)?"qa":"prod"}(f),u=function(){var e,n,a,t,o=(new Date).getUTCFullYear(),s=(new Date).getTime();for(e=new Date(o,2,7,0,0,0,0),e.setDate(7-e.getDay()+7),e.setUTCHours(7),e=e.getTime(),n=new Date(o,10,1,0,0,0,0);0!==n.getDay();)n.setDate(n.getDate()+1);return n.setUTCHours(6),n=n.getTime(),s<=e||s>n?(a=-5,t="EST"):(a=-4,t="EDT"),{offset:a,tzAbbrev:t}},v=function(e,n,a){var e=new Date(e+3600*n*1e3),t=e.getUTCHours(),o=t>=12?"PM":"AM";t=t>12?t-12:t;var s=e.getUTCMinutes();return s=1===s.toString().length?"0"+s.toString():s,t+":"+s+o+" "+a},x=function(e,n,a){var t=new Date(e+3600*a*1e3),t=t.getUTCDate();return n===t},y=function(e){return e.sort(function(e,n){return e.timestamp-n.timestamp})},T=function(e){var n=e%10,a=e%100;return 1==n&&11!=a?e+"st":2==n&&12!=a?e+"nd":3==n&&13!=a?e+"rd":e+"th"},I=function(e,n,a,o){var s=[],r=[],i=[];for(var l in e){var m=e[l];switch(m.gameInfo.eventStatus){case"pre-event":if(!1===m.gameInfo.live)x(m.gameInfo.startDateTimestamp,o,n)&&s.push({homeTeam:m.homeTeamInfo.abbreviation,homeScore:"-",awayTeam:m.awayTeamInfo.abbreviation,awayScore:"-",timestamp:m.gameInfo.startDateTimestamp,eventStatus:m.gameInfo.eventStatus,htmlMarkup:'\n                  <a href="http://'+t+"/articles/pregame-report/"+m.gameInfo.eventId+'" class="boxscores-e-game-link">\n                    <ul class="boxscores-e-game-teams">\n                      <li>\n                        '+m.homeTeamInfo.abbreviation+'\n                        <span class="boxscores-e-game-teamscore">\n                          -\n                        </span>\n                      </li>\n                      <li>\n                        '+m.awayTeamInfo.abbreviation+'\n                        <span class="boxscores-e-game-teamscore">\n                          -\n                        </span>\n                      </li>\n                    </ul>\n                    <span class="boxscores-e-game-time">\n                      '+v(m.gameInfo.startDateTimestamp,n,a)+"\n                    </span>\n                  </a>\n                "});else if(x(m.gameInfo.startDateTimestamp,o,n)){if(m.gameInfo.inningsPlayed<=3)var c="http://"+t+"/articles/pregame-report/"+m.gameInfo.eventId;else if(m.gameInfo.inningsPlayed>3&&m.gameInfo.inningsPlayed<=5)var c="http://"+t+"/articles/third-inning-report/"+m.gameInfo.eventId;else if(m.gameInfo.inningsPlayed>5&&m.gameInfo.inningsPlayed<=7)var c="http://"+t+"/articles/fifth-inning-report/"+m.gameInfo.eventId;else if(m.gameInfo.inningsPlayed>7)var c="http://"+t+"/articles/seventh-inning-report/"+m.gameInfo.eventId;var d;d="top"===m.gameInfo.inningHalf?'<span class="boxscores-e-game-inning-top"></span>':"bottom"===m.gameInfo.inningHalf?'<span class="boxscores-e-game-inning-bottom"></span>':"",r.push({homeTeam:m.homeTeamInfo.abbreviation,homeScore:m.homeTeamInfo.score,awayTeam:m.awayTeamInfo.abbreviation,awayScore:m.awayTeamInfo.score,timestamp:m.gameInfo.startDateTimestamp,eventStatus:m.gameInfo.eventStatus,htmlMarkup:'\n                  <a href="'+c+'" class="boxscores-e-game-link">\n                    <ul class="boxscores-e-game-teams">\n                      <li>\n                        '+m.awayTeamInfo.abbreviation+'\n                        <span class="boxscores-e-game-teamscore">\n                          '+m.awayTeamInfo.score+"\n                        </span>\n                      </li>\n                      <li>\n                        "+m.homeTeamInfo.abbreviation+'\n                        <span class="boxscores-e-game-teamscore">\n                          '+m.homeTeamInfo.score+'\n                        </span>\n                      </li>\n                    </ul>\n                    <span class="boxscores-e-game-time">\n                      '+d+(m.gameInfo.inningsPlayed?T(m.gameInfo.inningsPlayed):v(m.gameInfo.startDateTimestamp,n,a))+"\n                    </span>\n                  </a>\n                "})}break;case"Final":case"post-event":x(m.gameInfo.startDateTimestamp,o,n)&&i.push({homeTeam:m.homeTeamInfo.abbreviation,homeScore:m.homeTeamInfo.score,awayTeam:m.awayTeamInfo.abbreviation,awayScore:m.awayTeamInfo.score,timestamp:m.gameInfo.startDateTimestamp,eventStatus:m.gameInfo.eventStatus,htmlMarkup:'\n                <a ="_blank" href="http://'+t+"/articles/postgame-report/"+m.gameInfo.eventId+'" class="boxscores-e-game-link">\n                  <ul class="boxscores-e-game-teams">\n                    <li>\n                      '+m.homeTeamInfo.abbreviation+'\n                      <span class="boxscores-e-game-teamscore">\n                        '+(m.homeTeamInfo.score||"-")+"\n                      </span>\n                    </li>\n                    <li>\n                      "+m.awayTeamInfo.abbreviation+'\n                      <span class="boxscores-e-game-teamscore">\n                        '+(m.awayTeamInfo.score||"-")+'\n                      </span>\n                    </li>\n                  </ul>\n                  <span class="boxscores-e-game-time">\n                    FINAL\n                  </span>\n                </a>\n              '})}}return s=y(s),r=y(r),i=y(i),r.concat(s,i)},w=function(){for(var e=document.getElementsByClassName("boxscores-e-schedule")[0];e.hasChildNodes();)e.removeChild(e.firstChild)},C=document.createElement("base");C.target="_parent",document.head.appendChild(C);var E=document.createElement("link");E.rel="stylesheet",E.type="text/css",E.dataset.resource_from="boxscores-embed",E.href="https://fonts.googleapis.com/css?family=Lato:300,400",document.head.appendChild(E);var M=document.createElement("link");M.rel="stylesheet",M.type="text/css",M.dataset.resource_from="boxscores-embed",M.href=p+"://w1.synapsys.us/widgets/deepdive/fonts/styles.css",document.head.appendChild(M);var k=document.createElement("style");k.dataset.resource_from="boxscores-embed",k.innerHTML="\n    .boxscores-e-bar{\n      width: 100%;\n      min-width: 640px;\n      height: 50px;\n      line-height: 50px;\n      background-color: #004e87;\n      color: #fff;\n      font-family: Lato;\n      overflow: hidden;\n    }\n    .boxscores-e-title{\n      font-size: 18px;\n      float: left;\n      padding: 0 10px;\n      box-sizing: border-box;\n      line-height: 50px;\n    }\n    .boxscores-e-schedule{\n      list-style-type: none;\n      float: left;\n      margin: 0 5px 0 0;\n      padding: 0;\n      height: 100%;\n    }\n    .boxscores-e-game{\n      display: inline-block;\n      width: 166px;\n      height: 50px;\n      border-right: 1px solid #2c2c2c;\n      box-sizing: border-box;\n      overflow: hidden;\n    }\n    .boxscores-e-game:last-child{\n      border-right: none;\n    }\n    .boxscores-e-game-link{\n      display: block;\n      width: 100%;\n      height: 100%;\n      padding: 0 10px 0 15px;\n      box-sizing: border-box;\n      text-decoration: none;\n      color: #fff;\n    }\n    .boxscores-e-game-link:hover{\n      color: #fff;\n    }\n    .boxscores-e-game-teams{\n      list-style-type: none;\n      margin: 0;\n      padding: 0;\n      width: 57px;\n      line-height: normal;\n      display: inline-block;\n      vertical-align: middle;\n      font-size: 14px;\n      margin-top: 8px;\n    }\n    .boxscores-e-game-inning-top:before{\n      content: '';\n      width: 0;\n      height: 0;\n      border-style: solid;\n      border-width: 0 7px 9px 7px;\n      border-color: transparent transparent #fff transparent;\n      margin-right: 5px;\n      display: inline-block;\n    }\n    .boxscores-e-game-inning-bottom:before{\n      content: '';\n      width: 0;\n      height: 0;\n      border-style: solid;\n      border-width: 9px 7px 0 7px;\n      border-color: #fff transparent transparent transparent;\n      margin-right: 5px;\n      display: inline-block;\n    }\n    .boxscores-e-game-teamscore{\n      float: right;\n    }\n    .boxscores-e-game-time{\n      font-size: 12px;\n      float: right;\n      font-weight: 400;\n    }\n    .boxscores-e-nav{\n      float: left;\n      margin-right: 5px;\n      line-height: 50px;\n    }\n    .boxscores-e-nav-button{\n      width: 30px;\n      height: 30px;\n      border-radius: 5px;\n      background-color: #fff;\n      color: #000;\n      border: none;\n      margin: 0 3px 0 0;\n      vertical-align: middle;\n      cursor: pointer;\n      font-size: 24px;\n      padding: 0;\n    }\n    .boxscores-e-nav-button>span{\n      vertical-align: middle;\n      margin-top: 1px;\n      display: inline-block;\n    }\n    .boxscores-e-nav-button:focus{\n      outline: none;\n    }\n  ",document.head.appendChild(k);var N=document.createElement("section");N.className="boxscores-e-bar",function(){var n=u(),a=new Date((new Date).getTime()+3600*n.offset*1e3),t=a.getUTCFullYear(),o=a.getUTCMonth()+1;o=1===o.toString().length?"0"+o:o;var s=a.getUTCDate(),h=t+"-"+o+"-"+s,f=new XMLHttpRequest;f.onreadystatechange=function(){if(4===f.readyState&&200===f.status){var e=JSON.parse(f.responseText);m=I(e.data,n.offset,n.tzAbbrev,s),l=m.length,N.innerHTML='\n          <div class="boxscores-e-title">\n            TODAY\'S BASEBALL GAMES\n          </div>\n\n          <ul class="boxscores-e-schedule"></ul>\n\n          <div class="boxscores-e-nav">\n            <button class="boxscores-e-nav-button boxscores-e-prev">\n              <span class="ddh-icon-angle-left"></span>\n            </button>\n            <button class="boxscores-e-nav-button boxscores-e-next">\n              <span class="ddh-icon-angle-right"></span>\n            </button>\n          </div>\n        ';var a=document.currentScript||function(){for(var e=document.getElementsByTagName("script"),n=e.length-1;n>=0;n--)if(-1!=e[n].src.indexOf("http://w1.synapsys.us/widgets/deepdive/boxscores/boxscores.js"))return e[n]}();c=a.parentNode,c.insertBefore(N,a),r=c.offsetWidth,r>=1340?i=5:r>=1180?i=4:r>=990?i=3:r>=640&&(i=2);for(var t=0;t<i;t++)void 0!==m[t]&&d.push(t);for(var o=0,p=d.length;o<p;o++){var g=d[o],h=document.createElement("li");h.className="boxscores-e-game",h.innerHTML=m[g].htmlMarkup;document.getElementsByClassName("boxscores-e-schedule")[0].appendChild(h)}document.getElementsByClassName("boxscores-e-nav-button boxscores-e-next")[0].addEventListener("click",function(){w();for(var e=0;e<i;e++){var n=d[e]+i;n>=l&&(n-=l),void 0!==m[n]&&(d[e]=n)}for(var a=0,t=d.length;a<t;a++){var o=d[a],s=document.createElement("li");s.className="boxscores-e-game",s.innerHTML=m[o].htmlMarkup;document.getElementsByClassName("boxscores-e-schedule")[0].appendChild(s)}});document.getElementsByClassName("boxscores-e-nav-button boxscores-e-prev")[0].addEventListener("click",function(){w();for(var e=0;e<i;e++){var n=d[e]-i;n<0&&(n+=l),void 0!==m[n]&&(d[e]=n)}for(var a=0,t=d.length;a<t;a++){var o=d[a],s=document.createElement("li");s.className="boxscores-e-game",s.innerHTML=m[o].htmlMarkup;document.getElementsByClassName("boxscores-e-schedule")[0].appendChild(s)}})}};var v=e(b);f.open("GET",p+v+h,!0),f.send(),g=!0}(),window.addEventListener("resize",function(){if(r=c.offsetWidth,g)if(r>=1170&&5!==i){i=5,w();var e=i-d.length;if(e>0){for(var n=0;n<e;n++){var a=d[d.length-1];d.push(a+1>=l?0:a+1)}for(var t=0,o=d.length;t<o;t++){var s=d[t],p=document.createElement("li");p.className="boxscores-e-game",p.innerHTML=m[s].htmlMarkup;var h=document.getElementsByClassName("boxscores-e-schedule")[0];h.appendChild(p)}}}else if(r<1170&&r>=1010&&4!==i){i=4,w();var e=i-d.length;if(e>0){for(var n=0;n<e;n++){var a=d[d.length-1];d.push(a+1>=l?0:a+1)}for(var t=0,o=d.length;t<o;t++){var s=d[t],p=document.createElement("li");p.className="boxscores-e-game",p.innerHTML=m[s].htmlMarkup;var h=document.getElementsByClassName("boxscores-e-schedule")[0];h.appendChild(p)}}else{e=Math.abs(e);for(var n=0;n<e;n++)d.pop();for(var t=0,o=d.length;t<o;t++){var s=d[t],p=document.createElement("li");p.className="boxscores-e-game",p.innerHTML=m[s].htmlMarkup;var h=document.getElementsByClassName("boxscores-e-schedule")[0];h.appendChild(p)}}}else if(r<1010&&r>=820&&3!==i){i=3,w();var e=i-d.length;if(e>0){for(var n=0;n<e;n++){var a=d[d.length-1];d.push(a+1>=l?0:a+1)}for(var t=0,o=d.length;t<o;t++){var s=d[t],p=document.createElement("li");p.className="boxscores-e-game",p.innerHTML=m[s].htmlMarkup;var h=document.getElementsByClassName("boxscores-e-schedule")[0];h.appendChild(p)}}else{e=Math.abs(e);for(var n=0;n<e;n++)d.pop();for(var t=0,o=d.length;t<o;t++){var s=d[t],p=document.createElement("li");p.className="boxscores-e-game",p.innerHTML=m[s].htmlMarkup;var h=document.getElementsByClassName("boxscores-e-schedule")[0];h.appendChild(p)}}}else if(r<820&&r>=640&&2!==i){i=2,w();var e=i-d.length;if(e>0);else{e=Math.abs(e);for(var n=0;n<e;n++)d.pop();for(var t=0,o=d.length;t<o;t++){var s=d[t],p=document.createElement("li");p.className="boxscores-e-game",p.innerHTML=m[s].htmlMarkup;var h=document.getElementsByClassName("boxscores-e-schedule")[0];h.appendChild(p)}}}})}();