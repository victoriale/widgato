function getCategoryMetadata (category) {
  var globalMeta = {
    kbb: {
      displayName: "Kelly Blue Book",
      domain: "www.kbb.com",
      partnerDomain: "www.kbb.com",
      usesPartnerSubdomain: true,
      hasAiArticles: false,
      category: "kbb",
      subCategory: ""
    }
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
        a = ['kbb'];
    currentConfig = getCategoryMetadata(l.category);
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
          l.category = 'kbb'
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
      i.open('GET', protocol + "://dev-article-library.synapsys.us/articles?category=" + "automotive" + "&subCategory=" + currentConfig.subCategory + "&metaDataOnly=1&readyToPublish=true&count=20" , true);

      // i.open('GET', protocol + "://dev-tcxmedia-api.synapsys.us/articles?category=" + currentConfig.category + "&subCategory=" + currentConfig.subCategory + "&metaDataOnly=1&readyToPublish=true&count=20" , true);
        // i.open('GET', protocol + "://dev-dw.synapsys.us/api_json/new_api_article_tdlcontext.php?category=" + currentConfig.category + "&subCategory=" + currentConfig.subCategory + "&metaDataOnly=1&readyToPublish=true&count=20" + "&referrer=" + "http://www.courant.com/sports/football/hc-tom-brady-1009-20161006-story.html" , true);
        //todo: change to prod on deployment, and change the hardcoded url to "referer" when embedding
        i.send()
    }

    function u() {
        if (typeof dataLayer != 'undefined') {
            dataLayer.push({
                event: 'widget-title',
                eventAction: dynamic_widget.get_title()
            })
        }
        var n = true;
        formattedData()
      }

      function formattedData() {
        if (r.data.length <= 1) {
          $('next-list-link').classList.add("disabled-button");
        }
        else {
          $('next-list-link').classList.remove("disabled-button");
        }
        var e = r.data[i];
        var genLink = generateArticleLink(l.category, e.source, e.article_id, e['article_type'], l.remn);// generate current article url
        $('mainUrl').href = genLink;
        if($('mainTitle')){
          $('mainTitle').innerHTML = e['title'] ? (e['title'].length > 52 ? e['title'].replace(/[\\]/g,"").substring(0,52) : e['title'].replace(/[\\]/g,"")) : "";//limit to 2 lines aka 55 characters
          $('mainTitle').innerHTML += e['title'].length > 52 ? "..." : "";
        }
        if($('teaser')){
          var len = e['title'].length < 25 ? 135 : 95;//increase limit of character in teaser if title is one line or less
          $('teaser').innerHTML = e['teaser'] ? (e['teaser'].length > len ? e['teaser'].replace(/[\\]/g,"").substring(0,len) : e['teaser'].replace(/[\\]/g,"")) : "";//limit to 3 or 4 lines depends on the number of lines in the title
          $('teaser').innerHTML += e['teaser'].length > len ? "..." : "";
        }
        var t = $('mainImg');
        var n = t.getAttribute('onerror');
        t.setAttribute('onerror', '');
        t.setAttribute('src', '');
        if (e['image_url'] != null && e['image_url'] != "null") {
          t.setAttribute('src', protocolToUse + "images.synapsys.us" + e['image_url'] + "?width=" + (t.width * window.devicePixelRatio));
        } else {
          t.setAttribute('src', protocolToUse + "w1.synapsys.us/widgets/css/public/no_image.jpg");
        }
        setTimeout(function(e, t) {
            t.setAttribute('onerror', e)
        }.bind(undefined, n, t), 0);
    }
    /**
    * @function carData
    * This function goes to the next or previous carousel item by adding dir to
    * the current index. This is usually called via the onClick event on the nav
    * buttons.
    *
    * @param int dir - This number is added to the index to create the index of
    * the item to be shown.
    */
    function carData(dir) {
        i += dir;
        i = i >= r.data.length ? 0 : i < 0 ? r.data.length - 1 : i;
        formattedData();
        if (typeof dataLayer != 'undefined') {
            dataLayer.push({
                event: dir == 1 ? 'nav-right' : 'nav-left',
                eventAction: dynamic_widget.get_title()
            })
        }
    }

    function getTitle() {
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
        carousel: carData,
        get_title: getTitle,
        m: m
    }
}();
