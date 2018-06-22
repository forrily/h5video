var $play = document.getElementById( "play" );
var $pause = document.getElementById( "pause" );
var $video = document.getElementById( "video" );
var movie1 = 3.196909;
// $play.onclick = function ()
// {
//   $video.play();
// }
// $pause.onclick = function ()
// {
//   $video.pause();
// }

//手机适配居中
var clientWidth = document.documentElement.clientWidth;
var clientHeight = document.documentElement.clientHeight;
$video.style.width = clientWidth + "px";
$video.style.height = clientHeight + "px";
//判断手机系统
var isAndroid = 0;
function AndroidOriOS() {
  var ua = navigator.userAgent.toLowerCase();
  if( /iphone|ipad|ipod|iOS/.test( ua ) ) {
    isAndroid = 1;
    console.log( navigator.userAgent );
  } else if( /android/.test( ua ) ) {
    isAndroid = 2;
    console.log( navigator.userAgent );
  }
}
//阻止视频上的默认点击
function stopDefault() {
  $video.click( function ( event ) {
    console.log( event );
    event.preventDefault();
  } );
  $video.on("touchstart", function ( event ) {
    event.preventDefault();
  } );
}

// 视频暂停位置do sth
$( function () {
  console.log('视频暂停位置do sth')
  $video = $( "#video" );
  // $fingerprint = $("#fingerprint");
  stopDefault();
  // 阻止video 默认点击
  AndroidOriOS();
  //判断 ios OR an
  acquiring();
  loading();
  var evt = "onorientationchange" in window ? "orientationchange" : "resize";
  window.addEventListener( evt, acquiring, false );
  $( "#section0>.loader" ).click( function () {
    console.log( "#section0>.loader.click" )
    $( "#section0" ).hide();
    $( "#section1" ).css('display','flex');
    $video.play();
    // $( "#section1" ).show();
  } );
  $video.on( "timeupdate", function () {
    timeupdate( this );
  } ).on( "ended", ended );
} );

//预加载
var sourceArr = [
  'img/weishu_background2.png',
]; //需要加载的资源列表
function loading() {
  new mo.Loader( sourceArr, {
    loadType: 1,
    minTime: 1000,
    onLoading: function ( count, total ) {
      // console.log( 'onloading:single loaded:', arguments )
    },
    onComplete: function () {
      console.log( 'oncomplete:all source loaded:', arguments )
      document.getElementById( 'section0' ).style.display = "flex";
      // $( "#section0" ).show();      
      // $( "#section1" ).show();
    }
  } );
}

// 监听页面点击
// $( "#section0>.loader" ).click( function () {
//   show_video();
//   console.log( '点击了开始按钮' );
//   $video.play();
// } )
document.getElementById( 'section0' ).addEventListener( 'click', function () {
  document.getElementById( 'section0' ).style.display = "none";
  show_video();
  console.log( '点击了开始按钮' );
  $video.play();
} )

//监听视频播放
video.addEventListener( 'timeupdate', function ( self ) {
  console.log( video.currentTime ) // 当前播放的进度
  var currentTime = video.currentTime.toFixed( 5 );
  if( currentTime >= movie1 ) {
    $video.pause();
    var parent = document.getElementById( "parent" );
    var div = document.createElement( "div" );
    div.setAttribute( "id", "newDiv" );
    div.innerHTML = "点击继续";
    fadeIn( document.getElementById( "fingerprint_txt1" ) );
    parent.appendChild( div );
    var neeDiv = document.getElementById( 'newDiv' );
    neeDiv.onclick = function () {
      fadeOut( document.getElementById( "fingerprint_txt1" ) );
      movie1 = 9;
      $video.play();
    }
  }
} )

// fade in
function fadeIn( el, display ) {
  el.style.opacity = 0;
  el.style.display = display || "block";

  ( function fade() {
    var val = parseFloat( el.style.opacity );
    if( !( ( val += .1 ) > 1 ) ) {
      el.style.opacity = val;
      requestAnimationFrame( fade );
    }
  } )();
}
// fade out

function fadeOut( el ) {
  el.style.opacity = 1;
  ( function fade() {
    if( ( el.style.opacity -= .1 ) < 0 ) {
      el.style.display = "none";
    } else {
      requestAnimationFrame( fade );
    }
  } )();
}
//end
function ended() {
  $( "#mask" ).css( "display", "flex" );
}

function show_video() {
  document.getElementById( "section1" ).style.display = "flex";
}


//监听是否微信浏览器
document.addEventListener( "WeixinJSBridgeReady", function () {
  alert( "player enterfullscreen" );
  document.getElementById( 'section0' ).style.display = "none";
  show_video();
  console.log( '点击了开始按钮' );
  // $( '#video' ).play();
}, false );

// 点击继续

video.addEventListener( 'ended', function ( e ) {
  // 播放结束时触发
} )
//设置横屏
function acquiring() {
  // 获取设备宽高
  /*
   var h = document.documentElement.clientHeight, w = document.documentElement.clientWidth, hint = h > w, ntransform_origin = w / 2;
   if (hint) {
   //竖屏
   $(".container").css({
   height: w,
   width: h,
   transform: "rotate(90deg)",
   "transform-origin": ntransform_origin
   });
   } else {
   //横屏
   $(".container").css({
   height: h,
   width: w,
   "transform-origin": 0,
   transform: "rotate(0deg)"
   });
   }
   */
  var orientation = window.orientation;
  if( orientation != 0 ) {
    document.getElementById( "model" ).style.display = "none";
  } else {
    document.getElementById( "model" ).style.display = "flex";
  }

}


//判断访问终端
// var browser={
//   versions:function(){
//       var u = navigator.userAgent, app = navigator.appVersion;
//       return {
//           trident: u.indexOf('Trident') > -1, //IE内核
//           presto: u.indexOf('Presto') > -1, //opera内核
//           webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
//           gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
//           mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
//           ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
//           android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
//           iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
//           iPad: u.indexOf('iPad') > -1, //是否iPad
//           webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
//           weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
//           qq: u.match(/\sQQ/i) == " qq" //是否QQ
//       };
//   }(),
//   language:(navigator.browserLanguage || navigator.language).toLowerCase()
// }