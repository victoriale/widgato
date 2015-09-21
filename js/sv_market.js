$(function(){

//create a search function to pass into graph
	$('.market_search_box').bind("enterKey",function(e){
		
		search = $('input').val();
		company(search);
	});//END OF FUNCTION

	//by pressing enter in this field it will activate
	$('.market_search_box').keyup(function(e){
			if(e.keyCode == 13){

		  $(this).trigger("enterKey");
		}
	});//END OF FUNCTION

	$('.market_search_iconbg').on('click', function(){
		search = $('input').val();
		company(search);
	})//END OF FUNCTION

//data call to gather info on exchange prices
$.post('http://quu.nu/services/', {
				service: "passfail",
				action:  "batchService",
				data: '[{"service":"passfail","data":{"service":"company.getMarketTicker"}},{"service":"passfail","data":{"service":"Sv150.getIntradayQuote"}},{"service":"passfail","data":{"service":"profiles.card.get","params":["public"],"filters":{"marketId":"8","investmentTypeId":"EQ","today":"1"},"limits":{"count":1,"offset":0},"flags":[],"options":{"order":"sp-pct-desc"}}}]'
			}, function(data_result){
				//sets a number to allow different ID's to be called since data calls are different
				var num = 1;
				//plug in data call for SV150
				$('#SV').html(data_result[1].price);
				$('#SVchange').html(lossGainCheck(data_result[1].priceChange, num));
				$('#SVcent').html(data_result[1].pricePctChange+"%");
				$(".link").attr("href", "list-companies?investmentTypeId=EQ&marketId=8&order=sp-pct-desc&today=1");
				num = 2;
				//plug in data call for Nasdaq
				$('#nq').html(data_result[0]['data']['nasdaq'].price);
				$('#Nqchange').html(lossGainCheck(data_result[0]['data']['nasdaq'].change, num));
				$('#Nqcent').html(data_result[0]['data']['nasdaq'].changePercent+"%");
				$(".link").attr("href", "list-companies?investmentTypeId=EQ&exchange=nasdaq&order=sp-pct-desc&today=1");
				num = 3;
				//plug in data call for S&P500
				$('#SP').html(data_result[0]['data']['s&p-500'].price);
				$('#SPchange').html(lossGainCheck(data_result[0]['data']['s&p-500'].change, num));
				$('#SPcent').html(data_result[0]['data']['s&p-500'].changePercent+"%");
				$(".link").attr("href", "list-companies?investmentTypeId=EQ&marketId=5&order=sp-pct-desc&today=1");
				num = 4;
				//plug in data call for NYSE
				$('#ny').html(data_result[0]['data']['nyse'].price);
				$('#Nychange').html(lossGainCheck(data_result[0]['data']['nyse'].change, num));
				$('#Nycent').html(data_result[0]['data']['nyse'].changePercent+"%");
				$(".link").attr("href", "list-companies?investmentTypeId=EQ&exchange=nyse&order=sp-pct-desc&today=1");
				//plug in data for the top sv150 company
				$('.sv_top_profile').attr("href",data_result[2][0].profileUrl);
				$('.sv_top_image').css("background-image","url(https:"+data_result[2][0].image+")");
				$('.sv-pd-name').html(data_result[2][0].symbol);
				$('.sv-pd-name').attr('title', data_result[2][0].symbol);
				$('.sv-pd-price').html('$'+data_result[2][0].price);
				$('.sv-pd-change').html(data_result[2][0].change+'('+data_result[2][0].percentChange+'%)');
			}, 'json')
})

function company(search){
//data call for company api
var newWindow = window.open();
$.when($.post('http://quu.nu/services/',{
		
		service: "passfail",
		action:  "batchService",
		data: '[{"service":"passfail","data":{"service":"profiles.Card.get","params":["public",{"search":"'+search+' "}]}}]'
    })).done(function(result) {

	newWindow.location = result[0][0].profileUrl;
});
}

/*
, function(result){
			
		 window.open(result[0][0].profileUrl,'newwin');
			}*/
function lossGainCheck(change, count){
	//determines whether the price change is pos or neg and change colors accordingly
	if (!isNaN(change)){
		if(change > 0){
			$('#bottom_text'+count).css({"color":"#44b224"});
			$('.m'+count).replaceWith("<i class='fa-arrow-circle-o-up'></i>");
		}
		else{
			$('#bottom_text'+count).css({"color":"#ca1010"});
			$('.m'+count).replaceWith("<i class='fa-arrow-circle-o-down'></i>");
		}
	}
	else if(isNaN(change)){
		$('#bottom_text'+count).html("INVALID");
		$('.fa-arrow-circle-o-up').hide();
		$('.fa-arrow-circle-o-up').hide();
	}
	return change;
}
