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
    output:"about:blank"
  },
  nfl_ai_article_widget:{
    output:"about:blank"
  },
  mlb_ai_article_widget:{
    output:"about:blank"
  },
  caw_widget:{
    output:"about:blank"
  },
  swp_wdgt_list:{
    output:'../swp-wdgt/swp-wdgt-list.html'
  },
  swp_wdgt_article:{
    output:'../swp-wdgt/swp-wdgt-article.html'
  },
  billboard:{
    output:'../billboard/billboard.html?%7B"dom"%3A"tcxmedia.com"%2C"loc"%3A%5B%5D%2C"c_id"%3Anull%2C"remn"%3A"false"%2C"bord"%3A"false"%2C"category"%3A"keyword-real-estate"%2C"targ"%3A"_blank"%2C"league"%3A""%2C"team"%3A"150"%7D'
  },
  chatterbox:{
    output:'../tcx_chatterbox/tcx_chatterbox.html?%7B"dom"%3A"tcxmedia.com"%2C"loc"%3A%7B"loc"%3A%7B"nfl"%3A%5B%5D%7D%7D%2C"c_id"%3A""%2C"remn"%3A"false"%2C"bord"%3A"false"%2C"category"%3A"weather"%2C"targ"%3A"_blank"%2C"league"%3A"nfl"%7D'
  },
  salad_bar:{
    output:"about:blank"
  },
  schedule_bar: {
    output:"about:blank"
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
