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
      options: ["_blank"]
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
    output: '../dynamic_widget/dynamic_widget.html?{"dom":"<domain>","remn":"<remn>","targ":"<targ>","category":"<category>","subd":"<sub_domain>","rand":"<rand>"}'
  },
  dynamic_widget_wide:{

  },
  dynamic_article_widget:{

  },
  dynamic_article_widget_wide:{

  },
  caw_widget:{

  },
  swp_wdgt:{

  }
};

var settingsInputs = document.getElementById('settingsInputs');
var currentField;
for (var field in options.dynamic_widget) {
  currentField = options.dynamic_widget[field];
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
function generateWidget() {
  var url = options.dynamic_widget.output;
  for (var field in options.dynamic_widget) {
    if (field != "output") {
      domElem = document.getElementById(field);
      url = url.replace("<" + field + ">",domElem.value);
    }
  }
  document.getElementById("previewFrame").contentWindow.document.location.href = url;
}
