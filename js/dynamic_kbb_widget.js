var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
var currentConfig;

dynamic_widget = function() {
    var t = protocolToUse + 'dw.synapsys.us/list_api.php',
        currentIndex = 0,
        widgetData = {},
        retryCount = 0,
        query = JSON.parse(decodeURIComponent(location.search.substr(1)));


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
      currentIndex = 0;// resets index count to 0 when swapping lists
      httpGetData();
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
                  onLoad(formattedData)
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
      var category = query.category ? query.category : "automotive";
      var subCategory = "";
      var count = 20;
      xHttp.open('GET', protocolToUse + "dev-article-library.synapsys.us/articles?category=" + category + "&subCategory=" + subCategory + "&metaDataOnly=1&readyToPublish=true&count=" + count , true);
      xHttp.send()
    }

    /**
    * @function formattedData
    * Format data accordingly to specs before displaying for top articles
    **/
    function formattedData() {
        if (widgetData.data.length <= 1) {
          $('next-list-link').classList.add("disabled-button");
        }
        else {
          $('next-list-link').classList.remove("disabled-button");
        }
        var dataLists = widgetData.data[currentIndex];
        var genLink = generateArticleLink(query.category, dataLists.source, dataLists.article_id, dataLists['article_type']);// generate current article url
        $('mainUrl').href = genLink;
        if($('mainTitle')){
          $('mainTitle').innerHTML = dataLists['title'] ? (dataLists['title'].length > 52 ? dataLists['title'].replace(/[\\]/g,"").substring(0,52) : dataLists['title'].replace(/[\\]/g,"")) : "";//limit to 2 lines aka 55 characters
          $('mainTitle').innerHTML += dataLists['title'].length > 52 ? "..." : "";
        }
        if($('teaser')){
          var len = dataLists['title'].length < 25 ? 135 : 95;//increase limit of character in teaser if title is one line or less
          $('teaser').innerHTML = dataLists['teaser'] ? (dataLists['teaser'].length > len ? dataLists['teaser'].replace(/[\\]/g,"").substring(0,len) : dataLists['teaser'].replace(/[\\]/g,"")) : "";//limit to 3 or 4 lines depends on the number of lines in the title
          $('teaser').innerHTML += dataLists['teaser'].length > len ? "..." : "";
        }
        var mainImg = $('mainImg');
        var mainImgErr = mainImg.getAttribute('onerror');
        mainImg.setAttribute('onerror', '');
        mainImg.setAttribute('src', '');
        if (dataLists['image_url'] != null && dataLists['image_url'] != "null") {
          mainImg.setAttribute('src', protocolToUse + "images.synapsys.us" + dataLists['image_url'] + "?width=" + (t.width * window.devicePixelRatio));
        } else {
          mainImg.setAttribute('src', protocolToUse + "w1.synapsys.us/widgets/css/public/no_image.jpg");
        }
        mainImg.setAttribute('onerror', "this.src='"+ protocolToUse + "w1.synapsys.us/widgets/css/public/no_image.jpg'");//TODO
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
                event: dir == 1 ? 'nav-right' : 'nav-left',
            })
        }
    }

    reset();
    return {
        carousel: carData,
        reset: reset
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
}();
