var chatterbox = chatterbox || [];
var chatterLayer = chatterLayer || [];

chatterbox[chatterbox.length] = (function(chatter_id) {
  console.log("Chatterbox ID: ",chatter_id);
  // Set main variables
  var protocol = (location.protocol == "https:") ? "https" : "http",
  div_conf = [
    {
      min: 1200,
      widget: 970,
      title: "Promoted Stories from the Chatter Network",
      class: "biggest"
    },
    {
      min: 768,
      widget: 970,
      title: "Promoted Stories from the Chatter Network",
      class: "bigger"
    },
    {
      min: 650,
      widget: 970,
      title: "Promoted Stories from the Chatter Network",
      class: "big"
    },
    {
      min: 430,
      widget: 970,
      title: "Promoted Stories",
      class: "small"
    },
    {
      min: 0,
      widget: 250,
      title: "Promoted Stories",
      class: "smallest"
    }
  ],
  w_conf = {
    250: {
      url: protocol + "://w1.synapsys.us/widgets/dynamic_widget/dynamic_widget.html"
    },
    970: {
      url: protocol + "://w1.synapsys.us/widgets/dynamic_widget/dynamic_widget_970.html"
    }
  },
  apiBaseURL = "//dw.synapsys.us/chatter_api.php?site=",
  apiURL = {
    "sportschatter.com": "sports-chatter.",
    "celebchatter.com": "celeb-chatter.",
    "politicschatter.com": "politics-chatter.",
    "oddchatter.com": "odd-chatter."
  },
  embedURL = protocol + "://w1.synapsys.us/widgets/chatterbox/chatterbox.js",
  domain = (function() { // get the domain
    var myHost = top.location.host;
    var tempHost = myHost.split(".");
    switch (tempHost.length) {
      case 0:  //crash me, please
      case 1:  //crash me, please
      case 2:  //exactly what we want
        break;
      default: //break it down
        //AT&T uses att.yahoo.com, so here's the exception to avoid a collision with yahoo.com
        if (tempHost[tempHost.length - 3] == "att" && tempHost[tempHost.length - 2] == "yahoo" && tempHost[tempHost.length - 1] == "com") {
          myHost = "att.yahoo.com";
        } else if (tempHost[tempHost.length - 2] == "co" && tempHost[tempHost.length - 1] == "uk") {
          myHost = tempHost[tempHost.length - 3] + "." + tempHost[tempHost.length - 2] + "." + tempHost[tempHost.length - 1];
        } else {
          myHost = tempHost[tempHost.length - 2] + "." + tempHost[tempHost.length - 1]; //no matter how many layers of subdomain there are, this should return only the domain
        }
        break;
    }
    return myHost;
  })(),
  currentScript = document.currentScript || (function() { // Get the current script element
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i <= scripts.length; i++) {
      if (scripts[i].src.indexOf(embedURL) != -1) {
        return scripts[i];
      }
    }
  })(),
  currentConf = {},
  currentSize = -1,
  div,
  dw_iframe,
  w_q = {
    dom: domain,
    category: (getParameter("widget") === false ? "mlb" : getParameter("widget").toLowerCase()),
    remn: false,
    rand: Math.floor(Math.random() * 10)
  },
  siteName = (getParameter("rss") === false ? "sportschatter.com" : getParameter("rss")),
  apiEndpoint = (function(){
    if ( siteName === false || typeof apiURL[siteName] == "undefined" ) {
      siteName = domain;
      if ( typeof apiURL[siteName] === "undefined" ) {
        return apiBaseURL + apiURL["sportschatter.com"] + domain;
      }
    }
    return apiBaseURL + apiURL[siteName] + domain;
  })(),
  isSmall = (getParameter("small") === "yes" ? true : false),
  article_links = [],
  newDomain = (function(){
    if ( domain.indexOf("chatter") > -1 ) {
      return domain;
    }

    return siteName.split(".")[0].replace("chatter", "-chatter") + "." + domain;
  })(),
  articles = [],
  title_div,
  isVisible = false,
  mouseOverDone = false,
  minvis = false,
  tries = 0;

  if ( isSmall ) {
    w_q.category = "n/a";
  }

  // Embed google tag manager
  var addGTM = true,
  gtmURL = '//www.googletagmanager.com/gtm.js?id=GTM-KSF89B&l=chatterLayer',
  scriptsAll = document.getElementsByTagName("script");
  for ( var x = 0; x < scriptsAll.length; x++ ) {
    if ( scriptsAll[x].src.indexOf(gtmURL) != -1 ) {
      addGTM = false;
    }
  }
  if ( addGTM ) {
    var s = document.createElement("script");
    s.async = true;
    s.src = '//www.googletagmanager.com/gtm.js?id=GTM-KSF89B&l=chatterLayer';
    currentScript.parentNode.insertBefore(s, currentScript);
  }

  // Push item to the chatterLayer for the pageview event
  chatterLayer.push({
    event: "chatterboxPageView",
    rss: siteName,
    style: isSmall ? "3UP" : "5PACK",
    widget: w_q.category
  });

  /**
   * @function Array.randItem
   * This function returns a random item from the array
   */
  Array.prototype.randItem = function() {
    return this[Math.floor(Math.random() * this.length)];
  } // --> randItem

  /**
   * @function Element.setAttributes
   * This helper function allows setting multiple attributes in 1 function call.
   */
  Element.prototype.setAttributes = function(attrs) {
    for ( var i in attrs ) {
      if ( i === "style" ) {
        for ( var s in attrs[i] ) {
          this.style[s] = attrs[i][s];
        }
      } else if ( i === "html" ) {
        this.innerHTML = attrs[i];
      } else if ( i === "text" ) {
        this.innerText = attrs[i];
      } else {
        this.setAttribute(i, attrs[i]);
      }
    }
  } // --> setAttributes

  /**
   * @function Element.appendChildren
   * This helper function allows adding multiple child elements to a parent div
   */
  Element.prototype.appendChildren = function() {
    for ( var i = 0; i < arguments.length; i++ ) {
      if ( typeof(arguments[i].length) !== "undefined" ) {
        for ( var y = 0; y < arguments[i].length; y++ ) {
          this.appendChild(arguments[i][y]);
        }
      } else {
        this.appendChild(arguments[i]);
      }
    }
  } // --> appendChildren

  // Set the size
  var width = currentScript.parentElement.clientWidth;
  for ( var initSize = 0; initSize < div_conf.length; initSize++ ) {
    if ( width >= div_conf[initSize].min ) {
      break;
    }
  }
  if ( isSmall ) {
    initSize = 0;
  }
  callAPI();
  create_chatterbox();

  /**
   * @function callAPI
   * This function calls the API and parses and saves the URL's
   */
  function callAPI() {
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
          try {
            // On success
            articles = JSON.parse(xh.responseText);
            articles.length = 3;
            for ( var i = 0; i < article_links.length; i++ ) {
              article_links[i].getElementsByTagName("a")[0].href = articles[i].link;
              article_links[i].querySelectorAll(".dw_item_title")[0].innerHTML = articles[i].title;
              article_links[i].querySelectorAll(".dw_item_sub")[0].innerHTML = (siteName.charAt(0).toUpperCase() + siteName.slice(1)).replace("chatter", "Chatter").split(".")[0];
              article_links[i].querySelectorAll(".dw_img")[0].setAttributes({"style":{"background-image": "url('" +
                (function(url) {
                  try {
                    // Generate new o
                    var o_old = JSON.parse(atob(getParameter("o", url)));
                  } catch(e) {
                    var o_old = {x:0.5,y:0.5};
                  }
                  return url.replace(/o=[^&$]+/, "o=" + btoa(JSON.stringify({"x":o_old.x,"y":o_old.y,"height":240,"width":400})));
                })(articles[i].thumbnail)
                + "')"}});
            }
            return true;
          } catch ( e ) {
            console.log(e);
            var msg = "Error Parsing JSON";
          }
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
        }

        // Add a try and try again if less than 10
        if ( tries++ > 10 ) {
          throw msg;
        }
        setTimeout(callAPI, 500);
      }
    }

    xh.open("GET", apiEndpoint, true);
    xh.send();
  } // --> callAPI

  /**
   * @function create_chatterbox
   * This function creates the HTML DOM nodes for the chatterbox and inserts
   * them into the DOM
   */
  function create_chatterbox() {
    // Add the style element for Lato (start download ASAP)
    var lato = document.createElement("link");
    lato.setAttributes({
      "href": protocol + "://fonts.googleapis.com/css?family=Lato",
      "rel": "stylesheet",
      "type": "text/css"
    });
    currentScript.parentNode.insertBefore(lato, currentScript);

    // Add the chatterbox css to start downloading
    var css = document.createElement("link");
    css.setAttributes({
      "href": protocol + "://w1.synapsys.us/widgets/chatterbox/chatterbox.css",
      "rel": "stylesheet",
      "type": "text/css"
    });
    currentScript.parentNode.insertBefore(css, currentScript);

    // Create the div that will hold everything
    div = document.createElement("div");
    div.setAttribute("class", "dw_container");
    if ( div.addEventListener ) {
      div.addEventListener('mouseover', mouseover_handler)
    } else if ( div.attachEvent ) {
      div.attachEvent('onmouseover', mouseover_handler);
    }

    // Create the portion that holds the article
    var article_div = document.createElement("div");
    article_div.setAttribute("class", "dw_article");
    title_div = document.createElement("div");
    title_div.setAttribute("class", "dw_title");
    for ( var i = 0; i < 3; i++ ) {
      // Create all the items
      var arr = [
        document.createElement("a"), // article link
        document.createElement("div"), // image div
        document.createElement("div"), // container div
        document.createElement("div"), // title div
        document.createElement("div"), // subtitle div
        document.createElement("div") // Conatiner div
      ];
      arr[1].appendChild(document.createElement("div"));

      // Attach the attributes
      arr[0].setAttributes({"onclick": "chatterbox[" + chatter_id + "].a_click(" + i + ")", "target": "_blank"});
      arr[1].setAttribute("class", "dw_img");
      arr[2].setAttribute("class", "dw_t_cont");
      arr[3].setAttributes({
        "class": "dw_item_title",
        "text": ""
      });
      arr[4].setAttributes({
        "class": "dw_item_sub",
        "text": ""
      });
      arr[5].setAttribute("class", "dw_article_link");

      // Put divs in divs
      arr[2].appendChildren(arr[3], arr[4]);
      arr[0].appendChildren(arr[1], arr[2]);
      arr[5].appendChildren(arr[0]);
      article_links[i] = arr[5];
    }
    article_div.appendChildren(title_div, article_links);

    if ( !isSmall ) {
      // Create the ad tag
      var e_q = {
        dom: domain,
        remn: false,
        cat: w_q.category,
        type: 'dynamic_' + w_q.category,
        subd: false,
        src: "content.synapsys.us/l/n/index-mdb.php",
        name: domain.split(".").join("_") + "_" + (function(cat){
          switch ( cat ) {
            case "nba":
            case "college_basketball":
            case "mlb":
              return "sports";
              break;
            case "crime":
            case "politics":
            case "demographics":
            case "weather":
            case "disaster":
              return "realestate";
              break;
            default:
              return cat;
          }
        })(w_q.category) + (div_conf[initSize].min == 0 ? "_chatterbox_m_300x250" : "_chatterbox_300x250"),
        widU: (div_conf[initSize].min == 0 ? '//w1.synapsys.us/widgets/dynamic_widget/dynamic_widget_250.html' : ''),
        widW: 300,
        widH: (div_conf[initSize].min == 0 ? 250 : 0),
        adW: 300,
        adH: 250,
        ofx: 0,
        ofy: 0,
        rand: (Math.random() * 1000000).toString() + (Math.random() * 1000000).toString()
      };
      var ad_stack_div = document.createElement('div');
      ad_stack_div.setAttribute('class', 'dw_ad_stack');
      var ad_script = document.createElement("script");
      var e_q = {
        "type": (div_conf[initSize].min == 0 ? "chatterbox_mobile" : "chatterbox"),
        "adW": "300",
        "adH": "250",
        "widW": "0",
        "widH": "0",
        "remn": false,
        "rand": e_q.rand,
        "dom": domain
      };
      ad_script.src = "//content.synapsys.us/l/n/igloo" + (domain == "sun-sentinel.com" ? "-pb" : "") + ".php?" + Object.keys(e_q).map(function(k){return encodeURIComponent(k)+"="+encodeURIComponent(e_q[k])}).join("&");
      ad_stack_div.appendChild(ad_script);

      // Create the dynamic widget
      dw_iframe = document.createElement("iframe");
      dw_iframe.setAttributes({"scrolling": "no", "class": "dw_iframe"});

      // Add all the elements to the div
      if ( div_conf[initSize].min != 0 ) {
        div.appendChildren(article_div, ad_stack_div, dw_iframe);
      } else {
        console.log('CHATTERBOX MOBILE');
        div.setAttribute("class", "dw_container smallest mobile");
        div.appendChildren(article_div, ad_stack_div);
      }
    } else {
      div.appendChild(article_div);
    }

    // Insert the div
    currentScript.parentElement.insertBefore(div, currentScript);
    currentScript.parentElement.removeChild(currentScript);
  } // --> create_chatterbox

  /**
   * @function mouseover_handler
   * This function logs an event for the mouse passing over the chatterbox.
   */
  function mouseover_handler() {
    // Don't push the event more than once
    if ( mouseOverDone ) {
      return true;
    }

    // Push the event
    chatterLayer.push({
      "event":"chatterMouseover",
      "style": isSmall ? "3UP" : "5PACK",
      "rss": siteName,
      "widget": w_q.category
    });

    mouseOverDone = true;
    div.removeEventListener('mouseover', mouseover_handler);
  } // --> mouseover_event

  /**
   * @function size_change
   * This function handles the changing of the width of the parent div.
   */
  function size_change() {
    // Get the size of the widget
    var width = div.parentElement.clientWidth;

    // Get the index needed
    for ( var i = 0; i < div_conf.length; i++ ) {
      if ( width >= div_conf[i].min ) {
        break;
      }
    }

    // If there is no change, return
    if ( i == currentSize ) {
      return false;
    }

    // Set the new config
    currentSize = i;
    div.setAttribute("class", "dw_container " + div_conf[i].class + (isSmall !== false ? " small_container" : ""));
    title_div.setAttributes({"html":'<svg xmlns="http://www.w3.org/2000/svg" style="stroke:#ff3131;stroke-width:2px;fill:none;width:20.57px;height:18px;" viewBox="0 0 32 28"><path stroke-linecap="round" stroke-linejoin="round" d="m 4,14 l 12,12 l 12,-12 a 6 6 0 1 0 -10 -10 l -2, 2 l -2, -2 a 6 6 0 1 0 -10 10" /></svg> ' + div_conf[i].title});
    change_widget(div_conf[i].widget);
  } // --> size_change

  /**
   * @function change_widget
   * This function changes the widget between the 970 and 250 pixel wide versions
   *
   * @param string size - The width of the widget - either 970 or 250
   */
  function change_widget(size) {
    // Don't worry for small widget
    if ( isSmall ) {
      return false;
    }

    // Get the new conf
    var local_conf = {};
    switch ( size ) {
      case 250:
        local_conf = w_conf[250];
        break;
      default:
        local_conf = w_conf[970];
        break;
    }

    // Apply only on changes
    if ( local_conf != currentConf ) {
      dw_iframe.src = "about:blank";
      currentConf = local_conf;
      setTimeout(function () {
        dw_iframe.src = currentConf.url + "?" + encodeURIComponent(JSON.stringify(w_q));
      }, 0);
    }
  } // --> change_widget

  /**
   * @function getParameter
   * This function retrieves a get parameters. Adapted from StackOverflow
   *
   * @param string name - The name of the parameter to get.
   * @return string|bool - The value of the associated parameter or false if none
   * is found.
   */
  function getParameter(name, url) {
    url = url || currentScript.src;
    var regex = new RegExp("[?&]" + name.replace(/[\[\]]/g, "\\$&") + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(url);
    if ( !results || !results[2] ) {
      return false;
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  } // --> getParameter

  /**
   * @function article_click
   * This function logs an article click by pushing a variable to the
   * chatterLayer.
   *
   * @param int article_index - The article that was clicked on (0-based index)
   */
  function article_click(article_index) {
    // Handle no article
    if ( typeof articles[article_index] == "undefined" ) {
      return true;
    }

    chatterLayer.push({
      "event": "chatter_click",
      "style": isSmall ? "3UP" : "5PACK",
      "rss": siteName,
      "widget": w_q.category
    });

    chatterLayer.push({"event": "article_click", "article_url": siteName + articles[article_index].link, "article_title": articles[article_index].title, "style": isSmall ? "3UP" : "5PACK"});
  } // --> article_click

  /**
   * @function check_visibility
   * This function checks if the widget is visible. If visible, this function
   * sends a GTM event to record the view.
   */
  function check_visibility() {
    // Don't do anything if the event has already fired
    if ( isVisible ) {
      return true;
    }

    // Check the visibility
    var windowDim = {x: window.scrollX, y: window.scrollY, w: window.innerWidth, h: window.innerHeight},
    divDim = {x: div.offsetLeft, y: div.offsetTop, w: div.offsetWidth, h: div.offsetHeight},
    divArea = divDim.w * divDim.h,
    dispX = pixelsVisible(windowDim.x, windowDim.w, divDim.x, divDim.w),
    dispY = pixelsVisible(windowDim.y, windowDim.h, divDim.y, divDim.h)
    dispArea = dispX * dispY,
    dispPerc = dispArea / divArea;

    if ( !minvis && dispPerc > 0 ) {
      minvis = true;
      chatterLayer.push({
        "event": "chatterVisibleMin",
        "style": isSmall ? "3UP" : "5PACK",
        "rss": siteName,
        "widget": w_q.category
      });
    }

    if ( dispPerc >= 0.6 ) {
      isVisible = true;
      chatterLayer.push({
        "event": "chatterVisible",
        "style": isSmall ? "3UP" : "5PACK",
        "rss": siteName,
        "widget": w_q.category
      });
      for ( x = 0; x < articles.length; x++ ) {
        chatterLayer.push({
          "event": "chatterboxImpression",
          "article_url": siteName + articles[x].link,
          style: isSmall ? "3UP" : "5PACK",
          "article_title": articles[x].title
        });
      }
      window.removeEventListener('scroll', check_visibility);
    }
  } // --> check_visibility

  /**
   * @function pixelsVisible
   * This function returns the number of visible pixels in 1 dimension (x or y).
   *
   * @param int winPos - The position of the window in the dimension.
   * @param int winDim - The size of the window in the dimension.
   * @param int divPos - The position of the div in the dimension.
   * @param int divDim - The size of the div in the dimension.
   * @return int - The number of pixels visible in the given dimension.
   */
  function pixelsVisible(winPos, winDim, divPos, divDim) {
    // The div is not displayed (above or below the fold)
    if ( winPos + winDim < divPos || winPos > divPos + divDim ) {
      return 0;
    }

    // The div extends past both boundaries (return all of div is displayed)
    if ( (winPos > divPos && winPos + winDim < divPos + divDim) || (winPos < divPos && winPos + winDim > divPos + divDim) ) {
      return divDim;
    }

    // The div extends off the top of the window
    if ( winPos > divPos ) {
      return divPos + divDim - winPos;
    }

    // The div extends off the bottom of the window
    if ( divPos + divDim > winPos + winDim ) {
      return winPos + winDim - divPos;
    }

    // Full div is displayed
    return 0;
  } // --> pixelsVisible

  /**
   * @function get_data
   * This function returns data about the chatterbox for the tether.
   *
   * @return Object
   *
   * @author William Klausmeyer @ SNT Media
   */
  function get_data() {
    return {
      style: isSmall ? "3UP" : "5PACK",
      rss: siteName,
      widget: w_q.category,
      articles: articles
    };
  } // --> get_data

  // Attach resize event listener
  if ( div_conf[initSize].min != 0 ) {
    size_change();
    window.addEventListener('resize', size_change, false);
  }
  window.addEventListener('scroll', check_visibility, false);

  return {
    cw: change_widget,
    sc: size_change,
    a_click: article_click,
    get_data: get_data
  };
})(chatterbox.length);
