
//Emily and Suzanne

'use strict';

var winningRadius = window.innerHeight/4; // bigger than this wins
var losingRadius = 4;                     // smaller than this loses
var growRadius = 10;                      // grow by this many pixels
var shrinkRadius = 3;                     // shrink by this many pixels

/**
 * creates a new player class that extends the blob class
 */

class Player extends Blob{


    constructor(color, radius){
        super(color,radius);

    }
    /**
     * takes in x and y coordinates and move the DIV so that it's center is at the 
     * new location
     * @param {int} x 
     * @param {int} y 
     */
    move(x,y ){
        this.setX(x);
        this.setY(y);
    }

    /**
     * increases the radius of the player by specified growRadius pixels
     */
    grow(){
        this.setRadius(this.getRadius()+growRadius);
        if(this.radius >= winningRadius){
            stopGame('win'); 
        }
    }
    /**
     * decreases the radius of the player by specified shrinkRadius pixels
     */
    shrink(){
        this.setRadius(this.getRadius()-shrinkRadius);
        if(this.radius <= shrinkRadius){
            stopGame('lose');
        }
    }

    /**
     * invoked when a collision happens and grows or shrinks the player based on the 
     * size of the enemy it collided with.
     * @param {Blob} enemy 
     */
    collide(enemy){
        if(this.getRadius()>enemy.getRadius()){
            this.grow();
            enemy.remove();
        }else{
            this.shrink();
        }

    }
}



