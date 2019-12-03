# Step 2 : 사용자가 직접 팀과 선수를 꾸리는 야구게임.
여기서 프로그램 설명하기. (step2 구현 마무리한 뒤)

## 게임 시작 방법
1. step2 브런치에서 step2.html과 step2.js 다운
2. 크롬 브라우저에서 step2.html 파일 오픈
3. `게임시작` 버튼 클릭! 

## 게임 작동 방식

* prompt함수를 통해 사용자에게 입력 또는 출력을 요청.
* 사용자가 입력 선택 시 팀이름, 타자이름, 타율 입력을 요청
* 입력을 완료하면 팀 이름 및 선수 명단 출력 가능.

## 프로그램 구현 흐름.
공수 전환 및 게임 종료 조건 구현

* isTeam1Attack() 메소드로 team1공격일 때와 team2 공격일 때 타순을 구분
* inningInit() 메소드로 한 팀의 공격이 끝나면 condition 모두 초기화 ex) 스트라이크 = 0, 볼 = 0, 히트 = 0, 아웃 = 0 
* plusPlayOrder 메소드로 각 팀의 따라 타순을 1씩 증가. 중복 X
* isGameOver 메소드로 6회에서 게임 종료.

### 선수와 이닝 바뀔 때 마다 출력화면 초기화 
* attackOutput HTMLelements 생성해 현재 타자의 BALLCOUNT 출력 
* 이닝 바뀔 때 출력화면 초기화. 

### 안타 4개 = 1득점 변환 및 6회 종료 후 최종 결과 출력 
* game.checkAccumulation 메소드 수정해서 hitCount === 4 면 score 1점 추가 
* game.print 메소드 수정해서 7회로 바뀌면 게임 종료 화면 출력 

### setTimeOut 함수 사용해서 게임 초기화를 늦춰 게임 진행 확인
* let _this = game
* setTimeout(game.init, 3000);

### 코드 리팩토링 
* 전역변수 사용하니 출력할 때 undefined 출력. 지역변수로 변경