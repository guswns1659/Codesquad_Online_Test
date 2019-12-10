const inputBtn = document.querySelector('.js-inputBtn');


const userWantInput = function() {
    input.askTeam1();
    input.askTeam2();
}

input ={
    teamName : [],
    team1BatName : [],
    team2BatName : [],
    team1BatAvg : [],
    team2BatAvg : [],
    team1BatOrder: 1,
    team2BatOrder: 1
};

// team1에게 팀 이름, 타자 정보를 묻는 메소드
input.askTeam1 = function() {
    const teamName = prompt(`1팀의 이름을 입력해주세요 ex) SK와이번즈`);
    this.teamName.push(teamName);
    for(let i = 0; i<2; i++){
        let batName = prompt(`1팀의 ${i+1}번 선수의 이름을 입력해주세요.ex) 양준혁`)
        this.team1BatName.push(batName);
        let batAvg = (Number(prompt(`1팀의 ${i+1}번 선수의 (타율X1000)을 입력해주세요\n` +
        `ex)333\n주의)101~499 사이 숫자만 입력하세요.`))/1000);
        batAvg = this.excpAvg(batAvg, i, 1);
        this.team1BatAvg.push(batAvg);
    }
}

// team2에게 팀 이름, 타자 정보를 묻는 메소드
input.askTeam2 = function() {
    const teamName = prompt(`2팀의 이름을 입력해주세요 ex) SK와이번즈`);
    this.teamName.push(teamName);
    for(let i = 0; i<2; i++){
        let batName = prompt(`2팀의 ${i+1}번 선수의 이름을 입력해주세요.ex) 양준혁`)
        this.team2BatName.push(batName);
        let batAvg = (Number(prompt(`2팀의 ${i+1}번 선수의 (타율X1000)을 입력해주세요\n` +
        `ex)333\n주의)101~499 사이 숫자만 입력하세요.`))/1000);
        batAvg = this.excpAvg(batAvg, i, 2);
        this.team2BatAvg.push(batAvg);
    }
}

// 타율 0.101 ~ 0.499 벗어난 값 예외처리
input.excpAvg = function(batAvg, num, num2) {
    while(batAvg < 0.101 || batAvg > 0.499){
        alert(`101 ~ 499 사이 숫자만 입력해주세요`);
        batAvg = (Number(prompt(`${num2}팀의 ${num+1}번 선수의 (타율X1000)을 입력해주세요\n` +
        `ex)333\n주의)101~499 사이 숫자만 입력하세요.`)) / 1000);
    }
    return batAvg;
}

// 팀 데이터 입력 핸들러 함수
function init() {
    inputBtn.addEventListener('click', userWantInput);
}
init()