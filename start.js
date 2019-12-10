const startBtn = document.querySelector('.js-startBtn'),
    printInning = document.querySelector('.printInning'),
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
    ballCountStr: '',
    inningStr: '',
    team1: true,
    inningCount: 1,
};


// 스코어 객체
// 볼카운트 관련 담당
score = {
    CONDITIONS: ['STRIKE', 'BALL', 'HIT', 'OUT'],
    currnetCond: '',
    BALLCOUNT: [0, 0, 0, 0], // 스트라이크, 볼, 안타, 아웃
    NumOfBall: 1,
    team1Score: 0,
    team2Score: 0
};

// 공 던지는 메소드
game.init = function () {
    score.getCond();
    score.plusBallCount();
    score.handleBallCount();
    score.getScore();
    this.print();
    score.initCount();
    this.plusBatOrder();
    this.plusInningCount();
    this.changeTeam();
    this.initInning();
    // this.initPrint();
    score.NumOfBall++;
}

// const BATORDER_T1 = input.team1BatOrder;
// const input.team2BatOrder = input.team2BatOrder;

// 볼 컨디션 구하는 메소드
score.getCond = function () {
    if (game.isTeam1()) {
        const hit = input.team1BatAvg[input.team1BatOrder]
        const strike = ((1 - hit) / 2) - 0.05;
        const ball = ((1 - hit) / 2) - 0.05;
        this.getProbability(hit, strike, ball);
    } else {
        const hit = input.team2BatAvg[input.team2BatOrder]
        const strike = ((1 - hit) / 2) - 0.05;
        const ball = ((1 - hit) / 2) - 0.05;
        this.getProbability(hit, strike, ball);
    }
}

// 타율에 따른 확룔 구하는 메소드
score.getProbability = function (hit, strike, ball) {
    const RANDOM = Math.random();
    if (0 <= RANDOM && RANDOM <= strike) {
        this.currnetCond = 'STRIKE';
    } else if (strike <= RANDOM && RANDOM <= (strike + ball)) {
        this.currnetCond = 'BALL';
    } else if ((strike + ball) <= RANDOM && RANDOM <= 0.9) {
        this.currnetCond = 'HIT';
    } else if (0.9 <= RANDOM && RANDOM <= 1) {
        this.currnetCond = "OUT";
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
score.is4Hit = function () {
    return this.BALLCOUNT[2] === 4;
}
score.isGameOver = function () {
    return game.inningCount === 7;
}


// 볼카운트 관리하는 메소드
score.handleBallCount = function () {
    this.StrikeTo1Out();
    this.BallToHit();
}
//3S = 1O
score.StrikeTo1Out = function () {
    if (this.is3Strike()) {
        // this.BALLCOUNT[0] = 0;
        this.BALLCOUNT[3] += 1;
    }
}
// 4B = 1H
score.BallToHit = function () {
    if (this.is4Ball()) {
        // this.BALLCOUNT[1] = 0;
        this.BALLCOUNT[2] += 1;
    }
}

// 4안타 이후 점수 얻는 코드
score.getScore = function () {
    if (game.isTeam1()) {
        this.calcHitCount1();
        console.log(`team1Score : ${this.team1Score}`);
    } else {
        this.calcHitCount2();
        console.log(`team2Score : ${this.team2Score}`);
    }
}

// 1팀의 안타가 4개 넘을 때 점수추가하는 메소드
score.calcHitCount1 = function () {
    if (this.isHit()) {
        if (this.BALLCOUNT[2] > 4) {
            this.team1Score++;
        } else if (this.is4Hit()) {
            this.team1Score++;
        }
    }
}
// 2팀의 안타가 4개 넘을 때 점수추가하는 메소드
score.calcHitCount2 = function () {
    if (this.isHit()) {
        if (this.BALLCOUNT[2] > 4) {
            this.team2Score++;
        } else if (this.is4Hit()) {
            this.team2Score++;
        }
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
    if (this.isTeam1()) {
        input.team1BatOrder = this.plusBatOrder2(input.team1BatOrder);
    } else {
        input.team2BatOrder = this.plusBatOrder2(input.team2BatOrder);
    }
}
game.plusBatOrder2 = function (order) {
    if (score.isHit() || score.isOut() || score.is3Strike() || score.is4Ball()) {
        if (order === 9) {
            order = 1;
        } else {
            order++;
        }
    }
    return order;
}


// 공수전환할 때 현재 공격팀 바꿔주는 메소드 
game.changeTeam = function () {
    if (score.isAttackOver()) {
        this.team1 = !this.team1;
    }
}

// 현재 공격팀 확인하는 메소드
game.isTeam1 = function () {
    return this.team1;
}

// 이닝 바뀔 때 볼카운트 초기화
game.initInning = function () {
    if (score.isAttackOver()) {
        score.BALLCOUNT = [0, 0, 0, 0];
    }
}

game.plusInningCount = function () {
    if (!this.isTeam1()) {
        if (score.isAttackOver()) {
            this.inningCount++;
        }
    }
}

// 게임 결과를 출력하는 메소드
game.print = function () {
    if (score.isGameOver()) {
        this.printIsGameOver();
    } else if (score.isAttackOver()) {
        this.printIsAttackOver();
    } else if (score.is3Strike()) {
        this.printIs3Strike();
    } else if (score.is4Ball()) {
        this.printIs4Ball();
    } else if (score.isHit()) {
        this.printIsHit();
    } else if (score.isOut()) {
        this.printIsOut();
    } else if (score.isStrikeOrBall()) {
        this.printIsStrikeOrBall();
    }
}

// 각 팀에 따라 선수 출력창이 달라지는 메소드
game.printEachTeam = function () {
    if (this.isTeam1()) {
        this.batterStr += `${input.team1BatOrder}번 ${input.team1BatName[input.team1BatOrder - 1]}`
        printBatter.innerHTML = this.batterStr;
        this.batterStr = '';
    } else {
        this.batterStr += `${input.team2BatOrder}번 ${input.team2BatName[input.team2BatOrder - 1]}`
        printBatter.innerHTML = this.batterStr;
        this.batterStr = '';
    }
}

// 현재 이닝과 공격팀 출력하는 메소드
game.printInningInfo = function () {
    if (this.isTeam1()) {
        this.inningStr += `${this.inningCount}회초 ${input.teamName[0]}팀!<br><br>`;
        this.inningStr += `${input.teamName[0]} VS ${input.teamName[1]}<br><br>`;
        this.inningStr += `${score.team1Score} VS ${score.team2Score}`;
        printInning.innerHTML = this.inningStr;
        this.inningStr = '';
    } else {
        this.inningStr += `${this.inningCount}회말 ${input.teamName[1]}팀!<br><br>`;
        this.inningStr += `${input.teamName[0]} VS ${input.teamName[1]}<br><br>`;
        this.inningStr += `${score.team1Score} VS ${score.team2Score}`;
        printInning.innerHTML = this.inningStr;
        this.inningStr = '';
    }
}

// 게임 끝나면 출력되는 메소드
game.printIsGameOver = function () {
    this.inningStr += `게임 종료!<br><br>`;
    this.inningStr += `${input.teamName[0]} VS ${input.teamName[1]}<br><br>`;
    this.inningStr += `${score.team1Score} VS ${score.team2Score}`;
    printInning.innerHTML = this.inningStr;
    this.inningStr = '';

    this.ballCountStr += `Empty`;
    printBallCount.innerHTML = this.ballCountStr;
    this.ballCountStr = '';

    printBatter.innerHTML = '';
}


// 공수 전환할 때 일 때 프린트
game.printIsAttackOver = function () {
    this.printEachTeam();
    this.printInningInfo();

    this.ballCountStr += `${score.currnetCond}!<br><br>`;
    this.ballCountStr += `0S 0B ${score.BALLCOUNT[3]}O<br><br>`;
    this.ballCountStr += `공수 교대!!<br><br>`;
    this.ballCountStr += `투구 수 : ${score.NumOfBall}개!`;
    printBallCount.innerHTML = this.ballCountStr;
    this.ballCountStr = '';
}

// 3STRIKE일 때 출력되는 메소드
game.printIs3Strike = function () {
    this.printEachTeam();
    this.printInningInfo();

    this.ballCountStr += `STRIKE OUT!<br><br>`;
    this.ballCountStr += `0S 0B ${score.BALLCOUNT[3]}O<br><br>`;
    this.ballCountStr += `다음 타자가 입장했습니다.<br><br>`;
    printBallCount.innerHTML = this.ballCountStr;
    this.ballCountStr = '';
}

// 4BALL일 때 출력되는 메소드
game.printIs4Ball = function () {
    this.printEachTeam();
    this.printInningInfo();

    this.ballCountStr += `4BALL 진루!!<br><br>`;
    this.ballCountStr += `0S 0B ${score.BALLCOUNT[3]}O<br><br>`;
    this.ballCountStr += `다음 타자가 입장했습니다.<br><br>`;
    printBallCount.innerHTML = this.ballCountStr;
    this.ballCountStr = '';
}


// 스트라이크와 볼일 때 프린트
game.printIsStrikeOrBall = function () {
    this.printEachTeam();
    this.printInningInfo();

    this.ballCountStr += `${score.currnetCond}!<br><br>`;
    this.ballCountStr += `${score.BALLCOUNT[0]}S ${
        score.BALLCOUNT[1]}B ${score.BALLCOUNT[3]}O<br><br>`;
    printBallCount.innerHTML = this.ballCountStr;

}

// 안타일 때 프린트
game.printIsHit = function () {
    this.printEachTeam();
    this.printInningInfo();

    this.ballCountStr += `${score.currnetCond}!<br><br>`;
    this.ballCountStr += `0S 0B ${score.BALLCOUNT[3]}O<br><br>`;
    this.ballCountStr += `다음 타자가 입장했습니다.<br><br>`;
    printBallCount.innerHTML = this.ballCountStr;
    this.ballCountStr = '';
}
// 아웃일 때 프린트
game.printIsOut = function () {
    this.printEachTeam();
    this.printInningInfo();

    this.ballCountStr += `${score.currnetCond}!<br><br>`;
    this.ballCountStr += `0S 0B ${score.BALLCOUNT[3]}O<br><br>`;
    this.ballCountStr += `다음 타자가 입장했습니다.<br><br>`;
    printBallCount.innerHTML = this.ballCountStr;
    this.ballCountStr = '';
}

function init() {
    startBtn.addEventListener('click', userWantStart);
}
init();