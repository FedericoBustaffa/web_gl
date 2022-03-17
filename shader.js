
function buildShaders() {
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