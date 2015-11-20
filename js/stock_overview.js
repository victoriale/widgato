var c_name;
var comp = '';
var domain = '';
var clickyId = 0;
var remnant = '';
var locName = '';
var city = '';
var state = '';
var loc = '';
var max = 10;
var bord = false;
$(function location(loc){
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

  $.get('http://apifin.synapsys.us/call_controller.php?action=widget&option=local_market_movers&param=807', function(data){
		dataCall = data.local_market_movers;
		list = dataCall.top_list_list[0].top_list_list;
		var curItem = list[0];
		$(".header-company_location").html(curItem.c_hq_city + ", " + curItem.c_hq_state);
    if(remnant == 'true' || remnant == true){
    	  $(".header-company_link").attr('href',"http://www.investkit.com/"+curItem.c_hq_state+"/location");
    }else{
        $(".header-company_link").attr('href',"http://www.myinvestkit.com/"+domain+"/"+curItem.c_hq_state+"/loc");
    }
  }, 'json')
});

$(function so_leftdata(id){
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
  }
  if(bord == 'true'){
    $(".re_w_list").css({'border-right':'1px solid #ccc','border-bottom':'1px solid #ccc','border-left':'1px solid #ccc'});
  }

  var script_tag = document.createElement('script');
  script_tag.setAttribute('src','//static.getclicky.com/js');
  document.head.appendChild(script_tag);
  var clicks = $('<script>try{ clicky.init('+clickyId+'); }catch(e){}</script>');
  document.head.appendChild(clicks[0]);

  $.get('http://apifin.investkit.com/call_controller.php?action=search&option=widget_search&wild=1&param='+comp, function(result){
    	$.get('http://apifin.investkit.com/call_controller.php?action=widget&option=stock_overview&param='+result.company_name.func_data.search_data[0].c_id, function(data){
        dataCall = data.stock_overview;
    		stockData= dataCall.stock_data[0];
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
    		$('#peratio').html(nFormatter(stockData.csi_pe_ratio));
    		$('#totalshares').html(nFormatter(stockData.csi_total_shares));
    		$('#averagevolume').html(nFormatter(stockData.csi_trading_vol));
    		$('#52weeks').html(last_year+' - '+today);
    		$('#open').html(nFormatter(stockData.csi_opening_price));
    		graph_data(stockData.stock_hist, stockData.c_name);

    		$('#eimage1').css('background','url('+imageUrl(exeData[0].o_pic)+') no-repeat');
    		$('#eimage2').css('background','url('+imageUrl(exeData[1].o_pic)+') no-repeat');
    		$('#eimage3').css('background','url('+imageUrl(exeData[2].o_pic)+') no-repeat');
				if(remnant == 'true' || remnant == true){
      		$('#company-profile').attr("href", 'http://www.investkit.com/'+exeData[0].c_ticker+'/'+compUrlName(stockData.c_name)+'/company/'+stockData.c_id);
      		$('.sv_company-link').attr("href", 'http://www.investkit.com/'+exeData[0].c_ticker+'/'+compUrlName(stockData.c_name)+'/company/'+stockData.c_id);
      		$('#eprof1').attr("href",'http://www.investkit.com/'+exeData[0].o_first_name+'-'+exeData[0].o_last_name+'/'+exeData[0].c_ticker+'/executive/'+exeData[0].o_id);
      		$('#eprof2').attr("href",'http://www.investkit.com/'+exeData[1].o_first_name+'-'+exeData[1].o_last_name+'/'+exeData[1].c_ticker+'/executive/'+exeData[1].o_id);
      		$('#eprof3').attr("href",'http://www.investkit.com/'+exeData[2].o_first_name+'-'+exeData[2].o_last_name+'/'+exeData[2].c_ticker+'/executive/'+exeData[2].o_id);
      		$('.executive-list').attr("href",'http://www.investkit.com/'+exeData[0].c_ticker+'/'+compUrlName(stockData.c_name)+'/executives/'+exeData[0].c_id);
        }else{
          $('#company-profile').attr("href", 'http://www.myinvestkit.com/'+domain+'/'+compUrlName(stockData.c_name)+'/'+exeData[0].c_ticker+'/c/'+stockData.c_id);
          $('.sv_company-link').attr("href", 'http://www.myinvestkit.com/'+domain+'/'+compUrlName(stockData.c_name)+'/'+exeData[0].c_ticker+'/c/'+stockData.c_id);
          $('#eprof1').attr("href",'http://www.myinvestkit.com/'+domain+'/'+exeData[0].c_ticker+'/'+exeData[0].o_last_name+'-'+exeData[0].o_first_name+'/e/'+exeData[0].o_id);
          $('#eprof2').attr("href",'http://www.myinvestkit.com/'+domain+'/'+exeData[1].c_ticker+'/'+exeData[1].o_last_name+'-'+exeData[1].o_first_name+'/e/'+exeData[1].o_id);
          $('#eprof3').attr("href",'http://www.myinvestkit.com/'+domain+'/'+exeData[2].c_ticker+'/'+exeData[2].o_last_name+'-'+exeData[2].o_first_name+'/e/'+exeData[2].o_id);
          $('.executive-list').attr("href",'http://www.myinvestkit.com/'+domain+'/'+compUrlName(stockData.c_name)+'/'+exeData[0].c_ticker+'/execs/'+exeData[0].c_id);
        }
    		$('#ename1').html(exeData[0].o_first_name+' '+exeData[0].o_last_name);
    		$('#ename2').html(exeData[1].o_first_name+' '+exeData[1].o_last_name);
    		$('#ename3').html(exeData[2].o_first_name+' '+exeData[2].o_last_name);
      }, 'json')
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
					},
          events: {
              selection: function(event) {
                  $('.tabs').css({"border-top":"3px solid #ebebeb","background-color":"#ebebeb"});
              }
          },
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
