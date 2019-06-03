/*
	The SunSchedule app gives you the current sunrise and sunset time for your current location.

    Copyright (C) 2013-2019  Robert J. McCleary II

    The SunSchedule app is free software: you can redistribute it and/or modify
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
	2707 W Cookie Jar Circle
	Cedar City, UT 84720

	Email Adress:
	robertjmcclearyii@gmail.com

*/
/* This was adapted from http://williams.best.vwh.net/sunrise_sunset_algorithm.htm
Sunrise/Sunset Algorithm

Source:
Almanac for Computers, 1990
published by Nautical Almanac Office
United States Naval Observatory
Washington, DC 20392
*/
function calcSunset(dayOffset, lat, lon) {
	"use strict";
	var now, day, month, year, latitude, longitude, localOffset, sunsetTime, currentTime, offical, Hs, N1, N2, N3, N, lngHour, ts, Ms, Ls, RAs, Lquadrants, RAquadrants, sinDecs, cosHs, Tis, UTs, localTs, sunsetTimeH, sunsetTimeM, displaySunsetTime, cosDecs, sunsetTimeHo;
	now = new Date();
	day = now.getDate();
	day = day + dayOffset;
	now.setDate(day);
	month = now.getMonth();
	month = month + 1;
	year = now.getFullYear();
	latitude = lat;
	longitude = lon;

	localOffset = (-(now.getTimezoneOffset()) / 60);
	//zenith:                Sun's zenith for sunrise/sunset
	offical = 90.83333333333333;

	//1. first calculate the day of the year
	N1 = Math.floor(275 * month / 9);
	N2 = Math.floor((month + 9) / 12);
	N3 = (1 + Math.floor((year - 4 * Math.floor(year / 4) + 2) / 3));
	N = N1 - (N2 * N3) + day - 30;

	//2. convert the longitude to hour value and calculate an approximate time
	lngHour = longitude / 15;

	//if rising time is desired:
	//tr = N + ((6 - lngHour) / 24);
	ts = N + ((18 - lngHour) / 24);

	//3. calculate the Sun's mean anomaly
	Ms = (0.9856 * ts) - 3.289;

	//4. calculate the Sun's true longitude
	Ls = Ms + (1.916 * sin(Ms)) + (0.020 * sin(2 * Ms)) + 282.634;

	if (Ls > 360) {
		Ls = Ls - 360;
	} else if (Ls < 0) {
		Ls = Ls + 360;
	}

	//5a. calculate the Sun's right ascension
	RAs = atan(0.91764 * tan(Ls));

	if (RAs > 0) {
		if (RAs > 360) {
			RAs = RAs - 360;
		}
	} else {
		if (RAs < 0) {
			RAs = RAs + 360;
		}
	}

	//5b. right ascension value needs to be in the same quadrant as L
	Lquadrants  = (Math.floor(Ls / 90)) * 90;
	RAquadrants = (Math.floor(RAs / 90)) * 90;
	RAs = RAs + (Lquadrants - RAquadrants);

	//5c. right ascension value needs to be converted into hours
	RAs = RAs / 15;

	//6. calculate the Sun's declination
	sinDecs = 0.39782 * sin(Ls);
	cosDecs = cos(asin(sinDecs));

	//7a. calculate the Sun's local hour angle
	cosHs = (cos(offical) - (sinDecs * sin(latitude))) / (cosDecs * cos(latitude));

	if (cosHs < -1) {
		Hs = null;
	}
	else {
		Hs = acos(cosHs);
		Hs = Hs / 15;
	}

	//8. calculate local mean time of rising/setting
	Tis = Hs + RAs - (0.06571 * ts) - 6.622;

	//9. adjust back to UTC
	UTs = Tis - lngHour;

	//NOTE: UT potentially needs to be adjusted into the range [0,24) by adding/subtracting 24
	if (UTs > 24) {
		UTs = UTs - 24;
	} else if (UTs < 0) {
		UTs = UTs + 24;
	}

	//10. convert UT value to local time zone of latitude/longitude
	localTs = UTs + localOffset;
	sunsetTimeH = Math.floor(localTs);
	sunsetTimeM = Math.floor((localTs - sunsetTimeH) * 60);
	if (sunsetTimeH < 0) {
		sunsetTimeH = sunsetTimeH + 12;
	}
	else if (sunsetTimeH > 12)
	{
		sunsetTimeH = sunsetTimeH - 12;
	}
	if (sunsetTimeM < 10)
	{
		sunsetTimeM = '0' + sunsetTimeM;
	}
	displaySunsetTime = sunsetTimeH + ':' + sunsetTimeM + ' PM';
	sunsetTime = new Date(0, 0, 0, sunsetTimeH, sunsetTimeM, 0, 0);
	//currentTime = new Date(0, 0, 0, now.getHours(), now.getMinutes(), 0, 0);
	return {
		sunsetTime: sunsetTime,
		//currentTime: currentTime,
		displaySunsetTime: displaySunsetTime,
		now: now
	};
}

function calcSunsetWithChecks(lat, lon) {
	"use strict";
	var returned, x;
	x = document.getElementById("sunset");
	returned = calcSunset(0, lat, lon);
	x.innerHTML = 'Sunset ' + returned.displaySunsetTime;
}
