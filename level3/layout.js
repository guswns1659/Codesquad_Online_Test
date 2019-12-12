const board1Container = document.querySelector('.board1Container'),
    board1Row1 = board1Container.querySelector('#row1'),
    board1Row2 = board1Container.querySelector('#row2'),
    board1Row3 = board1Container.querySelector('#row3');

// cell의 css속성이 담긴 className
const CELL_CN = 'board1Cell';
const TEAM1CELL = [];
const TEAM2CELL = [];

// 전광판의 1회, 2회 ... 
function makeCell1() {
    for(let i = 0; i<8; i++){
        const cell = document.createElement('div');
        cell.classList.add(CELL_CN);
        cell.innerHTML = `${i}회`;
        cell.id = `cell${i}`;
        board1Row1.appendChild(cell);
    }
    // copyText(board1Row1);
    const cell7 = board1Row1.querySelector('#cell7');
    cell7.innerHTML = `Total`;
    const cell0 = board1Row1.querySelector('#cell0');
    cell0.innerHTML = `전광판`;
}
// 전광판 속 team1의 점수
function makeCell2() {
    copyText(board1Row2, TEAM1CELL);
    const cell0 = board1Row2.querySelector('#cell0');
    cell0.innerHTML = `${input.teamName[0]}`;
}

// 전광판 속 team2의 점수
function makeCell3() {
    copyText(board1Row3, TEAM2CELL);
    const cell0 = board1Row3.querySelector('#cell0');
    cell0.innerHTML = `${input.teamName[1]}`;
}

function copyText(row, arr) {
    for(let i = 0; i<8; i++){
        const cell = document.createElement('div');
        cell.classList.add(CELL_CN);
        cell.innerHTML = `0`;
        cell.id = `cell${i}`;
        arr.push(cell);
        row.appendChild(cell);
    }
}

function init() {
    makeCell1();
    makeCell2();
    makeCell3();
}
init();