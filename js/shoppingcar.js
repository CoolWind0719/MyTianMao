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

    // shopcar-选项卡
    var shoppingcarToplis = $(".shoppingcarTop li");
    var shoppingcarToplips = $(".shoppingcarTop li p");
    for(let i=0;i<shoppingcarToplis.length;i++){
        shoppingcarToplis[i].onclick = function(){
            for(var j=0;j<shoppingcarToplis.length;j++){
                shoppingcarToplis[j].style.borderBottom = "0";
                shoppingcarToplips[j].style.color = "#3c3c3c";
            }
            this.style.borderBottom = "1px solid red";
            shoppingcarToplips[i].style.color = "#ff4400";
        }
    }
    

    

    

    

    

    // 右侧固定栏-返回顶部
    var backTopBtn = $(".rightFix_backTop")[0];
    backTopBtn.onclick = function(){
        $(window).scrollTop(0);
    }
})