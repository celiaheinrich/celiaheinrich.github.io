var Types = {
    COTON: 1,
    POLYSTYRENE:2,
    PELOTE: 3
}

var FallenObject = function(latestXPos) {
//Tirages aléatoires

this.posX = calculateXPos (latestXPos);  
this.posY = sizeConfig.heightUpMargin;
this.type = Math.floor((Math.random()*3)+1); 
this.speed = this.type *sizeConfig.fallenObjects.speedMulti + sizeConfig.fallenObjects.speedConst; //Math.floor((Math.random()*50)+21);
}

function calculateXPos (latestXPos) {
    var widthObj = sizeConfig.fallenObjects.width;
    var zone = sizeConfig.canvasWidth - widthObj;
    var x =  Math.floor((Math.random()*zone)+1);
    for (var j = 0; j < latestXPos.length; j++) {
        if (((x>= latestXPos[j]) && (x <= (latestXPos[j] +widthObj))) || ((latestXPos[j]>= x) && (latestXPos[j] <= (x +widthObj)))) {
            x = x +widthObj;
            if (x > zone)
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
    var widthObj = sizeConfig.fallenObjects.width;
    var bottomLine = sizeConfig.heightGameZone + sizeConfig.heightUpMargin;
    for (var j = 0; j < listFallenObject.length; j++) {
        var obj = listFallenObject[j]
        switch (obj.type)
        {
            case Types.COTON:
            var cotonHeight = sizeConfig.fallenObjects.cotonHeight;
            ctx.drawImage(coton,obj.posX,obj.posY, widthObj, cotonHeight);
            obj.posY = obj.posY + obj.speed;
            if (obj.posY > (bottomLine - cotonHeight + sizeConfig.fallenObjects.cotonHShift)) {
                //listSuppression.push(j);
                if (putIfNotAlreadyInList(j, listSuppression))
                    resetCombo();
            }
            break;
            case Types.POLYSTYRENE:
            var polystyreneHeight = sizeConfig.fallenObjects.polystyreneHeight;
            ctx.drawImage(polystyrene,obj.posX,obj.posY, widthObj, polystyreneHeight);
            obj.posY = obj.posY + obj.speed;
            if (obj.posY > (bottomLine - polystyreneHeight + sizeConfig.fallenObjects.polystyreneShift)) {
                //listSuppression.push(j);
                if (putIfNotAlreadyInList(j, listSuppression))
                    resetCombo();
            }
            break;
            case Types.PELOTE:
            
            var peloteHeight = sizeConfig.fallenObjects.peloteHeight;
            ctx.drawImage(pelote,obj.posX,obj.posY, widthObj, peloteHeight);
            obj.posY = obj.posY + obj.speed;
            //639
            if (obj.posY > (bottomLine - peloteHeight + sizeConfig.fallenObjects.peloteShift)) {
                //listSuppression.push(j);
                if (putIfNotAlreadyInList(j, listSuppression))
                    resetCombo();
            }
            break;
        }
    }
}
