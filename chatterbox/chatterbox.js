chatterbox=function(){var e=location.protocol=='https:'?'https':'http',t=[{min:1200,widget:970,title:'Promoted Stories from the Chatter Network','class':'biggest'},{min:768,widget:970,title:'Promoted Stories from the Chatter Network','class':'bigger'},{min:650,widget:970,title:'Promoted Stories from the Chatter Network','class':'big'},{min:430,widget:970,title:'Promoted Stories','class':'small'},{min:0,widget:250,title:'Promoted Stories','class':'smallest'}],s={250:{url:e+'://w1.synapsys.us/widgets/dynamic_widget/dynamic_widget.html'},970:{url:e+'://w1.synapsys.us/widgets/dynamic_widget/dynamic_widget_970.html'}},r={'sportschatter.com':e+'://dw.synapsys.us/chatter_api.php?site='+'sportschatter.com','celebchatter.com':e+'://dw.synapsys.us/chatter_api.php?site='+'celebchatter.com','politicschatter.com':e+'://dw.synapsys.us/chatter_api.php?site='+'politicschatter.com','oddchatter.com':e+'://dw.synapsys.us/chatter_api.php?site='+'oddchatter.com'},n=e+'://w1.synapsys.us/widgets/chatterbox/chatterbox.js',i=function(){var e=top.location.host;var t=e.split('.');switch(t.length){case 0:case 1:case 2:break;default:if(t[t.length-3]=='att'&&t[t.length-2]=='yahoo'&&t[t.length-1]=='com'){e='att.yahoo.com'}else if(t[t.length-2]=='co'&&t[t.length-1]=='uk'){e=t[t.length-3]+'.'+t[t.length-2]+'.'+t[t.length-1]}else{e=t[t.length-2]+'.'+t[t.length-1]}break}return e}(),a=document.currentScript||function(){var e=document.getElementsByTagName('script');for(var t=e.length-1;t>=0;t--){if(e[t].src.indexOf(n)!=-1){return e[t]}}}(),o={},l=-1,c,d,m={dom:i,category:x('widget')===false?'nba':x('widget'),remn:false,carousel:true,rand:Math.floor(Math.random()*10)},h=x('rss')===false?'sportschatter.com':x('rss'),p=function(){if(h===false||typeof r[h]=='undefined'){console.log('Test1');h=i;if(typeof r[h]==='undefined'){console.log('Test2');return r['sportschatter.com']}}return r[h]}(),u=x('small')==='yes'?true:false,f=[],g=function(){if(i.indexOf('chatter')>-1){return i}return h.split('.')[0].replace('chatter','-chatter')+'.'+i}(),w=[],y;Array.prototype.randItem=function(){return this[Math.floor(Math.random()*this.length)]};Element.prototype.setAttributes=function(e){for(var t in e){if(t==='style'){for(var s in e[t]){this.style[s]=e[t][s]}}else if(t==='html'){this.innerHTML=e[t]}else if(t==='text'){this.innerText=e[t]}else{this.setAttribute(t,e[t])}}};Element.prototype.appendChildren=function(){for(var e=0;e<arguments.length;e++){if(typeof arguments[e].length!=='undefined'){for(var t=0;t<arguments[e].length;t++){this.appendChild(arguments[e][t])}}else{this.appendChild(arguments[e])}}};b();v();_();function b(){var t;if(window.XMLHttpRequest){t=new XMLHttpRequest}else{t=new ActiveXObject('Microsoft.XMLHTTP')}t.onreadystatechange=function(){if(t.readyState==XMLHttpRequest.DONE){if(t.status==200){w=JSON.parse(t.responseText);for(var s=0;s<f.length;s++){f[s].getElementsByTagName('a')[0].href=e+'://'+g+w[s].link;f[s].querySelectorAll('.dw_item_title')[0].innerHTML=w[s].title;f[s].querySelectorAll('.dw_item_sub')[0].innerHTML=(h.charAt(0).toUpperCase()+h.slice(1)).replace('chatter','Chatter').split('.')[0];f[s].querySelectorAll('.dw_img')[0].setAttributes({style:{'background-image':'url(\''+w[s].thumbnail.replace(/o=[^&$]+/,'o='+btoa(JSON.stringify({x:.5,y:.5,height:240,width:400})))+'\')'}})}}else{var r=t.statusText;if(t.status==500){try{r=JSON.parse(t.responseText).message}catch(n){console.log('No JSON message')}}r='HTTP Error ('+t.status+'): '+r;if(tries++>10){throw r}setTimeout(b,500)}}};t.open('GET',p,true);t.send()}function v(){var t=document.createElement('link');t.setAttributes({href:e+'://fonts.googleapis.com/css?family=Lato',rel:'stylesheet',type:'text/css'});a.parentNode.insertBefore(t,a);var s=document.createElement('link');s.setAttributes({href:e+'://w1.synapsys.us/widgets/chatterbox/chatterbox.css',rel:'stylesheet',type:'text/css'});a.parentNode.insertBefore(s,a);c=document.createElement('div');c.setAttribute('class','dw_container');var r=document.createElement('div');r.setAttribute('class','dw_article');y=document.createElement('div');y.setAttribute('class','dw_title');for(var n=0;n<3;n++){var o=[document.createElement('a'),document.createElement('div'),document.createElement('div'),document.createElement('div'),document.createElement('div'),document.createElement('div')];o[1].appendChild(document.createElement('div'));o[1].setAttribute('class','dw_img');o[2].setAttribute('class','dw_t_cont');o[3].setAttributes({'class':'dw_item_title',text:''});o[4].setAttributes({'class':'dw_item_sub',text:''});o[5].setAttribute('class','dw_article_link');o[2].appendChildren(o[3],o[4]);o[0].appendChildren(o[1],o[2]);o[5].appendChildren(o[0]);f[n]=o[5]}r.appendChildren(y,f);if(!u){var l={dom:i,remn:false,cat:'finance',type:'dynamic_sports',subd:false,src:'content.synapsys.us/l/n/index-mdb.php',name:i.split('.').join('_')+'_sports_widget_300x250',widU:'',widW:300,widH:0,adw:300,adH:250,ofx:0,ofy:0,rand:(Math.random()*1e6).toString()+(Math.random()*1e6).toString()};var m=document.createElement('script');m.src=e+'://content.synapsys.us/l/n/index-mdb.php?'+Object.keys(l).map(function(e){return encodeURIComponent(e)+'='+encodeURIComponent(l[e])}).join('&');d=document.createElement('iframe');d.setAttribute('scrolling','no');c.appendChildren(r,m,d)}else{c.appendChild(r)}a.parentElement.insertBefore(c,a)}function _(){var e=c.parentElement.clientWidth;for(var s=0;s<t.length;s++){if(e>=t[s].min){break}}if(s==l){return false}l=s;c.setAttribute('class','dw_container '+t[s].class+(u!==false?' small_container':''));y.setAttributes({html:'<svg xmlns="http://www.w3.org/2000/svg" style="stroke:#ff3131;stroke-width:2px;fill:none;width:20.57px;height:18px;" viewBox="0 0 32 28"><path stroke-linecap="round" stroke-linejoin="round" d="m 4,14 l 12,12 l 12,-12 a 6 6 0 1 0 -10 -10 l -2, 2 l -2, -2 a 6 6 0 1 0 -10 10" /></svg> '+t[s].title});E(t[s].widget)}function E(e){if(u){return false}var t={};switch(e){case 250:t=s[250];break;default:t=s[970];break}if(t!=o){d.src='about:blank';o=t;setTimeout(function(){d.src=o.url+'?'+encodeURIComponent(JSON.stringify(m))},0)}}function x(e,t){t=t||a.src;var s=new RegExp('[?&]'+e.replace(/[\[\]]/g,'\\$&')+'(=([^&#]*)|&|#|$)');var r=s.exec(t);if(!r||!r[2]){return false}return decodeURIComponent(r[2].replace(/\+/g,' '))}if(c.parentElement.addEventListener){window.addEventListener('resize',_,false)}else if(c.parentElement.attachEvent){window.attachEvent('onresize',_)}return{cw:E,sc:_}}();
