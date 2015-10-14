var CUR_OFFSET = 0;
var cur_exchange = 'SV150';
var dataCall = {};
var curData;

//run js code onn startup
$(function(){
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
				cur_exchange = 'SV150';
				$(this).css({"background-color":"#fff","border-bottom":"0"});
				$('.stock-container').css({"display":"block"});
				$('.searchtab').css({"display":"none"});
				$('.title').html("TODAY'S "+cur_exchange+" MARKET MOVERS");
				$(".link").attr("href", "list-companies?investmentTypeId=EQ&marketId=8&market-cap-low=1&order=sp-pct-desc&today=1");
				mr_center_piece(CUR_OFFSET, dataCall.sv150_widget);
				stock_data(cur_exchange, dataCall.sv150_widget);
				//stock_graph(cur_exchange);
				break;
			case 's&p 500':
				CUR_OFFSET = 0;
				cur_exchange = 's&p 500';
				$(this).css({"background-color":"#fff","border-bottom":"0"});
				$('.stock-container').css({"display":"block"});
				$('.searchtab').css({"display":"none"});
				$('.title').html("TODAY'S "+cur_exchange+" MARKET MOVERS");
				$(".link").attr("href", "list-companies?investmentTypeId=EQ&marketId=5&market-cap-low=1&order=sp-pct-desc&today=1");
				mr_center_piece(CUR_OFFSET, dataCall.sv150_widget);
				stock_data(cur_exchange, dataCall.sv150_widget);
				//stock_graph(cur_exchange);
				break;
			case 'nyse':
				CUR_OFFSET = 0;
				cur_exchange = 'nyse';
				$(this).css({"background-color":"#fff","border-bottom":"0"});
				$('.stock-container').css({"display":"block"});
				$('.searchtab').css({"display":"none"});
				$('.title').html("TODAY'S "+cur_exchange+" MARKET MOVERS");
				$(".link").attr("href", "list-companies?exchange=nyse&market-cap-low=1&investmentTypeId=EQ&order=sp-pct-desc&today=1");
				mr_center_piece(CUR_OFFSET, dataCall.sv150_widget);
				stock_data(dataCall. sv150_widget[CUR_OFFSET]);
				//stock_graph(cur_exchange);
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

	$.get('http://apifin.synapsys.us/call_controller.php?action=widget&option=sv150_widget', function(data){
		//set data to global variable
		dataCall = data;
		curData = dataCall.sv150_widget;

		mr_center_piece(CUR_OFFSET,curData);
		stock_data($('.mtabs').data('dir'), dataCall.sv150_widget);
		//stock_graph(cur_exchange, dataCall.sv150_widget);
	}, 'json')

})//END OF FUNCTION

//data api call for list
function mr_center_piece(offset, data){

	console.log("mr_center_piece", offset, data);
	//service called time to set div classes to given results
	$('.name').html(data[offset].c_name);
	$('.logo-image').css('background','url(http:'+data[offset].c_name+') no-repeat');
	$('.mrwidget_counter').html('#' + (offset+1));

	// link to profile URL
	$(".profile-link").attr("href", data[offset].c_name);

}//END OF FUNCTION

// data api returned based on which exchange is selected
function stock_data(cur_exch, stockData){
	console.log("exchange stock data:",stockData);
	switch(cur_exch){
		case 'SV150':

 			$('.price').html(Number(stockData[0].csi_price).toFixed(2));
			convert_num(Number(stockData[0].stock_gain).toFixed(2),Number(stockData[0].csi_percent_change_since_last).toFixed(2));

			break;
		case 's&p 500':

			$('.price').html(Number(stockData[0].csi_price).toFixed(2));
			convert_num(Number(stockData[0].stock_gain).toFixed(2),Number(stockData[0].csi_percent_change_since_last).toFixed(2));

			break;
		case 'nyse':

			$('.price').html(Number(stockData[0].csi_price).toFixed(2));
			convert_num(Number(stockData[0].stock_gain).toFixed(2),Number(stockData[0].csi_percent_change_since_last).toFixed(2));

			break;
		default:
			break;
	}//END OF FUNCTION
}//END OF FUNCTION


function stock_graph(dataArray, exchange){
	console.log("stock graph:", dataArray);
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
			dateTimeLabelFormats: {
				day: '%e'
			},
			tickPixelInterval: 50,
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
			data : dataArray,
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
	if (changePercent_num > 0){
		$('.change').css({"color":"#44b224"});
		$('.change').html(change_num+'('+changePercent_num+'%)');
	}
	else{
		$('.change').css({"color":"#ca1010"});
		$('.change').html(change_num+'('+changePercent_num+'%)');
	}
}//END OF FUNCTION
