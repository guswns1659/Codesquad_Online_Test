const checkBtn = document.querySelector('#checkBtn');

function userWantCheck() {
    console.log('check');
}

function init() {
    checkBtn.addEventListener('click', userWantCheck);
}
init()