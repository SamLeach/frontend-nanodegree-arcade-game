var Entity = function(x, y, sprite){
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}

Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}