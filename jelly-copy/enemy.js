//Emily and Suzanne

'use strict';

var minRadius = 4;                   // random size >= this
var maxRadius = window.innerWidth/8; // random size <= this
var enemyDuration = 5000;              // time to cross the page
var enter;

/**
 * creates new Enemy class that extends the blob class
 */
class Enemy extends Blob{
    constructor(){
        var color = random.color();
        var radius = random.intBetween(minRadius,maxRadius);
        super(color,radius);
        this.collided = false;
    }
    /**
     * invoked the a collision happens and records that the enemy has collided with a player
     */
    collide(){
        thePlayer.collide(this);
        this.collided = true;
    }

    /**
     * updates the X and Y location using CSS values
     */
    updateLocation(){
        this.setX()
        const top = parseInt(this.$blob.css('top'));
        const left = parseInt(this.$blob.css('left')); 
        this.xlocation = left + this.radius; 
        this.ylocation = top + this.radius; 
    }
    /**
     * checks for collision. If it has colided skips processing, if not, checks to see if there's an intersection by envoking collide
     */
    maybeCollide(){
        if(this.intersects(thePlayer) && (this.collided === false)){
            this.collide();
        }
    }
    /**
     * take an arguement and sets the initital coordiantes of the enemy in accordance to the side
     * also record the side
     * @param {string} side 
     */
    
    setSide(side){
        if(side ==="top") {
                this.xlocation = Math.random() * (window.innerWidth - (this.radius*2)); // Random X along the top
                this.ylocation = -this.height; 
                this.setX(this.xlocation);
                this.setY(this.ylocation);
        }
        if(side =="right"){
                this.xlocation = window.innerWidth; // Just outside the right edge
                this.ylocation = Math.random() * (window.innerHeight - (this.radius*2)); 
                this.setX(this.xlocation);
                this.setY(this.ylocation);
        }
        if(side=="bottom"){
                this.xlocation= Math.random() * (window.innerWidth - (this.radius*2)); // Random X along the bottom
                this.ylocation= window.innerHeight; 
                this.setX(this.xlocation);
                this.setY(this.ylocation);
        }
        if(side=="left"){
                this.xlocation = -this.width; // Just outside the left edge
                this.ylocation = Math.random() * (window.innerHeight - (this.radius*2));
                this.setX(this.xlocation);
                this.setY(this.ylocation);
    
        }
       
    }
    /**
     * starts the jQuery animation of the enemy across the board to final destination
     */
    start() {
        const animations = {}; // Properties for jQuery animation
        const side = this.side;

        if (side === "left") {
            animations.left = window.innerWidth;
        }
        if (side === "right") {
            animations.left = -window.innerWidth; 
        }
        if (side === "top") {
            animations.top = window.innerHeight;
        }
        if (side === "bottom") {
            animations.top = -window.innerHeight;
        }

        $(this.$blob).animate(animations, {
            duration: enemyDuration,
            progress: () => {
                this.updateLocation(); 
                this.maybeCollide();  
            },
            complete: () => {
                this.remove(); 
            }
        });
    }

    /**
     * stop the animation of the enemy and removes enemy from the board
     */
    remove() {
        $(this.$blob).stop(); // Stop the animation
        $(this.$blob).remove(); 
    }
}




let sides = ['top', 'left', 'right', 'bottom'];

/**
 * helper function to pick a random side that the enemy will enter from 
 * @returns {string} side
 */

function pickSide() {
    let num = Math.floor(Math.random() * sides.length); // Randomly pick a side
    return sides[num];
}

/**
 * does the work of luanching a single enemy including the animation and checking to see 
 * if the enemy has collided with a player
 */
function launchEnemy() {
    let enem = new Enemy();
    enem.addToGame("body"); 


    let side = pickSide();
    enem.setSide(side);

    let animation = {};
    if (side === "left") {
        animation.left = window.innerWidth; 
    }
    if (side === "right") {
        animation.left = -window.innerWidth 
    }
    if (side === "top") {
        animation.top = window.innerHeight; 
    }
    if (side === "bottom") {
        animation.top = -window.innerHeight; 
    }

    $(enem.$blob).animate(animation, {
        duration: enemyDuration,
        progress: function () {
            enem.updateLocation(); 
            enem.maybeCollide(); 
        },
        complete: function () {
            enem.remove(); 
        }
    });
}
