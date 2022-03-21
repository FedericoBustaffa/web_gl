
class Buffer {
	constructor(data) {
		this.data = data;
		this.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.STATIC_DRAW);
	}

	bind() {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
	}

	unbind() {
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}

	updateData(data) {
		this.data = data;
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.STATIC_DRAW);
	}
}

class IndexBuffer {
	constructor(indices) {
		// costruttore
		this.indices = indices;
		this.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
	}

	// metodi
	bind() {
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
	}
	unbind() {
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	}

	size() {
		return this.indices.length;
	}
}