var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
var mlbDomain        = "http://www.homerunloyal.com/";
var mlbPartnerDomain = "http://www.myhomerunzone.com/";
var referrer = document.referrer;
if(referrer.match(/\/\/baseball\./g)){
  mlbPartnerDomain = referrer.split('/')[2];
}
// if in iframe, get url from parent (referrer), else get it from this window location (works for localhost)
var baseUrl = referrer.length ? getBaseUrl(referrer) : window.location.origin;

function getBaseUrl(string){
  var urlArray = string.split("/");
  var domain = urlArray[2];
  return protocolToUse + "//" + domain;
}


dynamic_widget = (function(){
  // Initialize Variables
  var protocol = (location.protocol == "https:") ? "https" : "http",
  api_url =  protocol + "://dw.synapsys.us/list_api.php", // API location
  ci = 0, // Current index to be viewed
  wd = {}, // Data for the widget
  wc = JSON.parse(decodeURIComponent(location.search.substr(1))), // Args passed to the widget
  tries = 0,
  categories = ["finance", "nba", "college_basketball", "weather", "crime", "demographics", "politics", "disaster", 'mlb']; // Allowed categories
  var change_url = false;
  var new_url = "";

  /**
  * @function onL - on_load
  * Adds a function to the "onLoad" event OR runs the function if the page is
  * already loaded
  *
  * @param function func - The function to run when the page has loaded
  */
  function onL(func) {
    if ( d.readyState == "complete" || d.readyState == "interactive" ) {
      func();
    } else if ( d.addEventListener ) {
      d.addEventListener('DOMContentLoaded', func);
    } else if ( d.attachEvent ) {
      d.attachEvent('onreadystatechange', function(){
        if ( d.readyState == "complete" ) {
          func();
        }
      });
    }
  } // --> onL

  /**
  * @function gd - get_data
  * Retrieves the data from the API and saves it. It also sets the function to
  * build the widget to run on page load
  */
  function gd() {
    // Set up the dom element if needed
    if ( wc.dom == "lasvegasnow.com" ) {
      change_url = true;
      new_url = "finance.lasvegasnow.com";
    }

    if ( typeof(wc.category) == "undefined" || categories.indexOf(wc.category) == -1 ) {
      wc.category = "finance";
    }

    // Set the random number
    var random = (typeof wc.rand != "undefined" && tries == 0) ? wc.rand : Math.floor(Math.random() * 10);

    // Call the API
    // Create http object
    var xh;
    if ( window.XMLHttpRequest ) {
      xh = new XMLHttpRequest();
    } else {
      xh = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // Create callback
    xh.onreadystatechange = function() {
      if ( xh.readyState == XMLHttpRequest.DONE ) {
        if ( xh.status == 200 ) {
          // On success
          wd = JSON.parse(xh.responseText);
          onL(cw);
        } else {
          // Error handling
          // Get the message
          var msg = xh.statusText;
          if ( xh.status == 500 ) {
            try {
              msg = JSON.parse(xh.responseText).message;
            } catch (e) {
              console.log('No JSON message');
            }
          }
          msg = "HTTP Error (" + xh.status + "): " + msg;

          // Add a try and try again if less than 10
          if ( tries++ > 10 ) {
            throw msg;
          }
          setTimeout(gd, 500);
        }
      }
    }

    xh.open("GET", api_url + '?partner=' + (typeof(wc.dom) != "undefined" ? wc.dom : "") + '&cat=' + wc.category + '&rand=' + random, true);
    xh.send();
  } // --> get_data

  /**
  * @function cw - create_widget
  * Creates the widget by displaying the title and creating the link to the list
  * page. This function also sends a GA event and adds a stylsheet for politics.
  */
  function cw() {
    // Make a google analytics event
    if ( typeof dataLayer != "undefined" ) {
      dataLayer.push({
        'event':'widget-title',
        'eventAction':dynamic_widget.get_title()
      });
    }

    // Handle nydailynews
    if ( wc.dom == "nydailynews.com" ) {
      var w = document.getElementsByClassName('dw')[0];
      w.style.height = "340px";
      var banner = document.createElement("div");
      banner.style.width = '100%';
      banner.style.height = '10px';
      banner.style.color = '#999';
      banner.style['text-align'] = 'center';
      banner.style['line-height'] = '10px';
      banner.style['font-size'] = '10px';
      banner.style['background-color'] = '#fff';
      banner.innerHTML = 'PAID CONTENT';
      document.body.insertBefore(banner, w);
    }

    // If the category is politics, add the correct CSS
    if ( wc.category == "politics" ) {
      // Create the CSS file name
      var letter = ( wd.l_title.indexOf("Republican") ) != -1 ? "r" : ( wd.l_title.indexOf("Independent") != -1 ) ? "i" : "d";

      // Create the css include element
      add_css_link("../css/dynamic_widget_politics_" + letter + ".css");
    }

    if (wc.category == 'mlb') {
      wd.l_title = wd.l_title.replace("MLB","Baseball");
    }

    // Display the title
    $('title').innerHTML = wd.l_title;

    if ( $('line4') != null && d.getElementsByClassName("dw")[0].clientWidth == 350 &&  $('title').scrollHeight > 61 ) {
      $('title').setAttribute("style", "font-size: 14px");
    }

    // Add the "See The List" link
    var doStep = true;
    switch ( wc.category ) {
      case 'nba':
        var base_url = wc.remn == "true" ? "http://www.hoopsloyal.com/NBA/widget-list" : "http://www.myhoopszone.com/" + wc.dom + "/NBA/w-list";
        break;
      case 'college_basketball':
        var base_url = wc.remn == "true" ? "http://www.hoopsloyal.com/NCAA/widget-list" : "http://www.myhoopszone.com/" + wc.dom + "/NCAA/w-list";
        break;
        case "mlb":
            // var base_url = "/";
            // var doStep = false
            // $("mainurl").style.cssText += "pointer-events:none; cursor:default",
            $("suburl").style.cssText += "pointer-events:none; cursor:default";
            $("carousel").className = "one";
            // $("line1").style.cssText += "pointer-events:none; cursor:default",
            // $("homelink").style.cssText += "pointer-events:none; cursor:default",
            //  $("list-link").style.display = "none";
            var base_url = "";
            if( mlbPartnerDomain == "http://www.myhomerunzone.com/") {
              base_url = l.remn == 'true' ? 'http://www.homerunloyal.com/list' : mlbPartnerDomain + l.dom + '/list';
            }else{
              base_url = mlbPartnerDomain + '/list';
            }
            var doStep = false
            break;
      case 'finance':
        var base_url = wc.remn == "true" ? "http://www.investkit.com/widget-list" : "http://www.myinvestkit.com/" + wc.dom + "/w-list";
        if ( change_url ) {
          base_url = base_url.replace("www.myinvestkit.com", new_url);
        }
        break;
      default:
        var base_url = wc.remn == "true" ? "http://www.joyfulhome.com/wlist" : "http://www.myhousekit.com/" + wc.dom + "/wlist";
        var doStep = false;
    }
    base_url += ( doStep ) ? '?tw=' + wd.l_param + '&sw=' + wd.l_sort + '&input=' + wd.l_input : "/tw-" + wd.l_param + "+sw-" + wd.l_sort + "+input-" + wd.l_input;

    if ( $('list-link') ) {
      $('list-link').href = base_url;
    }

    // Display the first item
    di();
  } // --> create_widget

  /**
  * @function di - display_item
  * This function displays a widget item.
  */
  function di() {
    // Get the current data
    var cd = wd.l_data[ci];

    // Set up the url
    cd.li_url = (cd.li_subimg !== false && cd.li_subimg.switch ? (wc.remn == "true" ? cd.li_subimg.primary_url : cd.li_subimg.partner_url.replace('{partner}', wc.dom)) : (wc.remn == "true" ? cd.li_primary_url : cd.li_partner_url.replace('{partner}', wc.dom)));
    cd.li_line_url = (wc.remn == "true" ? cd.li_primary_url : cd.li_partner_url.replace('{partner}', wc.dom));

    // Replace the urls if needed
    if ( change_url ) {
      cd.li_url = cd.li_url.replace("www.myinvestkit.com", new_url);
      cd.li_line_url = cd.li_line_url.replace("www.myinvestkit.com", new_url);
    }

    // Data Section
    // Text
    $('line1').innerHTML = cd.li_title;
    $('line2').innerHTML = cd.li_sub_txt;
    if ( $('line4') == null ) {
      $('desc').innerHTML = cd.li_str;
    } else {
      $('desc').innerHTML = cd.li_value;
      $('line4').innerHTML = cd.li_tag;
    }
    // Link
    $('line1').href = cd.li_line_url;

    // Carousel
    // Main Img and Counter
    var mi = $('mainimg');
    var oe = mi.getAttribute('onerror');
    mi.setAttribute('onerror','');
    mi.setAttribute('src','');
    mi.setAttribute('src',cd.li_img);
    setTimeout((function (oe, mi) {mi.setAttribute('onerror',oe);}).bind(undefined, oe, mi), 0);
    // $('mainimg').src = "";
    // $('mainimg').src = cd.li_img;
    $('mainurl').href = cd.li_url;
    $('num').innerHTML = "#" + cd.li_rank;
    // Handle sub_img
    if ( cd.li_subimg !== false ) {
      // Change the values
      var sub_li_url = cd.li_subimg.switch ? (wc.remn == "true" ? cd.li_primary_url : cd.li_partner_url.replace('{partner}', wc.dom)) : (wc.remn == "true" ? cd.li_subimg.primary_url : cd.li_subimg.partner_url.replace('{partner}', wc.dom));
      // Replace the urls if needed
      if ( change_url ) {
        sub_li_url = sub_li_url.replace("www.myinvestkit.com", new_url);
      }
      var si = $('subimg');
      var oe = si.getAttribute('onerror');
      si.setAttribute('onerror','');
      si.setAttribute('src','');
      si.setAttribute('src',cd.li_subimg.img);
      setTimeout((function (oe, si) {si.setAttribute('onerror',oe);}).bind(null, oe, si), 0);
      $('suburl').href = sub_li_url;
      // Show the subimg
      var carousel = $('carousel');
      if ( carousel.className.indexOf('two') == -1 ) {
        carousel.className += ' two';
      }
    }

    // Test for overflowing
    if ( $('list-link') ) {
      var btn = d.getElementsByClassName("dw-btn")[0];
      if ( btn.offsetTop + btn.scrollHeight > d.getElementsByClassName("dw")[0].clientHeight ) {
        $("title").setAttribute("style", "font-size: 14px");
        if ( d.getElementsByClassName("dw")[0].clientHeight <= 250 ) {
          $("title").setAttribute("style", "font-size: 12px");
        }
      }
      if ( btn.offsetTop + btn.scrollHeight > d.getElementsByClassName("dw")[0].clientHeight - 10 && d.getElementsByClassName("dw")[0].clientHeight <= 250 ) {
        d.getElementsByClassName("dw-btn")[0].setAttribute("style", "margin-top: 0");
      }
    }

    var title = $("title");
    if ( title.offsetTop + title.scrollHeight > $("carousel").offsetTop ) {
      $("title").setAttribute("style", "font-size: 14px");
    }
  } // --> display_item

  /**
  * @function c - carousel
  * This function goes to the next or previous carousel item by adding dir to
  * the current index. This is usually called via the onClick event on the nav
  * buttons.
  *
  * @param int dir - This number is added to the index to create the index of
  * the item to be shown.
  */
  function c(dir) {
    // Adjust the index
    ci += dir;
    ci = ci >= wd.l_data.length ? 0 : ci < 0 ? wd.l_data.length - 1 : ci;

    // Show the item
    di();

    // Send event
    if ( typeof dataLayer != "undefined" ) {
      dataLayer.push({
        'event':dir == 1 ? 'nav-right' : 'nav-left',
        'eventAction':dynamic_widget.get_title()
      });
    }
  } // --> carousel

  /**
  * @function gt - get_title
  * This function returns the partner, category, parameter, and title of the
  * list.
  */
  function gt() {
    return wc.dom + ":" + wc.category + ":" + (wd.l_sort == null ? wd.l_param : wd.l_sort) + ":" + wd.l_title;
  } // --> get_title

  /**
  * @function shl - set_home_link
  * This function sets the link to the parent website (joyful, hoops, etc).
  */
  function shl() {
    if ( wc.carousel == true ) {
      var links = d.getElementsByTagName("a");
      for ( var i = 0; i < links.length; i++ ) {
        links[i].setAttribute("onclick", "event.preventDefault(); return false;");
      }
      var hover = d.querySelectorAll(".hover");
      for ( var i = 0; i < hover.length; i++ ) {
        hover[i].parentNode.removeChild(hover[i]);
      }
      $('list-link').parentNode.removeChild($('list-link'));
      return false;
    }

    switch ( wc.category ) {
      case 'finance':
        var url = wc.remn == "true" ? "http://www.investkit.com/" : "http://www.myinvestkit.com/" + wc.dom + "/";
        if ( change_url ) {
          url = url.replace("www.myinvestkit.com", new_url);
        }
        break;
      case 'nba':
        var url = wc.remn == "true" ? "http://www.hoopsloyal.com/NBA" : "http://www.myhoopszone.com/" + wc.dom + "/NBA";
        break;
      case 'college_basketball':
        var url = wc.remn == "true" ? "http://www.hoopsloyal.com/NCAA" : "http://www.myhoopszone.com/" + wc.dom + "/NCAA";
        break;
        case "mlb":
        var url = l.remn == 'true' ? 'http://www.homerunloyal.com/' : 'http://www.myhomerunzone.com/' + l.dom + '/';
        break;
      default:
        var url = wc.remn == "true" ? "http://www.joyfulhome.com/" : "http://www.myhousekit.com/" + wc.dom + "/loc/";
        break;
    }

    $('homelink').href = url;
  } // --> set_home_link

  // Get the data and set home link
  gd();
  onL(shl);

  return {
    carousel: c,
    get_title: gt
  };
})();
