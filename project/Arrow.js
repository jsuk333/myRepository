/*
	화살을 정의 한다.
	화살의 초기 속도는 default 값+ 스페이스 누적+ 주인공의 속도 이다.
	화살이 적에 맞으면 사라지고 적군의 hp를 깍아야 한다.
	화살이 바닥에 맞으면 사라져야 한다.
	화살 이미지의 각도는 속도에 따라 바뀐다.  y/x
	화살의 변수는 width, height, x,y, img, power,
	
*/

var Arrow=function(stage,width,height,x,y,direction,src,posX,posY,power){
	this.stage=stage;
	this.img;
	this.src=src;
	this.width=width;
	this.height=height;
	this.x=x;
	this.y=y;
	this.direction=direction;//아처의 이동방향
	this.velX=2;
	this.velY=0;
	this.gravity=0.05;
	this.power=power;//화살의 파워, 초기 속도를 결정한다.
	this.posX=posX;//아쳐와 마우스 사이의 x방향 거리
	this.posY=posY;//아쳐와 마우스 사이의 y방향 거리
	this.rad=0;//화살의 발사각도를 정의할 변수 라디안 단위
	this.deg=0;//화살의 발사각도를 정의할 변수 디그리 단위
	var me=this;
	this.degree=180;//화살의 각도 최종값
	this.st;
	this.init=function(){
		this.img=document.createElement("img");
		this.img.src=this.src;
		this.img.style.width=this.width+"px";
		this.img.style.height=this.height+"px";
		this.img.style.position="absolute";
		this.img.style.left=this.x+"px";
		this.img.style.top=this.y+"px";

		this.stage.appendChild(this.img);
		
		this.rad=Math.atan2(this.posY,this.posX);
		this.velY-=this.power*Math.sin(this.rad);
		this.velX+=this.power*Math.cos(this.rad);
		this.deg=Math.atan2(this.velY,this.velX)*180/3.14;
		this.degree=180+this.deg;
		this.img.style.transform="rotateZ("+this.degree+"deg)";//발사 각도를 정의한다.
		console.log(this.deg);
		this.velX*=this.direction;//발사 방향
		
		
		this.move();
	}

	this.move=function(){
		this.velY+=this.gravity;
		if(this.y>=parseInt(this.stage.style.height)||this.y<=0||this.x<=0||this.x>=parseInt(this.stage.style.width)){//화면밖으로 나가면 죽는다.
			console.log(this.x)
			this.del();
			return;
		}
		for(var i=0;i<enemyArray.length;i++){//히트테스트
			if(enemyArray[i]!=undefined){
				var result=hitTest(this.img,enemyArray[i].div);
				if(result){
					this.del();
					enemyArray[i].hitPoint-=this.power;//적군의 체력을 감소 시킨다.
					if(enemyArray[i].hitPoint<=0){//체력이 0이하가 되면 죽는다.
						enemyArray[i].del();
						delete enemyArray[i];
					}
					return;
				}
			}
		}
		this.x+=this.velX;
		this.y+=this.velY;
		this.deg=Math.atan2(this.velY,this.velX)*180/3.14;//화살이 움직이는 동안의 라디안 각도
		this.degree=180+this.deg;
		this.img.style.transform="rotateZ("+this.degree+"deg)";
		this.img.style.left=this.x+"px";
		this.img.style.top=this.y+"px";
		this.st=setTimeout(function(){
			me.move();
		},10);
	}
	this.del=function(){
		this.stage.removeChild(this.img);
		clearTimeout(this.st);
	}
}