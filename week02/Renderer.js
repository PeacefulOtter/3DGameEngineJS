"use strict"


 class Renderer {

    constructor( model, shader ) 
    {
        this.model = model;
        this.shader = shader;
        this.transform = new Transform();
        this.vertexCount = model.vertices.length
    }

    addAttribute = (name, data, dimension) => {
        this.shader.addAttribute( name, data, dimension )
    }

    render = () => {
        this.shader.bind()
        this.shader.updateUniforms( this.transform )
        this.draw()
    }

    // need to be overwritten by herited classes
    draw = () => {}
}