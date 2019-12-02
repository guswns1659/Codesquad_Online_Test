/* Step2 리팩토링 요소
    -타율 세자리수 아니면 alert로 다시 입력 요청
    -데이터 입력 완료하고 처음 화면 띄워서 출력을 물어보기, 만약 입력 완료한 상태면 입력 완료 말하기 
        -수정까지 추가하면 좋을 듯. 한번 잘 못 입력하면 불편..    
    - 버튼 양식 : 팀 데이터 입력, 팀 출력, 게임시작 으로 만들기?
        */
/*
    구현 요소
    -선수 바뀔 때마다 출력 초기화
    -이닝 별로 게임 진행 상황 보여주기. 
        -setTimeOut으로 game.init() 1초 텀 두기
        -이닝 바뀔 땐 5초 텀 두기. 
    -안타에 따른 점수 합산 
    -마지막에 점수 결과 보여주기.
*/


// HTML elements
const verseOutput = document.getElementById('verseOutput'); // 팀1 vs 팀2 출력
const attackOutput = document.getElementById('attackOutput'); // 1회초 00팀 공격 출력 
const inningOuput = document.getElementById('inningOuput'); // 게임 결과 출력
const team1Output = document.getElementById('team1Output'); // Team1 output
const team2Output = document.getElementById('team2Output'); // Team2 output


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

// 팀 데이터 입력할건지 출력할건지 물어보는 메소드 
info.askChoice = function () {
    this.userChoice = Number(prompt(`1.팀 데이터 '입력'\n2.팀 데이터 '출력\n3.게임 시작`));
}

// 사용자가 데이터 입력을 원할 때 기능하는 메소드
info.userWantInput = function () {
    this.askTeamName();
    this.askBatterInfo();
    this.askTeamName();
    this.askBatterInfo();
    init();
}

// 사용자가 팀 데이터 출력을 원할 때 기능하는 메소드
info.userWantOutput = function () {
    if (this.askCount === 1) {
        alert('현재 입력된 데이터가 없습니다!\n먼저 팀 데이터를 입력해주세요!!');
        init();
    } else if (this.askCount != 1) {
        this.printTeam1Info();
        this.printTeam2Info();
    }
}

// 사용자가 게임 시작을 원할 때 기능하는 메소드
info.userWantPlay = function () {
    if (this.askCount === 1) {
        alert('현재 입력된 데이터가 없습니다!\n먼저 팀 데이터를 입력해주세요!!');
        init();
    } else {
        game.init(); //처음 게임 시작 
    }
}

// 사용자의 선택을 확인하는 메소드 
// this.userChoice === 7는 디버깅용
info.checkChoice = function () {
    if (this.userChoice === 1) {
        this.userWantInput();
    } else if (this.userChoice === 2) {
        this.userWantOutput();
    } else if (this.userChoice === 3) {
        this.userWantPlay();
    } else if (this.userChoice === 7) {

    } else {
        alert('1~3중에 입력해주세요!!');
        init();
    }
}

// 팀이름 입력을 요청하는 메소드
info.askTeamName = function () {
    if (this.askCount === 1) {
        this.teamName1 = prompt('1팀의 이름을 입력하세요. ex)손현준');
    } else {
        this.teamName2 = prompt('2팀의 이름을 입력하세요.');
    }
}

// Team1에게 정보 물어보는 메소드
info.askToTeam1 = function () {
    for (let i = 0; i < 5; i++) {
        let batterName = prompt(`1팀의 ${i + 1}번 타자의 '이름'을 입력하세요!`);
        let battingAvg = (Number(prompt(`1팀의 ${i + 1}번 타자의 '타율'을 입력하세요! ex) 333`)) / 1000);
        this.batterName1.push(batterName);
        this.battingAvg1.push(battingAvg);
    }
}

// Team2에게 정보 물어보는 메소드
info.askToTeam2 = function () {
    for (let i = 0; i < 5; i++) {
        let batterName = prompt(`2팀의 ${i + 1}번 타자의 '이름'을 입력하세요!`);
        let battingAvg = (Number(prompt(`2팀의 ${i + 1}번 타자의 '타율'을 입력하세요! ex) 432`)) / 1000);
        this.batterName2.push(batterName);
        this.battingAvg2.push(battingAvg);
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

// 반복되는 출력 코드 모아놓은 메소드
info.printCopyText = function (teamname, batterName, battingAvg, output) {
    let outputText = '';
    let name = teamname;
    let batter = batterName;
    let batting = battingAvg;
    let outputHTML = output;
    outputText += `${name}팀 정보!!<br>`;
    for (let i = 0; i < batter.length; i++) {
        outputText += `${i + 1}번 타자 - 이름 : ${batter[i]} 
        / 타율 : ${batting[i]}<br>`;
    }
    outputHTML.innerHTML = outputText;
}

// Team1 정보 출력하는 메소드
info.printTeam1Info = function () {
    this.printCopyText(info.teamName1, info.batterName1, info.battingAvg1, team1Output);
}
// Team2 정보 출력하는 메소드
info.printTeam2Info = function () {
    this.printCopyText(info.teamName2, info.batterName2, info.battingAvg2, team2Output);

}

// 게임 객체
// 야구와 관련된 속성 및 메소드 저장
game = {
    inning: 1,
    team1PlayerOrder: 0,
    team2PlayerOrder: 0,
    isTeam1: true,
    strikeCount: 0,
    ballCount: 0,
    hitCount: 0,
    outCount: 0
};

// 게임 시작하는 메소드
game.init = function () {
    if (this.inning === 1) {
        let outputStr = '';
        outputStr += `${info.teamName1} VS ${info.teamName2}의 시합을 시작합니다.<br>`
        verseOutput.innerHTML = outputStr;
    }
    const playerBattingAvg = this.whichTeam();
    this.isProbability(playerBattingAvg);
    this.updateCondition();
    this.checkAccumulation();
    this.progress();
}

// team1인지 team2에 따라 타순을 가져오는 메소드
game.whichTeam = function () {
    let playerBattingAvg;
    if (this.isTeam1Attack()) {
        playerBattingAvg = this.attack(game.team1PlayerOrder, info.battingAvg1);
    } else {
        playerBattingAvg = this.attack(game.team2PlayerOrder, info.battingAvg2);
    }
    return playerBattingAvg;
}

// 현재 team1이 공격하는지 물어보는 메소드.
game.isTeam1Attack = function () {
    return this.isTeam1;
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

// 타자 순서를 1씩 증가시키는 메소드
game.batterOrder = function () {
    if (this.isTeam1Attack()) {
        this.plusPlayOrder1();
    } else {
        this.plusPlayOrder2();
    }
}

// 타자의 타율을 가져오는 메소드
game.attack = function (playerOrder, battingAvg1) {
    const order = playerOrder; // 0
    const battingAvgList = battingAvg1 //[0.341, 0.453]
    const playerBattingAvg = battingAvgList[order];
    return playerBattingAvg;
}

// 타율에 따라 확률로 Condition을 얻는 메소드  
game.isProbability = function (playerBattingAvg) {
    const hit = playerBattingAvg;
    const strike = (1 - hit) / 2 - 0.05;
    const ball = (1 - hit) / 2 - 0.05;
    const ballStrike = ball + strike;
    const ballStrikeHit = ballStrike + hit;
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

// Condition을 누적하는 메소드
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

// 3 STRIKE -> 1OUT 바꿔주는 메소드
game.checkAccumulation = function () {
    if (this.strikeCount === 3) {
        this.outCount++;
    } else if (this.ballCount === 4) {
        this.hitCount++;
    }
}

// 게임 종료인지 확인하는 메소드
game.isGameOver = function () {
    return this.inning === 7;
}

// 진행상황 확인하는 메소드
game.progress = function () {
    if (this.isGameOver()) {
        this.print();
    }
    else if (this.isInningOver()) {
        this.isTeam1 = !this.isTeam1Attack(); // 공수 바뀌면 isTeam1 false로 바꿈.
        this.print();
        this.outputStr = ''; // 공수 전환되면 컨디션 출력하는 창 초기화
        // this.init();
    } else if (this.isOutOrHit()) {
        this.conditionInit();
        this.print();
        this.batterOrder();
        this.outputStr = ''; // 공수 전환되면 컨디션 출력하는 창 초기화
        // this.init();
    } else if (this.is3Strike()) {
        this.print();
        this.batterOrder();
        this.outputStr = ''; // 공수 전환되면 컨디션 출력하는 창 초기화
        // this.init();
    } else if (this.is4Ball()) {
        this.print();
        this.batterOrder();
        this.outputStr = ''; // 공수 전환되면 컨디션 출력하는 창 초기화
        // this.init();
    } else if (this.condition === 'STRIKE' || this.condition === 'BALL') {
        this.print();
        // this.init();
    }
}

// 이닝이 끝났는지 확인하는 메소드
game.isInningOver = function () {
    return this.outCount >= 3;
}

// 안타인지 아웃인지 확인하는 메소드
game.isOutOrHit = function () {
    return this.condition === 'HIT' || this.condition === 'OUT';
}

// 3STRIKE인지 확인하는 메소드
game.is3Strike = function () {
    return this.strikeCount === 3;
}

// 4BALL인지 확인하는 메소드
game.is4Ball = function () {
    return this.ballCount === 4;
}

// 타석 바뀌면 누적된 카운트 초기화하는 메소드
game.conditionInit = function () {
    this.strikeCount = 0;
    this.ballCount = 0;
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

// 현재 이닝과 선수 이름을 알려주는 메소드 ex) 1회초 와이번즈 공격!
this.currentAttackOutput = '';
game.inningPrint = function () {
    if (this.isTeam1Attack()) {
        this.currentAttackOutput += `${this.inning}회초 ${info.teamName1}팀 공격!<br><br>`
        this.currentAttackOutput += `${this.team1PlayerOrder + 1}번 ${info.batterName1[this.team1PlayerOrder]} 선수!<br>`;
        attackOutput.innerHTML = this.currentAttackOutput;
        this.currentAttackOutput = ''; // 다시 게임 시작 전 초기화
    } else {
        this.currentAttackOutput += `${this.inning}회말 ${info.teamName2}팀 공격!<br><br>`
        this.currentAttackOutput += `${this.team2PlayerOrder + 1}번 ${info.batterName2[this.team2PlayerOrder]} 선수!<br>`;
        attackOutput.innerHTML = this.currentAttackOutput;
        this.currentAttackOutput = ''; // 다시 게임 시작 전 초기화
    }
}


// 출력하는 메소드
this.outputStr = ''; 
game.print = function () {
    this.inningPrint(); 
    if (this.isGameOver()) {
        this.outputStr += `최종 안타 수 : ${this.hitCount}개 입니다.<br>Inning Change`;
    }
    else if (this.isInningOver()) {
        this.inningInit();
        this.outputStr += `${this.condition}!<br>${this.strikeCount}S ${this.ballCount}B 3O<br>`;
        this.outputStr += `Inning Change!! <br>`;
        
    } else if (this.isOutOrHit()) {
        this.outputStr += `${this.condition}!<br>`;
        this.conditionInit();
        this.outputStr += `${this.strikeCount}S ${this.ballCount}B ${this.outCount}O<br>`; // 0S 0B 0O
    } else if (this.is3Strike()) {
        this.outputStr += `${this.condition}<br>아웃!<br>`;
        this.conditionInit();
        this.outputStr += `${this.strikeCount}S ${this.ballCount}B ${this.outCount}O<br>`;
    } else if (this.is4Ball()) {
        this.outputStr += `4${this.condition}! <br>진루!<br>`;
        this.conditionInit();
        // this.outputStr += `${this.strikeCount}S ${this.ballCount}B ${this.outCount}O<br>`;
    } else {
        this.outputStr += `${this.condition}!<br>${this.strikeCount}S ${this.ballCount}B ${this.outCount}O<br>`;
    }
    inningOuput.innerHTML = this.outputStr;
};


// 버튼 핸들러 함수
function init() {
    info.askChoice();
    info.checkChoice();
}