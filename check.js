const checkBtn = btnContainer.querySelector('.js-checkBtn'),
    team1Info = document.querySelector('.team1Info'),
    team2Info = document.querySelector('.team2Info');

const check = {
    printStr : ''
};

function init() {
    checkBtn.addEventListener('click', check.userWantCheck);
}

// 팀 데이터 확인 버튼 핸들러 함수
check.userWantCheck = function() {
    _check = check;
    _check.printTeam1();    
    _check.printTeam2();
}

// team1 데이터 출력하는 메소드
check.printTeam1 = function() {
    this.printStr += `${input.teamName[0]}팀! 선수명단<br><br>`;
    for(let i = 0; i<input.team1batName.length; i++){
        const batName = input.team1batName;
        const batAvg = input.team1batAvg;
        this.printStr += `${i+1}번 : ${batName[i]} / ${batAvg[i]}<br>`;
    }
    team1Info.innerHTML = this.printStr;
    this.printStr = '';
}

// team2 데이터 출력하는 메소드
check.printTeam2 = function() {
    this.printStr += `${input.teamName[1]}팀! 선수명단<br><br>`;
    for(let i = 0; i<input.team2batName.length; i++){
        const batName = input.team2batName;
        const batAvg = input.team2batAvg;
        this.printStr += `${i+1}번 : ${batName[i]} / ${batAvg[i]}<br>`;
    }
    team2Info.innerHTML = this.printStr;
    this.printStr = '';
}

init()