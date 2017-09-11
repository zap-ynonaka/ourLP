function countDown(){return console.log("成功！"),!0}function restartTimer(){return clearTimeout(timer),console.log(2,timer),timer=setTimeout("countDown()",5e3),console.log(2,timer),!0}function load(){timer=setTimeout("countDown()",5e3),document.body.addEventListener("mousedown",restartTimer,!1),document.body.addEventListener("keypress",restartTimer,!1)}(function(){var t;t=function(){function t(t,e){var o,n;if(this.options={target:"instafeed",get:"popular",resolution:"thumbnail",sortBy:"none",links:!0,mock:!1,useHttp:!1},"object"==typeof t)for(o in t)n=t[o],this.options[o]=n;this.context=null!=e?e:this,this.unique=this._genKey()}return t.prototype.hasNext=function(){return"string"==typeof this.context.nextUrl&&this.context.nextUrl.length>0},t.prototype.next=function(){return!!this.hasNext()&&this.run(this.context.nextUrl)},t.prototype.run=function(e){var o,n,i;if("string"!=typeof this.options.clientId&&"string"!=typeof this.options.accessToken)throw new Error("Missing clientId or accessToken.");if("string"!=typeof this.options.accessToken&&"string"!=typeof this.options.clientId)throw new Error("Missing clientId or accessToken.");return null!=this.options.before&&"function"==typeof this.options.before&&this.options.before.call(this),"undefined"!=typeof document&&null!==document&&(i=document.createElement("script"),i.id="instafeed-fetcher",i.src=e||this._buildUrl(),o=document.getElementsByTagName("head"),o[0].appendChild(i),n="instafeedCache"+this.unique,window[n]=new t(this.options,this),window[n].unique=this.unique),!0},t.prototype.parse=function(t){var e,o,n,i,r,s,a,c,l,p,u,h,d,f,m,g,y,w,b,k,v,E,I,_,x,N,T,B,C,j,O;if("object"!=typeof t){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(200!==t.meta.code){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,t.meta.error_message),!1;throw new Error("Error from Instagram: "+t.meta.error_message)}if(0===t.data.length){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}if(null!=this.options.success&&"function"==typeof this.options.success&&this.options.success.call(this,t),this.context.nextUrl="",null!=t.pagination&&(this.context.nextUrl=t.pagination.next_url),"none"!==this.options.sortBy)switch(C="random"===this.options.sortBy?["","random"]:this.options.sortBy.split("-"),B="least"===C[0],C[1]){case"random":t.data.sort(function(){return.5-Math.random()});break;case"recent":t.data=this._sortBy(t.data,"created_time",B);break;case"liked":t.data=this._sortBy(t.data,"likes.count",B);break;case"commented":t.data=this._sortBy(t.data,"comments.count",B);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}if("undefined"!=typeof document&&null!==document&&!1===this.options.mock){if(m=t.data,T=parseInt(this.options.limit,10),null!=this.options.limit&&m.length>T&&(m=m.slice(0,T)),s=document.createDocumentFragment(),null!=this.options.filter&&"function"==typeof this.options.filter&&(m=this._filter(m,this.options.filter)),null!=this.options.template&&"string"==typeof this.options.template){for(c="",d="","",O=document.createElement("div"),p=0,I=m.length;p<I;p++){if(u=m[p],"object"!=typeof(h=u.images[this.options.resolution]))throw r="No image found for resolution: "+this.options.resolution+".",new Error(r);b=h.width,y=h.height,w="square",b>y&&(w="landscape"),b<y&&(w="portrait"),f=h.url,l=window.location.protocol.indexOf("http")>=0,l&&!this.options.useHttp&&(f=f.replace(/https?:\/\//,"//")),d=this._makeTemplate(this.options.template,{model:u,id:u.id,link:u.link,type:u.type,image:f,width:b,height:y,orientation:w,caption:this._getObjectProperty(u,"caption.text"),likes:u.likes.count,comments:u.comments.count,location:this._getObjectProperty(u,"location.name")}),c+=d}for(O.innerHTML=c,i=[],n=0,o=O.childNodes.length;n<o;)i.push(O.childNodes[n]),n+=1;for(v=0,_=i.length;v<_;v++)N=i[v],s.appendChild(N)}else for(E=0,x=m.length;E<x;E++){if(u=m[E],g=document.createElement("img"),h=u.images[this.options.resolution],"object"!=typeof h)throw r="No image found for resolution: "+this.options.resolution+".",new Error(r);f=h.url,l=window.location.protocol.indexOf("http")>=0,l&&!this.options.useHttp&&(f=f.replace(/https?:\/\//,"//")),g.src=f,!0===this.options.links?(e=document.createElement("a"),e.href=u.link,e.appendChild(g),s.appendChild(e)):s.appendChild(g)}if("string"==typeof(j=this.options.target)&&(j=document.getElementById(j)),null==j)throw r='No element with id="'+this.options.target+'" on page.',new Error(r);j.appendChild(s),a=document.getElementsByTagName("head")[0],a.removeChild(document.getElementById("instafeed-fetcher")),k="instafeedCache"+this.unique,window[k]=void 0;try{delete window[k]}catch(t){t}}return null!=this.options.after&&"function"==typeof this.options.after&&this.options.after.call(this),!0},t.prototype._buildUrl=function(){var t,e,o;switch(t="https://api.instagram.com/v1",this.options.get){case"popular":e="media/popular";break;case"tagged":if(!this.options.tagName)throw new Error("No tag name specified. Use the 'tagName' option.");e="tags/"+this.options.tagName+"/media/recent";break;case"location":if(!this.options.locationId)throw new Error("No location specified. Use the 'locationId' option.");e="locations/"+this.options.locationId+"/media/recent";break;case"user":if(!this.options.userId)throw new Error("No user specified. Use the 'userId' option.");e="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return o=t+"/"+e,null!=this.options.accessToken?o+="?access_token="+this.options.accessToken:o+="?client_id="+this.options.clientId,null!=this.options.limit&&(o+="&count="+this.options.limit),o+="&callback=instafeedCache"+this.unique+".parse"},t.prototype._genKey=function(){var t;return""+(t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)})()+t()+t()+t()},t.prototype._makeTemplate=function(t,e){var o,n,i,r,s;for(n=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,o=t;n.test(o);)r=o.match(n)[1],s=null!=(i=this._getObjectProperty(e,r))?i:"",o=o.replace(n,function(){return""+s});return o},t.prototype._getObjectProperty=function(t,e){var o,n;for(e=e.replace(/\[(\w+)\]/g,".$1"),n=e.split(".");n.length;){if(o=n.shift(),!(null!=t&&o in t))return null;t=t[o]}return t},t.prototype._sortBy=function(t,e,o){var n;return n=function(t,n){var i,r;return i=this._getObjectProperty(t,e),r=this._getObjectProperty(n,e),o?i>r?1:-1:i<r?1:-1},t.sort(n.bind(this)),t},t.prototype._filter=function(t,e){var o,n,i,r,s;for(o=[],n=function(t){if(e(t))return o.push(t)},i=0,s=t.length;i<s;i++)r=t[i],n(r);return o},t}(),function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof module&&module.exports?module.exports=e():t.Instafeed=e()}(this,function(){return t})}).call(this);var feed=new Instafeed({clientId:"2e29acc34bdb47d8982e9bb29992692c",get:"user",userId:"411060576",accessToken:"411060576.2e29acc.a52543b4c6704453a1f461d8fb7e97c6",links:!0,limit:3,resolution:"standard_resolution",template:'<li><a href="{{link}}"><img src={{image}} alt={{caption}}></a></li>'});feed.run();var timer;document.addEventListener("DOMContentLoaded",load,!1),$(function(){$(".nav-btn").on("click",function(){$("nav").toggleClass("close")})});