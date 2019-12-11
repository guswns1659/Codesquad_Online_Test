// 사용자가 skip을 원할 때! 
game.wantSkip = function(num) {
    while(this.inningCount !== num+1){
        game.init();    
    }
    if(score.isGameOver()){
        game.init();
    } else{
        setTimeout(game.askSkip, 3000);
    }
}

// 사용자에게 skip할건지 물어보는 메소드
game.askSkip = function() {
    const respon = Number(prompt(`다음 공 던질래! : 1\n`+
        `n회말 결과 볼래! : n\n입력해주세요`));
    if (respon === 1){
        userWantStart();
    } else{
        game.wantSkip(respon);
    }
}

