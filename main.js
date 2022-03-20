
function run() {
	// INIZIALIZZAZIONE WEBGL -------------------------
	var canvas = document.getElementById("CANVAS");
	gl = canvas.getContext('webgl');

	var program = buildShader();
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
	var loop = function () {
		gl.enable(gl.DEPTH_TEST);

		glMatrix.mat4.rotate(transformationMatrix, transformationMatrix, angle, [1, 1, 0]);
		gl.uniformMatrix4fv(transformationLocation, false, transformationMatrix);

		gl.clearColor(0.8, 0.8, 0.8, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
}

window.onload = run;
