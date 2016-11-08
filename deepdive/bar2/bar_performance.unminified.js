(function(){
    var protocol = (location.protocol) === 'https:' ? 'https' : 'http'; //Protocol of the domain the bar exist on
    var resourceURL = protocol + '://w1.synapsys.us/widgets/deepdive';
    // var resourceURL = protocol + '://localhost:8000/deepdive';
    var embedURL = resourceURL + '/bar/bar_performance.js'; //URL of script embed. This is used as a fallback if document.currentScript is not available

    //Grab current script element to know where to inject bar
    var currentScript = document.currentScript || (function(){
        var scripts = document.getElementsByTagName("script");
        for (var i = scripts.length - 1; i >= 0; i--) {
           if (scripts[i].src.indexOf(embedURL) != -1) {
              return scripts[i];
           }
        }
    })();

    var testEl = document.createElement('div');
    testEl.style['background-color'] = '#464646';
    testEl.style.color = '#fff';
    testEl.style.padding = '8px';
    testEl.style['font-family'] = 'Arial';
    testEl.innerHTML = 'Partner Search Bar';

    var parentNode = currentScript.parentNode;
    parentNode.insertBefore(testEl, currentScript);
})()
