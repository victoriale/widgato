
$(function (){
	$('.tabs').mousedown(function(){ return false; });
	$("#Day").css({"border-top":"3px solid #309fff", "background-color":"#fbfbfb"});
	grabURL();
})

function grabURL()
{
	var windowURL = document.referrer;
	windowURL = "www.powerPAUNCH.com/google";
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
				URLSearch(reqdString);
			break;
		}
	}
}

function URLSearch(search)
{
	$.post('http://quu.nu/services/',{
    service: "passfail",
    action:  "batchService",
    data: '[{"service":"passfail","data":{"service":"profiles.Card.get","params":["public",{"search":"'+search+' "}]}}]'
    }, function(result){
    	so_leftdata(result[0][0].id);
    	so_rightdata(result[0][0].id);
    	getLinkDetails(result[0][0].profileUrl);
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
	      $(".executive-list").attr("href", data["executives-url"]);
	    }
	});
}

//data api call with filters  FOR stock overview of company [client or us needs to enter in ID filter]
function so_leftdata(id) {
	$.post('http://quu.nu/services/', {
		service: "passfail",
		action:  "batchService",
		data: '[{"service":"passfail","data":{"service":"profiles.card.get","params":["public"],"filters":{"id":'+id+',"price-low":"0.01"},"limits":{"count":1,"offset":0},"flags":[],"options":{"order":"sv-desc"}}}]'

	}, function(data_result) {
		//graph data put data_result name and id of company needed to graph data.
		graph_data(data_result[0][0].name, data_result[0][0].id);

		$('.header-company_text').html(data_result[0][0].name);
		$('.header-company_text').attr("href",data_result[0][0].profileUrl);
		$('.tp_company-text').html(data_result[0][0].name);
		$('.sv_company-link').attr("href",data_result[0][0].profileUrl);

		$('.header-company_location').html(data_result[0][0].location);
		$('.tp_company-price').html('$'+data_result[0][0].price);

		$('.tp_company-change').html(lossGainCheck(data_result[0][0].change)+'('+data_result[0][0].percentChange+'%)');

		$('#company').css("background-image","url(https:"+data_result[0][0].image+")");
		$('#company-profile').attr("href",data_result[0][0].profileUrl)

		//6 data points
		$('#marketcap').html(nFormatter(data_result[0][0].marketCap));
		$('#peratio').html(data_result[0][0].peRatio);
		$('#totalshares').html(nFormatter(data_result[0][0].sharesOutstanding));
		$('#averagevolume').html(nFormatter(data_result[0][0].avgVolumeYearly));
		$('#52weeks').html(data_result[0][0].range52WeekLow+' - '+data_result[0][0].range52WeekHigh);
		$('#open').html(data_result[0][0].open);
	});
}
function so_rightdata(id){
	//data call to call 3 top executives of company to be displayed
	var postData = [
		{
			"service":"passfail",
			"data":{
				"service":"profiles.card.get",
				"params":["executive"],
				"filters":{
					"id":id,
					"type":"public",
				},
				"limits":{
					"count":3,
					"offset":0,
				},
				// "flags":[],
				"options":[]

			}
		},
	];
	//post data call using postData variable that holds all filters
	$.post('http://quu.nu/services/', {
		service: "passfail",
		action:  "batchService",
		data: JSON.stringify(postData)
	}, function(exec){
		//sets result of company exec into its desired fields
		$('#eimage1').css("background-image","url(https:"+exec[0][0].image+")");
		$('#eimage2').css("background-image","url(https:"+exec[0][1].image+")");
		$('#eimage3').css("background-image","url(https:"+exec[0][2].image+")");

		$('#eprof1').attr("href",exec[0][0].profileUrl);
		$('#eprof2').attr("href",exec[0][1].profileUrl);
		$('#eprof3').attr("href",exec[0][2].profileUrl);

		$('#ename1').html(exec[0][0].name);
		$('#ename2').html(exec[0][1].name);
		$('#ename3').html(exec[0][2].name);
	});
}

//function to generate the graph of that company
function graph_data(name, id){
	$.post('http://quu.nu/services/',{
		service: "passfail",
		action:  "batchService",
		data: '[{"service":"passfail","data":{"service":"financials.chart.getStockData","params":[{"range":"5y","dataType":"stock","series":[{"name":"'+name+'","source":"company","dataType":"stock","value":"'+id+'"}]}]}},{"service":"passfail","data":{"service":"financials.chart.getStockData","params":[{"range":"d","dataType":"stock","series":[{"name":"'+name+'","source":"company","dataType":"stock","value":"'+id+'"}]}]}}]'
	}, function(stock){
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
				$('.tabs').on('click',function(){

					$('.tabs').css({"border-top":"3px solid #ebebeb","background-color":"#ebebeb"});
				if (!chart) return;
				//each selection represents Unix time in years
					switch($(this).data('dir')){
						case '1D':
							callChart(newDataArray1);
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
			        name : series.name.toUpperCase(),
			        data : array_data,
					turboThreshold: 1
				}]
			});
		chart.showResetZoom();
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
