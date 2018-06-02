

var diceController = function() {

$('.dice-box span').attr('style', 'display: block !important;');
$('.dice-box').attr('style', 'background:#fff;')

let display = document.getElementById('time-left');

let dice = [
	["R", "I", "F", "O", "B", "X"],
	["I", "F", "E", "H", "E", "Y"],
	["D", "E", "N", "O", "W", "S"],
	["U", "T", "O", "K", "N", "D"],
	["H", "M", "S", "R", "A", "O"],
	["L", "U", "P", "E", "T", "S"],
	["A", "C", "I", "T", "O", "A"],
	["Y", "L", "G", "K", "U", "E"],
	["Qu", "B", "M", "J", "O", "A"],
	["E", "H", "I", "S", "P", "N"],
	["V", "E", "T", "I", "G", "N"],
	["B", "A", "L", "I", "Y", "T"],
	["E", "Z", "A", "V", "N", "D"],
	["R", "A", "L", "E", "S", "C"],
	["U", "W", "I", "L", "R", "G"],
	["P", "A", "C", "E", "M", "D"]
],

shuffle = function(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
},

shuffleDieOrder = function() {
	var shuffled = shuffle(dice);
	return shuffled;
},

shuffleEachDie = function() {
	var newArray = [];
	
	for (var i = 0; i < dice.length; i++) {
		shuffle(dice[i]);
		newArray.push(dice[i][0]);
		
	}
	return newArray;
}

renderDice = function() {
	var shuffledDice = shuffleEachDie();
	
	for (var i = 0; i < shuffledDice.length; i++) {
		$('#box_' + i).animateCss('flipInY');
		document.getElementById('box_' + i).textContent = shuffledDice[i];
	}
}

shuffleDieOrder();
renderDice();

//game timer
function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  var id = setInterval(function() {
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10);
    //console.log(timer, duration)

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = "Time: " + minutes + ":" + seconds;

  	if (timer >= 1) {
  		$('.btn').hide();
  	} else {
  		$('.btn').show();
  	}

    if (timer == 30) {
      document.getElementById('time-left').style.color = "yellow";
      
    }
    if (timer == 10) {
      document.getElementById('time-left').style.color = "red";
    
    }
    if (timer == 0) {
      timer = 0;
      console.log("gameOver")
      clearInterval(id)
      //$('.dice-box span').attr('style', 'background: white;display:block;');
      //$('.dice-box').attr('style', 'background:#333;')
      
      var timeUp = ["T", "I", "M", "E", "U", "P", "","","","","","","","","",""];
      
	    for (var i = 0; i < timeUp.length;i++) {
	      	document.getElementById('box_'+ i).textContent = timeUp[i];

	    } 
	}

    if (--timer < 0) {

    }
  }, 1000);

}

startTimer(180, display);

};



$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = (function(el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));

    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  },
});





