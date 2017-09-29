// インスタテスト
(function(){var e;e=function(){function e(e,t){var n,r;this.options={target:"instafeed",get:"popular",resolution:"thumbnail",sortBy:"none",links:!0,mock:!1,useHttp:!1};if(typeof e=="object")for(n in e)r=e[n],this.options[n]=r;this.context=t!=null?t:this,this.unique=this._genKey()}return e.prototype.hasNext=function(){return typeof this.context.nextUrl=="string"&&this.context.nextUrl.length>0},e.prototype.next=function(){return this.hasNext()?this.run(this.context.nextUrl):!1},e.prototype.run=function(t){var n,r,i;if(typeof this.options.clientId!="string"&&typeof this.options.accessToken!="string")throw new Error("Missing clientId or accessToken.");if(typeof this.options.accessToken!="string"&&typeof this.options.clientId!="string")throw new Error("Missing clientId or accessToken.");return this.options.before!=null&&typeof this.options.before=="function"&&this.options.before.call(this),typeof document!="undefined"&&document!==null&&(i=document.createElement("script"),i.id="instafeed-fetcher",i.src=t||this._buildUrl(),n=document.getElementsByTagName("head"),n[0].appendChild(i),r="instafeedCache"+this.unique,window[r]=new e(this.options,this),window[r].unique=this.unique),!0},e.prototype.parse=function(e){var t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D;if(typeof e!="object"){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(e.meta.code!==200){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,e.meta.error_message),!1;throw new Error("Error from Instagram: "+e.meta.error_message)}if(e.data.length===0){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}this.options.success!=null&&typeof this.options.success=="function"&&this.options.success.call(this,e),this.context.nextUrl="",e.pagination!=null&&(this.context.nextUrl=e.pagination.next_url);if(this.options.sortBy!=="none"){this.options.sortBy==="random"?M=["","random"]:M=this.options.sortBy.split("-"),O=M[0]==="least"?!0:!1;switch(M[1]){case"random":e.data.sort(function(){return.5-Math.random()});break;case"recent":e.data=this._sortBy(e.data,"created_time",O);break;case"liked":e.data=this._sortBy(e.data,"likes.count",O);break;case"commented":e.data=this._sortBy(e.data,"comments.count",O);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}}if(typeof document!="undefined"&&document!==null&&this.options.mock===!1){m=e.data,A=parseInt(this.options.limit,10),this.options.limit!=null&&m.length>A&&(m=m.slice(0,A)),u=document.createDocumentFragment(),this.options.filter!=null&&typeof this.options.filter=="function"&&(m=this._filter(m,this.options.filter));if(this.options.template!=null&&typeof this.options.template=="string"){f="",d="",w="",D=document.createElement("div");for(c=0,N=m.length;c<N;c++){h=m[c],p=h.images[this.options.resolution];if(typeof p!="object")throw o="No image found for resolution: "+this.options.resolution+".",new Error(o);E=p.width,y=p.height,b="square",E>y&&(b="landscape"),E<y&&(b="portrait"),v=p.url,l=window.location.protocol.indexOf("http")>=0,l&&!this.options.useHttp&&(v=v.replace(/https?:\/\//,"//")),d=this._makeTemplate(this.options.template,{model:h,id:h.id,link:h.link,type:h.type,image:v,width:E,height:y,orientation:b,caption:this._getObjectProperty(h,"caption.text"),likes:h.likes.count,comments:h.comments.count,location:this._getObjectProperty(h,"location.name")}),f+=d}D.innerHTML=f,i=[],r=0,n=D.childNodes.length;while(r<n)i.push(D.childNodes[r]),r+=1;for(x=0,C=i.length;x<C;x++)L=i[x],u.appendChild(L)}else for(T=0,k=m.length;T<k;T++){h=m[T],g=document.createElement("img"),p=h.images[this.options.resolution];if(typeof p!="object")throw o="No image found for resolution: "+this.options.resolution+".",new Error(o);v=p.url,l=window.location.protocol.indexOf("http")>=0,l&&!this.options.useHttp&&(v=v.replace(/https?:\/\//,"//")),g.src=v,this.options.links===!0?(t=document.createElement("a"),t.href=h.link,t.appendChild(g),u.appendChild(t)):u.appendChild(g)}_=this.options.target,typeof _=="string"&&(_=document.getElementById(_));if(_==null)throw o='No element with id="'+this.options.target+'" on page.',new Error(o);_.appendChild(u),a=document.getElementsByTagName("head")[0],a.removeChild(document.getElementById("instafeed-fetcher")),S="instafeedCache"+this.unique,window[S]=void 0;try{delete window[S]}catch(P){s=P}}return this.options.after!=null&&typeof this.options.after=="function"&&this.options.after.call(this),!0},e.prototype._buildUrl=function(){var e,t,n;e="https://api.instagram.com/v1";switch(this.options.get){case"popular":t="media/popular";break;case"tagged":if(!this.options.tagName)throw new Error("No tag name specified. Use the 'tagName' option.");t="tags/"+this.options.tagName+"/media/recent";break;case"location":if(!this.options.locationId)throw new Error("No location specified. Use the 'locationId' option.");t="locations/"+this.options.locationId+"/media/recent";break;case"user":if(!this.options.userId)throw new Error("No user specified. Use the 'userId' option.");t="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return n=e+"/"+t,this.options.accessToken!=null?n+="?access_token="+this.options.accessToken:n+="?client_id="+this.options.clientId,this.options.limit!=null&&(n+="&count="+this.options.limit),n+="&callback=instafeedCache"+this.unique+".parse",n},e.prototype._genKey=function(){var e;return e=function(){return((1+Math.random())*65536|0).toString(16).substring(1)},""+e()+e()+e()+e()},e.prototype._makeTemplate=function(e,t){var n,r,i,s,o;r=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,n=e;while(r.test(n))s=n.match(r)[1],o=(i=this._getObjectProperty(t,s))!=null?i:"",n=n.replace(r,function(){return""+o});return n},e.prototype._getObjectProperty=function(e,t){var n,r;t=t.replace(/\[(\w+)\]/g,".$1"),r=t.split(".");while(r.length){n=r.shift();if(!(e!=null&&n in e))return null;e=e[n]}return e},e.prototype._sortBy=function(e,t,n){var r;return r=function(e,r){var i,s;return i=this._getObjectProperty(e,t),s=this._getObjectProperty(r,t),n?i>s?1:-1:i<s?1:-1},e.sort(r.bind(this)),e},e.prototype._filter=function(e,t){var n,r,i,s,o;n=[],r=function(e){if(t(e))return n.push(e)};for(i=0,o=e.length;i<o;i++)s=e[i],r(s);return n},e}(),function(e,t){return typeof define=="function"&&define.amd?define([],t):typeof module=="object"&&module.exports?module.exports=t():e.Instafeed=t()}(this,function(){return e})}).call(this);


var feed = new Instafeed({
    clientId: '2e29acc34bdb47d8982e9bb29992692c',
    get: 'user',
    userId: '411060576',
    accessToken:'411060576.2e29acc.a52543b4c6704453a1f461d8fb7e97c6',
    links: true,
    limit: 3, // 取得件数
    resolution:'standard_resolution', // thumbnail (default) - 150x150 | low_resolution - 306x306 | standard_resolution - 612x612
    template: '<li class="active"><a href="{{link}}"><div class="insta-logo"></div><img src={{image}} alt={{caption}}></a></li>' // 画像URL：{{image}} リンク：{{link}} キャプションテキスト{{caption}} いいね数：{{likes}} コメント数：{{comments}}
});
feed.run();

// insta高さ確認 + ２秒間隔で切り替え
var insta_count = 1;
insta_timer();

function insta_timer() {
  if ( insta_count < 3 ) {
    $('#instafeed li').removeClass('active');
    $('#instafeed li:nth-of-type(' + insta_count + ')').addClass('active');
    insta_count++;
  } else {
    $('#instafeed li').removeClass('active');
    $('#instafeed li:nth-of-type(' + insta_count + ')').addClass('active');
    insta_count = 1;
  }
  setTimeout('insta_timer()', 5000);
}



//5秒たったら消えるメニューバー
var timer;
var fadeSpeed = 500;

function countDown() {
  $("header h1,.nav-btn,nav").addClass("fadeOut");
  return true;
}
function restartTimer() {
  clearTimeout(timer);
  $("header h1,.nav-btn,nav").removeClass("fadeOut");
  timer = setTimeout('countDown()',5000);
  return true;
}

function load() {
  timer = setTimeout('countDown()',5000);
  document.body.addEventListener("mousedown", restartTimer, false);
  document.body.addEventListener("keypress", restartTimer, false);
  document.addEventListener("scroll", restartTimer, false);

}
document.addEventListener("DOMContentLoaded", load, false);




// メニューボタン開閉
$(function(){
  $('.nav-btn').on('click', function(){
    $('.nav-btn__open').removeClass('default_open');
    $('.nav-btn__close').removeClass('default_close');
    $('nav').toggleClass('close');
    $('.nav-btn__close,.nav-btn__open').toggleClass('active');
    $('.main-nav li').toggleClass('slidein');
  });
});



//TOPIMGパララックス
$(function() {
  var top = $('header').offset().top; //初期値を取得
  $(window).scroll(function() {
      var value = $(this).scrollTop(); //スクロールの値を取得
      $('header').css('top', top + value / 2);
  });

  //スクロールするとdivが動くよ
  var start_pos = 0;
  // var height = 50;
  $(window).scroll(function(){
    var current_pos = $(this).scrollTop();//スクロールの値を取得

    if (current_pos > start_pos) {
      // console.log('move_bitTop');
      $('.header-icon').removeClass('move_bitTop');
      $('.header-icon').removeClass('move_bitDown');
      $('.header-icon').addClass('move_bitTop');
    } else {
      // console.log('move_bitDown');
      $('.header-icon').removeClass('move_bitTop');
      $('.header-icon').removeClass('move_bitDown');
      $('.header-icon').addClass('move_bitDown');
    }
    start_pos = current_pos;
  });
  
});

//スクロールしたらナビボタン閉まるよ
$(window).scroll(function(){
  if($('nav').hasClass('close')){
//  console.log("閉じているよ！");
  }else{
    $('nav').toggleClass('close');
    $('.nav-btn__close').removeClass('active');
    $('.nav-btn__open').addClass('active');
  }
});

// slickここから
$(function(){
  $('.slider').slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear'
  });
});

$(function(){
  $('.pop').click(function(e){
    e.preventDefault();

    var fadeSpeed = 500;
    $(".popup_wrapper")
    .css({opacity: '0.0'})
    .animate({opacity: '1'}, fadeSpeed);

    var id = $(this).attr('href');
    $(id).css("visibility","visible");
    $(".popupbg").css("visibility","visible");
    $(id).css("z-index","9999");
    $(".close, .nav-btn").css("display","none");


  $(".close_btn").click(function(){
    $(".popup_wrapper").css("visibility","hidden");
    $(".popupbg").css("visibility","hidden");
    $(".popup_wrapper").css("z-index","0");
    $(".close, .nav-btn").css("display","block");
  })
  })
});


// slick高さ調整
$(function(){
  const a = Math.ceil($('.popupbg').outerHeight()),
        b = Math.ceil($('.slick-list.draggable').outerHeight());
  
  if ( a < b ){
    $('.popup_wrapper, .slick-list.draggable, .slick-track > div').css('height', a * 0.9);
  } else {
    $('.popupbg > div').css('top', '24%');
  }
});



// header-icon一定で消える
$(function(){
  const height = Math.ceil($('.sec_02').height() / 2),
        mainTop = $('main').offset().top + height;
  $(window).on('scroll', function () {
    var viewTop = $(window).scrollTop();
    if (height > viewTop) {
      $('.header-icon').css('opacity', '1');
    } else {
      $('.header-icon').css('opacity', '0');
    }
  });
});




// videoタグ横幅縦幅リサイズ
$(function() {
  var getHeight = function() {
    // 縦横のサイズを取得
    var windowHeight = $(window).outerHeight(),
        windowWidth = $(window).outerWidth();

    var videoHeight = Math.floor($('video').height()),
        videoWidth = Math.floor($('video').width());

    var topMargin = 0 - (videoHeight - windowHeight) / 2,
        leftMargin = 0 - (videoWidth - windowWidth) / 2;

    console.log(windowHeight,windowWidth,videoHeight,videoWidth,topMargin,leftMargin);


    if (videoWidth > windowWidth) {
      $('video').css('left', leftMargin);
    } else {
      $('video').css('left', 0);
    }
    if (videoHeight > windowHeight) {
      $('video').css('top', topMargin);
    } else {
      $('video').css('top', 0);
    }
  };

  // 以下画面の可変にも対応できるように。
  $(window).on('load', function(){
    getHeight();
  });

  $(window).on('resize', function(){
    getHeight();
  });
});


