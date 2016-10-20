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
        a = ['finance', 'nba', 'college_basketball', 'weather', 'crime', 'demographics', 'politics', 'disaster', 'mlb', 'nfl','ncaaf','nflncaaf'];
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
        i.open('GET', protocol + "://dev-tcxmedia-api.synapsys.us/articles?category=sports&subCategory=nfl&metaDataOnly=1&readyToPublish=true&count=20" , true);
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
            var i = r.l_title.indexOf('Republican') != -1 ? 'r' : r.l_title.indexOf('Independent') != -1 ? 'i' : 'd';
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
                // var a = "/";
                // var n = false
                // $("mainurl").style.cssText += "pointer-events:none; cursor:default",
                $("suburl").style.cssText += "pointer-events:none; cursor:default";
                $("carousel").className = "one";
                // $("line1").style.cssText += "pointer-events:none; cursor:default",
                // $("homelink").style.cssText += "pointer-events:none; cursor:default",
                //  $("list-link").style.display = "none";
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
        $('keyword').innerHTML = e.article_type.replace(/-/g," ");

        var date = new Date(e.last_updated*1000);
        var monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        var month = date.getMonth();
        var day = date.getDate();
        var year = date.getFullYear();

        var formattedDate = monthNames[month] + " " + day + ", " + year;
        $('date').innerHTML = formattedDate;
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
        if (l.category == "nfl" || l.category == "ncaaf" || l.category == "nflncaaf") {
          i = i >= r.data.length ? 0 : i < 0 ? r.data.length - 1 : i;
        }
        else {
          i = i >= r.l_data.length ? 0 : i < 0 ? r.l_data.length - 1 : i;
        }
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
                var hn = "Hoops Loyal";
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
              var hn = "Weather";
              break;
            case "politics":
            var hn = "Politics";
              break;
            case "disaster":
            var hn = "Disaster";
              break;
            case "demographics":
            var hn = "Demographics";
              break;
            case "crime":
            var hn = "Crime";
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
