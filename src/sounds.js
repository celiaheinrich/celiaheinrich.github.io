var soundOn = new Image();
var soundOff = new Image();
soundOn.src = '../img/audio.png';
soundOff.src = '../img/no-audio.png';

window.addEventListener('click', HandleClick, false);

var isMute = false;

function drawSound(ctx) {
    if (isMute)
    {
        ctx.drawImage(soundOff, 750, 758, 50, 42);
    }
    else
    {
         ctx.drawImage(soundOn, 750, 758, 50, 42);
    }
}

function HandleClick(evt){
	//alert(evt.keyCode);
	
	var x = evt.pageX - canvas.offsetLeft;
    var y = evt.pageY - canvas.offsetTop;
	if(x >=750 && x <= 800 && y >= 758 && y <= 800) {
	    var soundValue = (isMute ? 1:0);
        isMute = !isMute;
        /*var son = document.getElementById("FXObj");
        son.volume = soundValue;*/
        var son = document.getElementById("FXScratch");
        son.volume = soundValue;
        var son2 = document.getElementById("DialCombo");
        son2.volume = soundValue;
        var son3 = document.getElementById("DialHurt");
        son3.volume = soundValue;
	}
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
