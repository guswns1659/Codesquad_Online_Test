// input객체
// team1과 team2 선수들의 이름과 타율을 저장 
input={batterName1 : [],
       battingAvg1 : [],
       batterName2 : [],
       battingAvg2 : [],
       askCount : 1
};

// 데이터 입력 인지 출력인지 물어보는 메소드 
input.askChoice = function() {
    this.inputOrOutput = Number(prompt(`1.데이터 입력\n2.데이터 출력`));
}

// 사용자의 선택을 확인하는 메소드 
input.checkChoice = function() {
    if (this.inputOrOutput === 1 ){
        this.teamName();
        this.askBatterInfo();
    } else if (this.inputOrOutput === 2) {
        
    } else {
        alert('1과 2만 입력할 수 있습니다.');
    }
    
}

// 팀이름 입력을 요청하는 메소드
input.teamName = function () {
    if(this.askCount===1){
        this.teamName1 = prompt('1팀의 이름을 입력하세요');
    } else {
        this.teamName2 = prompt('2팀의 이름을 입력하세요');
    }
}

//team1에게 정보 물어보는 메소드
input.askToTeam1 = function () {
    for(let i = 0; i<2; i++){
        let batterName = prompt(`${i+1}번 타자 이름 입력`);
        let battingAvg = prompt(`${i+1}번 타자 타율 입력`);
        this.batterName1.push(batterName);
        this.battingAvg1.push(battingAvg);
        
    }

}

//team2에게 정보 물어보는 메소드
input.askToTeam2 = function () {
    for(let i = 0; i<2; i++){
        let batterName = prompt(`${i+1}번 타자 이름 입력`);
        let battingAvg = prompt(`${i+1}번 타자 타율 입력`);
        this.batterName2.push(batterName);
        this.battingAvg2.push(battingAvg);   
    }
}

// 타자 이름 입력을 요청하는 메소드
input.askBatterInfo = function () {
    if(this.askCount==1) {
        this.askToTeam1();
    } else {
        this.askToTeam2();
    }
    this.askCount++;
}


// 프로그램 시작 메소드
function init() {
 input.askChoice();
 input.checkChoice();
}
init();