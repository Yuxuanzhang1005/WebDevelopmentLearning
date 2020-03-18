// TIP: SELECT THE WORD AND HIT COMMAND+D, IT WILL SELECT NEXT SAME WORD
var newColorButton = document.querySelector("#newcolor");
var modeButtons = document.querySelectorAll(".mode");
var header = document.querySelector(".header");

var squares = document.querySelectorAll(".square");
var messageDisp = document.querySelector("#message");
var rgbDisp = document.querySelector("#rgb");
var numSquares = 6;
var pickedColor;

init();

function init() {
	reset();
    setupModeButtons();
    setupSquares();
    
    
}

newColorButton.addEventListener("click", function() {
	reset();
})

function setupModeButtons() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			if (this.textContent === "Easy") {
				numSquares = 3;
			} else {
				numSquares = 6;
			}
			reset();
	    });
	}
}

function setupSquares() {
	for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function() {
			if (this.style.backgroundColor === pickedColor) {
				messageDisp.textContent = "CORRECT!";
				changeColor(pickedColor);
				header.style.backgroundColor = pickedColor;
				newColorButton.textContent = "PLAY AGAIN?"
			} else {
				this.style.backgroundColor = "#232323";
				messageDisp.textContent = "TRY AGAIN";
			}
        });
    }
}

function generateColor() {
	var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function generateNumColors(num) {
	var arr = [];
	for (var i = 0; i < num; i ++) {
		arr.push(generateColor());
	}
	return arr;
}

function changeColor(color) {
    for(var i = 0; i < squares.length; i++) {
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function reset() {
	header.style.backgroundColor = "rgb(20, 200, 200)";
	messageDisp.textContent = "";
	newColorButton.textContent = "New color";

	colors = generateNumColors(numSquares);
    right_i = Math.floor(Math.random() * numSquares);
    pickedColor = colors[right_i];
    rgbDisp.textContent = pickedColor;
	
    for(var i = 0; i < squares.length; i++) {
    	if (colors[i]) {
    		squares[i].style.display = "block";
    		squares[i].style.backgroundColor = colors[i];
    	} else {
    		squares[i].style.display = "none";
    	}
    	
    }
    
}





