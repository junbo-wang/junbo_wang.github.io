let rows = 10;//行数
let cols = 10;//列数

/* 随机数生成
// count-传出的数组长度-num
// (minNum,maxNum]-数组中数字范围-num
// return-Arr 绝对位置-arr
*/
function random(count=rows*cols/10,minNum=0,maxNum=rows*cols) {
    let arr=[];
    let flag=true;
    while (flag===true){
        if (arr.length < count){
            let random=Math.ceil(Math.random() * (maxNum-minNum))+minNum;
            if (arr.indexOf(random) === -1) {arr.push(random)}
        } else {
            flag=false;
        }
    }
    return arr;
}

/* 绝对位置-坐标定位(x,y)
* 行数列数从(1,1)~(rows,cols)开始
* arr-传入数组,绝对位置-arr
* return-Arr 坐标位置-arr.arr*/
function randToArr(arrArr) {
    let xpos,ypos,tempArr=[],outPutArr=[];
    for (let item in arrArr){
        if (arrArr[item]%rows==0){
            xpos=rows;
        }
        else {
            xpos=arrArr[item]%rows;
        }
        if (Math.ceil(arrArr[item]/rows)==0){
            ypos=cols;
        }
        else {
            ypos=Math.ceil(arrArr[item]/rows);
        }
        tempArr=[ypos,xpos];
        outPutArr.push(tempArr)
    }
    return outPutArr;
}

/* 设置炸弹
* element-父级节点
* arrArr-坐标位置-arr.arr
* return-空*/
function setBomb(element,arrArr) {
    for (let i in arrArr){
        let xpos= arrArr[i][0]-1;
        let ypos= arrArr[i][1]-1;
        element.children[ypos].children[xpos].style.backgroundColor="white"
    }
}

/* 检测是否有炸弹
* element-父级元素节点
* xpos-横坐标-num-1开始
* ypos-纵坐标-num-1开始
* return-是否有炸弹-1、0*/
function testBomb(element, xpos, ypos) {
    let checked=element.children[ypos-1].children[xpos-1].style.backgroundColor;
    return checked == "white"?1:0;
}

/* 游戏点击函数
* element-父级元素节点
* xpos-横坐标-num-1开始
* ypos-纵坐标-num-1开始
* return-炸弹个数-num*/
function click(element, xpos, ypos) {
    if (testBomb(element,xpos,ypos)===1){
        element.children[ypos-1].children[xpos-1].style.border="2px solid black";
        alert("You died");
        location.reload();
        return "*";
    }
    else{
        let flag=0;
        if (xpos==1&&ypos==1&&xpos!=cols&&ypos!=rows){
            // 左上(xpos+1,ypos)(xpos,ypos+1)(xpos+1,ypos+1)
            flag=testBomb(element,xpos+1,ypos)
                +testBomb(element,xpos,ypos+1)
                +testBomb(element,xpos+1,ypos+1);
        }
        if (xpos==1&&ypos!=1&&xpos!=cols&&ypos==rows){
            // 左下(xpos+1,ypos)(xpos,ypos-1)(xpos+1,ypos-1)
            flag=testBomb(element,xpos+1,ypos)
                +testBomb(element,xpos,ypos-1)
                +testBomb(element,xpos+1,ypos-1);
        }
        if (xpos!=1&&ypos==1&&xpos==cols&&ypos!=rows){
            // 右上(xpos-1,ypos)(xpos,ypos-1)(xpos-1,ypos+1)
            flag=testBomb(element,xpos-1,ypos)
                +testBomb(element,xpos,ypos+1)
                +testBomb(element,xpos-1,ypos+1);
        }
        if (xpos!=1&&ypos!=1&&xpos==cols&&ypos==rows){
            // 右下(xpos-1,ypos)(xpos,ypos-1)(xpos-1,ypos-1)
            flag=testBomb(element,xpos-1,ypos)
                +testBomb(element,xpos,ypos-1)
                +testBomb(element,xpos-1,ypos-1);
        }
        if (xpos==1&&ypos!=1&&xpos!=cols&&ypos!=rows){
            // 左
            flag=+testBomb(element,xpos,ypos-1)
                +testBomb(element,xpos,ypos+1)
                +testBomb(element,xpos+1,ypos-1)
                +testBomb(element,xpos+1,ypos)
                +testBomb(element,xpos+1,ypos+1);
        }
        if (xpos!=1&&ypos!=1&&xpos==cols&&ypos!=rows){
            // 右
            flag=testBomb(element,xpos-1,ypos-1)
                +testBomb(element,xpos-1,ypos)
                +testBomb(element,xpos-1,ypos+1)
                +testBomb(element,xpos,ypos-1)
                +testBomb(element,xpos,ypos+1);
        }
        if (xpos!=1&&ypos==1&&xpos!=cols&&ypos!=rows){
            // 上
            flag=testBomb(element,xpos-1,ypos)
                +testBomb(element,xpos-1,ypos+1)
                +testBomb(element,xpos,ypos+1)
                +testBomb(element,xpos+1,ypos)
                +testBomb(element,xpos+1,ypos+1);
        }
        if (xpos!=1&&ypos!=1&&xpos!=cols&&ypos==rows){
            // 下
            flag=testBomb(element,xpos-1,ypos-1)
                +testBomb(element,xpos-1,ypos)
                +testBomb(element,xpos,ypos-1)
                +testBomb(element,xpos+1,ypos-1)
                +testBomb(element,xpos+1,ypos)
        }
        if (xpos!=1&&ypos!=1&&xpos!=cols&&ypos!=rows){
            // 中间
            flag=testBomb(element,xpos-1,ypos-1)
                +testBomb(element,xpos-1,ypos)
                +testBomb(element,xpos-1,ypos+1)
                +testBomb(element,xpos,ypos-1)
                +testBomb(element,xpos,ypos+1)
                +testBomb(element,xpos+1,ypos-1)
                +testBomb(element,xpos+1,ypos)
                +testBomb(element,xpos+1,ypos+1);
        }
        return flag;
    }
}

/* 位置函数
* **element**-直接触发点击事件的节点
* choice-1 return 横坐标-1开始
* choice-2 return 纵坐标-1开始*/
function position(element, choice) {
    if (choice === 1){
        let temp_x=element;
        let x=1;
        while (!!temp_x.previousElementSibling){
            temp_x=temp_x.previousElementSibling;
            x++;
        }
        return x;//横坐标
    }
    else if (choice === 2){
        let temp_y=element.parentElement;
        let y=1;
        while (!!temp_y.previousElementSibling){
            temp_y=temp_y.previousElementSibling;
            y++;
        }
        return y;//横坐标
    }
    else {
        alert("wrong position function!!!");
    }
}















