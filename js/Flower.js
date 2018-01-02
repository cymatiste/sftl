/* global require, createjs, ss, sftl */
(function () {
    "use strict";

    Flower.prototype = new createjs.Container();
    Flower.prototype.constructor = Flower;

    /**
     * This is a layer that displays a tile grid exported from the tiled editor.
     * @param {Object} arc - The angle, in degrees, of how wide this petal should be.
     */
    function Flower(flowerData){
        "use strict";

        var _this = this;

        // put this in a separate config
        var _canvasWidth = 1920;
        var _canvasHeight = 1080;

        var _numPetals = 24;
        var _petals = [];

        var _flowerContainer;

        function _construct (flowerData){

            //Get the canvas to draw the game to
            
            _flowerContainer = new createjs.Container();
            _flowerContainer.name = "FlowerContainer";

            _this.addChild(_flowerContainer);

            _createFlower(flowerData);

            return _this;
        }
        


        function _createFlower(flowerData){  
            for(var i=0; i<_numPetals; i++){
               _createOuterPetal(i);
            }
            
            for(var j=0; j<_numPetals; j++){
                _createInnerPetal1(j);
            }

            for(var j=0; j<_numPetals; j++){
                _createInnerPetal2(j);
            }
           
           /*
            for(var p=0; p<_petals.length; p++){
                if((p>_numPetals*5) && (p%2 == (_numPetals%2==1? 0 : 1))){
                    console.log(p+" copying from "+(p-1));
                    _petals[p].rotation = _petals[p-1].rotation;
                } else if((p>_numPetals*5)){
                    console.log(p+" RANDOM...");
                    _petals[p].rotation = Math.random()*360;    
                } else if (p%5 > 0){
                    console.log(p+" copying from "+(Math.floor(p/5)*5));
                    _petals[p].rotation = _petals[Math.floor(p/5)*5].rotation; 
                } else {
                    console.log(p+" RANDOM");
                    _petals[p].rotation = Math.random()*360;    
                }
                
            }
            */
           for(var p=0; p<_petals.length; p++){
            _petals[p].rotation = _petals[p].targetRot;
           }
            
           
            _this.addChild(_flowerContainer);
        }


        function _createOuterPetal(i){

            var rotAngle = (360/_numPetals);

            var outerPetal1 = new sftl.Petal(rotAngle, 350, "green", _flowerContainer);
            var outerPetal2 = new sftl.Petal(rotAngle, 350, "black", _flowerContainer);
            var outerPetal3 = new sftl.Petal(rotAngle, 350, "dark", _flowerContainer);
            var outerPetal4 = new sftl.Petal(rotAngle, 350, "dark", _flowerContainer);
            var outerPetal5 = new sftl.Petal(rotAngle, 350, "dark", _flowerContainer);
            //_flowerContainer.addChild(outerPetal);
            //outerPetal.displayIn(_flowerContainer);
            //var clone = _clone(outerPetal);
            //_petals.push(clone);
            _petals.push(outerPetal1, outerPetal2, outerPetal3, outerPetal4, outerPetal5);

            
            outerPetal1.x = outerPetal2.x = outerPetal3.x = outerPetal4.x = outerPetal5.x = _canvasWidth/2;
            outerPetal1.y = outerPetal2.y = outerPetal3.y = outerPetal4.y = outerPetal5.y = _canvasHeight/2;
            outerPetal1.targetRot = outerPetal2.targetRot = outerPetal3.targetRot = i*rotAngle;
            outerPetal4.targetRot = i*rotAngle - rotAngle/6;
            outerPetal5.targetRot = i*rotAngle + rotAngle/6;

            outerPetal2.scaleX = 0.94;
            outerPetal2.scaleY = 0.98;

            outerPetal3.scaleX =  outerPetal4.scaleX =  outerPetal5.scaleX = 0.5;
            outerPetal3.scaleY =  0.9;
            outerPetal4.scaleY =  outerPetal5.scaleY = 0.7;

            outerPetal1.alpha = 0.6;
            outerPetal2.alpha = 0.9;
            outerPetal3.alpha = outerPetal4.alpha = outerPetal5.alpha = 0.3;

        }

        function _createInnerPetal1(j){

            var rotAngle = (360/(_numPetals));
            var innerPetal1 = new sftl.Petal(rotAngle, 300, "blue", _flowerContainer);
            var innerPetal2 = new sftl.Petal(rotAngle, 300, "black", _flowerContainer);
            //_flowerContainer.addChild(innerPetal);
            //innerPetal.displayIn(_flowerContainer);
            //var clone = JSON.parse(JSON.stringify(innerPetal));
            //_petals.push(clone);
            _petals.push(innerPetal1, innerPetal2);
            
            innerPetal1.targetRot = innerPetal2.targetRot = j*rotAngle + rotAngle/2;
            innerPetal1.x = innerPetal2.x = _canvasWidth/2;
            innerPetal1.y = innerPetal2.y = _canvasHeight/2;

            innerPetal1.scaleX = 1;
            innerPetal2.scaleX = 0.9;
            innerPetal2.scaleY = 0.97;

            innerPetal1.alpha = 0.6;
            innerPetal2.alpha = 0.9;

        }

         function _createInnerPetal2(j){

            var rotAngle = (360/(_numPetals));
            var innerPetal1 = new sftl.Petal(rotAngle, 150, "pink", _flowerContainer);
            var innerPetal2 = new sftl.Petal(rotAngle, 150, "black", _flowerContainer);
            //_flowerContainer.addChild(innerPetal);
            //innerPetal.displayIn(_flowerContainer);
            //var clone = JSON.parse(JSON.stringify(innerPetal));
            //_petals.push(clone);
            _petals.push(innerPetal1, innerPetal2);
            
            innerPetal1.targetRot = innerPetal2.targetRot = j*rotAngle;
            innerPetal1.x = innerPetal2.x = _canvasWidth/2;
            innerPetal1.y = innerPetal2.y = _canvasHeight/2;

            innerPetal1.scaleX = 1;
            innerPetal2.scaleX = 0.9;
            innerPetal2.scaleY = 0.97;

            innerPetal1.alpha = 0.6;
            innerPetal2.alpha = 0.9;

        }


        _this.update = function(){
            
            for(var i=0; i<_petals.length; i++){
                _petals[i].update();
                _petals[i].rotation += (_petals[i].targetRot - _petals[i].rotation)/40;
                //_petals[i].scaleX += 0.001;
            }
            //_petals[0].update();
        };



        return _construct(flowerData);

    }


    sftl.Flower = Flower;

}());
