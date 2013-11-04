var intro = new Image();
var title = new Image();
intro.src = '../img/Monstre-intro.png';
title.src = '../img/titre.png';

function playIntro (ctx) {
                ctx.fillStyle = '#e2ddd7';
                ctx.fillRect(0, 0, 800, 800);
                ctx.drawImage(intro,0, 200, 800, 677);
                ctx.drawImage(title,76, 0, 649, 227);
                ctx.font = '25px Love Ya Like A Sister, cursive';
                //patch
                ctx.fillText ("", 0, 0);
}


function showInstructions(ctx, background, papatte) {
    var fleches = new Image();
    fleches.src = '../img/fleches.png';
    fleches.onload = function() {
        /*var son = document.getElementById("testMusique");
        son.loop = true;
        son.play();*/
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
        ctx.clearRect(0,0, 800, 800);
        ctx.drawImage(background,0,46,800, 708);
        papatte.draw(ctx);
        ctx.fillStyle = '#323232';
        ctx.fillRect(0, 754, 800, 46);
        ctx.fillRect(0, 0, 800, 46);
        papatte.drawLife(ctx);
        drawScore (ctx);
        drawSound(ctx)
        
        ctx.drawImage(fleches, 0, 0, 100, 100, 100, 40, 100, 100);
        ctx.drawImage(fleches, 100, 0, 100, 100, 670, 40, 100, 100);
        ctx.drawImage(fleches, 0, 100, 100, 100, 100, 650, 100, 100);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillStyle = "rgba(255,255,255,"+counter+")";
        ctx.font = '25px Love Ya Like A Sister, cursive';
        ctx.textAlign = 'left';
        ctx.fillText ("Score", 200, 120);
        ctx.fillText ("Combo", 605, 120);
        ctx.fillText ("Lives", 190, 685);
        ctx.font = '35px Love Ya Like A Sister, cursive';
        var msg1 = "Grab cotton, polystyrene and balls of wool.";
        var textSize = ctx.measureText (msg1);
        var xCoord = 400 - (textSize.width / 2);
        ctx.fillText (msg1, xCoord, 380);
        var msg2 = "Avoid the tacks!";
        textSize = ctx.measureText (msg2);
        xCoord = 400 - (textSize.width / 2);
        ctx.fillText (msg2, xCoord, 430);

        if (counter <= 0.05)
            startGame();
        else
            setTimeout(function () {showInstructionsRec(ctx, background, papatte, counter - 0.05 , fleches);},100);
}
