var Engine = (function(global) {

    // hoisting
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        patterns = {},
        lastTime,
        debug = getQueryStringValue("debug") === 'true',
        allEnemies = [],
        player = {};

        // enable debug DOM elements (labels and spans)
        if(debug){
            $('#debug').css('display', 'block');
        }

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
        updateDOM();
    }

    function updateDOM(){
        document.getElementById("score").innerHTML = player.score;
        document.getElementById("dodged").innerHTML = player.dodged;
        document.getElementById("deaths").innerHTML = player.deaths;

        if(debug){
            document.getElementById("player-position").innerHTML = "( " + player.x + ", " + player.y + " )";
        }   
    }

    function updateEntities(dt) {
        var playerCoords = player.update();
        var enemyPositions = [];
        var enemySquares = [];

        allEnemies.forEach(function(enemy) {

            // Gather enemy coords
            var enemyCoords = enemy.update(dt);
            enemyPositions.push(enemyCoords);
            if(enemyCoords.dodged){
                player.dodged++;
            }

            // Gather enemy squares for collision detection
            var enemySquare = enemy.getCurrentSquare();
            enemySquares.push(enemySquare);

            // Collision?
            var square = player.getCurrentSquare();
            if (typeof square != "undefined"){

                if(debug){
                    document.getElementById("player-square").innerHTML = "( " + square.x + ", " + square.y + " )";
                }

                if(square.x == enemySquare.x && 
                    square.y == enemySquare.y){

                    // reset player
                    player.x = 202;
                    player.y = 300;
                    player.deaths++;

                    swal({   
                        title: "Dead!",   
                        text: "Watch out for the bugs! \nDeaths: " + player.deaths,   
                        type: "error",   
                        confirmButtonText: "Try again" });
                }
            }
        });

        // Update DOM for debuging
        if(debug){
            document.getElementById("enemy1-position").innerHTML = "( " + enemyPositions[0].x + ", " + enemyPositions[0].y + " )";
            document.getElementById("enemy2-position").innerHTML = "( " + enemyPositions[1].x + ", " + enemyPositions[1].y + " )";
            document.getElementById("enemy3-position").innerHTML = "( " + enemyPositions[2].x + ", " + enemyPositions[2].y + " )";

            if(typeof enemySquares[0] != "undefined"){
                document.getElementById("enemy1-square").innerHTML = "( " + enemySquares[0].x + ", " + enemySquares[0].y + " )";
            }

            if(typeof enemySquares[1] != "undefined"){
                document.getElementById("enemy2-square").innerHTML = "( " + enemySquares[1].x + ", " + enemySquares[1].y + " )";
            }

            if(typeof enemySquares[2] != "undefined"){
                document.getElementById("enemy3-square").innerHTML = "( " + enemySquares[2].x + ", " + enemySquares[2].y + " )";
            }
        }
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
        allEnemies.push(new Enemy(-100, 51));
        allEnemies.push(new Enemy(-100, 134));
        allEnemies.push(new Enemy(-100, 217));

        player = new Player(101*2,300);
    }

    function reset() {
        resetEntities();
    }

    // translate key codes to human readable keys
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

    //
    // Gets query string value for given key
    // 
    // Used for "debug=true" or "debug=false" modes
    function getQueryStringValue (key) {  
      return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
    } 

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
