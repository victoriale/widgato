var domain = '';
var clickyId = 0;
var remnant = '';
var locName = '';
var city = '';
var state = '';
var loc = '';
var max = 10;
var bord = false;

$(function(){
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

	$('.sv-tabs').mousedown(function(){ return false; });
//create a search function to pass into graph
	$('.rc_search_input').bind("enterKey",function(e){
		search = $('input').val();
		if(remnant == 'true' || remnant == true){
			window.open('http://www.investkit.com/search/r='+search);
		}else{
			window.open('http://www.myinvestkit.com/'+domain+'/s/r='+search);
		}
	});//END OF FUNCTION
	//by pressing enter in this field it will activate
	$('.rc_search_input').keyup(function(e){
		if(e.keyCode == 13){
		  $(this).trigger("enterKey");
		}
	});//END OF FUNCTION

	$('.rc_pillbtn').on('click', function(){
		search = $('input').val();
		if(remnant == 'true' || remnant == true){
			window.open('http://www.investkit.com/search/r='+search);
		}else{
			window.open('http://www.myinvestkit.com/'+domain+'/s/r='+search);
		}
	})//END OF FUNCTION

	$('.so_exit').on('click',function(){
		$('.rc_today_container').css("display","block");
		$('.so_header').css("display","none");
		$('.so_widget-wrapper').css("display","none");
		$('.rc_search_input').val("");
	});
	//data call for exchange and lists
})

$(function top(id){
	$.get('http://apifin.investkit.com/call_controller.php?action=widget&option=sv150_report_card', function(data){
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

				var NQ_price = Number(data_exchange[1].csi_price).toFixed(2);
				var NQ_priceChange = Number(data_exchange[1].csi_price_change_since_last).toFixed(2);
				var NQ_pctChange = Number(data_exchange[1].csi_percent_change_since_last).toFixed(2);
				if(data_exchange[0].csi_price_last_operator == 0){
					NQ_priceChange *= -1;
					NQ_pctChange *= -1;
				}
				$('#nq').html(NQ_price);
				$('#nqchange').html(lossGainCheck(NQ_priceChange));
				$('#napct').html(lossGainCheck(NQ_pctChange)+"%");
				//plug in data call for AMEX
				var AMEX_price = Number(data_exchange[0].csi_price).toFixed(2);
				var AMEX_priceChange = Number(data_exchange[0].csi_price_change_since_last).toFixed(2);
				var AMEX_pctChange = Number(data_exchange[0].csi_percent_change_since_last).toFixed(2);
				if(data_exchange[2].csi_price_last_operator == 0){
					AMEX_priceChange *= -1;
					AMEX_pctChange *= -1;
				}
				$('#SP').html(AMEX_price);
				$('#spchange').html(lossGainCheck(AMEX_priceChange));
				$('#sppct').html(lossGainCheck(AMEX_pctChange)+"%");

				//plug in data call for NYSE
				var NYSE_price = Number(data_exchange[2].csi_price).toFixed(2);
				var NYSE_priceChange = Number(data_exchange[2].csi_price_change_since_last).toFixed(2);
				var NYSE_pctChange = Number(data_exchange[2].csi_percent_change_since_last).toFixed(2);
				if(data_exchange[1].csi_price_last_operator == 0){
					NYSE_priceChange *= -1;
					NYSE_pctChange *= -1;
				}
				$('#ny').html(NYSE_price);
				$('#nychange').html(lossGainCheck(NYSE_priceChange));
				$('#nypct').html(lossGainCheck(NYSE_pctChange)+"%");
				
				if(remnant == 'true' || remnant == true){
					$('#gainlist').attr('href',"http://www.investkit.com/sv150-top-gainers/sv150_gainers/list")
					$('#loselist').attr('href',"http://www.investkit.com/sv150-top-losers/sv150_losers/list")

					$('#sv_link').attr("href","http://www.investkit.com/sv150-top-gainers/sv150_gainers/list");
					$('#nq_link').attr("href",'http://www.investkit.com/Top-companies-on-NASDAQ-with-stock-percent-loss/'+data_exchange[0].c_id+'/list');
					$('#amex_link').attr("href",'http://www.investkit.com/Top-companies-on-AMEX-with-stock-percent-loss/'+data_exchange[1].c_id+'/list');
					$('#nyse_link').attr("href",'http://www.investkit.com/Top-companies-on-NYSE-with-stock-percent-loss/'+data_exchange[2].c_id+'/list');

					$('#gain_profile1').attr("href",'http://www.investkit.com/'+data_gainer[0].c_ticker+'/'+compUrlName(data_gainer[0].c_name)+'/company/'+data_gainer[0].c_id);
					$('#gain_profile2').attr("href",'http://www.investkit.com/'+data_gainer[1].c_ticker+'/'+compUrlName(data_gainer[1].c_name)+'/company/'+data_gainer[1].c_id);
					$('#gain_profile3').attr("href",'http://www.investkit.com/'+data_gainer[2].c_ticker+'/'+compUrlName(data_gainer[2].c_name)+'/company/'+data_gainer[2].c_id);
					$('#lose_profile1').attr("href",'http://www.investkit.com/'+data_loser[0].c_ticker+'/'+compUrlName(data_loser[0].c_name)+'/company/'+data_gainer[0].c_id);
					$('#lose_profile2').attr("href",'http://www.investkit.com/'+data_loser[1].c_ticker+'/'+compUrlName(data_loser[1].c_name)+'/company/'+data_loser[1].c_id);
					$('#lose_profile3').attr("href",'http://www.investkit.com/'+data_loser[2].c_ticker+'/'+compUrlName(data_loser[2].c_name)+'/company/'+data_loser[2].c_id);
				}else{
					$('#gainlist').attr('href',"http://www.myinvestkit.com/sv150-top-gainers/sv150_gainers/list")
					$('#loselist').attr('href',"http://www.myinvestkit.com/sv150-top-losers/sv150_losers/list")

					$('#sv_link').attr("href","http://www.myinvestkit.com/"+domain+"/sv150-top-gainers/sv150_gainers/list");
					$('#nq_link').attr("href",'http://www.myinvestkit.com/'+domain+'/Top-companies-on-NASDAQ-with-stock-percent-loss/'+data_exchange[0].c_id+'/list');
					$('#amex_link').attr("href",'http://www.myinvestkit.com/'+domain+'/Top-companies-on-AMEX-with-stock-percent-loss/'+data_exchange[1].c_id+'/list');
					$('#nyse_link').attr("href",'http://www.myinvestkit.com/'+domain+'/Top-companies-on-NYSE-with-stock-percent-loss/'+data_exchange[2].c_id+'/list');

					$('#gain_profile1').attr("href",'http://www.myinvestkit.com/'+domain+'/'+compUrlName(data_gainer[0].c_name)+'/'+data_gainer[0].c_ticker+'/c/'+data_gainer[0].c_id);
					$('#gain_profile2').attr("href",'http://www.myinvestkit.com/'+domain+'/'+compUrlName(data_gainer[1].c_name)+'/'+data_gainer[1].c_ticker+'/c/'+data_gainer[1].c_id);
					$('#gain_profile3').attr("href",'http://www.myinvestkit.com/'+domain+'/'+compUrlName(data_gainer[2].c_name)+'/'+data_gainer[2].c_ticker+'/c/'+data_gainer[2].c_id);
					$('#lose_profile1').attr("href",'http://www.myinvestkit.com/'+domain+'/'+compUrlName(data_loser[0].c_name)+'/'+data_loser[0].c_ticker+'/c/'+data_gainer[0].c_id);
					$('#lose_profile2').attr("href",'http://www.myinvestkit.com/'+domain+'/'+compUrlName(data_loser[1].c_name)+'/'+data_loser[1].c_ticker+'/c/'+data_loser[1].c_id);
					$('#lose_profile3').attr("href",'http://www.myinvestkit.com/'+domain+'/'+compUrlName(data_loser[2].c_name)+'/'+data_loser[2].c_ticker+'/c/'+data_loser[2].c_id);
				}


				$('#rc_gain1').css('background','url(http://apifin2.synapsys.us/images/'+data_gainer[0].c_logo+') no-repeat');
				$('#rc_gain2').css('background','url(http://apifin2.synapsys.us/images/'+data_gainer[1].c_logo+') no-repeat');
				$('#rc_gain3').css('background','url(http://apifin2.synapsys.us/images/'+data_gainer[2].c_logo+') no-repeat');
				$('#rc_lose1').css('background','url(http://apifin2.synapsys.us/images/'+data_loser[0].c_logo+') no-repeat');
				$('#rc_lose2').css('background','url(http://apifin2.synapsys.us/images/'+data_loser[1].c_logo+') no-repeat');
				$('#rc_lose3').css('background','url(http://apifin2.synapsys.us/images/'+data_loser[2].c_logo+') no-repeat');

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
			$('#rc4').css({"color":"#44b224"});
			$('#rc3').css({"color":"#44b224"});
			$('#rc2').css({"color":"#44b224"});
			$('#rc1').css({"color":"#44b224"});
			$('.u').show();
			$('.d').hide();
		}
		else{
			$('.tp_company-color').css({"color":"#ca1010"});
			$('#rc4').css({"color":"#ca1010"});
			$('#rc3').css({"color":"#ca1010"});
			$('#rc2').css({"color":"#ca1010"});
			$('#rc1').css({"color":"#ca1010"});
			$('.u').hide();
			$('.d').show();
		}
	}
	else{
		$('.tp_company-color').html("INVALID");
		$('.d').hide();
		$('.u').hide();
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
