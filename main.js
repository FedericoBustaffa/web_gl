
function run() {

	canvas = document.getElementById("CANVAS");
	gl = canvas.getContext('webgl');

	var shader = new Shader();

	/*	var cube = new Cube(shader, 0.5);
		cube.setFaceColor(0, 1.0, 0.0, 0.0);
		cube.setFaceColor(1, 0.0, 1.0, 0.0);
		cube.setFaceColor(2, 0.0, 0.0, 1.0);
		cube.setFaceColor(3, 1.0, 0.0, 0.0);
		cube.setFaceColor(4, 1.0, 1.0, 0.0);
	*/
	var vertices = new Float32Array([
		-0.5, -0.5, -200.0,
		-0.5, 0.5, -200.0,
		0.5, 0.5, -200.0,
		0.5, -0.5, -200.0
	]);

	var indices = new Uint16Array([
		0, 1, 2,
		2, 3, 0
	]);

	var color = new Float32Array([
		1.0, 0.0, 0.0,
		1.0, 0.0, 0.0,
		1.0, 0.0, 0.0,
		1.0, 0.0, 0.0
	]);
	var shape = new Shape(shader, vertices, indices, color);

	// MVP
	var model = new ModelMatrix(shader.model_matrix_location);
	var view = new ViewMatrix(shader.view_matrix_location);
	var projection = new ProjectionMatrix(shader.projection_matrix_location);
	//view.translate([-1.0, -1.0, -5.0]);

	// RUNNING LOOP
	var loop = function () {
		gl.enable(gl.DEPTH_TEST);

		// dynamic transformations
		//view.rotate(0.01, [1, 1, 0]);

		// BG COLOR
		gl.clearColor(0.8, 0.8, 0.8, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// DRAW CALL
		gl.drawElements(gl.TRIANGLES, shape.getIndices(), gl.UNSIGNED_SHORT, 0);

		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
}

window.onload = run;
