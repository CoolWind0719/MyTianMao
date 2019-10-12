// 更新
// 函数封装：1)功能 2)参数 3)返回值

// 100以内的数，逢n过
function nGuo(n){
    for(var i=1;i<=100;i++){
        if(i%n==0 || parseInt(i/10)==n || i%10==n){
            return "过，";
        }else{
            return i+",";
        }
    }
}

// n*n乘法表
function getChengTable(n){
    for(var i=1;i<=n;i++){
        for(var j=1;j<=i;j++){
            document.write(i+"*"+j+"="+i*j+"&nbsp;")
        }
        document.write("<br>");
    }
}

// 加减乘除计算器
function yunsuan(m,n,k){
    var result = 0;
    if(k == "+"){
        result = m + n;
    }else if(k == "-"){
        result = m - n;           
    }else if(k == "*"){
        result = m * n;
    }else if(k == "/"){
        result = m/n;
    }else{
        result = m%n;
    }
    return result;
}

// 三个数按序输出
function compairNum(m,n,o){
    // 逻辑
    // 中间值 33 56 78
    var str = "";
    var max = m>n?(m>o?m:o):(n>o?n:o);
    var min = m<n?(m<o?m:o):(n<o?n:o);
    var mid = 0;
    if((m-n)*(n-o)>=0){
        mid = n;
    }else if((m-o)*(o-n)>=0){
        mid = o;
    }else if((o-m)*(m-n)>=0){
        mid = m;
    }
    str = min + "<" + mid + "<" + max;
    return str;
}

// 生成n位验证码
function getMa(n){
    var str = "";
    for(var i=1;i<=n;i++){
        str += parseInt(Math.random()*10);
    }
    return str;
}

// 四位数字加密
function secreatNum(m,n,o,p){
    var str = "";
    var mNew = (m+5)%10;
    var nNew = (n+5)%10;
    var oNew = (o+5)%10;
    var pNew = (p+5)%10;
    var str = pNew.toString() +  nNew.toString() + oNew.toString() + mNew.toString();
    return str;
}

// 1-n的阶乘和
function getJiecheng(n){
    var sum = 0;
    for(var i=1;i<=n;i++){
        var jie = 1;
        for(var j=1;j<=i;j++){
            jie *= j;
        }
        sum += jie;
    }
    return sum;
}

// 判断是否闰年
function isRun(year){
    if((year%4==0 && year%100!=0)|| (year%400==0)){
        return true;
    }else{
        return false;
    }
}

// 根据年月，求当月天数
function getDays(m,n){
    var days = 0;
    if(m<0){
        alert("请输入公元后的年份");
    }
    if(n>12 || n<0){
        alert("请输入正确的月份");
    }    
    if(n==1 || n==3 || n==5 || n==7 || n==8 || n ==10 || n ==12){
        days = 31;
    }else if(n==4 || n==6 || n==9 || n==11){
        days = 30;
    }else{
        if(isRun(m)==true){
            days = 29;
        }else{
            days = 28;
        }
    }
    return days;    
}

// 根据年月日，求当日是今天第几天
function getDaysCount(m,n,o){
    if(isLeagleDate(m,n,o)==false){
        return -1;
    }
 
    var dayscount = 0;
    switch(n){
        case 12:dayscount += 30;
        case 11:dayscount += 31;
        case 10:dayscount += 30;
        case 9:dayscount += 31;
        case 8:dayscount += 31;
        case 7:dayscount += 30;
        case 6:dayscount += 31;
        case 5:dayscount += 30;
        case 4:dayscount += 31;
        case 3:dayscount += 28;
        case 2:dayscount += 31;
        case 1:dayscount += o;break;
        default:;
    }
    if(n>2){
        if(isRun(m)==true){
            dayscount+=1;
        }        
    }    
    return dayscount;
}
// 日期合法性判断
function isLeagleDate(m,n,o){
    if(parseInt(m)!=m || parseInt(n)!=n || parseInt(o)!=o){
        return false;
    }
    if(m<1){
        return false;
    }
    if(n<0 || n>12){
        return false;
    }
    if(o<0 || o>31){
        return false;
    }
    if(isRun(m)==true){
        if(n==2 && o>29){
            return false;
        }
    }else{
        if(n==2 && o>28){
            return false;
        }
    }
    return true;
}

// 判断一个数是不是素数
function isSu(n){
    var is = true;
    for(var i=2;i<=n-1;i++){
        if(n%i==0){
            is = false;
        }
    }
    return is;
}

// m-n能被7整除的数
function zheng7(m,n){
    var str = "";
    for(var i=m;i<=n;i++){
        if(i%7==0){
            str +=(i+",");
        }
    }
    return str;
}

// 显示m-n之间的素数
function getSuCount(m,n){
    
    if(m>n){
        var temp = m;
        m = n;
        n = temp;
    }
    if(m<0 || n<0 || parseInt(m)!=m || parseInt(n)!=n){
        alert("请输入正整数");
    }
    var str = "";
    for(var i=m;i<=n;i++){
        var isSu = true;
        
        for(var j=2;j<i;j++){
            if(i%j==0){
                isSu = false;
                break;
            }
        }
        if(isSu==true){
            str += (i+",");
        }            
    }
    return str; 
}

// 求m-n的随机数
function getRandom(m,n){
    if(m>n){
        var temp = m;
        m = n;
        n = temp;
    }
    var str =  parseInt(Math.random()*(n-m+1))+m;
    return str;
}

// 数组中每个数增长30%，结果保留2位小数
function map(arr){
    for(var i=0;i<arr.length;i++){
        arr[i] = (arr[i]*1.3).toFixed(2);
    }  
    //没有返回值是因为引用类型的内存位置。可以通过被调函数改变主函数的值。   
}

// 判断数组中是否存在某个值，返回true,false
function has(arr,n){
    for(var i=0;i<arr.length;i++){
        if(arr[i]==n){
            return true;
        }
    }
    return false;
}

// 数组去重
function norepeat(arr){
    // 数组去重：
    // 利用has函数
    var arr2= [];
    for(var i=0;i<arr.length;i++){
        if(has(arr2,arr[i])==false){
            arr2.push(arr[i]);
        }
    }
    return arr2;
    
}

// 随机点名
function getLuckyNum(arr){
    // 随机数的范围：假如长度是7；
    // parseInt(Math.random()*n) 0-6
    var luckyNum = parseInt(Math.random()*(arr.length));
    return arr[luckyNum];
} 

// 转十进制：每位数字*n^0
// 123 1*8^2+2*8^1+3*8^0;  64+16+3=103
function changeTen(num,n){
    var temp = num;
    var sum = 0;
    var i = 0;
    while(temp>0){            
        var gg = temp%10;
        sum += gg*Math.pow(n,i);
        temp = parseInt(temp/10);
        i++;
    }
    return sum;
}

// 十进制转其他进制，对n取余，当商为0时，将余数相拼接
function changeQita(num,n){
    var temp = num;
    var arr = [];
    while(temp>0){
        var gg = temp%n;
        arr.unshift(gg);
        temp = parseInt(temp/n);
    }
    var sum = "";
    for(var i=0;i<arr.length;i++){
        sum += arr[i];
    }
    return sum;
}

// 在已排序的数组中插入一个元素
function insertArr(arr,num){
    for(var i=0;i<arr.length;i++){
        if(num>=arr[i] && num<arr[i+1]){
            arr.splice(i+1,0,num);
            break;
        }
    }
    return arr;
}

// 冒泡排序
function bubbleSort(arr){
    for(var i=0;i<arr.length-1;i++){
        for(var j=0;j<arr.length-1-i;j++){
            if(arr[j]>arr[j+1]){
                var temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}

// 选择排序
function chooseSort(arr){
    for(var i=0;i<arr.length-1;i++){
        var min = arr[i];
        minIndex = i;
        for(var j=i+1;j<arr.length;j++){
            if(arr[j]<min){
                min = arr[j];
                minIndex = j;
            }
        }
        var temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

// 输出自己的日期格式，参数为日期对象和字符格式，如果不传格式，默认用汉字
function myDateString(date,reg){   
    var myear = date.getFullYear();
    var mmonth = (date.getMonth()+1)<10?"0"+(date.getMonth()+1):(date.getMonth()+1);
    var mdate = (date.getDate()+1)<10?"0"+(date.getDate()+1):(date.getDate()+1);
    var mhour = (date.getHours()+1)<10?"0"+(date.getHours()+1):(date.getHours()+1);
    var mminutes = (date.getMinutes()+1)<10?"0"+(date.getMinutes()+1):(date.getMinutes()+1);
    var msconds = (date.getSeconds()+1)<10?"0"+(date.getSeconds()+1):(date.getSeconds()+1);
    if(reg==undefined){
        return myear +"年"+ mmonth +"月"+ mdate +"日"+ " " + mhour + ":" + mminutes + ":" + msconds;
    }
    return myear + reg + mmonth + reg + mdate +" "+ mhour + ":" + mminutes + ":" + msconds;
}

// 转换数字周几为汉字
function toWeek(date){
    var week = date.getDay();
    switch (week){
        case 0:return "周日";
        case 1:return "周一";
        case 2:return "周二";
        case 3:return "周三";
        case 4:return "周四";
        case 5:return "周五";
        case 6:return "周六";
        default:;
    }
}

// 计算两个日期的秒数差
function getSecondCha(date1,date2){
    var arr = [];
    var time1 = date1.getTime();
    var time2 = date2.getTime();
    var shijiancha = time1-time2; 
    var days = shijiancha / 1000 / 60 / 60 / 24;
    var daysRound = Math.floor(days);
    arr.push(daysRound);
    var hours = shijiancha/ 1000 / 60 / 60 - (24 * daysRound);
    var hoursRound = Math.floor(hours);
    arr.push(hoursRound);
    var minutes = shijiancha / 1000 /60 - (24 * 60 * daysRound) - (60 * hoursRound);
    var minutesRound = Math.floor(minutes);
    arr.push(minutesRound);
    var seconds = shijiancha/ 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound); 
    arr.push(seconds);
    return arr;
}

// 计算两个日期的天数差，为避免出现小数点，将时分秒初始化为0，仅比较天数
// 每天有24*60*60*1000毫秒
function getDateCha(date1,date2){
    date1.setHours(0);
    date1.setMinutes(0);
    date1.setSeconds(0);
    date2.setHours(0);
    date2.setMinutes(0);
    date2.setSeconds(0);
    var time1 = date1.getTime();
    var time2 = date2.getTime();
    var days = (time1-time2)/86400000;   
    return days;        
}

// 计算两个日期的月份差
function getMonthCha(date1,date2){
    return ((date1.getFullYear()-date2.getFullYear())*12+(date1.getMonth()-date2.getMonth()));
}

// 计算两个日期的年份差
function getYearCha(date1,date2){
    return date1.getFullYear()-date2.getFullYear();
}

// 获取ID和类名
// function $(str){
//     if(str.charAt(0)=="."){
//         return document.getElementsByClassName(str.slice(1));
//     }else if(str.charAt(0)=="#"){
//         return document.getElementById(str.slice(1));
//     }else{
//         return document.getElementsByTagName(str);
//     }
// }

//常用正则验证
function checkReg(type,str){
    switch(type){
        case "username": var reg = /^[a-zA-Z_]\w{7,15}$/;break;
        case "email": var reg = /\w{6,16}@[a-zA-Z0-9]{2,5}.(com|cn|net|com.cn)$/;break;
        case "phone": var reg = /^1[0-9]{10}$/;break;
        case "postNode": var reg = /^[1-9]\d{5}$/;break;
        case "card": var reg = /^[1-9]\d{9}(0[1-9]|1[0-2])\d{5}(\d|X)$/;break;
        case "date": var reg = /^\d{4}\.(0[1-9]|1[0-2])\.(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;break;
        default:;
    }
    return reg.test(str);
}

//元素样式获取（带px单位）
function getStyle(domObj,attr){
    if(domObj.currentStyle){
        return domObj.currentStyle[attr];
    }else{
        return window.getComputedStyle(domObj)[attr];
    }
}

//改变单个元素的匀速运动/透明度
function moveDiv(domObj,attr,end,timeLong){
    let start = parseFloat(getStyle(domObj,attr));
    let timeSpace = 16;
    let direction = start>end?-1:1;
    let step = Math.abs(end-start)/(timeLong/timeSpace);
    let value = start;
    mytimer = setInterval(()=>{
        //1.改变数据                    
        value = value + direction*step;
        if(direction==1?value>=end:value<=end){
            value = end;
            clearInterval(mytimer);
        }
        //2.改变样式
        if(attr=="opacity"){
            domObj.style[attr] = value;
        }else{
            domObj.style[attr] = value + "px";
        }       
    },timeSpace);      
    return mytimer;  
}

// 两个元素的淡入淡出
function fadeInOut(inImg,outImg,timeLong){

    let timeSpace = 16;
    let step = 1/(timeLong/timeSpace); 
    let opacity = 0;

    let myTimer = setInterval(()=>{
        //一、处理数据
        opacity+=step;
        if(opacity>=1){
            opacity = 1;
            window.clearInterval(myTimer);
        }

        //二、改变外观
        inImg.style.opacity = opacity;
        outImg.style.opacity = 1-opacity;

    },timeSpace);
}


// 单元素多属性的运动
// endObj = {
//     "width": 500,
//     "height": 500,
//     "left": 500
// }
function animate(domObj,endObj,timeLong){
    let startObj = {};
    for(let key in endObj){
        startObj[key] = parseFloat(getStyle(domObj,key));
    }
    let timeSpace = 16;
    let directionObj = {};
    for(let key in endObj){
        directionObj[key] = startObj[key]>endObj[key]?-1:1;
    }
    let stepObj = {};
    for(let key in endObj){
        stepObj[key] = Math.abs(endObj[key] - startObj[key]) / (timeLong/timeSpace);
    }
    let valueObj = {};
    for(let key in endObj){
        valueObj[key] = startObj[key];
    }
    mytimer = setInterval(()=>{
        //1.改变数据                    
        for(let key in endObj){
            valueObj[key] = valueObj[key] + directionObj[key]*stepObj[key];
        }
        for(let key in endObj){
            if(directionObj[key]==1?valueObj[key]>=endObj[key]:valueObj[key]<=endObj[key]){
                valueObj[key] = endObj[key];
                if(mytimer!=null){
                    clearInterval(mytimer);
                    mytimer = null;
                }
            }
        }
        //2.改变样式         
        for(let key in endObj){
            if(key == "opacity"){
                domObj.style[key] = valueObj[key];
            }else{
                domObj.style[key] = valueObj[key] + "px";
            }
        }   
    },timeSpace);      
    return mytimer;      
}