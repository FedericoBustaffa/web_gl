
class Shape {
	constructor(shader, attributes, layout) {
		this.shader = shader;

		this.attribute_buffer = [];
		this.layout = layout;
		for (let i = 0; i < attributes.length; i++) {
			this.attribute_buffer.push(new Buffer(attributes[i]));
		}

		this.vertex_array = new VertexArray();

		this.index_buffer = new IndexBuffer(indices);
	}

	getIndices() {
		return this.index_buffer.size();
	}

	bind() {
		this.vertex_array.bind();
		this.vertex_buffer.bind();
		this.index_buffer.bind();
		this.color_buffer.bind();
	}

	unbind() {
		this.vertex_array.unbind();
		this.vertex_buffer.unbind();
		this.index_buffer.unbind();
		this.color_buffer.unbind();
	}
}