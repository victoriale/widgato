(function() { //We want this to run in its own scope space.
	'use strict'; //do not allow undefined vars or ability to delete objects

	var has_payload_fired = false; //Global var for the payload fired check

	//Change me for production
	var dest_url = 'http://192.168.0.43:2121'; //fqdn or ip for destination for the information gathered.

	//Set global GUID for tether pageview
	var GUID = '';

	//Global Vars for inbetween heartbeats
	var tempX = 0;
	var tempY = 0;
	var clickX = 0;
	var clickY = 0;
	var lastMove = 0;
	var lastSent = 0;
	var click_lastSent = 0;
	var mouse_move_data = [];
	var click_data = [];
	var idle_timeout = 15000;
	var idle_count_down;
	var time_idle = 0;
	var packet_count = 0;
	var idle_timer;
	var tether_heartbeat;
	var iframe_uniq_id;
	var chatter_box = '';

	//Mouse tracking event assigned to mouse recording function
	document.onmousemove = get_mouse_xy;
	document.addEventListener("touchmove", get_mouse_xy);

	document.addEventListener("mousedown", get_mouse_click);
	document.addEventListener("touchstart", get_mouse_click);
	document.addEventListener("touchmove", get_mouse_click);

	function get_mouse_xy(e) {
		var ret = false;
		var pos_data = {};

		// do nothing if last move was less than 100 ms ago
		if(Date.now() - lastMove > 100) {
			lastMove = Date.now();
			tempX = e.pageX;
			tempY = e.pageY;

			// catch possible negative values
			if (tempX < 0){tempX = 0;}
			if (tempY < 0){tempY = 0;}

			pos_data.X = tempX;
			pos_data.Y = tempY;
			pos_data.time = lastMove;

			mouse_move_data.push(pos_data);

			ret = true;
		}
		return ret;
	}

	function get_mouse_click(e) {
		var evt = e ? e : window.event;
		var click_pos_data = {};

		if ((evt.clientX || evt.clientY) && document.body && document.body.scrollLeft != null) {
			clickX = evt.clientX + document.body.scrollLeft;
			clickY = evt.clientY + document.body.scrollTop;
		}
		else if ((evt.clientX || evt.clientY) && document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.scrollLeft != null) {
			clickX = evt.clientX + document.documentElement.scrollLeft;
			clickY = evt.clientY + document.documentElement.scrollTop;
		}
		else if (evt.pageX || evt.pageY) {
			clickX = evt.pageX;
			clickY = evt.pageY;
		}

		click_pos_data.X = clickX;
		click_pos_data.Y = clickY;
		click_pos_data.time = Date.now();

		click_data.push(click_pos_data);

		return true;
	}

	function set_idle_listeners() { //setup the event listeners if user becomes active trigger start timer
		window.document.addEventListener("mousemove", start_timer, false);
		window.document.addEventListener("mousedown", start_timer, false);
		window.document.addEventListener("keypress", start_timer, false);
		window.document.addEventListener("DOMMouseScroll", start_timer, false);
		window.document.addEventListener("mousewheel", start_timer, false);
		window.document.addEventListener("touchstart", start_timer, false);
		window.document.addEventListener("touchmove", start_timer, false);
		window.document.addEventListener("MSPointerMove", start_timer, false);
	}

	function start_timer() { //if user becomes active, remove event listeners so we dont polute the event space
		window.document.removeEventListener("mousemove", start_timer, false);
		window.document.removeEventListener("mousedown", start_timer, false);
		window.document.removeEventListener("keypress", start_timer, false);
		window.document.removeEventListener("DOMMouseScroll", start_timer, false);
		window.document.removeEventListener("mousewheel", start_timer, false);
		window.document.removeEventListener("touchstart", start_timer, false);
		window.document.removeEventListener("touchmove", start_timer, false);
		window.document.removeEventListener("MSPointerMove", start_timer, false);

		//start timer for the idle time-out time
		idle_count_down = window.setTimeout(stop_timer, idle_timeout);
		clearInterval(idle_timer); //stop the interval that tracked how long they were idle

		tether(); //call the tether once again or to start for the first time.
	}

	function stop_timer() { //after the idle time out time regardless if user did anything at all, clear the timer and set the event listeners
		window.clearTimeout(idle_count_down);
		set_idle_listeners();
		clearInterval(tether_heartbeat); //lets stop the tether from running if idle

		idle_timer = setInterval(track_idle, 1000);
	}

	function track_idle() {
		time_idle++;
	}

	function tether() {
		tether_heartbeat = setInterval((function payload(d) { //heartbeat a self invoking function
			//Count packet
			packet_count++;

			//Clean up from previous tick.
			if(iframe_uniq_id) {
				document.getElementById(iframe_uniq_id).remove();
			}

			var iframe = document.body.appendChild(document.createElement('iframe')); //setup the dynamic async iframe
			var doc = iframe.contentWindow.document;

			//make the unique id for the tether iframe
			var rand_id = guid();
			iframe_uniq_id = "SNT_tether_frame_"+rand_id;

			// style the iframe with some CSS
			iframe.style.cssText = "width:1px;height:1px;border:none;visibility:hidden;display:none";

			iframe.setAttribute("id", iframe_uniq_id);

			/**
			 * @function Element.prototype.isVisible
			 * This function determines if the element is 60% or more visible on the page
			 *
			 * @return bool - True if >=60% visible (by area), False if not
			 * By: William Klausmeyer @ SNT Media
			 */
			Element.prototype.isVisible = function(debug_synapsys, debug_div) {
				// Collect the data about the div and window
				var winDim = {
					x: window.scrollX,
					y: window.scrollY,
					w: window.innerWidth,
					h: window.innerHeight
				};
				var divDim = {
					x: this.offsetLeft,
					y: this.offsetTop,
					w: this.offsetWidth,
					h: this.offsetHeight,
					area: this.offsetWidth * this.offsetHeight
				};
				var pixels = {
					x: 0,
					y: 0
				};

				// Calculate x pixels
				if ( !(winDim.x + winDim.w < divDim.x || winDim.x > divDim.x + divDim.w) ) {
					// Is the item on the screen?
					if ( (winDim.x > divDim.x && winDim.x + winDim.w < divDim.x + divDim.w) || (winDim.x < divDim.x && winDim.x + winDim.w > divDim.x + divDim.w) ) {
						// If it extends past left and right of the window
						pixels.x = divDim.w;
					} else if ( winDim.x > divDim.x ) {
						// If it extends past the left of the window
						pixels.x = divDim.x + divDim.w - winDim.x;
					} else if ( divDim.x + divDim.w > winDim.x + winDim.w ) {
						// If it extends past the right of the window
						pixels.x = winDim.x + winDim.w - divDim.x;
					}
				}
				// Calculate y pixels
				if ( !(winDim.y + winDim.h < divDim.y || winDim.y > divDim.y + divDim.h) ) {
					// Is the item on the screen?
					if ( (winDim.y > divDim.y && winDim.y + winDim.h < divDim.y + divDim.h) || (winDim.y < divDim.y && winDim.y + winDim.h > divDim.y + divDim.h) ) {
						// If it extends past left and right of the window
						pixels.y = divDim.h;
					} else if ( winDim.y > divDim.y ) {
						// If it extends past the left of the window
						pixels.y = divDim.y + divDim.h - winDim.y;
					} else if ( divDim.y + divDim.h > winDim.y + winDim.h ) {
						// If it extends past the right of the window
						pixels.y = winDim.y + winDim.h - divDim.y;
					}
				}

				// Calculate the area visible
				divDim.vis = pixels.x * pixels.y;
				var percentage = divDim.vis / divDim.area;

				// Handle debugging div
				if ( debug_synapsys ) {
					debug_div.innerHTML = Math.round(percentage * 100) + "%";
				}

				return (percentage >= 0.6 ? true : false);
			} // --> Element.prototype.isVisible

			function guid() { //func to make the session id
				function s4() {
					return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
				};
				return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
			};

			function tab_focus() { //detect in multiple browsers if the tab or window is focused : pulled from http://stackoverflow.com/a/1060034/2120534 but modified
				var focused = true;
				var hidden = 'hidden';

				// Standards:
				if (hidden in document)
					document.addEventListener('visibilitychange', onchange);

				else if ((hidden = 'mozHidden') in document) //deprecated
					document.addEventListener('mozvisibilitychange', onchange);

				else if ((hidden = 'webkitHidden') in document)
					document.addEventListener('webkitvisibilitychange', onchange);

				else if ((hidden = 'msHidden') in document)
					document.addEventListener('msvisibilitychange', onchange);

				// IE 9 and lower:
				else if ('onfocusin' in document)
					document.onfocusin = document.onfocusout = onchange;

				// All others:
				else
					window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;

				function onchange (evt) {
					evt = evt || window.event;

					if(evt.type == 'blur' || evt.type == 'focusout' || evt.type == 'pagehide') focused = false;
				}

				// set the initial state (but only if browser supports the Page Visibility API)
				if( document[hidden] !== undefined )
					onchange({type: document[hidden] ? 'blur' : 'focus'});

				return focused;
			}

			function browser_detection() { //pulled from http://stackoverflow.com/a/2401861/2120534
				var ua = navigator.userAgent, tem,
				M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

				if(/trident/i.test(M[1])){
					tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
					return 'IE '+(tem[1] || '');
				}
				if(M[1] === 'Chrome'){
					tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
					if(tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
				}
				M = M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
				if((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
				return M.join(' ');
			}

			if(GUID == '') { //check if not undefined
				GUID = guid(); //make the GUID
			}

			//date today
			var today = new Date();

			//Window Size Detection
			var win_height = window.innerHeight;
			var win_width = window.innerWidth;

			//DOM size detection
			var dom_height = document.documentElement.clientHeight;
			var dom_width = document.documentElement.clientWidth;

			//scroll position
			var scroll_x = (window.pageXOffset || document.documentElement.scrollLeft) - (document.documentElement.clientLeft || 0);
			var scroll_y = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);

			//mobile detection
			var is_mobile = window.matchMedia("only screen and (max-width: 760px)"); //credit http://stackoverflow.com/a/10364620/2120534

			//nagivation timing and performance
			var nav_timing = window.performance.timing;

			//Build out the variables to set in the payload object
			var curr_time = today.getTime();
			var is_focused = tab_focus();
			var browser_info = browser_detection();
			var client_ip = ''; //gathered from the initial call to fetch this script
			var current_uri = window.location.href;
			var screen_res = screen.width+'x'+screen.height;
			var page_size = dom_width+'x'+dom_height;
			var window_size = win_width+'x'+win_height;
			var scroll_position = '('+scroll_x+','+scroll_y+')';
			var os_name = navigator.platform;
			var mobile = is_mobile.matches;
			var device_lang = navigator.language;
			var referrer = document.referrer;
			var time_zone = today.toString();
			var mouse_tracking_data = JSON.stringify(mouse_move_data);
			var mouse_click_data = JSON.stringify(click_data);
			var page_load_time = curr_time - nav_timing.navigationStart;
			var nav_start_time = nav_timing.navigationStart;
			var load_event_end = nav_timing.loadEventEnd;
			var request_response_time = nav_timing.responseEnd - nav_timing.requestStart;

			//Widget and Ad variables
			var widget_id, widget_type, ad_stack_id, ad_stack_ad_id, ad_stack_type;
			var widget_pos, ad_stack_pos, widget_visibility, ad_stack_visibility;
			var widget_parent_pos, ad_stack_parent_pos;

			//cover the widget selection for multiple widgets, single widgets, and not loaded widgets.
			if(document.querySelectorAll('[id^=div_pfwidget_]')[1] != undefined) { //if the second indices exists, we have multiple sets of side kick
				var widget_arr = document.querySelectorAll('[id^=div_pfwidget_]'); //grab the array of elements
				//setup the vars to hold more than a single return
				widget_id = [];
				widget_type = [];
				widget_pos = {};
				widget_parent_pos = {};
				widget_visibility = {};

				//loop through the length of the array of elements
				for(var i = 0; i < widget_arr.length; i++) {
					widget_id.push(widget_arr[i].id); //capture all element ids since they are unique
					widget_type.push(widget_arr[i].getAttribute('ad_unit_name')); //we want the ad unit name too since this helps determine the ad provider key by provider

					//capture the widgets position to the page
					var widget_rect = widget_arr[i].getBoundingClientRect(); //widely supported native JS function to grab the top, left, width, height of an element
					widget_pos[widget_arr[i].id] = {'x':widget_rect.left, 'y':widget_rect.top, 'w':widget_rect.width, 'h':widget_rect.height}; //key the object off the id of the widget and set that to its widget_rect values

					//capture the widget parents position to the page
					var parent_rect = widget_arr[i].parentNode.getBoundingClientRect(); //widely supported native JS function to grab the top, left, width, height of an element
					widget_parent_pos[widget_arr[i].id] = {'x':parent_rect.left, 'y':parent_rect.top, 'w':parent_rect.width, 'h':parent_rect.height}; //key the object off the id of the widget and set that to its parent_rect values

					widget_visibility[widget_arr[i].id] = widget_arr[i].isVisible();
				}
			}
			else if(document.querySelectorAll('[id^=div_pfwidget_]')[0] == undefined) { //no widget element detected. nothing has loaded, return empty
				widget_id = '';
				widget_type = '';
				widget_pos = '';
				widget_parent_pos = '';
				widget_visibility = '';
			}
			else { //single widget present
				widget_id = document.querySelectorAll('[id^=div_pfwidget_]')[0].id; //get the widget id
				widget_type = document.querySelectorAll('[id^=div_pfwidget_]')[0].getAttribute('ad_unit_name'); //get the widget ad unit name

				//return the position of the widget to the page using getBoundingRect()
				var widget_rect = document.querySelectorAll('[id^=div_pfwidget_]')[0].getBoundingClientRect();
				widget_pos = {'x':widget_rect.left, 'y':widget_rect.top, 'w':widget_rect.width, 'h':widget_rect.height};

				//return the position of the widget parent element to the page using getBoundingRect()
				var parent_rect = document.querySelectorAll('[id^=div_pfwidget_]')[0].parentNode.getBoundingClientRect();
				widget_parent_pos = {'x':parent_rect.left, 'y':parent_rect.top, 'w':parent_rect.width, 'h':parent_rect.height};

				widget_visibility = document.querySelectorAll('[id^=div_pfwidget_]')[0].isVisible();
			}

			//cover the ad stack selection for multiple stacks, single stacks, or stacks not yet loaded
			//The below code functions very similar to the above widget code. If you need help defining what is being done, review the comments above.
			if(document.querySelectorAll('[id^=div_ad_stack_]')[1] != undefined) {
				var ad_stack_arr = document.querySelectorAll('[id^=div_ad_stack_]');
				ad_stack_id = [];
				ad_stack_ad_id = [];
				ad_stack_type = [];
				ad_stack_pos = {};
				ad_stack_parent_pos = {};
				ad_stack_visibility = {};

				for(var i = 0; i < ad_stack_arr.length; i++) {
					ad_stack_id.push(ad_stack_arr[i].id);
					ad_stack_ad_id.push(document.querySelectorAll('[id^=div_ad_stack_]')[i].querySelector('[id^=div]').id);
					ad_stack_type.push(document.querySelectorAll('[id^=div_ad_stack_]')[i].querySelector('[id^=div]').getAttribute('pfw_type'));

					var ad_stack_rect = ad_stack_arr[i].getBoundingClientRect();
					ad_stack_pos[ad_stack_arr[i].id] = {'x':ad_stack_rect.left, 'y':ad_stack_rect.top, 'w':ad_stack_rect.width, 'h':ad_stack_rect.height};

					var parent_rect = ad_stack_arr[i].parentNode.getBoundingClientRect();
					ad_stack_parent_pos[ad_stack_arr[i].id] = {'x':parent_rect.left, 'y':parent_rect.top, 'w':parent_rect.width, 'h':parent_rect.height};

					ad_stack_visibility[ad_stack_arr[i].id] = ad_stack_arr[i].isVisible();
				}
			}
			else if(document.querySelectorAll('[id^=div_ad_stack_]')[0] == undefined) {
				ad_stack_id = '';
				ad_stack_ad_id = '';
				ad_stack_type = '';
				ad_stack_pos = '';
				ad_stack_parent_pos = '';
				ad_stack_visibility = '';
			}
			else {
				ad_stack_id = document.querySelectorAll('[id^=div_ad_stack_]')[0].id;
				ad_stack_ad_id = document.querySelectorAll('[id^=div_ad_stack_]')[0].querySelector('[id^=div]').id;
				ad_stack_type = document.querySelectorAll('[id^=div_ad_stack_]')[0].querySelector('[id^=div]').getAttribute('pfw_type');

				var ad_stack_rect = document.querySelectorAll('[id^=div_ad_stack_]')[0].getBoundingClientRect();
				ad_stack_pos = {'x':ad_stack_rect.left, 'y':ad_stack_rect.top, 'w':ad_stack_rect.width, 'h':ad_stack_rect.height};

				var parent_rect = document.querySelectorAll('[id^=div_ad_stack_]')[0].parentNode.getBoundingClientRect();
				ad_stack_parent_pos = {'x':parent_rect.left, 'y':parent_rect.top, 'w':parent_rect.width, 'h':parent_rect.height};

				ad_stack_visibility = document.querySelectorAll('[id^=div_ad_stack_]')[0].isVisible();
			}

			//ChatterBox Detection
			if(typeof chatterbox !== typeof undefined) {
				chatter_box = chatterbox;
				var chatter_box_length = chatter_box.length;

				var all_chatter_box_data = {};
				var chatter_box_style = '';
				var chatter_box_rss = '';
				var chatter_box_widget = '';
				var chatter_box_articles = '';

				if(chatter_box_length > 1) {

					for(var i = 0; i < chatter_box.length; i++) {
						chatter_box_style = chatter_box[i].get_data().style;
						chatter_box_rss = chatter_box[i].get_data().rss;
						chatter_box_widget = chatter_box[i].get_data().widget;
						chatter_box_articles = chatter_box[i].get_data().articles;

						all_chatter_box_data[i] = {'style' : chatter_box_style, 'rss' : chatter_box_rss, 'widget' : chatter_box_widget, 'articles' : chatter_box_articles};
					}
				}
				else {
					chatter_box_style = chatter_box[0].get_data().style;
					chatter_box_rss = chatter_box[0].get_data().rss;
					chatter_box_widget = chatter_box[0].get_data().widget;
					chatter_box_articles = chatter_box[0].get_data().articles;

					all_chatter_box_data = {'style' : chatter_box_style, 'rss' : chatter_box_rss, 'widget' : chatter_box_widget, 'articles' : chatter_box_articles};
				}
			}

			//Always send this info
			var payload_data = {
				'GUID' : GUID,
				'tm' : curr_time,
				'tf' : is_focused,
				'sp' : scroll_position,
				'mm' : mouse_tracking_data,
				'mc' : mouse_click_data,
				'ti' : time_idle,
				'ns' : nav_start_time,
				'le' : load_event_end,
				'wi' : widget_id,
				'wt' : widget_type,
				'ai' : ad_stack_id,
				'ad' : ad_stack_ad_id,
				'at' : ad_stack_type,
				'we' : widget_pos,
				'wp' : widget_parent_pos,
				'as' : ad_stack_pos,
				'ap' : ad_stack_parent_pos,
				'wv' : widget_visibility,
				'av' : ad_stack_visibility,
				'pc' : packet_count,
				'cb' : all_chatter_box_data
			}

			//Only send if its the first send off
			if(!has_payload_fired) {
				payload_data.ip = client_ip;
				payload_data.bw = browser_info;
				payload_data.ul = current_uri;
				payload_data.sr = screen_res;
				payload_data.ps = page_size;
				payload_data.ws = window_size;
				payload_data.os = os_name;
				payload_data.mo = mobile;
				payload_data.dl = device_lang;
				payload_data.rf = referrer;
				payload_data.tz = time_zone;
				payload_data.pl = page_load_time;
				payload_data.rr = request_response_time;
			}

			var return_payload_data = JSON.stringify(payload_data); //send back json
			var return_encoded_url = dest_url + '/event_parser.php?data=' + encodeURIComponent(return_payload_data); //url encode for the send off
			var iframe_write = '<body onload="' + 'var d = document;d.getElementsByTagName(\'head\')[0].' + 'appendChild(d.createElement(\'script\')).src' + '=\''+return_encoded_url+'\'">'; //set the url in the script src

			doc.open().write(iframe_write); //write out the body onload JS

			doc.close(); //iframe onload s
			//Check if this is the payload or a tug
			if(!has_payload_fired) has_payload_fired = true;

			//must reset the mouse tracking array to ensure we have fresh data every second. Mouse tracking gathers a max of 10 coordinates per second
			mouse_move_data = [];
			click_data = [];

			//reset time idle to ensure we have fresh data each time they go idle
			time_idle = 0;

			return payload; //return the function to the setInterval to trigger this function again

		})(document), 1000); //recall this function every second
	}

	start_timer();
})();
