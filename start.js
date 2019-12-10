const startBtn = document.querySelector('.js-startBtn'),
    printInning = document.querySelector('.printInning'),
    printAttack = document.querySelector('.printAttack'),
    printBatter = document.querySelector('.printBatter'),
    printBallCount = document.querySelector('.printBallCount');

// 공던지기 버튼 핸들러 함수
const userWantStart = function () {
    game.init();

};

// 게임 객체
// 결과 출력 등 게임 진행 담당
game = {
    batterStr: '',
    ballCountStr: ''
};


// 스코어 객체
// 볼카운트 관련 담당
score = {
    CONDITIONS: ['STRIKE', 'BALL', 'HIT', 'OUT'],
    currnetCond: '',
    BALLCOUNT: [0, 0, 0, 0], // 스트라이크, 볼, 안타, 아웃
    NumOfBall: 1,
};

// 공 던지는 메소드
game.init = function () {
    score.getCond();
    score.plusBallCount();
    score.handleBallCount();
    score.initCount();
    this.print();
    this.plusBatOrder();
    // this.initPrint();
    score.NumOfBall++;
}

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

score.isStrikeOrBall = function () {
    return this.currnetCond === 'STRIKE' || this.currnetCond === 'BALL';
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
    if (this.is3Strike()) {
        this.BALLCOUNT[0] = 0;
        this.BALLCOUNT[3] += 1;
    }
}
// 4B = 1H
score.BallToHit = function () {
    if (this.is4Ball()) {
        this.BALLCOUNT[1] = 0;
        this.BALLCOUNT[2] += 1;
    }
}

// 타석 바뀔 때 S, B 초기화
score.initCount = function () {
    if (score.isHit() || score.isOut() || score.is3Strike() || score.is4Ball()) {
        this.BALLCOUNT[0] = 0;
        this.BALLCOUNT[1] = 0;
    }
}

// 타석 바뀔 때 타순 증가 시키기.
game.plusBatOrder = function () {
    if (score.isHit() || score.isOut() || score.is3Strike() || score.is4Ball()) {
        input.team1BatOrder++;
    }
    console.log(input.team1BatOrder);
}


// 게임 결과를 출력하는 메소드
game.print = function () {
    if (score.isAttackOver()) {
        this.printIsAttackOver();
    } else if (score.is3Strike()) {
        this.printIs3Strike();
    } else if(score.is4Ball()){
        this.printIs4Ball();
    } else if (score.isHit()) {
        this.printIsHit();
    } else if (score.isOut()) {
        this.printIsOut();
    } else if (score.isStrikeOrBall()) {
        this.printIsStrikeOrBall();
    }
}

// 게임 오버일 때 프린트
game.printIsAttackOver = function () {
    this.ballCountStr += `${score.currnetCond}!<br><br>`;
    this.ballCountStr += `0S 0B ${score.BALLCOUNT[3]}O<br><br>`;
    this.ballCountStr += `게임 종료!!<br><br>`;
    this.ballCountStr += `최종 안타 수 : ${score.BALLCOUNT[2]}개!<br>`;
    this.ballCountStr += `투구 수 : ${score.NumOfBall}개!`;
    printBallCount.innerHTML = this.ballCountStr;
}

// 3STRIKE일 때 출력되는 메소드
game.printIs3Strike = function () {
    this.batterStr += `${input.team1BatOrder}번 ${input.team1BatName[input.team1BatOrder-1]}`
    printBatter.innerHTML = this.batterStr;
    this.batterStr = '';
    
    this.ballCountStr += `STRIKE OUT!<br><br>`;
    this.ballCountStr += `${score.BALLCOUNT[0]}S ${
        score.BALLCOUNT[1]}B ${score.BALLCOUNT[3]}O<br><br>`;
    this.ballCountStr += `다음 타자가 입장했습니다.<br><br>`;
    printBallCount.innerHTML = this.ballCountStr;
    this.ballCountStr = '';    
}

// 4BALL일 때 출력되는 메소드
game.printIs4Ball = function() {
    this.batterStr += `${input.team1BatOrder}번 ${input.team1BatName[input.team1BatOrder-1]}`
    printBatter.innerHTML = this.batterStr;
    this.batterStr = '';

    this.ballCountStr += `4BALL 진루!!<br><br>`;
    this.ballCountStr += `${score.BALLCOUNT[0]}S ${
        score.BALLCOUNT[1]}B ${score.BALLCOUNT[3]}O<br><br>`;
    this.ballCountStr += `다음 타자가 입장했습니다.<br><br>`;
    printBallCount.innerHTML = this.ballCountStr;
    this.ballCountStr = '';
}


// 스트라이크와 볼일 때 프린트
game.printIsStrikeOrBall = function () {
    this.batterStr += `${input.team1BatOrder}번 ${input.team1BatName[input.team1BatOrder-1]}`
    printBatter.innerHTML = this.batterStr;
    this.batterStr = '';

    this.ballCountStr += `${score.currnetCond}!<br><br>`;
    this.ballCountStr += `${score.BALLCOUNT[0]}S ${
        score.BALLCOUNT[1]}B ${score.BALLCOUNT[3]}O<br><br>`;
    printBallCount.innerHTML = this.ballCountStr;
}


// 안타일 때 프린트
game.printIsHit = function () {
    this.batterStr += `${input.team1BatOrder}번 ${input.team1BatName[input.team1BatOrder-1]}`
    printBatter.innerHTML = this.batterStr;
    this.batterStr = '';

    this.ballCountStr += `${score.currnetCond}!<br><br>`;
    this.ballCountStr += `${score.BALLCOUNT[0]}S ${
        score.BALLCOUNT[1]}B ${score.BALLCOUNT[3]}O<br><br>`;
    this.ballCountStr += `다음 타자가 입장했습니다.<br><br>`;
    printBallCount.innerHTML = this.ballCountStr;
    this.ballCountStr = '';
}
// 아웃일 때 프린트
game.printIsOut = function () {
    this.batterStr += `${input.team1BatOrder}번 ${input.team1BatName[input.team1BatOrder-1]}`
    printBatter.innerHTML = this.batterStr;
    this.batterStr = '';

    this.ballCountStr += `${score.currnetCond}!<br><br>`;
    this.ballCountStr += `${score.BALLCOUNT[0]}S ${
        score.BALLCOUNT[1]}B ${score.BALLCOUNT[3]}O<br><br>`;
    this.ballCountStr += `다음 타자가 입장했습니다.<br><br>`;
    printBallCount.innerHTML = this.ballCountStr;
    this.ballCountStr = '';
}

function init() {
    startBtn.addEventListener('click', userWantStart);
}
init();