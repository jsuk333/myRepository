//오른쪽에서 나타나는 적군

var Enemy_right=function(stage,width,height,x,y,src){
	this.stage=stage;
	this.img;
	this.width=width;
	this.height=height;
	this.x=x;
	this.y=y;
	this.velY=0;
	this.velX=1;
	this.src=src;
	this.i=1;
	this.flag=true;
	this.st_move;
	this.st_target;
	this.init=function(){
		this.img=document.createElement("img");
		this.img.src=this.src;
		this.img.style.width=this.width+"px";
		this.img.style.height=this.height+"px";
		this.img.style.position="absolute";
		this.img.style.left=this.x+"px";
		this.img.style.top=this.y+"px";
		this.stage.appendChild(this.img);
		this.move();
	}
	this.setTarget=function(){
		var me=this;
		this.st_move=setTimeout(function(){
			me.setTarget();
		},300);

	}
	
	this.move=function(){
		var me=this;
		this.st=setTimeout(function(){
			me.move();
		},10);
		//멈추는 조건은 아래에서 주자
		this.img.src="../images/warior/image"+this.i+".png";
		this.i++;
		this.x-=this.velX;
		this.y-=this.velY;
		this.img.style.left=this.x+"px";
		this.img.style.top=this.y+"px";
		//if(this.y<=0||this.y>=parseInt(this.stage.style.height)){
			//this.velY*=(-1);
		//}
		
		if(this.i>18){
			this.i=1;
		}
	}
}