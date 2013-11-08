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
    var dimSpool = sizeConfig.scoreBanner.spool;
    var dimMulti = sizeConfig.scoreBanner.multiplier;
    ctx.drawImage(bobine, dimSpool.offsetX, dimSpool.offsetY, dimSpool.width, dimSpool.height);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = sizeConfig.scoreBanner.fontSize + ' Love Ya Like A Sister, cursive';
    ctx.textAlign = 'right';
    ctx.fillText (score, sizeConfig.scoreBanner.score.offsetX, sizeConfig.scoreBanner.score.offsetY);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#5E52BB';
    ctx.fillText ('Combo: ' +combo, sizeConfig.scoreBanner.combo.offsetX, sizeConfig.scoreBanner.combo.offsetY);
    switch (multiplier)
    {
        case Multipliers.DOUBLE:
        ctx.drawImage(bronze, dimMulti.offsetX, dimMulti.offsetY, dimMulti.width, dimMulti.height);
        ctx.fillStyle = '#9A451E';
        ctx.fillText ('x2', dimMulti.textOffsetX, dimMulti.textOffsetY);
        break;
        case Multipliers.TRIPLE:
        ctx.drawImage(silver, dimMulti.offsetX, dimMulti.offsetY, dimMulti.width, dimMulti.height);
        ctx.fillStyle = '#958983';
        ctx.fillText ('x3', dimMulti.textOffsetX, dimMulti.textOffsetY);
        break;
        case Multipliers.QUINTUPLE:
        ctx.drawImage(gold, dimMulti.offsetX, dimMulti.offsetY, dimMulti.width, dimMulti.height);
        ctx.fillStyle = '#D19D30';
        ctx.fillText ('x5', dimMulti.textOffsetX, dimMulti.textOffsetY);
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
    var yPaw = sizeConfig.heightGameZone + sizeConfig.heightUpMargin - sizeConfig.paws.height;
    var widthPaw = sizeConfig.paws.width;
    var halfWidthFallenObjects = sizeConfig.fallenObjects.width/2;
    if (combo >= 10)
        multiplier = Multipliers.DOUBLE;
    if (combo >= 20)
        multiplier = Multipliers.TRIPLE;
    if (combo >= 30)
        multiplier = Multipliers.QUINTUPLE;
    for (var j = 0; j < listFallenObject.length; j++) {
         var obj = listFallenObject[j];
         if (obj.posY >= yPaw) {
            if ((( (obj.posX +halfWidthFallenObjects) >= papatte.posX) && ((obj.posX +halfWidthFallenObjects) <= (papatte.posX+widthPaw)))) {
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
    var yPaw = sizeConfig.heightGameZone + sizeConfig.heightUpMargin - sizeConfig.paws.height;
    var widthPaw = sizeConfig.paws.width;
    if (!papatte.isImmune()){
        var lostlife = false;
        for (var j = 0; j < listTack.length; j++) {
             var obj = listTack[j];
             if (obj.posY >= yPaw) {
                if ((( (obj.posX +50) >= papatte.posX) && ((obj.posX +50) <= (papatte.posX+widthPaw)))) {
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
            var qqch = son2.play(); console.log(son2); console.log(qqch);}, 300);
            

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
    ctx.fillRect(0, 0, sizeConfig.canvasWidth, sizeConfig.canvasWidth);
    ctx.font = sizeConfig.gameOver.txtGameOverSize + ' Love Ya Like A Sister, cursive';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    var msg = 'Game Over';
    var textSize = ctx.measureText (msg);
    var xCoord = (sizeConfig.canvasWidth - textSize.width) / 2;
    ctx.fillText (msg, xCoord, sizeConfig.gameOver.txtGameOverY);
    ctx.font = sizeConfig.gameOver.txtRestartSize + ' Love Ya Like A Sister, cursive';
    var msgBis = "Press 'Enter' to play again.";
    textSize = ctx.measureText (msgBis);
    xCoord = (sizeConfig.canvasWidth - textSize.width) / 2;
    ctx.fillText (msgBis, xCoord, sizeConfig.gameOver.txtRestartY);
    isIntroPlayed = false;
    drawProgressiveTitle (ctx, 0, background);

}

function completeRedraw(ctx, background) {
    var marginHeight = sizeConfig.heightUpMargin;
    var GameZoneHeight = sizeConfig.heightGameZone;
    var canvasWidth = sizeConfig.canvasWidth;
    ctx.clearRect(0,0, canvasWidth, canvasWidth);
    ctx.drawImage(background,0, marginHeight, canvasWidth, GameZoneHeight);
    papatte.draw(ctx);
    ctx.fillStyle = '#323232';
    ctx.fillRect(0, GameZoneHeight+marginHeight, canvasWidth, marginHeight);
    ctx.fillRect(0, 0, canvasWidth, marginHeight);
    papatte.drawLife(ctx);
    drawScore (ctx);
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(0, 0, sizeConfig.canvasWidth, sizeConfig.canvasWidth);
    ctx.font = sizeConfig.gameOver.txtGameOverSize + ' Love Ya Like A Sister, cursive';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    var msg = 'Game Over';
    var textSize = ctx.measureText (msg);
    var xCoord = (sizeConfig.canvasWidth - textSize.width) / 2;
    ctx.fillText (msg, xCoord, sizeConfig.gameOver.txtGameOverY);
    ctx.font = sizeConfig.gameOver.txtRestartSize + ' Love Ya Like A Sister, cursive';
    var msgBis = "Press 'Enter' to play again.";
    if (isTouchScreen)
        msgBis = "Touch screen to play again.";
    textSize = ctx.measureText (msgBis);
    xCoord = (sizeConfig.canvasWidth - textSize.width) / 2;
    ctx.fillText (msgBis, xCoord, sizeConfig.gameOver.txtRestartY);
}

function drawProgressiveTitle (ctx, counter, background) {
    if (!isIntroPlayed) {
        if (counter <= 1){
            //Conf coord
            var xAch = sizeConfig.achievement.offsetX;
            var yAch =  sizeConfig.achievement.offsetY;
            var widthAch = sizeConfig.achievement.width;
            var heightAch = sizeConfig.achievement.height;
            var fontSizeScore = sizeConfig.achievement.fontSizeScore;
            var yTextAch = sizeConfig.achievement.offsetYText;
        
            completeRedraw(ctx, background);
             ctx.save();
             ctx.font = fontSizeScore+' Love Ya Like A Sister, cursive';
             ctx.fillStyle = "rgb(255,255,255)";
            ctx.globalAlpha = counter;
            var msg ="Final score: "+score;
            if (score < 1000)
                ctx.drawImage(heavy, xAch, yAch, widthAch, heightAch);
            else if (score < 2500) {
                ctx.fillStyle = '#4C1B1B';
                ctx.drawImage(sewIt,xAch, yAch, widthAch, heightAch);
                }
            else if (score < 4000)
                ctx.drawImage(cottonJoe, xAch, yAch, widthAch, heightAch);

            else {
                ctx.drawImage(serialKnitter, xAch, yAch, widthAch, heightAch);
                ctx.fillStyle = '#40411E';
            }
            var textSize = ctx.measureText (msg);
            var xCoord = (sizeConfig.canvasWidth/2) - (textSize.width / 2);
            ctx.fillText (msg, xCoord, yTextAch);
            setTimeout(function () {drawProgressiveTitle (ctx, counter+0.05, background);},100);
            ctx.restore();
            
        }
    }
}

