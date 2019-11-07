window.onload = function(){
	new Game().loadGame();
	getRandomCode();
}

///////////////////////////////////////////////////
var time = 2;
var newTime = 60;
var countdown = ""

function Game(){
	var stage = document.getElementById("stage"),
		memeda = document.getElementById("memeStage").getElementsByTagName("span"),
		imgs = stage.getElementsByTagName("img"),
		locked = false,
		spinedStack = [],
		itemArray = [],
		itemArrayT = [];
		endNum = 0;
	this.loadGame = function() {
			pics = [0,1,2,3,4,5,6,7,8,9],
			ipic = 6,
			iposi = 12,
			i = 2,
			tp = null,
			curPicNum = 0;
		// 	random = Math.floor(Math.random()*9);
		// pics.splice(random,1);
		for(i = 0 ; i < imgs.length ; i++){
			console.log(memeda[i])
			itemArrayT.push(new Item(imgs[i],memeda[i]));
		}
		while(pics.length){
			curPicNum = pics.splice(Math.floor(Math.random()*ipic),1)[0];
			ipic --;
			i = 2;
			while(i --){
				tp = itemArrayT.splice(Math.floor(Math.random()*iposi),1)[0];
				if(tp == undefined){
					break;
				}
				itemArray.push(tp);
				console.log("??",curPicNum)
				tp.setImg(curPicNum);
				tp.setNum(curPicNum);
				iposi --;		
			}
		}
		this.initAnimation()
		this.clickAnimation()
	}

	//开局旋转动画
	this.initAnimation = function(){
		var time = 2000;
		for(var i = 0 ; i< imgs.length ;i++){
			(function(time ,i){
				itemArray[i].trunOver(time);
			})(time ,i);
			time+=50;
		}
	}

	//点击旋转卡片
	this.clickAnimation = function(){
		for(var i =0 ; i< itemArray.length;i++){
			(function(i,_this){
				var curItem = itemArray[i];
				curItem.memeda.onclick = function(){
					curItem.clear();
					if(locked || spinedStack.length >= 2){
						return false ;
					}
					//点击旋转牌子
					curItem.trueBack(0);
					spinedStack.push(curItem);
					if(spinedStack.length == 2){
						curItem.timer = setTimeout(function(){
							while(spinedStack.length){
								with(spinedStack.pop()){
									trunOver(0);
									clear();
								}
							}
							//翻牌间隙等0.2秒
							setTimeout(function(){
								locked = false;
							},500)
						},500)			
						_this.checkOk(spinedStack);
					}
				}
			})(i ,this)
		}
	}
	this.checkOk = function(obj){
		locked = true;
		console.log(obj[0])
		if(obj[0].num == obj[1].num){
			// obj[0].memeda.style.border = "4px solid red"
			console.log(obj[0].memeda.style)
			endNum++
			while(obj.length){
				with(obj.pop()){
					clear();
				}
			}
			locked = false;
			console.log("???",countdown)
			setTimeout(function(){
				if(endNum === 6){
					$(".mask").show()
					$('.contentText').text("恭 喜 您 挑 战 成 功 !")
					clearTimeout(countdown)
					return
				}
			},1000)
		}
	}
}
function Item(img ,memeda){
	this.img = img;
	this.memeda = memeda;
	this.num = null;
	this.timer = null;
	this.clear = function(){
		clearTimeout(this.timer);
	}
	this.setImg = function(i){
		this.img.setAttribute("src","imgs/"+i+".jpg");
	}
	this.setNum = function(i){
		this.num = i;
	}
	this.trunOver = function(time) {
		if(arguments.length == 0){
			time = 0;
		}
		setTimeout(function(){
			// img.style.transform = "rotateY(180deg)";
			img.style.willChange = 'transform';
			memeda.style.transform = "rotateY(0deg)";
		},time)
	}
	this.trueBack = function(time) {
		if(arguments.length == 0){
			time = 0;
		}
		setTimeout(function(){
			// img.style.transform = "rotateY(0deg)";
			img.style.willChange = 'transform';
			memeda.style.transform = "rotateY(-180deg)";
		},time)
	}
}


function getRandomCode() {
	if(newTime === -1){
		$(".mask").show()
		$('.contentText').text("挑 战 失 败")
		return
	}
	if (time === -1) { 
		$('.countdown').text("游戏倒计时"+newTime);
		newTime--;
	} else {
		$('.countdown').text("预览倒计时"+time);
		time--;
	} 
	countdown = setTimeout(function() {
		getRandomCode();
	},1000);
 }

 function buttonClick(){
	$(".mask").hide();
	window.location.href = window.location.href;
 }