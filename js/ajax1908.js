//功能：实现ajax交互的功能
//参数
//   method/url/datas/isAsyn/func
//返回值：无

function ajax1908(method,url,datas,isAsyn,func){
    
    //创建xhr对象
    let xhr = new XMLHttpRequest();

    //创建请求参数
    let urlAnddata = url;
    if(method.toLowerCase()=="get"){
        urlAnddata += "?"+datas;
    }
    xhr.open(method,urlAnddata,isAsyn);

    //设置回调函数
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            func(xhr.responseText);
        }        
    }

    //发送请求
    if(method.toLowerCase()=="get"){
        xhr.send();
    }else{
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(datas);
    }
}

function ajax1908Andobject(obj){    
    let defaultObj = {
        "method": "get",
        "url": "#",
        "datas": "",
        "isAsyn": true,
        "func": null
    }
    for(let key in defaultObj){
        if(obj[key]!=undefined){
            defaultObj[key] = obj[key];
        }
    }
    //创建xhr对象
    let xhr = new XMLHttpRequest();
    //创建请求参数
    let urlAnddata = defaultObj.url;
    if(defaultObj.method.toLowerCase()=="get"){
        urlAnddata += "?"+defaultObj.datas;
    }
    xhr.open(defaultObj.method,urlAnddata,defaultObj.isAsyn);
    //设置回调函数
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            defaultObj.func && defaultObj.func(xhr.responseText);
        }       
    }
    //发送请求
    if(defaultObj.method.toLowerCase()=="get"){
        xhr.send();
    }else{
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(defaultObj.datas);
    }
}


//利用Promise封装ajax
function ajax1908Andpromise(obj){
    
    let defaultObj = {
        "method": "get",
        "url": "#",
        "datas": "",
        "isAsyn": true,
    }
    for(let key in defaultObj){
        if(obj[key]!=undefined){
            defaultObj[key] = obj[key];
        }
    }
    //创建xhr对象
    let xhr = new XMLHttpRequest();

    //创建请求参数
    let urlAnddata = defaultObj.url;
    if(defaultObj.method.toLowerCase()=="get"){
        urlAnddata += "?"+defaultObj.datas;
    }
    xhr.open(defaultObj.method,urlAnddata,defaultObj.isAsyn);

    //设置回调函数
    //将异步操作放入Promise对象的构造函数里
    let p = new Promise(function(resolve,reject){
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4){
                if(xhr.status==200){
                    resolve && resolve(xhr.responseText);
                }else{
                    reject && reject(xhr.responseText);
                }
            }            
        }
    })
    //发送请求
    if(defaultObj.method.toLowerCase()=="get"){
        xhr.send();
    }else{
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(defaultObj.datas);
    }
    return p;

}