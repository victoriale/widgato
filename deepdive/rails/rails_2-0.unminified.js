(function(skyscraperRails, undefined){
  skyscraperRails.embedSource = 'http://w1.synapsys.us/widgets/deepdive/rails/rails_2-0.js';

  var currentScript = document.currentScript || (function() {
    var scripts = document.getElementsByTagName("script");
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (scripts[i].src.indexOf(skyscraperRails.embedSource) != -1) {
        return scripts[i];
      }
    }
  })();

  var queryString = currentScript.src.split('?')[1];
  if(typeof queryString === 'undefined'){
    skyscraperRails.help();
    return false;
  }else{
    //Parse query string
    var params = queryString.split('&');
    //Define query params
    var selector, adMarginTop, vertical;
    params.forEach(function(item){
      var pair = item.split('=');
      switch(pair[0]){
        case 'selector':
          selector = decodeURIComponent(pair[1]);
        break;
        case 'adMarginTop':
          adMarginTop = decodeURIComponent(pair[1]);
        break;
        case 'vertical':
          vertical = decodeURIComponent(pair[1]);
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
  var imageLeftRail, imageRightRail, imagePresentedByLeft, imagePresentedByRight;
  skyscraperRails.railsLoaded = false; //If rails have been built
  skyscraperRails.railsVisible = false; //If rails are visible
  var railWidth = 500; //Width of rails (width of rail images)

  switch(vertical){
    case 'mlb':
      imageLeftRail = protocol + '://w1.synapsys.us/widgets/deepdive/images/baseball/rail_left.jpg';
      imageRightRail = protocol + '://w1.synapsys.us/widgets/deepdive/images/baseball/rail_right.jpg';
      imagePresentedByLeft = imagePresentedByRight = protocol + '://w1.synapsys.us/widgets/deepdive/images/baseball/presented.png';
    break;
    case 'nfl':
    case 'ncaaf':
      imageLeftRail = protocol + '://w1.synapsys.us/widgets/deepdive/images/football/rail_left.jpg';
      imageRightRail = protocol + '://w1.synapsys.us/widgets/deepdive/images/football/rail_right.jpg';
      imagePresentedByLeft = protocol + '://w1.synapsys.us/widgets/deepdive/images/footbal/presented_left.png';
      imagePresentedByRight = protocol + '://w1.synapsys.us/widgets/deepdive/images/footbal/presented)right.png';
    break;
    default:
      imageLeftRail = protocol + '://w1.synapsys.us/widgets/deepdive/images/baseball/rail_left.jpg';
      imageRightRail = protocol + '://w1.synapsys.us/widgets/deepdive/images/baseball/rail_right.jpg';
      imagePresentedByLeft = imagePresentedByRight = protocol + '://w1.synapsys.us/widgets/deepdive/images/baseball/presented.png';
    break;
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

  //Throttle function
  function throttle(fn, threshhold, scope) {
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

  //Build skyscraper rails
  skyscraperRails.buildRails = function(){

    if(skyscraperRails.railsLoaded){
      console.warn('Skyscraper Rails - Rails already built.');
      return false;
    }

    leftRail = document.createElement('section');
    leftRail.className = 'ddto-left-rail ddto-rail-visible';
    leftRail.innerHTML = `
      <div id="ddto-left-ad">
        <img class="ddto-left-ad-presented" src="` + imagePresentedByLeft + `">
      </div>
    `;

    rightRail = document.createElement('section');
    rightRail.className = 'ddto-right-rail ddto-rail-visible';
    rightRail.innerHTML = `
      <div id="ddto-right-ad">
        <img class="ddto-right-ad-presented" src="` + imagePresentedByRight + `">
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
    rightEmbed.src = protocol + '://content.synapsys.us/embeds/mlb/deepdive_160x600/mlb-right.js';
    rightAd.insertBefore(rightEmbed, rightAd.firstChild);

    skyscraperRails.railsLoaded = true;
    skyscraperRails.railsVisible = true;
  }

  //Help function
  skyscraperRails.help = function(){
    console.warn(`Skyscraper Rails - Must specify query string.
      Paramters:
      [vertical] - vertical of the skyscraper rails. Options are (mlb, nfl, and ncaaf)
      [selector] - selector of content that the rails are aligned with. (ex. selector=section.main-container)
      [adMarginTop] - amount of pixels the skyscraper ads should be pushed down from the top of the page. Defaults to 0 if not specified (ex. adMarginTop=100)
    `);
  }

  //Resize function
  skyscraperRails.resize = function(){
    var resizeBodyWidth = body.offsetWidth;
    var resizeContentWidth = contentEl.offsetWidth;
    //Determine if rails need to be loaded
    if(!skyscraperRails.railsLoaded && (resizeBodyWidth - resizeContentWidth) >= 320){
      skyscraperRails.buildRails();
    }
    //Determine if rails need to be hidden
    if(skyscraperRails.railsLoaded && skyscraperRails.railsVisible && (resizeBodyWidth - resizeContentWidth) < 320){
      skyscraperRails.railsVisible = false;
      leftRail.className = 'ddto-left-rail';
      rightRail.className = 'ddto-right-rail';
    }
    //Determine if rails need to be shown
    if(skyscraperRails.railsLoaded && !skyscraperRails.railsVisible && (resizeBodyWidth - resizeContentWidth) >= 320){
      skyscraperRails.railsVisible = true;
      leftRail.className = 'ddto-left-rail ddto-rail-visible';
      rightRail.className = 'ddto-right-rail ddto-rail-visible';
    }
    //Realign rails
    if(skyscraperRails.railsLoaded){
      leftRail.style.left = getLeftRailPos();
      rightRail.style.left = getRightRailPos();
    }
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
      background-image: url('` + imageLeftRail + `');
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
      background-image: url('` + imageRightRail + `');
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
  if(!skyscraperRails.railsLoaded && (body.offsetWidth - contentEl.offsetWidth) >= 320){
    skyscraperRails.buildRails();
  }

  window.addEventListener('resize', throttle(skycraperRails.resize, 400));

}(window.skycraperRails = window.skycraperRails || {}))

//console.log(window.skycraperRails);
