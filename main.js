let drag_row;//dragしたballの位置を格納するもの
let drag_col;
let drop_row;//drop先のsquareの位置を格納するもの
let drop_col;
let drag_ball;//dragしたballのdivタグを格納するもの
let delete_square;//飛び越されてたsquareのdivタグを格納するもの
let delete_ball;//飛び越されたsquareの中にあるballのdivタグを格納するもの
let count = 0;//ballをとった数を記録するもの．

// 1. 要素の取得
const balls = document.querySelectorAll(".ball");
const squares = document.querySelectorAll(".square");
//console.log(squares);
//console.log(balls);

for (const ball of balls){
  ball.addEventListener("dragstart", dragStart);//ドラッグしたら，dragStartという関数を呼ぶよ．このようなイベントを，各ボールに付与
  ball.addEventListener("dragend", dragEnd);//左クリックを放したときに，dragEndという関数を呼ぶよ．
}


//一つ一つのsquare要素を取得
for(const square of squares){
  square.addEventListener("dragover", dragOver);//ドラッグしたまま，squareに重なったときに，dragOver関数を呼ぶよ．
  square.addEventListener("dragenter", dragEnter);
  square.addEventListener("dragleave", dragLeave);
  square.addEventListener("drop", dragDrop);
}

function initializeEvent(){

}

function dragStart(e) {//dragしたオブジェクトのdata-rowとdata-colを取得する
  drag_row = e.target.dataset.row;
  drag_col = e.target.dataset.col;
  drag_ball = e.target;

  e.dataTransfer.setData("text", e.target.id);

  // カスタムのドラッグイメージを作成
  const dragImage = document.createElement("div");
  dragImage.textContent = "●";
  dragImage.style.fontSize = "3rem";
  dragImage.style.color = "white";
  dragImage.style.position = "absolute";
  dragImage.style.top = "-9999px"; // 画面外に配置（見えなくする）

  document.body.appendChild(dragImage);
  e.dataTransfer.setDragImage(dragImage, 0, 0);


  
  // 一時的に非表示
  setTimeout(() => {
    this.classList.add("invisible");
  }, 0);

  setTimeout(() => {
    document.body.removeChild(dragImage); // 余計な要素を削除
  }, 100);
}

function dragEnd(e){
  console.log(count);
  //console.log(e);
  //console.log(e.target)//e.targetとthisは同じものを指しているっぽい．
  //console.log(this);
  this.className = "ball"//dragしたdivタグのクラスを，ballに変更
  if (count>=20){

  }
}

function getTargetSquare(row,col){
  return $("div[data-row = "+row+"][data-col="+col+"]");
}

function dragOver(e){
  //console.log("over");
  e.preventDefault();//これがないと，ドロップがうまくいかないらしい．
  
  //e.dataTransfer.dropEffect = "move";
}

function dragEnter(){
  //console.log("enter");
}

function dragLeave(){
  //console.log("leave");
}



function dragDrop(e){
  //console.log("drop");
  //console.log(e.target)//e.targetとthisは同じものを指しているっぽい．
  //console.log(this);
  //console.log("drop_row");
  drop_row = e.target.dataset.row;
  //console.log(drop_row);
  //console.log("drop_col");
  drop_col = e.target.dataset.col;
  //console.log(drop_col);
  if (drag_row == drop_row){//deleteされるボールを用意しておく
    //console.log("dog");
    delete_ball = document.querySelector(`div[class="ball"][data-row="${drop_row}"][data-col="${(Number(drop_col)+Number(drag_col))/2}"]`);
  }else{
    //console.log("cat");
    delete_ball = document.querySelector(`div[class="ball"][data-row="${(Number(drop_row)+Number(drag_row))/2}"][data-col="${drop_col}"]`);
  }
  //console.log(delete_ball);

  if ((delete_ball !== null) && (e.target.textContent != "●") && ((drag_row == drop_row) || (drag_col == drop_col)) && ((Math.abs(drag_row-drop_row) == 2) || (Math.abs(drag_col-drop_col)==2)) ){//ballのdrop先の条件チェック
    
    console.log("drop");
    e.preventDefault();//呪文
    const data = e.dataTransfer.getData("text");//ドラッグしたdivタグのidを，text形式で読み込め
    //console.log(document.getElementById(data));
    e.target.appendChild(document.getElementById(data));//ドラッグしたdivタグのidから，ドラッグしたdivタグの要素を取得し，ドロップ先にアペンドする．
    //console.log(drag_ball);
    drag_ball.dataset.row = drop_row;//dropしたボールのdata-row,data-colを，ドロップ先のsquareのdata-row,data-colに変更
    drag_ball.dataset.col = drop_col;
    //console.log(drag_ball);
    delete_ball.remove();
    count +=1;
  }
}


//ドラッグ中のいらない背景を消す．
//リセットをつける
//終了判定を効率よくする方法が見つからない．(全て数え上げるしかないのか？)