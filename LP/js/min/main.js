function insta_timer(){insta_count<3?($("#instafeed li").removeClass("active"),$("#instafeed li:nth-of-type("+insta_count+")").addClass("active"),insta_count++):($("#instafeed li").removeClass("active"),$("#instafeed li:nth-of-type("+insta_count+")").addClass("active"),insta_count=1),setTimeout("insta_timer()",5e3)}function countDown(){return $("header h1,.nav-btn,nav").addClass("fadeOut"),!0}function restartTimer(){return clearTimeout(timer),$("header h1,.nav-btn,nav").removeClass("fadeOut"),timer=setTimeout("countDown()",5e3),!0}function load(){timer=setTimeout("countDown()",5e3),document.body.addEventListener("mousedown",restartTimer,!1),document.body.addEventListener("keypress",restartTimer,!1),document.addEventListener("scroll",restartTimer,!1)}(function(){var t;t=function(){function t(t,e){var o,i;if(this.options={target:"instafeed",get:"popular",resolution:"thumbnail",sortBy:"none",links:!0,mock:!1,useHttp:!1},"object"==typeof t)for(o in t)i=t[o],this.options[o]=i;this.context=null!=e?e:this,this.unique=this._genKey()}return t.prototype.hasNext=function(){return"string"==typeof this.context.nextUrl&&this.context.nextUrl.length>0},t.prototype.next=function(){return!!this.hasNext()&&this.run(this.context.nextUrl)},t.prototype.run=function(e){var o,i,n;if("string"!=typeof this.options.clientId&&"string"!=typeof this.options.accessToken)throw new Error("Missing clientId or accessToken.");if("string"!=typeof this.options.accessToken&&"string"!=typeof this.options.clientId)throw new Error("Missing clientId or accessToken.");return null!=this.options.before&&"function"==typeof this.options.before&&this.options.before.call(this),"undefined"!=typeof document&&null!==document&&(n=document.createElement("script"),n.id="instafeed-fetcher",n.src=e||this._buildUrl(),o=document.getElementsByTagName("head"),o[0].appendChild(n),i="instafeedCache"+this.unique,window[i]=new t(this.options,this),window[i].unique=this.unique),!0},t.prototype.parse=function(t){var e,o,i,n,s,r,a,c,l,p,d,u,h,f,m,g,v,y,w,b,_,$,k,C,E,T,I,x,N,B,O;if("object"!=typeof t){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(200!==t.meta.code){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,t.meta.error_message),!1;throw new Error("Error from Instagram: "+t.meta.error_message)}if(0===t.data.length){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}if(null!=this.options.success&&"function"==typeof this.options.success&&this.options.success.call(this,t),this.context.nextUrl="",null!=t.pagination&&(this.context.nextUrl=t.pagination.next_url),"none"!==this.options.sortBy)switch(N="random"===this.options.sortBy?["","random"]:this.options.sortBy.split("-"),x="least"===N[0],N[1]){case"random":t.data.sort(function(){return.5-Math.random()});break;case"recent":t.data=this._sortBy(t.data,"created_time",x);break;case"liked":t.data=this._sortBy(t.data,"likes.count",x);break;case"commented":t.data=this._sortBy(t.data,"comments.count",x);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}if("undefined"!=typeof document&&null!==document&&!1===this.options.mock){if(m=t.data,I=parseInt(this.options.limit,10),null!=this.options.limit&&m.length>I&&(m=m.slice(0,I)),r=document.createDocumentFragment(),null!=this.options.filter&&"function"==typeof this.options.filter&&(m=this._filter(m,this.options.filter)),null!=this.options.template&&"string"==typeof this.options.template){for(c="",h="","",O=document.createElement("div"),p=0,k=m.length;p<k;p++){if(d=m[p],"object"!=typeof(u=d.images[this.options.resolution]))throw s="No image found for resolution: "+this.options.resolution+".",new Error(s);w=u.width,v=u.height,y="square",w>v&&(y="landscape"),w<v&&(y="portrait"),f=u.url,l=window.location.protocol.indexOf("http")>=0,l&&!this.options.useHttp&&(f=f.replace(/https?:\/\//,"//")),h=this._makeTemplate(this.options.template,{model:d,id:d.id,link:d.link,type:d.type,image:f,width:w,height:v,orientation:y,caption:this._getObjectProperty(d,"caption.text"),likes:d.likes.count,comments:d.comments.count,location:this._getObjectProperty(d,"location.name")}),c+=h}for(O.innerHTML=c,n=[],i=0,o=O.childNodes.length;i<o;)n.push(O.childNodes[i]),i+=1;for(_=0,C=n.length;_<C;_++)T=n[_],r.appendChild(T)}else for($=0,E=m.length;$<E;$++){if(d=m[$],g=document.createElement("img"),u=d.images[this.options.resolution],"object"!=typeof u)throw s="No image found for resolution: "+this.options.resolution+".",new Error(s);f=u.url,l=window.location.protocol.indexOf("http")>=0,l&&!this.options.useHttp&&(f=f.replace(/https?:\/\//,"//")),g.src=f,!0===this.options.links?(e=document.createElement("a"),e.href=d.link,e.appendChild(g),r.appendChild(e)):r.appendChild(g)}if("string"==typeof(B=this.options.target)&&(B=document.getElementById(B)),null==B)throw s='No element with id="'+this.options.target+'" on page.',new Error(s);B.appendChild(r),a=document.getElementsByTagName("head")[0],a.removeChild(document.getElementById("instafeed-fetcher")),b="instafeedCache"+this.unique,window[b]=void 0;try{delete window[b]}catch(t){t}}return null!=this.options.after&&"function"==typeof this.options.after&&this.options.after.call(this),!0},t.prototype._buildUrl=function(){var t,e,o;switch(t="https://api.instagram.com/v1",this.options.get){case"popular":e="media/popular";break;case"tagged":if(!this.options.tagName)throw new Error("No tag name specified. Use the 'tagName' option.");e="tags/"+this.options.tagName+"/media/recent";break;case"location":if(!this.options.locationId)throw new Error("No location specified. Use the 'locationId' option.");e="locations/"+this.options.locationId+"/media/recent";break;case"user":if(!this.options.userId)throw new Error("No user specified. Use the 'userId' option.");e="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return o=t+"/"+e,null!=this.options.accessToken?o+="?access_token="+this.options.accessToken:o+="?client_id="+this.options.clientId,null!=this.options.limit&&(o+="&count="+this.options.limit),o+="&callback=instafeedCache"+this.unique+".parse"},t.prototype._genKey=function(){var t;return""+(t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)})()+t()+t()+t()},t.prototype._makeTemplate=function(t,e){var o,i,n,s,r;for(i=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,o=t;i.test(o);)s=o.match(i)[1],r=null!=(n=this._getObjectProperty(e,s))?n:"",o=o.replace(i,function(){return""+r});return o},t.prototype._getObjectProperty=function(t,e){var o,i;for(e=e.replace(/\[(\w+)\]/g,".$1"),i=e.split(".");i.length;){if(o=i.shift(),!(null!=t&&o in t))return null;t=t[o]}return t},t.prototype._sortBy=function(t,e,o){var i;return i=function(t,i){var n,s;return n=this._getObjectProperty(t,e),s=this._getObjectProperty(i,e),o?n>s?1:-1:n<s?1:-1},t.sort(i.bind(this)),t},t.prototype._filter=function(t,e){var o,i,n,s,r;for(o=[],i=function(t){if(e(t))return o.push(t)},n=0,r=t.length;n<r;n++)s=t[n],i(s);return o},t}(),function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof module&&module.exports?module.exports=e():t.Instafeed=e()}(this,function(){return t})}).call(this);var feed=new Instafeed({clientId:"2e29acc34bdb47d8982e9bb29992692c",get:"user",userId:"411060576",accessToken:"411060576.2e29acc.a52543b4c6704453a1f461d8fb7e97c6",links:!0,limit:3,resolution:"standard_resolution",template:'<li class="active"><a href="{{link}}"><div class="insta-logo"></div><img src={{image}} alt={{caption}}></a></li>'});feed.run();var insta_count=1;insta_timer();var timer,fadeSpeed=500;document.addEventListener("DOMContentLoaded",load,!1),$(function(){$(".nav-btn").on("click",function(){$(".nav-btn__open").removeClass("default_open"),$(".nav-btn__close").removeClass("default_close"),$("nav").toggleClass("close"),$(".nav-btn__close,.nav-btn__open").toggleClass("active"),$(".main-nav li").toggleClass("slidein")})}),$(function(){var t=$("header").offset().top;$(window).scroll(function(){var e=$(this).scrollTop();$("header").css("top",t+e/2)});var e=0;$(window).scroll(function(){var t=$(this).scrollTop();t>e?(console.log("move_bitTop"),$(".header-icon").removeClass("move_bitTop"),$(".header-icon").removeClass("move_bitDown"),$(".header-icon").addClass("move_bitTop")):(console.log("move_bitDown"),$(".header-icon").removeClass("move_bitTop"),$(".header-icon").removeClass("move_bitDown"),$(".header-icon").addClass("move_bitDown")),e=t})}),$(function(){$(".slider").slick({dots:!0,infinite:!0,speed:500,fade:!0,cssEase:"linear"})}),$(function(){$(".pop").click(function(t){t.preventDefault();$(".popup_wrapper").css({opacity:"0.0"}).animate({opacity:"1"},500);var e=$(this).attr("href");$(e).css("visibility","visible"),$(".popupbg").css("visibility","visible"),$(e).css("z-index","9999"),$(".close, .nav-btn").css("display","none"),$(".close_btn").click(function(){$(".popup_wrapper").css("visibility","hidden"),$(".popupbg").css("visibility","hidden"),$(".popup_wrapper").css("z-index","0"),$(".close, .nav-btn").css("display","block")})})}),$(function(){const t=Math.ceil($(".popupbg").outerHeight());t<Math.ceil($(".slick-list.draggable").outerHeight())&&$(".popup_wrapper, .slick-list.draggable").css("height",.9*t)}),$(function(){const t=Math.ceil($(".sec_02").height()/2);$("main").offset().top;$(window).on("scroll",function(){var e=$(window).scrollTop();t>e?$(".header-icon").css("opacity","1"):$(".header-icon").css("opacity","0")})});