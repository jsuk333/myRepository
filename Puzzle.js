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
		this.div=document.createElement("div");
		this.div.style.width=this.width+"px";
		this.div.style.height=this.height+"px";
		this.div.style.color=this.color;
		this.div.style.float="left";
		this.stage.appendChild(this.div);
	}
}