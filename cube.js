
class Cube {
	constructor(shader, side_length = 1.0, r = 0.0, g = 0.0, b = 0.0) {
		var half = side_length / 2;
		this.vertices = new Float32Array([
			// FRONT
			-half, -half, -half,
			-half, half, -half,
			half, half, -half,
			half, -half, -half,

			// TOP
			-half, half, -half,
			-half, half, half,
			half, half, half,
			half, half, -half,

			// LEFT
			-half, -half, -half,
			-half, half, -half,
			-half, half, half,
			-half, -half, half,

			// BACK
			-half, -half, half,
			-half, half, half,
			half, half, half,
			half, -half, half,

			// BOTTOM
			-half, -half, -half,
			-half, -half, half,
			half, -half, half,
			half, -half, -half,

			// RIGHT
			half, -half, -half,
			half, half, -half,
			half, half, half,
			half, -half, half
		]);

		this.indices = new Uint16Array([
			// FRONT
			0, 1, 2,
			2, 3, 0,

			// BACK
			4, 5, 6,
			6, 7, 4,

			// RIGHT
			8, 9, 10,
			10, 11, 8,

			// LEFT
			12, 13, 14,
			14, 15, 12,

			// TOP
			16, 17, 18,
			18, 19, 16,

			// BOTTOM
			20, 21, 22,
			22, 23, 20
		]);

		this.color = new Float32Array([
			// FRONT
			r, g, b,
			r, g, b,
			r, g, b,
			r, g, b,

			// TOP
			r, g, b,
			r, g, b,
			r, g, b,
			r, g, b,

			// LEFT
			r, g, b,
			r, g, b,
			r, g, b,
			r, g, b,

			// LEFT
			r, g, b,
			r, g, b,
			r, g, b,
			r, g, b,

			// TOP
			r, g, b,
			r, g, b,
			r, g, b,
			r, g, b,

			// BOTTOM
			r, g, b,
			r, g, b,
			r, g, b,
			r, g, b
		]);

		this.shader = shader;
		this.vertex_buffer = new Buffer(this.vertices);
		gl.enableVertexAttribArray(this.shader.position_location);
		gl.vertexAttribPointer(this.shader.position_location, 3, gl.FLOAT, false, 3 * 4, 0);

		this.index_buffer = new IndexBuffer(this.indices);

		// COLOR
		this.color_buffer = new Buffer(this.color);
		gl.enableVertexAttribArray(this.shader.color_location);
		gl.vertexAttribPointer(this.shader.color_location, 3, gl.FLOAT, false, 3 * 4, 0);
	}

	draw_indices() {
		return this.index_buffer.size();
	}

	fillColor(r, g, b) {
		for (let i = 0; i < this.color.length; i += 3) {
			this.color[i] = r;
			this.color[i + 1] = g;
			this.color[i + 2] = b;
		}

		this.color_buffer.updateData(this.color);
	}

	setFaceColor(face, r, g, b) {
		var index = face * 12;
		for (let i = index; i < index + 12; i += 3) {
			this.color[i] = r;
			this.color[i + 1] = g;
			this.color[i + 2] = b;
		}

		this.color_buffer.updateData(this.color);
	}
}