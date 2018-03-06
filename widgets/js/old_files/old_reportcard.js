
var selection = 0;
$(function(){
	$('.sv-tabs').mousedown(function(){ return false; });
//create a search function to pass into graph
	$('.rc_search_input').bind("enterKey",function(e){
		search = $('input').val();
		company(search);
	});//END OF FUNCTION

	//by pressing enter in this field it will activate
	$('.rc_search_input').keyup(function(e){
		if(e.keyCode == 13){
		  $(this).trigger("enterKey");
		}
	});//END OF FUNCTION

	$('.rc_pillbtn').on('click', function(){
		search = $('input').val();
		company(search);
	})//END OF FUNCTION

	$('.so_exit').on('click',function(){
		$('.rc_today_container').css("display","block");
		$('.so_header').css("display","none");
		$('.so_widget-wrapper').css("display","none");
		$('.rc_search_input').val("");
	});
	//data call for exchange and lists
	exchangedata();

})

function exchangedata(){
$.post('http://quu.nu/services/', {
				service: "passfail",
				action:  "batchService",
				data: '[{"service":"passfail","data":{"service":"company.getMarketTicker"}},{"service":"passfail","data":{"service":"Sv150.getIntradayQuote"}},{"service":"passfail","data":{"service":"profiles.card.get","params":["public"],"filters":{"marketId":"8","investmentTypeId":"EQ","today":"1"},"limits":{"count":3,"offset":0},"flags":{"ignoreCeo":true},"options":{"order":"sp-pct-desc"}}},{"service":"passfail","data":{"service":"profiles.card.get","params":["public"],"filters":{"marketId":"8","investmentTypeId":"EQ","today":"1"},"limits":{"count":3,"offset":0},"flags":{"ignoreCeo":true},"options":{"order":"sp-pct-asc"}}}]'
			}, function(data_result){
				//sets a number to allow different ID's in html to be called since data calls are different
				//places results to be displayed correctly in their respectful id or classes.
				var num = 1;
				//plug in data call for SV150
				$('#SV').html(data_result[1].price);
				$('#svchange').html(font(data_result[1].priceChange, num));
				$('#svpct').html(data_result[1].pricePctChange+"%");
				$(".link").attr("href", "list-companies?investmentTypeId=EQ&marketId=8&order=sp-pct-desc&today=1");
				num = 2;
				//plug in data call for Nasdaq
				$('#nq').html(data_result[0]['data']['nasdaq'].price);
				$('#nqchange').html(font(data_result[0]['data']['nasdaq'].change, num));
				$('#napct').html(data_result[0]['data']['nasdaq'].changePercent+"%");
				$(".link").attr("href", "list-companies?investmentTypeId=EQ&exchange=nasdaq&order=sp-pct-desc&today=1");
				num = 3;
				//plug in data call for S&P500
				$('#SP').html(data_result[0]['data']['s&p-500'].price);
				$('#spchange').html(font(data_result[0]['data']['s&p-500'].change, num));
				$('#sppct').html(data_result[0]['data']['s&p-500'].changePercent+"%");
				$(".link").attr("href", "list-companies?investmentTypeId=EQ&marketId=5&order=sp-pct-desc&today=1");
				num = 4;
				//plug in data call for NYSE
				$('#ny').html(data_result[0]['data']['nyse'].price);
				$('#nychange').html(font(data_result[0]['data']['nyse'].change, num));
				$('#nypct').html(data_result[0]['data']['nyse'].changePercent+"%");
				$(".link").attr("href", "list-companies?investmentTypeId=EQ&exchange=nyse&order=sp-pct-desc&today=1");

				//this part of the data will be for today's top 3 gainers and will show their info
				var gainers = data_result[2];
				console.log(gainers);
				//gainers profiles
				$('#gain_profile1').attr("href",gainers[0].profileUrl);
				$('#gain_profile2').attr("href",gainers[1].profileUrl);
				$('#gain_profile3').attr("href",gainers[2].profileUrl);
				//gainers images
				$('#rc_gain1').css("background-image","url(https:"+gainers[0].image+")");
				$('#rc_gain2').css("background-image","url(https:"+gainers[1].image+")");
				$('#rc_gain3').css("background-image","url(https:"+gainers[2].image+")");
				//gainers names
				$('#gain_name1').html(gainers[0].symbol);
				$('#gain_name2').html(gainers[1].symbol);
				$('#gain_name3').html(gainers[2].symbol);
				//gainers price
				$('#gain_price1').html('$'+gainers[0].price);
				$('#gain_price2').html('$'+gainers[1].price);
				$('#gain_price3').html('$'+gainers[2].price);
				//gainers price change
				$('#gain_change1').html(gainers[0].change+'('+gainers[0].percentChange+'%)');
				$('#gain_change2').html(gainers[1].change+'('+gainers[1].percentChange+'%)');
				$('#gain_change3').html(gainers[2].change+'('+gainers[2].percentChange+'%)');

				//this part of the data will be for today's top 3 losers and will show their info
				var losers = data_result[3];
				//losers profiles
				$('#lose_profile1').attr("href",losers[0].profileUrl);
				$('#lose_profile2').attr("href",losers[1].profileUrl);
				$('#lose_profile3').attr("href",losers[2].profileUrl);
				//losers images
				$('#rc_lose1').css("background-image","url(https:"+losers[0].image+")");
				$('#rc_lose2').css("background-image","url(https:"+losers[1].image+")");
				$('#rc_lose3').css("background-image","url(https:"+losers[2].image+")");
				//losers names
				$('#lose_name1').html(losers[0].symbol);
				$('#lose_name2').html(losers[1].symbol);
				$('#lose_name3').html(losers[2].symbol);
				//losers price
				$('#lose_price1').html('$'+losers[0].price);
				$('#lose_price2').html('$'+losers[1].price);
				$('#lose_price3').html('$'+losers[2].price);
				//losers price change
				$('#lose_change1').html(losers[0].change+'('+losers[0].percentChange+'%)');
				$('#lose_change2').html(losers[1].change+'('+losers[1].percentChange+'%)');
				$('#lose_change3').html(losers[2].change+'('+losers[2].percentChange+'%)');
			}, 'json')
}

function company(search){
//data call for company api

	$.post('http://quu.nu/services/',{
		service: "passfail",
		action:  "batchService",
		data: '[{"service":"passfail","data":{"service":"profiles.Card.get","params":["public",{"search":"'+search+' "}]}}]'
		}, function(result){
			$('.rc_today_container').css("display","none");
			$('.so_header').css("display","block");
			$('.so_widget-wrapper').css("display","block");
		//graph data put data_result name and id of company needed to graph data.
		graph_data(result[0][0].name, result[0][0].id);

		$('.header-company_text').html(result[0][0].name);
		$('.header-company_text').attr("href",result[0][0].profileUrl);
		$('.tp_company-text').html(result[0][0].name);

		//Get financial and exec links
		getLinkDetails(result[0][0].profileUrl);
		$("#Day").css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
		$('.header-company_location').html(result[0][0].location);
		$('.tp_company-price').html('$'+result[0][0].price);

		$('.tp_company-change').html(lossGainCheck(result[0][0].change)+'('+result[0][0].percentChange+'%)');

		$('#company').css("background-image","url(https:"+result[0][0].image+")");
		$('#company-profile').attr("href",result[0][0].profileUrl)

		//6 data points
		$('#marketcap').html(nFormatter(result[0][0].marketCap));
		$('#peratio').html(result[0][0].peRatio);
		$('#totalshares').html(nFormatter(result[0][0].sharesOutstanding));
		$('#averagevolume').html(nFormatter(result[0][0].avgVolumeYearly));
		$('#52weeks').html(result[0][0].range52WeekLow+' - '+result[0][0].range52WeekHigh);
		$('#open').html(result[0][0].open);

		});
}


function getLinkDetails(link)
{
	$.ajax({
	  url: 'http://quu.nu/services/financial-url/?profileUrl='+link,

	  success: function(data) {
	    //You can use any jQuery/JavaScript here!!!
	      $("#marketcap-name").attr("href", data["financial-url"]);
	      $("#totalshares-name").attr("href", data["stock-price-url"]);
	    }
	});
}

function font(change, count){
	//determines whether the price change is pos or neg and change colors accordingly
	if (!isNaN(change)){
		if(change > 0){
			$('#'+count).replaceWith("<i class='fa-arrow-circle-o-up'></i>");
			$('#rc'+count).css({"color":"#44b224"});
		}
		else{
			$('#'+count).replaceWith("<i class='fa-arrow-circle-o-down'></i>");
			$('#rc'+count).css({"color":"#ca1010"});
		}
	}
	else if(isNaN(change)){
		$('#'+count).html("INVALID");
		$('.fa-arrow-circle-o-up').hide();
		$('.fa-arrow-circle-o-up').hide();
	}
	return change;
}
	var chart;
	var series;
	var series1;
//function to generate the graph of that company
function graph_data(name, id){

				series = stock[0].series[0];
				series1 = stock[1].series[0];
				newDataArray = [];
				newDataArray1 = [];
				//JSON array is converted into usable code for Highcharts also does not push NULL values
				$.each(series.data, function(i, val) {
					var yVal = parseFloat(val.y);
					//makes sure any value passed is null
					if (!isNaN(yVal)) {
						newDataArray.push([val.x * 1000, yVal]);
					}
				});
				$.each(series1.data, function(i, val) {
					var yVal = parseFloat(val.y);
					//makes sure any value passed is null
					if (!isNaN(yVal)) {
						newDataArray1.push([val.x * 1000, yVal]);
					}
				});
				//test if there is even data otherwise send back error
				if (!newDataArray.length || !newDataArray1.length)
				{
					$('#stockchart').html('INVALID');
					return;
				}
				//remove zoombar
				function hideZoomBar(chart) {
					chart.rangeSelector.zoomText.hide();
					$.each(chart.rangeSelector.buttons, function () {
						this.hide();
					});
					$(chart.rangeSelector.divRelative).hide();
				};
				//CALL HIGHCHARTS
				callChart(newDataArray1);

				hideZoomBar(chart);
				//Click function to allow custom button tabs to change highcharts.
				$('.sv-tabs').on('click',function(){

					$('.sv-tabs').css({"border-top":"3px solid #ebebeb","background-color":"#ebebeb"});
				if (!chart) return;
				//each selection represents Unix time in years
					switch($(this).data('dir')){
						case '1D':
							selection = 86400 * 1000;
							$(this).css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
							callChart(newDataArray1);
						break;
						case '1W':
						callChart(newDataArray);
							selection = 648000 * 1000;
							$(this).css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
						break;
						case '1M':
							callChart(newDataArray);
							selection = 2592000 * 1000;
							$(this).css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
						break;
						case '3M':
						callChart(newDataArray);
							selection = 2592000 * 3 * 1000;
							$(this).css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
						break;
						case '6M':
						callChart(newDataArray);
							selection = 2592000 * 6 * 1000;
							$(this).css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
						break;
						case '1Y':
						callChart(newDataArray);
							selection = 2592000 * 12 * 1000;
							$(this).css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
						break;
						case '2Y':
						callChart(newDataArray);
							selection = 2592000 * 24 * 1000;
							$(this).css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
						break;
						default:
						callChart(newDataArray);
							selection = 0;
						break;
					}
				//grabs the data max and min to start determining zoom feature
				var max = chart.xAxis[0].max;
				//sets the min x axis  depending on what zoom selection is chosen
				var min = max - selection;
				//day one will keep parsing larger min number so it will not scale well so this make sure it doesnt go past one day
				if($(this).data('dir') == '1D'){
					min = 1434499200000;
				}
				chart.xAxis[0].setExtremes(min, max);
				//shows reset zoom
				chart.showResetZoom();
			});

}


function callChart(chart_data)
{
	function hideZoomBar(chart) {
					chart.rangeSelector.zoomText.hide();
					$.each(chart.rangeSelector.buttons, function () {
						this.hide();
					});
					$(chart.rangeSelector.divRelative).hide();
				};
	chart = new Highcharts.StockChart({
				rangeSelector : {
					allButtonsEnabled: false,
					buttonSpacing: 0,
					selected: 0,
					labelStyle: {
						fontSize: 0,
						color: '#fff',
					},
				},//END of range selector
				chart: {
					renderTo: so_graph,
					height:140,
					backgroundColor: "#fbfbfb",
					zoomType: 'x',
					resetZoomButton: {
						position: {
							x: -300,
							y: -40
						}
					}
				},
				tooltip: {
					//round 2 decimals
					valueDecimals: 2,
					style:{
						fontSize:'14px'
					},
					shadow: false,
					borderWidth: 0,
					backgroundColor: 'rgba(255,255,255,0.8)'

				},
				navigator:{
						enabled: false,
					},

				scrollbar: {
						enabled: false,
					},
				title: {
					text: '',
				},
				xAxis: {
					type:'datetime',
					maxPadding: 0.22, //Prevent chart going off the screen on the right
					minPadding: 0.22,
					tickPosition: 'outside',
					title: '',
					labels:{
							autoRotation:false,
							step: null,
							overflow:false
					},
				},
				yAxis: {
					tickPixelInterval: 30,
					opposite:false,
					title: '',
				},
				credits:{
					enabled: false
				},
				series: [{
					showInLegend: false,
			        name : series.name.toUpperCase(),
			        data : chart_data,
					turboThreshold: 1
				}]

			});
			hideZoomBar(chart);
}

//determine if it is a gain or loss and change colors accordingly
function lossGainCheck(change)
{
	//determines whether the price change is pos or neg and change colors accordingly
	if (!isNaN(change)){
		if(change > 0){
			$('.tp_company-color').css({"color":"#44b224"});
			$('.fa-arrow-up').show();
			$('.fa-arrow-down').hide();
		}
		else{
			$('.tp_company-color').css({"color":"#ca1010"});
			$('.fa-arrow-down').show();
			$('.fa-arrow-up').hide();
		}
	}
	else if(isNaN(change)){
		$('.tp_company-color').html("INVALID");
		$('.fa-arrow-down').hide();
		$('.fa-arrow-up').hide();
	}
	return change;
}
//number converter to decimal with correct format
function nFormatter(num) {
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' M';
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' K';
	}

	return num;
}
