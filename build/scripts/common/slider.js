const slides = document.querySelectorAll('#slides .slide');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const controls = document.querySelectorAll('controls');

let currentSlide = 0;

// Осуществляет переход к слайду номер п (от нулевого)
function goToSlide(n){
    slides[currentSlide].className = 'slide';
    currentSlide = (n+slides.length)%slides.length;//Остаток от деления
    slides[currentSlide].className = 'slide showing';
}

//Навешивает обработчики на элементы next и previous
function setupListners(){
    next.onclick = function(){
        goToSlide(currentSlide+1);
    }
    previous.onclick = function(){
        goToSlide(currentSlide-1);
    }
}

// Показывает кнопки для навигации
function showButtons() {
    for(var i=0; i<controls.length; i++){
        controls[i].style.display = 'inline-block';
    }
}

//Инициализация слайдера
function sliderInit(){
    if(slides.length !== 0){
        setupListners();
        showButtons();
    }
}

module.exports = sliderInit;


