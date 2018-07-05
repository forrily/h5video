
$(document).ready(function(){
  console.log('pagebeforechange');
  $(window).on("orientationchange",function(){
    if(window.orientation==0){
      console.log('竖屏',window.orientation);
      $('#model').css("display","flex");//显示提示框
      //暂停视频
    }else{
      console.log('横屏');
      console.log(window.orientation)
    }
  })
});


//   //设置横屏
//   function acquiring() {
//     var orientation = window.orientation;
//     if( orientation != 0 ) {
//       $( "#model" ).css( "display", "none" );
//     } else {
//       $( "#model" ).css( "display", "flex" );
//     }
//   }

// } )

