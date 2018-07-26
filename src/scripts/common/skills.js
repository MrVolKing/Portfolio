const intElemScrollHeight = document.getElementById("header").scrollHeight;
const skill = document.getElementById("circle__second");



(function skillsstyle(){
    if(intElemScrollHeight > 0){
        skill.classList.add('circle-90');
    }
})();


$(function(){
    var screen = $(window).height();
    if(screen > $(window).height()){
        skill.classList.add('circle-90');
    }
    
});
