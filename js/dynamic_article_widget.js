function getCategoryMetadata (category) {
  var globalMeta = {
    trending: {
      displayName: "Trending",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxmedia.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "trending",
      subCategory: ""
    },
    breaking: {
      displayName: "Breaking",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxmedia.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "breaking",
      subCategory: ""
    },
    sports: {
      displayName: "Sports",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxmedia.com",
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
      partnerDomain: "www.tcxmedia.com",
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
      partnerDomain: "www.tcxmedia.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "politics",
      subCategory: ""
    },
    entertainment: {
      displayName: "Entertainment",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxmedia.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "entertainment",
      subCategory: ""
    },
    food: {
      displayName: "Food",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxmedia.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "food",
      subCategory: ""
    },
    health: {
      displayName: "Health",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxmedia.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "health",
      subCategory: ""
    },
    lifestyle: {
      displayName: "Lifestyle",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxmedia.com",
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
      partnerDomain: "www.tcxmedia.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "travel",
      subCategory: ""
    },
    weather: {
      displayName: "Weather",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxmedia.com",
      usesPartnerSubdomain: false,
      hasAiArticles: false,
      category: "weather",
      subCategory: ""
    },
    automotive: {
      displayName: "Automotive",
      domain: "www.tcxmedia.com",
      partnerDomain: "www.tcxmedia.com",
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
var referrer;
if (document.referrer != "" && document.referrer != null) {
  referrer = document.referrer;
}
else {
  referrer = window.location.href;
}
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
  console.log(scope, linkType, destinationId, articleType, remn, dom);
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
      TCXbaseUrl = "http://tcxmedia.com/" + dom;
      AIbaseUrl = "http://" + currentConfig.partnerDomain + "/" + dom;
      partner = true;
    }
  }
  else { // not partner site and not partner domain
    TCXbaseUrl = "http://tcxmedia.com";
    AIbaseUrl = "http://" + currentConfig.domain;
    partner = false;
  }
  // now that we have the base Url, format the rest of the link
  if (linkType == "syndicated" || linkType == "tca-curated") {
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
  console.log(output);
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
        a = ['finance', 'nba', 'ncaam', 'weather', 'crime', 'demographics', 'politics', 'disaster', 'mlb', 'nfl','ncaaf','nflncaaf','entertainment','realestate','food','travel','health','sports','lifestyle','breaking','automotive'];
        if ((l.category == "" || l.category == null) && l.cat != null && l.cat != "") {
          l.category = l.cat;
        }
        if (l.category == "real-estate") {
          l.category = "realestate";
          l.cat = "realestate";
        }
        if (l.category == "nhl") {
          l.category = "sports";
          l.cat = "sports";
        }
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
          l.category = 'business'
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
      if (currentConfig.category == "realestate") {
        i.open('GET', protocol + "://dev-article-library.synapsys.us/articles?keyword[]=" + "real%20estate" + "&metaDataOnly=1&readyToPublish=true&count=20&source[]=snt_ai&source[]=tca-curated&source[]=tronc&random=1" , true);
      }
      else {
        i.open('GET', protocol + "://dev-article-library.synapsys.us/articles?category=" + currentConfig.category + "&subCategory=" + currentConfig.subCategory + "&metaDataOnly=1&readyToPublish=true&count=20&source[]=snt_ai&source[]=tca-curated&source[]=tronc&random=1" , true);
      }
        i.send()
    }

    function u() {
        var n = true;
        p()
      }
function p() {
        if (r.data.length <= 1) {
          $('next-list-link').classList.add("disabled-button");
        }
        else {
          $('next-list-link').classList.remove("disabled-button");
        }
        var e = r.data[i];
        a = generateArticleLink(l.category, e.source, e.article_id, e['article_type'], l.remn, l.dom);
        if ($('list-link')) {
            $('list-link').href = a
        }
        if ($('mainurl')) {
            $('mainurl').href = a
        }
        if ($('title-link')) {
            $('title-link').href = a
        }
        $('title-text').innerHTML = e.title.replace(/[\\]/g,"");
        if ($('title-text').clientHeight > 76) {
          $('desc').style.opacity = 0;
        }
        else {
          $('desc').style.opacity = 1;
        }
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
        $('desc').innerHTML = e.teaser.replace(/[\\]/g,"");
        var t = $('mainimg');
        var n = t.getAttribute('onerror');
        t.setAttribute('onerror', '');
        t.setAttribute('src', '');
          if (e.image_url != null && e.image_url != "null") {
            t.setAttribute('src', protocolToUse + "dev-images.synapsys.us" + e.image_url + "?width=" + (t.width * window.devicePixelRatio));
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
