/*
  定义文件需要的全局东西
  1、创建一些变量
  2、创建生产一个方块的构造函数
  3、根据生产方块的构造函数，创建各个元素(蛇头 蛇身)
*/

// 游戏区域的大小
var td = 30;  // 宽度，列数(每一列放30个元素)
var tr = 30; // 高度，行数(每一行房30个元素)

// 每个方块的大小
var squareWidth = 20;  // 每一个方块的宽高

// 游戏区域开始坐标
var positionX = 100;
var positionY = 100;

// 蛇的移动时间
var intervalTime = 300;

// 创建一个方块的构造函数
function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
    this.viewContent.style.position = 'absolute'
}



// 根据方块的构造函数, 生成相应的实例对象(蛇头 、蛇身、游戏场景 ) 所有的元素都是一个实例对象,同时也是一个构造函数
var Ground = tool.single(Square);  // 整个游戏场景， 所有的对象都要放到里面
var Floor = tool.extends(Square); // 场景里的地板
var Wall = tool.extends(Square); //围墙

var SnakeBody = tool.extends(Square);
var SnakeHead = tool.extends(Square);

var Snake = tool.single()   // 蛇的构造函数是一个单例

var Food = tool.single(Square)  // 创建食物方块

var Game = tool.single(Square)
// 方块的类型(标签) 在生产的时候、以及在与蛇头碰撞的时候、根据类型做事
var squareTag = {
  move: 'move',
  eat: 'eat',
  die: 'die'
}