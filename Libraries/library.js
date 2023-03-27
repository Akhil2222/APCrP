class GameObject{
    constructor(tags, transform, data){
        this.transform = transform
        this.tags = tags
        this.data = data
    }
    toJSON(){
        let retOBJ = {}
        for(let i of Object.keys(this)){
            retOBJ[i] = this[i].toJSON ? this[i].toJSON() : (typeof this[i] == "object" ? this[i] : [this[i]])
        }
        return retOBJ
    }
}
class Transform{
    constructor(pos,rot,scale){
        this.pos = pos
        this.rot = rot
        this.scale = scale
    }
    toJSON(){
        return {
            pos:this.pos,
            rot:[this.rot],
        }
    }
    move(...vect){
        for(let i in this.pos){
            this.pos[i] += vect[i]         
        }
        return this
    }
    resize(n){
        for(let i in this.scale){
            this.scale[i] = this.scale[i]*n    
        }
        return this
    }
    resizeEach(...scale){
        for(let i in this.scale){
            this.scale[i] *= scale[i]
        }
        return this
    }
}