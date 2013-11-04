var Scores = {
    COTON: 5,
    POLYSTYRENE: 8,
    PELOTE: 15
}

var Multipliers = {
    NONE : 1,
    DOUBLE: 2,
    TRIPLE:3,
    QUINTUPLE: 5
}

var bobine = new Image();
var bronze = new Image();
var silver = new Image();
var gold = new Image();
bobine.src = '../img/bobine.png';
bronze.src = '../img/machine-a-coudre-fusion-bronze.png';
silver.src = '../img/machine-a-coudre-fusion-silver.png';
gold.src = '../img/machine-a-coudre-fusion-gold.png';

var heavy = new Image();
var sewIt = new Image();
var cottonJoe = new Image();
var serialKnitter = new Image();
heavy.src = '../img/heavy-handed.png';
sewIt.src = '../img/sewit.png';
cottonJoe.src = '../img/joe.png';
serialKnitter.src = '../img/knitter.png';

var score = 0;
var combo = 0;
var multiplier = Multipliers.NONE;



function drawScore (ctx) {
    ctx.drawImage(bobine, 5, 2, 45, 45);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '30px Love Ya Like A Sister, cursive';
    ctx.textAlign = 'right';
    ctx.fillText (score, 170, 30);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#5E52BB';
    ctx.fillText ('Combo: ' +combo, 650, 30);
    switch (multiplier)
    {
        case Multipliers.DOUBLE:
        ctx.drawImage(bronze, 500, 0, 63, 48);
        ctx.fillStyle = '#9A451E';
        ctx.fillText ('x2', 570, 30);
        break;
        case Multipliers.TRIPLE:
        ctx.drawImage(silver, 500, 2, 63, 48);
        ctx.fillStyle = '#958983';
        ctx.fillText ('x3', 570, 30);
        break;
        case Multipliers.QUINTUPLE:
        ctx.drawImage(gold, 500, 2, 63, 48);
        ctx.fillStyle = '#D19D30';
        ctx.fillText ('x5', 570, 30);
        break;
    }
}

function resetCombo (){
    combo = 0;
    multiplier = Multipliers.NONE
}

function incrCombo (){
    combo++;
    if (combo == 10 || combo == 20 || combo == 30) {
        var son = document.getElementById("DialCombo");
        son.play();
    }
}

function calculateScore(papatte, listFallenObject, listSuppression) {
    if (combo >= 10)
        multiplier = Multipliers.DOUBLE;
    if (combo >= 20)
        multiplier = Multipliers.TRIPLE;
    if (combo >= 30)
        multiplier = Multipliers.QUINTUPLE;
    for (var j = 0; j < listFallenObject.length; j++) {
         var obj = listFallenObject[j];
         if (obj.posY >= 504) {
            if ((( (obj.posX +50) >= papatte.posX) && ((obj.posX +50) <= (papatte.posX+250)))) {
                switch (obj.type)
                    {
                        case Types.COTON:
                        listSuppression.push(j);
                        score += Scores.COTON * multiplier;
                        incrCombo ();
                        break;
                        case Types.POLYSTYRENE:
                        listSuppression.push(j);
                        score += Scores.POLYSTYRENE * multiplier;
                        incrCombo ();
                        break;
                        case Types.PELOTE:
                        listSuppression.push(j);
                        score += Scores.PELOTE * multiplier;
                        incrCombo ();
                        break;
                    }
                /*var sonPlop = document.getElementById("FXObj");
                sonPlop.play();*/
                createPlop ();
            }
         }
    }
}

function calculateLife(papatte, listTack, listTackSuppression, ctx) {
    if (!papatte.isImmune()){
        var lostlife = false;
        for (var j = 0; j < listTack.length; j++) {
             var obj = listTack[j];
             if (obj.posY >= 504) {
                if ((( (obj.posX +50) >= papatte.posX) && ((obj.posX +50) <= (papatte.posX+250)))) {
                    lostlife = true;
                    resetCombo();
                    listTackSuppression.push(j);
                }
             }
        }
        if (lostlife && papatte.lifes > 0) {
            var son = document.getElementById("FXScratch");
            son.play();
            papatte.lifes = papatte.lifes-1;
            papatte.isWell = false;
            papatte.state = States.HURT_BEG;
            setTimeout(function () {var son2 = document.getElementById("DialHurt");
            son2.play();}, 300);
            

        }
    }
}

function stopGame(ctx, drawInterval, createObjInterval, createTackInterval, background) {
    
    setTimeout(function () {drawGameOver(ctx, drawInterval, createObjInterval, createTackInterval, background)}, 1200);

}

function drawGameOver(ctx, drawInterval, createObjInterval, createTackInterval, background) {
    clearInterval(drawInterval);
    clearInterval(createObjInterval);
    clearInterval(createTackInterval);
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(0, 0, 800, 800);
    ctx.font = '70px Love Ya Like A Sister, cursive';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    var msg = 'Game Over';
    var textSize = ctx.measureText (msg);
    var xCoord = 400 - (textSize.width / 2);
    ctx.fillText (msg, xCoord, 450);
    ctx.font = '50px Love Ya Like A Sister, cursive';
    var msgBis = "Press 'Enter' to play again.";
    textSize = ctx.measureText (msgBis);
    xCoord = 400 - (textSize.width / 2);
    ctx.fillText (msgBis, xCoord, 550);
    isIntroPlayed = false;
    drawProgressiveTitle (ctx, 0, background);

}

function completeRedraw(ctx, background) {
    ctx.clearRect(0,0, 800, 800);
    ctx.drawImage(background,0,46,800, 708);
    papatte.draw(ctx);
    ctx.fillStyle = '#323232';
    ctx.fillRect(0, 754, 800, 46);
    ctx.fillRect(0, 0, 800, 46);
    papatte.drawLife(ctx);
    drawScore (ctx);
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(0, 0, 800, 800);
    ctx.font = '70px Love Ya Like A Sister, cursive';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    var msg = 'Game Over';
    var textSize = ctx.measureText (msg);
    var xCoord = 400 - (textSize.width / 2);
    ctx.fillText (msg, xCoord, 450);
    ctx.font = '50px Love Ya Like A Sister, cursive';
    var msgBis = "Press 'Enter' to play again.";
    textSize = ctx.measureText (msgBis);
    xCoord = 400 - (textSize.width / 2);
    ctx.fillText (msgBis, xCoord, 550);
}

function drawProgressiveTitle (ctx, counter, background) {
    if (!isIntroPlayed) {
        if (counter <= 1){
            completeRedraw(ctx, background);
             ctx.save();
             ctx.font = '20px Love Ya Like A Sister, cursive';
             ctx.fillStyle = "rgb(255,255,255)";
            ctx.globalAlpha = counter;
            var msg ="Final score: "+score;
            if (score < 1000)
                ctx.drawImage(heavy, 80, 30, 600, 300);
            else if (score < 2500) {
                ctx.fillStyle = '#4C1B1B';
                ctx.drawImage(sewIt, 80, 30, 600, 300);
                }
                //msg = "Week-end Ms Sew-It";
            else if (score < 4000)
                ctx.drawImage(cottonJoe, 80, 30, 600, 300);
                //msg = "Cotton-handed Joe";
            else {
                ctx.drawImage(serialKnitter, 80, 30, 600, 300);
                ctx.fillStyle = '#40411E';
            }
                //msg = "Serial knitter";
            var textSize = ctx.measureText (msg);
            var xCoord = 400 - (textSize.width / 2);
            ctx.fillText (msg, xCoord, 268);
            setTimeout(function () {drawProgressiveTitle (ctx, counter+0.05, background);},100);
            ctx.restore();
            
        }
    }
}

