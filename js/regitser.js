$(function(){
    // 获取信息
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

    // 密码两次输入一致性校验
    pwdInput02.onblur = function(){
        if(this.value != pwdInput01.value){
            this.nextElementSibling.innerHTML = "两次输入的密码不一致";
            this.nextElementSibling.style.color = "red";
        }else{
            this.nextElementSibling.innerHTML = "✔";
            this.nextElementSibling.style.color = "#b4b4b4";
            return true;
        }
    }

    // 定义不同表单提示语
    var userNote = "会员名规则：长度为3-16位";
    var pwdNote = "密码规则：长度6-16位";
    var banknumNote = "银行卡号规则：长度8位";
    var bankuserNote = "姓名规则：长度为3-16位";
    var shenfenNote = "身份证规则：16位数字";
    var phoneNote = "手机号规则：11位数字";
    var emailNote = "邮箱规则：6-16位数字字母";

    // 表单非空+前端验证
    fontCheck(userInput,"username",userNote);
    fontCheck(pwdInput01,"password",pwdNote);
    fontCheck(banknumInput,"banknum",banknumNote);
    fontCheck(bankuserInput,"username",bankuserNote);
    fontCheck(shenfenId,"card",shenfenNote);
    fontCheck(phoneInput,"phone",phoneNote);
    fontCheck(emailInput,"email",emailNote);

    // 前端验证封装
    // 功能：非空及合法性验证
    // 参数：input
    // 返回值：无
    function fontCheck(domObj,regStr,note){
        domObj.onblur = function(){
            if(this.value == ""){
                this.nextElementSibling.innerHTML = "此项不能为空，请输入";
                this.nextElementSibling.style.color = "red";
                return;
            }
            var str = domObj.value;
            var result = checkReg(regStr,str);
            if(result==true){
                this.nextElementSibling.innerHTML = "✔";
                this.nextElementSibling.style.color = "#b4b4b4";
                return true;
            }else{
                this.nextElementSibling.innerHTML = note;
                this.nextElementSibling.style.color = "red";
            }
        }
    }

    //常用正则验证
    function checkReg(type,str){
        switch(type){
            case "username": var reg = /^[a-zA-Z_]\w{2,15}$/;break;
            case "email": var reg = /\w{6,16}@[a-zA-Z0-9]{2,5}.(com|cn|net|com.cn)$/;break;
            case "phone": var reg = /^1[0-9]{10}$/;break;
            case "password": var reg = /^\w{6,16}$/;break;
            case "banknum": var reg = /^\d{8}$/;break;
            case "postNode": var reg = /^[1-9]\d{5}$/;break;
            case "card": var reg = /^[1-9]\d{9}(0[1-9]|1[0-2])\d{5}(\d|X)$/;break;
            case "date": var reg = /^\d{4}\.(0[1-9]|1[0-2])\.(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;break;
            default:;
        }
        return reg.test(str);
    }

    // 验证用户名，注册新用户
    agreeBtn.onclick = function(){
        // 前端验证通过的前提下，进行验证
        var userP = userInput.onblur();
        var pwdInput01P = pwdInput01.onblur();
        var pwdInput02P = pwdInput02.onblur();
        var banknumInputP = banknumInput.onblur();
        var bankuserInputP = bankuserInput.onblur();
        var shenfenIdP = shenfenId.onblur();
        var phoneInputP = phoneInput.onblur();
        var emailInputP = emailInput.onblur();

        if(userP && pwdInput01P && pwdInput02P && banknumInputP && bankuserInputP && shenfenIdP && phoneInputP && emailInputP){
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
        }else{
            alert("请按提示完整填写信息");
            return;
        }
        
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