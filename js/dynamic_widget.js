dynamic_widget = (function(){
  // Initialize Variables
  var api_url =  "http://108.170.11.234:190/list_api.php", // API location
  current_index = 0, // Current index to be viewed
  widget_data = {}, // Data for the widget
  widget_items = [], // Actual items for the widget to display
  widget_conf = JSON.parse(decodeURIComponent(location.search.substr(1))), // Args passed to the widget
  tries = 0;

  function get_data() {
    // Randomly select between college_basketball and nba
    if ( typeof(widget_conf.category) == "undefined" || ["finance", "nba", "college_basketball", "weather", "crime", "demographics", "politics", "disaster"].indexOf(widget_conf.category) == -1 ) {
      widget_conf.category = "finance";
    }

    // Create random number
    var random = Math.floor(Math.random() * 10);

    // If a random number is passed AND its the first try
    if ( typeof widget_conf.rand != "undefined" && tries == 0 ) {
      random = widget_conf.rand;
    }

    // Call the API
    // Create http object
    var xmlhttp;
    if ( window.XMLHttpRequest ) {
      xmlhttp = new XMLHttpRequest();
    } else {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // Create callback
    xmlhttp.onreadystatechange = function() {
      if ( xmlhttp.readyState == XMLHttpRequest.DONE ) {
        if ( xmlhttp.status == 200 ) {
          // On success
          widget_data = JSON.parse(xmlhttp.responseText);
          widget_items = widget_data.l_data;
          if ( typeof dataLayer != "undefined" ) {
            dataLayer.push({
              'event':'widget-title',
              'eventAction':dynamic_widget.get_title()
            });
          }
          create_widget();
        } else {
          // Error handling

          // Get the message
          var msg = xmlhttp.statusText;
          if ( xmlhttp.status == 500 ) {
            try {
              var json_msg = JSON.parse(xmlhttp.responseText);
              msg = json_msg.message;
            } catch (e) {
              console.log('No JSON message');
            }
          }
          msg = "HTTP Error (" + xmlhttp.status + "): " + msg;
          console.log(msg);

          // Add a try and try again if less than 10
          tries++;
          if ( tries > 10 ) {
            throw msg;
          }
          setTimeout(get_data, 1000);
        }
      }
    }

    xmlhttp.open("GET", api_url + '?partner=' + (typeof(widget_conf.dom) != "undefined" ? widget_conf.dom : "") + '&cat=' + widget_conf.category + '&rand=' + random, true);
    xmlhttp.send();
  } // --> get_data

  function create_widget() {
    // If the category is politics, add the correct CSS
    if ( widget_conf.category == "politics" ) {
      // Create the CSS file name
      var letter = "d";
      if ( widget_data.l_title.indexOf("Republican") != -1 ) {
        letter = "r";
      } else if ( widget_data.l_title.indexOf("Independent") != -1 ) {
        letter = "i";
      }

      // Create the css include element
      var css_url = "../css/dynamic_widget_politics_" + letter + ".css";
      var link = document.createElement("link");
      link.href = css_url;
      link.type = "text/css";
      link.rel = "stylesheet";
      link.media = "screen,print";

      // Append to the head
      document.getElementsByTagName("head")[0].appendChild(link);
    }

    // Display the title
    document.getElementsByClassName('dw-title')[0].innerHTML = widget_data.l_title;

    // Add the "See The List" link
    switch ( widget_conf.category ) {
      case 'nba':
        if ( widget_conf.remn == "true" ) {
          var base_url = "http://www.hoopsloyal.com/NBA/widget-list";
        } else {
          var base_url = "http://www.myhoopszone.com/" + widget_conf.dom + "/NBA/w-list";
        }
        break;
      case 'college_basketball':
        if ( widget_conf.remn == "true" ) {
          var base_url = "http://www.hoopsloyal.com/NCAA/widget-list";
        } else {
          var base_url = "http://www.myhoopszone.com/" + widget_conf.dom + "/NCAA/w-list";
        }
        break;
      case 'finance':
        if ( widget_conf.remn == "true" ) {
          var base_url = "http://www.investkit.com/widget-list";
        } else {
          var base_url = "http://www.myinvestkit.com/" + widget_conf.dom + "/w-list";
        }
        break;
      default:
        if ( widget_conf.remn == "true" ) {
          var base_url = "http://www.joyfulhome.com/widget-list";
        } else {
          var base_url = "http://www.myhousekit.com/" + widget_conf.dom + "/w-list";
        }
    }
    document.getElementById('list-link').href = base_url + '?tw=' + widget_data.l_param + '&sw=' + widget_data.l_sort + '&input=' + widget_data.l_input;

    // Display the first item
    display_item();
  } // --> create_widget

  function display_item() {
    // Get the current data
    var current_data = widget_items[current_index];

    // Set up the url
    if ( widget_conf.remn == "true" ) {
      current_data.li_url = current_data.li_primary_url;
    } else {
      current_data.li_url = current_data.li_partner_url.replace('{partner}', widget_conf.dom);
    }

    // Display the title
    document.getElementById('line1').getElementsByTagName('a')[0].innerHTML = current_data.li_title;

    // Display description
    document.getElementsByClassName('dw-i-desc')[0].innerHTML = current_data.li_str;
    // Display the counter
    document.getElementsByClassName('dw-c-num')[0].innerHTML = "#" + current_data.li_rank;
    // Display the sub text
    document.getElementById('line2').innerHTML = current_data.li_sub_txt;

    // Put the link and photo
    document.getElementsByClassName('dw-c-img')[0].style['background-image'] = 'url(' + current_data.li_img + ')';
    document.getElementById('mainurl').href = current_data.li_url;
    document.getElementById('dw-i-title').href = current_data.li_url;

    // Handle sub_img
    if ( current_data.li_subimg !== false ) {
      // Set up the url
      if ( widget_conf.remn == "true" ) {
        var sub_li_url = current_data.li_subimg.primary_url;
      } else {
        var sub_li_url = current_data.li_subimg.partner_url.replace('{partner}', widget_conf.dom);
      }

      // Show the subimg
      document.getElementsByClassName('dw-carousel')[0].className += ' two';
      document.getElementsByClassName('dw-c-sub')[0].style['background-image'] = 'url(' + current_data.li_subimg.img + ')';
      document.getElementById('subimg').href = sub_li_url;
    }
  } // --> display_item

  function next_item() {
    // Adjust the index
    current_index++;
    if ( current_index == widget_items.length ) {
      current_index = 0;
    }

    // Show the item
    display_item();

    // Send GA event with the click
    dataLayer.push({
      'event':'nav-right',
      'eventAction':dynamic_widget.get_title()
    });
  } // --> next_item

  function prev_item() {
    // Adjust the index
    current_index--;
    if ( current_index < 0 ) {
      current_index = widget_items.length - 1;
    }

    // Show the item
    display_item();

    // Send GA event with the click
    dataLayer.push({
      'event':'nav-left',
      'eventAction':dynamic_widget.get_title()
    });
  } // --> prev_item

  function get_title() {
    return widget_conf.dom + ":" + widget_conf.category + ":" + (widget_data.l_sort == null ? widget_data.l_param : widget_data.l_sort) + ":" + widget_data.l_title;
  } // --> get_title

  get_data();

  function set_home_link() {
    switch ( widget_conf.category ) {
      case 'finance':
        var url = "http://www.investkit.com/";
        if ( widget_conf.remn != "true" ) {
          url = "http://www.myinvestkit.com/" + widget_conf.dom + "/";
        }
        break;
      case 'nba':
        var url = "http://www.hoopsloyal.com/NBA";
        if ( widget_conf.remn != "true" ) {
          url = "http://www.myhoopszone.com/" + widget_conf.dom + "/NBA";
        }
        break;
      case 'college_basketball':
        var url = "http://www.hoopsloyal.com/NCAA";
        if ( widget_conf.remn != "true" ) {
          url = "http://www.myhoopszone.com/" + widget_conf.dom + "/NCAA";
        }
        break;
      default:
        var url = "http://www.joyfulhome.com/";
        if ( widget_conf.remn != "true" ) {
          url = "http://www.myhousekit.com/" + widget_conf.dom + "/";
        }
        break;
    }

    document.getElementById('homelink').href = url;
  } // --> set_home_link

  // Add onload listener for creating the home link
  if ( document.addEventListener ) {
    document.addEventListener('DOMContentLoaded', set_home_link);
  } else if ( document.attachEvent ) {
    document.attachEvent("onreadystatechange", function(){
      if ( document.readyState === "complete" ) {
        set_home_link();
      }
    });
  }

  return {
    next_item: next_item,
    prev_item: prev_item,
    get_title: get_title
  };
})();
