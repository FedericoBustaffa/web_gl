
class Shape {
	constructor(shader, vertices, indices, color) {
		this.shader = shader;
		this.vertices = vertices;
		this.indices = indices;
		this.color = color;

		this.vertex_buffer = new Buffer(vertices);
		gl.enableVertexAttribArray(this.shader.position_location);
		gl.vertexAttribPointer(this.shader.position_location, 3, gl.FLOAT, false, 3 * 4, 0);

		this.index_buffer = new IndexBuffer(indices);

		this.color_buffer = new Buffer(color);
		gl.enableVertexAttribArray(this.shader.color_location);
		gl.vertexAttribPointer(this.shader.color_location, 3, gl.FLOAT, false, 3 * 4, 0);
	}

	getIndices() {
		return this.indices.length;
	}
}