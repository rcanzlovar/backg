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




var backgammonBoard = boards['hypergammon'];

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
	        	makepieces({'value': -1 * backgammonBoard["kitty"],'wide':1 });    
	        document.getElementById("p2kitty").innerHTML = 
	        	makepieces({'value': backgammonBoard["kitty"],'wide':1 });    
    	} else if (key == null ) {
    		console.log('null key?');
    	} else {
    		console.log('2key=' + key);
	    	console.log("document.getElementById(" + key + ").innerHTML = makepieces({'value': backgammonBoard[" + key + "] })");    
	    	document.getElementById(key).innerHTML = makepieces({'value': backgammonBoard[key] });    
    	}

    }
}


//###################################################
var oldsetboard= function(e) {
	var backgammonBoard;
	console.log('typeof e' + typeof e);
	if ( typeof e == 'array' && typeof e['10'] == 'number') {
		backgammonBoard = e;
//	if ( typeof e == 'object' && typeof e. == 'number') {
	} else if (typeof e == 'string') {
		backgammonBoard = boards[e];
	}

//	if ( typeof e == 'string' && typeof e.value == 'number') {
	document.getElementById("01").innerHTML = makepieces({'value': backgammonBoard["01"] });    
	document.getElementById("02").innerHTML = makepieces({'value': backgammonBoard["02"] });    
	document.getElementById("03").innerHTML = makepieces({'value': backgammonBoard["03"] });    
	document.getElementById("04").innerHTML = makepieces({'value': backgammonBoard["04"] });    
	document.getElementById("05").innerHTML = makepieces({'value': backgammonBoard["05"] });    
	document.getElementById("06").innerHTML = makepieces({'value': backgammonBoard["06"] });    
	document.getElementById("07").innerHTML = makepieces({'value': backgammonBoard["07"] });    
	document.getElementById("08").innerHTML = makepieces({'value': backgammonBoard["08"] });    
	document.getElementById("09").innerHTML = makepieces({'value': backgammonBoard["09"] });    
	document.getElementById("10").innerHTML = makepieces({'value': backgammonBoard["10"] });    
	document.getElementById("11").innerHTML = makepieces({'value': backgammonBoard["11"] });    
	document.getElementById("12").innerHTML = makepieces({'value': backgammonBoard["12"] });    
	document.getElementById("13").innerHTML = makepieces({'value': backgammonBoard["13"] });    
	document.getElementById("14").innerHTML = makepieces({'value': backgammonBoard["14"] });    
	document.getElementById("15").innerHTML = makepieces({'value': backgammonBoard["15"] });    
	document.getElementById("16").innerHTML = makepieces({'value': backgammonBoard["16"] });    
	document.getElementById("17").innerHTML = makepieces({'value': backgammonBoard["17"] });    
	document.getElementById("18").innerHTML = makepieces({'value': backgammonBoard["18"] });    
	document.getElementById("19").innerHTML = makepieces({'value': backgammonBoard["19"] });    
	document.getElementById("20").innerHTML = makepieces({'value': backgammonBoard["20"] });    
	document.getElementById("21").innerHTML = makepieces({'value': backgammonBoard["21"] });    
	document.getElementById("22").innerHTML = makepieces({'value': backgammonBoard["22"] });    
	document.getElementById("23").innerHTML = makepieces({'value': backgammonBoard["23"] });    
	document.getElementById("24").innerHTML = makepieces({'value': backgammonBoard["24"] });    
	document.getElementById("p1kitty").innerHTML = makepieces({'value': backgammonBoard["kitty"] });    
	document.getElementById("p2kitty").innerHTML = makepieces({'value': -1 * backgammonBoard["kitty"] });    
}