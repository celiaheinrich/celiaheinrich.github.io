var sizeConfig;
var isTouchScreen = false;
var touchPosXPaw = -1;
var isOnPaw = false;

var isPhone = {
    Android: function() {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function() {
        return (isPhone.Android() || isPhone.BlackBerry() || isPhone.iOS() || isPhone.Windows());
    }
};




function createCanvas (){
    
    var w = window.screen.availWidth;//window.innerWidth;
    var h = window.screen.availHeight;//window.innerHeight;
    var minDim = (w<h)? w :h;
    if (minDim > 900)
        sizeConfig = configMax;
    else if (minDim > 600)
        sizeConfig = configMedium;
    else {
        sizeConfig = configMin;
   }
    var c = document.createElement('canvas');
    var content = document.getElementById("content");
    c.id= 'gameCanvas';
    c.width = sizeConfig.canvasWidth;
    c.height = sizeConfig.canvasWidth;
    content.appendChild(c);
    
    if (isPhone.any()) {
        c.style.top = (window.innerHeight-sizeConfig.canvasWidth)/2+'px';
        c.style.left = (window.innerWidth-sizeConfig.canvasWidth)/2+'px';
        isTouchScreen = true;
        isMute = true;
    }
}

var configMax = {
    "canvasWidth": 800,
    "heightGameZone" : 708,
    "heightUpMargin" : 46,
    "intro" :
    {
        "img" :
        {
            "width" : 800,
            "height" : 677,
            "offsetX" : 0,
            "offsetY" : 200
        },
        "title" :
        {
            "width" : 649,
            "height" : 227,
            "offsetX" : 76,
            "offsetY" : 0
        },
        "arrows" :
        {
            "width" : 100,
            "height" : 100,
            "offsetXArr1" : 100,
            "offsetYArr1" : 40,
            "offsetXArr2" : 670,
            "offsetYArr2" : 40,
            "offsetXArr3" : 100,
            "offsetYArr3" : 650,
            "offsetXArr1Txt" : 200,
            "offsetYArr1Txt" : 120,
            "offsetXArr2Txt" : 605,
            "offsetYArr2Txt" : 120,
            "offsetXArr3Txt" : 190,
            "offsetYArr3Txt" : 685,
            "sizeFont" : "25px"
        },
        "directions" :
        {
            "sizeFont" : "35px",
            "offsetY1" : 380,
            "offsetY2" : 430
        }
    },
    "achievement" : 
    {
        "width" : 600,
        "height" : 300,
        "offsetX" : 80,
        "offsetY" : 30,
        "fontSizeScore" : "20px",
        "offsetYText" : 268
    },
    "gameOver" :
    {
        "txtGameOverSize" : "70px",
        "txtGameOverY" : 450,
        "txtRestartSize" : "50px",
        "txtRestartY" : 550
    },
    "sounds" :
    {
        "width" : 50,
        "height" : 42,
        "offsetX" : 750,
        "offsetY" : 758
    },
    "scoreBanner" :
    {
        "spool" :
        {
            "width" : 45,
            "height" : 45,
            "offsetX" : 5,
            "offsetY" : 2
        },
        "fontSize" : "30px",
        "score" : 
        {
            "offsetX" : 170,
            "offsetY" : 30
        },
        "combo" :
        {
            "offsetX" : 650,
            "offsetY" : 30
        },
        "multiplier" :
        {
            "width" : 63,
            "height" : 48,
            "offsetX" : 500,
            "offsetY" : 2,
            "textOffsetX" : 570,
            "textOffsetY" : 30
        }
        
    },
    "lives" :
    {
        "offsetX" : 5,
        "width" : 50,
        "height" : 42,
        "directionFontSize" : "30px",
        "directionOffsetX" : 620,
        "directionShiftY" : 28
    },
    "paws" :
    {
        "width" : 250,
        "height" : 250,
        "leftBound" : -10,
        "rightBound" : 570,
        "speed" : 50
    },
    "fallenObjects" :
    {
        "width" : 100,
        "cotonHeight" : 92,
        "polystyreneHeight" : 70,
        "peloteHeight" : 115,
        "cotonHShift" : 8,
        "polystyreneShift" : 0,
        "peloteShift" : 10,
        "speedMulti": 15,
        "speedConst" : 5
    },
    "tack" :
    {
        "width" : 100,
        "height" : 100,
        "speedMulti": 60,
        "speedConst" : 21
    }
}

var configMedium = {
    "canvasWidth": 600,
    "heightGameZone" : 532,
    "heightUpMargin" : 34,
    "intro" :
    {
        "img" :
        {
            "width" : 600,
            "height" : 508,
            "offsetX" : 0,
            "offsetY" : 150
        },
        "title" :
        {
            "width" : 487,
            "height" : 170,
            "offsetX" : 57,
            "offsetY" : 0
        },
        "arrows" :
        {
            "width" : 75,
            "height" : 75,
            "offsetXArr1" : 75,
            "offsetYArr1" : 30,
            "offsetXArr2" : 502,
            "offsetYArr2" : 30,
            "offsetXArr3" : 75,
            "offsetYArr3" : 487,
            "offsetXArr1Txt" : 150,
            "offsetYArr1Txt" : 90,
            "offsetXArr2Txt" : 454,
            "offsetYArr2Txt" : 90,
            "offsetXArr3Txt" : 142,
            "offsetYArr3Txt" : 514,
            "sizeFont" : "19px"
        },
        "directions" :
        {
            "sizeFont" : "26px",
            "offsetY1" : 285,
            "offsetY2" : 322
        }
    },
    "achievement" : 
    {
        "width" : 450,
        "height" : 225,
        "offsetX" : 60,
        "offsetY" : 22,
        "fontSizeScore" : "15px",
        "offsetYText" : 201
    },
    "gameOver" :
    {
        "txtGameOverSize" : "52px",
        "txtGameOverY" : 337,
        "txtRestartSize" : "37px",
        "txtRestartY" : 412
    },
    "sounds" :
    {
        "width" : 37,
        "height" : 31,
        "offsetX" : 563,
        "offsetY" : 568
    },
    "scoreBanner" :
    {
        "spool" :
        {
            "width" : 34,
            "height" : 34,
            "offsetX" : 4,
            "offsetY" : 1
        },
        "fontSize" : "22px",
        "score" : 
        {
            "offsetX" : 127,
            "offsetY" : 24
        },
        "combo" :
        {
            "offsetX" : 487,
            "offsetY" : 24
        },
        "multiplier" :
        {
            "width" : 47,
            "height" : 36,
            "offsetX" : 375,
            "offsetY" : 1,
            "textOffsetX" : 427,
            "textOffsetY" : 24
        }
        
    },
    "lives" :
    {
        "offsetX" : 4,
        "width" : 37,
        "height" : 31,
        "directionFontSize" : "22px",
        "directionOffsetX" : 465,
        "directionShiftY" : 24
    },
    "paws" :
    {
        "width" : 187,
        "height" : 187,
        "leftBound" : -7,
        "rightBound" : 427,
        "speed" : 37
    },
    "fallenObjects" :
    {
        "width" : 75,
        "cotonHeight" : 69,
        "polystyreneHeight" : 52,
        "peloteHeight" : 86,
        "cotonHShift" : 6,
        "polystyreneShift" : 0,
        "peloteShift" : 7,
        "speedMulti": 11,
        "speedConst" : 4
    },
    "tack" :
    {
        "width" : 75,
        "height" : 75,
        "speedMulti": 45,
        "speedConst" : 16
    }
}

var configMin = {
    "canvasWidth": 320,
    "heightGameZone" : 284,
    "heightUpMargin" : 18,
    "intro" :
    {
        "img" :
        {
            "width" : 320,
            "height" : 271,
            "offsetX" : 0,
            "offsetY" : 80
        },
        "title" :
        {
            "width" : 260,
            "height" : 91,
            "offsetX" : 30,
            "offsetY" : 0
        },
        "arrows" :
        {
            "width" : 40,
            "height" : 40,
            "offsetXArr1" : 40,
            "offsetYArr1" : 16,
            "offsetXArr2" : 268,
            "offsetYArr2" : 16,
            "offsetXArr3" : 40,
            "offsetYArr3" : 260,
            "offsetXArr1Txt" : 80,
            "offsetYArr1Txt" : 48,
            "offsetXArr2Txt" : 242,
            "offsetYArr2Txt" : 48,
            "offsetXArr3Txt" : 76,
            "offsetYArr3Txt" : 274,
            "sizeFont" : "10px"
        },
        "directions" :
        {
            "sizeFont" : "14px",
            "offsetY1" : 152,
            "offsetY2" : 172
        }
    },
    "achievement" : 
    {
        "width" : 240,
        "height" : 120,
        "offsetX" : 32,
        "offsetY" : 12,
        "fontSizeScore" : "8px",
        "offsetYText" : 107
    },
    "gameOver" :
    {
        "txtGameOverSize" : "28px",
        "txtGameOverY" : 180,
        "txtRestartSize" : "20px",
        "txtRestartY" : 220
    },
    "sounds" :
    {
        "width" : 20,
        "height" : 17,
        "offsetX" : 300,
        "offsetY" : 303
    },
    "scoreBanner" :
    {
        "spool" :
        {
            "width" : 18,
            "height" : 18,
            "offsetX" : 2,
            "offsetY" : 1
        },
        "fontSize" : "12px",
        "score" : 
        {
            "offsetX" : 68,
            "offsetY" : 13
        },
        "combo" :
        {
            "offsetX" : 260,
            "offsetY" : 13
        },
        "multiplier" :
        {
            "width" : 25,
            "height" : 19,
            "offsetX" : 200,
            "offsetY" : 1,
            "textOffsetX" : 228,
            "textOffsetY" : 13
        }
        
    },
    "lives" :
    {
        "offsetX" : 2,
        "width" : 20,
        "height" : 17,
        "directionFontSize" : "12px",
        "directionOffsetX" : 248,
        "directionShiftY" : 12
    },
    "paws" :
    {
        "width" : 100,
        "height" : 100,
        "leftBound" : -4,
        "rightBound" : 228,
        "speed" : 20
    },
    "fallenObjects" :
    {
        "width" : 40,
        "cotonHeight" : 37,
        "polystyreneHeight" : 28,
        "peloteHeight" : 46,
        "cotonHShift" : 3,
        "polystyreneShift" : 0,
        "peloteShift" : 4,
        "speedMulti": 6,
        "speedConst" : 2
    },
    "tack" :
    {
        "width" : 40,
        "height" : 40,
        "speedMulti": 24,
        "speedConst" : 8
    }
}
