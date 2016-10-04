(function(){
  var protocol = (location.protocol) === 'https:' ? 'https' : 'http'; //Protocol of the domain the bar exist on
  var resourceURL = protocol + '://w1.synapsys.us/widgets/deepdive';
  // var resourceURL = protocol + '://localhost:8000/deepdive';
  var embedURL = resourceURL + '/bar/bar.js'; //URL of script embed. This is used as a fallback if document.currentScript is not available
  /**
   * Global variables
   **/
  var mobileMenuButton; //DOM Element of mobile menu button
  var mobileDropdown; //DOM Elmenent of mobile menu dropdown
  var mobileSearchButton; //DOM Element of mobile search button
  var mobileSearchBar; //DOM Element of mobile search bar
  var smallDesktopSearchButton; //DOM ELement of small desktop search button
  var smallDesktopSearchBar; //DOM Element of small desktop search bar
  var desktopBoxscoresButton; //DOM Element of desktop boxscores button
  var desktopBoxscoresDropdown; //DOM Element of desktop boxscores dropdown

  var ncaamDropdownElements = {
    nav: document.createElement('ul'),
    links: document.createElement('section')
  };
  var ncaafDropdownElements = {
    nav: document.createElement('ul'),
    links: document.createElement('section')
  };

  var defaultState = 'ny'; //Default state used whenever state lookup fails (from api or from stateAbbrevToFull function)

  var domain = window.location.hostname; //Domain the bar exists on
  domain = domain.replace(/www./, '');
  //TODO: Test domain. Remove when product finished
  // domain = 'latimes.com';
  var homerunDomain = 'http://myhomerunzone.com/' + domain;
  var hoopsDomain = 'http://myhoopszone.com/' + domain;
  // var touchdownDomain = 'http://mytouchdownzone.com/' + domain;
  var touchdownDomain = 'http://www.mytouchdownzone.com/' + domain;

  var footballLeagueYear = 2016; //Year used by TDL sites for urls

  /**
   * Bootstrap functions
   **/
  function bootstrapApp(){
    var apiString = resourceURL + '/bar/template_middlelayer.php';
    var xhttp = createRequestObject();

    xhttp.onreadystatechange = function(){
      if(xhttp.readyState === 4 && xhttp.status === 200){
        //Success
        var res = xhttp.responseText;
        // console.log('GET TEMPLATE SUCCESS', res);
        var template = document.createElement('section');
        template.className = 'ddb-container';
        template.innerHTML = res;
        //Grab current script element to know where to inject bar
        var currentScript = document.currentScript || (function() {
            var scripts = document.getElementsByTagName("script");
            for (var i = scripts.length - 1; i >= 0; i--) {
               if (scripts[i].src.indexOf(embedURL) != -1) {
                  return scripts[i];
               }
            }
         })();
         var parentNode = currentScript.parentNode;
         //Inject HTML
         parentNode.insertBefore(template, currentScript);
         //Load script dependencies
         loadScriptDependencies();
         //Continue building Bar
         getUserLocation();
         bootstrapBoxscores();
         //bootstrapSearch() is within loadScriptDependencies() function
         bootstrapMobileMenu();
         bootstrapMobileSearch();
         bootstrapSmallDesktopSearch();
         bootstrapDesktopBoxscores();
         bootstrapDynamicDropdown();
      }else if(xhttp.readyState === 4 && xhttp.tatus !== 200){
        //Error
        // console.log('GET TEMPLATE ERROR', xhttp.responseText);

      }
    };
    xhttp.open('GET', apiString, true);
    xhttp.send();
  }

  var bootstrapMobileMenu = function(){
    //Apply click event to tier1 mobile submenus
    var tier1 = document.getElementsByClassName('ddb-mobile-dropdown-tier1');
    for(var i = 0, length = tier1.length; i < length; i++){
      var node = tier1[i];

      node.addEventListener('click', function(evt){
        var node = this;

        if(hasClass(node, 'ddb-tier1-show')){
          closeMobileSubMenus();
        }else{
          closeMobileSubMenus();
          addClass(node, 'ddb-tier1-show');
        }

        var node = evt.target;
        addClass(node, 'ddb-show');
      })
    }

    //Apply click event to mobile menu button
    mobileMenuButton = document.getElementById('ddb-mobile-menu');
    mobileDropdown = document.getElementById('ddb-mobile-dropdown');
    mobileMenuButton.addEventListener('click', function(evt){
      if(hasClass(mobileDropdown, 'ddb-show')){
        //Dropdown is visible, close dropdown
        removeClass(mobileMenuButton, 'ddb-mobile-menu-open');
        closeMobileSubMenus();
        closeDropdowns();
      }else{
        //Dropdown is hidden, show dropdown
        closeDropdowns();
        addClass(mobileMenuButton, 'ddb-mobile-menu-open');
        addClass(mobileDropdown, 'ddb-show');
        //Add window listener
        setTimeout(function(){
          window.addEventListener('click', windowEventMobile);
        }, 1);

      }
    })
  }

  var bootstrapMobileSearch = function(){
    //Apply click event to mobile search button
    mobileSearchButton = document.getElementById('ddb-mobile-search');
    mobileSearchBar = document.getElementById('ddb-mobile-search-bar');
    mobileSearchButton.addEventListener('click', function(evt){
      if(hasClass(mobileSearchBar, 'ddb-show')){
        //Dropdown is hidden, close dropdown
        removeClass(mobileSearchButton, 'ddb-mobile-search-open');
        closeDropdowns();
      }else{
        //Dropdown is hidden, show dropdown
        closeDropdowns();
        addClass(mobileSearchButton, 'ddb-mobile-search-open');
        addClass(mobileSearchBar, 'ddb-show');
        //Add window listener
        setTimeout(function(){
          window.addEventListener('click', windowEventMobileSearch)
        }, 1)
      }
    })
  }

  var bootstrapSmallDesktopSearch = function(){
    //Apply click event to small desktop search button
    smallDesktopSearchButton = document.getElementById('ddb-small-desktop-search');
    smallDesktopSearchBar = document.getElementById('ddb-small-desktop-search-bar');

    smallDesktopSearchButton.addEventListener('click', function(evt){
      if(hasClass(smallDesktopSearchBar, 'ddb-show')){
        //Dropdown is shown, close dropdown
        removeClass(smallDesktopSearchButton, 'ddb-small-desktop-search-open');
        closeDropdowns();
      }else{
        //Dropdown is hidden, show dropdown
        closeDropdowns();
        addClass(smallDesktopSearchButton, 'ddb-small-desktop-search-open');
        addClass(smallDesktopSearchBar, 'ddb-show');
        //Add window listener
        setTimeout(function(){
          window.addEventListener('click', windowEventSmallDesktopSearch);
        }, 1)
      }
    })

    var navItems = document.getElementsByClassName('ddb-menu-nav-item');

    var hoverEvent = function(evt){
      if(hasClass(smallDesktopSearchButton, 'ddb-small-desktop-search-open')){
        removeClass(smallDesktopSearchButton, 'ddb-small-desktop-search-open');
        removeClass(smallDesktopSearchBar, 'ddb-show');
      }
    };

    [].forEach.call(navItems, function(item){
        item.addEventListener('mouseenter', hoverEvent);
    });

  }

  var bootstrapDesktopBoxscores = function(){
    desktopBoxscoresButton = document.getElementById('ddb-dropdown-boxscores-button');
    desktopBoxscoresDropdown = document.getElementById('ddb-boxscores-dropdown');

    desktopBoxscoresButton.addEventListener('click', function(evt){
      if(hasClass(desktopBoxscoresDropdown, 'ddb-show')){
        //Dropdown is shown, close dropdown
        removeClass(desktopBoxscoresButton, 'ddb-desktop-boxscores-open');
        closeDropdowns();
      }else{
        //Dropdown is hidden, show dropdown
        closeDropdowns();
        addClass(desktopBoxscoresButton, 'ddb-desktop-boxscores-open');
        addClass(desktopBoxscoresDropdown, 'ddb-show');
        //Add window listener
        setTimeout(function(){
          window.addEventListener('click', windowEventDesktopBoxscores);
        }, 1)
      }
    })

    var navItems = document.getElementsByClassName('ddb-menu-nav-item');

    var hoverEvent = function(evt){
      if(hasClass(desktopBoxscoresButton, 'ddb-desktop-boxscores-open')){
        removeClass(desktopBoxscoresButton, 'ddb-desktop-boxscores-open');
        removeClass(desktopBoxscoresDropdown, 'ddb-show');
      }
    };

    [].forEach.call(navItems, function(item){
        item.addEventListener('mouseenter', hoverEvent);
    });
  }
  //UPDATED
  var bootstrapTicker = function(state){
    var tickerContent = document.getElementById('ddb-ticker-content');

    var apiString = protocol + '://prod-homerunloyal-ai.synapsys.us/recent-games/' + state;
    var xhttp = createRequestObject();
    xhttp.onreadystatechange = function(){
      if(xhttp.readyState === 4 && xhttp.status === 200){
        //Success
        var res = JSON.parse(xhttp.responseText);
        //console.log('TICKER RESULTS API SUCCESS', res);

        var processedData = processTickerData(res);

        tickerContent.innerHTML = processedData;

      }else if(xhttp.readyState === 4 && xhttp.status !== 200){
        //Error
        // console.log('TICKER RESULTS API ERROR');

        tickerContent.innerHTML = buildDefaultTickerData();
      }
    };
    xhttp.open('GET', apiString, true);
    xhttp.send();

  }

  var bootstrapCollegeBasketballDropdown = function(state, userLocationFound){
    //Convert state to full form
    var fullState = stateAbbrevToFull(state);
    var fullStateEncode = encodeURIComponent(fullState);
    //Grab neeeded Dom Elements
    // var stateMapMarker = document.getElementById('ncaam-state-map-marker');
    // stateMapMarker.innerHTML = fullState;
    //If user location is not found from api clear out extra text ("in your area");
    // if(!userLocationFound){
    //   var ncaamTitle = document.getElementById('ncaam-title');
    //   ncaamTitle.innerHTML = 'NCAA Basketball Conferences';
    // }

    var ncaamLinks = `
      <h1 id="ncaam-title" class="ddb-menu-dropdown-links-title">
        NCAA Basketball Conferences ` + (userLocationFound ? 'in your area' : '') + `
      </h1>
      <h3 class="ddb-menu-dropdown-links-subtitle">
        showing NCAA Basketball conferences located in <i class="ddb-icon-map-marker"></i> <span id="ncaam-state-map-marker" class="ddb-heavy">` + fullState + `</span>
      </h3>
    `;

    // var ncaamLeagues = document.getElementById('ncaam-leagues');
    // var ncaamAllConferences = document.getElementById('ncaam-all-conferences');
    // ncaamAllConferences.href = hoopsDomain + '/ncaa';

    var apiString = protocol + '://prod-sports-api.synapsys.us/NBAHoops/call_controller.php?scope=ncaa&action=homepage&option=' + fullStateEncode;
    var xhttp = createRequestObject()
    xhttp.onreadystatechange = function(){
      if(xhttp.readyState === 4 && xhttp.status === 200){
        //Success
        var res = JSON.parse(xhttp.responseText);
        //console.log('NCAA M API SUCCESS', res);

        var processedData = processCollegeBasketballData(res.ncaa_homepage);

        processedData.forEach(function(item){
          ncaamLinks += item;
          // ncaamLeagues.appendChild(item);
        })
        ncaamLinks += `
          <a href="` + hoopsDomain + `/ncaa" class="ddb-menu-dropdown-all">
            SEE ALL CONFERENCES
          </a>
        `;
        //Save links innerHTML
        ncaamDropdownElements.links.innerHTML = ncaamLinks;

        //Link up nav items
        var navMostWins = document.getElementsByClassName('ddb-ncaam-nav-most-wins'),
          navMostTurnovers = document.getElementsByClassName('ddb-ncaam-nav-most-turnovers'),
          navMostRebounds = document.getElementsByClassName('ddb-ncaam-nav-most-rebounds'),
          navMostSteals = document.getElementsByClassName('ddb-ncaam-nav-most-steals'),
          navMostBlocks = document.getElementsByClassName('ddb-ncaam-nav-most-blocks'),
          navMostAssists = document.getElementsByClassName('ddb-ncaam-nav-most-assists'),
          navTeams = document.getElementsByClassName('ddb-ncaam-nav-teams');

        [].forEach.call(navMostWins, function(item){
          item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-wins/list/29/1';
        });
        [].forEach.call(navMostTurnovers, function(item){
          item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-turnovers/list/40/1';
        });
        [].forEach.call(navMostRebounds, function(item){
          item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-rebounds/list/39/1';
        });
        [].forEach.call(navMostSteals, function(item){
          item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-steals/list/43/1';
        });
        [].forEach.call(navMostBlocks, function(item){
          item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-blocks-per-game/list/55/1';
        });
        [].forEach.call(navMostAssists, function(item){
          item.href = hoopsDomain + '/NCAA/team/College-Basketball-teams-with-the-most-assists-per-game/list/51/1';
        });
        [].forEach.call(navTeams, function(item){
          item.href = hoopsDomain + '/NCAA';
        });

        var navHTML = `
          <li>
            <a href="` + hoopsDomain + `/NCAA/team/College-Basketball-teams-with-the-most-wins/list/29/1">
              <i class="ddb-icon ddb-icon-trophy"></i>
              Most Wins
            </a>
          </li>
          <li>
            <a href="` + hoopsDomain + `/NCAA/team/College-Basketball-teams-with-the-most-turnovers/list/40/1">
              <i class="ddb-icon ddb-icon-box-scores"></i>
              Most Turnovers
            </a>
          </li>
          <li>
            <a href="` + hoopsDomain + `/NCAA/team/College-Basketball-teams-with-the-most-rebounds/list/39/1">
              <i class="ddb-icon ddb-icon-dribbble"></i>
              Most Rebounds
            </a>
          </li>
          <li>
            <a href="` + hoopsDomain + `/NCAA/team/College-Basketball-teams-with-the-most-steals/list/43/1">
              <i class="ddb-icon ddb-icon-magic"></i>
              Most Steals
            </a>
          </li>
          <li>
            <a href="` + hoopsDomain + `/NCAA/team/College-Basketball-teams-with-the-most-blocks-per-game/list/55/1">
              <i class="ddb-icon ddb-icon-thumbs-o-down"></i>
              Most Blocks
            </a>
          </li>
          <li>
            <a href="` + hoopsDomain + `/NCAA/team/College-Basketball-teams-with-the-most-assists-per-game/list/51/1">
              <i class="ddb-icon ddb-icon-life-ring"></i>
              Most Assists
            </a>
          </li>
        `;

        ncaamDropdownElements.nav.innerHTML = navHTML;

        //If last dropdown that was hovered (or is currently hovered) is ncaam insert into dynamic dropdown
        //This is so if the user is currently hovering over ncaam (before the dropdown data is loaded the data will insert)
        var dynamicDropdown = document.getElementById('ddb-dynamic-dropdown');
        if(dynamicDropdown !== null && dynamicDropdown.id === 'ddb-dropdown-ncaam'){
          var dynamicNav = document.getElementById('ddb-dynamic-nav'); //Nav of dynamic dropdown
          var dynamicLinks = document.getElementById('ddb-dynamic-links'); //Links of dynamic dropdown
          clearInnerHTML(dynamicNav);
          clearInnerHTML(dynamicLinks);
          dynamicLinks.appendChild(ncaamDropdownElements.nav);
          dynamicLinks.appendChild(ncaamDropdownElements.links);
        }

      }else if(xhttp.readyState === 4 && xhttp.status !== 200){
        //Error
        // console.log('NCAA M API ERROR');
      }
    };
    xhttp.open('GET', apiString, true);
    xhttp.send();

  }

  var bootstrapCollegeFootballDropdown = function(state, userLocationFound){
    //Convert state to full form
    var fullState = stateAbbrevToFull(state);

    //Grab needed DOM Elements
    // var stateMapMarker = document.getElementById('ncaaf-state-map-marker');
    // stateMapMarker.innerHTML = fullState;
    //If user location is not found from api clear out extra text ("in your area");
    // if(!userLocationFound){
    //   var ncaafTitle = document.getElementById('ncaaf-title');
    //   ncaafTitle.innerHTML = 'NCAA Football Conferences';
    // }
    // var ncaafLeagues = document.getElementById('ncaaf-leagues');

    var ncaafLinks = `
      <h1 id="ncaaf-title" class="ddb-menu-dropdown-links-title">
        NCAA Football Conferences ` + (userLocationFound ? 'in your area': '') + `
      </h1>
      <h3 class="ddb-menu-dropdown-links-subtitle">
        showing NCAA Football conferences located in <i class="ddb-icon-map-marker"></i> <span id="ncaaf-state-map-marker" class="ddb-heavy">` + fullState + `</span>
      </h3>
    `;

    var apiString = protocol + '://prod-touchdownloyal-api.synapsys.us/landingPage/fbs/' + state;
    var xhttp = createRequestObject();
    xhttp.onreadystatechange = function(){
      if(xhttp.readyState === 4 && xhttp.status === 200){
        //Success
        var res = JSON.parse(xhttp.responseText);
        //console.log('NCAA F API SUCCESS', res);

        var processedData = processCollegeFootballData(res);

        processedData.forEach(function(item){
          ncaafLinks += item;
          // ncaafLeagues.appendChild(item);
        })
        ncaafLinks += `
          <a href="` + touchdownDomain + `/ncaaf/pick-a-team" class="ddb-menu-dropdown-all">
            SEE ALL CONFERENCES
          </a>
        `;
        //Save links innerHTML
        ncaafDropdownElements.links.innerHTML = ncaafLinks;

        var navNews = document.getElementsByClassName('ddb-ncaaf-nav-news'),
          navStandings = document.getElementsByClassName('ddb-ncaaf-nav-standings'),
          navSchedule = document.getElementsByClassName('ddb-ncaaf-nav-schedule'),
          navTopLists = document.getElementsByClassName('ddb-ncaaf-nav-top-lists'),
          navTeams = document.getElementsByClassName('ddb-ncaaf-nav-teams'),
          navProfile = document.getElementsByClassName('ddb-ncaaf-nav-profile');

        [].forEach.call(navNews, function(item){
          item.href = touchdownDomain + '/ncaaf';
        });
        [].forEach.call(navStandings, function(item){
          item.href = touchdownDomain + '/ncaaf/standings';
        });
        [].forEach.call(navSchedule, function(item){
          item.href = touchdownDomain + '/ncaaf/schedules/league/' + footballLeagueYear + '/1';
        });
        [].forEach.call(navTopLists, function(item){
          item.href = touchdownDomain + '/ncaaf/list-of-lists/league/' + footballLeagueYear + '/10/1';
        });
        [].forEach.call(navTeams, function(item){
          item.href = touchdownDomain + '/ncaaf/pick-a-team';
        });
        [].forEach.call(navProfile, function(item){
          item.href = touchdownDomain + '/ncaaf/league';
        });

        var navHTML = `
          <li>
            <a href="` + touchdownDomain + `/ncaaf">
              <i class="ddb-icon ddb-icon-news"></i>
              News
            </a>
          </li>
          <li>
            <a href="` + touchdownDomain + `/ncaaf/standings">
              <i class="ddb-icon ddb-icon-trophy"></i>
              Standings
            </a>
          </li>
          <li>
            <a href="` + touchdownDomain + `/ncaaf/schedules/league/` + footballLeagueYear + `/1">
              <i class="ddb-icon ddb-icon-calendar"></i>
              Schedule
            </a>
          </li>
          <li>
            <a href="` + touchdownDomain + `/ncaaf/list-of-lists/league/` + footballLeagueYear + `/10/1">
              <i class="ddb-icon ddb-icon-list"></i>
              Top Lists
            </a>
          </li>
          <li>
            <a href="` + touchdownDomain + `/ncaaf/league">
              <i class="ddb-icon ddb-icon-profile"></i>
              NCAA F Profile
            </a>
          </li>
        `;

        ncaafDropdownElements.nav.innerHTML = navHTML;

        var dynamicDropdown = document.getElementById('ddb-dynamic-dropdown');
        if(dynamicDropdown.id === 'ddb-dropdown-ncaaf'){
          var dynamicNav = document.getElementById('ddb-dynamic-nav'); //Nav of dynamic dropdown
          var dynamicLinks = document.getElementById('ddb-dynamic-links'); //Links of dynamic dropdown
          clearInnerHTML(dynamicNav);
          clearInnerHTML(dynamicLinks);
          dynamicLinks.appendChild(ncaafDropdownElements.nav);
          dynamicLinks.appendChild(ncaafDropdownElements.links);
        }

      }else if(xhttp.readyState === 4 && xhttp.status !== 200){
        //Error
        // console.log('NCAA F API ERROR');
      }
    };
    xhttp.open('GET', apiString, true);
    xhttp.send();
  }
  //UPDATED
  var bootstrapNBADropdown = function(){
    //Static data for eastern conference
    var atlanticDivision = [
      {
        shortName: '76ers',
        fullName: 'philadelphia-76ers',
        teamId: 308
      },
      {
        shortName: 'Celtics',
        fullName: 'boston-celtics',
        teamId: 324
      },
      {
        shortName: 'Knicks',
        fullName: 'new-york-knicks',
        teamId: 344
      },
      {
        shortName: 'Nets',
        fullName: 'brooklyn-nets',
        teamId: 321
      },
      {
        shortName: 'Raptors',
        fullName: 'toronto-raptors',
        teamId: 322
      }
    ];
    var centralDivision = [
      {
        shortName: 'Bucks',
        fullName: 'milwaukee-bucks',
        teamId: 334
      },
      {
        shortName: 'Bulls',
        fullName: 'chicago-bulls',
        teamId: 320
      },
      {
        shortName: 'Cavaliers',
        fullName: 'clevland-cavaliers',
        teamId: 319
      },
      {
        shortName: 'Pacers',
        fullName: 'indiana-pacers',
        teamId: 307
      },
      {
        shortName: 'Pistons',
        fullName: 'detroit-pistons',
        teamId: 325
      }
    ];
    var southeastDivision = [
      {
        shortName: 'Hawks',
        fullName: 'atlanta-hawks',
        teamId: 329
      },
      {
        shortName: 'Heat',
        fullName: 'miami-heat',
        teamId: 340
      },
      {
        shortName: 'Hornets',
        fullName: 'charlotte-hornets',
        teamId: 343
      },
      {
        shortName: 'Magic',
        fullName: 'orlando-magic',
        teamId: 338
      },
      {
        shortName: 'Wizards',
        fullName: 'washington-wizards',
        teamId: 342
      }
    ];
    //Static data for western Conferences
    var pacificDivision =[
      {
        shortName: 'Clippers',
        fullName: 'los-angeles-clippers',
        teamId: 326
      },
      {
        shortName: 'Kings',
        fullName: 'sacramento-kings',
        teamId: 324
      },
      {
        shortName: 'Lakers',
        fullName: 'los-angeles-lakers',
        teamId: 331
      },
      {
        shortName: 'Suns',
        fullName: 'phoenix-suns',
        teamId: 335
      },
      {
        shortName: 'Warriors',
        fullName: 'golden-state-warriors',
        teamId: 286
      }
    ];
    var southwestDivision = [
      {
        shortName: 'Grizzlies',
        fullName: 'memphis-grizzlies',
        teamId: 333
      },
      {
        shortName: 'Mavericks',
        fullName: 'dallas-mavericks',
        teamId: 332
      },
      {
        shortName: 'Pelicans',
        fullName: 'new-orleans-pelicans',
        teamId: 285
      },
      {
        shortName: 'Rockets',
        fullName: 'houston-rockets',
        teamId: 328
      },
      {
        shortName: 'Spurs',
        fullName: 'san-antonio-spurs',
        teamId: 336
      }
    ];
    var northwestDivision = [
      {
        shortName: 'Jazz',
        fullName: 'utah-jazz',
        teamId: 337
      },
      {
        shortName: 'Nuggets',
        fullName: 'denver-nuggets',
        teamId: 339
      },
      {
        shortName: 'Thunder',
        fullName: 'oklahoma-city-thunder',
        teamId: 341
      },
      {
        shortName: 'Timberwolves',
        fullName: 'minnesota-timberwolves',
        teamId: 330
      },
      {
        shortName: 'Trail Blazers',
        fullName: 'portland-trail-blazers',
        teamId: 327
      }
    ];

    var buildLink = function(data){
      return hoopsDomain + '/NBA/t/' + data.fullName + '/' + data.teamId;
    }

    // var nbaEastern = document.getElementById('nba-eastern');
    // var nbaWestern = document.getElementById('nba-western');

    var linksEl = document.createElement('section');

    var easternHTML = `
      <table class="ddb-menu-dropdown-table ddb-col-3">
        <thead>
          <tr>
            <td>
              ATLANTIC
            </td>
            <td>
              CENTRAL
            </td>
            <td>
              SOUTHEAST
            </td>
          </tr>
        </thead>
        <tbody>
    `;
    var westernHTML = `
      <table class="ddb-menu-dropdown-table ddb-col-3">
        <thead>
          <tr>
            <td>
              PACIFIC
            </td>
            <td>
              SOUTHWEST
            </td>
            <td>
              NORTHWEST
            </td>
          </tr>
        </thead>
        <tbody>
    `;

    for(var index = 0; index < 5; index++){
      easternHTML += `
        <tr>
          <td>
            <a href="` + buildLink(atlanticDivision[index]) + `">` + atlanticDivision[index].shortName + `</a>
          </td>
          <td>
            <a href="` + buildLink(centralDivision[index]) + `">` + centralDivision[index].shortName + `</a>
          </td>
          <td>
            <a href="` + buildLink(southeastDivision[index]) + `">` + southeastDivision[index].shortName + `</a>
          </td>
        </tr>
      `;

      westernHTML += `
        <tr>
          <td>
            <a href="` + buildLink(pacificDivision[index]) + `">` + pacificDivision[index].shortName + `</a>
          </td>
          <td>
            <a href="` + buildLink(southwestDivision[index]) + `">` + southwestDivision[index].shortName + `</a>
          </td>
          <td>
            <a href="` + buildLink(northwestDivision[index]) + `">` + northwestDivision[index].shortName + `</a>
          </td>
        </tr>
      `;
    }
    //Close tables
    easternHTML += `
        </tbody>
      </table>
    `;
    westernHTML += `
        </tbody>
      </table>
    `;
    linksEl.innerHTML += easternHTML;
    linksEl.innerHTML += westernHTML;

    // nbaEastern.innerHTML = easternHTML;
    // nbaWestern.innerHTML = westernHTML;
    //Link up nav items
    var navMostWins = document.getElementsByClassName('ddb-nba-nav-most-wins'),
      navMostTurnovers = document.getElementsByClassName('ddb-nba-nav-most-turnovers'),
      navMostRebounds = document.getElementsByClassName('ddb-nba-nav-most-rebounds'),
      navMostSteals = document.getElementsByClassName('ddb-nba-nav-most-steals'),
      navMostBlocks = document.getElementsByClassName('ddb-nba-nav-most-blocks'),
      navMostAssists = document.getElementsByClassName('ddb-nba-nav-most-assists'),
      navTeams = document.getElementsByClassName('ddb-nba-nav-teams');

    [].forEach.call(navMostWins, function(item){
      item.href = hoopsDomain + '/NBA/team/NBA-teams-with-the-most-wins/list/1/1';
    });
    [].forEach.call(navMostTurnovers, function(item){
      item.href = hoopsDomain + '/NBA/team/NBA-teams-with-the-most-turnovers/list/12/1';
    });
    [].forEach.call(navMostRebounds, function(item){
      item.href = hoopsDomain + '/NBA/team/NBA-teams-with-the-most-rebounds/list/11/1';
    });
    [].forEach.call(navMostSteals, function(item){
      item.href = hoopsDomain + '/NBA/team/NBA-teams-with-the-most-steals/list/15/1';
    });
    [].forEach.call(navMostBlocks, function(item){
      item.href = hoopsDomain + '/NBA/team/NBA-teams-with-the-most-blocks/list/14/1';
    });
    [].forEach.call(navMostAssists, function(item){
      item.href = hoopsDomain + '/NBA/team/NBA-teams-with-the-most-assists-per-game/list/23/1';
    });
    [].forEach.call(navTeams, function(item){
      item.href = hoopsDomain + '/NBA';
    });

    var navEl = document.createElement('ul');
    navEl.innerHTML = `
      <li>
        <a href="` + hoopsDomain + `/NBA/team/NBA-teams-with-the-most-wins/list/1/1">
          <i class="ddb-icon ddb-icon-trophy"></i>
          Most Wins
        </a>
      </li>
      <li>
        <a href="` + hoopsDomain + `/NBA/team/NBA-teams-with-the-most-turnovers/list/12/1">
          <i class="ddb-icon ddb-icon-box-scores"></i>
          Most Turnovers
        </a>
      </li>
      <li>
        <a href="` + hoopsDomain + `/NBA/team/NBA-teams-with-the-most-rebounds/list/11/1">
          <i class="ddb-icon ddb-icon-dribbble"></i>
          Most Rebounds
        </a>
      </li>
      <li>
        <a href="` + hoopsDomain + `/NBA/team/NBA-teams-with-the-most-steals/list/15/1'">
          <i class="ddb-icon ddb-icon-magic"></i>
          Most Steals
        </a>
      </li>
      <li>
        <a href="` + hoopsDomain + `/NBA/team/NBA-teams-with-the-most-blocks/list/14/1">
          <i class="ddb-icon ddb-icon-thumbs-o-down"></i>
          Most Blocks
        </a>
      </li>
      <li>
        <a href="` + hoopsDomain + `/NBA/team/NBA-teams-with-the-most-assists-per-game/list/23/1">
          <i class="ddb-icon ddb-icon-life-ring"></i>
          Most Assists
        </a>
      </li>
    `;


    return {
      nav: navEl,
      links: linksEl
    }
  }
  //UPDATED
  var bootstrapMLBDropdown = function(){
    //Static data for american league
    var alCentralDivision = [
      {
        shortName: 'Indians',
        fullName: 'cleveland-indians',
        teamId: 2809
      },
      {
        shortName: 'Royals',
        fullName: 'kansas-city-royals',
        teamId: 2806
      },
      {
        shortName: 'Tigers',
        fullName: 'detroit-tigers',
        teamId: 2797
      },
      {
        shortName: 'Twins',
        fullName: 'minnesota-twins',
        teamId: 2810
      },
      {
        shortName: 'White Sox',
        fullName: 'chicago-white-sox',
        teamId: 2790
      }
    ];
    var alEastDivison = [
      {
        shortName: 'Blue Jays',
        fullName: 'toronto-blue-jays',
        teamId: 2802
      },
      {
        shortName: 'Orioles',
        fullName: 'kansas-city-royals',
        teamId: 2806
      },
      {
        shortName: 'Rays',
        fullName: 'tampa-bay-rays',
        teamId: 2798
      },
      {
        shortName: 'Red Sox',
        fullName: 'boston-red-sox',
        teamId: 2791
      },
      {
        shortName: 'Yankees',
        fullName: 'new-york-yankees',
        teamId: 2803
      }
    ];
    var alWestDivision = [
      {
        shortName: 'Angels',
        fullName: 'los-angeles-angles',
        teamId: 2792
      },
      {
        shortName: 'Astros',
        fullName: 'houston-astros',
        teamId: 2792
      },
      {
        shortName: 'Athletics',
        fullName: 'oakland-athletics',
        teamId: 2808
      },
      {
        shortName: 'Mariners',
        fullName: 'seatlle-mariners',
        teamId: 2804
      },
      {
        shortName: 'Rangers',
        fullName: 'texas-rangers',
        teamId: 2807
      }
    ];
    //Static data for national league
    var nlCentralDivision = [
      {
        shortName: 'Braves',
        fullName: 'atlanta-braves',
        teamId: 2796
      },
      {
        shortName: 'Marlins',
        fullName: 'miami-marlins',
        teamId: 2814
      },
      {
        shortName: 'Mets',
        fullName: 'new-york-mets',
        teamId: 2812
      },
      {
        shortName: 'Nationals',
        fullName: 'washington-nationals',
        teamId: 2813
      },
      {
        shortName: 'Phillies',
        fullName: 'philadelphia-phillies',
        teamId: 2815
      }
    ];
    var nlEastDivision = [
      {
        shortName: 'Brewers',
        fullName: 'milwaukee-brewers',
        teamId: 2801
      },
      {
        shortName: 'Cardinals',
        fullName: 'st-louis-cardinals',
        teamId: 2805
      },
      {
        shortName: 'Cubs',
        fullName: 'chicago-cubs',
        teamId: 2795
      },
      {
        shortName: 'Pirates',
        fullName: 'pittsburgh-pirates',
        teamId: 2817
      },
      {
        shortName: 'Reds',
        fullName: 'cincinnati-reds',
        teamId: 2816
      }
    ];
    var nlWestDivision = [
      {
        shortName: 'Diamondbacks',
        fullName: 'arizona-diamondbacks',
        teamId: 2793
      },
      {
        shortName: 'Dodgers',
        fullName: 'los-angeles-dodgers',
        teamId: 2818
      },
      {
        shortName: 'Giants',
        fullName: 'san-francisco-giants',
        teamId: 2819
      },
      {
        shortName: 'Padres',
        fullName: 'san-diego-padres',
        teamId: 2794
      },
      {
        shortName: 'Rockies',
        fullName: 'colorado-rockies',
        teamId: 2800
      }
    ];

    var buildLink = function(data){
      return homerunDomain + '/t/' + data.fullName + '/' + data.teamId;
    }

    // var mlbAmerican = document.getElementById('mlb-american');
    // var mlbNational = document.getElementById('mlb-national');
    var linksEl = document.createElement('section');

    var americanHTML = `
      <table class="ddb-menu-dropdown-table ddb-col-3">
        <thead>
          <tr>
            <td>
              AL Central
            </td>
            <td>
              AL East
            </td>
            <td>
              AL West
            </td>
          </tr>
        </thead>
        <tbody>
    `;
    var nationalHTML = `
      <table class="ddb-menu-dropdown-table ddb-col-3">
        <thead>
          <tr>
            <td>
              NL Central
            </td>
            <td>
              NL East
            </td>
            <td>
              NL West
            </td>
          </tr>
        </thead>
        <tbody>
    `;
    for(var index = 0; index < 5; index++){
      americanHTML += `
        <tr>
          <td>
            <a href="` + buildLink(alCentralDivision[index]) + `">` + alCentralDivision[index].shortName + `</a>
          </td>
          <td>
            <a href="` + buildLink(alEastDivison[index]) + `">` + alEastDivison[index].shortName + `</a>
          </td>
          <td>
            <a href="` + buildLink(alWestDivision[index]) + `">` + alWestDivision[index].shortName + `</a>
          </td>
        </tr>
      `;

      nationalHTML += `
        <tr>
          <td>
            <a href="` + buildLink(nlCentralDivision[index]) + `">` + nlCentralDivision[index].shortName + `</a>
          </td>
          <td>
            <a href="` + buildLink(nlEastDivision[index]) + `">` + nlEastDivision[index].shortName + `</a>
          </td>
          <td>
            <a href="` + buildLink(nlWestDivision[index]) + `">` + nlWestDivision[index].shortName + `</a>
          </td>
        </tr>
      `;
    }
    //Close tables
    americanHTML += `
        </tbody>
      </table>
    `;
    nationalHTML += `
        </tbody>
      </table>
    `;
    linksEl.innerHTML += americanHTML;
    linksEl.innerHTML += nationalHTML;

    // mlbAmerican.innerHTML = americanHTML;
    // mlbNational.innerHTML = nationalHTML;
    //Link up nav items
    var navNews = document.getElementsByClassName('ddb-mlb-nav-news'),
      navStandings = document.getElementsByClassName('ddb-mlb-nav-standings'),
      navSchedule = document.getElementsByClassName('ddb-mlb-nav-schedule'),
      navTopLists = document.getElementsByClassName('ddb-mlb-nav-top-lists'),
      navTeams = document.getElementsByClassName('ddb-mlb-nav-teams'),
      navProfile = document.getElementsByClassName('ddb-mlb-nav-profile');

      [].forEach.call(navNews, function(item){
        item.href = homerunDomain;
      });
      [].forEach.call(navStandings, function(item){
        item.href = homerunDomain + '/standings';
      });
      [].forEach.call(navSchedule, function(item){
        item.href = homerunDomain + '/schedules/mlb/1';
      });
      [].forEach.call(navTopLists, function(item){
        item.href = homerunDomain + '/list-of-lists/league/10/1';
      });
      [].forEach.call(navTeams, function(item){
        item.href = homerunDomain + '/pick-a-team';
      });
      [].forEach.call(navProfile, function(item){
        item.href = homerunDomain + '/mlb';
      });

      var navEl = document.createElement('ul');
      navEl.innerHTML = `
        <li>
          <a href="` + homerunDomain + `">
            <i class="ddb-icon ddb-icon-news"></i>
            News
          </a>
        </li>
        <li>
          <a href="` + homerunDomain + `/standings">
            <i class="ddb-icon ddb-icon-trophy"></i>
            Standings
          </a>
        </li>
        <li>
          <a href="` + homerunDomain + `/schedules/mlb/1">
            <i class="ddb-icon ddb-icon-calendar"></i>
            Schedule
          </a>
        </li>
        <li>
          <a href="` + homerunDomain + `/list-of-lists/league/10/1">
            <i class="ddb-icon ddb-icon-list"></i>
            Top Lists
          </a>
        </li>
        <li>
          <a href="` + homerunDomain + `/mlb">
            <i class="ddb-icon ddb-icon-profile"></i>
            MLB Profile
          </a>
        </li>
      `;

      return {
        nav: navEl,
        links: linksEl
      }

  };
  //UPDATED
  var bootstrapNFLDropdown = function(){
    var afcNorth = [
      {
        shortName: 'Ravens',
        fullName: 'balitmore-ravens',
        teamId: 141
      },
      {
        shortName: 'Bengals',
        fullName: 'cincinnati-bengals',
        teamId: 139
      },
      {
        shortName: 'Browns',
        fullName: 'cleveland-browns',
        teamId: 140
      },
      {
        shortName: 'Steelers',
        fullName: 'pittsburgh-steelers',
        teamId: 142
      }
    ];
    var afcEast = [
      {
        shortName: 'Bills',
        fullName: 'buffalo-bills',
        teamId: 135
      },
      {
        shortName: 'Dolphins',
        fullName: 'miami-dolphins',
        teamId: 136
      },
      {
        shortName: 'Patriots',
        fullName: 'new-england-patriots',
        teamId: 138
      },
      {
        shortName: 'Jets',
        fullName: 'new-york-jets',
        teamId: 137
      }
    ];
    var afcSouth = [
      {
        shortName: 'Texans',
        fullName: 'houston-texans',
        teamId: 145
      },
      {
        shortName: 'Colts',
        fullName: 'indianapolis-colts',
        teamId: 143
      },
      {
        shortName: 'Jaguars',
        fullName: 'jacksonville-jaguars',
        teamId: 144
      },
      {
        shortName: 'Titans',
        fullName: 'tennessee-titans',
        teamId: 146
      }
    ];
    var afcWest = [
      {
        shortName: 'Broncos',
        fullName: 'denver-broncos',
        teamId: 147
      },
      {
        shortName: 'Chiefs',
        fullName: 'kansas-city-chief',
        teamId: 149
      },
      {
        shortName: 'Raiders',
        fullName: 'oakland-raiders',
        teamId: 150
      },
      {
        shortName: 'Chargers',
        fullName: 'san-diego-chargers',
        teamId: 150
      }
    ];
    var nfcNorth = [
      {
        shortName: 'Bears',
        fullName: 'chicago-bears',
        teamId: 155
      },
      {
        shortName: 'Lions',
        fullName: 'detroit-lions',
        teamId: 156
      },
      {
        shortName: 'Packers',
        fullName: 'green-bay-packers',
        teamId: 157
      },
      {
        shortName: 'Vikings',
        fullName: 'minnesota-vikings',
        teamId: 158
      }
    ];
    var nfcEast = [
      {
        shortName: 'Cowboys',
        fullName: 'dallas-cowboys',
        teamId: 151
      },
      {
        shortName: 'Giants',
        fullName: 'new-york-giants',
        teamId: 153
      },
      {
        shortName: 'Eagles',
        fullName: 'philadelphia-eagles',
        teamId: 152
      },
      {
        shortName: 'Redskins',
        fullName: 'washington-redskins',
        teamId: 154
      }
    ];
    var nfcSouth = [
      {
        shortName: 'Falcons',
        fullName: 'atlanta-falcons',
        teamId: 160
      },
      {
        shortName: 'Panthers',
        fullName: 'carolina-panthers',
        teamId: 161
      },
      {
        shortName: 'Saints',
        fullName: 'new-orleans-saints',
        teamId: 162
      },
      {
        shortName: 'Buccaneers',
        fullName: 'tampa-bay-buccaneers',
        teamId: 159
      }
    ];
    var nfcWest = [
      {
        shortName: 'Cardinals',
        fullName: 'arizona-cardinals',
        teamId: 164
      },
      {
        shortName: 'Rams',
        fullName: 'st-louis-rams',
        teamId: 165
      },
      {
        shortName: '49ers',
        fullName: 'san-francisco-49ers',
        teamId: 163
      },
      {
        shortName: 'Seahawks',
        fullName: 'seattle-seahawks',
        teamId: 166
      }
    ];

    var buildLink = function(data){
      return touchdownDomain + '/nfl/t/' + data.fullName + '/' + data.teamId;
    }

    var linksEl = document.createElement('section');

    var afcHTML = `
      <table class="ddb-menu-dropdown-table ddb-col-4">
        <thead>
          <tr>
            <td>
              AFC North
            </td>
            <td>
              AFC East
            </td>
            <td>
              AFC South
            </td>
            <td>
              AFC West
            </td>
          </tr>
        </thead>
        <tbody>
    `;
    var nfcHTML = `
    <table class="ddb-menu-dropdown-table ddb-col-4">
      <thead>
        <tr>
          <td>
            NFC North
          </td>
          <td>
            NFC East
          </td>
          <td>
            NFC South
          </td>
          <td>
            NFC West
          </td>
        </tr>
      </thead>
      <tbody>
    `;
    for(var index = 0; index < 4; index++){
      afcHTML += `
        <tr>
          <td>
            <a href="` + buildLink(afcNorth[index]) + `">` + afcNorth[index].shortName + `</a>
          </td>
          <td>
            <a href="` + buildLink(afcEast[index]) + `">` + afcEast[index].shortName + `</a>
          </td>
          <td>
            <a href="` + buildLink(afcSouth[index]) + `">` + afcSouth[index].shortName + `</a>
          </td>
          <td>
            <a href="` + buildLink(afcWest[index]) + `">` + afcWest[index].shortName + `</a>
          </td>
        </tr>
      `;
      nfcHTML += `
        <tr>
          <td>
            <a href="` + buildLink(nfcNorth[index]) + `">` + nfcNorth[index].shortName + `</a>
          </td>
          <td>
            <a href="` + buildLink(nfcEast[index]) + `">` + nfcEast[index].shortName + `</a>
          </td>
          <td>
            <a href="` + buildLink(nfcSouth[index]) + `">` + nfcSouth[index].shortName + `</a>
          </td>
          <td>
            <a href="` + buildLink(nfcWest[index]) + `">` + nfcWest[index].shortName + `</a>
          </td>
        </tr>
      `;
    }
    //Close tables
    afcHTML += `
        </tbody>
      </table>
    `;
    nfcHTML += `
        </tbody>
      </table>
    `;
    linksEl.innerHTML += afcHTML;
    linksEl.innerHTML += nfcHTML;

    var navNews = document.getElementsByClassName('ddb-nfl-nav-news'),
      navStandings = document.getElementsByClassName('ddb-nfl-nav-standings'),
      navSchedule = document.getElementsByClassName('ddb-nfl-nav-schedule'),
      navTopLists = document.getElementsByClassName('ddb-nfl-nav-top-lists'),
      navTeams = document.getElementsByClassName('ddb-nfl-nav-teams'),
      navProfile = document.getElementsByClassName('ddb-nfl-nav-profile');

      [].forEach.call(navNews, function(item){
        item.href = touchdownDomain + '/nfl';
      });
      [].forEach.call(navStandings, function(item){
        item.href = touchdownDomain + '/nfl/standings';
      });
      [].forEach.call(navSchedule, function(item){
        item.href = touchdownDomain + '/nfl/schedules/league/' + footballLeagueYear + '/1';
      });
      [].forEach.call(navTopLists, function(item){
        item.href = touchdownDomain + '/nfl/list-of-lists/league/10/1';
      });
      [].forEach.call(navTeams, function(item){
        item.href = touchdownDomain + '/nfl/pick-a-team';
      });
      [].forEach.call(navProfile, function(item){
        item.href = touchdownDomain + '/nfl/league';
      });

    var navEl = document.createElement('ul');
    navEl.innerHTML = `
      <li>
        <a href="` + touchdownDomain + `/nfl">
          <i class="ddb-icon ddb-icon-news"></i>
          News
        </a>
      </li>
      <li>
        <a href="` + touchdownDomain + `/nfl/standings">
          <i class="ddb-icon ddb-icon-trophy"></i>
          Standings
        </a>
      </li>
      <li>
        <a href="` + touchdownDomain + `/nfl/schedules/league/` + footballLeagueYear + `/1">
          <i class="ddb-icon ddb-icon-calendar"></i>
          Schedule
        </a>
      </li>
      <li>
        <a href="` + touchdownDomain + `/nfl/list-of-lists/league/10/1">
          <i class="ddb-icon ddb-icon-list"></i>
          Top Lists
        </a>
      </li>
      <li>
        <a href="` + touchdownDomain + `/nfl/league">
          <i class="ddb-icon ddb-icon-profile"></i>
          NFL Profile
        </a>
      </li>
    `;

    return {
      nav: navEl,
      links: linksEl
    }
  }

  var bootstrapBoxscores = function(){
    //Get timezone abbreviations and offset
    var tz = getEasternTime();
    var todayObject = getToday(tz.offset);
    var todayInput = todayObject.year + '-' + todayObject.month + '-' + todayObject.date;

    var apiString = protocol + '://prod-homerunloyal-api.synapsys.us/league/boxScores/' + todayInput;
    var apiString2 = protocol + '://prod-touchdownloyal-api.synapsys.us/boxScores/league/nfl/' + todayInput;
    var apiString3 = protocol + '://prod-touchdownloyal-api.synapsys.us/boxScores/league/fbs/' + todayInput;

    var mobileBoxscores = document.getElementById('ddb-mobile-boxscores');
    var desktopBoxscores = document.getElementById('ddb-desktop-boxscores');

    var mobileBoxscoresMLB = document.getElementById('ddb-mobile-boxscores-mlb');
    var desktopBoxscoresMLB = document.getElementById('ddb-desktop-boxscores-mlb');

    var mobileBoxscoresNFL = document.getElementById('ddb-mobile-boxscores-nfl');
    var desktopBoxscoresNFL = document.getElementById('ddb-desktop-boxscores-nfl');

    var mobileBoxscoresNCAAF = document.getElementById('ddb-mobile-boxscores-ncaaf');
    var desktopBoxscoresNCAAF = document.getElementById('ddb-desktop-boxscores-ncaaf');

    var leftMobileButton = document.getElementById('ddb-mobile-boxscores-left');
    var rightMobileButton = document.getElementById('ddb-mobile-boxscores-right');

    var leftDesktopButton = document.getElementById('ddb-desktop-boxscores-left');
    var rightDesktopButton = document.getElementById('ddb-desktop-boxscores-right');

    var totalMax = 0,
      mlbLoaded = false,
      mlbMax = 0,
      nflLoaded = false,
      nflMax = 0,
      ncaafLoaded = false,
      ncaafMax = 0;
    var desktopBoxscoresSelected = 'all';
    var desktopMax = 0;

    var eventsOpen = false;
    var eventsContainer = document.getElementById('ddb-boxscores-events-container');
    var eventsButton = document.getElementById('ddb-boxscores-events-button');
    eventsButton.addEventListener('click', function(){
      if(eventsOpen){
        //If open close
        removeClass(eventsContainer, 'ddb-active');
      }else{
        //If closed open
        addClass(eventsContainer, 'ddb-active');
      }
      eventsOpen = !eventsOpen;
    })
    var eventsOptions = document.getElementById('ddb-boxscores-options');
    [].forEach.call(eventsOptions.childNodes, function(item){
      item.addEventListener('click', function(){
        var id = this.id;
        //Determine if data is loaded to allow/disallow click
        switch(id){
          case 'ddb-boxscores-options-mlb':
            if(mlbLoaded){
              desktopBoxscoresIndex = 0;
              desktopBoxscores.style.left = 0;
              desktopBoxscoresMLB.style.display = 'inline-block';
              desktopBoxscoresNFL.style.display = 'none';
              desktopBoxscoresNCAAF.style.display = 'none';
              desktopBoxscoresSelected = 'mlb';
            }else{
              return false;
            }
          break;
          case 'ddb-boxscores-options-nfl':
            if(nflLoaded){
              desktopBoxscoresIndex = 0;
              desktopBoxscores.style.left = 0;
              desktopBoxscoresMLB.style.display = 'none';
              desktopBoxscoresNFL.style.display = 'inline-block';
              desktopBoxscoresNCAAF.style.display = 'none';
              desktopBoxscoresSelected = 'nfl';
            }else{
              return false;
            }
          break;
          case 'ddb-boxscores-options-ncaaf':
            if(ncaafLoaded){
              desktopBoxscoresIndex = 0;
              desktopBoxscores.style.left = 0;
              desktopBoxscoresMLB.style.display = 'none';
              desktopBoxscoresNFL.style.display = 'none';
              desktopBoxscoresNCAAF.style.display = 'inline-block';
              desktopBoxscoresSelected = 'ncaaf';
            }else{
              return false;
            }
          break;
          case 'ddb-boxscores-options-all':
            desktopBoxscoresIndex = 0;
            desktopBoxscores.style.left = 0;
            desktopBoxscoresMLB.style.display = 'inline-block';
            desktopBoxscoresNFL.style.display = 'inline-block';
            desktopBoxscoresNCAAF.style.display = 'inline-block';
            desktopBoxscoresSelected = 'all';
          break;
          default:
            return false;
          break;
        }
        //Remove active class from button
        var siblingNodes = eventsOptions.childNodes;
        [].forEach.call(siblingNodes, function(item){
          if(item.nodeType === 1){
            removeClass(item, 'ddb-active');
          }
        })
        //Assign active class to button clicked
        addClass(this, 'ddb-active');

        if(hasClass(leftDesktopButton, 'ddb-blue')){
          removeClass(leftDesktopButton, 'ddb-blue');
        }
        if(!hasClass(rightDesktopButton, 'ddb-blue')){
          addClass(rightDesktopButton, 'ddb-blue');
        }

      })
    })

    var mobileBoxscoresIndex = 0;
    var desktopBoxscoresIndex = 0;

    var bootstrapMobileBoxscoresButtons = function(data){
      // var mobileBoxscoresIndex = 0;
      // var maxLength = index + (data.length);

      var moveMobileLeft = function(){
        if(mobileBoxscoresIndex > 0){

          mobileBoxscoresIndex--;

          if(mobileBoxscoresIndex === 0){
            removeClass(leftMobileButton, 'ddb-blue');
            mobileBoxscores.style.left = '0';
          }else if(mobileBoxscoresIndex === totalMax - 1){
            addClass(rightMobileButton, 'ddb-blue');
          }else{
            if(!hasClass(leftMobileButton, 'ddb-blue')){
              addClass(leftMobileButton, 'ddb-blue');
            }
            mobileBoxscores.style.left = (-100 + ((mobileBoxscoresIndex - 1) * -100)) + 'px';
          }

        }
      }
      var moveMobileRight = function(){
        if(mobileBoxscoresIndex < totalMax){
          mobileBoxscoresIndex++;

          if(mobileBoxscoresIndex === totalMax){
            removeClass(rightMobileButton, 'ddb-blue');
          }else if(mobileBoxscoresIndex === 1){
            addClass(leftMobileButton, 'ddb-blue');
          }else if(!hasClass(rightMobileButton, 'ddb-blue')){
            addClass(rightMobileButton, 'ddb-blue');
          }

          mobileBoxscores.style.left = (-100 + ((mobileBoxscoresIndex - 1) * -100)) + 'px';
        }
      }
      var moveDesktopLeft = function(){
        switch(desktopBoxscoresSelected){
          case 'mlb':
            desktopMax = mlbMax;
          break;
          case 'nfl':
            desktopMax = nflMax;
          break;
          case 'ncaaf':
            desktopMax = ncaafMax;
          break;
          case 'all':
            desktopMax = totalMax;
          break;
        }

        if(desktopBoxscoresIndex > 0){

          desktopBoxscoresIndex--;

          if(desktopBoxscoresIndex === 0 && hasClass(leftDesktopButton, 'ddb-blue')){
            removeClass(leftDesktopButton, 'ddb-blue');
          }else if(desktopBoxscoresIndex === desktopMax - 1 && !hasClass(rightDesktopButton, 'ddb-blue')){
            addClass(rightDesktopButton, 'ddb-blue');
          }

          desktopBoxscores.style.left = (-100 + ((desktopBoxscoresIndex - 1) * -100)) + 'px';
        }
      }
      var moveDesktopRight = function(){
        switch(desktopBoxscoresSelected){
          case 'mlb':
            desktopMax = mlbMax;
          break;
          case 'nfl':
            desktopMax = nflMax;
          break;
          case 'ncaaf':
            desktopMax = ncaafMax;
          break;
          case 'all':
            desktopMax = totalMax;
          break;
        }

        if(desktopBoxscoresIndex < desktopMax){
          desktopBoxscoresIndex++;

          if(desktopBoxscoresIndex === desktopMax && hasClass(rightDesktopButton, 'ddb-blue')){
            removeClass(rightDesktopButton, 'ddb-blue');
          }
          if(desktopBoxscoresIndex === 1 && !hasClass(leftDesktopButton, 'ddb-blue')){
            addClass(leftDesktopButton, 'ddb-blue');
          }

          desktopBoxscores.style.left = (-100 + ((desktopBoxscoresIndex - 1) * -100)) + 'px';
        }
      }

      //Mobile
      leftMobileButton.addEventListener('click', moveMobileLeft);
      rightMobileButton.addEventListener('click', moveMobileRight);
      //Desktop
      leftDesktopButton.addEventListener('click', moveDesktopLeft);
      rightDesktopButton.addEventListener('click', moveDesktopRight);
    }

    var xhttp = createRequestObject();
    xhttp.onreadystatechange = function(){
      if(xhttp.readyState === 4 && xhttp.status === 200){
        //Success
        var res = JSON.parse(xhttp.responseText);
        //console.log('GET BOXSCORES SUCCESS', res);
        var processedData;
        processedData = processBoxscoresData(res.data, tz.offset, tz.tzAbbrev, todayObject.date);
        //If no games found for today, search for games throughout the week
        if(processedData.length === 0){
          processedData = processBoxscoresData(res.data, tz.offset, tz.tzAbbrev, null);
        }
        //Reverse array so it is inserted correctly
        // processedData.reverse();
        //Add HTML to page
        processedData.forEach(function(item){
          // mobileBoxscoresMLB.parentNode.insertBefore(item.mobileNode, mobileBoxscoresMLB.nextSibling);
          // desktopBoxscoresMLB.parentNode.insertBefore(item.desktopNode, desktopBoxscoresMLB.nextSibling);
          mobileBoxscoresMLB.appendChild(item.mobileNode);
          desktopBoxscoresMLB.appendChild(item.desktopNode);
        })

        totalMax += processedData.length;
        totalMax += processedData.length;

        mlbMax = processedData.length;

        bootstrapMobileBoxscoresButtons(processedData);

        mlbLoaded = true;

      }else if(xhttp.readyState === 4 && xhttp.status !== 200){
        //Error
        // console.log('GET MLB BOXSCORES ERROR');

      }
    };
    xhttp.open('GET', apiString, true);
    xhttp.send();

    var xhttp2 = createRequestObject();
    xhttp2.onreadystatechange = function(){
      if(xhttp2.readyState === 4 && xhttp2.status === 200){
        //Success
        var res = JSON.parse(xhttp2.responseText);
        // console.log('xhttp2', res);

        var processedData = processNFLBoxscoresData(res.data, tz.offset, tz.tzAbbrev, todayObject.date, 'nfl');

        //Reverse array so it is inserted correctly
        // processedData.reverse();
        //Add HTML to page
        processedData.forEach(function(item){
          // mobileBoxscoresNFL.parentNode.insertBefore(item.mobileNode, mobileBoxscoresNFL.nextSibling);
          // desktopBoxscoresNFL.parentNode.insertBefore(item.desktopNode, desktopBoxscoresNFL.nextSibling);
          mobileBoxscoresNFL.appendChild(item.mobileNode);
          desktopBoxscoresNFL.appendChild(item.desktopNode);
        })

        totalMax += processedData.length;
        totalMax += processedData.length;

        nflMax = processedData.length;

        nflLoaded = true;

      }else if(xhttp2.readyState === 4 & xhttp2.status !== 200){
        //Error
        // console.log('GET NFL BOXSCORES ERROR');
      }
    };
    xhttp2.open('GET', apiString2, true);
    xhttp2.send();

    var xhttp3 = createRequestObject();
    xhttp3.onreadystatechange = function(){
      if(xhttp3.readyState === 4 && xhttp3.status === 200){
        //Success
        var res = JSON.parse(xhttp3.responseText);
        // console.log('xhttp3', res);

        var processedData = processNFLBoxscoresData(res.data, tz.offset, tz.tzAbbrev, todayObject.date, 'ncaaf');

        //Reverse array so it is inserted correctly
        // processedData.reverse();
        //Add HTML to page
        processedData.forEach(function(item){
          // mobileBoxscoresNCAAF.parentNode.insertBefore(item.mobileNode, mobileBoxscoresNCAAF.nextSibling);
          // desktopBoxscoresNCAAF.parentNode.insertBefore(item.desktopNode, desktopBoxscoresNCAAF.nextSibling);
          mobileBoxscoresNCAAF.appendChild(item.mobileNode);
          desktopBoxscoresNCAAF.appendChild(item.desktopNode);
        })

        totalMax += processedData.length;
        totalMax += processedData.length;

        ncaafMax = processedData.length;

        ncaafLoaded = true;

      }else if(xhttp3.readyState === 4 && xhttp3.status !== 200){
        //Error
        console.log('GET NCAAF BOXSCORES ERROR');
      }
    };
    xhttp3.open('GET', apiString3, true);
    xhttp3.send();
  }

  var bootstrapSearch = function(){
    //Mobile (320-640)
    var searchMobile = document.getElementById('ddb-search-mobile');
    var searchMobileDropdown = document.getElementById('ddb-search-mobile-dropdown');
    //Small Desktop (640-992)
    var searchSmallDesktop = document.getElementById('ddb-small-desktop-search-input');
    var searchSmallDesktopDropdown = document.getElementById('ddb-small-desktop-search-dropdown');
    //Desktop (992-1280)
    var searchDesktop = document.getElementById('ddb-search-desktop');
    var searchDesktopDropdown = document.getElementById('ddb-search-desktop-dropdown');

    var indexSelected = 0; //Index selectd by arrow keys (0 means none selected)
    var storedSearchValue; //Stored search value when arrow keys are pressed
    var selectedItem; //Currently selected item when arrow keys are pressed

    var apiString = resourceURL + '/lib/search_teams_middlelayer.php';
    var fuse; //Fuse.js search object
    var searchResults = [];
    //Click event added to window when dropdown is shown
    var windowClickEvent = function(evt){
      var target = evt.target;
      var clickedInside = false;
      //Look through parent nodes until match is found or top of document is reached
      do{
        if(target === searchDesktop || target === searchDesktop.nextElementSibling){
          clickedInside = true;
          target = false;
        }
        target = target.parentNode;
      }while(target);

      if(clickedInside){
        //Clicked inside. Do nothing
      }else{
        //Clicked outside. close results and remove event
        removeClass(searchDesktop.nextElementSibling, 'ddb-show');
        window.removeEventListener('click', windowClickEvent);
      }

    }

    var submitAutoSuggest = function(data){
      var link;
      var sanitizeTeamName = data.teamName.replace(/[^\w\s]/gi, '');
      sanitizeTeamName = sanitizeTeamName.replace(/\s+/g, '-').toLowerCase();

      switch(data.Scope){
        case 'MLB':
          link = homerunDomain + '/team/' + sanitizeTeamName + '/' + data.teamId;
        break;
        case 'NFL':
          link = touchdownDomain + '/nfl/team/' + sanitizeTeamName + '/' + data.teamId;
        break;
        case 'NCAAF':
          link = touchdownDomain + '/ncaaf/team' + sanitizeTeamName + '/' + data.teamId;
        break;
        case 'NBA':
          link = hoopsDomain + '/NBA/t/' + sanitizeTeamName + '/' + data.teamId;
        break;
        case 'NCAAB':
          link = hoopsDomain + '/NCAA/t/' + sanitizeTeamName + '/' + data.teamId;
        break;
        default:
          link = '#';
        break;
      }

      window.location.href = link;
    }
    //Keyup event when user types in search
    var keyupEvent = function(evt){
      var keyCode = evt.keyCode;
      //Enter function
      if(keyCode === 13 && searchResults.length > 0 && typeof selectedItem !== 'undefined'){
        submitAutoSuggest(selectedItem);

        return false;
      }
      //Arrow keys function
      if((keyCode === 38 || keyCode === 40) && searchResults.length > 0){
        var dropdownItems = searchDesktopDropdown.childNodes;
        //Up Arrow
        if(keyCode === 38){
          if(indexSelected === 0){
            indexSelected = searchResults.length;
          }else{
            indexSelected--;
          }

        }
        //Down Arrow
        if(keyCode === 40){
          if(indexSelected === searchResults.length){
            indexSelected = 0;
          }else{
            indexSelected++;
          }
        }

        for(var c = 0, length = dropdownItems.length; c < length; c++){
          if(c + 1 !== indexSelected){
            removeClass(dropdownItems[c], 'ddb-search-active');
          }else{
            addClass(dropdownItems[c], 'ddb-search-active');
            searchDesktop.value = searchResults[c].teamName;
            selectedItem = searchResults[c];
          }
        }

        if(indexSelected === 0){
          searchDesktop.value = storedSearchValue;
          selectedItem = undefined;
        }

        return false;
      }

      var val = this.value;
      if(val === ''){
        searchResults = [];
        window.removeEventListener('click', windowClickEvent);
        removeClass(this.nextElementSibling, 'ddb-show');
        return false;
      }

      storedSearchValue = searchDesktop.value;
      searchResults = fuse.search(val).slice(0, 4);
      //Reset index
      indexSelected = 0;
      selectedItem = undefined;
      //Clear results list
      while (searchDesktopDropdown.firstChild) searchDesktopDropdown.removeChild(searchDesktopDropdown.firstChild);
      //Add no results found
      if(searchResults.length === 0){
        searchDesktopDropdown.appendChild(buildNoResults(), searchDesktopDropdown);
      }
      //Add search results to list
      searchResults.forEach(function(item){
        searchDesktopDropdown.appendChild(buildResult(item), searchDesktopDropdown);
      })

      if(!hasClass(this.nextElementSibling, 'ddb-show')){
        addClass(this.nextElementSibling, 'ddb-show');
        setTimeout(function(){
          window.addEventListener('click', windowClickEvent);
        }, 1);
      }

    };
    //Focus event when user focuses on search
    var focusSearch = function(){
      var val = this.value;

      if(val === ''){
        //If input is empty don't show dropdown
        return false;
      }

      if(!hasClass(this.nextElementSibling, 'ddb-show')){
        addClass(this.nextElementSibling, 'ddb-show');
        setTimeout(function(){
          window.addEventListener('click', windowClickEvent);
        }, 1);
      }
    };

    var keyupEventMobile = function(evt){
      var keyCode = evt.keyCode;

      //Enter function
      if(keyCode === 13 && searchResults.length > 0 && typeof selectedItem !== 'undefined'){
        submitAutoSuggest(selectedItem);

        return false;
      }
      //Arrow keys function
      if((keyCode === 38 || keyCode === 40) && searchResults.length > 0 ){
        var dropdownItems = searchMobileDropdown.childNodes;
        //Up Arrow
        if(keyCode === 38){
          if(indexSelected === 0){
            indexSelected = searchResults.length;
          }else{
            indexSelected--;
          }
        }
        //Down Arrow
        if(keyCode === 40){
          if(indexSelected === searchResults.length){
            indexSelected = 0;
          }else{
            indexSelected++;
          }
        }

        for(var c = 0, length = dropdownItems.length; c < length; c++){
          if(c + 1 !== indexSelected){
            removeClass(dropdownItems[c], 'ddb-search-active');
          }else{
            addClass(dropdownItems[c], 'ddb-search-active');
            searchMobile.value = searchResults[c].teamName;
            selectedItem = searchResults[c];
          }
        }

        if(indexSelected === 0){
          searchMobile.value = storedSearchValue;
          selectedItem = undefined;
        }

        return false;
      }

      var val = this.value;
      if(val === ''){
        searchResults = [];
        //Clear results list
        while (searchMobileDropdown.firstChild) searchMobileDropdown.removeChild(searchMobileDropdown.firstChild);
        return false;
      }

      storedSearchValue = searchMobile.value;
      searchResults = fuse.search(val).slice(0, 4);
      //Reset index
      indexSelected = 0;
      selectedItem = undefined;
      //Clear results list
      while (searchMobileDropdown.firstChild) searchMobileDropdown.removeChild(searchMobileDropdown.firstChild);
      //Add no results found
      if(searchResults.length === 0){
        searchMobileDropdown.appendChild(buildNoResults(), searchMobileDropdown);
      }
      //Add search results to list
      searchResults.forEach(function(item){
        searchMobileDropdown.appendChild(buildResult(item), searchMobileDropdown);
      })
    };

    var keyupEventSmallDesktop = function(evt){
      var keyCode = evt.keyCode;
      //Enter function
      if(keyCode === 13 && searchResults.length > 0 && typeof selectedItem !== 'undefined'){
        submitAutoSuggest(selectedItem);

        return false;
      }
      //Arrow keys function
      if((keyCode === 38 || keyCode === 40) && searchResults.length > 0){
        var dropdownItems = searchSmallDesktopDropdown.childNodes;
        //Up Arrow
        if(keyCode === 38){
          if(indexSelected === 0){
            indexSelected = searchResults.length;
          }else{
            indexSelected--;
          }

        }
        //Down Arrow
        if(keyCode === 40){
          if(indexSelected === searchResults.length){
            indexSelected = 0;
          }else{
            indexSelected++;
          }
        }

        for(var c = 0, length = dropdownItems.length; c < length; c++){
          if(c + 1 !== indexSelected){
            removeClass(dropdownItems[c], 'ddb-search-active');
          }else{
            addClass(dropdownItems[c], 'ddb-search-active');
            searchSmallDesktop.value = searchResults[c].teamName;
            selectedItem = searchResults[c];
          }
        }

        if(indexSelected === 0){
          searchSmallDesktop.value = storedSearchValue;
          selectedItem = undefined;
        }

        return false;
      }


      var val = this.value;
      if(val === ''){
        searchResults = [];
        //Clear results list
        while (searchSmallDesktopDropdown.firstChild) searchSmallDesktopDropdown.removeChild(searchSmallDesktopDropdown.firstChild);
        return false;
      }

      storedSearchValue = searchSmallDesktop.value;
      searchResults = fuse.search(val).slice(0, 4);
      //Reset index
      indexSelected = 0;
      selectedItem = undefined;
      //Clear results list
      while (searchSmallDesktopDropdown.firstChild) searchSmallDesktopDropdown.removeChild(searchSmallDesktopDropdown.firstChild);
      //Add no results found
      if(searchResults.length === 0){
        searchSmallDesktopDropdown.appendChild(buildNoResults(), searchSmallDesktopDropdown);
      }
      //Add search results to list
      searchResults.forEach(function(item){
        searchSmallDesktopDropdown.appendChild(buildResult(item), searchSmallDesktopDropdown);
      })
    };

    var buildNoResults = function(){
      var el = document.createElement('li');
      el.className = 'ddb-no-results';
      el.innerText = 'No Results Found';
      return el;
    }

    var buildResult = function(data){
      var el = document.createElement('li');

      var iconClass, link;
      var sanitizeTeamName = data.teamName.replace(/[^\w\s]/gi, '');
      sanitizeTeamName = sanitizeTeamName.replace(/\s+/g, '-').toLowerCase();
      switch(data.Scope){
        case 'MLB':
          iconClass = 'ddb-icon-baseball';
          link = homerunDomain + '/team/' + sanitizeTeamName + '/' + data.teamId;
        break;
        case 'NFL':
          iconClass = 'ddb-icon-football';
          link = touchdownDomain + '/nfl/team/' + sanitizeTeamName + '/' + data.teamId;
        break;
        case 'NCAAF':
          iconClass = 'ddb-icon-football';
          link = touchdownDomain + '/ncaaf/team' + sanitizeTeamName + '/' + data.teamId;
        break;
        case 'NBA':
          iconClass = 'ddb-icon-basketball';
          link = hoopsDomain + '/NBA/t/' + sanitizeTeamName + '/' + data.teamId;
        break;
        case 'NCAAB':
          iconClass = 'ddb-icon-basketball';
          link = hoopsDomain + '/NCAA/t/' + sanitizeTeamName + '/' + data.teamId;
        break;
        default:
          iconClass = 'ddb-icon-list'
          link = '#';
        break;
      }
      el.innerHTML = `
        <a href="` + link + `">
          <i class="ddb-icon ` + iconClass + `"></i>
          ` + data.teamName + `
        </a>
      `;

      return el;
    }

    var bootstrapSearchInputs = function(){
      searchDesktop.addEventListener('focus', focusSearch);
      searchDesktop.addEventListener('keyup', debounce(keyupEvent, 200));

      searchSmallDesktop.addEventListener('keyup', debounce(keyupEventSmallDesktop, 200));

      searchMobile.addEventListener('keyup', debounce(keyupEventMobile, 200));
    }

    var xhttp = createRequestObject();
    xhttp.onreadystatechange = function(){
      if(xhttp.readyState === 4 && xhttp.status === 200){
        //Success
        var res = JSON.parse(xhttp.responseText);
        //console.log('SEARCH API SUCCESS', res);
        fuse = new Fuse(res, {
          keys: ['teamName'],
          threshold: 0.2
        });

        bootstrapSearchInputs();

      }else if(xhttp.readyState === 4 && xhttp.status !== 200){
        //Error
        console.log('SEARCH API ERROR');
      }
    };
    xhttp.open('GET', apiString, true);
    xhttp.send();
  }
  //UPDATED
  var bootstrapAd = function(){

    var adNode = document.getElementById('ddb-ad');
    var adScript = document.createElement('script');
    adScript.innerHTML = '';
    adScript.src = protocol + '://content.synapsys.us/l/n/igloo.php?type=inline_ad&adW=300&adH=250&widW=0&widH=0&remn=false&rand=' + Math.floor((Math.random() * 10000000000) + 1) + '&dom=chicagotribune.com&norotate=true';
    adNode.appendChild(adScript);
  }

  var bootstrapDynamicDropdown = function(){
    var navItems = document.getElementsByClassName('ddb-menu-nav-item ddb-dynamic-item'); //Tab elements that the dynamic dropdown applies too
    var dynamicDropdown = document.getElementById('ddb-dynamic-dropdown'); //Dynamic dropdown element
    var dynamicNav = document.getElementById('ddb-dynamic-nav'); //Nav of dynamic dropdown
    var dynamicLinks = document.getElementById('ddb-dynamic-links'); //Links of dynamic dropdown

    var mlbDropdownElements = bootstrapMLBDropdown();
    var nbaDropdownElements = bootstrapNBADropdown();
    var nflDropdownElements = bootstrapNFLDropdown();

    var mouseEnterEvent = function(evt){
      var id = this.id;

      clearInnerHTML(dynamicNav);
      clearInnerHTML(dynamicLinks);
      switch(id){
        case 'ddb-dropdown-mlb':
          dynamicDropdown.id = 'ddb-dynamic-mlb';

          dynamicNav.appendChild(mlbDropdownElements.nav);
          dynamicLinks.appendChild(mlbDropdownElements.links);
        break;
        case 'ddb-dropdown-nba':
          dynamicDropdown.id = 'ddb-dynamic-nba';

          dynamicNav.appendChild(nbaDropdownElements.nav);
          dynamicLinks.appendChild(nbaDropdownElements.links);
        break;
        case 'ddb-dropdown-ncaam':
          dynamicDropdown.id = 'ddb-dynamic-ncaam';

          dynamicNav.appendChild(ncaamDropdownElements.nav);
          dynamicLinks.appendChild(ncaamDropdownElements.links);
        break;
        case 'ddb-dropdown-nfl':
          dynamicDropdown.id = 'ddb-dynamic-nfl';

          dynamicNav.appendChild(nflDropdownElements.nav);
          dynamicLinks.appendChild(nflDropdownElements.links);
        break;
        case 'ddb-dropdown-ncaaf':
          dynamicDropdown.id = 'ddb-dynamic-ncaaf';

          dynamicNav.appendChild(ncaafDropdownElements.nav);
          dynamicLinks.appendChild(ncaafDropdownElements.links);
        break;
      }

      addClass(dynamicDropdown, 'ddb-hover');
    };
    var mouseLeaveEvent = function(evt){
      removeClass(dynamicDropdown, 'ddb-hover');
    };

    [].forEach.call(navItems, function(item){
      item.addEventListener('mouseenter', mouseEnterEvent);
      item.addEventListener('mouseleave', mouseLeaveEvent)
    });

    //Build ad
    bootstrapAd();
  }
  /**
   * Other functions
   **/

   //Load any style/link dependencies. This is called before the dom content is loaded
  function loadLinkDependencies(){
     //Load font
     var fontEl = document.createElement('link');
     fontEl.rel = 'stylesheet';
     fontEl.type = 'text/css';
     fontEl.dataset.resource_from = 'deepdive-bar-embed';
     fontEl.href = 'https://fonts.googleapis.com/css?family=Lato:300,400,700,900';
     document.head.appendChild(fontEl);
     //Load styles
     var styleEl = document.createElement('link');
     styleEl.rel = 'stylesheet';
     styleEl.type = 'text/css';
     styleEl.dataset.resource_from = 'deepdive-bar-embed';
     styleEl.href = resourceURL + '/bar/bar.css';
     if(styleEl.readyState){ //IE
       styleEl.onreadystatechange = function (){
         if(styleEl.readyState === 'loaded' || styleEl.readyState === 'complete'){
           styleEl.onreadystatechange = null;
           bootstrapApp();
         }
       }
     }else{ //Others
       styleEl.onload = function(){
           bootstrapApp();
       }
     }
     document.head.appendChild(styleEl);
     //Load font icons
     var iconEl = document.createElement('link');
     iconEl.rel = 'stylesheet';
     iconEl.type = 'text/css';
     iconEl.dataset.resource_from = 'deepdive-bar-embed';
     iconEl.href = resourceURL + '/fonts/deepdive_bar/styles.css';
     document.head.appendChild(iconEl);
   }

   //Load any script dependencies. This is fired after the dom content is loaded
   function loadScriptDependencies(){
     //Load fuse.js
     var fuseJS = document.createElement('script');
     fuseJS.type='text/javascript';
     fuseJS.dataset.resource_from = 'deepdive-bar-embed';
     fuseJS.src = resourceURL + '/lib/fuse_2.5.0.min.js';
     //Wait for fuse js to load before bootstrapping search functionality
     if (fuseJS.readyState) { //IE
      fuseJS.onreadystatechange = function () {
        if (fuseJS.readyState == "loaded" || fuseJS.readyState == "complete") {
          fuseJS.onreadystatechange = null;
          bootstrapSearch();
        }
      };
    } else { //Others
      fuseJS.onload = function () {
        bootstrapSearch();
      };
    }
    document.head.appendChild(fuseJS);
   }

   //Gets state of user's isp
   var getUserLocation = function(){

     var apiString = protocol + '://w1.synapsys.us/listhuv/?action=get_remote_addr2';
     var xhttp = createRequestObject();
     xhttp.onreadystatechange = function(){
       if(xhttp.readyState === 4 && xhttp.status === 200){
         //Success
         var res = JSON.parse(xhttp.responseText);
         //console.log('GET USER LOCATION SUCCESS', res);

         var state = processLocationData(res);
         bootstrapTicker(state);
         bootstrapCollegeBasketballDropdown(state, true);
         bootstrapCollegeFootballDropdown(state, true);

       }else if(xhttp.readyState === 4 && xhttp.tatus !== 200){
         //Error
         console.log('GET USER LOCATION ERROR');
         var state = processLocationData(undefined);
         bootstrapTicker(state);
         bootstrapCollegeBasketballDropdown(state, false);
         bootstrapCollegeFootballDropdown(state, false);

       }
     };
     xhttp.open('GET', apiString, true);
     xhttp.send();
   }

   //Function that returns default ticker data if api fails or no news is available
   var buildDefaultTickerData = function(){
     var defaultTickerItems = [
       {
         text: 'Looking for more baseball action? Check out baseball.chicagotribune.com for stats, schedules, and more.',
         route: homerunDomain
       }
     ];
     var defaultTickerData = '';

     defaultTickerItems.forEach(function(item, index){
      defaultTickerData += '<a class="ddb-menu-ticker-link" target="_blank" href="' + item.route + '">' + item.text + '</a>';
      //Add separator bullet if item is not the last item in the default ticker
      if(index !== defaultTickerItems.length - 1){
        defaultTickerData += '<span class="ddb-menu-ticker-separator">&#8226;</span>';
      }
    });

     return defaultTickerData;
   }

   var processTickerData = function(data){
     var transform = '';

     //Sanitize data (data sometimes includes empty arrays [])
     for(var i = data.length - 1; i >= 0; i--){
       var item = data[i];
       if(item.length === 0){
         data.splice(i, 1);
       }
     }

     var dataLength = data.length;
     //Build inner html
     data.forEach(function(item, index){
        var eventId = item.event;
        if(item.featuredReport.hasOwnProperty('postgame-report')){
          var headline = item.featuredReport['postgame-report'].displayHeadline;
          var link = homerunDomain + '/articles/postgame-report/' + eventId;
          transform += index !== (dataLength - 1) ?  '<a class="ddb-menu-ticker-link" target="_blank" href="' + link + '">' + headline + '</a><span class="ddb-menu-ticker-separator">&#8226;</span>': '<a class="ddb-menu-ticker-link" target="_blank" href="' + link + '">' + headline + '</a>';
        }
     })

     if(transform === ''){
       transform = buildDefaultTickerData();
     }

     return transform;
   }

   var processLocationData = function(data){
     var transform;

    transform = typeof data !== 'undefined' && typeof data[0] !== 'undefined' && typeof data[0].state !== 'undefined' ? data[0].state.toLowerCase() : defaultState;
    return transform;
   }

   var processCollegeBasketballData = function(data){
     data = data || [];
     var transform = [];

     var buildLink = function(full_name, teamId){
       full_name = full_name.replace(/[^\w\s]/gi, '');
       full_name = full_name.replace(/\s+/g, '-').toLowerCase();

       return hoopsDomain + '/NCAA/t/' + full_name + '/' + teamId;
     }

     //Limit amount of data to iterate through (max 2)
     var dataLength = data.length > 1 ? 2 : data.length;
     //Loop through each league
     for(var i = 0; i < dataLength; i++){
       var item = data[i];
       var leagueName = Object.keys(item)[0];
       var leagueData = data[i][leagueName];
      //  var tableHTML = document.createElement('table');
      //  tableHTML.className = 'ddb-menu-dropdown-table ddb-col-3';
       var tableInnerHTML = `
        <table class="ddb-menu-dropdown-table ddb-col-3">
          <thead>
            <tr>
              <td colspan="3">
                ` + leagueName + `
              </td>
            </tr>
          </thead>
          <tbody>
       `;

       leagueData.forEach(function(item, index){
         var mod = index % 3;
         //Add html accordingly
         if(mod === 0){
           //First Column
           tableInnerHTML += '<tr><td><a href="' + buildLink(item.full_name, item.team_id) + '">' + item.full_name + '</a></td>';
         }else if(mod === 1){
           //Middle Column
           tableInnerHTML += '<td><a href="' + buildLink(item.full_name, item.team_id) + '">' + item.full_name + '</a></td>';
         }else if(mod === 2){
           //Last Column
           tableInnerHTML += '<td><a href="' + buildLink(item.full_name, item.team_id) + '">' + item.full_name + '</a></td></tr>';
         }

       })
       //Check if html template is closed with </tr>, if not then add
       if(!endsWith(tableInnerHTML, '</tr>')){
         tableInnerHTML += '</tr>';
       }

       tableInnerHTML += '</tbody></table>';
      //  tableHTML.innerHTML = tableInnerHTML;

      //  transform.push(tableHTML);
      transform.push(tableInnerHTML);
     }

     return transform;
   }

   var processCollegeFootballData = function(data){
     data = data || [];
     var transform = [];

     var buildLink = function(full_name, teamId){
       full_name = full_name.replace(/[^\w\s]/gi, '');
       full_name = full_name.replace(/\s+/g, '-').toLowerCase();

       return touchdownDomain + '/ncaaf/team/' + full_name + '/' + teamId;
     }

     //Limit amount of data to iterate through (max 2)
     var objectKeys = Object.keys(data);
     var dataLength = objectKeys.length > 1 ? 2 : objectKeys.length;
     //Loop through each league
     for(var i = 0; i < dataLength; i++){
       var leagueName = objectKeys[i];
       var league = data[leagueName];

       var leagueData = [];
       //Build array of teams in league (regardless of division)
       for(var division in league){
         leagueData = leagueData.concat(league[division]);
       }
      //  var tableHTML = document.createElement('table');
      //  tableHTML.className = 'ddb-menu-dropdown-table ddb-col-3';
       var tableInnerHTML = `
        <table class="ddb-menu-dropdown-table ddb-col-3">
          <thead>
            <tr>
              <td colspan="3">
                ` + leagueName + `
              </td>
            </tr>
          </thead>
          <tbody>
       `;

       leagueData.forEach(function(item, index){
         var mod = index % 3;
         //Add html accordingly
         if(mod === 0){
           //First Column
           tableInnerHTML += '<tr><td><a href="' + buildLink(item.full_name, item.id) + '">' + item.full_name + '</a></td>';
         }else if(mod === 1){
           //Middle Column
           tableInnerHTML += '<td><a href="' + buildLink(item.full_name, item.id) + '">' + item.full_name + '</a></td>';
         }else if(mod === 2){
           //Last Column
           tableInnerHTML += '<td><a href="' + buildLink(item.full_name, item.id) + '">' + item.full_name + '</a></td></tr>';
         }
       })

       //Check if html template is closed with </tr>, if not then add
       if(!endsWith(tableInnerHTML, '</tr>')){
         tableInnerHTML += '</tr>';
       }

       tableInnerHTML += '</tbody></table>';
      //  tableHTML.innerHTML = tableInnerHTML;

      //  transform.push(tableHTML);
      transform.push(tableInnerHTML);
     }

     return transform;
   }

   var processBoxscoresData = function(data, offset, tzAbbrev, todayDate){
     var pre = [], active = [], post = [];

     var buildNode = function(data){
       var gameNode = document.createElement('div');
       gameNode.className = 'ddb-boxscores-content-game';
       gameNode.innerHTML = `
         <a class="ddb-boxscores-content-game-link" href="` + data.link + `">
           <ul class="ddb-boxscores-content-game-teams">
             <li class="` + (data.homeClass ? data.homeClass : '') + `">
               ` + data.homeTeam + ` <span class="ddb-boxscores-content-game-score">` + data.homeScore + `</span>
             </li>
             <li class="` + (data.awayClass ? data.awayClass : '') + `">
               ` + data.awayTeam + ` <span class="ddb-boxscores-content-game-score">` + data.awayScore + `</span>
             </li>
           </ul>
           <span class="ddb-boxscores-content-game-bottom">
             ` + data.bottomData + `
           </span>
         </a>
       `;

       return gameNode;
     }

     if(typeof todayDate !== 'undefined' && todayDate !== null){

       for(var index in data){
         var item = data[index];
         //Determine if game is today (Also allow games that are live, but the day has rolled over past midnight)
         var gameIsToday = false;
         var timestampDate = new Date(item.gameInfo.startDateTimestamp + offset * 3600 * 1000).getUTCDate();
         if(timestampDate == todayDate){
           gameIsToday = true;
         }else if(item.gameInfo.live){
           gameIsToday = true;
         }

         //If game is today or live, push to return array
         if(gameIsToday){

           switch(item.gameInfo.eventStatus){
             case 'pre-event':
              if(item.gameInfo.live === false){
                //Pre Game
                var gameObject = {
                  homeTeam: item.homeTeamInfo.abbreviation,
                  homeScore: item.homeTeamInfo.winRecord + '-' + item.homeTeamInfo.lossRecord,
                  awayTeam: item.awayTeamInfo.abbreviation,
                  awayScore: item.awayTeamInfo.winRecord + '-' + item.awayTeamInfo.lossRecord,
                  timestamp: item.gameInfo.startDateTimestamp,
                  datetime: convertToEastern(item.gameInfo.startDateTimestamp, offset, tzAbbrev),
                  eventStatus: item.gameInfo.eventStatus,
                  eventId: item.gameInfo.eventId
                };
                gameObject.bottomData = gameObject.datetime;
                gameObject.link = homerunDomain + '/articles/pregame-report/' + gameObject.eventId;

                gameObject.mobileNode = buildNode(gameObject);
                gameObject.desktopNode = buildNode(gameObject);

                pre.push(gameObject);
              }else{
                //Live Game
                var gameObject = {
                  homeTeam: item.homeTeamInfo.abbreviation,
                  homeScore: item.homeTeamInfo.score,
                  awayTeam: item.awayTeamInfo.abbreviation,
                  awayScore: item.awayTeamInfo.score,
                  timestamp: item.gameInfo.startDateTimestamp,
                  datetime: convertToEastern(item.gameInfo.startDateTimestamp, offset, tzAbbrev),
                  eventStatus: item.gameInfo.eventStatus,
                  eventId: item.gameInfo.eventId
                };

                gameObject.homeClass = gameObject.homeScore && gameObject.awayScore && (gameObject.homeScore < gameObject.awayScore) ? 'ddb-grey' : null;
                gameObject.awayClass = gameObject.homeScore && gameObject.awayScore && (gameObject.homeScore > gameObject.awayScore) ? 'ddb-grey' : null;

                if(item.gameInfo.inningHalf === 'top'){
                  gameObject.bottomData = '<i class="ddb-icon ddb-icon-caret-up"></i>' + (item.gameInfo.inningsPlayed ? ordinalSuffix(item.gameInfo.inningsPlayed) : gameObject.datetime);
                }else if(item.gameInfo.inningHalf === 'bottom'){
                  gameObject.bottomData = '<i class="ddb-icon ddb-icon-caret-down"></i>' + (item.gameInfo.inningsPlayed ? ordinalSuffix(item.gameInfo.inningsPlayed) : gameObject.datetime);
                }else{
                  gameObject.bottomData = '';
                }

                if(item.gameInfo.inningsPlayed <= 3){
                  gameObject.link = homerunDomain + '/articles/pregame-report/' + gameObject.eventId;
                }else if(item.gameInfo.inningsPlayed > 3 && item.gameInfo.inningsPlayed <= 5){
                  gameObject.link = homerunDomain + '/articles/third-inning-report/' + gameObject.eventId;
                }else if(item.gameInfo.inningsPlayed > 5 && item.gameInfo.inningsPlayed <= 7){
                  gameObject.link = homerunDomain + '/articles/fifth-inning-report/' + gameObject.eventId;
                }else if(item.gameInfo.inningsPlayed > 7){
                  gameObject.link = homerunDomain + '/articles/seventh-inning-report/' + gameObject.eventId;
                }

                gameObject.mobileNode = buildNode(gameObject);
                gameObject.desktopNode = buildNode(gameObject);

                active.push(gameObject)
              }
             break;
             case 'post-event':
                //Post Game
                var gameObject = {
                  homeTeam: item.homeTeamInfo.abbreviation,
                  homeScore: item.homeTeamInfo.score,
                  awayTeam: item.awayTeamInfo.abbreviation,
                  awayScore: item.awayTeamInfo.score,
                  timestamp: item.gameInfo.startDateTimestamp,
                  datetime: convertToEastern(item.gameInfo.startDateTimestamp, offset, tzAbbrev),
                  eventStatus: item.gameInfo.eventStatus,
                  eventId: item.gameInfo.eventId
                };

                gameObject.homeClass = gameObject.homeScore && gameObject.awayScore && (gameObject.homeScore < gameObject.awayScore) ? 'ddb-grey' : null;
                gameObject.awayClass = gameObject.homeScore && gameObject.awayScore && (gameObject.homeScore > gameObject.awayScore) ? 'ddb-grey' : null;

                gameObject.bottomData = 'Final';
                gameObject.link = homerunDomain + '/articles/postgame-report/' + gameObject.eventId;

                gameObject.mobileNode = buildNode(gameObject);
                gameObject.desktopNode = buildNode(gameObject);

                post.push(gameObject);
             break;
             default:
              //Do nothing
             break;
           }

         }

        };

       }else{

         for(var index in data){
           var item = data[index];
           switch(item.gameInfo.eventStatus){
             case 'pre-event':
                //Pre Game
                var dateObj = new Date(item.gameInfo.startDateTimestamp);
                var datetime = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1) + '-' + dateObj.getUTCDate();

                var gameObject = {
                  homeTeam: item.homeTeamInfo.abbreviation,
                  homeScore: item.homeTeamInfo.winRecord + '-' + item.homeTeamInfo.lossRecord,
                  awayTeam: item.awayTeamInfo.abbreviation,
                  awayScore: item.awayTeamInfo.winRecord + '-' + item.awayTeamInfo.lossRecord,
                  timestamp: item.gameInfo.startDateTimestamp,
                  datetime: prettyDatetime(datetime),
                  eventStatus: item.gameInfo.eventStatus,
                  eventId: item.gameInfo.eventId
                };
                gameObject.bottomData = gameObject.datetime;
                gameObject.link = homerunDomain + '/articles/pregame-report/' + gameObject.eventId;

                gameObject.mobileNode = buildNode(gameObject);
                gameObject.desktopNode = buildNode(gameObject);

                pre.push(gameObject);
             break;
             case 'post-event':
                //Post Game
                var dateObj2 = new Date(item.gameInfo.startDateTimestamp);
                var datetime2 = dateObj2.getUTCFullYear() + '-' + (dateObj2.getUTCMonth() + 1) + '-' + dateObj2.getUTCDate();

                var gameObject = {
                  homeTeam: item.homeTeamInfo.abbreviation,
                  homeScore: item.homeTeamInfo.score,
                  awayTeam: item.awayTeamInfo.abbreviation,
                  awayScore: item.awayTeamInfo.score,
                  timestamp: item.gameInfo.startDateTimestamp,
                  datetime: prettyDatetime(datetime2),
                  eventStatus: item.gameInfo.eventStatus,
                  eventId: item.gameInfo.eventId
                };

                gameObject.homeClass = gameObject.homeScore && gameObject.awayScore && (gameObject.homeScore < gameObject.awayScore) ? 'ddb-grey' : null;
                gameObject.awayClass = gameObject.homeScore && gameObject.awayScore && (gameObject.homeScore > gameObject.awayScore) ? 'ddb-grey' : null;

                gameObject.bottomData = 'Final';
                gameObject.link = homerunDomain + '/articles/postgame-report/' + gameObject.eventId;

                gameObject.mobileNode = buildNode(gameObject);
                gameObject.desktopNode = buildNode(gameObject);

                post.push(gameObject);
             break;
             default:
              //Do nothing
             break;
           }
         }
       }


     pre = arraySort(pre, 1, 'timestamp');
     active = arraySort(active, 1, 'timestamp');
     post = arraySort(post, 1, 'timestamp');

     var allGames = active.concat(pre, post);

     return allGames;
   }

   var processNFLBoxscoresData = function(data, offset, tzAbbrev, todayDate, vertical){
     var pre = [], active = [], post = [];
     var wpre = [], wpost = [];

     var buildNode = function(data){
       var gameNode = document.createElement('div');
       gameNode.className = 'ddb-boxscores-content-game';
       gameNode.innerHTML = `
         <a class="ddb-boxscores-content-game-link" href="` + data.link + `">
           <ul class="ddb-boxscores-content-game-teams">
             <li>
               ` + data.homeTeam + ` <span class="ddb-boxscores-content-game-score">` + data.homeScore + `</span>
             </li>
             <li>
               ` + data.awayTeam + ` <span class="ddb-boxscores-content-game-score">` + data.awayScore + `</span>
             </li>
           </ul>
           <span class="ddb-boxscores-content-game-bottom">
             ` + data.bottomData + `
           </span>
         </a>
       `;

       return gameNode;
     }

     for(var index in data){
       var item = data[index];
       var gameIsToday = false;
       var timestampDate = new Date(item.eventStartTime + offset * 3600 * 1000).getUTCDate();
       var now = new Date().getTime();

       if(timestampDate === todayDate){
         gameIsToday = true;
       }

       if(gameIsToday){
        //Game is Today
        if(item.liveStatus === 'N' && item.eventStartTime > now){
          //Pre Game
          var homeScore, awayScore;
          if(item.team1Record){
            var recordSplit = item.team1Record.split('-');
            homeScore = recordSplit[0] + '-' + recordSplit[1];
          }else{
            homeScore = '-';
          }
          if(item.team2Record){
            var recordSplit = item.team2Record.split('-');
            awayScore = recordSplit[0] + '-' + recordSplit[1];
          }else{
            awayScore = '-';
          }

          var gameObject = {
            homeTeam: item.team1Abbreviation,
            homeScore: homeScore,
            awayTeam:item.team2Abbreviation,
            awayScore: awayScore,
            timestamp: item.eventStartTime,
            datetime: convertToEastern(item.eventStartTime, offset, tzAbbrev),
            eventId: item.eventId
          };

          gameObject.bottomData = gameObject.datetime;
          if(vertical === 'nfl'){
            gameObject.link = touchdownDomain + '/nfl/articles/pregame-report/' + item.eventId;
          }else if(vertical === 'ncaaf'){
            gameObject.link = touchdownDomain + '/ncaaf/articles/pregame-report/' + item.eventId;
          }else{
            gameObject.link = '#';
          }

          gameObject.mobileNode = buildNode(gameObject);
          gameObject.desktopNode = buildNode(gameObject);

          pre.push(gameObject);
        }else if(item.liveStatus === 'Y' && item.eventStartTime < now){
          //Live Game=

          var gameObject = {
            homeTeam: item.team1Abbreviation,
            homeScore: item.team1Score ? item.team1Score : '-',
            awayTeam: item.team2Abbreviation,
            awayScore: item.team2Score ? item.team2Score: '-',
            timestamp: item.eventStartTime,
            datetime: convertToEastern(item.eventStartTime, offset, tzAbbrev),
            eventId: item.eventId
          };

          gameObject.homeClass = gameObject.homeScore !== '-' && gameObject.awayScore !== '-' && (gameObject.homeScore < gameObject.awayScore) ? 'ddb-grey' : null;
          gameObject.awayClass = gameObject.homeScore !== '-' && gameObject.awayScore !== '-' && (gameObject.homeScore > gameObject.awayScore) ? 'ddb-grey' : null;

          gameObject.bottomData = item.eventQuarter ? ordinalSuffix(item.eventQuarter) : gameObject.datetime;
          if(vertical === 'nfl'){
            gameObject.link = touchdownDomain + '/nfl/articles/in-game-report/' + item.eventId;
          }else if(vertical === 'ncaaf'){
            gameObject.link = touchdownDomain + '/ncaaf/articles/in-game-report/' + item.eventId;
          }else{
            gameObject.link = '#';
          }

          gameObject.mobileNode = buildNode(gameObject);
          gameObject.desktopNode = buildNode(gameObject);

          active.push(gameObject);
        }else if(item.liveStatus === 'N' && item.eventStartTime < now){
          //Post Game
          var gameObject = {
            homeTeam: item.team1Abbreviation,
            homeScore: item.team1Score ? item.team1Score : '-',
            awayTeam:item.team2Abbreviation,
            awayScore: item.team2Score ? item.team2Score : '-',
            timestamp: item.eventStartTime,
            datetime: convertToEastern(item.eventStartTime, offset, tzAbbrev),
            eventId: item.eventId
          };

          gameObject.homeClass = gameObject.homeScore !== '-' && gameObject.awayScore !== '-' && (gameObject.homeScore < gameObject.awayScore) ? 'ddb-grey' : null;
          gameObject.awayClass = gameObject.homeScore !== '-' && gameObject.awayScore !== '-' && (gameObject.homeScore > gameObject.awayScore) ? 'ddb-grey' : null;

          gameObject.bottomData = 'Final';
          if(vertical === 'nfl'){
            gameObject.link = touchdownDomain + '/nfl/articles/postgame-report/' + item.eventId;
          }else if(vertical === 'ncaaf'){
            gameObject.link = touchdownDomain + '/ncaaf/articles/postgame-report/' + item.eventId;
          }else{
            gameObject.link = '#';
          }

          gameObject.mobileNode = buildNode(gameObject);
          gameObject.desktopNode = buildNode(gameObject);

          post.push(gameObject);
        }

       }else{
        //Game is this week
        if(item.eventStartTime > now){
          //Pre Game
          var homeScore, awayScore;
          if(item.team1Record){
            var recordSplit = item.team1Record.split('-');
            homeScore = recordSplit[0] + '-' + recordSplit[1];
          }else{
            homeScore = '-';
          }
          if(item.team2Record){
            var recordSplit = item.team2Record.split('-');
            awayScore = recordSplit[0] + '-' + recordSplit[1];
          }else{
            awayScore = '-';
          }

          var gameObject = {
            homeTeam: item.team1Abbreviation,
            homeScore: homeScore,
            awayTeam:item.team2Abbreviation,
            awayScore: awayScore,
            timestamp: item.eventStartTime,
            datetime: convertToEastern(item.eventStartTime, offset, tzAbbrev),
            eventId: item.eventId
          };

          gameObject.bottomData = prettyDatetime(item.eventDate);
          if(vertical === 'nfl'){
            gameObject.link = touchdownDomain + '/nfl/articles/pregame-report/' + item.eventId;
          }else if(vertical === 'ncaaf'){
            gameObject.link = touchdownDomain + '/ncaaf/articles/pregame-report/' + item.eventId;
          }else{
            gameObject.link = '#';
          }

          gameObject.mobileNode = buildNode(gameObject);
          gameObject.desktopNode = buildNode(gameObject);

          wpre.push(gameObject);

        }else if(item.eventStartTime < now){
          //Post Game
          var gameObject = {
            homeTeam: item.team1Abbreviation,
            homeScore: item.team1Score ? item.team1Score : '-',
            awayTeam:item.team2Abbreviation,
            awayScore: item.team2Score ? item.team2Score : '-',
            timestamp: item.eventStartTime,
            datetime: convertToEastern(item.eventStartTime, offset, tzAbbrev),
            eventId: item.eventId
          };

          gameObject.homeClass = gameObject.homeScore !== '-' && gameObject.awayScore !== '-' && (gameObject.homeScore < gameObject.awayScore) ? 'ddb-grey' : null;
          gameObject.awayClass = gameObject.homeScore !== '-' && gameObject.awayScore !== '-' && (gameObject.homeScore > gameObject.awayScore) ? 'ddb-grey' : null;

          gameObject.bottomData = 'Final';
          if(vertical === 'nfl'){
            gameObject.link = touchdownDomain + '/nfl/articles/postgame-report/' + item.eventId;
          }else if(vertical === 'ncaaf'){
            gameObject.link = touchdownDomain + '/ncaaf/articles/postgame-report/' + item.eventId;
          }else{
            gameObject.link = '#';
          }

          gameObject.mobileNode = buildNode(gameObject);
          gameObject.desktopNode = buildNode(gameObject);

          wpost.push(gameObject);
        }

       }

     }; //End for

     pre = arraySort(pre, 1, 'timestamp');
     active = arraySort(active, 1, 'timestamp');
     post = arraySort(post, 1, 'timestamp');
     wpre = arraySort(wpre, 1, 'timestamp');
     wpost = arraySort(wpost, 1, 'timestamp');

     var allGames = active.concat(pre, post, wpre, wpost);

     return allGames;
   }
  /**
   * Global event functions
   **/

   //Close top level dropdowns
   var closeDropdowns = function(){
     var dropdowns = document.getElementsByClassName('ddb-dropdown');
     for(var i = 0, length = dropdowns.length; i < length; i++){
       removeClass(dropdowns[i], 'ddb-show');
     }
   }
   //Close mobile menu submenus
   var closeMobileSubMenus = function(){
     var dropdowns = document.getElementsByClassName('ddb-tier1-show');
     for(var i = 0, length = dropdowns.length; i < length; i++){
       removeClass(dropdowns[i], 'ddb-tier1-show');
     }
   }
   //Window event for mobile menu
   var windowEventMobile = function(evt){
     var dropdownElement = mobileDropdown;
     var target = evt.target;
     var clickedInside = false;
     //Look through parent nodes until match is found or top of document is reached
     do{
       //If clicked element is mobile button or mobile menu dropdown (user clicked inside)
       if(target === mobileMenuButton || target === dropdownElement){
         clickedInside = true;
         target = false;
       }
       target = target.parentNode;
     }while(target);

     if(clickedInside){
       //Clicked inside. Do nothing
     }else{
       //Clicked outside. close dropdown and remove event
       removeClass(mobileMenuButton, 'ddb-mobile-menu-open');
       removeClass(mobileDropdown, 'ddb-show');
       closeMobileSubMenus();
       window.removeEventListener('click', windowEventMobile);
     }
   }
   //Window event for mobile search
   var windowEventMobileSearch = function(evt){
     var dropdownElement = mobileSearchBar;
     var target = evt.target;
     var clickedInside = false;
     //Look through parent nodes until match is found or top of document is reached
     do{
       //If clicked element is mobile button or mobile menu dropdown (user clicked inside)
       if(target === mobileSearchButton || target === dropdownElement){
         clickedInside = true;
         target = false;
       }
       target = target.parentNode;
     }while(target);

     if(clickedInside){
       //Clicked inside. Do nothing
     }else{
       //Clicked outside. close dropdown and remove event
       removeClass(mobileSearchButton, 'ddb-mobile-search-open');
       removeClass(mobileSearchBar, 'ddb-show');
       window.removeEventListener('click', windowEventMobileSearch);
     }
   }
   //Window event for small desktop search
   var windowEventSmallDesktopSearch = function(evt){
     var dropdownElement = smallDesktopSearchBar;
     var target = evt.target;
     var clickedInside = false;
     //Look through parent nodes until match is found or top of document is reached
     do{
       //If clicked element is mobile button or mobile menu dropdown (user clicked inside)
       if(target === smallDesktopSearchButton || target === dropdownElement){
         clickedInside = true;
         target = false;
       }
       target = target.parentNode;
     }while(target);

     if(clickedInside){
       //Clicked inside. Do nothing
     }else{
       //Clicked outside. close dropdown and remove event
       removeClass(smallDesktopSearchButton, 'ddb-small-desktop-search-open');
       removeClass(smallDesktopSearchBar, 'ddb-show');
       window.removeEventListener('click', windowEventSmallDesktopSearch);
     }
   }
   //Window event for desktop boxscores
   var windowEventDesktopBoxscores = function(evt){
     var dropdownElement = desktopBoxscoresDropdown;
     var target = evt.target;
     var clickedInside = false;
     //Look through parent nodes until match is found or top of document is reached
     do{
       //If clicked element is mobile button or mobile menu dropdown (user clicked inside)
       if(target === desktopBoxscoresButton || target === dropdownElement){
         clickedInside = true;
         target = false;
       }
       target = target.parentNode;
     }while(target);

     if(clickedInside){
       //Clicked inside. Do nothing
     }else{
       //Clicked outside. close dropdown and remove event
       removeClass(desktopBoxscoresButton, 'ddb-desktop-boxscores-open');
       removeClass(desktopBoxscoresDropdown, 'ddb-show');
       window.removeEventListener('click', windowEventDesktopBoxscores);
     }
   }
  /**
   * Utility functions
   **/

  //Creates Request Object. Has polyfill for old ie
  function createRequestObject() {
    var obj;
    var browser = navigator.appName;
    if (browser == "Microsoft Internet Explorer") {
        obj = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        obj = new XMLHttpRequest();
    }
    return obj;
  }
  //Determine if element has class
  function hasClass(element, className){
    if(element.classList){
      // console.log('has class classList');
      return element.classList.contains(className);
    }else{
      //Polyfill
      // console.log('hass class polyfill');
      return ((" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + className + " ") > -1);
    }
  }
  //Add class to element
  function addClass(element, className){
    if(element.classList){
      // console.log('add class classList');
      element.classList.add(className);
    }else{
      //Polyfill
      // console.log('add class polyfill');
      element.className += ' ' + className;
    }
  }
  //Remove class from element
  function removeClass(element, className){
    if(element.classList){
      // console.log('remove class classList');
      element.classList.remove(className);
    }else{
      //Polyfill
      // console.log('remove class polyfill');
      var reg = new RegExp('(?:^|\\s)' + className + '(?!\\S)');
      element.className = element.className.replace(reg, '');
    }
  }
  //Determine if a string ends with suffix
  function endsWith(string, suffix){
    return string.indexOf(suffix, string.length - suffix.length) !== -1;
  }
  //Get ordinal suffix of a number (1st, 2nd, etc..)
  function ordinalSuffix(i){
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
  }
  //Get current timezone offset and timezone abbreviation (in eastern)
  function getEasternTime(){
    //Grab current year
    var utcYear = new Date().getUTCFullYear();
    var daylightStart, daylightEnd, offset, abbrev;
    var currentUTC = (new Date).getTime();

    //Get second sunday of march 2:00 EST (beginning of daylight savings time)
    daylightStart = new Date(utcYear, 2, 7, 0, 0, 0, 0);
    daylightStart.setDate(7 + (7 - daylightStart.getDay()));
    daylightStart.setUTCHours(7);
    daylightStart = daylightStart.getTime();
    //Get first sunday of november 2:00 EDT (end of daylight savings time)
    daylightEnd = new Date(utcYear, 10, 1, 0, 0, 0, 0);
    while(daylightEnd.getDay() !== 0){
      daylightEnd.setDate(daylightEnd.getDate() + 1);
    }
    daylightEnd.setUTCHours(6);
    daylightEnd = daylightEnd.getTime();

    if(currentUTC <= daylightStart || currentUTC > daylightEnd){
      //Standard Time
      offset = -5;
      abbrev = 'EST';
    }else{
      //Daylight Savings Time
      offset = -4;
      abbrev = 'EDT';
    }

    return {
      offset: offset,
      tzAbbrev: abbrev
    };
  }
  //Get today's date
  function getToday(offset){
    var today = new Date(new Date().getTime() + offset * 3600 * 1000);
    var month = today.getUTCMonth() + 1;
    var date = today.getUTCDate();

    var todayObject = {
      today: today,
      year: today.getUTCFullYear(),
      month: month.toString().length === 1 ? '0' + month : month,
      date: date.toString().length === 1 ? '0' + date : date
    };

    return todayObject;
  }
  //Convert unix timestamp to datetime [hour:minute meridian tzAbbrev]
  function convertToEastern(date, offset, tzAbbrev){
    var date = new Date(date + offset * 3600 * 1000);
    var hour = date.getUTCHours();
    var meridian = hour >= 12 ? 'PM' : 'AM';
    hour = hour > 12 ? hour - 12 : hour;
    var minutes = date.getUTCMinutes();
    minutes = minutes.toString().length === 1 ? '0' + minutes.toString() : minutes;

    var convertedDate = hour + ':' + minutes + meridian + ' ' + tzAbbrev;

    return convertedDate;
  }

  function prettyDatetime(date){
    var dates = date.split('-');
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];

    return months[(Number(dates[1]) - 1)] + ' ' + ordinalSuffix(dates[2]);
  }
  //Function to sort array (ascending or descending) in a particular order (1 for ascending, 0 for descending)
  function arraySort(arr, ascending, attr){
    arr = arr.sort(function(a, b){
      if(ascending > 0){
        if(a[attr] < b[attr])
          return -1;
        if(a[attr] > b[attr])
          return 1;
        return 0;
      }else{
        if(a[attr] > b[attr])
          return -1;
        if(a[attr] < b[attr])
          return 1;
        return 0;
      }
    })
    return arr;
  }
  //Convert state abbreviation to full form
  function stateAbbrevToFull(abbrev){
    abbrev = abbrev.toLowerCase();

    var map = {
      'al': 'Alabama',
      'ak': 'Alaska',
      'az': 'Arizona',
      'ar': 'Arkansas',
      'ca': 'California',
      'co': 'Colorado',
      'ct': 'Connecticut',
      'de': 'Delaware',
      'dc': 'District Of Columbia',
      'fl': 'Florida',
      'ga': 'Georgia',
      'hi': 'Hawaii',
      'id': 'Idaho',
      'il': 'Illinois',
      'in': 'Indiana',
      'ia': 'Iowa',
      'ks': 'Kansas',
      'ky': 'Kentucky',
      'la': 'Lousiana',
      'me': 'Maine',
      'md': 'Maryland',
      'ma': 'Massachusetts',
      'mi': 'Michigan',
      'mn': 'Minnesota',
      'ms': 'Mississippi',
      'mo': 'Missouri',
      'mt': 'Montana',
      'ne': 'Nebraska',
      'nv': 'Nevada',
      'nh': 'New Hampshire',
      'nj': 'New Jersey',
      'nm': 'New Mexico',
      'ny': 'New York',
      'nc': 'North Carolina',
      'nd': 'North Dakota',
      'oh': 'Ohio',
      'ok': 'Oklahoma',
      'or': 'Oregon',
      'pa': 'Pennsylvania',
      'ri': 'Rhode Island',
      'sc': 'South Carolina',
      'sd': 'South Dakota',
      'tn': 'Tennessee',
      'tx': 'Texas',
      'ut': 'Utah',
      'vt': 'Vermont',
      'va': 'Virginia',
      'wa': 'Washington',
      'wv': 'West Virginia',
      'wi': 'Wisconsin',
      'wy': 'Wyoming'
    }

    return typeof map[abbrev] !== 'undefined' ? map[abbrev] : defaultState;
  }
  //Debounce function
  function debounce(func, wait, immediate){
  	var timeout;
  	return function() {
  		var context = this, args = arguments;
  		var later = function() {
  			timeout = null;
  			if (!immediate) func.apply(context, args);
  		};
  		var callNow = immediate && !timeout;
  		clearTimeout(timeout);
  		timeout = setTimeout(later, wait);
  		if (callNow) func.apply(context, args);
  	};
  };
  //Clear innerHTML of item
  function clearInnerHTML(el){
    while (el.firstChild) el.removeChild(el.firstChild);
  }

  // Launch App
  // 1. Load non blocking non js files (stylesheets)
  // 2. Load HTML Markup from bar.html (Once main stylesheet has loaded)
  // 3. Load script dependencies and start bootstrapping components
  loadLinkDependencies();

})();
