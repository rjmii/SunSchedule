/*
	The SunSchedule app gives you the current sunrise and sunset time for your current location.

    Copyright (C) 2013  Robert J. McCleary II

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
	3717 S Tafthill RD
	N239
	Fort Collins, CO 80526

	Email Adress:
	rjmii@spatialanalysts.com

*/
/* This was adapted from http://williams.best.vwh.net/sunrise_sunset_algorithm.htm
Sunrise/Sunset Algorithm

Source:
Almanac for Computers, 1990
published by Nautical Almanac Office
United States Naval Observatory
Washington, DC 20392
*/
function calcSunrise(dayOffset, lat, lon) {
	"use strict";
	var now, day, month, year, latitude, longitude, localOffset, sunriseTime, currentTime, offical, Hr, N1, N2, N3, N, lngHour, tr, Mr, Lr, RAr, Lquadrantr, RAquadrantr, sinDecr, cosHr, Tir, UTr, localTr, sunriseTimeH, sunriseTimeM, displaySunriseTime, cosDecr;
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
	tr = N + ((6 - lngHour) / 24);

	//3. calculate the Sun's mean anomaly
	Mr = (0.9856 * tr) - 3.289;

	//4. calculate the Sun's true longitude
	Lr = Mr + (1.916 * sin(Mr)) + (0.020 * sin(2 * Mr)) + 282.634;

	if (Lr > 360) {
		Lr = Lr - 360;
	} else if (Lr < 0) {
		Lr = Lr + 360;
	}

	//5a. calculate the Sun's right ascension
	RAr = atan(0.91764 * tan(Lr));

	if (RAr > 0) {
		if (RAr > 360) {
			RAr = RAr - 360;
		}
	} else {
		if (RAr < -0) {
			RAr = RAr + 360;
		}
	}

	//5b. right ascension value needs to be in the same quadrant as L
	Lquadrantr  = (Math.floor(Lr / 90)) * 90;
	RAquadrantr = (Math.floor(RAr / 90)) * 90;
	RAr = RAr + (Lquadrantr - RAquadrantr);

	//5c. right ascension value needs to be converted into hours
	RAr = RAr / 15;

	//6. calculate the Sun's declination
	sinDecr = 0.39782 * sin(Lr);
	cosDecr = cos(asin(sinDecr));

	//7a. calculate the Sun's local hour angle
	cosHr = (cos(offical) - (sinDecr * sin(latitude))) / (cosDecr * cos(latitude));

	if (cosHr > 1) {
		Hr = null;
	} else {
		Hr = 360 - acos(cosHr);
		Hr = Hr / 15;
	}

	//8. calculate local mean time of rising/setting
	Tir = Hr + RAr - (0.06571 * tr) - 6.622;

	//9. adjust back to UTC
	UTr = Tir - lngHour;

	//NOTE: UT potentially needs to be adjusted into the range [0,24) by adding/subtracting 24
	if (UTr > 24) {
		UTr = UTr - 24;
	} else if (UTr < 0) {
		UTr = UTr + 24;
	}

	//10. convert UT value to local time zone of latitude/longitude
	localTr = UTr + localOffset;
	sunriseTimeH = Math.floor(localTr);
	sunriseTimeM = Math.floor((localTr - sunriseTimeH) * 60);
	displaySunriseTime = sunriseTimeH + ':' + sunriseTimeM + ' AM';
	sunriseTime = new Date(0, 0, 0, sunriseTimeH, sunriseTimeM, 0, 0);
	//currentTime = new Date(0, 0, 0, now.getHours(), now.getMinutes(), 0, 0);
	return {
		sunriseTime: sunriseTime,
		displaySunriseTime: displaySunriseTime,
		now: now
	};
}

function calcSunriseWithChecks(lat, lon) {
	"use strict";
	var returned, x;
	x = document.getElementById("sunrise");
	returned = calcSunrise(0, lat, lon);
	x.innerHTML = "Sunrise " + returned.displaySunriseTime;
}
