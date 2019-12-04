// Step2
// by Hyunjun
// 2019.12.04

// 현재 이닝 수와 타자의 이름을 출력할 때 사용하는 HTML elements
const attackOutput0 = document.querySelector('.attackOutput'), // 1회초 00팀 공격 출력 
    attackOutput = attackOutput0.querySelector('p'); // 1회초 00팀 공격 출력 
const inningOuput0 = document.querySelector('.inningOuput'), // 게임 결과 출력
    inningOuput = inningOuput0.querySelector('p'); // 게임 결과 출력

// team1과 team2의 선수 목록 출력할 때 사용하는 HTML elements
const team1Output0 = document.querySelector('.team1Output'), // Team1 output
    team1Output = team1Output0.querySelector('p');
const team2Output0 = document.querySelector('.team2Output'), // Team2 output
    team2Output = team2Output0.querySelector('p');

//볼 컨디션을 모은 배열
const CONDITION_LIST = ['STRIKE', 'BALL', 'HIT', 'OUT']

// info객체
// team1과 team2 선수들의 이름과 타율을 저장 
info = {
    batterName1: [],
    battingAvg1: [],
    batterName2: [],
    battingAvg2: [],
    askCount: 1
};

// 사용자의 팀 데이터 입력을 도와주는 메소드
info.userWantInput = function () {
    if (this.askCount != 1) {
        alert('이미 팀 데이터를 입력했습니다.' +
            '\n수정을 원하면 팀 데이터 수정 클릭해주세요!');
    } else {
        this.askTeamName();
        this.askBatterInfo();
        this.askTeamName();
        this.askBatterInfo();
    }
}

// 팀이름 입력을 요청하는 메소드
info.askTeamName = function () {
    if (this.askCount === 1) {
        this.teamName1 = prompt('1팀의 이름을 입력하세요. ex) SK 와이번즈');
    } else {
        this.teamName2 = prompt('2팀의 이름을 입력하세요. ex) 삼성 라이온즈');
    }
}

// 타자 이름 입력을 요청하는 메소드
info.askBatterInfo = function () {
    if (this.askCount == 1) {
        this.askToTeam1();
    } else {
        this.askToTeam2();
    }
    this.askCount++;
}

// Team1에게 타자 정보를 물어보는 메소드
info.askToTeam1 = function () {
    for (let i = 0; i < 7; i++) {
        let batterName = prompt(`1팀의 ${i + 1}번 타자의 '이름'을 입력하세요! ex) 양준혁`);
        let battingAvg = (Number(prompt(`1팀의 ${i + 1}번 타자의 ('타율' X 1000)을 입력하세요!
        예시) 333
        주의) 101 ~ 499만 입력 가능`)) / 1000);
        while (battingAvg < 0.101 || battingAvg > 0.499) {
            alert('101 ~ 499 사이 숫자만 입력해주세요');
            battingAvg = (Number(prompt(`팀의 ${i + 1}번 타자의 ('타율' X 1000)을 입력하세요!
            예시) 333
            주의) 101 ~ 499만 입력 가능`)) / 1000);
        }
        this.batterName1.push(batterName);
        this.battingAvg1.push(battingAvg);
    }
}

// Team2에게 타자 정보 물어보는 메소드
info.askToTeam2 = function () {
    for (let i = 0; i < 7; i++) {
        let batterName = prompt(`2팀의 ${i + 1}번 타자의 '이름'을 입력하세요! ex) 양준혁`);
        let battingAvg = (Number(prompt(`2팀의 ${i + 1}번 타자의 ('타율' X 1000)을 입력하세요!
        예시) 333
        주의) 101 ~ 499만 입력 가능`)) / 1000);
        while (battingAvg < 0.101 || battingAvg > 0.499) {
            alert('101 ~ 499 사이 숫자만 입력해주세요');
            battingAvg = (Number(prompt(`2팀의 ${i + 1}번 타자의 ('타율' X 1000)을 입력하세요!
            예시) 333
            주의) 101 ~ 499만 입력 가능`)) / 1000);
        }
        this.batterName2.push(batterName);
        this.battingAvg2.push(battingAvg);
    }
}

// 사용자가 팀 데이터 출력을 원할 때 기능하는 메소드
info.userWantOutput = function () {
    if (this.askCount === 1) {
        alert('현재 입력된 데이터가 없습니다!\n\n먼저 팀 데이터를 입력해주세요!!');
    } else if (this.askCount != 1) {
        this.printTeam1Info();
        this.printTeam2Info();
        this.askCount++;
    }
}

// Team1 이름, 타자 정보 출력하는 메소드
info.printTeam1Info = function () {
    this.printCopyText(info.teamName1, info.batterName1, info.battingAvg1, team1Output);
}
// Team2 이름, 타자 정보 출력하는 메소드
info.printTeam2Info = function () {
    this.printCopyText(info.teamName2, info.batterName2, info.battingAvg2, team2Output);
}

// 반복되는 출력 코드 모아놓은 메소드
info.printCopyText = function (teamname, batterName, battingAvg, output) {
    let outputText = '';
    let name = teamname;
    let batter = batterName;
    let batting = battingAvg;
    let outputHTML = output;
    outputText += `${name}팀 정보!!<br>`;
    for (let i = 0; i < batter.length; i++) {
        outputText += `${i + 1}번 ${batter[i]} 
        / ${batting[i]}<br>`;
    }
    outputHTML.innerHTML = outputText;
}

// 사용자가 게임 시작을 원할 때 기능하는 메소드
info.userWantPlay = function () {
    if (this.askCount === 1) {
        alert('현재 입력된 데이터가 없습니다!\n\n먼저 팀 데이터를 입력해주세요!!');
    } else if (this.askCount === 3) {
        alert('게임 시작 전 팀 데이터를 확인해주세요!\n\n수정을 원하면 팀 데이터 수정 클릭해주세요!');
    } else {
        game.init();
    }
}

// 사용자의 팀 데이터 수정을 도와주는 메소드
info.userWantModify = function () {
    this.batterName1 = [];
    this.battingAvg1 = [];
    this.batterName2 = [];
    this.battingAvg2 = [];
    this.askCount = 1;
    this.userWantInput();
}

// 게임 객체
// 게임 진행과 관련된 속성 및 메소드 저장
game = {
    inning: 1,
    team1PlayerOrder: 0,
    team2PlayerOrder: 0,
    isTeam1: true,
    strikeCount: 0,
    ballCount: 0,
    hitCount: 0,
    outCount: 0,
    team1Score: 0,
    team2Score: 0,
    outputStr: ''
};

// 게임 시작하는 메소드
game.init = function () {
    let _this = game
    const playerBattingAvg = _this.whichTeam();
    _this.getProbability(playerBattingAvg);
    _this.updateCondition();
    _this.checkAccumulation();
    _this.progress();
}

// 각 팀의 타순을 가져오는 메소드
game.whichTeam = function () {
    let playerBattingAvg;
    if (this.isTeam1Attack()) {
        playerBattingAvg = this.getBattingAvg(game.team1PlayerOrder, info.battingAvg1);
    } else {
        playerBattingAvg = this.getBattingAvg(game.team2PlayerOrder, info.battingAvg2);
    }
    return playerBattingAvg;
}

// 현재 team1이 공격하는지 물어보는 메소드.
game.isTeam1Attack = function () {
    return this.isTeam1;
}

// 타자의 타율을 가져오는 메소드
game.getBattingAvg = function (playerOrder, battingAvg) {
    const order = playerOrder; // 0
    const battingAvgList = battingAvg //[0.341, 0.453]
    const playerBattingAvg = battingAvgList[order];
    return playerBattingAvg;
}


// 타율에 따라 컨디션 얻을 확률 구하는 메소드  
game.getProbability = function (playerBattingAvg) {
    const hit = playerBattingAvg;
    const strike = (1 - hit) / 2 - 0.05;
    const ball = (1 - hit) / 2 - 0.05;
    const ballStrike = ball + strike;
    const ballStrikeHit = ballStrike + hit;
    this.getCondition(strike, ballStrike, ballStrikeHit);
}

// 컨디션 구하는 메소드
game.getCondition = function (strike, ballStrike, ballStrikeHit) {
    const RANDOM_NUM = Math.random();
    if (RANDOM_NUM < strike) {
        this.condition = CONDITION_LIST[0]; // 스트라이크 
    } else if (RANDOM_NUM > strike && RANDOM_NUM < (ballStrike)) {
        this.condition = CONDITION_LIST[1]; // 볼
    } else if (RANDOM_NUM > ballStrike && RANDOM_NUM < (ballStrikeHit)) {
        this.condition = CONDITION_LIST[2]; // 안타 
    } else if (RANDOM_NUM > ballStrikeHit && RANDOM_NUM < 1) {
        this.condition = CONDITION_LIST[3]; // 아웃 
    }
}

// 컨디션을 누적하는 메소드
game.updateCondition = function () {
    if (this.condition === 'STRIKE') {
        this.strikeCount++;
    } else if (this.condition === 'BALL') {
        this.ballCount++;
    } else if (this.condition === 'HIT') {
        this.hitCount++;
    } else if (this.condition === 'OUT') {
        this.outCount++;
    }
}

// 3STRIKE -> 1OUT 바꿔주는 메소드
game.checkAccumulation = function () {
    if (this.strikeCount === 3) {
        this.outCount++;
    } else if (this.ballCount === 4) {
        this.hitCount++;
    } else if (this.hitCount === 4) {
        if (this.isTeam1Attack()) {
            this.team1Score++;
            this.hitCount = 0;
        } else {
            this.team2Score++;
            this.hitCount = 0;
        }
    }
}

// 진행상황 확인하는 메소드
game.progress = function () {
    if (this.isGameOver()) {
        this.isGameOverPrint();
    } else if (this.isInningOver()) {
        this.isInningOverPrint();
    } else if (this.isOutOrHit()) {
        this.isOutOrHitPrint();
    } else if (this.is3Strike()) {
        this.is3StrikePrint();
    } else if (this.is4Ball()) {
        this.is4BallPrint();
    } else {
        this.isNormalPrint();
    }
}

// 게임 종료인지 확인하는 메소드
game.isGameOver = function () {
    return this.inning >= 7;
}

// 게임 종료할 때 결과 출력하는 메소드
game.isGameOverPrint = function () {
    this.currentAttackOutput = ``;
    attackOutput.innerHTML = this.currentAttackOutput;
    this.outputStr += `경기종료<br>
        ${info.teamName1} VS ${info.teamName2}<br>
        ${this.team1Score} VS ${this.team2Score}<br>
        Thank you`;
    attackOutput.innerHTML = this.outputStr;
    inningOuput.innerHTML = '';
    clearInterval(this.autoPlay);
}

// 이닝이 끝났는지 확인하는 메소드
game.isInningOver = function () {
    return this.outCount === 3;
}

// 이닝 바뀔 때 결과 출력하는 메소드
game.isInningOverPrint = function () {
    this.inningPrint();
    this.batterOrder();
    this.isTeam1 = !this.isTeam1Attack(); // 공수 바뀌면 isTeam1 false로 바꿈.
    this.inningInit();
    this.outputStr += `${this.condition}! <br>${this.strikeCount}S ${this.ballCount}B 3O<br>`;
    this.outputStr += `<br>Inning Change!! <br><br> 현재 스코어- ${this.team1Score} : ${this.team2Score}`;
    inningOuput.innerHTML = this.outputStr;
    this.outputStr = ''; // 공수 전환되면 컨디션 출력하는 창 초기화
    // setTimeout(game.init, 4000);
}

// 현재 이닝과 선수 이름을 알려주는 메소드 ex) 1회초 와이번즈 공격!
game.inningPrint = function () {
    this.currentAttackOutput = ``;
    if (this.isTeam1Attack()) {
        this.currentAttackOutput += `${this.inning}회초 ${info.teamName1}팀 공격!<br><br>`
        this.currentAttackOutput += `${this.team1PlayerOrder + 1}번 
        ${info.batterName1[this.team1PlayerOrder]} 선수!<br>`;
        attackOutput.innerHTML = this.currentAttackOutput;
        this.currentAttackOutput = ''; // 다시 게임 시작 전 초기화
    } else {
        this.currentAttackOutput += `${this.inning}회말 ${info.teamName2}팀 공격!<br><br>`
        this.currentAttackOutput += `${this.team2PlayerOrder + 1}번 
        ${info.batterName2[this.team2PlayerOrder]} 선수!<br>`;
        attackOutput.innerHTML = this.currentAttackOutput;
        this.currentAttackOutput = ''; // 다시 게임 시작 전 초기화
    }
}

// 타자 순서를 1씩 증가시키는 메소드
game.batterOrder = function () {
    if (this.isTeam1Attack()) {
        this.plusPlayOrder1();
    } else {
        this.plusPlayOrder2();
    }
}

// team1의 타자 순서를 1씩 증가하는 메소드
game.plusPlayOrder1 = function () {
    if (this.team1PlayerOrder === 8) {
        this.team1PlayerOrder = 0; // 타순 한바퀴 돌면 0으로 초기화
    } else {
        this.team1PlayerOrder += 1;
    }
}

// team2의 타자 순서를 1씩 증가하는 메소드
game.plusPlayOrder2 = function () {
    if (this.team2PlayerOrder === 8) {
        this.team2PlayerOrder = 0; // 타순 한바퀴 돌면 0으로 초기화
    } else {
        this.team2PlayerOrder += 1;
    }
}

// 공격이 바뀌면 카운트를 전부 초기화하는 메소드
game.inningInit = function () {
    this.strikeCount = 0;
    this.ballCount = 0;
    this.hitCount = 0;
    this.outCount = 0;
    if (this.isTeam1 === true) {
        this.inning++;
    }
}

// 안타인지 아웃인지 확인하는 메소드
game.isOutOrHit = function () {
    return this.condition === 'HIT' || this.condition === 'OUT';
}

// 아웃 또는 안타일때 결과 출력하는 메소드
game.isOutOrHitPrint = function () {
    this.inningPrint();
    this.conditionInit();
    this.outputStr += `${this.condition}!<br>`;
    this.conditionInit();
    this.outputStr += `${this.strikeCount}S ${this.ballCount}B ${this.outCount}O<br>
                      <br>다음 선수 입장합니다.`;
    inningOuput.innerHTML = this.outputStr;
    this.batterOrder();
    this.outputStr = ''; // 공수 전환되면 컨디션 출력하는 창 초기화
    // setTimeout(game.init, 700);
}

// 타석 바뀌면 누적된 카운트 초기화하는 메소드
game.conditionInit = function () {
    this.strikeCount = 0;
    this.ballCount = 0;
}

// 3STRIKE인지 확인하는 메소드
game.is3Strike = function () {
    return this.strikeCount === 3;
}

// 3스트라이크 일 때 결과 출력하는 메소드 
game.is3StrikePrint = function () {
    this.inningPrint();
    this.outputStr += `${this.condition}<br>삼진아웃!<br>`;
    this.conditionInit();
    this.outputStr += `${this.strikeCount}S ${this.ballCount}B ${this.outCount}O<br>
                      <br>다음 선수 입장합니다.`;
    inningOuput.innerHTML = this.outputStr;
    this.batterOrder();
    this.outputStr = ''; // 공수 전환되면 컨디션 출력하는 창 초기화
    // setTimeout(game.init, 700);
}

// 4BALL인지 확인하는 메소드
game.is4Ball = function () {
    return this.ballCount === 4;
}

// 4볼 일 때 결과 출력하는 메소드
game.is4BallPrint = function () {
    this.inningPrint();
    this.outputStr += `4${this.condition}! <br>진루!<br>
                      <br>다음 선수 입장합니다.`;
    this.conditionInit();
    inningOuput.innerHTML = this.outputStr;
    // this.print();
    this.batterOrder();
    this.outputStr = ''; // 공수 전환되면 컨디션 출력하는 창 초기화
    // setTimeout(game.init, 700);
}

// 1스트라이크 또는 1볼 일 때 출력하는 메소드
game.isNormalPrint = function () {
    this.inningPrint();
    this.outputStr += `${this.condition}!<br>${this.strikeCount}S ${this.ballCount}B ${this.outCount}O<br><br>`;
    inningOuput.innerHTML = this.outputStr;
    // setTimeout(game.init, 700);
}

// 팀 데이터 입력 핸들러 함수
function userWantInput() {
    info.userWantInput();
}

// 팀 데이터 확인 핸들러 함수
function userWantOutput() {
    info.userWantOutput();
}

// 팀 데이터 수정
function userWantModify() {
    info.userWantModify();
}

// 공 던지기 핸들러 함수
function userWantPlay() {
    info.userWantPlay();
}

// 자동 진행 핸들러 함수
function userWantAutoPlay() {
    if (info.askCount === 1) {
        alert('현재 입력된 데이터가 없습니다!\n먼저 팀 데이터를 입력해주세요!!');
    } else if (info.askCount === 3) {
        alert('게임 시작 전 팀 데이터를 확인해주세요!\n\n수정을 원할 시 팀 데이터 수정을 클릭하세요!');
    } else {
        game.autoPlay = setInterval(game.init, 300);
    }
    
}

// 자동진행 멈추기 핸들러 함수
function userWantStopAutoPlay() {
    clearInterval(game.autoPlay);
}

// 처음 인사하는 알림창
function init() {
    alert('신나는 야구게임 시작해볼까요?'+
    '\n\n먼저 팀 데이터를 입력해주세요!');
}

init();