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

    // 右侧固定栏-返回顶部
    var backTopBtn = $(".rightFix_backTop")[0];
    backTopBtn.onclick = function(){
        $(window).scrollTop(0);
    }
})