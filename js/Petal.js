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

        var _tipLength, _dir, _theta, _adj, _opp, _col;

        var _petalShape;

        var _MAX_TIP_L, _MIN_TIP_L;

        var _petalContainer, _petalParent;

        var _this = this;

        var _hexchars =  ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];

        var _bezierPts = [];
        var _bezOppIn = 1;
        var _bezOppOut = 1.5;
        var _bezAdjTop = 0.5;
        var _bezAdjBtm = 0.25;

        var midPt;


        function _construct(arc,length,color,petalParent){

            //_dir = Math.random() > 0.5 ? 1 : -1;
            
            _dir = 1;

            _this.name = "Petal"+sftl.Colors.randomHex();

           _petalParent = petalParent;

            _col = sftl.Colors.variationsOn(color, 30);

            _theta = (arc)*(Math.PI/180);
            _adj = length;
            _opp = Math.atan(_theta*0.4)*_adj;

            _MAX_TIP_L = _adj/2.5+Math.random()*0.1;
            _MIN_TIP_L = _adj/10 - Math.random()*_adj/50;
            _tipLength = _MIN_TIP_L;

            _bezierPts = [
                [-(_opp*2),  -(_adj*1.3),    -_opp,      -(_adj*(2/3)),  0,  -_adj-_tipLength],
                [_opp,       -(_adj*(2/3)),  (_opp*2),   -(_adj*1.3),    0,  0]
            ];

            midPt = {x:_opp*0.3, y:_adj*0.6};

            _petalContainer = new createjs.Container();
            _petalContainer.name = "PetalContainer"+Math.floor(Math.random()*999);
            _petalShape = new createjs.Shape();

            //_petalShape.y -= Math.random()*200;
            _petalContainer.addChild(_petalShape);
            _petalContainer.update = _this.update;
            //_this.addChild(_petalShape);
            _petalParent.addChild(_petalContainer);



            var testCurve = new Bezier(150,40, 80,30,  105,50);
            console.trace(testCurve);
            var LUT = testCurve.getLut(8);
            LUT.forEach(function(p){console.trace(p);});







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

            /*            
            _petalShape.graphics.clear();
            _petalShape.graphics.setStrokeStyle(2).beginStroke(sftl.Colors.brightenByAmt(realCol,25));
            _petalShape.graphics.beginFill(realCol).moveTo(0,0);
            _petalShape.graphics.bezierCurveTo(-(_opp*2),-(_adj*1.1),-_opp,-(_adj),0,-_adj-_tipLength);
            _petalShape.graphics.bezierCurveTo(_opp,-(_adj),(_opp*2),-(_adj*1.1),0,0);
            _petalShape.graphics.endStroke().endFill();
            */
           
            _petalShape.graphics.clear();
            _petalShape.graphics.setStrokeStyle(2).beginStroke(sftl.Colors.brightenByAmt(realCol,30));
            //_petalShape.graphics.beginFill(realCol).moveTo(0,0);
            _petalShape.graphics.beginFill("rgba(255,0,100,0.1)").moveTo(0,0); 
//
            //console.log("pt1: "+_bezierPts[0][1]);
//
            //console.log("_dir: "+_dir+", _tipLength: "+_tipLength);

            //_petalShape.graphics.bezierCurveTo(-(_opp*2),-(_adj*1.1),-_opp,-(_adj),0,-_adj-_tipLength);
            //_petalShape.graphics.bezierCurveTo(_opp,-(_adj),(_opp*2),-(_adj*1.1),0,0);

 
            for(var i=0; i<_bezierPts.length; i++){


                if(i==0){
                    _petalShape.graphics.beginStroke("red");
                    _petalShape.graphics.moveTo(0,0);
                    _petalShape.graphics.lineTo(_bezierPts[i][0], _bezierPts[i][1]);
                    _petalShape.graphics.moveTo(_bezierPts[i][4], _bezierPts[i][5]);
                    _petalShape.graphics.lineTo(_bezierPts[i][2], _bezierPts[i][3]);
                    _petalShape.graphics.moveTo(0,0);
                } else if (i==1){
                    _petalShape.graphics.beginStroke("yellow");
                    _petalShape.graphics.moveTo(_bezierPts[i-1][4],_bezierPts[i-1][5]);
                    _petalShape.graphics.lineTo(_bezierPts[i][0], _bezierPts[i][1]);
                    _petalShape.graphics.moveTo(_bezierPts[i][4], _bezierPts[i][5]);
                    _petalShape.graphics.lineTo(_bezierPts[i][2], _bezierPts[i][3]);
                    _petalShape.graphics.moveTo(_bezierPts[i-1][4],_bezierPts[i-1][5]);
                } else if (i==2){
                    _petalShape.graphics.beginStroke("green");
                    _petalShape.graphics.moveTo(_bezierPts[i-1][4],_bezierPts[i-1][5]);
                    _petalShape.graphics.lineTo(_bezierPts[i][0], _bezierPts[i][1]);
                    _petalShape.graphics.moveTo(_bezierPts[i][4], _bezierPts[i][5]);
                    _petalShape.graphics.lineTo(_bezierPts[i][2], _bezierPts[i][3]);
                    _petalShape.graphics.moveTo(_bezierPts[i-1][4],_bezierPts[i-1][5]);
                } else if (i==3){
                    _petalShape.graphics.beginStroke("cyan");
                    _petalShape.graphics.moveTo(_bezierPts[i-1][4],_bezierPts[i-1][5]);
                    _petalShape.graphics.lineTo(_bezierPts[i][0], _bezierPts[i][1]);
                    _petalShape.graphics.moveTo(_bezierPts[i][4], _bezierPts[i][5]);
                    _petalShape.graphics.lineTo(_bezierPts[i][2], _bezierPts[i][3]);
                    _petalShape.graphics.moveTo(_bezierPts[i-1][4],_bezierPts[i-1][5]);
                }


                _petalShape.graphics.bezierCurveTo(_bezierPts[i][0], _bezierPts[i][1], _bezierPts[i][2], _bezierPts[i][3],  _bezierPts[i][4], _bezierPts[i][5]);


            }
 
            _petalShape.graphics.endStroke().endFill();

            /*
            _petalShape.graphics.setStrokeStyle(4).beginStroke("yellow");
            for(var i=0; i<_bezierPts.length; i++){
                _petalShape.graphics.moveTo(_bezierPts[i][0], _bezierPts[i][1]).lineTo(_bezierPts[i][2], _bezierPts[i][3]);
            }
            */

            _petalShape.graphics.endStroke().endFill();

        }

/*
        function _stretchAndSquash(amt){
            
            if(_tipLength >= _MAX_TIP_L){
                _dir = -amt;
            } else if (_tipLength <= _MIN_TIP_L){
                _dir = amt;
            }
            _tipLength += _dir/2;
            _opp -= _dir/3;

            _bezierPts = [
                [-(_opp*2),  -(_adj*1.1),    -_opp,    -(_adj),       0,  -_adj],
                [_opp,       -(_adj),       (_opp*2),   -(_adj*1.1),  0,      0]
            ];
        }
        */

        function _bezierWobble(){
            /*
            _bezierPts = [

                [-(_opp*_bezOppOut),       -(_adj*_bezAdjTop*0.5),    -_opp*_bezOppIn,     -(_adj*_bezAdjBtm*0.5),  -_opp*0.5,  -_adj*0.5],

                [-(_opp*_bezOppOut*0.5),       -(_adj*_bezAdjTop*0.5),         -_opp*_bezOppIn*0.5,          -(_adj*_bezAdjBtm*0.5),       0,          -_adj],

                [-(_opp*_bezOppOut),  -(_adj*_bezAdjTop*0.25),    -_opp*_bezOppIn*0.25,     -(_adj*_bezAdjBtm*0.25),  _opp*0.5,    -_adj*0.5],

                [_opp*_bezOppIn,           -(_adj*_bezAdjBtm),         (_opp*_bezOppOut),       -(_adj*_bezAdjTop),       0,             0]
            ];
            */
        

            
            
            if(midPt.y >= _adj){
                midPt.x = _opp;
                midPt.y = 0;
            }

            midPt.x -= 0.2;
            midPt.y += 0.2;

            _bezierPts = [
                [-midPt.x*3,  -midPt.y*(0.3),    -midPt.x,    -midPt.y*(0.7),   -midPt.x,  -midPt.y],

                [-midPt.x, -midPt.y*(1.2),    -midPt.x*2,    -(midPt.y*1.2),       0,  -_adj],

                [midPt.x*2,  -midPt.y*(1.2),    midPt.x,    -(midPt.y*1.2),       midPt.x,  -midPt.y],

                [midPt.x,    -midPt.y*(0.7),   midPt.x*3,  -midPt.y*(0.3),     0,  0]

            ];

            //console.log(midPt);

            /*
            _bezAdjTop += 0.005*_dir;
            _bezAdjBtm += 0.004*_dir;
            _bezOppOut -= 0.02*_dir;
            _bezOppIn -= 0.01*_dir;


            //_opp += _dir;
            //_adj += _dir;
            */
        }

        /**
         * petal with a single bulge that moves up and down while size change subtly
         * @return {[type]} [description]
         */
        function _bezierWobble1(){
            _bezierPts = [
                [-(_opp*2*_bezOpp),  -(_adj*_bezAdjTop),    -_opp*_bezOpp,    -(_adj*_bezAdjBtm),  0,  -_adj],
                [_opp*_bezOpp,       -(_adj*_bezAdjBtm),  (_opp*2*_bezOpp),   -(_adj*_bezAdjTop),  0,  0]
            ];
            
            if(_bezAdjTop >= 1.2){
                _dir = -1;
            } else if (_bezAdjBtm <= 0){
                _dir = 1;
            }
            _bezAdjTop += 0.005*_dir;
            _bezAdjBtm += 0.004*_dir;
            _bezOpp -= 0.01*_dir;

            //_opp += _dir*2;
            //_adj += _dir;
        }




        _this.update = function(){
            //_bezierWobble();
            _bezierWobble();

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
