
var http=require("http");
var express=require("express");
var fs=require("fs");
var mysql=require("mysql");
var bodyParser=require("body-parser");
var ejs=require("ejs");
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var client=mysql.createConnection({
	"url":"localhost",
	"user":"root",
	"password":""
});
client.query("use iot");


app.route("/list").get(function(request, response){
	var page=fs.readFileSync("./list.html","utf8");
	client.query("select * from student;",function(error,records,field){
		if(!error){
			response.writeHead(200,{"Content-Type":"text/html; charset=utf8"});
			response.end(ejs.render(page,{datalist:records}));
		}else{
			consoe.log("망했어요");
		}
	});
	
});



app.route("/regist_form").get(function(request, response){
	var data1=fs.readFileSync("./regist_form.html","utf8");
	response.writeHead(200,{"Content-Type":"text/html; charset=utf8"});
	
	response.end(data1);
});

app.route("/regist").post(function(request,response){

	var data=request.body;
	var id=data.id;
	var pwd=data.pwd;
	var name=data.name;
	var yy=data.yy;
	var mm=data.mm;
	var dd=data.dd;
	var birth=yy+"/"+mm+"/"+dd
	
	client.query("insert into student(id,pwd,name) values('"+id+"','"+pwd+"','"+name+","+birth+"')",function(error,records,field){
		
		if(error){
			console.log("등록 실패입니다.");
		}else{
			console.log("성공입니다.");
			
			response.redirect("/login");
		}
	});
});

//서버 생성
var server=http.createServer(app);

server.listen(8383,function(){
	console.log("server is runninig at 8383.......");
});