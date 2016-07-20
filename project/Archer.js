/*
	archer 클래스를 정의 한다.
	archer: 좌우 이동 점프 가능, 화살 발사(화살객체 생성), 체력 , id를 archer 위에 표시,
	생력이 바닥 나면 게임 오버
	변수: 아이디, 체력, width, height, x, y, img, div,
	
*/
var Archer=function(stage,width,height,x,y,src){
	this.stage=stage;
	this.width=width;
	this.height=height;
	this.x=x;
	this.y=y;
	this.img;
	this.src=src;
	this.div;
	this.velX=0;
	this.velY=0;
	this.gravity=0.1;
	this.running=false;
	this.jump=false;
	this.deg=180;
	var me=this;
	this.init=function(){
		this.div=document.createElement("div");
		this.div.style.postion="absolute";
		this.div.style.left=this.x+"px";
		this.div.style.top=this.y+"px";
		this.div.style.width=this.width+"px";
		this.div.style.height=this.width+"px";

		this.img=document.createElement("img");
		this.img.src=this.src;
		this.img.style.postion="relative";
		this.img.style.left=this.x+"px";
		this.img.style.top=this.y+"px";
		this.img.style.width=this.width+"px";
		this.img.style.height=this.width+"px";
		this.img.style.transform="rotateY("+this.deg+")";
		this.div.appendChild(this.img);
		this.stage.appendChild(this.div);
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
		if(velX>0){
			this.deg=180;
		}else if(velX<0){
			this.deg=0;
		}
		this.img.style.transform="rotateY("+this.deg+")";
	}
}