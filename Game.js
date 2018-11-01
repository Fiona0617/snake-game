/*
** Create by apple on 2018/8/29
 */
//游戏控制器代码
(function (w) {
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

}(window))