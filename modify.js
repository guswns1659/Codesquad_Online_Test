const modifyBtn = document.querySelector('#modifyBtn');

function userWantModify() {
    console.log('modify');
}

function init(){
    modifyBtn.addEventListener('click', userWantModify);
}
init()