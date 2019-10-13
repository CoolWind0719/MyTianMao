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
    
    //banner左侧
    var bannerLeftlis = $(".bannerLeft>ul>li");
    var bannerLeftItems = $(".bannerLeftItems");
    for(let i=0;i<bannerLeftlis.length;i++){
        bannerLeftlis[i].onmouseover = function(){
            for(var j=0;j<bannerLeftlis.length;j++){
                bannerLeftItems[j].style.display = "none";
            }
            bannerLeftItems[i].style.display = "block";
        }
        bannerLeftlis[i].onmouseout = function(){
            for(var j=0;j<bannerLeftlis.length;j++){
                bannerLeftItems[j].style.display = "none";
            }
        }
    }

    // 左侧固定栏
    /*
        1.页面滚动到楼层的scrollTop时，该li背景色，字体颜色变化
        2.点击某个li时，页面滚动到该li对应的楼层
    */
    var leftFix = $(".leftFix")[0];
    var leftFixlis = $(".leftFix>ul>li");
    var leftFixlias = $(".leftFix>ul>li>a");
    var lingshiFloors = $(".lingshi");   

    // 楼层滑过
    for(var i=0;i<leftFixlis.length;i++){        
        leftFixlis[i].setAttribute("index",i);     
        leftFixlis[i].onmouseenter = function(){
            var index = this.getAttribute("index");            
            for(var j=0;j<leftFixlis.length;j++){   
                leftFixlis[j].style.backgroundColor = "white";
                leftFixlias[j].style.color = "#9a9a9a";
            }
            leftFixlis[index].style.backgroundColor = "#e5374d";
            leftFixlias[index].style.color = "white";
        }
    }

    // 点击跳转楼层
    for(var i=0;i<leftFixlis.length;i++){        
        leftFixlis[i].setAttribute("index",i);     
        leftFixlis[i].onclick = function(){
            var index = this.getAttribute("index");
            var lingshiTop = lingshiFloors[index].offsetTop;
            $(window).scrollTop(lingshiTop);
            for(var j=0;j<leftFixlis.length;j++){   
                leftFixlis[j].style.backgroundColor = "white";
                leftFixlias[j].style.color = "#9a9a9a";
            }
            leftFixlis[index].style.backgroundColor = "#e5374d";
            leftFixlias[index].style.color = "white";
        }
    }

    // 楼层高亮
    window.onscroll = function(){
        var pageScrollTop = document.documentElement.scrollTop || document.body.scrollTop;                    
        for(var i=0;i<leftFixlis.length;i++){   
            // 左侧栏显示/隐藏
            if(pageScrollTop>=lingshiFloors[0].offsetTop){
                leftFix.style.display = "block";
            }
            if(pageScrollTop<lingshiFloors[0].offsetTop){
                leftFix.style.display = "none";
            }
            // 楼层高亮        
            if(pageScrollTop >= lingshiFloors[i].offsetTop-50){
                for(var j=0;j<leftFixlis.length;j++){   
                    leftFixlis[j].style.backgroundColor = "white";
                    leftFixlias[j].style.color = "#9a9a9a";
                }
                leftFixlis[i].style.backgroundColor = "#e5374d";
                leftFixlias[i].style.color = "white";
            }
        }
    }
    
    // 右侧固定栏-返回顶部
    var backTopBtn = $(".rightFix_backTop")[0];
    var ritFixLis = $(".rightFix li");
    var ritFixDivs = $(".rightFix li div");
    
    backTopBtn.onclick = function(){
        $(window).scrollTop(0);
    }
    // 内容：品牌->更多
    var pinpaiMore01 = $(".pinpaiMore01");
    var pinpaiMore02 = $(".pinpaiMore02");
    var pinpaiUlMore01 = $(".pinpaiUlMore01");
    var pinpaiUlMore02 = $(".pinpaiUlMore02"); 
    var picMore = $(".picMore");
    var moreFlag = true;
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
})



