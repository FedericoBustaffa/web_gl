/** @type {WebGLRenderingContext} */
var gl = null;

function draw() {
	gl.clearColor(0.2, 0.2, 0.2, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
}

function run() {
	init();
	setupGeometry();
	buildShaders();
	draw();
}

window.onload = run;
