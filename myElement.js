var myElement = function(source,w,h,x,y,ID,cls,element){
    this.source = source;
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.ID = ID;
    this.cls = cls;
    this.appendElement("div1",element);

    Object.defineProperty(this, 'y', {
        get: function () {
            return y;
        },
        set: function (yinput) {
            y = yinput
            this.element.style.top = y + 'px';
        }
    });
    Object.defineProperty(this, 'x', {
        get: function () {
            return x;
        },
        set: function (xinput) {
            x = xinput
            this.element.style.left = x + 'px';
        }
    });
    Object.defineProperty(this, 'source', {
        get: function () {
            return source;
        },
        set: function (newSource) {
            source = newSource
            this.element.src = this.source;
        }
    });
    Object.defineProperty(this, 'w', {
        get: function () {
            return w;
        },
        set: function (winput) {
            w = winput
            this.element.style.width = w + 'px';
        }
    });
    Object.defineProperty(this, 'h', {
        get: function () {
            return h;
        },
        set: function (hinput) {
            h = hinput
            this.element.style.height = h + 'px';
        }
    });
}
// setters and getters 
myElement.prototype.setWidth = function(W){
    this.w = W;
}
myElement.prototype.setHeight = function(H){
    this.h = H;
}
myElement.prototype.setX = function(X){
    this.x = X;
}
myElement.prototype.setY = function(Y){

    this.y = Y;
}
myElement.prototype.getX = function(){
    return this.x;
}
myElement.prototype.getY = function(){
    return this.y;
}
myElement.prototype.setSource = function(s){
    this.source = s;
}


myElement.prototype.appendElement = function(parentId,element){
    this.element = document.createElement(element);
    this.element.src = this.source;
    this.element.id = this.ID;
    this.element.className = this.cls;
    this.element.style.width = this.w + "px";
    this.element.style.height = this.h + "px";
    this.element.style.top = this.y + "px";
    this.element.style.left = this.x + "px";
    var pElement = document.getElementById(parentId);
    pElement.appendChild(this.element);
}
    


myElement.prototype.move = function(step){
    this.y += step;
}

myElement.prototype.erase = function(){
    var pElement = this.element.parentElement;
    pElement.removeChild(this.element);
}
myElement.prototype.zoom = function(ratio){
       
        this.x -= ((this.w * (ratio-1)) / 2);
        this.y -= ((this.h * (ratio-1)) / 2);
       this.w *= ratio;
        this.h *= ratio;
}
