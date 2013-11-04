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
    background.src = '../img/Usine main acc.jpg';
    coton.src = '../img/coton.png';
    pelote.src = '../img/pelote.png'
    polystyrene.src = '../img/poly.png'
    punaise.src = '../img/punaises.png'
    spriteSheet.src = '../img/papattes-sprite.png';
    window.addEventListener('keydown', makeHandleKeyDown, false);
    window.addEventListener('keyup', makehandleKeyUp, false);
    papatte = new Papatte(spriteSheet);
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext('2d');
    playIntro (ctx);
    
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
    drawInterval = setInterval(function () {drawElements (ctx);},80);
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

    var listSuppression = [];
    
    var listTackSuppression = [];
    
    ctx.clearRect(0,0, 800, 800);
    ctx.drawImage(background,0,46,800, 708);
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
    ctx.fillRect(0, 754, 800, 46);
    ctx.fillRect(0, 0, 800, 46);
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
