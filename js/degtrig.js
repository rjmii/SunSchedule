/*
	The DegTrig is a JavaScript Library that allows users to input trig functions in Degrees with output in degrees rather than radians..

    Copyright (C) 2013  Robert J. McCleary II

    The DegTrig Library is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see http://www.gnu.org/licenses/gpl-3.0-standalone.html.

	You can contact Robert J. McCleary II in the following ways.

	Physical Address:
	3717 S Tafthill RD
	N239
	Fort Collins, CO 80526

	Email Adress:
	rjmii@spatialanalysts.com
	
	View the GitHub Repository at: https://github.com/rjmii/DegTrig.js

*/
// Written By Robert McCleary 8/28/2013
// This currently does sin, tan, atan, cos, asin, and acos
var toRad = (Math.PI / 180);
var toDeg = (180 / Math.PI);
function sin(numInDeg) {
	"use strict";
	var numInRad, outSin;
	numInRad = numInDeg * (toRad);
	outSin = Math.sin(numInRad);
	return outSin;
}
function tan(numInDeg) {
	"use strict";
	var numInRad, outTan;
	numInRad = numInDeg * (toRad);
	outTan = Math.tan(numInRad);
	return outTan;
}
function atan(numIn) {
	"use strict";
	var outAtan;
	outAtan = Math.atan(numIn);
	outAtan = outAtan * toDeg;
	return outAtan;
}
function cos(numInDeg) {
	"use strict";
	var numInRad, outCos;
	numInRad = numInDeg * (toRad);
	outCos = Math.cos(numInRad);
	return outCos;
}
function asin(numIn) {
	"use strict";
	var outAsin;
	outAsin = Math.asin(numIn);
	outAsin= outAsin * toDeg;
	return outAsin;
}
function acos(numIn) {
	"use strict";
	var outAcos;
	outAcos = Math.acos(numIn);
	outAcos= outAcos * toDeg;
	return outAcos;
}