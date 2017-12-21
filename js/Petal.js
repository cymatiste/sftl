/* global require, createjs, ss, sftl */

(function () {
    "use strict";

    Petal.prototype = new createjs.Container();
    Petal.prototype.constructor = Petal;

    /**
     * This is a layer that displays a tile grid exported from the tiled editor.
     * @param {Object} arc - The angle, in degrees, of how wide this petal should be.
     */
    function Petal(arc,length,color,petalParent){

        var _tipLength, _tipDir, _theta, _adj, _opp, _col;

        var _petalShape;

        var _MAX_TIP_L, _MIN_TIP_L;

        var _petalContainer, _petalParent;

        var _this = this;

        var _hexchars =  ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];


        function _construct(arc,length,color,petalParent){

            _tipDir = Math.random() > 0.5 ? 1 : -1;

            _this.name = "Petal"+sftl.Colors.randomHex();

           _petalParent = petalParent;

            _col = sftl.Colors.variationsOn(color);

            _theta = (arc)*(Math.PI/180);
            _adj = length;
            _opp = Math.atan(_theta*0.4)*_adj;

            _MAX_TIP_L = _adj/2.5+Math.random()*0.1;
            _MIN_TIP_L = _adj/10 - Math.random()*_adj/50;
            _tipLength = _MIN_TIP_L;

            _petalContainer = new createjs.Container();
            _petalContainer.name = "PetalContainer"+Math.floor(Math.random()*999);
            _petalShape = new createjs.Shape();


            _drawPetal();
            //_petalShape.y -= Math.random()*200;
            _petalContainer.addChild(_petalShape);
            _petalContainer.update = _this.update;
            //_this.addChild(_petalShape);
            _petalParent.addChild(_petalContainer);

            return _petalContainer;
            
        }

        
        _this.getPetalContainer = function(){
            return _petalContainer;
        };

        function _drawPetal(col){

            //_petalShape.graphics.clear();
            //_petalShape.graphics.beginFill(_randomHex()).drawCircle(Math.random()*200-100,Math.random()*200-100,100);

            var realCol = col;
            /*
            _petalShape.graphics.clear();
            _petalShape.graphics.beginFill(realCol).moveTo(0,0);
            _petalShape.graphics.quadraticCurveTo (-(_opp*1.5),-(_adj*2/3),-_opp,-_adj);
            _petalShape.graphics.bezierCurveTo(-(_opp*0.8),-(_adj*1.1),-_opp/2,-(_adj),0,-_adj-_tipLength);
            _petalShape.graphics.bezierCurveTo(_opp/2,-(_adj),(_opp*0.8),-(_adj*1.1),_opp,-_adj);
            _petalShape.graphics.quadraticCurveTo((_opp*1.5),-(_adj*2/3),0,0);
            _petalShape.graphics.endFill();
            */
            
            _petalShape.graphics.clear();
            _petalShape.graphics.beginFill(realCol).moveTo(0,0);
            _petalShape.graphics.bezierCurveTo(-(_opp*2),-(_adj*1.1),-_opp,-(_adj),0,-_adj-_tipLength);
            _petalShape.graphics.bezierCurveTo(_opp,-(_adj),(_opp*2),-(_adj*1.1),0,0);
            //_petalShape.graphics.bezierCurveTo(_opp/2,-(_adj),(_opp*0.8),-(_adj*1.1),_opp,-_adj);
            _petalShape.graphics.endFill();
        }

        function _adjustDimensions(){
            
            if(_tipLength >= _MAX_TIP_L){
                _tipDir = -1;
            } else if (_tipLength <= _MIN_TIP_L){
                _tipDir = 1;
            }
            _tipLength += _tipDir/2;
            _opp -= _tipDir/3;
        }

        _this.update = function(){
            _adjustDimensions();
            _col = sftl.Colors.subtleHexShift(_col);
            _drawPetal(_col);           
        };

        _this.displayIn = function(displayObj){
            displayObj.addChild(_petalContainer);
        };



        return _construct(arc,length,color,petalParent);
    }


    sftl.Petal = Petal;

}());
