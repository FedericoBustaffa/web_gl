
class Layout {
	constructor(location, size, stride) {
		this.location = null;
		this.size = null;
		this.stride = null;
	}

	add(location, size, stride) {

	}
}

class VertexArray {
	constructor() {
		this.locations = [];
	}

	addLocation(location) {
		this.locations.push(location);
	}

	enable() {
		for (let i = 0; i < this.locations.length; i++) {
			gl.enableVertexAttribArray(this.locations[i]);
			gl.vertexAttribPointer(this.locations[i], 3, gl.FLOAT, false, 3 * 4, 0);
		}
	}

	disable() {
		gl.enableVertexAttribArray(null);
	}
}

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

	updateData(data) {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.STATIC_DRAW);
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

	size() {
		return this.size;
	}
}