'use strict';(function(d,f){//Clear games from boxscores bar
function g(){for(var U=document.getElementsByClassName('boxscores-e-schedule')[0];U.hasChildNodes();)U.removeChild(U.firstChild)}//Get ordinal suffix of a number (1st, 2nd, etc..)
function h(U){var V=U%10,W=U%100;return 1==V&&11!=W?U+'st':2==V&&12!=W?U+'nd':3==V&&13!=W?U+'rd':U+'th'}//Throttle function
//Function to sort array (ascending or descending) in a particular order (1 for ascending, 0 for descending)
function l(U,V,W){return U=U.sort(function(X,Y){return 0<V?X[W]<Y[W]?-1:X[W]>Y[W]?1:0:X[W]>Y[W]?-1:X[W]<Y[W]?1:0}),U}//Build game node
function m(U){var V=document.createElement('li'),W=U.timeClass?U.timeClass+' boxscores-e-game-time':'boxscores-e-game-time';return V.className=U.gameClass?U.gameClass+' boxscores-e-game':'boxscores-e-game',V.innerHTML='\n      <a class="boxscores-e-game-link" href="'+U.link+'">\n        <ul class="boxscores-e-game-teams">\n          <li>\n            '+U.homeTeam+' <span class="boxscores-e-game-teamscore">'+U.homeScore+'</span>\n          </li>\n          <li>\n            '+U.awayTeam+' <span class="boxscores-e-game-teamscore">'+U.awayScore+'</span>\n          </li>\n        </ul>\n        <span class="'+W+'">\n          '+U.bottomData+'\n        </span>\n      </a>\n    ',V}//Convert unix timestamp to datetime [hour:minute meridian tzAbbrev]
function n(U){var U=new Date(U+1000*(3600*d.easternTime.offset)),V=U.getUTCHours(),W=12<=V?'PM':'AM';V=12<V?V-12:V;var X=U.getUTCMinutes();X=1===X.toString().length?'0'+X.toString():X;var Y=V+':'+X+W+' '+d.easternTime.tzAbbrev;return Y}//Format football data
// data: array of data from api to be processed
// vertical: vertical to determine links (nfl or ncaaf)
function o(U,V){var W=[],X=[],Y=[],Z=[],$=[],_=function _(la,ma){var na=new Date(la+1000*(3600*d.easternTime.offset)),oa=na.getUTCDay();return['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][oa]+'<br>'+ma};for(var aa in U){var ba=U[aa],ca=!1,da=new Date(ba.eventStartTime+1000*(3600*d.easternTime.offset)).getUTCDate(),ea=new Date().getTime();if(da==d.todayObject.date&&(ca=!0),ca){//Game is Today
if('N'===ba.liveStatus&&ba.eventStartTime>ea){//Pre Game
var fa,ga,ha,ia;'nfl'===V?(fa=ba.team1Record.split('-'),ga=fa[0]+'-'+fa[1],ha=ba.team2Record.split('-'),ia=ha[0]+'-'+ha[1]):(ga='-',ia='-');var ja={homeTeam:ba.team1Abbreviation,homeScore:ga,awayTeam:ba.team2Abbreviation,awayScore:ia,timestamp:ba.eventStartTime,datetime:n(ba.eventStartTime),eventId:ba.eventId,gameClass:'boxscores-e-football',timeClass:'boxscores-e-2-lines'};ja.bottomData=_(ja.timestamp,ja.datetime),ja.link='nfl'===V?s+'/nfl/articles/pregame-report/'+ba.eventId:'ncaaf'===V?s+'/ncaaf/articles/pregame-report/'+ba.eventId:'#',ja.gameNode=m(ja),W.push(ja)}else if('Y'===ba.liveStatus&&ba.eventStartTime<ea){//Live Game
var ja={homeTeam:ba.team1Abbreviation,homeScore:ba.team1Score?ba.team1Score:'-',awayTeam:ba.team2Abbreviation,awayScore:ba.team2Score?ba.team2Score:'-',timestamp:ba.eventStartTime,datetime:n(ba.eventStartTime),eventId:ba.eventId,gameClass:'boxscores-e-football'};ja.bottomData=ba.eventQuarter?h(ba.eventQuarter):ja.datetime,ja.link='nfl'===V?s+'/nfl/articles/in-game-report/'+ba.eventId:'ncaaf'===V?s+'/ncaaf/articles/in-game-report/'+ba.eventId:'#',ja.gameNode=m(ja),X.push(ja)}else if('N'===ba.liveStatus&&ba.eventStartTime<ea){//Post Game
var ja={homeTeam:ba.team1Abbreviation,homeScore:ba.team1Score?ba.team1Score:'-',awayTeam:ba.team2Abbreviation,awayScore:ba.team2Score?ba.team2Score:'-',timestamp:ba.eventStartTime,datetime:n(ba.eventStartTime),eventId:ba.eventId,gameClass:'boxscores-e-football',timeClass:'boxscores-e-2-lines'};ja.bottomData=_(ja.timestamp,'Final'),ja.link='nfl'===V?s+'/nfl/articles/postgame-report/'+ba.eventId:'ncaaf'===V?s+'/ncaaf/articles/postgame-report/'+ba.eventId:'#',ja.gameNode=m(ja),Y.push(ja)}}else//Game is this week
if(ba.eventStartTime>ea){//Pre Game
var fa,ga,ha,ia;'nfl'===V?(fa=ba.team1Record.split('-'),ga=fa[0]+'-'+fa[1],ha=ba.team2Record.split('-'),ia=ha[0]+'-'+ha[1]):(ga='-',ia='-');var ja={homeTeam:ba.team1Abbreviation,homeScore:ga,awayTeam:ba.team2Abbreviation,awayScore:ia,timestamp:ba.eventStartTime,datetime:n(ba.eventStartTime),eventId:ba.eventId,gameClass:'boxscores-e-football',timeClass:'boxscores-e-2-lines'};ja.bottomData=_(ja.timestamp,ja.datetime),ja.link='nfl'===V?s+'/nfl/articles/pregame-report/'+ba.eventId:'ncaaf'===V?s+'/ncaaf/articles/pregame-report/'+ba.eventId:'#',ja.gameNode=m(ja),Z.push(ja)}else if(ba.eventStartTime<ea){//Post Game
var ja={homeTeam:ba.team1Abbreviation,homeScore:ba.team1Score?ba.team1Score:'-',awayTeam:ba.team2Abbreviation,awayScore:ba.team2Score?ba.team2Score:'-',timestamp:ba.eventStartTime,datetime:n(ba.eventStartTime),eventId:ba.eventId,gameClass:'boxscores-e-football',timeClass:'boxscores-e-2-lines'};ja.bottomData=_(ja.timestamp,'Final'),ja.link='nfl'===V?s+'/nfl/articles/postgame-report/'+ba.eventId:'ncaaf'===V?s+'/ncaaf/articles/postgame-report/'+ba.eventId:'#',ja.gameNode=m(ja),$.push(ja)}}W=l(W,1,'timestamp'),X=l(X,1,'timestamp'),Y=l(Y,1,'timestamp'),Z=l(Z,1,'timestamp'),$=l($,1,'timestamp');var ka=X.concat(W,Y,Z,$);return ka}//Format baseball data
// data: array of data from api to be processed
function p(U){var V=[],W=[],X=[];for(var Y in U){var Z=U[Y],$=!1,_=new Date(Z.gameInfo.startDateTimestamp+1000*(3600*d.easternTime.offset)).getUTCDate();//Determine if game is today (Also allow games that are live, but the day has rolled over past midnight)
//If game is today or live, push to return array
if(_==d.todayObject.date?$=!0:Z.gameInfo.live&&($=!0),$)switch(Z.gameInfo.eventStatus){case'pre-event':if(!1===Z.gameInfo.live){//Pre Game
var aa={homeTeam:Z.homeTeamInfo.abbreviation,homeScore:'-',awayTeam:Z.awayTeamInfo.abbreviation,awayScore:'-',timestamp:Z.gameInfo.startDateTimestamp,datetime:n(Z.gameInfo.startDateTimestamp),eventStatus:Z.gameInfo.eventStatus,eventId:Z.gameInfo.eventId,gameClass:'boxscores-e-baseball'};aa.bottomData=aa.datetime,aa.link=s+'/articles/pregame-report/'+aa.eventId,aa.gameNode=m(aa),V.push(aa)}else{//Live Game
var aa={homeTeam:Z.homeTeamInfo.abbreviation,homeScore:Z.homeTeamInfo.score,awayTeam:Z.awayTeamInfo.abbreviation,awayScore:Z.awayTeamInfo.score,timestamp:Z.gameInfo.startDateTimestamp,datetime:n(Z.gameInfo.startDateTimestamp),eventStatus:Z.gameInfo.eventStatus,eventId:Z.gameInfo.eventId,gameClass:'boxscores-e-baseball'};aa.bottomData='top'===Z.gameInfo.inningHalf?'<i class="boxscores-e-game-inning-top"></i>'+(Z.gameInfo.inningsPlayed?h(Z.gameInfo.inningsPlayed):aa.datetime):'bottom'===Z.gameInfo.inningHalf?'<i class="boxscores-e-game-inning-bottom"></i>'+(Z.gameInfo.inningsPlayed?h(Z.gameInfo.inningsPlayed):aa.datetime):'',3>=Z.gameInfo.inningsPlayed?aa.link=s+'/articles/pregame-report/'+aa.eventId:3<Z.gameInfo.inningsPlayed&&5>=Z.gameInfo.inningsPlayed?aa.link=s+'/articles/third-inning-report/'+aa.eventId:5<Z.gameInfo.inningsPlayed&&7>=Z.gameInfo.inningsPlayed?aa.link=s+'/articles/fifth-inning-report/'+aa.eventId:7<Z.gameInfo.inningsPlayed&&(aa.link=s+'/articles/seventh-inning-report/'+aa.eventId),aa.gameNode=m(aa),W.push(aa)}break;case'post-event'://Post Game
var aa={homeTeam:Z.homeTeamInfo.abbreviation,homeScore:Z.homeTeamInfo.score,awayTeam:Z.awayTeamInfo.abbreviation,awayScore:Z.awayTeamInfo.score,timestamp:Z.gameInfo.startDateTimestamp,datetime:n(Z.gameInfo.startDateTimestamp),eventStatus:Z.gameInfo.eventStatus,eventId:Z.gameInfo.eventId,gameClass:'boxscores-e-baseball'};aa.bottomData='Final',aa.link=s+'/articles/postgame-report/'+aa.eventId,aa.gameNode=m(aa),X.push(aa);break;default:}}V=l(V,1,'timestamp'),W=l(W,1,'timestamp'),X=l(X,1,'timestamp');var ba=W.concat(V,X);return ba}d.embedSource='http://w1.synapsys.us/widgets/deepdive/boxscores/boxscores_2-0.js',d.boxscoresLoaded=!1,d.help=function(){console.warn('Boxscores Bar - Must specify query string.\n      Paramters:\n      [vertical] - vertical of the boxscores embed. Options are (mlb, nfl, and ncaaf)\n    ')},d.easternTime=function(){//Grab current year
var V,W,X,Y,U=new Date().getUTCFullYear(),Z=new Date().getTime();//Get second sunday of march 2:00 EST (beginning of daylight savings time)
for(V=new Date(U,2,7,0,0,0,0),V.setDate(7+(7-V.getDay())),V.setUTCHours(7),V=V.getTime(),W=new Date(U,10,1,0,0,0,0);0!==W.getDay();)W.setDate(W.getDate()+1);return W.setUTCHours(6),W=W.getTime(),Z<=V||Z>W?(X=-5,Y='ET'):(X=-4,Y='ET'),{offset:X,tzAbbrev:Y}}(),d.todayObject=function(U,V){var W=new Date(new Date().getTime()+1000*(3600*U)),X=W.getUTCMonth()+1,Y=W.getUTCDate(),Z={today:W,year:W.getUTCFullYear(),month:1===X.toString().length?'0'+X:X,date:1===Y.toString().length?'0'+Y:Y};return Z.dateInput=Z.year+'-'+Z.month+'-'+Z.date,Z}(d.easternTime.offset);var q=window;try{for(;q!==top;)q=q.parent}catch(U){console.error('boxscores - couldn/\'t access the top window')}//Global variables
var r=q.location,s=r.hostname.replace(/www./,''),u='https'===q.protocol?'https':'http',v,w,x,y=[],A,B,C=document.currentScript||function(){var U=document.getElementsByTagName('script');for(var V=U.length-1;0<=V;V--)if(-1!=U[V].src.indexOf(skyscraperRails.embedSource))return U[V]}();//Container and width of container
//number of games to display
//Variables for game data
//Grab parent node
v=C.parentNode;var D=C.src.split('?')[1];if('undefined'==typeof D)return d.help(),!1;//Parse query string
//Vertical specific variables
var F,E=D.split('&');//Define query params
E.forEach(function(U){var V=U.split('=');switch(V[0]){case'vertical':F=decodeURIComponent(V[1]);}});//Check if required variables are defined
try{if('undefined'==typeof F)throw'Must speicify vertical of boxscores bar. (Options are mlb, nfl, and ncaaf)'}catch(U){return console.warn('Boxscores Bar - '+U),!1}var G,//Api for the boxscores data
H,//List of domains to add partner domain too (Ex. myhomerunzone.com/latimes.com)
I,//Background color of bar
J,//Color of bar arrows
K,//Title of bar
L,//Title of the toggle scope button
M,N,//Color of border for games
O;//Function to format the data
switch(F){case'mlb':G=u+'://prod-homerunloyal-api.synapsys.us/league/boxScores/'+d.todayObject.dateInput,H=['myhomerunzone.com','dev.myhomerunzone.com','qa.myhomerunzone.com'],I='#004e87',J='#000',K='TODAY\'S MLB GAMES',N='#2c2c2c',O=function O(U){return p(U)};break;case'nfl':G=u+'://prod-touchdownloyal-api.synapsys.us/boxScores/league/nfl/'+d.todayObject.dateInput,H=['mytouchdownzone.com','dev.mytouchdownzone.com','qa.mytouchdownzone.com'],I='#272727',J='#fc501d',K='NFL GAMES THIS WEEK',L='College Football',M='/app/fe-core/ads/ncaafbluebar.html',N='#000',O=function O(U){return o(U,'nfl')};break;case'ncaaf':G=u+'://prod-touchdownloyal-api.synapsys.us/boxScores/league/fbs/'+d.todayObject.dateInput,H=['mytouchdownzone.com','dev.mytouchdownzone.com','qa.mytouchdownzone.com'],I='#272727',J='#fc501d',K='NCAAF GAMES THIS WEEK',L='Pro Football',M='/app/fe-core/ads/nflbluebar.html',N='#000',O=function O(U){return o(U,'ncaaf')};break;default:G=u+'://prod-homerunloyal-api.synapsys.us/league/boxScores/'+d.todayObject.dateInput,H=['myhomerunzone.com','dev.myhomerunzone.com','qa.myhomerunzone.com'],I='#004e87',J='#000',K='TODAY\'S MLB GAMES',N='#2c2c2c',O=function O(U){return p(data)};}//Check to see if embed lives on partner site
var P=!1;for(var Q=0,R=H.length;Q<R;Q++)if(H[Q]===s){P=!0;break}if(P){var S=r.pathname.split('/'),T=S[1];s+='/'+T}s=u+'://'+s,d.resize=function(){if(w=v.offsetWidth,d.boxscoresLoaded)if(1170<=w&&5!==x){x=5,g();var U=x-y.length;if(0<U){//Add items to array
//Get new index values
for(var V=0;V<U;V++){var W=y[y.length-1];y.push(W+1>=A?0:W+1)}//Insert games
for(var X=0,Y=y.length;X<Y;X++){var Z=y[X],$=document.getElementsByClassName('boxscores-e-schedule')[0];$.appendChild(B[Z].gameNode)}}}else if(1170>w&&1010<=w&&4!==x){x=4,g();var U=x-y.length;if(0<U){//Add items to array
//Get new index values
for(var V=0;V<U;V++){var W=y[y.length-1];y.push(W+1>=A?0:W+1)}//Insert games
for(var X=0,Y=y.length;X<Y;X++){var Z=y[X],$=document.getElementsByClassName('boxscores-e-schedule')[0];$.appendChild(B[Z].gameNode)}}else{U=Math.abs(U);//Get new index values
for(var V=0;V<U;V++)y.pop();//Insert games
for(var X=0,Y=y.length;X<Y;X++){var Z=y[X],$=document.getElementsByClassName('boxscores-e-schedule')[0];$.appendChild(B[Z].gameNode)}}}else if(1010>w&&820<=w&&3!==x){x=3,g();var U=x-y.length;if(0<U){//Add items to array
//Get new index values
for(var V=0;V<U;V++){var W=y[y.length-1];y.push(W+1>=A?0:W+1)}//Insert games
for(var X=0,Y=y.length;X<Y;X++){var Z=y[X],$=document.getElementsByClassName('boxscores-e-schedule')[0];$.appendChild(B[Z].gameNode)}}else{U=Math.abs(U);//Get new index values
for(var V=0;V<U;V++)y.pop();//Insert games
for(var X=0,Y=y.length;X<Y;X++){var Z=y[X],$=document.getElementsByClassName('boxscores-e-schedule')[0];$.appendChild(B[Z].gameNode)}}}else if(820>w&&2!==x){x=2,g();var U=x-y.length;if(!(0<U)){U=Math.abs(U);//Get new index values
for(var V=0;V<U;V++)y.pop();//Insert games
for(var X=0,Y=y.length;X<Y;X++){var Z=y[X],$=document.getElementsByClassName('boxscores-e-schedule')[0];$.appendChild(B[Z].gameNode)}}}},d.buildBoxscores=function(){//Exit function if boxscores already built
if(d.boxscoresLoaded)return!1;var U=document.createElement('section');U.className='boxscores-e-bar';var V='';L&&(V='<a href="'+M+'" target="_self"><div class="boxscores-e-scope-toggle">\n        '+L+'\n      </div></a>'),U.innerHTML='\n      <div class="boxscores-e-title">\n        '+K+'\n      </div>\n      '+V+'\n\n      <ul class="boxscores-e-schedule"></ul>\n\n      <div class="boxscores-e-nav">\n        <button id="boxscores-e-left" class="boxscores-e-nav-button boxscores-e-prev">\n          <i class="ddh-icon-angle-left"></i>\n        </button>\n        <button id="boxscores-e-right" class="boxscores-e-nav-button boxscores-e-next">\n          <i class="ddh-icon-angle-right"></i>\n        </button>\n      </div>\n    ';var W=new XMLHttpRequest;W.onreadystatechange=function(){if(4===W.readyState&&200===W.status){//Success
var X=JSON.parse(W.responseText);//console.log('ajax complete', res);
//If 1 or 0 games, remove arrows
if(B=O(X.data),A=B.length,v.insertBefore(U,C),1>=A){var Y=document.getElementsByClassName('boxscores-e-nav')[0];Y.parentNode.removeChild(Y)}//Calculate parentNodeWith to determine amount of games to display
w=v.offsetWidth,x=1340<=w?5:1180<=w?4:990<=w?3:640<=w?2:2;//Get initial indexes to show
for(var Z=0;Z<x;Z++)'undefined'!=typeof B[Z]&&y.push(Z);//Display initial games
for(var $=0,_=y.length;$<_;$++){var aa=y[$],ba=document.getElementsByClassName('boxscores-e-schedule')[0];ba.appendChild(B[aa].gameNode)}//Configure next button
var ca=document.getElementById('boxscores-e-right');ca.addEventListener('click',function(){g();for(var ea=0;ea<x;ea++){var fa=y[ea]+x;//If index is greater than amount of data, wrap around to beginning of array;
fa>=A&&(fa=fa-A),'undefined'!=typeof B[fa]&&(y[ea]=fa)}for(var ga=0,ha=y.length;ga<ha;ga++){var ia=y[ga],ja=document.getElementsByClassName('boxscores-e-schedule')[0];ja.appendChild(B[ia].gameNode)}});//Confgure prev button
var da=document.getElementById('boxscores-e-left');da.addEventListener('click',function(){g();for(var ea=0;ea<x;ea++){var fa=y[ea]-x;//If index is less than 0, wrap around to end of array
0>fa&&(fa=fa+A),'undefined'!=typeof B[fa]&&(y[ea]=fa)}for(var ga=0,ha=y.length;ga<ha;ga++){var ia=y[ga],ja=document.getElementsByClassName('boxscores-e-schedule')[0];ja.appendChild(B[ia].gameNode)}}),d.boxscoresLoaded=!0}else if(4===W.readyState&&200!==W.status);},W.open('GET',G,!0),W.send()},//Load Dependencies
function(){//Build base tag
var V=document.createElement('base');V.target='_parent',document.head.appendChild(V);//Build and load font
var W=document.createElement('link');W.rel='stylesheet',W.type='text/css',W.dataset.resource_from='boxscores-embed',W.href='https://fonts.googleapis.com/css?family=Lato:300,400',document.head.appendChild(W);//Build and load icons
var X=document.createElement('link');X.rel='stylesheet',X.type='text/css',X.dataset.resource_from='boxscores-embed',X.href=u+'://w1.synapsys.us/widgets/deepdive/fonts/styles.css',document.head.appendChild(X);//Build and load stylesheet
var Y=document.createElement('style');Y.dataset.resource_from='boxscores-embed',Y.innerHTML='\n      .boxscores-e-scope-toggle {\n        background-color: white;\n        border-radius: 3px;\n        padding: 0px 15px;\n        float: left;\n        display: inline-block;\n        height: calc(100% - 20px);\n        margin: 10px 20px;\n        color: #f26f26;\n        line-height: 30px;\n      }\n      @media (max-width: 767px) {\n        .boxscores-e-scope-toggle {\n          display: none;\n        }\n      }\n      .boxscores-e-bar{\n        width: 100%;\n        min-width: 640px;\n        height: 50px;\n        line-height: 50px;\n        background-color:'+I+';\n        color: #fff;\n        font-family: Lato;\n        overflow: hidden;\n      }\n      .boxscores-e-title{\n        font-size: 18px;\n        float: left;\n        padding: 0 10px;\n        box-sizing: border-box;\n        line-height: 48px;\n      }\n      @media (max-width: 767px) {\n        .boxscores-e-title{\n          font-size: 14px;\n          padding: 2px 5px;\n          line-height: 15px;\n          width: 85px;\n        }\n      }\n      .boxscores-e-schedule{\n        list-style-type: none;\n        float: left;\n        margin: 0 5px 0 0;\n        padding: 0;\n        height: 100%;\n      }\n      .boxscores-e-game{\n        display: inline-block;\n        width: 166px;\n        height: 50px;\n        border-right: 1px solid'+N+';\n        box-sizing: border-box;\n        overflow: hidden;\n      }\n      .boxscores-e-game:last-child{\n        border-right: none;\n      }\n      .boxscores-e-game-link{\n        display: block;\n        width: 100%;\n        height: 100%;\n        padding: 0 10px;\n        box-sizing: border-box;\n        text-decoration: none;\n        color: #fff;\n      }\n      .boxscores-e-football .boxscores-e-game-link{\n        padding: 0 7px 0 10px;\n      }\n      .boxscores-e-game-link:hover{\n        color: #fff;\n      }\n      .boxscores-e-game-teams{\n        list-style-type: none;\n        margin: 0;\n        padding: 0;\n        width: 57px;\n        height: 100%;\n        line-height: normal;\n        display: inline-block;\n        vertical-align: middle;\n        font-size: 13px;\n        padding-top: 8px;\n        box-sizing: border-box;\n        float: left;\n      }\n      .boxscores-e-football .boxscores-e-game-teams{\n        width: 70px;\n      }\n      .boxscores-e-game-inning-top:before{\n        content: \'\';\n        width: 0;\n        height: 0;\n        border-style: solid;\n        border-width: 0 7px 9px 7px;\n        border-color: transparent transparent #fff transparent;\n        margin-right: 5px;\n        display: inline-block;\n      }\n      .boxscores-e-game-inning-bottom:before{\n        content: \'\';\n        width: 0;\n        height: 0;\n        border-style: solid;\n        border-width: 9px 7px 0 7px;\n        border-color: #fff transparent transparent transparent;\n        margin-right: 5px;\n        display: inline-block;\n      }\n      .boxscores-e-game-teamscore{\n        float: right;\n      }\n      .boxscores-e-game-time{\n        font-size: 12px;\n        float: right;\n        font-weight: 400;\n      }\n      .boxscores-e-game-time.boxscores-e-2-lines{\n        line-height: normal;\n        padding-top: 10px;\n      }\n      .boxscores-e-nav{\n        float: left;\n        margin-right: 5px;\n        line-height: 50px;\n      }\n      .boxscores-e-nav-button{\n        width: 30px;\n        height: 30px;\n        border-radius: 5px;\n        background-color: #fff;\n        color: '+J+';\n        border: none;\n        margin: 0 3px 0 0;\n        vertical-align: middle;\n        cursor: pointer;\n        font-size: 24px;\n        padding: 0;\n        line-height: normal;\n      }\n      .boxscores-e-nav-button>i{\n        vertical-align: middle;\n        margin-top: 1px;\n        display: inline-block;\n      }\n      .boxscores-e-nav-button:focus{\n        outline: none;\n      }\n    ',document.head.appendChild(Y)}(),d.buildBoxscores(),window.addEventListener('resize',function(V,W,X){W||(W=250);var Y,Z;return function(){var $=X||this,_=+new Date,aa=arguments;Y&&_<Y+W?(clearTimeout(Z),Z=setTimeout(function(){Y=_,V.apply($,aa)},W+Y-_)):(Y=_,V.apply($,aa))}}(d.resize,100))})(window.boxscoresBar=window.boxscoresBar||{});
