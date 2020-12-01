function showNumberWithAnimate(i, j, randNumber) {
    let numberCell = $("#number-cell-" + i + "-" + j + ""); //获取随机数字格子
    numberCell.css("background-color", getNumberBackgroundColor(randNumber)); //设置背景颜色
    numberCell.css("color", getNumberColor(randNumber)); //设置数字颜色
    numberCell.text(randNumber); //设置数字
    // 设置当前格子的显示动画
    numberCell.animate({
        width: "100px",
        height: "100px",
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 200);
}

function showMoveAnimate(fromX, fromY, tox, toy) {
    var numberCell = $("#number-cell-" + fromX + "-" + fromY); //bug：!!!!!!number-cell-少写了-，
    // numberCell.css("width",105);
    // numberCell.css("width",105);
    numberCell.animate({
        top: getPosTop(tox, toy), //当向上或者向下移动时，这个top会变化，左右移动时没有变化
        left: getPosLeft(tox, toy) //同理，当向左或者向右移动时，这个值会发生变化,上下移动时没有变化。
    }, 200);

}
// var numberCell = $("#number-cell-" + fromX + "-" + fromY);
// numberCell.animate({
//     top: getPosTop(tox, toy),
//     left: getPosLeft(tox, toy)
// }, 200);
// }