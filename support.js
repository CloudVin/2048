var userName;
var temp=[];
temp[0]={score:0};
var userdates=[];

function getPosTop(i,j){
    let top=120*i+20;
    return top;
}
function getPosLeft(i,j){
    let left=120*j+20;
    return left;
}

function getNumberBackgroundColor(randNumber){
    switch (randNumber){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }
}
function getNumberColor(randnumber){
    if (randnumber <= 4) {
        return "#776e65"
    }
    return "white";
}
function noBlockHorizontal(row1,col1,col2,board){//判断水平两个格子之间是否有空格
    for(var i=col1+1;i<col2;i++){//col1当前列前面或后面的列，col+1表示当前列与，col2为当前列。
        if(board[row1][i]!==0){
            return false;
        }
    }
    return true;
}
function noBlockVertical(row1,row2,col1,board){
    for(var i=row1+1;i<row2;i++){//row1为目标位置，row2为当前位置
        if(board[i][col1]!==0){
            return false;
        }
    }
    return true;
}
function canMoveLeft(board){
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(board[i][j]!==0){
                if(board[i][j]===board[i][j-1]||board[i][j-1]===0){
                    return true;
                }
            }

        }
    }
    return false;
}
function canMoveUp(board){
    for(var i=1;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]!==0){
                if(board[i][j]===board[i-1][j]||board[i-1][j]===0){
                    return true;
                }
            }

        }
    }
    return false;
}

function canMoveRight(board){
    for(var i=0;i<4;i++){
        for(var j=0;j<3;j++){
            if(board[i][j]!==0){
                if(board[i][j]===board[i][j+1]||board[i][j+1]===0){
                    return true;
                }
            }

        }
    }
    return false;
}

function canMoveDown(board){
    for(var i=0;i<3;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]!==0){
                if(board[i][j]===board[i+1][j]||board[i+1][j]===0){
                    return true;
                }
            }

        }
    }
    return false;
}

function nospace(board){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]==0){
                return false;
            }
        }
    }
    return true;
}
function nomove(board){
    if(canMoveUp(board)||canMoveDown(board)||canMoveRight(board)||canMoveLeft(board)){
        return false;

    }
    return true;
}


function nowDate(){
    var myDate=new Date();
    var year=myDate.getFullYear();        //获取当前年
    var month=myDate.getMonth()+1;   //获取当前月
    var date=myDate.getDate();            //获取当前日
    var nowdate=year+"/"+month+"/"+date;
    return nowdate;
}
function nowTime(){
    var myTime=new Date();
    var h=myTime.getHours();              //获取当前小时数(0-23)
    var m=myTime.getMinutes();
    var nowtime=h+":"+m;
    return nowtime;
}

function UserDate(uName,score,time,date){
    this.name=uName;
    this.score=score;
    this.time=time;
    this.date=date;
}



function ranking(array){

    for(var i=0;i<array.length;i++){
        if (temp[0].score < array[i].score) {//******bug定位*****：temp[0]这里是一个对象，要比较对象的score的大小，所以应该写成temp[0].score
            temp.unshift(array[i]);
        }
    }
    if(temp[temp.length-1].score===0){//去除第一个只有score的对象
        temp.pop();
    }

    var localDate=temp;

    localStorage.setItem("date",JSON.stringify(localDate));
}

function showUserDate(){//更新排行榜数据
    var newArray=JSON.parse(localStorage.getItem("date"));
    // console.log("---newarr----")
    // console.log(newArray);
    if(newArray){
        $("#ranking li").remove();//先清除之前的，排他操作。
        for(var i=0;i<newArray.length;i++){
            $("#ranking").append("<li class='rankingli'><p>"+newArray[i].name+"</p><span>"+newArray[i].score+"</span><i><div>"+newArray[i].time+"</div><div>"+newArray[i].date+"</div></i>");
        }
    }else {
        return false;
    }

}