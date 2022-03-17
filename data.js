
function init() {
	var canvas = document.getElementById("CANVAS");
	gl = canvas.getContext('webgl');
}

function setupGeometry() {

	var data = new Float32Array([
		-0.5, -0.5,
		-0.5, 0.5,
		0.5, 0.5,
		0.5, -0.5
	]);

	var indices = new Uint16Array([
		0, 1, 2,
		2, 3, 0
	]);

	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

	var indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

	gl.enableVertexAttribArray(0);
	gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 2 * 4, 0);
}
