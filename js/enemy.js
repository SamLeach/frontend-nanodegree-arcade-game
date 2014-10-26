var Enemy = function(x, y) {
	Entity.prototype.constructor.call(this, x, y, 'images/enemy-bug.png');
	this.speed = Math.floor(Math.random() * (7 - 3)) + 3;
}

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy.constructor;

Enemy.prototype.update = function(dt) {
	this.x += this.speed;
}