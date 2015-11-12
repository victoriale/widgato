var CUR_OFFSET = 0;
var cur_exchange = 'NASDAQ';
var dataCall = {};
var curData;


var domain = '';
var clickyId = 0;
var remnant = '';
var locName = '';
var city = '';
var state = '';
var loc = '';
var max = 10;
var bord = false;

//run js code onn startup
$(function(){

	var temp = location.search;
  var query = {};

  if(temp != null){
  	query = JSON.parse(decodeURIComponent(temp.substr(1)));
  	//set the query data from database to global variable to use
  	domain = query.dom;

  	remnant = query.remn;

  	clickyId = query.c_id;

  	locName = query['loc']['loc_name'];

  	locName = locName.replace('+',' ');

    //returns string true or false
  	bord = query.bord;


    /*
    //Same as domain = query.dom  but if that doesnt work this should work so USE [loc] global variable
  	//USE BOTTOM ONCE WE IMPLEMENT MULTIPLE CITIES INTO LIST PAGE
  	for(var i = 0; i < query['loc']['loc']['city'].length; i++){
  		var c = query['loc']['loc']['city'][i].city;
  		var s = query['loc']['loc']['city'][i].state;
  		loc = loc + c + "," + s;
  		if (typeof query['loc']['loc']['city'][i+1] != 'undefined'){
  			loc += '|';
  		}
  	}
    */
  }

  if(bord == 'true'){
    $(".re_w_list").css({'border-right':'1px solid #ccc','border-bottom':'1px solid #ccc','border-left':'1px solid #ccc'});
  }

	var script_tag = document.createElement('script');
	script_tag.setAttribute('src','//static.getclicky.com/js');
	document.head.appendChild(script_tag);
	var clicks = $('<script>try{ clicky.init('+clickyId+'); }catch(e){}</script>');
	document.head.appendChild(clicks[0]);

	//run initiall to make sure link works on load
	if(remnant == 'true' || remnant == true){
		$(".nwlink").attr('href', "http://www.investkit.com/Top-companies-on-NASDAQ-with-highest-percent-market-cap-change/5182/list/1");
		$("#fb").attr('href', "http://www.investkit.com/FB/Facebook-Inc/company/3330");
		$("#apl").attr('href', "http://www.investkit.com/AAPL/Apple-Inc/company/2636");
		$("#tm").attr('href', "http://www.investkit.com/TSLA/Tesla-Motors-Inc/company/4762");
		$("#mc").attr('href', "http://www.investkit.com/MSFT/Microsoft-Corporation/company/4004");
		$("#wd").attr('href', "http://www.investkit.com/DIS/Walt-Disney-Co/company/624");
	}else{
		$(".nwlink").attr('href', "http://www.myinvestkit.com/"+domain+"/Top-companies-on-NASDAQ-with-highest-percent-market-cap-change/5182/list/1");
		$("#fb").attr('href', "http://www.myinvestkit.com/"+domain+"/Facebook-Inc/FB/c/3330");
		$("#apl").attr('href', "http://www.myinvestkit.com/"+domain+"/Apple-Inc/AAPL/c/2636");
		$("#tm").attr('href', "http://www.myinvestkit.com/"+domain+"/Tesla-Motors-Inc/TSLA/c/4762");
		$("#mc").attr('href', "http://www.myinvestkit.com/"+domain+"/Microsoft-Corporation/MSFT/c/4004");
		$("#wd").attr('href', "http://www.myinvestkit.com/"+domain+"/Walt-Disney-Co/DIS/c/624");
	}

	$('.search-input').bind("enterKey",function(e){
		search = $('input').val();
		if(remnant == 'true' || remnant == true){
			window.open('http://www.investkit.com/search/r='+search);
		}else{
			window.open('http://www.myinvestkit.com/'+domain+'/s/r='+search);
		}
	});//END OF FUNCTION
	//by pressing enter in this field it will activate
	$('.search-input').keyup(function(e){
		if(e.keyCode == 13){
			$(this).trigger("enterKey");
		}
	});//END OF FUNCTION

	$('.input-pill_btn').on('click', function(){
		search = $('input').val();
		if(remnant == 'true' || remnant == true){
			window.open('http://www.investkit.com/search/r='+search);
		}else{
			window.open('http://www.myinvestkit.com/'+domain+'/s/r='+search);
		}
	})//END OF FUNCTION

	//script to allow widgets to change to next item on list(same as 'see the whole list' button link)
	$('.national_widget-content-buttonright').on('click', function() {
		//when clicking on right button will change offset of data call and pull correct data based off of SEE THE WHOLE LIST
		if ($(this).data('dir') === 'next') {
			//console.log(curData);
			mr_center_piece(++CUR_OFFSET, curData);
		}
		//makes sure arrow on left appear if offset is greater than 0
		if(CUR_OFFSET > 0){
		$('.national_widget-content-buttonleft').css("opacity","1");
		$('.national_widget-content-buttonleft').hover(function(){
			$('.national_widget-content-buttonleft').css("cursor","pointer");
		})
	}
	else{
		//change left arrow css to disappear
		$('.national_widget-content-buttonleft').css("opacity","0");
		$('.national_widget-content-buttonleft').css("cursor","default");
	}
	});// END OF FUNCTION

	//change left arrow css to disappear if offset is 0
	$('.national_widget-content-buttonleft').on('click', function() {
		if (CUR_OFFSET > 0 && $(this).data('dir') === 'prev') {
			mr_center_piece(--CUR_OFFSET, curData);
		}
		if (CUR_OFFSET == 0){
			$('.national_widget-content-buttonleft').css("opacity","0");
			$('.national_widget-content-buttonleft').css("cursor","default");
		}
	});//END OF FUNCTION

	//by clicking on each tab it will return correct data and reinitialize a new data api call
	$('.mtabs').on('click', function(){
		//reset the css background
		$('.mtabs').css({"background-color":"#f2f2f2","border-bottom":"1px solid #cccccc"});

		//switch statement to swap out tabs and recall data api depending on which tab/exchange is chosen
		//change title as well
		switch($(this).data('dir')){
			  case 'NASDAQ':
					CUR_OFFSET = 0;
					cur_exchange = 'NASDAQ';
					curData = exList[1].top_list_list;
					$(this).css({"background-color":"#fff","border-bottom":"0"});
					$('.national_widget_wrapper').css({"display":"block"});
					$('.searchtab').css({"display":"none"});
					$('.national_widget-title').html("TODAY'S "+cur_exchange+" MARKET MOVERS");
					if(remnant == 'true' || remnant == true){
						$(".nwlink").attr('href', "http://www.investkit.com/Top-companies-on-NASDAQ-with-highest-percent-market-cap-change/5182/list/1");
					}else{
						$(".nwlink").attr('href', "http://www.myinvestkit.com/"+domain+"/Top-companies-on-NASDAQ-with-highest-percent-market-cap-change/5182/list/1");
					}
					mr_center_piece(CUR_OFFSET, curData);
					stock_data(cur_exchange, dataCall);
					stock_graph(dataCall.exchange_stock_data[0].graph_data, cur_exchange);
					break;
				case 'AMEX':
					CUR_OFFSET = 0;
					curData = exList[0].top_list_list;
					cur_exchange = 'AMEX';
					$(this).css({"background-color":"#fff","border-bottom":"0"});
					$('.national_widget_wrapper').css({"display":"block"});
					$('.searchtab').css({"display":"none"});
					$('.national_widget-title').html("TODAY'S "+cur_exchange+" MARKET MOVERS");
					if(remnant == 'true' || remnant == true){
						$(".nwlink").attr('href', "http://www.investkit.com/Top-companies-on-AMEX-with-highest-percent-market-cap-change/5210/list/1");
					}else{
						$(".nwlink").attr('href', "http://www.myinvestkit.com/"+domain+"/Top-companies-on-AMEX-with-highest-percent-market-cap-change/5210/list/1");
					}
					mr_center_piece(CUR_OFFSET, curData);
					stock_data(cur_exchange, dataCall);
					stock_graph(dataCall.exchange_stock_data[1].graph_data, cur_exchange);
					break;
				case 'NYSE':
					CUR_OFFSET = 0;
					cur_exchange = 'NYSE';
					curData = exList[2].top_list_list;
					$(this).css({"background-color":"#fff","border-bottom":"0"});
					$('.national_widget_wrapper').css({"display":"block"});
					$('.searchtab').css({"display":"none"});
					$('.national_widget-title').html("TODAY'S "+cur_exchange+" MARKET MOVERS");
					if(remnant == 'true' || remnant == true){
						$(".nwlink").attr('href', "http://www.investkit.com/Top-companies-on-NYSE-with-highest-percent-market-cap-change/5196/list/1");
					}else{
						$(".nwlink").attr('href', "http://www.myinvestkit.com/"+domain+"/Top-companies-on-NYSE-with-highest-percent-market-cap-change/5196/list/1");
					}
					mr_center_piece(CUR_OFFSET, curData);
					stock_data(cur_exchange, dataCall);
					stock_graph(dataCall.exchange_stock_data[2].graph_data, cur_exchange);
					break;
				case 'find':
					$('.searchtab').css({"display":"block"});
					$('.national_widget_wrapper').css({"display":"none"});
					$(this).css({"background-color":"#fff","border-bottom":"0"});
					break;
				default:
					$('.national_widget_wrapper').css({"display":"block"});
					$('.searchtab').css({"display":"none"});
			}
	})//END OF FUNCTION

	//double clicking will not highlight buttons
	$('.mrwidget_right-button').mousedown(function(){ return false; });
	$('.mrwidget_left-button').mousedown(function(){ return false; });
	$('.mtabs').mousedown(function(){ return false; });

	//run function  initial calls incase nothing else runs this will be default call on page load

	$.get('http://apifin.investkit.com/call_controller.php?action=widget&option=national_market_movers', function(data){
		console.log(data);
		dataCall = data.national_market_movers;
		exList = dataCall.exchange_list;
		curData = exList[0].top_list_list;
		mr_center_piece(CUR_OFFSET, curData);
		stock_data($('.mtabs').data('dir'), dataCall);
		stock_graph(dataCall.exchange_stock_data[0].graph_data, cur_exchange);
	}, 'json')

})//END OF FUNCTION

//data api call for list
function mr_center_piece(offset, data){
	//service called time to set div classes to given results
	$('.national_widget-content-textarea-t1').html(data[offset].c_name);
	$('.national_widget-content-image').css('background','url(http://images.investkit.com/images/'+data[offset].c_logo+') no-repeat');
	$(".nwprofile-link").attr("href", "http://www.investkit.com/"+data[offset].c_ticker+"/"+compUrlName(data[offset].c_name)+"/company/"+data[offset].c_id);
	if(remnant == 'true' || remnant == true){
		$(".nwprofile-link").attr("href", "http://www.investkit.com/"+data[offset].c_ticker+"/"+compUrlName(data[offset].c_name)+"/company/"+data[offset].c_id);
	}else{
		$(".nwprofile-link").attr("href", "http://www.myinvestkit.com/"+domain+"/"+compUrlName(data[offset].c_name)+"/"+data[offset].c_ticker+"/c/"+data[offset].c_id);
	}
}//END OF FUNCTION

// data api returned based on which exchange is selected
function stock_data(cur_exch, stockData){
	//console.log(stockData);
	switch(cur_exch){
		case 'NASDAQ':
			var price = stockData.exchange_stock_data[1].csi_price;
			var priceChng = stockData.exchange_stock_data[1].graph_data.price_change;
			var pctChng = stockData.exchange_stock_data[1].graph_data.percent_change;
			$('.price').html(Number(price).toFixed(2));
			convert_num(Number(priceChng).toFixed(2),Number(pctChng).toFixed(2));
			convert_num(Number(pctChng).toFixed(2),Number(pctChng).toFixed(2));
			break;
		case 'AMEX':
			var price = stockData.exchange_stock_data[0].csi_price;
			var priceChng = stockData.exchange_stock_data[0].graph_data.price_change;
			var pctChng = stockData.exchange_stock_data[0].graph_data.percent_change;
			$('.price').html(Number(price).toFixed(2));
			convert_num(Number(priceChng).toFixed(2),Number(pctChng).toFixed(2));
			break;
		case 'NYSE':
			var price = stockData.exchange_stock_data[2].csi_price;
			var priceChng = stockData.exchange_stock_data[2].graph_data.price_change;
			var pctChng = stockData.exchange_stock_data[2].graph_data.percent_change;
			$('.price').html(Number(price).toFixed(2));
			convert_num(Number(priceChng).toFixed(2),Number(pctChng).toFixed(2));
			break;
		default:
			break;
	}//END OF FUNCTION
}//END OF FUNCTION


function stock_graph(dataArray, exchange){

	newDataArray = [];

	//JSON array is converted into usable code for Highcharts also does not push NULL values
	$.each(dataArray.graph_data, function(i, val) {
		var yVal = parseFloat(val.sh_open);

		if (!isNaN(yVal)) {
			newDataArray.push([val.sh_date * 1000, yVal]);
		}
	});

	//renders data gathered into a simple chart
	$('#stockchart').highcharts({
		chart: {
			defaultSeriesType: 'line',
			zoomType: 'x',
			resetZoomButton: {
				theme: {
				display: 'none'
				}
			}
		},
		tooltip: {
			positioner: function () {
				return { x: -5, y: 38 };32.
			},
			style:{

				fontSize:'8px'
			},
			shadow: false,
			borderWidth: 0,
			backgroundColor: 'rgba(255,255,255,0.8)'
		},
		title : {
			text : null
		},
		xAxis:{
			title: {
				text:'',
			},
			type: 'datetime',
			showLastLabel: true,
			endOnTick: true,
			dateTimeLabelFormats: {
				day: '%e'
			},
			tickPixelInterval: 60,
			//max tick for x axix is calculated and dynamically set
			tickPositioner: function () {
				var positions = [],
				tick = Math.floor(this.dataMin),
				increment = Math.ceil((this.dataMax - this.dataMin) / 6);

				for (tick; tick - increment <= this.dataMax; tick += increment) {
					positions.push(tick);
				}
				return positions * 1000;
			},
			labels:{
				autoRotation:false,
				step: 1
			},
		},
		yAxis:{
			opposite:true,
			title: {
				text:null
			},
			allowDecimals: true,
			labels: {
				formatter: function() {
					return this.value;
				}
			},
			tickPixelInterval: 25,
			//max tick for y axix is calculated and dynamically set
			tickPositioner: function () {
				var positions = [],
				tick = Math.floor(this.dataMin),
				increment = Math.ceil((this.dataMax - this.dataMin) / 6);

				for (tick; tick - increment <= this.dataMax; tick += increment) {
					positions.push(tick);
				}
				return positions * 1000;
			},
		},
		credits: {
			enabled: false
		},
		series : [{
			showInLegend: false,
			name : exchange,
			data : newDataArray,
			lineWidth: 2,
			connectNulls: true,
		}]
	});//END OF HIGHCHARTS FUNCTION
}

function compUrlName(company) {
  if ( typeof company == "undefined" || company == null ) {
    return '';
  }
  return company.replace(/(,|\.|&)/g,'').replace(/ /g,'-').replace(/\//g,'_');
}


//convert value into decimal and decide if change is up or down
function convert_num(change_num, changePercent_num){
	if (change_num > 0){
		$('.change').css({"color":"#44b224"});
		$('.change').html(change_num+'('+changePercent_num+'%)');
	}
	else{
		$('.change').css({"color":"#ca1010"});
		$('.change').html(change_num+'('+changePercent_num+'%)');
	}
	if (changePercent_num > 0){
		$('.change').css({"color":"#44b224"});
		$('.change').html(change_num+'('+changePercent_num+'%)');
	}
	else{
		$('.change').css({"color":"#ca1010"});
		$('.change').html(change_num+'('+changePercent_num+'%)');
	}
}//END OF FUNCTION
