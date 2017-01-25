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

  },
  nfl_ai_article_widget:{

  },
  mlb_ai_article_widget:{

  },
  caw_widget:{

  },
  swp_wdgt_list:{

  },
  swp_wdgt_article:{

  },
  billboard:{

  },
  chatterbox:{

  },
  salad_bar:{

  },
  schedule_bar: {

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
      var htmlField = document.createElement('div');
      htmlField.className = "fieldDiv";
      if (currentField.type == "text") {
        htmlField.innerHTML = currentField.name + ": <input type='text' value='" + currentField.default + "' class='textInput' name='" + field + "' id='" + field + "'/>";
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
        htmlField.innerHTML = currentField.name + ": <select type='text' class='selectInput' name='" + field + "' id='" + field + "'>" + selectOptions +  "</select>";
      }
      htmlField.innerHTML = htmlField.innerHTML + "<div class='explanation'>" + currentField.explanation + "</div>";
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
