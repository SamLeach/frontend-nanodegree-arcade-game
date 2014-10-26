var Entity = function(x, y, sprite){
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}

Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//
// Gets the current square that the entity is on
// TODO: This is horrible!
Entity.prototype.getCurrentSquare = function() {

	// Row 1
    if(this.x < 101 && this.y == 51){
    	return { x: 1, y: 1 }
    }
    if(this.x < 202 && this.x >= 101 && this.y == 51){
    	return { x: 2, y: 1 }
    }
    if(this.x < 303 && this.x >= 202 && this.y == 51){
    	return { x: 3, y: 1 }
    }
    if(this.x < 404 && this.x >= 303 && this.y == 51){
    	return { x: 4, y: 1 }
    }
    if(this.x < 505 && this.x >= 404 && this.y == 51){
    	return { x: 5, y: 1 }
    }

    // Row 2
    if(this.x < 101 && this.y == 134){
    	return { x: 1, y: 2 }
    }
    if(this.x < 202 && this.x >= 101 && this.y == 134){
    	return { x: 2, y: 2 }
    }
    if(this.x < 303 && this.x >= 202 && this.y == 134){
    	return { x: 3, y: 2 }
    }
    if(this.x < 404 && this.x >= 303 && this.y == 134){
    	return { x: 4, y: 2 }
    }
    if(this.x < 505 && this.x >= 404 && this.y == 134){
    	return { x: 5, y: 2 }
    }

    // Row 3
    if(this.x < 101 && this.y == 217){
    	return { x: 1, y: 3 }
    }
    if(this.x < 202 && this.x >= 101 && this.y == 217){
    	return { x: 2, y: 3 }
    }
    if(this.x < 303 && this.x >= 202 && this.y == 217){
    	return { x: 3, y: 3 }
    }
    if(this.x < 404 && this.x >= 303 && this.y == 217){
    	return { x: 4, y: 3 }
    }
    if(this.x < 505 && this.x >= 404 && this.y == 217){
    	return { x: 5, y: 3 }
    }
}