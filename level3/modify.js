const modifyBtn = document.querySelector('.js-modifyBtn');

// 사용자가 수정을 원할 때 실행을 도와주는 메소드
const userWantModify = function() {
    const askNum = modify.askTouser();
    if(askNum === 1){
        modify.readyModify();
    } else if (askNum === 3){
    } else {
        alert(`1과 3중에 입력해주세요`);
        userWantModify();
    }
}

modify = {};

modify.askTouser = function() {
    const askNum = Number(prompt(`수정을 원하면 1\n` + 
    `아니면 3을 눌러주세요`));
    return askNum;
}

modify.readyModify = function() {
    input.teamName = [];
    input.team1BatName = [];
    input.team2BatName = [];
    input.team1BatAvg = [];
    input.team2BatAvg = [];
    userWantInput();
}



function init() {
    modifyBtn.addEventListener('click', userWantModify);
}
init()