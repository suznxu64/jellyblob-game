//Emily and Suzanne
'use strict';

function isNum(val) {
    if( typeof val === 'number' ) {
        return val;
    } else {
        throw new Error('value is not a number');
    }
}
/**
 * Creates a new Blob class 
 */
class Blob{
    color;
    radius;
    xlocation;
    ylocation;
    $blob;
    constructor(color,radius){
        this.color = color;
        this.radius=radius; 
        this. xlocation = 0;
        this.ylocation = 0;
        this.setDOM(); // Initialize the DOM element
        this.setX(0);
        this.setY(0);
        this.addToGame();

    }
    /**
     * method to add the blob instance to the game
     */
    addToGame(){
        //$(this.$blob).append("<body>");
        $('body').append(this.$blob);
        
    }

    /**
     * creates a DOM element and stores in an instance variable
     */
    setDOM(){
        this.$blob = $('<div class = "circle"></div>');
        console.log("hi");
        this.setColor(this.color);
        this.setRadius(this.radius);

        
    }

    /**
     * sets the color instance variable and updates background color for DOM element
     * @param {String} color 
     */

    setColor(color) {
        this.color = color;
        this.$blob.css('background-color', color);
    }
    /**
     * Sets the radius instance variable and updates the width,height, left and top properties of the DOM element
     * @param {int} radius 
     */
    
    setRadius(radius) {
        this.radius = radius;
        let diam = radius * 2;
    
        // Ensure exact integer values to avoid subpixel rendering issues
        let xOffset = Math.round(this.xlocation - radius);
        let yOffset = Math.round(this.ylocation - radius);
    
        // Apply dimensions and positioning
        this.$blob.css({
            width: `${diam}px`,
            height: `${diam}px`,
            position: 'absolute', // Ensure absolute positioning
            left: `${xOffset}px`,
            top: `${yOffset}px`,
            boxSizing: 'border-box', // Account for padding/border in dimensions
        });
    }
    
    
    
    /**
     * returns the current color
     */
    getColor(){
        return this.color;
    }
    /**
     * returs the DOM element in instance variable
     */
    getDOM(){
        return this.$blob;
    }
    /**
     * returns the value of the diameter
     */
    getDiameter(){
        return (this.radius*2);
    }

    /**
     * 
     * @returns the value of the radius
     */
    getRadius(){
        return this.radius;
    }

    /**
     * 
     * @returns the x coordinate of the center
     */
    getX(){
        return this.xlocation;
    }
    /**
     * 
     * @returns the y coordinate of the center
     */
    getY(){
        return this.ylocation;
    }
    /**
     * changes the x coordinate of the center and updates the position of the DOM using left
     * @param {int} x 
     */
    setX(x){
        this.xlocation = x;
        this.$blob.css({
            left: `${this.xlocation - this.radius}px`,
        });
    }
    /**
     * changes the y coordinate of the center and updates the position of the DOM using top
     * @param {int} y
     */
    setY(y){
        this.ylocation = y;
        this.$blob.css({
            top: `${this.ylocation - this.radius}px`,
        });

    }
    /**
     * given function to test basic invariants
     * @returns a string representation of the position
     */
    location() {
        let x = this.getX();
        let y = this.getY();
        let left = parseInt(this.getDOM().css('left'),10);
        let top = parseInt(this.getDOM().css('top'),10);
        let r = this.getRadius();
        let xok = (left+r==x) ? "X OK" : "X WRONG";
        let yok = (top+r==y) ? "Y OK" : "Y WRONG";
        return `radius ${r} center (${x},${y}) w/ DOM elt (${left},${top}): ${xok}, ${yok}`;
    }
    /**
     * given function to measure if two blobs are intersecting
     * @param {obj} other 
     * @returns boolean 
     */
    intersects (other) {
        // six uses of the 'isNum' function to make sure all values are defined
        const dx = isNum(this.getX()) - isNum(other.getX());
        const dy = isNum(this.getY()) - isNum(other.getY());
        const r1 = isNum(this.getRadius());
        const r2 = isNum(other.getRadius());

        // finally, some real computation
        const distance_squared = (dx * dx + dy * dy);

        const rsum = r1+r2;
        const isCloser = (distance_squared <= rsum*rsum);
        return isCloser;
    }
}


