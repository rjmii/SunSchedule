/* This was adapted from http://williams.best.vwh.net/sunrise_sunset_algorithm.htm
Sunrise/Sunset Algorithm

Source:
Almanac for Computers, 1990
published by Nautical Almanac Office
United States Naval Observatory
Washington, DC 20392
*/
//Inputs:
//var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
var now = new Date();
var day = now.getDate();
var	month = now.getMonth();
month = month + 1;
var year = now.getFullYear();      //date of sunrise/sunset
var latitude = 40.5853;
var	longitude = -105.0839;   //location for sunrise/sunset
//zenith:                Sun's zenith for sunrise/sunset
var offical = 90.83333333333333;
var civil = 96;
var nautical = 102;
var astronomical = 108;
var Hr;
var Hs;
var localOffset = ( -(now.getTimezoneOffset()) / 60);
var toRad = (Math.PI / 180);
var toDeg = (180 / Math.PI);
//Math Functions
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
function atan(numInDeg) {
	"use strict";
	var numInRad, outAtan;
	numInRad = numInDeg * (toRad);
	outAtan = Math.atan(numInRad);
	return outAtan;
}
function cos(numInDeg) {
	"use strict";
	var numInRad, outCos;
	numInRad = numInDeg * (toRad);
	outCos = Math.cos(numInRad);
	return outCos;
}
function asin(numInDeg) {
	"use strict";
	var numInRad, outAsin;
	numInRad = numInDeg * (toRad);
	outAsin = Math.asin(numInRad);
	return outAsin;
}
function acos(numInDeg) {
	"use strict";
	var numInRad, outAcos;
	numInRad = numInDeg * (toRad);
	outAcos = Math.asin(numInRad);
	return outAcos;
}
/*	
NOTE: longitude is positive for East and negative for West
NOTE: the algorithm assumes the use of a calculator with the
trig functions in "degree" (rather than "radian") mode. Most
programming languages assume radian arguments, requiring back
and forth convertions. The factor is 180/PI. So, for instance,
the equation RA = atan(0.91764 * tan(L)) would be coded as RA
= (180/PI)*atan(0.91764 * tan((PI/180)*L)) to give a degree
answer with a degree input for L.
*/

//1. first calculate the day of the year

var N1 = Math.floor(275 * month / 9);
var N2 = Math.floor((month + 9) / 12);
var N3 = (1 + Math.floor((year - 4 * Math.floor(year / 4) + 2) / 3));
var N = N1 - (N2 * N3) + day - 30;

//2. convert the longitude to hour value and calculate an approximate time

var lngHour = longitude / 15;

//if rising time is desired:
var tr = N + ((6 - lngHour) / 24);
//if setting time is desired:
var ts = N + ((18 - lngHour) / 24);

//3. calculate the Sun's mean anomaly
var Mr = (0.9856 * tr) - 3.289;
var Ms = (0.9856 * ts) - 3.289;

//4. calculate the Sun's true longitude
var Lr = Mr + (1.916 * sin(Mr)) + (0.020 * sin(2 * Mr)) + 282.634;
var Ls = Ms + (1.916 * sin(Ms)) + (0.020 * sin(2 * Ms)) + 282.634;
//var Lr = (180 / Math.PI) * (Mr + (1.916 * Math.sin(Mr)) + (0.020 * Math.sin(2 * ((Math.PI / 180) * Mr))) + 282.634);
//var Ls = (180 / Math.PI) * (Ms + (1.916 * Math.sin(Ms)) + (0.020 * Math.sin(2 * ((Math.PI / 180) * Mr))) + 282.634);
//NOTE: L potentially needs to be adjusted into the range [0,360) by adding/subtracting 360
if (Lr > 360) {
	Lr = Lr - 360;
} else if (Lr < 0) {
	Lr = Lr + 360;
}
if (Ls > 360) {
	Ls = Ls - 360;
} else if (Ls < 0) {
	Ls = Ls + 360;
}

//5a. calculate the Sun's right ascension
//RA = atan(0.91764 * tan(L))
var RAr = atan(0.91764 * tan(Lr));
var RAs = atan(0.91764 * tan(Ls));
//var RAr = (180 / Math.PI) * Math.atan(0.91764 * Math.tan((Math.PI / 180) * Lr));
//var RAs = (180 / Math.PI) * Math.atan(0.91764 * Math.tan((Math.PI / 180) * Ls));
//NOTE: RA potentially needs to be adjusted into the range [0,360) by adding/subtracting 360
if (RAr > 360) {
	RAr = RAr - 360;
} else if (RAr < 0) {
	RAr = RAr + 360;
}
if (RAs > 360) {
	RAs = RAs - 360;
} else if (RAs < 0) {
	RAs = RAs + 360;
}
//5b. right ascension value needs to be in the same quadrant as L
var Lquadrantr  = (Math.floor(Lr / 90)) * 90;
var Lquadrants  = (Math.floor(Ls / 90)) * 90;
var RAquadrantr = (Math.floor(RAr / 90)) * 90;
var RAquadrants = (Math.floor(RAs / 90)) * 90;
var RAr = RAr + (Lquadrantr - RAquadrantr);
var RAs = RAs + (Lquadrants - RAquadrants);

//5c. right ascension value needs to be converted into hours

var RAr = RAr / 15;
var RAs = RAs / 15;

//6. calculate the Sun's declination
var sinDecr = 0.39782 * sin(Lr);
var sinDecs = 0.39782 * sin(Ls);
var cosDecr = cos(asin(sinDecr));
var cosDecs = cos(asin(sinDecs));
//var sinDecr = (180 / Math.PI) * (0.39782 * Math.sin((Math.PI / 180) * Lr));
//var sinDecs = (180 / Math.PI) * (0.39782 * Math.sin((Math.PI / 180) * Ls));
//var cosDecr = (180 / Math.PI) * (Math.cos(Math.asin((Math.PI / 180) * sinDecr)));
//var cosDecs = (180 / Math.PI) * (Math.cos(Math.asin((Math.PI / 180) * sinDecs)));

//7a. calculate the Sun's local hour angle
var cosHr = (cos(offical) - (sinDecr * sin(latitude))) / (cosDecr * cos(latitude));
var cosHs = (cos(offical) - (sinDecs * sin(latitude))) / (cosDecs * cos(latitude));
//var cosHr = (180 / Math.PI) * ((Math.cos((Math.PI / 180) * offical) - (((Math.PI / 180) * sinDecr) * Math.sin((Math.PI / 180) * latitude))) / (((Math.PI / 180) * cosDecr) * Math.cos((Math.PI / 180) * latitude)));
//var cosHs = (180 / Math.PI) * ((Math.cos((Math.PI / 180) * offical) - (((Math.PI / 180) * sinDecs) * Math.sin((Math.PI / 180) * latitude))) / (((Math.PI / 180) * cosDecs) * Math.cos((Math.PI / 180) * latitude)));
if (cosHr > 1) {
	Hr = null;
} else {
	Hr = 360 - acos(cosHr);
	Hr = Hr / 15;
}
if (cosHs < -1) {
	Hs = null;
} else {
	Hs = acos(cosHs);
	Hs = Hs / 15;
}

	/*if (cosH >  1) 
	  the sun never rises on this location (on the specified date)
	if (cosH < -1)
	  the sun never sets on this location (on the specified date)*/

//7b. finish calculating H and convert into hours !this section is complete in 7a!	
	/*if rising time is desired:
	  H = 360 - acos(cosH)
	if setting time is desired:
	  H = acos(cosH)
	
	H = H / 15*/

//8. calculate local mean time of rising/setting	
var Tir = Hr + RAr - (0.06571 * tr) - 6.622;
var Tis = Hs + RAs - (0.06571 * ts) - 6.622;
//9. adjust back to UTC
var UTr = Tir - lngHour;
var UTs = Tis - lngHour;
//NOTE: UT potentially needs to be adjusted into the range [0,24) by adding/subtracting 24
if (UTr > 24) {
	UTr = UTr - 24;
} else if (UTr < 0) {
	UTr = UTr + 24;
}
if (UTs > 24) {
	UTs = UTs - 24;
} else if (UTs < 0) {
	UTs = UTs + 24;
}

//10. convert UT value to local time zone of latitude/longitude	
var localTr = UTr + localOffset;
var localTs = UTs + localOffset;
