function getCategoryMetadata(category) {
    let globalMeta = {
        nfl: {
            displayName: "Football",
            domain: "www.touchdownloyal.com",
            partnerDomain: "www.mytouchdownzone.com",
            usesPartnerSubdomain: true,
            partnerSubdomain: "football",
            hasAiArticles: true,
            category: "football",
            subCategory: "nfl",
            pub: "touchdownloyal"
        },
        ncaaf: {
            displayName: "Football",
            domain: "www.touchdownloyal.com",
            partnerDomain: "www.mytouchdownzone.com",
            usesPartnerSubdomain: true,
            partnerSubdomain: "football",
            hasAiArticles: true,
            category: "football",
            subCategory: "ncaaf",
            pub: "touchdownloyal"
        },
        nflncaaf: {
            displayName: "Football",
            domain: "www.touchdownloyal.com",
            partnerDomain: "www.mytouchdownzone.com",
            usesPartnerSubdomain: true,
            partnerSubdomain: "football",
            hasAiArticles: true,
            category: "football",
            subCategory: "nfl, ncaaf",
            pub: "touchdownloyal"
        },
        nba: {
            displayName: "Basketball",
            domain: "www.hoopsloyal.com",
            partnerDomain: "www.myhoopszone.com",
            usesPartnerSubdomain: true,
            partnerSubdomain: "basketball",
            hasAiArticles: true,
            category: "basketball",
            subCategory: "nba",
            pub: "hoopsloyal"
        },
        college_basketball: {
            displayName: "Basketball",
            domain: "www.hoopsloyal.com",
            partnerDomain: "www.myhoopszone.com",
            usesPartnerSubdomain: false,
            partnerSubdomain: "basketball",
            hasAiArticles: true,
            category: "basketball",
            subCategory: "ncaa",
            pub: "hoopsloyal"
        },
        mlb: {
            displayName: "Baseball",
            domain: "www.homerunloyal.com",
            partnerDomain: "www.myhomerunzone.com",
            usesPartnerSubdomain: true,
            partnerSubdomain: "baseball",
            hasAiArticles: true,
            category: "baseball",
            subCategory: "mlb",
            pub: "homerunloyal"
        }
    };
    if (globalMeta[category]) {
        return globalMeta[category];
    }
    else {
        return globalMeta['finance'];
    }
}

function getPublisher(pub, env) {
    let apiFallback = false;
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://" + env + "synapview.synapsys.us/?action=get_partner_branding&domain=" + pub, false);
    xmlHttp.send(null);
    try {
        var pubResponse = JSON.parse(xmlHttp.responseText);
    }
    catch (err) {
        apiFallback = true;
    }
    if (pubResponse == null || pubResponse.logo == null || pubResponse.logo == "") {
        apiFallback = true;
    }
    var pubs = {
        homerunloyal: {
            displayName: "Home Run Loyal",
            link: "www.homerunloyal.com",
            logo: "../css/public/pub_logos/logo-homerun-loyal.svg",
            hex: "#bc2027"
        },
        touchdownloyal: {
            displayName: "Touchdown Loyal",
            link: "www.touchdownloyal.com",
            logo: "../css/public/pub_logos/logo-touchdown-loyal.svg",
            hex: "#004e87"
        },
        hoopsloyal: {
            displayName: "Hoops Loyal",
            link: "www.hoopsloyal.com",
            logo: "../css/public/pub_logos/logo-hoops-loyal.svg",
            hex: "#f26f26"
        }
    };
    if (apiFallback == true) {
        if (pub == null || pub == "" || !pubs[pub.split(".")[0]]) {
            return pubs[currentConfig.pub];
        }
        else {
            return pubs[pub.split(".")[0]];
        }
    }
    else {
        return pubResponse;
    }
}

var protocolToUse = (location.protocol === "https:") ? "https://" : "http://";
var currentConfig;
var currentPub;
var referrer = document.referrer;
var season;
var SpecialDomain = "";
var currentDomain = "";
var rounds = 0;
var rand;
// if in iframe, get url from parent (referrer), else get it from this window location (works for localhost)
var baseUrl = referrer.length ? getBaseUrl(referrer) : window.location.origin;

function getBaseUrl(string) {
    var urlArray = string.split("/");
    var domain = urlArray[2];
    return protocolToUse + "//" + domain;
}

image_puzzle = function () {
    let e = location.protocol === 'https:' ? 'https' : 'http',
        protocol = location.protocol === 'https:' ? 'https' : 'http',
        i = 0,
        r = {},
        l = JSON.parse(decodeURIComponent(location.search.substr(1))),
        n = 0,
        a = ['nba', 'college_basketball', 'mlb', 'nfl', 'ncaaf', 'nflncaaf'];
    if (l.env !== "prod-" && l.env !== "dev-") {
        l.env = "prod-";
    }
    t = e + '://' + l.env.replace("prod-", "") + 'dw.synapsys.us/list_api.php';
    if (l.subd && l.subd.indexOf("/") === -1) {
        SpecialDomain = l.subd;
    }
    currentConfig = getCategoryMetadata(l.category);
    currentPub = getPublisher(l.dom, l.env.replace("prod-", ""));
    //new dynamic pub color css code
    let css = '#carousel:hover .carouselShaderHover {background-color: ' + currentPub.hex + '; opacity: 0.4;} ';
    if (window.location.pathname.indexOf("_970") !== -1) {
        css += '#next-list-link .dw-btn {background-color: ' + currentPub.hex + '; border: none;}';
        css += '#next-list-link .dw-btn:before {background-color: black;}';
    }
    else {
        css += '#next-list-link .dw-btn:before {background-color: ' + currentPub.hex + ';}';
    }
    css += '.dw-info {border-left: 3px solid ' + currentPub.hex + '; padding-left: 10px;}';
    css += '#next-list-link .dw-btn {fill: ' + currentPub.hex + '; color: ' + currentPub.hex + '; border-color: ' + currentPub.hex + ';}';
    let style = document.createElement('style');
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(style);
    //end dynamic pub color css code

    if (typeof(l.subd) === 'undefined' || !l.subd || l.subd === '' || l.subd === null) {
        l.subd = (l.remn === 'false') ? currentConfig.partnerDomain + '/' + l.dom : currentConfig.domain;
    }
    function c(e) {
        if (d.readyState === 'complete' || d.readyState === 'interactive') {
            e();
        } else if (d.addEventListener) {
            d.addEventListener('DOMContentLoaded', e)
        } else if (d.attachEvent) {
            d.attachEvent('onreadystatechange', function () {
                if (d.readyState === 'complete') {
                    e();
                }
            })
        }
    }

    function httpGetInitData(league) {
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
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                //On complete function
                initData = JSON.parse(xmlHttp.responseText);
                getRandList(initData);
            }
        };
        xmlHttp.open("GET", url, true); // false for synchronous request
        xmlHttp.send(null);
    }

    function getRandList(initData) {
        rand = Math.floor((Math.random() * (initData.length - 1)) + 1);
        var date = new Date;
        var compareDate = new Date('09/15/' + date.getFullYear());
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
        if (currentConfig.category == "football") {
            httpGetInitData(l.category);
        }
        else {
            httpGetData("", ignoreRandom);
        }
    }

    function httpGetData(query, ignoreRandom) {
        if (ignoreRandom === null) {
            var e = typeof l.rand !== 'undefined' && n === 0 ? l.rand : Math.floor(Math.random() * 50);
        }
        else {
            var e = rand;
            while (e === rand) {
                e = Math.floor(Math.random() * 50);
                if (e === 0) {
                    e = 1;
                }
            }
        }
        rand = e;
        var i;
        if (window.XMLHttpRequest) {
            i = new XMLHttpRequest
        } else {
            i = new ActiveXObject('Microsoft.XMLHTTP')
        }
        i.onreadystatechange = function () {
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
        rand = e;
        if (currentConfig.category == "football") {
            i.open('GET', protocol + "://" + l.env + "touchdownloyal-api.synapsys.us/list/" + query, true);
            i.send()
        }
        else {
            if (l.county != null && l.county != "") { // ajc one off api code
                if (l.county.indexOf('metro') != -1) {
                    i.open('GET', "http://" + l.env.replace("prod-", "") + "dw.synapsys.us/ajc_list_api.php" + '?location=' + l.county + '&category=' + l.category + '&rand=' + e + "&metro=true", true);
                }
                else {
                    i.open('GET', "http://" + l.env.replace("prod-", "") + "dw.synapsys.us/ajc_list_api.php" + '?location=' + l.county + '&category=' + l.category + '&rand=' + e, true);
                }
            }
            else {
                i.open('GET', t + '?partner=' + (typeof l.dom != 'undefined' ? l.dom : '') + '&cat=' + l.category + '&rand=' + e, true);
            }
            i.send()
        }
    }

    function u() {
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
        if (l.category == 'mlb') {
            r.l_title = r.l_title.replace("MLB", "Baseball");
        }
        var n = true;
        if (document.referrer == "") {
            currentDomain = window.location.hostname.toString();
        }
        else {
            currentDomain = document.referrer;
            currentDomain = currentDomain.split('/')[2];
        }
        currentDomain = currentDomain.replace(/^[^.]*\.(?=\w+\.\w+$)/, ""); //remove www.
        p()
    }

    function p() {
        if (rounds == 0) {
            rounds++;
            checkBlankImages();
        }
        if (currentConfig.category == "football") {
            var e = r.data.listData[i];
            var v_link = '';
            if (e.rankType == "team") {
                $('line1').innerHTML = e.teamName;
                $('line2').innerHTML = "Division: <b>" + e.divisionName + "</b>";
            }
            else {
                $('line1').innerHTML = e.playerFirstName + " " + e.playerLastName;
            }
            var statType = e.statDescription.replace(/_/g, " ");
            statType = statType.replace("player", "");
            statType = statType.replace("team", "");
            statType = statType.replace(/(^| )(\w)/g, function (x) {
                return x.toUpperCase();
            });
            var stat = Math.floor(Number(e.stat));
            switch (e.statType) {
                case "player_kicking_longest_field_goal_made":
                case "player_returning_longest_return":
                case "player_punting_longest_punt":
                    $('desc').innerHTML = statType + ": " + stat + " yards";
                    break;
                case "player_punting_inside_twenty":
                    $('desc').innerHTML = stat + " punts";
                    break;
                default:
                    $('desc').innerHTML = statType + ": " + stat;
            }
            if (e.rankType == "team") {
                if (e.teamLogo != null && e.teamLogo != "null" && e.teamLogo.indexOf('no-image') == -1 && window.location.pathname.indexOf('_970') == -1) {
                    e.li_img = protocolToUse + "images.synapsys.us" + e.teamLogo + "?width=300";
                }
                else {
                    e.li_img = protocolToUse + "images.synapsys.us/01/fallback/stock/2017/03/football_stock.jpg" + "?width=300";
                }
            }
            else {
                if (e.playerHeadshotUrl != null && e.playerHeadshotUrl != "null" && e.playerHeadshotUrl.indexOf('no-image') == -1 && window.location.pathname.indexOf('_970') == -1) {
                    e.li_img = protocolToUse + "images.synapsys.us" + e.playerHeadshotUrl + "?width=300";
                }
                else {
                    e.li_img = protocolToUse + "images.synapsys.us/01/fallback/stock/2017/03/football_stock.jpg" + "?width=300";
                }
            }
            $('num').innerHTML = '<hash>#</hash>' + e.rank;
        }
        else {
            var e = r.l_data[i];
            $('line1').innerHTML = e.li_title;
            $('line2').innerHTML = e.li_sub_txt;
            if ($('line4') == null) {
                if (e.li_str.indexOf(e.li_value) != -1) {
                    $('desc').innerHTML = e.li_str.replace(e.li_value, "<b class='highlight'>" + e.li_value + "</b>");
                }
                else {
                    $('desc').innerHTML = e.li_str.replace(e.li_value.split(" ")[0], "<b class='highlight'>" + e.li_value.split(" ")[0] + "</b>");
                }
            } else {
                $('desc').innerHTML = e.li_value;
                $('line4').innerHTML = e.li_tag
            }
            var fallbackImg = "http://images.synapsys.us/01/fallback/stock/2017/03/";
            var cssClass = "";
            switch (l.category) {
                case "nfl":
                case "ncaaf":
                    fallbackImg += "football_stock.jpg";
                    cssClass = "football";
                    break;
                case "nba":
                case "college_basketball":
                    fallbackImg += "basketball_stock.jpg";
                    cssClass = "basketball";
                    break;
                case "mlb":
                    fallbackImg += "baseball_stock.jpg";
                    cssClass = "baseball";
                    break;
            }
            if (l.category == "college_basketball" || l.category == "nba") {
                if (e.player_wide_img != "" && e.player_wide_img != null) {
                    e.li_img = "//" + l.env + "images.synapsys.us" + e.player_wide_img;
                }
                else {
                    e.li_img = "//" + l.env + "images.synapsys.us" + e.team_wide_img;
                }
            }
            $('num').innerHTML = '<hash>#</hash>' + e.li_rank;
        }
        createPuzzle(e.li_img, false);
    }

    function w(e, autoAdvance) {
        i += e;
        if (currentConfig.category == "football") {
            i = i >= r.data.listData.length ? 0 : i < 0 ? r.data.listData.length - 1 : i;
        }
        else {
            i = i >= r.l_data.length ? 0 : i < 0 ? r.l_data.length - 1 : i;
        }
        //TODO
        p();
        if (typeof dataLayer != 'undefined' && autoAdvance != true) {
            dataLayer.push({
                event: e == 1 ? 'nav-right' : 'nav-left',
                eventAction: image_puzzle.get_title()
            })
        }
    }

    function checkBlankImages() {
        var goodNumber = 0;
        switch (l.category) {
            case "nfl":
            case "ncaaf":
                if (r.data.listData[i].rankType == "player") {
                    for (n = 0; n < r.data.listData.length && goodNumber == 0; n++) {
                        if (r.data.listData[n].playerHeadshotUrl != null && r.data.listData[n].playerHeadshotUrl.indexOf("no-image") == -1) {
                            goodNumber = n;
                            break;
                        }
                    }
                }
                else {
                    for (n = 0; n < r.data.listData.length && goodNumber == 0; n++) {
                        if (r.data.listData[n].teamLogo != null && r.data.listData[n].teamLogo.indexOf("no-image") == -1) {
                            goodNumber = n;
                            break;
                        }
                    }
                }
                break;
            case "mlb":
            case "nba":
            case "college_basketball":
                for (n = 0; n < r.l_data.length && goodNumber == 0; n++) {
                    if (r.l_data[i].li_img != null && r.l_data[i].li_img.indexOf("no-image") == -1) {
                        goodNumber = n;
                        break;
                    }
                }
                break;
        }
        w(goodNumber, true);
    }

    function h() {
        if (l.carousel == true) {
            var e = d.getElementsByTagName('a');
            for (var t = 0; t < e.length; t++) {
                e[t].setAttribute('onclick', 'event.preventDefault(); return false;')
            }
            var i = d.querySelectorAll('.hover');
            for (var t = 0; t < i.length; t++) {
                i[t].parentNode.removeChild(i[t])
            }
            return false
        }
    }

    function createPuzzle(mainImage, isSolved) {
        (function () {
            //set global variables
            var _empty, _puzzle, _square;
            _puzzle = (function () {
                function _puzzle(image, isSolved) {
                    //set variables
                    if (!isSolved) {
                        var i, index, tile, xPos, yPos;
                        this.image = image;
                        this.initialTiles = [];
                        this.tiles = [];
                        //bind the function and array arguments to the called method
                        this.emptyTile.bind(this.emptyTile, this);
                        this.randomize.bind(this.randomize, this);
                        this.render.bind(this.render, this);
                        this.swapTile.bind(this.swapTile, this);
                        this.solved.bind(this.solved, this);
                        //assign each tile with dimensions, position, and image
                        for (i = index = 0; index <= 7; i = ++index) {
                            xPos = Math.floor(i % 3) * 100;
                            yPos = Math.floor(i / 3) * 104;
                            tile = new _square(i, 100, 104, xPos, yPos, this.image);
                            this.tiles.push(tile);
                        }
                        //set the 8th position to be empty
                        this.tiles.push(new _empty(8));
                        //save the initial tile setup.
                        this.initialTiles = this.tiles.slice(0);
                        this.randomize();
                    } else {
                        this.solveMe(image);
                    }
                }

                _puzzle.prototype.emptyTile = function () {
                    var index, _length, position, tile, val;
                    val = this.tiles;
                    //loop through tile array and find the empty tile's position
                    for (position = index = 0, _length = val.length; index < _length; position = ++index) {
                        tile = val[position];
                        if (tile["class"] === 'empty') {
                            return position;
                        }
                    }
                };
                _puzzle.prototype.randomize = function () {
                    var emptyPos, i, index, random, randomNum;
                    emptyPos = 8;
                    random = [];
                    //iterate through to create an array of random numbers and assign them to the tiles
                    for (i = index = 0; index <= 10; i = ++index) {
                        randomNum = Math.floor(Math.random() * 9);
                        this.swapTile(randomNum, emptyPos);
                        random.push(emptyPos = randomNum);
                    }
                    return random;
                };
                _puzzle.prototype.render = function () {
                    var empty, index, _length, tile, val,
                        _this = this;
                    empty = this.emptyTile();
                    $('puzzle').innerHTML = '';
                    if (this.solved()) {
                        //create solved message
                        var solvedBackground = document.createElement('div');
                        solvedBackground.setAttribute('id', 'puzzle-div');
                        solvedBackground.setAttribute('style', 'background-image: url(' + this.image + ')');
                        $('solve').style.display = 'none';
                        $('puzzle').appendChild(solvedBackground);
                        $('dw-container').style.display = 'block';
                        return $('puzzle-div').style.display = 'block';
                    } else {
                        //render tiles
                        var background = document.createElement('div');
                        background.setAttribute('id', 'puzzle-background');
                        background.setAttribute('style', 'background-image: url(' + this.image + ')');
                        var image = document.createElement('div');
                        image.setAttribute('id', 'img-background');
                        background.appendChild(image);
                        var onClick = $('solve-me');
                        onClick.setAttribute('onclick', "image_puzzle.createPuzzle('" + this.image + "', true);");
                        $('solve').style.display = 'block';
                        $('puzzle').appendChild(background);
                        $('dw-container').style.display = 'none';
                        val = this.tiles;
                        for (index = 0, _length = val.length; index < _length; index++) {
                            tile = val[index];
                            tile.show(empty);
                        }
                        var tileClass = document.getElementsByClassName('tile');
                        //add click event to tiles that are available to be swapped
                        Array.from(tileClass).forEach(function (element) {
                            return element.addEventListener('click', function (event) {
                                var toSwitch;
                                toSwitch = parseInt(event.target.id);
                                return _this.swapTile(toSwitch, _this.emptyTile());
                            });
                        });
                    }
                };
                _puzzle.prototype.solveMe = function (image) {
                    var solvedBackground = document.createElement('div');
                    solvedBackground.setAttribute('id', 'puzzle-div');
                    solvedBackground.setAttribute('style', 'background-image: url(' + image + ')');
                    $('solve').style.display = 'none';
                    $('puzzle').appendChild(solvedBackground);
                    $('dw-container').style.display = 'block';
                    return $('puzzle-div').style.display = 'block';
                };
                _puzzle.prototype.swapTile = function (xPos, yPos) {
                    var x, y;
                    x = this.tiles[xPos];
                    y = this.tiles[yPos];
                    this.tiles[yPos] = x;
                    this.tiles[xPos] = y;
                    this.tiles[yPos].position = yPos;
                    return this.render();
                };
                _puzzle.prototype.solved = function () {
                    var i, index;
                    //check if puzzle is solved by comparing the current tiles array with the initialTiles array
                    for (i = index = 0; index <= 8; i = ++index) {
                        if (this.tiles[i] !== this.initialTiles[i]) {
                            return false
                        }
                    }
                    return true;
                };
                return _puzzle;
            })();
            _square = (function () {
                function _square(position, width, height, xPos, yPos, image) {
                    this.height = height;
                    this.image = image;
                    this.position = position;
                    this.width = width;
                    this.x = xPos;
                    this.y = yPos;
                    this["class"] = 'square';
                }

                _square.prototype.show = function (emptyTile) {
                    var puzzle = document.createElement('div');

                    function setAttributes(el, attr) {
                        for (var key in attr) {
                            el.setAttribute(key, attr[key]);
                        }
                    }

                    if (this.isNext(emptyTile)) {
                        setAttributes(puzzle, {"id": this.position, "class": "innerTile image tile"});
                    } else {
                        setAttributes(puzzle, {"id": this.position, "class": "innerTile image"});
                    }
                    var hoverClick = document.createElement('div');
                    if (this.position === 4 && !$('4')) {
                        hoverClick.setAttribute('class', 'animated pulse');
                        puzzle.appendChild(hoverClick);
                    }
                    else if (this.position === 7 && !$('4')) {
                        hoverClick.setAttribute('class', 'animated pulse');
                        puzzle.appendChild(hoverClick);
                    }
                    $('puzzle').appendChild(puzzle);
                    $(this.position).style.backgroundPosition = '-' + this.x + 'px -' + this.y + 'px';
                    return $(this.position).style.backgroundImage = "url('" + this.image + "')";
                };
                _square.prototype.isNext = function (emptyPosition) {
                    return emptyPosition - 1 === this.position && (emptyPosition % 3) > 0 || emptyPosition + 1 === this.position &&
                        (emptyPosition % 3) < 2 || emptyPosition + 3 === this.position && (emptyPosition / 3) < 2 ||
                        emptyPosition - 3 === this.position && (emptyPosition / 3) > 0
                };
                return _square;
            })();
            _empty = (function () {
                function _empty(position) {
                    this.position = position;
                    this["class"] = 'empty';
                }

                _empty.prototype.show = function () {
                    var emptyTile = document.createElement('div');
                    emptyTile.setAttribute('class', 'innerTile empty');
                    emptyTile.setAttribute('id', 'emptyTile');
                    return $('puzzle').appendChild(emptyTile);
                };
                $('solve').style.display = 'block';
                $('dw-container').style.display = 'none';
                return _empty;
            })();
            var puzzle;
            puzzle = new _puzzle(mainImage, isSolved);
        }).call(this);
    }

    m();
    c(h);
    createPuzzle();
    return {
        next: w,
        m: m,
        createPuzzle: createPuzzle
    }
}();