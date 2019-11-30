/* Step2-1 리팩토링 요소
    -타율 물어볼 때 세자리수 입력하면 자동으로 0.321 바꿔주는 기능 추가 
    -타율 세자리수 아니면 alert로 예외 처리
    -데이터 입력 완료하고 처음 화면 띄워서 출력을 물어보기, 만약 입력 완료한 상태면 입력 완료 말하기 
        -수정까지 추가하면 좋을 듯. 한번 잘 못 입력하면 불편..   
    
    Step2-2 리팩토링 요소
    -4ball 에도 아웃이 출력된다. 
*/


// HTML elements
const output10 = document.getElementById('output10'); // 팀1 vs 팀2 출력
const output0 = document.getElementById('output0'); // 게임 결과 출력
const output1 = document.getElementById('output1'); // Team1 output
const output2 = document.getElementById('output2'); // Team2 output

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
    // this.askTeamName();
    // this.askBatterInfo();
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
        // game.init(); //처음 게임 시작 
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
    } else if (this.userChoice === 7){

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
    for (let i = 0; i < 2; i++) {
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
        let battingAvg = Number(prompt(`2팀의 ${i + 1}번 타자의 '타율'을 입력하세요! ex) 0.432`));
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
    this.printCopyText(info.teamName1, info.batterName1, info.battingAvg1, output1);
}
// Team2 정보 출력하는 메소드
info.printTeam2Info = function () {
    this.printCopyText(info.teamName2, info.batterName2, info.battingAvg2, output2);

}

// 게임 객체
// 야구와 관련된 속성 및 메소드 저장
game = {
    inning: 0,
    playerOrder: 0,
    strikeCount: 0,
    ballCount: 0,
    hitCount: 0,
    outCount: 0
};

// 게임 시작하는 메소드
game.init = function () {
    if (this.inning === 0) {
        this.inning += 1;
        let outputStr = '';
        outputStr += `${info.teamName1} VS ${info.teamName2}의 시합을 시작합니다.<br>`
        output10.innerHTML = outputStr;
    }
    console.log(this.inning);
    let playerBattingAvg =this.attack(game.playerOrder, info.batterName1, info.battingAvg1);
    this.isProbability(playerBattingAvg);
    this.updateCondition();
    this.checkAccumulation();
    this.progress();
}

// 타자 순서를 1씩 증가시키는 메소드
game.batterOrder = function () {
    if(this.playerOrder === 8){
        this.playerOrder = 0; // 타순 한바퀴 돌면 0으로 초기화
    } else {
        this.playerOrder += 1;
    }
}

// 타자의 타율을 가져오는 메소드
game.attack = function (playerOrder, batterName1, battingAvg1) {
    const order = playerOrder; // 0
    const batterNameList = batterName1; // ['손현준', '진용식']
    const battingAvgList = battingAvg1 //[0.341, 0.453]
    const playerBattingAvg = battingAvgList[order];
    return playerBattingAvg;
}

// 타율에 따라 확률로 Condition을 얻는 메소드  
game.isProbability = function (playerBattingAvg) {
    console.log('isProbability 실행');
    const hit = playerBattingAvg;
    const strike = (1 - hit) / 2 - 0.05;
    const ball = (1 - hit) / 2 - 0.05;
    const ballStrike = ball + strike;
    const ballStrikeHit = ballStrike + hit;
    const RANDOM_NUM = Math.random();

    if(RANDOM_NUM < strike) {
        this.condition = CONDITION_LIST[0]; // 스트라이크 
    } else if(RANDOM_NUM > strike && RANDOM_NUM < (ballStrike)){
        this.condition = CONDITION_LIST[1]; // 볼
    } else if(RANDOM_NUM > ballStrike && RANDOM_NUM < (ballStrikeHit)){
        this.condition = CONDITION_LIST[2]; // 안타 
    } else if(RANDOM_NUM > ballStrikeHit && RANDOM_NUM < 1){
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

// 진행상황 확인하는 메소드
game.progress = function () {
    if (this.isInningOver()) {
        this.conditionInit();
        this.print();
    } else if (this.isOutOrHit()) {
        this.conditionInit();
        this.print();
        this.batterOrder();
        // this.init();
    } else if (this.is3StrikeOr4Ball()) {
        this.print();
        this.batterOrder();
        // this.init();
    } else if (this.condition === 'STRIKE' || this.condition === 'BALL') {
        this.print();
        // this.init();
    }
}

// 이닝이 끝났는지 확인하는 메소드
game.isInningOver = function () {
    return this.outCount === 3;
}

// 안타인지 아웃인지 확인하는 메소드
game.isOutOrHit = function () {
    return this.condition === 'HIT' || this.condition === 'OUT';
}

// 3STRIKE 인지 4BALL 인지 확인하는 메소드
game.is3StrikeOr4Ball = function () {
    return this.strikeCount === 3 || this.ballCount === 4;
}

// 타석 바뀌면 누적된 카운트 초기화하는 메소드
game.conditionInit = function () {
    console.log('conditionInit 실행');
    this.strikeCount = 0;
    this.ballCount = 0;
}

// 이닝과 팀이름 알려주는 메소드 ex) 1회초 와이번즈 공격!
game.inningPrint = function () {
    let outputStr = '';
    if(this.inning % 2 != 0) {
        outputStr += `${this.inning}회초 ${info.teamName1}팀 공격!<br><br>`
    } else if(this.inning % 2 === 0) {
        outputStr += `${this.inning-1}회말 ${info.teamName2}팀 공격!<br><br>`
    }
    return outputStr;
}

// 출력하는 메소드
game.print = function () {
    const S = this.strikeCount;
    const B = this.ballCount;
    const O = this.outCount;
    const H = this.hitCount;

    let outputStr = '';
    outputStr += this.inningPrint(); // 1회초 와이번즈 공격!
    outputStr += `${this.playerOrder+1}번 ${info.batterName1[this.playerOrder]} 선수!<br>`
    
    if (this.isInningOver()) {    
        outputStr += `아웃! <br> ${this.strikeCount}S ${this.ballCount}B ${this.outCount}O<br>`;
        outputStr += `최종 안타 수 : ${this.hitCount}개 입니다.<br>Inning Change`;
    } else if (this.isOutOrHit()) {
        outputStr += `${this.condition}!<br>`;
        this.conditionInit();
        outputStr += `${this.strikeCount}S ${this.ballCount}B ${this.outCount}O`; // 0S 0B 0O
    } else if (this.is3StrikeOr4Ball()) {
        console.log('is3StrikeOr4Ball');
        outputStr += `${this.condition}<br>아웃!<br>`;
        this.conditionInit();
        outputStr += `${this.strikeCount}S ${this.ballCount}B ${this.outCount}O`;
    } else {
        outputStr += `${this.condition}!<br>${this.strikeCount}S ${this.ballCount}B ${this.outCount}O`;
    }
    output0.innerHTML = outputStr;
};


// 버튼 핸들러 함수
function init() {
    info.askChoice();
    info.checkChoice();
}