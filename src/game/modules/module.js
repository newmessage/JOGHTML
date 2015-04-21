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
*/

//DEFINE GLOBAL VAR in here
var m_font = "Arial";
var textHowTo;
//GLOBAL VAR END
function module()
{
	//var textHowTo = new createjs.Text(textContent_1, "25px Hacker", "#ff69b4");
	this.drawString = function(textToDraw, props, color, posX, posY, containerbox, lineW, aligns)
	{
		console.log("Draw String");
		var textContent_1 = textToDraw;
		textHowTo = new createjs.Text(textContent_1, props, color);

		var w = ( textHowTo.getMeasuredWidth() ) * textHowTo.scaleX;
		var h = ( textHowTo.getMeasuredHeight() ) * textHowTo.scaleY;
				
		//textHowTo.regY = h / 2;
		textHowTo.textAlign = aligns; 
		if (lineW > 0)
			textHowTo.lineWidth = lineW;
		
		//textHowTo.font = 'assets/fonts/Elite Hacker (Corroded).ttf';
		textHowTo.x = posX;
		textHowTo.y = posY;
		containerbox.addChild(textHowTo);
	}

	//function moveCenter()
	//{
		this.MoveToCenterY = function(spriteObject, screenHeight)
		{
			if (!spriteObject)
			{
				spriteObject.Y = screenHeight/2;
				return spriteObject.Y;
			}

		}

		this.MoveToCenterX = function(spriteObject, screenWidth)
		{
			if (!spriteObject)
			{
				spriteObject.X = screenWidth/2;
				return spriteObject.X;
			}
		}
//	}


	this.setImg = function(stage, img, x, y)
	{
		//scale = Math.min(canvas.width/768,canvas.height/1024);
		//scale = this.resize(mainCanvas, 768, 1024);
		//img.scaleX = img.scaleY = scale;
		//this.MoveToCenterX(img, mainCanvas.width-img.width);
		stage.addChild(img);
		img.x = x;
		img.y = y;
		stage.update();
	}

	this.resize = function (canvas, imgwidth, imgheight)
	{
		scale = Math.min(mainCanvas.width/imgwidth,mainCanvas.height/imgheight);
		return scale;
	}

	this.resize2 = function(keepAspectRatio)
	{
		// browser viewport size
		var w = window.innerWidth;
		var h = window.innerHeight;
		var scale = 0;
		// stage dimensions
		var ow = 480; // your stage width
		var oh = 800; // your stage height
		
		if (keepAspectRatio)
		{
			// keep aspect ratio
			scale = Math.min(w / ow, h / oh);
			mainStage.scaleX = scale;
			mainStage.scaleY = scale;
			
			// adjust canvas size
			mainStage.canvas.width = ow * scale;
			mainStage.canvas.height = oh * scale;
		}
		else
		{
			// scale to exact fit
			mainStage.scaleX = w / ow;
			mainStage.scaleY = h / oh;
		
			// adjust canvas size
			mainStage.canvas.width = ow * stage.scaleX;
			mainStage.canvas.height = oh * stage.scaleY;
		}
		
		 // update the stage
		mainStage.update()
	}

	this.GetDeviceSize = function()
	{
		var gameDiv = document.getElementById(mainCanvas);
		console.log("module::GetDeviceSize()");
		console.log("-->>::GetDeviceSize().w = "+gameDiv.offsetWidth);
		console.log("-->>::GetDeviceSize().h = "+gameDiv.offsetHeight);
		return {
			width: gameDiv.offsetWidth,
			height: gameDiv.offsetHeight
		};
	}

	
	
	this.SetFont = function(font)
	{
		m_font = font;
	}
}

var module = new module();
