$(function(){
    // 获取登录用户
    var navLeftSpan = $(".navLeftSpan")[0];
    var navLogin = $(".navLogin")[0];
    var navRigster = $(".navRigster")[0];
    welcomeUser(); 
    function welcomeUser(){
        let username = getCookie("username");
        if(username!=null){
            navLeftSpan.innerHTML = username;
            navLogin.style.display = "none";
            navRigster.style.display = "none";
        }else{
            navLeftSpan.innerHTML = "喵~";
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

    // 地区选择
    // 获取元素
    var headerCity01s = $(".headerCity01");
    var headerCtiyToplis = $(".headerCtiyTop ul li");
    var headerAera = $(".headerAera");
    var headerAeraOthers = $(".headerAeraOthers");
    // 初始化
    headerCity01s.css({
        "display": "none"
    }); 
    headerCity01s[0].style.display = "block";
    headerCtiyToplis[0].style.border = "1px solid #eeeeee";
    headerCtiyToplis[0].style.borderBottom = "none";
    // 选项卡
    for(var i=0;i<headerCtiyToplis.length;i++){
        headerCtiyToplis[i].setAttribute("index",i);
        headerCtiyToplis[i].onmouseenter = function(){
            for(var j=0;j<headerCtiyToplis.length;j++){
                headerCity01s[j].style.display = "none";
                headerCtiyToplis[j].style.border = "none";
            }
            this.style.border = "1px solid #eeeeee";
            this.style.borderBottom = "none";
            var index = this.getAttribute("index");
            headerCity01s[index].style.display = "block";
        }
    }

    headerAera[0].onmouseenter = function(){
        headerAeraOthers[0].style.display = "block";
    }
    headerAera[0].onmouseleave = function(){
        headerAeraOthers[0].style.display = "none";
    }



    

    // 商品-更多优惠
    var goodsRit01P01 = $(".goodsRit01P01")[0];
    var goodsRit01P02 = $(".goodsRit01P02")[0];
    var goodsRit01D01 = $(".goodsRit01D01")[0];
    
    var goodsFlag = true;
    goodsRit01P01.onclick = function(){
            goodsRit01D01.style.display = "block"; 
    }
    goodsRit01P02.onclick = function(){       
        goodsRit01D01.style.display = "none";     
    }

    // 商品-选择型号
    var goodsRit04lis = $(".goodsRit04li");
    goodsRit04lis[0].style.border = "2px solid #ff0036";
    for(var i=0;i<goodsRit04lis.length;i++){
        goodsRit04lis[i].onclick = function(){
            for(var j=0;j<goodsRit04lis.length;j++){
                goodsRit04lis[j].style.border = "1px solid #e2e1e3";
            }
            this.style.border = "2px solid #ff0036";                   
        }
    }

    // 商品-支付方式
    var goodsRit08P = $(".goodsRit08P")[0];
    var goodsRit08Ul = $(".goodsRit08Ul")[0];
    goodsRit08P.onclick = function(){
        if(goodsFlag == true){
            this.style.background = "url(images/goodsdetail05.jpg) no-repeat right 11px";
            goodsRit08Ul.style.display = "block";
            goodsFlag = false;
        }else{
            this.style.background = "url(images/goodsdetail04.jpg) no-repeat right 11px";
            goodsRit08Ul.style.display = "none";
            goodsFlag = true;
        }
    }

    // 商品-详情/评价/售后
    var detailsRitToplis = $(".detailsRitTopli");
    var detailsRitToplias = $(".detailsRitTopli p");
    var detailsRitBot00 = $(".detailsRitBot00");
    for(let i=0;i<detailsRitToplis.length;i++){
        detailsRitToplis[i].onclick = function(){
            for(var j=0;j<detailsRitToplis.length;j++){
                detailsRitToplis[j].style.border = "0";
                detailsRitToplias[j].style.color = "#333333";
                detailsRitToplias[j].style.borderRight= "1px dashed #d2d2d2";
                detailsRitBot00[j].style.display = "none";
            }
            if(i!=0){
                detailsRitToplias[i-1].style.borderRight = "0";
            }
            detailsRitBot00[i].style.display = "block";
            detailsRitToplias[i].style.borderRight = "0";
            detailsRitToplias[i].style.color = "#ff0036";
            this.style.borderTop = "2px solid #ff0036";
            this.style.borderLeft = "1px solid #cfbfb1";
            this.style.borderRight = "1px solid #cfbfb1";
        }
    }

    // ajax获取商品详情
    
    // 左侧banner图
    var goodsLeft = $(".goodsLeft")[0];
    // 商品描述
    var goodsRitDesc = $(".goodsRitDesc")[0];
    // 商品单价
    var goodsRitPrice = $(".goodsRitPrice")[0];
    // 商品重量
    var goodsRitWeight = $(".goodsRitWeight")[0];
    // 商品销量
    var goodsRitCount = $(".goodsRitCount")[0];
    // 商品评价
    var goodsRitCharge = $(".goodsRitCharge")[0];
    // 商品积分
    var goodsRitScore = $(".goodsRitScore")[0];
    // 商品型号1
    var goodRitType01 = $(".goodRitType01")[0];
    // 商品型号2
    var goodRitType02 = $(".goodRitType02")[0];
    // 商品库存
    var goodRitSave = $(".goodRitSave")[0];

    // 地址栏中的商品ID
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    };
    var listGoodsId = getUrlParam("data-goodsId");
    console.log(listGoodsId);

    $.ajax({
        "type": "post",
        "url": "php/goodsinfo.php",
        "data": "goodsId="+listGoodsId,
        "async": true,
        "datatype": "json",
        "error": function(){
            console.log("出错了");
        },
        "success": showInfo
    })

    function showInfo(response){
        let objs = JSON.parse(response);
        
        // 左侧banner图
        var lefthtmlstr = "";       
        lefthtmlstr = `                
            <ul class="goodsLeft01">
                <li class="goodsLeft01li"><img src="${objs.beiyong1}" alt=""></li>
                <li class="goodsLeft01li"><img src="${objs.beiyong2}" alt=""></li>
                <li class="goodsLeft01li"><img src="${objs.beiyong3}" alt=""></li>
                <li class="goodsLeft01li"><img src="${objs.beiyong4}" alt=""></li>
                <li class="goodsLeft01li"><img src="${objs.beiyong5}" alt=""></li>
            </ul>
            <ul class="goodsLeft02">
                <li class="goodsLeft02li"><img src="${objs.beiyong1}" alt=""></li>
                <li class="goodsLeft02li"><img src="${objs.beiyong2}" alt=""></li>
                <li class="goodsLeft02li"><img src="${objs.beiyong3}" alt=""></li>
                <li class="goodsLeft02li"><img src="${objs.beiyong4}" alt=""></li>
                <li class="goodsLeft02li"><img src="${objs.beiyong5}" alt=""></li>
            </ul>                         
        `;
        goodsLeft.innerHTML = lefthtmlstr;

        // 商品选项卡
        var goodsLeft01lis = $(".goodsLeft01li");
        var goodsLeft02lis = $(".goodsLeft02li");
        for(let i=0;i<goodsLeft01lis.length;i++){
            goodsLeft01lis[i].setAttribute("index",i);
        }
        // goodsLeft01lis[0].style.display = "block";
        for(let i=0;i<goodsLeft02lis.length;i++){ 
            goodsLeft02lis[i].onclick = function(){
                for(let j=0;j<goodsLeft02lis.length;j++){
                    goodsLeft02lis[j].style.border = "0";
                    goodsLeft01lis[j].style.display = "none";
                }
                let index = goodsLeft01lis[i].getAttribute("index");
                goodsLeft02lis[index].style.border = "1px solid #666666";
                goodsLeft01lis[index].style.display = "block";
            }
        }




        // 商品标题
        goodsRitDesc.innerHTML = `${objs.goodsDesc}`;
        // 商品单价
        goodsRitPrice.innerHTML = `${objs.goodsPrice}`;
        // 商品重量
        goodsRitWeight.innerHTML = `${objs.beiyong6}`;
        // 商品销量
        goodsRitCount.innerHTML = `${objs.goodsCount}`;
        // 商品评价
        goodsRitCharge.innerHTML = `${objs.beiyong8}`;
        // 商品积分
        goodsRitScore.innerHTML = `${objs.beiyong9}`;
        // 商品型号1
        goodRitType01.innerHTML = `${objs.beiyong10}`;
        // 商品型号2
        goodRitType02.innerHTML = `${objs.beiyong11}`;
        // 商品库存
        goodRitSave.innerHTML = `${objs.beiyong7}`;
    }


    // 右侧固定栏-返回顶部
    var backTopBtn = $(".rightFix_backTop")[0];
    backTopBtn.onclick = function(){
        $(window).scrollTop(0);
    }
})