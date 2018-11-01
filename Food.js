/*
** Create by apple on 2018/8/29
*/
//所有关于食物的代码
(function(w){
    //声明变量，存储现在的食物
    var eles = [];

    //食物属性构造函数
    function Food(width,height,bgColor,x,y){
        this.width = width || 20;
        this.height = height || 20;
        this.bgColor = bgColor || "green";
        this.x = x;
        this.y = y;
    }

    //显示食物到游戏背景上
    Food.prototype.render = function(map){
        //每次显示新食物之前，都移除之前的食物
        foodRemove(map);

        //获取食物的随机位置
        var x = Math.floor(Math.random()*map.offsetWidth/this.width)*this.width;
        var y = Math.floor(Math.random()*map.offsetHeight/this.height)*this.height;
        this.x = x;
        this.y = y;
        //创建并显示食物div
        var fd = document.createElement("div");
        fd.style.position = "absolute";
        fd.style.width = this.width + "px";
        fd.style.height = this.height + "px";
        fd.style.backgroundColor = this.bgColor;
        fd.style.top = this.y + "px";
        fd.style.left = this.x + "px";
        map.appendChild(fd);
        eles.push(fd);
    }

    //私有方法：移除食物
    function foodRemove(map){
        for(var i=0; i<eles.length; i++){
            map.removeChild(eles[i]);
        }
        eles.length = 0;
    }

    w.Food = Food;
}(window))
