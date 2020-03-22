var ground = new Ground(positionX, positionY, td * squareWidth, tr * squareWidth);
console.log(ground)

ground.initGround = function () {
    console.log(this)
        this.viewContent.style.position = 'absolute';
        this.viewContent.style.left = this.x + 'px';
        this.viewContent.style.top = this.y + 'px';
        this.viewContent.style.width = this.width + 'px';
        this.viewContent.style.height = this.height + 'px';
        this.viewContent.style.backgroundColor='#0ff';

        document.body.appendChild(this.viewContent);

        this.SquareTable = []
        for(var y = 0; y < tr; y ++) {
            this.SquareTable[y] = new Array(td);  // 每一行的length都为30
            for(var x = 0; x < td; x ++) {
                if( x == 0 || x == td - 1 || y == 0 || y == tr - 1) {
                    var newSquare = SquareFactory.create('Wall', x, y,' black');
                }else{
                    var newSquare = SquareFactory.create('Floor', x, y, 'gray');
                }
                this.viewContent.appendChild(newSquare.viewContent);    //把方块添加到游戏的场景当中
                this.SquareTable[y][x] = newSquare;   //把每一个小方块都放到数组里，存起来。这里一定要注意，y在前面，x在后面。取的时候也是一样的    
            }
        }
    }

    ground.remove = function (x, y) {
        // 在存放小方块的数组中找到要删除的方块
       var curSquare = this.SquareTable[y][x];
       // 从地图中将其移除(视觉上移除)
       this.viewContent.removeChild(curSquare.viewContent);
       // 在数组中也删除这个方块
       this.SquareTable[y][x] = null;
    }

    ground.append = function (square) {
        // 从地图中添加当前方块
        this.viewContent.appendChild(square.viewContent);
        // 在数组中添加当前位置的方块
        this.SquareTable[square.y][square.x] = square;
    }

ground.initGround()