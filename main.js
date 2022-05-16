
function setup() {
	// WebGL init
	canvas = document.getElementById("CANVAS");
	gl = canvas.getContext('webgl');

	// core //
	var shader = new Shader();
	var renderer = new Renderer();
	var cube = new Cube(shader);

	// MVP
	var model = new ModelMatrix(shader.model_matrix_location);
	var view = new ViewMatrix(shader.view_matrix_location);
	var projection = new ProjectionMatrix(shader.projection_matrix_location);

	// static transformations
	model.translate([0, 0, -20]);

	// eventi
	window.addEventListener("keydown", e => {
		switch (e.code) {
			// camera rotation
			case "ArrowUp": view.rotate(0.05, [1, 0, 0]); break;
			case "ArrowLeft": view.rotate(0.05, [0, 1, 0]); break;
			case "ArrowRight": view.rotate(-0.05, [0, 1, 0]); break;
			case "ArrowDown": view.rotate(-0.05, [1, 0, 0]); break;

			// camera translation
			case "KeyW": view.translate([0, 0, 0.5]); break;
			case "KeyA": view.translate([-0.5, 0, 0]); break;
			case "KeyD": view.translate([0.5, 0, 0]); break;
			case "KeyS": view.translate([0, 0, -0.5]); break;

			default: break;
		}
	}, true);

	// RUNNING LOOP
	function run() {
		gl.enable(gl.DEPTH_TEST);

		// dynamic transformations

		// BG COLOR
		renderer.bgColor(0.8, 0.8, 0.8);

		// DRAW
		renderer.draw(cube);

		requestAnimationFrame(run);
	};
	run();
}

window.onload = setup;
