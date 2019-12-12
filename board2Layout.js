const board2Row = document.querySelector('.board2Row');

const BOARD2CELL = [];

// 전광판에서 이닝 정보 출력하는 열
function makeInnCell() {
    copyText(`inningInfo`);
}

// 전광판에서 공격 팀, 타자 정보 출력
function makeAttCell() {
    copyText(`attackInfo`);
}

// 전광판에서 team1 정보 출력
function makeTeam1Cell() {
    copyText(`team1Info`);
}

// 전광판에서 SBO(STRIKE, BALL, OUT) 정보 출력
function makeSBOCell() {
    copyText(`SBOInfo`);
}

// 전광판에서 team2 정보 출력
function makeTeam2Cell() {
    copyText(`team2Info`);
}

function copyText(cellId){
    const cell = document.createElement('div');
    cell.classList.add(CELL_CN);
    cell.id = `${cellId}`;
    cell.innerHTML = `${cellId}`;
    board2Row.appendChild(cell);
    BOARD2CELL.push(cell);
}


function init(){
    makeInnCell();
    makeAttCell();
    makeTeam1Cell();
    makeSBOCell();
    makeTeam2Cell();
}
init()