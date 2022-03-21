
class ProjectionMatrix {
	constructor(location) {
		this.location = location;
		this.matrix = glMatrix.mat4.create();
		glMatrix.mat4.identity(this.matrix);
		glMatrix.mat4.perspective(this.matrix, Math.PI / 4.0, 1.0, 0.001, -100.0);
		gl.uniformMatrix4fv(location, false, this.matrix);
	}
}