const startBtn = document.querySelector('.js-startBtn'),
    printInning = document.querySelector('.printInning'),
    printAttack = document.querySelector('.printAttack'),
    printBatter = document.querySelector('.printBatter'),
    printBallCount = document.querySelector('.printBallCount');



const userWantStart = function() {
    game.init();    

};

input ={
    teamName : [],
    team1BatName : [],
    team2BatName : [],
    team1BatAvg : [],
    team2BatAvg : [],
    team1BatOrder: 1,
    team2BatOrder: 1
};

// 게임 객체
// 결과 출력 등 게임 진행 담당
game = {
    outputStr: ''
};

// 공 던지는 메소드
game.init = function () {
    score.getCond();
    score.plusBallCount();
    score.handleBallCount();
    score.initCount();
    this.print();
    this.initPrint();
    score.NumOfBall++;
}


// 게임 결과를 출력하는 메소드
game.print = function () {
    if (score.isOver()) {
        this.printIsOver();
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
    this.outputStr += `${score.currnetCond}!<br><br>`;
    this.outputStr += `${score.BALLCOUNT[0]}S ${
        score.BALLCOUNT[1]}B ${score.BALLCOUNT[3]}O<br><br>`;
    output.innerHTML = this.outputStr;
}

// 볼일 때 프린트
game.printIsBall = function () {
    this.outputStr += `${score.currnetCond}!<br><br>`;
    this.outputStr += `${score.BALLCOUNT[0]}S ${
        score.BALLCOUNT[1]}B ${score.BALLCOUNT[3]}O<br><br>`;
    output.innerHTML = this.outputStr;
}
// 안타일 때 프린트
game.printIsHit = function () {
    this.outputStr += `${score.currnetCond}!<br><br>`;
    this.outputStr += `${score.BALLCOUNT[0]}S ${
        score.BALLCOUNT[1]}B ${score.BALLCOUNT[3]}O<br><br>`;
    this.outputStr += `다음 타자가 입장했습니다.<br><br>`;
    output.innerHTML = this.outputStr;
}
// 아웃일 때 프린트
game.printIsOut = function () {
    this.outputStr += `${score.currnetCond}!<br><br>`;
    this.outputStr += `${score.BALLCOUNT[0]}S ${
        score.BALLCOUNT[1]}B ${score.BALLCOUNT[3]}O<br><br>`;
    this.outputStr += `다음 타자가 입장했습니다.<br><br>`;
    output.innerHTML = this.outputStr;
}
// 게임 오버일 때 프린트
game.printIsOver = function () {
    this.outputStr += `${score.currnetCond}!<br><br>`;
    this.outputStr += `0S 0B ${score.BALLCOUNT[3]}O<br><br>`;
    this.outputStr += `게임 종료!!<br><br>`;
    this.outputStr += `최종 안타 수 : ${score.BALLCOUNT[2]}개!<br>`;
    this.outputStr += `투구 수 : ${score.NumOfBall}개!`;
    output.innerHTML = this.outputStr;
}


// 스코어 객체
// 볼카운트 관련 담당
score = {
    CONDITIONS: ['STRIKE', 'BALL', 'HIT', 'OUT'],
    currnetCond: '',
    BALLCOUNT: [0, 0, 0, 0], // 스트라이크, 볼, 안타, 아웃
    NumOfBall: 1,
};

// 볼 컨디션 구하는 메소드
score.getCond = function () {
    const randomNum = Math.floor(Math.random() * this.CONDITIONS.length);
    this.currnetCond = this.CONDITIONS[randomNum];
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
score.isOver = function () {
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
    if (this.isHit()) {
        this.BALLCOUNT[0] = 0;
        this.BALLCOUNT[1] = 0;
    } else if (this.isOut()) {
        this.BALLCOUNT[0] = 0;
        this.BALLCOUNT[1] = 0;
    } else if (this.is3Strike()) {
        this.BALLCOUNT[0] = 0;
        this.BALLCOUNT[1] = 0;
    } else if (this.is4Ball()) {
        this.BALLCOUNT[0] = 0;
        this.BALLCOUNT[1] = 0;
    }
}


function init() {
    startBtn.addEventListener('click', userWantStart);
}
init();printAttack