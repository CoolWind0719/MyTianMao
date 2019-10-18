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


    // header
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
    
    // 右侧固定栏-返回顶部
    var backTopBtn = $(".rightFix_backTop")[0];
    var ritFixLis = $(".rightFix li");
    var ritFixDivs = $(".rightFix li div");
    
    backTopBtn.onclick = function(){
        $(window).scrollTop(0);
    }

    // 内容：左侧隐藏/显示
    var moreFlag = true;
    var jcspBtn = $("#jcspBtn");
    var jcspUl = $("#jcspUl");
    jcspBtn.click(function(){
        if(moreFlag==true){
            $(this).val("+");
            jcspUl.css({
                "display":"none"
            });
            moreFlag = false;
        }else{
            $(this).val("-");
            jcspUl.css({
                "display":"block"
            });
            moreFlag = true;            
        }
    })


    // 内容：品牌->更多
    var pinpaiMore01 = $(".pinpaiMore01");
    var pinpaiMore02 = $(".pinpaiMore02");
    var pinpaiUlMore01 = $(".pinpaiUlMore01");
    var pinpaiUlMore02 = $(".pinpaiUlMore02"); 
    var picMore = $(".picMore");
    
    pinpaiMore01.click(function(){
        if(moreFlag==true){
            pinpaiUlMore01.show();           
            $(this).html("收起");
            moreFlag = false;
            picMore.attr({"src":"images/login07.jpg"})
        }else{
            pinpaiUlMore01.hide();
            moreFlag = true;
            $(this).html("更多");
            picMore.attr({"src":"images/login06.jpg"})
        }

    })
    // 内容：产地->更多
    pinpaiMore02.click(function(){
        if(moreFlag==true){
            pinpaiUlMore02.show();           
            $(this).html("收起");
            picMore.attr({"src":"images/login07.jpg"});
            moreFlag = false;
        }else{
            pinpaiUlMore02.hide();
            $(this).html("更多");
            picMore.attr({"src":"images/login06.jpg"});
            moreFlag = true;
        }

    })
    // 内容：精简选项
    var jjxxBtn = $(".jjxxBtn");
    var jjxxBtnimg = $(".jjxxBtn>img");
    var pinpaiDiv56 = $(".pinpaiDiv56");
    var jjxxBtnSpan = $(".jjxxBtn span");
    jjxxBtn.click(function(){
        if(moreFlag==true){
            pinpaiDiv56.show();           
            jjxxBtnimg.attr({"src":"images/login06.jpg"});
            jjxxBtnSpan.html("精简选项");
            moreFlag = false;
        }else{
            pinpaiDiv56.hide();
            jjxxBtnimg.attr({"src":"images/login07.jpg"});
            jjxxBtnSpan.html("更多选项");
            moreFlag = true;            
        }
    })

    // ajax获取后端商品列表
    var contentBox04Ul = $(".contentBox04>ul")[0];
    var loadDiv = $("#loadDiv");
    $.ajax({
        "type": "post",
        "url": "php/goodslist.php",
        "data": "",
        "async": true,
        "datatype": "json",
        "beforeSend":function(){
            loadDiv.show();
        },
        "success": showGoods,
        "complete": function(){
            loadDiv.hide();
        }
    })
    
    function showGoods(response){
        let objs = JSON.parse(response);
        let htmlstr = "";
        for(let i=0;i<objs.length;i++){
            htmlstr += `
                <li data-goodsId=${objs[i].goodsId}>
                    <div>
                        <a href="goodsdetail.html?data-goodsId=${objs[i].goodsId}"><img src="${objs[i].goodsImg}" alt=""></a>
                        <a href="goodsdetail.html?data-goodsId=${objs[i].goodsId}">${objs[i].goodsDesc}</a>
                    </div>
                    <p>总销量：<span>${objs[i].goodsCount}</span></p>
                    <div>
                        <span>￥${objs[i].goodsPrice}</span>
                        <a href="shoppingcar.html" class="addShopCar"><img src="images/goodslist06.jpg" alt="" ></a>
                    </div> 
                </li>                       
            `;
        }
        contentBox04Ul.innerHTML = htmlstr;

        // ajax添加购物车商品
        var addShopCar = $(".addShopCar");   
        var shopcarNote = $(".shopcarNote")[0]; 
        var shopcarNoteP = $(".shopcarNoteP")[0];
        for(var i=0;i<addShopCar.length;i++){
            addShopCar[i].onclick = function(){
                var vipName = getCookie("username");
                var parentLi = this.parentNode.parentNode;
                var goodsId = parentLi.getAttribute("data-goodsId");
                var goodsCount = 1;
                var goodsPrice = this.previousElementSibling.innerHTML;
                var goodsImg = parentLi.firstElementChild.firstElementChild.firstElementChild.getAttribute("src");
                var goodsDesc =  parentLi.firstElementChild.lastElementChild.innerHTML;

                $.ajax({
                    "type": "post",
                    "url": "php/addShopCar.php",
                    "data": {
                        "vipName": vipName,
                        "goodsId": goodsId,
                        "goodsPrice": goodsPrice,
                        "goodsCount": goodsCount,
                        "goodsImg": goodsImg,
                        "goodsDesc": goodsDesc
                    },
                    "async": true,
                    "datatype": "json",
                    "success": shopcarShow
                })

                function shopcarShow(response){
                    if(response==1){
                        shopcarNote.style.display = "block";
                        shopcarNote.style.innerHTML = "商品添加成功！";
                    }else if(response==0){
                        shopcarNote.style.display = "block";
                        shopcarNote.style.innerHTML = "商品添加失败，请登录！";
                    }else{
                        alert("出错了");
                    }

                }
                shopcarNoteP.onclick = function(){
                    shopcarNote.style.display = "none";
                }
            }
        }



    }



    
})



