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

    State Finish :
    this state triggered when user finish the game (whether success or failed)
*/

var isWin = false;
var stage = null;
var indexImg = 0;
var containerHackBtn;
var polygonGlow;

function GS_Finish()
{
	this.GS_Finish_Init = function()
	{
		var finishtxt_msg1;
		var finishtxt_msg2;
		var finishtxt_button;
		var fsize;
		var alignY = 0;
		var alignX = 0;
		
		if (gOver)
		{
			finishtxt_msg1		= TEXT.EN.FINISH_TEXT_LOSE_MSG_1;
			finishtxt_msg2		= TEXT.EN.FINISH_TEXT_LOSE_MSG_2;
			finishtxt_button	= TEXT.EN.FINISH_TEXT_CERTIFIED_2;
			fsize 	= "40px Hacker";
			alignY 	= 10;
			
		}
		else
		{
			finishtxt_msg1		= TEXT.EN.FINISH_TEXT_WIN_MSG_1;
			finishtxt_msg2		= TEXT.EN.FINISH_TEXT_WIN_MSG_2;
			finishtxt_button	= TEXT.EN.FINISH_TEXT_CERTIFIED;
			fsize 	= "50px Hacker";
		}
		console.log("Finish_Init()");
		module.drawString( finishtxt_msg1 , "25px Hacker", "#ffffff", (FAR_ANCHOR<<1) + MED_ANCHOR , (TOP_ANCHOR << 3) + alignY, finish_containerbox, 250,'center')
		
		module.drawString( finishtxt_msg2 , "25px Hacker", "#ffffff", (FAR_ANCHOR<<1) + MED_ANCHOR , (TOP_ANCHOR << 5) - 110, finish_containerbox, 250,'center')
		
		module.drawString( finishtxt_button , fsize, "#ffffff", (FAR_ANCHOR<<1) + (MED_ANCHOR - SIDE_ANCHOR), (TOP_ANCHOR << 6) + 25 + alignY, finish_containerbox, 0,'center');
		
		setHackGlow();
	}

	this.onButtonClick = function(e)
	{
		console.log(" This should exit the game!!");
		createjs.Tween.get(polygonGlow).to({alpha:0.7},300).to({alpha:0.01}).call(onHackGlowFinish);
		window.open("http://www.visa.com", "_blank");
	}
	
	function onHackGlowFinish()
	{
		mainStage.removeAllEventListeners();
		
	}
	function setHackGlow()
	{
		polygonGlow = new createjs.Shape();
		polygonGlow.graphics.beginFill("#E87300");
		polygonGlow.graphics.moveTo(-47,3).lineTo(-47,67).lineTo(-28,85).lineTo(320,85).lineTo(320,32).lineTo(290,3).lineTo(0,0);//.lineTo(0,0);
		polygonGlow.alpha = 0.01;
		polygonGlow.x = FAR_ANCHOR;
		polygonGlow.y = (FAR_ANCHOR<<3) - 150;
		finish_containerbox.addChild(polygonGlow);
		containerHackBtn.x = 0;
		containerHackBtn.y = 0;
		finish_containerbox.addChild(containerHackBtn);
		mainStage.update();
		createjs.Ticker.setFPS(30);
		createjs.Ticker.addEventListener("tick",mainStage);

	}
	
}

var GS_Finish = new GS_Finish;