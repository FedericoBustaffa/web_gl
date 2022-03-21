
function run() {

	canvas = document.getElementById("CANVAS");
	gl = canvas.getContext('webgl');

	var shader = new Shader();
	var cube = new Cube(shader);
	cube.setFaceColor(0, 1.0, 0.0, 0.0);
	cube.setFaceColor(1, 0.0, 1.0, 0.0);
	cube.setFaceColor(2, 0.0, 0.0, 1.0);
	cube.setFaceColor(3, 1.0, 1.0, 1.0);
	cube.setFaceColor(4, 0.0, 0.0, 0.0);
	cube.setFaceColor(5, 1.0, 1.0, 0.0);

	var model = new ModelMatrix(shader.model_matrix_location);
	var view = new ViewMatrix(shader.view_matrix_location);
	var projection = new ProjectionMatrix(shader.projection_matrix_location);
	// RUNNING LOOP
	//var angle = 0.01;
	var loop = function () {
		gl.enable(gl.DEPTH_TEST);

		// dynamic transformations

		// BG COLOR
		gl.clearColor(0.8, 0.8, 0.8, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// DRAW CALL
		gl.drawElements(gl.TRIANGLES, cube.draw_indices(), gl.UNSIGNED_SHORT, 0);

		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
}

window.onload = run;
