
class Shape {
	constructor(shader, vertices, indices, color) {
		this.shader = shader;

		this.vertex_buffer = new Buffer(vertices);
		gl.enableVertexAttribArray(shader.position_location);
		gl.vertexAttribPointer(shader.position_location, 3, gl.FLOAT, false, 4 * 3, 0);

		this.index_buffer = new IndexBuffer(indices);

		this.color_buffer = new Buffer(color);
		gl.enableVertexAttribArray(shader.color_location);
		gl.vertexAttribPointer(shader.color_location, 3, gl.FLOAT, false, 4 * 3, 0)

	}

	getIndices() {
		return this.index_buffer.size;
	}

	bind() {
		this.vertex_buffer.bind();
		gl.enableVertexAttribArray(this.shader.position_location);
		gl.vertexAttribPointer(this.shader.position_location, 3, gl.FLOAT, false, 4 * 3, 0);

		this.index_buffer.bind();

		this.color_buffer.bind();
		gl.enableVertexAttribArray(this.shader.color_location);
		gl.vertexAttribPointer(this.shader.color_location, 3, gl.FLOAT, false, 4 * 3, 0);
	}

	unbind() {
		gl.enableVertexAttribArray(null);
		this.vertex_buffer.unbind();
		this.index_buffer.unbind();
		this.color_buffer.unbind();
	}
}