//embedd code localized variables
var domain = '';
var remnant = '';
var locName = '';
var city = '';
var state = '';
var dma = '';
var loc = '';
var max = 10;
var bord = false;
var dma = '';
var listid = '';
var listTitle = '';

var offset=0;
var dataCall = {};
var list = {};
var graph = {};
var w_info = {};
var dataLength;
var protocolToUse = (location.protocol == "https:") ? "https" : "http";
$(function(){
  var temp = location.search;
  var query = {};

  if(temp != null){
  	query = JSON.parse(decodeURIComponent(temp.substr(1)));
  	//set the query data from database to global variable to use
  	domain = query.dom;
  	remnant = query.remn;
  	locName = query['loc']['loc_name'];
    dma = query['loc']['loc']['DMA'];
    //checks if it is a remnant and runs through an api
    if(remnant == 'true' || remnant == true){
      $.get(protocolToUse + "://w1.synapsys.us/get-remote-addr2/", function(result){
        loc = result[0].state;
        //console.log("Grabbing data call");
        $.get(protocolToUse + '://apifin.investkit.com/call_controller.php?action=widget&option=shares_locally_traded&param='+loc, function(data){
          dataCall = data.shares_locally_traded;
          w_info = dataCall.top_list_list[0].top_list_info;
          list = dataCall.top_list_list[0].top_list_list;
          listid = w_info.top_list_id;
          listTitle = w_info.top_list_title;
          //console.log(list);
          dataLength = list.length;
          graph = dataCall.top_list_graph_data;
          compData(offset, list);
        }, 'json')
      })
    }else{//if not a remnant then grab all data for datacall
      if(dma.length == 0 || typeof dma == 'undefined'){
        city = query['loc']['loc']['city'];
        state = query['loc']['loc']['state'];
        if(typeof city == 'undefined'){
          loc = state;
        }
      }else{
        for(var i = 0; i < dma.length; i++)
        {
          loc += dma[i]+" ";
        }
        loc = loc.replace(/ /g, ",");
        loc = removeLastComma(loc);
      }
      $.get(protocolToUse + '://apifin.investkit.com/call_controller.php?action=widget&option=shares_locally_traded&param='+loc, function(data){
        dataCall = data.shares_locally_traded;
        w_info = dataCall.top_list_list[0].top_list_info;
        list = dataCall.top_list_list[0].top_list_list;
        listid = w_info.top_list_id;
        listTitle = w_info.top_list_title;
        dataLength = list.length;
        graph = dataCall.top_list_graph_data;
        compData(offset, list);
      }, 'json')
    }
  	bord = query.bord;
  }

  $('.fgw-rightnav').on('click', function() {
		if (offset < dataLength-1 && $(this).data('dir') === 'next') {
			compData(++offset);
		}else if(offset >= dataLength-1){
      offset = 0;
      compData(offset);
    }
	});
	$('.fgw-leftnav').on('click', function() {
		if (offset > 0 && $(this).data('dir') === 'prev') {
			compData(--offset);
		}else if(offset <= 0){
      offset = dataLength-1;
      compData(offset);
    }
	});
});

function compData(offset){
  var curItem = list[offset];
  $(".fgw-t2-title").html(curItem.c_name);
  $(".fgw-t2-loc").html(curItem.c_hq_state + ", " + curItem.c_hq_city);
  $(".fgw-image").css({"background-image":"url('"+protocolToUse+"://images.investkit.com/images/"+curItem.c_logo+"')"});
  $(".fgw-content1").html(nFormatter(Number(curItem.trading_volume).toFixed(2)));
  listTitle = listTitle.replace(/ /g, '-');
  if(remnant == 'true' || remnant == true){
    if(typeof loc != 'undefined' || loc != '' || loc != null){
      loc = "/"+loc+"/1";
    }
    $(".fgw-href").attr('href',protocolToUse + "://www.investkit.com/"+listTitle+"/"+listid+"/list"+loc);
    $(".fgw-link").attr('href',protocolToUse + "://www.investkit.com/"+curItem.c_ticker+"/"+compUrlName(curItem.c_name)+"/company/"+curItem.c_id);
    $(".fgw-loc-link").attr('href',protocolToUse + "://www.investkit.com/"+curItem.c_hq_state+"/location");
  }else{
		if (domain == 'latimes.com'){
			$('.fgw-t1').html('<i class="fa-area-chart"></i>  California Movers');
		}
		else{
			$('.fgw-t1').html('<i class="fa-area-chart"></i>  Most Traded Local Stocks');
		}
    locName = locName.replace(/\+/g,' ');
    $(".fgw-href").attr('href',protocolToUse + "://www.myinvestkit.com/"+domain+"/"+listTitle+"/"+loc+"/"+listid+"/list/1");
    $(".fgw-link").attr('href',protocolToUse + "://www.myinvestkit.com/"+domain+"/"+compUrlName(curItem.c_name)+"/"+curItem.c_ticker+"/c/"+curItem.c_id);
    $(".fgw-loc-link").attr('href',protocolToUse + "://www.myinvestkit.com/"+domain+"/"+curItem.c_hq_state+"/loc");
  }
  stockGraph(curItem.c_id, graph, curItem.c_ticker);
}
function stockGraph(comp_id, graph, ticker){
  var seriesOptions = [];

  $.each(graph[comp_id], function(i, val) {
		var yVal = parseFloat(val.sh_open);

		if (!isNaN(yVal)) {
			seriesOptions.push([val.sh_date * 1000, yVal]);
		}
	});
  //seriesOptions.reverse();
  seriesOptions.sort(function(a,b){
    return parseFloat(a[0]) - parseFloat(b[0]);
  });
  //so graph does not cut off from first point
  var min = seriesOptions[1][0];
  //renders data gathered into a simple chart
  $('#fgw-graph').highcharts({
    exporting:{
      enabled:false
    },

    credits:{
      enabled:false
    },

    chart:{
      width:250,
      height:80,
    },

    xAxis:{
      type:'datetime',
      min:min,
      tickPixelInterval: 50,
      title: '',
      labels:{
        autoRotation:false,
        step: 1,
        style:{
					fontSize:'8px'
				}
      },
    },

    yAxis:{
      opposite:true,
      title:'',
      labels: {
          formatter: function() {
              return '$' + this.value
          }
      },
    },
    scrollbar:{
      enabled:false
    },
    rangeSelector: {
      selected: 4,
      inputEnabled: false,
      buttonTheme: {
        visibility: 'hidden'
      },
      labelStyle: {
        visibility: 'hidden'
      }
    },
    title: {
      text: ''
    },
    legend:{
      enabled:false
    },
    series: [{
      name: ticker,
      data: seriesOptions,
      type:'spline'
    }]
  });

}

function compUrlName(company) {
  if ( typeof company == "undefined" || company == null ) {
    return '';
  }
  return company.replace(/(,|\.|&)/g,'').replace(/ /g,'-').replace(/\//g,'_');
}

function convert_num(change_num){
	if (change_num > 0){
		$('.fgw-content1').css({"color":"#44b224"});
		$('.fgw-content1').html(change_num+'%');
	}
	else{
		$('.fgw-content1').css({"color":"#ca1010"});
		$('.fgw-content1').html(change_num+'%');
	}
}//END OF FUNCTION
//number converter to decimal with correct format
function nFormatter(num) {
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + ' B';
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' M';
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' K';
	}
	return num;
}
function removeLastComma(strng){
    var n=strng.lastIndexOf(",");
    var a=strng.substring(0,n)
    return a;
}
