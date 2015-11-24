var CUR_OFFSET = 0;
var cur_exchange = 'SV150';
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
	// var temp = location.search;
	// var query = {};

	// if(temp != null){
	// 	query = JSON.parse(decodeURIComponent(temp.substr(1)));

		//set the query data from database to global variable to use
		// domain = query.dom;
		domain = 'siliconvalley.com';//Will be always non-remnant but keeping code just in case

		// remnant = query.remn;
		//digital first widgets are not ever REMNANTS but just in case keep code there and set remnant to false
		remnant = false;

		// clickyId = query.c_id;

		// locName = query['loc']['loc_name'];
		// locName = locName.replace('+',' ');

		//returns string true or false
		// bord = query.bord;

		// }

		// if(bord == 'true'){
		// 	$(".re_w_list").css({'border-right':'1px solid #ccc','border-bottom':'1px solid #ccc','border-left':'1px solid #ccc'});
		// }

		//get click tag from query embed.
		// var script_tag = document.createElement('script');
		// script_tag.setAttribute('src','//static.getclicky.com/js');
		// document.head.appendChild(script_tag);
		// var clicks = $('<script>try{ clicky.init('+clickyId+'); }catch(e){}</script>');
		// document.head.appendChild(clicks[0]);

		//FOR TRENDING TAB
		//run initiall to make sure link works on load
		//INITIALLY SET LINKS TO INITIALLY link correct
		if(remnant == 'true' || remnant == true){
			$('.link').attr("href","http://www.investkit.com/sv150-top-gainers/sv150_gainers/list/1");
			$("#fb").attr('href', "http://www.investkit.com/FB/Facebook-Inc/company/3330");
			$("#apl").attr('href', "http://www.investkit.com/AAPL/Apple-Inc/company/2636");
			$("#tm").attr('href', "http://www.investkit.com/TSLA/Tesla-Motors-Inc/company/4762");
			$("#mc").attr('href', "http://www.investkit.com/MSFT/Microsoft-Corporation/company/4004");
			$("#wd").attr('href', "http://www.investkit.com/DIS/Walt-Disney-Co/company/624");
		}else{
			$('.link').attr("href",'http://www.myinvestkit.com/'+domain+'/sv150-top-gainers/sv150_gainers/list/1');
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
	$('.mrwidget_right-button').on('click', function() {
		//when clicking on right button will change offset of data call and pull correct data based off of SEE THE WHOLE LIST
		if ($(this).data('dir') === 'next') {
			mr_center_piece(++CUR_OFFSET,curData);
		}
		//makes sure arrow on left appear if offset is greater than 0
		if(CUR_OFFSET > 0){
		$('.mrwidget_left-button').css("opacity","1");
		$('.mrwidget_left-button').hover(function(){
		$('.mrwidget_left-button').css("cursor","pointer");
		})
	}
	else{
		//change left arrow css to disappear
		$('.mrwidget_left-button').css("opacity","0");
		$('.mrwidget_left-button').css("cursor","default");
	}
	});// END OF FUNCTION

	//change left arrow css to disappear if offset is 0
	$('.mrwidget_left-button').on('click', function() {
		if (CUR_OFFSET > 0 && $(this).data('dir') === 'prev') {
			mr_center_piece(--CUR_OFFSET,curData);
		}
		if (CUR_OFFSET == 0){
			$('.mrwidget_left-button').css("opacity","0");
			$('.mrwidget_left-button').css("cursor","default");
		}
	});//END OF FUNCTION

	//by clicking on each tab it will return correct data and reinitialize a new data api call
	$('.mtabs').on('click', function(){
		//reset the css background
		$('.mtabs').css({"background-color":"#f2f2f2","border-bottom":"1px solid #cccccc"});
		//switch statement to swap out tabs and recall data api depending on which tab/exchange is chosen
		//change title as well
		switch($(this).data('dir')){
			case 'SV150':
				CUR_OFFSET = 0;
				curData = dataCall.sv150_list_data;
				cur_exchange = 'SV150';
				$(this).css({"background-color":"#fff","border-bottom":"0"});
				$('.stock-container').css({"display":"block"});
				$('.searchtab').css({"display":"none"});
				$('.title').html("TODAY'S "+cur_exchange+" MARKET MOVERS");
				if(remnant == 'true' || remnant == true){
					$('.link').attr("href","http://www.investkit.com/sv150-top-gainers/sv150_gainers/list/1");
				}else{
					$('.link').attr("href",'http://www.myinvestkit.com/'+domain+'/sv150-top-gainers/sv150_gainers/list/1');
				}
				//num = 2;
				mr_center_piece(CUR_OFFSET, curData);
				stock_data(cur_exchange, dataCall);
				stock_graph(dataCall.sv_150_graph_data, cur_exchange);
				break;
			case 'NASDAQ':
				CUR_OFFSET = 0;
				cur_exchange = 'NASDAQ';
				curData = dataCall.nasdaq_list_data;
				$(this).css({"background-color":"#fff","border-bottom":"0"});
				$('.stock-container').css({"display":"block"});
				$('.searchtab').css({"display":"none"});
				$('.title').html("TODAY'S "+cur_exchange+" MARKET MOVERS");
				if(remnant == 'true' || remnant == true){
					$(".link").attr("href", "http://www.investkit.com/Top-companies-on-NASDAQ-with-the-highest-percentage-change-in-market-cap/5182/list/1");
				}else{
					$(".link").attr("href", "http://www.myinvestkit.com/"+domain+"/Top-companies-on-NASDAQ-with-the-highest-percentage-change-in-market-cap/5182/list/1");
				}
				mr_center_piece(CUR_OFFSET, curData);
				stock_data(cur_exchange, dataCall);
				stock_graph(dataCall.nasdaq_graph_data, cur_exchange);
				break;
			case 'NYSE':
				CUR_OFFSET = 0;
				cur_exchange = 'NYSE';
				curData = dataCall.nyse_list_data;
				$(this).css({"background-color":"#fff","border-bottom":"0"});
				$('.stock-container').css({"display":"block"});
				$('.searchtab').css({"display":"none"});
				$('.title').html("TODAY'S "+cur_exchange+" MARKET MOVERS");
				if(remnant == 'true' || remnant == true){
					$(".link").attr("href", "http://www.investkit.com/Top-companies-on-NYSE-with-stock-percent-loss/5196/list/1");
				}else{
					$(".link").attr("href", "http://www.myinvestkit.com/"+domain+"/Top-companies-on-NYSE-with-stock-percent-loss/5196/list/1");
				}

				mr_center_piece(CUR_OFFSET, curData);
				stock_data(cur_exchange, dataCall);
				stock_graph(dataCall.nyse_graph_data, cur_exchange);
				break;
			case 'find':
				$('.searchtab').css({"display":"block"});
				$('.stock-container').css({"display":"none"});
				$(this).css({"background-color":"#fff","border-bottom":"0"});
				break;
			default:
				$('.stock-container').css({"display":"block"});
				$('.searchtab').css({"display":"none"});
		}
	})//END OF FUNCTION

	//double clicking will not highlight buttons
	$('.mrwidget_right-button').mousedown(function(){ return false; });
	$('.mrwidget_left-button').mousedown(function(){ return false; });
	$('.mtabs').mousedown(function(){ return false; });
	//run function  initial calls incase nothing else runs this will be default call on page load

	$.get('http://apifin.investkit.com:90/call_controller.php?action=widget&option=sv150_widget', function(data){
		//set data to global variable
		dataCall = data.sv150_widget;
		curData = dataCall.sv150_list_data;
		mr_center_piece(CUR_OFFSET, curData);
		stock_data($('.mtabs').data('dir'), dataCall);
		stock_graph(dataCall.sv150_graph_data, cur_exchange);
	}, 'json')

})//END OF FUNCTION
//data api call for list
function mr_center_piece(offset, data){
	//service called time to set div classes to given results
	$('.name').html(data[offset].c_name);
	$('.logo-image').css('background','url('+imageUrl(data[offset].c_logo)+') no-repeat');
	$('.mrwidget_counter').html('#' + (offset+1));
	$('.trending-1').html(curData[0].c_ticker);
	$('.trending-2').html(curData[1].c_ticker);
	$('.trending-3').html(curData[2].c_ticker);
	$('.trending-1a').html(curData[0].c_name);
	$('.trending-2a').html(curData[1].c_name);
	$('.trending-3a').html(curData[2].c_name);

	if(remnant == 'true' || remnant == true){
		$('.profile-link').attr("href","http://www.investkit.com/"+data[offset].c_ticker+"/"+compUrlName(data[offset].c_name)+"/company/"+data[offset].c_id);
		$('#trending_1').attr("href", "http://www.investkit.com/"+curData[0].c_ticker+"/"+compUrlName(curData[0].c_name)+"/company/"+curData[0].c_id);
		$('#trending_2').attr("href", "http://www.investkit.com/"+curData[1].c_ticker+"/"+compUrlName(curData[1].c_name)+"/company/"+curData[1].c_id);
		$('#trending_3').attr("href", "http://www.investkit.com/"+curData[2].c_ticker+"/"+compUrlName(curData[2].c_name)+"/company/"+curData[2].c_id);
	}else{
		$('.profile-link').attr("href","http://www.myinvestkit.com/"+domain+"/"+compUrlName(data[offset].c_name)+"/"+data[offset].c_ticker+"/c/"+data[offset].c_id);
		$('#trending_1').attr("href", "http://www.myinvestkit.com/"+domain+"/"+compUrlName(curData[0].c_name)+"/"+curData[0].c_ticker+"/c/"+curData[0].c_id);
		$('#trending_2').attr("href", "http://www.myinvestkit.com/"+domain+"/"+compUrlName(curData[1].c_name)+"/"+curData[1].c_ticker+"/c/"+curData[1].c_id);
		$('#trending_3').attr("href", "http://www.myinvestkit.com/"+domain+"/"+compUrlName(curData[2].c_name)+"/"+curData[2].c_ticker+"/c/"+curData[2].c_id);
	}
}//END OF FUNCTION

// data api returned based on which exchange is selected
function stock_data(cur_exch, stockData){
	//console.log(stockData);
	switch(cur_exch){
		case 'SV150':
			var price = stockData.sv150_graph_data[0].sh_open;
			var priceChng = stockData.sv150_price_change;
			var pctChng = stockData.sv150_percent_change;
 			$('.price').html(Number(price).toFixed(2));
			convert_num(Number(priceChng).toFixed(2),Number(pctChng).toFixed(2));
			break;
		case 'NASDAQ':
			var price = stockData.nasdaq_graph_data[0].sh_open;
			var priceChng = stockData.nasdaq_price_change;
			var pctChng = stockData.nasdaq_percent_change;
			$('.price').html(Number(price).toFixed(2));
			convert_num(Number(priceChng).toFixed(2),Number(pctChng).toFixed(2));
			break;
		case 'NYSE':
			var price = stockData.nyse_graph_data[0].sh_open;
			var priceChng = stockData.nyse_price_change;
			var pctChng = stockData.nyse_percent_change;
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
	$.each(dataArray, function(i, val) {
		var yVal = parseFloat(val.sh_open);
		if (!isNaN(yVal)) {
			newDataArray.push([val.sh_date * 1000, yVal]);
		}
	});
	//renders data gathered into a simple chart
	$('#sv_stockchart').highcharts({
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
				return { x: -5, y: 38 };
			},
			style:{
				fontSize:'7px'
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

			dateTimeLabelFormats: {
				day: '%e'
			},
			tickPixelInterval: 40,

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
}//END OF FUNCTION

function compUrlName(company) {
  if ( typeof company == "undefined" || company == null ) {
    return '';
  }
  return company.replace(/(,|\.|&)/g,'').replace(/ /g,'-').replace(/\//g,'_');
}
function imageUrl(path){
  if(typeof path == 'undefined' || path == null || path == '' || path == 'null'){
    return '../css/public/no_image.jpg';
  }
  return 'http://images.investkit.com/images/' + path;
}
