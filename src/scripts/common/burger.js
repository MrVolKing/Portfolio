const humburger = document.getElementById('humburger');
const wrapper = document.getElementById('wrapper');
const wrapperleft = document.getElementById('wrapper__left');
const wrapperright = document.getElementById('wrapper__right');
const fulmenu = document.getElementById('fulmenu');
const burgerline2 = document.getElementById('line2');
const burgerline1 = document.getElementById('line1');
const burgerline3 = document.getElementById('line3');


humburger.addEventListener('click', () => {
    wrapper.classList.toggle('wrapper-visible');
    wrapperleft.classList.toggle('wrapper__left-visible');
    wrapperright.classList.toggle('wrapper__right-visible');
    burgerline2.classList.toggle('line-hidden');
    burgerline1.classList.toggle('line1-transform');
    burgerline3.classList.toggle('line3-transform');
    // fulmenu.classList.remove('fulmenu-visible');
});

function showmenu() {
    fulmenu.classList.toggle('fulmenu-visible');
};

$("#humburger").click(() => {
    if (fulmenu.classList.contains('fulmenu-visible')){
        showmenu();
    } 
    else {
        setTimeout(showmenu, 1000);
        
    }
});

