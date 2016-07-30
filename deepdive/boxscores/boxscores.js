"use strict";!function(){var e=window;try{for(;e!==top;)e=e.parent}catch(n){console.error("boxscores - couldn/'t access the top window")}var a=e.location,t=a.hostname.replace(/www./,"");if("homerunloyal.com"!==t&&"myhomerunzone.com"!==t&&"dev.homerunloyal.com"!==t&&"dev.myhomerunzone.com"!==t&&(t="homerunloyal.com"),"myhomerunzone.com"===t||"dev.myhomerunzone.com"===t){var s=a.pathname.split("/"),o=s[1];t+="/"+o}var r,i,m,l,c,d="http://w1.synapsys.us/widgets/deepdive/boxscores/boxscores.js",p=[],g="https:"===location.protocol?"https":"http",h=!1,f=function(){var e,n,a,t,s=(new Date).getUTCFullYear(),o=(new Date).getTime();for(e=new Date(s,2,7,0,0,0,0),e.setDate(7+(7-e.getDay())),e.setUTCHours(7),e=e.getTime(),n=new Date(s,10,1,0,0,0,0);0!==n.getDay();)n.setDate(n.getDate()+1);return n.setUTCHours(6),n=n.getTime(),e>=o||o>n?(a=-5,t="EST"):(a=-4,t="EDT"),{offset:a,tzAbbrev:t}},b=function(e,n,a){var e=new Date(e+3600*n*1e3),t=e.getUTCHours(),s=t>=12?"PM":"AM";t=t>12?t-12:t;var o=e.getUTCMinutes();o=1===o.toString().length?"0"+o.toString():o;var r=t+":"+o+s+" "+a;return r},u=function(e,n,a){var t=new Date(e+3600*a*1e3),t=t.getUTCDate();return n===t},v=function(e){return e.sort(function(e,n){return e.timestamp-n.timestamp})},x=function(e){var n=e%10,a=e%100;return 1==n&&11!=a?e+"st":2==n&&12!=a?e+"nd":3==n&&13!=a?e+"rd":e+"th"},y=function(e,n,a,s){var o=[],r=[],i=[];for(var m in e){var l=e[m];switch(l.gameInfo.eventStatus){case"pre-event":if(l.gameInfo.live===!1)u(l.gameInfo.startDateTimestamp,s,n)&&o.push({homeTeam:l.homeTeamInfo.abbreviation,homeScore:"-",awayTeam:l.awayTeamInfo.abbreviation,awayScore:"-",timestamp:l.gameInfo.startDateTimestamp,eventStatus:l.gameInfo.eventStatus,htmlMarkup:'\n                  <a href="http://'+t+"/articles/pregame-report/"+l.gameInfo.eventId+'" class="boxscores-e-game-link">\n                    <ul class="boxscores-e-game-teams">\n                      <li>\n                        '+l.homeTeamInfo.abbreviation+'\n                        <span class="boxscores-e-game-teamscore">\n                          -\n                        </span>\n                      </li>\n                      <li>\n                        '+l.awayTeamInfo.abbreviation+'\n                        <span class="boxscores-e-game-teamscore">\n                          -\n                        </span>\n                      </li>\n                    </ul>\n                    <span class="boxscores-e-game-time">\n                      '+b(l.gameInfo.startDateTimestamp,n,a)+"\n                    </span>\n                  </a>\n                "});else if(u(l.gameInfo.startDateTimestamp,s,n)){if(l.gameInfo.inningsPlayed<=3)var c="http://"+t+"/articles/pregame-report/"+l.gameInfo.eventId;else if(l.gameInfo.inningsPlayed>3&&l.gameInfo.inningsPlayed<=5)var c="http://"+t+"/articles/third-inning-report/"+l.gameInfo.eventId;else if(l.gameInfo.inningsPlayed>5&&l.gameInfo.inningsPlayed<=7)var c="http://"+t+"/articles/fifth-inning-report/"+l.gameInfo.eventId;else if(l.gameInfo.inningsPlayed>7)var c="http://"+t+"/articles/seventh-inning-report/"+l.gameInfo.eventId;r.push({homeTeam:l.homeTeamInfo.abbreviation,homeScore:l.homeTeamInfo.score,awayTeam:l.awayTeamInfo.abbreviation,awayScore:l.awayTeamInfo.score,timestamp:l.gameInfo.startDateTimestamp,eventStatus:l.gameInfo.eventStatus,htmlMarkup:'\n                  <a href="'+c+'" class="boxscores-e-game-link">\n                    <ul class="boxscores-e-game-teams">\n                      <li>\n                        '+l.homeTeamInfo.abbreviation+'\n                        <span class="boxscores-e-game-teamscore">\n                          '+l.homeTeamInfo.score+"\n                        </span>\n                      </li>\n                      <li>\n                        "+l.awayTeamInfo.abbreviation+'\n                        <span class="boxscores-e-game-teamscore">\n                          '+l.awayTeamInfo.score+'\n                        </span>\n                      </li>\n                    </ul>\n                    <span class="boxscores-e-game-time">\n                      '+(l.gameInfo.inningsPlayed?x(l.gameInfo.inningsPlayed):b(l.gameInfo.startDateTimestamp,n,a))+"\n                    </span>\n                  </a>\n                "})}break;case"Final":case"post-event":u(l.gameInfo.startDateTimestamp,s,n)&&i.push({homeTeam:l.homeTeamInfo.abbreviation,homeScore:l.homeTeamInfo.score,awayTeam:l.awayTeamInfo.abbreviation,awayScore:l.awayTeamInfo.score,timestamp:l.gameInfo.startDateTimestamp,eventStatus:l.gameInfo.eventStatus,htmlMarkup:'\n                <a ="_blank" href="http://'+t+"/articles/postgame-report/"+l.gameInfo.eventId+'" class="boxscores-e-game-link">\n                  <ul class="boxscores-e-game-teams">\n                    <li>\n                      '+l.homeTeamInfo.abbreviation+'\n                      <span class="boxscores-e-game-teamscore">\n                        '+(l.homeTeamInfo.score||"-")+"\n                      </span>\n                    </li>\n                    <li>\n                      "+l.awayTeamInfo.abbreviation+'\n                      <span class="boxscores-e-game-teamscore">\n                        '+(l.awayTeamInfo.score||"-")+'\n                      </span>\n                    </li>\n                  </ul>\n                  <span class="boxscores-e-game-time">\n                    FINAL\n                  </span>\n                </a>\n              '})}}o=v(o),r=v(r),i=v(i);var d=r.concat(o,i);return d},T=function(){for(var e=document.getElementsByClassName("boxscores-e-schedule")[0];e.hasChildNodes();)e.removeChild(e.firstChild)},w=function(){var e=f(),n=new Date((new Date).getTime()+3600*e.offset*1e3),a=n.getUTCFullYear(),t=n.getUTCMonth()+1;t=1===t.toString().length?"0"+t:t;var s=n.getUTCDate(),o=a+"-"+t+"-"+s,b=new XMLHttpRequest;b.onreadystatechange=function(){if(4===b.readyState&&200===b.status){var n=JSON.parse(b.responseText);l=y(n.data,e.offset,e.tzAbbrev,s),m=l.length,k.innerHTML='\n          <div class="boxscores-e-title">\n            <!--<img class="boxscores-e-title-img" src="http://wq.synapsys.us/widgets/deepdive/images/baseball_icon.png">-->\n            TODAY\'S MLB GAMES\n          </div>\n\n          <ul class="boxscores-e-schedule"></ul>\n\n          <div class="boxscores-e-nav">\n            <button class="boxscores-e-nav-button boxscores-e-prev">\n              <span class="ddh-icon-angle-left"></span>\n            </button>\n            <button class="boxscores-e-nav-button boxscores-e-next">\n              <span class="ddh-icon-angle-right"></span>\n            </button>\n          </div>\n\n          <div class="boxscores-e-img">\n            <img src="http://w1.synapsys.us/widgets/deepdive/images/poweredbytcx.png">\n          </div>\n        ';var a=document.currentScript||function(){for(var e=document.getElementsByTagName("script"),n=e.length-1;n>=0;n--)if(-1!=e[n].src.indexOf(d))return e[n]}();c=a.parentNode,c.insertBefore(k,a),r=c.offsetWidth,r>=1340?i=5:r>=1180?i=4:r>=990?i=3:r>=640&&(i=2);for(var t=0;i>t;t++)"undefined"!=typeof l[t]&&p.push(t);for(var o=0,g=p.length;g>o;o++){var h=p[o],f=document.createElement("li");f.className="boxscores-e-game",f.innerHTML=l[h].htmlMarkup;var u=document.getElementsByClassName("boxscores-e-schedule")[0];u.appendChild(f)}var v=document.getElementsByClassName("boxscores-e-nav-button boxscores-e-next")[0];v.addEventListener("click",function(){T();for(var e=0;i>e;e++){var n=p[e]+i;n>=m&&(n-=m),"undefined"!=typeof l[n]&&(p[e]=n)}for(var a=0,t=p.length;t>a;a++){var s=p[a],o=document.createElement("li");o.className="boxscores-e-game",o.innerHTML=l[s].htmlMarkup;var r=document.getElementsByClassName("boxscores-e-schedule")[0];r.appendChild(o)}});var x=document.getElementsByClassName("boxscores-e-nav-button boxscores-e-prev")[0];x.addEventListener("click",function(){T();for(var e=0;i>e;e++){var n=p[e]-i;0>n&&(n+=m),"undefined"!=typeof l[n]&&(p[e]=n)}for(var a=0,t=p.length;t>a;a++){var s=p[a],o=document.createElement("li");o.className="boxscores-e-game",o.innerHTML=l[s].htmlMarkup;var r=document.getElementsByClassName("boxscores-e-schedule")[0];r.appendChild(o)}})}},b.open("GET",g+"://prod-homerunloyal-api.synapsys.us/league/boxScores/"+o,!0),b.send(),h=!0},I=document.createElement("base");I.target="_parent",document.head.appendChild(I);var C=document.createElement("link");C.rel="stylesheet",C.type="text/css",C.dataset.resource_from="boxscores-embed",C.href="https://fonts.googleapis.com/css?family=Lato:300,400",document.head.appendChild(C);var E=document.createElement("link");E.rel="stylesheet",E.type="text/css",E.dataset.resource_from="boxscores-embed",E.href=g+"://w1.synapsys.us/widgets/deepdive/fonts/styles.css",document.head.appendChild(E);var M=document.createElement("style");M.dataset.resource_from="boxscores-embed",M.innerHTML="\n    .boxscores-e-bar{\n      width: 100%;\n      min-width: 640px;\n      height: 50px;\n      line-height: 50px;\n      background-color: #004e87;\n      color: #fff;\n      font-family: Lato;\n      overflow: hidden;\n    }\n    .boxscores-e-title{\n      font-size: 18px;\n      float: left;\n      padding: 0 10px;\n      box-sizing: border-box;\n      line-height: 50px;\n    }\n    // .boxscores-e-title-img{\n    //   vertical-align: middle;\n    //   margin-right: 3px;\n    //   -ms-transform: rotate(90deg); /* IE 9 */\n    //   -webkit-transform: rotate(90deg); /* Chrome, Safari, Opera */\n    //   transform: rotate(90deg);\n    //   display: none;\n    // }\n    // .boxscores-e-title-img.boxscores-e-visible{\n    //   display: inline-block;\n    // }\n    .boxscores-e-schedule{\n      list-style-type: none;\n      float: left;\n      margin: 0 5px 0 0;\n      padding: 0;\n      height: 100%;\n    }\n    .boxscores-e-game{\n      display: inline-block;\n      width: 166px;\n      height: 50px;\n      border-right: 1px solid #2c2c2c;\n      box-sizing: border-box;\n      overflow: hidden;\n    }\n    .boxscores-e-game:last-child{\n      border-right: none;\n    }\n    .boxscores-e-game-link{\n      display: block;\n      width: 100%;\n      height: 100%;\n      padding: 0 10px 0 15px;\n      box-sizing: border-box;\n      text-decoration: none;\n      color: #fff;\n    }\n    .boxscores-e-game-teams{\n      list-style-type: none;\n      margin: 0;\n      padding: 0;\n      width: 57px;\n      line-height: normal;\n      display: inline-block;\n      vertical-align: middle;\n      font-size: 14px;\n      margin-top: 8px;\n    }\n    .boxscores-e-game-teamscore{\n      float: right;\n    }\n    .boxscores-e-game-time{\n      font-size: 12px;\n      float: right;\n      font-weight: 300;\n    }\n    .boxscores-e-nav{\n      float: left;\n      margin-right: 5px;\n      line-height: 50px;\n    }\n    .boxscores-e-nav-button{\n      width: 30px;\n      height: 30px;\n      line-height: 30px;\n      border-radius: 5px;\n      background-color: #fff;\n      color: #000;\n      border: none;\n      padding: 4px 0 0 0;\n      margin: 0 3px 0 0;\n      vertical-align: middle;\n      cursor: pointer;\n      font-size: 24px;\n    }\n    .boxscores-e-nav-button>span{\n      vertical-align: middle;\n    }\n    .boxscores-e-nav-button:focus{\n      outline: none;\n    }\n    .boxscores-e-img{\n      float: right;\n      margin-right: 10px;\n    }\n    .boxscores-e-img>img{\n      display: none;\n      vertical-align: middle;\n      margin-top: 12px;\n    }\n    @media(min-width: 780px){\n      .boxscores-e-img>img{\n        display: inline-block;\n      }\n    }\n  ",document.head.appendChild(M);var k=document.createElement("section");k.className="boxscores-e-bar",w(),window.addEventListener("resize",function(){if(r=c.offsetWidth,h)if(r>=1340&&5!==i){i=5,T();var e=i-p.length;if(e>0){for(var n=0;e>n;n++){var a=p[p.length-1];p.push(a+1>=m?0:a+1)}for(var t=0,s=p.length;s>t;t++){var o=p[t],d=document.createElement("li");d.className="boxscores-e-game",d.innerHTML=l[o].htmlMarkup;var g=document.getElementsByClassName("boxscores-e-schedule")[0];g.appendChild(d)}}}else if(1340>r&&r>=1180&&4!==i){i=4,T();var e=i-p.length;if(e>0){for(var n=0;e>n;n++){var a=p[p.length-1];p.push(a+1>=m?0:a+1)}for(var t=0,s=p.length;s>t;t++){var o=p[t],d=document.createElement("li");d.className="boxscores-e-game",d.innerHTML=l[o].htmlMarkup;var g=document.getElementsByClassName("boxscores-e-schedule")[0];g.appendChild(d)}}else{e=Math.abs(e);for(var n=0;e>n;n++)p.pop();for(var t=0,s=p.length;s>t;t++){var o=p[t],d=document.createElement("li");d.className="boxscores-e-game",d.innerHTML=l[o].htmlMarkup;var g=document.getElementsByClassName("boxscores-e-schedule")[0];g.appendChild(d)}}}else if(1180>r&&r>=990&&3!==i){i=3,T();var e=i-p.length;if(e>0){for(var n=0;e>n;n++){var a=p[p.length-1];p.push(a+1>=m?0:a+1)}for(var t=0,s=p.length;s>t;t++){var o=p[t],d=document.createElement("li");d.className="boxscores-e-game",d.innerHTML=l[o].htmlMarkup;var g=document.getElementsByClassName("boxscores-e-schedule")[0];g.appendChild(d)}}else{e=Math.abs(e);for(var n=0;e>n;n++)p.pop();for(var t=0,s=p.length;s>t;t++){var o=p[t],d=document.createElement("li");d.className="boxscores-e-game",d.innerHTML=l[o].htmlMarkup;var g=document.getElementsByClassName("boxscores-e-schedule")[0];g.appendChild(d)}}}else if(990>r&&r>=640&&2!==i){i=2,T();var e=i-p.length;if(e>0);else{e=Math.abs(e);for(var n=0;e>n;n++)p.pop();for(var t=0,s=p.length;s>t;t++){var o=p[t],d=document.createElement("li");d.className="boxscores-e-game",d.innerHTML=l[o].htmlMarkup;var g=document.getElementsByClassName("boxscores-e-schedule")[0];g.appendChild(d)}}}})}();
