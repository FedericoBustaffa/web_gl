
class Cube extends Shape {
	constructor(shader) {
		attributes = [];
		attributes.push(new Float32Array([
			-1.0, -1.0, 1.0,	// left bottom front
			-1.0, 1.0, 1.0,		// left top front
			1.0, 1.0, 1.0,		// right top front
			1.0, -1.0, 1.0,		// right bottom front
			-1.0, -1.0, -1.0,	// left bottom back
			-1.0, 1.0, -1.0, 	// left top back
			1.0, 1.0, -1.0,		// right top back
			1.0, -1.0, -1.0		// right bottom back
		]));

		var indices = new Uint16Array([
			// FRONT
			0, 1, 2,
			2, 3, 0,

			// BACK
			4, 5, 6,
			6, 7, 4,

			// LEFT
			4, 5, 1,
			1, 0, 4,

			// RIGHT
			7, 6, 2,
			2, 3, 7,

			// TOP
			1, 5, 6,
			6, 2, 1,

			// BOTTOM
			0, 4, 7,
			7, 3, 0
		]);

		attributes.push(new Float32Array([
			1.0, 0.0, 0.0,	// red
			0.0, 1.0, 0.0,	// green
			0.0, 0.0, 1.0,	// blue
			1.0, 1.0, 0.0,	// yellow
			0.0, 1.0, 1.0,	// cyan
			1.0, 0.0, 1.0,	// magenta
			1.0, 1.0, 1.0,	// white
			0.0, 0.0, 0.0	// black
		]));

		layout = new Layout();
		layout.add(shader.position_location, 3, 4 * 3);
		layout.add(shader.color_location, 3, 4 * 3);

		super(shader, attributes, indices, layout);
	}
}