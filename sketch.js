// Reinterpreting time using dots and lines

let base_r = 50;
let small_r = 2;
let line_r = 6;
let ratios = [1, 3, 6];
let width = 700;
let height = 700;
let c_x = width / 2;
let c_y = height / 2;

const color_maps = {
	"sec": "rgba(239,83,80, 1)",
	"min": "rgba(255,179,0, 1)",
	"hour": "rgba(139,195,74, 1)",
}

class Circle {
	constructor(c_x, c_y, radius) {
	  this.c_x = c_x;
	  this.c_y = c_y;
	  this.radius = radius;
	}
}

function setup() {
	createCanvas(width, height); // make an HTML canvas element width x height pixels
}

// concentric version
function draw() {
	background(220);

	// Debugging time
	// textSize(32);
	// fill(180);
	// text(hour(), 10, 630);
	// fill(100);
	// text(minute(), 10, 660);
	// fill(0);
	// text(second(), 10, 690);

	// declare time variables
	let hr = hour();
	let min = minute();
	let sec = second();

	// declare time circles
	let c_hour = new Circle(
		c_x,
		c_y,
		ratios[2]*base_r);

	let c_min = new Circle(
		c_x, 
		c_y,
		ratios[1]*base_r);

	let c_sec = new Circle(c_x, 
		c_y, 
		ratios[0]*base_r);

	// Draw concentric lines
	// draw hour
	strokeWeight(line_r * ratios[2]);
	stroke(color_maps['hour']);
	for (let h=0; h < hr; h++){
		let angle = map(h, 0, 23, 0, -TWO_PI, true);
		line(
			c_x + (c_min.radius + line_r * ratios[2]) * Math.cos(angle),
			c_y + (c_min.radius + line_r * ratios[2]) * Math.sin(angle),
			c_hour.c_x + c_hour.radius * Math.cos(angle), 
			c_hour.c_y + c_hour.radius * Math.sin(angle)
		);
	}
	noFill();
	noStroke();

	// draw minute
	strokeWeight(6 * ratios[1]);
	stroke(color_maps['min']);
	for (let m=0; m < min; m++){
		let angle = map(m, 0, 59, 0, -TWO_PI, true);
		line(
			c_x + (c_sec.radius + line_r * ratios[1]) * Math.cos(angle),
			c_y + (c_sec.radius + line_r * ratios[1]) * Math.sin(angle),
			c_min.c_x + c_min.radius * Math.cos(angle), 
			c_min.c_y + c_min.radius * Math.sin(angle));
	}

	noFill();
	noStroke();

	// draw seconds
	strokeWeight(6 * ratios[0]);
	stroke(color_maps['sec']);
	for (let s=0; s < sec; s++){
		let angle = map(s, 0, 59, 0, -TWO_PI, true);
		line(
			c_x + (0.5 * line_r * ratios[2]) * Math.cos(angle), 
			c_y + (0.5 * line_r * ratios[2]) * Math.sin(angle), 
			c_sec.c_x + c_sec.radius * Math.cos(angle), 
			c_sec.c_y + c_sec.radius * Math.sin(angle));
	}

	noFill();
	noStroke();

	// Draw concentric center circles
	// hour
	fill(color_maps['hour'])
	circle(
		c_x, 
		c_y, 
		small_r * ratios[2]
	);

	// min
	fill(color_maps['min'])
	circle(
		c_x, 
		c_y, 
		small_r * ratios[1]
	);

	// sec
	fill(color_maps['sec'])
	circle(
		c_x, 
		c_y, 
		small_r * ratios[0]
	);

	noFill();
	noStroke();	
}
