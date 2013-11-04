
var Tack = function(latestXPos) {
//Tirages aléatoires

this.posX = calculateXPos (latestXPos); 
this.speed = Math.floor((Math.random()*60)+21); 
this.posY = 46;
}



function calculateTackXPos (latestTackXPos) {
    var x = Math.floor((Math.random()*700)+1);
    for (var j = 0; j < latestXPos.length; j++) {
        if (((x>= latestXPos[j]) && (x <= (latestXPos[j] +100))) || ((latestXPos[j]>= x) && (latestXPos[j] <= (x +100)))) {
            x = x +100;
            if (x > 700)
                x = 0;
        }
    }
    
    return x;
}


function manageTacks(listTack, latestTackXPos, ixlatestTackXPos) {
    var tirage = Math.floor((Math.random()*100)+1);
    var dateBis = new Date();
    var tempsEcoule = (dateBis.valueOf() - dateDeb.valueOf()) / 1000;
    var proba = 0;
    if (tempsEcoule < 30)
        proba = 95;
    else if (tempsEcoule < 80)
        proba = 85;
    else if (tempsEcoule < 150)
        proba = 75;
    else if (tempsEcoule < 250)
        proba = 55;
    else if (tempsEcoule < 300)
        proba = 35;
    else if (tempsEcoule < 350)
        proba = 20;
    else
        proba = 0;
    if (tirage > proba)
    {
        var obj = new Tack(latestTackXPos);
        listTack.push(obj);
        latestTackXPos[ixlatestTackXPos] = obj.posX;
        ixlatestTackXPos++;
        if (ixlatestTackXPos >= 3)
            ixlatestTackXPos =0
    }
}

function drawTacks(ctx, listTack, listTackSuppression) {
    for (var u = 0; u < listTack.length; u++) {
                    var tack = listTack[u];
                    ctx.drawImage(punaise,tack.posX,tack.posY, 100, 100);
                        tack.posY = tack.posY + tack.speed;
                        if (tack.posY > 654) {
                            listTackSuppression.push(u);
                        }
                }
}
