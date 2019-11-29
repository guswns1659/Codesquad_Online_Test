# Codesquad Online Test

## Step 1: baseball game

### 용어 설명 

* condition : 랜덤으로 뽑히는 (볼, 스트라이크, 아웃, 안타)를 지칭
* score : 게임의 객체로 야구 특성상 condition에 따라 점수가 달라지기 때문에 score라 지칭함. 
* score.checkAccumulation() : 누적되는 condition을 확인해서 3스트라이크면 1out, 4볼이면 1안타로 변경하는 메소드
* score.progree : 게임 진행상황을 확인하는 메소드. 진행 상황에 따라 타자가 바뀌거나, 게임이 끝나는 결과가 나옴. 

### 프로그램 운영 

* score.init() 메소드로 게임 시작. 
* score.pickRandomCondition() 메소드로 랜덤으로 condition 한개를 획득
* 뽑힌 condition은 score.updateScore() 메소드를 통해 기존 condition에 누적 
    ** ex) 스트라이크 += 1, 볼 += 1, 아웃 += 1
* 만약, 3스트라이크라면 1Out으로 바꾸고 스트라이크는 0으로 초기화. score.checkAccumulation() 메소드
* score.progress 메소드를 통해 
    ** 3out이라면 게임 종료, 
    ** 안타나 아웃이면 게임 1out 추가하고 restart
    ** 3스트라이크나 4볼이면 1out 추가하고 게임 restart
    ** 스트라이크나 볼이라면 1out 추가하지 않고 게임 restart
* 게임 종료와 함께 최종 안타 수 출력. 