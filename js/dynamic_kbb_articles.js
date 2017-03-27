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
var referrer = document.referrer ? document.referrer : window.location.href;
var season;
var currentDomain = "";
var verticalsUsingSubdom = ['mlb', 'nfl', 'ncaaf', 'nflncaaf'];

//TODO: waiting on API with KBB data
function generateArticleLink (scope, linkType, destinationId, articleType, remn) {
  var baseUrl = "http://";
  var output = "";
  baseUrl += (remn == "false") ? currentConfig.partnerDomain : currentConfig.domain;
  //now that we have the base Url, format the rest of the link
  output = baseUrl + "/" + scope + "/news/story/" + destinationId;
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
    console.log("list", l);
    currentConfig = getCategoryMetadata(l.category);
    var s = false;
    var o = '';
    function c(e) {
        if (d.readyState == 'complete' || d.readyState == 'interactive') {
            e()
            console.log(e());
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
    //Resets index count to 0 when swapping lists
    function m(ignoreRandom) {
      i = 0;
      httpGetData(ignoreRandom);
      console.log("ignoreRandom", ignoreRandom);
    }
    function httpGetData(ignoreRandom) {
      //Category is default to KBB if undefined, exception only for KBB widgets
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
      //TODO: waiting on new api call with KBB data
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
      p()
    }
    //Epoch date to human readable format
    function formattedDate(eDate){
      var date = eDate ? new Date(eDate) : new Date();
      var days = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
      var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOW", "DEC"];
      var month = date.getMonth();
      var day = date.getDate();
      var dayofWeek = date.getDay();
      var year = date.getFullYear();

      var formattedDate = days[dayofWeek] + ", " + monthNames[month] + ". " + day + ", " + year;
      return formattedDate;
    }

    function p() {
      var e = r.data[i];//Get current data of article on Dashboard
      a = generateArticleLink(l.category, e.source, e.article_id, e['article_type'], l.remn); //Generate current article link on Dashboard
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
      if ($('date') && e.last_updated) {
        $('date').innerHTML = formattedDate(e.last_updated*1000);
      }
      var stat = Math.floor(Number(e.stat));
      $('teaser-text').innerHTML = e.teaser.replace(/[\\]/g,"");
      var t = $('mainimg');
      var n = t.getAttribute('onerror');
      t.setAttribute('onerror', '');
      t.setAttribute('src', '');
        if (e.image_url != null && e.image_url != "null") {
          t.setAttribute('src', protocolToUse + "images.synapsys.us" + e.image_url + "?width=" + (t.width * window.devicePixelRatio));
        } else { //TODO: use placeholder images as fallback for articles instead of no-image image
          t.setAttribute('src', protocolToUse + "w1.synapsys.us/widgets/css/public/no_image.jpg");
        }
      setTimeout(function(e, t) {
          t.setAttribute('onerror', e)
      }.bind(undefined, n, t), 0);
  }

  function w(e) {//Left and right buttons
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
