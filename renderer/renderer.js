
class Renderer {
	constructor() {
	}

	bgColor(r, g, b) {
		gl.clearColor(r, g, b, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	}

	draw(indexed_shape) {
		indexed_shape.bind();
		gl.drawElements(gl.TRIANGLES, indexed_shape.getIndices(), gl.UNSIGNED_SHORT, 0);
		indexed_shape.unbind();
	}
}