var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
var referrer = document.referrer ? document.referrer : window.location.href;

dynamic_widget = function() {
    var t = protocolToUse + 'dw.synapsys.us/list_api.php',
        currentIndex = 0,
        widgetData = {},
        retryCount = 0,
        currentCategory;
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

    //Resets index count to 0 when swapping lists
    function reset() {
      currentIndex = 0;
      httpGetData();
    }

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
                  onLoad(formattedData)//call function formattedData on load
              } else {
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
      var category = "automotive";
      var subCategory = "";
      var count = 20;
      //TODO: waiting on new api call with KBB data
      xHttp.open('GET', protocolToUse + "dev-article-library.synapsys.us/articles?category=" + category + "&subCategory=" + subCategory + "&metaDataOnly=1&readyToPublish=true&count=" + count , true);
      xHttp.send()
    }

    /**
    * @function formattedData
    * Format data accordingly to specs before displaying
    **/
    function formattedData() {
      if(widgetData.data == null || typeof widgetData.data == "undefined" || widgetData.data.length == 0){
        return null;
      }
      var dataList = widgetData.data.length > 5 ? widgetData.data.splice(0,5) : widgetData.data;//Get current data of article on Dashboard

      dataList.forEach(function(val, index){
        var artDetails = document.createElement('div');
        artDetails.className = 'main-arList';
        var parent = document.getElementById('artMain');
        var titleText = val['title'].replace(/[\\]/g,"");
        titleText = titleText.length < 115 ? titleText : titleText.substring(0,115) + "...";
        var teaserText = val['teaser'].replace(/[\\]/g,"");
        teaserText = titleText.length < 75 ? (titleText.length < 70 ? (teaserText.length < 225 ? teaserText : teaserText.substring(0, 225) + "...") : teaserText.substring(0,185) + "...") : teaserText.substring(0,120) + "...";
        var postedDate = toTitleCase(formattedDate(val['last_updated']*1000));
        var artUrl = generateArticleLink(currentCategory, val['source'], val['article_id'], val['article_type']); //Generate current article link on Dashboard
        var artImg = val.image_url != null ? (protocolToUse + "images.synapsys.us" + val.image_url + "?width=" + (t.width * window.devicePixelRatio)) : (protocolToUse + "w1.synapsys.us/widgets/css/public/no_image.jpg");
        artDetails.innerHTML = '<div class="main-row"><div class="sixteen-nine"><img src='+artImg+' /></div><div class="main-ar"><a class="main-ar-title" href="'+artUrl+'">'+titleText+'</a><div class="main-ar-posted">Posted on '+postedDate+'</div><div class="main-ar-teaser">'+teaserText+'</div></div></div><a class="main-ar-btn href="'+artUrl+'">Read the Story</a>';
        parent.appendChild(artDetails);
      });
  }// END OF FUNC


  reset();
  return {
    reset: reset
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
    baseUrl += "www.kbb.com";//TODO
    //now that we have the base Url, format the rest of the link
    output = baseUrl + "/" + scope + "/news/story/" + destinationId;
    return output;
  }

  /**
  * @function toTitleCase
  * Transform string to title case
  */
  function toTitleCase(str){
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
}();
