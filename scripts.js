var colors = ["red", "yellow", "green", "blue"]; // List of four colors
var currentList = []; // Current list of color sequence - resets upon loss
var currentScore = -1;
var highScore = 0;

if (docCookies.hasItem("highScore")) {
    highScore = docCookies.getItem("highScore");
}

updateHighScore();

function randomColor() {
    var ri = Math.floor( Math.random() * 4 );
    return colors[ri]; // Returns random element of array colors
}

function disableButtons() {
    document.getElementById("red").disabled = true;
    document.getElementById("yellow").disabled = true;
    document.getElementById("green").disabled = true;
    document.getElementById("blue").disabled = true;
    // Disables buttons
}

function enableButtons() {
    document.getElementById("red").disabled = false;
    document.getElementById("yellow").disabled = false;
    document.getElementById("green").disabled = false;
    document.getElementById("blue").disabled = false;
    // Enables buttons
}

function displayShine(color) {
    var toShine = document.getElementById(color);
    var newClass = color + "Glow";
    toShine.removeAttribute("id");
    toShine.className = newClass;
    // Animates button of argument color to glow with shadow
    
    setTimeout(function() {
        toShine.className = "inner";
        toShine.id = color;
    }, 300);
    // Removes shadow, resets default CSS values after 300 ms
    
}

function wrong() { // What to do if the user messes up
    currentList = [];
    disableButtons();
    document.getElementById("startButton").disabled = false;
    currentScore = 0;
    document.getElementById("currentScore").innerHTML = "Score: " + currentScore;
}

function nextTurn() { // Progress to the next turn
    currentScore = currentList.length;
    document.getElementById("currentScore").innerHTML = "Score: " + currentScore;
    if (currentScore > highScore) {
        highScore = currentScore;
        updateHighScore();
    }
    currentList.push( randomColor() );
    animate();
}

function checkButton(step) { // Check the button the user inputs against what is correct
    var color = currentList[step]; // Correct color
    var colorNum = colors.indexOf(color); // Index of correct color in array
    
    document.getElementById(color).onclick = function() { // Correct button is pushed
        if (step >= currentList.length - 1) { // If it's the last one
            nextTurn();
            
        }
        else { // If it's not the last one
            checkButton(step + 1) 
        }
    }
    
    document.getElementById(colors[(colorNum+1)%4]).onclick = function() {wrong();};
    document.getElementById(colors[(colorNum+2)%4]).onclick = function() {wrong();};
    document.getElementById(colors[( colorNum+3)%4]).onclick = function() {wrong();};
    // Sets all other buttons to be incorrect and induce loss
}

function animate() {
    disableButtons();
    setTimeout(function() {
        enableButtons();
    }, currentList.length*750);
    
    for (var a = 0; a < currentList.length; a++) {
        animateTimeout(a);
    }
    checkButton(0);
}

function animateTimeout(s) {
    setTimeout(function() {
            displayShine( currentList[s] );
        }, 750*(s+1));
}

document.getElementById("startButton").onclick = function() {
    document.getElementById("startButton").disabled = true;
    nextTurn();
}

function updateHighScore() {
    document.getElementById("highScore").innerHTML = "High: " + highScore;
    docCookies.setItem("highScore", highScore, Infinity);
}