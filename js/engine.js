var Engine = (function(global) {

    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        patterns = {},
        lastTime
        score = 0,
        deaths = 0,
        dodged = 0;

    canvas.width = 505;
    canvas.height = 606;

    doc.body.appendChild(canvas);

    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        lastTime = now;

        win.requestAnimationFrame(main);
    };

    function init() {

        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
        
        //document.getElementById("score").value = score;
        //document.getElementById("deaths").value = deaths;
        //document.getElementById("dodged").value = dodged;
    }

    function updateEntities(dt) {
        var playerCoords = player.update();
        allEnemies.forEach(function(enemy) {
            var coords = enemy.update(dt);

            //if(playerCoords.x === coords.x &&
                //playerCoords.y === coords.y){
                //player.x = 83*4;
                //player.y = 101*2;
            //}
        });
    }

    function render() {
        var rowImages = [
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png'
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();
    }

    function resetEntities() {
        allEnemies = [];
        allEnemies.push(new Enemy(1, 60));
        allEnemies.push(new Enemy(1, 150));
        allEnemies.push(new Enemy(1, 230));

        player = new Player(101*2,300);
    }

    function reset() {
        resetEntities();
    }

    window.Engine = {
        init: init,
    };

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);
