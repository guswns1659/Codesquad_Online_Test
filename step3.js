/* Step3 구현 
    -게임 진행하며 출력화면 정상작동 구현. 
        -스코어도 반영, 
        -볼카운트
        -투구 수, 삼진 수, 안타 수 반영
*/

// HTML elements

// const verseOutput = document.getElementById('verseOutput'); // 팀1 vs 팀2 출력

// 현재 이닝 수와 타자의 이름을 출력할 때 사용하는 HTML elements
const attackOutput0 = document.querySelector('.attackOutput'), // 1회초 00팀 공격 출력 
    attackOutput = attackOutput0.querySelector('p'); // 1회초 00팀 공격 출력 
const inningOuput0 = document.querySelector('.inningOuput'), // 게임 결과 출력
    inningOuput = inningOuput0.querySelector('p'); // 게임 결과 출력

const team1Output0 = document.querySelector('.team1Output'), // Team1 output
    team1Output = team1Output0.querySelector('p'); // Team1 output
const team2Output0 = document.querySelector('.team2Output'), // Team2 output
    team2Output = team2Output0.querySelector('p'); // Team2 output

//팀 정보 출력할 때 사용하는 HTML elements
const container = document.querySelector('.container'),
    scoreBoard1Row2 = container.querySelector('.scoreBoard1Row2'),
    scoreBoard1Row3 = container.querySelector('.scoreBoard1Row3'),
        scoreBoard1Team1 = scoreBoard1Row2.querySelector('p'),
        scoreBoard1Team2 = scoreBoard1Row3.querySelector('p');

// 전광판에 team1 점수 표시할 때 사용하는 HTML elements
const team1Score1 = scoreBoard1Row2.querySelector('#team1Score1');
const team1Score2 = scoreBoard1Row2.querySelector('#team1Score2');
const team1Score3 = scoreBoard1Row2.querySelector('#team1Score3');
const team1Score4 = scoreBoard1Row2.querySelector('#team1Score4');
const team1Score5 = scoreBoard1Row2.querySelector('#team1Score5');
const team1Score6 = scoreBoard1Row2.querySelector('#team1Score6');
const team1Score7 = scoreBoard1Row2.querySelector('#team1Score7');

// 전광판에 team1 점수 표시할 때 사용하는 HTML elements
const team2Score1 = scoreBoard1Row3.querySelector('#team2Score1');
const team2Score2 = scoreBoard1Row3.querySelector('#team2Score2');
const team2Score3 = scoreBoard1Row3.querySelector('#team2Score3');
const team2Score4 = scoreBoard1Row3.querySelector('#team2Score4');
const team2Score5 = scoreBoard1Row3.querySelector('#team2Score5');
const team2Score6 = scoreBoard1Row3.querySelector('#team2Score6');
const team2Score7 = scoreBoard1Row3.querySelector('#team2Score7');



 // 볼카운트 표시하는 전광판
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


// 팀이름 입력을 요청하는 메소드
info.askTeamName = function () {
    if (this.askCount === 1) {
        this.teamName1 = prompt('1팀의 이름을 입력하세요. ex)손현준');
    } else {
        this.teamName2 = prompt('2팀의 이름을 입력하세요.');
    }
}

// Team1 타자 이름과 타율을 배열에 넣는 메소드
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
    outputText += `${name}팀<br>`;
    for (let i = 0; i < batter.length; i++) {
        outputText += `${i + 1}번 ${batter[i]} 
        / ${batting[i]}<br>`;
    }
    outputHTML.innerHTML = outputText;
}

// Team1 정보 출력하는 메소드
info.printTeam1Info = function () {
    this.printCopyText(info.teamName1, info.batterName1, info.battingAvg1, team1Output);
    scoreBoard1Team1.innerHTML = `${info.teamName1}`;
}
// Team2 정보 출력하는 메소드
info.printTeam2Info = function () {
    this.printCopyText(info.teamName2, info.batterName2, info.battingAvg2, team2Output);
    scoreBoard1Team2.innerHTML = `${info.teamName2}`;

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
    outCount: 0,
    team1Score: 0,
    team2Score: 0,
    team1inningScore: 0,
    team2inningScore: 0,
    outputStr: ''
};

// 게임 시작하는 메소드
game.init = function () {
    // if (this.inning === 1) {
    //     let outputStr = '';
    //     outputStr += `${info.teamName1} VS ${info.teamName2}의 시합을 시작합니다.<br>`
    //     verseOutput.innerHTML = outputStr;
    // }
    let _this = game
    const playerBattingAvg = _this.whichTeam();
    _this.getProbability(playerBattingAvg);
    _this.updateCondition();
    _this.checkAccumulation();
    _this.progress();
}

// team1인지 team2에 따라 타순을 가져오는 메소드
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
    } else if (this.hitCount === 4) {
        if (this.isTeam1Attack()) {
            this.team1Score++;
            this.team1inningScore++;
            this.hitCount = 0;
        } else {
            this.team2Score++;
            this.team2inningScore++;
            this.hitCount = 0;
        }
    }
}

// 게임 종료인지 확인하는 메소드
game.isGameOver = function () {
    return this.inning >= 7;
}

// 이닝이 끝났는지 확인하는 메소드
game.isInningOver = function () {
    return this.outCount === 3;
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

    this.team1inningScore = 0;
    this.team2inningScore = 0;
    if (this.isTeam1 === true) {
        this.inning++;
    }
}

// 1스트라이크 인지 1볼인지 확인하는 메소드
game.is1StrikeOr1Ball = function () {
    return !this.isGameOver() && !this.isInningOver() && !this.isOutOrHit() &&
        !this.is3Strike() && !this.is4Ball();
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
        this.inningPrint();
        this.outputStr += `${this.condition}!<br>${this.strikeCount}S ${this.ballCount}B ${this.outCount}O<br>`;
        inningOuput.innerHTML = this.outputStr;
        // this.print();
        // setTimeout(game.init, 2000);
    }
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

// 게임 종료할 때 결과 출력하는 메소드
game.isGameOverPrint = function () {
    // this.currentAttackOutput = ``;
    this.outputStr += `경기종료<br>
        ${info.teamName1} VS ${info.teamName2}<br>
        ${this.team1Score} VS ${this.team2Score}<br>
        Thank you`;
    attackOutput.innerHTML = this.outputStr;
    // inningOuput.innerHTML = this.outputStr;
}

// team1의 이닝점수 전광판에 추가
game.scoreCopytext1 = function() {
    switch (this.inning){
        case 1: 
        team1Score1.innerHTML = this.team1inningScore;
        break;
        case 2: 
        team1Score2.innerHTML = this.team1inningScore;
        break;
        case 3: 
        team1Score3.innerHTML = this.team1inningScore;
        break;
        case 4: 
        team1Score4.innerHTML = this.team1inningScore;
        break;
        case 5: 
        team1Score5.innerHTML = this.team1inningScore;
        break;
        case 6: 
        team1Score6.innerHTML = this.team1inningScore;
        break;
    }

}
// team2의 이닝점수 전광판에 추가
game.scoreCopytext2 = function() {
    switch (this.inning){
        case 1: 
        team2Score1.innerHTML = this.team2inningScore;
        break;
        case 2: 
        team2Score2.innerHTML = this.team2inningScore;
        break;
        case 3: 
        team2Score3.innerHTML = this.team2inningScore;
        break;
        case 4: 
        team2Score4.innerHTML = this.team2inningScore;
        break;
        case 5: 
        team2Score5.innerHTML = this.team2inningScore;
        break;
        case 6: 
        team2Score6.innerHTML = this.team2inningScore;
        break;
    }
}


// 전광판에 점수 추가하는 메소드 
game.addScoreBoard = function () {
    if(this.isTeam1Attack()){
        this.scoreCopytext1();
    } else {
        this.scoreCopytext2();
    }
}

// 이닝 바뀔 때 결과 출력하는 메소드
game.isInningOverPrint = function () {
    this.inningPrint();
    this.batterOrder();
    this.addScoreBoard();
    this.isTeam1 = !this.isTeam1Attack(); // 공수 바뀌면 isTeam1 false로 바꿈.
    this.inningInit();
    this.outputStr += `${this.condition}! 아웃!<br>${this.strikeCount}S ${this.ballCount}B 3O<br>`;
    this.outputStr += `<br>Inning Change!! <br><br> 현재 스코어- ${this.team1Score} : ${this.team2Score}`;
    inningOuput.innerHTML = this.outputStr;
    team1Score7.innerHTML = this.team1Score;
    team2Score7.innerHTML = this.team2Score;
    this.outputStr = ''; // 공수 전환되면 컨디션 출력하는 창 초기화
    // setTimeout(game.init, 5000);
}

// 아웃 또는 안타일때 결과 출력하는 메소드
game.isOutOrHitPrint = function () {

    this.inningPrint();
    this.conditionInit();
    this.outputStr += `${this.condition}!<br>`;
    this.conditionInit();
    this.outputStr += `${this.strikeCount}S ${this.ballCount}B ${this.outCount}O<br>`; // 0S 0B 0O
    inningOuput.innerHTML = this.outputStr;
    // this.print();
    this.batterOrder();
    this.outputStr = ''; // 공수 전환되면 컨디션 출력하는 창 초기화
    // setTimeout(game.init, 2000);

}

// 3스트라이크 일 때 결과 출력하는 메소드 
game.is3StrikePrint = function () {
    this.inningPrint();
    this.outputStr += `${this.condition}<br>아웃!<br>`;
    this.conditionInit();
    this.outputStr += `${this.strikeCount}S ${this.ballCount}B ${this.outCount}O<br>`;
    // this.print();
    inningOuput.innerHTML = this.outputStr;
    this.batterOrder();
    this.outputStr = ''; // 공수 전환되면 컨디션 출력하는 창 초기화
    // setTimeout(game.init, 2000);
}

// 4볼 일 때 결과 출력하는 메소드
game.is4BallPrint = function () {
    this.inningPrint();
    this.outputStr += `4${this.condition}! <br>진루!<br>`;
    this.conditionInit();
    inningOuput.innerHTML = this.outputStr;
    // this.print();
    this.batterOrder();
    this.outputStr = ''; // 공수 전환되면 컨디션 출력하는 창 초기화
    // setTimeout(game.init, 2000);
}



// // 버튼 핸들러 함수
// function init() {
//     info.askChoice();
//     info.checkChoice();
// }

// 팀 데이터 입력 핸들러 함수
function userWantInput () {
    info.userWantInput();
}

// 팀 확인하기 핸들러 함수
function userWantOutput () {
    info.userWantOutput();
}

// 게임 시작하기 핸들러 함수
function userWantPlay() {
    game.init();
}


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
    // init();
}


// 사용자가 팀 데이터 출력을 원할 때 기능하는 메소드
info.userWantOutput = function () {
    if (this.askCount === 1) {
        alert('현재 입력된 데이터가 없습니다!\n먼저 팀 데이터를 입력해주세요!!');
        // init();
    } else if (this.askCount != 1) {
        this.printTeam1Info();
        this.printTeam2Info();
    }
}

// 사용자가 게임 시작을 원할 때 기능하는 메소드
info.userWantPlay = function () {
    if (this.askCount === 1) {
        alert('현재 입력된 데이터가 없습니다!\n먼저 팀 데이터를 입력해주세요!!');
        // init();
    } else {
        game.init();
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