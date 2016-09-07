"use strict";!function(a,b){function C(){var a=document.createElement("base");a.target="_parent",document.head.appendChild(a);var b=document.createElement("link");b.rel="stylesheet",b.type="text/css",b.dataset.resource_from="boxscores-embed",b.href="https://fonts.googleapis.com/css?family=Lato:300,400",document.head.appendChild(b);var c=document.createElement("link");c.rel="stylesheet",c.type="text/css",c.dataset.resource_from="boxscores-embed",c.href=f+"://w1.synapsys.us/widgets/deepdive/fonts/styles.css",document.head.appendChild(c);var d=document.createElement("style");d.dataset.resource_from="boxscores-embed",d.innerHTML="\n      .boxscores-e-bar{\n        width: 100%;\n        min-width: 640px;\n        height: 50px;\n        line-height: 50px;\n        background-color:"+s+";\n        color: #fff;\n        font-family: Lato;\n        overflow: hidden;\n      }\n      .boxscores-e-title{\n        font-size: 18px;\n        float: left;\n        padding: 0 10px;\n        box-sizing: border-box;\n        line-height: 50px;\n      }\n      .boxscores-e-schedule{\n        list-style-type: none;\n        float: left;\n        margin: 0 5px 0 0;\n        padding: 0;\n        height: 100%;\n      }\n      .boxscores-e-game{\n        display: inline-block;\n        width: 166px;\n        height: 50px;\n        border-right: 1px solid"+v+";\n        box-sizing: border-box;\n        overflow: hidden;\n      }\n      .boxscores-e-game:last-child{\n        border-right: none;\n      }\n      .boxscores-e-game-link{\n        display: block;\n        width: 100%;\n        height: 100%;\n        padding: 0 10px;\n        box-sizing: border-box;\n        text-decoration: none;\n        color: #fff;\n      }\n      .boxscores-e-football .boxscores-e-game-link{\n        padding: 0 7px 0 10px;\n      }\n      .boxscores-e-game-link:hover{\n        color: #fff;\n      }\n      .boxscores-e-game-teams{\n        list-style-type: none;\n        margin: 0;\n        padding: 0;\n        width: 57px;\n        height: 100%;\n        line-height: normal;\n        display: inline-block;\n        vertical-align: middle;\n        font-size: 13px;\n        padding-top: 8px;\n        box-sizing: border-box;\n        float: left;\n      }\n      .boxscores-e-football .boxscores-e-game-teams{\n        width: 70px;\n      }\n      .boxscores-e-game-inning-top:before{\n        content: '';\n        width: 0;\n        height: 0;\n        border-style: solid;\n        border-width: 0 7px 9px 7px;\n        border-color: transparent transparent #fff transparent;\n        margin-right: 5px;\n        display: inline-block;\n      }\n      .boxscores-e-game-inning-bottom:before{\n        content: '';\n        width: 0;\n        height: 0;\n        border-style: solid;\n        border-width: 9px 7px 0 7px;\n        border-color: #fff transparent transparent transparent;\n        margin-right: 5px;\n        display: inline-block;\n      }\n      .boxscores-e-game-teamscore{\n        float: right;\n      }\n      .boxscores-e-game-time{\n        font-size: 12px;\n        float: right;\n        font-weight: 400;\n      }\n      .boxscores-e-nav{\n        float: left;\n        margin-right: 5px;\n        line-height: 50px;\n      }\n      .boxscores-e-nav-button{\n        width: 30px;\n        height: 30px;\n        border-radius: 5px;\n        background-color: #fff;\n        color: "+t+";\n        border: none;\n        margin: 0 3px 0 0;\n        vertical-align: middle;\n        cursor: pointer;\n        font-size: 24px;\n        padding: 0;\n      }\n      .boxscores-e-nav-button>i{\n        vertical-align: middle;\n        margin-top: 1px;\n        display: inline-block;\n      }\n      .boxscores-e-nav-button:focus{\n        outline: none;\n      }\n    ",document.head.appendChild(d)}function D(){for(var a=document.getElementsByClassName("boxscores-e-schedule")[0];a.hasChildNodes();)a.removeChild(a.firstChild)}function E(a){var b=a%10,c=a%100;return 1==b&&11!=c?a+"st":2==b&&12!=c?a+"nd":3==b&&13!=c?a+"rd":a+"th"}function F(a,b,c){b||(b=250);var d,e;return function(){var f=c||this,g=+new Date,h=arguments;d&&g<d+b?(clearTimeout(e),e=setTimeout(function(){d=g,a.apply(f,h)},b+d-g)):(d=g,a.apply(f,h))}}function G(a,b,c){return a=a.sort(function(a,d){return b>0?a[c]<d[c]?-1:a[c]>d[c]?1:0:a[c]>d[c]?-1:a[c]<d[c]?1:0})}function H(a){var b=document.createElement("li");return b.className=a.gameClass?a.gameClass+" boxscores-e-game":"boxscores-e-game",b.innerHTML='\n      <a class="boxscores-e-game-link" href="'+a.link+'">\n        <ul class="boxscores-e-game-teams">\n          <li>\n            '+a.homeTeam+' <span class="boxscores-e-game-teamscore">'+a.homeScore+"</span>\n          </li>\n          <li>\n            "+a.awayTeam+' <span class="boxscores-e-game-teamscore">'+a.awayScore+'</span>\n          </li>\n        </ul>\n        <span class="boxscores-e-game-time">\n          '+a.bottomData+"\n        </span>\n      </a>\n    ",b}function I(b){var b=new Date(b+3600*a.easternTime.offset*1e3),c=b.getUTCHours(),d=c>=12?"PM":"AM";c=c>12?c-12:c;var e=b.getUTCMinutes();e=1===e.toString().length?"0"+e.toString():e;var f=c+":"+e+d+" "+a.easternTime.tzAbbrev;return f}function J(b,c){var d=[],f=[],g=[],h=[],i=[],j=function(b){var c=b.split("-"),d=["Jan","Feb","Mar","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];return d[Number(c[1])-1]+" "+E(c[2])};for(var k in b){var l=b[k],m=!1,n=new Date(l.eventStartTime+3600*a.easternTime.offset*1e3).getUTCDate(),o=(new Date).getTime();if(n==a.todayObject.date&&(m=!0),m){if("N"===l.liveStatus&&l.eventStartTime>o){var p={homeTeam:l.team1Abbreviation,homeScore:"-",awayTeam:l.team2Abbreviation,awayScore:"-",timestamp:l.eventStartTime,datetime:I(l.eventStartTime),eventId:l.eventId,gameClass:"boxscores-e-football"};p.bottomData=p.datetime,"nfl"===c?p.link=e+"/nfl/articles/pregame-report/"+l.eventId:"ncaaf"===c?p.link=e+"/ncaaf/articles/pregame-report/"+l.eventId:p.link="#",p.gameNode=H(p),d.push(p)}else if("Y"===l.liveStatus&&l.eventStartTime<o){var p={homeTeam:l.team1Abbreviation,homeScore:l.team1Score?l.team1Score:"-",awayTeam:l.team2Abbreviation,awayScore:l.team2Score?l.team2Score:"-",timestamp:l.eventStartTime,datetime:I(l.eventStartTime),eventId:l.eventId,gameClass:"boxscores-e-football"};p.bottomData=l.eventQuarter?E(l.eventQuarter):p.datetime,"nfl"===c?p.link=e+"/nfl/articles/live-report/"+l.eventId:"ncaaf"===c?p.link=e+"/ncaaf/articles/live-report/"+l.eventId:p.link="#",p.gameNode=H(p),f.push(p)}else if("N"===l.liveStatus&&l.eventStartTime<o){var p={homeTeam:l.team1Abbreviation,homeScore:"-",awayTeam:l.team2Abbreviation,awayScore:"-",timestamp:l.eventStartTime,datetime:I(l.eventStartTime),eventId:l.eventId,gameClass:"boxscores-e-football"};p.bottomData="Final","nfl"===c?p.link=e+"/nfl/articles/postgame-report/"+l.eventId:"ncaaf"===c?p.link=e+"/ncaaf/articles/postgame-report/"+l.eventId:p.link="#",p.gameNode=H(p),g.push(p)}}else if(l.eventStartTime>o){var p={homeTeam:l.team1Abbreviation,homeScore:"-",awayTeam:l.team2Abbreviation,awayScore:"-",timestamp:l.eventStartTime,datetime:I(l.eventStartTime),eventId:l.eventId,gameClass:"boxscores-e-football"};p.bottomData=j(l.eventDate),"nfl"===c?p.link=e+"/nfl/articles/pregame-report/"+l.eventId:"ncaaf"===c?p.link=e+"/ncaaf/articles/pregame-report/"+l.eventId:p.link="#",p.gameNode=H(p),h.push(p)}else if(l.eventStartTime<o){var p={homeTeam:l.team1Abbreviation,homeScore:l.team1Score?l.team1Score:"-",awayTeam:l.team2Abbreviation,awayScore:l.team2Score?l.team2Score:"-",timestamp:l.eventStartTime,datetime:I(l.eventStartTime),eventId:l.eventId,gameClass:"boxscores-e-football"};p.bottomData="Final","nfl"===c?p.link=e+"/nfl/articles/postgame-report/"+l.eventId:"ncaaf"===c?p.link=e+"/ncaaf/articles/postgame-report/"+l.eventId:p.link="#",p.gameNode=H(p),i.push(p)}}d=G(d,1,"timestamp"),f=G(f,1,"timestamp"),g=G(g,1,"timestamp"),h=G(h,1,"timestamp"),i=G(i,1,"timestamp");var q=f.concat(d,g,h,i);return q}function K(b){var c=[],d=[],f=[];for(var g in b){var h=b[g],i=!1,j=new Date(h.gameInfo.startDateTimestamp+3600*a.easternTime.offset*1e3).getUTCDate();if(j==a.todayObject.date?i=!0:h.gameInfo.live&&(i=!0),i)switch(h.gameInfo.eventStatus){case"pre-event":if(h.gameInfo.live===!1){var k={homeTeam:h.homeTeamInfo.abbreviation,homeScore:"-",awayTeam:h.awayTeamInfo.abbreviation,awayScore:"-",timestamp:h.gameInfo.startDateTimestamp,datetime:I(h.gameInfo.startDateTimestamp),eventStatus:h.gameInfo.eventStatus,eventId:h.gameInfo.eventId,gameClass:"boxscores-e-baseball"};k.bottomData=k.datetime,k.link=e+"/articles/pregame-report/"+k.eventId,k.gameNode=H(k),c.push(k)}else{var k={homeTeam:h.homeTeamInfo.abbreviation,homeScore:h.homeTeamInfo.score,awayTeam:h.awayTeamInfo.abbreviation,awayScore:h.awayTeamInfo.score,timestamp:h.gameInfo.startDateTimestamp,datetime:I(h.gameInfo.startDateTimestamp),eventStatus:h.gameInfo.eventStatus,eventId:h.gameInfo.eventId,gameClass:"boxscores-e-baseball"};"top"===h.gameInfo.inningHalf?k.bottomData='<i class="boxscores-e-game-inning-top"></i>'+(h.gameInfo.inningsPlayed?E(h.gameInfo.inningsPlayed):k.datetime):"bottom"===h.gameInfo.inningHalf?k.bottomData='<i class="boxscores-e-game-inning-bottom"></i>'+(h.gameInfo.inningsPlayed?E(h.gameInfo.inningsPlayed):k.datetime):k.bottomData="",h.gameInfo.inningsPlayed<=3?k.link=e+"/articles/pregame-report/"+k.eventId:h.gameInfo.inningsPlayed>3&&h.gameInfo.inningsPlayed<=5?k.link=e+"/articles/third-inning-report/"+k.eventId:h.gameInfo.inningsPlayed>5&&h.gameInfo.inningsPlayed<=7?k.link=e+"/articles/fifth-inning-report/"+k.eventId:h.gameInfo.inningsPlayed>7&&(k.link=e+"/articles/seventh-inning-report/"+k.eventId),k.gameNode=H(k),d.push(k)}break;case"post-event":var k={homeTeam:h.homeTeamInfo.abbreviation,homeScore:h.homeTeamInfo.score,awayTeam:h.awayTeamInfo.abbreviation,awayScore:h.awayTeamInfo.score,timestamp:h.gameInfo.startDateTimestamp,datetime:I(h.gameInfo.startDateTimestamp),eventStatus:h.gameInfo.eventStatus,eventId:h.gameInfo.eventId,gameClass:"boxscores-e-baseball"};k.bottomData="Final",k.link=e+"/articles/postgame-report/"+k.eventId,k.gameNode=H(k),f.push(k)}}c=G(c,1,"timestamp"),d=G(d,1,"timestamp"),f=G(f,1,"timestamp");var l=d.concat(c,f);return l}a.embedSource="http://w1.synapsys.us/widgets/deepdive/boxscores/boxscores_2-0.js",a.boxscoresLoaded=!1,a.help=function(){console.warn("Boxscores Bar - Must specify query string.\n      Paramters:\n      [vertical] - vertical of the boxscores embed. Options are (mlb, nfl, and ncaaf)\n    ")},a.easternTime=function(){var b,c,d,e,a=(new Date).getUTCFullYear(),f=(new Date).getTime();for(b=new Date(a,2,7,0,0,0,0),b.setDate(7+(7-b.getDay())),b.setUTCHours(7),b=b.getTime(),c=new Date(a,10,1,0,0,0,0);0!==c.getDay();)c.setDate(c.getDate()+1);return c.setUTCHours(6),c=c.getTime(),f<=b||f>c?(d=-5,e="EST"):(d=-4,e="EDT"),{offset:d,tzAbbrev:e}}(),a.todayObject=function(a,b){var c=new Date((new Date).getTime()+3600*a*1e3),d=c.getUTCMonth()+1,e=c.getUTCDate(),f={today:c,year:c.getUTCFullYear(),month:1===d.toString().length?"0"+d:d,date:1===e.toString().length?"0"+e:e};return f.dateInput=f.year+"-"+f.month+"-"+f.date,f}(a.easternTime.offset);var c=window;try{for(;c!==top;)c=c.parent}catch(a){console.error("boxscores - couldn/'t access the top window")}var g,h,i,k,l,d=c.location,e=d.hostname.replace(/www./,""),f="https"===c.protocol?"https":"http",j=[],m=document.currentScript||function(){for(var a=document.getElementsByTagName("script"),b=a.length-1;b>=0;b--)if(a[b].src.indexOf(skyscraperRails.embedSource)!=-1)return a[b]}();g=m.parentNode;var n=m.src.split("?")[1];if("undefined"==typeof n)return a.help(),!1;var p,o=n.split("&");o.forEach(function(a){var b=a.split("=");switch(b[0]){case"vertical":p=decodeURIComponent(b[1])}});try{if("undefined"==typeof p)throw"Must speicify vertical of boxscores bar. (Options are mlb, nfl, and ncaaf)"}catch(a){return console.warn("Boxscores Bar - "+a),!1}var q,r,s,t,u,v,w;switch(p){case"mlb":q=f+"://prod-homerunloyal-api.synapsys.us/league/boxScores/"+a.todayObject.dateInput,r=["myhomerunzone.com","dev.myhomerunzone.com","qa.myhomerunzone.com"],s="#004e87",t="#000",u="TODAY'S MLB GAMES",v="#2c2c2c",w=function(b){return K(b)};break;case"nfl":q=f+"://dev-touchdownloyal-api.synapsys.us/boxScores/league/nfl/"+a.todayObject.dateInput,r=["mytouchdownzone.com","dev.mytouchdownzone.com","qa.mytouchdownzone.com"],s="#272727",t="#44b244",u="NFL THIS WEEK",v="#000",w=function(b){return J(b,"nfl")};break;case"ncaaf":q=f+"://dev-touchdownloyal-api.synapsys.us/boxScores/league/fbs/"+a.todayObject.dateInput,r=["mytouchdownzone.com","dev.mytouchdownzone.com","qa.mytouchdownzone.com"],s="#272727",t="#44b244",u="NCAAF THIS WEEK",v="#000",w=function(b){return J(b,"ncaaf")};break;default:q=f+"://prod-homerunloyal-api.synapsys.us/league/boxScores/"+a.todayObject.dateInput,r=["myhomerunzone.com","dev.myhomerunzone.com","qa.myhomerunzone.com"],s="#004e87",t="#000",u="TODAY'S MLB GAMES",v="#2c2c2c",w=function(b){return K(data)}}for(var x=!1,y=0,z=r.length;y<z;y++)if(r[y]===e){x=!0;break}if(x){var A=d.pathname.split("/"),B=A[1];e+="/"+B}a.resize=function(){if(h=g.offsetWidth,a.boxscoresLoaded)if(h>=1170&&5!==i){i=5,D();var b=i-j.length;if(b>0){for(var c=0;c<b;c++){var d=j[j.length-1];j.push(d+1>=k?0:d+1)}for(var e=0,f=j.length;e<f;e++){var m=j[e],n=document.getElementsByClassName("boxscores-e-schedule")[0];n.appendChild(l[m].gameNode)}}}else if(h<1170&&h>=1010&&4!==i){i=4,D();var b=i-j.length;if(b>0){for(var c=0;c<b;c++){var d=j[j.length-1];j.push(d+1>=k?0:d+1)}for(var e=0,f=j.length;e<f;e++){var m=j[e],n=document.getElementsByClassName("boxscores-e-schedule")[0];n.appendChild(l[m].gameNode)}}else{b=Math.abs(b);for(var c=0;c<b;c++)j.pop();for(var e=0,f=j.length;e<f;e++){var m=j[e],n=document.getElementsByClassName("boxscores-e-schedule")[0];n.appendChild(l[m].gameNode)}}}else if(h<1010&&h>=820&&3!==i){i=3,D();var b=i-j.length;if(b>0){for(var c=0;c<b;c++){var d=j[j.length-1];j.push(d+1>=k?0:d+1)}for(var e=0,f=j.length;e<f;e++){var m=j[e],n=document.getElementsByClassName("boxscores-e-schedule")[0];n.appendChild(l[m].gameNode)}}else{b=Math.abs(b);for(var c=0;c<b;c++)j.pop();for(var e=0,f=j.length;e<f;e++){var m=j[e],n=document.getElementsByClassName("boxscores-e-schedule")[0];n.appendChild(l[m].gameNode)}}}else if(h<820&&2!==i){i=2,D();var b=i-j.length;if(b>0);else{b=Math.abs(b);for(var c=0;c<b;c++)j.pop();for(var e=0,f=j.length;e<f;e++){var m=j[e],n=document.getElementsByClassName("boxscores-e-schedule")[0];n.appendChild(l[m].gameNode)}}}},a.buildBoxscores=function(){if(a.boxscoresLoaded)return!1;var b=document.createElement("section");b.className="boxscores-e-bar",b.innerHTML='\n      <div class="boxscores-e-title">\n        '+u+'\n      </div>\n\n      <ul class="boxscores-e-schedule"></ul>\n\n      <div class="boxscores-e-nav">\n        <button id="boxscores-e-left" class="boxscores-e-nav-button boxscores-e-prev">\n          <i class="ddh-icon-angle-left"></i>\n        </button>\n        <button id="boxscores-e-right" class="boxscores-e-nav-button boxscores-e-next">\n          <i class="ddh-icon-angle-right"></i>\n        </button>\n      </div>\n    ';var c=new XMLHttpRequest;c.onreadystatechange=function(){if(4===c.readyState&&200===c.status){var d=JSON.parse(c.responseText);console.log("ajax complete",d),l=w(d.data),k=l.length,console.log("processed data",l),g.insertBefore(b,m),h=g.offsetWidth,i=h>=1340?5:h>=1180?4:h>=990?3:2;for(var e=0;e<i;e++)"undefined"!=typeof l[e]&&j.push(e);for(var f=0,n=j.length;f<n;f++){var o=j[f],p=document.getElementsByClassName("boxscores-e-schedule")[0];p.appendChild(l[o].gameNode)}var q=document.getElementById("boxscores-e-right");q.addEventListener("click",function(){D();for(var a=0;a<i;a++){var b=j[a]+i;b>=k&&(b-=k),"undefined"!=typeof l[b]&&(j[a]=b)}for(var c=0,d=j.length;c<d;c++){var e=j[c],f=document.getElementsByClassName("boxscores-e-schedule")[0];f.appendChild(l[e].gameNode)}});var r=document.getElementById("boxscores-e-left");r.addEventListener("click",function(){D();for(var a=0;a<i;a++){var b=j[a]-i;b<0&&(b+=k),"undefined"!=typeof l[b]&&(j[a]=b)}for(var c=0,d=j.length;c<d;c++){var e=j[c],f=document.getElementsByClassName("boxscores-e-schedule")[0];f.appendChild(l[e].gameNode)}}),a.boxscoresLoaded=!0}else 4===c.readyState&&200!==c.status&&console.log("ajax error",c.responseText)},c.open("GET",q,!0),c.send()},C(),a.buildBoxscores(),window.addEventListener("resize",F(a.resize,100))}(window.boxscoresBar=window.boxscoresBar||{});
