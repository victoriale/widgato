/**
 * @license
 * Fuse - Lightweight fuzzy-search
 *
 * Copyright (c) 2012-2016 Kirollos Risk <kirollos@gmail.com>.
 * All Rights Reserved. Apache Software License 2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
!function(t){"use strict";function e(){console.log.apply(console,arguments)}function s(t,e){var s,n,o,i;for(this.list=t,this.options=e=e||{},s=0,i=["sort","shouldSort","verbose","tokenize"],n=i.length;n>s;s++)o=i[s],this.options[o]=o in e?e[o]:r[o];for(s=0,i=["searchFn","sortFn","keys","getFn","include","tokenSeparator"],n=i.length;n>s;s++)o=i[s],this.options[o]=e[o]||r[o]}function n(t,e,s){var i,r,h,a,c,p;if(e){if(h=e.indexOf("."),-1!==h?(i=e.slice(0,h),r=e.slice(h+1)):i=e,a=t[i],null!==a&&void 0!==a)if(r||"string"!=typeof a&&"number"!=typeof a)if(o(a))for(c=0,p=a.length;p>c;c++)n(a[c],r,s);else r&&n(a,r,s);else s.push(a)}else s.push(t);return s}function o(t){return"[object Array]"===Object.prototype.toString.call(t)}function i(t,e){e=e||{},this.options=e,this.options.location=e.location||i.defaultOptions.location,this.options.distance="distance"in e?e.distance:i.defaultOptions.distance,this.options.threshold="threshold"in e?e.threshold:i.defaultOptions.threshold,this.options.maxPatternLength=e.maxPatternLength||i.defaultOptions.maxPatternLength,this.pattern=e.caseSensitive?t:t.toLowerCase(),this.patternLen=t.length,this.patternLen<=this.options.maxPatternLength&&(this.matchmask=1<<this.patternLen-1,this.patternAlphabet=this._calculatePatternAlphabet())}var r={id:null,caseSensitive:!1,include:[],shouldSort:!0,searchFn:i,sortFn:function(t,e){return t.score-e.score},getFn:n,keys:[],verbose:!1,tokenize:!1,matchAllTokens:!1,tokenSeparator:/ +/g};s.VERSION="2.5.0",s.prototype.set=function(t){return this.list=t,t},s.prototype.search=function(t){this.options.verbose&&e("\nSearch term:",t,"\n"),this.pattern=t,this.results=[],this.resultMap={},this._keyMap=null,this._prepareSearchers(),this._startSearch(),this._computeScore(),this._sort();var s=this._format();return s},s.prototype._prepareSearchers=function(){var t=this.options,e=this.pattern,s=t.searchFn,n=e.split(t.tokenSeparator),o=0,i=n.length;if(this.options.tokenize)for(this.tokenSearchers=[];i>o;o++)this.tokenSearchers.push(new s(n[o],t));this.fullSeacher=new s(e,t)},s.prototype._startSearch=function(){var t,e,s,n,o=this.options,i=o.getFn,r=this.list,h=r.length,a=this.options.keys,c=a.length,p=null;if("string"==typeof r[0])for(s=0;h>s;s++)this._analyze("",r[s],s,s);else for(this._keyMap={},s=0;h>s;s++)for(p=r[s],n=0;c>n;n++){if(t=a[n],"string"!=typeof t){if(e=1-t.weight||1,this._keyMap[t.name]={weight:e},t.weight<=0||t.weight>1)throw new Error("Key weight has to be > 0 and <= 1");t=t.name}else this._keyMap[t]={weight:1};this._analyze(t,i(p,t,[]),p,s)}},s.prototype._analyze=function(t,s,n,i){var r,h,a,c,p,l,u,f,d,g,m,y,k,v,S,b=this.options,_=!1;if(void 0!==s&&null!==s){h=[];var M=0;if("string"==typeof s){if(r=s.split(b.tokenSeparator),b.verbose&&e("---------\nKey:",t),this.options.tokenize){for(v=0;v<this.tokenSearchers.length;v++){for(f=this.tokenSearchers[v],b.verbose&&e("Pattern:",f.pattern),d=[],y=!1,S=0;S<r.length;S++){g=r[S],m=f.search(g);var L={};m.isMatch?(L[g]=m.score,_=!0,y=!0,h.push(m.score)):(L[g]=1,this.options.matchAllTokens||h.push(1)),d.push(L)}y&&M++,b.verbose&&e("Token scores:",d)}for(c=h[0],l=h.length,v=1;l>v;v++)c+=h[v];c/=l,b.verbose&&e("Token score average:",c)}u=this.fullSeacher.search(s),b.verbose&&e("Full text score:",u.score),p=u.score,void 0!==c&&(p=(p+c)/2),b.verbose&&e("Score average:",p),k=this.options.tokenize&&this.options.matchAllTokens?M>=this.tokenSearchers.length:!0,b.verbose&&e("Check Matches",k),(_||u.isMatch)&&k&&(a=this.resultMap[i],a?a.output.push({key:t,score:p,matchedIndices:u.matchedIndices}):(this.resultMap[i]={item:n,output:[{key:t,score:p,matchedIndices:u.matchedIndices}]},this.results.push(this.resultMap[i])))}else if(o(s))for(v=0;v<s.length;v++)this._analyze(t,s[v],n,i)}},s.prototype._computeScore=function(){var t,s,n,o,i,r,h,a,c,p=this._keyMap,l=this.results;for(this.options.verbose&&e("\n\nComputing score:\n"),t=0;t<l.length;t++){for(n=0,o=l[t].output,i=o.length,a=1,s=0;i>s;s++)r=o[s].score,h=p?p[o[s].key].weight:1,c=r*h,1!==h?a=Math.min(a,c):(n+=c,o[s].nScore=c);1===a?l[t].score=n/i:l[t].score=a,this.options.verbose&&e(l[t])}},s.prototype._sort=function(){var t=this.options;t.shouldSort&&(t.verbose&&e("\n\nSorting...."),this.results.sort(t.sortFn))},s.prototype._format=function(){var t,s,n,o,i,r=this.options,h=r.getFn,a=[],c=this.results,p=r.include;for(r.verbose&&e("\n\nOutput:\n\n",c),o=r.id?function(t){c[t].item=h(c[t].item,r.id,[])[0]}:function(){},i=function(t){var e,s,n,o,i,r=c[t];if(p.length>0){if(e={item:r.item},-1!==p.indexOf("matches"))for(n=r.output,e.matches=[],s=0;s<n.length;s++)o=n[s],i={indices:o.matchedIndices},o.key&&(i.key=o.key),e.matches.push(i);-1!==p.indexOf("score")&&(e.score=c[t].score)}else e=r.item;return e},s=0,n=c.length;n>s;s++)o(s),t=i(s),a.push(t);return a},i.defaultOptions={location:0,distance:100,threshold:.6,maxPatternLength:32},i.prototype._calculatePatternAlphabet=function(){var t={},e=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]|=1<<this.pattern.length-e-1;return t},i.prototype._bitapScore=function(t,e){var s=t/this.patternLen,n=Math.abs(this.options.location-e);return this.options.distance?s+n/this.options.distance:n?1:s},i.prototype.search=function(t){var e,s,n,o,i,r,h,a,c,p,l,u,f,d,g,m,y,k,v,S,b,_,M=this.options;if(t=M.caseSensitive?t:t.toLowerCase(),this.pattern===t)return{isMatch:!0,score:0,matchedIndices:[[0,t.length-1]]};if(this.patternLen>M.maxPatternLength){if(y=t.match(new RegExp(this.pattern.replace(M.tokenSeparator,"|"))),k=!!y)for(S=[],e=0,b=y.length;b>e;e++)_=y[e],S.push([t.indexOf(_),_.length-1]);return{isMatch:k,score:k?.5:1,matchedIndices:S}}for(o=M.location,n=t.length,i=M.threshold,r=t.indexOf(this.pattern,o),v=[],e=0;n>e;e++)v[e]=0;for(-1!=r&&(i=Math.min(this._bitapScore(0,r),i),r=t.lastIndexOf(this.pattern,o+this.patternLen),-1!=r&&(i=Math.min(this._bitapScore(0,r),i))),r=-1,g=1,m=[],c=this.patternLen+n,e=0;e<this.patternLen;e++){for(h=0,a=c;a>h;)this._bitapScore(e,o+a)<=i?h=a:c=a,a=Math.floor((c-h)/2+h);for(c=a,p=Math.max(1,o-a+1),l=Math.min(o+a,n)+this.patternLen,u=Array(l+2),u[l+1]=(1<<e)-1,s=l;s>=p;s--)if(d=this.patternAlphabet[t.charAt(s-1)],d&&(v[s-1]=1),0===e?u[s]=(u[s+1]<<1|1)&d:u[s]=(u[s+1]<<1|1)&d|((f[s+1]|f[s])<<1|1)|f[s+1],u[s]&this.matchmask&&(g=this._bitapScore(e,s-1),i>=g)){if(i=g,r=s-1,m.push(r),!(r>o))break;p=Math.max(1,2*o-r)}if(this._bitapScore(e+1,o)>i)break;f=u}return S=this._getMatchedIndices(v),{isMatch:r>=0,score:0===g?.001:g,matchedIndices:S}},i.prototype._getMatchedIndices=function(t){for(var e,s=[],n=-1,o=-1,i=0,r=t.length;r>i;i++)e=t[i],e&&-1===n?n=i:e||-1===n||(o=i-1,s.push([n,o]),n=-1);return t[i-1]&&s.push([n,i-1]),s},"object"==typeof exports?module.exports=s:"function"==typeof define&&define.amd?define(function(){return s}):t.Fuse=s}(this);

'use strict';
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
(function () {
var protocol = location.protocol === 'https:' ? 'https' : 'http';
var resourceURL = protocol + '://w1.synapsys.us/widgets/deepdive';
var fileName = '/bar/bar.js';
var embedURL = resourceURL + fileName;
var scripts = document.getElementsByTagName("script");
for (var i = scripts.length - 1; i >= 0; i--) {
if (scripts[i].src.indexOf(fileName) != -1) {
var currentScript = scripts[i];
}
}
if (window.location.hostname.indexOf("homerunzone") != -1 || window.location.hostname.indexOf("investkit") != -1 || window.location.hostname.indexOf("touchdownzone") != -1 || window.location.hostname.indexOf("hoopszone") != -1 || window.location.hostname.indexOf("myhousekit") != -1) {
var domain = window.location.pathname.split("/")[1].match(/[^\.]*\.[^.]*$/)[0];
} else {
var domain = window.location.hostname.match(/[^\.]*\.[^.]*$/)[0];
}
var params = {
baseballSubdomain: null,
basketballSubdomain: null,
footballSubdomain: null,
brandHex: null,
sportOrder: null
};
var queryString = currentScript.src.split('?')[1];
if (typeof queryString === 'undefined') {
} else {
var queryParams = queryString.split('&');
queryParams.forEach(function (item) {
var pair = item.split('=');
switch (pair[0]) {
case 'brandHex':
params.brandHex = '#' + decodeURIComponent(pair[1]);
break;
case 'sportOrder':
params.sportOrder = JSON.parse(decodeURIComponent(pair[1]));
break;
}
});
}
try {
var xmlHttp = new XMLHttpRequest();
var hostname = location.hostname.match(/[^\.]*\.[^.]*$/)[0];
xmlHttp.open("GET", protocol + "://w1.synapsys.us/widgets/deepdive/bar/domain_api.php?dom=" + domain, false);
xmlHttp.send();
domVars = JSON.parse(xmlHttp.responseText);
if (domVars.mlb) {
params.baseballSubdomain = domVars['mlb'];
params.basketballSubdomain = domVars['nba'];
params.footballSubdomain = domVars['nfl'];
}
} catch (err) {
console.log("Domain API error: " + err);
}
var apiConfig = {
fuse: {
hasLoaded: false,
isLoading: false,
url: function url() {
return resourceURL + '/lib/search_teams_middlelayer.php';
}
},
searchTeams: {
hasLoaded: false,
isLoading: false,
url: function url() {
return resourceURL + '/lib/search_teams_middlelayer.php';
}
},
boxscoresNBA: {
hasLoaded: false,
isLoading: false,
url: function url(todayDate) {
return protocol + '://prod-sports-api.synapsys.us/NBAHoops/call_controller.php?scope=nba&action=trimmed_box_scores&option=trimmed_box_scores&count=10&date=' + todayDate;
}
},
boxscoresNCAAM: {
hasLoaded: false,
isLoading: false,
url: function url(todayDate) {
return protocol + '://prod-sports-api.synapsys.us/NBAHoops/call_controller.php?scope=ncaa&action=trimmed_box_scores&option=trimmed_box_scores&count=10&date=' + todayDate;
}
},
boxscoresMLB: {
hasLoaded: false,
isLoading: false,
url: function url(todayDate) {
return protocol + '://prod-homerunloyal-api.synapsys.us/league/trimmedBoxScores/' + todayDate + "/10";
}
},
boxscoresNFL: {
hasLoaded: false,
isLoading: false,
url: function url(todayDate) {
return protocol + '://prod-touchdownloyal-api.synapsys.us/trimmedBoxScores/league/nfl/' + todayDate + "/10/1";
}
},
boxscoresNCAAF: {
hasLoaded: false,
isLoading: false,
url: function url(todayDate) {
return protocol + '://prod-touchdownloyal-api.synapsys.us/trimmedBoxScores/league/fbs/' + todayDate + "/10/1";
}
},
teamsNCAAF: {
hasLoaded: false,
isLoading: false,
url: function url(stateAbbrev) {
return protocol + '://prod-touchdownloyal-api.synapsys.us/landingPage/fbs/' + stateAbbrev;
}
},
teamsNCAAM: {
hasLoaded: false,
isLoading: false,
url: function url(fullState) {
return protocol + '://prod-sports-api.synapsys.us/NBAHoops/call_controller.php?scope=ncaa&action=homepage&option=' + fullState;
},
res: null,
sucess: null
},
tickerMLB: {
hasLoaded: false,
isLoading: false,
url: function url(stateAbbrev) {
return protocol + '://prod-homerunloyal-ai.synapsys.us/recent-games/' + stateAbbrev;
}
},
getRemoteAddress: {
hasLoaded: false,
isLoading: false,
url: function url() {
return protocol + '://w1.synapsys.us/listhuv/?action=get_remote_addr2';
},
res: null,
success: null
}
};
var easternTime = function () {
var utcYear = new Date().getUTCFullYear();
var daylightStart, daylightEnd, offset, abbrev;
var currentUTC = new Date().getTime();
daylightStart = new Date(utcYear, 2, 7, 0, 0, 0, 0);
daylightStart.setDate(7 + (7 - daylightStart.getDay()));
daylightStart.setUTCHours(7);
daylightStart = daylightStart.getTime();
daylightEnd = new Date(utcYear, 10, 1, 0, 0, 0, 0);
while (daylightEnd.getDay() !== 0) {
daylightEnd.setDate(daylightEnd.getDate() + 1);
}
daylightEnd.setUTCHours(6);
daylightEnd = daylightEnd.getTime();
if (currentUTC <= daylightStart || currentUTC > daylightEnd) {
offset = -5;
abbrev = 'ET';
} else {
offset = -4;
abbrev = 'ET';
}
return {
offset: offset,
tzAbbrev: abbrev
};
}();
var dateObject = function (offset, undefined) {
var today = new Date(new Date().getTime() + offset * 3600 * 1000);
var month = today.getUTCMonth() + 1;
var date = today.getUTCDate();
var todayObject = {
today: today,
year: today.getUTCFullYear(),
month: month.toString().length === 1 ? '0' + month : month,
date: date.toString().length === 1 ? '0' + date : date
};
todayObject.dateInput = todayObject.year + '-' + todayObject.month + '-' + todayObject.date;
return todayObject;
}(easternTime.offset);
var Bluebird;
var boxscoresInitialized = false;
var mobileMenuButton;
var mobileDropdown;
var mobileSearchButton;
var mobileSearchBar;
var smallDesktopSearchButton;
var smallDesktopSearchBar;
var desktopBoxscoresButton;
var desktopBoxscoresDropdown;
var ncaamDropdownElements = {
nav: document.createElement('ul'),
links: document.createElement('section')
};
var ncaafDropdownElements = {
nav: document.createElement('ul'),
links: document.createElement('section')
};
var defaultState = 'ny';
var domain = window.location.hostname;
var path = window.location.pathname;
var parts = domain.split('.');
domain = parts.slice(-2).join('.');
var houseSite = false;
if (params.footballSubdomain.indexOf("touchdownloyal") != -1 || params.footballSubdomain.indexOf("football") != -1) {
houseSite = true;
}
var touchdownDomain = protocol + '://' + params.footballSubdomain;
var hoopsDomain = protocol + '://' + params.basketballSubdomain;
var homerunDomain = protocol + '://' + params.baseballSubdomain;
var footballLeagueYear = 2016;
function bootstrapApp() {
var res="\n<section class=\"ddb-menu\">\n  <!-- Mobile Layout -->\n  <section class=\"ddb-mobile-layout\">\n    <!-- <button id=\"ddb-mobile-menu\" class=\"ddb-mobile-menu ddb-parleft ddb-blue ddb-left\"> -->\n    <button id=\"ddb-mobile-menu\" class=\"ddb-mobile-menu ddb-left ddb-brand-background\">\n        <div class=\"ddb-mobile-parbutton\">\n            <i class=\"ddb-icon ddb-icon-box-scores\"></i> SPORTS MENU\n        </div>\n    </button>\n\n    <!-- <button id=\"ddb-mobile-search\" class=\"ddb-mobile-menu ddb-right ddb-parright\"> -->\n    <button id=\"ddb-mobile-search\" class=\"ddb-mobile-menu ddb-right\">\n        <div class=\"ddb-mobile-parbutton\">\n            <i class=\"ddb-icon\"></i>\n        </div>\n    </button>\n\n    <div id=\"ddb-mobile-dropdown\" class=\"ddb-mobile-dropdown ddb-dropdown\">\n        <!-- Boxscores -->\n        <div class=\"ddb-mobile-dropdown-boxscores\">\n          <!-- Left Button -->\n          <button id=\"ddb-mobile-boxscores-left\" class=\"ddb-boxscores-button ddb-left ddb-brand-boxscores-button\">\n            <i class=\"ddb-icon ddb-icon-angle-left\"></i>\n          </button>\n          <!-- Boxscores Frame -->\n          <div id=\"ddb-mobile-boxscores-frame\" class=\"ddb-boxscores-frame\">\n            <ul id=\"ddb-mobile-boxscores\" class=\"ddb-boxscores-content\">\n              <!-- Category -->\n              <li id=\"ddb-mobile-boxscores-mlb\">\n                <div class=\"ddb-boxscores-content-category\">\n                  <span class=\"ddb-title\">MLB</span>\n                  <!-- <br>\n                  <a class=\"ddb-link ddb-mlb-nav-box-scores\">View All</a> -->\n                </div>\n              </li>\n              <li id=\"ddb-mobile-boxscores-nfl\">\n                <div class=\"ddb-boxscores-content-category\">\n                  <span class=\"ddb-title\">NFL</span>\n                  <!-- <br>\n                  <a class=\"ddb-link ddb-nfl-nav-box-scores\">View All</a> -->\n                </div>\n              </li>\n              <li id=\"ddb-mobile-boxscores-ncaaf\">\n                <div class=\"ddb-boxscores-content-category\">\n                  <span class=\"ddb-title\">NCAAF</span>\n                  <!-- <br>\n                  <a class=\"ddb-link ddb-nfl-nav-box-scores\">View All</a> -->\n                </div>\n              </li>\n            </ul>\n          </div>\n          <!-- Right Button -->\n          <button id=\"ddb-mobile-boxscores-right\" class=\"ddb-boxscores-button ddb-right ddb-blue ddb-brand-boxscores-button\">\n            <i class=\"ddb-icon ddb-icon-angle-right\"></i>\n          </button>\n        </div>\n        <!-- End Boxscores -->\n\n        <!-- Mobile Options -->\n        <ul class=\"ddb-mobile-dropdown-list\">\n          <!-- MLB -->\n          <li class=\"ddb-mobile-dropdown-item\">\n            <div class=\"ddb-mobile-dropdown-tier1\">\n              <i class=\"ddb-icon ddb-icon-baseball ddb-brand-text\"></i>\n              MLB\n              <i class=\"ddb-icon ddb-toggle\"></i>\n            </div>\n            <ul class=\"ddb-mobile-dropdown-tier2\">\n              <!-- Sub Items -->\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-mlb-nav-news\">\n                  <i class=\"ddb-icon ddb-icon-news ddb-brand-text\"></i>\n                  News\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-mlb-nav-standings\">\n                  <i class=\"ddb-icon ddb-icon-trophy ddb-brand-text\"></i>\n                  Standings\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-mlb-nav-schedule\">\n                  <i class=\"ddb-icon ddb-icon-calendar ddb-brand-text\"></i>\n                  Schedule\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-mlb-nav-top-lists\">\n                  <i class=\"ddb-icon ddb-icon-list ddb-brand-text\"></i>\n                  Top Lists\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-mlb-nav-teams\">\n                  <i class=\"ddb-icon ddb-icon-team ddb-brand-text\"></i>\n                  MLB Teams\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-mlb-nav-profile\">\n                  <i class=\"ddb-icon ddb-icon-profile ddb-brand-text\"></i>\n                  MLB Profile\n                </a>\n              </li>\n            </ul>\n          </li>\n          <!-- NBA -->\n          <li class=\"ddb-mobile-dropdown-item\">\n            <div class=\"ddb-mobile-dropdown-tier1\">\n              <i class=\"ddb-icon ddb-icon-basketball ddb-brand-text\"></i>\n              NBA\n              <i class=\"ddb-icon ddb-toggle\"></i>\n            </div>\n            <ul class=\"ddb-mobile-dropdown-tier2\">\n              <!-- Sub Items -->\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-nba-nav-most-wins\">\n                  <i class=\"ddb-icon ddb-icon-trophy ddb-brand-text\"></i>\n                  Most Wins\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-nba-nav-most-turnovers\">\n                  <i class=\"ddb-icon ddb-icon-box-scores ddb-brand-text\"></i>\n                  Most Turnovers\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-nba-nav-most-rebounds\">\n                  <i class=\"ddb-icon ddb-icon-dribbble ddb-brand-text\"></i>\n                  Most Rebounds\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-nba-nav-most-steals\">\n                  <i class=\"ddb-icon ddb-icon-magic ddb-brand-text\"></i>\n                  Most Steals\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-nba-nav-most-blocks\">\n                  <i class=\"ddb-icon ddb-icon-thumbs-o-down ddb-brand-text\"></i>\n                  Most Blocks\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-nba-nav-most-assists\">\n                  <i class=\"ddb-icon ddb-icon-life-ring ddb-brand-text\"></i>\n                  Most Assists\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-nba-nav-teams\">\n                  <i class=\"ddb-icon ddb-icon-team ddb-brand-text\"></i>\n                  NBA Teams\n                </a>\n              </li>\n            </ul>\n          </li>\n          <!-- NCAA M -->\n          <li class=\"ddb-mobile-dropdown-item\">\n            <div class=\"ddb-mobile-dropdown-tier1\">\n              <i class=\"ddb-icon ddb-icon-basketball ddb-brand-text\"></i>\n              NCAA M\n              <i class=\"ddb-icon ddb-toggle\"></i>\n            </div>\n            <ul class=\"ddb-mobile-dropdown-tier2\">\n              <!-- Sub Items -->\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-ncaam-nav-most-wins\">\n                  <i class=\"ddb-icon ddb-icon-trophy ddb-brand-text\"></i>\n                  Most Wins\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-ncaam-nav-most-turnovers\">\n                  <i class=\"ddb-icon ddb-icon-box-scores ddb-brand-text\"></i>\n                  Most Turnovers\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-ncaam-nav-most-rebounds\">\n                  <i class=\"ddb-icon ddb-icon-dribbble ddb-brand-text\"></i>\n                  Most Rebounds\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-ncaam-nav-most-steals\">\n                  <i class=\"ddb-icon ddb-icon-magic ddb-brand-text\"></i>\n                  Most Steals\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-ncaam-nav-most-blocks\">\n                  <i class=\"ddb-icon ddb-icon-thumbs-o-down ddb-brand-text\"></i>\n                  Most Blocks\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-ncaam-nav-most-assists\">\n                  <i class=\"ddb-icon ddb-icon-life-ring ddb-brand-text\"></i>\n                  Most Assists\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-ncaam-nav-teams\">\n                  <i class=\"ddb-icon ddb-icon-team ddb-brand-text\"></i>\n                  NCAA M Teams\n                </a>\n              </li>\n            </ul>\n          </li>\n          <!-- NFL -->\n          <li class=\"ddb-mobile-dropdown-item\">\n            <div class=\"ddb-mobile-dropdown-tier1\">\n              <i class=\"ddb-icon ddb-icon-football ddb-brand-text\"></i>\n              NFL\n              <i class=\"ddb-icon ddb-toggle\"></i>\n            </div>\n            <ul class=\"ddb-mobile-dropdown-tier2\">\n              <!-- Sub Items -->\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-nfl-nav-news\">\n                  <i class=\"ddb-icon ddb-icon-news ddb-brand-text\"></i>\n                  News\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-nfl-nav-standings\">\n                  <i class=\"ddb-icon ddb-icon-trophy ddb-brand-text\"></i>\n                  Standings\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-nfl-nav-schedule\">\n                  <i class=\"ddb-icon ddb-icon-calendar ddb-brand-text\"></i>\n                  Schedule\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-nfl-nav-top-lists\">\n                  <i class=\"ddb-icon ddb-icon-list ddb-brand-text\"></i>\n                  Top Lists\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-nfl-nav-teams\">\n                  <i class=\"ddb-icon ddb-icon-team ddb-brand-text\"></i>\n                  NFL Teams\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-nfl-nav-profile\">\n                  <i class=\"ddb-icon ddb-icon-profile ddb-brand-text\"></i>\n                  NFL Profile\n                </a>\n              </li>\n            </ul>\n          </li>\n          <!-- NCAA F -->\n          <li class=\"ddb-mobile-dropdown-item\">\n            <div class=\"ddb-mobile-dropdown-tier1\">\n              <i class=\"ddb-icon ddb-icon-football ddb-brand-text\"></i>\n              NCAA F\n              <i class=\"ddb-icon ddb-toggle\"></i>\n            </div>\n            <ul class=\"ddb-mobile-dropdown-tier2\">\n              <!-- Sub Items -->\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-ncaaf-nav-news\">\n                  <i class=\"ddb-icon ddb-icon-news ddb-brand-text\"></i>\n                  News\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-ncaaf-nav-standings\">\n                  <i class=\"ddb-icon ddb-icon-trophy ddb-brand-text\"></i>\n                  Standings\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-ncaaf-nav-schedule\">\n                  <i class=\"ddb-icon ddb-icon-calendar ddb-brand-text\"></i>\n                  Schedule\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-ncaaf-nav-top-lists\">\n                  <i class=\"ddb-icon ddb-icon-list ddb-brand-text\"></i>\n                  Top Lists\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-ncaaf-nav-teams\">\n                  <i class=\"ddb-icon ddb-icon-team ddb-brand-text\"></i>\n                  NCAA F Teams\n                </a>\n              </li>\n              <li class=\"ddb-mobile-dropdown-tier2-item\">\n                <a target=\"_blank\" class=\"ddb-ncaaf-nav-profile\">\n                  <i class=\"ddb-icon ddb-icon-profile ddb-brand-text\"></i>\n                  NCAA F Profile\n                </a>\n              </li>\n            </ul>\n          </li>\n\n        </ul>\n        <!-- End Mobile Options -->\n    </div>\n\n    <div id=\"ddb-mobile-search-bar\" class=\"ddb-mobile-dropdown ddb-dropdown\">\n      <div class=\"ddb-mobile-dropdown-search\">\n        <input id=\"ddb-search-mobile\" placeholder=\"Search any ncaa, nfl, mlb, nba team..\">\n        <i class=\"ddb-icon ddb-icon-search ddb-brand-text\"></i>\n      </div>\n      <ul id=\"ddb-search-mobile-dropdown\" class=\"ddb-search-dropdown\">\n\n      </ul>\n    </div>\n  </section>\n  <!-- End Mobile Layout -->\n\n  <!-- Tablet/Desktop Layout -->\n  <ul class=\"ddb-menu-nav\">\n    <!-- Box Scores -->\n    <li id=\"ddb-dropdown-boxscores\">\n      <!-- <div id=\"ddb-dropdown-boxscores-button\" class=\"ddb-blue ddb-parleft\">\n        <i class=\"ddb-icon ddb-icon-box-scores\"></i>\n        Scoreboard\n      </div> -->\n      <div id=\"ddb-dropdown-boxscores-button\" class=\"ddb-blue ddb-brand-background\">\n          <div class=\"ddb-parbutton\">\n              <i class=\"ddb-icon ddb-icon-box-scores\"></i>\n              Scoreboard\n          </div>\n      </div>\n      <!-- Hover Dropdown -->\n      <div id=\"ddb-boxscores-dropdown\" class=\"ddb-menu-dropdown ddb-dropdown\">\n        <div class=\"ddb-menu-dropdown-container\">\n          <div id=\"ddb-boxscores-events-container\" class=\"ddb-menu-dropdown-events\">\n            <button id=\"ddb-boxscores-events-button\" class=\"ddb-menu-dropdown-events-button ddb-brand-boxscores-filter\">\n              Sports\n              <i class=\"ddb-icon ddb-icon-angle-right\"></i>\n            </button>\n            <div class=\"ddb-menu-dropdown-events-options\">\n              <div class=\"ddb-menu-dropdown-events-options-title\">\n                Select Which Scoreboard to View\n              </div>\n              <ul id=\"ddb-boxscores-options\" class=\"ddb-menu-dropdown-events-options-list\">\n                <li id=\"ddb-boxscores-options-all\" class=\"ddb-active ddb-brand-boxscores-option\">\n                  ALL\n                </li>\n                <li id=\"ddb-boxscores-options-mlb\" class=\"ddb-brand-boxscores-option\">\n                  MLB\n                </li>\n                <li id=\"ddb-boxscores-options-nfl\" class=\"ddb-brand-boxscores-option\">\n                  NFL\n                </li>\n                <li id=\"ddb-boxscores-options-ncaaf\" class=\"ddb-brand-boxscores-option\">\n                  NCAAF\n                </li>\n              </ul>\n            </div>\n          </div>\n          <div class=\"ddb-menu-dropdown-boxscores\">\n            <!-- Left Button -->\n            <button id=\"ddb-desktop-boxscores-left\" class=\"ddb-boxscores-button ddb-left ddb-brand-boxscores-button\">\n              <i class=\"ddb-icon ddb-icon-angle-left\"></i>\n            </button>\n            <!-- Boxscores Frame -->\n            <div id=\"ddb-desktop-boxscores-frame\" class=\"ddb-boxscores-frame\">\n              <ul id=\"ddb-desktop-boxscores\" class=\"ddb-boxscores-content\">\n                <!-- Category -->\n                <!-- dynamically ordered box scores go here -->\n              </ul>\n            </div>\n            <!-- Right Button -->\n            <button id=\"ddb-desktop-boxscores-right\" class=\"ddb-boxscores-button ddb-right ddb-blue ddb-brand-boxscores-button\">\n              <i class=\"ddb-icon ddb-icon-angle-right\"></i>\n            </button>\n          </div>\n        </div>\n      </div>\n    </li>\n    <!-- dynamically ordered menu list here -->\n  </ul>\n  <!-- Dynamic Dropdown -->\n  <div class=\"ddb-menu-nav-dynamic ddb-dynamic-dropdown\">\n    <div class=\"ddb-menu-dropdown-container\">\n      <!-- Nav -->\n      <section id=\"ddb-dynamic-nav\" class=\"ddb-menu-dropdown-nav\"></section>\n      <!-- Content -->\n      <div class=\"ddb-menu-dropdown-content\">\n        <section id=\"ddb-dynamic-links\" class=\"ddb-menu-dropdown-links\"></section>\n        <!-- Ad Space -->\n        <!-- <div id=\"ddb-ad\" class=\"ddb-menu-dropdown-ad\">\n\n        </div> -->\n      </div>\n    </div>\n  </div>\n\n  <div class=\"ddb-menu-options\">\n    <!-- Medium Nav Search -->\n    <button id=\"ddb-small-desktop-search\" class=\"ddb-menu-search\">\n      <i class=\"ddb-icon ddb-icon-search\"></i>\n    </button>\n    <!-- Sports Ticker -->\n    <!-- <div class=\"ddb-menu-ticker ddb-parleft\">\n      <div class=\"ddb-menu-ticker-title\">\n        SPORTS TICKER\n      </div>\n      <div class=\"ddb-menu-ticker-container\">\n        <span id=\"ddb-ticker-content\" class=\"ddb-menu-ticker-content\">\n        </span>\n      </div>\n    </div> -->\n    <!-- Large Nav Search -->\n    <div class=\"ddb-menu-search-large\">\n        <div class=\"ddb-menu-search-large-content\">\n            <input id=\"ddb-search-desktop\" placeholder=\"Search any ncaa, nfl, mlb, nba team..\">\n            <ul id=\"ddb-search-desktop-dropdown\" class=\"ddb-search-dropdown\">\n            </ul>\n            <i class=\"ddb-icon ddb-icon-search ddb-brand-text\"></i>\n        </div>\n    </div>\n  </div>\n\n  <div id=\"ddb-small-desktop-search-bar\" class=\"ddb-menu-search-dropdown ddb-dropdown\">\n    <div class=\"ddb-mobile-dropdown-search\">\n      <input id=\"ddb-small-desktop-search-input\" placeholder=\"Search any ncaa, nfl, mlb, nba team..\">\n      <i class=\"ddb-icon ddb-icon-search ddb-brand-text\"></i>\n    </div>\n    <ul id=\"ddb-small-desktop-search-dropdown\" class=\"ddb-search-dropdown\">\n\n    </ul>\n  </div>\n  <!-- End Tablet/Desktop Layout -->\n</section>\n";
var template = document.createElement('section');
template.className = 'ddb-container';
template.innerHTML = res;
var parentNode = currentScript.parentNode;
parentNode.insertBefore(template, currentScript);
bootstrapMenuList(params.sportOrder);
bootstrapDynamicBoxscores(params.sportOrder);
loadScriptDependencies();
getUserLocation();
bootstrapMobileSearch();
bootstrapSmallDesktopSearch();
bootstrapStaticCollegeFootball();
bootstrapStaticCollegeBasketball();
bootstrapDynamicDropdown();
}
var bootstrapMenuList = function bootstrapMenuList(ordering) {
var menu = document.getElementsByClassName('ddb-menu-nav')[0];
var finalOrder = "";
var dropdowns = {
mlb: '\n      <!-- MLB -->\n      <li id="ddb-dropdown-mlb" class="ddb-menu-nav-item ddb-dynamic-item">\n        MLB\n      </li>',
nba: '\n      <!-- NBA -->\n      <li id="ddb-dropdown-nba" class="ddb-menu-nav-item ddb-dynamic-item">\n        NBA\n      </li>',
ncaam: '\n      <!-- NCAA -->\n      <li id="ddb-dropdown-ncaam" class="ddb-menu-nav-item ddb-dynamic-item">\n        NCAA M\n      </li>',
nfl: '\n      <!-- NFL -->\n      <li id="ddb-dropdown-nfl" class="ddb-menu-nav-item ddb-dynamic-item">\n        NFL\n      </li>',
ncaaf: '\n      <!-- NCAA F -->\n      <li id="ddb-dropdown-ncaaf" class="ddb-menu-nav-item ddb-dynamic-item">\n        NCAA F\n      </li>'
};
if (ordering) {
var left = 132;
for (i = 0; i < ordering.length; i++) {
finalOrder += dropdowns[ordering[i]];
left = left + 68 + (ordering[i].length - 3) * 8;
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.ddb-menu-nav-dynamic#ddb-dynamic-' + ordering[i] + ':after {left: ' + left + 'px;}';
document.getElementsByTagName('head')[0].appendChild(style);
if (ordering[i].length - 3 > 0) {
left = left + (ordering[i].length - 3) * 8;
}
}
} else {
var left = 132;
for (var item in dropdowns) {
finalOrder += dropdowns[item];
left = left + 68 + (item.length - 3) * 8;
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.ddb-menu-nav-dynamic#ddb-dynamic-' + item + ':after {left: ' + left + 'px;}';
document.getElementsByTagName('head')[0].appendChild(style);
if (item.length - 3 > 0) {
left = left + (item.length - 3) * 8;
}
}
}
menu.innerHTML += finalOrder;
};
var bootstrapDynamicBoxscores = function bootstrapDynamicBoxscores(ordering) {
var boxscores = document.getElementById('ddb-desktop-boxscores');
var finalOrder = "";
var blocks = {
mlb: '\n      <li id="ddb-desktop-boxscores-mlb">\n        <div class="ddb-boxscores-content-category">\n          <span class="ddb-title">MLB</span>\n        </div>\n      </li>',
nba: '\n      <li id="ddb-desktop-boxscores-nba">\n        <div class="ddb-boxscores-content-category">\n          <span class="ddb-title">NBA</span>\n        </div>\n      </li>\n      ',
ncaam: '\n      <li id="ddb-desktop-boxscores-ncaam">\n        <div class="ddb-boxscores-content-category">\n          <span class="ddb-title">NCAAM</span>\n        </div>\n      </li>\n      ',
nfl: '\n      <li id="ddb-desktop-boxscores-nfl">\n        <div class="ddb-boxscores-content-category">\n          <span class="ddb-title">NFL</span>\n        </div>\n      </li>',
ncaaf: '\n      <li id="ddb-desktop-boxscores-ncaaf">\n        <div class="ddb-boxscores-content-category">\n          <span class="ddb-title">NCAA F</span>\n        </div>\n      </li>'
};
if (ordering) {
for (i = 0; i < ordering.length; i++) {
finalOrder += blocks[ordering[i]];
}
} else {
for (var item in blocks) {
finalOrder += blocks[item];
}
}
boxscores.innerHTML += finalOrder;
};
var bootstrapMobileMenu = function bootstrapMobileMenu() {
var tier1 = document.getElementsByClassName('ddb-mobile-dropdown-tier1');
for (var i = 0, length = tier1.length; i < length; i++) {
var node = tier1[i];
node.addEventListener('click', function (evt) {
var node = this;
if (hasClass(node, 'ddb-tier1-show')) {
closeMobileSubMenus();
} else {
closeMobileSubMenus();
addClass(node, 'ddb-tier1-show');
}
var node = evt.target;
addClass(node, 'ddb-show');
});
}
mobileMenuButton = document.getElementById('ddb-mobile-menu');
mobileDropdown = document.getElementById('ddb-mobile-dropdown');
mobileMenuButton.addEventListener('click', function (evt) {
if (hasClass(mobileDropdown, 'ddb-show')) {
removeClass(mobileMenuButton, 'ddb-mobile-menu-open');
closeMobileSubMenus();
closeDropdowns();
} else {
if (boxscoresInitialized === false) {
bootstrapBoxscores();
boxscoresInitialized = true;
}
closeDropdowns();
addClass(mobileMenuButton, 'ddb-mobile-menu-open');
addClass(mobileDropdown, 'ddb-show');
setTimeout(function () {
window.addEventListener('click', windowEventMobile);
}, 1);
}
});
};
var bootstrapMobileSearch = function bootstrapMobileSearch() {
mobileSearchButton = document.getElementById('ddb-mobile-search');
mobileSearchBar = document.getElementById('ddb-mobile-search-bar');
mobileSearchButton.addEventListener('click', function (evt) {
if (hasClass(mobileSearchBar, 'ddb-show')) {
removeClass(mobileSearchButton, 'ddb-mobile-search-open');
closeDropdowns();
} else {
closeDropdowns();
addClass(mobileSearchButton, 'ddb-mobile-search-open');
addClass(mobileSearchBar, 'ddb-show');
setTimeout(function () {
window.addEventListener('click', windowEventMobileSearch);
}, 1);
}
});
};
var bootstrapSmallDesktopSearch = function bootstrapSmallDesktopSearch() {
smallDesktopSearchButton = document.getElementById('ddb-small-desktop-search');
smallDesktopSearchBar = document.getElementById('ddb-small-desktop-search-bar');
smallDesktopSearchButton.addEventListener('click', function (evt) {
if (hasClass(smallDesktopSearchBar, 'ddb-show')) {
removeClass(smallDesktopSearchButton, 'ddb-small-desktop-search-open');
closeDropdowns();
} else {
closeDropdowns();
addClass(smallDesktopSearchButton, 'ddb-small-desktop-search-open');
addClass(smallDesktopSearchBar, 'ddb-show');
setTimeout(function () {
window.addEventListener('click', windowEventSmallDesktopSearch);
}, 1);
}
});
var navItems = document.getElementsByClassName('ddb-menu-nav-item');
var hoverEvent = function hoverEvent(evt) {
if (hasClass(smallDesktopSearchButton, 'ddb-small-desktop-search-open')) {
removeClass(smallDesktopSearchButton, 'ddb-small-desktop-search-open');
removeClass(smallDesktopSearchBar, 'ddb-show');
}
};
[].forEach.call(navItems, function (item) {
item.addEventListener('mouseenter', hoverEvent);
});
};
var bootstrapDesktopBoxscores = function bootstrapDesktopBoxscores() {
desktopBoxscoresButton = document.getElementById('ddb-dropdown-boxscores-button');
desktopBoxscoresDropdown = document.getElementById('ddb-boxscores-dropdown');
desktopBoxscoresButton.addEventListener('click', function (evt) {
if (hasClass(desktopBoxscoresDropdown, 'ddb-show')) {
removeClass(desktopBoxscoresButton, 'ddb-desktop-boxscores-open');
closeDropdowns();
} else {
if (boxscoresInitialized === false) {
bootstrapBoxscores();
boxscoresInitialized = true;
}
closeDropdowns();
addClass(desktopBoxscoresButton, 'ddb-desktop-boxscores-open');
addClass(desktopBoxscoresDropdown, 'ddb-show');
setTimeout(function () {
window.addEventListener('click', windowEventDesktopBoxscores);
}, 1);
}
});
var navItems = document.getElementsByClassName('ddb-menu-nav-item');
var hoverEvent = function hoverEvent(evt) {
if (hasClass(desktopBoxscoresButton, 'ddb-desktop-boxscores-open')) {
removeClass(desktopBoxscoresButton, 'ddb-desktop-boxscores-open');
removeClass(desktopBoxscoresDropdown, 'ddb-show');
}
};
[].forEach.call(navItems, function (item) {
item.addEventListener('mouseenter', hoverEvent);
});
};
var bootstrapStaticCollegeBasketball = function bootstrapStaticCollegeBasketball() {
var navMostWins = document.getElementsByClassName('ddb-ncaam-nav-most-wins'),
navMostTurnovers = document.getElementsByClassName('ddb-ncaam-nav-most-turnovers'),
navMostRebounds = document.getElementsByClassName('ddb-ncaam-nav-most-rebounds'),
navMostSteals = document.getElementsByClassName('ddb-ncaam-nav-most-steals'),
navMostBlocks = document.getElementsByClassName('ddb-ncaam-nav-most-blocks'),
navMostAssists = document.getElementsByClassName('ddb-ncaam-nav-most-assists'),
navTeams = document.getElementsByClassName('ddb-ncaam-nav-teams');
[].forEach.call(navMostWins, function (item) {
if (houseSite == true) {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-wins/29/listview/1';
} else {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-wins/list/29/1';
}
});
[].forEach.call(navMostTurnovers, function (item) {
if (houseSite == true) {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-turnovers/40/listview/1';
} else {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-turnovers/list/40/1';
}
});
[].forEach.call(navMostRebounds, function (item) {
if (houseSite == true) {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-rebounds/39/listview/1';
} else {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-rebounds/list/39/1';
}
});
[].forEach.call(navMostSteals, function (item) {
if (houseSite == true) {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-steals/43/listview/1';
} else {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-steals/list/43/1';
}
});
[].forEach.call(navMostBlocks, function (item) {
if (houseSite == true) {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-blocks-per-game/55/listview/1';
} else {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-blocks-per-game/list/55/1';
}
});
[].forEach.call(navMostAssists, function (item) {
if (houseSite == true) {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-assists-per-game/51/listview/1';
} else {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-assists-per-game/list/51/1';
}
});
[].forEach.call(navTeams, function (item) {
item.href = hoopsDomain + '/NCAA';
});
};
var bootstrapDynamicCollegeBasketball = function bootstrapDynamicCollegeBasketball(state, userLocationFound) {
var navMostWins = document.getElementsByClassName('ddb-ncaam-nav-most-wins'),
navMostTurnovers = document.getElementsByClassName('ddb-ncaam-nav-most-turnovers'),
navMostRebounds = document.getElementsByClassName('ddb-ncaam-nav-most-rebounds'),
navMostSteals = document.getElementsByClassName('ddb-ncaam-nav-most-steals'),
navMostBlocks = document.getElementsByClassName('ddb-ncaam-nav-most-blocks'),
navMostAssists = document.getElementsByClassName('ddb-ncaam-nav-most-assists'),
navTeams = document.getElementsByClassName('ddb-ncaam-nav-teams');
[].forEach.call(navMostWins, function (item) {
if (houseSite == true) {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-wins/29/listview/1';
} else {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-wins/list/29/1';
}
});
[].forEach.call(navMostTurnovers, function (item) {
if (houseSite == true) {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-turnovers/40/listview/1';
} else {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-turnovers/list/40/1';
}
});
[].forEach.call(navMostRebounds, function (item) {
if (houseSite == true) {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-rebounds/39/listview/1';
} else {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-rebounds/list/39/1';
}
});
[].forEach.call(navMostSteals, function (item) {
if (houseSite == true) {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-steals/43/listview/1';
} else {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-steals/list/43/1';
}
});
[].forEach.call(navMostBlocks, function (item) {
if (houseSite == true) {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-blocks-per-game/55/listview/1';
} else {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-blocks-per-game/list/55/1';
}
});
[].forEach.call(navMostAssists, function (item) {
if (houseSite == true) {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-assists-per-game/51/listview/1';
} else {
item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-assists-per-game/list/51/1';
}
});
[].forEach.call(navTeams, function (item) {
item.href = hoopsDomain + '/NCAA';
});
var fullState = stateAbbrevToFull(state);
var fullStateEncode = encodeURIComponent(fullState);
var ncaamLinks = '\n      <h1 id="ncaam-title" class="ddb-menu-dropdown-links-title">\n        NCAA Basketball Conferences ' + (userLocationFound ? 'in your area' : '') + '\n      </h1>\n      <h3 class="ddb-menu-dropdown-links-subtitle">\n        showing NCAA Basketball conferences located in <i class="ddb-icon-map-marker ddb-brand-text"></i> <span id="ncaam-state-map-marker" class="ddb-bold">' + fullState + '</span>\n      </h3>\n    ';
var apiString = apiConfig.teamsNCAAM.url(fullStateEncode);
apiConfig.teamsNCAAM.isLoading = true;
var xhttp = createRequestObject();
xhttp.onreadystatechange = function () {
if (xhttp.readyState === 4 && xhttp.status === 200) {
var res = JSON.parse(xhttp.responseText);
var processedData = processCollegeBasketballData(res.ncaa_homepage);
processedData.forEach(function (item) {
ncaamLinks += item;
});
ncaamLinks += '\n          <a target="_blank" href="' + hoopsDomain + '/NCAA" class="ddb-menu-dropdown-all ddb-brand-all-conferences">\n            SEE ALL CONFERENCES\n          </a>\n        ';
ncaamDropdownElements.links.innerHTML = ncaamLinks;
apiConfig.teamsNCAAM.res = processedData;
apiConfig.teamsNCAAM.isLoading = false;
apiConfig.teamsNCAAM.hasLoaded = true;
apiConfig.teamsNCAAM.success = true;
var navHTML = '\n          <li class="ddb-brand-menu-hover">\n            <a target="_blank" href="' + navMostWins[0].href + '">\n              <i class="ddb-icon ddb-icon-trophy ddb-brand-text"></i>\n              Most Wins\n            </a>\n          </li>\n          <li class="ddb-brand-menu-hover">\n            <a target="_blank" href="' + navMostTurnovers[0].href + '">\n              <i class="ddb-icon ddb-icon-box-scores ddb-brand-text"></i>\n              Most Turnovers\n            </a>\n          </li>\n          <li class="ddb-brand-menu-hover">\n            <a target="_blank" href="' + navMostRebounds[0].href + '">\n              <i class="ddb-icon ddb-icon-dribbble ddb-brand-text"></i>\n              Most Rebounds\n            </a>\n          </li>\n          <li class="ddb-brand-menu-hover">\n            <a target="_blank" href="' + navMostSteals[0].href + '">\n              <i class="ddb-icon ddb-icon-magic ddb-brand-text"></i>\n              Most Steals\n            </a>\n          </li>\n          <li class="ddb-brand-menu-hover">\n            <a target="_blank" href="' + navMostBlocks[0].href + '">\n              <i class="ddb-icon ddb-icon-thumbs-o-down ddb-brand-text"></i>\n              Most Blocks\n            </a>\n          </li>\n          <li class="ddb-brand-menu-hover">\n            <a target="_blank" href="' + navMostAssists[0].href + '">\n              <i class="ddb-icon ddb-icon-life-ring ddb-brand-text"></i>\n              Most Assists\n            </a>\n          </li>\n        ';
ncaamDropdownElements.nav.innerHTML = navHTML;
var dynamicDropdown = document.getElementsByClassName('ddb-dynamic-dropdown')[0];
if (dynamicDropdown !== null && dynamicDropdown.id === 'ddb-dynamic-ncaam') {
var dynamicNav = document.getElementById('ddb-dynamic-nav');
var dynamicLinks = document.getElementById('ddb-dynamic-links');
clearInnerHTML(dynamicNav);
clearInnerHTML(dynamicLinks);
dynamicNav.appendChild(ncaamDropdownElements.nav);
dynamicLinks.appendChild(ncaamDropdownElements.links);
}
} else if (xhttp.readyState === 4 && xhttp.status !== 200) {
apiConfig.teamsNCAAM.res = false;
apiConfig.teamsNCAAM.isLoading = false;
apiConfig.teamsNCAAM.hasLoaded = true;
apiConfig.teamsNCAAM.success = false;
}
};
xhttp.open('GET', apiString, true);
xhttp.send();
};
var bootstrapStaticCollegeFootball = function bootstrapStaticCollegeFootball() {
var navNews = document.getElementsByClassName('ddb-ncaaf-nav-news'),
navStandings = document.getElementsByClassName('ddb-ncaaf-nav-standings'),
navSchedule = document.getElementsByClassName('ddb-ncaaf-nav-schedule'),
navTopLists = document.getElementsByClassName('ddb-ncaaf-nav-top-lists'),
navTeams = document.getElementsByClassName('ddb-ncaaf-nav-teams'),
navProfile = document.getElementsByClassName('ddb-ncaaf-nav-profile');
[].forEach.call(navNews, function (item) {
item.href = touchdownDomain + '/ncaaf';
});
[].forEach.call(navStandings, function (item) {
item.href = touchdownDomain + '/ncaaf/standings';
});
[].forEach.call(navSchedule, function (item) {
item.href = touchdownDomain + '/ncaaf/schedules/league/' + footballLeagueYear + '/1';
});
[].forEach.call(navTopLists, function (item) {
item.href = touchdownDomain + '/ncaaf/list-of-lists/league/' + footballLeagueYear + '/10/1';
});
[].forEach.call(navTeams, function (item) {
item.href = touchdownDomain + '/ncaaf/pick-a-team';
});
[].forEach.call(navProfile, function (item) {
item.href = touchdownDomain + '/ncaaf/league';
});
};
var bootstrapDynamicCollegeFootball = function bootstrapDynamicCollegeFootball(state, userLocationFound) {
var fullState = stateAbbrevToFull(state);
var ncaafLinks = '\n      <h1 id="ncaaf-title" class="ddb-menu-dropdown-links-title">\n        NCAA Football Conferences ' + (userLocationFound ? 'in your area' : '') + '\n      </h1>\n      <h3 class="ddb-menu-dropdown-links-subtitle">\n        showing NCAA Football conferences located in <i class="ddb-icon-map-marker ddb-brand-text"></i> <span id="ncaaf-state-map-marker" class="ddb-bold">' + fullState + '</span>\n      </h3>\n    ';
var apiString = apiConfig.teamsNCAAF.url(state);
apiConfig.teamsNCAAF.isLoading = true;
var xhttp = createRequestObject();
xhttp.onreadystatechange = function () {
if (xhttp.readyState === 4 && xhttp.status === 200) {
var res = JSON.parse(xhttp.responseText);
var processedData = processCollegeFootballData(res);
processedData.forEach(function (item) {
ncaafLinks += item;
});
ncaafLinks += '\n          <a target="_blank" href="' + touchdownDomain + '/ncaaf/pick-a-team" class="ddb-menu-dropdown-all ddb-brand-all-conferences">\n            SEE ALL CONFERENCES\n          </a>\n        ';
ncaafDropdownElements.links.innerHTML = ncaafLinks;
apiConfig.teamsNCAAF.res = processedData;
apiConfig.teamsNCAAF.isLoading = false;
apiConfig.teamsNCAAF.hasLoaded = true;
apiConfig.teamsNCAAF.sucess = true;
var navHTML = '\n          <li class="ddb-brand-menu-hover">\n            <a target="_blank" href="' + touchdownDomain + '/ncaaf">\n              <i class="ddb-icon ddb-icon-news ddb-brand-text"></i>\n              News\n            </a>\n          </li>\n          <li class="ddb-brand-menu-hover">\n            <a target="_blank" href="' + touchdownDomain + '/ncaaf/standings">\n              <i class="ddb-icon ddb-icon-trophy ddb-brand-text"></i>\n              Standings\n            </a>\n          </li>\n          <li class="ddb-brand-menu-hover">\n            <a target="_blank" href="' + touchdownDomain + '/ncaaf/schedules/league/' + footballLeagueYear + '/1">\n              <i class="ddb-icon ddb-icon-calendar ddb-brand-text"></i>\n              Schedule\n            </a>\n          </li>\n          <li class="ddb-brand-menu-hover">\n            <a target="_blank" href="' + touchdownDomain + '/ncaaf/list-of-lists/league/' + footballLeagueYear + '/10/1">\n              <i class="ddb-icon ddb-icon-list ddb-brand-text"></i>\n              Top Lists\n            </a>\n          </li>\n          <li class="ddb-brand-menu-hover">\n            <a target="_blank" href="' + touchdownDomain + '/ncaaf/league">\n              <i class="ddb-icon ddb-icon-profile ddb-brand-text"></i>\n              NCAA F Profile\n            </a>\n          </li>\n        ';
ncaafDropdownElements.nav.innerHTML = navHTML;
var dynamicDropdown = document.getElementsByClassName('ddb-dynamic-dropdown')[0];
if (dynamicDropdown !== null && dynamicDropdown.id === 'ddb-dynamic-ncaaf') {
var dynamicNav = document.getElementById('ddb-dynamic-nav');
var dynamicLinks = document.getElementById('ddb-dynamic-links');
clearInnerHTML(dynamicNav);
clearInnerHTML(dynamicLinks);
dynamicNav.appendChild(ncaafDropdownElements.nav);
dynamicLinks.appendChild(ncaafDropdownElements.links);
}
} else if (xhttp.readyState === 4 && xhttp.status !== 200) {
apiConfig.teamsNCAAF.res = false;
apiConfig.teamsNCAAF.isLoading = false;
apiConfig.teamsNCAAF.hasLoaded = true;
apiConfig.teamsNCAAF.sucess = true;
}
};
xhttp.open('GET', apiString, true);
xhttp.send();
};
var bootstrapNBADropdown = function bootstrapNBADropdown() {
var atlanticDivision = [{
shortName: '76ers',
fullName: 'philadelphia-76ers',
teamId: 308
}, {
shortName: 'Celtics',
fullName: 'boston-celtics',
teamId: 324
}, {
shortName: 'Knicks',
fullName: 'new-york-knicks',
teamId: 344
}, {
shortName: 'Nets',
fullName: 'brooklyn-nets',
teamId: 321
}, {
shortName: 'Raptors',
fullName: 'toronto-raptors',
teamId: 322
}];
var centralDivision = [{
shortName: 'Bucks',
fullName: 'milwaukee-bucks',
teamId: 334
}, {
shortName: 'Bulls',
fullName: 'chicago-bulls',
teamId: 320
}, {
shortName: 'Cavaliers',
fullName: 'clevland-cavaliers',
teamId: 319
}, {
shortName: 'Pacers',
fullName: 'indiana-pacers',
teamId: 307
}, {
shortName: 'Pistons',
fullName: 'detroit-pistons',
teamId: 325
}];
var southeastDivision = [{
shortName: 'Hawks',
fullName: 'atlanta-hawks',
teamId: 329
}, {
shortName: 'Heat',
fullName: 'miami-heat',
teamId: 340
}, {
shortName: 'Hornets',
fullName: 'charlotte-hornets',
teamId: 343
}, {
shortName: 'Magic',
fullName: 'orlando-magic',
teamId: 338
}, {
shortName: 'Wizards',
fullName: 'washington-wizards',
teamId: 342
}];
var pacificDivision = [{
shortName: 'Clippers',
fullName: 'los-angeles-clippers',
teamId: 326
}, {
shortName: 'Kings',
fullName: 'sacramento-kings',
teamId: 324
}, {
shortName: 'Lakers',
fullName: 'los-angeles-lakers',
teamId: 331
}, {
shortName: 'Suns',
fullName: 'phoenix-suns',
teamId: 335
}, {
shortName: 'Warriors',
fullName: 'golden-state-warriors',
teamId: 286
}];
var southwestDivision = [{
shortName: 'Grizzlies',
fullName: 'memphis-grizzlies',
teamId: 333
}, {
shortName: 'Mavericks',
fullName: 'dallas-mavericks',
teamId: 332
}, {
shortName: 'Pelicans',
fullName: 'new-orleans-pelicans',
teamId: 285
}, {
shortName: 'Rockets',
fullName: 'houston-rockets',
teamId: 328
}, {
shortName: 'Spurs',
fullName: 'san-antonio-spurs',
teamId: 336
}];
var northwestDivision = [{
shortName: 'Jazz',
fullName: 'utah-jazz',
teamId: 337
}, {
shortName: 'Nuggets',
fullName: 'denver-nuggets',
teamId: 339
}, {
shortName: 'Thunder',
fullName: 'oklahoma-city-thunder',
teamId: 341
}, {
shortName: 'Timberwolves',
fullName: 'minnesota-timberwolves',
teamId: 330
}, {
shortName: 'Trail Blazers',
fullName: 'portland-trail-blazers',
teamId: 327
}];
var buildLink = function buildLink(data) {
if (houseSite == true) {
return hoopsDomain + '/NBA/team/' + data.fullName + '/' + data.teamId;
} else {
if (params.basketballSubdomain == "basketball") {
return hoopsDomain + '/NBA/team/' + data.fullName + '/' + data.teamId;
} else {
return hoopsDomain + '/NBA/t/' + data.fullName + '/' + data.teamId;
}
}
};
var linksEl = document.createElement('section');
var easternHTML = '\n      <table class="ddb-menu-dropdown-table ddb-col-3">\n        <thead>\n          <tr>\n            <td class="ddb-brand-text">\n              ATLANTIC\n            </td>\n            <td class="ddb-brand-text">\n              CENTRAL\n            </td>\n            <td class="ddb-brand-text">\n              SOUTHEAST\n            </td>\n          </tr>\n        </thead>\n        <tbody>\n    ';
var westernHTML = '\n      <table class="ddb-menu-dropdown-table ddb-col-3">\n        <thead>\n          <tr>\n            <td class="ddb-brand-text">\n              PACIFIC\n            </td>\n            <td class="ddb-brand-text">\n              SOUTHWEST\n            </td>\n            <td class="ddb-brand-text">\n              NORTHWEST\n            </td>\n          </tr>\n        </thead>\n        <tbody>\n    ';
for (var index = 0; index < 5; index++) {
easternHTML += '\n        <tr>\n          <td>\n            <a target="_blank" href="' + buildLink(atlanticDivision[index]) + '">' + atlanticDivision[index].shortName + '</a>\n          </td>\n          <td>\n            <a target="_blank" href="' + buildLink(centralDivision[index]) + '">' + centralDivision[index].shortName + '</a>\n          </td>\n          <td>\n            <a target="_blank" href="' + buildLink(southeastDivision[index]) + '">' + southeastDivision[index].shortName + '</a>\n          </td>\n        </tr>\n      ';
westernHTML += '\n        <tr>\n          <td>\n            <a target="_blank" href="' + buildLink(pacificDivision[index]) + '">' + pacificDivision[index].shortName + '</a>\n          </td>\n          <td>\n            <a target="_blank" href="' + buildLink(southwestDivision[index]) + '">' + southwestDivision[index].shortName + '</a>\n          </td>\n          <td>\n            <a target="_blank" href="' + buildLink(northwestDivision[index]) + '">' + northwestDivision[index].shortName + '</a>\n          </td>\n        </tr>\n      ';
}
easternHTML += '\n        </tbody>\n      </table>\n    ';
westernHTML += '\n        </tbody>\n      </table>\n    ';
linksEl.innerHTML += easternHTML;
linksEl.innerHTML += westernHTML;
var navMostWins = document.getElementsByClassName('ddb-nba-nav-most-wins'),
navMostTurnovers = document.getElementsByClassName('ddb-nba-nav-most-turnovers'),
navMostRebounds = document.getElementsByClassName('ddb-nba-nav-most-rebounds'),
navMostSteals = document.getElementsByClassName('ddb-nba-nav-most-steals'),
navMostBlocks = document.getElementsByClassName('ddb-nba-nav-most-blocks'),
navMostAssists = document.getElementsByClassName('ddb-nba-nav-most-assists'),
navTeams = document.getElementsByClassName('ddb-nba-nav-teams');
[].forEach.call(navMostWins, function (item) {
if (houseSite == true) {
item.href = hoopsDomain + '/NBA/team/NBA-teams-with-the-most-wins/1/listview/1';
} else {
item.href = hoopsDomain + '/NBA/team/NBA-teams-with-the-most-wins/list/1/1';
}
});
[].forEach.call(navMostTurnovers, function (item) {
if (houseSite == true) {
item.href = hoopsDomain + '/NBA/team/NBA-teams-with-the-most-turnovers/12/listview/1';
} else {
item.href = hoopsDomain + '/NBA/team/NBA-teams-with-the-most-turnovers/list/12/1';
}
});
[].forEach.call(navMostRebounds, function (item) {
if (houseSite == true) {
item.href = hoopsDomain + '/NBA/team/NBA-teams-with-the-most-rebounds/11/listview/1';
} else {
item.href = hoopsDomain + '/NBA/team/NBA-teams-with-the-most-rebounds/list/11/1';
}
});
[].forEach.call(navMostSteals, function (item) {
if (houseSite == true) {
item.href = hoopsDomain + '/NBA/team/NBA-teams-with-the-most-steals/15/listview/1';
} else {
item.href = hoopsDomain + '/NBA/team/NBA-teams-with-the-most-steals/list/15/1';
}
});
[].forEach.call(navMostBlocks, function (item) {
if (houseSite == true) {
item.href = hoopsDomain + '/NBA/team/NBA-teams-with-the-most-blocks/14/listview/1';
} else {
item.href = hoopsDomain + '/NBA/team/NBA-teams-with-the-most-blocks/list/14/1';
}
});
[].forEach.call(navMostAssists, function (item) {
if (houseSite == true) {
item.href = hoopsDomain + '/NBA/team/NBA-teams-with-the-most-assists-per-game/23/listview/1';
} else {
item.href = hoopsDomain + '/NBA/team/NBA-teams-with-the-most-assists-per-game/list/23/1';
}
});
[].forEach.call(navTeams, function (item) {
item.href = hoopsDomain + '/NBA';
});
var navEl = document.createElement('ul');
navEl.innerHTML = '\n      <li class="ddb-brand-menu-hover">\n        <a target="_blank" href="' + navMostWins[0].href + '">\n          <i class="ddb-icon ddb-icon-trophy ddb-brand-text"></i>\n          Most Wins\n        </a>\n      </li>\n      <li class="ddb-brand-menu-hover">\n        <a target="_blank" href="' + navMostTurnovers[0].href + '">\n          <i class="ddb-icon ddb-icon-box-scores ddb-brand-text"></i>\n          Most Turnovers\n        </a>\n      </li>\n      <li class="ddb-brand-menu-hover">\n        <a target="_blank" href="' + navMostRebounds[0].href + '">\n          <i class="ddb-icon ddb-icon-dribbble ddb-brand-text"></i>\n          Most Rebounds\n        </a>\n      </li>\n      <li class="ddb-brand-menu-hover">\n        <a target="_blank" href="' + navMostSteals[0].href + '">\n          <i class="ddb-icon ddb-icon-magic ddb-brand-text"></i>\n          Most Steals\n        </a>\n      </li>\n      <li class="ddb-brand-menu-hover">\n        <a target="_blank" href="' + navMostBlocks[0].href + '">\n          <i class="ddb-icon ddb-icon-thumbs-o-down ddb-brand-text"></i>\n          Most Blocks\n        </a>\n      </li>\n      <li class="ddb-brand-menu-hover">\n        <a target="_blank" href="' + navMostAssists[0].href + '">\n          <i class="ddb-icon ddb-icon-life-ring ddb-brand-text"></i>\n          Most Assists\n        </a>\n      </li>\n    ';
return {
nav: navEl,
links: linksEl
};
};
var bootstrapMLBDropdown = function bootstrapMLBDropdown() {
var alCentralDivision = [{
shortName: 'Indians',
fullName: 'cleveland-indians',
teamId: 2809
}, {
shortName: 'Royals',
fullName: 'kansas-city-royals',
teamId: 2806
}, {
shortName: 'Tigers',
fullName: 'detroit-tigers',
teamId: 2797
}, {
shortName: 'Twins',
fullName: 'minnesota-twins',
teamId: 2810
}, {
shortName: 'White Sox',
fullName: 'chicago-white-sox',
teamId: 2790
}];
var alEastDivison = [{
shortName: 'Blue Jays',
fullName: 'toronto-blue-jays',
teamId: 2802
}, {
shortName: 'Orioles',
fullName: 'kansas-city-royals',
teamId: 2806
}, {
shortName: 'Rays',
fullName: 'tampa-bay-rays',
teamId: 2798
}, {
shortName: 'Red Sox',
fullName: 'boston-red-sox',
teamId: 2791
}, {
shortName: 'Yankees',
fullName: 'new-york-yankees',
teamId: 2803
}];
var alWestDivision = [{
shortName: 'Angels',
fullName: 'los-angeles-angles',
teamId: 2792
}, {
shortName: 'Astros',
fullName: 'houston-astros',
teamId: 2792
}, {
shortName: 'Athletics',
fullName: 'oakland-athletics',
teamId: 2808
}, {
shortName: 'Mariners',
fullName: 'seatlle-mariners',
teamId: 2804
}, {
shortName: 'Rangers',
fullName: 'texas-rangers',
teamId: 2807
}];
var nlCentralDivision = [{
shortName: 'Braves',
fullName: 'atlanta-braves',
teamId: 2796
}, {
shortName: 'Marlins',
fullName: 'miami-marlins',
teamId: 2814
}, {
shortName: 'Mets',
fullName: 'new-york-mets',
teamId: 2812
}, {
shortName: 'Nationals',
fullName: 'washington-nationals',
teamId: 2813
}, {
shortName: 'Phillies',
fullName: 'philadelphia-phillies',
teamId: 2815
}];
var nlEastDivision = [{
shortName: 'Brewers',
fullName: 'milwaukee-brewers',
teamId: 2801
}, {
shortName: 'Cardinals',
fullName: 'st-louis-cardinals',
teamId: 2805
}, {
shortName: 'Cubs',
fullName: 'chicago-cubs',
teamId: 2795
}, {
shortName: 'Pirates',
fullName: 'pittsburgh-pirates',
teamId: 2817
}, {
shortName: 'Reds',
fullName: 'cincinnati-reds',
teamId: 2816
}];
var nlWestDivision = [{
shortName: 'Diamondbacks',
fullName: 'arizona-diamondbacks',
teamId: 2793
}, {
shortName: 'Dodgers',
fullName: 'los-angeles-dodgers',
teamId: 2818
}, {
shortName: 'Giants',
fullName: 'san-francisco-giants',
teamId: 2819
}, {
shortName: 'Padres',
fullName: 'san-diego-padres',
teamId: 2794
}, {
shortName: 'Rockies',
fullName: 'colorado-rockies',
teamId: 2800
}];
var buildLink = function buildLink(data) {
if (params.baseballSubdomain == "baseball") {
return homerunDomain + '/team/' + data.fullName + '/' + data.teamId;
} else {
if (houseSite == true) {
return homerunDomain + '/team/' + data.fullName + '/' + data.teamId;
} else {
return homerunDomain + '/t/' + data.fullName + '/' + data.teamId;
}
}
};
var linksEl = document.createElement('section');
var americanHTML = '\n      <table class="ddb-menu-dropdown-table ddb-col-3">\n        <thead>\n          <tr>\n            <td class="ddb-brand-text">\n              AL Central\n            </td>\n            <td class="ddb-brand-text">\n              AL East\n            </td>\n            <td class="ddb-brand-text">\n              AL West\n            </td>\n          </tr>\n        </thead>\n        <tbody>\n    ';
var nationalHTML = '\n      <table class="ddb-menu-dropdown-table ddb-col-3">\n        <thead>\n          <tr>\n            <td class="ddb-brand-text">\n              NL Central\n            </td>\n            <td class="ddb-brand-text">\n              NL East\n            </td>\n            <td class="ddb-brand-text">\n              NL West\n            </td>\n          </tr>\n        </thead>\n        <tbody>\n    ';
for (var index = 0; index < 5; index++) {
americanHTML += '\n        <tr>\n          <td>\n            <a target="_blank" href="' + buildLink(alCentralDivision[index]) + '">' + alCentralDivision[index].shortName + '</a>\n          </td>\n          <td>\n            <a target="_blank" href="' + buildLink(alEastDivison[index]) + '">' + alEastDivison[index].shortName + '</a>\n          </td>\n          <td>\n            <a target="_blank" href="' + buildLink(alWestDivision[index]) + '">' + alWestDivision[index].shortName + '</a>\n          </td>\n        </tr>\n      ';
nationalHTML += '\n        <tr>\n          <td>\n            <a target="_blank" href="' + buildLink(nlCentralDivision[index]) + '">' + nlCentralDivision[index].shortName + '</a>\n          </td>\n          <td>\n            <a target="_blank" href="' + buildLink(nlEastDivision[index]) + '">' + nlEastDivision[index].shortName + '</a>\n          </td>\n          <td>\n            <a target="_blank" href="' + buildLink(nlWestDivision[index]) + '">' + nlWestDivision[index].shortName + '</a>\n          </td>\n        </tr>\n      ';
}
americanHTML += '\n        </tbody>\n      </table>\n    ';
nationalHTML += '\n        </tbody>\n      </table>\n    ';
linksEl.innerHTML += americanHTML;
linksEl.innerHTML += nationalHTML;
var navNews = document.getElementsByClassName('ddb-mlb-nav-news'),
navStandings = document.getElementsByClassName('ddb-mlb-nav-standings'),
navSchedule = document.getElementsByClassName('ddb-mlb-nav-schedule'),
navTopLists = document.getElementsByClassName('ddb-mlb-nav-top-lists'),
navTeams = document.getElementsByClassName('ddb-mlb-nav-teams'),
navProfile = document.getElementsByClassName('ddb-mlb-nav-profile');
[].forEach.call(navNews, function (item) {
item.href = homerunDomain;
});
[].forEach.call(navStandings, function (item) {
item.href = homerunDomain + '/standings';
});
[].forEach.call(navSchedule, function (item) {
item.href = homerunDomain + '/schedules/mlb/1';
});
[].forEach.call(navTopLists, function (item) {
item.href = homerunDomain + '/list-of-lists/league/10/1';
});
[].forEach.call(navTeams, function (item) {
item.href = homerunDomain + '/pick-a-team';
});
[].forEach.call(navProfile, function (item) {
item.href = homerunDomain + '/mlb';
});
var navEl = document.createElement('ul');
navEl.innerHTML = '\n        <li class="ddb-brand-menu-hover">\n          <a target="_blank" href="' + homerunDomain + '">\n            <i class="ddb-icon ddb-icon-news ddb-brand-text"></i>\n            News\n          </a>\n        </li>\n        <li class="ddb-brand-menu-hover">\n          <a target="_blank" href="' + homerunDomain + '/standings">\n            <i class="ddb-icon ddb-icon-trophy ddb-brand-text"></i>\n            Standings\n          </a>\n        </li>\n        <li class="ddb-brand-menu-hover">\n          <a target="_blank" href="' + homerunDomain + '/schedules/mlb/1">\n            <i class="ddb-icon ddb-icon-calendar ddb-brand-text"></i>\n            Schedule\n          </a>\n        </li>\n        <li class="ddb-brand-menu-hover">\n          <a target="_blank" href="' + homerunDomain + '/list-of-lists/league/10/1">\n            <i class="ddb-icon ddb-icon-list ddb-brand-text"></i>\n            Top Lists\n          </a>\n        </li>\n        <li class="ddb-brand-menu-hover">\n          <a target="_blank" href="' + homerunDomain + '/mlb">\n            <i class="ddb-icon ddb-icon-profile ddb-brand-text"></i>\n            MLB Profile\n          </a>\n        </li>\n      ';
return {
nav: navEl,
links: linksEl
};
};
var bootstrapNFLDropdown = function bootstrapNFLDropdown() {
var afcNorth = [{
shortName: 'Ravens',
fullName: 'balitmore-ravens',
teamId: 141
}, {
shortName: 'Bengals',
fullName: 'cincinnati-bengals',
teamId: 139
}, {
shortName: 'Browns',
fullName: 'cleveland-browns',
teamId: 140
}, {
shortName: 'Steelers',
fullName: 'pittsburgh-steelers',
teamId: 142
}];
var afcEast = [{
shortName: 'Bills',
fullName: 'buffalo-bills',
teamId: 135
}, {
shortName: 'Dolphins',
fullName: 'miami-dolphins',
teamId: 136
}, {
shortName: 'Patriots',
fullName: 'new-england-patriots',
teamId: 138
}, {
shortName: 'Jets',
fullName: 'new-york-jets',
teamId: 137
}];
var afcSouth = [{
shortName: 'Texans',
fullName: 'houston-texans',
teamId: 145
}, {
shortName: 'Colts',
fullName: 'indianapolis-colts',
teamId: 143
}, {
shortName: 'Jaguars',
fullName: 'jacksonville-jaguars',
teamId: 144
}, {
shortName: 'Titans',
fullName: 'tennessee-titans',
teamId: 146
}];
var afcWest = [{
shortName: 'Broncos',
fullName: 'denver-broncos',
teamId: 147
}, {
shortName: 'Chiefs',
fullName: 'kansas-city-chief',
teamId: 149
}, {
shortName: 'Raiders',
fullName: 'oakland-raiders',
teamId: 150
}, {
shortName: 'Chargers',
fullName: 'san-diego-chargers',
teamId: 150
}];
var nfcNorth = [{
shortName: 'Bears',
fullName: 'chicago-bears',
teamId: 155
}, {
shortName: 'Lions',
fullName: 'detroit-lions',
teamId: 156
}, {
shortName: 'Packers',
fullName: 'green-bay-packers',
teamId: 157
}, {
shortName: 'Vikings',
fullName: 'minnesota-vikings',
teamId: 158
}];
var nfcEast = [{
shortName: 'Cowboys',
fullName: 'dallas-cowboys',
teamId: 151
}, {
shortName: 'Giants',
fullName: 'new-york-giants',
teamId: 153
}, {
shortName: 'Eagles',
fullName: 'philadelphia-eagles',
teamId: 152
}, {
shortName: 'Redskins',
fullName: 'washington-redskins',
teamId: 154
}];
var nfcSouth = [{
shortName: 'Falcons',
fullName: 'atlanta-falcons',
teamId: 160
}, {
shortName: 'Panthers',
fullName: 'carolina-panthers',
teamId: 161
}, {
shortName: 'Saints',
fullName: 'new-orleans-saints',
teamId: 162
}, {
shortName: 'Buccaneers',
fullName: 'tampa-bay-buccaneers',
teamId: 159
}];
var nfcWest = [{
shortName: 'Cardinals',
fullName: 'arizona-cardinals',
teamId: 164
}, {
shortName: 'Rams',
fullName: 'st-louis-rams',
teamId: 165
}, {
shortName: '49ers',
fullName: 'san-francisco-49ers',
teamId: 163
}, {
shortName: 'Seahawks',
fullName: 'seattle-seahawks',
teamId: 166
}];
var buildLink = function buildLink(data) {
if (params.footballSubdomain == "football") {
return touchdownDomain + '/nfl/team/' + data.fullName + '/' + data.teamId;
} else {
if (houseSite == true) {
return touchdownDomain + '/nfl/team/' + data.fullName + '/' + data.teamId;
} else {
return touchdownDomain + '/nfl/t/' + data.fullName + '/' + data.teamId;
}
}
};
var linksEl = document.createElement('section');
var afcHTML = '\n      <table class="ddb-menu-dropdown-table ddb-col-4">\n        <thead>\n          <tr>\n            <td class="ddb-brand-text">\n              AFC North\n            </td>\n            <td class="ddb-brand-text">\n              AFC East\n            </td>\n            <td class="ddb-brand-text">\n              AFC South\n            </td>\n            <td class="ddb-brand-text">\n              AFC West\n            </td>\n          </tr>\n        </thead>\n        <tbody>\n    ';
var nfcHTML = '\n    <table class="ddb-menu-dropdown-table ddb-col-4">\n      <thead>\n        <tr>\n          <td class="ddb-brand-text">\n            NFC North\n          </td>\n          <td class="ddb-brand-text">\n            NFC East\n          </td>\n          <td class="ddb-brand-text">\n            NFC South\n          </td>\n          <td class="ddb-brand-text">\n            NFC West\n          </td>\n        </tr>\n      </thead>\n      <tbody>\n    ';
for (var index = 0; index < 4; index++) {
afcHTML += '\n        <tr>\n          <td>\n            <a target="_blank" href="' + buildLink(afcNorth[index]) + '">' + afcNorth[index].shortName + '</a>\n          </td>\n          <td>\n            <a target="_blank" href="' + buildLink(afcEast[index]) + '">' + afcEast[index].shortName + '</a>\n          </td>\n          <td>\n            <a target="_blank" href="' + buildLink(afcSouth[index]) + '">' + afcSouth[index].shortName + '</a>\n          </td>\n          <td>\n            <a target="_blank" href="' + buildLink(afcWest[index]) + '">' + afcWest[index].shortName + '</a>\n          </td>\n        </tr>\n      ';
nfcHTML += '\n        <tr>\n          <td>\n            <a target="_blank" href="' + buildLink(nfcNorth[index]) + '">' + nfcNorth[index].shortName + '</a>\n          </td>\n          <td>\n            <a target="_blank" href="' + buildLink(nfcEast[index]) + '">' + nfcEast[index].shortName + '</a>\n          </td>\n          <td>\n            <a target="_blank" href="' + buildLink(nfcSouth[index]) + '">' + nfcSouth[index].shortName + '</a>\n          </td>\n          <td>\n            <a target="_blank" href="' + buildLink(nfcWest[index]) + '">' + nfcWest[index].shortName + '</a>\n          </td>\n        </tr>\n      ';
}
afcHTML += '\n        </tbody>\n      </table>\n    ';
nfcHTML += '\n        </tbody>\n      </table>\n    ';
linksEl.innerHTML += afcHTML;
linksEl.innerHTML += nfcHTML;
var navNews = document.getElementsByClassName('ddb-nfl-nav-news'),
navStandings = document.getElementsByClassName('ddb-nfl-nav-standings'),
navSchedule = document.getElementsByClassName('ddb-nfl-nav-schedule'),
navTopLists = document.getElementsByClassName('ddb-nfl-nav-top-lists'),
navTeams = document.getElementsByClassName('ddb-nfl-nav-teams'),
navProfile = document.getElementsByClassName('ddb-nfl-nav-profile');
[].forEach.call(navNews, function (item) {
item.href = touchdownDomain + '/nfl';
});
[].forEach.call(navStandings, function (item) {
item.href = touchdownDomain + '/nfl/standings';
});
[].forEach.call(navSchedule, function (item) {
item.href = touchdownDomain + '/nfl/schedules/league/' + footballLeagueYear + '/1';
});
[].forEach.call(navTopLists, function (item) {
item.href = touchdownDomain + '/nfl/list-of-lists/league/' + footballLeagueYear + '/10/1';
});
[].forEach.call(navTeams, function (item) {
item.href = touchdownDomain + '/nfl/pick-a-team';
});
[].forEach.call(navProfile, function (item) {
item.href = touchdownDomain + '/nfl/league';
});
var navEl = document.createElement('ul');
navEl.innerHTML = '\n      <li class="ddb-brand-menu-hover">\n        <a target="_blank" href="' + touchdownDomain + '/nfl">\n          <i class="ddb-icon ddb-icon-news ddb-brand-text"></i>\n          News\n        </a>\n      </li>\n      <li class="ddb-brand-menu-hover">\n        <a target="_blank" href="' + touchdownDomain + '/nfl/standings">\n          <i class="ddb-icon ddb-icon-trophy ddb-brand-text"></i>\n          Standings\n        </a>\n      </li>\n      <li class="ddb-brand-menu-hover">\n        <a target="_blank" href="' + touchdownDomain + '/nfl/schedules/league/' + footballLeagueYear + '/1">\n          <i class="ddb-icon ddb-icon-calendar ddb-brand-text"></i>\n          Schedule\n        </a>\n      </li>\n      <li class="ddb-brand-menu-hover">\n        <a target="_blank" href="' + touchdownDomain + '/nfl/list-of-lists/league/' + footballLeagueYear + '/10/1">\n          <i class="ddb-icon ddb-icon-list ddb-brand-text"></i>\n          Top Lists\n        </a>\n      </li>\n      <li class="ddb-brand-menu-hover">\n        <a target="_blank" href="' + touchdownDomain + '/nfl/league">\n          <i class="ddb-icon ddb-icon-profile ddb-brand-text"></i>\n          NFL Profile\n        </a>\n      </li>\n    ';
return {
nav: navEl,
links: linksEl
};
};
var bootstrapBoxscores = function bootstrapBoxscores() {
var tz = getEasternTime();
var todayObject = getToday(tz.offset);
var todayInput = todayObject.year + '-' + todayObject.month + '-' + todayObject.date;
var apiString = apiConfig.boxscoresMLB.url(todayInput);
var apiString2 = apiConfig.boxscoresNFL.url(todayInput);
var apiString3 = apiConfig.boxscoresNCAAF.url(todayInput);
var apiString5 = apiConfig.boxscoresNBA.url(todayInput);
var apiString4 = apiConfig.boxscoresNCAAM.url(todayInput);
var mobileBoxscores = document.getElementById('ddb-mobile-boxscores');
var desktopBoxscores = document.getElementById('ddb-desktop-boxscores');
var mobileBoxscoresFrame = document.getElementById('ddb-mobile-boxscores-frame');
var desktopBoxscoresFrame = document.getElementById('ddb-desktop-boxscores-frame');
var mobileBoxscoresMLB = document.getElementById('ddb-mobile-boxscores-mlb');
var desktopBoxscoresMLB = document.getElementById('ddb-desktop-boxscores-mlb');
var mobileBoxscoresNFL = document.getElementById('ddb-mobile-boxscores-nfl');
var desktopBoxscoresNFL = document.getElementById('ddb-desktop-boxscores-nfl');
var mobileBoxscoresNCAAF = document.getElementById('ddb-mobile-boxscores-ncaaf');
var desktopBoxscoresNCAAF = document.getElementById('ddb-desktop-boxscores-ncaaf');
var mobileBoxscoresNBA = document.getElementById('ddb-mobile-boxscores-nba');
var desktopBoxscoresNBA = document.getElementById('ddb-desktop-boxscores-nba');
var mobileBoxscoresNCAAM = document.getElementById('ddb-mobile-boxscores-ncaam');
var desktopBoxscoresNCAAM = document.getElementById('ddb-desktop-boxscores-ncaam');
var leftMobileButton = document.getElementById('ddb-mobile-boxscores-left');
var rightMobileButton = document.getElementById('ddb-mobile-boxscores-right');
var leftDesktopButton = document.getElementById('ddb-desktop-boxscores-left');
var rightDesktopButton = document.getElementById('ddb-desktop-boxscores-right');
var totalMax = 0,
mlbMax = 0,
nflMax = 0,
ncaafMax = 0;
var desktopBoxscoresSelected = 'all';
var desktopMax = 0;
var eventsOpen = false;
var eventsContainer = document.getElementById('ddb-boxscores-events-container');
var eventsButton = document.getElementById('ddb-boxscores-events-button');
eventsButton.addEventListener('click', function () {
if (eventsOpen) {
removeClass(eventsContainer, 'ddb-active');
} else {
addClass(eventsContainer, 'ddb-active');
}
eventsOpen = !eventsOpen;
checkRightDesktopButton();
checkLeftDesktopButton();
});
var eventsOptions = document.getElementById('ddb-boxscores-options');
[].forEach.call(eventsOptions.childNodes, function (item) {
item.addEventListener('click', function () {
var id = this.id;
switch (id) {
case 'ddb-boxscores-options-mlb':
desktopBoxscoresIndex = 0;
desktopBoxscores.style.left = 0;
desktopBoxscoresMLB.style.display = 'inline-block';
desktopBoxscoresNFL.style.display = 'none';
desktopBoxscoresNCAAF.style.display = 'none';
desktopBoxscoresSelected = 'mlb';
break;
case 'ddb-boxscores-options-nfl':
desktopBoxscoresIndex = 0;
desktopBoxscores.style.left = 0;
desktopBoxscoresMLB.style.display = 'none';
desktopBoxscoresNFL.style.display = 'inline-block';
desktopBoxscoresNCAAF.style.display = 'none';
desktopBoxscoresSelected = 'nfl';
break;
case 'ddb-boxscores-options-ncaaf':
desktopBoxscoresIndex = 0;
desktopBoxscores.style.left = 0;
desktopBoxscoresMLB.style.display = 'none';
desktopBoxscoresNFL.style.display = 'none';
desktopBoxscoresNCAAF.style.display = 'inline-block';
desktopBoxscoresSelected = 'ncaaf';
break;
case 'ddb-boxscores-options-all':
desktopBoxscoresIndex = 0;
desktopBoxscores.style.left = 0;
desktopBoxscoresMLB.style.display = 'inline-block';
desktopBoxscoresNFL.style.display = 'inline-block';
desktopBoxscoresNCAAF.style.display = 'inline-block';
desktopBoxscoresSelected = 'all';
break;
default:
return false;
break;
}
var siblingNodes = eventsOptions.childNodes;
[].forEach.call(siblingNodes, function (item) {
if (item.nodeType === 1) {
removeClass(item, 'ddb-active');
}
});
addClass(this, 'ddb-active');
checkRightDesktopButton();
checkLeftDesktopButton();
});
});
var checkRightDesktopButton = function checkRightDesktopButton() {
switch (desktopBoxscoresSelected) {
case 'mlb':
desktopMax = mlbMax;
break;
case 'nfl':
desktopMax = nflMax;
break;
case 'ncaaf':
desktopMax = ncaafMax;
break;
case 'all':
desktopMax = totalMax;
break;
}
var frameWidth = desktopBoxscoresFrame.offsetWidth;
var boxscoresPixelLeft = (desktopMax - desktopBoxscoresIndex) * 196;
var whitespaceLeft = frameWidth - boxscoresPixelLeft;
if (desktopBoxscoresIndex !== 0 && !hasClass(leftDesktopButton, 'ddb-blue')) {
addClass(leftDesktopButton, 'ddb-blue');
}
if (whitespaceLeft >= 0) {
removeClass(rightDesktopButton, 'ddb-blue');
}
};
var canClickRightDesktopButton = function canClickRightDesktopButton() {
switch (desktopBoxscoresSelected) {
case 'mlb':
desktopMax = mlbMax;
break;
case 'nfl':
desktopMax = nflMax;
break;
case 'ncaaf':
desktopMax = ncaafMax;
break;
case 'all':
desktopMax = totalMax;
break;
}
var frameWidth = desktopBoxscoresFrame.offsetWidth;
var boxscoresPixelLeft = (desktopMax - desktopBoxscoresIndex) * 196;
var whitespaceLeft = frameWidth - boxscoresPixelLeft;
if (whitespaceLeft >= 0) {
return false;
} else {
return true;
}
};
var checkLeftDesktopButton = function checkLeftDesktopButton() {
switch (desktopBoxscoresSelected) {
case 'mlb':
desktopMax = mlbMax;
break;
case 'nfl':
desktopMax = nflMax;
break;
case 'ncaaf':
desktopMax = ncaafMax;
break;
case 'all':
desktopMax = totalMax;
break;
}
var frameWidth = desktopBoxscoresFrame.offsetWidth;
var boxscoresPixelLeft = (desktopMax - desktopBoxscoresIndex) * 196;
var whitespaceLeft = frameWidth - boxscoresPixelLeft;
if (whitespaceLeft < 0 && !hasClass(rightDesktopButton, 'ddb-blue')) {
addClass(rightDesktopButton, 'ddb-blue');
}
if (desktopBoxscoresIndex === 0 && hasClass(leftDesktopButton, 'ddb-blue')) {
removeClass(leftDesktopButton, 'ddb-blue');
}
};
var canClickLeftDesktopButton = function canClickLeftDesktopButton() {
switch (desktopBoxscoresSelected) {
case 'mlb':
desktopMax = mlbMax;
break;
case 'nfl':
desktopMax = nflMax;
break;
case 'ncaaf':
desktopMax = ncaafMax;
break;
case 'all':
desktopMax = totalMax;
break;
}
if (desktopBoxscoresIndex === 0) {
return false;
} else {
return true;
}
};
var checkRightMobileButton = function checkRightMobileButton() {
var frameWidth = mobileBoxscoresFrame.offsetWidth;
var boxscoresPixelLeft = (totalMax - mobileBoxscoresIndex) * 100;
var whitespaceLeft = frameWidth - boxscoresPixelLeft;
if (mobileBoxscoresIndex !== 0 && !hasClass(leftMobileButton, 'ddb-blue')) {
addClass(leftMobileButton, 'ddb-blue');
}
if (whitespaceLeft >= 0) {
removeClass(rightMobileButton, 'ddb-blue');
}
};
var canClickRightMobileButton = function canClickRightMobileButton() {
var frameWidth = mobileBoxscoresFrame.offsetWidth;
var boxscoresPixelLeft = (totalMax - mobileBoxscoresIndex) * 100;
var whitespaceLeft = frameWidth - boxscoresPixelLeft;
if (whitespaceLeft >= 0) {
return false;
} else {
return true;
}
};
var checkLeftMobileButton = function checkLeftMobileButton() {
var frameWidth = mobileBoxscoresFrame.offsetWidth;
var boxscoresPixelLeft = (totalMax - mobileBoxscoresIndex) * 100;
var whitespaceLeft = frameWidth - boxscoresPixelLeft;
if (whitespaceLeft < 0 && !hasClass(rightMobileButton, 'ddb-blue')) {
addClass(rightMobileButton, 'ddb-blue');
}
if (mobileBoxscoresIndex === 0 && hasClass(leftMobileButton, 'ddb-blue')) {
removeClass(leftMobileButton, 'ddb-blue');
}
};
var canClickLeftMobileButton = function canClickLeftMobileButton() {
if (mobileBoxscoresIndex === 0) {
return false;
} else {
return true;
}
};
var mobileBoxscoresIndex = 0;
var desktopBoxscoresIndex = 0;
var bootstapBoxscoresButtons = function bootstapBoxscoresButtons() {
var moveMobileLeft = function moveMobileLeft() {
var canClick = canClickLeftMobileButton();
if (canClick) {
mobileBoxscoresIndex--;
mobileBoxscores.style.left = -100 + (mobileBoxscoresIndex - 1) * -100 + 'px';
checkLeftMobileButton();
}
};
var moveMobileRight = function moveMobileRight() {
var canClick = canClickRightMobileButton();
if (canClick) {
mobileBoxscoresIndex++;
mobileBoxscores.style.left = -100 + (mobileBoxscoresIndex - 1) * -100 + 'px';
checkRightMobileButton();
}
};
var moveDesktopLeft = function moveDesktopLeft() {
var canClick = canClickLeftDesktopButton();
if (canClick) {
desktopBoxscoresIndex--;
desktopBoxscores.style.left = -196 + (desktopBoxscoresIndex - 1) * -196 + 'px';
checkLeftDesktopButton();
}
};
var moveDesktopRight = function moveDesktopRight() {
var canClick = canClickRightDesktopButton();
if (canClick) {
desktopBoxscoresIndex++;
desktopBoxscores.style.left = -196 + (desktopBoxscoresIndex - 1) * -196 + 'px';
checkRightDesktopButton();
}
};
leftMobileButton.addEventListener('click', moveMobileLeft);
rightMobileButton.addEventListener('click', moveMobileRight);
leftDesktopButton.addEventListener('click', moveDesktopLeft);
rightDesktopButton.addEventListener('click', moveDesktopRight);
};
var promise5 = new Promise(function (resolve, reject) {
var xhttp = createRequestObject();
xhttp.onreadystatechange = function () {
if (xhttp.readyState === 4 && xhttp.status === 200) {
var res = JSON.parse(xhttp.responseText);
resolve(res);
var processedData;
processedData = processBasketballBoxscoresData(res.box_scores, tz.offset, tz.tzAbbrev, todayObject.date, "nba");
if (processedData.length === 0) {
processedData = processBasketballBoxscoresData(res.box_scores, tz.offset, tz.tzAbbrev, null, "nba");
}
} else if (xhttp.readyState === 4 && xhttp.status !== 200) {
reject(true);
}
};
xhttp.open('GET', apiString5, true);
xhttp.send();
});
var promise4 = new Promise(function (resolve, reject) {
var xhttp = createRequestObject();
xhttp.onreadystatechange = function () {
if (xhttp.readyState === 4 && xhttp.status === 200) {
var res = JSON.parse(xhttp.responseText);
resolve(res);
var processedData;
processedData = processBasketballBoxscoresData(res.box_scores, tz.offset, tz.tzAbbrev, todayObject.date, "ncaa");
if (processedData.length === 0) {
processedData = processBasketballBoxscoresData(res.box_scores, tz.offset, tz.tzAbbrev, null, "ncaa");
}
} else if (xhttp.readyState === 4 && xhttp.status !== 200) {
reject(true);
}
};
xhttp.open('GET', apiString4, true);
xhttp.send();
});
var promise1 = new Promise(function (resolve, reject) {
var xhttp = createRequestObject();
xhttp.onreadystatechange = function () {
if (xhttp.readyState === 4 && xhttp.status === 200) {
var res = JSON.parse(xhttp.responseText);
resolve(res);
var processedData;
processedData = processBaseballBoxscoresData(res.data, tz.offset, tz.tzAbbrev, todayObject.date);
if (processedData.length === 0) {
processedData = processBaseballBoxscoresData(res.data, tz.offset, tz.tzAbbrev, null);
}
} else if (xhttp.readyState === 4 && xhttp.status !== 200) {
reject(true);
}
};
xhttp.open('GET', apiString, true);
xhttp.send();
});
var promise2 = new Promise(function (resolve, reject) {
var xhttp = createRequestObject();
xhttp.onreadystatechange = function () {
if (xhttp.readyState === 4 && xhttp.status === 200) {
var res = JSON.parse(xhttp.responseText);
resolve(res);
var processedData = processFootballBoxscoresData(res.data, tz.offset, tz.tzAbbrev, todayObject.date, 'nfl');
} else if (xhttp.readyState === 4 & xhttp.status !== 200) {
reject(true);
}
};
xhttp.open('GET', apiString2, true);
xhttp.send();
});
var promise3 = new Promise(function (resolve, reject) {
var xhttp = createRequestObject();
xhttp.onreadystatechange = function () {
if (xhttp.readyState === 4 && xhttp.status === 200) {
var res = JSON.parse(xhttp.responseText);
resolve(res);
var processedData = processFootballBoxscoresData(res.data, tz.offset, tz.tzAbbrev, todayObject.date, 'ncaaf');
} else if (xhttp.readyState === 4 && xhttp.status !== 200) {
reject(true);
}
};
xhttp.open('GET', apiString3, true);
xhttp.send();
});
Promise.all([promise1, promise2, promise3, promise4, promise5]).then(function (res) {
var mlbData = res[0].data || [];
var nflData = res[1].data || [];
var ncaafData = res[2].data || [];
var ncaamData = res[3].box_scores || [];
var nbaData = res[4].box_scores || [];
var processedNBAData;
processedNBAData = processBasketballBoxscoresData(nbaData, tz.offset, tz.tzAbbrev, todayObject.date, "nba");
if (processedNBAData.length === 0) {
processedNBAData = processBasketballBoxscoresData(nbaData, tz.offset, tz.tzAbbrev, null, "nba");
}
processedNBAData.forEach(function (item) {
desktopBoxscoresNBA.appendChild(item.desktopNode);
});
nbaMax = processedNBAData.length + 1;
var processedNCAAMData;
processedNCAAMData = processBasketballBoxscoresData(ncaamData, tz.offset, tz.tzAbbrev, todayObject.date, "ncaa");
if (processedNCAAMData.length === 0) {
processedNCAAMData = processBasketballBoxscoresData(ncaamData, tz.offset, tz.tzAbbrev, null, "ncaa");
}
processedNCAAMData.forEach(function (item) {
desktopBoxscoresNCAAM.appendChild(item.desktopNode);
});
ncaamMax = processedNCAAMData.length + 1;
var processedMLBData;
processedMLBData = processBaseballBoxscoresData(mlbData, tz.offset, tz.tzAbbrev, todayObject.date);
if (processedMLBData.length === 0) {
processedMLBData = processBaseballBoxscoresData(mlbData, tz.offset, tz.tzAbbrev, null);
}
processedMLBData.forEach(function (item) {
mobileBoxscoresMLB.appendChild(item.mobileNode);
desktopBoxscoresMLB.appendChild(item.desktopNode);
});
mlbMax = processedMLBData.length + 1;
var processedNFLData = processFootballBoxscoresData(nflData, tz.offset, tz.tzAbbrev, todayObject.date, 'nfl');
processedNFLData.forEach(function (item) {
mobileBoxscoresNFL.appendChild(item.mobileNode);
desktopBoxscoresNFL.appendChild(item.desktopNode);
});
nflMax = processedNFLData.length + 1;
var processedNCAAFData = processFootballBoxscoresData(ncaafData, tz.offset, tz.tzAbbrev, todayObject.date, 'ncaaf');
processedNCAAFData.forEach(function (item) {
mobileBoxscoresNCAAF.appendChild(item.mobileNode);
desktopBoxscoresNCAAF.appendChild(item.desktopNode);
});
ncaafMax = processedNCAAFData.length + 1;
totalMax = mlbMax + nflMax + ncaafMax + nbaMax + ncaamMax;
bootstapBoxscoresButtons();
}, function (err) {
});
};
var bootstrapSearch = function bootstrapSearch() {
var searchMobile = document.getElementById('ddb-search-mobile');
var searchMobileDropdown = document.getElementById('ddb-search-mobile-dropdown');
var searchSmallDesktop = document.getElementById('ddb-small-desktop-search-input');
var searchSmallDesktopDropdown = document.getElementById('ddb-small-desktop-search-dropdown');
var searchDesktop = document.getElementById('ddb-search-desktop');
var searchDesktopDropdown = document.getElementById('ddb-search-desktop-dropdown');
var indexSelected = 0;
var storedSearchValue;
var selectedItem;
var apiString = resourceURL + '/lib/search_teams_middlelayer.php';
var fuse;
var searchResults = [];
var windowClickEvent = function windowClickEvent(evt) {
var target = evt.target;
var clickedInside = false;
do {
if (target === searchDesktop || target === searchDesktop.nextElementSibling) {
clickedInside = true;
target = false;
}
target = target.parentNode;
} while (target);
if (clickedInside) {
} else {
removeClass(searchDesktop.nextElementSibling, 'ddb-show');
window.removeEventListener('click', windowClickEvent);
}
};
var submitAutoSuggest = function submitAutoSuggest(data) {
var link;
var sanitizeTeamName = data.teamName.replace(/[^\w\s]/gi, '');
sanitizeTeamName = sanitizeTeamName.replace(/\s+/g, '-').toLowerCase();
switch (data.Scope) {
case 'MLB':
if (params.baseballSubdomain == "baseball") {
link = homerunDomain + '/team/' + sanitizeTeamName + '/' + data.teamId;
} else {
if (houseSite == true) {
link = homerunDomain + '/team/' + sanitizeTeamName + '/' + data.teamId;
} else {
link = homerunDomain + '/t/' + sanitizeTeamName + '/' + data.teamId;
}
}
break;
case 'NFL':
if (params.footballSubdomain == "football") {
link = touchdownDomain + '/nfl/team/' + sanitizeTeamName + '/' + data.teamId;
} else {
if (houseSite == true) {
link = touchdownDomain + '/nfl/team/' + sanitizeTeamName + '/' + data.teamId;
} else {
link = touchdownDomain + '/nfl/t/' + sanitizeTeamName + '/' + data.teamId;
}
}
break;
case 'NCAAF':
if (params.footballSubdomain == "football") {
link = touchdownDomain + '/ncaaf/team/' + sanitizeTeamName + '/' + data.teamId;
} else {
if (houseSite == true) {
link = touchdownDomain + '/ncaaf/team/' + sanitizeTeamName + '/' + data.teamId;
} else {
link = touchdownDomain + '/ncaaf/t/' + sanitizeTeamName + '/' + data.teamId;
}
}
break;
case 'NBA':
if (houseSite == true) {
link = hoopsDomain + '/NBA/team/' + sanitizeTeamName + '/' + data.teamId;
} else {
if (params.basketballSubdomain == "basketball") {
link = hoopsDomain + '/NBA/team/' + sanitizeTeamName + '/' + data.teamId;
} else {
link = hoopsDomain + '/NBA/t/' + sanitizeTeamName + '/' + data.teamId;
}
}
break;
case 'NCAAB':
if (houseSite == true) {
link = hoopsDomain + '/NCAA/team/' + sanitizeTeamName + '/' + data.teamId;
} else {
if (params.basketballSubdomain == "basketball") {
link = hoopsDomain + '/NCAA/team/' + sanitizeTeamName + '/' + data.teamId;
} else {
link = hoopsDomain + '/NCAA/t/' + sanitizeTeamName + '/' + data.teamId;
}
}
break;
default:
link = '#';
break;
}
window.location.href = link;
};
var keyupEvent = function keyupEvent(evt) {
var keyCode = evt.keyCode;
if (keyCode === 13 && searchResults.length > 0 && typeof selectedItem !== 'undefined') {
submitAutoSuggest(selectedItem);
return false;
}
if ((keyCode === 38 || keyCode === 40) && searchResults.length > 0) {
var dropdownItems = searchDesktopDropdown.childNodes;
if (keyCode === 38) {
if (indexSelected === 0) {
indexSelected = searchResults.length;
} else {
indexSelected--;
}
}
if (keyCode === 40) {
if (indexSelected === searchResults.length) {
indexSelected = 0;
} else {
indexSelected++;
}
}
for (var c = 0, length = dropdownItems.length; c < length; c++) {
if (c + 1 !== indexSelected) {
removeClass(dropdownItems[c], 'ddb-search-active');
} else {
addClass(dropdownItems[c], 'ddb-search-active');
searchDesktop.value = searchResults[c].teamName;
selectedItem = searchResults[c];
}
}
if (indexSelected === 0) {
searchDesktop.value = storedSearchValue;
selectedItem = undefined;
}
return false;
}
var val = this.value;
if (val === '') {
searchResults = [];
window.removeEventListener('click', windowClickEvent);
removeClass(this.nextElementSibling, 'ddb-show');
return false;
}
storedSearchValue = searchDesktop.value;
searchResults = fuse.search(val).slice(0, 4);
indexSelected = 0;
selectedItem = undefined;
while (searchDesktopDropdown.firstChild) {
searchDesktopDropdown.removeChild(searchDesktopDropdown.firstChild);
}
if (searchResults.length === 0) {
searchDesktopDropdown.appendChild(buildNoResults(), searchDesktopDropdown);
}
searchResults.forEach(function (item) {
searchDesktopDropdown.appendChild(buildResult(item), searchDesktopDropdown);
});
if (!hasClass(this.nextElementSibling, 'ddb-show')) {
addClass(this.nextElementSibling, 'ddb-show');
setTimeout(function () {
window.addEventListener('click', windowClickEvent);
}, 1);
}
};
var focusSearch = function focusSearch() {
var val = this.value;
if (val === '') {
return false;
}
if (!hasClass(this.nextElementSibling, 'ddb-show')) {
addClass(this.nextElementSibling, 'ddb-show');
setTimeout(function () {
window.addEventListener('click', windowClickEvent);
}, 1);
}
};
var keyupEventMobile = function keyupEventMobile(evt) {
var keyCode = evt.keyCode;
if (keyCode === 13 && searchResults.length > 0 && typeof selectedItem !== 'undefined') {
submitAutoSuggest(selectedItem);
return false;
}
if ((keyCode === 38 || keyCode === 40) && searchResults.length > 0) {
var dropdownItems = searchMobileDropdown.childNodes;
if (keyCode === 38) {
if (indexSelected === 0) {
indexSelected = searchResults.length;
} else {
indexSelected--;
}
}
if (keyCode === 40) {
if (indexSelected === searchResults.length) {
indexSelected = 0;
} else {
indexSelected++;
}
}
for (var c = 0, length = dropdownItems.length; c < length; c++) {
if (c + 1 !== indexSelected) {
removeClass(dropdownItems[c], 'ddb-search-active');
} else {
addClass(dropdownItems[c], 'ddb-search-active');
searchMobile.value = searchResults[c].teamName;
selectedItem = searchResults[c];
}
}
if (indexSelected === 0) {
searchMobile.value = storedSearchValue;
selectedItem = undefined;
}
return false;
}
var val = this.value;
if (val === '') {
searchResults = [];
while (searchMobileDropdown.firstChild) {
searchMobileDropdown.removeChild(searchMobileDropdown.firstChild);
}return false;
}
storedSearchValue = searchMobile.value;
searchResults = fuse.search(val).slice(0, 4);
indexSelected = 0;
selectedItem = undefined;
while (searchMobileDropdown.firstChild) {
searchMobileDropdown.removeChild(searchMobileDropdown.firstChild);
}
if (searchResults.length === 0) {
searchMobileDropdown.appendChild(buildNoResults(), searchMobileDropdown);
}
searchResults.forEach(function (item) {
searchMobileDropdown.appendChild(buildResult(item), searchMobileDropdown);
});
};
var keyupEventSmallDesktop = function keyupEventSmallDesktop(evt) {
var keyCode = evt.keyCode;
if (keyCode === 13 && searchResults.length > 0 && typeof selectedItem !== 'undefined') {
submitAutoSuggest(selectedItem);
return false;
}
if ((keyCode === 38 || keyCode === 40) && searchResults.length > 0) {
var dropdownItems = searchSmallDesktopDropdown.childNodes;
if (keyCode === 38) {
if (indexSelected === 0) {
indexSelected = searchResults.length;
} else {
indexSelected--;
}
}
if (keyCode === 40) {
if (indexSelected === searchResults.length) {
indexSelected = 0;
} else {
indexSelected++;
}
}
for (var c = 0, length = dropdownItems.length; c < length; c++) {
if (c + 1 !== indexSelected) {
removeClass(dropdownItems[c], 'ddb-search-active');
} else {
addClass(dropdownItems[c], 'ddb-search-active');
searchSmallDesktop.value = searchResults[c].teamName;
selectedItem = searchResults[c];
}
}
if (indexSelected === 0) {
searchSmallDesktop.value = storedSearchValue;
selectedItem = undefined;
}
return false;
}
var val = this.value;
if (val === '') {
searchResults = [];
while (searchSmallDesktopDropdown.firstChild) {
searchSmallDesktopDropdown.removeChild(searchSmallDesktopDropdown.firstChild);
}return false;
}
storedSearchValue = searchSmallDesktop.value;
searchResults = fuse.search(val).slice(0, 4);
indexSelected = 0;
selectedItem = undefined;
while (searchSmallDesktopDropdown.firstChild) {
searchSmallDesktopDropdown.removeChild(searchSmallDesktopDropdown.firstChild);
}
if (searchResults.length === 0) {
searchSmallDesktopDropdown.appendChild(buildNoResults(), searchSmallDesktopDropdown);
}
searchResults.forEach(function (item) {
searchSmallDesktopDropdown.appendChild(buildResult(item), searchSmallDesktopDropdown);
});
};
var buildNoResults = function buildNoResults() {
var el = document.createElement('li');
el.className = 'ddb-no-results';
el.innerText = 'No Results Found';
return el;
};
var buildResult = function buildResult(data) {
var el = document.createElement('li');
var iconClass, link;
var sanitizeTeamName = data.teamName.replace(/[^\w\s]/gi, '');
sanitizeTeamName = sanitizeTeamName.replace(/\s+/g, '-').toLowerCase();
switch (data.Scope) {
case 'MLB':
iconClass = 'ddb-icon-baseball';
if (params.baseballSubdomain == "baseball") {
link = homerunDomain + '/team/' + sanitizeTeamName + '/' + data.teamId;
} else {
if (houseSite == true) {
link = homerunDomain + '/team/' + sanitizeTeamName + '/' + data.teamId;
} else {
link = homerunDomain + '/t/' + sanitizeTeamName + '/' + data.teamId;
}
}
break;
case 'NFL':
iconClass = 'ddb-icon-football';
if (params.footballSubdomain == "football") {
link = touchdownDomain + '/nfl/team/' + sanitizeTeamName + '/' + data.teamId;
} else {
if (houseSite == true) {
link = touchdownDomain + '/nfl/team/' + sanitizeTeamName + '/' + data.teamId;
} else {
link = touchdownDomain + '/nfl/t/' + sanitizeTeamName + '/' + data.teamId;
}
}
break;
case 'NCAAF':
iconClass = 'ddb-icon-football';
if (params.footballSubdomain == "football") {
link = touchdownDomain + '/ncaaf/team/' + sanitizeTeamName + '/' + data.teamId;
} else {
if (houseSite == true) {
link = touchdownDomain + '/ncaaf/team/' + sanitizeTeamName + '/' + data.teamId;
} else {
link = touchdownDomain + '/ncaaf/t/' + sanitizeTeamName + '/' + data.teamId;
}
}
break;
case 'NBA':
iconClass = 'ddb-icon-basketball';
if (houseSite == true) {
link = hoopsDomain + '/NBA/team/' + sanitizeTeamName + '/' + data.teamId;
} else {
if (params.basketballSubdomain == "basketball") {
link = hoopsDomain + '/NBA/team/' + sanitizeTeamName + '/' + data.teamId;
} else {
link = hoopsDomain + '/NBA/t/' + sanitizeTeamName + '/' + data.teamId;
}
}
break;
case 'NCAAB':
iconClass = 'ddb-icon-basketball';
if (houseSite == true) {
link = hoopsDomain + '/NCAA/team/' + sanitizeTeamName + '/' + data.teamId;
} else {
if (params.basketballSubdomain == "basketball") {
link = hoopsDomain + '/NCAA/team/' + sanitizeTeamName + '/' + data.teamId;
} else {
link = hoopsDomain + '/NCAA/t/' + sanitizeTeamName + '/' + data.teamId;
}
}
break;
default:
iconClass = 'ddb-icon-list';
link = '#';
break;
}
el.innerHTML = '\n        <a target="_blank" href="' + link + '" class="ddb-brand-search-result">\n          <i class="ddb-icon ' + iconClass + '"></i>\n          ' + data.teamName + '\n        </a>\n      ';
return el;
};
var bootstrapSearchInputs = function bootstrapSearchInputs() {
searchDesktop.addEventListener('focus', focusSearch);
searchDesktop.addEventListener('keyup', debounce(keyupEvent, 200));
searchSmallDesktop.addEventListener('keyup', debounce(keyupEventSmallDesktop, 200));
searchMobile.addEventListener('keyup', debounce(keyupEventMobile, 200));
};
var res = [{"teamId":324,"teamName":"Boston Celtics","Scope":"NBA"},{"teamId":320,"teamName":"Chicago Bulls","Scope":"NBA"},{"teamId":319,"teamName":"Cleveland Cavaliers","Scope":"NBA"},{"teamId":325,"teamName":"Detroit Pistons","Scope":"NBA"},{"teamId":307,"teamName":"Indiana Pacers","Scope":"NBA"},{"teamId":334,"teamName":"Milwaukee Bucks","Scope":"NBA"},{"teamId":322,"teamName":"Toronto Raptors","Scope":"NBA"},{"teamId":332,"teamName":"Dallas Mavericks","Scope":"NBA"},{"teamId":339,"teamName":"Denver Nuggets","Scope":"NBA"},{"teamId":328,"teamName":"Houston Rockets","Scope":"NBA"},{"teamId":333,"teamName":"Memphis Grizzlies","Scope":"NBA"},{"teamId":340,"teamName":"Miami Heat","Scope":"NBA"},{"teamId":330,"teamName":"Minnesota Timberwolves","Scope":"NBA"},{"teamId":336,"teamName":"San Antonio Spurs","Scope":"NBA"},{"teamId":337,"teamName":"Utah Jazz","Scope":"NBA"},{"teamId":286,"teamName":"Golden State Warriors","Scope":"NBA"},{"teamId":326,"teamName":"Los Angeles Clippers","Scope":"NBA"},{"teamId":331,"teamName":"Los Angeles Lakers","Scope":"NBA"},{"teamId":335,"teamName":"Phoenix Suns","Scope":"NBA"},{"teamId":327,"teamName":"Portland Trail Blazers","Scope":"NBA"},{"teamId":323,"teamName":"Sacramento Kings","Scope":"NBA"},{"teamId":341,"teamName":"Oklahoma City Thunder","Scope":"NBA"},{"teamId":321,"teamName":"Brooklyn Nets","Scope":"NBA"},{"teamId":343,"teamName":"Charlotte Hornets","Scope":"NBA"},{"teamId":344,"teamName":"New York Knicks","Scope":"NBA"},{"teamId":338,"teamName":"Orlando Magic","Scope":"NBA"},{"teamId":308,"teamName":"Philadelphia 76ers","Scope":"NBA"},{"teamId":342,"teamName":"Washington Wizards","Scope":"NBA"},{"teamId":329,"teamName":"Atlanta Hawks","Scope":"NBA"},{"teamId":285,"teamName":"New Orleans Pelicans","Scope":"NBA"},{"teamId":350,"teamName":"Houston Baptist Huskies","Scope":"NCAAB"},{"teamId":351,"teamName":"Albany, N.Y. Great Danes","Scope":"NCAAB"},{"teamId":352,"teamName":"Binghamton Bearcats","Scope":"NCAAB"},{"teamId":353,"teamName":"Boston U. Terriers","Scope":"NCAAB"},{"teamId":354,"teamName":"Hartford Hawks","Scope":"NCAAB"},{"teamId":355,"teamName":"Maine Black Bears","Scope":"NCAAB"},{"teamId":356,"teamName":"New Hampshire Wildcats","Scope":"NCAAB"},{"teamId":357,"teamName":"Stony Brook Seawolves","Scope":"NCAAB"},{"teamId":358,"teamName":"UMBC Retrievers","Scope":"NCAAB"},{"teamId":359,"teamName":"Vermont Catamounts","Scope":"NCAAB"},{"teamId":360,"teamName":"Charlotte 49ers","Scope":"NCAAB"},{"teamId":361,"teamName":"Dayton Flyers","Scope":"NCAAB"},{"teamId":362,"teamName":"Duquesne Dukes","Scope":"NCAAB"},{"teamId":363,"teamName":"Fordham Rams","Scope":"NCAAB"},{"teamId":364,"teamName":"George Washington Colonials","Scope":"NCAAB"},{"teamId":365,"teamName":"La Salle Explorers","Scope":"NCAAB"},{"teamId":366,"teamName":"Rhode Island Rams","Scope":"NCAAB"},{"teamId":367,"teamName":"Richmond Spiders","Scope":"NCAAB"},{"teamId":368,"teamName":"Saint Louis Billikens","Scope":"NCAAB"},{"teamId":369,"teamName":"St. Bonaventure Bonnies","Scope":"NCAAB"},{"teamId":370,"teamName":"St. Joseph's Hawks","Scope":"NCAAB"},{"teamId":371,"teamName":"Temple Owls","Scope":"NCAAB"},{"teamId":372,"teamName":"UMass Minutemen","Scope":"NCAAB"},{"teamId":373,"teamName":"Xavier Musketeers","Scope":"NCAAB"},{"teamId":374,"teamName":"Boston College Eagles","Scope":"NCAAB"},{"teamId":375,"teamName":"Clemson Tigers","Scope":"NCAAB"},{"teamId":376,"teamName":"Duke Blue Devils","Scope":"NCAAB"},{"teamId":377,"teamName":"Florida St. Seminoles","Scope":"NCAAB"},{"teamId":378,"teamName":"Georgia Tech Yellow Jackets","Scope":"NCAAB"},{"teamId":379,"teamName":"Maryland Terrapins","Scope":"NCAAB"},{"teamId":380,"teamName":"Miami Hurricanes","Scope":"NCAAB"},{"teamId":381,"teamName":"N.C. State Wolfpack","Scope":"NCAAB"},{"teamId":382,"teamName":"North Carolina Tar Heels","Scope":"NCAAB"},{"teamId":383,"teamName":"Virginia Tech Hokies","Scope":"NCAAB"},{"teamId":384,"teamName":"Virginia Cavaliers","Scope":"NCAAB"},{"teamId":385,"teamName":"Wake Forest Demon Deacons","Scope":"NCAAB"},{"teamId":386,"teamName":"Belmont Bruins","Scope":"NCAAB"},{"teamId":387,"teamName":"Campbell Fighting Camels","Scope":"NCAAB"},{"teamId":388,"teamName":"East Tennessee State Buccaneers","Scope":"NCAAB"},{"teamId":389,"teamName":"Gardner-Webb Runnin' Bulldogs","Scope":"NCAAB"},{"teamId":390,"teamName":"Jacksonville Dolphins","Scope":"NCAAB"},{"teamId":391,"teamName":"Kennesaw St. Owls","Scope":"NCAAB"},{"teamId":392,"teamName":"Lipscomb Bisons","Scope":"NCAAB"},{"teamId":393,"teamName":"Mercer Bears","Scope":"NCAAB"},{"teamId":394,"teamName":"North Florida Ospreys","Scope":"NCAAB"},{"teamId":395,"teamName":"Stetson Hatters","Scope":"NCAAB"},{"teamId":396,"teamName":"Cincinnati Bearcats","Scope":"NCAAB"},{"teamId":397,"teamName":"Connecticut Huskies","Scope":"NCAAB"},{"teamId":398,"teamName":"DePaul Blue Demons","Scope":"NCAAB"},{"teamId":399,"teamName":"Georgetown Hoyas","Scope":"NCAAB"},{"teamId":400,"teamName":"Louisville Cardinals","Scope":"NCAAB"},{"teamId":401,"teamName":"Marquette Golden Eagles","Scope":"NCAAB"},{"teamId":402,"teamName":"Notre Dame Fighting Irish","Scope":"NCAAB"},{"teamId":403,"teamName":"Pittsburgh Panthers","Scope":"NCAAB"},{"teamId":404,"teamName":"Providence Friars","Scope":"NCAAB"},{"teamId":405,"teamName":"Rutgers Scarlet Knights","Scope":"NCAAB"},{"teamId":406,"teamName":"Seton Hall Pirates","Scope":"NCAAB"},{"teamId":407,"teamName":"South Florida Bulls","Scope":"NCAAB"},{"teamId":408,"teamName":"St. John's Red Storm","Scope":"NCAAB"},{"teamId":409,"teamName":"Syracuse Orange","Scope":"NCAAB"},{"teamId":410,"teamName":"Villanova Wildcats","Scope":"NCAAB"},{"teamId":411,"teamName":"West Virginia Mountaineers","Scope":"NCAAB"},{"teamId":412,"teamName":"Eastern Washington Eagles","Scope":"NCAAB"},{"teamId":413,"teamName":"Idaho St. Bengals","Scope":"NCAAB"},{"teamId":414,"teamName":"Montana St. Bobcats","Scope":"NCAAB"},{"teamId":415,"teamName":"Montana Grizzlies","Scope":"NCAAB"},{"teamId":416,"teamName":"Northern Arizona Lumberjacks","Scope":"NCAAB"},{"teamId":417,"teamName":"Northern Colorado Bears","Scope":"NCAAB"},{"teamId":418,"teamName":"Portland St. Vikings","Scope":"NCAAB"},{"teamId":419,"teamName":"Sacramento St. Hornets","Scope":"NCAAB"},{"teamId":420,"teamName":"Weber St. Wildcats","Scope":"NCAAB"},{"teamId":421,"teamName":"Charleston Southern Buccaneers","Scope":"NCAAB"},{"teamId":422,"teamName":"Coastal Carolina Chanticleers","Scope":"NCAAB"},{"teamId":423,"teamName":"High Point Panthers","Scope":"NCAAB"},{"teamId":424,"teamName":"Liberty Flames","Scope":"NCAAB"},{"teamId":425,"teamName":"UNC-Asheville Bulldogs","Scope":"NCAAB"},{"teamId":426,"teamName":"Radford Highlanders","Scope":"NCAAB"},{"teamId":427,"teamName":"Virginia Military Keydets","Scope":"NCAAB"},{"teamId":428,"teamName":"Winthrop Eagles","Scope":"NCAAB"},{"teamId":429,"teamName":"Illinois Fighting Illini","Scope":"NCAAB"},{"teamId":430,"teamName":"Indiana Hoosiers","Scope":"NCAAB"},{"teamId":431,"teamName":"Iowa Hawkeyes","Scope":"NCAAB"},{"teamId":432,"teamName":"Michigan St. Spartans","Scope":"NCAAB"},{"teamId":433,"teamName":"Michigan Wolverines","Scope":"NCAAB"},{"teamId":434,"teamName":"Minnesota Golden Gophers","Scope":"NCAAB"},{"teamId":435,"teamName":"Northwestern Wildcats","Scope":"NCAAB"},{"teamId":436,"teamName":"Ohio St. Buckeyes","Scope":"NCAAB"},{"teamId":437,"teamName":"Penn St. Nittany Lions","Scope":"NCAAB"},{"teamId":438,"teamName":"Purdue Boilermakers","Scope":"NCAAB"},{"teamId":439,"teamName":"Wisconsin Badgers","Scope":"NCAAB"},{"teamId":440,"teamName":"Baylor Bears","Scope":"NCAAB"},{"teamId":441,"teamName":"Colorado Buffaloes","Scope":"NCAAB"},{"teamId":442,"teamName":"Iowa St. Cyclones","Scope":"NCAAB"},{"teamId":443,"teamName":"Kansas St. Wildcats","Scope":"NCAAB"},{"teamId":444,"teamName":"Kansas Jayhawks","Scope":"NCAAB"},{"teamId":445,"teamName":"Missouri Tigers","Scope":"NCAAB"},{"teamId":446,"teamName":"Nebraska Cornhuskers","Scope":"NCAAB"},{"teamId":447,"teamName":"Oklahoma St. Cowboys","Scope":"NCAAB"},{"teamId":448,"teamName":"Oklahoma Sooners","Scope":"NCAAB"},{"teamId":449,"teamName":"Texas A&amp;M Aggies","Scope":"NCAAB"},{"teamId":450,"teamName":"Texas Tech Red Raiders","Scope":"NCAAB"},{"teamId":451,"teamName":"Texas Longhorns","Scope":"NCAAB"},{"teamId":452,"teamName":"Cal Poly-SLO Mustangs","Scope":"NCAAB"},{"teamId":453,"teamName":"Cal. St.-Fullerton Titans","Scope":"NCAAB"},{"teamId":454,"teamName":"Cal. St.-Northridge Matadors","Scope":"NCAAB"},{"teamId":455,"teamName":"Long Beach St. 49ers","Scope":"NCAAB"},{"teamId":456,"teamName":"Pacific Tigers","Scope":"NCAAB"},{"teamId":457,"teamName":"UC Irvine Anteaters","Scope":"NCAAB"},{"teamId":458,"teamName":"UC Riverside Highlanders","Scope":"NCAAB"},{"teamId":459,"teamName":"UC Santa Barbara Gauchos","Scope":"NCAAB"},{"teamId":460,"teamName":"Delaware Blue Hens","Scope":"NCAAB"},{"teamId":461,"teamName":"Drexel Dragons","Scope":"NCAAB"},{"teamId":462,"teamName":"George Mason Patriots","Scope":"NCAAB"},{"teamId":463,"teamName":"Georgia State Panthers","Scope":"NCAAB"},{"teamId":464,"teamName":"Hofstra Pride","Scope":"NCAAB"},{"teamId":465,"teamName":"James Madison Dukes","Scope":"NCAAB"},{"teamId":466,"teamName":"UNC-Wilmington Seahawks","Scope":"NCAAB"},{"teamId":467,"teamName":"Northeastern Huskies","Scope":"NCAAB"},{"teamId":468,"teamName":"Old Dominion Monarchs","Scope":"NCAAB"},{"teamId":469,"teamName":"Towson Tigers","Scope":"NCAAB"},{"teamId":470,"teamName":"Va. Commonwealth Rams","Scope":"NCAAB"},{"teamId":471,"teamName":"William &amp; Mary Tribe","Scope":"NCAAB"},{"teamId":472,"teamName":"Central Florida Knights","Scope":"NCAAB"},{"teamId":473,"teamName":"East Carolina Pirates","Scope":"NCAAB"},{"teamId":474,"teamName":"Houston Cougars","Scope":"NCAAB"},{"teamId":475,"teamName":"Marshall Thundering Herd","Scope":"NCAAB"},{"teamId":476,"teamName":"Memphis Tigers","Scope":"NCAAB"},{"teamId":477,"teamName":"Rice Owls","Scope":"NCAAB"},{"teamId":478,"teamName":"SMU Mustangs","Scope":"NCAAB"},{"teamId":479,"teamName":"Southern Miss. Golden Eagles","Scope":"NCAAB"},{"teamId":480,"teamName":"Tulane Green Wave","Scope":"NCAAB"},{"teamId":481,"teamName":"Tulsa Golden Hurricane","Scope":"NCAAB"},{"teamId":482,"teamName":"UAB Blazers","Scope":"NCAAB"},{"teamId":483,"teamName":"UTEP Miners","Scope":"NCAAB"},{"teamId":484,"teamName":"Chicago St. Cougars","Scope":"NCAAB"},{"teamId":485,"teamName":"IPFW Mastodons","Scope":"NCAAB"},{"teamId":486,"teamName":"Longwood Lancers","Scope":"NCAAB"},{"teamId":487,"teamName":"North Dakota St. Bison","Scope":"NCAAB"},{"teamId":488,"teamName":"Savannah St. Tigers","Scope":"NCAAB"},{"teamId":489,"teamName":"South Dakota St. Jackrabbits","Scope":"NCAAB"},{"teamId":490,"teamName":"Texas-Rio Grande Valley Vaqueros","Scope":"NCAAB"},{"teamId":491,"teamName":"UC Davis Aggies","Scope":"NCAAB"},{"teamId":492,"teamName":"Utah Valley St. Wolverines","Scope":"NCAAB"},{"teamId":493,"teamName":"Butler Bulldogs","Scope":"NCAAB"},{"teamId":494,"teamName":"Cleveland St. Vikings","Scope":"NCAAB"},{"teamId":495,"teamName":"Detroit Titans","Scope":"NCAAB"},{"teamId":496,"teamName":"Ill.-Chicago Flames","Scope":"NCAAB"},{"teamId":497,"teamName":"Loyola of Chicago Ramblers","Scope":"NCAAB"},{"teamId":498,"teamName":"Wis.-Green Bay Phoenix","Scope":"NCAAB"},{"teamId":499,"teamName":"Wis.-Milwaukee Panthers","Scope":"NCAAB"},{"teamId":500,"teamName":"Wright St. Raiders","Scope":"NCAAB"},{"teamId":501,"teamName":"Youngstown St. Penguins","Scope":"NCAAB"},{"teamId":502,"teamName":"Brown Bears","Scope":"NCAAB"},{"teamId":503,"teamName":"Columbia Lions","Scope":"NCAAB"},{"teamId":504,"teamName":"Cornell Big Red","Scope":"NCAAB"},{"teamId":505,"teamName":"Dartmouth Big Green","Scope":"NCAAB"},{"teamId":506,"teamName":"Harvard Crimson","Scope":"NCAAB"},{"teamId":507,"teamName":"Penn Quakers","Scope":"NCAAB"},{"teamId":508,"teamName":"Princeton Tigers","Scope":"NCAAB"},{"teamId":509,"teamName":"Yale Bulldogs","Scope":"NCAAB"},{"teamId":510,"teamName":"Canisius Golden Griffins","Scope":"NCAAB"},{"teamId":511,"teamName":"Fairfield Stags","Scope":"NCAAB"},{"teamId":512,"teamName":"Iona Gaels","Scope":"NCAAB"},{"teamId":513,"teamName":"Loyola, Md. Greyhounds","Scope":"NCAAB"},{"teamId":514,"teamName":"Manhattan Jaspers","Scope":"NCAAB"},{"teamId":515,"teamName":"Marist Red Foxes","Scope":"NCAAB"},{"teamId":516,"teamName":"Niagara Purple Eagles","Scope":"NCAAB"},{"teamId":517,"teamName":"Rider Broncs","Scope":"NCAAB"},{"teamId":518,"teamName":"Siena Saints","Scope":"NCAAB"},{"teamId":519,"teamName":"St. Peter's Peacocks","Scope":"NCAAB"},{"teamId":520,"teamName":"Akron Zips","Scope":"NCAAB"},{"teamId":521,"teamName":"Bowling Green State Falcons","Scope":"NCAAB"},{"teamId":522,"teamName":"Buffalo Bulls","Scope":"NCAAB"},{"teamId":523,"teamName":"Kent St. Golden Flashes","Scope":"NCAAB"},{"teamId":524,"teamName":"Miami (Ohio) RedHawks","Scope":"NCAAB"},{"teamId":525,"teamName":"Ohio Bobcats","Scope":"NCAAB"},{"teamId":526,"teamName":"Ball St. Cardinals","Scope":"NCAAB"},{"teamId":527,"teamName":"Central Michigan Chippewas","Scope":"NCAAB"},{"teamId":528,"teamName":"Eastern Michigan Eagles","Scope":"NCAAB"},{"teamId":529,"teamName":"Northern Illinois Huskies","Scope":"NCAAB"},{"teamId":530,"teamName":"Toledo Rockets","Scope":"NCAAB"},{"teamId":531,"teamName":"Western Michigan Broncos","Scope":"NCAAB"},{"teamId":532,"teamName":"IUPU-Indianapolis Jaguars","Scope":"NCAAB"},{"teamId":533,"teamName":"Oakland, Mich. Golden Grizzlies","Scope":"NCAAB"},{"teamId":534,"teamName":"Oral Roberts Golden Eagles","Scope":"NCAAB"},{"teamId":535,"teamName":"Southern Utah Thunderbirds","Scope":"NCAAB"},{"teamId":536,"teamName":"UMKC Kangaroos","Scope":"NCAAB"},{"teamId":537,"teamName":"Valparaiso Crusaders","Scope":"NCAAB"},{"teamId":538,"teamName":"Western Illinois Leathernecks","Scope":"NCAAB"},{"teamId":539,"teamName":"Bethune-Cookman Wildcats","Scope":"NCAAB"},{"teamId":540,"teamName":"Coppin St. Eagles","Scope":"NCAAB"},{"teamId":541,"teamName":"Delaware St. Hornets","Scope":"NCAAB"},{"teamId":542,"teamName":"Florida A&amp;M Rattlers","Scope":"NCAAB"},{"teamId":543,"teamName":"Hampton Pirates","Scope":"NCAAB"},{"teamId":544,"teamName":"Howard Bison","Scope":"NCAAB"},{"teamId":545,"teamName":"Md.-Eastern Shore Hawks","Scope":"NCAAB"},{"teamId":546,"teamName":"Morgan St. Bears","Scope":"NCAAB"},{"teamId":547,"teamName":"N.C. A&amp;T Aggies","Scope":"NCAAB"},{"teamId":548,"teamName":"Norfolk St. Spartans","Scope":"NCAAB"},{"teamId":549,"teamName":"South Carolina State Bulldogs","Scope":"NCAAB"},{"teamId":550,"teamName":"Bradley Braves","Scope":"NCAAB"},{"teamId":551,"teamName":"Creighton Bluejays","Scope":"NCAAB"},{"teamId":552,"teamName":"Drake Bulldogs","Scope":"NCAAB"},{"teamId":553,"teamName":"Evansville Purple Aces","Scope":"NCAAB"},{"teamId":554,"teamName":"Illinois St. Redbirds","Scope":"NCAAB"},{"teamId":555,"teamName":"Indiana St. Sycamores","Scope":"NCAAB"},{"teamId":556,"teamName":"Missouri St. Bears","Scope":"NCAAB"},{"teamId":557,"teamName":"Northern Iowa Panthers","Scope":"NCAAB"},{"teamId":558,"teamName":"Southern Illinois Salukis","Scope":"NCAAB"},{"teamId":559,"teamName":"Wichita St. Shockers","Scope":"NCAAB"},{"teamId":560,"teamName":"Air Force Falcons","Scope":"NCAAB"},{"teamId":561,"teamName":"BYU Cougars","Scope":"NCAAB"},{"teamId":562,"teamName":"Colorado St. Rams","Scope":"NCAAB"},{"teamId":563,"teamName":"New Mexico Lobos","Scope":"NCAAB"},{"teamId":564,"teamName":"San Diego St. Aztecs","Scope":"NCAAB"},{"teamId":565,"teamName":"TCU Horned Frogs","Scope":"NCAAB"},{"teamId":566,"teamName":"UNLV Rebels","Scope":"NCAAB"},{"teamId":567,"teamName":"Utah Utes","Scope":"NCAAB"},{"teamId":568,"teamName":"Wyoming Cowboys","Scope":"NCAAB"},{"teamId":569,"teamName":"Central Connecticut St. Blue Devils","Scope":"NCAAB"},{"teamId":570,"teamName":"Fairleigh Dickinson Knights","Scope":"NCAAB"},{"teamId":571,"teamName":"Long Island U. Blackbirds","Scope":"NCAAB"},{"teamId":572,"teamName":"Monmouth, N.J. Hawks","Scope":"NCAAB"},{"teamId":573,"teamName":"Mount St. Mary's, Md. Mountaineers","Scope":"NCAAB"},{"teamId":574,"teamName":"Quinnipiac Bobcats","Scope":"NCAAB"},{"teamId":575,"teamName":"Robert Morris Colonials","Scope":"NCAAB"},{"teamId":576,"teamName":"Sacred Heart Pioneers","Scope":"NCAAB"},{"teamId":577,"teamName":"St. Francis, NY Terriers","Scope":"NCAAB"},{"teamId":578,"teamName":"St. Francis, Pa. Red Flash","Scope":"NCAAB"},{"teamId":579,"teamName":"Wagner Seahawks","Scope":"NCAAB"},{"teamId":580,"teamName":"Austin Peay Governors","Scope":"NCAAB"},{"teamId":581,"teamName":"Eastern Illinois Panthers","Scope":"NCAAB"},{"teamId":582,"teamName":"Eastern Kentucky Colonels","Scope":"NCAAB"},{"teamId":583,"teamName":"Jacksonville St. Gamecocks","Scope":"NCAAB"},{"teamId":584,"teamName":"Morehead St. Eagles","Scope":"NCAAB"},{"teamId":585,"teamName":"Murray St. Racers","Scope":"NCAAB"},{"teamId":586,"teamName":"Samford Bulldogs","Scope":"NCAAB"},{"teamId":587,"teamName":"SE Missouri St. Redhawks","Scope":"NCAAB"},{"teamId":588,"teamName":"Tennessee St. Tigers","Scope":"NCAAB"},{"teamId":589,"teamName":"Tennessee Tech Golden Eagles","Scope":"NCAAB"},{"teamId":590,"teamName":"Tenn.-Martin Skyhawks","Scope":"NCAAB"},{"teamId":591,"teamName":"Arizona St. Sun Devils","Scope":"NCAAB"},{"teamId":592,"teamName":"Arizona Wildcats","Scope":"NCAAB"},{"teamId":593,"teamName":"California Golden Bears","Scope":"NCAAB"},{"teamId":594,"teamName":"Oregon St. Beavers","Scope":"NCAAB"},{"teamId":595,"teamName":"Oregon Ducks","Scope":"NCAAB"},{"teamId":596,"teamName":"Stanford Cardinal","Scope":"NCAAB"},{"teamId":597,"teamName":"UCLA Bruins","Scope":"NCAAB"},{"teamId":598,"teamName":"USC Trojans","Scope":"NCAAB"},{"teamId":599,"teamName":"Washington St. Cougars","Scope":"NCAAB"},{"teamId":600,"teamName":"Washington Huskies","Scope":"NCAAB"},{"teamId":601,"teamName":"American Eagles","Scope":"NCAAB"},{"teamId":602,"teamName":"Army Black Knights","Scope":"NCAAB"},{"teamId":603,"teamName":"Bucknell Bison","Scope":"NCAAB"},{"teamId":604,"teamName":"Colgate Raiders","Scope":"NCAAB"},{"teamId":605,"teamName":"Holy Cross Saints","Scope":"NCAAB"},{"teamId":606,"teamName":"Lafayette Leopards","Scope":"NCAAB"},{"teamId":607,"teamName":"Lehigh Mountain Hawks","Scope":"NCAAB"},{"teamId":608,"teamName":"Navy Midshipmen","Scope":"NCAAB"},{"teamId":609,"teamName":"Florida Gators","Scope":"NCAAB"},{"teamId":610,"teamName":"Georgia Bulldogs","Scope":"NCAAB"},{"teamId":611,"teamName":"Kentucky Wildcats","Scope":"NCAAB"},{"teamId":612,"teamName":"South Carolina Gamecocks","Scope":"NCAAB"},{"teamId":613,"teamName":"Tennessee Volunteers","Scope":"NCAAB"},{"teamId":614,"teamName":"Vanderbilt Commodores","Scope":"NCAAB"},{"teamId":615,"teamName":"Alabama Crimson Tide","Scope":"NCAAB"},{"teamId":616,"teamName":"Arkansas Razorbacks","Scope":"NCAAB"},{"teamId":617,"teamName":"Auburn Tigers","Scope":"NCAAB"},{"teamId":618,"teamName":"LSU Tigers","Scope":"NCAAB"},{"teamId":619,"teamName":"Mississippi St. Bulldogs","Scope":"NCAAB"},{"teamId":620,"teamName":"Mississippi Rebels","Scope":"NCAAB"},{"teamId":621,"teamName":"Appalachian St. Mountaineers","Scope":"NCAAB"},{"teamId":622,"teamName":"Chattanooga Mocs","Scope":"NCAAB"},{"teamId":623,"teamName":"Elon Phoenix","Scope":"NCAAB"},{"teamId":624,"teamName":"UNC Greensboro Spartans","Scope":"NCAAB"},{"teamId":625,"teamName":"Western Carolina Catamounts","Scope":"NCAAB"},{"teamId":626,"teamName":"Charleston Cougars","Scope":"NCAAB"},{"teamId":627,"teamName":"Davidson Wildcats","Scope":"NCAAB"},{"teamId":628,"teamName":"Furman Paladins","Scope":"NCAAB"},{"teamId":629,"teamName":"Georgia Southern Eagles","Scope":"NCAAB"},{"teamId":630,"teamName":"The Citadel Bulldogs","Scope":"NCAAB"},{"teamId":631,"teamName":"Wofford Terriers","Scope":"NCAAB"},{"teamId":632,"teamName":"Central Arkansas Bears","Scope":"NCAAB"},{"teamId":633,"teamName":"Lamar Cardinals","Scope":"NCAAB"},{"teamId":634,"teamName":"McNeese St. Cowboys","Scope":"NCAAB"},{"teamId":635,"teamName":"Nicholls Colonels","Scope":"NCAAB"},{"teamId":636,"teamName":"Northwestern St. Demons","Scope":"NCAAB"},{"teamId":637,"teamName":"Sam Houston St. Bearkats","Scope":"NCAAB"},{"teamId":638,"teamName":"SE Louisiana Lions","Scope":"NCAAB"},{"teamId":639,"teamName":"Stephen F. Austin Lumberjacks","Scope":"NCAAB"},{"teamId":640,"teamName":"Texas A&amp;M-Corpus Christi Islanders","Scope":"NCAAB"},{"teamId":641,"teamName":"Texas State Bobcats","Scope":"NCAAB"},{"teamId":642,"teamName":"Texas-Arlington Mavericks","Scope":"NCAAB"},{"teamId":643,"teamName":"Texas-San Antonio Roadrunners","Scope":"NCAAB"},{"teamId":644,"teamName":"Alabama A&amp;M Bulldogs","Scope":"NCAAB"},{"teamId":645,"teamName":"Alabama St. Hornets","Scope":"NCAAB"},{"teamId":646,"teamName":"Alcorn St. Braves","Scope":"NCAAB"},{"teamId":647,"teamName":"Ark.-Pine Bluff Golden Lions","Scope":"NCAAB"},{"teamId":648,"teamName":"Grambling St. Tigers","Scope":"NCAAB"},{"teamId":649,"teamName":"Jackson St. Tigers","Scope":"NCAAB"},{"teamId":650,"teamName":"MVSU Delta Devils","Scope":"NCAAB"},{"teamId":651,"teamName":"Prairie View Panthers","Scope":"NCAAB"},{"teamId":652,"teamName":"Southern U. Jaguars","Scope":"NCAAB"},{"teamId":653,"teamName":"Texas Southern Tigers","Scope":"NCAAB"},{"teamId":654,"teamName":"Fla. International Panthers","Scope":"NCAAB"},{"teamId":655,"teamName":"Florida Atlantic Owls","Scope":"NCAAB"},{"teamId":656,"teamName":"Middle Tenn. St. Blue Raiders","Scope":"NCAAB"},{"teamId":657,"teamName":"South Alabama Jaguars","Scope":"NCAAB"},{"teamId":658,"teamName":"Troy Trojans","Scope":"NCAAB"},{"teamId":659,"teamName":"Western Kentucky Hilltoppers","Scope":"NCAAB"},{"teamId":660,"teamName":"Ark.-Little Rock Trojans","Scope":"NCAAB"},{"teamId":661,"teamName":"Arkansas St. Red Wolves","Scope":"NCAAB"},{"teamId":662,"teamName":"Denver Pioneers","Scope":"NCAAB"},{"teamId":663,"teamName":"Louisiana Ragin' Cajuns","Scope":"NCAAB"},{"teamId":664,"teamName":"ULM Warhawks","Scope":"NCAAB"},{"teamId":665,"teamName":"New Orleans Privateers","Scope":"NCAAB"},{"teamId":666,"teamName":"North Texas Mean Green","Scope":"NCAAB"},{"teamId":667,"teamName":"Gonzaga Bulldogs","Scope":"NCAAB"},{"teamId":668,"teamName":"Loyola Marymount Lions","Scope":"NCAAB"},{"teamId":669,"teamName":"Pepperdine Waves","Scope":"NCAAB"},{"teamId":670,"teamName":"Portland Pilots","Scope":"NCAAB"},{"teamId":671,"teamName":"San Diego Toreros","Scope":"NCAAB"},{"teamId":672,"teamName":"San Francisco Dons","Scope":"NCAAB"},{"teamId":673,"teamName":"Santa Clara Broncos","Scope":"NCAAB"},{"teamId":674,"teamName":"St. Mary's, Calif. Gaels","Scope":"NCAAB"},{"teamId":675,"teamName":"Boise State Broncos","Scope":"NCAAB"},{"teamId":676,"teamName":"Fresno St. Bulldogs","Scope":"NCAAB"},{"teamId":677,"teamName":"Hawaii Rainbow Warriors","Scope":"NCAAB"},{"teamId":678,"teamName":"Idaho Vandals","Scope":"NCAAB"},{"teamId":679,"teamName":"Louisiana Tech Bulldogs","Scope":"NCAAB"},{"teamId":680,"teamName":"Nevada Wolf Pack","Scope":"NCAAB"},{"teamId":681,"teamName":"New Mexico St. Aggies","Scope":"NCAAB"},{"teamId":682,"teamName":"San Jose St. Spartans","Scope":"NCAAB"},{"teamId":683,"teamName":"Utah State Aggies","Scope":"NCAAB"},{"teamId":684,"teamName":"Cal State Bakersfield Roadrunners","Scope":"NCAAB"},{"teamId":685,"teamName":"N.C. Central Eagles","Scope":"NCAAB"},{"teamId":686,"teamName":"Florida Gulf Coast Eagles","Scope":"NCAAB"},{"teamId":687,"teamName":"Grand Canyon Antelopes","Scope":"NCAAB"},{"teamId":688,"teamName":"Northern Kentucky Norse","Scope":"NCAAB"},{"teamId":689,"teamName":"SIU-Edwardsville Cougars","Scope":"NCAAB"},{"teamId":690,"teamName":"Seattle Redhawks","Scope":"NCAAB"},{"teamId":691,"teamName":"Abilene Christian Wildcats","Scope":"NCAAB"},{"teamId":692,"teamName":"Nebraska-Omaha Mavericks","Scope":"NCAAB"},{"teamId":693,"teamName":"North Dakota Fighting Hawks","Scope":"NCAAB"},{"teamId":694,"teamName":"South Dakota Coyotes","Scope":"NCAAB"},{"teamId":695,"teamName":"Bryant Bulldogs","Scope":"NCAAB"},{"teamId":696,"teamName":"USC Upstate Spartans","Scope":"NCAAB"},{"teamId":697,"teamName":"Presbyterian Blue Hose","Scope":"NCAAB"},{"teamId":698,"teamName":"Incarnate Word Cardinals","Scope":"NCAAB"},{"teamId":699,"teamName":"NJIT Highlanders","Scope":"NCAAB"},{"teamId":700,"teamName":"UMass-Lowell River Hawks","Scope":"NCAAB"},{"teamId":2799,"teamName":"Baltimore Orioles","Scope":"MLB"},{"teamId":2810,"teamName":"Minnesota Twins","Scope":"MLB"},{"teamId":2792,"teamName":"Los Angeles Angels","Scope":"MLB"},{"teamId":2808,"teamName":"Oakland Athletics","Scope":"MLB"},{"teamId":2804,"teamName":"Seattle Mariners","Scope":"MLB"},{"teamId":2807,"teamName":"Texas Rangers","Scope":"MLB"},{"teamId":2796,"teamName":"Atlanta Braves","Scope":"MLB"},{"teamId":2814,"teamName":"Miami Marlins","Scope":"MLB"},{"teamId":2813,"teamName":"Washington Nationals","Scope":"MLB"},{"teamId":2812,"teamName":"New York Mets","Scope":"MLB"},{"teamId":2815,"teamName":"Philadelphia Phillies","Scope":"MLB"},{"teamId":2791,"teamName":"Boston Red Sox","Scope":"MLB"},{"teamId":2795,"teamName":"Chicago Cubs","Scope":"MLB"},{"teamId":2816,"teamName":"Cincinnati Reds","Scope":"MLB"},{"teamId":2811,"teamName":"Houston Astros","Scope":"MLB"},{"teamId":2801,"teamName":"Milwaukee Brewers","Scope":"MLB"},{"teamId":2817,"teamName":"Pittsburgh Pirates","Scope":"MLB"},{"teamId":2805,"teamName":"St. Louis Cardinals","Scope":"MLB"},{"teamId":2793,"teamName":"Arizona Diamondbacks","Scope":"MLB"},{"teamId":2800,"teamName":"Colorado Rockies","Scope":"MLB"},{"teamId":2818,"teamName":"Los Angeles Dodgers","Scope":"MLB"},{"teamId":2794,"teamName":"San Diego Padres","Scope":"MLB"},{"teamId":2803,"teamName":"New York Yankees","Scope":"MLB"},{"teamId":2819,"teamName":"San Francisco Giants","Scope":"MLB"},{"teamId":2798,"teamName":"Tampa Bay Rays","Scope":"MLB"},{"teamId":2802,"teamName":"Toronto Blue Jays","Scope":"MLB"},{"teamId":2790,"teamName":"Chicago White Sox","Scope":"MLB"},{"teamId":2809,"teamName":"Cleveland Indians","Scope":"MLB"},{"teamId":2797,"teamName":"Detroit Tigers","Scope":"MLB"},{"teamId":2806,"teamName":"Kansas City Royals","Scope":"MLB"},{"teamId":135,"teamName":"Buffalo Bills","Scope":"NFL"},{"teamId":136,"teamName":"Miami Dolphins","Scope":"NFL"},{"teamId":137,"teamName":"New York Jets","Scope":"NFL"},{"teamId":138,"teamName":"New England Patriots","Scope":"NFL"},{"teamId":139,"teamName":"Cincinnati Bengals","Scope":"NFL"},{"teamId":140,"teamName":"Cleveland Browns","Scope":"NFL"},{"teamId":141,"teamName":"Baltimore Ravens","Scope":"NFL"},{"teamId":142,"teamName":"Pittsburgh Steelers","Scope":"NFL"},{"teamId":143,"teamName":"Indianapolis Colts","Scope":"NFL"},{"teamId":144,"teamName":"Jacksonville Jaguars","Scope":"NFL"},{"teamId":145,"teamName":"Houston Texans","Scope":"NFL"},{"teamId":146,"teamName":"Tennessee Titans","Scope":"NFL"},{"teamId":147,"teamName":"Denver Broncos","Scope":"NFL"},{"teamId":148,"teamName":"San Diego Chargers","Scope":"NFL"},{"teamId":149,"teamName":"Kansas City Chiefs","Scope":"NFL"},{"teamId":150,"teamName":"Oakland Raiders","Scope":"NFL"},{"teamId":151,"teamName":"Dallas Cowboys","Scope":"NFL"},{"teamId":152,"teamName":"Philadelphia Eagles","Scope":"NFL"},{"teamId":153,"teamName":"New York Giants","Scope":"NFL"},{"teamId":154,"teamName":"Washington Redskins","Scope":"NFL"},{"teamId":155,"teamName":"Chicago Bears","Scope":"NFL"},{"teamId":156,"teamName":"Detroit Lions","Scope":"NFL"},{"teamId":157,"teamName":"Green Bay Packers","Scope":"NFL"},{"teamId":158,"teamName":"Minnesota Vikings","Scope":"NFL"},{"teamId":159,"teamName":"Tampa Bay Buccaneers","Scope":"NFL"},{"teamId":160,"teamName":"Atlanta Falcons","Scope":"NFL"},{"teamId":161,"teamName":"Carolina Panthers","Scope":"NFL"},{"teamId":162,"teamName":"New Orleans Saints","Scope":"NFL"},{"teamId":163,"teamName":"San Francisco 49ers","Scope":"NFL"},{"teamId":164,"teamName":"Arizona Cardinals","Scope":"NFL"},{"teamId":165,"teamName":"Los Angeles Rams","Scope":"NFL"},{"teamId":166,"teamName":"Seattle Seahawks","Scope":"NFL"},{"teamId":16,"teamName":"Louisville Cardinals","Scope":"NCAAF"},{"teamId":17,"teamName":"Wake Forest Demon Deacons","Scope":"NCAAF"},{"teamId":18,"teamName":"Boston College Eagles","Scope":"NCAAF"},{"teamId":19,"teamName":"Syracuse Orange","Scope":"NCAAF"},{"teamId":20,"teamName":"Florida State Seminoles","Scope":"NCAAF"},{"teamId":21,"teamName":"North Carolina State Wolfpack","Scope":"NCAAF"},{"teamId":22,"teamName":"Duke Blue Devils","Scope":"NCAAF"},{"teamId":23,"teamName":"Virginia Cavaliers","Scope":"NCAAF"},{"teamId":24,"teamName":"Virginia Tech Hokies","Scope":"NCAAF"},{"teamId":25,"teamName":"Miami (FL) Hurricanes","Scope":"NCAAF"},{"teamId":26,"teamName":"North Carolina Tar Heels","Scope":"NCAAF"},{"teamId":27,"teamName":"Georgia Tech Yellow Jackets","Scope":"NCAAF"},{"teamId":28,"teamName":"South Florida Bulls","Scope":"NCAAF"},{"teamId":29,"teamName":"Connecticut Huskies","Scope":"NCAAF"},{"teamId":30,"teamName":"UCF Knights","Scope":"NCAAF"},{"teamId":31,"teamName":"Temple Owls","Scope":"NCAAF"},{"teamId":32,"teamName":"East Carolina Pirates","Scope":"NCAAF"},{"teamId":33,"teamName":"Tulsa Golden Hurricane","Scope":"NCAAF"},{"teamId":34,"teamName":"Tulane Green Wave","Scope":"NCAAF"},{"teamId":35,"teamName":"Navy Midshipmen","Scope":"NCAAF"},{"teamId":36,"teamName":"Southern Methodist Mustangs","Scope":"NCAAF"},{"teamId":37,"teamName":"Memphis Tigers","Scope":"NCAAF"},{"teamId":38,"teamName":"Ohio State Buckeyes","Scope":"NCAAF"},{"teamId":39,"teamName":"Indiana Hoosiers","Scope":"NCAAF"},{"teamId":40,"teamName":"Penn State Nittany Lions","Scope":"NCAAF"},{"teamId":41,"teamName":"Rutgers Scarlet Knights","Scope":"NCAAF"},{"teamId":42,"teamName":"Michigan State Spartans","Scope":"NCAAF"},{"teamId":43,"teamName":"Maryland Terrapins","Scope":"NCAAF"},{"teamId":44,"teamName":"Michigan Wolverines","Scope":"NCAAF"},{"teamId":45,"teamName":"Wisconsin Badgers","Scope":"NCAAF"},{"teamId":46,"teamName":"Purdue Boilermakers","Scope":"NCAAF"},{"teamId":47,"teamName":"Nebraska Cornhuskers","Scope":"NCAAF"},{"teamId":48,"teamName":"Illinois Fighting Illini","Scope":"NCAAF"},{"teamId":49,"teamName":"Iowa Hawkeyes","Scope":"NCAAF"},{"teamId":50,"teamName":"Northwestern Wildcats","Scope":"NCAAF"},{"teamId":51,"teamName":"Charlotte 49ers","Scope":"NCAAF"},{"teamId":52,"teamName":"Middle Tennessee Blue Raiders","Scope":"NCAAF"},{"teamId":53,"teamName":"Florida International Golden Panthers","Scope":"NCAAF"},{"teamId":54,"teamName":"Western Kentucky Hilltoppers","Scope":"NCAAF"},{"teamId":55,"teamName":"Old Dominion Monarchs","Scope":"NCAAF"},{"teamId":56,"teamName":"Florida Atlantic Owls","Scope":"NCAAF"},{"teamId":57,"teamName":"Marshall Thundering Herd","Scope":"NCAAF"},{"teamId":58,"teamName":"Louisiana Tech Bulldogs","Scope":"NCAAF"},{"teamId":59,"teamName":"Southern Miss Golden Eagles","Scope":"NCAAF"},{"teamId":60,"teamName":"North Texas Mean Green","Scope":"NCAAF"},{"teamId":61,"teamName":"UTEP Miners","Scope":"NCAAF"},{"teamId":62,"teamName":"Rice Owls","Scope":"NCAAF"},{"teamId":63,"teamName":"UTSA Roadrunners","Scope":"NCAAF"},{"teamId":64,"teamName":"Ohio Bobcats","Scope":"NCAAF"},{"teamId":65,"teamName":"Bowling Green Falcons","Scope":"NCAAF"},{"teamId":66,"teamName":"Kent State Golden Flashes","Scope":"NCAAF"},{"teamId":67,"teamName":"Miami (OH) RedHawks","Scope":"NCAAF"},{"teamId":68,"teamName":"Akron Zips","Scope":"NCAAF"},{"teamId":69,"teamName":"Western Michigan Broncos","Scope":"NCAAF"},{"teamId":70,"teamName":"Ball State Cardinals","Scope":"NCAAF"},{"teamId":71,"teamName":"Central Michigan Chippewas","Scope":"NCAAF"},{"teamId":72,"teamName":"Eastern Michigan Eagles","Scope":"NCAAF"},{"teamId":73,"teamName":"Northern Illinois Huskies","Scope":"NCAAF"},{"teamId":74,"teamName":"Toledo Rockets","Scope":"NCAAF"},{"teamId":75,"teamName":"Utah State Aggies","Scope":"NCAAF"},{"teamId":76,"teamName":"Boise State Broncos","Scope":"NCAAF"},{"teamId":77,"teamName":"Wyoming Cowboys","Scope":"NCAAF"},{"teamId":78,"teamName":"Air Force Falcons","Scope":"NCAAF"},{"teamId":79,"teamName":"New Mexico Lobos","Scope":"NCAAF"},{"teamId":80,"teamName":"Colorado State Rams","Scope":"NCAAF"},{"teamId":81,"teamName":"San Diego State Aztecs","Scope":"NCAAF"},{"teamId":82,"teamName":"Fresno State Bulldogs","Scope":"NCAAF"},{"teamId":83,"teamName":"UNLV Rebels","Scope":"NCAAF"},{"teamId":84,"teamName":"San Jose State Spartans","Scope":"NCAAF"},{"teamId":85,"teamName":"Hawaii Warriors","Scope":"NCAAF"},{"teamId":86,"teamName":"Nevada Wolf Pack","Scope":"NCAAF"},{"teamId":87,"teamName":"UCLA Bruins","Scope":"NCAAF"},{"teamId":88,"teamName":"Colorado Buffaloes","Scope":"NCAAF"},{"teamId":89,"teamName":"Arizona State Sun Devils","Scope":"NCAAF"},{"teamId":90,"teamName":"USC Trojans","Scope":"NCAAF"},{"teamId":91,"teamName":"Utah Utes","Scope":"NCAAF"},{"teamId":92,"teamName":"California Bears","Scope":"NCAAF"},{"teamId":93,"teamName":"Oregon State Beavers","Scope":"NCAAF"},{"teamId":94,"teamName":"Stanford Cardinal","Scope":"NCAAF"},{"teamId":95,"teamName":"Washington State Cougars","Scope":"NCAAF"},{"teamId":96,"teamName":"Oregon Ducks","Scope":"NCAAF"},{"teamId":97,"teamName":"Texas A&M Aggies","Scope":"NCAAF"},{"teamId":98,"teamName":"Mississippi State Bulldogs","Scope":"NCAAF"},{"teamId":99,"teamName":"Alabama Crimson Tide","Scope":"NCAAF"},{"teamId":100,"teamName":"Arkansas Razorbacks","Scope":"NCAAF"},{"teamId":101,"teamName":"Ole Miss Rebels","Scope":"NCAAF"},{"teamId":102,"teamName":"Auburn Tigers","Scope":"NCAAF"},{"teamId":103,"teamName":"LSU Tigers","Scope":"NCAAF"},{"teamId":104,"teamName":"Georgia Bulldogs","Scope":"NCAAF"},{"teamId":105,"teamName":"Vanderbilt Commodores","Scope":"NCAAF"},{"teamId":106,"teamName":"South Carolina Gamecocks","Scope":"NCAAF"},{"teamId":107,"teamName":"Florida Gators","Scope":"NCAAF"},{"teamId":108,"teamName":"Missouri Tigers","Scope":"NCAAF"},{"teamId":109,"teamName":"Kentucky Wildcats","Scope":"NCAAF"},{"teamId":110,"teamName":"Baylor Bears","Scope":"NCAAF"},{"teamId":111,"teamName":"Oklahoma State Cowboys","Scope":"NCAAF"},{"teamId":112,"teamName":"Iowa State Cyclones","Scope":"NCAAF"},{"teamId":113,"teamName":"TCU Horned Frogs","Scope":"NCAAF"},{"teamId":114,"teamName":"Kansas Jayhawks","Scope":"NCAAF"},{"teamId":115,"teamName":"Texas Longhorns","Scope":"NCAAF"},{"teamId":116,"teamName":"West Virginia Mountaineers","Scope":"NCAAF"},{"teamId":117,"teamName":"Texas Tech Red Raiders","Scope":"NCAAF"},{"teamId":118,"teamName":"Oklahoma Sooners","Scope":"NCAAF"},{"teamId":119,"teamName":"Kansas State Wildcats","Scope":"NCAAF"},{"teamId":120,"teamName":"Army Black Knights","Scope":"NCAAF"},{"teamId":121,"teamName":"Brigham Young Cougars","Scope":"NCAAF"},{"teamId":122,"teamName":"Notre Dame Fighting Irish","Scope":"NCAAF"},{"teamId":123,"teamName":"Massachusetts Minutemen","Scope":"NCAAF"},{"teamId":124,"teamName":"New Mexico State Aggies","Scope":"NCAAF"},{"teamId":125,"teamName":"Texas State Bobcats","Scope":"NCAAF"},{"teamId":126,"teamName":"Georgia Southern Eagles","Scope":"NCAAF"},{"teamId":127,"teamName":"South Alabama Jaguars","Scope":"NCAAF"},{"teamId":128,"teamName":"Appalachian State Mountaineers","Scope":"NCAAF"},{"teamId":129,"teamName":"Georgia State Panthers","Scope":"NCAAF"},{"teamId":130,"teamName":"Louisiana-Lafayette Ragin' Cajuns","Scope":"NCAAF"},{"teamId":131,"teamName":"Arkansas State Red Wolves","Scope":"NCAAF"},{"teamId":132,"teamName":"Troy Trojans","Scope":"NCAAF"},{"teamId":133,"teamName":"Idaho Vandals","Scope":"NCAAF"},{"teamId":134,"teamName":"Louisiana-Monroe Warhawks","Scope":"NCAAF"},{"teamId":167,"teamName":"Clemson Tigers","Scope":"NCAAF"},{"teamId":168,"teamName":"Pittsburgh Panthers","Scope":"NCAAF"},{"teamId":169,"teamName":"Cincinnati Bearcats","Scope":"NCAAF"},{"teamId":170,"teamName":"Houston Cougars","Scope":"NCAAF"},{"teamId":171,"teamName":"Minnesota Golden Gophers","Scope":"NCAAF"},{"teamId":172,"teamName":"Buffalo Bulls","Scope":"NCAAF"},{"teamId":173,"teamName":"Arizona Wildcats","Scope":"NCAAF"},{"teamId":174,"teamName":"Washington Huskies","Scope":"NCAAF"},{"teamId":175,"teamName":"Tennessee Volunteers","Scope":"NCAAF"}];
fuse = new Fuse(res, {
keys: ['teamName'],
threshold: 0.2
});
bootstrapSearchInputs();
};
var bootstrapDynamicDropdown = function bootstrapDynamicDropdown() {
var navItems = document.getElementsByClassName('ddb-menu-nav-item ddb-dynamic-item');
var dynamicDropdown = document.getElementsByClassName('ddb-dynamic-dropdown')[0];
var dynamicNav = document.getElementById('ddb-dynamic-nav');
var dynamicLinks = document.getElementById('ddb-dynamic-links');
var mlbDropdownElements = bootstrapMLBDropdown();
var nbaDropdownElements = bootstrapNBADropdown();
var nflDropdownElements = bootstrapNFLDropdown();
var mouseEnterEvent = function mouseEnterEvent(evt) {
var id = this.id;
clearInnerHTML(dynamicNav);
clearInnerHTML(dynamicLinks);
switch (id) {
case 'ddb-dropdown-mlb':
dynamicDropdown.id = 'ddb-dynamic-mlb';
dynamicNav.appendChild(mlbDropdownElements.nav);
dynamicLinks.appendChild(mlbDropdownElements.links);
break;
case 'ddb-dropdown-nba':
dynamicDropdown.id = 'ddb-dynamic-nba';
dynamicNav.appendChild(nbaDropdownElements.nav);
dynamicLinks.appendChild(nbaDropdownElements.links);
break;
case 'ddb-dropdown-ncaam':
dynamicDropdown.id = 'ddb-dynamic-ncaam';
if (apiConfig.getRemoteAddress.hasLoaded === true && apiConfig.teamsNCAAM.isLoading === false && apiConfig.teamsNCAAM.hasLoaded === false) {
bootstrapDynamicCollegeBasketball(apiConfig.getRemoteAddress.res, apiConfig.getRemoteAddress.success);
} else if (apiConfig.teamsNCAAM.hasLoaded === true) {
dynamicNav.appendChild(ncaamDropdownElements.nav);
dynamicLinks.appendChild(ncaamDropdownElements.links);
}
break;
case 'ddb-dropdown-nfl':
dynamicDropdown.id = 'ddb-dynamic-nfl';
dynamicNav.appendChild(nflDropdownElements.nav);
dynamicLinks.appendChild(nflDropdownElements.links);
break;
case 'ddb-dropdown-ncaaf':
dynamicDropdown.id = 'ddb-dynamic-ncaaf';
if (apiConfig.getRemoteAddress.hasLoaded === true && apiConfig.teamsNCAAF.isLoading === false && apiConfig.teamsNCAAF.hasLoaded === false) {
bootstrapDynamicCollegeFootball(apiConfig.getRemoteAddress.res, apiConfig.getRemoteAddress.success);
} else if (apiConfig.teamsNCAAF.hasLoaded === true) {
dynamicNav.appendChild(ncaafDropdownElements.nav);
dynamicLinks.appendChild(ncaafDropdownElements.links);
}
break;
}
addClass(dynamicDropdown, 'ddb-hover');
};
var mouseLeaveEvent = function mouseLeaveEvent(evt) {
removeClass(dynamicDropdown, 'ddb-hover');
};
[].forEach.call(navItems, function (item) {
item.addEventListener('mouseenter', mouseEnterEvent);
item.addEventListener('mouseleave', mouseLeaveEvent);
});
};
var brandBar = function brandBar() {
var brandHex = params.brandHex;
if (brandHex === null) {
return false;
}
var brandStyleEl = document.createElement('style');
brandStyleEl.dataset.resource_from = 'deepdive-bar-embed';
brandStyleEl.innerHTML = '\n        .ddb-brand-text{\n            color: ' + brandHex + ' !important;\n        }\n        .ddb-brand-background{\n            background-color: ' + brandHex + ' !important;\n        }\n        .ddb-brand-border{\n            border-color: ' + brandHex + ' !important;\n        }\n        .ddb-menu-dropdown-events.ddb-active .ddb-menu-dropdown-events-button.ddb-brand-boxscores-filter{\n            background-color: ' + brandHex + ' !important;\n            border-color: ' + brandHex + ' !important;\n        }\n        .ddb-menu-dropdown-events-options-list>li.ddb-active.ddb-brand-boxscores-option{\n            background-color: ' + brandHex + ' !important;\n            border-color: ' + brandHex + ' !important;\n        }\n        .ddb-menu-dropdown-events-options-list>li.ddb-brand-boxscores-option:hover{\n            border-color: ' + brandHex + ' !important;\n        }\n        .ddb-boxscores-button.ddb-blue.ddb-brand-boxscores-button{\n            background-color: ' + brandHex + ';\n        }\n        .ddb-brand-menu-hover:hover{\n            background-color: ' + brandHex + ' !important;\n        }\n        .ddb-brand-menu-hover:hover i{\n            color: #fff !important;\n        }\n        .ddb-brand-menu-hover:hover:after{\n            background-color: ' + brandHex + ' !important;\n        }\n        .ddb-brand-all-conferences{\n            border-color: ' + brandHex + ' !important;\n            color: ' + brandHex + ' !important;\n        }\n        .ddb-brand-all-conferences:hover{\n            background-color: ' + brandHex + ' !important;\n            color: #fff !important;\n        }\n        .ddb-brand-search-result .ddb-icon{\n            color: ' + brandHex + ' !important;\n        }\n        .ddb-brand-search-result:hover, .ddb-search-active>.ddb-brand-search-result{\n            background-color: ' + brandHex + ' !important;\n        }\n        .ddb-brand-search-result:hover .ddb-icon, .ddb-search-active>.ddb-brand-search-result .ddb-icon{\n            color: #fff !important;\n        }\n      ';
document.head.appendChild(brandStyleEl);
};
function loadLinkDependencies() {
if (params.brandHex !== null) {
brandBar();
}
var styleEl = document.createElement('link');
styleEl.rel = 'stylesheet';
styleEl.type = 'text/css';
styleEl.dataset.resource_from = 'deepdive-bar-embed';
styleEl.href = resourceURL + '/bar/bar.min.css';
if (styleEl.readyState) {
styleEl.onreadystatechange = function () {
if (styleEl.readyState === 'loaded' || styleEl.readyState === 'complete') {
styleEl.onreadystatechange = null;
bootstrapApp();
}
};
} else {
styleEl.onload = function () {
bootstrapApp();
};
}
document.head.appendChild(styleEl);
}
function loadScriptDependencies() {
!function (t) {
"use strict";
function e() {
console.log.apply(console, arguments);
}function s(t, e) {
var s, n, o, i;for (this.list = t, this.options = e = e || {}, s = 0, i = ["sort", "shouldSort", "verbose", "tokenize"], n = i.length; n > s; s++) {
o = i[s], this.options[o] = o in e ? e[o] : r[o];
}for (s = 0, i = ["searchFn", "sortFn", "keys", "getFn", "include", "tokenSeparator"], n = i.length; n > s; s++) {
o = i[s], this.options[o] = e[o] || r[o];
}
}function n(t, e, s) {
var i, r, h, a, c, p;if (e) {
if (h = e.indexOf("."), -1 !== h ? (i = e.slice(0, h), r = e.slice(h + 1)) : i = e, a = t[i], null !== a && void 0 !== a) if (r || "string" != typeof a && "number" != typeof a) {
if (o(a)) for (c = 0, p = a.length; p > c; c++) {
n(a[c], r, s);
} else r && n(a, r, s);
} else s.push(a);
} else s.push(t);return s;
}function o(t) {
return "[object Array]" === Object.prototype.toString.call(t);
}function i(t, e) {
e = e || {}, this.options = e, this.options.location = e.location || i.defaultOptions.location, this.options.distance = "distance" in e ? e.distance : i.defaultOptions.distance, this.options.threshold = "threshold" in e ? e.threshold : i.defaultOptions.threshold, this.options.maxPatternLength = e.maxPatternLength || i.defaultOptions.maxPatternLength, this.pattern = e.caseSensitive ? t : t.toLowerCase(), this.patternLen = t.length, this.patternLen <= this.options.maxPatternLength && (this.matchmask = 1 << this.patternLen - 1, this.patternAlphabet = this._calculatePatternAlphabet());
}var r = { id: null, caseSensitive: !1, include: [], shouldSort: !0, searchFn: i, sortFn: function sortFn(t, e) {
return t.score - e.score;
}, getFn: n, keys: [], verbose: !1, tokenize: !1, matchAllTokens: !1, tokenSeparator: / +/g };s.VERSION = "2.5.0", s.prototype.set = function (t) {
return this.list = t, t;
}, s.prototype.search = function (t) {
this.options.verbose && e("\nSearch term:", t, "\n"), this.pattern = t, this.results = [], this.resultMap = {}, this._keyMap = null, this._prepareSearchers(), this._startSearch(), this._computeScore(), this._sort();var s = this._format();return s;
}, s.prototype._prepareSearchers = function () {
var t = this.options,
e = this.pattern,
s = t.searchFn,
n = e.split(t.tokenSeparator),
o = 0,
i = n.length;if (this.options.tokenize) for (this.tokenSearchers = []; i > o; o++) {
this.tokenSearchers.push(new s(n[o], t));
}this.fullSeacher = new s(e, t);
}, s.prototype._startSearch = function () {
var t,
e,
s,
n,
o = this.options,
i = o.getFn,
r = this.list,
h = r.length,
a = this.options.keys,
c = a.length,
p = null;if ("string" == typeof r[0]) for (s = 0; h > s; s++) {
this._analyze("", r[s], s, s);
} else for (this._keyMap = {}, s = 0; h > s; s++) {
for (p = r[s], n = 0; c > n; n++) {
if (t = a[n], "string" != typeof t) {
if (e = 1 - t.weight || 1, this._keyMap[t.name] = { weight: e }, t.weight <= 0 || t.weight > 1) throw new Error("Key weight has to be > 0 and <= 1");t = t.name;
} else this._keyMap[t] = { weight: 1 };this._analyze(t, i(p, t, []), p, s);
}
}
}, s.prototype._analyze = function (t, s, n, i) {
var r,
h,
a,
c,
p,
l,
u,
f,
d,
g,
m,
y,
k,
v,
S,
b = this.options,
_ = !1;if (void 0 !== s && null !== s) {
h = [];var M = 0;if ("string" == typeof s) {
if (r = s.split(b.tokenSeparator), b.verbose && e("---------\nKey:", t), this.options.tokenize) {
for (v = 0; v < this.tokenSearchers.length; v++) {
for (f = this.tokenSearchers[v], b.verbose && e("Pattern:", f.pattern), d = [], y = !1, S = 0; S < r.length; S++) {
g = r[S], m = f.search(g);var L = {};m.isMatch ? (L[g] = m.score, _ = !0, y = !0, h.push(m.score)) : (L[g] = 1, this.options.matchAllTokens || h.push(1)), d.push(L);
}y && M++, b.verbose && e("Token scores:", d);
}for (c = h[0], l = h.length, v = 1; l > v; v++) {
c += h[v];
}c /= l, b.verbose && e("Token score average:", c);
}u = this.fullSeacher.search(s), b.verbose && e("Full text score:", u.score), p = u.score, void 0 !== c && (p = (p + c) / 2), b.verbose && e("Score average:", p), k = this.options.tokenize && this.options.matchAllTokens ? M >= this.tokenSearchers.length : !0, b.verbose && e("Check Matches", k), (_ || u.isMatch) && k && (a = this.resultMap[i], a ? a.output.push({ key: t, score: p, matchedIndices: u.matchedIndices }) : (this.resultMap[i] = { item: n, output: [{ key: t, score: p, matchedIndices: u.matchedIndices }] }, this.results.push(this.resultMap[i])));
} else if (o(s)) for (v = 0; v < s.length; v++) {
this._analyze(t, s[v], n, i);
}
}
}, s.prototype._computeScore = function () {
var t,
s,
n,
o,
i,
r,
h,
a,
c,
p = this._keyMap,
l = this.results;for (this.options.verbose && e("\n\nComputing score:\n"), t = 0; t < l.length; t++) {
for (n = 0, o = l[t].output, i = o.length, a = 1, s = 0; i > s; s++) {
r = o[s].score, h = p ? p[o[s].key].weight : 1, c = r * h, 1 !== h ? a = Math.min(a, c) : (n += c, o[s].nScore = c);
}1 === a ? l[t].score = n / i : l[t].score = a, this.options.verbose && e(l[t]);
}
}, s.prototype._sort = function () {
var t = this.options;t.shouldSort && (t.verbose && e("\n\nSorting...."), this.results.sort(t.sortFn));
}, s.prototype._format = function () {
var t,
s,
n,
o,
i,
r = this.options,
h = r.getFn,
a = [],
c = this.results,
p = r.include;for (r.verbose && e("\n\nOutput:\n\n", c), o = r.id ? function (t) {
c[t].item = h(c[t].item, r.id, [])[0];
} : function () {}, i = function i(t) {
var e,
s,
n,
o,
i,
r = c[t];if (p.length > 0) {
if (e = { item: r.item }, -1 !== p.indexOf("matches")) for (n = r.output, e.matches = [], s = 0; s < n.length; s++) {
o = n[s], i = { indices: o.matchedIndices }, o.key && (i.key = o.key), e.matches.push(i);
}-1 !== p.indexOf("score") && (e.score = c[t].score);
} else e = r.item;return e;
}, s = 0, n = c.length; n > s; s++) {
o(s), t = i(s), a.push(t);
}return a;
}, i.defaultOptions = { location: 0, distance: 100, threshold: .6, maxPatternLength: 32 }, i.prototype._calculatePatternAlphabet = function () {
var t = {},
e = 0;for (e = 0; e < this.patternLen; e++) {
t[this.pattern.charAt(e)] = 0;
}for (e = 0; e < this.patternLen; e++) {
t[this.pattern.charAt(e)] |= 1 << this.pattern.length - e - 1;
}return t;
}, i.prototype._bitapScore = function (t, e) {
var s = t / this.patternLen,
n = Math.abs(this.options.location - e);return this.options.distance ? s + n / this.options.distance : n ? 1 : s;
}, i.prototype.search = function (t) {
var e,
s,
n,
o,
i,
r,
h,
a,
c,
p,
l,
u,
f,
d,
g,
m,
y,
k,
v,
S,
b,
_,
M = this.options;if (t = M.caseSensitive ? t : t.toLowerCase(), this.pattern === t) return { isMatch: !0, score: 0, matchedIndices: [[0, t.length - 1]] };if (this.patternLen > M.maxPatternLength) {
if (y = t.match(new RegExp(this.pattern.replace(M.tokenSeparator, "|"))), k = !!y) for (S = [], e = 0, b = y.length; b > e; e++) {
_ = y[e], S.push([t.indexOf(_), _.length - 1]);
}return { isMatch: k, score: k ? .5 : 1, matchedIndices: S };
}for (o = M.location, n = t.length, i = M.threshold, r = t.indexOf(this.pattern, o), v = [], e = 0; n > e; e++) {
v[e] = 0;
}for (-1 != r && (i = Math.min(this._bitapScore(0, r), i), r = t.lastIndexOf(this.pattern, o + this.patternLen), -1 != r && (i = Math.min(this._bitapScore(0, r), i))), r = -1, g = 1, m = [], c = this.patternLen + n, e = 0; e < this.patternLen; e++) {
for (h = 0, a = c; a > h;) {
this._bitapScore(e, o + a) <= i ? h = a : c = a, a = Math.floor((c - h) / 2 + h);
}for (c = a, p = Math.max(1, o - a + 1), l = Math.min(o + a, n) + this.patternLen, u = Array(l + 2), u[l + 1] = (1 << e) - 1, s = l; s >= p; s--) {
if (d = this.patternAlphabet[t.charAt(s - 1)], d && (v[s - 1] = 1), 0 === e ? u[s] = (u[s + 1] << 1 | 1) & d : u[s] = (u[s + 1] << 1 | 1) & d | ((f[s + 1] | f[s]) << 1 | 1) | f[s + 1], u[s] & this.matchmask && (g = this._bitapScore(e, s - 1), i >= g)) {
if (i = g, r = s - 1, m.push(r), !(r > o)) break;p = Math.max(1, 2 * o - r);
}
}if (this._bitapScore(e + 1, o) > i) break;f = u;
}return S = this._getMatchedIndices(v), { isMatch: r >= 0, score: 0 === g ? .001 : g, matchedIndices: S };
}, i.prototype._getMatchedIndices = function (t) {
for (var e, s = [], n = -1, o = -1, i = 0, r = t.length; r > i; i++) {
e = t[i], e && -1 === n ? n = i : e || -1 === n || (o = i - 1, s.push([n, o]), n = -1);
}return t[i - 1] && s.push([n, i - 1]), s;
}, "object" == (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) ? module.exports = s : "function" == typeof define && define.amd ? define(function () {
return s;
}) : t.Fuse = s;
}(this);
bootstrapSearch();
var bluebird = document.createElement('script');
bluebird.type = 'text/javascript';
bluebird.dataset.resource_from = 'deepdive-bar-embed';
bluebird.src = resourceURL + '/lib/bluebird_3.4.5.min.js';
if (bluebird.readyState) {
bluebird.onreadystatechange = function () {
if (bluebird.readyState == "loaded" || bluebird.readyState == "complete") {
bluebird.onreadystatechange = null;
bootstrapMobileMenu();
bootstrapDesktopBoxscores();
}
};
} else {
bluebird.onload = function () {
bootstrapMobileMenu();
bootstrapDesktopBoxscores();
};
}
if (!window.Promise) {
document.head.appendChild(bluebird);
} else {
bootstrapMobileMenu();
bootstrapDesktopBoxscores();
}
}
var getUserLocation = function getUserLocation() {
var apiString = apiConfig.getRemoteAddress.url();
apiConfig.getRemoteAddress.isLoading = true;
var xhttp = createRequestObject();
xhttp.onreadystatechange = function () {
if (xhttp.readyState === 4 && xhttp.status === 200) {
var res = JSON.parse(xhttp.responseText);
var state = processLocationData(res);
apiConfig.getRemoteAddress.res = state;
apiConfig.getRemoteAddress.isLoading = false;
apiConfig.getRemoteAddress.hasLoaded = true;
apiConfig.getRemoteAddress.success = true;
} else if (xhttp.readyState === 4 && xhttp.status !== 200) {
var state = processLocationData(undefined);
apiConfig.getRemoteAddress.res = state;
apiConfig.getRemoteAddress.isLoading = false;
apiConfig.getRemoteAddress.hasLoaded = true;
apiConfig.getRemoteAddress.success = false;
}
};
xhttp.open('GET', apiString, true);
xhttp.send();
};
var buildDefaultTickerData = function buildDefaultTickerData() {
var defaultTickerItems = [{
text: 'Looking for more baseball action? Check out baseball.chicagotribune.com for stats, schedules, and more.',
route: homerunDomain
}];
var defaultTickerData = '';
defaultTickerItems.forEach(function (item, index) {
defaultTickerData += '<a class="ddb-menu-ticker-link" target="_blank" href="' + item.route + '">' + item.text + '</a>';
if (index !== defaultTickerItems.length - 1) {
defaultTickerData += '<span class="ddb-menu-ticker-separator">&#8226;</span>';
}
});
return defaultTickerData;
};
var processTickerData = function processTickerData(data) {
var transform = '';
for (var i = data.length - 1; i >= 0; i--) {
var item = data[i];
if (item.length === 0) {
data.splice(i, 1);
}
}
var dataLength = data.length;
data.forEach(function (item, index) {
var eventId = item.event;
if (item.featuredReport.hasOwnProperty('postgame-report')) {
var headline = item.featuredReport['postgame-report'].displayHeadline;
var link = homerunDomain + '/articles/postgame-report/' + eventId;
transform += index !== dataLength - 1 ? '<a class="ddb-menu-ticker-link" target="_blank" href="' + link + '">' + headline + '</a><span class="ddb-menu-ticker-separator">&#8226;</span>' : '<a class="ddb-menu-ticker-link" target="_blank" href="' + link + '">' + headline + '</a>';
}
});
if (transform === '') {
transform = buildDefaultTickerData();
}
return transform;
};
var processLocationData = function processLocationData(data) {
var transform;
transform = typeof data !== 'undefined' && typeof data[0] !== 'undefined' && typeof data[0].state !== 'undefined' ? data[0].state.toLowerCase() : defaultState;
return transform;
};
var processCollegeBasketballData = function processCollegeBasketballData(data) {
data = data || [];
var transform = [];
var buildLink = function buildLink(full_name, teamId) {
full_name = full_name.replace(/[^\w\s]/gi, '');
full_name = full_name.replace(/\s+/g, '-').toLowerCase();
if (houseSite == true) {
return hoopsDomain + '/NCAA/team/' + full_name + '/' + teamId;
} else {
if (params.basketballSubdomain == "basketball") {
return hoopsDomain + '/NCAA/team/' + full_name + '/' + teamId;
} else {
return hoopsDomain + '/NCAA/t/' + full_name + '/' + teamId;
}
}
};
var dataLength = data.length > 1 ? 2 : data.length;
for (var i = 0; i < dataLength; i++) {
var item = data[i];
var leagueName = Object.keys(item)[0];
var leagueData = data[i][leagueName];
var tableInnerHTML = '\n        <table class="ddb-menu-dropdown-table ddb-col-3">\n          <thead>\n            <tr>\n              <td colspan="3" class="ddb-brand-text">\n                ' + leagueName + '\n              </td>\n            </tr>\n          </thead>\n          <tbody>\n       ';
if (leagueData != null) {
leagueData.forEach(function (item, index) {
var mod = index % 3;
if (mod === 0) {
tableInnerHTML += '<tr><td><a target="_blank" href="' + buildLink(item.full_name, item.team_id) + '">' + item.full_name + '</a></td>';
} else if (mod === 1) {
tableInnerHTML += '<td><a target="_blank" href="' + buildLink(item.full_name, item.team_id) + '">' + item.full_name + '</a></td>';
} else if (mod === 2) {
tableInnerHTML += '<td><a target="_blank" href="' + buildLink(item.full_name, item.team_id) + '">' + item.full_name + '</a></td></tr>';
}
});
}
if (!endsWith(tableInnerHTML, '</tr>')) {
tableInnerHTML += '</tr>';
}
tableInnerHTML += '</tbody></table>';
transform.push(tableInnerHTML);
}
return transform;
};
var processCollegeFootballData = function processCollegeFootballData(data) {
data = data || [];
var transform = [];
var buildLink = function buildLink(full_name, teamId) {
full_name = full_name.replace(/[^\w\s]/gi, '');
full_name = full_name.replace(/\s+/g, '-').toLowerCase();
if (params.footballSubdomain == "football") {
return touchdownDomain + '/ncaaf/team/' + full_name + '/' + teamId;
} else {
if (houseSite == true) {
return touchdownDomain + '/ncaaf/team/' + full_name + '/' + teamId;
} else {
return touchdownDomain + '/ncaaf/t/' + full_name + '/' + teamId;
}
}
};
var objectKeys = Object.keys(data);
var dataLength = objectKeys.length > 1 ? 2 : objectKeys.length;
for (var i = 0; i < dataLength; i++) {
var leagueName = objectKeys[i];
var league = data[leagueName];
var leagueData = [];
for (var division in league) {
leagueData = leagueData.concat(league[division]);
}
var tableInnerHTML = '\n        <table class="ddb-menu-dropdown-table ddb-col-3">\n          <thead>\n            <tr>\n              <td colspan="3" class="ddb-brand-text">\n                ' + leagueName + '\n              </td>\n            </tr>\n          </thead>\n          <tbody>\n       ';
leagueData.forEach(function (item, index) {
var mod = index % 3;
if (mod === 0) {
tableInnerHTML += '<tr><td><a target="_blank" href="' + buildLink(item.full_name, item.id) + '">' + item.full_name + '</a></td>';
} else if (mod === 1) {
tableInnerHTML += '<td><a target="_blank" href="' + buildLink(item.full_name, item.id) + '">' + item.full_name + '</a></td>';
} else if (mod === 2) {
tableInnerHTML += '<td><a target="_blank" href="' + buildLink(item.full_name, item.id) + '">' + item.full_name + '</a></td></tr>';
}
});
if (!endsWith(tableInnerHTML, '</tr>')) {
tableInnerHTML += '</tr>';
}
tableInnerHTML += '</tbody></table>';
transform.push(tableInnerHTML);
}
return transform;
};
var processBasketballBoxscoresData = function processBasketballBoxscoresData(data, offset, tzAbbrev, todayDate, currentScope) {
data = data.data;
var error = false;
if (!data) {
error = true;
}
var pre = [],
active = [],
post = [];
if (error == false) {
var buildNode = function buildNode(data) {
var gameNode = document.createElement('div');
var date = new Date(data.timestamp);
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var DOW = days[date.getDay()];
gameNode.className = 'ddb-boxscores-content-game';
gameNode.innerHTML = '\n           <a target="_blank" class="ddb-boxscores-content-game-link" href="' + data.link + '">\n             <ul class="ddb-boxscores-content-game-teams">\n               <li class="' + (data.homeClass ? data.homeClass : '') + '">\n                 ' + data.homeTeam + ' <span class="ddb-boxscores-content-game-score">' + data.homeScore + '</span>\n               </li>\n               <li class="' + (data.awayClass ? data.awayClass : '') + '">\n                 ' + data.awayTeam + ' <span class="ddb-boxscores-content-game-score">' + data.awayScore + '</span>\n               </li>\n             </ul>\n             <span class="ddb-boxscores-content-game-bottom">\n             ' + DOW + '<br>\n               ' + data.bottomData + '\n             </span>\n           </a>\n         ';
return gameNode;
};
var getDatetime = function getDatetime(timestamp, offset) {
var datetime;
var dateString = new Date(timestamp + offset * 3600 * 1000);
var year = dateString.getUTCFullYear();
var month = dateString.getUTCMonth() + 1;
month = month.toString().length === 1 ? '0' + month.toString() : month;
var date = dateString.getUTCDate();
date = date.toString().length === 1 ? '0' + date.toString() : date;
datetime = year + '-' + month + '-' + date;
return datetime;
};
if (typeof todayDate !== 'undefined' && todayDate !== null) {
var count = 0;
for (var index in data) {
var item = data[index];
var gameIsToday = false;
var timestampDate = new Date(item.startDateTimestamp + offset * 3600 * 1000).getUTCDate();
if (timestampDate == todayDate) {
gameIsToday = true;
} else if (item.liveStatus) {
gameIsToday = true;
}
if (item.team1Wins == null || item.team1Wins == "null") {
item.team1Wins = "0";
}
if (item.team1Losses == null || item.team1Losses == "null") {
item.team1Losses = "0";
}
if (item.team2Wins == null || item.team2Wins == "null") {
item.team2Wins = "0";
}
if (item.team2Losses == null || item.team2Losses == "null") {
item.team2Losses = "0";
}
if (item.team1Score == null || item.team1Score == "null") {
item.team1Score = "0";
}
if (item.team2Score == null || item.team2Score == "null") {
item.team2Score = "0";
}
if (item.team1Abbreviation != null) {
item.team1Abbreviation = item.team1Abbreviation.substring(0, 4);
} else {
item.team1Abbreviation = "N/A";
}
if (item.team2Abbreviation != null) {
item.team2Abbreviation = item.team2Abbreviation.substring(0, 4);
} else {
item.team2Abbreviation = "N/A";
}
if (true) {
switch (item.eventStatus) {
case 'pre-event':
if (item.liveStatus === false) {
var gameObject = {
homeTeam: item.team1Abbreviation,
homeScore: item.team1Wins + '-' + item.team1Losses,
awayTeam: item.team2Abbreviation,
awayScore: item.team2Wins + '-' + item.team2Losses,
timestamp: item.startDateTimestamp,
datetime: convertToEastern(item.startDateTimestamp, offset, tzAbbrev),
eventStatus: item.eventStatus,
eventId: item.eventId
};
gameObject.bottomData = gameObject.datetime;
gameObject.link = hoopsDomain + "/" + currentScope + '/articles/pregame/' + gameObject.eventId;
gameObject.mobileNode = buildNode(gameObject);
gameObject.desktopNode = buildNode(gameObject);
pre.push(gameObject);
} else {
var gameObject = {
homeTeam: item.team1Abbreviation,
homeScore: item.team1Score,
awayTeam: item.team2Abbreviation,
awayScore: item.team2Score,
timestamp: item.eventStartTime,
datetime: convertToEastern(item.startDateTimestamp, offset, tzAbbrev),
eventStatus: item.eventStatus,
eventId: item.eventId
};
gameObject.homeClass = gameObject.homeScore && gameObject.awayScore && gameObject.homeScore < gameObject.awayScore ? 'ddb-grey' : null;
gameObject.awayClass = gameObject.homeScore && gameObject.awayScore && gameObject.homeScore > gameObject.awayScore ? 'ddb-grey' : null;
if (item.gameInfo.inningHalf === 'top') {
gameObject.bottomData = '<i class="ddb-icon ddb-icon-caret-up"></i>' + (item.gameInfo.inningsPlayed ? ordinalSuffix(item.gameInfo.inningsPlayed) : gameObject.datetime);
} else if (item.gameInfo.inningHalf === 'bottom') {
gameObject.bottomData = '<i class="ddb-icon ddb-icon-caret-down"></i>' + (item.gameInfo.inningsPlayed ? ordinalSuffix(item.gameInfo.inningsPlayed) : gameObject.datetime);
} else {
gameObject.bottomData = '';
}
gameObject.link = hoopsDomain + "/" + currentScope + '/articles/pregame/' + gameObject.eventId;
gameObject.mobileNode = buildNode(gameObject);
gameObject.desktopNode = buildNode(gameObject);
active.push(gameObject);
}
break;
case 'post-event':
var gameObject = {
homeTeam: item.team1Abbreviation,
homeScore: item.team1Score,
awayTeam: item.team2Abbreviation,
awayScore: item.team2Score,
timestamp: item.eventStartTime,
datetime: convertToEastern(item.startDateTimestamp, offset, tzAbbrev),
eventStatus: item.eventStatus,
eventId: item.eventId
};
gameObject.homeClass = gameObject.homeScore && gameObject.awayScore && gameObject.homeScore < gameObject.awayScore ? 'ddb-grey' : null;
gameObject.awayClass = gameObject.homeScore && gameObject.awayScore && gameObject.homeScore > gameObject.awayScore ? 'ddb-grey' : null;
gameObject.bottomData = 'Final';
gameObject.link = hoopsDomain + "/" + currentScope + '/articles/postgame/' + gameObject.eventId;
gameObject.mobileNode = buildNode(gameObject);
gameObject.desktopNode = buildNode(gameObject);
post.push(gameObject);
break;
default:
break;
}
}
};
} else {
for (var index in data) {
var item = data[index];
switch (item.eventStatus) {
case 'pre-event':
var datetime = getDatetime(item.startDateTimestamp, easternTime.offset);
var gameObject = {
homeTeam: item.team1Abbreviation,
homeScore: item.team1Wins + '-' + item.team1Losses,
awayTeam: item.team2Abbreviation,
awayScore: item.team2Wins + '-' + item.team2Losses,
timestamp: item.startDateTimestamp,
datetime: prettyDatetime(datetime),
eventStatus: item.eventStatus,
eventId: item.eventId
};
gameObject.bottomData = gameObject.datetime;
gameObject.link = hoopsDomain + "/" + currentScope + '/articles/pregame/' + gameObject.eventId;
gameObject.mobileNode = buildNode(gameObject);
gameObject.desktopNode = buildNode(gameObject);
pre.push(gameObject);
break;
case 'post-event':
var datetime2 = getDatetime(item.eventStartTime, easternTime.offset);
var gameObject = {
homeTeam: item.team1Abbreviation,
homeScore: item.team1Score,
awayTeam: item.team2Abbreviation,
awayScore: item.team2Score,
timestamp: item.startDateTimestamp,
datetime: prettyDatetime(datetime2),
eventStatus: item.eventStatus,
eventId: item.eventId
};
gameObject.homeClass = gameObject.homeScore && gameObject.awayScore && gameObject.homeScore < gameObject.awayScore ? 'ddb-grey' : null;
gameObject.awayClass = gameObject.homeScore && gameObject.awayScore && gameObject.homeScore > gameObject.awayScore ? 'ddb-grey' : null;
gameObject.bottomData = 'Final';
gameObject.link = hoopsDomain + "/" + currentScope + '/articles/postgame/' + gameObject.eventId;
gameObject.mobileNode = buildNode(gameObject);
gameObject.desktopNode = buildNode(gameObject);
post.push(gameObject);
break;
default:
break;
}
}
}
pre = arraySort(pre, 1, 'timestamp');
active = arraySort(active, 1, 'timestamp');
post = arraySort(post, 1, 'timestamp');
var allGames = active.concat(pre, post);
return allGames;
} else {
return [];
}
};
var processBaseballBoxscoresData = function processBaseballBoxscoresData(data, offset, tzAbbrev, todayDate) {
var error = false;
for (var index in data) {
if (!data[index].gameInfo) {
error = true;
}
break;
}
var pre = [],
active = [],
post = [];
if (error == false) {
var buildNode = function buildNode(data) {
var gameNode = document.createElement('div');
gameNode.className = 'ddb-boxscores-content-game';
gameNode.innerHTML = '\n           <a target="_blank" class="ddb-boxscores-content-game-link" href="' + data.link + '">\n             <ul class="ddb-boxscores-content-game-teams">\n               <li class="' + (data.homeClass ? data.homeClass : '') + '">\n                 ' + data.homeTeam + ' <span class="ddb-boxscores-content-game-score">' + data.homeScore + '</span>\n               </li>\n               <li class="' + (data.awayClass ? data.awayClass : '') + '">\n                 ' + data.awayTeam + ' <span class="ddb-boxscores-content-game-score">' + data.awayScore + '</span>\n               </li>\n             </ul>\n             <span class="ddb-boxscores-content-game-bottom">\n               ' + data.bottomData + '\n             </span>\n           </a>\n         ';
return gameNode;
};
var getDatetime = function getDatetime(timestamp, offset) {
var datetime;
var dateString = new Date(timestamp + offset * 3600 * 1000);
var year = dateString.getUTCFullYear();
var month = dateString.getUTCMonth() + 1;
month = month.toString().length === 1 ? '0' + month.toString() : month;
var date = dateString.getUTCDate();
date = date.toString().length === 1 ? '0' + date.toString() : date;
datetime = year + '-' + month + '-' + date;
return datetime;
};
if (typeof todayDate !== 'undefined' && todayDate !== null) {
var count = 0;
for (var index in data) {
count++;
var item = data[index];
var gameIsToday = false;
var timestampDate = new Date(item.gameInfo.startDateTimestamp + offset * 3600 * 1000).getUTCDate();
if (timestampDate == todayDate) {
gameIsToday = true;
} else if (item.gameInfo.live) {
gameIsToday = true;
}
if (true) {
switch (item.gameInfo.eventStatus) {
case 'pre-event':
if (item.gameInfo.live === false) {
var gameObject = {
homeTeam: item.homeTeamInfo.abbreviation,
homeScore: item.homeTeamInfo.winRecord + '-' + item.homeTeamInfo.lossRecord,
awayTeam: item.awayTeamInfo.abbreviation,
awayScore: item.awayTeamInfo.winRecord + '-' + item.awayTeamInfo.lossRecord,
timestamp: item.gameInfo.startDateTimestamp,
datetime: convertToEastern(item.gameInfo.startDateTimestamp, offset, tzAbbrev),
eventStatus: item.gameInfo.eventStatus,
eventId: item.gameInfo.eventId
};
gameObject.bottomData = gameObject.datetime;
gameObject.link = homerunDomain + '/articles/pregame-report/' + gameObject.eventId;
gameObject.mobileNode = buildNode(gameObject);
gameObject.desktopNode = buildNode(gameObject);
pre.push(gameObject);
} else {
var gameObject = {
homeTeam: item.homeTeamInfo.abbreviation,
homeScore: item.homeTeamInfo.score,
awayTeam: item.awayTeamInfo.abbreviation,
awayScore: item.awayTeamInfo.score,
timestamp: item.gameInfo.startDateTimestamp,
datetime: convertToEastern(item.gameInfo.startDateTimestamp, offset, tzAbbrev),
eventStatus: item.gameInfo.eventStatus,
eventId: item.gameInfo.eventId
};
gameObject.homeClass = gameObject.homeScore && gameObject.awayScore && gameObject.homeScore < gameObject.awayScore ? 'ddb-grey' : null;
gameObject.awayClass = gameObject.homeScore && gameObject.awayScore && gameObject.homeScore > gameObject.awayScore ? 'ddb-grey' : null;
if (item.gameInfo.inningHalf === 'top') {
gameObject.bottomData = '<i class="ddb-icon ddb-icon-caret-up"></i>' + (item.gameInfo.inningsPlayed ? ordinalSuffix(item.gameInfo.inningsPlayed) : gameObject.datetime);
} else if (item.gameInfo.inningHalf === 'bottom') {
gameObject.bottomData = '<i class="ddb-icon ddb-icon-caret-down"></i>' + (item.gameInfo.inningsPlayed ? ordinalSuffix(item.gameInfo.inningsPlayed) : gameObject.datetime);
} else {
gameObject.bottomData = '';
}
if (item.gameInfo.inningsPlayed <= 3) {
gameObject.link = homerunDomain + '/articles/pregame-report/' + gameObject.eventId;
} else if (item.gameInfo.inningsPlayed > 3 && item.gameInfo.inningsPlayed <= 5) {
gameObject.link = homerunDomain + '/articles/third-inning-report/' + gameObject.eventId;
} else if (item.gameInfo.inningsPlayed > 5 && item.gameInfo.inningsPlayed <= 7) {
gameObject.link = homerunDomain + '/articles/fifth-inning-report/' + gameObject.eventId;
} else if (item.gameInfo.inningsPlayed > 7) {
gameObject.link = homerunDomain + '/articles/seventh-inning-report/' + gameObject.eventId;
}
gameObject.mobileNode = buildNode(gameObject);
gameObject.desktopNode = buildNode(gameObject);
active.push(gameObject);
}
break;
case 'post-event':
var gameObject = {
homeTeam: item.homeTeamInfo.abbreviation,
homeScore: item.homeTeamInfo.score,
awayTeam: item.awayTeamInfo.abbreviation,
awayScore: item.awayTeamInfo.score,
timestamp: item.gameInfo.startDateTimestamp,
datetime: convertToEastern(item.gameInfo.startDateTimestamp, offset, tzAbbrev),
eventStatus: item.gameInfo.eventStatus,
eventId: item.gameInfo.eventId
};
gameObject.homeClass = gameObject.homeScore && gameObject.awayScore && gameObject.homeScore < gameObject.awayScore ? 'ddb-grey' : null;
gameObject.awayClass = gameObject.homeScore && gameObject.awayScore && gameObject.homeScore > gameObject.awayScore ? 'ddb-grey' : null;
gameObject.bottomData = 'Final';
gameObject.link = homerunDomain + '/articles/postgame-report/' + gameObject.eventId;
gameObject.mobileNode = buildNode(gameObject);
gameObject.desktopNode = buildNode(gameObject);
post.push(gameObject);
break;
default:
break;
}
}
};
} else {
for (var index in data) {
var item = data[index];
switch (item.gameInfo.eventStatus) {
case 'pre-event':
var datetime = getDatetime(item.gameInfo.startDateTimestamp, easternTime.offset);
var gameObject = {
homeTeam: item.homeTeamInfo.abbreviation,
homeScore: item.homeTeamInfo.winRecord + '-' + item.homeTeamInfo.lossRecord,
awayTeam: item.awayTeamInfo.abbreviation,
awayScore: item.awayTeamInfo.winRecord + '-' + item.awayTeamInfo.lossRecord,
timestamp: item.gameInfo.startDateTimestamp,
datetime: prettyDatetime(datetime),
eventStatus: item.gameInfo.eventStatus,
eventId: item.gameInfo.eventId
};
gameObject.bottomData = gameObject.datetime;
gameObject.link = homerunDomain + '/articles/pregame-report/' + gameObject.eventId;
gameObject.mobileNode = buildNode(gameObject);
gameObject.desktopNode = buildNode(gameObject);
pre.push(gameObject);
break;
case 'post-event':
var datetime2 = getDatetime(item.gameInfo.startDateTimestamp, easternTime.offset);
var gameObject = {
homeTeam: item.homeTeamInfo.abbreviation,
homeScore: item.homeTeamInfo.score,
awayTeam: item.awayTeamInfo.abbreviation,
awayScore: item.awayTeamInfo.score,
timestamp: item.gameInfo.startDateTimestamp,
datetime: prettyDatetime(datetime2),
eventStatus: item.gameInfo.eventStatus,
eventId: item.gameInfo.eventId
};
gameObject.homeClass = gameObject.homeScore && gameObject.awayScore && gameObject.homeScore < gameObject.awayScore ? 'ddb-grey' : null;
gameObject.awayClass = gameObject.homeScore && gameObject.awayScore && gameObject.homeScore > gameObject.awayScore ? 'ddb-grey' : null;
gameObject.bottomData = 'Final';
gameObject.link = homerunDomain + '/articles/postgame-report/' + gameObject.eventId;
gameObject.mobileNode = buildNode(gameObject);
gameObject.desktopNode = buildNode(gameObject);
post.push(gameObject);
break;
default:
break;
}
}
}
pre = arraySort(pre, 1, 'timestamp');
active = arraySort(active, 1, 'timestamp');
post = arraySort(post, 1, 'timestamp');
var allGames = active.concat(pre, post);
return allGames;
} else {
return [];
}
};
var processFootballBoxscoresData = function processFootballBoxscoresData(data, offset, tzAbbrev, todayDate, vertical) {
var pre = [],
active = [],
post = [];
var wpre = [],
wpost = [];
var buildNode = function buildNode(data) {
var gameNode = document.createElement('div');
var date = new Date(data.timestamp);
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var DOW = days[date.getDay()];
gameNode.className = 'ddb-boxscores-content-game';
gameNode.innerHTML = '\n         <a target="_blank" class="ddb-boxscores-content-game-link" href="' + data.link + '">\n           <ul class="ddb-boxscores-content-game-teams">\n             <li>\n               ' + data.homeTeam + ' <span class="ddb-boxscores-content-game-score">' + data.homeScore + '</span>\n             </li>\n             <li>\n               ' + data.awayTeam + ' <span class="ddb-boxscores-content-game-score">' + data.awayScore + '</span>\n             </li>\n           </ul>\n           <span class="ddb-boxscores-content-game-bottom">\n            ' + DOW + '<br>\n             ' + data.bottomData + '\n           </span>\n         </a>\n       ';
return gameNode;
};
var count = 0;
for (var index in data) {
count++;
var item = data[index];
var gameIsToday = false;
var timestampDate = new Date(item.eventStartTime + offset * 3600 * 1000).getUTCDate();
var now = new Date().getTime();
if (timestampDate === todayDate) {
gameIsToday = true;
}
if (true) {
if (item.liveStatus === 'N' && item.eventStartTime > now) {
var homeScore, awayScore;
if (item.team1Record) {
var recordSplit = item.team1Record.split('-');
homeScore = recordSplit[0] + '-' + recordSplit[1];
} else {
homeScore = '-';
}
if (item.team2Record) {
var recordSplit = item.team2Record.split('-');
awayScore = recordSplit[0] + '-' + recordSplit[1];
} else {
awayScore = '-';
}
var gameObject = {
homeTeam: item.team1Abbreviation,
homeScore: homeScore,
awayTeam: item.team2Abbreviation,
awayScore: awayScore,
timestamp: item.eventStartTime,
datetime: convertToEastern(item.eventStartTime, offset, tzAbbrev),
eventId: item.eventId
};
gameObject.bottomData = gameObject.datetime;
if (vertical === 'nfl') {
gameObject.link = touchdownDomain + '/nfl/articles/pregame-report/' + item.eventId;
} else if (vertical === 'ncaaf') {
gameObject.link = touchdownDomain + '/ncaaf/articles/pregame-report/' + item.eventId;
} else {
gameObject.link = '#';
}
gameObject.mobileNode = buildNode(gameObject);
gameObject.desktopNode = buildNode(gameObject);
pre.push(gameObject);
} else if (item.liveStatus === 'Y' && item.eventStartTime < now) {
var gameObject = {
homeTeam: item.team1Abbreviation,
homeScore: item.team1Score ? item.team1Score : '-',
awayTeam: item.team2Abbreviation,
awayScore: item.team2Score ? item.team2Score : '-',
timestamp: item.eventStartTime,
datetime: convertToEastern(item.eventStartTime, offset, tzAbbrev),
eventId: item.eventId
};
gameObject.homeClass = gameObject.homeScore !== '-' && gameObject.awayScore !== '-' && gameObject.homeScore < gameObject.awayScore ? 'ddb-grey' : null;
gameObject.awayClass = gameObject.homeScore !== '-' && gameObject.awayScore !== '-' && gameObject.homeScore > gameObject.awayScore ? 'ddb-grey' : null;
gameObject.bottomData = item.eventQuarter ? ordinalSuffix(item.eventQuarter) : gameObject.datetime;
if (vertical === 'nfl') {
gameObject.link = touchdownDomain + '/nfl/articles/in-game-report/' + item.eventId;
} else if (vertical === 'ncaaf') {
gameObject.link = touchdownDomain + '/ncaaf/articles/in-game-report/' + item.eventId;
} else {
gameObject.link = '#';
}
gameObject.mobileNode = buildNode(gameObject);
gameObject.desktopNode = buildNode(gameObject);
active.push(gameObject);
} else if (item.liveStatus === 'N' && item.eventStartTime < now) {
var gameObject = {
homeTeam: item.team1Abbreviation,
homeScore: item.team1Score ? item.team1Score : '-',
awayTeam: item.team2Abbreviation,
awayScore: item.team2Score ? item.team2Score : '-',
timestamp: item.eventStartTime,
datetime: convertToEastern(item.eventStartTime, offset, tzAbbrev),
eventId: item.eventId
};
gameObject.homeClass = gameObject.homeScore !== '-' && gameObject.awayScore !== '-' && gameObject.homeScore < gameObject.awayScore ? 'ddb-grey' : null;
gameObject.awayClass = gameObject.homeScore !== '-' && gameObject.awayScore !== '-' && gameObject.homeScore > gameObject.awayScore ? 'ddb-grey' : null;
gameObject.bottomData = 'Final';
if (vertical === 'nfl') {
gameObject.link = touchdownDomain + '/nfl/articles/postgame-report/' + item.eventId;
} else if (vertical === 'ncaaf') {
gameObject.link = touchdownDomain + '/ncaaf/articles/postgame-report/' + item.eventId;
} else {
gameObject.link = '#';
}
gameObject.mobileNode = buildNode(gameObject);
gameObject.desktopNode = buildNode(gameObject);
post.push(gameObject);
}
} else if (count < 10) {
if (item.eventStartTime > now) {
var homeScore, awayScore;
if (item.team1Record) {
var recordSplit = item.team1Record.split('-');
homeScore = recordSplit[0] + '-' + recordSplit[1];
} else {
homeScore = '-';
}
if (item.team2Record) {
var recordSplit = item.team2Record.split('-');
awayScore = recordSplit[0] + '-' + recordSplit[1];
} else {
awayScore = '-';
}
var gameObject = {
homeTeam: item.team1Abbreviation,
homeScore: homeScore,
awayTeam: item.team2Abbreviation,
awayScore: awayScore,
timestamp: item.eventStartTime,
datetime: convertToEastern(item.eventStartTime, offset, tzAbbrev),
eventId: item.eventId
};
gameObject.bottomData = prettyDatetime(item.eventDate);
if (vertical === 'nfl') {
gameObject.link = touchdownDomain + '/nfl/articles/pregame-report/' + item.eventId;
} else if (vertical === 'ncaaf') {
gameObject.link = touchdownDomain + '/ncaaf/articles/pregame-report/' + item.eventId;
} else {
gameObject.link = '#';
}
gameObject.mobileNode = buildNode(gameObject);
gameObject.desktopNode = buildNode(gameObject);
wpre.push(gameObject);
} else if (item.eventStartTime < now) {
var gameObject = {
homeTeam: item.team1Abbreviation,
homeScore: item.team1Score ? item.team1Score : '-',
awayTeam: item.team2Abbreviation,
awayScore: item.team2Score ? item.team2Score : '-',
timestamp: item.eventStartTime,
datetime: convertToEastern(item.eventStartTime, offset, tzAbbrev),
eventId: item.eventId
};
gameObject.homeClass = gameObject.homeScore !== '-' && gameObject.awayScore !== '-' && gameObject.homeScore < gameObject.awayScore ? 'ddb-grey' : null;
gameObject.awayClass = gameObject.homeScore !== '-' && gameObject.awayScore !== '-' && gameObject.homeScore > gameObject.awayScore ? 'ddb-grey' : null;
gameObject.bottomData = 'Final';
if (vertical === 'nfl') {
gameObject.link = touchdownDomain + '/nfl/articles/postgame-report/' + item.eventId;
} else if (vertical === 'ncaaf') {
gameObject.link = touchdownDomain + '/ncaaf/articles/postgame-report/' + item.eventId;
} else {
gameObject.link = '#';
}
gameObject.mobileNode = buildNode(gameObject);
gameObject.desktopNode = buildNode(gameObject);
wpost.push(gameObject);
}
}
};
pre = arraySort(pre, 1, 'timestamp');
active = arraySort(active, 1, 'timestamp');
post = arraySort(post, 1, 'timestamp');
wpre = arraySort(wpre, 1, 'timestamp');
wpost = arraySort(wpost, 1, 'timestamp');
var allGames = active.concat(pre, post, wpre, wpost);
return allGames;
};
var closeDropdowns = function closeDropdowns() {
var dropdowns = document.getElementsByClassName('ddb-dropdown');
for (var i = 0, length = dropdowns.length; i < length; i++) {
removeClass(dropdowns[i], 'ddb-show');
}
};
var closeMobileSubMenus = function closeMobileSubMenus() {
var dropdowns = document.getElementsByClassName('ddb-tier1-show');
for (var i = 0, length = dropdowns.length; i < length; i++) {
removeClass(dropdowns[i], 'ddb-tier1-show');
}
};
var windowEventMobile = function windowEventMobile(evt) {
var dropdownElement = mobileDropdown;
var target = evt.target;
var clickedInside = false;
do {
if (target === mobileMenuButton || target === dropdownElement) {
clickedInside = true;
target = false;
}
target = target.parentNode;
} while (target);
if (clickedInside) {
} else {
removeClass(mobileMenuButton, 'ddb-mobile-menu-open');
removeClass(mobileDropdown, 'ddb-show');
closeMobileSubMenus();
window.removeEventListener('click', windowEventMobile);
}
};
var windowEventMobileSearch = function windowEventMobileSearch(evt) {
var dropdownElement = mobileSearchBar;
var target = evt.target;
var clickedInside = false;
do {
if (target === mobileSearchButton || target === dropdownElement) {
clickedInside = true;
target = false;
}
target = target.parentNode;
} while (target);
if (clickedInside) {
} else {
removeClass(mobileSearchButton, 'ddb-mobile-search-open');
removeClass(mobileSearchBar, 'ddb-show');
window.removeEventListener('click', windowEventMobileSearch);
}
};
var windowEventSmallDesktopSearch = function windowEventSmallDesktopSearch(evt) {
var dropdownElement = smallDesktopSearchBar;
var target = evt.target;
var clickedInside = false;
do {
if (target === smallDesktopSearchButton || target === dropdownElement) {
clickedInside = true;
target = false;
}
target = target.parentNode;
} while (target);
if (clickedInside) {
} else {
removeClass(smallDesktopSearchButton, 'ddb-small-desktop-search-open');
removeClass(smallDesktopSearchBar, 'ddb-show');
window.removeEventListener('click', windowEventSmallDesktopSearch);
}
};
var windowEventDesktopBoxscores = function windowEventDesktopBoxscores(evt) {
var dropdownElement = desktopBoxscoresDropdown;
var target = evt.target;
var clickedInside = false;
do {
if (target === desktopBoxscoresButton || target === dropdownElement) {
clickedInside = true;
target = false;
}
target = target.parentNode;
} while (target);
if (clickedInside) {
} else {
removeClass(desktopBoxscoresButton, 'ddb-desktop-boxscores-open');
removeClass(desktopBoxscoresDropdown, 'ddb-show');
window.removeEventListener('click', windowEventDesktopBoxscores);
}
};
function createRequestObject() {
var obj;
var browser = navigator.appName;
if (browser == "Microsoft Internet Explorer") {
obj = new ActiveXObject("Microsoft.XMLHTTP");
} else {
obj = new XMLHttpRequest();
}
return obj;
}
function hasClass(element, className) {
if (element.classList) {
return element.classList.contains(className);
} else {
return (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + className + " ") > -1;
}
}
function addClass(element, className) {
if (element.classList) {
element.classList.add(className);
} else {
element.className += ' ' + className;
}
}
function removeClass(element, className) {
if (element.classList) {
element.classList.remove(className);
} else {
var reg = new RegExp('(?:^|\\s)' + className + '(?!\\S)');
element.className = element.className.replace(reg, '');
}
}
function endsWith(string, suffix) {
return string.indexOf(suffix, string.length - suffix.length) !== -1;
}
function ordinalSuffix(i) {
var j = i % 10,
k = i % 100;
if (j == 1 && k != 11) {
return i + "st";
}
if (j == 2 && k != 12) {
return i + "nd";
}
if (j == 3 && k != 13) {
return i + "rd";
}
return i + "th";
}
function getEasternTime() {
var utcYear = new Date().getUTCFullYear();
var daylightStart, daylightEnd, offset, abbrev;
var currentUTC = new Date().getTime();
daylightStart = new Date(utcYear, 2, 7, 0, 0, 0, 0);
daylightStart.setDate(7 + (7 - daylightStart.getDay()));
daylightStart.setUTCHours(7);
daylightStart = daylightStart.getTime();
daylightEnd = new Date(utcYear, 10, 1, 0, 0, 0, 0);
while (daylightEnd.getDay() !== 0) {
daylightEnd.setDate(daylightEnd.getDate() + 1);
}
daylightEnd.setUTCHours(6);
daylightEnd = daylightEnd.getTime();
if (currentUTC <= daylightStart || currentUTC > daylightEnd) {
offset = -5;
abbrev = 'EST';
} else {
offset = -4;
abbrev = 'EDT';
}
return {
offset: offset,
tzAbbrev: abbrev
};
}
function getToday(offset) {
var today = new Date(new Date().getTime() + offset * 3600 * 1000);
var month = today.getUTCMonth() + 1;
var date = today.getUTCDate();
var todayObject = {
today: today,
year: today.getUTCFullYear(),
month: month.toString().length === 1 ? '0' + month : month,
date: date.toString().length === 1 ? '0' + date : date
};
return todayObject;
}
function convertToEastern(date, offset, tzAbbrev) {
var date = new Date(date + offset * 3600 * 1000);
var hour = date.getUTCHours();
var meridian = hour >= 12 ? 'PM' : 'AM';
hour = hour > 12 ? hour - 12 : hour;
var minutes = date.getUTCMinutes();
minutes = minutes.toString().length === 1 ? '0' + minutes.toString() : minutes;
var convertedDate = hour + ':' + minutes + meridian + ' ' + tzAbbrev;
return convertedDate;
}
function prettyDatetime(date) {
var dates = date.split('-');
var months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
return months[Number(dates[1]) - 1] + ' ' + ordinalSuffix(dates[2]);
}
function arraySort(arr, ascending, attr) {
arr = arr.sort(function (a, b) {
if (ascending > 0) {
if (a[attr] < b[attr]) return -1;
if (a[attr] > b[attr]) return 1;
return 0;
} else {
if (a[attr] > b[attr]) return -1;
if (a[attr] < b[attr]) return 1;
return 0;
}
});
return arr;
}
function stateAbbrevToFull(abbrev) {
abbrev = abbrev.toLowerCase();
var map = {
'al': 'Alabama',
'ak': 'Alaska',
'az': 'Arizona',
'ar': 'Arkansas',
'ca': 'California',
'co': 'Colorado',
'ct': 'Connecticut',
'de': 'Delaware',
'dc': 'District Of Columbia',
'fl': 'Florida',
'ga': 'Georgia',
'hi': 'Hawaii',
'id': 'Idaho',
'il': 'Illinois',
'in': 'Indiana',
'ia': 'Iowa',
'ks': 'Kansas',
'ky': 'Kentucky',
'la': 'Lousiana',
'me': 'Maine',
'md': 'Maryland',
'ma': 'Massachusetts',
'mi': 'Michigan',
'mn': 'Minnesota',
'ms': 'Mississippi',
'mo': 'Missouri',
'mt': 'Montana',
'ne': 'Nebraska',
'nv': 'Nevada',
'nh': 'New Hampshire',
'nj': 'New Jersey',
'nm': 'New Mexico',
'ny': 'New York',
'nc': 'North Carolina',
'nd': 'North Dakota',
'oh': 'Ohio',
'ok': 'Oklahoma',
'or': 'Oregon',
'pa': 'Pennsylvania',
'ri': 'Rhode Island',
'sc': 'South Carolina',
'sd': 'South Dakota',
'tn': 'Tennessee',
'tx': 'Texas',
'ut': 'Utah',
'vt': 'Vermont',
'va': 'Virginia',
'wa': 'Washington',
'wv': 'West Virginia',
'wi': 'Wisconsin',
'wy': 'Wyoming'
};
return typeof map[abbrev] !== 'undefined' ? map[abbrev] : defaultState;
}
function debounce(func, wait, immediate) {
var timeout;
return function () {
var context = this,
args = arguments;
var later = function later() {
timeout = null;
if (!immediate) func.apply(context, args);
};
var callNow = immediate && !timeout;
clearTimeout(timeout);
timeout = setTimeout(later, wait);
if (callNow) func.apply(context, args);
};
};
function throttle(fn, threshhold, scope) {
threshhold || (threshhold = 250);
var last, deferTimer;
return function () {
var context = scope || this;
var now = +new Date(),
args = arguments;
if (last && now < last + threshhold) {
clearTimeout(deferTimer);
deferTimer = setTimeout(function () {
last = now;
fn.apply(context, args);
}, threshhold + last - now);
} else {
last = now;
fn.apply(context, args);
}
};
}
function clearInnerHTML(el) {
while (el.firstChild) {
el.removeChild(el.firstChild);
}
}
loadLinkDependencies();
})();
