var Player = function(x, y){
	Entity.prototype.constructor.call(this, x, y, 'images/char-boy.png');
}

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player.constructor;

Player.prototype.update = function(){
	if(this.x > 101*4){
		this.x = 101*4;
	}

	if(this.x < 0){
		this.x = 0;
	}

	if(this.y > 383){
		this.y = 383;
	}

	if(this.y < 1){
		this.y = 300;
		this.x = 101*2;
	}
}

Player.prototype.handleInput = function(key){
    switch(key){
    	case 'up':
    	case 'w':
    		this.y -= 83;
    		console.log(this.x, this.y);
    		break
    	case 'down':
    	case 's':
    		this.y += 83;
    		console.log(this.x, this.y);
    		break
    	case 'right':
    	case 'd':
    		this.x += 101;
    		console.log(this.x, this.y);
    		break
    	case 'left':
    	case 'a':
    		this.x -= 101;
    		console.log(this.x, this.y);
    		break
    }
}