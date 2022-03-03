/** @type {WebGLRenderingContext} */
var gl = null;

function setupWebGL() {
	var canvas = document.getElementById("CANVAS");
	gl = canvas.getContext('webgl');
}

function setupWhatToDraw() {

	var data = new Float32Array([
		-0.5, -0.5,
		-0.5,  0.5,
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

function setupHowToDraw() {
	var vsSource =
		`attribute vec2 aPosition;

		void main()
		{
			gl_Position = vec4(aPosition, 0.0, 1.0);
		}`;

	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, vsSource);
	gl.compileShader(vertexShader);

	var fsSource =
		`precision highp float;

		void main()
		{
			gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
		}`;

	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, fsSource);
	gl.compileShader(fragmentShader);

	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.bindAttribLocation(program, 0, "aPosition");
	gl.linkProgram(program);
	gl.useProgram(program);
}

function draw() {
	gl.clearColor(0.2, 0.2, 0.2, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
}

function run() {
	setupWebGL();
	setupWhatToDraw();
	setupHowToDraw();
	draw();
}

window.onload = run;
