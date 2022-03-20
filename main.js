
function run() {

	var canvas = document.getElementById("CANVAS");
	gl = canvas.getContext('webgl');

	var shader = new Shader();
	var cube = new Cube(shader);
	cube.setFaceColor(0, 1.0, 0.0, 0.0);
	cube.setFaceColor(1, 0.0, 1.0, 0.0);
	cube.setFaceColor(2, 0.0, 0.0, 1.0);
	cube.setFaceColor(3, 1.0, 1.0, 1.0);
	cube.setFaceColor(4, 0.0, 0.0, 0.0);
	cube.setFaceColor(5, 1.0, 1.0, 0.0);

	var model_matrix = new ModelMatrix(shader.model_matrix_location);
	var view_matrix = new ViewMatrix(shader.view_matrix_location);

	// RUNNING LOOP
	//var angle = 0.01;
	var loop = function () {
		gl.enable(gl.DEPTH_TEST);

		// dynamic transformations
		model_matrix.rotate(0.01, [1, 1, 1]);

		// BG COLOR
		gl.clearColor(0.8, 0.8, 0.8, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// DRAW CALL
		gl.drawElements(gl.TRIANGLES, cube.draw_indices(), gl.UNSIGNED_SHORT, 0);

		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);

	/*
	var cube = new Cube(program);
	cube.setFaceColor(0, 1.0, 0.0, 0.0);
	cube.setFaceColor(1, 0.0, 0.0, 1.0);
	cube.setFaceColor(2, 0.0, 1.0, 0.0);
	cube.setFaceColor(3, 1.0, 1.0, 0.0);
	cube.setFaceColor(4, 1.0, 1.0, 1.0);
	cube.setFaceColor(5, 0.0, 0.0, 0.0);

	// TRANSFORMATION
	var translationMatrix = glMatrix.mat4.create();
	glMatrix.mat4.fromTranslation(translationMatrix, [0.0, 0.0, 0.0]);

	var scaleMatrix = glMatrix.mat4.create();
	glMatrix.mat4.fromScaling(scaleMatrix, [1.0, 1.0, 1.0]);

	var rotationMatrix = glMatrix.mat4.create();
	glMatrix.mat4.fromRotation(rotationMatrix, 0.0, [0, 0, 0]);

	var transformationMatrix = glMatrix.mat4.create();
	glMatrix.mat4.mul(transformationMatrix, transformationMatrix, translationMatrix);
	glMatrix.mat4.mul(transformationMatrix, transformationMatrix, scaleMatrix);
	glMatrix.mat4.mul(transformationMatrix, transformationMatrix, rotationMatrix);

	var transformationLocation = gl.getUniformLocation(program, "transformationMatrix");
	gl.uniformMatrix4fv(transformationLocation, false, transformationMatrix);

	// DRAW ----------------------------------------------------
	var angle = 0.01;
	*/
}

window.onload = run;
