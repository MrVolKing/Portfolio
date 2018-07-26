{
var sk = document.getElementById("slideshow-container");
// нужно сделать проверку если есть контейнер то нужно выполнять проверку если нет контейнера на транице то скрипт не будет ыполняться
if (sk){
  var daughters = document.getElementsByClassName("works-slider");
var next = document.getElementById("slidnext");
var prev = document.getElementById("slidprev");
var currentSlide = 0;

// null
// undefined
// NaN
// 0
// ''
// false



next.addEventListener('click', () => {
  console.log('curren-1', currentSlide);
  currentSlide++;
  
  

  for (let i = 0; i < daughters.length; i++) {
    daughters[i].classList.remove('active');
  }
  if (currentSlide === daughters.length){
    currentSlide = 0;
  }
  
  daughters[currentSlide].classList.add('active');
  console.log('curren-2', currentSlide);

});

prev.addEventListener('click', () => {
  currentSlide--;
  

  for (let i = 0; i < daughters.length; i++) {
    daughters[i].classList.remove('active');
  }
  if (currentSlide === -1){
    currentSlide = daughters.length - 1;
  }
  
  daughters[currentSlide].classList.add('active');
  console.log(currentSlide);

});

}



};
