//아래의 코드는 지금 당장 사용할 총알 자체가 아니라,
//장차 총알을 생성할 틀이다.
/*
	객체 메뉴얼
	s: 이 총알이 어떤 div에 붙을지를 결정하세요
	posY:이 총알이 어느 Y 좌표에서 부터 시작할지 결정하세요
*/
var Bullet=function(s,posX,posY){
	//객체의 특징에 대한 값을 담고 있다고, 속성이라고 한다.
	//property라 표기한다.
	this.stage=s;
	this.span;
	this.x=posX;
	this.y=posY;
	this.velX=10;
	this.st;//나의 setTimeout을 가리키기 위한 변수
	//개체안에 들어있는 함수는 method라고 한다ㅏ.
	//객체의 동작 로직이 들어있다하여 이렇게 이름 붙여짐
	this.init=function(){
		this.span=document.createElement("span");
		this.span.innerText="●";
		this.span.style.color="blue";
		this.span.style.position="absolute";
		this.span.style.left=this.x+"px";
		this.span.style.top=this.y+"px";
		this.span.style.width=10+"px";
		this.span.style.height=10+"px";
		s.appendChild(this.span);
		this.move();
	}
	this.hitTest=function(){
		for(var i=0;i<enemyArray.length;i++){
			if(enemyArray[i]!=undefined){
				var result=hitTest(this.span,enemyArray[i].img);
				if(result){
					//총알 죽이고 적군 죽이고
					this.stage.removeChild(this.span);
					this.stage.removeChild(enemyArray[i].img);
					clearTimeout(enemyArray[i].st);
					delete enemyArray[i];
					clearTimeout(this.st);
					return;
				}
			}						
		}
	}
	

	this.move=function(){
		var me=this;
		
		//스테이지를 벗어나면, 총알의 setTimeout 은 멈추어야 한다.
		
		this.st=setTimeout(function(){
			me.move()
		},10);
		//적군과 부딪히면
		this.x+=this.velX;
		this.span.style.left=this.x+"px";
		this.hitTest();
		//화면 밖이
		if(parseInt(this.span.style.left)>=parseInt(this.stage.style.width)){
				clearTimeout(this.st);
				this.stage.removeChild(this.span);
		}
	}
}