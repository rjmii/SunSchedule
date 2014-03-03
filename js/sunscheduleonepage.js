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
//stucture for this file was inspired by a comment on http://stackoverflow.com/questions/688196/how-to-use-a-link-to-call-javascript
//This must load after geolocation.js
function toapp() {
    "use strict";
    var x;
    x = document.getElementById("sunschedule");
    x.innerHTML = "<H1 id='sunrise'>Loading</H1> <H1 id='sunset'>Loading</H1>";
    getLocation();
}
function toabout() {
    "use strict";
    var x;
    x = document.getElementById("sunschedule");
    x.innerHTML = "<H1>SunSchedule</H1><p>This app was written by  <a href='http://www.spatialanalysts.com/members/robert-joseph-mccleary-ii/' target='_blank'>Robert McCleary</a>.</p> <a href='http://www.w3.org/html/logo/' target='_blank'><img src='http://www.w3.org/html/logo/badge/html5-badge-h-css3-device-semantics.png' width='197' height='64' alt='HTML5 Powered with CSS3 / Styling, Device Access, and Semantics' title='HTML5 Powered with CSS3 / Styling, Device Access, and Semantics'></a>";
}