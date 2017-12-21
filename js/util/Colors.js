/* global require, createjs, ss, sftl */

(function () {
    "use strict";
    /**
     * This is a layer that displays a tile grid exported from the tiled editor.
     * @param {Object} arc - The angle, in degrees, of how wide this petal should be.
     */
    sftl.Colors = sftl.Colors || new function Colors () { // jshint ignore:line

        var _this = this;

        var _hexChars =  ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];


        _this.variationsOn = function(color){

            var col = color;

            if(color == "blue"){
                col = _this.randomBlue();
            } else if (color == "green"){
                col = _this.randomGreen();
            } else if (color == "free"){
                col = _this.randomBright();
            } else if (color == "red"){
                col = _this.randomRed();
            } else if (color == "yellow"){
                col = _this.randomYellow();
            } else if (color == "white"){
                col = _this.randomWhite();
            } else if (color == "black"){
                col = _this.randomBlack();
            } else if (color == "dark"){
                col = _this.randomDark();
            } else if (color == "darkblue"){
                col = _this.randomDarkBlue();
            } else if (color == "pink"){
                col = _this.randomPink();
            }

            return col;
            
        }

        _this.randomHex = function(){
            var hexString = "#";
            for(var i=0; i<6; i++){
                hexString = hexString + _hexChars[Math.floor(Math.random()*_hexChars.length)];
            }
            return hexString;
        };

        _this.randomBright = function(){
            var hexString = "#";
            var dropCol = Math.floor(Math.random()*3);

            for(var i=0; i<6; i++){
                if(((i==0 || i==1) && dropCol==0) || ((i==2 || i==3) && dropCol==1) || ((i==4 || i==5) && dropCol==2)){
                    hexString = hexString + "0";
                } else {
                    hexString = hexString + _hexChars[Math.floor(Math.random()*8)+8];    
                }
                
            }
            console.log("dropCol: "+dropCol+", bright hex: "+hexString)
            return hexString;
        };

        _this.randomBlue = function(){
            var hexString = "#";
            hexString = hexString + _hexChars[Math.floor(Math.random()*2)];
            hexString = hexString + _hexChars[Math.floor(Math.random()*2)];
            hexString = hexString + _hexChars[Math.floor(Math.random()*2)];
            hexString = hexString + _hexChars[Math.floor(Math.random()*2)];
            hexString = hexString + _hexChars[Math.floor(Math.random()*8)+8];
            hexString = hexString + _hexChars[Math.floor(Math.random()*8)+8];
            return hexString;
        };

        _this.randomGreen = function(){
            var hexString = "#";
            hexString = hexString + _hexChars[Math.floor(Math.random()*2)];
            hexString = hexString + _hexChars[Math.floor(Math.random()*2)];
            hexString = hexString + _hexChars[Math.floor(Math.random()*8)+8];
            hexString = hexString + _hexChars[Math.floor(Math.random()*8)+8];
            hexString = hexString + _hexChars[Math.floor(Math.random()*2)];
            hexString = hexString + _hexChars[Math.floor(Math.random()*2)];
            return hexString;
        };

        _this.randomRed = function(){

            var hexString = "#";
            hexString = hexString + _hexChars[Math.floor(Math.random()*8)+6];
            hexString = hexString + _hexChars[Math.floor(Math.random()*8)+6];
            hexString = hexString + _hexChars[Math.floor(Math.random()*4)];
            hexString = hexString + _hexChars[Math.floor(Math.random()*4)];
            hexString = hexString + _hexChars[Math.floor(Math.random()*4)];
            hexString = hexString + _hexChars[Math.floor(Math.random()*4)];
            return hexString;
        };

        _this.randomPink = function(){

            var hexString = "#";
            hexString = hexString + _hexChars[Math.floor(Math.random()*10)+6];
            hexString = hexString + _hexChars[Math.floor(Math.random()*10)+6];
            hexString = hexString + "00";
            hexString = hexString + _hexChars[Math.floor(Math.random()*10)+2];
            hexString = hexString + _hexChars[Math.floor(Math.random()*10)+2];
            return hexString;
        };

        _this.randomYellow = function(){
            var hexString = "#";
            hexString = hexString + _hexChars[Math.floor(Math.random()*8)+8];
            hexString = hexString + _hexChars[Math.floor(Math.random()*8)+8];
            hexString = hexString + _hexChars[Math.floor(Math.random()*8)+8];
            hexString = hexString + _hexChars[Math.floor(Math.random()*8)+8];
            hexString = hexString + _hexChars[Math.floor(Math.random()*4)];
            hexString = hexString + _hexChars[Math.floor(Math.random()*4)];

            return hexString;
        };

        _this.randomWhite = function(){
            var hexString = "#";
            hexString = hexString + _hexChars[Math.floor(Math.random()*12)+4];
            hexString = hexString + _hexChars[Math.floor(Math.random()*12)+4];
            hexString = hexString + _hexChars[Math.floor(Math.random()*12)+4];
            hexString = hexString + _hexChars[Math.floor(Math.random()*12)+4];
            hexString = hexString + _hexChars[Math.floor(Math.random()*12)+4];
            hexString = hexString + _hexChars[Math.floor(Math.random()*12)+4];

            return hexString;
        };

        _this.randomBlack = function(){
            var hexString = "#";
            hexString = hexString + "0";
            hexString = hexString + _hexChars[Math.floor(Math.random()*4)];
            hexString = hexString + "0";
            hexString = hexString + _hexChars[Math.floor(Math.random()*4)];
            hexString = hexString + "0";
            hexString = hexString + _hexChars[Math.floor(Math.random()*4)];

            return hexString;
        };

        _this.randomDark = function(){
            var hexString = "#";
            var dropCol = Math.floor(Math.random()*3);

            for(var i=0; i<6; i++){
                if(((i==0 || i==1) && dropCol==0) || ((i==2 || i==3) && dropCol==1) || ((i==4 || i==5) && dropCol==2)){
                    hexString = hexString + "0";
                } else {
                    hexString = hexString + _hexChars[Math.floor(Math.random()*5)];    
                }
                
            }
            return hexString;
        };

        _this.randomDarkBlue = function(){
            var hexString = "#";
            hexString = hexString + "0"
            hexString = hexString + _hexChars[Math.floor(Math.random()*2)];
            hexString = hexString + "0"
            hexString = hexString + _hexChars[Math.floor(Math.random()*2)];
            hexString = hexString + _hexChars[Math.floor(Math.random()*2)];
            hexString = hexString + _hexChars[Math.floor(Math.random()*16)];
            return hexString;
        };

        _this.subtleHexShift = function(hex1){
            var hex2 = "#";

            var indexToShift = 2 + 2*Math.floor(Math.random()*3);

            var charToShift = hex1.charAt(indexToShift);

            var newIndex, newChar;

            for(var i=0; i<_hexChars.length; i++){
                if(_hexChars[i] == charToShift){
                    newIndex = (i == 0) 
                        ? 1 
                        : (i == _hexChars.length-1) 
                            ? _hexChars.length-2 
                            : (Math.random() > 0.5) 
                                ? i - 1 
                                : i + 1;

                    newChar = _hexChars[newIndex];

                    for(var j=1; j<hex1.length; j++){
                        if(j==indexToShift){
                            hex2 = hex2 + newChar;
                        } else {
                            hex2 = hex2 + hex1.charAt(j);
                        }
                    }
                    break;
                }
            }
            //console.log(hex1+" shift "+charToShift+" at index "+indexToShift+" ---> "+newIndex+" i.e. "+newChar+", thus "+hex2);
            return hex2;
            
        };

        return _this;

    }; // jshint ignore:line

}());
