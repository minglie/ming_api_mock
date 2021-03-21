# ming_api_mock

# 介绍

  ming_api_mock  是基于[ming_node](https://www.npmjs.com/package/ming_node) 实现的一个快速mock 接口的工具

# 
# 安装使用

# 方式0
``` bash
npx ming_api_mock 9999
```

# 方式1
 下载 [ming_api_mock.zip](https://ming-bucket-01.oss-cn-beijing.aliyuncs.com/soft/ming_api_mock.zip) 解压
 将解压后的目录加到环境变量PATH中,在拥有服务文件的目录
 
## windows

如果要执行远程插件需要安装curl

https://curl.se/windows/

参数格式
``` bash
mock [serverJsUrl] [port]
```
### 默认8888端口启动
``` bash
mock
```
### 指定8888端口启动
``` bash
mock 8888
```
### 指定远程插件启动
``` bash
mock https://gitee.com/minglie/ming_api_mock/raw/master/plugins/postman_server_generate/server.js
```
### 指定远程插件与端口启动
``` bash
mock https://gitee.com/minglie/ming_api_mock/raw/master/plugins/postman_server_generate/server.js 8888
```

# 类linux与windows类似

参数格式
``` bash
bash mock.sh [serverJsUrl] [port]
```


 
访问 http://localhost:8888 进行接口编写


# 方式2  

#### 在有服务文件的目录执行
``` bash
curl https://minglie.gitee.io/mi/i4.js > ming_api_mock.js && node ming_api_mock.js
```

以后启动只需执行下面脚本即可

``` bash
node ming_api_mock.js [服务目录] [port]
```


# 方式3
#### docker启动
``` bash
docker run -it -p:8888:8888  registry.cn-hangzhou.aliyuncs.com/minglie1/ming_api_mock:1.0
```


# 服务文件格式参考 [ming_node](https://www.yuque.com/docs/share/e1f16015-0719-4ffd-9464-a35610389153#e655a410)

``` js
app.get("/a", (req, res) => {
    console.log(req.params)
    M.add({ s: 77 })
    res.send("https://c-t.work/s/7b10cb04d2754c");
})

app.begin((req,res)=>{console.log("req ",req.url)})

```


## 使用文档
https://www.yuque.com/docs/share/fc8547e1-e815-4e50-817c-4829e3c76442?#
## api_mock对ming_node的扩展
https://www.yuque.com/docs/share/3c03c64c-4f1d-4144-9f60-5fd82b75a0b0?# 《api_mock扩展ming_node》
