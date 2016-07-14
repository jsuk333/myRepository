/*
	퍼즐을 객체로 정의 해보자
	이 퍼즐에 클릭 이벤트까지 구현할 예정........
*/

var Puzzle=function(stage,width,height,color){
	this.stage=stage;
	this.width=width;
	this.height=height;
	this.color=color;
	this.div;
	this.init=function(){
		var me=this;
		this.div=document.createElement("div");
		this.div.style.width=this.width+"px";
		this.div.style.height=this.height+"px";
		this.div.style.background=this.color;
		this.div.style.float="left";
		this.div.style.border="1px solid red";
		this.stage.appendChild(this.div);
		this.div.addEventListener("mouseover",function(){
				me.div.style.background="";
		});
	}
}