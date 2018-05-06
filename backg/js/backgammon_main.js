//backgammon_main.js


var black_piece = "<img src='img/bp.gif' alt='X'>";
var white_piece = "<img src='img/wp.gif' alt='X'>";
var br = "<br />";

var boards = {};

// traditional backgammon
boards['backgammon']  =   { 
"01":-2, "02":0, "03":0, "04":0, "05":0, "06":5, 
"07":0, "08":3, "09":0, "10":0, "11":0, "12":-5,
"13":5, "14":0, "15":0,"16":0, "17":-3, "18":0,
"19":-5, "20":0, "21":0, "22":0, "23":0,"24":2};
// 13 14 15 16 17 18 19 20 21 22 23 24
// +5  0  0  0 -3  0 -5  0  0  0  0 +2
//  V  V  V  V  V  V  V  V  V  V  V  V 
//  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^ 
// -5  0  0  0 +3  0 +5  0  0  0  0 -2
// 12 11 10 09 08 07 06 05 04 03 02 01 

boards['longgammon'] =   { 
"01":-15, "02":0, "03":0, "04":0, "05":0, "06":0, 
"07":0, "08":0, "09":0, "10":0, "11":0, "12":0,
"13":0, "14":0, "15":0,"16":0, "17":0, "18":0,
"19":0, "20":0, "21":0, "22":0, "23":0,"24":15};
// 13 14 15 16 17 18 19 20 21 22 23 24
//  0  0  0  0  0  0  0  0  0  0 0 +15
//  V  V  V  V  V  V  V  V  V  V  V  V 
//  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^ 
//  0  0  0  0  0  0  0  0  0  0  0 -15
// 12 11 10 09 08 07 06 05 04 03 02 01 

boards['dutchgammon'] =   { 'kitty':15,
"01":0, "02":0, "03":0, "04":0, "05":0, "06":0, 
"07":0, "08":0, "09":0, "10":0, "11":0, "12":0,
"13":0, "14":0, "15":0,"16":0, "17":0, "18":0,
"19":0, "20":0, "21":0, "22":0, "23":0,"24":0};
// 13 14 15 16 17 18 19 20 21 22 23 24
//  0  0  0  0  0  0  0  0  0 +1 +1 +1
//  V  V  V  V  V  V  V  V  V  V  V  V 
//  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^ 
//  0  0  0  0  0  0  0  0  0 -1 -1 -1
// 12 11 10 09 08 07 06 05 04 03 02 01 

boards['hypergammon'] =   { 
"01":-1, "02":-1, "03":-1, "04":0, "05":0, "06":0, 
"07":0, "08":0, "09":0, "10":0, "11":0, "12":0,
"13":0, "14":0, "15":0,"16":0, "17":0, "18":0,
"19":0, "20":0, "21":0, "22":1, "23":1,"24":1};
// 13 14 15 16 17 18 19 20 21 22 23 24
//  0  0  0  0  0  0  0  0  0 +1 +1 +1
//  V  V  V  V  V  V  V  V  V  V  V  V 
//  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^ 
//  0  0  0  0  0  0  0  0  0 -1 -1 -1
// 12 11 10 09 08 07 06 05 04 03 02 01 

boards['nackgammon'] =   { 
"01":-2, "02":-2, "03":0, "04":0, "05":0, "06":4, 
"07":0, "08":3, "09":0, "10":0, "11":0, "12":-4,
"13":4, "14":0, "15":0,"16":0, "17":-3, "18":0,
"19":-4, "20":0, "21":0, "22":0, "23":2,"24":2};
// 13 14 15 16 17 18 19 20 21 22 23 24
// +4  0  0  0 -3  0 -4  0  0  0 +2 +2
//  V  V  V  V  V  V  V  V  V  V  V  V 
//  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^ 
// -4  0  0  0 +3  0 +4  0  0  0 -2 -2
// 12 11 10 09 08 07 06 05 04 03 02 01 




var makepieces = function (e)
{
	var returnString = '';

console.log(e);

	if ( typeof e == 'object' && typeof e.value == 'number') {
		var piece = '';
		var val = e.value; 

		if (e.value > 0) {
			piece = black_piece;
		} else if (e.value < 0) { 
			val *= -1;
			piece = white_piece;
		}

		for (var i = val - 1; i >= 0; i--) {
			if (val > 5) { console.log(returnString); }
			console.log('i='+i);

			if (returnString.length > 0
				&& !e.wide) {
				returnString += br; 
			} 
			if (i < val - 5) {	
				console.log("returnString="+returnString);
				if (e.value < 0) {
					returnString += "+" + (val-5).toString();
				} else {
					returnString = "+" + (val-5).toString() + returnString;
				}
				return returnString;
			} else {
			    returnString += piece; 
			}
		}
	}
	return returnString;
}

//###################################################
var setboard = function (e) {
	var backgammonBoard;
	console.log('typeof e' + typeof e);
	if ( typeof e == 'array' && typeof e['10'] == 'number') {
		backgammonBoard = e;
//	if ( typeof e == 'object' && typeof e. == 'number') {
	} else if (typeof e == 'string') {
		backgammonBoard = boards[e];
	}

// set the kitty slots to 0 in case we don't set it
    document.getElementById("p1kitty").innerHTML = makepieces({'value':0});    
    document.getElementById("p2kitty").innerHTML = makepieces({'value':0});    

    //now we do the things... 
    for (var key  in backgammonBoard) {
    	console.log('value = '+ backgammonBoard[key]);
    	console.log('key=' + key);
    	if (key == 'kitty') {
	        document.getElementById("p1kitty").innerHTML = 
	        	makepieces({'value': -1 * backgammonBoard["kitty"]});    
//	        	makepieces({'value': -1 * backgammonBoard["kitty"],'wide':1 });    
	        document.getElementById("p2kitty").innerHTML = 
	        	makepieces({'value': backgammonBoard["kitty"]});    
//	        	makepieces({'value': backgammonBoard["kitty"],'wide':1 });    
    	} else if (key == null ) {
    		console.log('null key?');
    	} else {
    		console.log('2key=' + key);
	    	document.getElementById(key).innerHTML = makepieces({'value': backgammonBoard[key] });    
    	}

    }
}

// set up the board here. We can rotate the board and flip it by using a different one. 
// for now just one. 
var board1 = 
"<table>\
    <tr>\
        <th rowspan=4 id='sidepanel'></th>\
        <td rowspan=2 id='p1kitty' style='background-color: #FA0;'></td>\
        <th colspan=13 id='p1status' style='background-color: #FA0;'>&nbsp;</th>\
    </tr>\
    <tr>\
    <td id='01' valign='top' align='center' background='img/birt.png' ></td>\
    <td id='02' valign='top' align='center' background='img/dirt.png' ></td>\
    <td id='03' valign='top' align='center' background='img/birt.png' ></td>\
    <td id='04' valign='top' align='center' background='img/dirt.png' ></td>\
    <td id='05' valign='top' align='center' background='img/birt.png' ></td>\
    <td id='06' valign='top' align='center' background='img/dirt.png' ></td>\
        <th id='bar' rowspan=2 width='30'>e<br>m<br>p<br>t<br>y</th>\
    <td id='07' valign='top' align='center' background='img/birt.png' ></td>\
    <td id='08' valign='top' align='center' background='img/dirt.png' ></td>\
    <td id='09' valign='top' align='center' background='img/birt.png' ></td>\
    <td id='10' valign='top' align='center' background='img/dirt.png' ></td>\
    <td id='11' valign='top' align='center' background='img/birt.png' ></td>\
    <td id='12' valign='top' align='center' background='img/dirt.png' ></td>\
</tr>\
<tr>\
        <td rowspan=2 id='p2kitty' style='background-color: #FA0;'></td>\
    <td id='24' valign='bottom' align='center' background='img/trid.png' ></td>\
    <td id='23' valign='bottom' align='center' background='img/trib.png' ></td>\
    <td id='22' valign='bottom' align='center' background='img/trid.png' ></td>\
    <td id='21' valign='bottom' align='center' background='img/trib.png' ></td>\
    <td id='20' valign='bottom' align='center' background='img/trid.png' ></td>\
    <td id='19' valign='bottom' align='center' background='img/trib.png' ></td>\
    <td id='18' valign='bottom' align='center' background='img/trid.png' ></td>\
    <td id='17' valign='bottom' align='center' background='img/trib.png' ></td>\
    <td id='16' valign='bottom' align='center' background='img/trid.png' ></td>\
    <td id='15' valign='bottom' align='center' background='img/trib.png' ></td>\
    <td id='14' valign='bottom' align='center' background='img/trid.png' ></td>\
    <td id='13' valign='bottom' align='center' background='img/trib.png' ></td>\
    </td>\
</tr>\
<tr>\
    <th id='p2status' colspan='13' style='background-color: #FA0;'>&nbsp;</th>\
</tr>\
</table>";

document.getElementById("myboard").innerHTML = board1;
var backgammonBoard = boards['hypergammon'];

