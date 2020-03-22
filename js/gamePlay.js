/* 
	这个文件里放的是整个游戏逻辑的处理
 */
var game = new Game()
console.log(game)
game.timer = null;
game.boolean = true;

game.init = function () {
    ground.initGround();
    snake.init1()
    createFood()

    document.onkeydown = function (e) {
        console.log(e.which)
        if(e.which == 37 && snake.direction != directionNum.right) {
            snake.direction = directionNum.left
        }else if(e.which == 38 && snake.direction != directionNum.down) {
            snake.direction = directionNum.top;
        }else if(e.which == 39 && snake.direction != directionNum.left) {
            snake.direction  = directionNum.right
        }else if(e.which == 40 && snake.direction != directionNum.top){
            console.log(directionNum.down)
            snake.direction = directionNum.down;
        }

    }

    var oBtn = document.getElementById('btn');
    oBtn.onclick = function (e) {
        game.star()
    }


}

game.star = function () {
    game.timer = setInterval( function () {
        snake.getCollideSquare()
    },intervalTime)
  
}

 function createFood() {
    
    // 食物出现的坐标
    var x = null;
    var y = null;

    // 寻找能够插入食物的正确位置
    var flag = true;   // 一但找到目标可插入的坐标就变为false 跳出循环
    while(flag) {

        x = Math.floor( Math.random() * (tr - 1) + 1);
        y = Math.floor( Math.random() * (td -1 ) + 1);
        var ok = true;  // 控制for循环跳出的条件
        for( var node = snake.head; node; node = node.next) {
            if(x == node.x && y == node.y) {
                ok = false;
                break;
            }
        }
        if(ok) { //如果ok为true，表示上面的for循环已经走完了，但是里面在条件都不满足。那就说明现在坐标不在蛇身上。这个条件成立了，也就说明 现在不能创建的情况都已经找完了。while循环就可以跳出去了
            flag = false
        }
    }

    var food = SquareFactory.create('Food', x, y, 'yellow');
    ground.remove(x,y);
    ground.append(food);
}

game.init()