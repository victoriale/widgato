(function(){
  var body = document.getElementsByTagName("body")[0];
  var contentEl = document.getElementsByClassName('deep-dive container-fluid')[0]; //Main node of the content. This is needed to calculate position of rails and to add deep dive hero
  var protocol = (location.protocol) === 'https:' ? 'https' : 'http';
  var leftRail, rightRail;
  var railsLoaded = false; //If rails have been built
  var railsVisible = false; //If rails are visible
  var railWidth = 500; //Width of rails (width of rail images)
  var railMarginTop = 100;

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
    leftEmbed.src =  protocol + '://content.synapsys.us/embeds/mlb/deepdive_160x600/remnant.js';
    leftAd.insertBefore(leftEmbed, leftAd.firstChild);

    //Inject right ad
    var rightAd = document.getElementById('ddto-right-ad');
    var rightEmbed = document.createElement('script');
    rightEmbed.src = protocol + '://content.synapsys.us/embeds/mlb/deepdive_160x600/remnant.js';
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

  console.log('content', contentEl);
  //Determine if screen is large enough for rails
  if((body.offsetWidth - contentEl.offsetWidth) >= 320){
    buildRails();
  }

  window.addEventListener('resize', function(){
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
