const btnContainer = document.querySelector('.btnContainer'),
    inputBtn = btnContainer.querySelector('.js-inputBtn');

// alert(`야구 게임을 시작해볼까요?\n먼저 팀 데이터를 입력해주세요`);

const input = {
    teamName : [],
    team1batName : [],
    team1batAvg : [],
    team2batName : [],
    team2batAvg : [],
    team1Order: 1,
    team2Order: 1
};

function init() {
    inputBtn.addEventListener('click', input.userWantInput);    
}

input.userWantInput = function() {
    _input = input;
    _input.askTeam1();
    _input.askTeam2();
}

input.askTeam1 = function() {
    this.teamName[0] = prompt(`1팀 이름을 입력해주세요 ex) SK와이번즈`);
    for(let i = 0; i<2; i++){
        batName = prompt(`1팀 ${i+1}번 선수의 이름을 입력해주세요! ex) 양준혁`);
        batAvg = (Number(prompt(`1팀 ${i+1}번 선수의 (타율x1000)을 입력해주세요! ex) 312` + 
        `\n예시) 312\n주의) 101~499 사이 숫자만 입력하세요.`)) / 1000);
        batAvg = this.askCorrectAvg(batAvg, (i+1));
        input.team1batName.push(batName);
        input.team1batAvg.push(batAvg);
    }
}

input.askTeam2 = function() {
    this.teamName[1] = prompt(`2팀 이름을 입력해주세요 ex) SK와이번즈`);
    for(let i = 0; i<2; i++){
        batName = prompt(`2팀 ${i+1}번 선수의 이름을 입력해주세요! ex) 양준혁`);
        batAvg = (Number(prompt(`2팀 ${i+1}번 선수의 (타율x1000)을 입력해주세요! ex) 312` + 
        `\n예시) 312\n주의) 101~499 사이 숫자만 입력하세요.`)) / 1000);
        batAvg = this.askCorrectAvg(batAvg, (i+1));
        input.team2batName.push(batName);
        input.team2batAvg.push(batAvg);
    }
}

// 입력된 타율이 범위 벗어날 때 예외처리
input.askCorrectAvg = function(batAvg, num) {
    while(batAvg < 0.101 || batAvg > 0.499){
        alert(`101~499 사이 숫자만 입력가능합니다.`);
        batAvg = (Number(prompt(`1팀 ${num}번 선수의 (타율x1000)을 입력해주세요! ex) 312` + 
        `\n예시) 312\n주의) 101~499 사이 숫자만 입력하세요.`)) / 1000);
    }
    return batAvg;
}


init()