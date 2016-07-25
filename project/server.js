
var http=require("http");
var express=require("express");
var fs=require("fs");
var mysql=require("mysql");
var bodyParser=require("body-parser");
var ejs=require("ejs");
var app=express();
app.use('/script', express.static(__dirname + '/script'));/
app.use('/images', express.static(__dirname + '/images'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var client=mysql.createConnection({
	"url":"localhost",
	"user":"root",
	"password":""
});
client.query("use iot");


app.route("/logInForm").get(function(req,res){
	var data=fs.readFileSync("./logInForm.html","utf8");
	res.writeHead(200,{"Content-Type":"text/html; charset=utf8"});
	res.end(data);
});
app.route("/logIn").post(function(req,res){
	var data=req.body;
	var id=data.id;
	var pwd=data.pwd;
	client.query("select id, pwd from gamer where id='"+id+"' and pwd='"+pwd+"';",function(error,records,field){
		var data=records;
		if(error){
			console.log("아이디 검색에 실패하셨습니다.");
		}else{
			if(data[0].id==id){
				if(data[0].pwd==pwd){
					console.log("로그인 성공");		
					res.redirect("/game");
				}else{
					console.log("비밀번호가 틀렸습니다.");
					res.redirect("logInForm");
				}
			}else{
				console.log("존재하지 않는 아이디 입니다.");
				res.redirect("logInForm");
			}
		}
	});
});

app.route("/registForm").post(function(req,res){
	var data=fs.readFileSync("./registForm.html","utf8");
	res.writeHead(200,{"Content-Type":"text/html; charset=utf8"});
	res.end(data);
});
app.route("/regist").post(function(req,res){
	var data=req.body;
	var id=data.id;
	var pwd=data.pwd;
	var yy=data.yy;
	var mm=data.mm;
	var dd=data.dd;
	var name=data.name;
	var birth=yy+"/"+mm+"/"+dd;
	
	client.query("insert into gamer(name,birth,id,pwd) values('"+name+"','"+birth+"','"+id+"','"+pwd+"');"
	,function(error,records,field){
		if(error){
			console.log("등록에 실패 하셨습니다.");
		}else{
			console.log("등록하셨습니다.");
			res.redirect("/logInForm");
		}
	});
});
app.route("/findForm").post(function(req,res){
	var data=fs.readFileSync("./findForm.html","utf8");
	res.writeHead(200,{"Content-Type":"text/html; charset=utf8"});
	res.end(data);
});
app.route("/find").post(function(req,res){
	var data=req.body;
	var name=data.name;
	var yy=data.yy;
	var mm=data.mm;
	var dd=data.dd;
	var birth=yy+"/"+mm+"/"+dd;
	client.query("select name,birth,id from gamer where name='"+name+"' and birth='"+birth+"';",function(error,records,field){
		var data=records;
		if(error){
			console.log("검색에 실패하셨습니다.");
		
		}else{
			if(name==data[0].name&&birth==data[0].birth){
				console.log("당신의 아이디는 "+data[0].id+"입니다.");
				res.redirect("/logInForm");
			}else{
				console.log("계정이 없습니다.");
			}
		}
	});
});
app.route("/game").get(function(req,res){
	var data=fs.readFileSync("./game.html","utf8");
	res.writeHead(200,{"Content-Type":"text/html; charset=utf8"});
	res.end(data);
});
app.route("/end").get(function(req,res){
	var data=fs.readFileSync("./end.html","utf8");
	res.writeHead(200,{"Content-Type":"text/html; charset=utf8"});
	res.end(data);
});

//서버 생성
var server=http.createServer(app);

server.listen(8383,function(){
	console.log("server is runninig at 8383.......");
});