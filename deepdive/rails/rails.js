(function(){
  var embedURL = 'http://w1.synapsys.us/widgets/deepdive/rails/rails.js'
  var currentScript = document.currentScript || (function() {
    var scripts = document.getElementsByTagName("script");
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (scripts[i].src.indexOf(embedURL) != -1) {
        return scripts[i];
      }
    }
  })();

  var queryString = currentScript.src.split('?')[1];
  if(typeof queryString === 'undefined'){
    console.warn(`Skyscraper Rails - Must specify query string.
      Paramters:
      [selector] - selector of content that the rails are aligned with. (ex. selector=section.main-container)
      [adMarginTop] - amount of pixels the skyscraper ads should be pushed down from the top of the page. Defaults to 0 if not specified (ex. adMarginTop=100)
    `);
    return false;
  }else{
    //Parse query string
    var params = queryString.split('&');
    //Define query params
    var selector, adMarginTop;
    params.forEach(function(item){
      var pair = item.split('=');
      switch(pair[0]){
        case 'selector':
          selector = decodeURIComponent(pair[1]);
        break;
        case 'adMarginTop':
          adMarginTop = decodeURIComponent(pair[1]);
        break;
      }
    })

    //Check if required variables are defined
    try{
      if(typeof selector === 'undefined'){
        throw 'Must specify unique content selector for Skyscraper Rails. (ex. "selector=section.main-container")';
      }
      if(typeof adMarginTop !== 'undefined' && isNaN(adMarginTop)){
        throw 'Ad Margin Top must be a number. (ex "adMarginTop=100")';
      }
    }catch(e){
        console.warn('Skyscraper Rails - ' + e);
        return false;
    }
  }

  //Determine amount of px the (set value or default ot 0)
  var railMarginTop = adMarginTop || 0; //Amount of pixels the ads are pushed down from the top of the page

  //Find content container based on selector
  var contentEl = document.querySelector(selector);
  //Check if main content container exists
  if(contentEl === null){
    console.warn('Skyscraper Rails - Could not find container that matches selector.');
    return false;
  }

  var body = document.getElementsByTagName("body")[0];
  var protocol = (location.protocol) === 'https:' ? 'https' : 'http';
  var leftRail, rightRail;
  var railsLoaded = false; //If rails have been built
  var railsVisible = false; //If rails are visible
  var railWidth = 500; //Width of rails (width of rail images)

  var buildRails = function(){
    leftRail = document.createElement('section');
    leftRail.className = 'ddto-left-rail ddto-rail-visible';
    leftRail.innerHTML = `
      <div id="ddto-left-ad">
        <img class="ddto-left-ad-presented" src="` + protocol + `://content.synapsys.us/deepdive/images/logo_left.png">
      </div>
    `;

    rightRail = document.createElement('section');
    rightRail.className = 'ddto-right-rail ddto-rail-visible';
    rightRail.innerHTML = `
      <div id="ddto-right-ad">
        <img class="ddto-right-ad-presented" src="` + protocol + `://content.synapsys.us/deepdive/images/logo_right.png">
      </div>
    `;

    leftRail.style.left = getLeftRailPos();
    rightRail.style.left = getRightRailPos();

    body.insertBefore(rightRail, body.firstChild);
    body.insertBefore(leftRail, body.firstChild);

    //Inject left ad
    var leftAd = document.getElementById('ddto-left-ad');
    var leftEmbed = document.createElement('script');
    leftEmbed.src =  protocol + '://content.synapsys.us/embeds/mlb/deepdive_160x600/mlb.js';
    leftAd.insertBefore(leftEmbed, leftAd.firstChild);

    //Inject right ad
    var rightAd = document.getElementById('ddto-right-ad');
    var rightEmbed = document.createElement('script');
    rightEmbed.src = protocol + '://content.synapsys.us/embeds/mlb/deepdive_160x600/mlb.js';
    rightAd.insertBefore(rightEmbed, rightAd.firstChild);

    railsLoaded = true;
    railsVisible = true;
  }

  //Get position of left rail
  var getLeftRailPos = function(){
    var contentLeft = contentEl.getBoundingClientRect().left;
    return (contentLeft - railWidth) + 'px';
  }

  //Get position of right rail
  var getRightRailPos = function(){
    var contentLeft = contentEl.getBoundingClientRect().left;
    var contentWidth = contentEl.offsetWidth;

    return (contentLeft + contentWidth) + 'px';
  }

  //Build and load stylesheet
  var styleEl = document.createElement('style');
  styleEl.dataset.resource_from = 'skyscraper-rails-embed';
  styleEl.innerHTML = `
    .ddto-left-rail{
      width: ` + railWidth + `px;
      position: fixed;
      top: 0;
      bottom: 0;
      background-image: url('` + protocol + `://content.synapsys.us/deepdive/images/baseball_left.jpg');
      display: none;
      background-color: #000;
      background-repeat: no-repeat;
      z-index: 100;
    }
    .ddto-left-rail.ddto-rail-visible{
      display: block;
    }
    #ddto-left-ad{
      width: 160px;
      height: 600px;
      position: absolute;
      top: ` + railMarginTop + `px;
      right: 0;
    }
    .ddto-left-ad-presented{
      position: absolute;
      bottom: -76px;
      right: 15px;
    }
    .ddto-right-rail{
      width: ` + railWidth + `px;
      position: fixed;
      top: 0;
      bottom: 0;
      background-image: url('` + protocol + `://content.synapsys.us/deepdive/images/baseball_right.jpg');
      display: none;
      background-color: #000;
      background-repeat: no-repeat;
      z-index: 100;
    }
    .ddto-right-rail.ddto-rail-visible{
      display: block;
    }
    #ddto-right-ad{
      width: 160px;
      height: 600px;
      position: absolute;
      top: ` + railMarginTop + `px;
      left: 0;
    }
    .ddto-right-ad-presented{
      position: absolute;
      bottom: -76px;
      left: 15px;
    }
  `;
  document.head.appendChild(styleEl);

  //Determine if screen is large enough for rails
  if((body.offsetWidth - contentEl.offsetWidth) >= 320){
    buildRails();
  }

  window.addEventListener('resize', function(){
      //Check if rails exist. Need to check here if resize function is manually called
      railsLoaded = document.getElementsByClassName('ddto-left-rail').length !== 0 && document.getElementsByClassName('ddto-right-rail').length !== 0;
      //Check if rails are visible. Need to check here if resize function is manually called
      if(railsLoaded){
        railsVisible = document.getElementsByClassName('ddto-left-rail ddto-rail-visible').length !== 0 && document.getElementsByClassName('ddto-right-rail ddto-rail-visible').length !== 0;
      }else{
        railsVisible = false;
      }
      var resizeBodyWidth = body.offsetWidth;
      var resizeContentWidth = contentEl.offsetWidth;
      //Determine if rails need to be loaded
      if(!railsLoaded && (resizeBodyWidth - resizeContentWidth) >= 320){
        buildRails();
      }
      //Determine if rails need to be hidden
      if(railsLoaded && railsVisible && (resizeBodyWidth - resizeContentWidth) < 320){
        railsVisible = false;
        leftRail.className = 'ddto-left-rail';
        rightRail.className = 'ddto-right-rail';
      }
      //Determine if rails need to be shown
      if(railsLoaded && !railsVisible && (resizeBodyWidth - resizeContentWidth) >= 320){
        railsVisible = true;
        leftRail.className = 'ddto-left-rail ddto-rail-visible';
        rightRail.className = 'ddto-right-rail ddto-rail-visible';
      }
      //Realign rails
      if(railsLoaded){
        leftRail.style.left = getLeftRailPos();
        rightRail.style.left = getRightRailPos();
      }
  })

})();
