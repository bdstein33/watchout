var gameOptions = {
  height: 700,
  width: 700,
  nEnemies: 30,
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
  // var user = d3.select('.user');

  var gameboard =  d3.select('.container')
    .append('svg')
    .attr('width', gameOptions.height + 'px')
    .attr('height', gameOptions.width + 'px');

  var user = gameboard.append('circle')
    .attr('cx', 20)
    .attr('cy', 20)
    .attr('r', 20);

  user.call(d3.behavior.drag().on('drag', function() {
    move.call(user, d3.event.x, d3.event.y);
    // user.attr('cx', d3.event.x);
    // console.log(d);
    // user.attr('cy', d3.event.y);
    // console.log(user.attr('cx'));
    // console.log("A");
  }));

  // d3.select('.gameboard')
  // .select('.user').data([1,2,3])
  // .enter()
  // .append('svg')
  // .call(d3.behavior.drag().on('drag', function(d) {
  //   user.attr('cx', d3.event.x);
  //   user.attr('cy', d3.event.y);
  //   console.log(user.attr('cx'));
  // })

  // );
});




var move = function(x, y, transition) {
    this.attr('cx', Math.min(gameOptions.width - this.attr('r'),Math.max(this.attr('r'), x)));
    this.attr('cy', Math.min(gameOptions.height - this.attr('r'), Math.max(this.attr('r'), y)));
};



