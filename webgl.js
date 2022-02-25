/** @type {WebGLRenderingContext} */
var gl = null;

function setupWebGL() {
	var canvas = document.getElementById("CANVAS");
	gl = canvas.getContext('webgl');
}

var positionAttribIndex = 0;

function setupWhatToDraw() {

	var data = [
		// coordinate (x, y)	// colore (rgb)

		// primo triangolo
		-1.0, -0.1, 			//1.0, 0.0, 0.0,
		-1.0, 0.1, 			//1.0, 0.0, 0.0,
		1.0, -0.1, 			//0.0, 0.0, 1.0,

		// secondo triangolo
		1.0, 0.1, 			//1.0, 0.0, 0.0,
		1.0, -0.1, 			//0.0, 0.0, 1.0,
		-1.0, 0.1 			//1.0, 0.0, 0.0
	];

	var typedData = new Float32Array(data);
	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, typedData, gl.STATIC_DRAW);
	gl.enableVertexAttribArray(positionAttribIndex);
	gl.vertexAttribPointer(positionAttribIndex, 2, gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
}

function setupHowToDraw() {
	var vsSource =
		`attribute vec2 aPosition;
		varying vec2 vPosition;

		void main()
		{
			vPosition = aPosition;
			gl_Position = vec4(aPosition, 0.0, 1.0);
		}`;

	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, vsSource);
	gl.compileShader(vertexShader);

	var fsSource =
		`precision highp float;
		
		varying vec2 vPosition;
		vec3 color;
		
		void main()
		{
			if(vPosition.x < 0.0)
			{
				color.x = -vPosition.x;
				color.y = 1.0 + vPosition.x;
				color.z = 0.0;
			}
			else if(vPosition.x > 0.0)
			{
				color.x = 0.0;
				color.y = 1.0 - vPosition.x;
				color.z = vPosition.x;
			}
			else
			{
				color = vec3(0.0, 1.0, 0.0);
			}
			
			gl_FragColor = vec4(color, 1.0);
		}`;

	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, fsSource);
	gl.compileShader(fragmentShader);

	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.bindAttribLocation(program, positionAttribIndex, "aPosition");
	gl.linkProgram(program);
	gl.useProgram(program);
}

function draw() {
	gl.clearColor(0.2, 0.2, 0.2, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function run() {
	setupWebGL();
	setupWhatToDraw();
	setupHowToDraw();
	draw();
}

window.onload = run;
