// input객체
// team1과 team2 선수들의 이름과 타율을 저장 
input={batterName1 : [],
       battingAvg1 : []

};

// 데이터 입력 인지 출력인지 물어보는 메소드 
input.askChoice = function() {
    this.inputOrOutput = Number(prompt(`1.데이터 입력\n2.데이터 출력`));
}

// 사용자의 선택을 확인하는 메소드 
input.checkChoice = function() {
    if (this.inputOrOutput === 1 ){
        this.teamName();
    } else if (this.inputOrOutput === 2) {
        
    } else {
        alert('1과 2만 입력할 수 있습니다.');
    }
    
}

// 팀이름 입력을 요청하는 메소드
input.teamName = function () {
    this.teamName1 = prompt('1팀의 이름을 입력하세요');
}

// 타자 정보 입력을 요청하는 메소드
input.askBatterInfo = function () {

}

// 프로그램 시작 메소드
function init() {
 input.askChoice();
 input.checkChoice();
}
init();