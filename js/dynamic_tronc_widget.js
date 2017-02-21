function getCategoryMetadata (category) {
  var globalMeta = {
    tronc: {
      displayName: "TRONC",
      domain: "www.tronc.com",
      partnerDomain: "www.tronc.com",
      usesPartnerSubdomain: true,
      hasAiArticles: false,
      category: "tronc",
      subCategory: ""
    }
  };
  return globalMeta[category];
}

function getPublisher (pub) {
  var pubs = {
    homerunloyal: {
      displayName: "Home Run Loyal",
      link: "www.homerunloyal.com",
      logo: "../css/public/pub_logos/logo-homerun-loyal.svg",
      hex: "#bc2027"
    },
    touchdownloyal: {
      displayName: "Touchdown Loyal",
      link: "www.touchdownloyal.com",
      logo: "../css/public/pub_logos/logo-touchdown-loyal.svg",
      hex: "#0b3656"
    },
    hoopsloyal: {
      displayName: "Hoops Loyal",
      link: "www.hoopsloyal.com",
      logo: "../css/public/pub_logos/logo-hoops-loyal.svg",
      hex: "#f26f26"
    },
    investkit: {
      displayName: "Invest Kit",
      link: "www.investkit.com",
      logo: "../css/public/pub_logos/logo-invest-kit.svg",
      hex: "#3098ff"
    },
    joyfulhome: {
      displayName: "Joyful Home",
      link: "www.joyfulhome.com",
      logo: "../css/public/pub_logos/logo-joyful-home.svg",
      hex: "#43B149"
    }
  };
  return pubs[pub];
}

var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
var currentConfig;
var currentPub;
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
        a = ['tronc'];
    currentConfig = getCategoryMetadata(l.category);
    currentPub = getPublisher(l.pub);
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
      i.open('GET', protocol + "://dev-article-library.synapsys.us/articles?category=" + "business" + "&subCategory=" + currentConfig.subCategory + "&metaDataOnly=1&readyToPublish=true&count=20" , true);

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
        a = generateArticleLink(l.category, e.source, e.article_id, e['article_type'], l.remn);
        if ($('list-link')) {
            $('list-link').href = a
        }
        if ($('title-link')) {
            $('title-link').href = a
        }
        $('title-text').innerHTML = e.title.replace(/[\\]/g,"");
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
        //todo: plug in actual api date values here
        $('meta').innerHTML = "Posted on " + "Wednesday" + ", " + "January" + " " + "12" + ", " + "2017";
        $('pub_logo').style.backgroundImage = "url('" + currentPub.logo + "')";
        $('pub_link').href = "http://" + currentPub.link;
        var linkBtn = $('list-link').getElementsByClassName('dw-btn')[0];
        linkBtn.style.borderColor = currentPub.hex;
        linkBtn.style.color = currentPub.hex;
        linkBtn.style.fill = currentPub.hex;
        var css = '#carousel:hover .carouselShader {background-color: ' + currentPub.hex + '; opacity: 0.5;}';
        style = document.createElement('style');
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        document.getElementsByTagName('head')[0].appendChild(style);
        var t = $('mainimg');
        var n = t.getAttribute('onerror');
        t.setAttribute('onerror', '');
        t.setAttribute('src', '');
          if (e.image_url != null && e.image_url != "null") {
            t.setAttribute('src', protocolToUse + "images.synapsys.us" + e.image_url + "?width=" + (t.width * window.devicePixelRatio));
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
    }
    m();
    c(h);
    return {
        carousel: w,
        get_title: f,
        m: m
    }
}();
