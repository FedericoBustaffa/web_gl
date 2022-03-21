
class Shader {
	constructor() {
		// dati
		this.program = null;
		this.position_location = null;
		this.color_location = null;
		this.model_matrix_location = null;

		// vertex shader
		var vs_source =
			`attribute vec3 a_position;
			attribute vec3 a_color;

			uniform mat4 model;
			uniform mat4 view;
			uniform mat4 projection;

			varying vec3 v_color;

			void main()
			{
				v_color = a_color;
				gl_Position = projection * view * model * vec4(a_position, 1.0);
			}`;

		var vertex_shader = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vertex_shader, vs_source);
		gl.compileShader(vertex_shader);

		// vertex compiling info
		if (!gl.getShaderParameter(vertex_shader, gl.COMPILE_STATUS)) {
			console.log("vertex compiling error:", gl.getShaderInfoLog(vertex_shader));
			return null;
		}

		// fragment shader
		var fs_source =
			`precision highp float;
		
			varying vec3 v_color;
		
			void main()
			{
				gl_FragColor = vec4(v_color, 1.0);
			}`;

		var fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fragment_shader, fs_source);
		gl.compileShader(fragment_shader);

		// fragment shader compiling info
		if (!gl.getShaderParameter(fragment_shader, gl.COMPILE_STATUS)) {
			console.log("fragment compiling error:", gl.getShaderInfoLog(fragment_shader));
			return null;
		}

		this.program = gl.createProgram();
		gl.attachShader(this.program, vertex_shader);
		gl.attachShader(this.program, fragment_shader);
		gl.linkProgram(this.program);
		gl.validateProgram(this.program);

		// program compile info
		if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
			console.log("program linking error:", gl.getProgramInfoLog(program));
			return null;
		}

		gl.useProgram(this.program);

		this.position_location = gl.getAttribLocation(this.program, "a_position");
		this.color_location = gl.getAttribLocation(this.program, "a_color");
		this.model_matrix_location = gl.getUniformLocation(this.program, "model");
		this.view_matrix_location = gl.getUniformLocation(this.program, "view");
		this.projection_matrix_location = gl.getUniformLocation(this.program, "projection");
	}

	// metodi
	bind() {
		gl.useProgram(this.program);
	}

	unbind() {
		gl.useProgram(null);
	}
}