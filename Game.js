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
    level:2,
    bg_width:900,
    bg_height:550,
    bg_top:50,
    bg_left:200,
    selectedBasket:"",
    b:0,
    eggScore:0,
    brokenScore:0,
    lifeScore:0,

    init: function(l){
//    	Game.initLevel(l);
       

       // divv.appendChild(val);

        //Game.moving();
       // Game.catchEgg();
        //Game.moving();
        //Game.catchEgg();

    }
    ,
    initLevel: function(num){

        //create hens

 //   Game.createHens(num);
        //create basket
 //       Game.createBasket("salma/basket.png");
 //   Game.setLevels();
//  Game.setBasket();
        //loop on the hens and eggs
 //   Game.bleach(num);

//Game.moving();
//Game.setScoreBar();

    //Game.createHens(num);
        //create basket
        //Game.createBasket();
        Game.setLevels();
        Game.setBasket();
        //loop on the hens and eggs
   // Game.bleach(num);

    }
    ,
    setRecord: function(score,score1,score2){
        score.innerHTML=score1
        score.innerHTML+='/';
        score.innerHTML+=score2;
    }
    ,
    setScoreBar: function(){
        var bar = new myElement("salma/rect.png",110,528,980,60,"bar","page4","img");
        var life = new myElement("salma/heart.png",50,45,1010,435,"heart","page4","img");
        var egg = new myElement("salma/egggg.png",35,50,1015,200,"egg","page4","img");
        var brokenegg = new myElement("salma/Un.png",50,40,1010,320,"broken","page4","img");

        var eggsc = new myElement("",30,30,1010,255,"score1","page4","p");

        eggsc = document.getElementById("score1");
        Game.setRecord(eggsc,)

        barobj = document.getElementById("bar");
        barobj.style.opacity=0.6;


}
    
    ,
    setLevels: function(){

        var x = new myElement("salma/Leveltree.png",470,500,400,70,"lvltree","page3","img");


        var lvl1 = new myElement("salma/level1gray.png",70,60,460,340,"lvl1","page3","img");
        var lvl2 = new myElement("salma/level2trans.png",60,60,515,215,"lvl2","page3","img");
        var lvl3 = new myElement("salma/level3trans.png",70,70,600,120,"lvl3","page3","img");

        var badge1 = new myElement("salma/badge1.png",90,90,950,90,"badge1","page3","img");
        var badge2 = new myElement("salma/badge2.png",90,90,950,220,"badge2","page3","img");
        //var lvl4 = new myElement("pics/editedpics/level3trans.png",80,80,700,290,"lvl3","page3");
        //var lvl5 = new myElement("pics/editedpics/level3trans.png",80,80,700,290,"lvl3","page3");


    
        var start = new myElement("salma/start.png",150,150,855,400,"start","page3","img");

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
            lvl1.source="salma/level1red.png";
        }
        else if(Game.level==2)
        {
            lvl2.source="salma/level2red.png";
        }
        else if (Game.level==3)
        {
            lvl3.source="salma/level3red.png";
        }


        }
        ,
        selectBasket: function(baskobj,rate)
        {
            baskobj.style.opacity=rate;
        }
 
    ,
    setBasket: function(){
        var char1 = new myElement("salma/basket.png",100,100,260,150,"b1","page3","img");
        var char2 = new myElement("salma/basket2.png",100,100,260,370,"b2","page3","img");

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
            selectedBasket=char1.source;
            Game.selectBasket(basket1,1);
            Game.selectBasket(basket2,0.5);
        }

         basket2.onclick = function(){
            selectedBasket=char2.source;
            Game.selectBasket(basket2,1);
            Game.selectBasket(basket1,0.5);
        
        }

        start.onclick = function(){


          // var di=document.getElementById("div1");
           var page3elements = document.getElementsByClassName("page3");

           while(page3elements[0])
           {

           // alert(page3elements[0]);
            page3elements[0].parentElement.removeChild(page3elements[0]);
            //console.log(page3elements[i].parentNode.children);    

             //alert("ggg");
          }
          Game.createBasket(selectedBasket);
    

            var page3elements = document.getElementsByClassName("page3");

            while(page3elements[0])
            {
                page3elements[0].parentElement.removeChild(page3elements[0]); 
            }
        }

    }
}
    ,
    createBasket: function(basketsrc){
        var myBasket = new myElement(basketsrc, 100,60,600,500, "basket","page4","img");
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
    createHens: function(num){
        var n = num + 2;
        var diff = Game.bg_width/(n+2);
        var first_x = Game.bg_left + diff;
        for(var i=0; i<n; i++){
            generated_X = first_x + (diff*i);
            var hen = new myElement("pics/cc1.png",70,90, generated_X-(70/2), 150 - 90,"hen" + i,"Hen","img");
            Game.hensList.push(hen);
        };
        var bg = document.getElementById("img1");
        bg.style.filter= 'none';
    }
    ,
    catchEgg: function(){
        for(var i=0; i<Game.eggsList.length; i++){
            console.log(Game.b.x)
            if (Game.eggsList[i].y >= 400){
                
                if (Game.eggsList[i].x > Game.b.x && Game.eggsList[i].x < (Game.b.x + Game.b.w))
                {
                    console.log("7amada");
                }
            }
        }
        setTimeout(function(){
            Game.catchEgg();
        }, 40);
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
    	var egg = new myElement("salma/egggg.png",15,22, generated_X ,150,"egg" + parseInt(Math.random() * 10000),"egg","img");
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
    			var brokenEgg = new myElement("salma/Un.png",30,40, broken_x ,500,"brokenEgg" + parseInt(Math.random() * 10000),"Egg","img");
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
//Game.init(Game.level);
