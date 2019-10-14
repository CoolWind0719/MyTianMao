$(function(){
    // 获取第一步的信息
    
    var registerBotUser = $(".registerBotUser")[0];
    var registerBotSuc = $(".registerBotSuc")[0];
    var agreeBtn = $("#agreeBtn")[0];
    var userInput = $("#userInput")[0];
    var pwdInput01 = $("#pwdInput01")[0];
    var pwdInput02 = $("#pwdInput02")[0];
    var banknumInput = $("#banknumInput")[0];
    var bankuserInput = $("#bankuserInput")[0];
    var shenfenId = $("#shenfenId")[0];
    var phoneInput = $("#phoneInput")[0];
    var emailInput = $("#emailInput")[0];
    var registerToplis = $(".registerTopli");
    registerToplis[0].className = " liactive";
    // 验证用户名，注册新用户
    agreeBtn.onclick = function(){
        let xhr = new XMLHttpRequest(); 
        xhr.open("post","php/register.php",true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4 && xhr.status==200){
                if(xhr.responseText=="0"){
                    userInput.nextElementSibling.innerHTML = "该会员名已注册";
                }else if(xhr.responseText=="-1"){
                    emailInput.nextElementSibling.innerHTML = "✖，注册失败";
                }else if(xhr.responseText=="1"){
                    emailInput.nextElementSibling.innerHTML = "✔，注册成功";
                    setCookie("username",userInput.value,7);
                    setCookie("userpwd",pwdInput01.value,7);
                    setCookie("userphone",phoneInput.value,7);
                    setCookie("useremail",emailInput.value,7);
                    registerBotUser.style.display = "none";
                    registerBotSuc.style.display = "block";
                    registerToplis[1].className = " liactive";
                    registerToplis[0].className = "registerTopli";
                }              
            }
        }
        //post方式：设置请求头
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        //post方式：把传给服务器的数据（键值对）放在send函数的参数里
        let sentstr = `username=${userInput.value}&userpwd=${pwdInput01.value}&banknum=${banknumInput.value}&bankuser=${bankuserInput.value}&shenfenId=${shenfenId.value}&userphone=${phoneInput.value}&useremail=${emailInput.value}`;

        xhr.send(sentstr);
    }



   









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
})