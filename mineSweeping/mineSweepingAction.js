
/*创建table*/
let table=document.createElement("table");
table.style.backgroundColor="white";

let tableText="";
for (let i=0;i<rows;i++){
    let trText="";
    for (let j=0;j<cols;j++){
        trText += "<td class='cell'></td>"
    }
    tableText+="<tr class='rows'>"+trText+"</tr>"
}
table.innerHTML=tableText;
document.querySelector(".gameBox").appendChild(table);



//随机数生成
let rand=random();
//转换坐标
let arrRand=randToArr(rand);
//设置炸弹
setBomb(table.children[0],arrRand);

//点击事件
let gameBox=document.querySelector(".gameBox");
let tbody=document.querySelector("tbody");
let table_=document.querySelector(".gameBox").children[0];
table_.width=cols*document.querySelector("td").offsetHeight+10;
table_.onclick=function () {
        if (event.target.nodeName.toLowerCase()==="td"){
            let x=position(event.target,1);
            let y=position(event.target,2);
            console.log(x, y);
            event.target.innerText=click(tbody,x,y);//位置？
        }
    };

