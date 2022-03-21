
class ViewMatrix {
	constructor(location) {
		this.location = location;
		this.matrix = glMatrix.mat4.create();
		glMatrix.mat4.identity(this.matrix);
		gl.uniformMatrix4fv(location, false, this.matrix);
	}

	translate(vector) {
		glMatrix.mat4.translate(this.matrix, this.matrix, vector);
		gl.uniformMatrix4fv(this.location, false, this.matrix);
	}

	rotate(angle, axis) {
		glMatrix.mat4.rotate(this.matrix, this.matrix, -angle, axis);
		gl.uniformMatrix4fv(this.location, false, this.matrix);
	}

	scale(scale_value) {
		glMatrix.mat4.scale(this.matrix, this.matrix, [1 / scale_value, 1 / scale_value, 1 / scale_value]);
		gl.uniformMatrix4fv(this.location, false, this.matrix);
	}
}