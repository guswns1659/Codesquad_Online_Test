const modifyBtn = btnContainer.querySelector('.js-modifyBtn');

const modify ={};

function init() {
    modifyBtn.addEventListener('click', modify.userWantModify)
}

// 팀 데이터 수정 버튼 핸들러 함수 
modify.userWantModify = function() {
    _modify = modify;
    _modify.askWantModify();
}

// 사용자에게 수정 원하는지 묻는 메소드
modify.askWantModify = function() {
    askNum = Number(prompt(`팀 데이터 수정을 원하면 1을`+
    `\n아니면 3을 입력해주세요`));
    if(askNum === 1){
        this.initInput();
    } else if(askNum === 3){
    } else {
        alert(`1과 3 중에 입력해주세요`);
    }
}

// 수정을 원할 때 팀 정보를 초기화하는 메소드
modify.initInput = function () {
    input.teamName = [];
    input.team1batName = [];
    input.team2batName = [];
    input.team1batAvg = [];
    input.team2batAvg = [];
    input.userWantInput();
}

init()
