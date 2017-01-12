var myElement = function(source,w,h,x,y,ID,cls){
    this.source = source;
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.ID = ID;
    this.cls = cls;
    this.appendImg("div1");

    Object.defineProperty(this, 'y', {
        get: function () {
            return y;
        },
        set: function (yinput) {
            y = yinput
            this.Img.style.top = y + 'px';
        }
    });
    Object.defineProperty(this, 'x', {
        get: function () {
            return x;
        },
        set: function (xinput) {
            x = xinput
            this.Img.style.left = x + 'px';
        }
    });
    Object.defineProperty(this, 'source', {
        get: function () {
            return source;
        },
        set: function (newSource) {
            source = newSource
            this.Img.src = this.source;
        }
    });
    Object.defineProperty(this, 'w', {
        get: function () {
            return w;
        },
        set: function (winput) {
            w = winput
            this.Img.style.width = w + 'px';
        }
    });
    Object.defineProperty(this, 'h', {
        get: function () {
            return h;
        },
        set: function (hinput) {
            h = hinput
            this.Img.style.height = h + 'px';
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


myElement.prototype.appendImg = function(parentId){
    this.Img = document.createElement("img");
    this.Img.src = this.source;
    this.Img.id = this.ID;
    this.Img.className = this.cls;
    this.Img.style.width = this.w + "px";
    this.Img.style.height = this.h + "px";
    this.Img.style.top = this.y + "px";
    this.Img.style.left = this.x + "px";
    var pElement = document.getElementById(parentId);
    pElement.appendChild(this.Img);
}
    


myElement.prototype.move = function(step){
    this.y += step;
}

myElement.prototype.erase = function(){
    var pElement = this.Img.parentElement;
    pElement.removeChild(this.Img);
}
myElement.prototype.zoom = function(ratio){
       
        this.x -= ((this.w * (ratio-1)) / 2);
        this.y -= ((this.h * (ratio-1)) / 2);
       this.w *= ratio;
        this.h *= ratio;
}
