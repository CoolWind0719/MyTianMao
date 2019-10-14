$(function(){
    var loginBtn = $("#loginBtn")[0];
    var noteBox = $(".noteBox")[0];
    var userInput = $("#userInput")[0];
    var pwdInput = $("#pwdInput")[0];
    loginBtn.onclick = function(){
        let xhr = new XMLHttpRequest();
        xhr.open("post","php/login.php",true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4 && xhr.status==200){
                if(xhr.responseText=="0"){
                    noteBox.innerHTML = "验证错误，请重新输入";
                }else if(xhr.responseText=="1"){
                    noteBox.style.color = "black";
                    noteBox.innerHTML = "验证成功";
                    location.href = "index.html";
                }
            }
        }
        //post方式：设置请求头
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        //post方式：把传给服务器的数据（键值对）放在send函数的参数里
        let sendstr = `userinput=${userInput.value}&userpwd=${pwdInput.value}`;
        xhr.send(sendstr);
    }
})