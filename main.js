
function run() {

	canvas = document.getElementById("CANVAS");
	gl = canvas.getContext('webgl');

	var shader = new Shader();
	var renderer = new Renderer(shader);
	var cube = new Cube(shader);

	// MVP
	var model = new ModelMatrix(shader.model_matrix_location);
	var view = new ViewMatrix(shader.view_matrix_location);
	var projection = new ProjectionMatrix(shader.projection_matrix_location);

	model.translate([0, 0, -10.0]);
	model.rotate(0.5, [1, 0, 0]);

	// RUNNING LOOP
	var loop = function () {
		gl.enable(gl.DEPTH_TEST);

		// dynamic transformations
		model.rotate(-0.01, [0, 1, 0]);

		// BG COLOR
		renderer.clear(0.8, 0.8, 0.8);

		// DRAW
		renderer.draw(cube);

		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
}

window.onload = run;
