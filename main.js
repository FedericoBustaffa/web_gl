
function run() {
	// INIZIALIZZAZIONE WEBGL -------------------------
	var canvas = document.getElementById("CANVAS");
	/** @type {WebGLRenderingContext} */
	var gl = canvas.getContext('webgl');

	// SHADER ------------------------------------------
	// vertex shader
	var vsSource =
		`attribute vec3 aPosition;
    	attribute vec3 aColor;

		uniform mat4 transformationMatrix;

		varying vec3 vColor;

		void main()
		{
			vColor = aColor;
			gl_Position = transformationMatrix * vec4(aPosition, 1.0);
		}`;

	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, vsSource);
	gl.compileShader(vertexShader);

	// vertex compiling info
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.log("vertex compiling error:", gl.getShaderInfoLog(vertexShader));
		return null;
	}
	else
		console.log("vertex compiling success");

	// fragment shader
	var fsSource =
		`precision highp float;
		
		varying vec3 vColor;
		
		void main()
		{
			gl_FragColor = vec4(vColor, 1.0);
		}`;

	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, fsSource);
	gl.compileShader(fragmentShader);

	// fragment shader compiling info
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.log("fragment compiling error:", gl.getShaderInfoLog(fragmentShader));
		return null;
	}
	else
		console.log("fragment compiling success");

	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	gl.validateProgram(program);

	// program compile info
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.log("program linking error:", gl.getProgramInfoLog(program));
		return null;
	}
	else
		console.log("program linking success");

	gl.useProgram(program);

	// GEOMETRY ----------------------------------------------------------
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

	// TRANSFORMATIONS --------------------------------------------
	var translationMatrix = glMatrix.mat4.create();
	glMatrix.mat4.fromTranslation(translationMatrix, [0.0, 0.0, 0.0]);

	var scaleMatrix = glMatrix.mat4.create();
	glMatrix.mat4.fromScaling(scaleMatrix, [1.0, 1.0, 1.0]);

	var rotationMatrix = glMatrix.mat4.create();
	glMatrix.mat4.fromRotation(rotationMatrix, 0.0, [0, 0, 0]);

	var transformationMatrix = glMatrix.mat4.create();
	glMatrix.mat4.mul(transformationMatrix, transformationMatrix, translationMatrix);
	glMatrix.mat4.mul(transformationMatrix, transformationMatrix, scaleMatrix);
	glMatrix.mat4.mul(transformationMatrix, transformationMatrix, rotationMatrix);

	var transformationLocation = gl.getUniformLocation(program, "transformationMatrix");
	gl.uniformMatrix4fv(transformationLocation, false, transformationMatrix);

	// DRAW ----------------------------------------------------
	var angle = 0.01;
	var loop = function () {
		gl.enable(gl.DEPTH_TEST);

		glMatrix.mat4.rotate(transformationMatrix, transformationMatrix, angle, [1, 1, 0]);
		gl.uniformMatrix4fv(transformationLocation, false, transformationMatrix);

		gl.clearColor(0.8, 0.8, 0.8, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
}

window.onload = run;
