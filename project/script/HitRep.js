var HitRep=function(stage,obj,power){
	this.stage=stage;
	this.text;
	this.obj=obj;
	this.y=0;
	this.power=power;
	this.st;
	this.count=0;
	this.init=function(){
		this.text=document.createElement("input");
		this.text.inputtype="text";
		this.text.style.width=10+"px";
		this.text.style.height=20+"px";
		this.text.style.fontSize=15+"pt";
		this.text.style.align="center";
		this.text.style.color="red";
		this.text.style.position="absolute";
		this.y=this.obj.y;
		this.text.style.left=this.obj.x+"px";
		this.text.style.top=this.y+"px";
		this.text.value=this.power;
		this.text.style.opacity=0.5;
		this.stage.appendChild(this.text);
		this.move();
	}
	this.move=function(){
		var me=this;
		this.count++;
		this.y-=this.count/10;
		this.text.style.top=this.y+"px";
		if(this.count==50){
			this.del();
		}
		this.st=setTimeout(function(){
			me.move();		
		},10);
	}
	this.del=function(){
		console.log("안녕");
		this.stage.removeChild(this.text);
		clearTimeout(this.st);
	}
}