/*적군을 정의 한다.*/
var Enemy=function(stage,width,height,x,y,src){

	this.stage=stage;
	this.width=width;
	this.height=height;
	this.x=x;
	this.y=y;
	this.img;
	this.src=src;
	this.st;
	this.flag=true;//셋타임 아웃을 실행할지 결정하는 스위치
	this.init=function(){
		this.img=document.createElement("img");
		this.img.src=this.src;

		this.img.style.width=this.width+"px";
		this.img.style.height=this.height+"px";
		
		this.img.style.position="absolute";
		this.img.style.left=x+"px";
		this.img.style.top=y+"px";

		this.stage.appendChild(this.img);
	}
	this.move=function(){
		var me=this;
		if(!this.flag){
			clearTimeout(this.st);
			return;
		}
		this.st=setTimeout(function(){
			me.move();
		},100);
	}
	this.stop=function(){
		this.flag=false;
		//움직임 제거 할 수 있는 함수
		clearTimeout(this.st);
		return;
	}
}