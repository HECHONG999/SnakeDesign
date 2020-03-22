// 创建管理者
 function SquareFactory() {

 }


 // 包装创建每个小方块的公共方法
 SquareFactory.prototype.init= function (square, color,action) {  // 要创建的方块类型  方块的颜色
        // 获取公共变量
        square.viewContent.style.positoin = 'absolute';
        square.viewContent.style.left = square.x *squareWidth + 'px';
        square.viewContent.style.top = square.y * squareWidth + 'px';
        square.viewContent.style.width = square.width + 'px';
        square.viewContent.style.height = square.height + 'px';
        square.viewContent.style.backgroundColor = color;
        //每一条生产线生产方块的时候都会执行这个方法。所以标签就要放到这个方法里去打。
        //我给每一个实例对象身上添加了一个collide方法，这个collide方法返回了一个信息，这个信息就是方块的标签
        square.collide = (function (action) {
            return function () {
                return action;
            }
        })(action)
 }


 SquareFactory.prototype.Floor = function (x, y, color) {   // x y 地板对应的坐标
     // new Floor 是由jsUtil.js文件通过 需要实例对象的特性 判断是否用单例模式还是
     // 直接继承创建方块的函数
    var floor = new Floor(x, y, squareWidth, squareWidth);
     this.init(floor, color);
     return floor;
 }

 SquareFactory.prototype.Wall = function (x, y, color) {
     var wall = new Wall(x, y, squareWidth, squareWidth);
     // 参数一:创建方块的类型 参数二:方块的颜色 参数三: 用于检索碰撞
     this.init(wall, color, squareTag.die);
     return wall;
 }

 SquareFactory.prototype.SnakeHead = function (x, y, color) {
     var head = new SnakeHead(x, y, squareWidth, squareWidth);
     this.init(head, color, squareTag.die);
     return head;
 }

 SquareFactory.prototype.SnakeBody = function (x, y, color) {
     var body = new SnakeBody(x, y, squareWidth, squareWidth);
     this.init(body, color, squareTag.die);
     return body;
 }

 SquareFactory.prototype.Food = function (x, y, color) {
    var food = new Food(x, y, squareWidth, squareWidth);
    this.init(food, color, squareTag.die);
    return food;
}

 SquareFactory.create = function (type, x, y, color) {
     // 判断一下 SquareFactory 的生产线上有没有type的类型
     if( typeof this.prototype[type] == 'undefined') {
            throw 'no is type 傻x'
     }

     // SquareFactory 原型上必须线去定义 产生这个方法的函数
     this.prototype[type].prototype = new SquareFactory();

     return SquareFactory.prototype[type](x, y, color)
 }