var Game = {
    eggsList: [],
    coleggsList: [],
    brokenList: [],
    hensList: [],
    eggsListInRow: [],
    ALL_EGGS:0,
    MAX_EGGS_IN_ROW:0,
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
    FLAG:0,

    LIVES:3,
    CATCHED_COL_EGGS:0,
    CATCHED_EGGS:0,
    MAX_CATCHED_EGGS:5,
    BROKEN_EGGS:0,
    MAX_BROKEN_EGGS:10,
    INGAME:false,

    TOTAL_SCORE:0,
    SCORE_1:0,
    SCORE_2:0,
    SCORE_3:0,

    B1:"images/badge1OFF.png",
    B2:"images/badge2OFF.png",
    B3:"images/badge1OFF.png",
    init: function(){
        Game.ss=new Audio("C2.MP3");
        Game.s1=new Audio("s2.mp3");
    	Game.progressBar();

    }
    ,
    initLevel: function(){


        Game.CHECK=1;
        //document.getElementById("div1").style.cursor = "none";
    

    Game.createHens();

    Game.createBasket();
    Game.setScoreBar();
    Game.setTimer();

    Game.bleach();
    Game.catchEgg();
    Game.catchColoredEgg();
    Game.moving();
    //Game.calcScore();
    }
    ,
    menuInit: function(){
      var main= new myElement("images/choicepanel.png",370,494,465,96,"mainmenu","page2","img");
      var newGame = new myElement("images/MainMenu/NewGame.png",228,74,538,126,"newgame","page2","img");
      var inst = new myElement("images/MainMenu/instructions.png",228,74,538,222,"instructions","page2","img");
      var about = new myElement("images/MainMenu/About.png",207,65,545,325,"about","page2","img");
      var exit = new myElement("images/MainMenu/Exit.png",207,65,545,425,"exit","page2","img");

      var ng = document.getElementById("newgame");
      var ins = document.getElementById("instructions");
      var abt = document.getElementById("about");
      var ex = document.getElementById("exit");

      ng.onmouseover = function(){newGame.zoom(1.25);}
      ng.onmouseleave = function(){newGame.zoom(0.8);}

      ins.onmouseover = function(){inst.zoom(1.25);}
      ins.onmouseleave = function(){inst.zoom(0.8);}

      abt.onmouseover = function(){about.zoom(1.25);}
      abt.onmouseleave = function(){about.zoom(0.8);}

      ex.onmouseover = function(){exit.zoom(1.25);}
      ex.onmouseleave = function(){exit.zoom(0.8);}

      ng.onclick = function(){
        Game.erasePage("page2");
        Game.initMap();}

      ins.onclick = function(){
        Game.erasePage("page2");
        Game.initInstructions();
      }
      abt.onclick = function(){
        Game.erasePage("page2");
        Game.initAbout();
     }

     ex.onclick = function(){
       window.close();
   }
 }
    ,
    initInstructions: function(){
    var gameInst= new myElement("",800,470,280,75,"inst","ginst","p");
     g = document.getElementById("inst");
    g.innerHTML="<h1> Rosto Game instructions </h1><h3>Objectives<h3> player need to collect a spcified number of eggs in  the basket. player shouldn't exceeds the determined number of broken eggs or the timer for not losing a life. after the player loses three lifes will get gameover<h3>setup:<h3> It's recomended to use google chrome browser ";
    var back= new myElement("images/back.png",100,60,545,525,"back","ginst","img");
    var backButton = document.getElementById("back");
    backButton.onmouseover = function(){back.zoom(1.25);}
    backButton.onmouseleave = function(){back.zoom(0.8);}
    backButton.onclick = function(){
    Game.erasePage("ginst");
    Game.menuInit();}
    }
    ,
    initAbout: function(){
      var gameAbout= new myElement("",800,470,280,75,"about","gabout","p");
      var abouttext= document.getElementById("about");
      abouttext.innerHTML="<h1> Rosto Game </h1><h3> Developed by: <h3> <ol> <li> Yaser Mohsen Ahmed</li> <li> Salma Mohamed Ahmed</li> <li> AbdElrahman Salah AbdElKarem</li> </ol>";
      var back= new myElement("images/back.png",100,60,545,525,"back","gabout","img");
      var backButton = document.getElementById("back");
      backButton.onmouseover = function(){back.zoom(1.25);}
      backButton.onmouseleave = function(){back.zoom(0.8);}
      backButton.onclick = function(){
      Game.erasePage("gabout");
      Game.menuInit();}

    }
    ,
    initMap: function(){
        Game.setLevels();
        Game.setBasket();

    }
    ,
    styleTime: function(min,sec){
        if (min < 10)
        {
            min = "0" + min;
        }
        if (sec < 10)
        {
            sec = "0" + sec;
        }
        return min + ":" + sec
    }
    ,
    setTimer: function(){

        var timer = new myElement("",35,50,1015,100,"timer","page4","p");
        timerobj = document.getElementById("timer");
        timerobj.innerHTML = Game.styleTime(Game.MINUTES,Game.SECONDS);
        Game.interval = setInterval(function() {
            Game.SECONDS--;
            if (Game.SECONDS < 0){
                Game.MINUTES--;
                Game.SECONDS=59;
            }
            timerobj.innerHTML = Game.styleTime(Game.MINUTES,Game.SECONDS);
            if (Game.MINUTES < 0)
            {
                Game.CHECK=0;
                Game.endTimeouts();
                clearInterval(Game.interval);
                if (Game.LIVES == 0)
                {
                    Game.createDialog("Game Over !!", "Back to Home");
                }
                else
                {
                    Game.createDialog("Timeout !! YOU LOST", "Try again");
                }
                timerobj.innerHTML = Game.styleTime(0,0);
            }



        }, 1000);
    }
    ,
    createDialog: function(dialogcontent,buttoncontent){
        var dialog = new myElement("",400,200,450,220,"dialogbox","page4","div");

        var button = new myElement("",90,30,680,355,"b","page4","button");
        buttonobj = document.getElementById("b");
        buttonobj.innerHTML=buttoncontent;

        var text = new myElement("",100,100,550,270,"label1","page4","label");
        textobj = document.getElementById("label1");
        textobj.innerHTML=dialogcontent;

        buttonobj.onclick= function(){
                        Game.erasePage("page4");
                        Game.endLevel();
                        if (buttoncontent=="Back to Home")
                        {
                            Game.init();
                        }
                        else if (buttoncontent=="Try again")
                        {
                            Game.initLevel();
                        }
                        else if (buttoncontent=="Continue")
                        {
                            Game.initMap();
                        }
        }
    }
    ,
    setRecord: function(scoreobj){
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
     else if (scoreobj.id == "score4"){
        scoreobj.innerHTML = Game.CATCHED_COL_EGGS;
     }
       if(Game.INGAME){
        setTimeout(function(){
           Game.setRecord(scoreobj);
           //console.log("set record");
       }, 40);}

    }
    ,
    setScoreBar: function(){
        var bar = new myElement("salma/rect.png",110,528,980,60,"bar","page4","img");
        var life = new myElement("salma/heart.png",40,35,1010,435,"heart","page4","img");
        var egg = new myElement("images/normal-egg.png",35,50,1015,200,"egg","page4","img");
        var colegg = new myElement("images/colored.png",20,30,1015,500,"colegg","page4","img");
        var brokenegg = new myElement("images/broken-egg.png",60,25,1010,320,"broken","page4","img");

        var eggscr = new myElement("",30,30,1010,255,"score1","page4","p");
        var brokenscr = new myElement("",30,30,1010,355,"score2","page4","p");
        var lifescr = new myElement("",30,30,1010,475,"score3","page4","p");
        var coleggscr = new myElement("",20,20,1010,540,"score4","page4","p");

        barobj = document.getElementById("bar");
        barobj.style.opacity=0.6;


        eggscore = document.getElementById("score1");
        Game.setRecord(eggscore);

        coleggscore = document.getElementById("score4");
        Game.setRecord(coleggscore);
        
        brokenscore = document.getElementById("score2");
        Game.setRecord(brokenscore);

        lifescore = document.getElementById("score3");

        Game.setRecord(lifescore);


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

        var badge1 = new myElement(Game.B1,90,90,950,90,"badge1","page3","img");
        var badge2 = new myElement(Game.B2,90,90,950,200,"badge2","page3","img");
        var badge3 = new myElement(Game.B3,90,90,950,280,"badge3","page3","img");
        //var lvl4 = new myElement("pics/editedpics/level3trans.png",80,80,700,290,"lvl3","page3");
        //var lvl5 = new myElement("pics/editedpics/level3trans.png",80,80,700,290,"lvl3","page3");


        var start = new myElement("images/level/Layer77.png",150,150,855,400,"start","page3","img");
        startelement = document.getElementById("start");

        startelement.onmouseover = function(){
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


        if(Game.level>=1)
        {
            lvl1.source="images/level/1.png";
        }
        if(Game.level>=2)
        {
            lvl2.source="images/level/2.png";
        }
        if (Game.level>=3)
        {
            lvl3.source="images/level/3.png";
        }
        if (Game.level>=4)
        {
            lvl4.source="images/level/4.png";
        }
        if (Game.level>=5)
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

        basket1=document.getElementById("b1");
        basket2=document.getElementById("b2");
        Game.selectBasket(basket2,0.5);


        basket1.onmouseover = function(){
           char1.zoom(1.25);

        }

        basket1.onmouseleave = function(){
            char1.zoom(.8)

        }

         basket2.onmouseover = function(){
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
        Game.coleggsList.splice(0, Game.coleggsList.length);
        //Game.endTimeouts();
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
    update_Y_col: function(newY){
        for(var i=0; i<Game.coleggsList.length; i++)
        {
            Game.coleggsList[i].move(newY);
        }
    }
    ,
    moving: function(){
        if (Game.CHECK == 1){
            Game.update_Y(Game.EGG_STEP);
            Game.update_Y_col(Game.EGG_STEP*2.5);
            Game.hatch();
            setTimeout(function(){
        	   Game.moving();
               //console.log("moving");
            }, Game.EGG_MOVE_EVERY);

        }
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
            if (Game.eggsList[i].y >= 510 && Game.eggsList[i].y < 515){
                
                if (Game.eggsList[i].x > Game.b.x && Game.eggsList[i].x < (Game.b.x + Game.b.w))
                {
                    Game.eggsListInRow.push(Game.eggsList[i]);
                    if (Game.MAX_EGGS_IN_ROW < Game.eggsListInRow.length)
                    {
                        Game.MAX_EGGS_IN_ROW = Game.eggsListInRow.length;
                    }

                    Game.eggsList[i].erase();
                    Game.eggsList.splice(i, 1);
                    Game.CATCHED_EGGS++;
                    if (Game.CATCHED_EGGS >= Game.MAX_CATCHED_EGGS){
                        Game.endTimeouts();
                        Game.createDialog("GONGRATULATIONS !! You passed level " + Game.level,"Continue")
                    }
                }
            }
        }
        if(Game.INGAME){
        setTimeout(function(){
            Game.catchEgg();
            //console.log("catcheggs")
        }, 2);}

    
    }
    ,
    catchColoredEgg: function(){
        
        for(var i=0; i<Game.coleggsList.length; i++){
            //console.log(Game.b.x)
            if (Game.coleggsList[i].y >= 510 && Game.coleggsList[i].y < 515){
                
                if (Game.coleggsList[i].x > Game.b.x && Game.coleggsList[i].x < (Game.b.x + Game.b.w))
                {
                    
                    Game.coleggsList[i].erase();
                    Game.coleggsList.splice(i, 1);
                    Game.CATCHED_COL_EGGS++;
                    
                }
            }
        }
        if(Game.INGAME){
        setTimeout(function(){
            Game.catchColoredEgg();
        }, 2);}


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

            Game.ALL_EGGS++;
            //Game.num1 = parseInt(Math.random() * 5);
            //console.log(Game.num1);
            if (Game.ALL_EGGS % (5) == 0)
            {
                var egg = new myElement("images/colored.png",15,22, generated_X ,150,"egg" + parseInt(Math.random() * 10000),"page4","img");
                Game.coleggsList.push(egg);            
            }
            else
            {
                var egg = new myElement("images/normal-egg.png",15,22, generated_X ,150,"egg" + parseInt(Math.random() * 10000),"page4","img");
                Game.eggsList.push(egg);    
            }
            

            //hen standing
            Game.bleachHen(index);

            //loop to create many
            if(Game.INGAME){
                setTimeout(function(){
        	       Game.bleach();
                   //console.log("bleach");
                }, Game.BLEACH_EVERY);
            }
        }
    }
    ,
    bleachHen: function(i){
        var myhen = Game.hensList[i];
        //myhen.move(-10);
        myhen.source = "images/hens/2.png";
        //Game.s1.play();
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
                //Game.ss.play();
                Game.eggsListInRow.splice(0, Game.eggsListInRow.length);
                if (Game.BROKEN_EGGS == Game.MAX_BROKEN_EGGS)
                {
                    //alert("You lost !!!");
                    Game.CHECK=0;

                    Game.endTimeouts();
                    if (Game.LIVES == 0)
                    {
                        Game.createDialog("Game Over !!", "Back to Home");
                    }
                    else
                    {
                        Game.createDialog("You Lost !!", "Try again");
                    }

                }

    			setTimeout(function(){
    				Game.brokenList[0].erase();Game.brokenList.shift();
                    //console.log("hatch");
                }, Game.BROKEN_DISAPPEAR_AFTER);
    		}
    	}
        for(var i=0; i<Game.coleggsList.length; i++){
            if (Game.coleggsList[i].y >= 550){
                Game.coleggsList[i].erase();
                Game.coleggsList.splice(i, 1);
            }
        }
    }
    ,
    endLevel: function(){
        document.getElementById("div1").style.cursor = "default";
        Game.updateBadges();
        if(Game.CHECK==0)
        {
            if(Game.LIVES==0)
            {
                Game.LIVES=3;
                Game.level=1;
                Game.INGAME=false;
            }
            else
            {
                Game.LIVES--;
                Game.addLevelInfo();
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
        Game.ALL_EGGS = 0;
        Game.CATCHED_COL_EGGS = 0;
        
        //Game.MINUTES = 0;
        //Game.SECONDS = 0;

    }
    ,
    updateBadges: function()
    {
        if (Game.CHECK == 1 && Game.BROKEN_EGGS < 5)
            {
                Game.B1 = "images/badge1.png";
            }
        if (Game.CHECK == 1 && Game.MAX_EGGS_IN_ROW >= 10)
        {
            Game.B2 = "images/badge2.png";
        }
        if (Game.CHECK == 1 && Game.CATCHED_COL_EGGS >= 3)
        {
            Game.B3 = "images/badge3.png";
        }
    }
    ,
    addLevelInfo: function(){
        if(Game.level==1)
        {
            Game.MAX_CATCHED_EGGS = 50;
            Game.MAX_BROKEN_EGGS = 35;
            Game.MINUTES = 1;
            Game.SECONDS = 0;
            Game.EGG_MOVE_EVERY = 20;
            Game.BLEACH_EVERY = 800;
        }
        else if(Game.level==2)
        {
            Game.MAX_CATCHED_EGGS = 130;
            Game.MAX_BROKEN_EGGS = 30;
            Game.MINUTES = 1;
            Game.SECONDS = 30;
            Game.EGG_MOVE_EVERY = 15;
            Game.BLEACH_EVERY = 600;
        }
        else if(Game.level==3)
        {
            Game.MAX_CATCHED_EGGS = 225;
            Game.MAX_BROKEN_EGGS = 25;
            Game.MINUTES = 2;
            Game.SECONDS = 0;
            Game.EGG_MOVE_EVERY = 12;
            Game.BLEACH_EVERY = 500;
        }
    }
    ,
    progressBar: function()
    {
        var pbar= document.getElementById("progress1");
        console.log(pbar);
        pbar.value += 1;
        if (pbar.value == 100){Game.FLAG = 1;}
        pbar.getElementsByTagName('span')[0].innerHTML = pbar.value+10;
        console.log(pbar.value);
        var inter = setInterval(function(){
            Game.progressBar();
            if (Game.FLAG == 1)
            {
                clearInterval(inter);
                Game.erasePage("page1");
                Game.menuInit();
            }
            },200);
    }
    ,
    calcScore: function(){
        Game.TOTAL_SCORE = 5*Game.CATCHED_EGGS + 30*Game.CATCHED_COL_EGGS - 3*Game.BROKEN_EGGS;
    }
    ,
    endTimeouts: function(){

        var highestTimeoutId = setTimeout(";");
        for (var i = 0 ; i < highestTimeoutId ; i++) {
            clearTimeout(i);
        }
    }



}
//Game.initInstructions();
//Game.menuInit();
Game.init();
