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
    currentConfig = getCategoryMetadata(l.category);
    var s = false;
    var o = '';
    function onLoad(e) {
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
    //Resets index count to 0 when swapping lists
    function reset(ignoreRandom) {
      i = 0;
      httpGetData(ignoreRandom);
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
                  onLoad(getData)
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
      //TODO: change to prod on deployment, and change the hardcoded url to "referer" when embedding
      i.send()
    }

    function getData() {
      if (typeof dataLayer != 'undefined') {
          dataLayer.push({
              event: 'widget-title',
              eventAction: dynamic_widget.get_title()
          })
      }
      var n = true;
      formattedData()
    }
    /**
    * @function formattedDate
    * Format from epoch date to human readable format, example: Tuesday, Mar. 21, 2017
    */
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

    function formattedData() {
      if(r.data == null || typeof r.data == "undefined" || r.data.length == 0){
        return null;
      }
      var dataList = r.data.length > 5 ? r.data.splice(0,5) : r.data;//Get current data of article on Dashboard

      dataList.forEach(function(val, index){
        var artDetails = document.createElement('div');
        artDetails.className = 'main-row';
        var parent = document.getElementById('artMain');
        var titleText = val['title'].replace(/[\\]/g,"");
        var teaserText = val['teaser'].replace(/[\\]/g,"");
        var artUrl = generateArticleLink(l.category, val['source'], val['article_id'], val['article_type'], l.remn); //Generate current article link on Dashboard
        var artImg = val.image_url != null ? (protocolToUse + "images.synapsys.us" + val.image_url + "?width=" + (t.width * window.devicePixelRatio)) : (protocolToUse + "w1.synapsys.us/widgets/css/public/no_image.jpg");
        artDetails.innerHTML = '<div class="sixteen-nine"><img src='+artImg+' /></div><a class="main-ar" href="'+artUrl+'"><div class="main-ar-title">'+titleText+'</div><div class="main-ar-teaser">'+teaserText+'</div></a>';
        parent.appendChild(artDetails);
      });

      setTimeout(function(dataList, t) {
          t.setAttribute('onerror', dataList)
      }.bind(undefined, n, t), 0);
  }// END OF FUNC
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

  function setHomeLink() {
    var link = "";
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
  reset();
  onLoad(setHomeLink);
  return {
    carousel: carData,
    get_title: getTitle,
    m: reset
  }
}();
