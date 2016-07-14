/*bullet 2 위로 날아가는 총알에 적절함*/

var Bullet2=function(stage,width,height,x,y){
	this.stage=stage;
	this.width=width;
	this.height=height;
	this.x=x;
	this.y=y;
	this.img;
	this.velY=1;//y축의 방향으로 몇씩 움직일지 결정
	this.st;
	this.init=function(){
		this.img=document.createElement("img");
		this.img.src="../images/gallerxy/bullet.png";
		this.img.style.width=this.width+"px";
		this.img.style.height=this.height+"px";
		this.img.style.position="absolute";
		this.img.style.left=this.x+"px";
		this.img.style.top=this.y+"px";


		stage.appendChild(this.img);
		this.move();
	
	}
	this.move=function(){
		var me=this;
		this.y=this.y-this.velY;
		this.img.style.top=this.y+"px";
		//적군과 충돌시 총알 제거
		for(var i=0;i<allArray.length;i++){
			for(var j=0;j<allArray[i].length;j++){
				if(allArray[i][j].flag==true){
					var result=hitTest(this.img,allArray[i][j].img);
					if(result){
						this.stage.removeChild(allArray[i][j].img);
						allArray[i][j].stop();

						this.stage.removeChild(this.img);
						clearTimeout(this.st);
						break;
						return;

					}
				}
			}
		}
		if(this.y<=0){
			this.stage.removeChild(this.img);
			clearTimeout(this.st);
			console.log(this.y);
		}
		//대왕파리와 나와 마주쳤나??
		//console.log(kingArray.length);
		this.st=setTimeout(function(){
			me.move();
		},1);
	
	}

}