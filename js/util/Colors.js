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


        _this.variationsOn = function(color, variability){

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
            } else if (color == "brightblue"){
                col = _this.randomBrightBlue();
            } else if (color == "pink"){
                col = _this.randomPink();
            } else {
                col = _this.brightenByAmt(col,Math.floor(Math.random()*variability - variability));
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

        _this.randomBrightBlue = function(){
            var hexString = "#00";
            hexString = hexString + _hexChars[Math.floor(Math.random()*8)+8];
            hexString = hexString + _hexChars[Math.floor(Math.random()*16)];
            hexString = hexString + "F";
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
            hexString = hexString + "F";
            hexString = hexString + _hexChars[Math.floor(Math.random()*16)];
            hexString = hexString + "F";
            hexString = hexString + _hexChars[Math.floor(Math.random()*16)];
            hexString = hexString + "F";
            hexString = hexString + _hexChars[Math.floor(Math.random()*16)];

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

        /**
         * Take either a hex or rgba color and brighten it by a specified amount.
         * @param  {string} col         -- hex or rgba color to brighten
         * @param  {int} brightening    -- number of steps (out of 255) to increase brightness
         * @return {string}             -- modified color in same format as original
         */
        _this.brightenByAmt = function(col,brightening){

            var rgbCol;

            if(_this.isHex(col)){
                rgbCol = _this.hexToRgb(col);
            } else if (col.r !== undefined && col.g !== undefined && col.b !== undefined){
                rgbCol = col;
            } else {
                console.warn("what kind of a color is "+col+" ?  Can't brighten.");
                return;
            }

             rgbCol.r = Math.max(0,Math.min(255,rgbCol.r + brightening));
             rgbCol.g = Math.max(0,Math.min(255,rgbCol.g + brightening));
             rgbCol.b = Math.max(0,Math.min(255,rgbCol.b + brightening));

             if(_this.isHex(col)){
                return _this.rgbToHex(rgbCol);
             } else {
                return rgbCol;
             }
        };

        /**
         * Picks only one of the r, g, or b values indicated in the hex color and shifts it by one
         * in a random direction
         * -----------------------------------------------------------------------------------------
         * @param  {string} hex1 -- a hex color string
         * @return {string} -- the modified color hex value.
         */
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

        _this.bgrTest = function(){
        };

        function _intToHex(int){

        }

        function _hexToInt(hex){
            var int = 0;
            for(var i=1; i<hex.length; i++){
                var char = hex.charAt(i);
                for(var c=0; c<_hexChars.length; c++){
                    if(char == _hexChars[c]){
                        int += c*Math.pow(16,(5-(i-1)));
                    }
                }
            }
            return int;
        }

        _this.hexToBgrInt = function(hex){
            return _hexToInt(_this.rgbToBgrHex(_this.hexToRgb('#C7B496')));
        };

        /**
         * Is the provided string a valid hex value?
         * @param  {string} colourStr
         * @return {bool}               true iff colourStr represents a hex value.
         */
        _this.isHex = function(colourStr) {
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colourStr);
        };

        /**
         * Convert a web colour name to a hex string
         * @param  {string} colourStr    a CSS colour name
         * @return {string}
         */
        _this.webColourToHex = function(colourStr) {
            var a = document.createElement("div");
            a.style.color = colourStr;
            var colours = window.getComputedStyle( document.body.appendChild(a) ).color.match(/\d+/g).map(function(a) {
                return parseInt(a, 10);
            });
            document.body.removeChild(a);
            var workingHex = (colours.length >= 3) ? "#" + (((1 << 24) + (colours[0] << 16) + (colours[1] << 8) + colours[2]).toString(16).substr(1)) : false;
            if (workingHex) {
                return workingHex;
            } else {
                throw (colourStr + " does not represent a known web colour.");
            }
        };

        /**
         * Get the hex value of a string that may be a named web colour, or may already be in hex
         * @param  {string} colourStr    The string representing a colour
         * @return {string}             Hex string representing the colour
         */
        _this.nameToHex = function(colourStr) {
            if (_this.isHex(colourStr)) {
                return colourStr;
            } else {
                return _this.webColourToHex(colourStr);
            }
        };

        /**
         * Get a weighted average of two colours
         * @param  {string} colourStr1       A web colour name or hex colour string
         * @param  {string} colourStr2       A web colour name or hex colour string
         * @param  {Number} proportion1     Proportion (0<p<1) of colour1 to use in the mix
         * @param  {Number} proportion2     Proportion (0<p<1) of colour1 to use in the mix
         * @return {string}                 Hex string representing the mixed colour
         */
        _this.mixHexCols = function(colourStr1, colourStr2, proportion1, proportion2) {
            var rgb1 = _this.hexToRgb(_this.webColourToHex(colourStr1));
            var rgb2 = _this.hexToRgb(_this.webColourToHex(colourStr2));
            var rgbmixed = {
                r : Math.floor(parseInt(rgb1.r) * proportion1 + parseInt(rgb2.r) * proportion2),
                g : Math.floor(parseInt(rgb1.g) * proportion1 + parseInt(rgb2.g) * proportion2),
                b : Math.floor(parseInt(rgb1.b) * proportion1 + parseInt(rgb2.b) * proportion2)
            };
            return _this.rgbToHex(rgbmixed);
        };

        /**
         * Convert a hex string to an object with r, g, and b values.
         * // with thanks to http://stackoverflow.com/users/1047797/david
         * @param  {string} hex     Hex colour string
         * @return {object}         Object of type {r:redValue, g:greenValue, b:blueValue};
         */
        _this.hexToRgb = function(hex) {
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            });

            var hexBreakdown = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

            var rgbObj = hexBreakdown ? {
                r : parseInt(hexBreakdown[1], 16),
                g : parseInt(hexBreakdown[2], 16),
                b : parseInt(hexBreakdown[3], 16)
            } : null;

            return rgbObj;
        };

        /**
         * Convert an object with r, g, and b values to a hex string
         * @param  {object} rgbObj  Object with values {r:redValue, g:greenValue, b:blueValue};
         * @return {string}         Hex colour string
         */
        _this.rgbToHex = function(rgbObj) {
            return "#" + _componentToHex(rgbObj.r) + _componentToHex(rgbObj.g) + _componentToHex(rgbObj.b);
        };

        _this.rgbToBgrHex = function(rgbObj) {
            return "#" + _componentToHex(rgbObj.b) + _componentToHex(rgbObj.g) + _componentToHex(rgbObj.r);
        };


        /**
         * Helper for rgbToHex, converts each individual colour component to a single hex value
         * @param  {Number} c  A number between 0 and 255
         * @return {string}    The hex equivalent of the provided component
         */
        function _componentToHex (c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }

        return _this;

    }; // jshint ignore:line

}());
