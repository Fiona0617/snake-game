//所有关于食物的代码
;(function(w){
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
}(window));


//所有蛇相关的代码
;(function(w){
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
}(window));


//游戏控制器代码
;(function (w) {
    //声明变量，存储该this
    var that = null;

    //游戏控制器构造函数
    function Game(map){
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }

    //自动开始游戏
    Game.prototype.start = function(){
        this.food.render(this.map);
        this.snake.render(this.map);
        snakeAutoMove(); 
        bindKey();
    }

    //私有方法：让蛇自动移动
    function snakeAutoMove(){
        var timeID = setInterval(function(){
            this.snake.snakeMove(this.food,this.map);
            //每次移动都可能会出界，所以写在移动的函数后
            //获取蛇头当前位置，检测是否到达边界
            var headX = this.snake.body[0].x*this.snake.unitWidth;
            var headY = this.snake.body[0].y*this.snake.unitHeight;
            if(headX<0 || headY<0 || headX>=this.map.offsetWidth || headY>=this.map.offsetHeight){
                alert("Game Over!");
                clearInterval(timeID);
            }
            this.snake.render(this.map);
        }.bind(that), 500);
    }

    //私有方法：让蛇根据键盘的方向移动
    function bindKey(){
        window.onkeydown = function(e){
            e = e || window.event;
            switch(e.keyCode){
                case 37:
                    if(this.snake.derection!="right"){
                        this.snake.derection = "left";
                    }
                    break;
                case 38:
                    if(this.snake.derection!="buttom"){
                        this.snake.derection = "top";
                    }
                    break;
                case 39:
                    if(this.snake.derection!="left"){
                        this.snake.derection = "right";
                    }
                    break;
                case 40:
                    if(this.snake.derection!="top"){
                        this.snake.derection = "buttom";
                    }
                    break;
            } 
        }.bind(that);
    }

    //暴露游戏控制器到全局中
    w.Game = Game;

}(window));