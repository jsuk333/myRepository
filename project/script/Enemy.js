/*
	archer 클래스를 정의 한다.
	archer: 좌우 이동 점프 가능, 화살 발사(화살객체 생성) 
	생력이 바닥 나면 게임 오버
	변수:  width, height, x, y, img, div,
	
*/
var Enemy=function(stage,width,height,x,y,run,jump){
	this.stage=stage;
	this.width=width;
	this.height=height;
	this.x=x;
	this.y=y;
	this.img;
	this.run=run;
	this.jump=jump;
	this.div;
	this.velX=-1.5;
	this.velY=0;
	this.gravity=0.1;
	this.isfloor=false;
	this.falling=false;
	this.attack=0;
	var me=this;
	this.st;
	this.hitPoint=parseInt(Math.random()*20)+10;//적군의 초기 체력
	this.count=0;
	this.runCount=0;
	this.runSpeed=0;
	this.jumpCount=0;
	this.jumpSpeed=0;
	this.init=function(){
		this.div=document.createElement("div");
		this.div.style.position="absolute";
		this.div.style.left=this.x+"px";
		this.div.style.top=this.y+"px";
		this.div.style.width=this.width+"px";
		this.div.style.height=this.width+"px";

		this.img=document.createElement("img");
		this.img.src=this.run[0];
		this.img.style.postion="absolute";
		this.img.style.left=this.x+"px";
		this.img.style.top=this.y+"px";
		this.img.style.width=this.width+parseInt(archer.level/10)+"px";
		this.img.style.height=this.height+parseInt(archer.level/10)+"px";
		this.img.style.transform="rotateY("+180+"deg)";
		this.div.appendChild(this.img);
		this.stage.appendChild(this.div);
		this.move();
	}
	this.move=function(){
		if(this.y>=parseInt(this.stage.style.height)||this.y<=0||this.x<=0||this.x>=parseInt(this.stage.style.width)){//화면을 벋어나면 죽는다.
			this.del();
			
			return;
		}
		this.velY+=this.gravity;
		if(this.velY>0){
			this.falling=true;
		}
		
		for(var i=0;i<blockArray.length;i++){//바닥에서 떨어지지 않도록 한다.
			var result=hitTest(this.div,blockArray[i].div);
			if(result&&this.falling){
				this.velY=0;
				this.isfloor=true;//벽돌을 밟으면 더이상 떨어지 지 않음
				this.falling=false;
				this.attack=0;
			}
		}
		
		if(this.isfloor){
			this.runSpeed++;
			this.count++;
			if(this.runSpeed==20){
				this.runCount++;
				this.runSpeed=0;
			}
			if(this.runCount>=run.length){
				this.runCount=0;
			}
		}else{
			this.jumpSpeed++;
			if(this.jumpSpeed==25){
				this.jumpCount++;
				this.jumpSpeed=0;
			}
			if(this.jumpCount>=jump.length){
				this.jumpCount=0;
			}
		}
		if(this.isfloor){
			this.img.src=this.run[this.runCount];
			this.jumpCount=0;
		}else{
			this.img.src=this.jump[this.jumpCount];
			this.runCount=0;
		}
		var j=parseInt(Math.random()*40)+50;
		if((this.isfloor)&&(this.count>=j)){
			
			this.jumping();
		}
		var result=hitTest(this.div,archer.div);
		if(result){//아쳐와 부딪치면 아쳐의 체력을 떨어트리고 뒤로 이동한다.
			archer.hitPoint--;
			this.x=archer.x+archer.width+150;
		}
		
		this.x+=this.velX+this.attack;
		this.y+=this.velY;
		this.div.style.left=this.x+"px";
		this.div.style.top=this.y+"px";
		this.st=setTimeout(function(){
				me.move();
		},10);
	}
	this.del=function(){
		this.stage.removeChild(this.div);
		clearTimeout(this.st);
		archer.score+=10;
	}
	this.jumping=function(){
		this.velY=-4;
		this.attack=-1;
		this.isfloor=false;
		this.count=0;
	}
}