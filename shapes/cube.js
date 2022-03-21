
class Cube {
	constructor(shader) {
		this.vertices = new Float32Array([
			-0.5, -0.5, 0.5,	// left bottom front
			-0.5, 0.5, 0.5,	// left top front
			0.5, 0.5, 0.5,		// right top front
			0.5, -0.5, 0.5,	// right bottom front
			-0.5, -0.5, -0.5,	// left bottom back
			-0.5, 0.5, -0.5, 	// left top back
			0.5, 0.5, -0.5,		// right top back
			0.5, -0.5, -0.5		// right bottom back
		]);

		this.indices = new Uint16Array([
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

		this.color = new Float32Array([
			1.0, 0.0, 0.0,	// red
			0.0, 1.0, 0.0,	// green
			0.0, 0.0, 1.0,	// blue
			1.0, 1.0, 0.0,	// yellow
			0.0, 1.0, 1.0,	// cyan
			1.0, 0.0, 1.0,	// magenta
			1.0, 1.0, 1.0,	// white
			0.0, 0.0, 0.0	// black
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

	getIndices() {
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