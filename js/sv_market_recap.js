
var CUR_OFFSET = 0;
var cur_exchange = 'SV150';

//run js code onn startup
$(function(){
	//script to allow widgets to change to next item on list(same as 'see the whole list' button link)
	$('.mrwidget_right-button').on('click', function() {
		//when clicking on right button will change offset of data call and pull correct data based off of SEE THE WHOLE LIST
		if ($(this).data('dir') === 'next') {
			mr_center_piece(++CUR_OFFSET,cur_exchange);
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
			mr_center_piece(--CUR_OFFSET,cur_exchange);
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
				stock_data(cur_exchange);
				stock_graph(cur_exchange);
				mr_center_piece(CUR_OFFSET,cur_exchange);
				break;
			case 's&p 500':
				CUR_OFFSET = 0;
				cur_exchange = 's&p 500';
				$(this).css({"background-color":"#fff","border-bottom":"0"});
				$('.stock-container').css({"display":"block"});
				$('.searchtab').css({"display":"none"});
				$('.title').html("TODAY'S "+cur_exchange+" MARKET MOVERS");
				$(".link").attr("href", "list-companies?investmentTypeId=EQ&marketId=5&market-cap-low=1&order=sp-pct-desc&today=1");
				stock_data(cur_exchange);
				stock_graph(cur_exchange);
				mr_center_piece(CUR_OFFSET,cur_exchange);
				break;
			case 'nyse':
				CUR_OFFSET = 0;
				cur_exchange = 'nyse';
				$(this).css({"background-color":"#fff","border-bottom":"0"});
				$('.stock-container').css({"display":"block"});
				$('.searchtab').css({"display":"none"});
				$('.title').html("TODAY'S "+cur_exchange+" MARKET MOVERS");
				$(".link").attr("href", "list-companies?exchange=nyse&market-cap-low=1&investmentTypeId=EQ&order=sp-pct-desc&today=1");
				stock_data(cur_exchange);
				stock_graph(cur_exchange);
				mr_center_piece(CUR_OFFSET,cur_exchange);
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
stock_data($('.mtabs').data('dir'));
stock_graph(cur_exchange);
mr_center_piece(CUR_OFFSET,cur_exchange);
})//END OF FUNCTION

// data api returned based on which exchange is selected
function stock_data(cur_exch){
	switch(cur_exch){
		case 'SV150':
			$.post('http://quu.nu/services/', {
				service: "passfail",
				action:  "batchService",
				data: '[{"service":"passfail","data":{"service":"company.getMarketTicker"}},{"service":"passfail","data":{"service":"Sv150.getIntradayQuote"}}]'
			}, function(data_result){
			//replace called data into fields
 			$('.price').html(data_result[1].price);
			convert_num(data_result[1].priceChange, data_result[1].pricePctChange);
			},'json')
			break;
		case 's&p 500':
			$.post('http://quu.nu/services/', {
				service: "passfail",
				action:  "batchService",
				data: '[{"service":"passfail","data":{"service":"company.getMarketTicker"}},{"service":"passfail","data":{"service":"profiles.card.get","params":["public"],"filters":{"marketId":5,"investmentTypeId":"EQ","today":1},"options":{"order":"sp-pct-desc"},"limits":{"count":1,"offset":0}}},{"service":"passfail","action":"CompanyTopLists::getMeta","data":{"serviceOpts":{"service":"profiles.card.get","params":["public"],"filters":{"marketId":5,"investmentTypeId":"EQ","today":1},"options":{"order":"sp-pct-desc"},"limits":{"count":1,"offset":0}}}}]'
			}, function(data_result){
			$('.price').html(data_result[0]['data']['s&p-500'].price);
			convert_num(data_result[0]['data']['s&p-500'].change, data_result[0]['data']['s&p-500'].changePercent);
			},'json')
			break;
		case 'nyse':
			$.post('http://quu.nu/services/', {
				service: "passfail",
				action:  "batchService",
				data: '[{"service":"passfail","data":{"service":"company.getMarketTicker"}},{"service":"passfail","data":{"service":"profiles.card.get","params":["public"],"filters":{"exchange":"nyse","investmentTypeId":"EQ","today":1},"options":{"order":"sp-pct-desc"},"limits":{"count":1,"offset":0}}},{"service":"passfail","action":"CompanyTopLists::getMeta","data":{"serviceOpts":{"service":"profiles.card.get","params":["public"],"filters":{"exchange":"nyse","investmentTypeId":"EQ","today":1},"options":{"order":"sp-pct-desc"},"limits":{"count":1,"offset":0}}}}]'
			}, function(data_result){
			$('.price').html(data_result[0]['data']['nyse'].price);
			convert_num(data_result[0]['data']['nyse'].change, data_result[0]['data']['nyse'].changePercent);
			},'json')
			break;
		default:
			break;
	}//END OF FUNCTION
}//END OF FUNCTION


//stock graph of exchange will display based off of what is selected
function stock_graph(graph_exchange){
	if(graph_exchange == 'SV150'){
			var postData = [
			{
				"service":"passfail",
				"data":{
					"service":"Sv150.getChartTicks",
					"params":[{
						"params":{
							"range":"1"
						}
					}]
				}
			},
		];
	}
	else{
		var postData = [
			{
				"service":"passfail",
				"data":{
					"service":"financials.chart.getStockData",
					"params":[{
						"range":"2",
						"dataType":"market",
						"series":[{
							"name":graph_exchange,
							"source":"market",
							"dataType":"stock",
							"value":graph_exchange
						}]
					}],
				}
			},
		];
	}

		$.post('http://quu.nu/services/', {
			service: "passfail",
			action:  "batchService",
			data: JSON.stringify(postData)
		}, function(data_result){
				// the following is the result of service call.
				// use the data to create highcharts
				if(graph_exchange == 'SV150'){
					var series = data_result[0];
					var ename = 'SV150';
				}
				else{
					var series = data_result[0].series[0];
					var ename = series.name.toUpperCase();
				}

				newDataArray = [];
				//JSON array is converted into usable code for Highcharts also does not push NULL values
				$.each(series.data, function(i, val) {
					var yVal = parseFloat(val.y);

					if (!isNaN(yVal)) {
						newDataArray.push([val.x * 1000, yVal]);
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
			            name : ename,
			            data : newDataArray,
						lineWidth: 2,
						connectNulls: true,
			        }]
			    });//END OF HIGHCHARTS FUNCTION


		},'json');//END OF POST FUNCTION
	}//END OF FUNCTION



//data api call with filters for list

function mr_center_piece(offset,exchange){
			flag = '[]';
	switch(exchange){
		case 'SV150':
			exchange = '"marketId":"8"';
			flag = '{"ignoreCeo":true}';
			break;
		case 's&p 500':
			exchange = '"marketId":"5"';
			break;
		case 'nyse':
			exchange = '"exchange":"nyse"';
			break;
	}
	//data call to get list
	$.post('http://quu.nu/services/', {
		service: "passfail",
		action:  "batchService",
		data: '[{"service":"passfail","data":{"service":"profiles.card.get","params":["public"],"filters":{' + exchange + ',"market-recap-low":"1","investmentTypeId":"EQ","today":"1"},"limits":{"count":1,"offset":' + offset + '},"flags":'+flag+',"options":{"order":"sp-pct-desc"}}}]'
		}, function(result){
			//due to difference in exchanges SV150 will need a small if statement to return a var for highcharts to understand what chart to grab
		if (exchange === '"marketId":"8"'){
			var exch = 'SV150';
			result[0][0].exchange = exch;
		}
		//due to difference in exchanges S&P 500 will need a small if statement to return a var for highcharts to understand what chart to grab
		if (exchange === '"marketId":"5"'){
			var exch = 's&p 500';
			result[0][0].exchange = exch;
		}

		//service called time to set div classes to given results
		$('.name').html(result[0][0].name);
		$('.logo-image').css('background','url(http:'+result[0][0].image+') no-repeat');
		$('.mrwidget_counter').html('#' + (offset+1));

		// link to profile URL
		$(".profile-link").attr("href", result[0][0].profileUrl);
	},'json');

}//END OF FUNCTION



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
