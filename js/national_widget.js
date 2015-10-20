
var CUR_OFFSET = 0;
var cur_exchange = 'nasdaq';

//run js code onn startup
$(function(){
	$('.national_widget-content-buttonleft').css("opacity","0");
	//script to allow widgets to change to next item on list(same as 'see the whole list' button link)
	$('.national_widget-content-buttonright').on('click', function() {
		//when clicking on right button will change offset of data call and pull correct data based off of SEE THE WHOLE LIST
		if ($(this).data('dir') === 'next') {
			mw_center_piece(++CUR_OFFSET,cur_exchange);
		}
		//makes sure arrow on left appear if offset is greater than 0
		if(CUR_OFFSET > 0){
		$('.national_widget-content-buttonleft').css("opacity","1");
		$('.national_widget-content-buttonleft').hover(function(){
			$('.national_widget-content-buttonleft').css("cursor","pointer");
		});
		$
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
			mw_center_piece(--CUR_OFFSET,cur_exchange);
		}
		if (CUR_OFFSET == 0){
			$('.national_widget-content-buttonleft').css("opacity","0");
			$('.national_widget-content-buttonleft').css("cursor","default");
		}
	});//END OF FUNCTION

//data api call with filters for list
function mw_center_piece(offset,exchange){
	switch(exchange){
		case 'nasdaq':
			exchange = '"exchange":"nasdaq"';
			break;
		case 's&p 500':
			exchange = '"marketId":"5"';
			break;
		case 'nyse':
			exchange = '"exchange":"nyse"';
			break;
	}

	$.post('http://quu.nu/services/', {
		service: "passfail",
		action:  "batchService",
		data: '[{"service":"passfail","data":{"service":"profiles.card.get","params":["public"],"filters":{' + exchange + ',"market-cap-low":"1","investmentTypeId":"EQ","today":"1"},"limits":{"count":1,"offset":' + offset + '},"flags":[],"options":{"order":"sp-pct-desc"}}}]'
		}, function(result){

		//due to difference in exchanges S&P 500 will need a small if statement to return a var for highcharts to understand what chart to grab
		if (exchange === '"marketId":"5"'){
			var exch = 's&p 500';
			result[0][0].exchange = exch;
		}

		//service called time to set div classes to given results
		$('.national_widget-content-textarea-t1').html(result[0][0].name);
		$('.national_widget-content-image').css('background','url(http:'+result[0][0].image+') no-repeat');
		//$('.mwwidget_counter').html('#' + (offset+1));

		// link to profile URL
		$(".nwprofile-link").attr("href", result[0][0].profileUrl);
	},'json');

}//END OF FUNCTION


//by clicking on each tab it will return correct data and reinitialize a new data api call
$('.mtabs').on('click', function(){
		//reset the css background
		$('.mtabs').css({"background-color":"#f2f2f2","border-bottom":"1px solid #cccccc"});

		//switch statement to swap out tabs and recall data api depending on which tab/exchange is chosen
		//change title as well
		switch($(this).data('dir')){
			case 'nasdaq':
				CUR_OFFSET = 0;
				cur_exchange = 'nasdaq';
				$(this).css({"background-color":"#fff","border-bottom":"0"});
				$('.national_widget_wrapper').css({"display":"block"});
				$('.searchtab').css({"display":"none"});
				$('.title').html("TODAY'S "+cur_exchange+" MARKET MOVERS");
				$(".nwlink").attr("href", "list-companies?exchange=nasdaq&market-cap-low=1&investmentTypeId=EQ&today=1&order=sp-pct-desc");
				stock_data(cur_exchange);
				stock_graph(cur_exchange);
				mw_center_piece(CUR_OFFSET,cur_exchange);
				break;
			case 's&p 500':
				CUR_OFFSET = 0;
				cur_exchange = 's&p 500';
				$(this).css({"background-color":"#fff","border-bottom":"0"});
				$('.national_widget_wrapper').css({"display":"block"});
				$('.searchtab').css({"display":"none"});
				$('.title').html("TODAY'S "+cur_exchange+" MARKET MOVERS");
				$(".nwlink").attr("href", "list-companies?investmentTypeId=EQ&marketId=5&market-cap-low=1&order=sp-pct-desc&today=1");
				stock_data(cur_exchange);
				stock_graph(cur_exchange);
				mw_center_piece(CUR_OFFSET,cur_exchange);
				break;
			case 'nyse':
				CUR_OFFSET = 0;
				cur_exchange = 'nyse';
				$(this).css({"background-color":"#fff","border-bottom":"0"});
				$('.national_widget_wrapper').css({"display":"block"});
				$('.searchtab').css({"display":"none"});
				$('.title').html("TODAY'S "+cur_exchange+" MARKET MOVERS");
				$(".nwlink").attr("href", "list-companies?exchange=nyse&market-cap-low=1&investmentTypeId=EQ&order=sp-pct-desc&today=1");
				stock_data(cur_exchange);
				stock_graph(cur_exchange);
				mw_center_piece(CUR_OFFSET,cur_exchange);
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
$('.mwwidget_right-button').mousedown(function(){ return false; });
$('.mwwidget_left-button').mousedown(function(){ return false; });
$('.mtabs').mousedown(function(){ return false; });

//run function  initial calls incase nothing else runs this will be default call on page load
stock_data($('.mtabs').data('dir'));
stock_graph(cur_exchange);
mw_center_piece(CUR_OFFSET,cur_exchange);


})//END OF FUNCTION

//stock graph of exchange will display based off of what is selected
function stock_graph(graph_exchange){
		$.post('http://quu.nu/services/', {
			service: "passfail",
			action:  "batchService",
			data: '[{"service":"passfail","data":{"service":"financials.chart.getStockData","params":[{"range":"2","dataType":"market","series":[{"name":"'+graph_exchange+'","market-recap-low":"1","source":"market","dataType":"stock","value":"'+graph_exchange+'"}]}]}}]'
		}, function(data_result){
				// the following is the result of service call.
				// use the data to create highcharts
				var series = data_result[0].series[0];
				newDataArray = [];

				//JSON array is converted into usable code for Highcharts also does not push NULL values
				$.each(series.data, function(i, val) {
					var yVal = parseFloat(val.y);

					if (!isNaN(yVal)) {
						newDataArray.push([val.x * 1000, yVal]);
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
						tickPixelInterval: 50,
						type: 'datetime',
						showLastLabel: true,
    				endOnTick: true,
						title: {
							text:'',
						},
						dateTimeLabelFormats: {
							day: '%b'
						},
						labels:{
							autoRotation:false,
							style:{
								fontSize:'7px'
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
			            name : series.name.toUpperCase(),
			            data : newDataArray,
						lineWidth: 2,
						connectNulls: true,
			        }]
			    });//END OF HIGHCHARTS FUNCTION


		},'json');//END OF POST FUNCTION
	}//END OF FUNCTION

// data api returned based on which exchange is selected
function stock_data(cur_exch){
	switch(cur_exch){
		case 'nasdaq':
			$.post('http://quu.nu/services/', {
				service: "passfail",
				action:  "batchService",
				data: '[{"service":"passfail","data":{"service":"profiles.card.get","params":["public"],"filters":{"exchange":"nasdaq","investmentTypeId":"EQ","today":1},"options":{"order":"sp-pct-desc"},"limits":{"count":1,"offset":0}}},{"service":"passfail","action":"CompanyTopLists::getMeta","data":{"serviceOpts":{"service":"profiles.card.get","params":["public"],"filters":{"exchange":"nasdaq","investmentTypeId":"EQ","today":1},"options":{"order":"sp-pct-desc"},"limits":{"count":1,"offset":0}}}},{"service":"passfail","data":{"service":"company.getMarketTicker"}}]'
			}, function(data_result){
			//replace called data into fields
			$('.price').html(data_result[2]['data']['nasdaq'].price);
			convert_num(data_result[2]['data']['nasdaq'].change, data_result[2]['data']['nasdaq'].changePercent);
			},'json')
			break;

		case 's&p 500':
			$.post('/services/', {
				service: "passfail",
				action:  "batchService",
				data: '[{"service":"passfail","data":{"service":"company.getMarketTicker"}},{"service":"passfail","data":{"service":"profiles.card.get","params":["public"],"filters":{"marketId":5,"investmentTypeId":"EQ","today":1},"options":{"order":"sp-pct-desc"},"limits":{"count":1,"offset":0}}},{"service":"passfail","action":"CompanyTopLists::getMeta","data":{"serviceOpts":{"service":"profiles.card.get","params":["public"],"filters":{"marketId":5,"investmentTypeId":"EQ","today":1},"options":{"order":"sp-pct-desc"},"limits":{"count":1,"offset":0}}}}]'
			}, function(data_result){
			$('.price').html(data_result[0]['data']['s&p-500'].price);
			convert_num(data_result[0]['data']['s&p-500'].change, data_result[0]['data']['s&p-500'].changePercent);
			},'json')
			break;
		case 'nyse':
			$.post('/services/', {
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
