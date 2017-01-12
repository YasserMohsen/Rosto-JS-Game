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
    level:3,
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
//        Game.createHens(num);
        //create basket
Game.setLevels();
Game.setBasket();
        //loop on the hens and eggs
  //      Game.bleach(num);

    }
    ,
    setLevels: function(){

        var x = new myElement("pics/editedpics/Leveltree.png",470,500,400,70,"x","page3");
        var lvl1 = new myElement("pics/1.png",100,90,450,300,"lvl1","page3");
        var lvl2 = new myElement("pics/2.png",60,60,600,200,"lvl2","page3");
        var lvl3 = new myElement("pics/3.png",80,80,700,290,"lvl3","page3");

        //x.appendChild(lvl1);
        if(Game.level==1)
        {
            lvl1.source="pics/lol.png";
        }
        else if(Game.level==2)
        {
            lvl2.source="pics/number-2.jpg";
        }
        else if (Game.level==3)
        {
            lvl3.source="pics/33.jpg";
        }


        }
    ,
    setBasket: function(){
        var char1 = new myElement("pics/basket.jpg",100,100,450,450,"b1","page3");
        var char2 = new myElement("pics/basket2.jpg",100,100,700,450,"b2","page3");

  //      var maindiv = document.getElementById("div1");
        //var arr=document.getElementsByClassName("page3");

        //maindiv.appendChild(arr);
        basket1=document.getElementById("b1");
        basket2=document.getElementById("b2");
        basket1.alt="b 1";

        basket1.onmouseover = function(){
           // alert("salma");
           char1.zoom(1.25);
           /*char1.x = 400;
           char1.y = 400;
           char1.w = 200;
           char1.h = 200;*/
          // basket1.style.width= '150px';
          // basket1.style.height= '150px';
          // alert(char1.w);
          //  char1.cls="classchar";
           // basket1.className = "classchar";
        }

       basket1.onmouseleave = function(){
            char1.zoom(.8)
           // alert("salma");
           /*char1.x = 450;
           char1.y = 450;
           char1.w=100;
           char1.h=100;*/
         //  basket1.style.width= '100px';
          // basket1.style.height= '100px';
          //  char1.cls="classchar";
           // basket1.className = "classchar";
        }
//*/
        basket1.onclick = function(){
          //  var arr=document.getElementsByClassName("page3");
          /*for(i=0;i<arr.length;i++)
          {
            if( arr[i].class("page3") )

            { maindiv.removeChild(arr[i]); }

            }*/
           //basket1.style.width= '100px';
           //basket1.style.height= '100px';
          //  char1.cls="classchar";
           // basket1.className = "classchar";
        }
        //basket1.addEventListener('mouseover',function(){
           
          //         });
        //basket1.addEventListener('click',function(){
            
        //});
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
Game.initLevel(1);
//Game.setLevels();
//Game.init(Game.level);
