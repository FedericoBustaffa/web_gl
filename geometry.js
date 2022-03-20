
function Cube(program, side_length = 1.0, r = 0.0, g = 0.0, b = 0.0) {

	this.program = program;
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

	this.verticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

	this.indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

	var posLocation = gl.getAttribLocation(this.program, "aPosition");
	gl.enableVertexAttribArray(posLocation);
	gl.vertexAttribPointer(posLocation, 3, gl.FLOAT, false, 3 * 4, 0);

	this.setSideLength = function (new_length) {
		for (let i = 0; i < this.vertices.length; i++) {
			if (this.vertices[i] < 0)
				this.vertices[i] = -(new_length / 2);
			else
				this.vertices[i] = new_length / 2;
		}

		gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
	}

	// COLOR
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

	this.colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.color, gl.STATIC_DRAW);

	this.colorLocation = gl.getAttribLocation(this.program, "aColor");
	gl.enableVertexAttribArray(this.colorLocation);
	gl.vertexAttribPointer(this.colorLocation, 3, gl.FLOAT, false, 3 * 4, 0);

	this.fillColor = function (r, g, b) {
		for (let i = 0; i < this.color.length; i += 3) {
			this.color[i] = r;
			this.color[i + 1] = g;
			this.color[i + 2] = b;
		}

		gl.bufferData(gl.ARRAY_BUFFER, this.color, gl.STATIC_DRAW);
	}

	this.setFaceColor = function (face, r, g, b) {
		var index = face * 12;
		for (let i = index; i < index + 12; i += 3) {
			this.color[i] = r;
			this.color[i + 1] = g;
			this.color[i + 2] = b;
		}

		gl.bufferData(gl.ARRAY_BUFFER, this.color, gl.STATIC_DRAW);
	}

}