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
    selectedBasket:"images/INGAME/basket/basket1.png",
    b:0,
    CHECK:1,
    interval:0,

    LIVES:3,
    CATCHED_EGGS:0,
    MAX_CATCHED_EGGS:5,
    BROKEN_EGGS:0,
    MAX_BROKEN_EGGS:10,
    INGAME:false,


    init: function(){
    	Game.initMap();
        
    }
    ,
    initLevel: function(){

        //create hens
        Game.CHECK=1;
    
    
    
    Game.createHens();
        //create basket
    Game.createBasket();
    Game.setScoreBar();
    Game.setTimer();
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
    setTimer: function(){

        var timer = new myElement("",35,50,1015,100,"timer","page4","p");
        timerobj = document.getElementById("timer");
        timerobj.innerHTML = Game.MINUTES + ":" + Game.SECONDS;
        Game.interval = setInterval(function() {
            Game.SECONDS--;
            if (Game.SECONDS < 0){
                Game.MINUTES--;
                Game.SECONDS=59; 
            }
            if (Game.MINUTES < 0)
            {
                Game.CHECK=0;
                Game.endLevel();

                alert('time out. You lost');
                //Game.initLevel();
            }
            timerobj.innerHTML = Game.MINUTES + ":" + Game.SECONDS;


        }, 1000);
    }
    ,
    setRecord: function(scoreobj){
     //   setInterval
     if (scoreobj.id == "score1"){
        scoreobj.innerHTML = Game.CATCHED_EGGS;
        scoreobj.innerHTML = scoreobj.innerHTML + "/" + Game.MAX_CATCHED_EGGS;   
     }
     else if (scoreobj.id == "score2"){
        scoreobj.innerHTML = Game.BROKEN_EGGS;
        scoreobj.innerHTML = scoreobj.innerHTML + "/" + Game.MAX_BROKEN_EGGS;
     }
     else if (scoreobj.id == "score3"){
        scoreobj.innerHTML = Game.LIVES;
     }
      

       if(Game.INGAME){
        setTimeout(function(){
           Game.setRecord(scoreobj);
           console.log("I am here");
       }, 40);}

    }
    ,
    setScoreBar: function(){
        var bar = new myElement("salma/rect.png",110,528,980,60,"bar","page4","img");
        var life = new myElement("salma/heart.png",50,45,1010,435,"heart","page4","img");
        var egg = new myElement("images/normal-egg.png",35,50,1015,200,"egg","page4","img");
        var brokenegg = new myElement("images/broken-egg.png",50,40,1010,320,"broken","page4","img");

        var eggscr = new myElement("",30,30,1010,255,"score1","page4","p");
        var brokenscr = new myElement("",30,30,1010,355,"score2","page4","p");
        var lifescr = new myElement("",30,30,1010,475,"score3","page4","p");

        barobj = document.getElementById("bar");
        barobj.style.opacity=0.6;
        

        eggscore = document.getElementById("score1");
        //console.log(eggscore.id)
        Game.setRecord(eggscore);
        //eggscore.innerHTML+='/';
        //eggscore.innerHTML+=Game.lvlScore;

        
        brokenscore = document.getElementById("score2");
        Game.setRecord(brokenscore);
        //brokenscore.innerHTML+='/';
        //brokenscore.innerHTML+=Game.lvlScore;

        lifescore = document.getElementById("score3");

        Game.setRecord(lifescore);
        
        //Game.setRecord(eggsc,)


    }
    ,
    setLevels: function(){
        Game.addLevelInfo();

        var x = new myElement("images/lvlname.png",470,570,400,70,"lvltree","page3","img");

        var lvl1 = new myElement("images/level/1OFF.png",65,60,460,355,"lvl1","page3","img");
        var lvl2 = new myElement("images/level/2OFF.png",65,60,505,250,"lvl2","page3","img");
        var lvl3 = new myElement("images/level/3OFF.png",65,60,730,230,"lvl3","page3","img");
        var lvl4 = new myElement("images/level/4OFF.png",65,60,600,185,"lvl4","page3","img");
        var lvl5 = new myElement("images/level/5OFF.png",65,60,715,135,"lvl5","page3","img");

        var badge1 = new myElement("images/badge1.png",90,90,950,90,"badge1","page3","img");
        var badge2 = new myElement("images/badge2.png",90,90,950,220,"badge2","page3","img");
        //var lvl4 = new myElement("pics/editedpics/level3trans.png",80,80,700,290,"lvl3","page3");
        //var lvl5 = new myElement("pics/editedpics/level3trans.png",80,80,700,290,"lvl3","page3");

 
        var start = new myElement("images/level/Layer7.png",150,150,855,400,"start","page3","img");
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
            lvl1.source="images/level/1.png";
        }
        else if(Game.level==2)
        {
            lvl2.source="images/level/2.png";
        }
        else if (Game.level==3)
        {
            lvl3.source="images/level/3.png";
        }
         else if (Game.level==4)
        {
            lvl4.source="images/level/4.png";
        }
         else if (Game.level==5)
        {
            lvl5.source="images/level/5.png";
        }



        }
        ,
        selectBasket: function(baskobj,rate)
        {
            baskobj.style.opacity=rate;
        }
 
    ,
    setBasket: function(){
        var char1 = new myElement("images/INGAME/basket/basket1.png",100,45,260,150,"b1","page3","img");
        var char2 = new myElement("images/INGAME/basket/basket2.png",100,45,260,370,"b2","page3","img");

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
            Game.selectedBasket=char1.source;
            Game.selectBasket(basket1,1);
            Game.selectBasket(basket2,0.5);
        }

         basket2.onclick = function(){
            Game.selectedBasket=char2.source;
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
        Game.endTimeouts();
        //Game.BROKEN_EGGS = 0;
        //Game.CATCHED_EGGS = 0;
    }
    ,
    createBasket: function(){
        var woodPlate = new myElement("images/INGAME/wood plate.png", 880,40,210,540, "plate","page4","img");

        var myBasket = new myElement(Game.selectedBasket, 100,45,600,520, "basket","page4","img");
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
            var hen = new myElement("images/hens/1.png",75,110, generated_X-(75/2), 178 - 110,"hen" + i,"page4","img");
            Game.hensList.push(hen);
        };
        var bg = document.getElementById("img1");
        bg.style.filter= 'none';
    }
    ,
    catchEgg: function(){
        
        for(var i=0; i<Game.eggsList.length; i++){
            //console.log(Game.b.x)
            if (Game.eggsList[i].y == 510){
                
                if (Game.eggsList[i].x > Game.b.x && Game.eggsList[i].x < (Game.b.x + Game.b.w))
                {
                    Game.eggsList[i].erase();
                    Game.eggsList.splice(i, 1);
                    Game.CATCHED_EGGS++;
                    console.log(Game.CATCHED_EGGS);
                    if (Game.CATCHED_EGGS >= Game.MAX_CATCHED_EGGS){
                        Game.erasePage("page4");
                        Game.endLevel();
                        Game.initMap();
                    }
                }
            }
        }
        if(Game.INGAME){
        setTimeout(function(){
            Game.catchEgg();
        }, 10);}
    
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
            var egg = new myElement("images/normal-egg.png",15,22, generated_X ,150,"egg" + parseInt(Math.random() * 10000),"page4","img");
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
        myhen.source = "images/hens/2.png";
        setTimeout(function(){
            //myhen.move(10);
            myhen.source = "images/hens/1.png";
        }, Game.BLEACH_HEN_EVERY);
    }
    ,
    hatch: function(){

    	for(var i=0; i<Game.eggsList.length; i++){
    		if (Game.eggsList[i].y >= 550){
    			var broken_x = Game.eggsList[i].x;
    			Game.eggsList[i].erase();
    			Game.eggsList.splice(i, 1);
    			var brokenEgg = new myElement("images/broken-egg.png",50,18, broken_x ,550,"brokenEgg" + parseInt(Math.random() * 10000),"page4","img");
    			Game.brokenList.push(brokenEgg);
                

                Game.BROKEN_EGGS++;
                if (Game.BROKEN_EGGS == Game.MAX_BROKEN_EGGS)
                {
                    alert("You lost !!!");
                    Game.CHECK=0;
                    Game.endLevel();
                    //Game.initLevel();

                }
                
    			setTimeout(function(){
    				Game.brokenList[0].erase();Game.brokenList.shift();
    			     console.log("salma");
                }, Game.BROKEN_DISAPPEAR_AFTER);
    		}
    	}

    }
    ,
    endLevel: function(){
        if(Game.CHECK==0)
        {
            if(Game.LIVES==0)
            {
                alert("Game Over");
                Game.erasePage("page4");
                Game.LIVES=3;
                Game.level=1;
                Game.init();
            }
            else
            {
                Game.LIVES--;
                Game.addLevelInfo();
                Game.setTimer();
                Game.CHECK=1;
            }
        }
        else if(Game.CHECK==1)
        {
            Game.level++;
            Game.INGAME=false;
            
        }
        clearInterval(Game.interval);
        Game.BROKEN_EGGS = 0;
        Game.CATCHED_EGGS = 0;
        /* 
        }*/
        //Game.MINUTES = 0;
        //Game.SECONDS = 0;
                
    }
    ,
    addLevelInfo: function(){
        if(Game.level==1)
        {
            Game.MAX_CATCHED_EGGS = 10;
            Game.MAX_BROKEN_EGGS = 20;
            Game.MINUTES = 0;
            Game.SECONDS = 20;
        }
        else if(Game.level==2)
        {
            Game.MAX_CATCHED_EGGS = 20;
            Game.MAX_BROKEN_EGGS = 30;
            Game.MINUTES = 1;
            Game.SECONDS = 30;
        }
        else if(Game.level==3)
        {
            Game.MAX_CATCHED_EGGS = 30;
            Game.MAX_BROKEN_EGGS = 40;
            Game.MINUTES = 1;
            Game.SECONDS = 15;
        }
    }
    ,
    endTimeouts: function(){
        var highestTimeoutId = setTimeout(";");
        for (var i = 0 ; i < highestTimeoutId ; i++) {
            clearTimeout(i);
        }
    }
    

}

//Game.initLevel(1);
//Game.setLevels();
Game.init();
