var DateBox = function(stage, width, height, text){
	this.div;
	this.stage=stage;
	this.width=width;
	this.height=height;
	this.text=text;
	var me=this;
	this.area;//undefined
	this.title; //날짜를 담을 div
	this.content; //입력폼과 내용을 담을 div
	this.input;

	this.init = function(){
		this.div = document.createElement("div");
		this.div.style.width = this.width+"px";
		this.div.style.height = this.height+"px";
		this.div.style.border = "1px solid blue";
		//this.div.innerText = this.text;
		this.div.style.float = "left";
		
		this.title=document.createElement("div");	
		this.title.style.width=100+"%";
		this.title.style.height=25+"px";
		this.title.innerText=this.text;
		this.div.appendChild(this.title);//날짜 부착!!

		this.content=document.createElement("div");	
		this.content.style.width=100+"%";
		this.content.style.height=75+"px";
		this.content.style.overflow="scroll";
		this.content.style.fontSize="9pt";
		this.div.appendChild(this.content);//날짜 부착!!

		//div에 대한 이벤트처리 
		this.div.addEventListener("click", function(){
			if(me.area==undefined){//생성된 적이 없다면...
				me.createForm();
			}
		});

		this.stage.appendChild(this.div);
	}

	//클릭시 TextArea 와 Button을 등장시키기!!~
	this.createForm=function(){
		this.area=document.createElement("textarea");
		this.area.style.width=95+"%";
		this.area.style.height=45+"px";
		this.area.style.background="#33ffff";
		
		this.input=document.createElement("input");
		this.input.type="button";
		this.input.value="등록";
		
		this.input.addEventListener("click", function(){
			me.showContent();
		});

		this.content.appendChild(this.area);
		this.content.appendChild(this.input);
	}

	//컨텐츠 출력 
	this.showContent=function(){
		//textarea 의 값 얻기~
		var str=this.area.value;
		
		//content  div의 자식요소들을 제거하고, str content 출력 
		this.content.removeChild(this.area);
		this.content.removeChild(this.input);
		this.content.innerText=str;
	}
}







