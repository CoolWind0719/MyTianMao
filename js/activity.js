$(function(){

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

    // 获取楼层元素
    var rightFix02 = $(".rightFix02")[0];
    var rightFix02lis = $(".rightFix02Ul li");
    var activtityFloors = $(".activtityCont");
    // 楼层滑过
    for(var i=0;i<rightFix02lis.length;i++){        
        rightFix02lis[i].setAttribute("index",i);     
        rightFix02lis[i].onmouseenter = function(){
            var index = this.getAttribute("index");            
            for(var j=0;j<rightFix02lis.length;j++){   
                rightFix02lis[j].style.backgroundColor = "#662ac9";
            }
            rightFix02lis[index].style.backgroundColor = "#331564";
        }
    }

    // 点击跳转楼层
    for(var i=0;i<rightFix02lis.length;i++){        
        rightFix02lis[i].setAttribute("index",i);     
        rightFix02lis[i].onclick = function(){
            var index = this.getAttribute("index");
            var activityTop = activtityFloors[index].offsetTop;
            $(window).scrollTop(activityTop);
            for(var j=0;j<rightFix02lis.length;j++){   
                rightFix02lis[j].style.backgroundColor = "#662ac9";
            }
            rightFix02lis[index].style.backgroundColor = "#331564";
        }
    }

    // 楼层高亮
    window.onscroll = function(){
        var pageScrollTop = document.documentElement.scrollTop || document.body.scrollTop;                    
        for(var i=0;i<rightFix02lis.length;i++){   
            // 左侧栏显示/隐藏
            if(pageScrollTop>=activtityFloors[0].offsetTop){
                rightFix02.style.display = "block";
            }
            if(pageScrollTop<activtityFloors[0].offsetTop){
                rightFix02.style.display = "none";
            }
            // 楼层高亮        
            if(pageScrollTop >= activtityFloors[i].offsetTop-50){
                for(var j=0;j<rightFix02lis.length;j++){   
                    rightFix02lis[j].style.backgroundColor = "#662ac9";
                }
                rightFix02lis[i].style.backgroundColor = "#331564";
            }
        }
    }
    
   
    
    
    
    
   

    // 右侧固定栏-返回顶部
    var backTopBtn = $(".rightFix_backTop")[0];
    backTopBtn.onclick = function(){
        $(window).scrollTop(0);
    }
    // 右侧固定栏-返回顶部2
    var rightFix02Bot = $(".rightFix02Bot")[0];
    rightFix02Bot.onclick = function(){
        $(window).scrollTop(0);
    }
})