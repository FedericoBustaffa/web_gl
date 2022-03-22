
class Buffer {
	constructor(data) {
		this.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
	}

	bind() {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
	}

	unbind() {
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}
}

class IndexBuffer {
	constructor(indices) {
		// costruttore
		this.size = indices.length;
		this.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
	}

	// metodi
	bind() {
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
	}
	unbind() {
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	}
}