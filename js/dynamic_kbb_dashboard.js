var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
var referrer = document.referrer ? document.referrer : window.location.href;

/**
* List tab options
*/
var tabObj = {//TODO false category for testing
  "trending": {
    display: "Trending News",
    category: "automotive"
  },
  "reviews": {
    display: "Reviews",
    category: "food"
  },
  "top10": {
    display: "Top 10 Lists",
    category: "travel"
  },
  "videos": {
    display: "Videos",
    category: "entertainment"
  }
}

/**
* @function dynamic_widget
* Set up dynamic widget data here
*/
dynamic_widget = function() {
    var currentIndex = 0,
        widgetData = {},
        // query = JSON.parse(decodeURIComponent(location.search.substr(1))),
        retryCount = 0,
        currentCategory;
    var selectedTab;
    // console.log("query", query);
    function onLoad(func) {
        if (d.readyState == 'complete' || d.readyState == 'interactive') {
            func()
        } else if (d.addEventListener) {
            d.addEventListener('DOMContentLoaded', func)
        } else if (d.attachEvent) {
            d.attachEvent('onreadystatechange', function() {
                if (d.readyState == 'complete') {
                    func()
                }
            })
        }
    }
    /**
    * @function reset
    * Resets index count to 0 when swapping lists
    */
    function reset() {
      currentIndex = 0;
      getTabNames();
      httpGetData();
    }


    /**
    * @function getTabNames
    * Set up tab options menu
    */
    function getTabNames(){
      var tabArray = [];
      for(var cat in tabObj){
        tabArray.push(tabObj[cat].category);
      }
      setTabs();//TODO comments
      sendTabNames(tabArray);
    }


    /**
    * @function sendTabNames
    * Send dashboard tab name to top level
    */
    function sendTabNames(tabs){
      var arrString = tabs.join(",");//convert tab array to string
      top.postMessage("dashboard_category:" + arrString, "*");
    }


    /**
    * @function setTabs
    * Format the tabs' options
    **/
    function setTabs(){
      var i = 0;
      for(var cat in tabObj){
        var tabDisplay = tabObj[cat].display;//get display name for each tab option
        var category = tabObj[cat].category;//get category value for each tab option
        var navBarUrl = document.createElement('a');
        navBarUrl.className = "navBar-url";//set class name navBar-url for each tab option
        navBarUrl.setAttribute("data-attr", category);
        navBarUrl.innerHTML = tabDisplay;
        if(i == 0){//default to first tab onload
          selectedTab = tabObj[cat].displayName;
          navBarUrl.className += " selected";
          currentCategory = tabObj[cat].category;
        }
        i++;
        navBarUrl.addEventListener('click', tabSelect, false);//create event listener on clik to run tabSelect function
        $("navBarId").appendChild(navBarUrl);
      }
    }


    /**
    * @function httpGetData
    * Get data from API
    */
    function httpGetData() {
      var xHttp;
      if (window.XMLHttpRequest) {
          xHttp = new XMLHttpRequest
      } else {
          xHttp = new ActiveXObject('Microsoft.XMLHTTP')
      }
      xHttp.onreadystatechange = function() {
          if (this.readyState == XMLHttpRequest.DONE) {
              if (this.status == 200) {
                  widgetData = JSON.parse(this.responseText);
                  onLoad(getData)
              } else {
                  // Error handling - Get the message
                  var msg = this.statusText;
                  if (this.status == 500) {
                      try {
                          msg = JSON.parse(this.responseText).message
                      } catch (t) {
                          console.log('No JSON message')
                      }
                  }
                  msg = 'HTTP Error (' + this.status + '): ' + msg;
                  if (retryCount++ > 5) {
                      throw msg
                  }
                  setTimeout(reset, 500)
              }
          }
      };
      //TODO: waiting on new api call with KBB data
      //Test API: http://dev-article-library.synapsys.us/articles?category=automotive&metaDataOnly=1&readyToPublish=true&count=
      var count = 20;
      var subCategory = "";//TODO
      xHttp.open('GET', protocolToUse+"dev-article-library.synapsys.us/articles?category="+currentCategory+"&subCategory="+subCategory+ "&metaDataOnly=1&readyToPublish=true&count="+count, true);
      xHttp.send()
    }//function httpGetData ends

    /**
    * @function getData
    * functions to call onload
    **/
    function getData() {
        // if (typeof dataLayer != 'undefined') {
        //     dataLayer.push({
        //         event: 'widget-title',
        //         eventAction: dynamic_widget.get_title()
        //     })
        // }
        formattedData();
        artData()
    }

    /**
    * @function formattedData
    * Format data accordingly to specs before displaying for top articles
    **/
    function formattedData() {
      if(widgetData.data == null || typeof widgetData.data == "undefined" || widgetData.data.length == 0){
        return null;
      }
      if (widgetData.data.length <= 1) {
        $('next-list-link').classList.add("disabled-button");
      }
      else {
        $('next-list-link').classList.remove("disabled-button");
      }
      /**Top Article/Carousel Data**/
      var dataList = widgetData.data[currentIndex];
      var genLink =  generateArticleLink(currentCategory, dataList['source'], dataList['article_id'], dataList['article_type']); //Generate current article link
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
      var mainImg = $('mainImg');
      var mainImgErr = mainImg.getAttribute('onerror');
      if (dataList['image_url'] != null && dataList['image_url'] != "null") {
        mainImg.setAttribute('src', protocolToUse + "images.synapsys.us" + dataList['image_url'] + "?width=" + (mainImg.width * window.devicePixelRatio));
      } else {
        mainImg.setAttribute('src', protocolToUse + "w1.synapsys.us/widgets/css/public/no_image.jpg");
      }
      mainImg.setAttribute('onerror', "this.src='"+ protocolToUse + "w1.synapsys.us/widgets/css/public/no_image.jpg'");//TODO
    }


    /**
    * @function artData
    * Format data accordingly to specs before displaying for bottom articles
    **/
    function artData(){
      if(widgetData.data){
        var dataArr = widgetData.data.length > 3 ? widgetData.data.splice(0,3) : widgetData.data;//Get current data of article on Dashboard
        var playBtn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 486 486"><title>Asset 2</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M243,486C109,486,0,377,0,243S109,0,243,0,486,109,486,243,377,486,243,486Zm0-462.1C122.19,23.9,23.9,122.19,23.9,243S122.19,462.1,243,462.1,462.1,363.81,462.1,243,363.81,23.9,243,23.9Z"/><path d="M359.46,235.13,197.32,104.66a8.65,8.65,0,0,0-14.07,6.74V372.33a8.65,8.65,0,0,0,14.07,6.74L359.46,248.6A8.65,8.65,0,0,0,359.46,235.13Z"/></g></g></svg>';//play button svg source
        /**Bottom Article Data
        ** Append child element to thumbArt to display the 3 articles in the bottom of dashboard
        **/
        var parent = $("thumbnail");//get element id thumbnail
        parent.innerHTML = ""; // empties out the contents of the parent identifier

        dataArr.forEach(function(val, index){
          var thumbItem = document.createElement('div');//this is the 3 bottom articles/video thumbnails
          thumbItem.className = "thumbnails-item";//set className for new element
          var titleText = val['title'].replace(/[\\]/g,"");//get title value from api
          var artUrl =  generateArticleLink(currentCategory, val['source'], val['article_id'], val['article_type']);//generate article url
          var thumbImage = val.image_url != null ? (protocolToUse + "images.synapsys.us" + val.image_url + "?width=" + (250 * window.devicePixelRatio)) : (protocolToUse + "w1.synapsys.us/widgets/css/public/no_image.jpg");//get image, if no image, then display no-image image
          thumbItem.innerHTML = '<a href="'+artUrl+'" target="_blank"><div class="sixteen-nine"><img class="main-thumb-item" src="'+thumbImage+'" /><div class="play-button small" id=playBtnSm>'+playBtn+'</div></div></a><a href="'+artUrl+'" target="_blank"><div class="thumbnails-title">'+titleText+'</div></a>';
          parent.appendChild(thumbItem);//append thumbnail items to thumbnails class
        });
      }
    }


    /**
    * @function tabSelect
    * Listen to select event and activate tab
    **/
    function tabSelect(event) {
        var target = event.target || event.srcElement;
        var tablinks = document.getElementsByClassName("navBar-url");
        for (var i = 0; i < tablinks.length; i++) {
            //remove all selected className found in elements
            tablinks[i].className = tablinks[i].className.replace(" selected", "");
        }
        target.className += " selected";
        currentCategory = target.getAttribute("data-attr");//set currentCategory to attr value of selected target
        httpGetData();
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
        currentIndex += dir;
        currentIndex = currentIndex >= widgetData.data.length ? 0 : currentIndex < 0 ? widgetData.data.length - 1 : currentIndex;
        formattedData();
        if (typeof dataLayer != 'undefined') {
            dataLayer.push({
                event: e == 1 ? 'nav-right' : 'nav-left',
                // eventAction: dynamic_widget.get_title()
            })
        }
    }


    //TODO: waiting on API with KBB data
    /**
    * @function generateArticleLink
    * Generate offsite article link
    * scope: article category, linkType: depends article source, destinationId: unique article/event id,
    * articleType: article type, such as story, video, etc., remn: partner or non-partner
    */
    function generateArticleLink (scope, linkType, destinationId, articleType) {
      var baseUrl = "http://";
      var output = "";
      baseUrl += "www.kbb.com";//TODO may be something else
      //now that we have the base Url, format the rest of the link
      output = baseUrl + "/" + scope + "/news/story/" + destinationId;
      return output;
    }

    reset();
    return {
        carousel: carData,
        reset: reset,
        tabSelect: tabSelect
    }
}();
