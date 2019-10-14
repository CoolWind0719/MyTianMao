//功能：设置cookie
//参数：键，值，过期天数，可访问路径，可访问域名
function setCookie(key,value,dayCount,path,domain){
    let d = new Date();
    d.setDate(d.getDate()+dayCount);
    let str = `${key}=${value};expires=${d.toGMTString()};`;
    document.cookie = str;
    if(path!=undefined){
        str += path;
    }
    if(domain!=undefined){
        str += domain;
    }
}

//功能：获取cookie
//参数：键
//返回值：值
function getCookie(key){
    let str = unescape(document.cookie);
    let arr = str.split("; ");
    for(let i=0;i<arr.length;i++){
        if(arr[i].startsWith(key+"=")){           
            let [,value] = arr[i].split("=");
            return value;
        }
    }
    return null;
}

//功能：删除cookie
//参数：键
//返回值：值
function delCookie(key){
    setCookie(key,"",-1);
}

//注册，添加cookie->完成后跳转到登录，又会添加cookie->到首页，欢迎用户->点击注销，删除cookie->跳转到
//登录页面->登录并添加cookie->又跳转到了登录页？？？