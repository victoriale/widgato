var options = {
  dynamic_widget:{
    domain:{
      default: "chicagotribune.com",
      enabled: true,
      explanation: "The top level domain that the widget will be embeded on.",
      name: "Domain",
      type: "text"
    },
    sub_domain:{
      default: "mytouchdownzone.com/chicagotribune.com",
      enabled: true,
      explanation: "The subdomain (and sometimes the partner part of the url) that will form the base url for the linkbacks on the widget.",
      name: "Sub Domain",
      type: "text"
    },
    county:{
      default: "",
      enabled: true,
      explanation: "A one-off field for AJC.com for Atlanta's surrounding counties. If left blank, the one-off functionality will be disabled, set to 'atl_metro' to use the combination of all the atl counties",
      name: "County",
      type: "text"
    },
    remn:{
      default: "false",
      enabled: true,
      explanation: "If true, the widget will use internal logic as if it was embeded on one of our own house sites. If false, it will run as if its on a partner site",
      name: "Remnant?",
      type: "select",
      options: ["false", "true"]
    },
    targ:{
      default: "_blank",
      enabled: true,
      explanation: "This tells the widget how the links should open when clicked on. '_blank' means open in a new tab",
      name: "Target",
      type: "select",
      options: ["_blank","_top"]
    },
    category:{
      default: "nfl",
      enabled: true,
      explanation: "The category of lists and style of widget to use.",
      name: "Category",
      type: "select",
      options: ["nfl", "ncaaf","mlb","nba","college_basketball","weather","demographics","crime","disaster","finance","politics"]
    },
    sub_category:{
      default: "",
      enabled: false,
      explanation: "",
      name: "Sub Category",
      type: "text"
    },
    rand:{
      default: "1",
      enabled: true,
      explanation: "The starting list id to display when the widget loads (does not apply to football lists).",
      name: "Random#",
      type: "text"
    },
    env:{
      default: "prod-",
      enabled: true,
      explanation: "The environment to use when calling the backend API.",
      name: "API Environment",
      type: "select",
      options: ["prod-","dev-"]
    },
    output: '../dynamic_widget/dynamic_widget.html?{"dom":"<domain>","remn":"<remn>","county":"<county>","targ":"<targ>","category":"<category>","subd":"<sub_domain>","rand":"<rand>","env":"<env>"}'
  },
  dynamic_widget_wide:{
    domain:{
      default: "chicagotribune.com",
      enabled: true,
      explanation: "The top level domain that the widget will be embeded on.",
      name: "Domain",
      type: "text"
    },
    sub_domain:{
      default: "mytouchdownzone.com/chicagotribune.com",
      enabled: true,
      explanation: "The subdomain (and sometimes the partner part of the url) that will form the base url for the linkbacks on the widget.",
      name: "Sub Domain",
      type: "text"
    },
    county:{
      default: "",
      enabled: true,
      explanation: "A one-off field for AJC.com for Atlanta's surrounding counties. If left blank, the one-off functionality will be disabled, set to 'atl_metro' to use the combination of all the atl counties",
      name: "County",
      type: "text"
    },
    remn:{
      default: "false",
      enabled: true,
      explanation: "If true, the widget will use internal logic as if it was embeded on one of our own house sites. If false, it will run as if its on a partner site",
      name: "Remnant?",
      type: "select",
      options: ["false", "true"]
    },
    targ:{
      default: "_blank",
      enabled: true,
      explanation: "This tells the widget how the links should open when clicked on. '_blank' means open in a new tab",
      name: "Target",
      type: "select",
      options: ["_blank","_top"]
    },
    category:{
      default: "nfl",
      enabled: true,
      explanation: "The category of lists and style of widget to use.",
      name: "Category",
      type: "select",
      options: ["nfl", "ncaaf","mlb","nba","college_basketball","weather","demographics","crime","disaster","finance","politics"]
    },
    sub_category:{
      default: "",
      enabled: false,
      explanation: "",
      name: "Sub Category",
      type: "text"
    },
    rand:{
      default: "1",
      enabled: true,
      explanation: "The starting list id to display when the widget loads (does not apply to football lists).",
      name: "Random#",
      type: "text"
    },
    env:{
      default: "prod-",
      enabled: true,
      explanation: "The environment to use when calling the backend API.",
      name: "API Environment",
      type: "select",
      options: ["prod-","dev-"]
    },
    output: '../dynamic_widget/dynamic_widget_970.html?{"dom":"<domain>","remn":"<remn>","county":"<county>","targ":"<targ>","category":"<category>","subd":"<sub_domain>","rand":"<rand>","env":"<env>"}'
  },

  dynamic_widget_unlinked:{
    category:{
      default: "nfl",
      enabled: true,
      explanation: "The category of lists and style of widget to use.",
      name: "Category",
      type: "select",
      options: ["","nfl", "ncaaf","mlb","nba","college_basketball","weather","demographics","crime","disaster","finance","politics"]
    },
    group:{
      default: "sports",
      enabled: true,
      explanation: "The card of lists and style of widget to use.",
      name: "Group",
      type: "select",
      options: ["","sports","weather","money"]
    },
    sub_category:{
      default: "",
      enabled: false,
      explanation: "",
      name: "Sub Category",
      type: "text"
    },
    rand:{
      default: "1",
      enabled: true,
      explanation: "The starting list id to display when the widget loads (does not apply to football lists).",
      name: "Random#",
      type: "text"
    },
    env:{
      default: "prod-",
      enabled: true,
      explanation: "The environment to use when calling the backend API.",
      name: "API Environment",
      type: "select",
      options: ["prod","qa","dev"]
    },
    output: '../dynamic_widget_unlinked/index.html?{"category":"<category>","group":"<group>","subd":"<sub_domain>","rand":"<rand>","env":"<env>"}'
  },

  dynamic_article_widget:{
    domain:{
      default: "chicagotribune.com",
      enabled: true,
      explanation: "The top level domain that the widget will be embeded on.",
      name: "Domain",
      type: "text"
    },
    sub_domain:{
      default: "mytouchdownzone.com/chicagotribune.com",
      enabled: true,
      explanation: "The subdomain (and sometimes the partner part of the url) that will form the base url for the linkbacks on the widget.",
      name: "Sub Domain",
      type: "text"
    },
    county:{
      default: "",
      enabled: false,
      explanation: "A one-off field for AJC.com for Atlanta's surrounding counties. If left blank, the one-off functionality will be disabled, set to 'atl_metro' to use the combination of all the atl counties",
      name: "County",
      type: "text"
    },
    remn:{
      default: "false",
      enabled: true,
      explanation: "If true, the widget will use internal logic as if it was embeded on one of our own house sites. If false, it will run as if its on a partner site",
      name: "Remnant?",
      type: "select",
      options: ["false", "true"]
    },
    targ:{
      default: "_blank",
      enabled: true,
      explanation: "This tells the widget how the links should open when clicked on. '_blank' means open in a new tab",
      name: "Target",
      type: "select",
      options: ["_blank","_top"]
    },
    category:{
      default: "sports",
      enabled: true,
      explanation: "The category of lists and style of widget to use.",
      name: "Category",
      type: "select",
      options: ["trending","breaking","sports","weather","business","politics","entertainment","food","health","lifestyle","real-estate","travel","automotive","nfl", "ncaaf","mlb","nba","ncaam","television","movies","music"]
    },
    sub_category:{
      default: "nfl",
      enabled: false,
      explanation: "",
      name: "Sub Category",
      type: "select",
      options: []
    },
    rand:{
      default: "1",
      enabled: true,
      explanation: "The starting list id to display when the widget loads (does not apply to football lists).",
      name: "Random#",
      type: "text"
    },
    output: '../dynamic_article_widget/dynamic_article_widget.html?{"dom":"<domain>","remn":"<remn>","targ":"<targ>","category":"<category>","subd":"<sub_domain>","rand":"<rand>"}'
  },
  dynamic_article_widget_wide:{
    domain:{
      default: "chicagotribune.com",
      enabled: true,
      explanation: "The top level domain that the widget will be embeded on.",
      name: "Domain",
      type: "text"
    },
    sub_domain:{
      default: "mytouchdownzone.com/chicagotribune.com",
      enabled: true,
      explanation: "The subdomain (and sometimes the partner part of the url) that will form the base url for the linkbacks on the widget.",
      name: "Sub Domain",
      type: "text"
    },
    county:{
      default: "",
      enabled: false,
      explanation: "A one-off field for AJC.com for Atlanta's surrounding counties. If left blank, the one-off functionality will be disabled, set to 'atl_metro' to use the combination of all the atl counties",
      name: "County",
      type: "text"
    },
    remn:{
      default: "false",
      enabled: true,
      explanation: "If true, the widget will use internal logic as if it was embeded on one of our own house sites. If false, it will run as if its on a partner site",
      name: "Remnant?",
      type: "select",
      options: ["false", "true"]
    },
    targ:{
      default: "_blank",
      enabled: true,
      explanation: "This tells the widget how the links should open when clicked on. '_blank' means open in a new tab",
      name: "Target",
      type: "select",
      options: ["_blank","_top"]
    },
    category:{
      default: "sports",
      enabled: true,
      explanation: "The category of lists and style of widget to use.",
      name: "Category",
      type: "select",
      options: ["trending","breaking","sports","weather","business","politics","entertainment","food","health","lifestyle","real-estate","travel","automotive","nfl", "ncaaf","mlb","nba","ncaam","television","movies","music"]
    },
    sub_category:{
      default: "nfl",
      enabled: false,
      explanation: "",
      name: "Sub Category",
      type: "select",
      options: []
    },
    rand:{
      default: "1",
      enabled: true,
      explanation: "The starting list id to display when the widget loads (does not apply to football lists).",
      name: "Random#",
      type: "text"
    },
    output: '../dynamic_article_widget/dynamic_article_widget_970.html?{"dom":"<domain>","remn":"<remn>","targ":"<targ>","category":"<category>","subd":"<sub_domain>","rand":"<rand>"}'
  },
  nba_ai_article_widget:{
    domain:{
      default: "chicagotribune.com",
      enabled: true,
      explanation: "The top level domain that the widget will be embeded on.",
      name: "Domain",
      type: "text"
    },
    remn:{
      default: "false",
      enabled: true,
      explanation: "If true, the widget will use internal logic as if it was embeded on one of our own house sites. If false, it will run as if its on a partner site",
      name: "Remnant?",
      type: "select",
      options: ["false", "true"]
    },
    targ:{
      default: "_blank",
      enabled: true,
      explanation: "This tells the widget how the links should open when clicked on. '_blank' means open in a new tab",
      name: "Target",
      type: "select",
      options: ["_blank","_top"]
    },
    category:{
      default: "nba",
      enabled: true,
      explanation: "The category of lists and style of widget to use.",
      name: "Category",
      type: "select",
      options: ["nba","ncaa"]
    },
    output:'../sports/ai_article.html?{"dom":"<domain>","remn":"<remn>","category":"<category>","targ":"<targ>"}'
  },
  nfl_ai_article_widget:{
    domain:{
      default: "chicagotribune.com",
      enabled: true,
      explanation: "The top level domain that the widget will be embeded on.",
      name: "Domain",
      type: "text"
    },
    remn:{
      default: "false",
      enabled: true,
      explanation: "If true, the widget will use internal logic as if it was embeded on one of our own house sites. If false, it will run as if its on a partner site",
      name: "Remnant?",
      type: "select",
      options: ["false", "true"]
    },
    targ:{
      default: "_blank",
      enabled: true,
      explanation: "This tells the widget how the links should open when clicked on. '_blank' means open in a new tab",
      name: "Target",
      type: "select",
      options: ["_blank","_top"]
    },
    league:{
      default: "football_pro",
      enabled: true,
      explanation: "The category of lists and style of widget to use.",
      name: "League",
      type: "select",
      options: ["football_pro","ncaaf"]
    },
    output:'../sports/tdl_sidekick_vertical.html?{"dom":"<domain>","remn":"<remn>","league":"<league>","targ":"<targ>"}'
  },
  mlb_ai_article_widget:{
    domain:{
      default: "chicagotribune.com",
      enabled: true,
      explanation: "The top level domain that the widget will be embeded on.",
      name: "Domain",
      type: "text"
    },
    remn:{
      default: "false",
      enabled: true,
      explanation: "If true, the widget will use internal logic as if it was embeded on one of our own house sites. If false, it will run as if its on a partner site",
      name: "Remnant?",
      type: "select",
      options: ["false", "true"]
    },
    targ:{
      default: "_blank",
      enabled: true,
      explanation: "This tells the widget how the links should open when clicked on. '_blank' means open in a new tab",
      name: "Target",
      type: "select",
      options: ["_blank","_top"]
    },
    category:{
      default: "mlb",
      enabled: true,
      explanation: "The category of lists and style of widget to use.",
      name: "Category",
      type: "select",
      options: ["mlb"]
    },
    output:'../sports/hrl_sidekick_vertical.html?{"dom":"<domain>","remn":"<remn>","category":"<category>","targ":"<targ>"}'
  },
  ai_article_wide: {
    output:'../sports/ai_article_wide.html'
  },
  caw_widget:{
    caw_url:{
      default: "http://www.chicagotribune.com/entertainment/tv/ct-donald-trump-alec-baldwin-feud-20161219-story.html",
      enabled: true,
      explanation: "The input url (the page that has content we are trying to find relevance from) to send to the content aware widget.",
      name: "Input Page URL",
      type: "text"
    },
    output:'../dynamic_caw_widget/dynamic_caw_widget.html?{"dom":"chicagotribune.com","loc":{"loc":{"city":[],"DMA":[],"state":[],"zipcode":[]}},"c_id":null,"remn":"false","caw_url":"<caw_url>","targ":"_blank","cat":"null","subd":"","rand":2}'
  },
  caw_widget_wide:{
    caw_url:{
      default: "http://www.chicagotribune.com/entertainment/tv/ct-donald-trump-alec-baldwin-feud-20161219-story.html",
      enabled: true,
      explanation: "The input url (the page that has content we are trying to find relevance from) to send to the content aware widget.",
      name: "Input Page URL",
      type: "text"
    },
    output:'../dynamic_caw_widget/dynamic_caw_widget_970.html?{"dom":"chicagotribune.com","loc":{"loc":{"city":[],"DMA":[],"state":[],"zipcode":[]}},"c_id":null,"remn":"false","caw_url":"<caw_url>","targ":"_blank","cat":"null","subd":"","rand":2}'
  },
  excavator_widget:{
    caw_url:{
      default: "http://www.chicagotribune.com/entertainment/tv/ct-donald-trump-alec-baldwin-feud-20161219-story.html",
      enabled: true,
      explanation: "The input url (the page that has content we are trying to find relevance from) to send to the content aware widget.",
      name: "Input Page URL",
      type: "text"
    },
    output:'../dynamic_tronc_widget/dynamic_tronc_widget.html?{"dom":"chicagotribune.com","loc":{"loc":{"city":[],"DMA":[],"state":[],"zipcode":[]}},"category":"tcx","remn":"false","caw_url":"<caw_url>","targ":"_blank","cat":"null","subd":"","rand":2}'
  },
  kbb_widget:{
    output:'../dynamic_kbb_widget/dynamic_kbb_widget.html?%7B"dom"%3A"basketball.chicagotribune.com"%2C"loc"%3A%7B"loc"%3A%7B"nfl"%3A%5B%5D%7D%7D%2C"c_id"%3A"100971247"%2C"remn"%3A"true"%2C"bord"%3A"false"%2C"category"%3A"kbb"%2C"targ"%3A"_top"%7D'
  },
  kbb_dashboard:{
    output:'../dynamic_kbb_widget/dynamic_kbb_dashboard.html?%7B"dom"%3A"basketball.chicagotribune.com"%2C"loc"%3A%7B"loc"%3A%7B"nfl"%3A%5B%5D%7D%7D%2C"c_id"%3A"100971247"%2C"remn"%3A"true"%2C"bord"%3A"false"%2C"category"%3A"kbb"%2C"targ"%3A"_top"%7D'
  },
  kbb_articles:{
    output:'../dynamic_kbb_widget/dynamic_kbb_articles.html?%7B"dom"%3A"basketball.chicagotribune.com"%2C"loc"%3A%7B"loc"%3A%7B"nfl"%3A%5B%5D%7D%7D%2C"c_id"%3A"100971247"%2C"remn"%3A"true"%2C"bord"%3A"false"%2C"category"%3A"kbb"%2C"targ"%3A"_top"%7D'
  },
  swp_wdgt_list:{
    show_link:{
      default: "true",
      enabled: true,
      explanation: "Setting showLink to false, will hide the 'see the list' button and disable any linkback functionality and hover states",
      name: "Show Links",
      type: "select",
      options: ["true","false"]
    },
    output:'../swp-wdgt/swp-wdgt-list.html?{"showLink":"<show_link>"}'
  },
  swp_wdgt_article:{
    show_link:{
      default: "true",
      enabled: true,
      explanation: "Setting showLink to false, will hide the 'see the list' button and disable any linkback functionality and hover states",
      name: "Show Links",
      type: "select",
      options: ["true","false"]
    },
    output:'../swp-wdgt/swp-wdgt-article.html?{"showLink":"<show_link>"}'
  },
  billboard:{
    domain:{
      default: "chicagotribune.com",
      enabled: true,
      explanation: "The top level domain that the widget will be embeded on.",
      name: "Domain",
      type: "text"
    },
    targ:{
      default: "_blank",
      enabled: true,
      explanation: "This tells the widget how the links should open when clicked on. '_blank' means open in a new tab",
      name: "Target",
      type: "select",
      options: ["_blank","_top"]
    },
    category:{
      default: "sports",
      enabled: true,
      explanation: "The category of lists and style of widget to use.",
      name: "Category",
      type: "select",
      options: ["trending","breaking","sports","weather","business","politics","entertainment","food","health","lifestyle","keyword-real-estate","travel","automotive"]
    },
    sub_category:{
      default: "nfl",
      enabled: true,
      explanation: "The sub-category of lists for the widget to use.",
      name: "Sub Category",
      type: "select",
      options: ["","nfl", "ncaaf","mlb","nba","ncaam","television","movies","music"]
    },
    team:{
      default: "1",
      enabled: true,
      explanation: "The team ID to display results for when the widget loads (if the list is sports related).",
      name: "Team ID",
      type: "text"
    },
    output:'../billboard/billboard.html?{"dom":"<domain>","category":"<category>","targ":"<targ>","league":"<sub_category>","team":"<team>"}'
  },
  chatterbox:{
    domain:{
      default: "chicagotribune.com",
      enabled: true,
      explanation: "The top level domain that the widget will be embeded on.",
      name: "Domain",
      type: "text"
    },
    targ:{
      default: "_blank",
      enabled: true,
      explanation: "This tells the widget how the links should open when clicked on. '_blank' means open in a new tab",
      name: "Target",
      type: "select",
      options: ["_blank","_top"]
    },
    category:{
      default: "sports",
      enabled: true,
      explanation: "The category of lists and style of widget to use.",
      name: "Category",
      type: "select",
      options: ["trending","breaking","sports","weather","business","politics","entertainment","food","health","lifestyle","keyword-real-estate","travel","automotive"]
    },
    sub_category:{
      default: "nfl",
      enabled: true,
      explanation: "The sub-category of lists for the widget to use.",
      name: "Sub Category",
      type: "select",
      options: ["","nfl", "ncaaf","mlb","nba","ncaam","television","movies","music"]
    },
    output:'../tcx_chatterbox/tcx_chatterbox.html?{"dom":"<domain>","category":"<category>","targ":"<targ>","league":"<sub_category>"}'
  },
  salad_bar:{
    output:"../deepdive/bar/test.html"
  },
  schedule_bar: {
    output:"../deepdive/boxscores/nfl.html"
  },
  finance_graph_widget: {
    domain:{
      default: "chicagotribune.com",
      enabled: true,
      explanation: "The top level domain that the widget will be embeded on.",
      name: "Domain",
      type: "text"
    },
    targ:{
      default: "_blank",
      enabled: true,
      explanation: "This tells the widget how the links should open when clicked on. '_blank' means open in a new tab",
      name: "Target",
      type: "select",
      options: ["_blank","_top"]
    },
    remn:{
      default: "false",
      enabled: true,
      explanation: "If true, the widget will use internal logic as if it was embeded on one of our own house sites. If false, it will run as if its on a partner site",
      name: "Remnant?",
      type: "select",
      options: ["false", "true"]
    },
    location:{
      default: "Tampa Bay, Florida",
      enabled: true,
      explanation: "The user's geolocation to send to the widget.",
      name: "Location",
      type: "text"
    },
    output:'../finance/national_widget.html?{"dom":"<domain>","loc":{"loc_name":"<location>"},"remn":"<remn>","bord":false,"targ":"<targ>"}'
  },
  realestate_lol_widget: {
    output: '../realestate/standard.html'
  },
  centipede:{
    domain:{
      default: "chicagotribune.com",
      enabled: true,
      explanation: "The top level domain that the widget will be embeded on.",
      name: "Domain",
      type: "text"
    },
    category:{
      default: "finance",
      enabled: true,
      explanation: "The category of lists and style of widget to use.",
      name: "Category",
      type: "select",
      options: ["nfl", "ncaaf","mlb","nba","college_basketball","weather","demographics","crime","disaster","finance","politics"]
    },
    rand:{
      default: "1",
      enabled: true,
      explanation: "The starting list id to display when the widget loads (does not apply to football lists).",
      name: "Random#",
      type: "text"
    },
    env:{
      default: "prod-",
      enabled: true,
      explanation: "The environment to use when calling the backend API.",
      name: "API Environment",
      type: "select",
      options: ["prod-","dev-"]
    },
    output: '../centipede/centipede.html?{"dom":"<domain>","category":"<category>","rand":"<rand>","env":"<env>"}'
  },
  megaphone:{
    domain:{
      default: "chicagotribune.com",
      enabled: true,
      explanation: "The top level domain that the widget will be embeded on.",
      name: "Domain",
      type: "text"
    },
    env:{
      default: "prod-",
      enabled: true,
      explanation: "The environment to use when calling the backend API.",
      name: "API Environment",
      type: "select",
      options: ["prod-","dev-"]
    },
    output: 'http://10.40.0.37:8070/megaphone.html'
  }
};

var settingsInputs = document.getElementById('settingsInputs');
var currentField;

function generateWidget() {
  var widget = document.getElementById("wType").value;
  var url = options[widget].output;
  for (var field in options[widget]) {
    if (field != "output" && options[widget][field].enabled == true) {
      domElem = document.getElementById(field);
      url = url.replace("<" + field + ">",domElem.value);
    }
  }
  document.getElementById("previewFrame").contentWindow.document.location.href = url;
  document.getElementById("outputTextarea").value = url.replace("..","http://w1.synapsys.us/widgets");
}
function changeWidget(newWidget) {
  settingsInputs.innerHTML = "";
  for (var field in options[newWidget]) {
    currentField = options[newWidget][field];
    if (field != "output" && currentField.enabled == true) {
      var htmlField = document.createElement('tr');
      htmlField.className = "fieldDiv";
      if (currentField.type == "text") {
        htmlField.innerHTML = "<td>" + currentField.name + " </td><td><input type='text' value='" + currentField.default + "' class='textInput' name='" + field + "' id='" + field + "'/>" + "</td>";
      }
      else if (currentField.type == "select") {
        var selectOptions = "";
        for (i = 0; i < currentField.options.length; i++) {
          if (currentField.options[i] == currentField.default) {
            selectOptions = selectOptions + "<option selected='selected' value='" + currentField.options[i] + "'>" + currentField.options[i] + "</option>";
          }
          else {
            selectOptions = selectOptions + "<option value='" + currentField.options[i] + "'>" + currentField.options[i] + "</option>";
          }
        }
        htmlField.innerHTML ="<td>" + currentField.name + " </td><td><select type='text' class='selectInput' name='" + field + "' id='" + field + "'>" + selectOptions +  "</select>" + "</td>";
      }
      htmlField.innerHTML = htmlField.innerHTML + "<div class='explanation'>" + currentField.explanation + "</div>";
      htmlField.innerHTML = htmlField.innerHTML;
      settingsInputs.appendChild(htmlField);
    }
  }
  var domain;
  if (document.getElementById("domain")) {
    domain = document.getElementById("domain").value;
  }
  var sub_domain;
  if (document.getElementById("sub_domain")) {
    sub_domain = document.getElementById("sub_domain").value;
  }
  var category;
  if (document.getElementById("category")) {
    category = document.getElementById("category").value;
  }
  document.cookie = '{"type":"'+newWidget+'","domain":"'+domain+'","sub_domain":"'+sub_domain+'","category":"'+category+'"}';
}
function setSize() {
  var ifWidth = document.getElementById("prevWidth").value;
  var ifHeight = document.getElementById("prevHeight").value;
  document.getElementById("previewFrame").style.width = ifWidth + "px";
  document.getElementById("previewFrame").style.height = ifHeight + "px";
}
if (document.cookie != null) { //onload check for a cookie from prev session
  var cookie = JSON.parse(document.cookie.split(";")[0]);
  if (cookie.type && cookie.type != "") {
    console.log("loading in prev session config data",cookie);
    changeWidget(cookie.type); //if cookie has type data, load that instead of default
  }
  else { // if no valid cookie, fallback to default
    changeWidget(document.getElementById("wType").value);
  }
}
else { // if no valid cookie, fallback to default
  changeWidget(document.getElementById("wType").value);
}
