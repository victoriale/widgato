var c_name;
var comp = '';
var domain = '';
var remnant = '';
var locName = '';
var city = '';
var state = '';
var loc = '';
var max = 10;
var bord = false;
var protocolToUse = (location.protocol == "https:") ? "https" : "http";
var link = protocolToUse+"://www.investkit.com/";
var partner_link = protocolToUse+"://www.myinvestkit.com/";
$(function location(loc){
    //set the query data from database to global variable to use
    domain = 'siliconvalley.com';//Will be always non-remnant but keeping code just in case

    //digital first widgets are not ever REMNANTS but just in case keep code there and set remnant to false
    remnant = false;

    var windowURL = document.referrer;
  	var URLLength = windowURL.length - 1;
  	for(var i=0;i<=URLLength;i++)
  	{
  		if(windowURL.charAt(URLLength-i) == '/')
  		{
  			var reqdString = windowURL.substring((URLLength-i)+1, URLLength+1);
  			switch(reqdString){
  				case 'juniper':
  				//points to juniper pharm which is not right
  				reqdString = "juniper network";
  				break;
  				case 'intel':
  				//points to intellicheck for some reason
  				reqdString = "intel corp";
  				break;
  				case 'google':
  				//points to intellicheck for some reason
  				reqdString = "GOOGL";
  				break;
  				default:
  				break;
  			}
        comp = reqdString;
  			break;
  		}
  	}
  $.get(protocolToUse+'://apifin.investkit.com/call_controller.php?action=widget&option=local_market_movers&param=CA', function(data){
		dataCall = data.local_market_movers;
		list = dataCall.top_list_list[0].top_list_list;
		var curItem = list[0];
		$(".header-company_location").html(curItem.c_hq_city + ", " + curItem.c_hq_state);
    if(remnant == 'true' || remnant == true){
		$('#investkit').attr('href',link);

		$(".header-company_link").attr('href', link+curItem.c_hq_state+"/location");
    }else{
		$('#investkit').attr('href', partner_link+domain);

		$(".header-company_link").attr('href', partner_link+domain+"/"+curItem.c_hq_state+"/loc");
    }
  }, 'json')
});

$(function so_leftdata(id){
  $.get(protocolToUse+'://apifin.investkit.com/call_controller.php?action=search&option=widget_search&wild=1&param='+comp, function(result){
    	$.get(protocolToUse+'://apifin.investkit.com/call_controller.php?action=widget&option=stock_overview&param='+result.company_name.func_data.search_data[0].c_id, function(data){
        dataCall = data.stock_overview;
    		stockData= dataCall.stock_data;
        dailyData = dataCall.daily_update;
    		exeData = dataCall.executive_data[0];
    		//var stockHist = stockData.stock_hist.slice(1, 365);
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
    		$('#company').css('background','url('+imageUrl(stockData.c_logo)+') no-repeat');
    		$('.tp_company-text').html(stockData.c_name);
    		$('.tp_company-price').html(price);
    		$('.tp_company-change').html(lossGainCheck(priceChange)+'('+lossGainCheck(pctChange)+'%)');

    		$('#marketcap').html(nFormatter(stockData.csi_market_cap));
    		$('#peratio').html(nFormatter(Number(stockData.csi_pe_ratio).toFixed(2)));
    		$('#totalshares').html(nFormatter(stockData.csi_total_shares));
    		$('#averagevolume').html(nFormatter(stockData.csi_trading_vol));
    		$('#52weeks').html(Number(stockData.csi_52week_low).toFixed(2)+' - '+Number(stockData.csi_52week_high).toFixed(2));
    		$('#open').html(nFormatter(Number(stockData.csi_opening_price).toFixed(2)));
    		graph_data(dailyData, stockData.stock_hist, stockData.c_name);

    		$('#eimage1').css('background','url('+imageUrl(exeData[0].o_pic)+') no-repeat');
    		$('#eimage2').css('background','url('+imageUrl(exeData[1].o_pic)+') no-repeat');
    		$('#eimage3').css('background','url('+imageUrl(exeData[2].o_pic)+') no-repeat');
				if(remnant == 'true' || remnant == true){
      		$('#company-profile').attr("href", link+exeData[0].c_ticker+'/'+compUrlName(stockData.c_name)+'/company/'+stockData.c_id);
      		$('.sv_company-link').attr("href", link+exeData[0].c_ticker+'/'+compUrlName(stockData.c_name)+'/company/'+stockData.c_id);
      		$('#eprof1').attr("href",link+exeData[0].o_first_name+'-'+exeData[0].o_last_name+'/'+exeData[0].c_ticker+'/executive/'+exeData[0].o_id);
      		$('#eprof2').attr("href",link+exeData[1].o_first_name+'-'+exeData[1].o_last_name+'/'+exeData[1].c_ticker+'/executive/'+exeData[1].o_id);
      		$('#eprof3').attr("href",link+exeData[2].o_first_name+'-'+exeData[2].o_last_name+'/'+exeData[2].c_ticker+'/executive/'+exeData[2].o_id);
      		$('.executive-list').attr("href", link+exeData[0].c_ticker+'/'+compUrlName(stockData.c_name)+'/executives/'+exeData[0].c_id);
        }else{
          $('#company-profile').attr("href",  partner_link+domain+'/'+compUrlName(stockData.c_name)+'/'+exeData[0].c_ticker+'/c/'+stockData.c_id);
          $('.sv_company-link').attr("href", partner_link+domain+'/'+compUrlName(stockData.c_name)+'/'+exeData[0].c_ticker+'/c/'+stockData.c_id);
          $('#eprof1').attr("href", partner_link+domain+'/'+exeData[0].c_ticker+'/'+exeData[0].o_last_name+'-'+exeData[0].o_first_name+'/e/'+exeData[0].o_id);
          $('#eprof2').attr("href", partner_link+domain+'/'+exeData[1].c_ticker+'/'+exeData[1].o_last_name+'-'+exeData[1].o_first_name+'/e/'+exeData[1].o_id);
          $('#eprof3').attr("href", partner_link+domain+'/'+exeData[2].c_ticker+'/'+exeData[2].o_last_name+'-'+exeData[2].o_first_name+'/e/'+exeData[2].o_id);
          $('.executive-list').attr("href", partner_link+domain+'/'+compUrlName(stockData.c_name)+'/'+exeData[0].c_ticker+'/execs/'+exeData[0].c_id);
        }
    		$('#ename1').html(exeData[0].o_first_name+' '+exeData[0].o_last_name);
    		$('#ename2').html(exeData[1].o_first_name+' '+exeData[1].o_last_name);
    		$('#ename3').html(exeData[2].o_first_name+' '+exeData[2].o_last_name);
      }, 'json')
  }, 'json')
});

function graph_data(daily, graph_data, name){
		c_name = name;
    newDataArray = [];
    newDataArray1 = [];
		//JSON array is converted into usable code for Highcharts also does not push NULL values
    $.each(graph_data, function(i, val) {
			var yVal = parseFloat(val.sh_close);
			//makes sure any value passed is null
			if (!isNaN(yVal)) {
				newDataArray.push([val.sh_date * 1000, yVal]);
			}
		});$.each(daily, function(i, val) {
			var yVal = parseFloat(val.sh_close);
			//makes sure any value passed is null
			if (!isNaN(yVal)) {
				newDataArray1.push([val.sh_date * 1000, yVal]);
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
    newDataArray.sort(function(a,b){
      return parseFloat(a[0]) - parseFloat(b[0]);
    });
    newDataArray1.sort(function(a,b){
      return parseFloat(a[0]) - parseFloat(b[0]);
    });

		//CALL HIGHCHARTS
		callChart(newDataArray1);

		hideZoomBar(chart);
		//Click function to allow custom button tabs to change highcharts.
		$('.tabs').on('click',function(){

			$('.tabs').css({"border-top":"3px solid #ebebeb","background-color":"#ebebeb"});
		if (!chart) return;
		//each selection represents Unix time in years
			switch($(this).data('dir')){
				case '1D':
					callChart(newDataArray1);
					$(this).css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
          var d = new Date(newDataArray1[0][0]);
          var day = d.getUTCDate();
          var month = d.getUTCMonth();
          var year = d.getUTCFullYear();
          min = Date.UTC(year, month, day, 14, 30, 0, 0);
          //grabs the data max and min to start determining zoom feature
      		max = min + (23400 * 1000);
				break;
				case '1W':
					callChart(newDataArray);
					selection = 604800 * 1000;
					$(this).css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
          //grabs the data max and min to start determining zoom feature
      		max = chart.xAxis[0].max;
      		min = max - selection;
				break;
				case '1M':
					callChart(newDataArray);
					selection = 2629743 * 1000;
					$(this).css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
          //grabs the data max and min to start determining zoom feature
      		max = chart.xAxis[0].max;
      		min = max - selection;
				break;
				case '3M':
					callChart(newDataArray);
					selection = 2629743 * 3 * 1000;
					$(this).css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
          //grabs the data max and min to start determining zoom feature
      		max = chart.xAxis[0].max;
      		min = max - selection;
				break;
				case '6M':
					callChart(newDataArray);
					selection = 2629743 * 6 * 1000;
					$(this).css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
          //grabs the data max and min to start determining zoom feature
      		max = chart.xAxis[0].max;
      		min = max - selection;
				break;
				case '1Y':
					callChart(newDataArray);
					selection = 31556926  * 1 * 1000;
					$(this).css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
          //grabs the data max and min to start determining zoom feature
      		max = chart.xAxis[0].max;
      		min = max - selection;
				break;
				case '2Y':
					callChart(newDataArray);
					selection = 31556926  * 2 * 1000;
					$(this).css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
          //grabs the data max and min to start determining zoom feature
      		max = chart.xAxis[0].max;
      		min = max - selection;
				break;
				default:
					selection = 0;
				break;
			}

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
    //Offset highchart graphs by -5 hours (UTC to EST)
   Highcharts.setOptions({
     global: {
       timezoneOffset: (5 * 60) + 15
     }
   });
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
					},
          events: {
              selection: function(event) {
                  $('.tabs').css({"border-top":"3px solid #ebebeb","background-color":"#ebebeb"});
              }
          },
				},
				tooltip: {
          positioner: function () {
    				return { x: 20, y: 10 };
    			},

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
          dateTimeLabelFormats: {
    				day: '%e. %b',
            hour: '%l %P'
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
function imageUrl(path){
  if(typeof path == 'undefined' || path == null || path == '' || path == 'null'){
    return '../css/public/no_image.jpg';
  }
  return 'http://images.investkit.com/images/' + path;
}
