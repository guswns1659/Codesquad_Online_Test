// Step3
// by hyunjun

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

// 타자 이름, 타율 입력을 요청하는 메소드
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

// Team2 타자 이름과 타율을 배열에 넣는 메소드
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

// 사용자의 팀 확인을 도와주는 메소드
info.userWantOutput = function () {
    if (this.askCount === 1) {
        alert('현재 입력된 데이터가 없습니다!\n먼저 팀 데이터를 입력해주세요!!');
        // init();
    } else if (this.askCount != 1) {
        this.printTeam1Info();
        this.printTeam2Info();
        this.askCount++;
    }
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

// 사용자가 게임 시작을 원할 때 기능하는 메소드
info.userWantPlay = function () {
    if (this.askCount === 1) {
        alert('현재 입력된 데이터가 없습니다!\n먼저 팀 데이터를 입력해주세요!!');
    } else if (this.askCount === 3) {
        alert('게임 시작 전 팀 데이터를 확인해주세요!\n\n수정을 원할 시 팀 데이터 수정을 클릭하세요!');
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




// 게임 시작하는 메소드
game.init = function () {
    let _this = game
    const playerBattingAvg = _this.whichTeam();
    _this.getProbability(playerBattingAvg);
    _this.updateCondition();
    _this.checkAccumulation();
    _this.progress();
    _this.printScoreBoard2teamName();
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



// 타자의 타율을 가져오는 메소드
game.getBattingAvg = function (playerOrder, battingAvg) {
    const order = playerOrder;
    const battingAvgList = battingAvg
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

// 확률에 따라 컨디션 구하는 메소드
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
            this.team1inningScore++;
            this.hitCount = 0;
        } else {
            this.team2Score++;
            this.team2inningScore++;
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
        // setTimeout(game.init, 2000);
    }
}

// 게임 종료인지 확인하는 메소드
game.isGameOver = function () {
    return this.inning >= 7;
}

// 게임 종료할 때 결과 출력하는 메소드
game.isGameOverPrint = function () {
    this.outputStr += `경기종료<br>
        ${info.teamName1} VS ${info.teamName2}<br>
        ${this.team1Score} VS ${this.team2Score}<br>
        Thank you`;
    attackOutput.innerHTML = this.outputStr;
    inningOuput.innerHTML = '';
    team1Score7.innerHTML = this.team1Score;
    team2Score7.innerHTML = this.team2Score;
}

// 이닝이 끝났는지 확인하는 메소드
game.isInningOver = function () {
    return this.outCount === 3;
}

// 이닝 바뀔 때 결과 출력하는 메소드
game.isInningOverPrint = function () {
    this.inningPrint();
    this.batterOrder();
    this.addScoreBoard();
    this.isSOCount();
    this.getSboCountOut();
    this.printPshCount();
    this.isTeam1 = !this.isTeam1Attack();
    this.isTeam2Win();
}

// 현재 이닝과 선수 이름을 알려주는 메소드 ex) 1회초 와이번즈 공격!
game.inningPrint = function () {
    this.currentAttackOutput = ``;
    if (this.isTeam1Attack()) {
        this.currentAttackOutput += `${this.inning}회초 ${info.teamName1}팀 공격!<br><br>`
        this.currentAttackOutput += `${this.team1PlayerOrder + 1}번 
        ${info.batterName1[this.team1PlayerOrder]} 선수!<br>`;
        attackOutput.innerHTML = this.currentAttackOutput;
        this.currentAttackOutput = '';
    } else {
        this.currentAttackOutput += `${this.inning}회말 ${info.teamName2}팀 공격!<br><br>`
        this.currentAttackOutput += `${this.team2PlayerOrder + 1}번 
        ${info.batterName2[this.team2PlayerOrder]} 선수!<br>`;
        attackOutput.innerHTML = this.currentAttackOutput;
        this.currentAttackOutput = '';
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
        this.team1PlayerOrder = 0;
    } else {
        this.team1PlayerOrder += 1;
    }
}

// team2의 타자 순서를 1씩 증가하는 메소드
game.plusPlayOrder2 = function () {
    if (this.team2PlayerOrder === 8) {
        this.team2PlayerOrder = 0;
    } else {
        this.team2PlayerOrder += 1;
    }
}

// 전광판에 점수 추가하는 메소드 
game.addScoreBoard = function () {
    if (this.isTeam1Attack()) {
        this.scoreCopytext1();
    } else {
        this.scoreCopytext2();
    }
}

// team1이 한 이닝에서 얻은 점수 전광판에 추가
game.scoreCopytext1 = function () {
    switch (this.inning) {
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
// team2이 한 이닝에서 얻은 점수 전광판에 추가
game.scoreCopytext2 = function () {
    switch (this.inning) {
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

// 공수 전환 될 때 마지막 아웃이 삼진아웃이면 개수 추가하는 메소드
game.isSOCount = function () {
    if (this.is3Strike()) {
        this.getSOCount();
    }
}

// 각 팀의 삼진아웃 개수를 세는 메소드 
game.getSOCount = function () {
    if (this.isTeam1Attack()) {
        this.team1SOCount++;
    } else {
        this.team2SOCount++;
    }
}

// SBO전광판에 출력할 Out 구하는 메소드
game.getSboCountOut = function () {
    for (let i = 0; i < this.outCount; i++) {
        this.sboCountOut += `0`;
    }
    sboCount.innerHTML = `S : ${game.sboCountStrike}<br>B : ${game.sboCountBall}<br>O : ${game.sboCountOut}`;
}

// PSH(투구수, 탈삼진수, 안타수)출력 하는 메소드
game.printPshCount = function () {
    if (this.isTeam1Attack()) {
        this.team1PitchCount++;
        PSHCount.innerHTML = `투구 : ${this.team1PitchCount}개<br>탈삼진 : ${this.team1SOCount}개<br>안타 : ${this.team1HitCount}개`;
    } else {
        this.team2PitchCount++;
        PSHCount.innerHTML = `투구 : ${this.team2PitchCount}개<br>탈삼진 : ${this.team2SOCount}개<br>안타 : ${this.team2HitCount}개`;
    }
}

// 현재 team1이 공격하는지 물어보는 메소드.
game.isTeam1Attack = function () {
    return this.isTeam1;
}

// 6회말 시작인데 team2가 이기고 있으면 게임 종료
game.isTeam2Win = function () {
    if (this.inning === 6) {
        if (this.team1Score < this.team2Score) {
            this.outputStr = '';
            this.isGameOverPrint();
        } else {
            this.printInningChange();
        }
    } else {
        this.printInningChange();
    }
}

// 공수 바뀔 때 출력하는 메소드
game.printInningChange = function () {
    this.inningInit();
    this.outputStr += `${this.condition}! 아웃!<br>${this.strikeCount}S ${this.ballCount}B 3O<br>`;
    this.outputStr += `<br>Inning Change!! <br><br> 현재 스코어- ${this.team1Score} : ${this.team2Score}`;
    inningOuput.innerHTML = this.outputStr;
    team1Score7.innerHTML = this.team1Score;
    team2Score7.innerHTML = this.team2Score;
    this.outputStr = '';
    // setTimeout(game.init, 3000);
}

// 공격이 바뀌면 볼카운트를 전부 초기화하는 메소드
game.inningInit = function () {
    this.strikeCount = 0;
    this.ballCount = 0;
    this.hitCount = 0;
    this.outCount = 0;
    this.team1inningScore = 0;
    this.team2inningScore = 0;
    this.sboCountStrike = '';
    this.sboCountBall = '';
    this.sboCountOut = '';
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
    this.outputStr += `${this.condition}!<br>`;
    this.getSboCountOut();
    this.conditionInit();
    this.outputStr += `${this.strikeCount}S ${this.ballCount}B ${this.outCount}O<br>`;
    inningOuput.innerHTML = this.outputStr;
    this.batterOrder();
    this.outputStr = '';
    this.getHitCount();
    this.printPshCount();
    // setTimeout(game.init, 2000);
}

// 타석 바뀌면 누적된 카운트 초기화하는 메소드
game.conditionInit = function () {
    this.strikeCount = 0;
    this.ballCount = 0;
    this.sboCountStrike = '';
    this.sboCountBall = '';
    this.sboCountOut = '';
}

// 각 팀의 안타개수를 세는 메소드 
game.getHitCount = function () {
    if (this.condition === "HIT") {
        if (this.isTeam1Attack()) {
            this.team1HitCount++;
        } else {
            this.team2HitCount++;
        }
    }
}

// 3STRIKE인지 확인하는 메소드
game.is3Strike = function () {
    return this.strikeCount === 3;
}

// 3스트라이크 일 때 결과 출력하는 메소드 
game.is3StrikePrint = function () {
    this.inningPrint();
    this.outputStr += `${this.condition}<br>아웃!<br>`;
    this.getSboCountStrike();
    this.getSboCountOut();
    this.conditionInit();
    this.outputStr += `${this.strikeCount}S ${this.ballCount}B ${this.outCount}O<br>`;
    inningOuput.innerHTML = this.outputStr;
    this.batterOrder();
    this.outputStr = '';
    this.getSOCount();
    this.printPshCount();
    // setTimeout(game.init, 2000);
}

// SBO전광판에 출력할 Strike 구하는 메소드
game.getSboCountStrike = function () {
    for (let i = 0; i < this.strikeCount; i++) {
        this.sboCountStrike += `0`;
    }
    sboCount.innerHTML = `S : ${this.sboCountStrike}<br>B : ${this.sboCountBall}<br>O : ${this.sboCountOut}`;
}

// 4BALL인지 확인하는 메소드
game.is4Ball = function () {
    return this.ballCount === 4;
}

// 4볼 일 때 결과 출력하는 메소드
game.is4BallPrint = function () {
    this.inningPrint();
    this.outputStr += `4${this.condition}! <br>진루!<br>`;
    this.getSboCountBall();
    this.getSboCountOut();
    this.conditionInit();
    inningOuput.innerHTML = this.outputStr;
    this.batterOrder();
    this.outputStr = '';
    this.printPshCount();
    // setTimeout(game.init, 2000);
}

// SBO전광판에 출력할 Ball 구하는 메소드
game.getSboCountBall = function () {
    for (let i = 0; i < this.ballCount; i++) {
        this.sboCountBall += `0`;
    }
    sboCount.innerHTML = `S : ${this.sboCountStrike}<br>B : ${this.sboCountBall}<br>O : ${this.sboCountOut}`;
}

// 1스트라이크 또는 1볼일 때 출력하는 메소드
game.isNormalPrint = function () {
    this.inningPrint();
    this.outputStr += `${this.condition}!<br>${this.strikeCount}S ${this.ballCount}B ${this.outCount}O<br>`;
    inningOuput.innerHTML = this.outputStr;
    this.getSboCountStrike();
    this.getSboCountBall();
    this.getSboCountOut();
    this.sboinit();
    this.printPshCount();
}

// 타석 바뀔 때 SBO전광판 초기화하는 메소드
game.sboinit = function () {
    this.sboCountStrike = '';
    this.sboCountBall = '';
    this.sboCountOut = '';
}

// SBO전광판에 팀 이름 출력하는 메소드
game.printScoreBoard2teamName = function () {
    if (this.isTeam1Attack()) {
        teamName.innerHTML = `${info.teamName1}팀`
    } else {
        teamName.innerHTML = `${info.teamName2}팀`
    }
}



// 팀 데이터 입력 핸들러 함수
function userWantInput() {
    info.userWantInput();
}

// 팀 데이터 확인 핸들러 함수
function userWantOutput() {
    info.userWantOutput();
}

// 게임시작 핸들러 함수
function userWantPlay() {
    info.userWantPlay();
}

// 팀 데이터 수정
function userWantModify() {
    info.userWantModify();
}
