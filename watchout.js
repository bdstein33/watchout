var gameOptions = {
  height: 700,
  width: 700,
  nEnemies: 30,
  enemyRadius: 18,
  userRadius: 18,
  collisionAlreadyDetected: false

};

var gameStats = {
  highScore: 0,
  currentScore: 0,
  collisions: 0
};

var generateEnemies = function(n) {
  var enemyArray = [];
  for (var i = 1; i <= n; i++) {
    var enemy = {
      id: i,
      x: Math.floor(Math.random() * (gameOptions.width - gameOptions.enemyRadius * 2)) + gameOptions.enemyRadius,
      y: Math.floor(Math.random() * (gameOptions.height - gameOptions.enemyRadius * 2)) + gameOptions.enemyRadius
    };
    enemyArray.push(enemy);
  }
  return enemyArray;
};

var gameboard =  d3.select('.container')
  .append('svg')
  .attr('width', gameOptions.height + 'px')
  .attr('height', gameOptions.width + 'px');

var user = gameboard.append('circle')
  .attr('cx', 20)
  .attr('cy', 20)
  .attr('r', gameOptions.userRadius);

user.call(d3.behavior.drag().on('drag', function() {
  move.call(user, d3.event.x, d3.event.y);
}));

d3.select('.container > svg') // Selects the gameboard svg canvas
  .selectAll('svg')           // Selects all svg elements inside the canvas (none at start of game)
  .data(generateEnemies(20))  // Data to insert into svg elements (or create new if none) (but doesn't append to dom yet)
  .enter()                    //
  .append('circle')
  .attr('class', 'enemy')
  .attr('cx', function(d) {
    return d.x;
  })
  .attr('cy', function(d) {
    return d.y;
  })
  .attr('r', gameOptions.enemyRadius + 'px')
  .attr('fill', 'red');


var moveEnemies = function() {
  d3.selectAll('.enemy')
  .transition()
  .duration(2000)
  .tween("moveEnemy", function() {    //
    gameStats.collisionAlreadyDetected = false;
    var enemy = d3.select(this);
    var startPosition = {
      x: enemy.attr('cx'),
      y: enemy.attr('cy')
    };

    var endPosition = {
      x: generateX(),
      y: generateY()
    };


    return function(t) {          // This function gets run every tick during transition
      var enemyNextPosition = {
        x: Math.floor(+startPosition.x + (+endPosition.x - +startPosition.x)*t),
        y: Math.floor(+startPosition.y + (+endPosition.y - +startPosition.y)*t),
      };

      enemy.attr({
        'cx' : enemyNextPosition.x,
        'cy' : enemyNextPosition.y
      });

      collision(enemy, user);
    };
  });
};

var move = function(x, y, transition) {
    this.attr('cx', Math.min(gameOptions.width - this.attr('r'),Math.max(this.attr('r'), x)));
    this.attr('cy', Math.min(gameOptions.height - this.attr('r'), Math.max(this.attr('r'), y)));
};

var enemyMove = function() {
  this.attr({
    'cx': generateX(),
    'cy': generateY()
  });
};


var generateX = function() {
  return Math.floor(Math.random() * (gameOptions.width - gameOptions.enemyRadius * 2)) + gameOptions.enemyRadius;
};

var generateY = function() {
  return Math.floor(Math.random() * (gameOptions.height - gameOptions.enemyRadius * 2)) + gameOptions.enemyRadius;
};

var collision = function(enemy, user, callback) {

  var dx = +enemy.attr('cx') - +user.attr('cx');
  var dy = +enemy.attr('cy') - +user.attr('cy');
  var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  var collisionDistance = gameOptions.userRadius + gameOptions.enemyRadius;
  if (distance < collisionDistance) {
    resetGame();
  }
};

var resetGame = function() {
  if (!gameStats.collisionAlreadyDetected) {
    gameStats.collisions++;
    gameStats.collisionAlreadyDetected = true;
  }
  gameStats.currentScore = 0;
  d3.select('.current-score').text(0);
  d3.select('.collision-count').text(gameStats.collisions);
};

var updateScore = function() {
  gameStats.currentScore++;
  d3.select('.current-score').text(gameStats.currentScore);
  if (gameStats.currentScore > gameStats.highScore) {
    gameStats.highScore = gameStats.currentScore;
    d3.select('.high-score').text(gameStats.currentScore);
  }
  console.log(gameStats);
};

setInterval(updateScore, 1000);

var startGame = function() {
  moveEnemies();

  setInterval(function() {
    moveEnemies();
  }, 2500);
};

startGame();
