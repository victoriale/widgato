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
})

$(function company(search){
//data call for company api
$.get('http://apifin.synapsys.us/call_controller.php?action=widget&option=stock_overview&param=3330', function(data){
		dataCall = data.stock_overview;
		console.log(dataCall)
		stockData= dataCall.stock_data[0];
		exeData = dataCall.executive_data[0];
		$('.rc_today_container').css("display","none");
		$('.so_header').css("display","block");
		$('.so_widget-wrapper').css("display","block");
		//graph data put data_result name and id of company needed to graph data.
		//graph_data(result[0][0].name, result[0][0].id);
		$('.header-company_text').html(stockData.c_name);
		$('.header-company_text').attr("href", "list-companies?investmentTypeId=EQ&exchange=nyse&order=sp-pct-desc&today=1");
		$('.tp_company-text').html(stockData.c_name);
		//Get financial and exec links
		$("#Day").css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
		var price = '$'+Number(stockData.csi_price).toFixed(2);
		var priceChange = Number(stockData.csi_price_change_since_last).toFixed(2);
		var pctChange = Number(stockData.csi_percent_change_since_last).toFixed(2);
		if(stockData.csi_price_last_operator == 0){
			priceChange *= -1;
			pctChange *= -1;
		}
		var last_year = Number(stockData.stock_hist[365].sh_close).toFixed(2);
		var today = Number(stockData.stock_hist[0].sh_close).toFixed(2);

		$('.header-company_text').html(stockData.c_name);
		//$('.header-company_location').html(stockData.c_city+', '+stockData.c_state);
		$('#company').css('background','url(http://apifin2.synapsys.us/images/'+stockData.c_logo+') no-repeat');
		$('.tp_company-text').html(stockData.c_name);
		$('.tp_company-price').html(price);
		$('.tp_company-change').html(lossGainCheck(priceChange)+'('+lossGainCheck(pctChange)+'%)');

		$('#marketcap').html(nFormatter(stockData.csi_market_cap));
		$('#peratio').html(nFormatter(stockData.csi_pe_ratio));
		$('#totalshares').html(nFormatter(stockData.csi_total_shares));
		$('#averagevolume').html(nFormatter(stockData.csi_trading_vol));
		$('#52weeks').html(last_year+' - '+today);
		$('#open').html(nFormatter(stockData.csi_opening_price));
		$('#company-profile').attr("href", 'http://www.investkit.com/'+exeData[0].c_ticker+'/'+compUrlName(stockData.c_name)+'/company/'+stockData.c_id);
		graph_data(stockData.stock_hist, stockData.c_name);
		}, 'json')
});
function graph_data(graph_data, name){
		c_name = name;
		newDataArray = [];
		//JSON array is converted into usable code for Highcharts also does not push NULL values
		$.each(graph_data, function(i, val) {
			var yVal = parseFloat(val.sh_close);
			//makes sure any value passed is null
			if (!isNaN(yVal)) {
				newDataArray.push([val.sh_date * 1000, yVal]);
			}
		});

		//test if there is even data otherwise send back error
		if (!newDataArray.length)
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
		newDataArray.reverse();
		//CALL HIGHCHARTS
		callChart(newDataArray);

		hideZoomBar(chart);
		//Click function to allow custom button tabs to change highcharts.
		$('.tabs').on('click',function(){

			$('.tabs').css({"border-top":"3px solid #ebebeb","background-color":"#ebebeb"});
		if (!chart) return;
		//each selection represents Unix time in years
			switch($(this).data('dir')){
				case '1D':
					callChart(newDataArray);
					selection = 86400 * 1000;
					$(this).css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
				break;
				case '1W':
					callChart(newDataArray);
					selection = 604800 * 1000;
					$(this).css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
				break;
				case '1M':
					callChart(newDataArray);
					selection = 2629743 * 1000;
					$(this).css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
				break;
				case '3M':
					callChart(newDataArray);
					selection = 2629743 * 3 * 1000;
					$(this).css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
				break;
				case '6M':
					callChart(newDataArray);
					selection = 2629743 * 6 * 1000;
					$(this).css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
				break;
				case '1Y':
					callChart(newDataArray);
					selection = 31556926  * 1 * 1000;
					$(this).css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
				break;
				case '2Y':
					callChart(newDataArray);
					selection = 31556926  * 2 * 1000;
					$(this).css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
				break;
				default:
					selection = 0;
				break;
			}
		//grabs the data max and min to start determining zoom feature
		max = chart.xAxis[0].max;
		min = max - selection;
		chart.xAxis[0].setExtremes(min, max);
		//shows reset zoom
		chart.showResetZoom();
	});
}

function callChart(array_data, max, min)
{
		//remove zoombar
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
				},
				chart: {
					renderTo: so_graph,
					animation: false,
					height:145,
					spacingRight:20,
					backgroundColor: "#fbfbfb",
					zoomType: 'x',
					resetZoomButton: {
						position: {
							x: 0,
							y: -30
						}
					}
				},
				tooltip: {
					//round 2 decimals
					valueDecimals: 2,
					style:{
						fontSize:'10px',
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
							overflow:'false'
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
			        name : c_name.toUpperCase(),
			        data : array_data,
					turboThreshold: 1
				}]
			});
		chart.showResetZoom();
		hideZoomBar(chart);
}

$(function top(id){
	$.get('http://apifin.synapsys.us/call_controller.php?action=widget&option=sv150_report_card', function(data){
				data_result = data.sv150_report_card;
				data_exchange = data_result.exchange_stock_data;
				data_gainer = data_result.sv150_list_gainers;
				data_loser = data_result.sv150_list_losers;

				var SV150_price = Number(data_result.sv150_comp_index).toFixed(2);
				var SV150_priceChange = Number(data_result.sv150_price_change).toFixed(2);
				var SV150_pctChange = Number(data_result.sv150_percent_change).toFixed(2);

				$('#SV').html(SV150_price);
				$('#svchange').html(lossGainCheck(SV150_priceChange));
				$('#svpct').html(lossGainCheck(SV150_pctChange)+'%');

				var NQ_price = Number(data_exchange[0].csi_price).toFixed(2);
				var NQ_priceChange = Number(data_exchange[0].csi_price_change_since_last).toFixed(2);
				var NQ_pctChange = Number(data_exchange[0].csi_percent_change_since_last).toFixed(2);
				if(data_exchange[0].csi_price_last_operator == 0){
					NQ_priceChange *= -1;
					NQ_pctChange *= -1;
				}
				$('#nq').html(NQ_price);
				$('#nqchange').html(lossGainCheck(NQ_priceChange));
				$('#napct').html(lossGainCheck(NQ_pctChange)+"%");
				//plug in data call for AMEX
				var AMEX_price = Number(data_exchange[2].csi_price).toFixed(2);
				var AMEX_priceChange = Number(data_exchange[2].csi_price_change_since_last).toFixed(2);
				var AMEX_pctChange = Number(data_exchange[2].csi_percent_change_since_last).toFixed(2);
				if(data_exchange[2].csi_price_last_operator == 0){
					AMEX_priceChange *= -1;
					AMEX_pctChange *= -1;
				}
				$('#SP').html(AMEX_price);
				$('#spchange').html(lossGainCheck(AMEX_priceChange));
				$('#sppct').html(lossGainCheck(AMEX_pctChange)+"%");

				//plug in data call for NYSE
				var NYSE_price = Number(data_exchange[1].csi_price).toFixed(2);
				var NYSE_priceChange = Number(data_exchange[1].csi_price_change_since_last).toFixed(2);
				var NYSE_pctChange = Number(data_exchange[1].csi_percent_change_since_last).toFixed(2);
				if(data_exchange[1].csi_price_last_operator == 0){
					NYSE_priceChange *= -1;
					NYSE_pctChange *= -1;
				}
				$('#ny').html(NYSE_price);
				$('#nychange').html(lossGainCheck(NYSE_priceChange));
				$('#nypct').html(lossGainCheck(NYSE_pctChange)+"%");

				var link = 'http://localhost:3000';
				//$('#sv_link').attr("href",link+'/Top-companies-on-NYSE-with-stock-percent-loss/'+data1.c_id+'/list');
				$('#nq_link').attr("href",link+'/Top-companies-on-NASDAQ-with-stock-percent-loss/'+data_exchange[0].c_id+'/list');
				$('#amex_link').attr("href",link+'/Top-companies-on-AMEX-with-stock-percent-loss/'+data_exchange[1].c_id+'/list');
				$('#nyse_link').attr("href",link+'/Top-companies-on-NYSE-with-stock-percent-loss/'+data_exchange[2].c_id+'/list');

				$('#rc_gain1').css('background','url(http://apifin2.synapsys.us/images/'+data_gainer[0].c_logo+') no-repeat');
				$('#rc_gain2').css('background','url(http://apifin2.synapsys.us/images/'+data_gainer[1].c_logo+') no-repeat');
				$('#rc_gain3').css('background','url(http://apifin2.synapsys.us/images/'+data_gainer[2].c_logo+') no-repeat');
				$('#rc_lose1').css('background','url(http://apifin2.synapsys.us/images/'+data_loser[0].c_logo+') no-repeat');
				$('#rc_lose2').css('background','url(http://apifin2.synapsys.us/images/'+data_loser[1].c_logo+') no-repeat');
				$('#rc_lose3').css('background','url(http://apifin2.synapsys.us/images/'+data_loser[2].c_logo+') no-repeat');

				var link =' http://localhost:3000';
				$('#gain_profile1').attr("href",link+'/'+data_gainer[0].c_ticker+'/'+compUrlName(data_gainer[0].c_name)+'/company/'+data_gainer[0].c_id);
				$('#gain_profile2').attr("href",link+'/'+data_gainer[1].c_ticker+'/'+compUrlName(data_gainer[1].c_name)+'/company/'+data_gainer[1].c_id);
				$('#gain_profile3').attr("href",link+'/'+data_gainer[2].c_ticker+'/'+compUrlName(data_gainer[2].c_name)+'/company/'+data_gainer[2].c_id);
				$('#lose_profile1').attr("href",link+'/'+data_loser[0].c_ticker+'/'+compUrlName(data_loser[0].c_name)+'/company/'+data_gainer[0].c_id);
				$('#lose_profile2').attr("href",link+'/'+data_loser[1].c_ticker+'/'+compUrlName(data_loser[1].c_name)+'/company/'+data_loser[1].c_id);
				$('#lose_profile3').attr("href",link+'/'+data_loser[2].c_ticker+'/'+compUrlName(data_loser[2].c_name)+'/company/'+data_loser[2].c_id);

				$('#gain_name1').html(data_gainer[0].c_ticker);
				$('#gain_name2').html(data_gainer[1].c_ticker);
				$('#gain_name3').html(data_gainer[2].c_ticker);
				$('#lose_name1').html(data_loser[0].c_ticker);
				$('#lose_name2').html(data_loser[1].c_ticker);
				$('#lose_name3').html(data_loser[2].c_ticker);

				$('#gain_price1').html('$'+Number(data_gainer[0].csi_price).toFixed(2));
				$('#gain_price2').html('$'+Number(data_gainer[1].csi_price).toFixed(2));
				$('#gain_price3').html('$'+Number(data_gainer[2].csi_price).toFixed(2));
				$('#lose_price1').html('$'+Number(data_loser[0].csi_price).toFixed(2));
				$('#lose_price2').html('$'+Number(data_loser[1].csi_price).toFixed(2));
				$('#lose_price3').html('$'+Number(data_loser[2].csi_price).toFixed(2));

				$('#gain_change1').html((Number(data_gainer[0].csi_price_change_since_last).toFixed(2))+'('+(Number(data_gainer[0].csi_percent_change_since_last).toFixed(2))+'%)');
				$('#gain_change2').html((Number(data_gainer[1].csi_price_change_since_last).toFixed(2))+'('+(Number(data_gainer[1].csi_percent_change_since_last).toFixed(2))+'%)');
				$('#gain_change3').html((Number(data_gainer[2].csi_price_change_since_last).toFixed(2))+'('+(Number(data_gainer[2].csi_percent_change_since_last).toFixed(2))+'%)');
				$('#lose_change1').html((Number(data_loser[0].csi_price_change_since_last).toFixed(2))+'('+(Number(data_loser[0].csi_percent_change_since_last).toFixed(2))+'%)');
				$('#lose_change2').html((Number(data_loser[1].csi_price_change_since_last).toFixed(2))+'('+(Number(data_loser[1].csi_percent_change_since_last).toFixed(2))+'%)');
				$('#lose_change3').html((Number(data_loser[2].csi_price_change_since_last).toFixed(2))+'('+(Number(data_loser[2].csi_percent_change_since_last).toFixed(2))+'%)');

			}, 'json')
})

function lossGainCheck(change)
{
	//determines whether the price change is pos or neg and change colors accordingly
	if (!isNaN(change)){
		if(change > 0){
			$('.tp_company-color').css({"color":"#44b224"});
			$('.fa-arrow-circle-o-up').show();
			$('.fa-arrow-circle-o-down').hide();
		}
		else{
			$('.tp_company-color').css({"color":"#ca1010"});
			$('.fa-arrow-circle-o-down').show();
			$('.fa-arrow-circle-o-up').hide();
		}
	}
	else if(isNaN(change)){
		$('.tp_company-color').html("INVALID");
		$('.fa-arrow-circle-o-down').hide();
		$('.fa-arrow-circle-o-up').hide();
	}
	return change;
}
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

function compUrlName(company) {
  if ( typeof company == "undefined" || company == null ) {
    return '';
  }
  return company.replace(/(,|\.|&)/g,'').replace(/ /g,'-');
}
