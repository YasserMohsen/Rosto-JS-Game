var Game = {
    eggsList: [],
    brokenList: [],
    hensList: [],
    timeMoving:0,
    timeBleach:0,
    X_now:0,
    BLEACH_EVERY:1000,
    BLEACH_HEN_EVERY:500,
    BROKEN_DISAPPEAR_AFTER:2000,
    EGG_MOVE_EVERY: 30,
    EGG_STEP:5,
    level:1,
    bg_width:900,
    bg_height:550,
    bg_top:50,
    bg_left:200,

    init: function(l){
    	Game.initLevel(l);
        Game.moving();
    }
    ,
    initLevel: function(num){
        //create hens
        Game.createHens(num);
        //create basket

        //loop on the hens and eggs
        Game.bleach(num);
    }
    ,
    update_Y: function(newY){
    	for(var i=0; i<Game.eggsList.length; i++){
    		Game.eggsList[i].move(newY);
    		}
    	}
        
    ,
    moving: function(){
        Game.update_Y(Game.EGG_STEP);
        Game.hatch();
        setTimeout(function(){
        	Game.moving();
        }, Game.EGG_MOVE_EVERY);
    }
    ,
    createHens: function(num){
        var n = num + 2;
        var diff = Game.bg_width/(n+2);
        var first_x = Game.bg_left + diff;
        for(var i=0; i<n; i++){
            generated_X = first_x + (diff*i);
            var hen = new myElement("pics/cc1.png",70,90, generated_X-(70/2), 150 - 90,"hen" + i,"Hen");
            Game.hensList.push(hen);
        };
    }
    ,
    bleach: function(num){
        var m = num + 2;
        //create an egg
        var index;
        var diff = Game.bg_width/(m+2);
        var first_x = Game.bg_left + diff;
    	do{
            index = parseInt(Math.random() * m);
    		generated_X = first_x + (diff*index);
    	} while (Game.X_now == generated_X);
    	Game.X_now = generated_X;
    	var egg = new myElement("pics/egggg.png",15,22, generated_X ,150,"egg" + parseInt(Math.random() * 10000),"egg");
        Game.eggsList.push(egg);

        //hen standing
        Game.bleachHen(index);

        //loop to create many
        setTimeout(function(){
        	Game.bleach(num);
        }, Game.BLEACH_EVERY);
    }
    ,
    bleachHen: function(i){
        var myhen = Game.hensList[i];
        //myhen.move(-10);
        myhen.source = "pics/cc2.png";
        setTimeout(function(){
            //myhen.move(10);
            myhen.source = "pics/cc1.png";
        }, Game.BLEACH_HEN_EVERY);
    }
    ,
    hatch: function(){
    	for(var i=0; i<Game.eggsList.length; i++){
    		if (Game.eggsList[i].y >= 500){
    			var broken_x = Game.eggsList[i].x;
    			Game.eggsList[i].erase();
    			Game.eggsList.splice(i, 1);
    			var brokenEgg = new myElement("pics/Un.png",30,40, broken_x ,500,"brokenEgg" + parseInt(Math.random() * 10000),"Egg");
    			Game.brokenList.push(brokenEgg);
    			setTimeout(function(){
    				Game.brokenList[0].erase();Game.brokenList.shift();
    			}, Game.BROKEN_DISAPPEAR_AFTER);
    		}
    	}

    }
}

Game.init(Game.level);