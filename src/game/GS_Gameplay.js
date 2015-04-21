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

    State Gameplay:
    this state triggered when user finish on howto (state tutorial) - Main logic of game
*/

var timer = 3600;
var textTimer;
var stage;

var digitCombination = [-1,-1,-1,-1];
var userTouch = [-1,-1,-1,-1];
var containerbox;

var digitIndex = 0;
var result = [-1,-1,-1,-1]; // user touch store in arrays
var found = false;
var timerPause = false;

var USER_LEVEL = 4; // set user level for round stage
var roundStage = -1;

var wrongGuess = false;

var colorHex = "#01B9A1";
var text1;
var box;
function GS_Gameplay()
{
	box = new createjs.Container();
	this.GS_Gameplay_Init = function ()
	{
		
		text1 = TEXT.EN.GP_TEXT_TUTORIAL_1;
		textHowTo = new createjs.Text(text1, "30px Hacker", "#ffffff");

		var w = ( textHowTo.getMeasuredWidth() ) * textHowTo.scaleX;
		var h = ( textHowTo.getMeasuredHeight() ) * textHowTo.scaleY;

		textHowTo.textAlign = 'center'; 
		textHowTo.lineWidth = 300;
		
		textHowTo.x = (FAR_ANCHOR<<1)+50;
		textHowTo.y = (FAR_ANCHOR<<1) + 100;
		box.addChild(textHowTo);
		
		text1 = TEXT.EN.GP_TEXT_TUTORIAL_2;
		textHowTo = new createjs.Text(text1, "15px Hacker", "#ffffff");
		textHowTo.textAlign = 'center'; 
		textHowTo.lineWidth = 300;
		
		textHowTo.x = (FAR_ANCHOR<<1)+50;
		textHowTo.y = (FAR_ANCHOR<<1) + 250;
		box.addChild(textHowTo);
		finish_containerbox.addChild(box);
		
		//module.drawString( TEXT.EN.GP_TEXT_TUTORIAL_1 , "30px Hacker", "#ffffff", (FAR_ANCHOR<<1)+50, (FAR_ANCHOR<<1) + 100, finish_containerbox, 300, 'center');
		
		//module.drawString( TEXT.EN.GP_TEXT_TUTORIAL_2 , "15px Hacker", "#ffffff", (FAR_ANCHOR<<1)+50, (FAR_ANCHOR<<1) + 250, finish_containerbox, 200, 'center');
	}
	
	this.onButtonClick = function(e)
	{
		console.log("This should exit the tutorial box!!");
		this.GS_Gameplay_TutorialHide();
	}
	this.GS_Gameplay_TutorialHide = function ()
	{
		finish_containerbox.removeChildAt(3);
		box.removeAllChildren();
		mainStage.update();
		Gameplay_Init();
	}
	function Gameplay_Init()
	{
	  setContainer(mainStage);
	  countdownTimer(mainStage);
	  generateDigitCombination();
	  touchAreaHex();
	  setRoundStage();
	  AISetCombination();
	
	  createjs.Ticker.setFPS(30);
	  createjs.Ticker.addEventListener("tick",mainStage);
	}
	
	var containerShape;
	
	function setRoundStage()
	{
		//01b9a1
		var posXround = 0;//380;
		var posYround = (FAR_ANCHOR << 2) + 135;
		
		var roundShape = new createjs.Graphics();
		roundShape.beginFill("#01B9A1").drawCircle(0,0,20);
		
		var shapeRoundStage = new createjs.Shape(roundShape);
		shapeRoundStage.alpha = 0;
		containerShape = new createjs.Container();
	
		for(var i=0;i<5;i++)
		{
			var circClone = shapeRoundStage.clone();
			circClone.index = i;
			containerShape.addChildAt(circClone,i);
			mappingInputTouch(mainStage,containerShape);
		}
	
		containerShape.x = posXround;
		containerShape.y = posYround;
	
		var tempPos = 110;
		for (var i=0; i<5; i++)
		{
			containerShape.getChildAt(i).x = tempPos+(i*60)+(i+1);
			//tempPos = containerShape.getChildAt(i).x;
		}
		
		finish_containerbox.addChild(containerShape);
	}
	
	function setContainer(stg)
	{
	  var score = new createjs.Container();
	
	  var imgGameTL = new createjs.Bitmap("assets/images/top_left.png");
	  var imgGameBL = new createjs.Bitmap("assets/images/bottom_left.png");
	  var imgGameBR = new createjs.Bitmap("assets/images/bottom_right.png");
	  var imgGameTR = new createjs.Bitmap("assets/images/top_right.png");
	
	  score.addChild(imgGameTL, imgGameBL, imgGameBR, imgGameTR);
	  imgGameTL.x = 300;
	  imgGameTL.y = 500;
	
	  imgGameBL.x = 300;
	  imgGameBL.y = 600;
	
	  imgGameBR.x = 650;
	  imgGameBR.y = 600;
	
	  imgGameTR.x = 650;
	  imgGameTR.y = 500;
	
	  score.x = -140;
	  score.y = -340;
	
	  
	  score.scaleX = score.scaleY = 0.75;
	  finish_containerbox.addChild(score);
	  stg.addChild(finish_containerbox);
	  stg.update();
	}
	
	function touchAreaHex()
	{
		posX = 231;
		posY = (FAR_ANCHOR<<1) + 30;
	
		padding  = 1;
	
		var hexShape = new createjs.Graphics();
		
		if(wrongGuess)
		{
			colorHex = "#990000";
		}
		else
			colorHex = "#E87300";

	  	hexShape.beginFill(colorHex).drawPolyStar(posX,posY,28,6,0,-90);
	  	var shape = new createjs.Shape(hexShape);
	  	shape.alpha = 0.01;
		containerbox = new createjs.Container();
	
		var l = 9;
		var cols = 7;
	
		for(var i=0; i<=l; i++)
		{
			var hexClone = shape.clone();
			hexClone.name = i;
			hexClone.addEventListener("click",onHexClick)
			containerbox.addChildAt(hexClone,i);
			mappingInputTouch(mainStage,containerbox);
		}

	  	containerbox.x = 0;
		finish_containerbox.addChild(containerbox);
		var tempX = 0;
		var tempY = 0;
		for(var j=0;j<=10;j++)
		{
			if(j == 0) // Row 1
			{
				containerbox.getChildAt(j).x = tempX = 0;
			}
			else if (j > 0 && j < 5) // Row 2
			{
				if(j == 1)
				{
					containerbox.getChildAt(j).x = tempX - 79;
					tempX = containerbox.getChildAt(j).x;
				}
				else
				{
					containerbox.getChildAt(j).x = tempX + (53*(j-1));
				}
				containerbox.getChildAt(j).y = 45;
			}
			else if (j>=5 && j <= 7) //Row 3
			{
				if (j == 5 )
				{
					containerbox.getChildAt(j).x = tempX + 27;
					tempX = containerbox.getChildAt(j).x;
				}
				else
				{
					containerbox.getChildAt(j).x = tempX + (53*(j-5));
				}
				containerbox.getChildAt(j).y = 92;
			}
			else if (j >= 8 && j <=9) //Row 4
			{
				if (j == 8 )
				{
					containerbox.getChildAt(j).x = tempX + 26;
					tempX = containerbox.getChildAt(j).x;
				}
				else
				{
					containerbox.getChildAt(j).x = tempX + (52);
				}
				containerbox.getChildAt(j).y = 137;
			}
		}
	}
	
	function roundStageIncrease()
	{
	  roundStage++;
	  createjs.Tween.get(containerShape.getChildAt(roundStage)).to({alpha:1});
	}
	
	function roundStageDecrease()
	{
		createjs.Tween.get(containerShape.getChildAt(roundStage)).to({alpha:0});
		roundStage--;
	  
	}
	
	function AISetCombination()
	{
		for(var i=0;i<4;i++)
		{
			createjs.Tween.get(containerbox.getChildAt(digitCombination[i])).wait(500*(i+1)).to({alpha:0.7},500).to({alpha:0.01});
		}
	}
	
	function ClearAlpha()
	{
	  for(var i=0;i<10;i++)
	  {
		containerbox.getChildAt(i).alpha = 0.01;
	  }
	}
	
	function initArrayUser()
	{
	  userTouch = [-1,-1,-1,-1];
	  digitCombination = [-1,-1,-1,-1];
	  result = [-1,-1,-1,-1];
	  digitIndex = 0;
	  generateDigitCombination();
	  ClearAlpha();
	  AISetCombination();
	}
	
	function glowTouch(targetName)
	{
	  createjs.Tween.get(containerbox.getChildByName(targetName.name)).to({alpha:0.7},500).to({alpha:0.01});
	}
	
	function onHexClick(e)
	{
		var target = e.target;
		console.log("target name : "+target.name);
		glowTouch(target);
		if (digitCombination[digitIndex] == target.name)
		{
		  result[digitIndex] = digitCombination[digitIndex];
		  digitIndex++;
		  if(result.toString() == digitCombination.toString())
		  {
		
			console.log("BENAR");
			roundStageIncrease();
			initArrayUser();
			if (roundStage == USER_LEVEL)
			{
			  timerPause = true;
			  console.log("JUARAAAAAA LEVELLLLLLL");
			}
		  }
		  else
		  {
			  console.log("SALAH");
		  }
		}
		else
		{
		  if (roundStage >= 0)
		  {
			  console.log("SALAH 2");
			  console.log("RoundStage : "+roundStage);
			  roundStageDecrease();
		  }
		  else
		  if (roundStage < 0)
		  {
			  console.log("RoundStage : "+roundStage);
			  console.log("GAME OVER");
			  gOver = true;
			  timerPause = true;
		  }
		}
	}
	
	function mappingInputTouch(stage,shape)
	{
	  stage.addChild(shape);
	  stage.update();
	}
	
	function setImg(stage, img, x, y)
	{
		stage.addChild(img);
		img.x = x;
		img.y = y;
		stage.update();
	}
	
	function countdownTimer(stage)
	{
	
		textTimer = new createjs.Text("00:00","75px Hacker","#FFFFFF");
		textTimer.x = (FAR_ANCHOR) + 60;
		textTimer.y = (MED_ANCHOR) + 10;
		textTimer.scaleX = textTimer.scaleY = 0.75;
		textTimer.addEventListener("tick",TimerTick);
		finish_containerbox.addChild(textTimer);
		mainStage.addChild(finish_containerbox);
		mainStage.update();
	}
	
	function generateDigitCombination()
	{
	  var minimum = 0;
	  var maximum = 9;
	
	  var inc = 0;
	  while(inc < 4)
	  {
		digitCombination[inc] = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
		inc++;
	  }
	 
	  console.log(digitCombination.toString());
	  
	}
	
	function TimerTick()
	{
	  if(timer>0)
	  {
		  //stop timer when user win
		  if (!timerPause)
		  {
			timer--;
			if((timer/60) >= 10)
			{
			  textTimer.text = "00:"+(timer/60).toFixed(0);
			}
			else
			{
			  textTimer.text = "00:0"+(timer/60).toFixed(0);
			}
	
		  //console.log((timer/60).toFixed(2));
		  }
		  else
		  {
			createjs.Ticker.setPaused(true);
			//comment below for a while
			if(gOver)
			{
				//TODO : if there's game over
				goToFinish();
			}
			else
			{
				goToFinish();
			}
		  }
	  }
	  else
	  {
		createjs.Ticker.setPaused(true);
		goToFinish();
	  }
	}
	
	function goToFinish()
	{
		mainStage.removeAllEventListeners();
	  	finish_containerbox.removeAllChildren();
	  	main_debug.changeState(GAME_STATE_FINISH);
	  	UI_Preload.Init_Builder();
	}
}

var GS_Gameplay = new GS_Gameplay();