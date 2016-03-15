dynamic_widget = (function(){
  // Initialize Variables
  var api_url =  (location.protocol == "https:" ? "https" : "http" ) + "//dw.synapsys.us/list_api.php", // API location
  current_index = 0, // Current index to be viewed
  widget_data = {}, // Data for the widget
  widget_items = [], // Actual items for the widget to display
  widget_conf = JSON.parse(decodeURIComponent(location.search.substr(1))), // Args passed to the widget
  tries = 0;

  function get_data() {
    // Randomly select between college_basketball and nba
    if ( typeof(widget_conf.category) == "unefined" || ["finance", "nba", "college_basketball"].indexOf(widget_conf.category) == -1 ) {
      widget_conf.category = "finance";
    }

    // Create random number
    var random = Math.floor(Math.random() * 10);

    // If a random number is passed AND its the first try
    if ( typeof widget_conf.rand != "undefined" && tries == 0 ) {
      random = widget_conf.rand;
    }

    // Call the API
    $.ajax({
      url: api_url + '?partner=' + (typeof(widget_conf.dom) != "undefined" ? widget_conf.dom : "") + '&cat=' + widget_conf.category + '&rand=' + random,
      dataType: 'json',
      success: function(data) {
        widget_data = data;
        widget_items = data.l_data;
        dataLayer.push({
          'event':'widget-title',
          'eventAction':widget_data.l_title
        });
        $(document).ready(create_widget);
      },
      error: function(a, b, c) {
        try {
          var msg = $.parseJSON(a.responseText)['message'];
        } catch ( e ) {
          var msg = c;
        }
        if ( msg == '' ) {
          msg = b;
        }
        console.log("HTTP Error: " + msg);
        tries++;
        if ( tries > 10 ) {
          throw "HTTP Error: " + msg;
        }
        setTimeout(get_data, 1000);
      }
    });
  } // --> get_data

  function create_widget() {
    // Display the title
    $('.dw-title').each(function(){
      this.innerHTML = widget_data.l_title;
    });

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
      default:
        if ( widget_conf.remn == "true" ) {
          var base_url = "http://www.investkit.com/widget-list";
        } else {
          var base_url = "http://www.myinvestkit.com/" + widget_conf.dom + "/w-list";
        }
    }
    $('#list-link').attr('href', base_url + '?tw=' + widget_data.l_param + '&sw=' + widget_data.l_sort + '&input=' + widget_data.l_input);

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
    $('.dw-i-title#line1 a')[0].innerHTML = current_data.li_title;
    // Display description
    $('.dw-i-desc')[0].innerHTML = current_data.li_str;
    // Display the counter
    $('.dw-c-num')[0].innerHTML = '#' + current_data.li_rank;
    // Display the sub text
    $('.dw-i-title#line2')[0].innerHTML = current_data.li_sub_txt;

    // Put the link and photo
    $('.dw-c-img').css('background-image', 'url(' + current_data.li_img + ')');
    $('#mainurl').attr('href', current_data.li_url);
    $('#dw-i-title').attr('href', current_data.li_url);

    // Handle sub_img
    if ( current_data.li_subimg !== false ) {
      // Set up the url
      if ( widget_conf.remn == "true" ) {
        var sub_li_url = current_data.li_subimg.primary_url;
      } else {
        var sub_li_url = current_data.li_subimg.partner_url.replace('{partner}', widget_conf.dom);
      }

      // Show the subimg
      $('.dw-carousel').addClass('two');
      $('.dw-c-sub').css('background-image', 'url(' + current_data.li_subimg.img + ')');
      $('#subimg').attr('href', sub_li_url);
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

  $(document).ready(function(){
    var url = "http://www.investkit.com/";
    if ( widget_conf.remn != "true" ) {
      url = "http://www.myinvestkit.com/" + widget_conf.dom + "/";
    }
    $("#homelink").attr("href", url);
  });

  return {
    next_item: next_item,
    prev_item: prev_item,
    get_title: get_title
  };
})();
