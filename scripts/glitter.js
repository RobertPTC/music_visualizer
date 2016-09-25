function Glitter(x, y, radius, opacity, type, colorNumber, pulseCounter) {
  this.x = parseInt(x);
  this.y = parseInt(y);
  this.radius = parseInt(radius);
  this.originalRadius = this.radius;
  this.colorNumber = colorNumber;
  this.opacity = opacity;
  this.factor = 1;
  this.type = type;
  this.pulseCounter = pulseCounter;
  this.increment = Math.random() * .03;
}
Glitter.prototype.draw = function(context) {
  if (this.pulseCounter % 6 >= 0 && this.pulseCounter % 6 < 3) {
    this.radius += 1;
  } else if (this.pulseCounter % 6 >=  3 && this.pulseCounter % 6 <= 5) {
    if (this.radius > 0) {
      this.radius -= 1;
    }
  }
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
  context.fillStyle = this.colorNumber > 0.5 ? 'rgb(255, 255, 200)': 'rgb(0, 35, 102)';
  context.strokeStyle = this.colorNumber > 0.5 ? 'rgb(255, 255, 200)' : 'rgb(0, 35, 102)';
  context.shadowColor = this.colorNumber > 0.5 ? '#ffff33' : '#0033FF';
  context.fill();
  context.lineWidth = 4;
  context.shadowBlur = 15;
  context.stroke();
  if (this.type === 'background') {
    this.x = this.x - .5;
  } else {
    this.x -= 10;
  }


};

module.exports = Glitter;