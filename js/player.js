//
// The player
//
// Updates its own position
// Handles keyword input
// Keeps track of its score, deaths and enemies dodged
// 
var Player = function(x, y){
	Entity.prototype.constructor.call(this, x, y, 'images/char-boy.png');
    this.score = 0;
    this.deaths = 0;
    this.dodged = 0;
}

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player.constructor;

Player.prototype.update = function(){

    // check right hand side edge
	if(this.x > 101*4){
		this.x = 101*4;
	}

    // check left hand side edge
	if(this.x < 0){
		this.x = 0;
	}

    // check bottom edge
	if(this.y > 383){
		this.y = 383;
	}

    // check water (win condition)
	if(this.y < 1){
        this.score++;

        swal({   
            title: "You win!",   
            text: 'Well done! \nScore: ' + this.score,   
            type: "success",   
            confirmButtonText: "Again!" });

        // reset postion of player
		this.y = 300;
		this.x = 101*2;
	}

    return { 
        x: this.x, 
        y : this.y 
    };
}

Player.prototype.handleInput = function(key){
    var yStep = 83;
    var xStep = 101;
    switch(key){
    	case 'up':
    	case 'w':
    		this.y -= yStep;
    		console.log(this.x, this.y);
    		break
    	case 'down':
    	case 's':
    		this.y += yStep;
    		console.log(this.x, this.y);
    		break
    	case 'right':
    	case 'd':
    		this.x += xStep;
    		console.log(this.x, this.y);
    		break
    	case 'left':
    	case 'a':
    		this.x -= xStep;
    		console.log(this.x, this.y);
    		break
    }
}