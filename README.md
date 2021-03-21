# ming_api_mock

# 介绍
      ming_api_mock 是包装[ming_node](https://www.npmjs.com/package/ming_node)的命令行工具,让[ming_node](https://www.npmjs.com/package/ming_node)使用起来更便捷，
借助[ming_node](https://www.npmjs.com/package/ming_node)的单文件特性，使用bat或sh文件打包 . ming_api_mock最常用的用法是用来 光速的接口编写，简单的接口代理, 便捷的静态web服务.
       ming_api_mock 修改接口后不需要重启服务,其原理不同于[nodemon](https://www.npmjs.com/package/nodemon)。而是ming_api_mock会启动一个半成品服务,在页面上向后端发送代码来定义ming_api_mock的行为.
      一个看似很普通的node库几乎都会有大量的依赖,成千上万的node_modules小文件 让人感到恶心,ming_api_mock做到了[万物归一](#kQb87)，甚至[万物归零](https://www.yuque.com/docs/share/e1f16015-0719-4ffd-9464-a35610389153#CDN)
      简单来说 [ming_api_mock](https://gitee.com/minglie/ming_api_mock)=[ming_node](https://www.npmjs.com/package/ming_node) + [ api_mock对ming_node扩展](https://www.yuque.com/docs/share/3c03c64c-4f1d-4144-9f60-5fd82b75a0b0?# 《api_mock扩展ming_node》) +[vscode](https://microsoft.github.io/monaco-editor/) + [server.js插件](#88Csv)
# [安装](#88Csv)
    项目地址 [Gitee](https://gitee.com/minglie/ming_api_mock)
    ming_api_mock无任何第三方依赖 (依赖node环境),   安装包仅有15kb

## 方式0
``` bash
npx ming_api_mock 8888
```

## 方式1
下载 [ming_api_mock.zip](https://ming-bucket-01.oss-cn-beijing.aliyuncs.com/soft/ming_api_mock.zip) 解压, 将解压后的目录加到环境变量PATH中,在拥有服务文件的目录执行mock命令
### windows
如果要执行远程插件需要安装curl
[https://curl.se/windows/](https://curl.se/windows/)
参数格式
mock [serverJsUrl] [port]
#### 默认8888端口启动
```json
mock
```
#### 指定8888端口启动
```json
mock 8888
```
#### 指定远程插件启动(postman生成后端服务插件)
```json
mock https://gitee.com/minglie/ming_api_mock/raw/master/plugins/postman_server_generate/server.js
```
#### 指定远程插件与端口启动
```json
mock https://gitee.com/minglie/ming_api_mock/raw/master/plugins/postman_server_generate/server.js 8888
```
### 类linux与windows类似
```json
bash mock.sh [serverJsUrl] [port]
```


访问 [http://localhost:8888](http://localhost:8888/) 进行接口编写


      由于ming_api_mock依赖的静态资源来自网络中的CDN,无网状态可以使用
[ming_api_mock_all.zip](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-server1/21c17dd0-e48a-11ea-8bd0-2998ac5bbf7e.zip)
我将ming_api_mock所有的相关依赖全部打包在一起,这种方式就不要配环境变量了
解压执行 node ming_api_mock_all.js  来启动服务
```bash
 node ming_api_mock_all.js
```
## 方式2
在有服务文件的目录执行
```bash
curl https://minglie.gitee.io/mi/i4.js > ming_api_mock.js && node ming_api_mock.js
```
以后启动只需执行下面脚本即可
```bash
node ming_api_mock.js [服务目录]
```
## 方式3
docker运行,  详情见   [docker_server插件](#woZVs)
```bash
docker run -it -p:8888:8888  registry.cn-hangzhou.aliyuncs.com/minglie1/ming_api_mock:1.0
```
## 安装比较
方式2  安装最为便捷,但ming_api_mock.js 冗余,ming_api_mock.js可能会存多份
方式1  只需安装一次,以后一个mock命令就可以愉快的写接口了,自己只需管理好需要mock的服务文件即可
ming_api_mock 类型的应用部署到服务器里只需将ming_api_mock.js拷贝到项目目录通过node ming_api_mock.js启动
ming_api_mock是一个命令行工具,不适合docker安装,如果不想装node环境可以用一下
```bash
docker run -it -p:8888:8888  -v /root/a:/root  --privileged=true  registry.cn-hangzhou.aliyuncs.com/minglie1/ming_api_mock:1.0
```
# 执行流程
        假设在root目录执行mock命令,  ming_api_mock 会默认加载当前目录的server.js文件,server.js 相当于
ming_api_mock的main函数,server.js是可以依赖其他三方包,每一个server.js作为ming_api_mock的一个插件存在。
默认提供一个"/_t",接口用于测试接口联通性, 有一个 /_curFileList 接口, 用来遍历root 目录所有文件,前端根据文件名后缀来自动识别应改用哪种风格的编辑器, 文件编辑完成 点击  Run    按钮后, 后端会执行  /__run_ 接口, 这个接口里有一些[hook 函数](#Ruhci)用来决定点击Run 后会执行哪些行为      
# hook函数
[ming_node ](https://minglie.github.io/os/ming_node/)本身已经带有很多 [hook函数](https://www.yuque.com/docs/share/e1f16015-0719-4ffd-9464-a35610389153?#Fc2zn) 可用, 这里重点介绍ming_api_mock中  /__run_ 接口 里面的几个hook函数。
```javascript
#在写入文件前的钩子函数,不想写入文件需要重写此方法
M.beforeWriteFile=(req.url)=>{return true};
#在执行文件前的钩子函数,ming_api_mock默认仅执行js代码,如果某些js不需要执行则需重写此方法
M.beforeRun=(req.url)=>{return true};
#在/_run 服务执行完,用来打印日志或 触发一些额外命令,比如用于自动编译,配置热更新
M.endRun=(req.url)=>{};
```
# 服务文件格式
服务采用类express 的 [ming_node](https://www.yuque.com/docs/share/e1f16015-0719-4ffd-9464-a35610389153#e655a410)的格式,服务如果需要使用第三方库比如mysql,则需要自己安装并在 ming_api_mock.js 引入
因为ming_node功能很全,文件读写,json数据库,服务代理请求,日志,sql生成器等,一般不需要引入第三方库


```bash
app.get("/a", (req, res) => {
    console.log(req.params)
    M.add({ s: 77 })
    res.send("https://c-t.work/s/7b10cb04d2754c");
})
```
# 演示
![image.png](https://ming-bucket-01.oss-cn-beijing.aliyuncs.com/yuque/ming_api_mock/1595127558724-b5cd8627-0e4d-4a52-beed-a97d27e838cc.png#align=left&display=inline&height=328&margin=%5Bobject%20Object%5D&name=image.png&originHeight=656&originWidth=1688&size=217709&status=done&style=none&width=844)
# 内存文件__default_xxx
     ming_api_mock 支持内存文件,这类文件编辑查询的速度很快,用于执行一些不需要存储的服务,或静态资源,api_mock的插件我都安装到内存文件中
__default_index.html 与 __default_index.html 两个内存文件可在页面中编辑
而其他内存文件,需要在使用M.__default_file["__default_xxxx"]=xxx在代码中编辑,如
```javascript
staticPath="D:/root"
app.set("views", staticPath);
+async function(){
     M.__default_file["__default_index.html"]=await M.get("https://gitee.com/minglie/ming_api_mock/raw/master/plugins/example_upload/index.html");
    console.log("show on")
    console.log("http://localhost:8888/__default_index.html")  
}();
```
![image.png](https://ming-bucket-01.oss-cn-beijing.aliyuncs.com/yuque/ming_api_mock/1605355138423-0bf0e614-8ee5-4387-83cc-05a999e273cb.png#align=left&display=inline&height=75&margin=%5Bobject%20Object%5D&name=image.png&originHeight=150&originWidth=1050&size=12052&status=done&style=none&width=525)
# 引用其他js库
         由于ming_api_mock是被ming_node包装过的,无法使用原生node获取当前目录,所以js引用其他js库时引用路径会有变化,内部有个全局变量staticPath(静态资源根路径) 表示当前启动服务的目录,因此引用其他js库要使用绝对路径(全局安装除外)
a.js
```javascript
module.exports={a:88}
```
server.js
```javascript
let a=require(staticPath+"a.js")
console.log(a)
```
# ming_api_mock的插件其他应用案例    
        使用 ming_api_mock 里的hook函数,在文件保存以后可以执行各种命令,调用各种接口。因此 ming_api_mock 就会有很多稀奇古怪的用法。
        每一个server.js我称为ming_api_mock的一个插件,server可以关联一些静态页面作为一个可独立使用的单元, 
## 插件安装方式
    mock命令可以直接执行远程插件,mock第一次执行远程插件要带上插件地址,后面重启就不要带了,因为远程插件在第一次执行后,已缓存到当前目录的server.js中
```json
mock 插件地址
```
当然也可以将对应插件代码拷贝到本地server.js再利用mock执行
```java
+async function(){
    await M.require("https://gitee.com/minglie/ming_api_mock/raw/master/plugins/example_upload/server.js");
    M.__default_file["__default_index.html"]=await M.get("https://gitee.com/minglie/ming_api_mock/raw/master/plugins/example_upload/index.html");
    console.log("show on")
    console.log("http://localhost:8888/__default_index.html")  
}();
```
## nginx测试
用mock启动两个服务
mock 8888
mock 9999

服务代码只是打印请求路径,用于方便的测试 nginx 的 location，echo命令只能测试进了哪个分支,用mock的
好处是能清楚的看到nginx转发后携带的路径,参数,cookie等
```bash
app.begin((req,res)=>{console.log("req ",req.url)})
```
## openresty
[https://gitee.com/minglie/ming_api_mock/tree/master/plugins/openresty](https://gitee.com/minglie/ming_api_mock/tree/master/plugins/openresty)
ming_api_mock在点击run后 可以加个 M.endRun 钩子函数,这样使用**nginx**写web服务会更快捷,nginx配置或,lua脚本变更 则 重新载入ngin配置文件
## browser_controller
[https://gitee.com/minglie/ming_api_mock/tree/master/plugins/browser_controller](https://gitee.com/minglie/ming_api_mock/tree/master/plugins/browser_controller)
  作为注入浏览器js脚本的编辑器
## ming_mock_injection_old(过时)
[https://gitee.com/minglie/ming_api_mock/tree/master/plugins/ming_mock_injection](https://gitee.com/minglie/ming_api_mock/tree/master/plugins/ming_mock_injection)
        mock部分接口是前端很常见的一个需求, 在browser_controller上稍作改造,便有了
ming_mock_injection ,  ming_mock_injection 的目的是将[ming_mock.js](https://www.npmjs.com/package/ming_mock)注入到浏览器,从而实现接口有选择性的拦截与mock,  ming_mock_injection 提供了两种注入[ming_mock.js](https://www.npmjs.com/package/ming_mock)的方法,  **x-switch 注入与 自定义插件注入,**
两种方式各有利弊,**x-switch注入配置稍微复杂,但动态改脚本很好用, 自定义插件注入无需js引子和0配置,但修改脚本要刷新浏览器**
**参考 **
[https://github.com/YGYOOO/ajax-interceptor](https://github.com/YGYOOO/ajax-interceptor)
插件下载
[ming_mock_injectionV1.1.zip](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-server1/c1fb7940-f137-11ea-8bd0-2998ac5bbf7e.zip)
## ming_mock_injection(推荐)
   由于写ming_mock_injection时还没有发现[油猴插件](https://www.tampermonkey.net/),自己实际使用时也不想ming_mock_injection那么麻烦,真假mock结合的方式比较合适,两种拦截方式
[https://gitee.com/minglie/ming_api_mock/tree/master/plugins/ming_mock_injection/best_base_crud](https://gitee.com/minglie/ming_api_mock/tree/master/plugins/ming_mock_injection/best_base_crud)
实例
[https://gitee.com/minglie/ming_api_mock/tree/master/plugins/ming_mock_injection/ming_api_mock_injection](https://gitee.com/minglie/ming_api_mock/tree/master/plugins/ming_mock_injection/ming_api_mock_injection)
## **example_upload**上传下载
  这个插件的目的是实现计算机之间双向的大文件传输,几百M的文件没问题,
[https://gitee.com/minglie/ming_api_mock/tree/master/plugins/example_upload](https://gitee.com/minglie/ming_api_mock/tree/master/plugins/example_upload)

## db_server
      db_server是使用关系型数据库的表来描述哪个path怎样对应一个json,这个插件太重node_modus太大,不怎么好用,并且[ming_mock_server](https://github.com/minglie/ming_mockServer)的功能要远强于这个插件
        [ming_mock_server](https://github.com/minglie/ming_mockServer)不再更新,因为我打算用java,写一个自动化测试结合mockServer的项目ming-api
## postman_server_generate
这个插件的目的是将postman调过的接口直接转存为后端服务或ming_mock服务
[https://gitee.com/minglie/ming_api_mock/tree/master/plugins/postman_server_generate](https://gitee.com/minglie/ming_api_mock/tree/master/plugins/postman_server_generate)

## yuque_api_mock
[https://gitee.com/minglie/ming_api_mock/tree/master/plugins/yuque_api_mock](https://gitee.com/minglie/ming_api_mock/tree/master/plugins/yuque_api_mock)
  这个插件的目的能实现在语雀文档里写代码,借助语雀的webhook可以实现接口的实时更新,
[接口文档模版](https://www.yuque.com/docs/share/0c0951b9-d8cc-4b99-a638-3dd2c4554ac8?# 《接口文档》)

[语雀开发者文档](https://www.yuque.com/yuque/developer/doc)
## dingtalk-server
         dingtalk-server 主要 以使用 [ming-dingtalk ](https://www.npmjs.com/package/ming-dingtalk)库,来介绍如何引用第三方库, 原先是 require('ming-dingtalk') 引入的,要改为 require(staticPath+'node_modules/ming-dingtalk')引用,  其他库类似,需要添加staticPath/node_modules/ 
前缀
[https://gitee.com/minglie/ming_api_mock/tree/master/plugins/dingtalk_server](https://gitee.com/minglie/ming_api_mock/tree/master/plugins/dingtalk_server)
## docker   ming_api_mock:1.0  
[https://gitee.com/minglie/ming_api_mock/tree/master/docker](https://gitee.com/minglie/ming_api_mock/tree/master/docker)
ming_api_mock:1.0是一个纯的ming_api_mock镜像
```bash
docker run -it -p:8888:8888  -v /root/a:/root  --privileged=true  registry.cn-hangzhou.aliyuncs.com/minglie1/ming_api_mock:1.0
```
镜像中的 自带的 /sse.html 页面, 点击run，会调用 /doSql, doSql 将文件保存到 a.js, 而服务的/root/a 目录已挂载到容器中的/root 目录,这种方式编辑服务器文件比较方便
server.js
## docker   ming_api_mock_db:1.0
[https://gitee.com/minglie/ming_api_mock/tree/master/docker-db](https://gitee.com/minglie/ming_api_mock/tree/master/docker-db)
对应压缩包
[https://vkceyugu.cdn.bspapp.com/VKCEYUGU-server1/c5bed560-109d-11eb-8ff1-d5dcf8779628.zip](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-server1/c5bed560-109d-11eb-8ff1-d5dcf8779628.zip)
ming_api_mock_db:1.0是ming_api_mock集成各种库与页面的docker镜像
```bash
docker run -it -p:8888:8888  -v /root/a:/root  --privileged=true  registry.cn-hangzhou.aliyuncs.com/minglie1/ming_api_mock_db:1.0
```
## k8s-server
       可以发现ming_api_mock是一个万能镜像, 既可以当数据库,也可以动态加web页面,提供rest 接口,以及调用第三方接口,这些优点都得益于ming_api_mock可以在页面上动态的定义服务的行为,使用ming_api_mock这个万能镜像来测试k8s的相关概念将会非常方便,
[k8s应用部署](https://www.yuque.com/docs/share/0b03da50-1cfa-40c7-9abf-d5e795376f61)
