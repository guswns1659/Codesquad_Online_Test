// score Object
// intialize score and change score.
score = {scoreList : ['스트라이크', '볼', '안타', '아웃'],
         strikeCount : 0,
         ballCount : 0,
         hitCount : 0,
         outCount : 0
};

//print score 
score.print = function (score) {
    console.log(score);
};

// Pick random score in scoreList 
score.pickRandomScore = function (){
    const randomNum = Math.floor(Math.random() * 4); // 0, 1, 2, 3
    const score = this.scoreList[randomNum] // 스크라이크
    this.print(score);
};

// Method for starting game 
score.init = function () {
    console.log(`첫 번째 타자가 타석에 입장했습니다.`);
    this.pickRandomScore();
}
score.init();