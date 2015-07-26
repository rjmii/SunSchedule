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
function showPosition(position) {
	"use strict";
	var lat, lon;
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	calcSunriseWithChecks(lat, lon); //dependent of sunrise.js
	calcSunsetWithChecks(lat, lon);
}

function showError(error) {
	"use strict";
	var x = document.getElementById("sunrise");
	switch (error.code) {
    case error.PERMISSION_DENIED:
		x.innerHTML = "User denied the request for Geolocation.";
        break;
    case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable.";
        break;
    case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out.";
        break;
    case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred.";
        break;
    }
}

function getLocation() {
	"use strict";
	var x = document.getElementById("sunrise");
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, showError);
	} else {x.innerHTML = "Geolocation is not supported by this browser."; }
}
