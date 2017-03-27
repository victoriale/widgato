//establish environment variables for the ad-stack based on which widget is being called
(function() {
  var hostname = window.top.location.hostname;

  //Identifier for snt container when script has first loaded
  var snt_id = "snt_container";
  var sntWidgetType1 = "http://w1.synapsys.us/widgets/dynamic_caw_widget/dynamic_caw_widget_970.html?{'dom':'chicagotribune.com','loc':{'loc':{'city':[],'DMA':[],'state':[],'zipcode':[]}},'c_id':'null','remn':'false','caw_url':'http://www.chicagotribune.com/entertainment/tv/ct-donald-trump-alec-baldwin-feud-20161219-story.html','targ':'_blank','cat':'null','subd':'','rand':2}";
  var sntWidgetType2 = "";

  // var safeGuard = false; // allows function to be only called once, if set to true then function will not run again


  //Waits for the DOMContent to load so we know where to append the widget
  document.addEventListener("DOMContentLoaded", function(event){
    console.log(hostname);
    //declare initial snt container
    var snt_container = document.createElement("div");
    snt_container.setAttribute("id", snt_id);
    document.body.appendChild(snt_container);

    var snt_id_container = document.getElementById(snt_id);

    window.onscroll = function() {sntListener()};
    // snt_id_container.addEventListener("onscroll", sntListener);

    /*<---------------------------------------------------------------------------------------------------------->*/

    //setup create new element node function
    var createNode = function(attribute, attributeName, widgetType){
      var snt_widget = document.createElement("div");
      snt_widget.setAttribute(attribute, attributeName);
      //add widget Code Here
      var newFrame = document.createElement("iframe");
      //
      newFrame.id = '1';
      newFrame.style.width = '300px';
      newFrame.style.height ='600px';
      newFrame.style.border = '0px';
      newFrame.style.margin = '0px';
      newFrame.style.zIndex = '0';
      newFrame.frameBorder = '0';
      newFrame.scrolling = 'no';
      newFrame.setAttribute('allowtransparency', 'true');
      newFrame.style.display= 'block';
      newFrame.style.overflow= 'hidden';
      newFrame.src = sntWidgetType1;
      snt_widget.appendChild(newFrame);
      console.log(snt_widget);

      snt_id_container.appendChild(snt_widget);
      console.log(snt_id_container);
      return;
    }

    /*<---------------------------------------------------------------------------------------------------------->*/

    //setup the onscroll function to listen to created snt identified container
    function sntListener() {
      var body = document.body,
          html = document.documentElement;
      var bodyHeight = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

      var sntClientRect = snt_id_container.getBoundingClientRect();
      var heightListener = (sntClientRect.height * .80);
      // console.log('sntC from TOP',snt_id_distance.top);
      // console.log('sntC Height',snt_id_distance.height);
      // console.log('bodyHeight ==>', bodyHeight, 'SNT Container', sntClientRect);
      if(sntClientRect.top <= heightListener){
        console.log('Limit Reach Call next Widget',sntClientRect.top);
        createNode("id", "testWidget", sntWidgetType1);

      }
    }


    console.log("WIDGET CREATE");
  });



})();
