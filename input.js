const inputBtn = document.querySelector('#inputBtn');

function userWantInput() {
    console.log('input');
}

function init() {
    inputBtn.addEventListener('click', userWantInput);
}
init();