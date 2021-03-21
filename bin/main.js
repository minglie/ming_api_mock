#!node
M = require("ming_node")


const indexHtml="<!DOCTYPE html>\n" +
"<html>\n" +
"<head>\n" +
"    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n" +
"    <meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\">\n" +
"    <link rel=\"stylesheet\" href=\"https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css\">\n" +
"    <script src=\"https://cdn.bootcss.com/jquery/3.3.1/jquery.js\"></script>\n" +
"    <script src=\"https://minglie.gitee.io/ming_autotest/src/static/lib/monacoeditor/min/vs/loader.js\"></script>\n" +
"    <script>\n" +
"        M = {}\n" +
"    </script>\n" +
"    <style>\n" +
"        * { \n" +
"            touch-action: none;\n" +
"             } \n" +
"        #resize {\n" +
"            width: 5px;\n" +
"            height: 10px;\n" +
"        }\n" +
"        option {\n" +
"            font-weight: bold;\n" +
"            font-size: large;\n" +
"            color: #00b4ef;\n" +
"        }\n" +
"\n" +
"    </style>\n" +
"</head>\n" +
"\n" +
"<body>\n" +
"    <div id=\"app\">\n" +
"        <select id=\"laungeSelectId\" class=\"form-control\" style=\"width:50%; float: left;\" onchange=\"selectOnchang(this)\">\n" +
"            \n" +
"        </select>\n" +
"        <div align=\"center\">\n" +
"            <button id=\"btn\" onclick=\"btnOnclick(this)\" style=\"float: left; width: 40%; height: 35px;\" align=\"center\" type=\"button\" class=\"btn btn-success btn-lg btn-block\">Run</button>\n" +
"        </div>\n" +
"        <select  id=\"themeSelectId\"  class=\"form-control\" style=\"width: 10%; float: right;\"  onchange=\"selectOnThemechang(this)\">\n" +
"            <option>vs</option>\n" +
"            <option>vs-dark</option>\n" +
"            <option>hc-black</option>\n" +
"        </select>\n" +
"    </div>\n" +
" \n" +
"    <div id=\"container\" style=\"width:100%;height:2000px;float:left; border:1px solid grey\"></div>\n" +
"    <script>\n" +
"\n" +
"        M.languageMap={\n" +
"            \"js\":\"javascript\",\n" +
"            \"jsx\":\"javascript\",\n" +
"            \"md\":\"markdown\",\n" +
"            \"conf\":\"lua\"\n" +
"        }\n" +
"\n" +
"        M.file =localStorage.file || \"server.js\"\n" +
"        M.theme=localStorage.theme || \"vs-dark\";  \n" +
"        function getlanguage(file){\n" +
"            M.language = file.split(\".\")[1];\n" +
"            if(Object.keys(M.languageMap).indexOf(M.language)>=0){\n" +
"                 M.language=M.languageMap[M.language];\n" +
"            }\n" +
"            return   M.language;\n" +
"        }\n" +
"        require.config({\n" +
"            baseUrl: 'https://minglie.gitee.io/ming_autotest/src/static/lib/monacoeditor/', paths: { 'vs': 'min/vs' }\n" +
"        });\n" +
"\n" +
"        function selectOnchang(d) {\n" +
"            localStorage.file=d.value;\n" +
"            M.file=d.value;\n" +
"         \n" +
"            $(\"#container\").children().remove();\n" +
"            $.ajax({\n" +
"                type: \"GET\",\n" +
"                url: \"./\"+ M.file,\n" +
"                async: false,\n" +
"                dataType:\"text\",\n" +
"                success: function (data) {\n" +
"                    if (data == \"no router\") {\n" +
"                        data = null;\n" +
"                    }\n" +
"                    require(['vs/editor/editor.main'], function () {\n" +
"                        var editor = monaco.editor.create(document.getElementById('container'), {\n" +
"                            value: [\n" +
"                                data\n" +
"                            ].join('\\n'),\n" +
"                            language: getlanguage(M.file),\n" +
"                            theme: M.theme,\n" +
"                            automaticLayout: true,\n" +
"                            scrollbar: {\n" +
"                                useShadows: false,\n" +
"                                vertical: 'visible',\n" +
"                                horizontal: 'visible',\n" +
"                                horizontalSliderSize: 5,\n" +
"                                verticalSliderSize: 5,\n" +
"                                horizontalScrollbarSize: 15,\n" +
"                                verticalScrollbarSize: 15,\n" +
"                            },\n" +
"                            quickSuggestions: true,\n" +
"                            overviewRulerBorder: true,\n" +
"                            minimap: {\n" +
"                                enabled: false\n" +
"                            }\n" +
"                        });\n" +
"                        M.editor = editor;\n" +
"                        if( $(\"#themeSelectId\").val()!=M.theme){\n" +
"                            $(\"#themeSelectId\").val(M.theme) \n" +
"                            selectOnThemechang({ value: M.theme })\n" +
"                        }\n" +
"                    }\n" +
"                    );\n" +
"                }, error: function () {\n" +
"                    require(['vs/editor/editor.main'], function () {\n" +
"                        var editor = monaco.editor.create(document.getElementById('container'), {\n" +
"                            value: [\n" +
"                               \"ss\"\n" +
"                            ].join('\\n'),\n" +
"                            language: getlanguage(M.file),\n" +
"                            theme: M.theme,\n" +
"                            automaticLayout: true,\n" +
"                            scrollbar: {\n" +
"                                useShadows: false,\n" +
"                                vertical: 'visible',\n" +
"                                horizontal: 'visible',\n" +
"                                horizontalSliderSize: 5,\n" +
"                                verticalSliderSize: 5,\n" +
"                                horizontalScrollbarSize: 15,\n" +
"                                verticalScrollbarSize: 15,\n" +
"                            },\n" +
"                            quickSuggestions: true,\n" +
"                            overviewRulerBorder: true,\n" +
"                            minimap: {\n" +
"                                enabled: false\n" +
"                            }\n" +
"                        });\n" +
"                        M.editor = editor;\n" +
"\n" +
"                        if( $(\"#themeSelectId\").val()!=M.theme){\n" +
"                            $(\"#themeSelectId\").val(M.theme) \n" +
"                            selectOnThemechang({ value: M.theme })\n" +
"                        }\n" +
"\n" +
"\n" +
"                    }\n" +
"                    );\n" +
"                }\n" +
"            });\n" +
"        }\n" +
"\n" +
"       function selectOnThemechang(d){\n" +
"            M.theme=d.value;  \n" +
"            localStorage.theme= M.theme;\n" +
"            monaco.editor.setTheme(M.theme);\n" +
"        }\n" +
"\n" +
"    \n" +
"        function ming_alert(str) {\n" +
"            btn.innerHTML = str;\n" +
"            window.setTimeout(() => {\n" +
"                btn.innerHTML = \"Run\";\n" +
"            }, 500);\n" +
"        }\n" +
"\n" +
"        btnOnclick = function () {\n" +
"            let fun = M.editor.getValue();\n" +
"            $.ajax({\n" +
"                type: \"post\",\n" +
"                url: \"/_run_?file=\" + M.file,\n" +
"                data: { fun },\n" +
"                dataType: \"json\",\n" +
"                success: function (data) {\n" +
"                    ming_alert(JSON.stringify(data));\n" +
"                },\n" +
"                error: function (e) {\n" +
"                    ming_alert(JSON.stringify(e));\n" +
"                }\n" +
"            });\n" +
"        }\n" +
"\n" +
"       \n" +
"        $.get(\"/_curFileList\").then(d=>{\n" +
"                 let fileList=d.data.split(\"\\n\").filter(u=>u.includes(\".\")).map(u=>{\n" +
"                     return  `<option>${u}</option>`\n" +
"                 })\n" +
"                 let fileListStr=fileList.toLocaleString().replace(/,/g,\"\")\n" +
"                 document.getElementById(\"laungeSelectId\").innerHTML=fileListStr;               \n" +
"                 setTimeout(()=>{\n" +
"                    selectOnchang({value:M.file}) \n" +
"                    laungeSelectId.value=M.file;\n" +
"                 },200)\n" +
"            \n" +
"       })\n" +
"</script>\n" +
"</body>\n" +
"\n" +
"</html>";



var os = require('os');
var args = process.argv.splice(2)
let argsPath= "./";
let port= args[0] ||8888;

M.__default_file={};
M.__default_file["__default_server.js"]="console.log(1)";
M.__default_file["__default_index.html"]="hello";
staticPath=argsPath.replace(/\\/g,"/") || "./" ;
console.log("static path="+staticPath)
var app = M.server();
app.listen(port);
app.set("views", staticPath);
M.log_path = staticPath+"M.log";
M.map_path =staticPath+ "M_map.json";
M.database_path = staticPath+"M_database.json";
M.endRun=()=>{};
M.beforeRun=()=>{return true};
M.beforeWriteFile=()=>{return true};
app.get("/", async (req, res) => {
    res.renderHtml(indexHtml);
})


app.post("/_run_", async (req, res) => {
    try {
        if(M.beforeWriteFile(req.url)){
             //默认__default_不必存储
            if(req.params.file.startsWith("__default_")){
                M.__default_file[req.params.file]=req.params.fun;
            }else{
                M.writeFile(staticPath + req.params.file, req.params.fun);
            }
        }
        if( M.beforeRun(req.url))
        {
            if (req.params.file.endsWith(".js")) {
                eval(req.params.fun)
            }
        }
        res.send(M.result("ok"))
        M.endRun(req.params);
    } catch (e) {
        console.error(e)
        res.send(M.result("error", false))
    }
})
app.get("/_curFileList",async (req,res)=>{ 
    let s1="__default_server.js\n__default_index.html\n";
   if(os.type().startsWith("Window")){
       s=await M.exec("dir /b  "+`"${staticPath}"`)
   }else{
       s=await M.exec("ls "+staticPath)
   }
    res.send(M.result(s1+s))
})


app.get("/_t",async (req,res)=>{ 
    console.log(req.params);
    res.send(M.result("ok"))
})

eval(M.readFile("./server.js"));