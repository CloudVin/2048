// 获取格子距离父元素顶部的值
function getPosTop(i, j) {
    let top = 120 * i + 20;
    return top;
}
// 获取格子距离父元素左边的的值
function getPosLeft(i, j) {
    let left = 120 * j + 20;
    return left;
}
// 根据数字改变对应的背景颜色
function getNumberBackgroundColor(randNumber) {
    switch (randNumber) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 8192:
            return "#93c";
            break;
    }
}
// 改变数字颜色
function getNumberColor(randnumber) {
    if (randnumber <= 4) {
        return "#776e65"
    }
    return "white";
}

function noBlockHorizontal(row1, col1, col2, board) { //判断水平两个格子之间是否有空格
    for (var i = col1 + 1; i < col2; i++) { //col1当前列前面或后面的列，col+1表示当前列与，col2为当前列。
        if (board[row1][i] !== 0) {
            return false;
        }
    }
    return true;
}

function noBlockVertical(row1, row2, col1, board) {
    for (var i = row1 + 1; i < row2; i++) { //row1为目标位置，row2为当前位置
        if (board[i][col1] !== 0) {
            return false;
        }
    }
    return true;
}
// 判断能否左移
function canMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] !== 0) {
                if (board[i][j] === board[i][j - 1] || board[i][j - 1] === 0) {
                    return true;
                }
            }

        }
    }
    return false;
}

function canMoveUp(board) {
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                if (board[i][j] === board[i - 1][j] || board[i - 1][j] === 0) {
                    return true;
                }
            }

        }
    }
    return false;
}

function canMoveRight(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] !== 0) {
                if (board[i][j] === board[i][j + 1] || board[i][j + 1] === 0) {
                    return true;
                }
            }

        }
    }
    return false;
}

function canMoveDown(board) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                if (board[i][j] === board[i + 1][j] || board[i + 1][j] === 0) {
                    return true;
                }
            }

        }
    }
    return false;
}
// 判断格子是否为空
function nospace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

function nomove(board) {
    if (canMoveUp(board) || canMoveDown(board) || canMoveRight(board) || canMoveLeft(board)) {
        return false;

    }
    return true;
}


function nowDate() {
    var myDate = new Date();
    var year = myDate.getFullYear(); //获取当前年
    var month = myDate.getMonth() + 1; //获取当前月
    var date = myDate.getDate(); //获取当前日
    var nowdate = year + "/" + month + "/" + date;
    return nowdate;
}

function nowTime() {
    var myTime = new Date();
    var h = myTime.getHours(); //获取当前小时数(0-23)
    var m = myTime.getMinutes();
    var nowtime = h + ":" + m;
    return nowtime;
}

function UserData(uName, score, time, date) {
    this.name = uName;
    this.score = score;
    this.time = time;
    this.date = date;

}




function compare(property) { //比较函数
    return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1; //降序
    }
}

function rankingSort(array) {

    var temp = array.sort(compare('score')) //进行排序
    localStorage.setItem("userGameScore", JSON.stringify(temp)); //存入localStorage
}

function showUserDate() { //更新排行榜数据
    var userScore = JSON.parse(localStorage.getItem("userGameScore"));
    // console.log('userScore', userScore);
    if (userScore) {
        $("#ranking li").remove(); //先清除之前的，排他操作。
        for (var i = 0; i < userScore.length; i++) {
            $("#ranking").append("<li class='rankingli'><p>" + userScore[i].name + "</p><span>" + userScore[i].score + "</span><i><div>" + userScore[i].time + "</div><div>" + userScore[i].date + "</div></i>");
        }
    } else {
        return false;
    }

}