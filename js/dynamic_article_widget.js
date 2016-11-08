function getCategoryMetadata (category) {
  var globalMeta = {
    trending: {
      displayName: "Trending",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "trending",
      subCategory: ""
    },
    breaking: {
      displayName: "Breaking",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "breaking",
      subCategory: ""
    },
    sports: {
      displayName: "Sports",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "sports",
      subCategory: ""
    },
    nfl: {
      displayName: "Football",
      domain: "www.touchdownloyal.com",
      partnerDomain: "www.mytouchdownzone.com",
      usesPartnerSubdomain: true,
      partnerSubdomain: "football",
      hasAiArticles: true,
      category: "sports",
      subCategory: "nfl"
    },
    ncaaf: {
      displayName: "Football",
      domain: "www.touchdownloyal.com",
      partnerDomain: "www.mytouchdownzone.com",
      usesPartnerSubdomain: true,
      partnerSubdomain: "football",
      hasAiArticles: true,
      category: "sports",
      subCategory: "ncaaf"
    },
    nba: {
      displayName: "Basketball",
      domain: "www.hoopsloyal.com",
      partnerDomain: "www.myhoopszone.com",
      usesPartnerSubdomain: false,
      hasAiArticles: true,
      category: "sports",
      subCategory: "nba"
    },
    ncaam: {
      displayName: "Basketball",
      domain: "www.hoopsloyal.com",
      partnerDomain: "www.myhoopszone.com",
      usesPartnerSubdomain: false,
      hasAiArticles: true,
      category: "sports",
      subCategory: "ncaam"
    },
    mlb: {
      displayName: "Baseball",
      domain: "www.homerunloyal.com",
      partnerDomain: "www.myhomereunzone.com",
      usesPartnerSubdomain: true,
      partnerSubdomain: "baseball",
      hasAiArticles: true,
      category: "sports",
      subCategory: "mlb"
    },
    nhl: {
      displayName: "Hockey",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com",
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
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "politics",
      subCategory: ""
    },
    entertainment: {
      displayName: "Entertainment",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "entertainment",
      subCategory: ""
    },
    food: {
      displayName: "Food",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "food",
      subCategory: ""
    },
    health: {
      displayName: "Health",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "health",
      subCategory: ""
    },
    lifestyle: {
      displayName: "Lifestyle",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com",
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
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "travel",
      subCategory: ""
    },
    weather: {
      displayName: "Weather",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "weather",
      subCategory: ""
    },
    automotive: {
      displayName: "Automotive",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxnews.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "automotive",
      subCategory: ""
    },
  };
  return globalMeta[category];
}

var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
var currentConfig;
var referrer = document.referrer;
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

function generateArticleLink (scope, linkType, destinationId, articleType, remn) {
  var baseUrl;
  var output = "";
  if (remn == "false") { //if partner
    if (currentConfig.usesPartnerSubdomain) { // if partner AND subdomain partner
      for (var i = 0; i < specialDomains.length; i++) {
        if (referrer.includes(specialDomains[i])) {
          baseUrl = "http://" + currentConfig.partnerSubdomain + specialDomains[i];
          break;
        }
      }
    }
    else { //only partner, not subdomain
      baseUrl = "http://" + currentConfig.partnerDomain;
    }
  }
  else { // not partner site and not partner domain
    baseUrl = "http://" + currentConfig.domain;
  }

  // now that we have the base Url, format the rest of the link
  if (linkType == "syndicated") {
    output = baseUrl + "/" + scope + "/news/story/" + destinationId;
  }
  else if (linkType = "ai") {
    output = baseUrl + "/" + scope + "/articles/" + articleType + "/" + destinationId;
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
      if (typeof l.category == 'undefined' || a.indexOf(l.category) == -1) {
          l.category = 'finance'
      }
      if (ignoreRandom == null) {
        var e = typeof l.rand != 'undefined' && n == 0 ? l.rand : Math.floor(Math.random() * 10);
      }
      else {
        var e = Math.floor(Math.random() * 10);
      }
      currentConfig = getCategoryMetadata(l.category);

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
      //i.open('GET', protocol + "://dev-tcxmedia-api.synapsys.us/articles?category=" + currentConfig.category + "&subCategory=" + currentConfig.subCategory + "&metaDataOnly=1&readyToPublish=true&count=20" , true);
        i.open('GET', protocol + "://dev-dw.synapsys.us/api_json/new_api_article_tdlcontext.php?category=" + currentConfig.category + "&subCategory=" + currentConfig.subCategory + "&metaDataOnly=1&readyToPublish=true&count=20" + "&referrer=http://www.courant.com/sports/football/hc-tom-brady-1009-20161006-story.html" , true); //todo: change to prod on deployment
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
        p()
      }
function p() {
        var e = r.data[i];
        a = generateArticleLink(l.category, e.source, e.article_id, e['article_type'], l.remn);
        if ($('list-link')) {
            $('list-link').href = a
        }
        if ($('title-link')) {
            $('title-link').href = a
        }
        $('title-text').innerHTML = e.title;
        if ($('keyword') && e.category) {
          $('keyword').innerHTML = e.category.replace(/-/g," ");
        }

        //todo: possibly make this a function
        if ($('date')) {
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
          $('date').innerHTML = formattedDate;
        }
        var stat = Math.floor(Number(e.stat));
        $('desc').innerHTML = e.teaser;
        var t = $('mainimg');
        var n = t.getAttribute('onerror');
        t.setAttribute('onerror', '');
        t.setAttribute('src', '');
          if (e.image_url != null && e.image_url != "null") {
            t.setAttribute('src', protocolToUse + "images.synapsys.us" + e.image_url);
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
        $('verticalDisplayName').innerHTML = currentConfig.displayName;
    }
    m();
    c(h);
    return {
        carousel: w,
        get_title: f,
        m: m
    }
}();
