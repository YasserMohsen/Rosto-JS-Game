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
    selectedBasket:"salma/basket.png",
    b:0,

    eggS:10,
    brokenS:10,
    lifeS:10,
    lvlScore:50,
    lvlTimer:60,
    CATCHED_EGGS:0,
    INGAME:true,


    init: function(){
    	Game.initMap();
        
    }
    ,
    initLevel: function(){

        //create hens

    Game.setScoreBar();
    Game.setTimer(Game.lvlTimer);
    
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
    setTimer: function(score){

        var timer = new myElement("",35,50,1015,100,"timer","page4","p");
        timerobj = document.getElementById("timer");

        var interval = setInterval(function() {

        timerobj.innerHTML = --score;

         if (score<=0)
        {
            timerobj.innerHTML = 'time out';
            clearInterval(interval);
        }
        }, 1000);
    }
    ,
    setRecord: function(scoreobj,score){
     //   setInterval
     scoreobj.innerHTML=score;
       // score+=1;
      //    var interval = setInterval(function(){

        //  Game.setRecord(scoreobj,score);
        //}, 20);
    }
    ,
    setScoreBar: function(){
        var bar = new myElement("salma/rect.png",110,528,980,60,"bar","page4","img");
        var life = new myElement("salma/heart.png",50,45,1010,435,"heart","page4","img");
        var egg = new myElement("salma/egggg.png",35,50,1015,200,"egg","page4","img");
        var brokenegg = new myElement("salma/Un.png",50,40,1010,320,"broken","page4","img");

        var eggscr = new myElement("",30,30,1010,255,"score1","page4","p");
        var brokenscr = new myElement("",30,30,1010,355,"score2","page4","p");
        var lifescr = new myElement("",30,30,1010,475,"score3","page4","p");

        barobj = document.getElementById("bar");
        barobj.style.opacity=0.6;
        

        eggscore = document.getElementById("score1");
        Game.setRecord(eggscore,Game.CATCHED_EGGS);
        eggscore.innerHTML+='/';
        eggscore.innerHTML+=Game.lvlScore;
        
        brokenscore = document.getElementById("score2");
        Game.setRecord(brokenscore,Game.brokenS);
        brokenscore.innerHTML+='/';
        brokenscore.innerHTML+=Game.lvlScore;

        lifescore = document.getElementById("score3");
        Game.setRecord(lifescore,Game.lifeS);
        lifescore.innerHTML+='/';
        lifescore.innerHTML+=Game.lvlScore;
        
        //Game.setRecord(eggsc,)


    }
    ,
    setLevels: function(){

        var x = new myElement("yasser/lvlname.png",470,570,400,70,"lvltree","page3","img");

        var lvl1 = new myElement("yasser/level/1OFF.png",65,60,460,355,"lvl1","page3","img");
        var lvl2 = new myElement("yasser/level/2OFF.png",65,60,505,250,"lvl2","page3","img");
        var lvl3 = new myElement("yasser/level/3OFF.png",65,60,730,230,"lvl3","page3","img");
        var lvl4 = new myElement("yasser/level/4OFF.png",65,60,600,185,"lvl4","page3","img");
        var lvl5 = new myElement("yasser/level/5OFF.png",65,60,715,135,"lvl5","page3","img");

        var badge1 = new myElement("yasser/badge1.png",90,90,950,90,"badge1","page3","img");
        var badge2 = new myElement("yasser/badge2.png",90,90,950,220,"badge2","page3","img");
        //var lvl4 = new myElement("pics/editedpics/level3trans.png",80,80,700,290,"lvl3","page3");
        //var lvl5 = new myElement("pics/editedpics/level3trans.png",80,80,700,290,"lvl3","page3");

 
        var start = new myElement("yasser/level/Layer7.png",150,150,855,400,"start","page3","img");
        startelement = document.getElementById("start");

        var text = new myElement("",30,60,880,405,"starttext","page3","p");
        startText = document.getElementById("starttext");
        startText.innerHTML="START";

        startelement.onmouseover = function(){
           // alert("salma");
           start.zoom(1.25);
         
        }

        startelement.onmouseleave = function(){
            start.zoom(.8)
        
        }

        startelement.onclick = function(){

            Game.erasePage("page3");
            Game.INGAME = true;
            Game.initLevel();
    }


        if(Game.level==1)
        {
            lvl1.source="yasser/level/1.png";
        }
        else if(Game.level==2)
        {
            lvl2.source="yasser/level/2.png";
        }
        else if (Game.level==3)
        {
            lvl3.source="yasser/level/3.png";
        }
         else if (Game.level==4)
        {
            lvl4.source="yasser/level/4.png";
        }
         else if (Game.level==5)
        {
            lvl5.source="yasser/level/5.png";
        }



        }
        ,
        selectBasket: function(baskobj,rate)
        {
            baskobj.style.opacity=rate;
        }
 
    ,
    setBasket: function(){
        var char1 = new myElement("yasser/INGAME/basket/basket1.png",100,100,260,150,"b1","page3","img");
        var char2 = new myElement("yasser/INGAME/basket/basket2.png",100,100,260,370,"b2","page3","img");

  //      var maindiv = document.getElementById("div1");
        //var arr=document.getElementsByClassName("page3");

        //maindiv.appendChild(arr);
        basket1=document.getElementById("b1");
        basket2=document.getElementById("b2");
        Game.selectBasket(basket2,0.5);
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
            selectedBasket=char1.source;
            Game.selectBasket(basket1,1);
            Game.selectBasket(basket2,0.5);
        }

         basket2.onclick = function(){
            selectedBasket=char2.source;
            Game.selectBasket(basket2,1);
            Game.selectBasket(basket1,0.5);
        
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
        var myBasket = new myElement(Game.selectedBasket, 100,60,600,500, "basket","page4","img");
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
            var hen = new myElement("pics/cc1.png",70,90, generated_X-(70/2), 150 - 90,"hen" + i,"page4","img");
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
            var egg = new myElement("pics/egggg.png",15,22, generated_X ,150,"egg" + parseInt(Math.random() * 10000),"page4","img");
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
    			var brokenEgg = new myElement("pics/Un.png",30,40, broken_x ,550,"brokenEgg" + parseInt(Math.random() * 10000),"page4","img");
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
