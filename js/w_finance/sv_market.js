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

$(function(){
		//set the query data from database to global variable to use
		domain = 'siliconvalley.com';//Will be always non-remnant but keeping code just in case
		//digital first widgets are not ever REMNANTS but just in case keep code there and set remnant to false
		remnant = false;

//create a search function to pass into graph
	$('.market_search_box').bind("enterKey",function(e){
		search = $('input').val();
		if(remnant == 'true' || remnant == true){
			window.open(link+'search/r='+search);
		}else{
			window.open(partner_link+domain+'/s/r='+search);
		}
	});//END OF FUNCTION

	//by pressing enter in this field it will activate
	$('.market_search_box').keyup(function(e){
			if(e.keyCode == 13){
		  $(this).trigger("enterKey");
		}
	});//END OF FUNCTION

	$('.market_search_iconbg').on('click', function(){
		search = $('input').val();
		if(remnant == 'true' || remnant == true){
			window.open(link+'search/r='+search);
		}else{
			window.open(partner_link+domain+'/s/r='+search);
		}
	})//END OF FUNCTION
 //data call to gather info on exchange prices
	$.get(protocolToUse+'://apifin.investkit.com/call_controller.php?action=widget&option=sv150_markets_slim', function(data){
		//sets a number to allow different ID's to be called since data calls are different
		data_result = data.sv150_markets_slim;
		data_exchange = data_result.exchange_stock_data;
		data_gainer = data_result.sv150_list_gainer;
		var num = 1;
		//plug in data call for SV150
		var SV150_price = Number(data_result.sv150_comp_index).toFixed(2);
		var SV150_priceChange = Number(data_result.sv150_price_change).toFixed(2);
		var SV150_pctChange = Number(data_result.sv150_percent_change).toFixed(2);
		$('#SV').html(SV150_price);
		$('#SVchange').html(lossGainCheck(SV150_priceChange, num));
		$('#SVcent').html(lossGainCheck(SV150_pctChange, num)+'%');
		if(remnant == 'true' || remnant == true){
				$("#SVtxt").attr("href",link+"sv150-top-gainers/sv150_gainers/list/1");
		}else{
				$("#SVtxt").attr("href", partner_link+domain+"/sv150-top-gainers/sv150_gainers/list/1");
		}
		num = 2;
		//plug in data call for Nasdaq
		var NQ_price = Number(data_exchange['.IXIC'].csi_price).toFixed(2);
		var NQ_priceChange = Number(data_exchange['.IXIC'].csi_price_change_since_last).toFixed(2);
		var NQ_pctChange = Number(data_exchange['.IXIC'].csi_percent_change_since_last).toFixed(2);
		if(data_exchange['.IXIC'].csi_price_last_operator == 0){
			NQ_priceChange *= -1;
			NQ_pctChange *= -1;
		}
		$('#nq').html(NQ_price);
		$('#Nqchange').html(lossGainCheck(NQ_priceChange, num));
		$('#Nqcent').html(lossGainCheck(NQ_pctChange, num)+"%");
		if(remnant == 'true' || remnant == true){
			$('#Nqtxt').attr("href",link+'Top-companies-on-NASDAQ-with-stock-percent-loss/5182/list/1');
		}else{
			$('#Nqtxt').attr("href",partner_link+domain+'/Top-companies-on-NASDAQ-with-stock-percent-loss/5182/list/1');
		}
		num = 3;
		//plug in data call for AMEX
		var AMEX_price = Number(data_exchange['.XAX'].csi_price).toFixed(2);
		var AMEX_priceChange = Number(data_exchange['.XAX'].csi_price_change_since_last).toFixed(2);
		var AMEX_pctChange = Number(data_exchange['.XAX'].csi_percent_change_since_last).toFixed(2);
		if(data_exchange['.XAX'].csi_price_last_operator == 0){
			AMEX_priceChange *= -1;
			AMEX_pctChange *= -1;
		}
		$('#SP').html(AMEX_price);
		$('#SPchange').html(lossGainCheck(AMEX_priceChange, num));
		$('#SPcent').html(lossGainCheck(AMEX_pctChange, num)+"%");
		if(remnant == 'true' || remnant == true){
			$("#SPtxt").attr("href", link+'Top-companies-on-AMEX-with-stock-percent-loss/5210/list/1');
		}else{
			$("#SPtxt").attr("href", partner_link+domain+'/Top-companies-on-AMEX-with-stock-percent-loss/5210/list/1');
		}
		num = 4;
		//plug in data call for NYSE
		var NYSE_price = Number(data_exchange['.NYA'].csi_price).toFixed(2);
		var NYSE_priceChange = Number(data_exchange['.NYA'].csi_price_change_since_last).toFixed(2);
		var NYSE_pctChange = Number(data_exchange['.NYA'].csi_percent_change_since_last).toFixed(2);
		if(data_exchange['.NYA'].csi_price_last_operator == 0){
			NYSE_priceChange *= -1;
			NYSE_pctChange *= -1;
		}
		$('#ny').html(NYSE_price);
		$('#Nychange').html(lossGainCheck(NYSE_priceChange, num));
		$('#Nycent').html(lossGainCheck(NYSE_pctChange, num)+"%");
		if(remnant == 'true' || remnant == true){
			$("#Nytxt").attr("href", link+'Top-companies-on-NYSE-with-stock-percent-loss/5196/list/1');
		}else{
			$("#Nytxt").attr("href", partner_link+domain+'/Top-companies-on-NYSE-with-stock-percent-loss/5196/list/1');
		}
		//plug in data for the top sv150 company
		var SV150_topTck = data_gainer.c_ticker;
		var SV150_top_price = Number(data_gainer.lcsi_price).toFixed(2);
		var SV150_top_priceChange = Number(data_gainer.lcsi_price_change_since_last).toFixed(2);
		var SV150_top_pctChange = Number(data_gainer.lcsi_percent_change_since_last).toFixed(2);
		if(data_gainer.lcsi_price_last_operator == 0){
			SV150_top_priceChange *= -1;
			SV150_top_pctChange *= -1;
		}
		if(remnant == 'true' || remnant == true){
	  	$('.sv_top_profile').attr("href",link+data_gainer.c_ticker+"/"+compUrlName(data_gainer.c_name)+"/company/"+data_gainer.c_id);
		}else{
	  	$('.sv_top_profile').attr("href",partner_link+domain+"/"+compUrlName(data_gainer.c_name)+"/"+data_gainer.c_ticker+"/c/"+data_gainer.c_id);
		}
		$('.sv_top_image').css('background','url(http://images.investkit.com/images/'+data_gainer.c_logo+') no-repeat');

		//top SV150 company
		$('.sv-pd-name').html(SV150_topTck);
		$('.sv-pd-name').attr('title', SV150_topTck);
		$('.sv-pd-price').html('$'+SV150_top_price);
		$('.sv-pd-change').html(lossGainCheck(SV150_top_priceChange,5)+'('+SV150_top_pctChange+'%)');
	}, 'json')
})

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
function compUrlName(company) {
  if ( typeof company == "undefined" || company == null ) {
    return '';
  }
  return company.replace(/(,|\.|&)/g,'').replace(/ /g,'-');
}
