/*
** Create by apple on 2018/8/29
*/
//所有蛇相关的代码
(function(w){
    //声明变量，存放已有蛇
    var eles = [];

    //蛇属性的构造函数
    function Snake(unitWidth,unitHeight,bgColor,x,y,derection){//把蛇拆分成蛇节考虑
        this.unitWidth = unitWidth || 20;
        this.unitHeight = unitHeight || 20;
        this.derection = derection || "right";
        this.body = [
            {x:3,y:1,bgColor:"red"},
            {x:2,y:1,bgColor:"blue"},
            {x:1,y:1,bgColor:"pink"}
        ]
    }

    //让蛇显示在游戏背景上
    Snake.prototype.render = function(map){
        //每次显示新蛇之前，都清除之前的蛇
        snakeRemove(map);

        for(var i = 0;i<this.body.length;i++){
            var unitSnake = document.createElement("div");
            unitSnake.style.position = "absolute";
            unitSnake.style.width = this.unitWidth + "px";
            unitSnake.style.height = this.unitHeight + "px";
            unitSnake.style.backgroundColor = this.body[i].bgColor;
            unitSnake.style.left = this.body[i].x*this.unitWidth + "px";
            unitSnake.style.top = this.body[i].y*this.unitHeight + "px";
            map.appendChild(unitSnake);

            eles.push(unitSnake);
        }
    }

    //蛇移动方法
    Snake.prototype.snakeMove = function(food,map){

        //移动除蛇头外的蛇节，前一个蛇节的位置赋值给后一个蛇节
        var i = this.body.length-1;
        for (i; i>0; i--) {
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        //蛇头根据方向移动
        switch(this.derection){
            case "right":
                this.body[0].x++;
                break;
            case "left":
                this.body[0].x--;
                break;
            case "top":
                this.body[0].y--;
                break;
            case "buttom":
                this.body[0].y++;
                break;
        }

        //判断蛇是否吃了食物
        var headX = this.body[0].x*this.unitWidth;
        var headY = this.body[0].y*this.unitHeight;
        var foodX = food.x;
        var foodY = food.y;
        if(headX==foodX && headY==foodY){//蛇吃了食物，蛇长身体
            var obj = this.body[this.body.length-1];//获取蛇的最后一节
            this.body.push({
                x:obj.x,
                y:obj.y,
                bgColor:"yellow"
            });
            food.render(map);
        }
    }

    //私有方法：移除蛇
    function snakeRemove(map) {
        //遍历存放蛇的数组，找到每个蛇节，移除
        for(var i=0; i<eles.length; i++){
            map.removeChild(eles[i]);
        }
        //清空数组
        eles.length = 0;
    }

    //把蛇暴露到全局中
    w.Snake = Snake;
}(window))