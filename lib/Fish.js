var Fish=function(stage,width,height,x,y){
	this.stage=stage;
	this.div;
	this.width=width;
	this.height=height;
	this.x=x;
	this.y=y;
	this.velX=0;
	this.velY=0;
	this.a=0.9;
	this.count=0;
	this.init=function(){
		this.div=document.createElement("div");
		this.div.innerText="☆";
		this.div.style.fontSize=this.width+"px";
		this.div.style.fontWeight="bold";
		this.div.style.color="red";
		this.div.style.width=this.width+"px";
		this.div.style.height=this.height+"px";
		this.div.style.position="absolute";
		this.div.style.left=this.x+"px";
		this.div.style.top=this.y+"px";

		this.stage.appendChild(this.div);
		this.move();
	}
	this.move=function(){
		var me=this;	
		setTimeout(function(){
			me.move();		
		},20);
		this.count++;
		if(this.count>8){
			this.stage.removeChild(this.div);
		}
		this.x=targetX-this.a*(targetX-this.x);
		this.y=targetY-this.a*(targetY-this.y);

		this.div.style.left=this.x+"px";
		this.div.style.top=this.y+"px";
	}
}