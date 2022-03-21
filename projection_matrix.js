
class ProjectionMatrix {
	constructor(location) {
		this.location = location;
		this.matrix = glMatrix.mat4.create();
		glMatrix.mat4.identity(this.matrix);
		glMatrix.mat4.perspective(this.matrix, 3.14 / 1.5, 1.0, -2.0, 2.0);
		gl.uniformMatrix4fv(this.location, false, this.matrix);
	}
}