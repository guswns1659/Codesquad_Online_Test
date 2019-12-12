const HSHCount = document.querySelector('.HSHCount');

game.printHSH = function () {
    this.getNumOfBall();
    this.getNumOfSO();
    this.getNumOfHit();
    HSHCount.innerHTML = this.HSHStr;
    this.HSHStr = '';
}

// 투구수 구하는 메소드
game.getNumOfBall = function () {
    if (this.isTeam1()) {
        this.NumOfBall[0]++;
        this.HSHStr += `투구 : ${this.NumOfBall[0]}개<br>`
    } else {
        this.NumOfBall[1]++;
        this.HSHStr += `투구 : ${this.NumOfBall[1]}개<br>`
    }
}

// 탈삼진 수 구하는 메소드
game.getNumOfSO = function () {
    if (this.isTeam1()){
        if (score.is3Strike()) {
            this.NumOfSO[0]++
            this.HSHStr += `탈삼진 : ${this.NumOfSO[0]}개<br>`
        } else {
            this.HSHStr += `탈삼진 : ${this.NumOfSO[0]}개<br>`
        }
    } else {
        if (score.is3Strike()) {
            this.NumOfSO[1]++
            this.HSHStr += `탈삼진 : ${this.NumOfSO[1]}개<br>`
        } else {
            this.HSHStr += `탈삼진 : ${this.NumOfSO[1]}개<br>`
        }
    }    
}

// 총 안타수 구하는 메소드
game.getNumOfHit = function () {
    if (this.isTeam1()){
        if (score.isHit()) {
            this.NumOfHit[0]++
            this.HSHStr += `안타 : ${this.NumOfHit[0]}개<br>`
        } else {
            this.HSHStr += `안타 : ${this.NumOfHit[0]}개<br>`
        }
    } else {
        if (score.isHit()) {
            this.NumOfHit[1]++
            this.HSHStr += `안타 : ${this.NumOfHit[1]}개<br>`
        } else {
            this.HSHStr += `안타 : ${this.NumOfHit[1]}개<br>`
        }
    }    
}
