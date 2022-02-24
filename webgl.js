/** @type {WebGLRenderingContext} */
var gl = null;

function setupWebGL() {
	var canvas = document.getElementById("CANVAS");
	gl = canvas.getContext('webgl');
}

var positionAttribIndex = 0;

function setupWhatToDraw() {
	var positions = [
		0.0, 0.0,
		1.0, 0.0,
		0.0, 1.0
	];
	var typedPositions = new Float32Array(positions);
	var positionsBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, typedPositions, gl.STATIC_DRAW);
	gl.enableVertexAttribArray(positionAttribIndex);
	gl.vertexAttribPointer(positionAttribIndex, 2, gl.FLOAT, false, 8, 0);
}

function setupHowToDraw() {
	var vs_source =
		`attribute vec2 aPosition;
		
		void main(void)
		{
			gl_Position = vec4(aPosition, 0.0, 1.0);
		}`;
	var vertex_shader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertex_shader, vs_source);
	gl.compileShader(vertex_shader);

	var fs_source =
		`precision lowp float;
		
		void main(void)
		{
			gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
		}`;
	var fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragment_shader, fs_source);
	gl.compileShader(fragment_shader);

	var program = gl.createProgram();
	gl.attachShader(program, vertex_shader);
	gl.attachShader(program, fragment_shader);
	gl.bindAttribLocation(program, positionAttribIndex, "aPosition");
	gl.linkProgram(program);
	gl.useProgram(program);
}

function draw() {
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, 3);
}

function hello_draw() {
	setupWebGL();
	setupWhatToDraw();
	setupHowToDraw();
	draw();
}

window.onload = hello_draw;
