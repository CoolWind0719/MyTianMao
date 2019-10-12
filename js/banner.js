// 更新更新
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
        // 更新
        /*
            定义轮播图类，在构造函数设置各种属性，方法中写render,autoPlay,stopPlay,小圆点的点击，移入移出
        */
       class Banner{
        constructor(boxDom,obj){
            //需要图片盒子，图片的路径，li的盒子，宽高，timeSpace，
            this.boxDom = boxDom;
            let defaultObj = {
                imgs:["images/bannerAA01.jpg","images/bannerAA02.jpg","images/bannerAA03.jpg","images/bannerAA04.jpg","images/bannerAA05.jpg","images/bannerAA06.jpg"
                ,"images/bannerAA07.jpg","images/bannerAA08.jpg"],
                width:400,
                height:300,
                timeSpace:2000,
                index:0,
                liSize : 18,
                liIsCircle:true,
                liColor:"#000000",
                liHignColor:"#c40000",
                aHrefs:["http://www.baidu.com","http://www.taobao.com","http://www.jingdong.com","http://www.ifeng.com","http://www.huawei.com"],
                btnWidth: 40,
                btnHeight: 60,
                btnUlHeight: "100%",
                btnColor: "black",
                btnOpacity: .2                    
            }
            for(let key in defaultObj){
                this[key] = obj[key]==undefined?defaultObj[key]:obj[key];
            }
            this.mytimer = null;
            this.imgBox = null;
            this.ulBox = null;
            this.li = null;
            this.aDom = null;
            this.btnBox = null;
            this.leftBtn = null;
            this.rightBtn = null;
        }
        render(){
            this.boxDom.style.position = "relative";
            this.imgBox = document.createElement("div");
            this.imgBox.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
            `;
            
            for(let i=0;i<this.imgs.length;i++){
                //创建a标签
                this.aDom = document.createElement("a");
                this.aDom.style.cssText = `
                    display: block;
                    position: absolute;
                    width: 100%;
                    height: 100%;                    
                    opacity: 0;
                `;
                this.aDom.href = this.aHrefs[i];
                //创建img标签
                this.imgDom = document.createElement("img");
                this.imgDom.style.cssText = `
                    position: absolute;
                    width: 100%;
                    height: 100%;                                            
                `;
                this.imgDom.src = this.imgs[i];
                this.imgBox.appendChild(this.imgDom);
                if(i==0){
                    this.aDom.style.opacity = 1;
                }
                this.imgBox.appendChild(this.aDom);
                this.aDom.appendChild(this.imgDom);                                                                               
            }        
            
            this.boxDom.appendChild(this.imgBox);
            //创建小圆点
            this.ulBox = document.createElement("ul");
            this.ulBox.style.cssText = `
                position: absolute;
                right: 30px;
                bottom: 10px;
                z-Index: 5;
                line-height: ${this.liSize}px;
                font-size: 12px;
                color: white;
                text-align: center;
            `;
            this.boxDom.appendChild(this.ulBox);
            for(let i=0;i<this.imgs.length;i++){
                this.li = document.createElement("li");
                this.ulBox.appendChild(this.li);
                this.li.style.cssText = `
                    width: ${this.liSize}px;
                    height: ${this.liSize}px;
                    background-color: ${this.liColor};
                    float: left;
                    margin-left: 10px;
                    list-style: none;
                `;
                if(i==0){
                    this.li.style.backgroundColor = this.liHignColor;
                }
                if(this.liIsCircle){
                    this.li.style.borderRadius = "50%";
                }
                this.li.innerHTML = i+1;
            }
            
            //创建左右按钮
            this.btnBox = document.createElement("ul");
            this.btnBox.style.cssText = `
                width: 100%;
                height: 100%;
                positon: relative;                                        
            `;
            this.boxDom.appendChild(this.btnBox);
            this.leftBtn = document.createElement("li");
            this.rightBtn = document.createElement("li");
            this.btnBox.appendChild(this.leftBtn);
            this.btnBox.appendChild(this.rightBtn);
            let btns = this.btnBox.children;
            for(let i=0;i<btns.length;i++){        
                btns[i].style.cssText = `
                    width: ${this.btnWidth}px;
                    height: ${this.btnHeight}px;
                    background-color: ${this.btnColor};
                    position: absolute;
                    list-style: none;
                    top: 150px;
                    opacity: ${this.btnOpacity};
                    z-Index: 5;
                    text-align: center;
                    cursor:pointer;
                    font-size: 30px;
                    line-height: ${this.btnHeight}px;
                    color: white;
                `;                    
            } 
            this.leftBtn.style.left = 0;
            this.rightBtn.style.right = 0;
            this.leftBtn.innerHTML = "&lt;";
            this.rightBtn.innerHTML = "&gt;";
        }
        autoPlay(){
            /*改变数据，判断边界，改变外观*/                
            this.mytimer = setInterval(()=>{
                let lastIndex = this.index;
                this.index++;
                if(this.index>this.imgs.length-1){
                    this.index = 0;
                }
                let aDoms = this.imgBox.children;
                fadeInOut(aDoms[this.index],aDoms[lastIndex],this.timeSpace/3);
                aDoms[this.index].style.zIndex = 2;
                aDoms[lastIndex].style.zIndex = 1;
                let lis = this.ulBox.children;
                lis[this.index].style.backgroundColor = this.liHignColor;
                lis[this.index].style.boxShadow = "0px 0px 5px #b5b3b3";
                lis[lastIndex].style.backgroundColor = this.liColor;   
                lis[lastIndex].style.boxShadow = "none";         
            },this.timeSpace)

        }
        stopPlay(){
            window.clearInterval(this.mytimer);
        }
        jumpImg(tranIndex){
            let lastIndex = this.index;
            this.index = tranIndex;

            let lis = this.ulBox.children;
            lis[this.index].style.backgroundColor = this.liHignColor;
            lis[lastIndex].style.backgroundColor = this.liColor;
            let imgDoms = this.imgBox.children;
            fadeInOut(imgDoms[this.index],imgDoms[lastIndex],this.timeSpace/3);
            lis[lastIndex].style.boxShadow = "none";
            lis[this.index].style.boxShadow = "2px 2px 3px #b5b3b3";
        }
        rightbtnJump(transIndex){
            
            let lastIndex = this.index;
            this.index = this.index+1;
            
            let lis = this.ulBox.children;
            if(this.index>lis.length-1){
                this.index = 0;
            }
            lis[this.index].style.backgroundColor = this.liHignColor;
            lis[lastIndex].style.backgroundColor = this.liColor;
            let aDoms = this.imgBox.children;
            fadeInOut(aDoms[this.index],aDoms[lastIndex],this.timeSpace/3);  
            lis[lastIndex].style.boxShadow = "none";
            lis[this.index].style.boxShadow = "2px 2px 3px #b5b3b3";             
        }
        leftbtnJump(transIndex){
            
            let lastIndex = this.index;
            this.index = this.index-1;
            
            let lis = this.ulBox.children;
            if(this.index<0){
                this.index = lis.length-1;
            }
            lis[this.index].style.backgroundColor = this.liHignColor;
            lis[lastIndex].style.backgroundColor = this.liColor;
            let aDoms = this.imgBox.children;
            fadeInOut(aDoms[this.index],aDoms[lastIndex],this.timeSpace/3); 
            lis[lastIndex].style.boxShadow = "none";
            lis[this.index].style.boxShadow = "2px 2px 3px #b5b3b3";              
        }
        addEvent(){
            this.boxDom.onmouseover = ()=>{
                //由于this已经转移，所以需要用箭头函数
                this.stopPlay();
            }
            this.boxDom.onmouseout = ()=>{
                //由于this已经转移，所以需要用箭头函数
                this.autoPlay();
            }
            let lis = this.ulBox.children;
            for(let i=0;i<lis.length;i++){
                lis[i].onclick = ()=>{                    
                    this.jumpImg(i);
                }
            }
            let btns = this.btnBox.children;
            for(let i=0;i<btns.length;i++){
                btns[i].onclick = ()=>{ 
                    if(i==1){
                        this.rightbtnJump(i);
                    }else{
                        this.leftbtnJump(i);
                    }                                                                 
                }
            }                
        }
        
    }
    let banner02 = new Banner($(".bannerBox")[0],{});
    banner02.render();
    banner02.autoPlay();
    banner02.addEvent();        





