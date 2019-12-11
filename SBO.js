const currTeam = document.querySelector('.currTeam'),
    SBOCount = document.querySelector('.SBOCount');

// SBO 출력하는 메소드
game.printSBO = function () {
    let ball = '';
    let strike = '';
    let out = '';
    strike = this.SBOstrike();
    ball = this.SBOball();
    out = this.SBOout();
    this.SBOStr += `S : ${strike}<br>`;
    this.SBOStr += `B : ${ball}<br>`;
    this.SBOStr += `O : ${out}`;
    SBOCount.innerHTML = this.SBOStr;
    this.SBOStr = '';
}

game.SBOstrike = function() {
    let strike = '';
    for(let i = 0; i<score.BALLCOUNT[0]; i++){
        strike += '0'; 
    }
    return strike;
}
game.SBOball = function() {
    let ball = '';
    for(let i = 0; i<score.BALLCOUNT[1]; i++){
        ball += '0'; 
    }
    return ball;
}
game.SBOout = function() {
    let out = '';
    for(let i = 0; i<score.BALLCOUNT[3]; i++){
        out += '0'; 
    }
    return out;
}