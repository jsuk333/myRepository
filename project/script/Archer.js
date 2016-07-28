/*
	archer의 클래스를 정의 한다.
	archer: 좌로 이동 점프 가능, 화살 발사(화살객체 생성)
	생명력이 바닥 나면 게임 오버
	변수: 아이디, 체력, width, height, x, y, img, div,
	
*/
var Archer=function(stage,width,height,x,y,level,score,await,arun,aready,alunch){
	this.stage=stage;
	this.width=width;
	this.height=height;
	this.x=x;
	this.y=y;
	this.img;
	this.await=await;
	this.arun=arun;
	this.aready=aready;
	this.alaunch=alaunch;
	this.src;
	this.div;
	this.velX=0;
	this.velY=0;
	this.gravity=0.1;
	this.running=false;
	this.jumping=false;
	this.falling=false;
	this.deg=0;
	this.score=score;
	this.st;
	this.hitPoint=10;
	var me=this;
	this.level=level;
	this.iswait=true;
	this.isrun=false;
	this.islaunch=false;
	this.isready=false;
	this.actionCount=0;
	this.speedCount=0;
	this.init=function(){
		this.div=document.createElement("div");
		this.div.style.position="absolute";
		this.div.style.left=this.x+"px";
		this.div.style.top=this.y+"px";
		this.div.style.width=this.width+"px";
		this.div.style.height=this.width+"px";

		this.img=document.createElement("img");
		this.img.src=this.await[0];
		this.img.style.postion="absolute";
		this.img.style.left=this.x+"px";
		this.img.style.top=this.y+"px";
		this.img.style.width=this.width+"px";
		this.img.style.height=this.width+"px";
		this.img.style.transform="rotateY("+this.deg+")";
		this.div.appendChild(this.img);
		this.stage.appendChild(this.div);
		this.move();
	}
	this.move=function(){
		this.st=setTimeout(function(){
				me.move();
		},10);
		this.velY+=this.gravity;
		if(this.velY>0){
			this.jumping=false;
			this.falling=true;//주인공이 떨어 지고 있음으로 전환
		}
		for(var i=0;i<blockArray.length;i++){
			var result=hitTest(this.div,blockArray[i].div);
			if(result&&this.falling){
				this.velY=0;
				this.falling=false;//벽돌을 밟으면 더이상 떨어지 지 않음
			}
		}
	
		if(this.y>=parseInt(this.stage.style.height)||this.y<=0||this.x<=0||this.x>=parseInt(this.stage.style.width)){
			this.del();
			return;
		}
		this.x+=this.velX;
		this.div.style.left=this.x+"px";
		this.y+=this.velY;
		this.div.style.top=this.y+"px";
		if(this.velX>0){//속도에 따라 아쳐의 시선을 바꾼다.
			this.deg=0;
		}else if(this.velX<0){
			this.deg=180;
		}
		this.level=parseInt(this.score/100)+1;
		this.speedCount++;
		if (this.speedCount==20){
			this.actionCount++;
			this.speedCount=0;
		}
		
		if(this.islaunch){
			if(this.actionCount>=3){
				this.islaunch=false;
				this.actionCount=0;
			}else{
				this.src=this.alaunch[this.actionCount];
			}
			console.log(this.src);
			
		}else if(this.isready){
			if(this.actionCount>=2){
				this.actionCount=1;
			}
			this.src=this.aready[this.actionCount];
			console.log(this.src);
			
		}else if(this.isrun){
			if(this.actionCount>=8){
				this.actionCount=0;
			}
			this.src=this.arun[this.actionCount];
			console.log(this.src);
			
		}else if(this.iswait){
			if(this.actionCount>=6){
				this.actionCount=0;
			}
			this.src=this.await[parseInt(this.actionCount/2)];
			console.log(this.src);
		}
		console.log(this.actionCount);
		this.img.src=this.src;
		if(this.hitPoint<=0){//아쳐가 죽으면 추방한다.
			this.div.style.left=1000+"px";
			this.div.style.left=1000+"px";
			return;
		}
		this.img.style.transform="rotateY("+this.deg+"deg)";
	}
	this.del=function(){
		this.stage.removeChild(this.div);
		clearTimeout(this.st);
		form1.action="/end";
		form1.submit();
	}
}