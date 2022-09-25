var http =require("http");
var fs =require("fs");
var path =require("path");
//var html=require("node:test.html")
//let fileContent = fs.readFileSync("test.html", "utf8");
    //<button name="send">Отправить</button>
http.createServer(function (request,response)
{
    //response.setHeader("Content-Type", "text/html");
    if (request.url==='/')
    {
        sendRes('html\\test.html','text/html',response);

    }
    else if(/\/uploads\/[^\/]+$/.test(request.url)&& request.method==='POST'){
        //sendRes('mega.css','text/css',response);
    }
    else
        sendRes(request.url,getcontentType(request.url),response);
    //response.write(fileContent);



    //response.end('hell world?');
}).listen(3000);


//send
function sendRes(url,contentType,res){
    let file=path.join(__dirname,url);
    fs.readFile(file,(err,cotent)=>{
        if (err){
            res.writeHead(404);
            res.write('file not found');
            res.end();
            console.log(`error 404 ${file}`);
        }
        else
        {
            res.writeHead(200,{'Content-Type':contentType});
            res.write(cotent);
            res.end();
            console.log(`error 200 ${file}`);
        }
    })
}
function getcontentType(url)
{
    switch (path.extname(url)){
        case ".html":
            return "text/html";
        case ".css":
            return "text/css";
        case ".js":
            return "text/javascript";
        case ".json":
            return "application/json";
        default :
            return "application/octate-stream";

    }
}