swp_wdgt = function(){
  A = function(id) {
    let d = document;
    if(id[0] == '#'){
      return d.getElementById(id.slice(1,id.length));
    }else if(id[0] == '.'){
      return d.getElementsByClassName(id.slice(1,id.length))[0];
    }else if(id[0] != '#' && id[0] != '.'){
      return d.getElementById(id.slice(1,id.length));
    }
  }

  var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";

  RenderArticleSide(protocolToUse);

}();

function RenderArticleSide(protocolToUse){
  // var APIUrl = protocolToUse + 'prod-homerunloyal-ai.synapsys.us/sidekick';
  var APIUrl = protocolToUse + 'qa-homerunloyal-ai.synapsys.us/sidekick';

  var articleIndex = 0;

  var data = httpGet(APIUrl);
  linkData(data, articleIndex);



  /* Handling of Article Index */
   updateArticle = function(){
    if(articleIndex < articleTypes.length - 1 || articleIndex == 0){
      articleIndex++;
    }else if(articleIndex >= articleTypes.length - 1){
      articleIndex = 0;
    }
    linkData(data, articleIndex);
  }
  /* functions to be used as objects to get various data points */
  function eventData(metaData){
    metaData = metaData.current;
    for(let obj in metaData){
      let string = obj.toString();
      this[obj] = metaData[obj]
    }
  }

  function eventImage(metaData, teamId){
    var images = metaData.images;
    this.imgs = [];
    for(let a = 0; a < images[teamId].length; a++){
      this.imgs[a] = images[teamId][a];
    }
  }

  //this function will return all images, home and away, in an array. (not oo)
  function getAllImages(metaData){
    var imgRet = [];
    var images = metaData.images;
    for(let obj in images){
      for(let i = 0; i < images[obj].length; i++){
        imgRet.push(images[obj][i]);
      }
    }
    return imgRet;
  }

  var articleTypes = [];
  function mapArticles(data){
    articleTypes = [];
    for(let obj in data){
      if(obj == "meta-data")continue;
      articleTypes.push(obj);
      this[obj] = data[obj];
    }
  }

  function linkData(data, articleIndex){
    var mData = data['meta-data'];
    var article = new mapArticles(data)[articleTypes[articleIndex]];
    var game = new eventData(mData);

    //images being selected based on the articleIndex value
    var images = getAllImages(mData);
    var image = images[articleIndex];

    //change this to img tags instead of bg image
    A('.section-image').style.backgroundImage = 'url("' + image + '")';
    A('.section-text').innerHTML = article.displayHeadline;

    //article url structure: /articles/:article_type/:event_id
    var articleUrl = protocolToUse + 'homerunloyal.com/articles/' + articleTypes[articleIndex] + '/' + game.eventId;
    var articleText = article.article[0].substr(0, 130);
    A('.content-text').innerHTML = articleText + '...<a href="'+ articleUrl +'"><span class="content-readmore"> Read More </span></a>';

    A('.bar-date').innerHTML = convertDate(game.startDateTime);
    var author = 'www.homerunloyal.com';
    var authorLink = author;
    A('.bar-author').innerHTML = '<a id="authorlink" href="' + protocolToUse + authorLink +'">' + author + '</a>';

    A('#readbutton').setAttribute('href', articleUrl);
    A('.buttons-nextlist').onmouseover = function(){
      A('#arrow').style.fill = 'white';
    }
    A('.buttons-nextlist').onmouseout = function(){
      A('#arrow').style.fill = '#b31d24';
    }
  }//end linkData()
}



/* -- Helper Functions -- */
function httpGet(url){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", url, false ); // false for synchronous request
  xmlHttp.send( null );
  return JSON.parse(xmlHttp.responseText);
}

function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}

/* -- Manipulation Functions  -- */
function convertDate(d){
  var date = d.split(' ');

  var day = date[0];
  var time = date[1];
  var tz = date[2];

  var month = MonthsFullName(day.split('/')[0]);
  var year = day.split('/')[2];
  var weekDay = day.split('/')[1];

  day = new Date(day);
  day = WeekDayNumToName(day.getDay());

  var today = new Date();
  var todayMonth = MonthsFullNameZed(today.getMonth());
  var todayYear = String(today.getFullYear()).slice(2);
  var todayDay = String(today.getDate());

  if(todayMonth == month && todayDay == weekDay && todayYear == year){
    // then it is today
    var string = 'Today' + ' ' + time + ' ' + tz;
  }else if(todayMonth == month && todayYear == year && Number(todayDay) - 1 == Number(weekDay)){
    // then it is yesterday (unless edge case where it is the end of the month)
    var string = 'Yesterday' + ' ' + time + ' ' + tz;
  }else{
    // otherwise just use day of the week
    var string = day + ' ' + time + ' ' + tz;
  }
  return string;
}

function WeekDayNumToName(n){
  var weekday = new Array(7);
  weekday[0]=  "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  return weekday[n];
}

function MonthsFullNameZed(number){
  var month = {
    "0":"January",
    "1":"February",
    "2":"March",
    "3":"April",
    "4":"May",
    "5":"June",
    "6":"July",
    "7":"August",
    "8":"September",
    "9":"October",
    "10":"November",
    "11":"December",
  }
  return month[number];
}

function MonthsFullName(number){
  var month = {
    "1":"January",
    "2":"February",
    "3":"March",
    "4":"April",
    "5":"May",
    "6":"June",
    "7":"July",
    "8":"August",
    "9":"September",
    "10":"October",
    "11":"November",
    "12":"December",
  }

  return month[number];
}
