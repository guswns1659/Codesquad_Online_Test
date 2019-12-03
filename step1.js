// Baseball Game 
// By Hyunjun


// Score Object
// Intialize condition and change condition.
score = {
    conditionList: ['스트라이크', '볼', '안타', '아웃'],
    strikeCount: 0,
    ballCount: 0,
    hitCount: 0,
    outCount: 0,
    playCount: 1,
};

// Accumulate condition
// ex) 3 strike === 1 out
score.checkAccumulation = function () {
    if (this.strikeCount === 3) {
        this.outCount++;
    } else if (this.ballCount === 4) {
        this.hitCount++;
    }
}

// Print method
score.print = function () {
    if (this.isOver()) {
        console.log(`아웃!\n${this.strikeCount}S ${this.ballCount}B ${this.outCount}O`);
        console.log(`최종 안타 수 : ${this.hitCount}개 입니다.\nGAME OVER`);
    } else if (this.isOutOrHit()) {
        console.log(`${this.condition}! 다음 타자가 타석에 입장했습니다.`);
        this.conditionInit();
        console.log(`${this.strikeCount}S ${this.ballCount}B ${this.outCount}O`);
    } else if (this.is3StrikeOr4Ball()) {
        console.log(`${this.condition}\n아웃! 다음 타자가 타석에 입장했습니다.`)
        this.conditionInit();
        console.log(`${this.strikeCount}S ${this.ballCount}B ${this.outCount}O`);
    } else {
        console.log(`${this.condition}!\n${this.strikeCount}S ${this.ballCount}B ${this.outCount}O`);
    }
};

// Checking if game is over or not
score.isOver = function () {
    return this.outCount === 3;
}

// Checking if condition is hit or out 
score.isOutOrHit = function () {
    return this.condition === '안타' || this.condition === '아웃';
}

// Checking if condition is 3Strike or 4Ball 
score.is3StrikeOr4Ball = function () {
    return this.strikeCount === 3 || this.ballCount === 4;
}

// Checking progress of game and restarting game
score.progress = function () {
    if (this.isOver()) {
        this.conditionInit();
        this.print();
    } else if (this.isOutOrHit()) {
        this.print();
        this.init();
    } else if (this.is3StrikeOr4Ball()) {
        this.print();
        this.init();
    } else if (this.condition === '스트라이크' || this.condition === '볼') {
        this.print();
        this.init();
    }
}

// When player is changed, initialize strikeCount and ballCount 
score.conditionInit = function () {
    this.strikeCount = 0;
    this.ballCount = 0;
}


// Update count of condition
score.updateCondition = function () {
    if (this.condition === '스트라이크') {
        this.strikeCount++;
    } else if (this.condition === '볼') {
        this.ballCount++;
    } else if (this.condition === '안타') {
        this.hitCount++;
    } else if (this.condition === '아웃') {
        this.outCount++;
    }
}


// Pick random score in conditionList 
score.pickRandomCondition = function () {
    const randomNum = Math.floor(Math.random() * 4); // 0, 1, 2, 3
    this.condition = this.conditionList[randomNum]
};

// Starting game 
score.init = function () {
    if (this.playCount === 1) {
        this.playCount++;
        console.log(`신나는 야구게임!`);
        console.log(`첫 번째 타자가 타석에 입장했습니다.\n`);
    }
    this.pickRandomCondition();
    this.updateCondition();
    this.checkAccumulation();
    this.progress();

}
score.init();