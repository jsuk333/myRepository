/*이 클래스는 사물을 표현하는 것은 맞지만 동작은 제외하고 데이터만을 
보유 시키기 위한 클래스로 정의 한다.
이러한 역할을 수행하는 객체를 가리켜 설계분야에서 dto(data transfer object)라고 한다.
*/
var Member=function(){
	this.id;
	this.pw;
	this.name;
	this.money;
}