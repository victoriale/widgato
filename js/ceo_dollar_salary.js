//js to call api data for Who is Gaining Today? Top 100 Most Actively Traded Public Stocks in US today.

var CUR_OFFSET=0;
$(function () {
	pf_center_piece(CUR_OFFSET);
	id = __PF.widget.locationId;
$('.ceo_d_salary-content-buttonright').on('click', function() {
		if ($(this).data('dir') === 'next') {
			pf_center_piece(++CUR_OFFSET);
		}
	});
	$('.ceo_d_salary-content-buttonleft').on('click', function() {
		if (CUR_OFFSET > 0 && $(this).data('dir') === 'prev') {
			pf_center_piece(--CUR_OFFSET);
		}
	});
	//$('.pfwidget_wrapper').css("display","block");
	var windowURL = document.referrer.split('/')[2];
	//console.log(windowURL);
	/*
	$.get("http://apis.quu.nu/lovebrigpf-execs/?domain="+windowURL+"", function(domain){
		var str = domain["link"].replace(/\?order=compensation\-desc/, '');
		$('.cdslink').attr("href", str +"?id="+id+"&salary-high=1&title=ceo&order=name-a-z");
	});
	*/
	$('.cdslink').attr("href","what-executives-are-found-in-united-states/locale/usa/usa-236.htm?id=236&salary-high=1&title=ceo&order=name-a-z");
});

function pf_center_piece(offset) {
	id = __PF.widget.locationId;
	if(offset==0)
		$('.ceo_d_salary-content-buttonleft').hide();
	else
		$('.ceo_d_salary-content-buttonleft').show();
	$.ajax({
	 	url: 'http://quu.nu/services/?service=passfail&data={"service":"profiles.Card.get","params":["executive"],"filters":{"type":"location","id":236,"title":"ceo","salary-high":"1"},"limits":{"count":1,"offset":'+offset+'},"options":{"order":"name-a-z"}}',
	  	success: function(data) {
				$('.ceo_d_salary-content-textarea-t1').html(data[0]['name']);
				$('.ceo_d_salary-content-textarea-t2').html(data[0]['companyName']);
				$('.ceo_d_salary-total-price').html("$"+nFormatter(data[0]['salary']));
				$('.ceo_d_salary-content-image').css("background-image","url("+data[0]['image']+")");
				$('.ceo_d_salary-content-subimage').css("background-image","url("+data[0]['companyImage']+")");
				$(".cdsprofile-link").attr("href", data[0].profileUrl);
				$(".cdscompany-link").attr("href", data[0].companyProfileUrl);
    	}
	});
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
