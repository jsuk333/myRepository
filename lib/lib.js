//특정범위의 랜덤값 구하기
//3~5 랜덤값 구하기
function getRandomByRange(max,min){
	var r=Math.floor(Math.random()*(max-min+1)+min);
	return r;
}
function getFloatRandomByRange(max,min){
	var r=Math.random()*(max-min+1)+min;
	return r;
}
/*이 함수는 두 물체간 충돌 여부를 판단하기 위한 함수이다. 
	 이함수 호출시 물체 A는 me로 전달하고 B는 target으로 전달 하자
	 return 값이 true이면 서로 교차하고 있는 상태이다.

	 */
function hitTest(me, target) {
 //두물체간 충돌 여부 판단 
 me_x= parseInt(me.style.left);
 me_y= parseInt(me.style.top);
 me_width=parseInt(me.style.width);
 me_height=parseInt(me.style.height);
 
 target_x= parseInt(target.style.left);
 target_y= parseInt(target.style.top);
 target_width=parseInt(target.style.width);
 target_height=parseInt(target.style.height);
 
 var result1=(me_x >= target_x) && (me_x <= (target_x+target_width));//나의 x좌표위치가 타겟의 x range 내에 있는지 판단 
 var result2=(me_x+me_width >= target_x) && (me_x+me_width <= (target_x+target_width));  //나의 가로폭이 타겟의 가로폭 내에 있는지 판단
 
 var result3=(me_y >= target_y) && (me_y <= (target_y+target_height));//나의 y좌표위치가 타겟의 세로폭 내에 있는지 판단
 var result4=(me_y+me_height >= target_y) && (me_y+me_height <= (target_y+target_height));//나의 y폭이 타겟의 세로폭 내에 있는지 판단
  
 return (result1 || result2) && (result3 || result4);
}
//해당 월의 마지막 날 반환하는 메소드
//넘겨 받은  month에 -1을 세팅한다.
function getLastDate(yy,mm){
	var d=new Date();
	d.setFullYear(parseInt(yy.value));
	d.setMonth(parseInt(mm.value));
	d.setDate(0);
	var lastDate=d.getDate();
	return d.getDate();
}