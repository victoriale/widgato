/**
* @function getCategoryMetadata
* Get meta info based on partner info
*/
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
/**
* @function generateArticleLink
* Generate offsite article link
* scope: article category, linkType: depends article source, destinationId: unique article/event id,
* articleType: article type, such as story, video, etc., remn: partner or non-partner
*/
function generateArticleLink (scope, linkType, destinationId, articleType, remn) {
  var baseUrl = "http://";
  var output = "";
  baseUrl += (remn == "false") ? currentConfig.partnerDomain : currentConfig.domain;
  //now that we have the base Url, format the rest of the link
  output = baseUrl + "/" + scope + "/news/story/" + destinationId;
  return output;
}
/**
* @function getTabInfo
* List tab options
*/
function getTabInfo(option){
  var tabObj = {
    "trending": {
      display: "Trending News",
      category: "trending-news"
    },
    "reviews": {
      display: "Reviews",
      category: "reviews"
    },
    "top10": {
      display: "Top 10 Lists",
      category: "top-10-lists"
    },
    "videos": {
      display: "Videos",
      category: "videos"
    }
  }
  if(tabObj[option] == null || typeof tabObj[option] == "undefined"){// default return
    return{
      display: null,
      scope: null
    };
  } else {
    return tabObj[option];
  }
}
/**
* @function dynamic_widget
* Set up dynamic widget data here
*/
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
    /**
    * @function reset
    * Resets index count to 0 when swapping lists
    */
    function reset(ignoreRandom) {
      i = 0;
      httpGetData(ignoreRandom);
    }
    /**
    * @function httpGetData
    * Get data from API
    */
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
      //Test API: http://dev-article-library.synapsys.us/articles?category=automotive&metaDataOnly=1&readyToPublish=true&count=
      var count = 20;
      var category = "automotive";//TODO
      var subCategory = currentConfig.subCategory;
      i.open('GET', protocol+"://dev-article-library.synapsys.us/articles?category="+category+"&subCategory="+subCategory+ "&metaDataOnly=1&readyToPublish=true&count="+count, true);
      // i.open('GET', protocol + "://dev-tcxmedia-api.synapsys.us/articles?category=" + currentConfig.category + "&subCategory=" + currentConfig.subCategory + "&metaDataOnly=1&readyToPublish=true&count=20" , true);
      // i.open('GET', protocol + "://dev-dw.synapsys.us/api_json/new_api_article_tdlcontext.php?category=" + currentConfig.category + "&subCategory=" + currentConfig.subCategory + "&metaDataOnly=1&readyToPublish=true&count=20" + "&referrer=" + "http://www.courant.com/sports/football/hc-tom-brady-1009-20161006-story.html" , true);
      //todo: change to prod on deployment, and change the hardcoded url to "referer" when embedding
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
        getTab();
        formattedData();
        artData()
    }

    /**
    * @function formattedData
    * Format data accordingly to specs before displaying for top articles
    **/
    function formattedData() {
      if(r.data == null || typeof r.data == "undefined" || r.data.length == 0){
        return null;
      }
      if (r.data.length <= 1) {
        $('next-list-link').classList.add("disabled-button");
      }
      else {
        $('next-list-link').classList.remove("disabled-button");
      }
      /**Top Article/Carousel Data**/
      var dataList = r.data[i];
      var genLink =  generateArticleLink(l.category, dataList['source'], dataList['article_id'], dataList['article_type'], l.remn); //Generate current article link
      var playBtn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 486 486"><title>Asset 2</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M243,486C109,486,0,377,0,243S109,0,243,0,486,109,486,243,377,486,243,486Zm0-462.1C122.19,23.9,23.9,122.19,23.9,243S122.19,462.1,243,462.1,462.1,363.81,462.1,243,363.81,23.9,243,23.9Z"/><path d="M359.46,235.13,197.32,104.66a8.65,8.65,0,0,0-14.07,6.74V372.33a8.65,8.65,0,0,0,14.07,6.74L359.46,248.6A8.65,8.65,0,0,0,359.46,235.13Z"/></g></g></svg>';//play button svg source
      $('playBtn').innerHTML = playBtn;
      // $('mainTitle').innerHTML = dataList['title'] ? dataList['title'].replace(/[\\]/g,"") : "";
      if($('mainTitle')){
        $('mainTitle').innerHTML = dataList['title'] ? (dataList['title'].length > 80 ? dataList['title'].replace(/[\\]/g,"").substring(0,80) : dataList['title'].replace(/[\\]/g,"")) : "";//limit to 2 lines aka 55 characters
        $('mainTitle').innerHTML += dataList['title'].length > 80 ? "..." : "";
      }
      if($('teaser')){
        var readMore = "<span><a href='"+genLink+"'target=_blank>Read More</a></span>";
        var len = dataList['title'].length < 55 ? 130 : 95;//increase limit of character in teaser if title is one line or less
        $('teaser').innerHTML = dataList['teaser'] ? (dataList['teaser'].length > len ? dataList['teaser'].replace(/[\\]/g,"").substring(0,len):dataList['teaser'].replace(/[\\]/g,"")) : "";
        $('teaser').innerHTML += dataList['teaser'].length > len ? "... " + readMore : readMore;
      }
      $('mainUrl').href = genLink;
      var t = $('mainImg');
      var n = t.getAttribute('onerror');
      t.setAttribute('onerror', '');
      t.setAttribute('src', '');
      if (dataList['image_url'] != null && dataList['image_url'] != "null") {
        t.setAttribute('src', protocolToUse + "images.synapsys.us" + dataList['image_url'] + "?width=" + (t.width * window.devicePixelRatio));
      } else {
        t.setAttribute('src', protocolToUse + "w1.synapsys.us/widgets/css/public/no_image.jpg");
      }

      setTimeout(function(e, t) {
        t.setAttribute('onerror', e)
      }.bind(undefined, n, t), 0);
    }
    /**
    * @function artData
    * Format data accordingly to specs before displaying for bottom articles
    **/
    function artData(){
        var dataArr = r.data.length > 3 ? r.data.splice(0,3) : r.data;//Get current data of article on Dashboard
        var playBtn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 486 486"><title>Asset 2</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M243,486C109,486,0,377,0,243S109,0,243,0,486,109,486,243,377,486,243,486Zm0-462.1C122.19,23.9,23.9,122.19,23.9,243S122.19,462.1,243,462.1,462.1,363.81,462.1,243,363.81,23.9,243,23.9Z"/><path d="M359.46,235.13,197.32,104.66a8.65,8.65,0,0,0-14.07,6.74V372.33a8.65,8.65,0,0,0,14.07,6.74L359.46,248.6A8.65,8.65,0,0,0,359.46,235.13Z"/></g></g></svg>';//play button svg source
        /**Bottom Article Data
        ** Append child element to thumbArt to display the 3 articles in the bottom of dashboard
        **/
        dataArr.forEach(function(val, index){
          var thumbItem = document.createElement('div');//this is the 3 bottom articles/video thumbnails
          thumbItem.className = "thumbnails-item";//set className for new element
          var parent = document.getElementById("thumbnail");//get element id thumbnail
          var titleText = val['title'].replace(/[\\]/g,"");//get title value from api
          var artUrl =  generateArticleLink(l.category, val['source'], val['article_id'], val['article_type'], l.remn);//generate article url
          var thumbImage = val.image_url != null ? (protocolToUse + "images.synapsys.us" + val.image_url + "?width=" + (t.width * window.devicePixelRatio)) : (protocolToUse + "w1.synapsys.us/widgets/css/public/no_image.jpg");//get image, if no image, then display no-image image
          thumbItem.innerHTML = '<a href="'+artUrl+'" target="_blank"><div class="sixteen-nine"><img class="main-thumb-item" src="'+thumbImage+'" /><div class="play-button small" id=playBtnSm>'+playBtn+'</div></div></a><a href="'+artUrl+'" target="_blank"><div class="thumbnails-title">'+titleText+'</div></a>';
          parent.appendChild(thumbItem);//append thumbnail items to thumbnails class
        });
    }
    /**
    * @function getTab
    * Set up tab options menu
    */
    function getTab(){
      var arr = ['trending', 'reviews', 'top10', 'videos'];
      var tabName;
      var first = true;
      for(var o in arr){
        tabName = getTabInfo(arr[o]).display;
        var navBarUrl = document.createElement('a');
        navBarUrl.className = "navBar-url";
        var genNavUrl =  "";//TODO:generate navigation link for tab
        navBarUrl.href = genNavUrl;
        if(first){
          navBarUrl.className += " selected";
          first = false;
        }
        var parent = document.getElementById("navBarId");
        navBarUrl.innerHTML = '<div class="navBar-item">'+tabName+'</div>';
        parent.appendChild(navBarUrl);
      }
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
                event: e == 1 ? 'nav-right' : 'nav-left',
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
          $('thumb-link').parentNode.removeChild($('thumb-link'));
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
