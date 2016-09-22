var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
var mlbDomain        = "http://www.homerunloyal.com/";
var nflDomain        = "http://www.touchdownloyal.com/";
var mlbPartnerDomain = "http://www.myhomerunzone.com/";
var nflPartnerDomain = "http://www.mytouchdownzone.com/";
var referrer = document.referrer;
var season;
var SpecialDomain = "";
var currentDomain = "";
var verticalsUsingSubdom = ['mlb', 'nfl', 'ncaaf', 'nflncaaf'];
if(referrer.match(/\/\/baseball\./i)){
    mlbPartnerDomain = protocolToUse + referrer.split('/')[2] + "/";
}
// if in iframe, get url from parent (referrer), else get it from this window location (works for localhost)
var baseUrl = referrer.length ? getBaseUrl(referrer) : window.location.origin;

function getBaseUrl(string){
    var urlArray = string.split("/");
    var domain = urlArray[2];
    return protocolToUse + "//" + domain;
}

dynamic_widget = function() {
    var e = location.protocol == 'https:' ? 'https' : 'http',
        protocol = location.protocol == 'https:' ? 'https' : 'http',
        t = e + '://dw.synapsys.us/list_api.php',
        i = 0,
        r = {},
        l = JSON.parse(decodeURIComponent(location.search.substr(1))),
        n = 0,
        a = ['finance', 'nba', 'college_basketball', 'weather', 'crime', 'demographics', 'politics', 'disaster', 'mlb', 'nfl','ncaaf','nflncaaf'];
    var s = false;
    var o = '';
    function c(e) {
        if (d.readyState == 'complete' || d.readyState == 'interactive') {
            e()
        } else if (d.addEventListener) {
            d.addEventListener('DOMContentLoaded', e)
        } else if (d.attachEvent) {
            d.attachEvent('onreadystatechange', function() {
                if (d.readyState == 'complete') {
                    e()
                }
            })
        }
    }
    function httpGetInitData(league){
      if (league == "nfl") {
        var url = '../js/tdl_list_array.json';
      }
      else if (league == "ncaaf") {
        var url = '../js/tdl_list_array_ncaaf.json';
      }
      else if (league == "nflncaaf") {
        rand = Math.floor((Math.random() * 2) + 1);
        if (rand == 1) {
          var url = '../js/tdl_list_array_ncaaf.json';
          l.category = "ncaaf";
        }
        else {
          var url = '../js/tdl_list_array.json';
          l.category = "nfl";
        }
      }
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function(){
        if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
          //On complete function
          initData = JSON.parse(xmlHttp.responseText);
          getRandList(initData);
        }
      }
      xmlHttp.open( "GET", url, true ); // false for synchronous request
      xmlHttp.send( null );
    }
    function getRandList(initData) {
      rand = Math.floor((Math.random() * 140) + 1);
      var date = new Date;
      var compareDate = new Date('09 15 ' + date.getFullYear());
      if (date.getMonth() == compareDate.getMonth() && date.getDate() >= compareDate.getDate()) {
        httpGetData(initData[rand] + "&season=" + date.getFullYear());
        season = date.getFullYear();
      }
      else if (date.getMonth() > compareDate.getMonth()) {
        httpGetData(initData[rand] + "&season=" + date.getFullYear());
        season = date.getFullYear();
      }
      else {
        httpGetData(initData[rand] + "&season=" + (date.getFullYear() - 1));
        season = (date.getFullYear() - 1);
      }
    }

    function m(ignoreRandom) {
      i = 0;// resets index count to 0 when swapping lists
      if (l.category == "nfl" || l.category == "ncaaf" || l.category == "nflncaaf") {
        httpGetInitData(l.category);
      }
      else {
        httpGetData("",ignoreRandom);
      }

    }
    function httpGetData(query, ignoreRandom) {
      if (l.dom == 'lasvegasnow.com') {
          s = true;
          o = 'finance.lasvegasnow.com'
      }
      if (typeof l.category == 'undefined' || a.indexOf(l.category) == -1) {
          l.category = 'finance'
      }
      if (ignoreRandom == null) {
        var e = typeof l.rand != 'undefined' && n == 0 ? l.rand : Math.floor(Math.random() * 10);
      }
      else {
        var e = Math.floor(Math.random() * 10);
      }

      var i;
      if (window.XMLHttpRequest) {
          i = new XMLHttpRequest
      } else {
          i = new ActiveXObject('Microsoft.XMLHTTP')
      }
      i.onreadystatechange = function() {
          if (i.readyState == XMLHttpRequest.DONE) {
              if (i.status == 200) {
                  r = JSON.parse(i.responseText);
                  c(u)
              } else {
                  var e = i.statusText;
                  if (i.status == 500) {
                      try {
                          e = JSON.parse(i.responseText).message
                      } catch (t) {
                          console.log('No JSON message')
                      }
                  }
                  e = 'HTTP Error (' + i.status + '): ' + e;
                  if (n++ > 10) {
                      throw e
                  }
                  setTimeout(m, 500)
              }
          }
      };
      if (l.category == "nfl" || l.category == "ncaaf" || l.category == "nflncaaf") {
        i.open('GET', protocol + "://prod-touchdownloyal-api.synapsys.us/list/" + query , true);
        i.send()
      }
      else {
        i.open('GET', t + '?partner=' + (typeof l.dom != 'undefined' ? l.dom : '') + '&cat=' + l.category + '&rand=' + e, true);
        i.send()
      }
    }

    function u() {
        if (typeof dataLayer != 'undefined') {
            dataLayer.push({
                event: 'widget-title',
                eventAction: dynamic_widget.get_title()
            })
        }
        if (l.dom == 'nydailynews.com') {
            var e = document.getElementsByClassName('dw')[0];
            e.style.height = '340px';
            var t = document.createElement('div');
            t.style.width = '100%';
            t.style.height = '10px';
            t.style.color = '#999';
            t.style['text-align'] = 'center';
            t.style['line-height'] = '10px';
            t.style['font-size'] = '10px';
            t.style['background-color'] = '#fff';
            t.innerHTML = 'PAID CONTENT';
            document.body.insertBefore(t, e)
        }
        if (l.category == 'politics') {
            var i = r.l_title.indexOf('Republican') != -1 ? 'r' : r.l_title.indexOf('Independent') != -1 ? 'i' : 'd';
            var cssId = 'politicsCss';  // you could encode the css path itself to generate id..
            if (document.getElementById(cssId))
            {
              var element = document.getElementById(cssId);
              element.parentNode.removeChild(element);
            }
            var head  = document.getElementsByTagName('head')[0];
            var link  = document.createElement('link');
            link.id   = cssId;
            link.rel  = 'stylesheet';
            link.type = 'text/css';
            link.href = '../css/dynamic_widget_politics_' + i + '.css';
            link.media = 'all';
            head.appendChild(link);
        }
        if (l.category == 'mlb') {
            r.l_title = r.l_title.replace("MLB","Baseball");
        }
        if (l.category == "nfl" || l.category == "ncaaf" || l.category == "nflncaaf") {$('title').innerHTML = r.data.listInfo.listName;} else {$('title').innerHTML = r.l_title;}
        if ($('line4') != null && d.getElementsByClassName('dw')[0].clientWidth == 350 && $('title').scrollHeight > 61) {
            $('title').setAttribute('style', 'font-size: 14px')
        }
        var n = true;
        var specialDomains = [
          "latimes.com",
          "orlandosentinel.com",
          "sun-sentinel.com",
          "baltimoresun.com",
          "mcall.com",
          "courant.com",
          "dailypress.com",
          "southflorida.com",
          "citypaper.com",
          "themash.com",
          "coastlinepilot.com",
          "sandiegouniontribune.com",
          "ramonasentinel.com",
          "capitalgazette.com",
          "chicagotribune.com"
        ];
        if (document.referrer == "") {
          currentDomain = window.location.hostname.toString();
        }
        else {
          currentDomain = document.referrer;
          currentDomain = currentDomain.split('/')[2];
        }
        currentDomain = currentDomain.replace(/^[^.]*\.(?=\w+\.\w+$)/, ""); //remove www.
        switch (l.category) {
            case 'nba':
                var a = l.remn == 'true' ? 'http://www.hoopsloyal.com/NBA/widget-list' : 'http://www.myhoopszone.com/' + l.dom + '/NBA/w-list';
                break;
            case 'college_basketball':
                var a = l.remn == 'true' ? 'http://www.hoopsloyal.com/NCAA/widget-list' : 'http://www.myhoopszone.com/' + l.dom + '/NCAA/w-list';
                break;
            case "mlb":
                for (i = 0; i <= specialDomains.length; i++) {
                  if (currentDomain == specialDomains[i]) {
                    SpecialDomain = "http://baseball." + specialDomains[i] + "/list";
                  }
                }
                // var a = "/";
                // var n = false
                // $("mainurl").style.cssText += "pointer-events:none; cursor:default",
                $("suburl").style.cssText += "pointer-events:none; cursor:default";
                $("carousel").className = "one";
                // $("line1").style.cssText += "pointer-events:none; cursor:default",
                // $("homelink").style.cssText += "pointer-events:none; cursor:default",
                //  $("list-link").style.display = "none";
                var a = "";
                if (SpecialDomain == "") {
                      a = l.remn == 'true' ? 'http://www.homerunloyal.com/list' : mlbPartnerDomain + l.dom +'/list';
                }
                else {
                  a = SpecialDomain + '/list';
                }
                var n = false
                break;
            case "nfl":
            case "ncaaf":
            case "nflncaaf":
                for (i = 0; i <= specialDomains.length; i++) {
                  if (currentDomain == specialDomains[i]) {
                    SpecialDomain = "http://football." + specialDomains[i] ;
                  }
                }
                $("suburl").style.cssText += "pointer-events:none; cursor:default";
                $("carousel").className = "one";
                var a = "";
                if (SpecialDomain == "") {
                      a = l.remn == 'true' ? 'http://www.touchdownloyal.com' : nflPartnerDomain + l.dom;
                }
                else {
                  //for football.partnerdomain.com
                  a = SpecialDomain;
                }
                var n = false
                break;
            case 'finance':
                var a = l.remn == 'true' ? 'http://www.investkit.com/widget-list' : 'http://www.myinvestkit.com/' + l.dom + '/w-list';
                if (s) {
                    a = a.replace('www.myinvestkit.com', o)
                }
                break;
            default:
                var a = l.remn == 'true' ? 'http://www.joyfulhome.com/wlist' : 'http://www.myhousekit.com/' + l.dom + '/wlist';
                var n = false
        }
        if (l.category != "nfl" && l.category != "ncaaf" && l.category != "nflncaaf") {
          a += n ? '?tw=' + r.l_param + '&sw=' + r.l_sort + '&input=' + r.l_input : '/tw-' + r.l_param + '+sw-' + r.l_sort + '+input-' + r.l_input;
        }
        else {
          a += "/" + l.category + "/list/" + r.data.listData[0].rankType + "/" + r.data.listData[0].statType.replace(r.data.listData[0].rankType + "_", "") + "/" + season + "/" + r.data.listInfo.ordering + "/" + "10" + "/" + "1";
        }
        if ($('list-link')) {
            $('list-link').href = a
        }
        p()
      }
function p() {
      if (l.category == "nfl" || l.category == "ncaaf" || l.category == "nflncaaf") {
        var e = r.data.listData[i];
        var v_link = '';
        if (e.rankType == "team") {
          $('line1').innerHTML = e.teamName;
          $('line2').innerHTML = "Division: <b>" + e.divisionName + "</b>";
          var a = "";
          if (SpecialDomain == "") {// if no special link then create
            v_link = l.remn == 'true' ? "/team/" + e.teamName.replace(/ /g, "-").toLowerCase() + '/' + e.teamId : "/t/" + e.teamName.replace(/ /g, "-").toLowerCase() + '/' + e.teamId;

            a = l.remn == 'true' ? 'http://www.touchdownloyal.com' + "/" +l.category+ v_link : nflPartnerDomain + l.dom + "/" +l.category+ v_link;
          }
          else {
            v_link = "/team/" + e.teamName.replace(/ /g, "-").toLowerCase() + '/' + e.teamId;

            a = SpecialDomain + "/" +l.category+ v_link;
          }
          $('mainurl').href = a;
          $('line1').href = a;
        }
        else {
          $('line1').innerHTML = e.playerFirstName + " " + e.playerLastName;
          $('line2').innerHTML = "Team: <b>" + e.teamName + "</b>";
          var a = "";
          if (SpecialDomain == "") {
            v_link = l.remn == 'true' ? "/player/" + e.teamName.replace(/ /g, "-").toLowerCase() + '/' + e.playerFirstName.replace(/ /g, "-").toLowerCase() + '-' + e.playerLastName.replace(/ /g, "-").toLowerCase() + "/" + e.playerId : "/p/" + e.teamName.replace(/ /g, "-").toLowerCase() + '/' + e.playerFirstName.replace(/ /g, "-").toLowerCase() + '-' + e.playerLastName.replace(/ /g, "-").toLowerCase() + "/" + e.playerId;

            a = l.remn == 'true' ? 'http://www.touchdownloyal.com' + "/" +l.category+v_link : nflPartnerDomain + l.dom + "/" + l.category+v_link;
          }
          else {
            v_link = "/player/" + e.teamName.replace(/ /g, "-").toLowerCase() + '/' + e.playerFirstName.replace(/ /g, "-").toLowerCase() + '-' + e.playerLastName.replace(/ /g, "-").toLowerCase() + "/" + e.playerId;

            a = SpecialDomain + "/" + l.category+v_link;
          }
          $('mainurl').href = a;
          $('line1').href = a;
        }
        var statType = e.statType.replace(/_/g, " ");
        statType = statType.replace("player", "");
        statType = statType.replace("team", "");
        statType = statType.replace(/(^| )(\w)/g, function(x) {
          return x.toUpperCase();
        });
        var stat = Math.floor(Number(e.stat));
        $('desc').innerHTML = stat + " " + statType;
        var t = $('mainimg');
        var n = t.getAttribute('onerror');
        t.setAttribute('onerror', '');
        t.setAttribute('src', '');
        if (e.rankType == "team") {
          if (e.teamLogo != null && e.teamLogo != "null") {
            t.setAttribute('src', protocolToUse + "images.synapsys.us" + e.teamLogo);
          }
          else {
            t.setAttribute('src', protocolToUse + "w1.synapsys.us/widgets/css/public/no_image.jpg");
          }
        }
        else {
          if (e.playerHeadshotUrl != null && e.playerHeadshotUrl != "null") {
            t.setAttribute('src', protocolToUse + "images.synapsys.us" + e.playerHeadshotUrl);
          }
          else {
            t.setAttribute('src', protocolToUse + "w1.synapsys.us/widgets/css/public/no_image.jpg");
          }
        }
        setTimeout(function(e, t) {
            t.setAttribute('onerror', e)
        }.bind(undefined, n, t), 0);

        $('num').innerHTML = '#' + e.rank;

        if ($('list-link')) {
            var u = d.getElementsByClassName('dw-btn')[0];
            if (u.offsetTop + u.scrollHeight > d.getElementsByClassName('dw')[0].clientHeight) {
                $('title').setAttribute('style', 'font-size: 14px');
                if (d.getElementsByClassName('dw')[0].clientHeight <= 250) {
                    $('title').setAttribute('style', 'font-size: 12px')
                }
            }
            if (u.offsetTop + u.scrollHeight > d.getElementsByClassName('dw')[0].clientHeight - 10 && d.getElementsByClassName('dw')[0].clientHeight <= 250) {
                d.getElementsByClassName('dw-btn')[0].setAttribute('style', 'margin-top: 0')
            }
        }
        var p = $('title');
        if (p.offsetTop + p.scrollHeight > $('carousel').offsetTop) {
            $('title').setAttribute('style', 'font-size: 14px')
        }
      }
      else {
        var e = r.l_data[i];
        e.li_url = e.li_subimg !== false && e.li_subimg.switch ? l.remn == 'true' ? e.li_subimg.primary_url : e.li_subimg.partner_url.replace('{partner}', l.dom) : l.remn == 'true' ? e.li_primary_url : e.li_partner_url;
        e.li_line_url = l.remn == 'true' ? e.li_primary_url : e.li_partner_url;

        //if we're on a site that uses a subdomain for this vetical's microsite, then use that
        if(SpecialDomain && verticalsUsingSubdom.indexOf(l.category) != -1) {
            switch (l.category) {
                case 'mlb':
                    e.li_url = e.li_url.replace(/(?:https?\:)?(?:\/\/)?(?:www\.)?myhomerunzone\.com\/\{partner\}/i, SpecialDomain);
            e.li_url = e.li_url.replace("/t/", "/team/");
            e.li_url = e.li_url.replace("/p/", "/player/");
                    e.li_line_url = e.li_line_url.replace(/(?:https?\:)?(?:\/\/)?(?:www\.)?myhomerunzone\.com\/\{partner\}/i, SpecialDomain);
            e.li_line_url = e.li_line_url.replace("/t/", "/team/");
            e.li_line_url = e.li_line_url.replace("/p/", "/player/");
                    break;
                default:
                    break;
            }
        } else {
            e.li_url = "http:" + e.li_url.replace('{partner}', l.dom);
            e.li_line_url = "http:" + e.li_line_url.replace('{partner}', l.dom);
        }
        if (s) {
            e.li_url = e.li_url.replace('www.myinvestkit.com', o);
            e.li_line_url = e.li_line_url.replace('www.myinvestkit.com', o)
        }

        $('line1').innerHTML = e.li_title;
        $('line2').innerHTML = e.li_sub_txt;
        if ($('line4') == null) {
            $('desc').innerHTML = e.li_str
        } else {
            $('desc').innerHTML = e.li_value;
            $('line4').innerHTML = e.li_tag
        }
        $('line1').href = e.li_line_url;
        var t = $('mainimg');
        var n = t.getAttribute('onerror');
        t.setAttribute('onerror', '');
        t.setAttribute('src', '');
        t.setAttribute('src', e.li_img);
        setTimeout(function(e, t) {
            t.setAttribute('onerror', e)
        }.bind(undefined, n, t), 0);
        $('mainurl').href = e.li_url;
        $('num').innerHTML = '#' + e.li_rank;
        if (e.li_subimg !== false) {
            var a = e.li_subimg.switch ? l.remn == 'true' ? e.li_primary_url : e.li_partner_url.replace('{partner}', l.dom) : l.remn == 'true' ? e.li_subimg.primary_url : e.li_subimg.partner_url.replace('{partner}', l.dom);
            if (s) {
                a = a.replace('www.myinvestkit.com', o)
            }
            var c = $('subimg');
            var n = c.getAttribute('onerror');
            c.setAttribute('onerror', '');
            c.setAttribute('src', '');

            //hide double image if second image is blank for this profile
            convertImage(l.category, c, e);

            setTimeout(function(e, t) {
                t.setAttribute('onerror', e)
            }.bind(null, n, c), 0);
            $('suburl').href = "http:"+a;
            var m = $('carousel');
            if (m.className.indexOf('two') == -1) {
                m.className += ' two'
            }
        }
        else {
          //set double image off if we dont have it for this list
          $('carousel').setAttribute('class', 'one');
          $('suburl').setAttribute('style', 'display: none');
        }
        if ($('list-link')) {
            var u = d.getElementsByClassName('dw-btn')[0];
            if (u.offsetTop + u.scrollHeight > d.getElementsByClassName('dw')[0].clientHeight) {
                $('title').setAttribute('style', 'font-size: 14px');
                if (d.getElementsByClassName('dw')[0].clientHeight <= 250) {
                    $('title').setAttribute('style', 'font-size: 12px')
                }
            }
            if (u.offsetTop + u.scrollHeight > d.getElementsByClassName('dw')[0].clientHeight - 10 && d.getElementsByClassName('dw')[0].clientHeight <= 250) {
                d.getElementsByClassName('dw-btn')[0].setAttribute('style', 'margin-top: 0')
            }
        }
        var p = $('title');
        if (p.offsetTop + p.scrollHeight > $('carousel').offsetTop) {
            $('title').setAttribute('style', 'font-size: 14px')
        }
      }

    }

    function convertImage(category, c, e){
      switch(category){
        case 'mlb':
        case 'ncaaf':
        case 'nfl':
        case 'college_basketball':
        case 'nba':
        $("suburl").style.cssText += "pointer-events:none; cursor:default";
        $("carousel").className = "one";
        break;
        case 'finance':
        if (e.li_subimg.img == "//w1.synapsys.us/widgets/css/public/no_image.jpg") {
          c.setAttribute('src', e.li_subimg.img);
          $('carousel').setAttribute('class', 'two');
          $('suburl').setAttribute('style', 'display: block');
        }
        else {
          c.setAttribute('src', e.li_subimg.img);
          //set double image css to "on" if we have a double image for this list
          $('carousel').setAttribute('class', 'two');
          $('suburl').setAttribute('style', 'display: block');
        }
        break;
      }
    }

    function w(e) {
        i += e;
        if (l.category == "nfl" || l.category == "ncaaf" || l.category == "nflncaaf") {
          i = i >= r.data.listData.length ? 0 : i < 0 ? r.data.listData.length - 1 : i;
        }
        else {
          i = i >= r.l_data.length ? 0 : i < 0 ? r.l_data.length - 1 : i;
        }
        p();
        if (typeof dataLayer != 'undefined') {
            dataLayer.push({
                event: e == 1 ? 'nav-right' : 'nav-left',
                eventAction: dynamic_widget.get_title()
            })
        }
    }

    function f() {
        return l.dom + ':' + l.category + ':' + (r.l_sort == null ? r.l_param : r.l_sort) + ':' + r.l_title
    }

    function h() {
      var hn = "";
        if (l.carousel == true) {
            var e = d.getElementsByTagName('a');
            for (var t = 0; t < e.length; t++) {
                e[t].setAttribute('onclick', 'event.preventDefault(); return false;')
            }
            var i = d.querySelectorAll('.hover');
            for (var t = 0; t < i.length; t++) {
                i[t].parentNode.removeChild(i[t])
            }
            $('list-link').parentNode.removeChild($('list-link'));
            return false
        }
        switch (l.category) {
            case 'finance':
                var r = l.remn == 'true' ? 'http://www.investkit.com/' : 'http://www.myinvestkit.com/' + l.dom + '/';
                if (s) {
                    r = r.replace('www.myinvestkit.com', o)
                }
                hn = "Finance";
                break;
            case 'nba':
                var r = l.remn == 'true' ? 'http://www.hoopsloyal.com/NBA' : 'http://www.myhoopszone.com/' + l.dom + '/NBA';
                var hn = "Hoops Loyal";
                break;
            case 'college_basketball':
                var r = l.remn == 'true' ? 'http://www.hoopsloyal.com/NCAA' : 'http://www.myhoopszone.com/' + l.dom + '/NCAA';
                var hn = "Basketball";
                break;
            case "mlb":
                var r = "";
                if( mlbPartnerDomain == "http://www.myhomerunzone.com/") {
                    r = l.remn == 'true' ? 'http://www.homerunloyal.com/' : mlbPartnerDomain + l.dom + '/';
                }else{
                    r = mlbPartnerDomain;
                }
                var hn = "Baseball";
              break;
            case "nfl":
            case "ncaaf":
            case "nflncaaf":
                var r = "";
                if( nflPartnerDomain == "http://www.mytouchdownzone.com/") {
                    r = l.remn == 'true' ? 'http://www.touchdownloyal.com/' : nflPartnerDomain + l.dom + '/';
                }else{
                    r = nflPartnerDomain;
                }
                var hn = "Football";
              break;
            case "weather":
              var hn = "Weather";
              break;
            case "politics":
            var hn = "Politics";
              break;
            case "disaster":
            var hn = "Disaster";
              break;
            case "demographics":
            var hn = "Demographics";
              break;
            case "crime":
            var hn = "Crime";
              break;
            default:
                var r = l.remn == 'true' ? 'http://www.joyfulhome.com/' : 'http://www.myhousekit.com/' + l.dom + '/loc/';
                var hn = "Homes";
                break
        }
        $('verticalDisplayName').innerHTML = hn;
    }
    m();
    c(h);
    return {
        carousel: w,
        get_title: f,
        m: m
    }
}();
