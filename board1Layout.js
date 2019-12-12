const row1 = document.querySelector('#row1'),
    row2 = document.querySelector('#row2'),
    row3 = document.querySelector('#row3');

const CELL_CN = 'board1Cell';
const TEAM1CELL = [];
const TEAM2CELL = [];

// 점수 전광판의 첫번째 행 레이아웃
function makeCell1() {
    for(let i = 0; i<8; i++){
        const cell = document.createElement('div');
        cell.classList.add(CELL_CN);
        cell.id = `cell${i}`;
        cell.innerHTML = `${i}회`;
        row1.appendChild(cell);
    }
    const cell0 = row1.querySelector('#cell0');
    cell0.innerHTML = `전광판`;
    const cell7 = row1.querySelector('#cell7');
    cell7.innerHTML = `Total`;
}

// 점수 전광판의 두번째 행 레이아웃
function makeCell2() {
    for(let i = 0; i<8; i++){
        const cell = document.createElement('div');
        cell.classList.add(CELL_CN);
        cell.id = `cell${i}`;
        cell.innerHTML = `0`;
        row2.appendChild(cell);
        TEAM1CELL.push(cell);
    }
    const cell0 = row2.querySelector('#cell0');
    cell0.innerHTML = `삼성`;
}

// 점수 전광판의 세번째 행 레이아웃
function makeCell3() {
    for(let i = 0; i<8; i++){
        const cell = document.createElement('div');
        cell.classList.add(CELL_CN);
        cell.id = `cell${i}`;
        cell.innerHTML = `0`;
        row3.appendChild(cell);
        TEAM2CELL.push(cell);
    }
    const cell0 = row3.querySelector('#cell0');
    cell0.innerHTML = `LG`;
}

function init() {
    makeCell1();
    makeCell2();
    makeCell3();
}
init();