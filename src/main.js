var firstTime = true;
var isgameStopped = false;
var background = new Image();
var coton = new Image();
var pelote = new Image();
var polystyrene = new Image();
var punaise = new Image();
var spriteSheet = new Image();
var ctx;
var dateDeb;

//FallenObjects
var listFallenObject = [];
var latestXPos = [];
var ixlatestXPos = 0;

//Tacks
var listTack = [];
var latestTackXPos = [];
var ixlatestTackXPos = 0;
var drawInterval;
var createObjInterval;
var createTackInterval;

var isIntroPlayed = false;

//Paws
var papatte;

var canvas;

function initialiser () {
    createCanvas();
    background.src = '../img/Usine main acc.jpg';
    coton.src = '../img/coton.png';
    pelote.src = '../img/pelote.png'
    polystyrene.src = '../img/poly.png'
    if (isTouchScreen)
        punaise.src = '../img/punaises-phone.png'
    else
        punaise.src = '../img/punaises.png'
    spriteSheet.src = '../img/papattes-sprite.png';
    
        
    papatte = new Papatte(spriteSheet);
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext('2d');
    playIntro (ctx);
    
    window.addEventListener('keydown', makeHandleKeyDown, false);
    window.addEventListener('keyup', makehandleKeyUp, false);
    
    
        //pour le touchScreen
    canvas.addEventListener("touchstart", handleStart, false);
    canvas.addEventListener("touchend", handleEnd, false);
    canvas.addEventListener("touchleave", handleEnd, false);
    canvas.addEventListener("touchmove", handleMove, false);
    
}

function handleStart (evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;
    touchPosXPaw = touches[0].pageX - canvas.offsetLeft;
    var x = touches[0].pageX - canvas.offsetLeft;
    var y = touches[0].pageY - canvas.offsetTop;
    
    //Lancement du jeu
    if (!isIntroPlayed) {
        showInstructions(ctx, background, papatte);
        isIntroPlayed = true;
        if (firstTime) {
            firstTime = false;
            var son = document.getElementById("DialNeutral");
            son.play();
        }
    }
    
    //est sur la papatte
    fisOnPaw(x, y)
    
    //son
    if (!isTouchScreen && isIntroPlayed) {
        var offX = sizeConfig.sounds.offsetX;
	    var offY = sizeConfig.sounds.offsetY;
	    var canvasWidth = sizeConfig.canvasWidth;
	    if(x >=offX && x <= canvasWidth && y >= offY && y <= canvasWidth) {
	        pauseOrRestartsound();
	    }
    }
}

function handleEnd (evt) {
    evt.preventDefault();
    touchPosXPaw = -1;
    isOnPaw = false;
    if (papatte.isActive())
        papatte.state = States.STILL;
}



function handleKeyUpWhileIntro (evt) {
    switch (evt.keyCode) {
        case 13:
        showInstructions(ctx, background, papatte);
        isIntroPlayed = true;
        if (firstTime) {
            firstTime = false;
            var son = document.getElementById("DialNeutral");
            son.play();
        }
        break;
        }
}

function startGame () {
    drawInterval = setInterval(function () {drawElements (ctx);}, 80);
    createObjInterval = setInterval(createFallenObjects, 800);
    createTackInterval = setInterval(createTacks, 800);
}

function makeHandleKeyDown(evt) {
    if (isIntroPlayed)
        if (papatte.isActive())
            handleKeyDown (evt, papatte);
}

function makehandleKeyUp(evt) {
    if (!isIntroPlayed)
        handleKeyUpWhileIntro (evt);
    else
        if(papatte.isActive())
            handleKeyUp (evt, papatte);
}

function createFallenObjects() {
    if(papatte.isAlive())
         manageFallenObjects(listFallenObject, latestXPos, ixlatestXPos);
}

function createTacks() {
    if(papatte.isAlive())
        manageTacks(listTack, latestTackXPos, ixlatestTackXPos);
    
}

function drawElements (ctx){
    var marginHeight = sizeConfig.heightUpMargin;
    var GameZoneHeight = sizeConfig.heightGameZone;
    var canvasWidth = sizeConfig.canvasWidth;

    var listSuppression = [];
    
    var listTackSuppression = [];
    
    ctx.clearRect(0,0, canvasWidth, canvasWidth);
    ctx.drawImage(background,0,marginHeight,canvasWidth, GameZoneHeight);
    papatte.draw(ctx);
    if(papatte.isActive()){
        calculateScore(papatte, listFallenObject, listSuppression);
        calculateLife(papatte, listTack, listTackSuppression, ctx);
    }
    drawFallenObjects(ctx, listFallenObject, listSuppression);
    
    for (var k = 0; k < listSuppression.length; k++) {
        listFallenObject[listSuppression[k]] = listFallenObject[listFallenObject.length -1];
        delete listFallenObject[listFallenObject.length -1];
        listFallenObject.length--;
    }
    
    
    //Tacks
    drawTacks(ctx, listTack, listTackSuppression);

    for (var v = 0; v < listTackSuppression.length; v++) {
        listTack[listTackSuppression[v]] = listTack[listTack.length -1];
        delete listTack[listTack.length -1];
        listTack.length--;
    }
    
    ctx.fillStyle = '#323232';
    ctx.fillRect(0, marginHeight + GameZoneHeight, canvasWidth, marginHeight);
    ctx.fillRect(0, 0, canvasWidth, marginHeight);
    papatte.drawLife(ctx);
    drawScore (ctx);
    if (papatte.lifes == 0 && !isgameStopped) {
        isgameStopped = true;
        stopGame(ctx, drawInterval, createObjInterval, createTackInterval, background);
    }
}


window.onload = function() {
    initialiser ();

}
