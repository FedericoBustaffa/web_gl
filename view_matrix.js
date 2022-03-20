
class ViewMatrix {
	constructor(location) {
		this.location = location;
		this.matrix = glMatrix.mat4.create();
		glMatrix.mat4.identity(this.matrix);
		gl.uniformMatrix4fv(this.location, false, this.matrix);
	}
}