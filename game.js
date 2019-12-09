// 구현 남은 것 : 점수 계산, 선수 정보 출력.

const playBtn = btnContainer.querySelector('.js-playBtn'),
    inningInfo = document.querySelector('.inningInfo'),
    attackInfo = document.querySelector('.attackInfo'),
    batterInfo = attackInfo.querySelector('#batterInfo'),
    ballCountInfo = attackInfo.querySelector('#ballCountInfo');


// 게임 객체

game = {
    attackOutput: '',
    inningOutput: '',
    team1: true,
    inningCount: 1,
    NumOfBall1: 1,
    NumOfBall2: 1,
};

// 공 던지는 메소드
game.init = function () {
    // _game = game;
    score.getCond(); // 컨디션 얻고 
    score.plusBallCount(); // 볼카운트 추가하고
    score.handleBallCount(); // 3스크라이크면 1아웃 추가하고
    score.initCount(); // 타석 바뀌면 아웃 제외한 볼카운트 초기화
    score.plusBatOrder(); // 타석 바뀌면 타순 1올리기
    game.inningPrint(); // 현재 이닝 정보 출력하기
    game.print(); // 공 던지고 결과에 따라 출력하기
    game.changeInning(); // team2가 공격인데 공수전환하면 이닝 추가.
    game.changeCurrAtt(); // 공수 전환일 때 공격팀 누군지 알려주기
    game.initInningCount(); // 공수전환일 때 모든 볼카운트 초기화
    game.NumOfBall1++;
    game.NumOfBall2++;
}

// 이닝 바뀌면 볼카운트 초기화
game.initInningCount = function() {
    if(score.isAttackOver()){
        score.BALLCOUNT[0] = 0;
        score.BALLCOUNT[1] = 0;
        score.BALLCOUNT[2] = 0;
        score.BALLCOUNT[3] = 0;
    }
}

// 지금 team1 공격인지 답하는 메소드
game.isTeam1 = function () {
    return this.team1;
}

// 공수 전환할 때 어느 팀이 공격인지 알려주는 메소드
game.changeCurrAtt = function () {
    if(score.isAttackOver()){
        this.team1 = !this.team1;
    }
}

// team2에서 공수 전환할 때 이닝 카운트 1개를 올려주는 메소드
game.changeInning = function() {
    if(!this.isTeam1()){
        if(score.isAttackOver()){
            this.inningCount++;
        }
    }
}

// 출력 단어를 초기화
game.initPrint = function () {
    this.attackOutput = '';
}

// 이닝 정보와 팀을 출력하는 메소드
game.inningPrint = function () {
    if (this.isTeam1()) {
        this.inningOutput += `${this.inningCount}회초<br>`
            + `${input.teamName[0]}팀 공격!<br><br>` +
            `${input.teamName[0]} VS ${input.teamName[1]}<br><br>` +
            `${score.team1Score} : ${score.team2Score}`;
        inningInfo.innerHTML = this.inningOutput;
        this.inningOutput = '';
    } else {
        this.inningOutput += `${this.inningCount}회말<br>`
            + `${input.teamName[1]}팀 공격!<br><br>` +
            `${input.teamName[0]} VS ${input.teamName[1]}<br><br>` +
            `${score.team1Score} : ${score.team2Score}`;
        inningInfo.innerHTML = this.inningOutput;
        this.inningOutput = '';
    }
}

// 게임 결과를 출력하는 메소드
game.print = function () {
    if (score.isAttackOver()) {
        this.printisAttackOver();
    } else if (score.isStrike()) {
        this.printIsStrike();
    } else if (score.isBall()) {
        this.printIsBall();
    } else if (score.isHit()) {
        this.printIsHit();
    } else if (score.isOut()) {
        this.printIsOut();
    }
}
// 스트라이크일 때 프린트
game.printIsStrike = function () {
    this.attackOutput += `${score.currnetCond}!<br><br>`;
    this.attackOutput += `${score.BALLCOUNT[0]}S ${
        score.BALLCOUNT[1]}B ${score.BALLCOUNT[3]}O<br><br>`;
    attackInfo.innerHTML = this.attackOutput;
}

// 볼일 때 프린트
game.printIsBall = function () {
    this.attackOutput += `${score.currnetCond}!<br><br>`;
    this.attackOutput += `${score.BALLCOUNT[0]}S ${
        score.BALLCOUNT[1]}B ${score.BALLCOUNT[3]}O<br><br>`;
    attackInfo.innerHTML = this.attackOutput;

}
// 안타일 때 프린트
game.printIsHit = function () {
    this.attackOutput += `${score.currnetCond}!<br><br>`;
    this.attackOutput += `${score.BALLCOUNT[0]}S ${
        score.BALLCOUNT[1]}B ${score.BALLCOUNT[3]}O<br><br>`;
    this.attackOutput += `다음 타자가 입장했습니다.<br><br>`;
    attackInfo.innerHTML = this.attackOutput;
    this.attackOutput = '';
}
// 아웃일 때 프린트
game.printIsOut = function () {
    this.attackOutput += `${score.currnetCond}!<br><br>`;
    this.attackOutput += `${score.BALLCOUNT[0]}S ${
        score.BALLCOUNT[1]}B ${score.BALLCOUNT[3]}O<br><br>`;
    this.attackOutput += `다음 타자가 입장했습니다.<br><br>`;
    attackInfo.innerHTML = this.attackOutput;
    this.attackOutput = '';
}
// 공수 전환일 때 프린트
game.printisAttackOver = function () {
    this.attackOutput += `${score.currnetCond}!<br><br>`;
    this.attackOutput += `0S 0B ${score.BALLCOUNT[3]}O<br><br>`;
    this.attackOutput += `Inning Change!!!`;
    this.attackOutput += `투구 수 : ${this.NumOfBall}개!`;
    attackInfo.innerHTML = this.attackOutput;
    this.attackOutput = '';
}


// 스코어 객체
// 볼카운트 관련 담당
score = {
    CONDITIONS: ['STRIKE', 'BALL', 'HIT', 'OUT'],
    currnetCond: '',
    BALLCOUNT: [0, 0, 0, 0], // 스트라이크, 볼, 안타, 아웃
    team1Score: 0,
    team2Score: 0
};

// 타석 바뀔 때 타순 하나씩 증가하는 메소드
score.plusBatOrder = function () {
    if (game.isTeam1()) {
        if (this.is3Strike() || this.is4Ball() || this.isHit() || this.isOut()) {
            input.team1Order++;
        }
    } else {
        if (this.is3Strike() || this.is4Ball() || this.isHit() || this.isOut()) {
            input.team2Order++;
        }
    }
}


// 볼 컨디션 구하는 메소드
score.getCond = function () {
    if (game.isTeam1()) {
        this.getProba(input.team1batAvg, input.team1Order);
    } else {
        this.getProba(input.team2batAvg, input.team2Order);
    }
}

// 확률을 구하는 메소드
score.getProba = function (batAvg, batOrder) {
    const hit = batAvg[batOrder];
    const strike = (((1 - hit) / 2) - 0.05);
    const ball = (((1 - hit) / 2) - 0.05);
    const RANDOM = Math.random();
    if (0 < RANDOM && RANDOM < strike) {
        this.currnetCond = this.CONDITIONS[0];
    } else if (strike < RANDOM && RANDOM < (strike + ball)) {
        this.currnetCond = this.CONDITIONS[1];
    } else if ((strike + ball) < RANDOM && RANDOM < (strike + ball + hit)) {
        this.currnetCond = this.CONDITIONS[2];
    } else {
        this.currnetCond = this.CONDITIONS[3];
    }
}


// 볼 카운트를 추가하는 메소드
score.plusBallCount = function () {
    if (this.isStrike()) {
        this.BALLCOUNT[0] += 1;
    } else if (this.isBall()) {
        this.BALLCOUNT[1] += 1;
    } else if (this.isHit()) {
        this.BALLCOUNT[2] += 1;
    } else if (this.isOut()) {
        this.BALLCOUNT[3] += 1;
    }
}

score.isStrike = function () {
    return this.currnetCond === 'STRIKE';
}
score.isBall = function () {
    return this.currnetCond === 'BALL';
}
score.isHit = function () {
    return this.currnetCond === 'HIT';
}
score.isOut = function () {
    return this.currnetCond === 'OUT';
}
score.is3Strike = function () {
    return this.BALLCOUNT[0] === 3;
}
score.is4Ball = function () {
    return this.BALLCOUNT[1] === 4;
}

// 공수 전환되는지 확인 메소드
score.isAttackOver = function () {
    return this.BALLCOUNT[3] === 3;
}

// 볼카운트 관리하는 메소드
score.handleBallCount = function () {
    this.StrikeTo1Out();
    this.BallToHit();
}

//3S = 1O
score.StrikeTo1Out = function () {
    if (this.BALLCOUNT[0] === 3) {
        this.BALLCOUNT[0] = 0;
        this.BALLCOUNT[3] += 1;
    }
}
// 4B = 1H
score.BallToHit = function () {
    if (this.BALLCOUNT[1] === 4) {
        this.BALLCOUNT[1] = 0;
        this.BALLCOUNT[2] += 1;
    }
}

// 타석 바뀔 때 S, B 초기화
score.initCount = function () {
    if (this.isHit() || this.isOut() || this.is3Strike() || this.is4Ball()) {
        this.BALLCOUNT[0] = 0;
        this.BALLCOUNT[1] = 0;
    }
}

function init() {
    playBtn.addEventListener('click', game.init);
}
init();