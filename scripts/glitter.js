function Glitter(x, y, radius, opacity, type, colorNumber) {
  this.x = parseInt(x);
  this.y = parseInt(y);
  this.radius = parseInt(radius);
  this.colorNumber = colorNumber;
  this.opacity = opacity;
  this.factor = 1;
  this.type = type;
  this.increment = Math.random() * .03;
}

Glitter.prototype.draw = function(context) {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
  context.fillStyle = this.colorNumber > 0.5 ? 'rgb(255, 255, 200)': 'rgb(80, 200, 120)';
  context.strokeStyle = this.colorNumber > 0.5 ? 'rgb(255, 255, 200)' : 'rgb(80, 200, 120)';
  context.shadowColor = this.colorNumber > 0.5 ? '#ffff33' : '#50C850';
  context.fill();
  context.lineWidth = 5;
  context.shadowBlur = 15;
  context.stroke();
  if (this.type === 'background') {
    this.x = this.x - .5;
  } else {
    this.x -= 5;
  }

};

module.exports = Glitter;