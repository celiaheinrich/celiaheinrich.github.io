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

var X_SPLIT = 250;
var Y_SPLIT = 248;
var Y_CANVAS = 504;
var WIDTH_CANVAS = 250;
var HEIGHT_CANVAS = 250;

var BOTTOM_LINE = 758;

var vie = new Image();
var viePedue = new Image();
vie.src = '../img/vie.png';
viePedue.src = '../img/vie-perdue.png';
var SPEED_PAWS = 50;


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
     this.posX = 325;
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
        if (this.posX < -10)
            this.posX = -10;
        if (this.immuneCount > 0) {
            this.immuneCount = this.immuneCount-1;
        }
        break;
        case States.HEAVY_LEFT:
        if(this.immuneCount % 2 == 0)
            ctx.drawImage(this.spriteSheet, X_SPLIT * 2, ySprite, X_SPLIT, Y_SPLIT, this.posX, Y_CANVAS, WIDTH_CANVAS, HEIGHT_CANVAS);
        if(this.isAlive())
            this.posX-=SPEED_PAWS;
        if (this.posX < -10)
            this.posX = -10;
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
        if (this.posX > 570)
            this.posX = 570;
        if (this.immuneCount > 0) {
            this.immuneCount = this.immuneCount-1;
        }
        break;
        case States.HEAVY_RIGHT:
        if(this.immuneCount % 2 == 0)
            ctx.drawImage(this.spriteSheet, X_SPLIT * 4, ySprite, X_SPLIT, Y_SPLIT, this.posX, Y_CANVAS, WIDTH_CANVAS, HEIGHT_CANVAS);
        if(this.isAlive())
            this.posX+=SPEED_PAWS;
        if (this.posX > 570)
            this.posX = 570;
        if (this.immuneCount > 0) {
            this.immuneCount = this.immuneCount-1;
        }
        break;
        case States.HURT_BEG:
        ctx.fillStyle = "rgba(255,0,0,0.3)";
        ctx.fillRect(0, 46, 800, 708);
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
        ctx.fillRect(0, 46, 800, 708);
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
        ctx.fillRect(0, 46, 800, 708);
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
   switch (this.lifes) {
    case 3:
    ctx.drawImage(vie, 5, BOTTOM_LINE, 50, 42);
    ctx.drawImage(vie, 55, BOTTOM_LINE, 50, 42);
    ctx.drawImage(vie, 105, BOTTOM_LINE, 50, 42);
    break;
    case 2:
    ctx.drawImage(vie, 5, BOTTOM_LINE, 50, 42);
    ctx.drawImage(vie, 55, BOTTOM_LINE, 50, 42);
    ctx.drawImage(viePedue, 105, BOTTOM_LINE, 50, 42);
    break;
    case 1:
    ctx.drawImage(vie, 5, BOTTOM_LINE, 50, 42);
    ctx.drawImage(viePedue, 55, BOTTOM_LINE, 50, 42);
    ctx.drawImage(viePedue, 105, BOTTOM_LINE, 50, 42);
    break;
    default:
    ctx.drawImage(viePedue, 5, BOTTOM_LINE, 50, 42);
    ctx.drawImage(viePedue, 55, BOTTOM_LINE, 50, 42);
    ctx.drawImage(viePedue, 105, BOTTOM_LINE, 50, 42);
    break;
    }
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '30px Love Ya Like A Sister, cursive';
    ctx.textAlign = 'right';
    ctx.fillText ("Use ← and → to move the paws", 620, BOTTOM_LINE+28);
    drawSound(ctx);

}


Papatte.prototype.hurtAnimation = function(ctx) {
    this.isWell = false;
}
