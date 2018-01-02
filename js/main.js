(function () {

    var _canvas = document.getElementById("kalCanvas");
    var _canvasWidth = 1920;
    var _canvasHeight = 1080;
    var _stage;

    var _flowers = [];
    
        
    function init (flowerData){
        
        // Get the canvas to draw the game to
            
        _canvas = document.getElementById("kalCanvas");
        _stage = new createjs.Stage(_canvas);
        createjs.Touch.enable(_stage);
        
        $ ( window ).resize();
        
        _startLoop();

        var flowerData = {};
        var flower = new sftl.Flower(flowerData);
        _stage.addChild(flower);
        _flowers.push(flower);
        
        console.log("added "+flower+" to "+_stage)
    }


    $ ( window ).resize ( function () {
        //Calculate ratio of window width and height to game width and height
        var widthRatio = window.innerWidth / _canvasWidth;
        var heightRatio = window.innerHeight / _canvasHeight;

        var $canvas = $("canvas#kalCanvas");

        //Fit the canvas to whatever dimension has the smallest ratio compared to the game size
        if(heightRatio < widthRatio){
            $canvas.css("height", window.innerHeight);
            $canvas.css("width", 'auto');
        }else{
            $canvas.css("width", window.innerWidth);
            $canvas.css("height", 'auto');
        }

    });


    function _startLoop() {
        //createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        createjs.Ticker.setInterval(30);
        createjs.Ticker.addEventListener("tick", _handleTick);
    }

    function _update(){
            
        for(var i=0; i<_flowers.length; i++){
            _flowers[i].update();
        }
    }

    function _handleTick(tickEvent) {
        var deltaSeconds = tickEvent.delta / 1000.0;
        _update();
        _stage.update(tickEvent);
    }

    setTimeout(init, 500);



}());
