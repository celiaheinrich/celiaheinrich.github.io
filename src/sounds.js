var soundOn = new Image();
var soundOff = new Image();
soundOn.src = '../img/audio.png';
soundOff.src = '../img/no-audio.png';

window.addEventListener('click', HandleClick, false);

var isMute = false;

function drawSound(ctx) {
    if(!isTouchScreen) {
        if (isMute)
        {
            ctx.drawImage(soundOff, sizeConfig.sounds.offsetX, sizeConfig.sounds.offsetY, sizeConfig.sounds.width, sizeConfig.sounds.height);
        }
        else
        {
             ctx.drawImage(soundOn, sizeConfig.sounds.offsetX, sizeConfig.sounds.offsetY, sizeConfig.sounds.width, sizeConfig.sounds.height);
        }
    }
}

function HandleClick(evt){
	if (isIntroPlayed) {
	    var offX = sizeConfig.sounds.offsetX;
	    var offY = sizeConfig.sounds.offsetY;
	    var canvasWidth = sizeConfig.canvasWidth;
	
	    var x = evt.pageX - canvas.offsetLeft;
        var y = evt.pageY - canvas.offsetTop;
	    if(x >=offX && x <= canvasWidth && y >= offY && y <= canvasWidth) {
	        pauseOrRestartsound();
	    }
	}
}

function pauseOrRestartsound() {
var soundValue = (isMute ? 1:0);
        isMute = !isMute;
        var son = document.getElementById("FXScratch");
        son.volume = soundValue;
        var son2 = document.getElementById("DialCombo");
        son2.volume = soundValue;
        var son3 = document.getElementById("DialHurt");
        son3.volume = soundValue;
}


function createPlop () {
    if(!isMute) {
         var sonPlop = document.createElement('audio');
         var source1 = document.createElement('source');
         source1.src = '../son/Blup.ogg';
         source1.type = 'audio/ogg';
         sonPlop.appendChild(source1);
         var source2 = document.createElement('source');
         source2.src = '../son/Blup.mp3';
         source2.type = 'audio/mpeg'
         sonPlop.appendChild(source2);
         sonPlop.play();
     }

}
