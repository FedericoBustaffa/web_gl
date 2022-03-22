
function setup() {
	canvas = document.getElementById("CANVAS");
	gl = canvas.getContext('webgl');

	// event listener


	var shader = new Shader();
	var renderer = new Renderer();
	var cube = new Cube(shader);

	// MVP
	var model = new ModelMatrix(shader.model_matrix_location);
	var view = new ViewMatrix(shader.view_matrix_location);
	var projection = new ProjectionMatrix(shader.projection_matrix_location);

	view.translate([0, 0, -10]);
	// RUNNING LOOP
	function run() {
		gl.enable(gl.DEPTH_TEST);

		// dynamic transformations
		view.rotate(0.01, [0, 1, 0]);

		// BG COLOR
		renderer.bgColor(0.8, 0.8, 0.8);

		// DRAW
		renderer.draw(cube);

		requestAnimationFrame(run);
	};
	run();
}

window.onload = setup;
