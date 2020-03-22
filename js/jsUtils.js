var tool  = {
    // 继承原型属性和方法
    inherit: function (target, origin) {  // 目标函数 源对象
        if(!(target || origin)) {
            throw 'inherit 需要传入两个参数'
        }
        var F = function () { };
        F.prototype = origin.prototype;
        target.prototype = new F();
        target.constructor = target;
    },
    extends: function (origin) {
        var target = function () {
            origin && origin.apply(this, arguments);
            return this;
        }
        origin && this.inherit(target, origin)
        return target;
    },
    // 单例模式
    single: function (origin) {
        var singleResult = (function () {
            var instance;
            // console.log(this, '111')
            return function () {
                if( typeof instance == 'object') {
                    return instance
                }
                origin && origin.apply(this, arguments);
                instance = this
            }
        })();
        // 让singleResult继承origin的原型
        origin && this.inherit(singleResult, origin);
        return singleResult;
    }
}




// function Square(x,y,width,height){
// 	this.x=x;
// 	this.y=y;
// 	this.width=width;
//     this.height=height;
//     this.hc  = function () {
//         confirm('实现了继承')
//     }
// }


// // Square.prototype.init = function () {
// //     alert('bang ')
// // }
// var sq = tool.extends(Square)

// var sq1 = tool.single(Square)

