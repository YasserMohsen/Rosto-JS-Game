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
    selectedbasket:0,
    b:0,
    CATCHED_EGGS:0,
    INGAME:true,

    init: function(){
    	Game.initMap();
        
        
    }
    ,
    initLevel: function(){

        //create hens
    Game.createHens();
        //create basket
    Game.createBasket();
        //Game.setLevels();
        //Game.setBasket();
        //loop on the hens and eggs
    Game.bleach();
    Game.catchEgg();
    Game.moving();
    }
    ,
    initMap: function(){
        Game.setLevels();
        Game.setBasket();
    }
    ,
    setLevels: function(){

        var x = new myElement("pics/editedpics/Leveltree.png",470,500,400,70,"x","page3");


        var lvl1 = new myElement("pics/editedpics/level1gray.png",70,60,460,340,"lvl1","page3");
        var lvl2 = new myElement("pics/editedpics/level2trans.png",60,60,515,215,"lvl2","page3");
        var lvl3 = new myElement("pics/editedpics/level3trans.png",70,70,600,120,"lvl3","page3");

        var badge1 = new myElement("pics/editedpics/badge1.png",90,90,950,90,"badge1","page3");
        var badge2 = new myElement("pics/editedpics/badge2.png",90,90,950,220,"badge2","page3");
        //var lvl4 = new myElement("pics/editedpics/level3trans.png",80,80,700,290,"lvl3","page3");
        //var lvl5 = new myElement("pics/editedpics/level3trans.png",80,80,700,290,"lvl3","page3");


    
        var start = new myElement("pics/editedpics/start.png",150,150,855,400,"start","page3");

        startelement = document.getElementById("start");

        startelement.onmouseover = function(){
           // alert("salma");
           start.zoom(1.25);
         
        }

        startelement.onmouseleave = function(){
            start.zoom(.8)
        
        }
        if(Game.level==1)
        {
            lvl1.source="pics/editedpics/level1red.png";
        }
        else if(Game.level==2)
        {
            lvl2.source="pics/editedpics/level2red.png";
        }
        else if (Game.level==3)
        {
            lvl3.source="pics/editedpics/level3red.png";
        }


        }
    ,
    setBasket: function(){
        var char1 = new myElement("pics/editedpics/basket.png",100,100,260,150,"b1","page3");
        var char2 = new myElement("pics/editedpics/basket2.png",100,100,260,370,"b2","page3");

  //      var maindiv = document.getElementById("div1");
        //var arr=document.getElementsByClassName("page3");

        //maindiv.appendChild(arr);
        basket1=document.getElementById("b1");
        basket2=document.getElementById("b2");
        //basket1.alt="b 1";

        basket1.onmouseover = function(){
           // alert("salma");
           char1.zoom(1.25);
         
        }

        basket1.onmouseleave = function(){
            char1.zoom(.8)
        
        }

         basket2.onmouseover = function(){
           // alert("salma");
           char2.zoom(1.25);
         
        }

        basket2.onmouseleave = function(){
            char2.zoom(.8)
        
        }

        basket1.onclick = function(){
            selectedbasket=0;

        
        }
         basket2.onclick = function(){
            selectedbasket=1;
        
        }

        start.onclick = function(){

            Game.erasePage("page3");
            Game.INGAME = true;
            Game.initLevel();
        }
    }
    ,
    erasePage: function(className){
        var pageElements = document.getElementsByClassName(className);

        while(pageElements[0])
            {
                pageElements[0].parentElement.removeChild(pageElements[0]); 
            }
        Game.eggsList.splice(0, Game.eggsList.length);
        Game.brokenList.splice(0, Game.brokenList.length);
        Game.hensList.splice(0, Game.hensList.length);
    }
    ,
    createBasket: function(){
        var myBasket = new myElement("pics/editedpics/basket.png", 100,60,600,500, "basket","page4");
        document.addEventListener("mousemove", function(e){
            var newx = e.clientX;
            if (newx >250 && newx < 950)
            {   
                myBasket.x = e.clientX;
            }
        }, false);
        Game.b = myBasket;
    }
    ,
    update_Y: function(newY){
    	for(var i=0; i<Game.eggsList.length; i++)
        {
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
    createHens: function(){
        var n = Game.level + 2;
        var diff = Game.bg_width/(n+2);
        var first_x = Game.bg_left + diff;
        for(var i=0; i<n; i++){
            generated_X = first_x + (diff*i);
            var hen = new myElement("pics/cc1.png",70,90, generated_X-(70/2), 150 - 90,"hen" + i,"page4");
            Game.hensList.push(hen);
        };
        var bg = document.getElementById("img1");
        bg.style.filter= 'none';
    }
    ,
    catchEgg: function(){
        
        for(var i=0; i<Game.eggsList.length; i++){
            //console.log(Game.b.x)
            if (Game.eggsList[i].y == 500){
                
                if (Game.eggsList[i].x > Game.b.x && Game.eggsList[i].x < (Game.b.x + Game.b.w))
                {
                    Game.eggsList[i].erase();
                    Game.eggsList.splice(i, 1);
                    Game.CATCHED_EGGS++;
                    console.log(Game.CATCHED_EGGS);
                    if (Game.CATCHED_EGGS == 20){
                        Game.erasePage("page4");
                        Game.level++;
                        Game.INGAME = false;
                        Game.CATCHED_EGGS = 0;
                        Game.initMap();
                    }
                }
            }
        }
        
        setTimeout(function(){
            Game.catchEgg();
        }, 10);
    
    }
    ,
    bleach: function(){
        if (Game.INGAME){
            var m = Game.level + 2;
            //create an egg
            var index;
            var diff = Game.bg_width/(m+2);
            var first_x = Game.bg_left + diff;
            do{
               index = parseInt(Math.random() * m);
    		   generated_X = first_x + (diff*index);
    	    } while (Game.X_now == generated_X);
    	    Game.X_now = generated_X;
            var egg = new myElement("pics/egggg.png",15,22, generated_X ,150,"egg" + parseInt(Math.random() * 10000),"page4");
            Game.eggsList.push(egg);

            //hen standing
            Game.bleachHen(index);

            //loop to create many
            if(Game.INGAME){
                setTimeout(function(){
        	       Game.bleach();
                }, Game.BLEACH_EVERY);
            }
        }
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
    		if (Game.eggsList[i].y >= 550){
    			var broken_x = Game.eggsList[i].x;
    			Game.eggsList[i].erase();
    			Game.eggsList.splice(i, 1);
    			var brokenEgg = new myElement("pics/Un.png",30,40, broken_x ,550,"brokenEgg" + parseInt(Math.random() * 10000),"Egg");
    			Game.brokenList.push(brokenEgg);
    			setTimeout(function(){
    				Game.brokenList[0].erase();Game.brokenList.shift();
    			}, Game.BROKEN_DISAPPEAR_AFTER);
    		}
    	}

    }
}
//Game.initLevel(1);
//Game.setLevels();
Game.init();
