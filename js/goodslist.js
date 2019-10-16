$(function(){
    
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
                <li>
                    <div>
                        <a href="goodsdetail.html" class="testlilili"><img src="${objs[i].goodsImg}" alt=""></a>
                        <a href="goodsdetail.html">${objs[i].goodsDesc}</a>
                    </div>
                    <p>总销量：<span>${objs[i].goodsCount}</span></p>
                    <div>
                        <span>￥${objs[i].goodsPrice}</span>
                        <a href="shoppingcar.html"><img src="images/goodslist06.jpg" alt=""></a>
                    </div> 
                </li>                       
            `;
        }
        contentBox04Ul.innerHTML = htmlstr;
        
        // $(".testlilili")[0].onclick = function(){
        //     setCookie("goodId",objs[i].goodId,7);
        //     location.href = "http://www.baidu.html";
        //     return false;
        // }
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
})



