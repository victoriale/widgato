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
      explanation: "A one-off field for AJC.com for Atlanta's surrounding counties. If left blank, the one-off functionality will be disabled",
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
    output: '../dynamic_widget/dynamic_widget.html?{"dom":"<domain>","remn":"<remn>","county":"<county>","targ":"<targ>","category":"<category>","subd":"<sub_domain>","rand":"<rand>"}'
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
      explanation: "A one-off field for AJC.com for Atlanta's surrounding counties. If left blank, the one-off functionality will be disabled",
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
    output: '../dynamic_widget/dynamic_widget_970.html?{"dom":"<domain>","remn":"<remn>","county":"<county>","targ":"<targ>","category":"<category>","subd":"<sub_domain>","rand":"<rand>"}'
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
      explanation: "A one-off field for AJC.com for Atlanta's surrounding counties. If left blank, the one-off functionality will be disabled",
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
      explanation: "A one-off field for AJC.com for Atlanta's surrounding counties. If left blank, the one-off functionality will be disabled",
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
    output:'../sports/ai_article.html?%7B"dom"%3A"tcxmedia.com","loc"%3A%5B%5D,"c_id"%3Anull,"remn"%3A"true","bord"%3A"false","category"%3A"nba","targ"%3A"_blank","league"%3A"nba","team"%3A"150","subd"%3A"basketball.chicagotribune.com%2Ftcxmedia.com"%7D'
  },
  nfl_ai_article_widget:{
    output:'../sports/tdl_sidekick_vertical.html?%7B%22dom%22%3A%22touchdownloyal.com%22%2C%22loc%22%3A%5B%5D%2C%22c_id%22%3Anull%2C%22remn%22%3A%22true%22%2C%22bord%22%3A%22false%22%2C%22category%22%3A%22football_pro%22%2C%22targ%22%3A%22_blank%22%2C%22league%22%3A%22nfl%22%7D'
  },
  mlb_ai_article_widget:{
    output:'../sports/hrl_sidekick_vertical.html?%7B%22dom%22%3A%22homerunloyal.com%22%2C%22loc%22%3A%7B%22loc%22%3A%7B%22nfl%22%3A%5B%5D%7D%7D%2C%22c_id%22%3A%22100971247%22%2C%22remn%22%3A%22true%22%2C%22bord%22%3A%22false%22%2C%22category%22%3A%22mlb%22%2C%22targ%22%3A%22_blank%22%7D'
  },
  caw_widget:{
    output:'../dynamic_caw_widget/dynamic_caw_widget.html?{%22dom%22:%22tcxmedia.com%22,%22loc%22:{%22loc%22:{%22city%22:[],%22DMA%22:[],%22state%22:[],%22zipcode%22:[]}},%22c_id%22:null,%22remn%22:%22true%22,%22bord%22:false,%22caw_url%22:%22http://www.chicagotribune.com/entertainment/tv/ct-donald-trump-alec-baldwin-feud-20161219-story.html%22,%22subd%22:%22football.chicagotribune.com%22,%22rand%22:5}'
  },
  caw_widget_wide:{
    output:'../dynamic_caw_widget/dynamic_caw_widget_970.html?{%22dom%22:%22tcxmedia.com%22,%22loc%22:{%22loc%22:{%22city%22:[],%22DMA%22:[],%22state%22:[],%22zipcode%22:[]}},%22c_id%22:null,%22remn%22:%22true%22,%22bord%22:false,%22caw_url%22:%22http://www.chicagotribune.com/entertainment/tv/ct-donald-trump-alec-baldwin-feud-20161219-story.html%22,%22subd%22:%22football.chicagotribune.com%22,%22rand%22:5}'
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
      options: ["nfl", "ncaaf","mlb","nba","ncaam","television","movies","music"]
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
      options: ["nfl", "ncaaf","mlb","nba","ncaam","television","movies","music"]
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
    output:"../finance/national_widget.html?{%22dom%22:%22tcxmedia.com%22,%22loc%22:{%22loc_name%22:%22Tampa%20Bay,%20Florida%22},%22remn%22:%22true%22,%22bord%22:false,%22targ%22:%22_blank%22}"
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
}
changeWidget(document.getElementById("wType").value);
function setSize() {
  var ifWidth = document.getElementById("prevWidth").value;
  var ifHeight = document.getElementById("prevHeight").value;
  document.getElementById("previewFrame").style.width = ifWidth + "px";
  document.getElementById("previewFrame").style.height = ifHeight + "px";
}
