
"use strict"

class Transform
{
    constructor()
    {
        this.translation = new Vector3f(0, 0, 0);
        this.rotation = new Quaternion();
    }

    translate = (x, y, z) => {
        this.translation = this.translation.add(x, y, z)
    }

    setTranslation = (x, y, z) => {
        this.translation = new Vector3f(x, y, z)
    }

    rotate = (x, y, z, w) => {
        this.rotation = this.rotation.rotate(x, y, z, w);
    }

    setRotation = (x, y, z, w) => {
        this.rotation = new Quaternion(x, y, z, w)
    }

    getTranslationMatrix = () => {
        return Matrix4f.translation( this.translation.x, this.translation.y, this.translation.z );
    }

    getRotationMatrix = () => {
        return this.rotation.toRotationMatrix()
    }

    getTransformationMatrix = () => {
        return this.getTranslationMatrix().mul( this.getRotationMatrix() ) // .mul( scale.getScaleMatrix() ) );
    }
}