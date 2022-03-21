class Square extends Shape {
	constructor(shader) {
		var vertices = new Float32Array([
			-1.0, -1.0, 0.0,
			-1.0, 1.0, 0.0,
			1.0, 1.0, 0.0,
			1.0, -1.0, 0.0
		]);

		var indices = new Uint16Array([
			0, 1, 2,
			2, 3, 0
		]);

		var color = new Float32Array([
			1.0, 0.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 0.0, 1.0,
			1.0, 1.0, 0.0
		]);

		super(shader, vertices, indices, color);
	}
}