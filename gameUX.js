$(document).keydown(function(e) { //监听按键
    handle(e); //事件调用函数
});
var handle = function(e) {
    switch (e.keyCode) {
        case 37: //left
            if (moveLeft()) {
                setTimeout(generateOneNumber, 200);
                setTimeout(isgameOver, 400);
            }
            break;
        case 38: //up
            if (moveUp()) {
                setTimeout(generateOneNumber, 200);
                setTimeout(isgameOver, 400);
            }
            break;
        case 39: //right
            if (moveRight()) {
                setTimeout(generateOneNumber, 200);
                setTimeout(isgameOver, 400);
            }
            break;
        case 40: //down
            if (moveDown()) {
                setTimeout(generateOneNumber, 200);
                setTimeout(isgameOver, 400);
            }
            break;
        default:
            break;
    }

}

function moveLeft() {
    if (!canMoveLeft(board)) { //判断能否左移
        return false;
    }
    //moveLeft
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {

                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimate(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        continue;
                        //用来判断是否合并
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflict[i][k]) {
                        //move
                        showMoveAnimate(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[i][k];
                        updateScore(score);

                        hasConflict[i][k] = true; //如果发生了一次移动就设置为true；则不会连续合并。
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200); //
    return true;
}

function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }
    //moveRight
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //move
                        showMoveAnimate(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflict[i][k]) {
                        //move
                        showMoveAnimate(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[i][k];
                        updateScore(score);

                        hasConflict[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }
    //moveUp
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(k, i, j, board)) {
                        //move
                        showMoveAnimate(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(k, i, j, board) && !hasConflict[k][j]) {
                        //move
                        showMoveAnimate(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[k][j];
                        updateScore(score);

                        hasConflict[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }
    //moveDown
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockVertical(i, k, j, board)) {
                        //move
                        showMoveAnimate(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(i, k, j, board) && !hasConflict[k][j]) {
                        //move
                        showMoveAnimate(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[k][j];
                        updateScore(score);

                        hasConflict[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}



function isgameOver() {
    if (nospace(board) && nomove(board)) {
        $(document).off("keydown");
        gameover();
        $(document).keydown(function(e) {
            handle(e);
        });
    }
}

function gameover() {
    $("#grid-container").append("<div id='gameover' class='gameover'><p>本次得分</p><span>" + score + "</span><a href='javascript:restartGame();' id='restartgamebutton'>重新开始</a></div>");
    var gameover = $("#gameover");
    gameover.css("width", "460px");
    gameover.css("height", "460px");
    gameover.css("background-color", "rgba(255,255,255,.7)");
}



function restartGame() {

    if (localStorage.getItem("userGameScore")) {
        var userDatas = JSON.parse(localStorage.getItem("userGameScore")); //获取本地
    } else {
        var userDatas = [];
    }
    userDatas.push(new UserData(userName, score, nowTime(), nowDate()));
    // console.log('userDatas', userDatas);
    rankingSort(userDatas);
    showUserDate();
    newGame();
}