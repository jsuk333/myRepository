
var http=require("http");
var express=require("express");
var fs=require("fs");
var mysql=require("mysql");
var bodyParser=require("body-parser");
var ejs=require("ejs");
var app=express();
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var client=mysql.createConnection({
	"url":"localhost",
	"user":"root",
	"password":""
});
client.query("use iot");


app.route("/logInForm").get(function(req,res){
	var page=fs.readFileSync("./logInForm.html","utf8");
	res.writeHead(200,{"Content-Type":"text/html; charset=utf8"});
	res.end(page);
});
app.route("/logIn").post(function(req,res){
	var data=req.body;
	var input_id=data.id;
	var input_pwd=data.pwd;
	client.query("select id,level,score from gamer where id='"+input_id+"'",function(error,records,field){
		var query_data=records;
		if(error){
			console.log("아이디 검색에 실패하셨습니다.");
		}else{
			if (query_data[0]!=undefined){
				client.query("select pwd from gamer where pwd='"+input_pwd+"'",function(error,records,field){
					var query_pwd=records;
					if(error){
						console.log("비밀번호 검색에 실패하셨습니다.");
					}else{
						if(query_pwd[0]!=undefined){
							console.log("로그인 성공");		
							var page=fs.readFileSync("./game.html","utf8");
							res.writeHead(200,{"Content-Type":"text/html; charset=utf8"});
							res.end(ejs.render(page,{dataList:query_data}));
						}else{
							console.log("비밀번호가 틀렸습니다.");
							res.redirect("/logInForm");
						}
					}
				});
			}else{
				console.log("존재하지 않는 아이디 입니다.");
				res.redirect("/logInForm");
			}
		}
	});
});

app.route("/registForm").post(function(req,res){
	var page=fs.readFileSync("./registForm.html","utf8");
	res.writeHead(200,{"Content-Type":"text/html; charset=utf8"});
	res.end(page);
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
	var page=fs.readFileSync("./findForm.html","utf8");
	res.writeHead(200,{"Content-Type":"text/html; charset=utf8"});
	res.end(page);
});
app.route("/find").post(function(req,res){
	var data=req.body;
	var name=data.name;
	var yy=data.yy;
	var mm=data.mm;
	var dd=data.dd;
	var birth=yy+"/"+mm+"/"+dd;
	var page=fs.readFileSync("./check.html","utf8");
	client.query("select name,birth,id from gamer where name='"+name+"' and birth='"+birth+"';",function(error,records,field){
		var data=records;
		if(error){
			console.log("검색에 실패하셨습니다.");
		
		}else{
			if(data[0]!=undefined){
				console.log("당신의 아이디는 "+data[0].id+"입니다.");
				res.end(ejs.render(page,{id:data[0].id}));
			}else{
				console.log("계정이 없습니다.");
			}
		}
	});
});


app.route("/end").post(function(req,res){
	var input=req.body;
	console.log(input);
	var input_id=input.id;
	var input_level=input.level;
	var input_score=input.score;
	var page=fs.readFileSync("./end.html","utf8");
	var sql="update gamer set score='"+input_score+"',level='"+input_level+"' where id='"+input_id+"'";
	console.log(sql);
	client.query(sql,function(error,records,field){
		if(error){
			console.log("엔딩 오류");
		}else{
			console.log("정상적인 엔딩");
		}
	
	
	});
	res.writeHead(200,{"Content-Type":"text/html; charset=utf8"});
	res.end(page);
});

//서버 생성
var server=http.createServer(app);

server.listen(8383,function(){
	console.log("server is runninig at 8383.......");
});