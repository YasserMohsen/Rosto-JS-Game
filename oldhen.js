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

/*myElement.prototype.setPosition = function (x, y) {
    if (x) {
        this.x = x;
    }
    if (y) {
        this.y = y;
    }
};*/

myElement.prototype.appendImg = function(parentId){
	this.Img = document.createElement("img");
	/*var srcAttr = document.createAttribute("src");
	srcAttr.value = this.source;
	this.Img.setAttributeNode(srcAttr);*/
	this.Img.src = this.source;
	this.Img.id = this.ID;
	this.Img.style.width = this.w + "px";
	this.Img.style.height = this.h + "px";
	this.Img.style.top = this.y + "px";
	this.Img.style.left = this.x + "px";
	var pElement = document.getElementById(parentId);
	pElement.appendChild(this.Img);
}
	


myElement.prototype.move = function(step){
	this.y += step;
	//this.setPosition(this.x, this.y);
	//window.document.getElementById(this.ID).reload();
    //setInterval(function(){this.y += 10;},50);
}

myElement.prototype.erase = function(){
	var pElement = this.Img.parentElement;
	pElement.removeChild(this.Img);
}

//var egg = new myElement("pics/egggg.png",20,30, 300 ,150,"egg" + parseInt(Math.random() * 10000),"egg")

var Whole = {
    eggsList: [],
    brokenList: [],
    timeMoving:0,
    timeBleach:0,
    X_now:0,

    init: function(){
    	//create 3 hens

    	//create the basket

    	//loop on the eggs
        Whole.bleach();
        Whole.moving();
    }
    ,
    update_Y: function(newY){
    	for(var i=0; i<Whole.eggsList.length; i++){
    		Whole.eggsList[i].move(newY);
    		}
    	}
        
    ,
    moving: function(){
        //if (new Date().getTime() - Whole.timeMoving > 40){
        Whole.update_Y(5);
        Whole.hatch();
            //Whole.timeMoving = new Date().getTime();
        //}
        setTimeout(function(){
        	Whole.moving();
        }, 40);
    }
    ,
    bleach: function(){
    	//if (new Date().getTime() - Whole.timeBleach > 1000){
    	do{
    		generated_X = 300+ 300*parseInt(Math.random() * 3);
    	} while (Whole.X_now == generated_X);
    	Whole.X_now = generated_X;
    	var egg = new myElement("pics/egggg.png",20,30, generated_X ,150,"egg" + parseInt(Math.random() * 10000),"egg");
        Whole.eggsList.push(egg);
        	//Whole.timeBleach = new Date().getTime();
        //}
        setTimeout(function(){
        	Whole.bleach();
        }, 1100);
    }
    ,
    hatch: function(){
    	for(var i=0; i<Whole.eggsList.length; i++){
    		if (Whole.eggsList[i].y >= 550){
    			var broken_x = Whole.eggsList[i].x;
    			Whole.eggsList[i].erase();
    			Whole.eggsList.splice(i, 1);
    			var brokenEgg = new myElement("pics/broken.jpg",30,30, broken_x ,550,"brokenEgg" + parseInt(Math.random() * 10000),"Egg");
    			Whole.brokenList.push(brokenEgg);
    			setTimeout(function(){
    				Whole.brokenList[0].erase();Whole.brokenList.shift();
    			}, 2000);
    			//Whole.eggsList[i].source = "pics/broken.jpg";
    		}
    	}

    }
}

//Whole.init();

//hen.appendImg("div1");
//hen.move(200);0
//console.log(hen)
//setInterval(function(){
//hen.setY(hen.getY() + 10);
//console.log(hen.getY() + 10)

//},100);

/*setImg.prototype.moving = function(){
	while (this.y < 300){
		
		//setTimeout(function(){}, 1000);
	var pElement = document.getElementById("div1");
	//var c = document.getElementById(this.ID);
	pElement.removeChild(this.Img);
	this.y += 50;
	console.log("a")
	this.appendImg("div1");
	console.log("b")
	//delay(3000);
	console.log("c")
}
}

function delay(time) {
  var d1 = new Date();
  var d2 = new Date();
  while (d2.valueOf() < d1.valueOf() + time) {
    d2 = new Date();
  }
}
/*var logo = new setImg("pics/rosto.png",450,150,210,70);
logo.appendImg("div1");*/