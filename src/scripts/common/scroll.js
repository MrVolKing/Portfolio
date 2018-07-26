$(function(){
  $('.arrow_upsvg').click(function(){
  	$('html,body').animate({scrollTop: 0}, 1000);
  });
});


// $(".arrow_downsvg").click(function(){
//     $("html, body").animate({scrollTop:0},"slow")
//    })
//    $(".arrow_downsvg").click(function(){
//     $("html, body").animate({scrollTop:$(document).height()},"slow")
//    });


 
// var screen = $(function(){
//   $(window).resize(function() {
//         alert( $(window).height() );
//   })
// })

   $(".arrow_downsvg").click(function (){
    var screen = $(window).height();
    $('html, body').scrollTop( screen );
    ;
  });


   