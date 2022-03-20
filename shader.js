
function buildShader() {
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

	return program;
}