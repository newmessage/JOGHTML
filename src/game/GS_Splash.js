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

    State Splash :
    this state triggered at the first time when user play the game
*/
var stage;
var indexImg = 0;
var containerHackBtn;
var polygonGlow;

function GS_Splash()
{
	this.GS_Splash_Init = function()
	{
		console.log("Splash_Init()");
		containerHackBtn = new createjs.Container();
		module.drawString( TEXT.EN.SPLASH_TEXT_MSG_1 , "25px Hacker", "#ffffff", (MED_ANCHOR) , (FAR_ANCHOR) + 150, finish_containerbox, 250, 'left');
		
		module.drawString( TEXT.EN.GET_TEXT , "50px Hacker", "#ffffff", (FAR_ANCHOR) - SIDE_ANCHOR, (FAR_ANCHOR << 2) - 50, finish_containerbox, 0, 'left');
		
		module.drawString( TEXT.EN.SPLASH_TEXT_HACK , "50px Hacker", "#ffffff", (FAR_ANCHOR<<1) - SIDE_ANCHOR, (FAR_ANCHOR << 2) + 160, finish_containerbox, 0, 'left');
		 setHackGlow();
	}
	
	
	this.onButtonClick = function(e)
	{
		console.log(" This should start the game!!");
		createjs.Tween.get(polygonGlow).to({alpha:0.7},300).to({alpha:0.01}).call(onHackGlowFinish);
	}
	function onHackGlowFinish()
	{
	  mainStage.removeAllEventListeners();
	  finish_containerbox.removeAllChildren();
	  main_debug.changeState(GAME_STATE_PLAY);
	  UI_Preload.Init_Builder();
	}
	function setHackGlow()
	{
		polygonGlow = new createjs.Shape();
		polygonGlow.graphics.beginFill("#E87300");
		polygonGlow.graphics.moveTo(58,0).lineTo(58,50).lineTo(68,62).lineTo(238,62).lineTo(238,24).lineTo(225,0).lineTo(60,0);
		polygonGlow.alpha = 0.01;
		polygonGlow.x = FAR_ANCHOR;
		polygonGlow.y = (FAR_ANCHOR << 2) + 155;
		finish_containerbox.addChild(polygonGlow);
		containerHackBtn.x = 0;
		containerHackBtn.y = 0;
		mainStage.update();
		createjs.Ticker.setFPS(30);
		createjs.Ticker.addEventListener("tick",mainStage);

	}
}
var GS_Splash = new GS_Splash();
