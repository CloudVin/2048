$(function() {
    newGame();
    newUser();
});

function newGame() {
    //初始化棋盘格和数字格
    init();

    $("#gameover").remove();
    //生成两个随机数字
    generateOneNumber();
    generateOneNumber();
    score = 0; //初始化化将分数设置为0
    showUserDate(); //游戏初始化时获取排行榜是否有本地数据
    $("#score").text(score); //将分数重置为0
}
//设置全局变量
var board = []; //棋盘格，用来存放数字，数字格则是将其映射显示出来
var hasConflict = []; //
var score = 0;
var userName;

$("#newGameButton").click(newGame()); //给newgame添加点击事件

function newUser() { //用户名
    userName = prompt("起一个好听的名字吧：");
    if (userName) {
        $("#newUser").text(userName + ",挑战你的极限吧！");
    } else {
        $("#newUser").text("无名大侠,挑战你的极限吧！");
    }
    // localStorage.setItem(("userName",userName));
    return
}

function init() {
    for (let i = 0; i < 4; i++) {
        //定义一个二维数组
        board[i] = [];
        hasConflict[i] = [];
        for (let j = 0; j < 4; j++) {
            // 初始化棋盘格子值为零
            board[i][j] = 0;
            // 初始化为false
            hasConflict[i][j] = false;
            //通过双重遍历获取每个格子元素
            let gridCell = $("#grid-cell-" + i + "-" + j + "");
            //通过getPosTop（）获取每个小格子距离顶端的距离
            gridCell.css("top", getPosTop(i, j));
            // 通过getPosLeft（）获取每个小格子距离左边的距离；
            gridCell.css("left", getPosLeft(i, j));
        }
    }
    updateBoardView(); //更新数字格子



}

function updateBoardView() { //通过这个函数将棋盘格子的值在数字格子上显示出来，用户的每一次操作都会伴随棋盘格子的更新，相应地需要调用这个函数来更新数字格子的显示
    $(".number-cell").remove(); //先清除棋盘上的其他数字格子
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            //通过双重遍历给每一个数字格子id标号
            $("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
            let numberCell = $("#number-cell-" + i + "-" + j + ""); //遍历每一个数字格
            if (board[i][j] == 0) { //如果棋盘格的值为0的话,设置数字格为高宽都为0，不显示出来
                numberCell.css("width", 0);
                numberCell.css("height", 0);
                numberCell.css("top", getPosTop(i, j) + 50);
                numberCell.css("left", getPosLeft(i, j) + 50);
            } else { //如果棋盘格的值不为0的话,设置数字格为高宽为75并设置背景色和前景色及数字值，
                numberCell.css("width", 100);
                numberCell.css("height", 100);
                numberCell.css("top", getPosTop(i, j));
                numberCell.css("left", getPosLeft(i, j));
                numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                numberCell.css("color", getNumberColor(board[i][j]));
                numberCell.text(board[i][j]); //把棋盘格的数字赋值给数字显示
            }
            hasConflict[i][j] = false; //在每次碰撞完成后再次设置为false
        }
    }
}

function generateOneNumber() {
    // 1.生成一个随机的位置
    var randX = parseInt(Math.floor(Math.random() * 4));
    var randY = parseInt(Math.floor(Math.random() * 4)); //因为生成的随机数是浮点数，所以需要取整
    var times = 0;
    while (times < 50) { //优化随机生成数字，死循环太耗时间
        if (board[randX][randY] === 0) { //判断位置是否为空位置，值为零，就代表空位置，可以产生新数字，如果不是就重新生成位置。
            break;
        }
        var randX = parseInt(Math.floor(Math.random() * 4));
        var randY = parseInt(Math.floor(Math.random() * 4));
        times++;
    }
    // 2.生成一个随机的数字（2048游戏规则随机生成数字只能是2和4）
    if (times === 50) { //如果循环了50次没有找到空位，就人为的生成
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    randX = i;
                    randY = j;
                }
            }
        }
    }
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    // 3.在随机位置显示随机数字
    board[randX][randY] = randNumber; //将随机数字赋值棋盘格子
    showNumberWithAnimate(randX, randY, randNumber);
}
// 更新分数
function updateScore(score) {
    return $("#score").text(score);
}