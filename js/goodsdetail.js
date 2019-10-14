$(function(){
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
})