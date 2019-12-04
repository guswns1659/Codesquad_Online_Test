// Baseball Game 
// By Hyunjun

// game Object
// Intialize condition and change condition.
game = {
    conditionList: ['STRIKE', 'BALL', 'HIT', 'OUT'],
    strikeCount: 0,
    ballCount: 0,
    hitCount: 0,
    outCount: 0,
    playCount: 1,
};

// Accumulate condition
// ex) 3 strike === 1 out
game.checkAccumulation = function () {
    if (this.strikeCount === 3) {
        this.outCount++;
    } else if (this.ballCount === 4) {
        this.hitCount++;
    }
}

// Checking if game is over or not
game.isOver = function () {
    return this.outCount === 3;
}

// Checking if condition is hit 
game.isHit = function () {
    return this.condition === 'HIT';
}

// Checking if condition is out 
game.isOut = function() {
    return this.condition === 'OUT';
}

// Checking if condition is 3Strike 
game.is3Strike = function () {
    return this.strikeCount === 3;
}

// Checking if condition is 4Ball 
game.is4Ball = function () {
    return this.ballCount === 4;
}

// Checking progress of game and restarting game
game.progress = function () {
    if (this.isOver()) {
        this.isGameOverPrint();
    } else if (this.isHit()) {
        this.isHitPrint();
    } else if(this.isOut()){
        this.isOutPrint();
    } else if (this.is4Ball()) {
        this.is4BallPrint();
    } else if(this.is3Strike()){
        this.is3StrikePrint();
    } else {
        this.isNormalPrint();
    }
}

game.isGameOverPrint = function () {
    this.conditionInit();
    console.log(`아웃\n${this.strikeCount}S ${this.ballCount}B ${this.outCount}O`);
    console.log(`최종 안타 수 : ${this.hitCount}개 입니다.\nGAME OVER`);
}

game.isOutPrint = function() {
    console.log(`${this.condition}! 다음 타자가 타석에 입장했습니다.`);
    this.conditionInit();
    console.log(`${this.strikeCount}S ${this.ballCount}B ${this.outCount}O`);
    // this.init();
}

game.isHitPrint = function() {
    console.log(`${this.condition}! 다음 타자가 타석에 입장했습니다.`);
    this.conditionInit();
    console.log(`${this.strikeCount}S ${this.ballCount}B ${this.outCount}O`);
    // this.init();
}

game.is3StrikePrint = function() {
    console.log(`${this.condition}\n삼진아웃! 다음 타자가 타석에 입장했습니다.`)
    this.conditionInit();
    console.log(`${this.strikeCount}S ${this.ballCount}B ${this.outCount}O`);
}

game.is4BallPrint = function() {
    console.log(`${this.condition}\n4볼! 진루! 다음 타자가 타석에 입장했습니다.`)
    this.conditionInit();
    console.log(`${this.strikeCount}S ${this.ballCount}B ${this.outCount}O`);
}

game.isNormalPrint = function() {
    console.log(`${this.condition}!\n${this.strikeCount}S ${this.ballCount}B ${this.outCount}O`);
    // this.init();
}

// When player is changed, initialize strikeCount and ballCount 
game.conditionInit = function () {
    this.strikeCount = 0;
    this.ballCount = 0;
}

// Update count of condition
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

// Pick random game in conditionList 
game.pickRandomCondition = function () {
    const randomNum = Math.floor(Math.random() * 4); // 0, 1, 2, 3
    this.condition = this.conditionList[randomNum]
};

// Starting game 
game.init = function () {
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

// 게임시작 버튼 핸들러 함수
function init() {
    // game.init();
}
