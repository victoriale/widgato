dynamic_widget = function() {
    function e(e) {
        "complete" == d.readyState || "interactive" == d.readyState ? e() : d.addEventListener ? d.addEventListener("DOMContentLoaded", e) : d.attachEvent && d.attachEvent("onreadystatechange", function() {
            "complete" == d.readyState && e()
        })
    }

    function t() {
        "lasvegasnow.com" == u.dom && (h = !0, y = "finance.lasvegasnow.com"), ("undefined" == typeof u.category || -1 == p.indexOf(u.category)) && (u.category = "finance");
        var i, l = "undefined" != typeof u.rand && 0 == w ? u.rand : Math.floor(10 * Math.random());
        i = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"), i.onreadystatechange = function() {
            if (i.readyState == XMLHttpRequest.DONE)
                if (200 == i.status) c = JSON.parse(i.responseText), e(r);
                else {
                    var l = i.statusText;
                    if (500 == i.status) try {
                        l = JSON.parse(i.responseText).message
                    } catch (n) {
                        console.log("No JSON message")
                    }
                    if (l = "HTTP Error (" + i.status + "): " + l, w++ > 10) throw l;
                    setTimeout(t, 500)
                }
        }, i.open("GET", s + "?partner=" + ("undefined" != typeof u.dom ? u.dom : "") + "&cat=" + u.category + "&rand=" + l, !0), i.send()
    }

    function r() {
        if ("undefined" != typeof dataLayer && dataLayer.push({
                event: "widget-title",
                eventAction: dynamic_widget.get_title()
            }), "nydailynews.com" == u.dom) {
            var e = document.getElementsByClassName("dw")[0];
            e.style.height = "340px";
            var t = document.createElement("div");
            t.style.width = "100%", t.style.height = "10px", t.style.color = "#999", t.style["text-align"] = "center", t.style["line-height"] = "10px", t.style["font-size"] = "10px", t.style["background-color"] = "#fff", t.innerHTML = "PAID CONTENT", document.body.insertBefore(t, e)
        }
        if ("politics" == u.category) {
            var r = -1 != c.l_title.indexOf("Republican") ? "r" : -1 != c.l_title.indexOf("Independent") ? "i" : "d";
            add_css_link("../css/dynamic_widget_politics_" + r + ".css")
        }
        $("title").innerHTML = c.l_title, null != $("line4") && 350 == d.getElementsByClassName("dw")[0].clientWidth && $("title").scrollHeight > 61 && $("title").setAttribute("style", "font-size: 14px");
        var l = !0;
        switch (u.category) {
            case "nba":
                var n = "true" == u.remn ? "http://www.hoopsloyal.com/NBA/widget-list" : "http://www.myhoopszone.com/" + u.dom + "/NBA/w-list";
                break;
            case "college_basketball":
                var n = "true" == u.remn ? "http://www.hoopsloyal.com/NCAA/widget-list" : "http://www.myhoopszone.com/" + u.dom + "/NCAA/w-list";
                break;
            case "mlb":
                // var n = "true" == u.remn ? "http://www.homerunloyal.com/list" : "http://www.myhomerunzone.com/" + u.dom + "/list-view";
                var n = "/";//DEMO
                $("mainurl").style.cssText += "background-color:#ffffff; pointer-events:none; cursor:default";//REMOVE THIS IS DEMO
                $("suburl").style.cssText += "background-color:#ffffff; pointer-events:none; cursor:default";//REMOVE THIS IS DEMO
                $("line1").style.cssText += "background-color:#ffffff; pointer-events:none; cursor:default";//REMOVE THIS IS DEMO
                $("homelink").style.cssText += "background-color:#ffffff; pointer-events:none; cursor:default";//REMOVE THIS IS DEMO
                $("list-link").style.display = 'none';//REMOVE THIS IS DEMO
                break;
            case "finance":
                var n = "true" == u.remn ? "http://www.investkit.com/widget-list" : "http://www.myinvestkit.com/" + u.dom + "/w-list";
                h && (n = n.replace("www.myinvestkit.com", y));
                break;
            default:
                var n = "true" == u.remn ? "http://www.joyfulhome.com/wlist" : "http://www.myhousekit.com/" + u.dom + "/wlist",
                    l = !1
        }
        n += l ? "?tw=" + c.l_param + "&sw=" + c.l_sort + "&input=" + c.l_input : "/tw-" + c.l_param + "+sw-" + c.l_sort + "+input-" + c.l_input, $("list-link") && ($("list-link").href = n), i()
    }

    function i() {
        var e = c.l_data[m];
        e.li_url = e.li_subimg !== !1 && e.li_subimg["switch"] ? "true" == u.remn ? e.li_subimg.primary_url : e.li_subimg.partner_url.replace("{partner}", u.dom) : "true" == u.remn ? e.li_primary_url : e.li_partner_url.replace("{partner}", u.dom), e.li_line_url = "true" == u.remn ? e.li_primary_url : e.li_partner_url.replace("{partner}", u.dom), h && (e.li_url = e.li_url.replace("www.myinvestkit.com", y), e.li_line_url = e.li_line_url.replace("www.myinvestkit.com", y)), $("line1").innerHTML = e.li_title, $("line2").innerHTML = e.li_sub_txt, null == $("line4") ? $("desc").innerHTML = e.li_str : ($("desc").innerHTML = e.li_value, $("line4").innerHTML = e.li_tag), $("line1").href = e.li_line_url;
        var t = $("mainimg"),
            r = t.getAttribute("onerror");
        if (t.setAttribute("onerror", ""), t.setAttribute("src", ""), t.setAttribute("src", e.li_img), setTimeout(function(e, t) {
                t.setAttribute("onerror", e)
            }.bind(void 0, r, t), 0), $("mainurl").href = e.li_url, $("num").innerHTML = "#" + e.li_rank, e.li_subimg !== !1) {
            var i = e.li_subimg["switch"] ? "true" == u.remn ? e.li_primary_url : e.li_partner_url.replace("{partner}", u.dom) : "true" == u.remn ? e.li_subimg.primary_url : e.li_subimg.partner_url.replace("{partner}", u.dom);
            h && (i = i.replace("www.myinvestkit.com", y));
            var l = $("subimg"),
                r = l.getAttribute("onerror");
            l.setAttribute("onerror", ""), l.setAttribute("src", ""), l.setAttribute("src", e.li_subimg.img), setTimeout(function(e, t) {
                t.setAttribute("onerror", e)
            }.bind(null, r, l), 0), $("suburl").href = i;
            var n = $("carousel"); - 1 == n.className.indexOf("two") && (n.className += " two")
        }
        if ($("list-link")) {
            var a = d.getElementsByClassName("dw-btn")[0];
            a.offsetTop + a.scrollHeight > d.getElementsByClassName("dw")[0].clientHeight && ($("title").setAttribute("style", "font-size: 14px"), d.getElementsByClassName("dw")[0].clientHeight <= 250 && $("title").setAttribute("style", "font-size: 12px")), a.offsetTop + a.scrollHeight > d.getElementsByClassName("dw")[0].clientHeight - 10 && d.getElementsByClassName("dw")[0].clientHeight <= 250 && d.getElementsByClassName("dw-btn")[0].setAttribute("style", "margin-top: 0")
        }
        var o = $("title");
        o.offsetTop + o.scrollHeight > $("carousel").offsetTop && $("title").setAttribute("style", "font-size: 14px")
    }

    function l(e) {
        m += e, m = m >= c.l_data.length ? 0 : 0 > m ? c.l_data.length - 1 : m, i(), "undefined" != typeof dataLayer && dataLayer.push({
            event: 1 == e ? "nav-right" : "nav-left",
            eventAction: dynamic_widget.get_title()
        })
    }

    function n() {
        return u.dom + ":" + u.category + ":" + (null == c.l_sort ? c.l_param : c.l_sort) + ":" + c.l_title
    }

    function a() {
        if (1 == u.carousel) {
            for (var e = d.getElementsByTagName("a"), t = 0; t < e.length; t++) e[t].setAttribute("onclick", "event.preventDefault(); return false;");
            for (var r = d.querySelectorAll(".hover"), t = 0; t < r.length; t++) r[t].parentNode.removeChild(r[t]);
            return $("list-link").parentNode.removeChild($("list-link")), !1
        }
        switch (u.category) {
            case "finance":
                var i = "true" == u.remn ? "http://www.investkit.com/" : "http://www.myinvestkit.com/" + u.dom + "/";
                h && (i = i.replace("www.myinvestkit.com", y));
                break;
            case "nba":
                var i = "true" == u.remn ? "http://www.hoopsloyal.com/NBA" : "http://www.myhoopszone.com/" + u.dom + "/NBA";
                break;
            case "college_basketball":
                var i = "true" == u.remn ? "http://www.hoopsloyal.com/NCAA" : "http://www.myhoopszone.com/" + u.dom + "/NCAA";
                break;
            case "mlb":
                // var i = "true" == u.remn ? "http://www.homerunloyal.com/" : "http://www.myhomerunzone.com/" + u.dom + "/";
                var i = "/";//DEMO
                break;
            default:
                var i = "true" == u.remn ? "http://www.joyfulhome.com/" : "http://www.myhousekit.com/" + u.dom + "/loc/"
        }
        $("homelink").href = i
    }
    var o = "https:" == location.protocol ? "https" : "http",
        s = o + "://108.170.11.234:190/list_api.php",
        m = 0,
        c = {},
        u = JSON.parse(decodeURIComponent(location.search.substr(1))),
        w = 0,
        p = ["finance", "nba", "college_basketball", "weather", "crime", "demographics", "politics", "disaster", "mlb"],
        h = !1,
        y = "";
    return t(), e(a), {
        carousel: l,
        get_title: n
    }
}();
