// Step-1 
// By Hyunjun

//HTML elements for output
const container = document.querySelector(".container"),
    output = container.querySelector("#output");

// game Object
// Intialize condition and change condition.
game = {
    conditionList: ['STRIKE', 'BALL', 'HIT', 'OUT'],
    strikeCount: 0,
    ballCount: 0,
    hitCount: 0,
    outCount: 0,
    playCount: 1,
    outputStr : ''
};

// Starting game 
game.init = function () {
    if (this.playCount === 1) {
        this.playCount++;
        this.outputStr += `첫 번째 타자가 타석에 입장했습니다.<br><br>`;
        this.outputStr = '';
    }
    _this = game;
    _this.pickRandomCondition();
    _this.updateCondition();
    _this.checkAccumulation();
    _this.progress();
}

// Pick random game in conditionList 
game.pickRandomCondition = function () {
    const randomNum = Math.floor(Math.random() * 4); // 0, 1, 2, 3
    this.condition = this.conditionList[randomNum]
};

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

// Accumulate condition
// ex) 3 strike === 1 out
game.checkAccumulation = function () {
    if (this.strikeCount === 3) {
        this.outCount++;
    } else if (this.ballCount === 4) {
        this.hitCount++;
    }
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

// Printing output when game is over
game.isGameOverPrint = function () {
    this.conditionInit();
    this.outputStr += `아웃<br>${this.strikeCount}S ${this.ballCount}B ${this.outCount}O<br><br>`; 
    this.outputStr += `최종 안타 수 : ${this.hitCount}개 입니다.<br>GAME OVER`;
    output.innerHTML = this.outputStr;
    this.outputStr = '';
}

// Printing output when player is out
game.isOutPrint = function() {
    this.outputStr += `${this.condition}!<br>`;
    this.conditionInit();
    this.outputStr += `${this.strikeCount}S ${this.ballCount}B ${this.outCount}O
                      <br> 다음 타자가 타석에 입장했습니다.`;
    output.innerHTML = this.outputStr;
    this.outputStr = '';
    setTimeout(game.init, 1500);
}

// Printing output when player hit
game.isHitPrint = function() {
    this.outputStr += `${this.condition}!<br>`;
    this.conditionInit();
    this.outputStr += `${this.strikeCount}S ${this.ballCount}B ${this.outCount}O
                      <br> 다음 타자가 타석에 입장했습니다.`;
    output.innerHTML = this.outputStr;
    this.outputStr = '';
    setTimeout(game.init, 1500);
}

// Printing output when player is 3Strike
game.is3StrikePrint = function() {
    this.outputStr += `${this.condition}<br>삼진아웃!<br>`;
    this.conditionInit();
    this.outputStr += `${this.strikeCount}S ${this.ballCount}B ${this.outCount}O
                      <br> 다음 타자가 타석에 입장했습니다.`;
    output.innerHTML = this.outputStr;
    this.outputStr = '';
}

// Printing output when player is 4Ball
game.is4BallPrint = function() {
    this.outputStr += `${this.condition}<br>4볼! 진루!`;
    this.conditionInit();
    this.outputStr += `${this.strikeCount}S ${this.ballCount}B ${this.outCount}O
                      <br> 다음 타자가 타석에 입장했습니다.`;
    output.innerHTML = this.outputStr;
    this.outputStr = '';
}

// Printing output when player is 1Strike or 1Ball
game.isNormalPrint = function() {
    this.outputStr += `${this.condition}!<br>${this.strikeCount}S ${this.ballCount}B ${this.outCount}O<br><br>`;
    output.innerHTML = this.outputStr;
    setTimeout(game.init, 1500);
}

// When player is changed, initialize strikeCount and ballCount 
game.conditionInit = function () {
    this.strikeCount = 0;
    this.ballCount = 0;
}

// Handler function for game starting
function init() {
    game.init();
}