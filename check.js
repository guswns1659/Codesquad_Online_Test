const checkBtn = document.querySelector('.js-checkBtn'),
    printTeam1 = document.querySelector('.printTeam1'),
    printTeam2 = document.querySelector('.printTeam2');

// 팀 데이터 확인 핸들러 함수
const userWantCheck = function () {
    check.team1();
    check.team2();
}

// check 객체
// 입력된 팀 데이터 확인하는 기능
check = {
    printStr : ''
};

// team1의 입력 정보를 출력하는 메소드
check.team1 = function() {
    this.printStr += `${input.teamName[0]}팀! 선수정보<br>`;
    for(let i = 0; i<input.team1BatName.length; i++){
        this.printStr += `${i+1}번 선수 : ${input.team1BatName[i]} / ${input.team1BatAvg[i]}<br>`;
    }
    printTeam1.innerHTML = this.printStr;
    this.printStr = '';
}

// team1의 입력 정보를 출력하는 메소드
check.team2 = function() {
    this.printStr += `${input.teamName[1]}팀! 선수정보<br>`;
    for(let i = 0; i<input.team2BatName.length; i++){
        this.printStr += `${i+1}번 선수 : ${input.team2BatName[i]} / ${input.team2BatAvg[i]}<br>`;
    }
    printTeam2.innerHTML = this.printStr;
    this.printStr = '';
}

function init() {
    checkBtn.addEventListener('click', userWantCheck);
}
init();