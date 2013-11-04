var Types = {
    COTON: 1,
    POLYSTYRENE:2,
    PELOTE: 3
}

var FallenObject = function(latestXPos) {
//Tirages aléatoires

this.posX = calculateXPos (latestXPos);  
this.posY = 46;
this.type = Math.floor((Math.random()*3)+1); 
this.speed = this.type *15 + 5; //Math.floor((Math.random()*50)+21);
}

function calculateXPos (latestXPos) {
    var x =  Math.floor((Math.random()*700)+1);
    for (var j = 0; j < latestXPos.length; j++) {
        if (((x>= latestXPos[j]) && (x <= (latestXPos[j] +100))) || ((latestXPos[j]>= x) && (latestXPos[j] <= (x +100)))) {
            x = x +100;
            if (x > 700)
                x = 0;
        }
    }
    return x;
}

function manageFallenObjects(listFallenObject, latestXPos, ixlatestXPos) {
    var tirage = Math.floor((Math.random()*100)+1);
    var dateBis = new Date();
    var tempsEcoule = (dateBis.valueOf() - dateDeb.valueOf()) / 1000;
    var proba = 0;
    if (tempsEcoule < 150)
        proba = 30;
    else
        proba = 20;
    //console.log(tempsEcoule);
    if (tirage > proba)
    {
        var obj = new FallenObject(latestXPos);
        listFallenObject.push(obj);
        latestXPos[ixlatestXPos] = obj.posX;
        ixlatestXPos++;
        if (ixlatestXPos >= 3)
            ixlatestXPos =0
    }
}

function putIfNotAlreadyInList(val, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] == val)
            return false;
    }
    list.push(val);
    return true;
}


function drawFallenObjects(ctx, listFallenObject, listSuppression) {
    for (var j = 0; j < listFallenObject.length; j++) {
        var obj = listFallenObject[j]
        switch (obj.type)
        {
            case Types.COTON:
            ctx.drawImage(coton,obj.posX,obj.posY, 100, 92);
            obj.posY = obj.posY + obj.speed;
            if (obj.posY > 670) {
                //listSuppression.push(j);
                if (putIfNotAlreadyInList(j, listSuppression))
                    resetCombo();
            }
            break;
            case Types.POLYSTYRENE:
            ctx.drawImage(polystyrene,obj.posX,obj.posY, 100, 70);
            obj.posY = obj.posY + obj.speed;
            if (obj.posY > 684) {
                //listSuppression.push(j);
                if (putIfNotAlreadyInList(j, listSuppression))
                    resetCombo();
            }
            break;
            case Types.PELOTE:
            ctx.drawImage(pelote,obj.posX,obj.posY, 100, 115);
            obj.posY = obj.posY + obj.speed;
            //639
            if (obj.posY > 649) {
                //listSuppression.push(j);
                if (putIfNotAlreadyInList(j, listSuppression))
                    resetCombo();
            }
            break;
        }
    }
}
