/*
	화살을 정의 한다.
	화살의 초기 속도는 default 값+ 스페이스 누적+ 주인공의 속도 이다.
	화살이 적에 맞으면 사라지고 적군의 hp를 깍아야 한다.
	화살이 바닥에 맞으면 사라져야 한다.
	화살 이미지의 각도는 속도에 따라 바뀐다.  y/x
	화살의 변수는 width, height, x,y, img, power,
	
*/

var Arrow=function(stage,width,height,x,y,src){
	this.stage=stage;
	this.img;
	this.src=src;
	this.width=width;
	this.height=height;
	this.x=x;
	this.y=y;
	this.velX=0;
	this.velY=0;
	this.gravity=0.1;
	this.power;
	var me=this;

	this.init=function(){
		this.img=document.createElement("img");
		this.img.src=this.src;
		this.img.style.width=this.width+"px";
		this.img.style.height=this.height+"px";
		this.img.style.position="absolute";
		this.img.style.left=this.x+"px";
		this.img.style.top=this.y+"px";

		this.stage.appendChild(this.img);
	}


	this.move=function(){
		setTimeout(function(){
			me.move();
		},10);
		this.velY+=this.gravity;
		this.x+=this.velX;
		this.y+=this.velY;
		this.div.style.left=this.x+"px";
		this.div.style.top=this.y+"px";
	}
}