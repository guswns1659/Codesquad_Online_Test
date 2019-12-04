// HTML elements
// 현재 이닝 수와 타자의 이름을 출력할 때 사용하는 HTML elements
const attackOutput0 = document.querySelector('.attackOutput'), // 1회초 00팀 공격 출력 
    attackOutput = attackOutput0.querySelector('p'); // 1회초 00팀 공격 출력 
const inningOuput0 = document.querySelector('.inningOuput'), // 게임 결과 출력
    inningOuput = inningOuput0.querySelector('p'); // 게임 결과 출력

// team1과 team2의 선수 목록 출력할 때 사용하는 HTML elements
const team1Output0 = document.querySelector('.team1Output'), // Team1 output
    team1Output = team1Output0.querySelector('p');
const team2Output0 = document.querySelector('.team2Output'), // Team2 output
    team2Output = team2Output0.querySelector('p');

//전광판 점수 출력할 때 사용하는 HTML elements
const container = document.querySelector('.container'),
    scoreBoard1Row2 = container.querySelector('.scoreBoard1Row2'),
    scoreBoard1Row3 = container.querySelector('.scoreBoard1Row3'),
    scoreBoard1Team1 = scoreBoard1Row2.querySelector('p'),
    scoreBoard1Team2 = scoreBoard1Row3.querySelector('p');
// 전광판에 team1 점수 표시할 때 사용하는 HTML elements
const team1Score1 = scoreBoard1Row2.querySelector('#team1Score1');
const team1Score2 = scoreBoard1Row2.querySelector('#team1Score2');
const team1Score3 = scoreBoard1Row2.querySelector('#team1Score3');
const team1Score4 = scoreBoard1Row2.querySelector('#team1Score4');
const team1Score5 = scoreBoard1Row2.querySelector('#team1Score5');
const team1Score6 = scoreBoard1Row2.querySelector('#team1Score6');
const team1Score7 = scoreBoard1Row2.querySelector('#team1Score7');
// 전광판에 team1 점수 표시할 때 사용하는 HTML elements
const team2Score1 = scoreBoard1Row3.querySelector('#team2Score1');
const team2Score2 = scoreBoard1Row3.querySelector('#team2Score2');
const team2Score3 = scoreBoard1Row3.querySelector('#team2Score3');
const team2Score4 = scoreBoard1Row3.querySelector('#team2Score4');
const team2Score5 = scoreBoard1Row3.querySelector('#team2Score5');
const team2Score6 = scoreBoard1Row3.querySelector('#team2Score6');
const team2Score7 = scoreBoard1Row3.querySelector('#team2Score7');

// SBO카운트 출력과 PSH(투구수, 삼진수, 안타수) 출력할 때 사용하는 HTML elements
const scoreBoard2 = document.querySelector('.scoreBoard2'),
    sboCount = scoreBoard2.querySelector('#sboCount'),
    PSHCount = scoreBoard2.querySelector('#PSHCount'),
    teamName = scoreBoard2.querySelector('#teamName');

// 컨디션을 모아놓은 리스트
const CONDITION_LIST = ['STRIKE', 'BALL', 'HIT', 'OUT']

// info객체
// team1과 team2 선수들의 이름과 타율을 저장 
info = {
    batterName1: [],
    battingAvg1: [],
    batterName2: [],
    battingAvg2: [],
    askCount: 1
};

// 게임 객체
// 야구와 관련된 속성 및 메소드 저장
game = {
    isTeam1: true,
    inning: 1,
    team1PlayerOrder: 0,
    team2PlayerOrder: 0,
    strikeCount: 0,
    ballCount: 0,
    hitCount: 0,
    outCount: 0,
    team1Score: 0,
    team2Score: 0,
    team1inningScore: 0,
    team2inningScore: 0,
    outputStr: '',
    sboCountStrike: '',
    sboCountBall: '',
    sboCountOut: '',
    team1PitchCount: 0,
    team2PitchCount: 0,
    team1SOCount: 0,
    team2SOCount: 0,
    team1HitCount: 0,
    team2HitCount: 0
};

