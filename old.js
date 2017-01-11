

var Component = function (img, x, y, h, w, id, elementClass) {
    this.isGotOut = false;
    this.img = img;
    this.h = h;
    this.w = w;
    this.id = id;
    this.x = x;
    this.y = y;
    this.elementClass = elementClass;
    this.createComponent();
};
Component.prototype.move = function () {
    this.y += 100;
    this.setPosition(this.x, this.y);
};
Component.prototype.createComponent = function () {
    this.element = document.createElement('span');
    this.element.id = this.id
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
    this.element.style.width = this.w + "px";
    this.element.style.height = this.h + "px";
    this.element.classList.add(this.elementClass);

    var image = document.createElement('img');
    image.src = this.img;

    this.element.appendChild(image);

    document.body.appendChild(this.element);
};
Component.prototype.setPosition = function (x, y) {
    if (x) {
        this.x = x;
    }
    if (y) {
        this.y = y;
    }
};

var hen = function(srcImg, ht, wd){
    var x = 100;
    var y = 100;
    Component.call(this, srcImg, x, y, ht, wd, 'hen' + parseInt(Math.random() * 1000000), 'hen');
    this.move = function () {
        this.y += 10;
        this.setPosition(this.x, this.y);
    };

    Object.defineProperty(this, 'x', {
        get: function () {
            return x;
        },
        set: function (xinput) {
            x = xinput;
            this.element.style.left = x + 'px';
        }
    });
    Object.defineProperty(this, 'y', {
        get: function () {
            return y;
        },
        set: function (yinput) {
            y = yinput
            this.element.style.top = y + 'px';
        }
    });
};

hen.prototype = Object.create(Component.prototype);
hen.prototype.constructor = hen;

var Big = {
    myList: [],
    tt:0,

    init: function(){
        var myhen = new hen("pics/egggg.png",50,50);
        Big.myList.push(myhen);
        Big.loop();
    }
    ,
    upPos: function(){

        Big.myList[0].y += 1;
    }
    ,
    loop: function(){
        if (new Date().getTime() - Big.tt > 40){
            Big.upPos();
            Big.tt = new Date().getTime();
        }
        setTimeout('Big.loop();', 41);
    }
}


var myhen = new hen("pics/egggg.png",50,50);



