/** @type {WebGLRenderingContext} */
var gl = null;

function setupWebGL() {
	var canvas = document.getElementById("CANVAS");
	gl = canvas.getContext("webgl");
}

function geometrySetup() {

	var data = new Float32Array([
		-0.5, -0.5,
		0.0, 0.5,
		0.5, -0.5
	]);

	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
	gl.enableVertexAttribArray(0);
	gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 8, 0);
}

function run() {
	setupWebGL();
	geometrySetup();
}

window.onload = run;
