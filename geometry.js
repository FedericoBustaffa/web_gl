
function buildGeometry(program) {
	var vertices = new Float32Array([
		// FRONT
		-0.5, -0.5, -0.5,
		-0.5, 0.5, -0.5,
		0.5, 0.5, -0.5,
		0.5, -0.5, -0.5,

		// TOP
		-0.5, 0.5, -0.5,
		-0.5, 0.5, 0.5,
		0.5, 0.5, 0.5,
		0.5, 0.5, -0.5,

		// LEFT
		-0.5, -0.5, -0.5,
		-0.5, 0.5, -0.5,
		-0.5, 0.5, 0.5,
		-0.5, -0.5, 0.5,

		// BACK
		-0.5, -0.5, 0.5,
		-0.5, 0.5, 0.5,
		0.5, 0.5, 0.5,
		0.5, -0.5, 0.5,

		// BOTTOM
		-0.5, -0.5, -0.5,
		-0.5, -0.5, 0.5,
		0.5, -0.5, 0.5,
		0.5, -0.5, -0.5,

		// RIGHT
		0.5, -0.5, -0.5,
		0.5, 0.5, -0.5,
		0.5, 0.5, 0.5,
		0.5, -0.5, 0.5
	]);

	var indices = new Uint16Array([
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

	var verticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

	var indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

	var posLocation = gl.getAttribLocation(program, "aPosition");
	gl.enableVertexAttribArray(posLocation);
	gl.vertexAttribPointer(posLocation, 3, gl.FLOAT, false, 3 * 4, 0);

	// COLOR
	var color = new Float32Array([
		// FRONT red
		1.0, 0.2, 0.2,
		1.0, 0.2, 0.2,
		1.0, 0.2, 0.2,
		1.0, 0.2, 0.2,

		// BACK black
		0.3, 0.5, 0.8,
		0.3, 0.5, 0.8,
		0.3, 0.5, 0.8,
		0.3, 0.5, 0.8,

		// RIGHT green
		0.2, 1.0, 0.2,
		0.2, 1.0, 0.2,
		0.2, 1.0, 0.2,
		0.2, 1.0, 0.2,

		// LEFT blue
		0.3, 0.2, 1.0,
		0.3, 0.2, 1.0,
		0.3, 0.2, 1.0,
		0.3, 0.2, 1.0,

		// TOP yellow
		1.0, 1.0, 0.0,
		1.0, 1.0, 0.0,
		1.0, 1.0, 0.0,
		1.0, 1.0, 0.0,

		// BOTTOM white
		0.5, 0.8, 0.8,
		0.5, 0.8, 0.8,
		0.5, 0.8, 0.8,
		0.5, 0.8, 0.8
	]);

	var colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, color, gl.STATIC_DRAW);

	var colorLocation = gl.getAttribLocation(program, "aColor");
	gl.enableVertexAttribArray(colorLocation);
	gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 3 * 4, 0);
}