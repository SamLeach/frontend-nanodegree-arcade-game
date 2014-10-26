document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'a',
        87: 'w',
        68: 'd',
        83: 's'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
