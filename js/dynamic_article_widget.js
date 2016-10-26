//todo: use this function for all category specific logic
function getCategoryMetadata (category) {
  var globalMeta = {
    trending: {
      displayName: "Trending",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com"
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "trending",
      subCategory: ""
    },
    breaking: {
      displayName: "Breaking",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com"
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "breaking",
      subCategory: ""
    },
    sports: {
      displayName: "Sports",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com"
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "sports",
      subCategory: ""
    },
    nfl: {
      displayName: "Football",
      domain: "www.touchdownloyal.com",
      partnerDomain: "www.mytouchdownzone.com"
      usesPartnerSubdomain: true,
      hasAiArticles: true,
      category: "sports",
      subCategory: "nfl"
    },
    ncaaf: {
      displayName: "Football",
      domain: "www.touchdownloyal.com",
      partnerDomain: "www.mytouchdownzone.com"
      usesPartnerSubdomain: true,
      hasAiArticles: true,
      category: "sports",
      subCategory: "ncaaf"
    },
    nba: {
      displayName: "Basketball",
      domain: "www.hoopsdownloyal.com",
      partnerDomain: "www.myhoopszone.com"
      usesPartnerSubdomain: false,
      hasAiArticles: true,
      category: "sports",
      subCategory: "nba"
    },
    ncaam: {
      displayName: "Basketball",
      domain: "www.hoopsdownloyal.com",
      partnerDomain: "www.myhoopszone.com"
      usesPartnerSubdomain: false,
      hasAiArticles: true,
      category: "sports",
      subCategory: "ncaam"
    },
    mlb: {
      displayName: "Baseball",
      domain: "www.homerunloyal.com",
      partnerDomain: "www.myhomereunzone.com"
      usesPartnerSubdomain: true,
      hasAiArticles: true,
      category: "sports",
      subCategory: "mlb"
    },
    nhl: {
      displayName: "Hockey",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com"
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "sports",
      subCategory: "nhl"
    },
    business: {
      displayName: "Business",
      domain: "www.investkit.com",
      partnerDomain: "www.myinvestkit.com"
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "business",
      subCategory: ""
    },
    politics: {
      displayName: "Politics",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com"
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "politics",
      subCategory: ""
    },
    entertainment: {
      displayName: "Entertainment",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com"
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "entertainment",
      subCategory: ""
    },
    food: {
      displayName: "Food",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com"
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "food",
      subCategory: ""
    },
    health: {
      displayName: "Health",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com"
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "health",
      subCategory: ""
    },
    lifestyle: {
      displayName: "Lifestyle",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com"
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "lifestyle",
      subCategory: ""
    },
    realestate: {
      displayName: "Real Estate",
      domain: "www.joyfulhome.com",
      partnerDomain: "www.myhousekit.com"
      usesPartnerSubdomain: false,
      hasAiArticles: true,
      category: "realestate",
      subCategory: ""
    },
    travel: {
      displayName: "Travel",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com"
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "travel",
      subCategory: ""
    },
    weather: {
      displayName: "Weather",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com"
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "weather",
      subCategory: ""
    },
    automotive: {
      displayName: "Automotive",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com"
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "automotive",
      subCategory: ""
    },
  };
  return globalMeta[category];
}


var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
var mlbDomain        = "http://www.homerunloyal.com/";
var nflDomain        = "http://www.touchdownloyal.com/";
var mlbPartnerDomain = "http://www.myhomerunzone.com/";
var nflPartnerDomain = "http://www.mytouchdownzone.com/";
var referrer = document.referrer;
var season;
var SpecialDomain = "";
var currentDomain = "";
var verticalsUsingSubdom = ['mlb', 'nfl', 'ncaaf', 'nflncaaf'];
if(referrer.match(/\/\/baseball\./i)){
    mlbPartnerDomain = protocolToUse + referrer.split('/')[2] + "/";
}
// if in iframe, get url from parent (referrer), else get it from this window location (works for localhost)
var baseUrl = referrer.length ? getBaseUrl(referrer) : window.location.origin;

function getBaseUrl(string){
    var urlArray = string.split("/");
    var domain = urlArray[2];
    return protocolToUse + "//" + domain;
}

dynamic_widget = function() {
    var e = location.protocol == 'https:' ? 'https' : 'http',
        protocol = location.protocol == 'https:' ? 'https' : 'http',
        t = e + '://dw.synapsys.us/list_api.php',
        i = 0,
        r = {},
        l = JSON.parse(decodeURIComponent(location.search.substr(1))),
        n = 0,
        a = ['finance', 'nba', 'college_basketball', 'weather', 'crime', 'demographics', 'politics', 'disaster', 'mlb', 'nfl','ncaaf','nflncaaf','entertainment','realestate','food','travel','health','sports','lifestyle','breaking','automotive'];
    var s = false;
    var o = '';
    function c(e) {
        if (d.readyState == 'complete' || d.readyState == 'interactive') {
            e()
        } else if (d.addEventListener) {
            d.addEventListener('DOMContentLoaded', e)
        } else if (d.attachEvent) {
            d.attachEvent('onreadystatechange', function() {
                if (d.readyState == 'complete') {
                    e()
                }
            })
        }
    }
    function getRandList() {
      rand = Math.floor((Math.random() * 138) + 1);
      var date = new Date;
      var compareDate = new Date('09 15 ' + date.getFullYear());
      if (date.getMonth() == compareDate.getMonth() && date.getDate() >= compareDate.getDate()) {
        httpGetData("&season=" + date.getFullYear());
        season = date.getFullYear();
      }
      else if (date.getMonth() > compareDate.getMonth()) {
        httpGetData("&season=" + date.getFullYear());
        season = date.getFullYear();
      }
      else {
        httpGetData("&season=" + (date.getFullYear() - 1));
        season = (date.getFullYear() - 1);
      }
    }

    function m(ignoreRandom) {
      i = 0;// resets index count to 0 when swapping lists
        getRandList();
    }
    function httpGetData(query, ignoreRandom) {
      if (l.dom == 'lasvegasnow.com') {
          s = true;
          o = 'finance.lasvegasnow.com'
      }
      if (typeof l.category == 'undefined' || a.indexOf(l.category) == -1) {
          l.category = 'finance'
      }
      if (ignoreRandom == null) {
        var e = typeof l.rand != 'undefined' && n == 0 ? l.rand : Math.floor(Math.random() * 10);
      }
      else {
        var e = Math.floor(Math.random() * 10);
      }

      var i;
      if (window.XMLHttpRequest) {
          i = new XMLHttpRequest
      } else {
          i = new ActiveXObject('Microsoft.XMLHTTP')
      }
      i.onreadystatechange = function() {
          if (i.readyState == XMLHttpRequest.DONE) {
              if (i.status == 200) {
                  r = JSON.parse(i.responseText);
                  c(u)
              } else {
                  var e = i.statusText;
                  if (i.status == 500) {
                      try {
                          e = JSON.parse(i.responseText).message
                      } catch (t) {
                          console.log('No JSON message')
                      }
                  }
                  e = 'HTTP Error (' + i.status + '): ' + e;
                  if (n++ > 10) {
                      throw e
                  }
                  setTimeout(m, 500)
              }
          }
      };
        var cat = "";
        var subCat = "";
        switch(l.category) {
            case "trending":
            case "breaking":
            case "food":
            case "health":
            case "lifestyle":
            case "realestate":
            case "travel":
            case "weather":
            case "automotive":
            case "business":
            case "politics":
              cat = l.category;
              subCat = "";
              break;

            //sports
            case "sports":
              cat = l.category;
              subCat = "";
              break;
            case "nfl":
            case "ncaaf":
            case "nba":
            case "ncaam":
            case "mlb":
            case "nhl":
              cat = "sports";
              subCat = l.category;
              break;

            //entertainment
            case "entertainment":
              cat = l.category;
              subCat = "";
              break;
            case "tv":
            case "movies":
            case "music":
            case "celebrities":
              cat = "entertainment";
              subCat = l.category;
              break;

        }
        i.open('GET', protocol + "://dev-tcxmedia-api.synapsys.us/articles?category=" + cat + "&subCategory=" + subCat + "&metaDataOnly=1&readyToPublish=true&count=20" , true); //todo: change to prod on deployment
        i.send()
    }

    function u() {
        if (typeof dataLayer != 'undefined') {
            dataLayer.push({
                event: 'widget-title',
                eventAction: dynamic_widget.get_title()
            })
        }
        if (l.category == 'politics') {
            var polOptions = ['i','r','d'];
            var rand = Math.floor((Math.random() * 3) + 1)-1;
            var i = polOptions[rand];
            var cssId = 'politicsCss';  // you could encode the css path itself to generate id..
            if (document.getElementById(cssId))
            {
              var element = document.getElementById(cssId);
              element.parentNode.removeChild(element);
            }
            var head  = document.getElementsByTagName('head')[0];
            var link  = document.createElement('link');
            link.id   = cssId;
            link.rel  = 'stylesheet';
            link.type = 'text/css';
            link.href = '../css/dynamic_widget_politics_' + i + '.css';
            link.media = 'all';
            head.appendChild(link);
        }
        if (l.category == 'mlb') {
            r.l_title = r.l_title.replace("MLB","Baseball");
        }
        var n = true;
        var specialDomains = [
          "latimes.com",
          "orlandosentinel.com",
          "sun-sentinel.com",
          "baltimoresun.com",
          "mcall.com",
          "courant.com",
          "dailypress.com",
          "southflorida.com",
          "citypaper.com",
          "themash.com",
          "coastlinepilot.com",
          "sandiegouniontribune.com",
          "ramonasentinel.com",
          "capitalgazette.com",
          "chicagotribune.com"
        ];
        if (document.referrer == "") {
          currentDomain = window.location.hostname.toString();
        }
        else {
          currentDomain = document.referrer;
          currentDomain = currentDomain.split('/')[2];
        }
        currentDomain = currentDomain.replace(/^[^.]*\.(?=\w+\.\w+$)/, ""); //remove www.
        switch (l.category) {
            case 'nba':
                var a = l.remn == 'true' ? 'http://www.hoopsloyal.com/NBA/widget-list' : 'http://www.myhoopszone.com/' + l.dom + '/NBA/w-list';
                break;
            case 'college_basketball':
                var a = l.remn == 'true' ? 'http://www.hoopsloyal.com/NCAA/widget-list' : 'http://www.myhoopszone.com/' + l.dom + '/NCAA/w-list';
                break;
            case "mlb":
                for (i = 0; i <= specialDomains.length; i++) {
                  if (currentDomain == specialDomains[i]) {
                    SpecialDomain = "http://baseball." + specialDomains[i];
                  }
                }
                $("suburl").style.cssText += "pointer-events:none; cursor:default";
                $("carousel").className = "one";
                var a = "";
                if (SpecialDomain == "") {
                      a = l.remn == 'true' ? 'http://www.homerunloyal.com/list' : mlbPartnerDomain + l.dom +'/list';
                }
                else {
                  a = SpecialDomain + '/list';
                }
                var n = false
                break;
            case "nfl":
            case "ncaaf":
            case "nflncaaf":
                for (i = 0; i <= specialDomains.length; i++) {
                  if (currentDomain == specialDomains[i]) {
                    SpecialDomain = "http://football." + specialDomains[i] ;
                  }
                }
                $("suburl").style.cssText += "pointer-events:none; cursor:default";
                $("carousel").className = "one";
                var a = "";
                if (SpecialDomain == "") {
                      a = l.remn == 'true' ? 'http://www.touchdownloyal.com' : nflPartnerDomain + l.dom;
                }
                else {
                  //for football.partnerdomain.com
                  a = SpecialDomain;
                }
                var n = false
                break;
            case 'finance':
                var a = l.remn == 'true' ? 'http://www.investkit.com/widget-list' : 'http://www.myinvestkit.com/' + l.dom + '/w-list';
                if (s) {
                    a = a.replace('www.myinvestkit.com', o)
                }
                break;
            default:
                var a = l.remn == 'true' ? 'http://www.joyfulhome.com/wlist' : 'http://www.myhousekit.com/' + l.dom + '/wlist';
                var n = false
        }
        if (l.category != "nfl" && l.category != "ncaaf" && l.category != "nflncaaf") {
          a += n ? '?tw=' + r.l_param + '&sw=' + r.l_sort + '&input=' + r.l_input : '/tw-' + r.l_param + '+sw-' + r.l_sort + '+input-' + r.l_input;
        }
        else {
          a += "/" + l.category + "/"; //todo: add link structure logic for both ai and syndicated articles
        }
        if ($('list-link')) {
            $('list-link').href = a
        }
        if ($('title-link')) {
            $('title-link').href = a
        }
        p()
      }
function p() {
        var e = r.data[i];
        var v_link = '';
        $('title-text').innerHTML = e.title;
        if ($('keyword') && e.category) {
          $('keyword').innerHTML = e.category.replace(/-/g," ");
        }

        //todo: possibly make this a function
        var date = new Date(e.last_updated*1000);
        var days = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
        var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
          "JUL", "AUG", "SEP", "OCT", "NOW", "DEC"
        ];
        var month = date.getMonth();
        var day = date.getDate();
        var dayofWeek = date.getDay();
        var year = date.getFullYear();

        var formattedDate = days[dayofWeek] + ", " + monthNames[month] + ". " + day + ", " + year;
        if ($('date')) {
          $('date').innerHTML = formattedDate;
        }
          // var a = "";
          // if (SpecialDomain == "") {
          //   v_link = l.remn == 'true' ? "/player/" + e.teamName.replace(/ /g, "-").toLowerCase() + '/' + e.playerFirstName.replace(/ /g, "-").toLowerCase() + '-' + e.playerLastName.replace(/ /g, "-").toLowerCase() + "/" + e.playerId : "/p/" + e.teamName.replace(/ /g, "-").toLowerCase() + '/' + e.playerFirstName.replace(/ /g, "-").toLowerCase() + '-' + e.playerLastName.replace(/ /g, "-").toLowerCase() + "/" + e.playerId;
          //
          //   a = l.remn == 'true' ? 'http://www.touchdownloyal.com' + "/" +l.category+v_link : nflPartnerDomain + l.dom + "/" + l.category+v_link;
          // }
          // else {
          //   v_link = "/player/" + e.teamName.replace(/ /g, "-").toLowerCase() + '/' + e.playerFirstName.replace(/ /g, "-").toLowerCase() + '-' + e.playerLastName.replace(/ /g, "-").toLowerCase() + "/" + e.playerId;
          //
          //   a = SpecialDomain + "/" + l.category+v_link;
          // }
          // $('mainurl').href = a;
          // $('line1').href = a;
        var statType = "";
        statType = statType.replace("player", "");
        statType = statType.replace("team", "");
        statType = statType.replace(/(^| )(\w)/g, function(x) {
          return x.toUpperCase();
        });
        var stat = Math.floor(Number(e.stat));
        $('desc').innerHTML = e.teaser;
        var t = $('mainimg');
        var n = t.getAttribute('onerror');
        t.setAttribute('onerror', '');
        t.setAttribute('src', '');
          if (e.image_url != null && e.image_url != "null") {
            t.setAttribute('src', protocolToUse + "images.synapsys.us" + e.image_url);
          }
          else {
            t.setAttribute('src', protocolToUse + "w1.synapsys.us/widgets/css/public/no_image.jpg");
          }
        setTimeout(function(e, t) {
            t.setAttribute('onerror', e)
        }.bind(undefined, n, t), 0);

        if ($('list-link')) {
            var u = d.getElementsByClassName('dw-btn')[0];
            if (u.offsetTop + u.scrollHeight > d.getElementsByClassName('dw')[0].clientHeight - 10 && d.getElementsByClassName('dw')[0].clientHeight <= 250) {
                d.getElementsByClassName('dw-btn')[0].setAttribute('style', 'margin-top: 0')
            }
        }
        var p = $('title-text');
    }

    function w(e) {
        i += e;
        i = i >= r.data.length ? 0 : i < 0 ? r.data.length - 1 : i;
        p();
        if (typeof dataLayer != 'undefined') {
            dataLayer.push({
                event: e == 1 ? 'nav-right' : 'nav-left',
                eventAction: dynamic_widget.get_title()
            })
        }
    }

    function f() {
        return l.dom + ':' + l.category + ':' + (r.l_sort == null ? r.l_param : r.l_sort) + ':' + r.l_title
    }

    function h() {
      var hn = "";
        if (l.carousel == true) {
            var e = d.getElementsByTagName('a');
            for (var t = 0; t < e.length; t++) {
                e[t].setAttribute('onclick', 'event.preventDefault(); return false;')
            }
            var i = d.querySelectorAll('.hover');
            for (var t = 0; t < i.length; t++) {
                i[t].parentNode.removeChild(i[t])
            }
            $('list-link').parentNode.removeChild($('list-link'));
            return false
        }
        switch (l.category) {
            case 'finance':
                var r = l.remn == 'true' ? 'http://www.investkit.com/' : 'http://www.myinvestkit.com/' + l.dom + '/';
                if (s) {
                    r = r.replace('www.myinvestkit.com', o)
                }
                hn = "Finance";
                break;
            case 'nba':
                var r = l.remn == 'true' ? 'http://www.hoopsloyal.com/NBA' : 'http://www.myhoopszone.com/' + l.dom + '/NBA';
                var hn = "Basketball";
                break;
            case 'college_basketball':
                var r = l.remn == 'true' ? 'http://www.hoopsloyal.com/NCAA' : 'http://www.myhoopszone.com/' + l.dom + '/NCAA';
                var hn = "Basketball";
                break;
            case "mlb":
                var r = "";
                if( mlbPartnerDomain == "http://www.myhomerunzone.com/") {
                    r = l.remn == 'true' ? 'http://www.homerunloyal.com/' : mlbPartnerDomain + l.dom + '/';
                }else{
                    r = mlbPartnerDomain;
                }
                var hn = "Baseball";
              break;
            case "nfl":
            case "ncaaf":
            case "nflncaaf":
                var r = "";
                if( nflPartnerDomain == "http://www.mytouchdownzone.com/") {
                    r = l.remn == 'true' ? 'http://www.touchdownloyal.com/' : nflPartnerDomain + l.dom + '/';
                }else{
                    r = nflPartnerDomain;
                }
                var hn = "Football";
              break;
            case "weather":
            case "politics":
            case "disaster":
            case "demographics":
            case "crime":
            case "tcx":
            case "entertainment":
            case "food":
            case "travel":
            case "health":
            case "sports":
            case "lifestyle":
            case "breaking":
            case "ipo":
            case "automotive":
              var hn = l.category;
              break;
            case "realestate":
            var hn = "Real Estate";
              break;
            default:
                var r = l.remn == 'true' ? 'http://www.joyfulhome.com/' : 'http://www.myhousekit.com/' + l.dom + '/loc/';
                var hn = "Homes";
                break
        }
        $('verticalDisplayName').innerHTML = hn;
    }
    m();
    c(h);
    return {
        carousel: w,
        get_title: f,
        m: m
    }
}();
