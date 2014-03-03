//The algarythm used here was adapted from http://williams.best.vwh.net/sunrise_sunset_algorithm.htm accessed on 8/1/2013
//all asingments are temporary
//the values assigned below are for testing purposes only
var sunrise = 210.9581002777778;
var sunset ;
var N = 211;
var lngHour = 7.005593333333334;
var M = 204.6313036337778;
var L = 878050.4248191378
var RA = 485.81912560729666;
var sinDec;
var cosDec = 53.022390701439264;
var cosH;
// this value for zenith came from http://www.astronomyforum.net/solar-viewing-forum/59615-what-zenith-how-calculate-how-use-date_sunrise.html and may not acctually be accurate.
var zenith = 90.8333;
//This is the longitude of ft collins.
var longitude = 105.0839;



function calculateSunriseAndSunset(day, month, year, latitude, longitude, zenith)
{
	
	
}

//First Calculate the day of the year
function calculateDayofYear(day, month, year)
{
	
	N1 = Math.floor(275 * month /9);
	N2 = Math.floor((month +9) / 12);
	N3 = (1 + Math.floor((year -4 * Math.floor(year / 4) +2) /3));
	N = N1 - (N2 * N3) + day - 30;
	//This next part is for testing only
	//alert(N);
}

//convert the longitude to hour value and calculate and approximate time
function longitudetoHour(longitude)
{
	lngHour = longitude / 15 ;
	sunrise = N + ((6 - lngHour) /24);
	sunset = N + ((18 - lngHour) /24);
}
//calculate the sun's mean anomaly
function meanAnomaly(time)
{
	M = (0.9856 * time) - 3.289;
}

//calculate the Sun's true longitude
function sunTrueLongitude(meananomally)
{
	L = (M + (1.916 * Math.sin(M)) + (0.020 * Math.sin(2 * M)) + 282.634);
	//The above equation gives us radians this will make L degrees
	L = L * (180/Math.PI);
	if (L > 360)
	{
		L = L - 360;
	}
	else if (L < 360)
	{
		L = L + 360;
	}
}

//Calculate the Sun's right ascension
function sunRightAscension(sunsLatitues)
{
	RA = Math.atan(0.91764 * Math.tan(L));
	if (RA > 360)
	{
		RA = RA - 360;
	}
	else if (RA < 360)
	{
		RA = RA + 360;
	}
	//this line should be converting radians to degrees I hope it works!
	RA = (180/Math.PI) * RA;
	//right ascension value needs to be in the same quadrant as L
	Lquadrant  = (Math.floor( L/90)) * 90;
	RAquadrant = (Math.floor(RA/90)) * 90;
	RA = RA + (Lquadrant - RAquadrant);
	//right ascension value needs to be converted into hours
	RA = RA / 15;
}
// calculate the Sun's declination
//If there are singinifcant errors in the working of this file start looking here
function sunDeclination ()
{
	sinDec = 0.39782 * Math.sin(L);
	cosDec = Math.cos(Math.asin(sinDec));
	//this line should be converting radians to degrees I hope it works!
	cosDec = (180/Math.PI) * cosDec;
}
//calculate the Sun's local hour angle
function sunLocalHourAngle()
{
	
}
