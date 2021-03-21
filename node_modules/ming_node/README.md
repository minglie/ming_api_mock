# ming_node
轻便完善的Web服务,随用随扔的Web服务

 >  ming_node是一个快速搭建web服务,接口测试,日常脚本编写的一个工具集
 
 
# ming_node安装
 ```sh
 $ npm i ming_node -D --registry=https://registry.npm.taobao.org
 ```
# cdn

https://unpkg.com/ming_node@1.9.3/index.js

  
# ming_node最小环境    
    
```javascript
var M=require("ming_node");
var app=M.server();
app.listen(8888);
app.get("/getById",(req,res)=>{ 
    console.log(req.params);
    res.send("ok");
})
 ```

# ming_node  cookie与session的处理  
```javascript
var M=require("ming_node");
var app=M.server();
app.listen(8888);
// 请求钩子
app.begin((req,res)=>{console.log("req ",req.url)})
// 响应钩子
app.end((d)=>{console.log("res ",d)})

app.get("/setSession",(req,res)=>{
    //打印请求ip与cookie
    console.log(req.ip,req.cookies)
    //设置session
    req.session={ss:55}
    res.send("ok");
})

app.get("/getSession",(req,res)=>{
    //打印session
    console.log(req.session)
    //设置cookie
    res.cookie("username","zs");
    res.send("ok");
})
```
# ming_node  彻底的单文件化 
```javascript
+async function(){
    M =await new Promise((v)=>require('https').get("https://minglie.github.io/js/ming_node.js",(q)=>{d='';q.on('data',(a)=>d+=a);q.on('end',()=>v(eval(d)))}))
  var app=M.server();
    app.listen(8888);
    app.get("/",async (req,res)=>{ 
       app.redirect("/index.html",req,res)
    })
}();
```

# ming_node  支持代理 回调 promise 的http简易客户端

```javascript
M=require("ming_node")
//代理配置
M.httpProxy={
    host: '127.0.0.1', // 代理 IP
    port: 8888, // 代理端口
}
//请求之前拦截器
M.httpBefore = (d) => {console.log(d);  return d }
//请求之后拦截器
M.httpEnd = (d) => { console.log("rrrrrr",d)}
//公共 Queryparams
M.reqComQueryparams={userId:123456}
//公共 请求头
M.reqComHeaders={"Content-Type":"application/json"}
//请求cookie,也可以放到M.reqComHeaders里
M.cookie = "JSESSIONID=" + "6E202D5A022EBD62705AA436EC54963B";

//get请求
M.get("http://baidu.com/pagelist",{name:"zs"}).then(d=>{
     console.log(d.code)
})

//get请求回调版
M.get("http://baidu.com/pagelist",d=>{
    console.log(d.code)
},{name:"huidiao"})


//post请求
M.post("http://baidu.com/a?age=44",{name:"ls"}).then(d=>{
     console.log(d)
})

```

# ming_node 响应本地远程缓存文件

```javascript
M=require("ming_node")
var app=M.server();
app.listen(8888);
app.get("/baidu",(req,res)=>{ 
    console.log(req.params);
    //响应html文本
   // res.renderHtml("hello woed")
   //响应js文本
    //res.renderJs("alert(5)")
    //响应本地文件
    //res.renderUrl("file:D:/G/ming_node/test/test.html");
    //响应百度首页
    res.renderUrl("https://www.baidu.com/index.html");
})

```
# ming_node 搭建 Http代理服务器

```javascript
M=require("ming_node")
var app=M.server();
app.listen(9999);
M.proxyHost="http://127.0.0.1:8888"
M.proxyHost=""
//启用静态资源代理
M.enableProxyStatucResource=true;
//忽略代理的地址
ignoreUrlList=["/","/favicon.ico"]

app.begin(async (req,res)=>{
    if(ignoreUrlList.indexOf(req.url)>-1||req.url.startsWith("/_")||req.url.startsWith("/.")){
        return;
    }
    if(req.isStaticRequest()){
        if(M.enableProxyStatucResource){
            res.renderUrl(M.proxyHost+req.url);
        }
        return;
    }
    res.alreadySend = true;
    //转换为axios格式
    let axiosConfig=await M.getAxiosConfig(req);
    console.log("====>",JSON.stringify(axiosConfig))
    //发出请求
    let result=await M.axios(axiosConfig)
    console.log("<======",result)
    console.log("---------------------------")
    res.send(result);
})

```

# ming_node  接口测试demo

```javascript
M=require("ming_node")

//代理配置
M.httpProxy={
    host: '127.0.0.1', // 代理 IP
    port: 8888, // 代理端口
}

//请求之前拦截器
M.httpBefore = (d) => {console.log(d.path);  return d }

/**
 //本机8888端口 服务端 代码
app.get("/pagelist",async (req,res)=>{ 
    console.log(req.params)
    res.send(`{"code":3002,"message":"操作成功","success":true,"data":[{"name":"zs"},{"name":"ls"}]}`)
})
 */
async function main(){
    let r=await M.get("http://minglie.github.io/pagelist?name=zs")   
    for(let i=0;i<r.data.length;i++){
         let user= r.data[i];
         const {name}=user;  
         M.log(name);
    }
 }

 main()

```


# 基于ming_node 的 ming_api_mock

https://www.yuque.com/docs/share/fc8547e1-e815-4e50-817c-4829e3c76442?# 《ming_api_mock》

# ming_node的使用详情,请到ming_node的主页查看

https://minglie.github.io/os/ming_node/
 
# ming_node使用文档

https://www.yuque.com/docs/share/e1f16015-0719-4ffd-9464-a35610389153?# 《ming_node》
