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

var USER_LEVEL = 5; // set user level for round stage

var roundStage = -1;

function Gameplay_Init()
{
  /*
  stage = new createjs.Stage(document.getElementById("testCanvas"));

  var imgGame = new createjs.Bitmap("assets/images/main_bg.png");
  var imgGameX = 300;
  var imgGameY = 0;
  imgGame.image.onload = setImg(stage, imgGame, imgGameX, imgGameY);

  var imgGameDigit = new createjs.Bitmap("assets/images/digicode_bg_num.png");
  var imgGameDigitX = 350;
  var imgGameDigitY = 250;
  imgGameDigit.scaleX = imgGameDigit.scaleY = 0.9;
  imgGameDigit.image.onload = setImg(stage, imgGameDigit, imgGameDigitX, imgGameDigitY);

  var imgGamePageFrm = new createjs.Bitmap("assets/images/page_frame.png");
  var imgGamePageFrmX = 400;
  var imgGamePageFrmY = 600;
  imgGamePageFrm.scaleX = imgGamePageFrm.scaleY = 0.6;
  imgGamePageFrm.image.onload = setImg(stage, imgGamePageFrm, imgGamePageFrmX, imgGamePageFrmY);
  */
  //setContainer(stage);

  countdownTimer(stage);

  generateDigitCombination();

  touchAreaHex();

  setRoundStage();

  AISetCombination();
/*
  createjs.Ticker.setFPS(30);
  createjs.Ticker.addEventListener("tick",stage);
  */
}

var containerShape;

function setRoundStage()
{
    //01b9a1
    var posXround = 380;
    var posYround = 626;
    var roundShape = new createjs.Graphics();
    //hexShape.beginFill("#005F54").drawPolyStar(posX,posY,31,6,0,-90);
    roundShape.beginFill("#01B9A1").drawCircle(0,0,20);
    var shapeRoundStage = new createjs.Shape(roundShape);
    shapeRoundStage.alpha = 0;
    containerShape = new createjs.Container();
    //var imgRoundStage = new createjs.Bitmap("assets/images/page_frame_highlight.png");

    for(var i=0;i<5;i++)
  	{
  		  var circClone = shapeRoundStage.clone();
      	circClone.index = i;
      	containerShape.addChildAt(circClone,i);
      	mappingInputTouch(stage,containerShape);
  	}

    containerShape.x = posXround;
    containerShape.y = posYround;

	  var tempPos = 0;
    for (var i=0; i<5; i++)
    {
        containerShape.getChildAt(i).x = tempPos+46;
		    tempPos = containerShape.getChildAt(i).x;
    }
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

  score.x = 200;
  score.y = -250;

  score.scaleX = score.scaleY = 0.75;

  stg.addChild(score);
  stg.update();
}

function touchAreaHex()
{
  posX = 526;
  posY = 285;

  //posX = 497;
  //posY = 252;

  padding  = 5;

 	var hexShape = new createjs.Graphics();
  //hexShape.beginFill("#005F54").drawPolyStar(posX,posY,31,6,0,-90);
  hexShape.beginFill("#E87300").drawPolyStar(posX,posY,31,6,0,-90);
  var shape = new createjs.Shape(hexShape);
  //var shape = new createjs.Bitmap("assets/images/digicode_highlight.png");
  //shape.scaleX = shape.scaleY = 0.9;
  shape.alpha = 0.01;
	containerbox = new createjs.Container();

	var l = 10;
	var cols = 7;

	for(var i=0;i<=l;i++)
	{
		var hexClone = shape.clone();
		hexClone.name = i;
    hexClone.addEventListener("click",onHexClick)
		containerbox.addChildAt(hexClone,i);
    mappingInputTouch(stage,containerbox);
	}
	//containerbox.x = posX;
  //containerbox.y = posY;

  containerbox.x=0;

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
				containerbox.getChildAt(j).x = tempX - ((31*3) - (2*2));
				tempX = containerbox.getChildAt(j).x;
			}
			else
			{
				//console.log("tempX[" +j+ "] = " + tempX);
				containerbox.getChildAt(j).x = tempX + ( ((j-1)*62)-((j-1)*2) );
			}

			containerbox.getChildAt(j).y = 0 + (31*1.5) +4;
		}
		else if (j>=5 && j <= 7) //Row 3
		{
			if (j == 5 )
			{
				containerbox.getChildAt(j).x = tempX + 31 - (1*2);
				tempX = containerbox.getChildAt(j).x;
			}
			else
			{
				//console.log("tempX[" +j+ "] = " + tempX);
				containerbox.getChildAt(j).x = tempX + ( ((j-5)*62)-((j-5)*2) );
			}
			containerbox.getChildAt(j).y = (31*3)+8;
		}
		else if (j >= 8 && j <=9) //Row 4
		{
			if (j == 8 )
			{
				containerbox.getChildAt(j).x = tempX + 31 - (1.5);
				tempX = containerbox.getChildAt(j).x;
			}
			else
			{
				//console.log("tempX[" +j+ "] = " + tempX);
				containerbox.getChildAt(j).x = tempX + ( (62)-(2) );
			}
			containerbox.getChildAt(j).y = (31*4.5)+14;
		}
		else //Row 5
		{
			//console.log("cek j "+j);
			containerbox.getChildAt(j).x = tempX = 0;
			containerbox.getChildAt(j).y = (31*6)+18;
		}
	}

  //scale touch area
  //containerbox.scaleX = containerbox.scaleY = 0.5;
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
    //containerbox.getChildAt(digitCombination[0])).alpha =

    //for(var i=0;i<digitCombination.length;i++)
  //  {
      createjs.Tween.get(containerbox.getChildAt(digitCombination[0])).to({alpha:0.7},500).to({alpha:0.01}).addEventListener("change",handleComplete);
      //createjs.Tween.get(containerbox.getChildAt(0)).wait(500).to({alpha:0.7, visible:false},1000).call(handleComplete);
      //createjs.Tween.get(containerbox.getChildAt(1)).wait(500).to({alpha:0.7, visible:false},1000).call(handleComplete);
      //createjs.Tween.get(containerbox.getChildAt(2)).wait(500).to({alpha:0.7, visible:false},1000).call(handleComplete);
      //createjs.Tween.get(containerbox.getChildAt(3)).wait(500).to({alpha:0.7, visible:false},1000).call(handleComplete);
      //containerbox.getChildAt(digitCombination[i]).alpha = 0.5;
    //}
/*
    var mc = new createjs.MovieClip(null, 0, true, {start:2});
    stage.addChild(mc);

    for(var i=0;i<digitCombination.length;i++)  {
    mc.timeline.addTween(
      createjs.Tween.get(containerbox.getChildAt(digitCombination[i])).to({alpha:0.7},50));
  }
  mc.gotoAndPlay("start");
  */
}

function handleComplete()
{
  //callback complete
  createjs.Tween.get(containerbox.getChildAt(digitCombination[1])).wait(500).to({alpha:0.7},500).to({alpha:0.01}).addEventListener("change",handleComplete2);
  //console.log("testing ");
}

function handleComplete2()
{
  createjs.Tween.get(containerbox.getChildAt(digitCombination[2])).wait(1000).to({alpha:0.7},500).to({alpha:0.01}).addEventListener("change",handleComplete3);
  //console.log("testing ");
}

function handleComplete3()
{
  createjs.Tween.get(containerbox.getChildAt(digitCombination[3])).wait(1500).to({alpha:0.7},500).to({alpha:0.01});
  //console.log("testing ");
}

function handleComplete4()
{

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

function onHexClick(e)
{
    var target = e.target;
    //while(e.target)
    //{
      console.log("target name : "+target.name);
      //console.log("huehwu : "+containerbox.getChildAt(e.target.index));

      if (digitCombination[digitIndex] == target.name)
      {
          result[digitIndex] = digitCombination[digitIndex];
          //found = true;
          digitIndex++;
          if(result.toString() == digitCombination.toString())
          {

            console.log("BENAR");
            //console.log(result.toString());
            roundStageIncrease();
            initArrayUser();
            if (roundStage == USER_LEVEL)
            {
              timerPause = true;
              console.log("JUARAAAAAA LEVELLLLLLL");
            }
          }
      }
      else
      {
          if (roundStage != -1)
          {
              console.log("roudnsatage : "+roundStage);
              roundStageDecrease();
          }
          else
          {
              console.log("roudnsatage : "+roundStage);
              timerPause = true;
          }
      }

      /*
      if(e.target == containerbox.getChildAt(digitCombination[digitIndex]))
      {
          console.log("userToouch : "+userTouch[digitIndex]);
          userTouch[digitIndex] =
          result[digitIndex] = digitCombination[digitIndex];
          //found = true;
          digitIndex++;
          if(result.toString() == digitCombination.toString())
          {

            console.log("MENAAAAANNNNNGGGGG");
            //console.log(result.toString());
            roundStageIncrease();
            initArrayUser();
            if (roundStage == USER_LEVEL)
            {
              timerPause = true;
              console.log("JUARAAAAAA LEVELLLLLLL");
            }
          }
      }
      */

    //}
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

    textTimer = new createjs.Text("00:00","50px Helvetica","#FFFFFF");
    textTimer.x = 500;
    textTimer.y = 150;

    textTimer.addEventListener("tick",TimerTick);
    stage.addChild(textTimer);
    stage.update();
}

function generateDigitCombination()
{
  //http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
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
        if((timer/60) > 10)
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
        //stage.removeAllEventListeners();
        //stage.removeAllChildren();
        // next state GS_Finish.GS_Finish_Init();
      }
  }
}
