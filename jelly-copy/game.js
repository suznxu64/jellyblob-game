//Emily and Suzanne
'use strict';

$("#start").click(startGame);

let thePlayer; // Global player object
let gameInterval; // To store the interval for launching enemies
var intervalID;

/**
 * clears the game environement, creates a new instance of the player, sets the player 
 * to be in the middle of the screen, allows the player to be moved via mouse movement 
 */
function startGame() {
    // Clear the body to set up the game environment
    const winOrLose = document.getElementById('winOrLose');
    document.body.innerHTML = '';
    document.body.append(winOrLose);


    thePlayer = new Player('blue', 30); 
    thePlayer.setX(window.innerWidth / 2); // Center horizontally
    thePlayer.setY(window.innerHeight / 2); // Center vertically

    $(document).on('mousemove', function(evt){
    const mouseX = evt.clientX;
    const mouseY = evt.clientY;
    thePlayer.move(mouseX, mouseY);
    });

   //document.body.append(thePlayer); 



    intervalID = setInterval(function(){
        launchEnemy();
    }, 1000)
}
/**
 * Depending on the outcome of the game, displays a win message or a lose message
 * @param {string} result 
 */
function stopGame(result){
    clearInterval(intervalID);
    if (result === 'win'){
        $('#winOrLose').text('You Win!');
    }
    else{
        $('#winOrLose').text('You Lost :(');
    }
    
}