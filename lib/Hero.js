var Hero=function(stage,width,height,x,y,src){
	this.stage=stage;
	this.img;
	this.width=width;
	this.height=height;
	this.x=x;
	this.y=y;
	this.src=src;
	this.velX=0;
	this.velY=0;
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
	this.move=function(){
		var me=this;
		
		setTimeout(function(){
			me.move();
		},5);
		this.x=this.x+this.velX;		
		this.y=this.y+this.velY;
		for(var i=0;i<mazeArray.length;i++){
			if(mazeArray[i].flag){
				var result=hitTest(this.img,mazeArray[i].div);
				if(result){
					this.x=this.x-2*this.velX;		
					this.y=this.y-2*this.velY;

					this.velX=0;
					this.velY=0;
				}
			}
		}
		this.img.style.left=this.x+"px";
		this.img.style.top=this.y+"px";
	}
}