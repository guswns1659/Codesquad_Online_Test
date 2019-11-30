/*
    -타율 물어볼 때 세자리수 입력하면 자동으로 0.321 바꿔주는 기능 추가 
    -타율 세자리수 아니면 alert로 예외 처리
    -데이터 입력 완료하고 처음 화면 띄워서 출력을 물어보기, 만약 입력 완료한 상태면 입력 완료 말하기 
        -수정까지 추가하면 좋을 듯. 한번 잘 못 입력하면 불편..   
*/


// HTML elements
const output1 = document.getElementById('output1'); // Team1 output
const output2 = document.getElementById('output2'); // Team2 output


// info객체
// team1과 team2 선수들의 이름과 타율을 저장 
info = {
    batterName1: [],
    battingAvg1: [],
    batterName2: [],
    battingAvg2: [],
    askCount: 1
};

// 팀 데이터 입력할건지 출력할건지 물어보는 메소드 
info.askChoice = function () {
    this.inputOrOutput = Number(prompt(`1.팀 데이터 '입력'\n2.팀 데이터 '출력'`));
}

// 사용자의 선택을 확인하는 메소드 
info.checkChoice = function () {
    if (this.inputOrOutput === 1) {
        this.teamName();
        this.askBatterInfo();
        this.teamName();
        this.askBatterInfo();
        alert('팀 데이터 입력 완료!!');
        this.printTeam1Info();
        this.printTeam2Info();
    } else if (this.inputOrOutput === 2) {
        if (this.askCount === 1) {
            alert('현재 입력된 데이터가 없습니다!\n먼저 팀 데이터를 입력해주세요!!');
            init();
        }
    } else {
        alert('1과 2만 입력할 수 있습니다.');
        init();
    }
}

// 팀이름 입력을 요청하는 메소드
info.teamName = function () {
    if (this.askCount === 1) {
        this.teamName1 = prompt('1팀의 이름을 입력하세요. ex)손현준');
    } else {
        this.teamName2 = prompt('2팀의 이름을 입력하세요.');
    }
}

// Team1에게 정보 물어보는 메소드
info.askToTeam1 = function () {
    for (let i = 0; i < 3; i++) {
        let batterName = prompt(`1팀의 ${i + 1}번 타자의 '이름'을 입력하세요!`);
        let battingAvg = prompt(`1팀의 ${i + 1}번 타자의 '타율'을 입력하세요! ex) 0.333`);
        this.batterName1.push(batterName);
        this.battingAvg1.push(battingAvg);
    }
}

// Team2에게 정보 물어보는 메소드
info.askToTeam2 = function () {
    for (let i = 0; i < 3; i++) {
        let batterName = prompt(`2팀의 ${i + 1}번 타자의 '이름'을 입력하세요!`);
        let battingAvg = prompt(`2팀의 ${i + 1}번 타자의 '타율'을 입력하세요! ex) 0.432`);
        this.batterName2.push(batterName);
        this.battingAvg2.push(battingAvg);
    }
}

// 타자 이름 입력을 요청하는 메소드
info.askBatterInfo = function () {
    if (this.askCount == 1) {
        this.askToTeam1();
    } else {
        this.askToTeam2();
    }
    this.askCount++;
}

// 반복되는 출력 코드 모아놓은 메소드
info.printCopyText = function (teamname, batterName, battingAvg, output) {
    let outputText = '';
    let name = teamname;
    let batter = batterName;
    let batting = battingAvg;
    let outputHTML = output;
    outputText += `${name}팀 정보!!<br>`;
    for (let i = 0; i < batter.length; i++) {
        outputText += `${i + 1}번 타자 - 이름 : ${batter[i]} 
        / 타율 : ${batting[i]}<br>`;
    }
    outputHTML.innerHTML = outputText;
}

// Team1 정보 출력하는 메소드
info.printTeam1Info = function () {
    this.printCopyText(info.teamName1, info.batterName1, info.battingAvg1, output1);
}
// Team2 정보 출력하는 메소드
info.printTeam2Info = function () {
    this.printCopyText(info.teamName2, info.batterName2, info.battingAvg2, output2);

}

// 프로그램 시작 메소드
function init() {
    info.askChoice();
    info.checkChoice();
}
