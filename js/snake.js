var snake = new Snake()

// 规定蛇头 蛇尾
snake.head = null;
snake.tail = null;

// 处理蛇的走向
var directionNum = {
    left: {
        x: -1,
        y: 0
    },
    top: {
        x: 0,
        y: -1
    },
    right: {
        x: 1,
        y: 0
    },
    down: {
        x: 0,
        y: 1
    }
}

snake.init1 = function () {
    //  创建蛇身 蛇头 蛇尾
    var snakeHead = SquareFactory.create('SnakeHead', 4, 2, 'red');
    var snakeBody1 = SquareFactory.create('SnakeBody', 3, 2, 'green');
    var snakeBody2 = SquareFactory.create('SnakeBody', 2, 2,'green');

    // 更新蛇头与蛇身位置
    this.head = snakeHead;
    this.tail = snakeBody2;


    // 蛇 蛇头 蛇身显示在地图山
    ground.remove(snakeHead.x, snakeHead.y);
    ground.append(snakeHead)

    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1)

    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2)


    // 蛇整体形成链表关系

    snakeHead.next = snakeBody1;
    snakeHead.last = null;

    snakeBody1.next = snakeBody2;
    snakeBody1.last = snakeHead;

    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;

    snake.direction  = directionNum.right; // 把位置信息存贮到蛇身上, 让蛇默认向右移动

    
}


// 获取蛇要碰撞的哪个方块
snake.getCollideSquare = function () {
    //通过存放地板的数组来操作方块的移动   蛇头要碰撞的下一个方块 = 蛇头当前的坐标 + 要移动的方向
    console.log(this.direction)
    var square = ground.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x]
    snake.collideMethod['move'](square)
    console.log(square)
}

// 处理碰撞策略
snake.collideMethod = {
    move: function (square, boolean)  {
        //创建一个新身体
        var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'green');

        // 更新链表关系
        newBody.next = snake.head.next;  // newbody左边是body1  body1需要通过蛇头head (body1 = snake.head.next)
        newBody.last = null;
        newBody.next.last = newBody;  // 因为前面 newbody.next 也就是 newbody.next == body1  所以newbody.next.last也就是 body1.last  
      
        ground.remove( snake.head.x, snake.head.y);
        ground.append(newBody)

        

        // 创建新的蛇头 
        // square 是蛇下一下次要移动到的目标方块
        var newHead = SquareFactory.create('SnakeHead', square.x, square.y, 'red');
        
        // 更新蛇头的链表关系
        // 新蛇头的next属性指向newbody
        newHead.next = newBody;
        // 蛇头的last为null
        newHead.last = null;
        // 让第一节蛇身的last指向newHead新创建的蛇头
        newBody.last = newHead;   // 让新身体右边指向新的蛇头

        ground.remove(square.x, square.y);
        ground.append(newHead)
        snake.head = newHead  // 再次更新蛇头方块的坐标



        if(!boolean) {
            console.log('sheng')
            var floorBlock = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'gray');
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(floorBlock)
            snake.tail = snake.tail.last;  // 更新蛇尾方块, 使其指向原来蛇尾右边的方块    
        }
       
    },
    eat: function (square) {
        this.move(square, true);
        createFood()
    },
    die: function () {

    }
}

snake.init1()
snake.getCollideSquare()