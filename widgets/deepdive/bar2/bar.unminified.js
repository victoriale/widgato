(function(){
  var protocol = (location.protocol) === 'https:' ? 'https' : 'http'; //Protocol of the domain the bar exist on
  var resourceURL = protocol + '://w1.synapsys.us/widgets/deepdive';
  //var resourceURL = protocol + '://localhost:8000/deepdive';
  var embedURL = resourceURL + '/bar/bar.min.js'; //URL of script embed. This is used as a fallback if document.currentScript is not available

  //Grab current script element to know where to inject bar
  var currentScript = document.currentScript || (function(){
      var scripts = document.getElementsByTagName("script");
      for (var i = scripts.length - 1; i >= 0; i--) {
         if (scripts[i].src.indexOf(embedURL) != -1) {
            return scripts[i];
         }
      }
   })();

  /**
   * Get query parameters for script tag
   **/
  var params = {
    baseballSubdomain: null,
    basketballSubdomain: null,
    footballSubdomain: null,
    brandHex: null
  };

  var queryString = currentScript.src.split('?')[1];
  if(typeof queryString === 'undefined'){
    //No params passed in
  }else{
      // TODO : Validate query params
      //Parse query string
      var queryParams = queryString.split('&');
      queryParams.forEach(function(item){
         var pair = item.split('=');
         switch(pair[0]){
            case 'baseballSubdomain':
                params.baseballSubdomain = decodeURIComponent(pair[1]);
            break;
            case 'basketballSubdomain':
                params.basketballSubdomain = decodeURIComponent(pair[1]);
            break;
            case 'footballSubdomain':
                params.footballSubdomain = decodeURIComponent(pair[1]);
            break;
            case 'brandHex':
                params.brandHex = '#' + decodeURIComponent(pair[1]);
            break;
         }
      })
  }

  /**
   * API config, used to organize lazy loaded resources
   **/
  var apiConfig = {
    //Frontend search lib
    fuse: {
      hasLoaded: false,
      isLoading: false,
      url: function(){
        return resourceURL + '/lib/search_teams_middlelayer.php';
      }
    },
    //JSON file for sports teams
    searchTeams: {
      hasLoaded: false,
      isLoading: false,
      url: function(){
        return resourceURL + '/lib/search_teams_middlelayer.php';
      }
    },
    //MLB Boxscores
    boxscoresMLB: {
      hasLoaded: false,
      isLoading: false,
      url: function(todayDate){
        return protocol + '://prod-homerunloyal-api.synapsys.us/league/trimmedBoxScores/' + todayDate;
      }
    },
    //NFL boxscores
    boxscoresNFL: {
      hasLoaded: false,
      isLoading: false,
      url: function(todayDate){
        return protocol + '://prod-touchdownloyal-api.synapsys.us/trimmedBoxScores/league/nfl/' + todayDate;
      }
    },
    //NCAAF boxscores
    boxscoresNCAAF: {
      hasLoaded: false,
      isLoading: false,
      url: function(todayDate){
        return protocol + '://prod-touchdownloyal-api.synapsys.us/trimmedBoxScores/league/fbs/' + todayDate;
      }
    },
    //NCAAF teams
    teamsNCAAF: {
      hasLoaded: false,
      isLoading: false,
      url: function(stateAbbrev){
        return protocol + '://prod-touchdownloyal-api.synapsys.us/landingPage/fbs/' + stateAbbrev;
      }
    },
    //NCAAM teams
    teamsNCAAM: {
      hasLoaded: false,
      isLoading: false,
      url: function(fullState){
        return protocol + '://prod-sports-api.synapsys.us/NBAHoops/call_controller.php?scope=ncaa&action=homepage&option=' + fullState;
      },
      res: null,
      sucess: null
    },
    //MLB post game reports for ticker
    tickerMLB: {
      hasLoaded: false,
      isLoading: false,
      url: function(stateAbbrev){
        return  protocol + '://prod-homerunloyal-ai.synapsys.us/recent-games/' + stateAbbrev;
      }
    },
    //Current geographical state of user's IP address
    getRemoteAddress: {
      hasLoaded: false,
      isLoading: false,
      url: function(){
        return protocol + '://w1.synapsys.us/listhuv/?action=get_remote_addr2';
      },
      res: null,
      success: null
    }
  };

  /**
   * Global time objects
   **/
  var easternTime = (function(){
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
      // abbrev = 'EST';
      abbrev = 'ET';
    }else{
      //Daylight Savings Time
      offset = -4;
      // abbrev = 'EDT';
      abbrev = 'ET';
    }

    return {
      offset: offset,
      tzAbbrev: abbrev
    };
  })();

  var dateObject = (function(offset, undefined){
    var today = new Date(new Date().getTime() + offset * 3600 * 1000);
    var month = today.getUTCMonth() + 1;
    var date = today.getUTCDate();

    var todayObject = {
      today: today,
      year: today.getUTCFullYear(),
      month: month.toString().length === 1 ? '0' + month : month,
      date: date.toString().length === 1 ? '0' + date : date
    };
    todayObject.dateInput = todayObject.year + '-' +  todayObject.month + '-' + todayObject.date;

    return todayObject;
  })(easternTime.offset);

  /**
   * Global variables
   **/
  var Bluebird; //Namespace for bluebird library

  var boxscoresInitialized = false; //Boolean to determine if boxscores loading has been initialized. Used for lazy loading of boxscores

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
  var path = window.location.pathname;
  var parts = domain.split('.');
  //Grab second level domain
  domain = parts.slice(-2).join('.');

  if (domain.includes('homerunloyal') || domain.includes('hoopsloyal') || domain.includes('touchdownloyal')) {
    var houseSite = true;
    var homerunDomain = "http://homerunloyal.com";
    var hoopsDomain = "http://hoopsloyal.com";
    var touchdownDomain = "http://touchdownloyal.com";
  }
  else if (domain.includes('homerunzone') || domain.includes('hoopszone') || domain.includes('touchdownzone')) {
    var houseSite = false;
    var partnerName = path.split('/').slice(1);
    partnerName = partnerName[0];
    var homerunDomain = "http://myhomerunzone.com/" + partnerName;
    var hoopsDomain = "http://myhoopszone.com/" + partnerName;
    var touchdownDomain = "http://www.mytouchdownzone.com/" + partnerName;
  }
  else {
    if (params.baseballSubdomain || params.basketballSubdomain || params.footballSubdomain) {
      if (params.baseballSubdomain == null) {params.baseballSubdomain == "baseball"}
      if (params.basketballSubdomain == null) {params.basketballSubdomain == "basketball"}
      if (params.footballSubdomain == null) {params.footballSubdomain == "football"}
      var houseSite = false;
      var homerunDomain = protocol + '://' + params.baseballSubdomain + '.' + domain;
      var hoopsDomain = protocol + '://' + params.basketballSubdomain + '.' + domain;
      var touchdownDomain = protocol + '://' + params.footballSubdomain + '.' + domain;
    }
    else {
      var houseSite = false;
      var homerunDomain = 'http://myhomerunzone.com/' + domain;
      var hoopsDomain = 'http://myhoopszone.com/' + domain;
      var touchdownDomain = 'http://www.mytouchdownzone.com/' + domain;
    }
  }

  var footballLeagueYear = 2016; //Year used by TDL sites for urls

  /**
   * Bootstrap functions
   **/
  function bootstrapApp(){
    var res = '<section class="ddb-menu"> <section class="ddb-mobile-layout"> <button id="ddb-mobile-menu" class="ddb-mobile-menu ddb-left ddb-brand-background"><div class="ddb-mobile-parbutton"> <i class="ddb-icon ddb-icon-bars"></i> SPORTS MENU</div> </button> <button id="ddb-mobile-search" class="ddb-mobile-menu ddb-right"><div class="ddb-mobile-parbutton"> <i class="ddb-icon"></i></div> </button><div id="ddb-mobile-dropdown" class="ddb-mobile-dropdown ddb-dropdown"><div class="ddb-mobile-dropdown-boxscores"> <button id="ddb-mobile-boxscores-left" class="ddb-boxscores-button ddb-left ddb-brand-boxscores-button"> <i class="ddb-icon ddb-icon-angle-left"></i> </button><div id="ddb-mobile-boxscores-frame" class="ddb-boxscores-frame"><ul id="ddb-mobile-boxscores" class="ddb-boxscores-content"><li id="ddb-mobile-boxscores-mlb"><div class="ddb-boxscores-content-category"> <span class="ddb-title">MLB</span></div></li><li id="ddb-mobile-boxscores-nfl"><div class="ddb-boxscores-content-category"> <span class="ddb-title">NFL</span></div></li><li id="ddb-mobile-boxscores-ncaaf"><div class="ddb-boxscores-content-category"> <span class="ddb-title">NCAAF</span></div></li></ul></div> <button id="ddb-mobile-boxscores-right" class="ddb-boxscores-button ddb-right ddb-blue ddb-brand-boxscores-button"> <i class="ddb-icon ddb-icon-angle-right"></i> </button></div><ul class="ddb-mobile-dropdown-list"><li class="ddb-mobile-dropdown-item"><div class="ddb-mobile-dropdown-tier1"> <i class="ddb-icon ddb-icon-baseball ddb-brand-text"></i> MLB <i class="ddb-icon ddb-toggle"></i></div><ul class="ddb-mobile-dropdown-tier2"><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-mlb-nav-news"> <i class="ddb-icon ddb-icon-news ddb-brand-text"></i> News </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-mlb-nav-standings"> <i class="ddb-icon ddb-icon-trophy ddb-brand-text"></i> Standings </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-mlb-nav-schedule"> <i class="ddb-icon ddb-icon-calendar ddb-brand-text"></i> Schedule </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-mlb-nav-top-lists"> <i class="ddb-icon ddb-icon-list ddb-brand-text"></i> Top Lists </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-mlb-nav-teams"> <i class="ddb-icon ddb-icon-team ddb-brand-text"></i> MLB Teams </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-mlb-nav-profile"> <i class="ddb-icon ddb-icon-profile ddb-brand-text"></i> MLB Profile </a></li></ul></li><li class="ddb-mobile-dropdown-item"><div class="ddb-mobile-dropdown-tier1"> <i class="ddb-icon ddb-icon-basketball ddb-brand-text"></i> NBA <i class="ddb-icon ddb-toggle"></i></div><ul class="ddb-mobile-dropdown-tier2"><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-nba-nav-most-wins"> <i class="ddb-icon ddb-icon-trophy ddb-brand-text"></i> Most Wins </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-nba-nav-most-turnovers"> <i class="ddb-icon ddb-icon-box-scores ddb-brand-text"></i> Most Turnovers </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-nba-nav-most-rebounds"> <i class="ddb-icon ddb-icon-dribbble ddb-brand-text"></i> Most Rebounds </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-nba-nav-most-steals"> <i class="ddb-icon ddb-icon-magic ddb-brand-text"></i> Most Steals </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-nba-nav-most-blocks"> <i class="ddb-icon ddb-icon-thumbs-o-down ddb-brand-text"></i> Most Blocks </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-nba-nav-most-assists"> <i class="ddb-icon ddb-icon-life-ring ddb-brand-text"></i> Most Assists </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-nba-nav-teams"> <i class="ddb-icon ddb-icon-team ddb-brand-text"></i> NBA Teams </a></li></ul></li><li class="ddb-mobile-dropdown-item"><div class="ddb-mobile-dropdown-tier1"> <i class="ddb-icon ddb-icon-basketball ddb-brand-text"></i> NCAA M <i class="ddb-icon ddb-toggle"></i></div><ul class="ddb-mobile-dropdown-tier2"><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-ncaam-nav-most-wins"> <i class="ddb-icon ddb-icon-trophy ddb-brand-text"></i> Most Wins </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-ncaam-nav-most-turnovers"> <i class="ddb-icon ddb-icon-box-scores ddb-brand-text"></i> Most Turnovers </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-ncaam-nav-most-rebounds"> <i class="ddb-icon ddb-icon-dribbble ddb-brand-text"></i> Most Rebounds </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-ncaam-nav-most-steals"> <i class="ddb-icon ddb-icon-magic ddb-brand-text"></i> Most Steals </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-ncaam-nav-most-blocks"> <i class="ddb-icon ddb-icon-thumbs-o-down ddb-brand-text"></i> Most Blocks </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-ncaam-nav-most-assists"> <i class="ddb-icon ddb-icon-life-ring ddb-brand-text"></i> Most Assists </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-ncaam-nav-teams"> <i class="ddb-icon ddb-icon-team ddb-brand-text"></i> NCAA M Teams </a></li></ul></li><li class="ddb-mobile-dropdown-item"><div class="ddb-mobile-dropdown-tier1"> <i class="ddb-icon ddb-icon-football ddb-brand-text"></i> NFL <i class="ddb-icon ddb-toggle"></i></div><ul class="ddb-mobile-dropdown-tier2"><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-nfl-nav-news"> <i class="ddb-icon ddb-icon-news ddb-brand-text"></i> News </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-nfl-nav-standings"> <i class="ddb-icon ddb-icon-trophy ddb-brand-text"></i> Standings </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-nfl-nav-schedule"> <i class="ddb-icon ddb-icon-calendar ddb-brand-text"></i> Schedule </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-nfl-nav-top-lists"> <i class="ddb-icon ddb-icon-list ddb-brand-text"></i> Top Lists </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-nfl-nav-teams"> <i class="ddb-icon ddb-icon-team ddb-brand-text"></i> NFL Teams </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-nfl-nav-profile"> <i class="ddb-icon ddb-icon-profile ddb-brand-text"></i> NFL Profile </a></li></ul></li><li class="ddb-mobile-dropdown-item"><div class="ddb-mobile-dropdown-tier1"> <i class="ddb-icon ddb-icon-football ddb-brand-text"></i> NCAA F <i class="ddb-icon ddb-toggle"></i></div><ul class="ddb-mobile-dropdown-tier2"><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-ncaaf-nav-news"> <i class="ddb-icon ddb-icon-news ddb-brand-text"></i> News </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-ncaaf-nav-standings"> <i class="ddb-icon ddb-icon-trophy ddb-brand-text"></i> Standings </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-ncaaf-nav-schedule"> <i class="ddb-icon ddb-icon-calendar ddb-brand-text"></i> Schedule </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-ncaaf-nav-top-lists"> <i class="ddb-icon ddb-icon-list ddb-brand-text"></i> Top Lists </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-ncaaf-nav-teams"> <i class="ddb-icon ddb-icon-team ddb-brand-text"></i> NCAA F Teams </a></li><li class="ddb-mobile-dropdown-tier2-item"> <a target="_blank" class="ddb-ncaaf-nav-profile"> <i class="ddb-icon ddb-icon-profile ddb-brand-text"></i> NCAA F Profile </a></li></ul></li></ul></div><div id="ddb-mobile-search-bar" class="ddb-mobile-dropdown ddb-dropdown"><div class="ddb-mobile-dropdown-search"> <input id="ddb-search-mobile" placeholder="Search any ncaa, nfl, mlb, nba team.."> <i class="ddb-icon ddb-icon-search ddb-brand-text"></i></div><ul id="ddb-search-mobile-dropdown" class="ddb-search-dropdown"></ul></div> </section><ul class="ddb-menu-nav"><li id="ddb-dropdown-boxscores"><div id="ddb-dropdown-boxscores-button" class="ddb-blue ddb-brand-background"><div class="ddb-parbutton"> <i class="ddb-icon ddb-icon-bars"></i> Scoreboard</div></div><div id="ddb-boxscores-dropdown" class="ddb-menu-dropdown ddb-dropdown"><div class="ddb-menu-dropdown-container"><div id="ddb-boxscores-events-container" class="ddb-menu-dropdown-events"> <button id="ddb-boxscores-events-button" class="ddb-menu-dropdown-events-button ddb-brand-boxscores-filter"> Sports <i class="ddb-icon ddb-icon-angle-right"></i> </button><div class="ddb-menu-dropdown-events-options"><div class="ddb-menu-dropdown-events-options-title"> Select Which Scoreboard to View</div><ul id="ddb-boxscores-options" class="ddb-menu-dropdown-events-options-list"><li id="ddb-boxscores-options-all" class="ddb-active ddb-brand-boxscores-option"> ALL</li><li id="ddb-boxscores-options-mlb" class="ddb-brand-boxscores-option"> MLB</li><li id="ddb-boxscores-options-nfl" class="ddb-brand-boxscores-option"> NFL</li><li id="ddb-boxscores-options-ncaaf" class="ddb-brand-boxscores-option"> NCAAF</li></ul></div></div><div class="ddb-menu-dropdown-boxscores"> <button id="ddb-desktop-boxscores-left" class="ddb-boxscores-button ddb-left ddb-brand-boxscores-button"> <i class="ddb-icon ddb-icon-angle-left"></i> </button><div id="ddb-desktop-boxscores-frame" class="ddb-boxscores-frame"><ul id="ddb-desktop-boxscores" class="ddb-boxscores-content"><li id="ddb-desktop-boxscores-mlb"><div class="ddb-boxscores-content-category"> <span class="ddb-title">MLB</span></div></li><li id="ddb-desktop-boxscores-nfl"><div id="ddb-desktop-boxscores-nfl" class="ddb-boxscores-content-category"> <span class="ddb-title">NFL</span></div></li><li id="ddb-desktop-boxscores-ncaaf"><div class="ddb-boxscores-content-category"> <span class="ddb-title">NCAA F</span></div></li></ul></div> <button id="ddb-desktop-boxscores-right" class="ddb-boxscores-button ddb-right ddb-blue ddb-brand-boxscores-button"> <i class="ddb-icon ddb-icon-angle-right"></i> </button></div></div></div></li><li id="ddb-dropdown-mlb" class="ddb-menu-nav-item ddb-dynamic-item"> MLB</li><li id="ddb-dropdown-nba" class="ddb-menu-nav-item ddb-dynamic-item"> NBA</li><li id="ddb-dropdown-ncaam" class="ddb-menu-nav-item ddb-dynamic-item"> NCAA M</li><li id="ddb-dropdown-nfl" class="ddb-menu-nav-item ddb-dynamic-item"> NFL</li><li id="ddb-dropdown-ncaaf" class="ddb-menu-nav-item ddb-dynamic-item"> NCAA F</li></ul><div class="ddb-menu-nav-dynamic ddb-dynamic-dropdown"><div class="ddb-menu-dropdown-container"> <section id="ddb-dynamic-nav" class="ddb-menu-dropdown-nav"></section><div class="ddb-menu-dropdown-content"> <section id="ddb-dynamic-links" class="ddb-menu-dropdown-links"></section></div></div></div><div class="ddb-menu-options"> <button id="ddb-small-desktop-search" class="ddb-menu-search"> <i class="ddb-icon ddb-icon-search"></i> </button><div class="ddb-menu-search-large"><div class="ddb-menu-search-large-content"> <input id="ddb-search-desktop" placeholder="Search any ncaa, nfl, mlb, nba team.."><ul id="ddb-search-desktop-dropdown" class="ddb-search-dropdown"></ul> <i class="ddb-icon ddb-icon-search ddb-brand-text"></i></div></div></div><div id="ddb-small-desktop-search-bar" class="ddb-menu-search-dropdown ddb-dropdown"><div class="ddb-mobile-dropdown-search"> <input id="ddb-small-desktop-search-input" placeholder="Search any ncaa, nfl, mlb, nba team.."> <i class="ddb-icon ddb-icon-search ddb-brand-text"></i></div><ul id="ddb-small-desktop-search-dropdown" class="ddb-search-dropdown"></ul></div> </section>';
    var template = document.createElement('section');
    template.className = 'ddb-container';
    template.innerHTML = res;

    var parentNode = currentScript.parentNode;
    //Inject HTML
    parentNode.insertBefore(template, currentScript);
    //Load script dependencies
    loadScriptDependencies();
    //Continue building Bar
    getUserLocation();
    //bootstrapBoxscores() is within loadScriptDependencies() function
    //bootstrapSearch() is within loadScriptDependencies() function
    //bootstrapMobileMenu(); is within loadScriptDependencies() function
    bootstrapMobileSearch();
    bootstrapSmallDesktopSearch();
    //bootstrapDesktopBoxscores(); is within loadScriptDependencies() function

    bootstrapStaticCollegeFootball();
    bootstrapStaticCollegeBasketball();
    bootstrapDynamicDropdown();
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

        if(boxscoresInitialized === false){
            bootstrapBoxscores();
            boxscoresInitialized = true;
        }

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

        if(boxscoresInitialized === false){
            bootstrapBoxscores();
            boxscoresInitialized = true;
        }

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

  var bootstrapStaticCollegeBasketball = function(){
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
  }
  //Bootstrap college basketball logic that has dependencies
  var bootstrapDynamicCollegeBasketball = function(state, userLocationFound){
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
        showing NCAA Basketball conferences located in <i class="ddb-icon-map-marker ddb-brand-text"></i> <span id="ncaam-state-map-marker" class="ddb-bold">` + fullState + `</span>
      </h3>
    `;

    // var ncaamLeagues = document.getElementById('ncaam-leagues');
    // var ncaamAllConferences = document.getElementById('ncaam-all-conferences');
    // ncaamAllConferences.href = hoopsDomain + '/ncaa';

    // var apiString = protocol + '://prod-sports-api.synapsys.us/NBAHoops/call_controller.php?scope=ncaa&action=homepage&option=' + fullStateEncode;
    var apiString = apiConfig.teamsNCAAM.url(fullStateEncode);
    apiConfig.teamsNCAAM.isLoading = true;

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
          <a target="_blank" href="` + hoopsDomain + `/NCAA" class="ddb-menu-dropdown-all ddb-brand-all-conferences">
            SEE ALL CONFERENCES
          </a>
        `;
        //Save links innerHTML
        ncaamDropdownElements.links.innerHTML = ncaamLinks;

        apiConfig.teamsNCAAM.res = processedData;
        apiConfig.teamsNCAAM.isLoading = false;
        apiConfig.teamsNCAAM.hasLoaded = true;
        apiConfig.teamsNCAAM.success = true;

        var navHTML = `
          <li class="ddb-brand-menu-hover">
            <a target="_blank" href="` + hoopsDomain + `/NCAA/team/College-Basketball-teams-with-the-most-wins/list/29/1">
              <i class="ddb-icon ddb-icon-trophy ddb-brand-text"></i>
              Most Wins
            </a>
          </li>
          <li class="ddb-brand-menu-hover">
            <a target="_blank" href="` + hoopsDomain + `/NCAA/team/College-Basketball-teams-with-the-most-turnovers/list/40/1">
              <i class="ddb-icon ddb-icon-box-scores ddb-brand-text"></i>
              Most Turnovers
            </a>
          </li>
          <li class="ddb-brand-menu-hover">
            <a target="_blank" href="` + hoopsDomain + `/NCAA/team/College-Basketball-teams-with-the-most-rebounds/list/39/1">
              <i class="ddb-icon ddb-icon-dribbble ddb-brand-text"></i>
              Most Rebounds
            </a>
          </li>
          <li class="ddb-brand-menu-hover">
            <a target="_blank" href="` + hoopsDomain + `/NCAA/team/College-Basketball-teams-with-the-most-steals/list/43/1">
              <i class="ddb-icon ddb-icon-magic ddb-brand-text"></i>
              Most Steals
            </a>
          </li>
          <li class="ddb-brand-menu-hover">
            <a target="_blank" href="` + hoopsDomain + `/NCAA/team/College-Basketball-teams-with-the-most-blocks-per-game/list/55/1">
              <i class="ddb-icon ddb-icon-thumbs-o-down ddb-brand-text"></i>
              Most Blocks
            </a>
          </li>
          <li class="ddb-brand-menu-hover">
            <a target="_blank" href="` + hoopsDomain + `/NCAA/team/College-Basketball-teams-with-the-most-assists-per-game/list/51/1">
              <i class="ddb-icon ddb-icon-life-ring ddb-brand-text"></i>
              Most Assists
            </a>
          </li>
        `;

        ncaamDropdownElements.nav.innerHTML = navHTML;

        //If last dropdown that was hovered (or is currently hovered) is ncaam insert into dynamic dropdown
        //This is so if the user is currently hovering over ncaam (before the dropdown data is loaded the data will insert)
        var dynamicDropdown = document.getElementsByClassName('ddb-dynamic-dropdown')[0];
        if(dynamicDropdown !== null && dynamicDropdown.id === 'ddb-dynamic-ncaam'){
          var dynamicNav = document.getElementById('ddb-dynamic-nav'); //Nav of dynamic dropdown
          var dynamicLinks = document.getElementById('ddb-dynamic-links'); //Links of dynamic dropdown
          clearInnerHTML(dynamicNav);
          clearInnerHTML(dynamicLinks);
          dynamicNav.appendChild(ncaamDropdownElements.nav);
          dynamicLinks.appendChild(ncaamDropdownElements.links);
        }

      }else if(xhttp.readyState === 4 && xhttp.status !== 200){
        //Error
        // console.log('NCAA M API ERROR');
        apiConfig.teamsNCAAM.res = false;
        apiConfig.teamsNCAAM.isLoading = false;
        apiConfig.teamsNCAAM.hasLoaded = true;
        apiConfig.teamsNCAAM.success = false;
      }
    };
    xhttp.open('GET', apiString, true);
    xhttp.send();

  }

  //Bootstrap college football logic that has no dependencies
  var bootstrapStaticCollegeFootball = function(){
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
  }
  //Bootstrap college football logic that has dependencies
  var bootstrapDynamicCollegeFootball = function(state, userLocationFound){
    //Convert state to full form
    var fullState = stateAbbrevToFull(state);

    var ncaafLinks = `
      <h1 id="ncaaf-title" class="ddb-menu-dropdown-links-title">
        NCAA Football Conferences ` + (userLocationFound ? 'in your area': '') + `
      </h1>
      <h3 class="ddb-menu-dropdown-links-subtitle">
        showing NCAA Football conferences located in <i class="ddb-icon-map-marker ddb-brand-text"></i> <span id="ncaaf-state-map-marker" class="ddb-bold">` + fullState + `</span>
      </h3>
    `;

    var apiString = apiConfig.teamsNCAAF.url(state);
    apiConfig.teamsNCAAF.isLoading = true;

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
          <a target="_blank" href="` + touchdownDomain + `/ncaaf/pick-a-team" class="ddb-menu-dropdown-all ddb-brand-all-conferences">
            SEE ALL CONFERENCES
          </a>
        `;
        //Save links innerHTML
        ncaafDropdownElements.links.innerHTML = ncaafLinks;

        apiConfig.teamsNCAAF.res = processedData;
        apiConfig.teamsNCAAF.isLoading = false;
        apiConfig.teamsNCAAF.hasLoaded = true;
        apiConfig.teamsNCAAF.sucess = true;

        var navHTML = `
          <li class="ddb-brand-menu-hover">
            <a target="_blank" href="` + touchdownDomain + `/ncaaf">
              <i class="ddb-icon ddb-icon-news ddb-brand-text"></i>
              News
            </a>
          </li>
          <li class="ddb-brand-menu-hover">
            <a target="_blank" href="` + touchdownDomain + `/ncaaf/standings">
              <i class="ddb-icon ddb-icon-trophy ddb-brand-text"></i>
              Standings
            </a>
          </li>
          <li class="ddb-brand-menu-hover">
            <a target="_blank" href="` + touchdownDomain + `/ncaaf/schedules/league/` + footballLeagueYear + `/1">
              <i class="ddb-icon ddb-icon-calendar ddb-brand-text"></i>
              Schedule
            </a>
          </li>
          <li class="ddb-brand-menu-hover">
            <a target="_blank" href="` + touchdownDomain + `/ncaaf/list-of-lists/league/` + footballLeagueYear + `/10/1">
              <i class="ddb-icon ddb-icon-list ddb-brand-text"></i>
              Top Lists
            </a>
          </li>
          <li class="ddb-brand-menu-hover">
            <a target="_blank" href="` + touchdownDomain + `/ncaaf/league">
              <i class="ddb-icon ddb-icon-profile ddb-brand-text"></i>
              NCAA F Profile
            </a>
          </li>
        `;

        ncaafDropdownElements.nav.innerHTML = navHTML;

        var dynamicDropdown = document.getElementsByClassName('ddb-dynamic-dropdown')[0];
        if(dynamicDropdown !== null && dynamicDropdown.id === 'ddb-dynamic-ncaaf'){
          var dynamicNav = document.getElementById('ddb-dynamic-nav'); //Nav of dynamic dropdown
          var dynamicLinks = document.getElementById('ddb-dynamic-links'); //Links of dynamic dropdown
          clearInnerHTML(dynamicNav);
          clearInnerHTML(dynamicLinks);
          dynamicNav.appendChild(ncaafDropdownElements.nav);
          dynamicLinks.appendChild(ncaafDropdownElements.links);
        }

      }else if(xhttp.readyState === 4 && xhttp.status !== 200){
        //Error
        // console.log('NCAA F API ERROR');
        apiConfig.teamsNCAAF.res = false;
        apiConfig.teamsNCAAF.isLoading = false;
        apiConfig.teamsNCAAF.hasLoaded = true;
        apiConfig.teamsNCAAF.sucess = true;
      }
    };
    xhttp.open('GET', apiString, true);
    xhttp.send();
  }

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
      if (houseSite == true) {
        return hoopsDomain + '/NBA/team/' + data.fullName + '/' + data.teamId;
      }
      else {
        return hoopsDomain + '/NBA/t/' + data.fullName + '/' + data.teamId;
      }
    }

    // var nbaEastern = document.getElementById('nba-eastern');
    // var nbaWestern = document.getElementById('nba-western');

    var linksEl = document.createElement('section');

    var easternHTML = `
      <table class="ddb-menu-dropdown-table ddb-col-3">
        <thead>
          <tr>
            <td class="ddb-brand-text">
              ATLANTIC
            </td>
            <td class="ddb-brand-text">
              CENTRAL
            </td>
            <td class="ddb-brand-text">
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
            <td class="ddb-brand-text">
              PACIFIC
            </td>
            <td class="ddb-brand-text">
              SOUTHWEST
            </td>
            <td class="ddb-brand-text">
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
            <a target="_blank" href="` + buildLink(atlanticDivision[index]) + `">` + atlanticDivision[index].shortName + `</a>
          </td>
          <td>
            <a target="_blank" href="` + buildLink(centralDivision[index]) + `">` + centralDivision[index].shortName + `</a>
          </td>
          <td>
            <a target="_blank" href="` + buildLink(southeastDivision[index]) + `">` + southeastDivision[index].shortName + `</a>
          </td>
        </tr>
      `;

      westernHTML += `
        <tr>
          <td>
            <a target="_blank" href="` + buildLink(pacificDivision[index]) + `">` + pacificDivision[index].shortName + `</a>
          </td>
          <td>
            <a target="_blank" href="` + buildLink(southwestDivision[index]) + `">` + southwestDivision[index].shortName + `</a>
          </td>
          <td>
            <a target="_blank" href="` + buildLink(northwestDivision[index]) + `">` + northwestDivision[index].shortName + `</a>
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
      <li class="ddb-brand-menu-hover">
        <a target="_blank" href="` + hoopsDomain + `/NBA/team/NBA-teams-with-the-most-wins/list/1/1">
          <i class="ddb-icon ddb-icon-trophy ddb-brand-text"></i>
          Most Wins
        </a>
      </li>
      <li class="ddb-brand-menu-hover">
        <a target="_blank" href="` + hoopsDomain + `/NBA/team/NBA-teams-with-the-most-turnovers/list/12/1">
          <i class="ddb-icon ddb-icon-box-scores ddb-brand-text"></i>
          Most Turnovers
        </a>
      </li>
      <li class="ddb-brand-menu-hover">
        <a target="_blank" href="` + hoopsDomain + `/NBA/team/NBA-teams-with-the-most-rebounds/list/11/1">
          <i class="ddb-icon ddb-icon-dribbble ddb-brand-text"></i>
          Most Rebounds
        </a>
      </li>
      <li class="ddb-brand-menu-hover">
        <a target="_blank" href="` + hoopsDomain + `/NBA/team/NBA-teams-with-the-most-steals/list/15/1'">
          <i class="ddb-icon ddb-icon-magic ddb-brand-text"></i>
          Most Steals
        </a>
      </li>
      <li class="ddb-brand-menu-hover">
        <a target="_blank" href="` + hoopsDomain + `/NBA/team/NBA-teams-with-the-most-blocks/list/14/1">
          <i class="ddb-icon ddb-icon-thumbs-o-down ddb-brand-text"></i>
          Most Blocks
        </a>
      </li>
      <li class="ddb-brand-menu-hover">
        <a target="_blank" href="` + hoopsDomain + `/NBA/team/NBA-teams-with-the-most-assists-per-game/list/23/1">
          <i class="ddb-icon ddb-icon-life-ring ddb-brand-text"></i>
          Most Assists
        </a>
      </li>
    `;


    return {
      nav: navEl,
      links: linksEl
    }
  }

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
      if(params.baseballSubdomain !== null){
        return homerunDomain + '/team/' + data.fullName + '/' + data.teamId;
      }else{
        if (houseSite == true) {
          return homerunDomain + '/team/' + data.fullName + '/' + data.teamId;
        }
        else {
          return homerunDomain + '/t/' + data.fullName + '/' + data.teamId;
        }
      }
    }

    // var mlbAmerican = document.getElementById('mlb-american');
    // var mlbNational = document.getElementById('mlb-national');
    var linksEl = document.createElement('section');

    var americanHTML = `
      <table class="ddb-menu-dropdown-table ddb-col-3">
        <thead>
          <tr>
            <td class="ddb-brand-text">
              AL Central
            </td>
            <td class="ddb-brand-text">
              AL East
            </td>
            <td class="ddb-brand-text">
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
            <td class="ddb-brand-text">
              NL Central
            </td>
            <td class="ddb-brand-text">
              NL East
            </td>
            <td class="ddb-brand-text">
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
            <a target="_blank" href="` + buildLink(alCentralDivision[index]) + `">` + alCentralDivision[index].shortName + `</a>
          </td>
          <td>
            <a target="_blank" href="` + buildLink(alEastDivison[index]) + `">` + alEastDivison[index].shortName + `</a>
          </td>
          <td>
            <a target="_blank" href="` + buildLink(alWestDivision[index]) + `">` + alWestDivision[index].shortName + `</a>
          </td>
        </tr>
      `;

      nationalHTML += `
        <tr>
          <td>
            <a target="_blank" href="` + buildLink(nlCentralDivision[index]) + `">` + nlCentralDivision[index].shortName + `</a>
          </td>
          <td>
            <a target="_blank" href="` + buildLink(nlEastDivision[index]) + `">` + nlEastDivision[index].shortName + `</a>
          </td>
          <td>
            <a target="_blank" href="` + buildLink(nlWestDivision[index]) + `">` + nlWestDivision[index].shortName + `</a>
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
        <li class="ddb-brand-menu-hover">
          <a target="_blank" href="` + homerunDomain + `">
            <i class="ddb-icon ddb-icon-news ddb-brand-text"></i>
            News
          </a>
        </li>
        <li class="ddb-brand-menu-hover">
          <a target="_blank" href="` + homerunDomain + `/standings">
            <i class="ddb-icon ddb-icon-trophy ddb-brand-text"></i>
            Standings
          </a>
        </li>
        <li class="ddb-brand-menu-hover">
          <a target="_blank" href="` + homerunDomain + `/schedules/mlb/1">
            <i class="ddb-icon ddb-icon-calendar ddb-brand-text"></i>
            Schedule
          </a>
        </li>
        <li class="ddb-brand-menu-hover">
          <a target="_blank" href="` + homerunDomain + `/list-of-lists/league/10/1">
            <i class="ddb-icon ddb-icon-list ddb-brand-text"></i>
            Top Lists
          </a>
        </li>
        <li class="ddb-brand-menu-hover">
          <a target="_blank" href="` + homerunDomain + `/mlb">
            <i class="ddb-icon ddb-icon-profile ddb-brand-text"></i>
            MLB Profile
          </a>
        </li>
      `;

      return {
        nav: navEl,
        links: linksEl
      }

  };

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
      if(params.footballSubdomain !== null){
        return touchdownDomain + '/nfl/team/' + data.fullName + '/' + data.teamId;
      }else{
        if (houseSite == true) {
          return touchdownDomain + '/nfl/team/' + data.fullName + '/' + data.teamId;
        }
        else {
          return touchdownDomain + '/nfl/t/' + data.fullName + '/' + data.teamId;
        }
      }
    }

    var linksEl = document.createElement('section');

    var afcHTML = `
      <table class="ddb-menu-dropdown-table ddb-col-4">
        <thead>
          <tr>
            <td class="ddb-brand-text">
              AFC North
            </td>
            <td class="ddb-brand-text">
              AFC East
            </td>
            <td class="ddb-brand-text">
              AFC South
            </td>
            <td class="ddb-brand-text">
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
          <td class="ddb-brand-text">
            NFC North
          </td>
          <td class="ddb-brand-text">
            NFC East
          </td>
          <td class="ddb-brand-text">
            NFC South
          </td>
          <td class="ddb-brand-text">
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
            <a target="_blank" href="` + buildLink(afcNorth[index]) + `">` + afcNorth[index].shortName + `</a>
          </td>
          <td>
            <a target="_blank" href="` + buildLink(afcEast[index]) + `">` + afcEast[index].shortName + `</a>
          </td>
          <td>
            <a target="_blank" href="` + buildLink(afcSouth[index]) + `">` + afcSouth[index].shortName + `</a>
          </td>
          <td>
            <a target="_blank" href="` + buildLink(afcWest[index]) + `">` + afcWest[index].shortName + `</a>
          </td>
        </tr>
      `;
      nfcHTML += `
        <tr>
          <td>
            <a target="_blank" href="` + buildLink(nfcNorth[index]) + `">` + nfcNorth[index].shortName + `</a>
          </td>
          <td>
            <a target="_blank" href="` + buildLink(nfcEast[index]) + `">` + nfcEast[index].shortName + `</a>
          </td>
          <td>
            <a target="_blank" href="` + buildLink(nfcSouth[index]) + `">` + nfcSouth[index].shortName + `</a>
          </td>
          <td>
            <a target="_blank" href="` + buildLink(nfcWest[index]) + `">` + nfcWest[index].shortName + `</a>
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
        item.href = touchdownDomain + '/nfl/list-of-lists/league/' + footballLeagueYear +  '/10/1';
      });
      [].forEach.call(navTeams, function(item){
        item.href = touchdownDomain + '/nfl/pick-a-team';
      });
      [].forEach.call(navProfile, function(item){
        item.href = touchdownDomain + '/nfl/league';
      });

    var navEl = document.createElement('ul');
    navEl.innerHTML = `
      <li class="ddb-brand-menu-hover">
        <a target="_blank" href="` + touchdownDomain + `/nfl">
          <i class="ddb-icon ddb-icon-news ddb-brand-text"></i>
          News
        </a>
      </li>
      <li class="ddb-brand-menu-hover">
        <a target="_blank" href="` + touchdownDomain + `/nfl/standings">
          <i class="ddb-icon ddb-icon-trophy ddb-brand-text"></i>
          Standings
        </a>
      </li>
      <li class="ddb-brand-menu-hover">
        <a target="_blank" href="` + touchdownDomain + `/nfl/schedules/league/` + footballLeagueYear + `/1">
          <i class="ddb-icon ddb-icon-calendar ddb-brand-text"></i>
          Schedule
        </a>
      </li>
      <li class="ddb-brand-menu-hover">
        <a target="_blank" href="` + touchdownDomain + `/nfl/list-of-lists/league/` + footballLeagueYear + `/10/1">
          <i class="ddb-icon ddb-icon-list ddb-brand-text"></i>
          Top Lists
        </a>
      </li>
      <li class="ddb-brand-menu-hover">
        <a target="_blank" href="` + touchdownDomain + `/nfl/league">
          <i class="ddb-icon ddb-icon-profile ddb-brand-text"></i>
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

    // var apiString = protocol + '://prod-homerunloyal-api.synapsys.us/league/boxScores/' + todayInput;
    var apiString = apiConfig.boxscoresMLB.url(todayInput);
    // var apiString2 = protocol + '://prod-touchdownloyal-api.synapsys.us/boxScores/league/nfl/' + todayInput;
    var apiString2 = apiConfig.boxscoresNFL.url(todayInput);
    // var apiString3 = protocol + '://prod-touchdownloyal-api.synapsys.us/boxScores/league/fbs/' + todayInput;
    var apiString3 = apiConfig.boxscoresNCAAF.url(todayInput);

    var mobileBoxscores = document.getElementById('ddb-mobile-boxscores');
    var desktopBoxscores = document.getElementById('ddb-desktop-boxscores');

    var mobileBoxscoresFrame = document.getElementById('ddb-mobile-boxscores-frame');
    var desktopBoxscoresFrame = document.getElementById('ddb-desktop-boxscores-frame');

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
      mlbMax = 0,
      nflMax = 0,
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
      //Check status of left and right carousel buttons
      checkRightDesktopButton();
      checkLeftDesktopButton();
    })
    var eventsOptions = document.getElementById('ddb-boxscores-options');
    [].forEach.call(eventsOptions.childNodes, function(item){
      item.addEventListener('click', function(){
        var id = this.id;
        //Determine if data is loaded to allow/disallow click
        switch(id){
          case 'ddb-boxscores-options-mlb':
            desktopBoxscoresIndex = 0;
            desktopBoxscores.style.left = 0;
            desktopBoxscoresMLB.style.display = 'inline-block';
            desktopBoxscoresNFL.style.display = 'none';
            desktopBoxscoresNCAAF.style.display = 'none';
            desktopBoxscoresSelected = 'mlb';
          break;
          case 'ddb-boxscores-options-nfl':
            desktopBoxscoresIndex = 0;
            desktopBoxscores.style.left = 0;
            desktopBoxscoresMLB.style.display = 'none';
            desktopBoxscoresNFL.style.display = 'inline-block';
            desktopBoxscoresNCAAF.style.display = 'none';
            desktopBoxscoresSelected = 'nfl';
          break;
          case 'ddb-boxscores-options-ncaaf':
            desktopBoxscoresIndex = 0;
            desktopBoxscores.style.left = 0;
            desktopBoxscoresMLB.style.display = 'none';
            desktopBoxscoresNFL.style.display = 'none';
            desktopBoxscoresNCAAF.style.display = 'inline-block';
            desktopBoxscoresSelected = 'ncaaf';
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

        // if(hasClass(leftDesktopButton, 'ddb-blue')){
        //   removeClass(leftDesktopButton, 'ddb-blue');
        // }
        // if(!hasClass(rightDesktopButton, 'ddb-blue')){
        //   addClass(rightDesktopButton, 'ddb-blue');
        // }

        //Check status of left and right carousel buttons
        checkRightDesktopButton();
        checkLeftDesktopButton();
      })
    })

    //Check to see if desktop boxscores buttons should be enabled or disabled
    var checkRightDesktopButton = function(){
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

      var frameWidth = desktopBoxscoresFrame.offsetWidth;
      var boxscoresPixelLeft = ((desktopMax) - (desktopBoxscoresIndex)) * 100; //How many pixels are left to scroll through (max - currentIndex) * (width of boxscore)
      var whitespaceLeft = frameWidth - boxscoresPixelLeft;// How much whitespace is between the last item in boxscores and end of frame

      //Add class to left button if not at beggining of list and left button does not have existing class
      if(desktopBoxscoresIndex !== 0 && !hasClass(leftDesktopButton, 'ddb-blue')){
        addClass(leftDesktopButton, 'ddb-blue');
      }

      if(whitespaceLeft >= 0){
        removeClass(rightDesktopButton, 'ddb-blue');
      }
    }
    var canClickRightDesktopButton = function(){
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

      var frameWidth = desktopBoxscoresFrame.offsetWidth;
      var boxscoresPixelLeft = ((desktopMax) - (desktopBoxscoresIndex)) * 100; //How many pixels are left to scroll through (max - currentIndex) * (width of boxscore)
      var whitespaceLeft = frameWidth - boxscoresPixelLeft;// How much whitespace is between the last item in boxscores and end of frame

      if(whitespaceLeft >= 0){
        return false;
      }else{
        return true;
      }
    }

    var checkLeftDesktopButton = function(){
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
      var frameWidth = desktopBoxscoresFrame.offsetWidth;
      var boxscoresPixelLeft = ((desktopMax) - desktopBoxscoresIndex) * 100; //How many pixels are left to scroll through (max - currentIndex) * (width of boxscore)
      var whitespaceLeft = frameWidth - boxscoresPixelLeft;// How much whitespace is between the last item in boxscores and end of frame

      //Add class to right button if not at end of list and right button doesnt not have existing class
      if(whitespaceLeft < 0 && !hasClass(rightDesktopButton, 'ddb-blue')){
        addClass(rightDesktopButton, 'ddb-blue');
      }

      if(desktopBoxscoresIndex === 0 && hasClass(leftDesktopButton, 'ddb-blue')){
        removeClass(leftDesktopButton, 'ddb-blue');
      }
    }
    var canClickLeftDesktopButton = function(){
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

      if(desktopBoxscoresIndex === 0){
        return false;
      }else{
        return true;
      }
    }

    //Check to see if mobile desktop boxscores buttons should be enabled or disabled
    var checkRightMobileButton = function(){
      var frameWidth = mobileBoxscoresFrame.offsetWidth;
      var boxscoresPixelLeft = ((totalMax) - (mobileBoxscoresIndex)) * 100; //How many pixels are left to scroll through (max - currentIndex) * (width of boxscore)
      var whitespaceLeft = frameWidth - boxscoresPixelLeft;// How much whitespace is between the last item in boxscores and end of frame

      //Add class to left button if not at beggining of list and left button does not have existing class
      if(mobileBoxscoresIndex !== 0 && !hasClass(leftMobileButton, 'ddb-blue')){
        addClass(leftMobileButton, 'ddb-blue');
      }

      if(whitespaceLeft >= 0){
        removeClass(rightMobileButton, 'ddb-blue');
      }
    }
    var canClickRightMobileButton = function(){
      var frameWidth = mobileBoxscoresFrame.offsetWidth;
      var boxscoresPixelLeft = ((totalMax) - (mobileBoxscoresIndex)) * 100; //How many pixels are left to scroll through (max - currentIndex) * (width of boxscore)
      var whitespaceLeft = frameWidth - boxscoresPixelLeft;// How much whitespace is between the last item in boxscores and end of frame

      if(whitespaceLeft >= 0){
        return false;
      }else{
        return true;
      }
    }

    var checkLeftMobileButton = function(){
      var frameWidth = mobileBoxscoresFrame.offsetWidth;
      var boxscoresPixelLeft = ((totalMax) - mobileBoxscoresIndex) * 100; //How many pixels are left to scroll through (max - currentIndex) * (width of boxscore)
      var whitespaceLeft = frameWidth - boxscoresPixelLeft;// How much whitespace is between the last item in boxscores and end of frame

      //Add class to right button if not at end of list and right button doesnt not have existing class
      if(whitespaceLeft < 0 && !hasClass(rightMobileButton, 'ddb-blue')){
        addClass(rightMobileButton, 'ddb-blue');
      }

      if(mobileBoxscoresIndex === 0 && hasClass(leftMobileButton, 'ddb-blue')){
        removeClass(leftMobileButton, 'ddb-blue');
      }
    }
    var canClickLeftMobileButton = function(){
      if(mobileBoxscoresIndex === 0){
        return false;
      }else{
        return true;
      }
    }

    var mobileBoxscoresIndex = 0;
    var desktopBoxscoresIndex = 0;

    var bootstapBoxscoresButtons = function(){
      //Event when mobile boxscores left button is clicked
      var moveMobileLeft = function(){
        var canClick = canClickLeftMobileButton();

        if(canClick){
          mobileBoxscoresIndex--;
          mobileBoxscores.style.left = (-100 + ((mobileBoxscoresIndex - 1) * -100)) + 'px';
          //Check to activate/disable button
          checkLeftMobileButton();
        }
      }
      //Event when mobile boxscores right button is clicked
      var moveMobileRight = function(){

        var canClick = canClickRightMobileButton();

        if(canClick){
          mobileBoxscoresIndex++;
          mobileBoxscores.style.left = (-100 + ((mobileBoxscoresIndex - 1) * -100)) + 'px';
          //Check to activate/disable button
          checkRightMobileButton();
        }
      }
      //Event when desktop boxscores left button is clicked
      var moveDesktopLeft = function(){

        var canClick = canClickLeftDesktopButton();

        if(canClick){
          desktopBoxscoresIndex--;
          desktopBoxscores.style.left = (-100 + ((desktopBoxscoresIndex - 1) * -100)) + 'px';
          //Check to activate/disable button
          checkLeftDesktopButton();
        }
      }
      //Event when desktop boxscores right button is clicked
      var moveDesktopRight = function(){

        var canClick = canClickRightDesktopButton();

        if(canClick){
          desktopBoxscoresIndex++;
          desktopBoxscores.style.left = (-100 + ((desktopBoxscoresIndex - 1) * -100)) + 'px';
          //Check to activate/disable button
          checkRightDesktopButton();
        }
      }

      //Mobile
      leftMobileButton.addEventListener('click', moveMobileLeft);
      rightMobileButton.addEventListener('click', moveMobileRight);
      //Desktop
      leftDesktopButton.addEventListener('click', moveDesktopLeft);
      rightDesktopButton.addEventListener('click', moveDesktopRight);
    }

    //Promise for mlb boxscores
    var promise1 = new Promise(function(resolve, reject){
      var xhttp = createRequestObject();
      xhttp.onreadystatechange = function(){
        if(xhttp.readyState === 4 && xhttp.status === 200){
          //Success
          var res = JSON.parse(xhttp.responseText);
          //console.log('GET BOXSCORES SUCCESS', res);
          resolve(res);

          var processedData;
          processedData = processBaseballBoxscoresData(res.data, tz.offset, tz.tzAbbrev, todayObject.date);
          //If no games found for today, search for games throughout the week
          if(processedData.length === 0){
            processedData = processBaseballBoxscoresData(res.data, tz.offset, tz.tzAbbrev, null);
          }

        }else if(xhttp.readyState === 4 && xhttp.status !== 200){
          //Error
          // console.log('GET MLB BOXSCORES ERROR');
          reject(true);
        }
      };
      xhttp.open('GET', apiString, true);
      xhttp.send();
    });
    //Promise for nfl boxscores
    var promise2 =  new Promise(function(resolve, reject){
      var xhttp = createRequestObject();
      xhttp.onreadystatechange = function(){
        if(xhttp.readyState === 4 && xhttp.status === 200){
          //Success
          var res = JSON.parse(xhttp.responseText);
          resolve(res);

          var processedData = processFootballBoxscoresData(res.data, tz.offset, tz.tzAbbrev, todayObject.date, 'nfl');

        }else if(xhttp.readyState === 4 & xhttp.status !== 200){
          //Error
          // console.log('GET NFL BOXSCORES ERROR');
          reject(true);
        }
      };
      xhttp.open('GET', apiString2, true);
      xhttp.send();
    });
    //Promise for ncaaf boxscores
    var promise3 =  new Promise(function(resolve, reject){
      var xhttp = createRequestObject();
      xhttp.onreadystatechange = function(){
        if(xhttp.readyState === 4 && xhttp.status === 200){
          //Success
          var res = JSON.parse(xhttp.responseText);
          resolve(res);

          var processedData = processFootballBoxscoresData(res.data, tz.offset, tz.tzAbbrev, todayObject.date, 'ncaaf');

        }else if(xhttp.readyState === 4 && xhttp.status !== 200){
          //Error
          // console.log('GET NCAAF BOXSCORES ERROR');
          reject(true);
        }
      };
      xhttp.open('GET', apiString3, true);
      xhttp.send();
    });
    //Wait for all three api calls to finish
    Promise.all([promise1, promise2, promise3]).then(function(res){
      var mlbData = res[0].data || [];
      var nflData = res[1].data || [];
      var ncaafData = res[2].data || [];

      //MLB Boxscores
      var processedMLBData;
      processedMLBData = processBaseballBoxscoresData(mlbData, tz.offset, tz.tzAbbrev, todayObject.date);
      //If no games foound for today, search games throughout the week
      if(processedMLBData.length === 0){
        processedMLBData = processBaseballBoxscoresData(mlbData, tz.offset, tz.tzAbbrev, null);
      }
      processedMLBData.forEach(function(item){
        mobileBoxscoresMLB.appendChild(item.mobileNode);
        desktopBoxscoresMLB.appendChild(item.desktopNode);
      })
      mlbMax = processedMLBData.length + 1; //Plus one for category tile
      //NFL Boxscores
      var processedNFLData = processFootballBoxscoresData(nflData, tz.offset, tz.tzAbbrev, todayObject.date, 'nfl');
      processedNFLData.forEach(function(item){
        mobileBoxscoresNFL.appendChild(item.mobileNode);
        desktopBoxscoresNFL.appendChild(item.desktopNode);
      })
      nflMax = processedNFLData.length + 1; //Plus one for category tile
      //NCAAF Boxscores
      var processedNCAAFData = processFootballBoxscoresData(ncaafData, tz.offset, tz.tzAbbrev, todayObject.date, 'ncaaf');
      processedNCAAFData.forEach(function(item){
        mobileBoxscoresNCAAF.appendChild(item.mobileNode);
        desktopBoxscoresNCAAF.appendChild(item.desktopNode);
      })
      ncaafMax = processedNCAAFData.length + 1; //Plus one for category tile
      //Total Boxscores
      totalMax = mlbMax + nflMax + ncaafMax;

      //Bootstrap boxscores button functionality
      bootstapBoxscoresButtons();
    }, function(err){
      //Error, atleast 1 api failed
    })


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
          if(params.baseballSubdomain !== null){
            link = homerunDomain + '/team/' + sanitizeTeamName + '/' + data.teamId;
          }else{
            if (houseSite == true) {
              link = homerunDomain + '/team/' + sanitizeTeamName + '/' + data.teamId;
            }
            else {
              link = homerunDomain + '/t/' + sanitizeTeamName + '/' + data.teamId;
            }
          }
        break;
        case 'NFL':
          if(params.footballSubdomain !== null){
            link = touchdownDomain + '/nfl/team/' + sanitizeTeamName + '/' + data.teamId;
          }else{
            if (houseSite == true) {
              link = touchdownDomain + '/nfl/team/' + sanitizeTeamName + '/' + data.teamId;
            }
            else {
              link = touchdownDomain + '/nfl/t/' + sanitizeTeamName + '/' + data.teamId;
            }
          }
        break;
        case 'NCAAF':
          if(params.footballSubdomain !== null){
            link = touchdownDomain + '/ncaaf/team/' + sanitizeTeamName + '/' + data.teamId;
          }else{
            if (houseSite == true) {
              link = touchdownDomain + '/ncaaf/team/' + sanitizeTeamName + '/' + data.teamId;
            }
            else {
              link = touchdownDomain + '/ncaaf/t/' + sanitizeTeamName + '/' + data.teamId;
            }
          }
        break;
        case 'NBA':
          if (houseSite == true) {
            link = hoopsDomain + '/NBA/team/' + sanitizeTeamName + '/' + data.teamId;
          }
          else {
            link = hoopsDomain + '/NBA/t/' + sanitizeTeamName + '/' + data.teamId;
          }
        break;
        case 'NCAAB':
          if (houseSite == true) {
            link = hoopsDomain + '/NCAA/team/' + sanitizeTeamName + '/' + data.teamId;
          }
          else {
            link = hoopsDomain + '/NCAA/t/' + sanitizeTeamName + '/' + data.teamId;
          }
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
          if(params.baseballSubdomain !== null){
            link = homerunDomain + '/team/' + sanitizeTeamName + '/' + data.teamId;
          }else{
            if (houseSite == true) {
              link = homerunDomain + '/team/' + sanitizeTeamName + '/' + data.teamId;
            }
            else {
              link = homerunDomain + '/t/' + sanitizeTeamName + '/' + data.teamId;
            }
          }
        break;
        case 'NFL':
          iconClass = 'ddb-icon-football';
          if(params.footballSubdomain !== null){
            link = touchdownDomain + '/nfl/team/' + sanitizeTeamName + '/' + data.teamId;
          }else{
            if (houseSite == true) {
              link = touchdownDomain + '/nfl/team/' + sanitizeTeamName + '/' + data.teamId;
            }
            else {
              link = touchdownDomain + '/nfl/t/' + sanitizeTeamName + '/' + data.teamId;
            }
          }
        break;
        case 'NCAAF':
          iconClass = 'ddb-icon-football';
          if(params.footballSubdomain !== null){
            link = touchdownDomain + '/ncaaf/team/' + sanitizeTeamName + '/' + data.teamId;
          }else{
            if (houseSite == true) {
              link = touchdownDomain + '/ncaaf/team/' + sanitizeTeamName + '/' + data.teamId;
            }
            else {
              link = touchdownDomain + '/ncaaf/t/' + sanitizeTeamName + '/' + data.teamId;
            }
          }
        break;
        case 'NBA':
          iconClass = 'ddb-icon-basketball';
          if (houseSite == true) {
            link = hoopsDomain + '/NBA/team/' + sanitizeTeamName + '/' + data.teamId;
          }
          else {
            link = hoopsDomain + '/NBA/t/' + sanitizeTeamName + '/' + data.teamId;
          }
        break;
        case 'NCAAB':
          iconClass = 'ddb-icon-basketball';
          if (houseSite == true) {
            link = hoopsDomain + '/NCAA/team/' + sanitizeTeamName + '/' + data.teamId;
          }
          else {
            link = hoopsDomain + '/NCAA/t/' + sanitizeTeamName + '/' + data.teamId;
          }
        break;
        default:
          iconClass = 'ddb-icon-list'
          link = '#';
        break;
      }
      el.innerHTML = `
        <a target="_blank" href="` + link + `" class="ddb-brand-search-result">
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

    var res = [{"teamId":324,"teamName":"Boston Celtics","Scope":"NBA"},{"teamId":320,"teamName":"Chicago Bulls","Scope":"NBA"},{"teamId":319,"teamName":"Cleveland Cavaliers","Scope":"NBA"},{"teamId":325,"teamName":"Detroit Pistons","Scope":"NBA"},{"teamId":307,"teamName":"Indiana Pacers","Scope":"NBA"},{"teamId":334,"teamName":"Milwaukee Bucks","Scope":"NBA"},{"teamId":322,"teamName":"Toronto Raptors","Scope":"NBA"},{"teamId":332,"teamName":"Dallas Mavericks","Scope":"NBA"},{"teamId":339,"teamName":"Denver Nuggets","Scope":"NBA"},{"teamId":328,"teamName":"Houston Rockets","Scope":"NBA"},{"teamId":333,"teamName":"Memphis Grizzlies","Scope":"NBA"},{"teamId":340,"teamName":"Miami Heat","Scope":"NBA"},{"teamId":330,"teamName":"Minnesota Timberwolves","Scope":"NBA"},{"teamId":336,"teamName":"San Antonio Spurs","Scope":"NBA"},{"teamId":337,"teamName":"Utah Jazz","Scope":"NBA"},{"teamId":286,"teamName":"Golden State Warriors","Scope":"NBA"},{"teamId":326,"teamName":"Los Angeles Clippers","Scope":"NBA"},{"teamId":331,"teamName":"Los Angeles Lakers","Scope":"NBA"},{"teamId":335,"teamName":"Phoenix Suns","Scope":"NBA"},{"teamId":327,"teamName":"Portland Trail Blazers","Scope":"NBA"},{"teamId":323,"teamName":"Sacramento Kings","Scope":"NBA"},{"teamId":341,"teamName":"Oklahoma City Thunder","Scope":"NBA"},{"teamId":321,"teamName":"Brooklyn Nets","Scope":"NBA"},{"teamId":343,"teamName":"Charlotte Hornets","Scope":"NBA"},{"teamId":344,"teamName":"New York Knicks","Scope":"NBA"},{"teamId":338,"teamName":"Orlando Magic","Scope":"NBA"},{"teamId":308,"teamName":"Philadelphia 76ers","Scope":"NBA"},{"teamId":342,"teamName":"Washington Wizards","Scope":"NBA"},{"teamId":329,"teamName":"Atlanta Hawks","Scope":"NBA"},{"teamId":285,"teamName":"New Orleans Pelicans","Scope":"NBA"},{"teamId":350,"teamName":"Houston Baptist Huskies","Scope":"NCAAB"},{"teamId":351,"teamName":"Albany, N.Y. Great Danes","Scope":"NCAAB"},{"teamId":352,"teamName":"Binghamton Bearcats","Scope":"NCAAB"},{"teamId":353,"teamName":"Boston U. Terriers","Scope":"NCAAB"},{"teamId":354,"teamName":"Hartford Hawks","Scope":"NCAAB"},{"teamId":355,"teamName":"Maine Black Bears","Scope":"NCAAB"},{"teamId":356,"teamName":"New Hampshire Wildcats","Scope":"NCAAB"},{"teamId":357,"teamName":"Stony Brook Seawolves","Scope":"NCAAB"},{"teamId":358,"teamName":"UMBC Retrievers","Scope":"NCAAB"},{"teamId":359,"teamName":"Vermont Catamounts","Scope":"NCAAB"},{"teamId":360,"teamName":"Charlotte 49ers","Scope":"NCAAB"},{"teamId":361,"teamName":"Dayton Flyers","Scope":"NCAAB"},{"teamId":362,"teamName":"Duquesne Dukes","Scope":"NCAAB"},{"teamId":363,"teamName":"Fordham Rams","Scope":"NCAAB"},{"teamId":364,"teamName":"George Washington Colonials","Scope":"NCAAB"},{"teamId":365,"teamName":"La Salle Explorers","Scope":"NCAAB"},{"teamId":366,"teamName":"Rhode Island Rams","Scope":"NCAAB"},{"teamId":367,"teamName":"Richmond Spiders","Scope":"NCAAB"},{"teamId":368,"teamName":"Saint Louis Billikens","Scope":"NCAAB"},{"teamId":369,"teamName":"St. Bonaventure Bonnies","Scope":"NCAAB"},{"teamId":370,"teamName":"St. Joseph's Hawks","Scope":"NCAAB"},{"teamId":371,"teamName":"Temple Owls","Scope":"NCAAB"},{"teamId":372,"teamName":"UMass Minutemen","Scope":"NCAAB"},{"teamId":373,"teamName":"Xavier Musketeers","Scope":"NCAAB"},{"teamId":374,"teamName":"Boston College Eagles","Scope":"NCAAB"},{"teamId":375,"teamName":"Clemson Tigers","Scope":"NCAAB"},{"teamId":376,"teamName":"Duke Blue Devils","Scope":"NCAAB"},{"teamId":377,"teamName":"Florida St. Seminoles","Scope":"NCAAB"},{"teamId":378,"teamName":"Georgia Tech Yellow Jackets","Scope":"NCAAB"},{"teamId":379,"teamName":"Maryland Terrapins","Scope":"NCAAB"},{"teamId":380,"teamName":"Miami Hurricanes","Scope":"NCAAB"},{"teamId":381,"teamName":"N.C. State Wolfpack","Scope":"NCAAB"},{"teamId":382,"teamName":"North Carolina Tar Heels","Scope":"NCAAB"},{"teamId":383,"teamName":"Virginia Tech Hokies","Scope":"NCAAB"},{"teamId":384,"teamName":"Virginia Cavaliers","Scope":"NCAAB"},{"teamId":385,"teamName":"Wake Forest Demon Deacons","Scope":"NCAAB"},{"teamId":386,"teamName":"Belmont Bruins","Scope":"NCAAB"},{"teamId":387,"teamName":"Campbell Fighting Camels","Scope":"NCAAB"},{"teamId":388,"teamName":"East Tennessee State Buccaneers","Scope":"NCAAB"},{"teamId":389,"teamName":"Gardner-Webb Runnin' Bulldogs","Scope":"NCAAB"},{"teamId":390,"teamName":"Jacksonville Dolphins","Scope":"NCAAB"},{"teamId":391,"teamName":"Kennesaw St. Owls","Scope":"NCAAB"},{"teamId":392,"teamName":"Lipscomb Bisons","Scope":"NCAAB"},{"teamId":393,"teamName":"Mercer Bears","Scope":"NCAAB"},{"teamId":394,"teamName":"North Florida Ospreys","Scope":"NCAAB"},{"teamId":395,"teamName":"Stetson Hatters","Scope":"NCAAB"},{"teamId":396,"teamName":"Cincinnati Bearcats","Scope":"NCAAB"},{"teamId":397,"teamName":"Connecticut Huskies","Scope":"NCAAB"},{"teamId":398,"teamName":"DePaul Blue Demons","Scope":"NCAAB"},{"teamId":399,"teamName":"Georgetown Hoyas","Scope":"NCAAB"},{"teamId":400,"teamName":"Louisville Cardinals","Scope":"NCAAB"},{"teamId":401,"teamName":"Marquette Golden Eagles","Scope":"NCAAB"},{"teamId":402,"teamName":"Notre Dame Fighting Irish","Scope":"NCAAB"},{"teamId":403,"teamName":"Pittsburgh Panthers","Scope":"NCAAB"},{"teamId":404,"teamName":"Providence Friars","Scope":"NCAAB"},{"teamId":405,"teamName":"Rutgers Scarlet Knights","Scope":"NCAAB"},{"teamId":406,"teamName":"Seton Hall Pirates","Scope":"NCAAB"},{"teamId":407,"teamName":"South Florida Bulls","Scope":"NCAAB"},{"teamId":408,"teamName":"St. John's Red Storm","Scope":"NCAAB"},{"teamId":409,"teamName":"Syracuse Orange","Scope":"NCAAB"},{"teamId":410,"teamName":"Villanova Wildcats","Scope":"NCAAB"},{"teamId":411,"teamName":"West Virginia Mountaineers","Scope":"NCAAB"},{"teamId":412,"teamName":"Eastern Washington Eagles","Scope":"NCAAB"},{"teamId":413,"teamName":"Idaho St. Bengals","Scope":"NCAAB"},{"teamId":414,"teamName":"Montana St. Bobcats","Scope":"NCAAB"},{"teamId":415,"teamName":"Montana Grizzlies","Scope":"NCAAB"},{"teamId":416,"teamName":"Northern Arizona Lumberjacks","Scope":"NCAAB"},{"teamId":417,"teamName":"Northern Colorado Bears","Scope":"NCAAB"},{"teamId":418,"teamName":"Portland St. Vikings","Scope":"NCAAB"},{"teamId":419,"teamName":"Sacramento St. Hornets","Scope":"NCAAB"},{"teamId":420,"teamName":"Weber St. Wildcats","Scope":"NCAAB"},{"teamId":421,"teamName":"Charleston Southern Buccaneers","Scope":"NCAAB"},{"teamId":422,"teamName":"Coastal Carolina Chanticleers","Scope":"NCAAB"},{"teamId":423,"teamName":"High Point Panthers","Scope":"NCAAB"},{"teamId":424,"teamName":"Liberty Flames","Scope":"NCAAB"},{"teamId":425,"teamName":"UNC-Asheville Bulldogs","Scope":"NCAAB"},{"teamId":426,"teamName":"Radford Highlanders","Scope":"NCAAB"},{"teamId":427,"teamName":"Virginia Military Keydets","Scope":"NCAAB"},{"teamId":428,"teamName":"Winthrop Eagles","Scope":"NCAAB"},{"teamId":429,"teamName":"Illinois Fighting Illini","Scope":"NCAAB"},{"teamId":430,"teamName":"Indiana Hoosiers","Scope":"NCAAB"},{"teamId":431,"teamName":"Iowa Hawkeyes","Scope":"NCAAB"},{"teamId":432,"teamName":"Michigan St. Spartans","Scope":"NCAAB"},{"teamId":433,"teamName":"Michigan Wolverines","Scope":"NCAAB"},{"teamId":434,"teamName":"Minnesota Golden Gophers","Scope":"NCAAB"},{"teamId":435,"teamName":"Northwestern Wildcats","Scope":"NCAAB"},{"teamId":436,"teamName":"Ohio St. Buckeyes","Scope":"NCAAB"},{"teamId":437,"teamName":"Penn St. Nittany Lions","Scope":"NCAAB"},{"teamId":438,"teamName":"Purdue Boilermakers","Scope":"NCAAB"},{"teamId":439,"teamName":"Wisconsin Badgers","Scope":"NCAAB"},{"teamId":440,"teamName":"Baylor Bears","Scope":"NCAAB"},{"teamId":441,"teamName":"Colorado Buffaloes","Scope":"NCAAB"},{"teamId":442,"teamName":"Iowa St. Cyclones","Scope":"NCAAB"},{"teamId":443,"teamName":"Kansas St. Wildcats","Scope":"NCAAB"},{"teamId":444,"teamName":"Kansas Jayhawks","Scope":"NCAAB"},{"teamId":445,"teamName":"Missouri Tigers","Scope":"NCAAB"},{"teamId":446,"teamName":"Nebraska Cornhuskers","Scope":"NCAAB"},{"teamId":447,"teamName":"Oklahoma St. Cowboys","Scope":"NCAAB"},{"teamId":448,"teamName":"Oklahoma Sooners","Scope":"NCAAB"},{"teamId":449,"teamName":"Texas A&amp;M Aggies","Scope":"NCAAB"},{"teamId":450,"teamName":"Texas Tech Red Raiders","Scope":"NCAAB"},{"teamId":451,"teamName":"Texas Longhorns","Scope":"NCAAB"},{"teamId":452,"teamName":"Cal Poly-SLO Mustangs","Scope":"NCAAB"},{"teamId":453,"teamName":"Cal. St.-Fullerton Titans","Scope":"NCAAB"},{"teamId":454,"teamName":"Cal. St.-Northridge Matadors","Scope":"NCAAB"},{"teamId":455,"teamName":"Long Beach St. 49ers","Scope":"NCAAB"},{"teamId":456,"teamName":"Pacific Tigers","Scope":"NCAAB"},{"teamId":457,"teamName":"UC Irvine Anteaters","Scope":"NCAAB"},{"teamId":458,"teamName":"UC Riverside Highlanders","Scope":"NCAAB"},{"teamId":459,"teamName":"UC Santa Barbara Gauchos","Scope":"NCAAB"},{"teamId":460,"teamName":"Delaware Blue Hens","Scope":"NCAAB"},{"teamId":461,"teamName":"Drexel Dragons","Scope":"NCAAB"},{"teamId":462,"teamName":"George Mason Patriots","Scope":"NCAAB"},{"teamId":463,"teamName":"Georgia State Panthers","Scope":"NCAAB"},{"teamId":464,"teamName":"Hofstra Pride","Scope":"NCAAB"},{"teamId":465,"teamName":"James Madison Dukes","Scope":"NCAAB"},{"teamId":466,"teamName":"UNC-Wilmington Seahawks","Scope":"NCAAB"},{"teamId":467,"teamName":"Northeastern Huskies","Scope":"NCAAB"},{"teamId":468,"teamName":"Old Dominion Monarchs","Scope":"NCAAB"},{"teamId":469,"teamName":"Towson Tigers","Scope":"NCAAB"},{"teamId":470,"teamName":"Va. Commonwealth Rams","Scope":"NCAAB"},{"teamId":471,"teamName":"William &amp; Mary Tribe","Scope":"NCAAB"},{"teamId":472,"teamName":"Central Florida Knights","Scope":"NCAAB"},{"teamId":473,"teamName":"East Carolina Pirates","Scope":"NCAAB"},{"teamId":474,"teamName":"Houston Cougars","Scope":"NCAAB"},{"teamId":475,"teamName":"Marshall Thundering Herd","Scope":"NCAAB"},{"teamId":476,"teamName":"Memphis Tigers","Scope":"NCAAB"},{"teamId":477,"teamName":"Rice Owls","Scope":"NCAAB"},{"teamId":478,"teamName":"SMU Mustangs","Scope":"NCAAB"},{"teamId":479,"teamName":"Southern Miss. Golden Eagles","Scope":"NCAAB"},{"teamId":480,"teamName":"Tulane Green Wave","Scope":"NCAAB"},{"teamId":481,"teamName":"Tulsa Golden Hurricane","Scope":"NCAAB"},{"teamId":482,"teamName":"UAB Blazers","Scope":"NCAAB"},{"teamId":483,"teamName":"UTEP Miners","Scope":"NCAAB"},{"teamId":484,"teamName":"Chicago St. Cougars","Scope":"NCAAB"},{"teamId":485,"teamName":"IPFW Mastodons","Scope":"NCAAB"},{"teamId":486,"teamName":"Longwood Lancers","Scope":"NCAAB"},{"teamId":487,"teamName":"North Dakota St. Bison","Scope":"NCAAB"},{"teamId":488,"teamName":"Savannah St. Tigers","Scope":"NCAAB"},{"teamId":489,"teamName":"South Dakota St. Jackrabbits","Scope":"NCAAB"},{"teamId":490,"teamName":"Texas-Rio Grande Valley Vaqueros","Scope":"NCAAB"},{"teamId":491,"teamName":"UC Davis Aggies","Scope":"NCAAB"},{"teamId":492,"teamName":"Utah Valley St. Wolverines","Scope":"NCAAB"},{"teamId":493,"teamName":"Butler Bulldogs","Scope":"NCAAB"},{"teamId":494,"teamName":"Cleveland St. Vikings","Scope":"NCAAB"},{"teamId":495,"teamName":"Detroit Titans","Scope":"NCAAB"},{"teamId":496,"teamName":"Ill.-Chicago Flames","Scope":"NCAAB"},{"teamId":497,"teamName":"Loyola of Chicago Ramblers","Scope":"NCAAB"},{"teamId":498,"teamName":"Wis.-Green Bay Phoenix","Scope":"NCAAB"},{"teamId":499,"teamName":"Wis.-Milwaukee Panthers","Scope":"NCAAB"},{"teamId":500,"teamName":"Wright St. Raiders","Scope":"NCAAB"},{"teamId":501,"teamName":"Youngstown St. Penguins","Scope":"NCAAB"},{"teamId":502,"teamName":"Brown Bears","Scope":"NCAAB"},{"teamId":503,"teamName":"Columbia Lions","Scope":"NCAAB"},{"teamId":504,"teamName":"Cornell Big Red","Scope":"NCAAB"},{"teamId":505,"teamName":"Dartmouth Big Green","Scope":"NCAAB"},{"teamId":506,"teamName":"Harvard Crimson","Scope":"NCAAB"},{"teamId":507,"teamName":"Penn Quakers","Scope":"NCAAB"},{"teamId":508,"teamName":"Princeton Tigers","Scope":"NCAAB"},{"teamId":509,"teamName":"Yale Bulldogs","Scope":"NCAAB"},{"teamId":510,"teamName":"Canisius Golden Griffins","Scope":"NCAAB"},{"teamId":511,"teamName":"Fairfield Stags","Scope":"NCAAB"},{"teamId":512,"teamName":"Iona Gaels","Scope":"NCAAB"},{"teamId":513,"teamName":"Loyola, Md. Greyhounds","Scope":"NCAAB"},{"teamId":514,"teamName":"Manhattan Jaspers","Scope":"NCAAB"},{"teamId":515,"teamName":"Marist Red Foxes","Scope":"NCAAB"},{"teamId":516,"teamName":"Niagara Purple Eagles","Scope":"NCAAB"},{"teamId":517,"teamName":"Rider Broncs","Scope":"NCAAB"},{"teamId":518,"teamName":"Siena Saints","Scope":"NCAAB"},{"teamId":519,"teamName":"St. Peter's Peacocks","Scope":"NCAAB"},{"teamId":520,"teamName":"Akron Zips","Scope":"NCAAB"},{"teamId":521,"teamName":"Bowling Green State Falcons","Scope":"NCAAB"},{"teamId":522,"teamName":"Buffalo Bulls","Scope":"NCAAB"},{"teamId":523,"teamName":"Kent St. Golden Flashes","Scope":"NCAAB"},{"teamId":524,"teamName":"Miami (Ohio) RedHawks","Scope":"NCAAB"},{"teamId":525,"teamName":"Ohio Bobcats","Scope":"NCAAB"},{"teamId":526,"teamName":"Ball St. Cardinals","Scope":"NCAAB"},{"teamId":527,"teamName":"Central Michigan Chippewas","Scope":"NCAAB"},{"teamId":528,"teamName":"Eastern Michigan Eagles","Scope":"NCAAB"},{"teamId":529,"teamName":"Northern Illinois Huskies","Scope":"NCAAB"},{"teamId":530,"teamName":"Toledo Rockets","Scope":"NCAAB"},{"teamId":531,"teamName":"Western Michigan Broncos","Scope":"NCAAB"},{"teamId":532,"teamName":"IUPU-Indianapolis Jaguars","Scope":"NCAAB"},{"teamId":533,"teamName":"Oakland, Mich. Golden Grizzlies","Scope":"NCAAB"},{"teamId":534,"teamName":"Oral Roberts Golden Eagles","Scope":"NCAAB"},{"teamId":535,"teamName":"Southern Utah Thunderbirds","Scope":"NCAAB"},{"teamId":536,"teamName":"UMKC Kangaroos","Scope":"NCAAB"},{"teamId":537,"teamName":"Valparaiso Crusaders","Scope":"NCAAB"},{"teamId":538,"teamName":"Western Illinois Leathernecks","Scope":"NCAAB"},{"teamId":539,"teamName":"Bethune-Cookman Wildcats","Scope":"NCAAB"},{"teamId":540,"teamName":"Coppin St. Eagles","Scope":"NCAAB"},{"teamId":541,"teamName":"Delaware St. Hornets","Scope":"NCAAB"},{"teamId":542,"teamName":"Florida A&amp;M Rattlers","Scope":"NCAAB"},{"teamId":543,"teamName":"Hampton Pirates","Scope":"NCAAB"},{"teamId":544,"teamName":"Howard Bison","Scope":"NCAAB"},{"teamId":545,"teamName":"Md.-Eastern Shore Hawks","Scope":"NCAAB"},{"teamId":546,"teamName":"Morgan St. Bears","Scope":"NCAAB"},{"teamId":547,"teamName":"N.C. A&amp;T Aggies","Scope":"NCAAB"},{"teamId":548,"teamName":"Norfolk St. Spartans","Scope":"NCAAB"},{"teamId":549,"teamName":"South Carolina State Bulldogs","Scope":"NCAAB"},{"teamId":550,"teamName":"Bradley Braves","Scope":"NCAAB"},{"teamId":551,"teamName":"Creighton Bluejays","Scope":"NCAAB"},{"teamId":552,"teamName":"Drake Bulldogs","Scope":"NCAAB"},{"teamId":553,"teamName":"Evansville Purple Aces","Scope":"NCAAB"},{"teamId":554,"teamName":"Illinois St. Redbirds","Scope":"NCAAB"},{"teamId":555,"teamName":"Indiana St. Sycamores","Scope":"NCAAB"},{"teamId":556,"teamName":"Missouri St. Bears","Scope":"NCAAB"},{"teamId":557,"teamName":"Northern Iowa Panthers","Scope":"NCAAB"},{"teamId":558,"teamName":"Southern Illinois Salukis","Scope":"NCAAB"},{"teamId":559,"teamName":"Wichita St. Shockers","Scope":"NCAAB"},{"teamId":560,"teamName":"Air Force Falcons","Scope":"NCAAB"},{"teamId":561,"teamName":"BYU Cougars","Scope":"NCAAB"},{"teamId":562,"teamName":"Colorado St. Rams","Scope":"NCAAB"},{"teamId":563,"teamName":"New Mexico Lobos","Scope":"NCAAB"},{"teamId":564,"teamName":"San Diego St. Aztecs","Scope":"NCAAB"},{"teamId":565,"teamName":"TCU Horned Frogs","Scope":"NCAAB"},{"teamId":566,"teamName":"UNLV Rebels","Scope":"NCAAB"},{"teamId":567,"teamName":"Utah Utes","Scope":"NCAAB"},{"teamId":568,"teamName":"Wyoming Cowboys","Scope":"NCAAB"},{"teamId":569,"teamName":"Central Connecticut St. Blue Devils","Scope":"NCAAB"},{"teamId":570,"teamName":"Fairleigh Dickinson Knights","Scope":"NCAAB"},{"teamId":571,"teamName":"Long Island U. Blackbirds","Scope":"NCAAB"},{"teamId":572,"teamName":"Monmouth, N.J. Hawks","Scope":"NCAAB"},{"teamId":573,"teamName":"Mount St. Mary's, Md. Mountaineers","Scope":"NCAAB"},{"teamId":574,"teamName":"Quinnipiac Bobcats","Scope":"NCAAB"},{"teamId":575,"teamName":"Robert Morris Colonials","Scope":"NCAAB"},{"teamId":576,"teamName":"Sacred Heart Pioneers","Scope":"NCAAB"},{"teamId":577,"teamName":"St. Francis, NY Terriers","Scope":"NCAAB"},{"teamId":578,"teamName":"St. Francis, Pa. Red Flash","Scope":"NCAAB"},{"teamId":579,"teamName":"Wagner Seahawks","Scope":"NCAAB"},{"teamId":580,"teamName":"Austin Peay Governors","Scope":"NCAAB"},{"teamId":581,"teamName":"Eastern Illinois Panthers","Scope":"NCAAB"},{"teamId":582,"teamName":"Eastern Kentucky Colonels","Scope":"NCAAB"},{"teamId":583,"teamName":"Jacksonville St. Gamecocks","Scope":"NCAAB"},{"teamId":584,"teamName":"Morehead St. Eagles","Scope":"NCAAB"},{"teamId":585,"teamName":"Murray St. Racers","Scope":"NCAAB"},{"teamId":586,"teamName":"Samford Bulldogs","Scope":"NCAAB"},{"teamId":587,"teamName":"SE Missouri St. Redhawks","Scope":"NCAAB"},{"teamId":588,"teamName":"Tennessee St. Tigers","Scope":"NCAAB"},{"teamId":589,"teamName":"Tennessee Tech Golden Eagles","Scope":"NCAAB"},{"teamId":590,"teamName":"Tenn.-Martin Skyhawks","Scope":"NCAAB"},{"teamId":591,"teamName":"Arizona St. Sun Devils","Scope":"NCAAB"},{"teamId":592,"teamName":"Arizona Wildcats","Scope":"NCAAB"},{"teamId":593,"teamName":"California Golden Bears","Scope":"NCAAB"},{"teamId":594,"teamName":"Oregon St. Beavers","Scope":"NCAAB"},{"teamId":595,"teamName":"Oregon Ducks","Scope":"NCAAB"},{"teamId":596,"teamName":"Stanford Cardinal","Scope":"NCAAB"},{"teamId":597,"teamName":"UCLA Bruins","Scope":"NCAAB"},{"teamId":598,"teamName":"USC Trojans","Scope":"NCAAB"},{"teamId":599,"teamName":"Washington St. Cougars","Scope":"NCAAB"},{"teamId":600,"teamName":"Washington Huskies","Scope":"NCAAB"},{"teamId":601,"teamName":"American Eagles","Scope":"NCAAB"},{"teamId":602,"teamName":"Army Black Knights","Scope":"NCAAB"},{"teamId":603,"teamName":"Bucknell Bison","Scope":"NCAAB"},{"teamId":604,"teamName":"Colgate Raiders","Scope":"NCAAB"},{"teamId":605,"teamName":"Holy Cross Saints","Scope":"NCAAB"},{"teamId":606,"teamName":"Lafayette Leopards","Scope":"NCAAB"},{"teamId":607,"teamName":"Lehigh Mountain Hawks","Scope":"NCAAB"},{"teamId":608,"teamName":"Navy Midshipmen","Scope":"NCAAB"},{"teamId":609,"teamName":"Florida Gators","Scope":"NCAAB"},{"teamId":610,"teamName":"Georgia Bulldogs","Scope":"NCAAB"},{"teamId":611,"teamName":"Kentucky Wildcats","Scope":"NCAAB"},{"teamId":612,"teamName":"South Carolina Gamecocks","Scope":"NCAAB"},{"teamId":613,"teamName":"Tennessee Volunteers","Scope":"NCAAB"},{"teamId":614,"teamName":"Vanderbilt Commodores","Scope":"NCAAB"},{"teamId":615,"teamName":"Alabama Crimson Tide","Scope":"NCAAB"},{"teamId":616,"teamName":"Arkansas Razorbacks","Scope":"NCAAB"},{"teamId":617,"teamName":"Auburn Tigers","Scope":"NCAAB"},{"teamId":618,"teamName":"LSU Tigers","Scope":"NCAAB"},{"teamId":619,"teamName":"Mississippi St. Bulldogs","Scope":"NCAAB"},{"teamId":620,"teamName":"Mississippi Rebels","Scope":"NCAAB"},{"teamId":621,"teamName":"Appalachian St. Mountaineers","Scope":"NCAAB"},{"teamId":622,"teamName":"Chattanooga Mocs","Scope":"NCAAB"},{"teamId":623,"teamName":"Elon Phoenix","Scope":"NCAAB"},{"teamId":624,"teamName":"UNC Greensboro Spartans","Scope":"NCAAB"},{"teamId":625,"teamName":"Western Carolina Catamounts","Scope":"NCAAB"},{"teamId":626,"teamName":"Charleston Cougars","Scope":"NCAAB"},{"teamId":627,"teamName":"Davidson Wildcats","Scope":"NCAAB"},{"teamId":628,"teamName":"Furman Paladins","Scope":"NCAAB"},{"teamId":629,"teamName":"Georgia Southern Eagles","Scope":"NCAAB"},{"teamId":630,"teamName":"The Citadel Bulldogs","Scope":"NCAAB"},{"teamId":631,"teamName":"Wofford Terriers","Scope":"NCAAB"},{"teamId":632,"teamName":"Central Arkansas Bears","Scope":"NCAAB"},{"teamId":633,"teamName":"Lamar Cardinals","Scope":"NCAAB"},{"teamId":634,"teamName":"McNeese St. Cowboys","Scope":"NCAAB"},{"teamId":635,"teamName":"Nicholls Colonels","Scope":"NCAAB"},{"teamId":636,"teamName":"Northwestern St. Demons","Scope":"NCAAB"},{"teamId":637,"teamName":"Sam Houston St. Bearkats","Scope":"NCAAB"},{"teamId":638,"teamName":"SE Louisiana Lions","Scope":"NCAAB"},{"teamId":639,"teamName":"Stephen F. Austin Lumberjacks","Scope":"NCAAB"},{"teamId":640,"teamName":"Texas A&amp;M-Corpus Christi Islanders","Scope":"NCAAB"},{"teamId":641,"teamName":"Texas State Bobcats","Scope":"NCAAB"},{"teamId":642,"teamName":"Texas-Arlington Mavericks","Scope":"NCAAB"},{"teamId":643,"teamName":"Texas-San Antonio Roadrunners","Scope":"NCAAB"},{"teamId":644,"teamName":"Alabama A&amp;M Bulldogs","Scope":"NCAAB"},{"teamId":645,"teamName":"Alabama St. Hornets","Scope":"NCAAB"},{"teamId":646,"teamName":"Alcorn St. Braves","Scope":"NCAAB"},{"teamId":647,"teamName":"Ark.-Pine Bluff Golden Lions","Scope":"NCAAB"},{"teamId":648,"teamName":"Grambling St. Tigers","Scope":"NCAAB"},{"teamId":649,"teamName":"Jackson St. Tigers","Scope":"NCAAB"},{"teamId":650,"teamName":"MVSU Delta Devils","Scope":"NCAAB"},{"teamId":651,"teamName":"Prairie View Panthers","Scope":"NCAAB"},{"teamId":652,"teamName":"Southern U. Jaguars","Scope":"NCAAB"},{"teamId":653,"teamName":"Texas Southern Tigers","Scope":"NCAAB"},{"teamId":654,"teamName":"Fla. International Panthers","Scope":"NCAAB"},{"teamId":655,"teamName":"Florida Atlantic Owls","Scope":"NCAAB"},{"teamId":656,"teamName":"Middle Tenn. St. Blue Raiders","Scope":"NCAAB"},{"teamId":657,"teamName":"South Alabama Jaguars","Scope":"NCAAB"},{"teamId":658,"teamName":"Troy Trojans","Scope":"NCAAB"},{"teamId":659,"teamName":"Western Kentucky Hilltoppers","Scope":"NCAAB"},{"teamId":660,"teamName":"Ark.-Little Rock Trojans","Scope":"NCAAB"},{"teamId":661,"teamName":"Arkansas St. Red Wolves","Scope":"NCAAB"},{"teamId":662,"teamName":"Denver Pioneers","Scope":"NCAAB"},{"teamId":663,"teamName":"Louisiana Ragin' Cajuns","Scope":"NCAAB"},{"teamId":664,"teamName":"ULM Warhawks","Scope":"NCAAB"},{"teamId":665,"teamName":"New Orleans Privateers","Scope":"NCAAB"},{"teamId":666,"teamName":"North Texas Mean Green","Scope":"NCAAB"},{"teamId":667,"teamName":"Gonzaga Bulldogs","Scope":"NCAAB"},{"teamId":668,"teamName":"Loyola Marymount Lions","Scope":"NCAAB"},{"teamId":669,"teamName":"Pepperdine Waves","Scope":"NCAAB"},{"teamId":670,"teamName":"Portland Pilots","Scope":"NCAAB"},{"teamId":671,"teamName":"San Diego Toreros","Scope":"NCAAB"},{"teamId":672,"teamName":"San Francisco Dons","Scope":"NCAAB"},{"teamId":673,"teamName":"Santa Clara Broncos","Scope":"NCAAB"},{"teamId":674,"teamName":"St. Mary's, Calif. Gaels","Scope":"NCAAB"},{"teamId":675,"teamName":"Boise State Broncos","Scope":"NCAAB"},{"teamId":676,"teamName":"Fresno St. Bulldogs","Scope":"NCAAB"},{"teamId":677,"teamName":"Hawaii Rainbow Warriors","Scope":"NCAAB"},{"teamId":678,"teamName":"Idaho Vandals","Scope":"NCAAB"},{"teamId":679,"teamName":"Louisiana Tech Bulldogs","Scope":"NCAAB"},{"teamId":680,"teamName":"Nevada Wolf Pack","Scope":"NCAAB"},{"teamId":681,"teamName":"New Mexico St. Aggies","Scope":"NCAAB"},{"teamId":682,"teamName":"San Jose St. Spartans","Scope":"NCAAB"},{"teamId":683,"teamName":"Utah State Aggies","Scope":"NCAAB"},{"teamId":684,"teamName":"Cal State Bakersfield Roadrunners","Scope":"NCAAB"},{"teamId":685,"teamName":"N.C. Central Eagles","Scope":"NCAAB"},{"teamId":686,"teamName":"Florida Gulf Coast Eagles","Scope":"NCAAB"},{"teamId":687,"teamName":"Grand Canyon Antelopes","Scope":"NCAAB"},{"teamId":688,"teamName":"Northern Kentucky Norse","Scope":"NCAAB"},{"teamId":689,"teamName":"SIU-Edwardsville Cougars","Scope":"NCAAB"},{"teamId":690,"teamName":"Seattle Redhawks","Scope":"NCAAB"},{"teamId":691,"teamName":"Abilene Christian Wildcats","Scope":"NCAAB"},{"teamId":692,"teamName":"Nebraska-Omaha Mavericks","Scope":"NCAAB"},{"teamId":693,"teamName":"North Dakota Fighting Hawks","Scope":"NCAAB"},{"teamId":694,"teamName":"South Dakota Coyotes","Scope":"NCAAB"},{"teamId":695,"teamName":"Bryant Bulldogs","Scope":"NCAAB"},{"teamId":696,"teamName":"USC Upstate Spartans","Scope":"NCAAB"},{"teamId":697,"teamName":"Presbyterian Blue Hose","Scope":"NCAAB"},{"teamId":698,"teamName":"Incarnate Word Cardinals","Scope":"NCAAB"},{"teamId":699,"teamName":"NJIT Highlanders","Scope":"NCAAB"},{"teamId":700,"teamName":"UMass-Lowell River Hawks","Scope":"NCAAB"},{"teamId":2799,"teamName":"Baltimore Orioles","Scope":"MLB"},{"teamId":2810,"teamName":"Minnesota Twins","Scope":"MLB"},{"teamId":2792,"teamName":"Los Angeles Angels","Scope":"MLB"},{"teamId":2808,"teamName":"Oakland Athletics","Scope":"MLB"},{"teamId":2804,"teamName":"Seattle Mariners","Scope":"MLB"},{"teamId":2807,"teamName":"Texas Rangers","Scope":"MLB"},{"teamId":2796,"teamName":"Atlanta Braves","Scope":"MLB"},{"teamId":2814,"teamName":"Miami Marlins","Scope":"MLB"},{"teamId":2813,"teamName":"Washington Nationals","Scope":"MLB"},{"teamId":2812,"teamName":"New York Mets","Scope":"MLB"},{"teamId":2815,"teamName":"Philadelphia Phillies","Scope":"MLB"},{"teamId":2791,"teamName":"Boston Red Sox","Scope":"MLB"},{"teamId":2795,"teamName":"Chicago Cubs","Scope":"MLB"},{"teamId":2816,"teamName":"Cincinnati Reds","Scope":"MLB"},{"teamId":2811,"teamName":"Houston Astros","Scope":"MLB"},{"teamId":2801,"teamName":"Milwaukee Brewers","Scope":"MLB"},{"teamId":2817,"teamName":"Pittsburgh Pirates","Scope":"MLB"},{"teamId":2805,"teamName":"St. Louis Cardinals","Scope":"MLB"},{"teamId":2793,"teamName":"Arizona Diamondbacks","Scope":"MLB"},{"teamId":2800,"teamName":"Colorado Rockies","Scope":"MLB"},{"teamId":2818,"teamName":"Los Angeles Dodgers","Scope":"MLB"},{"teamId":2794,"teamName":"San Diego Padres","Scope":"MLB"},{"teamId":2803,"teamName":"New York Yankees","Scope":"MLB"},{"teamId":2819,"teamName":"San Francisco Giants","Scope":"MLB"},{"teamId":2798,"teamName":"Tampa Bay Rays","Scope":"MLB"},{"teamId":2802,"teamName":"Toronto Blue Jays","Scope":"MLB"},{"teamId":2790,"teamName":"Chicago White Sox","Scope":"MLB"},{"teamId":2809,"teamName":"Cleveland Indians","Scope":"MLB"},{"teamId":2797,"teamName":"Detroit Tigers","Scope":"MLB"},{"teamId":2806,"teamName":"Kansas City Royals","Scope":"MLB"},{"teamId":135,"teamName":"Buffalo Bills","Scope":"NFL"},{"teamId":136,"teamName":"Miami Dolphins","Scope":"NFL"},{"teamId":137,"teamName":"New York Jets","Scope":"NFL"},{"teamId":138,"teamName":"New England Patriots","Scope":"NFL"},{"teamId":139,"teamName":"Cincinnati Bengals","Scope":"NFL"},{"teamId":140,"teamName":"Cleveland Browns","Scope":"NFL"},{"teamId":141,"teamName":"Baltimore Ravens","Scope":"NFL"},{"teamId":142,"teamName":"Pittsburgh Steelers","Scope":"NFL"},{"teamId":143,"teamName":"Indianapolis Colts","Scope":"NFL"},{"teamId":144,"teamName":"Jacksonville Jaguars","Scope":"NFL"},{"teamId":145,"teamName":"Houston Texans","Scope":"NFL"},{"teamId":146,"teamName":"Tennessee Titans","Scope":"NFL"},{"teamId":147,"teamName":"Denver Broncos","Scope":"NFL"},{"teamId":148,"teamName":"San Diego Chargers","Scope":"NFL"},{"teamId":149,"teamName":"Kansas City Chiefs","Scope":"NFL"},{"teamId":150,"teamName":"Oakland Raiders","Scope":"NFL"},{"teamId":151,"teamName":"Dallas Cowboys","Scope":"NFL"},{"teamId":152,"teamName":"Philadelphia Eagles","Scope":"NFL"},{"teamId":153,"teamName":"New York Giants","Scope":"NFL"},{"teamId":154,"teamName":"Washington Redskins","Scope":"NFL"},{"teamId":155,"teamName":"Chicago Bears","Scope":"NFL"},{"teamId":156,"teamName":"Detroit Lions","Scope":"NFL"},{"teamId":157,"teamName":"Green Bay Packers","Scope":"NFL"},{"teamId":158,"teamName":"Minnesota Vikings","Scope":"NFL"},{"teamId":159,"teamName":"Tampa Bay Buccaneers","Scope":"NFL"},{"teamId":160,"teamName":"Atlanta Falcons","Scope":"NFL"},{"teamId":161,"teamName":"Carolina Panthers","Scope":"NFL"},{"teamId":162,"teamName":"New Orleans Saints","Scope":"NFL"},{"teamId":163,"teamName":"San Francisco 49ers","Scope":"NFL"},{"teamId":164,"teamName":"Arizona Cardinals","Scope":"NFL"},{"teamId":165,"teamName":"Los Angeles Rams","Scope":"NFL"},{"teamId":166,"teamName":"Seattle Seahawks","Scope":"NFL"},{"teamId":16,"teamName":"Louisville Cardinals","Scope":"NCAAF"},{"teamId":17,"teamName":"Wake Forest Demon Deacons","Scope":"NCAAF"},{"teamId":18,"teamName":"Boston College Eagles","Scope":"NCAAF"},{"teamId":19,"teamName":"Syracuse Orange","Scope":"NCAAF"},{"teamId":20,"teamName":"Florida State Seminoles","Scope":"NCAAF"},{"teamId":21,"teamName":"North Carolina State Wolfpack","Scope":"NCAAF"},{"teamId":22,"teamName":"Duke Blue Devils","Scope":"NCAAF"},{"teamId":23,"teamName":"Virginia Cavaliers","Scope":"NCAAF"},{"teamId":24,"teamName":"Virginia Tech Hokies","Scope":"NCAAF"},{"teamId":25,"teamName":"Miami (FL) Hurricanes","Scope":"NCAAF"},{"teamId":26,"teamName":"North Carolina Tar Heels","Scope":"NCAAF"},{"teamId":27,"teamName":"Georgia Tech Yellow Jackets","Scope":"NCAAF"},{"teamId":28,"teamName":"South Florida Bulls","Scope":"NCAAF"},{"teamId":29,"teamName":"Connecticut Huskies","Scope":"NCAAF"},{"teamId":30,"teamName":"UCF Knights","Scope":"NCAAF"},{"teamId":31,"teamName":"Temple Owls","Scope":"NCAAF"},{"teamId":32,"teamName":"East Carolina Pirates","Scope":"NCAAF"},{"teamId":33,"teamName":"Tulsa Golden Hurricane","Scope":"NCAAF"},{"teamId":34,"teamName":"Tulane Green Wave","Scope":"NCAAF"},{"teamId":35,"teamName":"Navy Midshipmen","Scope":"NCAAF"},{"teamId":36,"teamName":"Southern Methodist Mustangs","Scope":"NCAAF"},{"teamId":37,"teamName":"Memphis Tigers","Scope":"NCAAF"},{"teamId":38,"teamName":"Ohio State Buckeyes","Scope":"NCAAF"},{"teamId":39,"teamName":"Indiana Hoosiers","Scope":"NCAAF"},{"teamId":40,"teamName":"Penn State Nittany Lions","Scope":"NCAAF"},{"teamId":41,"teamName":"Rutgers Scarlet Knights","Scope":"NCAAF"},{"teamId":42,"teamName":"Michigan State Spartans","Scope":"NCAAF"},{"teamId":43,"teamName":"Maryland Terrapins","Scope":"NCAAF"},{"teamId":44,"teamName":"Michigan Wolverines","Scope":"NCAAF"},{"teamId":45,"teamName":"Wisconsin Badgers","Scope":"NCAAF"},{"teamId":46,"teamName":"Purdue Boilermakers","Scope":"NCAAF"},{"teamId":47,"teamName":"Nebraska Cornhuskers","Scope":"NCAAF"},{"teamId":48,"teamName":"Illinois Fighting Illini","Scope":"NCAAF"},{"teamId":49,"teamName":"Iowa Hawkeyes","Scope":"NCAAF"},{"teamId":50,"teamName":"Northwestern Wildcats","Scope":"NCAAF"},{"teamId":51,"teamName":"Charlotte 49ers","Scope":"NCAAF"},{"teamId":52,"teamName":"Middle Tennessee Blue Raiders","Scope":"NCAAF"},{"teamId":53,"teamName":"Florida International Golden Panthers","Scope":"NCAAF"},{"teamId":54,"teamName":"Western Kentucky Hilltoppers","Scope":"NCAAF"},{"teamId":55,"teamName":"Old Dominion Monarchs","Scope":"NCAAF"},{"teamId":56,"teamName":"Florida Atlantic Owls","Scope":"NCAAF"},{"teamId":57,"teamName":"Marshall Thundering Herd","Scope":"NCAAF"},{"teamId":58,"teamName":"Louisiana Tech Bulldogs","Scope":"NCAAF"},{"teamId":59,"teamName":"Southern Miss Golden Eagles","Scope":"NCAAF"},{"teamId":60,"teamName":"North Texas Mean Green","Scope":"NCAAF"},{"teamId":61,"teamName":"UTEP Miners","Scope":"NCAAF"},{"teamId":62,"teamName":"Rice Owls","Scope":"NCAAF"},{"teamId":63,"teamName":"UTSA Roadrunners","Scope":"NCAAF"},{"teamId":64,"teamName":"Ohio Bobcats","Scope":"NCAAF"},{"teamId":65,"teamName":"Bowling Green Falcons","Scope":"NCAAF"},{"teamId":66,"teamName":"Kent State Golden Flashes","Scope":"NCAAF"},{"teamId":67,"teamName":"Miami (OH) RedHawks","Scope":"NCAAF"},{"teamId":68,"teamName":"Akron Zips","Scope":"NCAAF"},{"teamId":69,"teamName":"Western Michigan Broncos","Scope":"NCAAF"},{"teamId":70,"teamName":"Ball State Cardinals","Scope":"NCAAF"},{"teamId":71,"teamName":"Central Michigan Chippewas","Scope":"NCAAF"},{"teamId":72,"teamName":"Eastern Michigan Eagles","Scope":"NCAAF"},{"teamId":73,"teamName":"Northern Illinois Huskies","Scope":"NCAAF"},{"teamId":74,"teamName":"Toledo Rockets","Scope":"NCAAF"},{"teamId":75,"teamName":"Utah State Aggies","Scope":"NCAAF"},{"teamId":76,"teamName":"Boise State Broncos","Scope":"NCAAF"},{"teamId":77,"teamName":"Wyoming Cowboys","Scope":"NCAAF"},{"teamId":78,"teamName":"Air Force Falcons","Scope":"NCAAF"},{"teamId":79,"teamName":"New Mexico Lobos","Scope":"NCAAF"},{"teamId":80,"teamName":"Colorado State Rams","Scope":"NCAAF"},{"teamId":81,"teamName":"San Diego State Aztecs","Scope":"NCAAF"},{"teamId":82,"teamName":"Fresno State Bulldogs","Scope":"NCAAF"},{"teamId":83,"teamName":"UNLV Rebels","Scope":"NCAAF"},{"teamId":84,"teamName":"San Jose State Spartans","Scope":"NCAAF"},{"teamId":85,"teamName":"Hawaii Warriors","Scope":"NCAAF"},{"teamId":86,"teamName":"Nevada Wolf Pack","Scope":"NCAAF"},{"teamId":87,"teamName":"UCLA Bruins","Scope":"NCAAF"},{"teamId":88,"teamName":"Colorado Buffaloes","Scope":"NCAAF"},{"teamId":89,"teamName":"Arizona State Sun Devils","Scope":"NCAAF"},{"teamId":90,"teamName":"USC Trojans","Scope":"NCAAF"},{"teamId":91,"teamName":"Utah Utes","Scope":"NCAAF"},{"teamId":92,"teamName":"California Bears","Scope":"NCAAF"},{"teamId":93,"teamName":"Oregon State Beavers","Scope":"NCAAF"},{"teamId":94,"teamName":"Stanford Cardinal","Scope":"NCAAF"},{"teamId":95,"teamName":"Washington State Cougars","Scope":"NCAAF"},{"teamId":96,"teamName":"Oregon Ducks","Scope":"NCAAF"},{"teamId":97,"teamName":"Texas A&M Aggies","Scope":"NCAAF"},{"teamId":98,"teamName":"Mississippi State Bulldogs","Scope":"NCAAF"},{"teamId":99,"teamName":"Alabama Crimson Tide","Scope":"NCAAF"},{"teamId":100,"teamName":"Arkansas Razorbacks","Scope":"NCAAF"},{"teamId":101,"teamName":"Ole Miss Rebels","Scope":"NCAAF"},{"teamId":102,"teamName":"Auburn Tigers","Scope":"NCAAF"},{"teamId":103,"teamName":"LSU Tigers","Scope":"NCAAF"},{"teamId":104,"teamName":"Georgia Bulldogs","Scope":"NCAAF"},{"teamId":105,"teamName":"Vanderbilt Commodores","Scope":"NCAAF"},{"teamId":106,"teamName":"South Carolina Gamecocks","Scope":"NCAAF"},{"teamId":107,"teamName":"Florida Gators","Scope":"NCAAF"},{"teamId":108,"teamName":"Missouri Tigers","Scope":"NCAAF"},{"teamId":109,"teamName":"Kentucky Wildcats","Scope":"NCAAF"},{"teamId":110,"teamName":"Baylor Bears","Scope":"NCAAF"},{"teamId":111,"teamName":"Oklahoma State Cowboys","Scope":"NCAAF"},{"teamId":112,"teamName":"Iowa State Cyclones","Scope":"NCAAF"},{"teamId":113,"teamName":"TCU Horned Frogs","Scope":"NCAAF"},{"teamId":114,"teamName":"Kansas Jayhawks","Scope":"NCAAF"},{"teamId":115,"teamName":"Texas Longhorns","Scope":"NCAAF"},{"teamId":116,"teamName":"West Virginia Mountaineers","Scope":"NCAAF"},{"teamId":117,"teamName":"Texas Tech Red Raiders","Scope":"NCAAF"},{"teamId":118,"teamName":"Oklahoma Sooners","Scope":"NCAAF"},{"teamId":119,"teamName":"Kansas State Wildcats","Scope":"NCAAF"},{"teamId":120,"teamName":"Army Black Knights","Scope":"NCAAF"},{"teamId":121,"teamName":"Brigham Young Cougars","Scope":"NCAAF"},{"teamId":122,"teamName":"Notre Dame Fighting Irish","Scope":"NCAAF"},{"teamId":123,"teamName":"Massachusetts Minutemen","Scope":"NCAAF"},{"teamId":124,"teamName":"New Mexico State Aggies","Scope":"NCAAF"},{"teamId":125,"teamName":"Texas State Bobcats","Scope":"NCAAF"},{"teamId":126,"teamName":"Georgia Southern Eagles","Scope":"NCAAF"},{"teamId":127,"teamName":"South Alabama Jaguars","Scope":"NCAAF"},{"teamId":128,"teamName":"Appalachian State Mountaineers","Scope":"NCAAF"},{"teamId":129,"teamName":"Georgia State Panthers","Scope":"NCAAF"},{"teamId":130,"teamName":"Louisiana-Lafayette Ragin' Cajuns","Scope":"NCAAF"},{"teamId":131,"teamName":"Arkansas State Red Wolves","Scope":"NCAAF"},{"teamId":132,"teamName":"Troy Trojans","Scope":"NCAAF"},{"teamId":133,"teamName":"Idaho Vandals","Scope":"NCAAF"},{"teamId":134,"teamName":"Louisiana-Monroe Warhawks","Scope":"NCAAF"},{"teamId":167,"teamName":"Clemson Tigers","Scope":"NCAAF"},{"teamId":168,"teamName":"Pittsburgh Panthers","Scope":"NCAAF"},{"teamId":169,"teamName":"Cincinnati Bearcats","Scope":"NCAAF"},{"teamId":170,"teamName":"Houston Cougars","Scope":"NCAAF"},{"teamId":171,"teamName":"Minnesota Golden Gophers","Scope":"NCAAF"},{"teamId":172,"teamName":"Buffalo Bulls","Scope":"NCAAF"},{"teamId":173,"teamName":"Arizona Wildcats","Scope":"NCAAF"},{"teamId":174,"teamName":"Washington Huskies","Scope":"NCAAF"},{"teamId":175,"teamName":"Tennessee Volunteers","Scope":"NCAAF"}]
    fuse = new Fuse(res, {
      keys: ['teamName'],
      threshold: 0.2
    });
    bootstrapSearchInputs();
  }
  // Deprecated - Removed
  //Builds static ad
  // var bootstrapAd = function(){
  //
  //   var adNode = document.getElementById('ddb-ad');
  //   var adScript = document.createElement('script');
  //   adScript.innerHTML = '';
  //   adScript.src = protocol + '://content.synapsys.us/l/n/igloo.php?type=inline_ad&adW=300&adH=250&widW=0&widH=0&remn=false&rand=' + Math.floor((Math.random() * 10000000000) + 1) + '&dom=chicagotribune.com&norotate=true';
  //   adNode.appendChild(adScript);
  // }
  //Builds dynamic dropdown (1 dropdown to many tabs) that houses the ad
  var bootstrapDynamicDropdown = function(){
    var navItems = document.getElementsByClassName('ddb-menu-nav-item ddb-dynamic-item'); //Tab elements that the dynamic dropdown applies too
    var dynamicDropdown = document.getElementsByClassName('ddb-dynamic-dropdown')[0]; //Dynamic dropdown element
    var dynamicNav = document.getElementById('ddb-dynamic-nav'); //Nav of dynamic dropdown
    var dynamicLinks = document.getElementById('ddb-dynamic-links'); //Links of dynamic dropdown

    var mlbDropdownElements = bootstrapMLBDropdown();
    var nbaDropdownElements = bootstrapNBADropdown();
    var nflDropdownElements = bootstrapNFLDropdown();

    // Deprecated: Removed
    // var adLoaded = false; //Determine if the ad has been built

    var mouseEnterEvent = function(evt){
      // Deprecated: Removed
      //If the ad has not been loaded yet, bootstrap ad
      // if(!adLoaded){
      //   adLoaded = true;
      //   bootstrapAd();
      // }

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

          if(apiConfig.getRemoteAddress.hasLoaded === true && apiConfig.teamsNCAAM.isLoading === false && apiConfig.teamsNCAAM.hasLoaded === false){
            bootstrapDynamicCollegeBasketball(apiConfig.getRemoteAddress.res, apiConfig.getRemoteAddress.success);
          }else if(apiConfig.teamsNCAAM.hasLoaded === true){
            dynamicNav.appendChild(ncaamDropdownElements.nav);
            dynamicLinks.appendChild(ncaamDropdownElements.links);
          }
        break;
        case 'ddb-dropdown-nfl':
          dynamicDropdown.id = 'ddb-dynamic-nfl';

          dynamicNav.appendChild(nflDropdownElements.nav);
          dynamicLinks.appendChild(nflDropdownElements.links);
        break;
        case 'ddb-dropdown-ncaaf':
          dynamicDropdown.id = 'ddb-dynamic-ncaaf';

          if(apiConfig.getRemoteAddress.hasLoaded === true && apiConfig.teamsNCAAF.isLoading === false && apiConfig.teamsNCAAF.hasLoaded === false){
            bootstrapDynamicCollegeFootball(apiConfig.getRemoteAddress.res, apiConfig.getRemoteAddress.success);
          }else if(apiConfig.teamsNCAAF.hasLoaded === true){
            dynamicNav.appendChild(ncaafDropdownElements.nav);
            dynamicLinks.appendChild(ncaafDropdownElements.links);
          }
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
  }
  /**
   * Other functions
   **/

  //Applies branding stylesheet for certain elements
  var brandBar = function(){
      var brandHex = params.brandHex;
      //Check if brand hex exists
      if(brandHex === null){
          return false;
      }
      var brandStyleEl = document.createElement('style');
      brandStyleEl.dataset.resource_from = 'deepdive-bar-embed';
      brandStyleEl.innerHTML = `
        .ddb-brand-text{
            color: ` + brandHex + ` !important;
        }
        .ddb-brand-background{
            background-color: ` + brandHex + ` !important;
        }
        .ddb-brand-border{
            border-color: ` + brandHex + ` !important;
        }
        .ddb-menu-dropdown-events.ddb-active .ddb-menu-dropdown-events-button.ddb-brand-boxscores-filter{
            background-color: ` + brandHex + ` !important;
            border-color: ` + brandHex + ` !important;
        }
        .ddb-menu-dropdown-events-options-list>li.ddb-active.ddb-brand-boxscores-option{
            background-color: ` + brandHex + ` !important;
            border-color: ` + brandHex + ` !important;
        }
        .ddb-menu-dropdown-events-options-list>li.ddb-brand-boxscores-option:hover{
            border-color: ` + brandHex + ` !important;
        }
        .ddb-boxscores-button.ddb-blue.ddb-brand-boxscores-button{
            background-color: ` + brandHex + `;
        }
        .ddb-brand-menu-hover:hover{
            background-color: ` + brandHex + ` !important;
        }
        .ddb-brand-menu-hover:hover i{
            color: #fff !important;
        }
        .ddb-brand-menu-hover:hover:after{
            background-color: ` + brandHex + ` !important;
        }
        .ddb-brand-all-conferences{
            border-color: ` + brandHex + ` !important;
            color: ` + brandHex + ` !important;
        }
        .ddb-brand-all-conferences:hover{
            background-color: ` + brandHex + ` !important;
            color: #fff !important;
        }
        .ddb-brand-search-result .ddb-icon{
            color: ` + brandHex + ` !important;
        }
        .ddb-brand-search-result:hover, .ddb-search-active>.ddb-brand-search-result{
            background-color: ` + brandHex + ` !important;
        }
        .ddb-brand-search-result:hover .ddb-icon, .ddb-search-active>.ddb-brand-search-result .ddb-icon{
            color: #fff !important;
        }
      `;
      document.head.appendChild(brandStyleEl);
  }

  //Load any style/link dependencies. This is called before the dom content is loaded
  function loadLinkDependencies(){
     //Brand Bar
     if(params.brandHex !== null){
         brandBar();
     }
     //Load styles
     var styleEl = document.createElement('link');
     styleEl.rel = 'stylesheet';
     styleEl.type = 'text/css';
     styleEl.dataset.resource_from = 'deepdive-bar-embed';
     styleEl.href = resourceURL + '/bar/bar.min.css';
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
  }

   //Load any script dependencies. This is fired after the dom content is loaded
   function loadScriptDependencies(){
    /** * @license * Fuse - Lightweight fuzzy-search * * Copyright (c) 2012-2016 Kirollos Risk <kirollos@gmail.com>.  * All Rights Reserved. Apache Software License 2.0 * * Licensed under the Apache License, Version 2.0 (the "License") * you may not use this file except in compliance with the License.  * You may obtain a copy of the License at * * http://www.apache.org/licenses/LICENSE-2.0 * * Unless required by applicable law or agreed to in writing, software * distributed under the License is distributed on an "AS IS" BASIS, * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  * See the License for the specific language governing permissions and * limitations under the License.  */
    !function(t){"use strict";function e(){console.log.apply(console,arguments)}function s(t,e){var s,n,o,i;for(this.list=t,this.options=e=e||{},s=0,i=["sort","shouldSort","verbose","tokenize"],n=i.length;n>s;s++)o=i[s],this.options[o]=o in e?e[o]:r[o];for(s=0,i=["searchFn","sortFn","keys","getFn","include","tokenSeparator"],n=i.length;n>s;s++)o=i[s],this.options[o]=e[o]||r[o]}function n(t,e,s){var i,r,h,a,c,p;if(e){if(h=e.indexOf("."),-1!==h?(i=e.slice(0,h),r=e.slice(h+1)):i=e,a=t[i],null!==a&&void 0!==a)if(r||"string"!=typeof a&&"number"!=typeof a)if(o(a))for(c=0,p=a.length;p>c;c++)n(a[c],r,s);else r&&n(a,r,s);else s.push(a)}else s.push(t);return s}function o(t){return"[object Array]"===Object.prototype.toString.call(t)}function i(t,e){e=e||{},this.options=e,this.options.location=e.location||i.defaultOptions.location,this.options.distance="distance"in e?e.distance:i.defaultOptions.distance,this.options.threshold="threshold"in e?e.threshold:i.defaultOptions.threshold,this.options.maxPatternLength=e.maxPatternLength||i.defaultOptions.maxPatternLength,this.pattern=e.caseSensitive?t:t.toLowerCase(),this.patternLen=t.length,this.patternLen<=this.options.maxPatternLength&&(this.matchmask=1<<this.patternLen-1,this.patternAlphabet=this._calculatePatternAlphabet())}var r={id:null,caseSensitive:!1,include:[],shouldSort:!0,searchFn:i,sortFn:function(t,e){return t.score-e.score},getFn:n,keys:[],verbose:!1,tokenize:!1,matchAllTokens:!1,tokenSeparator:/ +/g};s.VERSION="2.5.0",s.prototype.set=function(t){return this.list=t,t},s.prototype.search=function(t){this.options.verbose&&e("\nSearch term:",t,"\n"),this.pattern=t,this.results=[],this.resultMap={},this._keyMap=null,this._prepareSearchers(),this._startSearch(),this._computeScore(),this._sort();var s=this._format();return s},s.prototype._prepareSearchers=function(){var t=this.options,e=this.pattern,s=t.searchFn,n=e.split(t.tokenSeparator),o=0,i=n.length;if(this.options.tokenize)for(this.tokenSearchers=[];i>o;o++)this.tokenSearchers.push(new s(n[o],t));this.fullSeacher=new s(e,t)},s.prototype._startSearch=function(){var t,e,s,n,o=this.options,i=o.getFn,r=this.list,h=r.length,a=this.options.keys,c=a.length,p=null;if("string"==typeof r[0])for(s=0;h>s;s++)this._analyze("",r[s],s,s);else for(this._keyMap={},s=0;h>s;s++)for(p=r[s],n=0;c>n;n++){if(t=a[n],"string"!=typeof t){if(e=1-t.weight||1,this._keyMap[t.name]={weight:e},t.weight<=0||t.weight>1)throw new Error("Key weight has to be > 0 and <= 1");t=t.name}else this._keyMap[t]={weight:1};this._analyze(t,i(p,t,[]),p,s)}},s.prototype._analyze=function(t,s,n,i){var r,h,a,c,p,l,u,f,d,g,m,y,k,v,S,b=this.options,_=!1;if(void 0!==s&&null!==s){h=[];var M=0;if("string"==typeof s){if(r=s.split(b.tokenSeparator),b.verbose&&e("---------\nKey:",t),this.options.tokenize){for(v=0;v<this.tokenSearchers.length;v++){for(f=this.tokenSearchers[v],b.verbose&&e("Pattern:",f.pattern),d=[],y=!1,S=0;S<r.length;S++){g=r[S],m=f.search(g);var L={};m.isMatch?(L[g]=m.score,_=!0,y=!0,h.push(m.score)):(L[g]=1,this.options.matchAllTokens||h.push(1)),d.push(L)}y&&M++,b.verbose&&e("Token scores:",d)}for(c=h[0],l=h.length,v=1;l>v;v++)c+=h[v];c/=l,b.verbose&&e("Token score average:",c)}u=this.fullSeacher.search(s),b.verbose&&e("Full text score:",u.score),p=u.score,void 0!==c&&(p=(p+c)/2),b.verbose&&e("Score average:",p),k=this.options.tokenize&&this.options.matchAllTokens?M>=this.tokenSearchers.length:!0,b.verbose&&e("Check Matches",k),(_||u.isMatch)&&k&&(a=this.resultMap[i],a?a.output.push({key:t,score:p,matchedIndices:u.matchedIndices}):(this.resultMap[i]={item:n,output:[{key:t,score:p,matchedIndices:u.matchedIndices}]},this.results.push(this.resultMap[i])))}else if(o(s))for(v=0;v<s.length;v++)this._analyze(t,s[v],n,i)}},s.prototype._computeScore=function(){var t,s,n,o,i,r,h,a,c,p=this._keyMap,l=this.results;for(this.options.verbose&&e("\n\nComputing score:\n"),t=0;t<l.length;t++){for(n=0,o=l[t].output,i=o.length,a=1,s=0;i>s;s++)r=o[s].score,h=p?p[o[s].key].weight:1,c=r*h,1!==h?a=Math.min(a,c):(n+=c,o[s].nScore=c);1===a?l[t].score=n/i:l[t].score=a,this.options.verbose&&e(l[t])}},s.prototype._sort=function(){var t=this.options;t.shouldSort&&(t.verbose&&e("\n\nSorting...."),this.results.sort(t.sortFn))},s.prototype._format=function(){var t,s,n,o,i,r=this.options,h=r.getFn,a=[],c=this.results,p=r.include;for(r.verbose&&e("\n\nOutput:\n\n",c),o=r.id?function(t){c[t].item=h(c[t].item,r.id,[])[0]}:function(){},i=function(t){var e,s,n,o,i,r=c[t];if(p.length>0){if(e={item:r.item},-1!==p.indexOf("matches"))for(n=r.output,e.matches=[],s=0;s<n.length;s++)o=n[s],i={indices:o.matchedIndices},o.key&&(i.key=o.key),e.matches.push(i);-1!==p.indexOf("score")&&(e.score=c[t].score)}else e=r.item;return e},s=0,n=c.length;n>s;s++)o(s),t=i(s),a.push(t);return a},i.defaultOptions={location:0,distance:100,threshold:.6,maxPatternLength:32},i.prototype._calculatePatternAlphabet=function(){var t={},e=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]|=1<<this.pattern.length-e-1;return t},i.prototype._bitapScore=function(t,e){var s=t/this.patternLen,n=Math.abs(this.options.location-e);return this.options.distance?s+n/this.options.distance:n?1:s},i.prototype.search=function(t){var e,s,n,o,i,r,h,a,c,p,l,u,f,d,g,m,y,k,v,S,b,_,M=this.options;if(t=M.caseSensitive?t:t.toLowerCase(),this.pattern===t)return{isMatch:!0,score:0,matchedIndices:[[0,t.length-1]]};if(this.patternLen>M.maxPatternLength){if(y=t.match(new RegExp(this.pattern.replace(M.tokenSeparator,"|"))),k=!!y)for(S=[],e=0,b=y.length;b>e;e++)_=y[e],S.push([t.indexOf(_),_.length-1]);return{isMatch:k,score:k?.5:1,matchedIndices:S}}for(o=M.location,n=t.length,i=M.threshold,r=t.indexOf(this.pattern,o),v=[],e=0;n>e;e++)v[e]=0;for(-1!=r&&(i=Math.min(this._bitapScore(0,r),i),r=t.lastIndexOf(this.pattern,o+this.patternLen),-1!=r&&(i=Math.min(this._bitapScore(0,r),i))),r=-1,g=1,m=[],c=this.patternLen+n,e=0;e<this.patternLen;e++){for(h=0,a=c;a>h;)this._bitapScore(e,o+a)<=i?h=a:c=a,a=Math.floor((c-h)/2+h);for(c=a,p=Math.max(1,o-a+1),l=Math.min(o+a,n)+this.patternLen,u=Array(l+2),u[l+1]=(1<<e)-1,s=l;s>=p;s--)if(d=this.patternAlphabet[t.charAt(s-1)],d&&(v[s-1]=1),0===e?u[s]=(u[s+1]<<1|1)&d:u[s]=(u[s+1]<<1|1)&d|((f[s+1]|f[s])<<1|1)|f[s+1],u[s]&this.matchmask&&(g=this._bitapScore(e,s-1),i>=g)){if(i=g,r=s-1,m.push(r),!(r>o))break;p=Math.max(1,2*o-r)}if(this._bitapScore(e+1,o)>i)break;f=u}return S=this._getMatchedIndices(v),{isMatch:r>=0,score:0===g?.001:g,matchedIndices:S}},i.prototype._getMatchedIndices=function(t){for(var e,s=[],n=-1,o=-1,i=0,r=t.length;r>i;i++)e=t[i],e&&-1===n?n=i:e||-1===n||(o=i-1,s.push([n,o]),n=-1);return t[i-1]&&s.push([n,i-1]),s},"object"==typeof exports?module.exports=s:"function"==typeof define&&define.amd?define(function(){return s}):t.Fuse=s}(this);
    bootstrapSearch();

    var bluebird = document.createElement('script');
    bluebird.type = 'text/javascript';
    bluebird.dataset.resource_from = 'deepdive-bar-embed';
    bluebird.src = resourceURL + '/lib/bluebird_3.4.5.min.js';
    //Wait for bluebird js to load before bootstrapping boxscores
    if (bluebird.readyState) { //IE
     bluebird.onreadystatechange = function () {
       if (bluebird.readyState == "loaded" || bluebird.readyState == "complete") {
         bluebird.onreadystatechange = null;
         //bootstrapBoxscores(); now within bootstrapMobileMnue and bootstrapDesktopBoxscores
         bootstrapMobileMenu();
         bootstrapDesktopBoxscores();
       }
     };
    } else { //Others
     bluebird.onload = function (){
        //bootstrapBoxscores(); now within bootstrapMobileMnue and bootstrapDesktopBoxscores
        bootstrapMobileMenu();
        bootstrapDesktopBoxscores();
      };
    }

    if(!window.Promise){
      //If promise is not defined for browser load bluebird
      document.head.appendChild(bluebird);
    }else{
      //Else start loading boxscores
      //bootstrapBoxscores(); now within bootstrapMobileMnue and bootstrapDesktopBoxscores
      bootstrapMobileMenu();
      bootstrapDesktopBoxscores();
    }

   }

   //Gets state of user's isp
   var getUserLocation = function(){

     var apiString = apiConfig.getRemoteAddress.url();
     apiConfig.getRemoteAddress.isLoading = true;

     var xhttp = createRequestObject();
     xhttp.onreadystatechange = function(){
       if(xhttp.readyState === 4 && xhttp.status === 200){
         //Success
         var res = JSON.parse(xhttp.responseText);
         //console.log('GET USER LOCATION SUCCESS', res);

         var state = processLocationData(res);
         apiConfig.getRemoteAddress.res = state;
         apiConfig.getRemoteAddress.isLoading = false;
         apiConfig.getRemoteAddress.hasLoaded = true;
         apiConfig.getRemoteAddress.success = true;

         // Deprecated : Ticker removed
         // TODO : remove
         //Check for screen size to load certain modules
         // resizeEvent();
         // window.addEventListener('resize', resizeEvent);
      }else if(xhttp.readyState === 4 && xhttp.status !== 200){
         //Error
         //console.log('GET USER LOCATION ERROR');
         var state = processLocationData(undefined);
         apiConfig.getRemoteAddress.res = state;
         apiConfig.getRemoteAddress.isLoading = false;
         apiConfig.getRemoteAddress.hasLoaded = true;
         apiConfig.getRemoteAddress.success = false;

         // Deprecated : Ticker removed
         // TODO : remove
         //Check for screen size to load certain modules
         //  resizeEvent();
         //  window.addEventListener('resize', resizeEvent);
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

       if (houseSite == true) {
         return hoopsDomain + '/NCAA/team/' + full_name + '/' + teamId;
       }
       else {
         return hoopsDomain + '/NCAA/t/' + full_name + '/' + teamId;
       }

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
              <td colspan="3" class="ddb-brand-text">
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
           tableInnerHTML += '<tr><td><a target="_blank" href="' + buildLink(item.full_name, item.team_id) + '">' + item.full_name + '</a></td>';
         }else if(mod === 1){
           //Middle Column
           tableInnerHTML += '<td><a target="_blank" href="' + buildLink(item.full_name, item.team_id) + '">' + item.full_name + '</a></td>';
         }else if(mod === 2){
           //Last Column
           tableInnerHTML += '<td><a target="_blank" href="' + buildLink(item.full_name, item.team_id) + '">' + item.full_name + '</a></td></tr>';
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

       if(params.footballSubdomain !== null){
         return touchdownDomain + '/ncaaf/team/' + full_name + '/' + teamId;
       }else{
         return touchdownDomain + '/ncaaf/t/' + full_name + '/' + teamId;
       }
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
              <td colspan="3" class="ddb-brand-text">
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
           tableInnerHTML += '<tr><td><a target="_blank" href="' + buildLink(item.full_name, item.id) + '">' + item.full_name + '</a></td>';
         }else if(mod === 1){
           //Middle Column
           tableInnerHTML += '<td><a target="_blank" href="' + buildLink(item.full_name, item.id) + '">' + item.full_name + '</a></td>';
         }else if(mod === 2){
           //Last Column
           tableInnerHTML += '<td><a target="_blank" href="' + buildLink(item.full_name, item.id) + '">' + item.full_name + '</a></td></tr>';
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

   var processBaseballBoxscoresData = function(data, offset, tzAbbrev, todayDate){
     var error = false;
     for(var index in data){
       if (!data[index].gameInfo) {
         error = true;
       }
       break;
     }
     var pre = [], active = [], post = [];
     if (error == false) {
       var buildNode = function(data){
         var gameNode = document.createElement('div');
         gameNode.className = 'ddb-boxscores-content-game';
         gameNode.innerHTML = `
           <a target="_blank" class="ddb-boxscores-content-game-link" href="` + data.link + `">
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

       var getDatetime = function(timestamp, offset){
           var datetime; //Built datetie
           var dateString = new Date(timestamp + offset * 3600 * 1000);
           var year = dateString.getUTCFullYear();
           var month = dateString.getUTCMonth() + 1;
           month = month.toString().length === 1 ? '0' + month.toString() : month;
           var date = dateString.getUTCDate();
           date = date.toString().length === 1 ? '0' + date.toString() : date;

           datetime = year + '-' + month + '-' + date;

           return datetime;
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
                  var datetime = getDatetime(item.gameInfo.startDateTimestamp, easternTime.offset);

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
                  var datetime2 = getDatetime(item.gameInfo.startDateTimestamp, easternTime.offset);

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
     else {
       return [];
     }
   }

   var processFootballBoxscoresData = function(data, offset, tzAbbrev, todayDate, vertical){
     var pre = [], active = [], post = [];
     var wpre = [], wpost = [];

     var buildNode = function(data){
       var gameNode = document.createElement('div');
       gameNode.className = 'ddb-boxscores-content-game';
       gameNode.innerHTML = `
         <a target="_blank" class="ddb-boxscores-content-game-link" href="` + data.link + `">
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

   // Deprecated : Ticker removed
   // TODO : remove
   // var resizeEvent = throttle(function(){
   //   var windowWidth = window.innerWidth;
   //
   //   //If window is large enough and get remote address api has finsihed
   //   if(windowWidth >= 1280 && apiConfig.tickerMLB.isLoading === false && apiConfig.tickerMLB.hasLoaded === false){
   //     bootstrapTicker();
   //   }
   // }, 100);
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
  //Throttle function
  function throttle(fn, threshhold, scope){
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function () {
      var context = scope || this;

      var now = +new Date,
          args = arguments;
      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;
          fn.apply(context, args);
        }, threshhold + last - now);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  }
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
