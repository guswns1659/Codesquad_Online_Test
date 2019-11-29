// Score Object
// Intialize score and change score.
score = {scoreList : ['스트라이크', '볼', '안타', '아웃'],
         strikeCount : 0,
         ballCount : 0,
         hitCount : 0,
         outCount : 0,
         playCount : 0
};


// Checking how many accumulate count of score
// ex) 3 strikeCount === 1 outCount
score.checkAccumulation = function () {
    if(this.strikeCount === 3){
        this.outCount++;
    } else if(this.ballCount === 4) {
        this.hitCount++;
    }
}
// Print score
score.print = function (score) {
    // console.log(score);
    if(this.isOver()) {
        console.log(`${score}!\n${this.strikeCount}S ${this.ballCount}B ${this.outCount}O`);
        console.log(`안타 개수 : ${this.hitCount} 입니다.`);
    } else if(this.isPlayerFinished(score)) {
        console.log(`${score} 다음 타자가 타석에 입장했습니다.`);
        console.log(`${this.strikeCount}S ${this.ballCount}B ${this.outCount}O`);
    } else {
        console.log(`${score}\n${this.strikeCount}S ${this.ballCount}B ${this.outCount}O`);
    }
};

// Checking game is over or not
score.isOver = function () {
    return this.outCount === 3;
}

// Checking player is finished or not 
score.isPlayerFinished = function (score) {
    return score === '안타' || score === '아웃' || this.strikeCount === 3 || this.ballCount ===4;
}

// Checking progression of game and Initializing game
score.progress = function (score) {
    if (this.isOver()){
        this.scoreInit();
        this.print(score);
    } else if (this.isPlayerFinished(score)) {
        this.scoreInit();
        this.print(score);
        this.init();
    } else if (score === '스트라이크' || score ==='볼'){
        this.print(score);
        this.init();
    }
}

// When player changed, initialize strikeCount and ballCount 
score.scoreInit = function () {
    this.strikeCount = 0;
    this.ballCount = 0;
}


// Update count of score
score.updateScore =function (score) {
    if(score === '스트라이크') {
        this.strikeCount++;
    } else if(score === '볼') {
        this.ballCount++;
    } else if(score === '안타') {
        this.hitCount++;
    } else if(score === '아웃') {
        this.outCount++;
    } 
}


// Pick random score in scoreList 
score.pickRandomScore = function (){
    const randomNum = Math.floor(Math.random() * 4); // 0, 1, 2, 3
    const score = this.scoreList[randomNum] // 스크라이크
    this.updateScore(score); // strikeCount++;
    this.checkAccumulation(); // 스트라이크 3개면 아웃 1개
    // this.print(score);
    this.progress(score);
};

// starting game 
score.init = function () {
    if(this.playCount === 0) {
        this.playCount++;
        console.log(`신나는 야구게임!`);
        console.log(`첫 번째 타자가 타석에 입장했습니다.\n`);
    }
    this.pickRandomScore();
}
score.init();