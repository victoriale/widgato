var chatterbox=chatterbox||[];var chatterLayer=chatterLayer||[];chatterbox[chatterbox.length]=function(e){console.log('Chatterbox ID: ',e);var t=location.protocol=='https:'?'https':'http',r=[{min:1200,widget:970,title:'Promoted Stories from the Chatter Network','class':'biggest'},{min:768,widget:970,title:'Promoted Stories from the Chatter Network','class':'bigger'},{min:650,widget:970,title:'Promoted Stories from the Chatter Network','class':'big'},{min:430,widget:970,title:'Promoted Stories','class':'small'},{min:0,widget:250,title:'Promoted Stories','class':'smallest'}],a={250:{url:t+'://w1.synapsys.us/widgets/dynamic_widget/dynamic_widget.html'},970:{url:t+'://w1.synapsys.us/widgets/dynamic_widget/dynamic_widget_970.html'}},n='//dw.synapsys.us/chatter_api.php?site=',s={'sportschatter.com':'sports-chatter.','celebchatter.com':'celeb-chatter.','politicschatter.com':'politics-chatter.','oddchatter.com':'odd-chatter.'},i=t+'://w1.synapsys.us/widgets/chatterbox/chatterbox.js',o=function(){var e=top.location.host;var t=e.split('.');switch(t.length){case 0:case 1:case 2:break;default:if(t[t.length-3]=='att'&&t[t.length-2]=='yahoo'&&t[t.length-1]=='com'){e='att.yahoo.com'}else if(t[t.length-2]=='co'&&t[t.length-1]=='uk'){e=t[t.length-3]+'.'+t[t.length-2]+'.'+t[t.length-1]}else{e=t[t.length-2]+'.'+t[t.length-1]}break}return e}(),c=document.currentScript||function(){var e=document.getElementsByTagName('script');for(var t=0;t<=e.length;t++){if(e[t].src.indexOf(i)!=-1){return e[t]}}}(),l={},d=-1,h,u,m={dom:o,category:K('widget')===false?'mlb':K('widget').toLowerCase(),remn:false,rand:Math.floor(Math.random()*10)},f=K('rss')===false?'sportschatter.com':K('rss'),p=function(){if(f===false||typeof s[f]=='undefined'){f=o;if(typeof s[f]==='undefined'){return n+s['sportschatter.com']+o}}return n+s[f]+o}(),g=K('small')==='yes'?true:false,w=[],y=function(){if(o.indexOf('chatter')>-1){return o}return f.split('.')[0].replace('chatter','-chatter')+'.'+o}(),v=[],b,_=false,x=false,E=false,A=0;if(g){m.category='n/a'}var k=true,C='//www.googletagmanager.com/gtm.js?id=GTM-KSF89B&l=chatterLayer',L=document.getElementsByTagName('script');for(var P=0;P<L.length;P++){if(L[P].src.indexOf(C)!=-1){k=false}}if(k){var T=document.createElement('script');T.async=true;T.src='//www.googletagmanager.com/gtm.js?id=GTM-KSF89B&l=chatterLayer';c.parentNode.insertBefore(T,c)}chatterLayer.push({event:'chatterboxPageView',rss:f,style:g?'3UP':'5PACK',widget:m.category});Array.prototype.randItem=function(){return this[Math.floor(Math.random()*this.length)]};Element.prototype.setAttributes=function(e){for(var t in e){if(t==='style'){for(var r in e[t]){this.style[r]=e[t][r]}}else if(t==='html'){this.innerHTML=e[t]}else if(t==='text'){this.innerText=e[t]}else{this.setAttribute(t,e[t])}}};Element.prototype.appendChildren=function(){for(var e=0;e<arguments.length;e++){if(typeof arguments[e].length!=='undefined'){for(var t=0;t<arguments[e].length;t++){this.appendChild(arguments[e][t])}}else{this.appendChild(arguments[e])}}};var S=c.parentElement.clientWidth;for(var M=0;M<r.length;M++){if(S>=r[M].min){break}}if(g){M=0}N();H();function N(){var e;if(window.XMLHttpRequest){e=new XMLHttpRequest}else{e=new ActiveXObject('Microsoft.XMLHTTP')}e.onreadystatechange=function(){if(e.readyState==XMLHttpRequest.DONE){if(e.status==200){try{v=JSON.parse(e.responseText);v.length=3;for(var t=0;t<w.length;t++){w[t].getElementsByTagName('a')[0].href=v[t].link;w[t].querySelectorAll('.dw_item_title')[0].innerHTML=v[t].title;w[t].querySelectorAll('.dw_item_sub')[0].innerHTML=(f.charAt(0).toUpperCase()+f.slice(1)).replace('chatter','Chatter').split('.')[0];w[t].querySelectorAll('.dw_img')[0].setAttributes({style:{'background-image':'url(\''+function(e){try{var t=JSON.parse(atob(K('o',e)))}catch(r){var t={x:.5,y:.5}}return e.replace(/o=[^&$]+/,'o='+btoa(JSON.stringify({x:t.x,y:t.y,height:240,width:400})))}(v[t].thumbnail)+'\')'}})}return true}catch(r){console.log(r);var a='Error Parsing JSON'}}else{var a=e.statusText;if(e.status==500){try{a=JSON.parse(e.responseText).message}catch(r){console.log('No JSON message')}}a='HTTP Error ('+e.status+'): '+a}if(A++>10){throw a}setTimeout(N,500)}};e.open('GET',p,true);e.send()}function H(){var a=document.createElement('link');a.setAttributes({href:t+'://fonts.googleapis.com/css?family=Lato',rel:'stylesheet',type:'text/css'});c.parentNode.insertBefore(a,c);var n=document.createElement('link');n.setAttributes({href:t+'://w1.synapsys.us/widgets/chatterbox/chatterbox.css',rel:'stylesheet',type:'text/css'});c.parentNode.insertBefore(n,c);h=document.createElement('div');h.setAttribute('class','dw_container');if(h.addEventListener){h.addEventListener('mouseover',O)}else if(h.attachEvent){h.attachEvent('onmouseover',O)}var s=document.createElement('div');s.setAttribute('class','dw_article');b=document.createElement('div');b.setAttribute('class','dw_title');for(var i=0;i<3;i++){var l=[document.createElement('a'),document.createElement('div'),document.createElement('div'),document.createElement('div'),document.createElement('div'),document.createElement('div')];l[1].appendChild(document.createElement('div'));l[0].setAttributes({onclick:'chatterbox['+e+'].a_click('+i+')',target:'_blank'});l[1].setAttribute('class','dw_img');l[2].setAttribute('class','dw_t_cont');l[3].setAttributes({'class':'dw_item_title',text:''});l[4].setAttributes({'class':'dw_item_sub',text:''});l[5].setAttribute('class','dw_article_link');l[2].appendChildren(l[3],l[4]);l[0].appendChildren(l[1],l[2]);l[5].appendChildren(l[0]);w[i]=l[5]}s.appendChildren(b,w);if(!g){var d={dom:o,remn:false,cat:m.category,type:'dynamic_'+m.category,subd:false,src:'content.synapsys.us/l/n/index-mdb.php',name:o.split('.').join('_')+'_'+function(e){switch(e){case'nba':case'college_basketball':case'mlb':return'sports';break;case'crime':case'politics':case'demographics':case'weather':case'disaster':return'realestate';break;default:return e}}(m.category)+(r[M].min==0?'_chatterbox_m_300x250':'_chatterbox_300x250'),widU:r[M].min==0?'//w1.synapsys.us/widgets/dynamic_widget/dynamic_widget_250.html':'',widW:300,widH:r[M].min==0?250:0,adW:300,adH:250,ofx:0,ofy:0,rand:(Math.random()*1e6).toString()+(Math.random()*1e6).toString()};var f=document.createElement('div');f.setAttribute('class','dw_ad_stack');var p=document.createElement('script');var d={type:r[M].min==0?'chatterbox_mobile':'chatterbox',adW:'300',adH:'250',widW:'0',widH:'0',remn:false,rand:d.rand,dom:o};p.src='//content.synapsys.us/l/n/igloo'+(['baltimoresun.com','capitalgazette.com','carrollcountytimes.com','chicagotribune.com','citypaper.com','courant.com','dailypress.com','forsalebyowner.com','latimes.com','mcall.com','orlandosentinel.com','pacificsandiego.com','sandiegouniontribune.com','southflorida.com','sun-sentinel.com','trbdevcloud.com','trbprodcloud.com','tribdev.com'].indexOf(o)!=-1?'-pb':'')+'.php?'+Object.keys(d).map(function(e){return encodeURIComponent(e)+'='+encodeURIComponent(d[e])}).join('&');f.appendChild(p);u=document.createElement('iframe');u.setAttributes({scrolling:'no','class':'dw_iframe'});if(r[M].min!=0){h.appendChildren(s,f,u)}else{console.log('CHATTERBOX MOBILE');h.setAttribute('class','dw_container smallest mobile');h.appendChildren(s,f)}}else{h.appendChild(s)}c.parentElement.insertBefore(h,c);c.parentElement.removeChild(c)}function O(){if(x){return true}chatterLayer.push({event:'chatterMouseover',style:g?'3UP':'5PACK',rss:f,widget:m.category});x=true;h.removeEventListener('mouseover',O)}function U(){var e=h.parentElement.clientWidth;for(var t=0;t<r.length;t++){if(e>=r[t].min){break}}if(t==d){return false}d=t;h.setAttribute('class','dw_container '+r[t].class+(g!==false?' small_container':''));b.setAttributes({html:'<svg xmlns="http://www.w3.org/2000/svg" style="stroke:#ff3131;stroke-width:2px;fill:none;width:20.57px;height:18px;" viewBox="0 0 32 28"><path stroke-linecap="round" stroke-linejoin="round" d="m 4,14 l 12,12 l 12,-12 a 6 6 0 1 0 -10 -10 l -2, 2 l -2, -2 a 6 6 0 1 0 -10 10" /></svg> '+r[t].title});B(r[t].widget)}function B(e){if(g){return false}var t={};switch(e){case 250:t=a[250];break;default:t=a[970];break}if(t!=l){u.src='about:blank';l=t;setTimeout(function(){u.src=l.url+'?'+encodeURIComponent(JSON.stringify(m))},0)}}function K(e,t){t=t||c.src;var r=new RegExp('[?&]'+e.replace(/[\[\]]/g,'\\$&')+'(=([^&#]*)|&|#|$)');var a=r.exec(t);if(!a||!a[2]){return false}return decodeURIComponent(a[2].replace(/\+/g,' '))}function R(e){if(typeof v[e]=='undefined'){return true}chatterLayer.push({event:'chatter_click',style:g?'3UP':'5PACK',rss:f,widget:m.category});chatterLayer.push({event:'article_click',article_url:f+v[e].link,article_title:v[e].title,style:g?'3UP':'5PACK'})}function j(){if(_){return true}var e={x:window.scrollX,y:window.scrollY,w:window.innerWidth,h:window.innerHeight},t={x:h.offsetLeft,y:h.offsetTop,w:h.offsetWidth,h:h.offsetHeight},r=t.w*t.h,a=I(e.x,e.w,t.x,t.w),n=I(e.y,e.h,t.y,t.h);dispArea=a*n,dispPerc=dispArea/r;if(!E&&dispPerc>0){E=true;chatterLayer.push({event:'chatterVisibleMin',style:g?'3UP':'5PACK',rss:f,widget:m.category})}if(dispPerc>=.6){_=true;chatterLayer.push({event:'chatterVisible',style:g?'3UP':'5PACK',rss:f,widget:m.category});for(P=0;P<v.length;P++){chatterLayer.push({event:'chatterboxImpression',article_url:f+v[P].link,style:g?'3UP':'5PACK',article_title:v[P].title})}window.removeEventListener('scroll',j)}}function I(e,t,r,a){if(e+t<r||e>r+a){return 0}if(e>r&&e+t<r+a||e<r&&e+t>r+a){return a}if(e>r){return r+a-e}if(r+a>e+t){return e+t-r}return 0}function W(){return{style:g?'3UP':'5PACK',rss:f,widget:m.category,articles:v}}if(r[M].min!=0){U();window.addEventListener('resize',U,false)}window.addEventListener('scroll',j,false);return{cw:B,sc:U,a_click:R,get_data:W}}(chatterbox.length);
