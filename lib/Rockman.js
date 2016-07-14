/*록맨을 정의하자*/

var Rockman=function(stage,height,width,x,y,src){
	this.stage=stage;
	this.div;
	this.img;
	this.height=height;
	this.width=width;
	this.x=x;
	this.y=y;
	this.src=src;
	this.velX=0;
	this.velY=0;
	this.gravity=0.1;
	this.falling=true;//주인공이 떨어지고 있음을 알수 있는 변수
	this.jumping=true;//주인공이 점프중임을 알 수있는 변수
	this.speedCount=0;
	this.running=false;
	this.init=function(){
		
		this.div=document.createElement("div");
		//this.div.style.overflow="hidden";
		this.div.style.height=this.height+"px";
		this.div.style.width=this.width+"px";
		this.div.style.position="absolute";
		this.div.style.left=this.x+"px";
		this.div.style.top=this.y+"px";
		
		this.img=document.createElement("img");
		this.img.src=this.src;

		this.img.style.position="relative";
		this.img.style.width=this.width+"px";
		this.img.style.height=this.height+"px";
		//this.img.style.top=-65+"px";
		//이미지를 div에 탑재
		this.div.appendChild(this.img);
		//div를 스테이지에 탑재
		this.stage.appendChild(this.div);
		this.move();
	}
	//동작을 표현하는 메서드
	//이 메서드 호출자는 이미지의 경로를 인수로 전달
	this.action=function(){
		if(this.running){
			this.speedCount++;
				if(this.speedCount%35==0){
					actionCount++;
					if(actionCount>actionArray.length-1){
						actionCount=1;
					}
				}
			this.img.src=actionArray[actionCount];
		}else{
			actionCount=0;//서있는 모습..
		}
	}
	this.move=function(){
		var me=this;
		this.velY+=this.gravity;
		//블록과 마주쳤는지 확인
		if(this.velY>0){
			this.jumping=false;
			this.falling=true;//주인공이 떨어 지고 있음으로 전환
		}
		for(var i=0;i<blockArray.length;i++){
			var result=hitTest(this.div,blockArray[i].img);
			if(result&&this.falling){
				this.velY=0;
				console.log(this.y);
				this.falling=false;//벽돌을 밟으면 더이상 떨어지 지 않음
			}
		}
		
		this.x+=this.velX;
		this.y+=this.velY;
		this.div.style.left=this.x+"px";
		this.div.style.top=this.y+"px";
		this.action();
		//전역 변수인 action 카운트를 여기서 증가 시키자
		//speedCount가 일정 시점에 도달하면...
		
		setTimeout(function(){
			me.move();		
		},10);
	}



}