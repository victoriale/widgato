function getCategoryMetadata (category) {
  var globalMeta = {
    trending: {
      displayName: "Trending",
      domain: "dev.tcxmedia.com",
      partnerDomain: "dev.tcxmedia.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "trending",
      subCategory: ""
    },
    breaking: {
      displayName: "Breaking",
      domain: "dev.tcxmedia.com",
      partnerDomain: "dev.tcxmedia.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "breaking",
      subCategory: ""
    },
    sports: {
      displayName: "Sports",
      domain: "dev.tcxmedia.com",
      partnerDomain: "dev.tcxmedia.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "sports",
      subCategory: ""
    },
    football: {
      displayName: "Football",
      domain: "dev.touchdownloyal.com",
      partnerDomain: "www.mytouchdownzone.com",
      usesPartnerSubdomain: true,
      partnerSubdomain: "football",
      hasAiArticles: true,
      category: "sports",
      subCategory: "nfl"
    },
    nfl: {
      displayName: "Football",
      domain: "dev.touchdownloyal.com",
      partnerDomain: "www.mytouchdownzone.com",
      usesPartnerSubdomain: true,
      partnerSubdomain: "football",
      hasAiArticles: true,
      category: "sports",
      subCategory: "nfl"
    },
    ncaaf: {
      displayName: "Football",
      domain: "dev.touchdownloyal.com",
      partnerDomain: "www.mytouchdownzone.com",
      usesPartnerSubdomain: true,
      partnerSubdomain: "football",
      hasAiArticles: true,
      category: "sports",
      subCategory: "ncaaf"
    },
    basketball: {
      displayName: "Basketball",
      domain: "dev.hoopsloyal.com",
      partnerDomain: "www.myhoopszone.com",
      usesPartnerSubdomain: false,
      hasAiArticles: true,
      category: "sports",
      subCategory: "nba"
    },
    nba: {
      displayName: "Basketball",
      domain: "dev.hoopsloyal.com",
      partnerDomain: "www.myhoopszone.com",
      usesPartnerSubdomain: false,
      hasAiArticles: true,
      category: "sports",
      subCategory: "nba"
    },
    ncaam: {
      displayName: "Basketball",
      domain: "dev.hoopsloyal.com",
      partnerDomain: "www.myhoopszone.com",
      usesPartnerSubdomain: false,
      hasAiArticles: true,
      category: "sports",
      subCategory: "ncaam"
    },
    baseball: {
      displayName: "Baseball",
      domain: "dev.homerunloyal.com",
      partnerDomain: "www.myhomereunzone.com",
      usesPartnerSubdomain: true,
      partnerSubdomain: "baseball",
      hasAiArticles: true,
      category: "sports",
      subCategory: "mlb"
    },
    mlb: {
      displayName: "Baseball",
      domain: "dev.homerunloyal.com",
      partnerDomain: "www.myhomereunzone.com",
      usesPartnerSubdomain: true,
      partnerSubdomain: "baseball",
      hasAiArticles: true,
      category: "sports",
      subCategory: "mlb"
    },
    nhl: {
      displayName: "Hockey",
      domain: "dev.tcxmedia.com",
      partnerDomain: "dev.tcxmedia.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "sports",
      subCategory: "nhl"
    },
    business: {
      displayName: "Business",
      domain: "www.investkit.com",
      partnerDomain: "www.myinvestkit.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "business",
      subCategory: ""
    },
    politics: {
      displayName: "Politics",
      domain: "dev.tcxmedia.com",
      partnerDomain: "dev.tcxmedia.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "politics",
      subCategory: ""
    },
    entertainment: {
      displayName: "Entertainment",
      domain: "dev.tcxmedia.com",
      partnerDomain: "dev.tcxmedia.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "entertainment",
      subCategory: ""
    },
    food: {
      displayName: "Food",
      domain: "dev.tcxmedia.com",
      partnerDomain: "dev.tcxmedia.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "food",
      subCategory: ""
    },
    health: {
      displayName: "Health",
      domain: "dev.tcxmedia.com",
      partnerDomain: "dev.tcxmedia.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "health",
      subCategory: ""
    },
    lifestyle: {
      displayName: "Lifestyle",
      domain: "dev.tcxmedia.com",
      partnerDomain: "dev.tcxmedia.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "lifestyle",
      subCategory: ""
    },
    realestate: {
      displayName: "Real Estate",
      domain: "www.joyfulhome.com",
      partnerDomain: "www.myhousekit.com",
      usesPartnerSubdomain: false,
      hasAiArticles: true,
      category: "realestate",
      subCategory: ""
    },
    travel: {
      displayName: "Travel",
      domain: "dev.tcxmedia.com",
      partnerDomain: "dev.tcxmedia.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "travel",
      subCategory: ""
    },
    weather: {
      displayName: "Weather",
      domain: "dev.tcxmedia.com",
      partnerDomain: "dev.tcxmedia.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "weather",
      subCategory: ""
    },
    automotive: {
      displayName: "Automotive",
      domain: "dev.tcxmedia.com",
      partnerDomain: "dev.tcxmedia.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "automotive",
      subCategory: ""
    },
  };
  if (globalMeta[category]) {
    return globalMeta[category];
  }
  else {
    return globalMeta["trending"];
  }
}

var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
var currentConfig;
var referrer;
if (document.referrer != "" && document.referrer != null) {
  referrer = document.referrer;
}
else {
  referrer = window.location.href;
}

var iglooResponded = 0;
var season;
var SpecialDomain = "";
var currentDomain = "";
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
var verticalsUsingSubdom = ['mlb', 'nfl', 'ncaaf', 'nflncaaf'];

function generateArticleLink (scope, linkType, destinationId, articleType, remn, dom) {
  var TCXbaseUrl;
  var AIbaseUrl;
  var partner;
  var subCategory = "";
  if (currentConfig.subCategory != null && currentConfig.subCategory != "") {
    subCategory= "/" + currentConfig.subCategory;
  }
  var output = "";
  if (remn == "false") { //if partner
    if (currentConfig.usesPartnerSubdomain) { // if partner AND subdomain partner
      for (var i = 0; i < specialDomains.length; i++) {
        if (referrer.includes(specialDomains[i])) {
          TCXbaseUrl = "http://" + currentConfig.partnerSubdomain + specialDomains[i];
          AIbaseUrl = "http://" + currentConfig.partnerSubdomain + specialDomains[i];
          partner = true;
          break;
        }
      }
    }
    else { //only partner, not subdomain
      TCXbaseUrl = "http://dev.tcxmedia.com/" + dom;
      AIbaseUrl = "http://" + currentConfig.partnerDomain + "/" + dom;
      partner = true;
    }
  }
  else { // not partner site and not partner domain
    TCXbaseUrl = "http://dev.tcxmedia.com";
    AIbaseUrl = "http://" + currentConfig.domain;
    partner = false;
  }
  // now that we have the base Url, format the rest of the link
  if (linkType == "syndicated" || linkType == "tca-curated" || linkType == "tronc") {
    if (partner == true) {
      output = TCXbaseUrl + "/news/" + scope + subCategory + "/article/story/" + destinationId;
    }
    else {
      output = TCXbaseUrl + "/news-feed/" + scope + subCategory + "/article/story/" + destinationId;
    }
  }
  else if (linkType == "ai" || linkType == "snt_ai_module" || linkType == "snt_ai") {
    output = AIbaseUrl + "/" + scope + "/articles/" + articleType + "/" + destinationId;
  }
  return output;
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

        //debug please remove below lines
        // referrer = "http://www.chicagotribune.com/entertainment/tv/ct-donald-trump-alec-baldwin-feud-20161219-story.html";
        // l.caw_url = "http://www.chicagotribune.com/entertainment/tv/ct-donald-trump-alec-baldwin-feud-20161219-story.html";

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
    function m(ignoreRandom) {
      i = 0;// resets index count to 0 when swapping lists
      httpGetData(ignoreRandom);
    }
    function httpGetData(ignoreRandom) {
      if (l.dom == 'lasvegasnow.com') {
          s = true;
          o = 'finance.lasvegasnow.com'
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
                  l.category = r[0].category;
                  console.log("l.category",l.category);
                  currentConfig = getCategoryMetadata(l.category);
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
      function iglooResponce(e){
        if ( e.type == "message" && typeof e.data != "undefined" && typeof e.data.action != "undefined" && e.data.action == "location" && iglooResponded == 0) { //message has been returned correctly
          console.log("igloo fired message",e);
          if (e.data.data) {
            l.caw_url = e.data.data.href;
          }
          console.log("CAW input url",l.caw_url);
          i.open('GET', protocol + "://dev-caw-api.synapsys.us/articles?url=" + l.caw_url , true);
          //todo: change to prod on deployment, and change the hardcoded url to "referer" when embedding
          i.send();
          iglooResponded = 1;
          window.removeEventListener('message', iglooResponce);
        }
      }
      window.parent.postMessage({action: 'location', igloo_id: 0}, "*");
      window.addEventListener('message', iglooResponce);
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
        p()
      }
function p() {
        if (r.length <= 1) {
          $('next-list-link').classList.add("disabled-button");
        }
        else {
          $('next-list-link').classList.remove("disabled-button");
        }
        var e = r[i];
        function add_css_link(e) {
          var hs = document.getElementsByTagName('link');
          for (var u=0, max = hs.length; u < max; u++) {
            if (hs[u] && hs[u].href.indexOf("dynamic_article_widget") == -1 && hs[u].href.indexOf("fonts.googleapis.com") == -1) {
              hs[u].parentNode.removeChild(hs[u]);
            }
          }
          console.log("CSS returned",e);
            var t = d.createElement("link");
            t.href = e, t.type = "text/css", t.rel = "stylesheet";
            var n = d.getElementsByTagName("head")[0];
            n.insertBefore(t, n.childNodes[0])
        }! function() {
          l.category = r[i].category;
          currentConfig = getCategoryMetadata(l.category);
            var e = "../css/dynamic_widget_",
                n = {
                    basketball: "basketball",
                    nba: "basketball",
                    college_basketball: "basketball",
                    baseball: "mlb",
                    mlb: "mlb",
                    football: "nfl",
                    nfl: "nfl",
                    ncaaf: "ncaaf",
                    nflncaaf: "nflncaaf",
                    finance: "finance",
                    crime: "crime",
                    demographics: "demographics",
                    disaster: "disaster",
                    weather: "weather",
                    tcx: "tcx",
                    entertainment: "entertainment",
                    realestate: "realestate",
                    food: "food",
                    travel: "travel",
                    health: "health",
                    sports: "sports",
                    lifestyle: "lifestyle",
                    business: "finance",
                    breaking: "breaking",
                    trending: "breaking",
                    ipo: "ipo",
                    automotive: "automotive"
                };
            return "politics" == l.category ? !1 : (("undefined" == typeof l.category || "undefined" == typeof n[l.category]) && (l.category = "trending"), e += n[l.category] + ".css", void add_css_link(e))
        }();
        a = generateArticleLink(l.category, e.source, e.article_id, e['category'], l.remn, l.dom);
        if ($('list-link')) {
            $('list-link').href = a
        }
        if ($('title-link')) {
            $('title-link').href = a
        }
        $('title-text').innerHTML = e.page_title.replace(/[\\]/g,"");
        if ($('keyword') && e.category) {
          $('keyword').innerHTML = e.category.replace(/-/g," ");
        }

        //todo: possibly make this a function
        if ($('date')) {
          var date = new Date(e.published_date*1000);
          var days = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
          var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
            "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
          ];
          var month = date.getMonth();
          var day = date.getDate();
          var dayofWeek = date.getDay();
          var year = date.getFullYear();

          var formattedDate = days[dayofWeek] + ", " + monthNames[month] + ". " + day + ", " + year;
          $('date').innerHTML = formattedDate;
        }
        var stat = Math.floor(Number(e.stat));
        $('desc').innerHTML = e.article_teaser.replace(/[\\]/g,"");
        $('verticalDisplayName').innerHTML = currentConfig.displayName;
        var t = $('mainimg');
        var n = t.getAttribute('onerror');
        t.setAttribute('onerror', '');
        t.setAttribute('src', '');
          if (e.image_url != null && e.image_url != "null") {
            t.setAttribute('src', e.image_url.replace(/ /g,"%20") + "?width=" + (t.width * window.devicePixelRatio));
          }
          else { //todo: use placeholder images as fallback for articles instead of no-image image
            t.setAttribute('src', protocolToUse + "w1.synapsys.us/widgets/css/public/no_image.jpg");
          }
        setTimeout(function(e, t) {
            t.setAttribute('onerror', e)
        }.bind(undefined, n, t), 0);
    }

    function w(e) {
        i += e;
        i = i >= r.length ? 0 : i < 0 ? r.length - 1 : i;
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
    }
    m();
    c(h);
    return {
        carousel: w,
        get_title: f,
        m: m
    }
}();
