var Enemy = function(x, y) {
	var min = 3;
	var max = 7;
	Entity.prototype.constructor.call(this, x, y, 'images/enemy-bug.png');
	this.speed = Math.floor(Math.random() * (max - min)) + min;
}

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy.constructor;

Enemy.prototype.update = function(dt) {
	var goneOffScreen = false;
	this.x += this.speed;

	// Check right hand side edge and respawn if off screen
	if(this.x > 500)
	{
		this.x = -100;
		this.speed = Math.floor(Math.random() * (7 - 3)) + 3;
		goneOffScreen = true;
	}

	return { 
		x: this.x, 
		y : this.y, 
		dodged: goneOffScreen 
	};
}