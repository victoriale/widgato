// NOTE: all JSON settings have been depricated in favor of moving into a DB. If you need a new widget added, contact Caleb
var xmlHttp = new XMLHttpRequest();
var responce;
var options = {};
xmlHttp.open( "GET", "./load_widgets.php", false);
xmlHttp.send( null );
try {
  options = JSON.parse(xmlHttp.responseText);
}
catch(err) {
  console.log("Error loading inital widgets config from DB",err);
}

var settingsInputs = document.getElementById('settingsInputs');
var currentField;

function generateWidget() { //create the output widget based on the user-configured settings
  var widget = document.getElementById("wType").value;
  var url = options[widget].output;
  var preCookie = '{"type":"'+widget+'",';
  for (var field in options[widget].settings) {
    if (field != "embed" && field != "output" && options[widget].settings[field].enabled == "true") {
      domElem = document.getElementById(field);
      url = url.replace("%" + field + "%",domElem.value);
      preCookie += '"'+field+'":"'+document.getElementById(field).value+'",';
    }
  }
  preCookie = preCookie.replace(/,\s*$/, '');
  preCookie += "}";
  document.cookie = preCookie;
  document.getElementById("previewFrame").contentWindow.document.location.href = url;
  document.getElementById("outputTextarea").value = url.replace("..","http://w1.synapsys.us/widgets");
  if (options[widget].embed != null && options[widget].embed != {} && options[widget].embed.type != "") {
    var xmlHttp = new XMLHttpRequest();
    var responce;
    if (options[widget].embed.type.indexOf("%category%") != -1 && document.getElementById("category").value != "") {
      xmlHttp.open( "GET", "./embed_generator.php?dom="+document.getElementById("domain").value+"&type="+options[widget].embed.type.replace("%category%",document.getElementById("category").value), false);
    }
    else if (options[widget].embed.type.indexOf("%group%") != -1 && document.getElementById("group").value != "") {
      xmlHttp.open( "GET", "./embed_generator.php?dom="+document.getElementById("domain").value+"&type="+options[widget].embed.type.replace("%group%",document.getElementById("group").value), false);
    }
    else {
      xmlHttp.open( "GET", "./embed_generator.php?dom="+document.getElementById("domain").value+"&type="+options[widget].embed.type, false);
    }
    xmlHttp.send( null );
    try {
      responce = xmlHttp.responseText;
      document.getElementById("outputEmbedTextarea").value = responce + "&style=" + options[widget].embed.style;
    }
    catch(err) {

    }
  }
  else {
    document.getElementById("outputEmbedTextarea").value = "N/A";
  }
}
function changeWidget(newWidget) { // create the settings boxes and info for the newly selected widget type
  settingsInputs.innerHTML = "";
  for (var field in options[newWidget].settings) {
    currentField = options[newWidget].settings[field];
    if (currentField.enabled == "true") {
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
      settingsInputs.appendChild(htmlField);
    }
  }
}
function setSize() {
  var ifWidth = document.getElementById("prevWidth").value;
  var ifHeight = document.getElementById("prevHeight").value;
  document.getElementById("previewFrame").style.width = ifWidth + "px";
  document.getElementById("previewFrame").style.height = ifHeight + "px";
}
function toggleDropdown(elementId) {
  element = document.getElementById(elementId);
  if (element.classList.contains("cd-active")) {
    element.classList.remove("cd-active");
    var listItems = element.getElementsByTagName("li");
    for (var i = 0; i < listItems.length; i++) {
      if (i < 4) {
        listItems[i].style.top = -60 + (i * 3) + "px";
        listItems[i].style.left = (i * 3) + "px";
        listItems[i].style.width = "calc(100% - " + (i * 6) + "px)";
      }
      else {
        listItems[i].style.top = -60 + (4 * 3) + "px";
        listItems[i].style.left = (4 * 3) + "px";
        listItems[i].style.width = "calc(100% - " + (4 * 6) + "px)";
        listItems[i].style.opacity = 0;
      }
      listItems[i].style.zIndex = listItems.length + -i;
    }
  }
  else {
    element.classList.add("cd-active");
    var listItems = element.getElementsByTagName("li");
    for (var i = 0; i < listItems.length; i++) {
      listItems[i].style.top = ((i * 60) + 3) + "px";
      listItems[i].style.width = element.offsetWidth + "px";
      listItems[i].style.left = "0px";
      listItems[i].style.zIndex = 1;
      listItems[i].style.opacity = 1;
    }
  }
}
function drawDropdown(elementId) {
  element = document.getElementById(elementId);
  var listItems = element.getElementsByTagName("li");
  element.getElementsByClassName("dropdown_target")[0].style.zIndex = listItems.length + 1;
  for (var i = 0; i < listItems.length; i++) {
    if (i < 4) {
      listItems[i].style.top = -60 + (i * 3) + "px";
      listItems[i].style.left = (i * 3) + "px";
      listItems[i].style.width = "calc(100% - " + (i * 6) + "px)";
    }
    else {
      listItems[i].style.top = -60 + (4 * 3) + "px";
      listItems[i].style.left = (4 * 3) + "px";
      listItems[i].style.width = "calc(100% - " + (4 * 6) + "px)";
      listItems[i].style.opacity = 0;
    }
    listItems[i].style.zIndex = listItems.length + -i;
  }
  element.getElementsByClassName("dropdown_target")[0].onclick = function(){
    toggleDropdown(elementId);
  };
}
function clickListItem(e) {
  var itemWrapper = e.target.parentElement.parentElement.parentElement;
  itemWrapper.getElementsByClassName("dropdown_target")[0].innerHTML=e.target.innerHTML;
  itemWrapper.getElementsByClassName("dropdown_input")[0].value = e.target.parentElement.getAttribute("data_value");
  changeWidget(e.target.parentElement.getAttribute("data_value"))
  toggleDropdown(itemWrapper.id);
}
function populateWidgetSelect() {
  outputHTML = "";
  for (var widget in options) {
    outputHTML += `
      <li data_value="`+widget+`" onclick="clickListItem(event)">
        <img class="dropdown-icon" src="`+options[widget].image+`">
        <span>`+ options[widget].name +`</span>
      </li>
    `;
  }
  document.getElementById("wType_dropdown").getElementsByTagName("ul")[0].innerHTML = outputHTML;
  drawDropdown("wType_dropdown");
}
populateWidgetSelect();
if (document.cookie != null) { //onload check for a cookie from prev session
  try {
    var cookie = JSON.parse(document.cookie.split(";")[0]);
    if (cookie.type != null && cookie.type != "") {
      console.log("loading in prev session config data",cookie);
      document.getElementById("wType").value = cookie.type;
      changeWidget(cookie.type); //if cookie has type data, load that instead of default
      for (var value in cookie) {
        if (value != "type") {
          document.getElementById(value).value = cookie[value];
        }
      }
      generateWidget()
    }
    else { // if no valid cookie, fallback to default
      console.log("no valid cookie... falling back");
      changeWidget(document.getElementById("wType").value);
      generateWidget()
    }
  }
  catch(e) {
    console.log("Bad saved session cookie:",e)
  }
}
else { // if no valid cookie, fallback to default
  console.log("no valid cookie... falling back");
  changeWidget(document.getElementById("wType").value);
  generateWidget()
}
