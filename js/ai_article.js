ai_widget = (function(){
	// Declare variables
	var APIUrl = 'http://sports-ai.synapsys.us:91/HoopsLoyal/API_AI_SPO_NBA_Matchup_Mag_000006.php?call=widget',
	YseopURL = 'http://72.52.250.160:8080/yseop-manager/direct/snt-spo-basketball/dialog.do',
	YseopUN = 'client', YseopPW = '123',
	YseopXML = '',
	AIData = {},
	gameID = -1,
	pageInd = -1,
	availPages = [],
	pages = ['pregame_report', 'postgame_report', 'about_the_teams', 'historical_team_stats', 'last_matchup', 'player_comparison_power_forwards', 'player_comparison_small_forwards', 'player_comparison_shooting_guards', 'player_comparison_point_guards', 'player_comparison_centers', 'home_team_starting_roster', 'away_team_starting_roster', 'home_team_injury_report', 'away_team_injury_report', 'upcoming'],
	transArr = {
		'pregame_report': 'pregame',
		'postgame_report': 'postgame',
		'about_the_teams': 'about',
		'historical_team_stats': 'history',
		'last_matchup': 'lastmatch',
		'player_comparison_centers': 'centers',
		'player_comparison_power_forwards': 'powerforwards',
		'player_comparison_point_guards': 'pointguards',
		'player_comparison_small_forwards': 'smallforwards',
		'player_comparison_shooting_guards': 'shootingguards',
		'home_team_starting_roster': 'homeroster',
		'away_team_starting_roster': 'awayroster',
		'home_team_injury_report': 'homeinjury',
		'away_team_injury_report': 'awayinjury',
		'upcoming': 'upcoming',
  };

	function getContent() {
		$.ajax({
			url: APIUrl,
			success: function(data) {
				$.ajax({
					url: YseopURL,
					method: 'POST',
					data: {'xml': data},
					success: function(data) {
						YseopXML = data;
						processData();
					},
					error: function(jqXHR, status, error) {
						console.log(jqXHR, status, error);
						displayError('Error Loading YSEOP Response: ' + status);
					},
					dataType: 'xml',
					headers: {
						"Authorization": "Basic " + btoa(YseopUN + ":" + YseopPW),
					},
				});
			},
			error: function(jqXHR, status, error) {
				console.log(jqXHR, status, error);
				displayError('Error Loading Sports API: ' + status);
			},
			dataType: 'text'
		});
	} // --> getContent

	function displayError(errorMsg) {
		$('.aiw-txt')[0].innerHTML = errorMsg;
	} // --> displayError

	function getData() {
		return AIData;
	} // --> getData

	function displayPage() {
		// Check for data
		if ( pageInd == -1 || gameID == -1 || typeof availPages[pageInd] == "undefined" ) {
			return console.log('Invalid page or game ID', pageInd, gameID);
		}

		// Get the data
		var pageID = availPages[pageInd];
		var data = $('<div>' + AIData[pageID].text + '</div>');
		var images = $(AIData.meta_data.text).find('.currentGameImages .image');
		var arr = {
			title: data.find('.widget_title')[0].innerHTML,
			number: (pageInd + 1) + '/' + availPages.length,
			url: 'article/' + transArr[pageID] + '/' + gameID,
			content: data.find('.article')[0].innerHTML.replace(/(<br>)+/g,' <br>&nbsp; '),
			img: images[pageInd % images.length].innerHTML.replace('sports-images.synapsys.us:99', 'prod-sports-images.synapsys.us')
		};

		// Set the data
		$('.aiw-title')[0].innerHTML = arr.title;
		$('.aiw-num')[0].innerHTML = arr.number;
		$('#ai-link').attr('href', arr.url);
		$('.aiw-txt')[0].innerHTML = arr.content;
		$('.aiw-img').css('background-image', 'url(' + arr.img + ')');
		$('.aiw-ad')[0].innerHTML = arr.title + ' presented by:';
		fitText();
	} // --> displayPage
	function fitText() {
		var textDiv = $('.aiw-txt');
		if ( textDiv[0].scrollHeight > textDiv[0].clientHeight ) {
			var original = textDiv[0].innerHTML.substring(0, 400),
			index = 0;
			while ( index < 500 && textDiv[0].scrollHeight > textDiv[0].clientHeight ) {
				index++;
				original = original.substring(0, original.lastIndexOf(" "));
				textDiv[0].innerHTML = original + '...';
			}
		}
	} // --> fitText
	function nextPage() {
		// Exit if no pages
		if ( pageInd == -1 || availPages.length == 0 ) {
			return false;
		}

		// Create new pageInd
		pageInd++;
		if ( pageInd >= availPages.length ) {
			pageInd = 0;
		}

		// Create page
		displayPage();
	} // --> nextPage

	// **** PARSING FUNCTION ****
	function processData() {
		// Check for data
		if ( typeof YseopXML != "object" ) {
			return displayError('Invalid YSEOP Response');
		}

		// Get to the y:txt
		var burrowArray = ['y:output', 'y:results', 'y:texts', 'y:txt'],
		index = 0, subIndex = 0;
		while ( YseopXML.nodeName != 'y:txt' ) {
			// Check for overrun
			if ( subIndex >= YseopXML.childNodes.length ) {
				console.log(YseopXML, burrowArray[index]);
				return displayError('Error Parsing YSEOP Response');
			}

			// Check for next level
			if ( YseopXML.childNodes[subIndex].nodeName == burrowArray[index] ) {
				YseopXML = YseopXML.childNodes[subIndex];
				subIndex = -1;
				index++;
			}

			// Go to the next child node
			subIndex++;
		}

		// Parse the nodes
		for ( var i = 0; i < YseopXML.childNodes.length; i++ ) {
			if ( typeof YseopXML.childNodes[i].id != "undefined" ) {
				AIData[YseopXML.childNodes[i].id] = parseChildNodes(YseopXML.childNodes[i].childNodes);
			}
		}

		// Get all the pages
		for ( var i = 0; i < pages.length; i++ ) {
			if ( AIData.hasOwnProperty(pages[i]) ) {
				availPages.push(pages[i]);
			}
		}
		pageInd = 0;

		// Title of the module
		$(AIData.meta_data.text).find('.currentGame .moduleTeam').each(function(index) {
			// Create selector or skip
			if ( index == 0 ) {
				var selector = '.home.team';
			} else if ( index == 1 ) {
				var selector = '.away.team';
			} else {
				return false;
			}

			// Set the team name
			$(selector)[0].innerHTML = $(this)[0].innerHTML;
		});

		// Get game ID
		gameID = $(AIData.meta_data.text).find('.currentGame .eventId')[0].innerHTML;

		// Display first data
		displayPage();
	} // --> processData
	function parseChildNodes(xmlNodes) {
		// Declare variables
		var text = ''; // HTML string to return
		var modules = []; // Array of modules to return

		// Loop through all of the nodes
		for ( var i = 0; i < xmlNodes.length; i++ ) {
			// Handle different node names differently
			switch ( xmlNodes[i].nodeName ) {
				case 'yt:bold': // Bold text
					text += '<b>' + xmlNodes[i].textContent + '</b>';
					break;
				case 'yt:line': // A separating line (I don't think this exists in the HoopsLoyal yseop, but it does in joyfulhome
					text += '<div class="line"></div>';
					break;
				case 'yt:par': // A paragraph (just a line break because these tags don't wrap around a paragraph)
					// NOTE!! You may want to add a second <br> here for better separation but it will mess with the module spacing too
					text += '<br><br>';
					break;
				case 'yt:hlink': // A hyperlink
					// We have to parse through the hyperlink nodes to get the information
					// First delete any old information
					delete hLinkText;
					delete hLinkRef;
					// Loop through the sub-nodes
					for ( var subInd = 0; subInd < xmlNodes[i].childNodes.length; subInd++ ) {
						if ( xmlNodes[i].childNodes[subInd].nodeName == 'yt:title' ) { // Get the hyperlink text
							var hLinkText = xmlNodes[i].childNodes[subInd].textContent;
						} else if ( xmlNodes[i].childNodes[subInd].nodeName == 'yt:src' ) { // Get the hyperlink target
							var hLinkRef = xmlNodes[i].childNodes[subInd].textContent;
						}
					}
					if ( typeof hLinkText != "undefined" && typeof hLinkRef != "undefined" ) { // Check for both and put them together
						text += '<a href="' + hLinkRef + '">' + hLinkText + '</a>';
					}
					break;
				case 'yt:non-breaking-hyphen': // Hyphens
					text += '-';
					break;
				case 'yt:superscript': // Superscript text
					text += '<sup>' + xmlNodes[i].textContent + '</sup>';
					break;
				case 'yt:div': // A div
					if ( xmlNodes[i].className == "module" ) {
						// If its a module, parse the children and save it as a new module
	          var result = parseChildNodes(xmlNodes[i].childNodes);
	          if ( result.modules.length > 0 ) {
	            modules = result.modules;
	          } else {
	            modules[modules.length] = result.text;
	          }
					} else if ( xmlNodes[i].className == "module1" || xmlNodes[i].className == "module2" ) {
	          modules[modules.length] = '<div class="' + xmlNodes[i].className + '">' + parseChildNodes(xmlNodes[i].childNodes).text + '</div>';
					} else if ( xmlNodes[i].className.indexOf('module') != -1 || xmlNodes[i].className == "article" ) {
						// If its a module sub-div, parse its children and put them in a div
	          var result = parseChildNodes(xmlNodes[i].childNodes);
						text += '<div class="' + xmlNodes[i].className + '">' + result.text + '</div>';
	          if ( result.modules.length > 0 ) {
	            modules = result.modules;
	          }
					} else if ( xmlNodes[i].className == "section" ) {
						// Handle sections
						text += '<div class="section" id="' + xmlNodes[i].id + '">' + parseChildNodes(xmlNodes[i].childNodes).text + '</div>';
					} else if ( ((xmlNodes[i].className == "gameImages" || xmlNodes[i].className == "teamImages") && xmlNodes[i].id != "") || xmlNodes[i].className == "teamLogo" ) {
						// Handle images
						text += '<div class="' + xmlNodes[i].id + '">' + parseChildNodes(xmlNodes[i].childNodes).text + '</div>';
					} else {
						// Otherwise put it in a div with the correct class
						text += '<div class="' + xmlNodes[i].className + '">' + parseChildNodes(xmlNodes[i].childNodes).text + '</div>';
					}
					break;
				case 'yt:enum': // A list of items
					// We have to parse the child nodes for the list items
					var listText = '<ul>'; // Create the lists HTML
					// Loop through the list items
					for ( var j = 0; j < xmlNodes[i].childNodes.length; j++ ) {
						// Only parse the ones that aren't blank spaces
						if ( xmlNodes[i].childNodes[j].nodeName == "yt:item" ) {
							// Add the item (parsed) as a li item
							listText += '<li>' + parseChildNodes(xmlNodes[i].childNodes[j].childNodes).text + '</li>';
						}
					}
					listText += '</ul>';
					// Add the list HTML to the string
					text += listText;
					break;
				case '#text': // Raw text
					text += xmlNodes[i].textContent;
					break;
				default: // If it's an unknown node, console log it and it's content for identification then add it to the above switch statement
					console.log(xmlNodes[i].nodeName);
					console.log(xmlNodes[i].textContent);
					break;
			}
		}
		// Return the text and modules
		return {
			text: text,
			modules: modules
		};
	} // --> parseChildNodes

	getContent();
	return {
		getData: getData,
		nextPage: nextPage
	};
})();
