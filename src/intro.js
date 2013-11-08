var intro = new Image();
var introBis = new Image();
var title = new Image();
intro.src = '../img/Monstre-intro.png';
introBis.src = '../img/Monstre-intro-touch.png';
title.src = '../img/titre.png';

function playIntro (ctx) {
    var canvasWidth = sizeConfig.canvasWidth;
    var dimImg = sizeConfig.intro.img;
    var dimTitle = sizeConfig.intro.title;
    
    ctx.fillStyle = '#e2ddd7';
    ctx.fillRect(0, 0, canvasWidth, canvasWidth);
    if (isTouchScreen)
        ctx.drawImage(introBis, dimImg.offsetX, dimImg.offsetY, dimImg.width, dimImg.height);
    else
        ctx.drawImage(intro, dimImg.offsetX, dimImg.offsetY, dimImg.width, dimImg.height);

     ctx.drawImage(title, dimTitle.offsetX, dimTitle.offsetY, dimTitle.width, dimTitle.height);
    //hack
    ctx.font = '25px Love Ya Like A Sister, cursive';
    ctx.fillText ("", 0, 0);
}


function showInstructions(ctx, background, papatte) {
    var fleches = new Image();
    fleches.src = '../img/fleches.png';
    fleches.onload = function() {
        gameReset();
        showInstructionsRec(ctx, background, papatte, 1, fleches);
    }
}

function gameReset() {
        score = 0;
        combo = 0;
        papatte.lifes = 3;
        papatte.isWell = true;
        papatte.hurtCount = 0;
        papatte.immuneCount = 0;
        isgameStopped = false;
        multiplier = Multipliers.NONE;
        dateDeb = new Date();
        listTack = [];
        latestTackXPos = [];
        ixlatestTackXPos = 0;
        listFallenObject = [];
        latestXPos = [];
        ixlatestXPos = 0;

}

function showInstructionsRec(ctx, background, papatte, counter, fleches) {
        var marginHeight = sizeConfig.heightUpMargin;
        var GameZoneHeight = sizeConfig.heightGameZone;
        var canvasWidth = sizeConfig.canvasWidth;
        var dimArrows = sizeConfig.intro.arrows;
        var dimDir = sizeConfig.intro.directions;
        
        ctx.clearRect(0,0, canvasWidth, canvasWidth);
        ctx.drawImage(background,0,marginHeight,canvasWidth, GameZoneHeight);
        papatte.draw(ctx);
        ctx.fillStyle = '#323232';
        ctx.fillRect(0, marginHeight + GameZoneHeight, canvasWidth, marginHeight);
        ctx.fillRect(0, 0, canvasWidth, marginHeight);
        papatte.drawLife(ctx);
        drawScore (ctx);
        drawSound(ctx)
        
        ctx.drawImage(fleches, 0, 0, 100, 100, dimArrows.offsetXArr1, dimArrows.offsetYArr1, dimArrows.width, dimArrows.height);
        ctx.drawImage(fleches, 100, 0, 100, 100, dimArrows.offsetXArr2, dimArrows.offsetYArr2, dimArrows.width, dimArrows.height);
        ctx.drawImage(fleches, 0, 100, 100, 100, dimArrows.offsetXArr3, dimArrows.offsetYArr3, dimArrows.width, dimArrows.height);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillStyle = "rgba(255,255,255,"+counter+")";
        ctx.font = dimArrows.sizeFont+ ' Love Ya Like A Sister, cursive';
        ctx.textAlign = 'left';
        ctx.fillText ("Score", dimArrows.offsetXArr1Txt, dimArrows.offsetYArr1Txt);
        ctx.fillText ("Combo", dimArrows.offsetXArr2Txt, dimArrows.offsetYArr2Txt);
        ctx.fillText ("Lives", dimArrows.offsetXArr3Txt, dimArrows.offsetYArr3Txt);
        ctx.font = dimDir.sizeFont + ' Love Ya Like A Sister, cursive';
        var msg1 = "Grab cotton, polystyrene and balls of wool.";
        var textSize = ctx.measureText (msg1);
        var xCoord = (canvasWidth - textSize.width) / 2;
        ctx.fillText (msg1, xCoord, dimDir.offsetY1);
        var msg2 = "Avoid the tacks!";
        textSize = ctx.measureText (msg2);
        xCoord = (canvasWidth - textSize.width) / 2;
        ctx.fillText (msg2, xCoord, dimDir.offsetY2);

        if (counter <= 0.05)
            startGame();
        else
            setTimeout(function () {showInstructionsRec(ctx, background, papatte, counter - 0.05 , fleches);},100);
}
