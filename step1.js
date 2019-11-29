// Score Object
// Intialize score and change score.
score = {scoreList : ['스트라이크', '볼', '안타', '아웃'],
         strikeCount : 0,
         ballCount : 0,
         hitCount : 0,
         outCount : 0
};

// Print score
score.print = function (score) {
    console.log(score);
    console.log(`${this.strikeCount}S ${this.ballCount}B ${this.outCount}O`);
};

// Check how many accumulate count of score
// ex) 3 strikeCount === 1 outCount
score.checkAccumulate = function () {
    if(this.strikeCount === 3){
        this.outCount++;
    } else if(this.ballCount === 4) {
        this.hitCount++;
    }
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
    this.checkAccumulate(); // 스트라이크 3개면 아웃 1개
    this.print(score);
    
};

// starting game 
score.init = function () {
    console.log(`첫 번째 타자가 타석에 입장했습니다.`);
    this.pickRandomScore();
}
score.init();