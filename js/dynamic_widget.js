dynamic_widget = (function(){
  // Initialize Variables
  var api_url =  "http://dw.synapsys.us/list_api.php", // API location
  current_index = 0, // Current index to be viewed
  category = (location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == "dynamic_widget_finance.html" ? "finance" : "sports"), // Category of the widget (will be dynamic)
  widget_data = {}, // Data for the widget
  widget_items = [], // Actual items for the widget to display
  widget_conf = JSON.parse(decodeURIComponent(location.search.substr(1))); // Args passed to the widget

  function get_data() {
    // Randomly select between college_basketball and nba
    if ( category == "sports" ) {
      category = ["college_basketball", "nba"][Math.round(Math.random())];
    }

    // Call the API
    $.ajax({
      url: api_url + '?partner=' + (typeof(widget_conf.dom) != "undefined" ? widget_conf.dom : "") + '&cat=' + category,
      dataType: 'json',
      success: function(data) {
        console.log(data);
        widget_data = data;
        widget_items = data.l_data;
        create_widget();
      },
      error: function(a, b, c) {
        console.log(a, b, c);
        $('.dw-title')[0].innerHTML = 'Error Loading API: ' + b;
      }
    });
  } // --> get_data

  function create_widget() {
    // Display the title
    $('.dw-title').each(function(){
      this.innerHTML = widget_data.l_title;
    });

    // Add the "See The List" link
    $('#list-link').attr('href', 'http://dw.synapsys.us/list_creator_api.php?tw=' + widget_data.l_param + '&sw=' + widget_data.l_sort + '&input=' + widget_data.l_input);

    // Display the first item
    display_item();
  } // --> create_widget

  function display_item() {
    // Get the current data
    var current_data = widget_items[current_index];

    // Display the title
    $('.dw-i-title#line1')[0].innerHTML = current_data.li_title;
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
      // Show the subimg
      $('.dw-carousel').addClass('two');
      $('.dw-c-sub').css('background-image', 'url(' + current_data.li_subimg.img + ')');
      $('#subimg').attr('href', current_data.li_subimg.url);
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
  } // --> next_item

  function prev_item() {
    // Adjust the index
    current_index--;
    if ( current_index < 0 ) {
      current_index = widget_items.length - 1;
    }

    // Show the item
    display_item();
  } // --> prev_item

  get_data();

  return {
    next_item: next_item,
    prev_item: prev_item
  };
})();
