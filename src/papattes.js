var States = {
    STILL: 1,
    LOW_LEFT: 2,
    HEAVY_LEFT: 3,
    LOW_RIGHT: 4,
    HEAVY_RIGHT: 5,
    HURT_BEG: 6,
    HURT_MID: 7,
    HURT_END: 8
}

var Keys = {
    LEFT: 37,
    RIGHT: 39
}



var vie = new Image();
var viePedue = new Image();
vie.src = '../img/vie.png';
viePedue.src = '../img/vie-perdue.png';

function fisOnPaw(x, y) {
    //est sur la papatte
    if(papatte.isActive()) {
        var widthPaw = sizeConfig.paws.width;
        var heightPaw = sizeConfig.paws.height;
        var marginHeight = sizeConfig.heightUpMargin;
        var GameZoneHeight = sizeConfig.heightGameZone;
        var upPaw = GameZoneHeight + marginHeight - heightPaw;
        if (x >= papatte.posX && x <= (papatte.posX + widthPaw) && y >= upPaw && y <= (upPaw + heightPaw))
            isOnPaw = true;
        else
            isOnPaw = false;
    }
}


function handleMove (evt) {
    
    evt.preventDefault();
    var touches = evt.changedTouches;
    var x = touches[0].pageX - canvas.offsetLeft;
    var y = touches[0].pageY - canvas.offsetTop;
    //isStillOnPaw (x, y)
    if(isOnPaw)
        touchPosXPaw =x
    else
        touchPosXPaw = -1;
}




function handleKeyDown(evt, papatte){
	//alert(evt.keyCode);
	if(evt.keyCode == Keys.LEFT) {
		papatte.state = States.LOW_LEFT;
	}
	if(evt.keyCode == Keys.RIGHT) {
			papatte.state = States.LOW_RIGHT;
	}
}

function handleKeyUp(evt, papatte) {
        switch (evt.keyCode) {
        case Keys.LEFT:
        case Keys.RIGHT:
        papatte.state = States.STILL;
        break;
    }
}


var Papatte = function(spriteSheet) {
     this.spriteSheet = spriteSheet;
     this.lifes = 3;
     this.posX = (sizeConfig.canvasWidth - sizeConfig.paws.width)/2;
     this.state = States.STILL;
     this.isWell = true;
     this.hurtCount = 0;
     this.immuneCount = 0;

}

Papatte.prototype.isAlive = function() {
    return this.lifes > 0;
}

Papatte.prototype.isActive = function() {
    return (this.isWell && this.isAlive());
}

Papatte.prototype.isImmune = function() {
    return (this.immuneCount > 0);
}


Papatte.prototype.draw = function(ctx) {

    if(isTouchScreen && papatte.isActive()) {
        var xComp = touchPosXPaw;
        var widthPaw = sizeConfig.paws.width;
        if(!isOnPaw)
             papatte.state = States.STILL;
        else if ((papatte.posX + widthPaw/4)  > xComp)
                papatte.state = States.LOW_LEFT;
            else if ((papatte.posX + 3*widthPaw/4) < xComp)
                papatte.state = States.LOW_RIGHT;
            else
             papatte.state = States.STILL;
    }


    var marginHeight = sizeConfig.heightUpMargin;
    var GameZoneHeight = sizeConfig.heightGameZone;
    var canvasWidth = sizeConfig.canvasWidth;

    var X_SPLIT = 250;
    var Y_SPLIT = 248;
    
    var SPEED_PAWS = sizeConfig.paws.speed;
    var WIDTH_CANVAS = sizeConfig.paws.width;
    var HEIGHT_CANVAS = sizeConfig.paws.height;
    var Y_CANVAS = GameZoneHeight + marginHeight - HEIGHT_CANVAS;
    var leftBound = sizeConfig.paws.leftBound;
    var rightBound = sizeConfig.paws.rightBound;

    var ySprite = 1;
    if (this.lifes <= 1)
        ySprite = Y_SPLIT*2+5; 
    if (this.lifes == 2)
        ySprite = Y_SPLIT*1+3; 
    switch (this.state) {
        case States.STILL:
        if(this.immuneCount % 2 == 0)
            ctx.drawImage(this.spriteSheet, X_SPLIT * 0, ySprite, X_SPLIT, Y_SPLIT, this.posX, Y_CANVAS, WIDTH_CANVAS, HEIGHT_CANVAS);
        if (this.immuneCount > 0) {
            this.immuneCount = this.immuneCount-1;
        }
        break;
        case States.LOW_LEFT:
        if(this.immuneCount % 2 == 0)
            ctx.drawImage(this.spriteSheet, X_SPLIT * 1, ySprite, X_SPLIT, Y_SPLIT, this.posX, Y_CANVAS, WIDTH_CANVAS, HEIGHT_CANVAS);
        if(this.isAlive())
            this.posX-=SPEED_PAWS;
        this.state = States.HEAVY_LEFT;
        if (this.posX < leftBound)
            this.posX = leftBound;
        if (this.immuneCount > 0) {
            this.immuneCount = this.immuneCount-1;
        }
        break;
        case States.HEAVY_LEFT:
        if(this.immuneCount % 2 == 0)
            ctx.drawImage(this.spriteSheet, X_SPLIT * 2, ySprite, X_SPLIT, Y_SPLIT, this.posX, Y_CANVAS, WIDTH_CANVAS, HEIGHT_CANVAS);
        if(this.isAlive())
            this.posX-=SPEED_PAWS;
        if (this.posX < leftBound)
            this.posX = leftBound;
        if (this.immuneCount > 0) {
            this.immuneCount = this.immuneCount-1;
        }
        break;
        case States.LOW_RIGHT:
        if(this.immuneCount % 2 == 0)
        ctx.drawImage(this.spriteSheet, X_SPLIT * 3, ySprite, X_SPLIT, Y_SPLIT, this.posX, Y_CANVAS, WIDTH_CANVAS, HEIGHT_CANVAS);
        if(this.isAlive())
            this.posX+=SPEED_PAWS;
        this.state = States.HEAVY_RIGHT;
        if (this.posX > rightBound)
            this.posX = rightBound;
        if (this.immuneCount > 0) {
            this.immuneCount = this.immuneCount-1;
        }
        break;
        case States.HEAVY_RIGHT:
        if(this.immuneCount % 2 == 0)
            ctx.drawImage(this.spriteSheet, X_SPLIT * 4, ySprite, X_SPLIT, Y_SPLIT, this.posX, Y_CANVAS, WIDTH_CANVAS, HEIGHT_CANVAS);
        if(this.isAlive())
            this.posX+=SPEED_PAWS;
        if (this.posX > rightBound)
            this.posX = rightBound;
        if (this.immuneCount > 0) {
            this.immuneCount = this.immuneCount-1;
        }
        break;
        case States.HURT_BEG:
        ctx.fillStyle = "rgba(255,0,0,0.3)";
        ctx.fillRect(0, marginHeight, canvasWidth, GameZoneHeight);
        if(this.hurtCount % 2 == 0)
            ctx.drawImage(this.spriteSheet, X_SPLIT, Y_SPLIT*3+7, X_SPLIT, Y_SPLIT, this.posX, Y_CANVAS, WIDTH_CANVAS, HEIGHT_CANVAS);
        this.hurtCount = this.hurtCount+1;
        if(this.hurtCount == 3){
            this.state = States.HURT_MID;
            this.hurtCount = 0;
        }
        break;
        case States.HURT_MID:
        ctx.fillStyle = "rgba(255,0,0,0.3)";
        ctx.fillRect(0, marginHeight, canvasWidth, GameZoneHeight);
        if(this.hurtCount % 2 == 0)
            ctx.drawImage(this.spriteSheet, X_SPLIT, Y_SPLIT*4+9, X_SPLIT, Y_SPLIT, this.posX, Y_CANVAS, WIDTH_CANVAS, HEIGHT_CANVAS);
        this.hurtCount = this.hurtCount+1;
        if(this.hurtCount == 3){
            this.state = States.HURT_END;
            this.hurtCount = 0;
        }
        break;
        case States.HURT_END:
        ctx.fillStyle = "rgba(255,0,0,0.3)";
        ctx.fillRect(0, marginHeight, canvasWidth, GameZoneHeight);
        if(this.hurtCount % 2 == 0)
            ctx.drawImage(this.spriteSheet, X_SPLIT, Y_SPLIT*5+11, X_SPLIT, Y_SPLIT, this.posX, Y_CANVAS, WIDTH_CANVAS, HEIGHT_CANVAS);
        this.hurtCount = this.hurtCount+1;
        if(this.hurtCount == 3){
            this.state = States.STILL;
            this.isWell = true;
            this.hurtCount = 0;
            this.immuneCount = 9;
        }

        break;
    }
}


Papatte.prototype.drawLife = function(ctx) {
    var BOTTOM_LINE = sizeConfig.heightGameZone + sizeConfig.heightUpMargin;
    var imgWidth = sizeConfig.lives.width;
    var imgHeight = sizeConfig.lives.height;
    var x1 = sizeConfig.lives.offsetX;
    var x2 = x1 + imgWidth;
    var x3 = x2 + imgWidth;
    
   switch (this.lifes) {
    case 3:
    ctx.drawImage(vie, x1, BOTTOM_LINE, imgWidth, imgHeight);
    ctx.drawImage(vie, x2, BOTTOM_LINE, imgWidth, imgHeight);
    ctx.drawImage(vie, x3, BOTTOM_LINE, imgWidth, imgHeight);
    break;
    case 2:
    ctx.drawImage(vie, x1, BOTTOM_LINE, imgWidth, imgHeight);
    ctx.drawImage(vie, x2, BOTTOM_LINE, imgWidth, imgHeight);
    ctx.drawImage(viePedue, x3, BOTTOM_LINE, imgWidth, imgHeight);
    break;
    case 1:
    ctx.drawImage(vie, x1, BOTTOM_LINE, imgWidth, imgHeight);
    ctx.drawImage(viePedue, x2, BOTTOM_LINE, imgWidth, imgHeight);
    ctx.drawImage(viePedue, x3, BOTTOM_LINE, imgWidth, imgHeight);
    break;
    default:
    ctx.drawImage(viePedue, x1, BOTTOM_LINE, imgWidth, imgHeight);
    ctx.drawImage(viePedue, x2, BOTTOM_LINE, imgWidth, imgHeight);
    ctx.drawImage(viePedue, x3, BOTTOM_LINE, imgWidth, imgHeight);
    break;
    }
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = sizeConfig.lives.directionFontSize +' Love Ya Like A Sister, cursive';
    ctx.textAlign = 'right';
    if (!isTouchScreen)
        ctx.fillText ("Use ← and → to move the paws", sizeConfig.lives.directionOffsetX, BOTTOM_LINE+sizeConfig.lives.directionShiftY);
    drawSound(ctx);

}


Papatte.prototype.hurtAnimation = function(ctx) {
    this.isWell = false;
}
