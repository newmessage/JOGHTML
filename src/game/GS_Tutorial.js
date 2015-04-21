// JavaScript Document
/*
- satrio.budidharmawan -

|--root
  |--assets
  | |--images
  | |--fonts
  |--src
    |--3rd
    | |--js
    |--game ... (you are here)

    State Tutorial :
    this state triggered after Splash State finished (How to play)
*/

function Tutorial_Init()
{
	stage = new createjs.Stage(document.getElementById("testCanvas"));

	var imgGame = new createjs.Bitmap("assets/images/main_bg_2.png");
	var imgGameX = 300;
	var imgGameY = 0;
	imgGame.onload = function(){
		console.log(imgGame.width);
	}
	imgGame.image.onload = module.setImg(stage, imgGame, imgGameX, imgGameY);
	
	var textContent = "How to Play\n\nla la la la la\nla la la la la\nla la la la la\nla la la la la\nla la la la la";
	var textHowTo = new createjs.Text(textContent, "20px Arial", "#ff69b4");
	textHowTo.x = 390;
	textHowTo.y = 100;
	stage.addChild(textHowTo);
	
	Update(stage);

	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", stage);	
}

function Update(stg)
{
	stg.update();
}
