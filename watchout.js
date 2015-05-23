var gameOptions = {
  height: 700,
  width: 700,
  nEnemies: 30,
  enemyRadius: 20,
  userRadius: 20
};

var gameStats = {
  highScore: 0,
  currentScore: 0,
  collisions: 0
};

var axes = {
  x: d3.scale.linear().domain([0, 100]).range([0, gameOptions.width]),
  y: d3.scale.linear().domain([0,100]).range([0, gameOptions.height])
};


$(document).ready(function(){

  var gameboard =  d3.select('.container')
    .append('svg')
    .attr('width', gameOptions.height + 'px')
    .attr('height', gameOptions.width + 'px');

  var user = gameboard.append('circle')
    .attr('cx', 20)
    .attr('cy', 20)
    .attr('r', gameOptions.userRadius);

  console.log(user);
  user.call(d3.behavior.drag().on('drag', function() {
    move.call(user, d3.event.x, d3.event.y);
  }));

  var a = d3.select('.container > svg')
    .selectAll('svg');

  d3.select('.container > svg')
    .selectAll('svg')
    .data(generateEnemies(20))
    .enter()
    .append('circle')
    .attr('cx', function(d) {
      return d.x;
    })
    // .attr('cy', 200)
    .style('cy', function(d){
      return d.y;
    })
    .attr('r', gameOptions.enemyRadius + 'px')
    .attr('fill', 'red');

  // gameboard.select('.enemy')
  //

});




var move = function(x, y, transition) {
    this.attr('cx', Math.min(gameOptions.width - this.attr('r'),Math.max(this.attr('r'), x)));
    this.attr('cy', Math.min(gameOptions.height - this.attr('r'), Math.max(this.attr('r'), y)));
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

