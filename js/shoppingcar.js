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
    
    // ajax获取购物车数据
    var shoppingcarBoxCont = $(".shoppingcarBoxCont")[0];
    var vipName = getCookie("username");
    var loadDiv = $("#loadDiv")[0];
    $.ajax({
        "type": "post",
        "url": "php/getShopCar.php",
        "data": {
            "vipName": vipName
        },
        "async": true,
        "datatype": "json",
        "error": function(){
            console.log("出错了");
        },
        "beforeSend":function(){
            loadDiv.style.display = "block";
        },
        "success": showCar,
        "complete":function(){
            loadDiv.style.display = "none";
        }
    })
    
    function showCar(response){
        let objs = JSON.parse(response);
        // 展示购物车
        var htmlstr = "";
        for(var i=0;i<objs.length;i++){
            htmlstr += `
                <li data-goodsId=${objs[i].goodsId}>
                    <div>
                        <input type="checkbox">
                    </div> 
                    <div> 
                        <img src="${objs[i].goodsImg}" alt="">
                    </div>
                    <div>
                        <a href="">${objs[i].goodsDesc}</a>
                    </div>              
                    <div><span>￥</span><span class="goodsPri">${objs[i].goodsPrice}</span></div>
                    <div>
                        <input type="button" value="-" class="btnReduce">
                        <input type="text" value="1" class="goodsNum">
                        <input type="button" value="+" class="btnAdd">
                    </div>
                    <div>
                        <p><span>￥</span><span class="oneTatal">${objs[i].goodsPrice}</span></p>
                    </div>
                    <div class="btnDel">
                        删除
                    </div>
                </li>           
            `;
        }
        shoppingcarBoxCont.innerHTML = htmlstr;

        // 购物车商品数量
        let shoppingcarTopCount = $(".shoppingcarTopCount")[0];
        let shoplength = shoppingcarBoxCont.children.length;
        shoppingcarTopCount.innerHTML = shoplength;

        // 获取选中商品数量的span
        var shoppingcarBotCount = $(".shoppingcarBotCount")[0];
        // 加法
        $(".btnAdd").click(function(){
            // 选中该商品
            let checkOne = $(this).parent().parent().children().first().children();
            checkOne.attr({
                "checked": "checked"
            })
            // 数量+1
            let $text = $(this).prev();
            let textVal = parseInt($text.val())+1;
            $text.val(textVal);
            // 单价
            let price = $(this).parent().prev().children().last().html();
            // 数量
            let count = $text.val();
            // 单类商品总价
            let oneTotal = $(this).parent().next().children().children().last();
            let oneTotalMoney = price * count;                     
            oneTotal.html(oneTotalMoney);
            // 所有商品总价
            calMoney();
            // 计算选中商品数量
            getcheckNum($(this));
        });
        
        // 减法
        $(".btnReduce").click(function(){
            // 选中该商品
            let checkOne = $(this).parent().parent().children().first().children();
            checkOne.attr({
                "checked": "checked"
            })
            // 减一
            let $text = $(this).next();
            let textVal = parseInt($text.val())-1;
            if(textVal<=0){
                textVal=0;
            }
            $text.val(textVal);
            // 单价
            let price = $(this).parent().prev().children().last().html();
            // 数量
            let count = $text.val();
            // 单类商品总价
            let oneTotal = $(this).parent().next().children().children().last();
            let oneTotalMoney = price * count;
            oneTotal.html(oneTotalMoney);
            // 所有商品总价
            calMoney();
            // 计算选中商品数量
            getcheckNum($(this));
        });

        // 手动输入商品数量
        $(".goodsNum").blur(function(){
            // 单价
            let price = $(this).parent().prev().children().last().html();
            // 数量
            let count = $(this).val();
            // 单类商品总价
            let oneTotal = $(this).parent().next().children().children().last();
            let oneTotalMoney = price * count;
            oneTotal.html(oneTotalMoney);
            // 所有商品总价
            calMoney();
        })

        // 全选
        $(".allCheckBox1").bindCheckBox($(".shoppingcarBoxCont :checkbox"),calMoney);
        $(".allCheckBox2").bindCheckBox($(".shoppingcarBoxCont :checkbox"),calMoney);

        // 计算check的数量---todo   
        function getcheckNum($calBtn){
            let num = 0;
            let checkOne = $calBtn.parent().parent().children().first().children();
            let isCheck = checkOne.attr("checked");
            if(isCheck){
                num++;
            }
            shoppingcarBotCount.innerHTML = num;
        }

        // 计算总价
        function calMoney(){
            let money = 0;
            let $subCheckBox = $(".shoppingcarBoxCont :checkbox");
            for(let i=0;i<$subCheckBox.length;i++){
                if($subCheckBox[i].checked){
                    let $goodsBox = $($subCheckBox[i].parentNode.parentNode);
                    money += parseFloat($goodsBox.find(".goodsPri").html())*parseFloat($goodsBox.find(".goodsNum").val());
                }
            }
            $(".shoppingcarBotTotalMoney").html(money);
            $(".shoppingcarTopMoney").html(money);
        }

        // 删除购物车---删除li之后，总价未更新
        var btnDel = $(".btnDel");
        btnDel.click(function(){
            var goodsId = this.parentNode.getAttribute("data-goodsId");
            var that = this;
            $.ajax({               
                "type": "post",
                "url": "php/deleteShopCar.php",
                "data": {
                    "vipName": vipName,
                    "goodsId": goodsId
                },
                "async": true,
                "datatype": "json",
                "error": function(){
                    console.log("出错了");
                },
                "success": delCar              
            })
            function delCar(response){
                if(response==1){
                    var chooseLi = that.parentNode;
                    var choosediv = chooseLi.firstElementChild;
                    var chooseinput = choosediv.firstElementChild;
                    if(chooseinput.checked){
                        chooseinput.checked = false;
                        calMoney();
                    }            
                    chooseLi.style.display = "none";
                }
                
            }
        })
    }

    // 右侧固定栏-返回顶部
    var backTopBtn = $(".rightFix_backTop")[0];
    backTopBtn.onclick = function(){
        $(window).scrollTop(0);
    }
})