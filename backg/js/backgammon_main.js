//backgammon_main.js


var black_piece = "<img src='img/bp.gif' alt='X'>";
var white_piece = "<img src='img/wp.gif' alt='X'>";
var br = "<br />";

var myBoard; 


var boards = {};

// traditional backgammon
boards['backgammon']  =   { 'long':'Trad. Backgammon',
'url':' http://www.bkgm.com/rules.html',
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

boards['longgammon'] =   {  'long':'LongGammon',
'url':'http://www.bkgm.com/variants/LongGammon.html',
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

boards['dutchgammon'] =   { 'kitty':15, 'long':'Dutch Backgammon',
'url':'http://www.bkgm.com/variants/DutchBackgammon.html',
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

boards['hypergammon'] =   {  'long':'Hyper-backgammon',
'url':' http://www.bkgm.com/variants/HyperBackgammon.html',
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

boards['nackgammon'] =   {  'long':'Nackgammon',
'url':'http://www.bkgm.com/variants/Nackgammon.html',
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


function makeBoardSelect () {
    for (var i = boards.length - 1; i >= 0; i--) {
        console.log(boards[i].long);
    }
}


var makepieces = function (e)
{
	var returnString = '';

//	console.log(e);

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

//wide is in case we want to display the piecds in a row rather than a column
			if (returnString.length > 0
				&& !e.wide) {
				returnString += br; 
			} 
			if (i < val - 5) {	
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
    console.log('in setboard, e=' + e);
	var backgammonBoard;
	console.log('typeof e' + typeof e);
	if ( typeof e == 'array' && typeof e['10'] == 'number') {
		backgammonBoard = e;
//	if ( typeof e == 'object' && typeof e. == 'number') {
    } else if ( typeof e == 'object' && typeof e['10'] == 'number') {
        backgammonBoard = e;
	} else if (typeof e == 'string') {
        document.getElementById("game").innerHTML = e;    
		backgammonBoard = boards[e];
	}

// set the kitty slots to 0 in case we don't set it
//    document.getElementById("k1").innerHTML = makepieces({'value':0});    
/*
            makestack({
            'point':'m',
            'stack':4,
            'pieces':13,
            'color':'w'
        });
            makestack({
            'point':'t',
            'stack':4,
            'pieces':7,
            'color':'b'
        });
*/

 //   document.getElementById("k2").innerHTML = makepieces({'value':0});    

    //now we do the things... 
            document.getElementById("k1").innerHTML = 
                makestack({
                    'point':'m',
                    'stack':4,
                    'pieces':0});
            document.getElementById("k2").innerHTML = 
                makestack({
                    'point':'m',
                    'stack':4,
                    'pieces':0});
    for (var key  in backgammonBoard) {
//    	console.log('value = '+ backgammonBoard[key]);
//    	console.log('key=' + key);

    	//Kitty or reserve is where unplayed pieces start like in acey deucy or Dutch bacmgammon
        if (key == 'kitty') {
	        document.getElementById("k1").innerHTML = 
                makestack({
                    'point':'m',
                    'stack':4,
                    'pieces':backgammonBoard["kitty"]});
	        document.getElementById("k2").innerHTML = 
                makestack({
                    'point':'m',
                    'stack':4,
                    'pieces':-1 * backgammonBoard["kitty"]});
        } else if (key == null ) {
    		console.log('ERROR null key? does this even happen?');
    	} else {
            // try to set the board pieces, and if there isn't a matching HTML element, print a warning
//    		console.log('2key=' + key);
            try {
//                makepieces({'value': backgammonBoard[key] });    
                document.getElementById(key).innerHTML = 
                makestack({
                    'point':'m',
                    'stack':4,
                    'pieces':backgammonBoard[key]});
//                });
            }
            catch(err) {
                console.log("WARN: " + key + " " + err.message);
            }
        }

    }
    try {
        document.getElementById("p1status").innerHTML += "<a href='" + backgammonBoard["url"] + "' target='_blank'>About</a>";
    }
    catch(err) {
        console.log(key + ": " + err.message);
    }
    try {
        document.getElementById("p1status").innerHTML = backgammonBoard["long"];
    }
    catch(err) {
        console.log(key + ": " + err.message);
    }
}

// set up the board here. We can rotate the board and flip it by using a different one. 
// for now just one. 
var boardlayout = [];

var board1 = 
"<table>\
    <tr>\
        <th rowspan=6 id='sidepanel' style='background-color: #fa0;'></th>\
        <td rowspan=3 id='k1' style='background-color: #FA0;'></td>\
        <th colspan=13 id='p1status' style='background-color: #FA0;'>&nbsp;</th>\
        <td rowspan=6 id='rightpanel' style='background-color: #FA0;'></td>\
        <th rowspan=6 id='sidepanel' style='background-color: #FA0;'></th>\
    </tr>\
    <tr style='background-color: #FA0;'>\
    <th>01</th>\
    <th>02</th>\
    <th>03</th>\
    <th>04</th>\
    <th>05</th>\
    <th>06</th>\
        <th id='bar' rowspan=4 width='30'>e<br>m<br>p<br>t<br>y</th>\
    <th>07</th>\
    <th>08</th>\
    <th>09</th>\
    <th>10</th>\
    <th>11</th>\
    <th>12</th>\
    </tr>\
    <tr>\
    <td id='01' valign='top' align='center' background='img/t1.png'></td>\
    <td id='02' valign='top' align='center' background='img/t2.png'></td>\
    <td id='03' valign='top' align='center' background='img/t1.png'></td>\
    <td id='04' valign='top' align='center' background='img/t2.png'></td>\
    <td id='05' valign='top' align='center' background='img/t1.png'></td>\
    <td id='06' valign='top' align='center' background='img/t2.png'></td>\
    <td id='07' valign='top' align='center' background='img/t1.png'></td>\
    <td id='08' valign='top' align='center' background='img/t2.png'></td>\
    <td id='09' valign='top' align='center' background='img/t1.png'></td>\
    <td id='10' valign='top' align='center' background='img/t2.png'></td>\
    <td id='11' valign='top' align='center' background='img/t1.png'></td>\
    <td id='12' valign='top' align='center' background='img/t2.png'></td>\
</tr>\
<tr>\
    <td rowspan=3 id='k2' style='background-color: #FA0;'></td>\
    <td id='24' valign='bottom' align='center' background='img/m2.png'></td>\
    <td id='23' valign='bottom' align='center' background='img/m1.png'></td>\
    <td id='22' valign='bottom' align='center' background='img/m2.png'></td>\
    <td id='21' valign='bottom' align='center' background='img/m1.png'></td>\
    <td id='20' valign='bottom' align='center' background='img/m2.png'></td>\
    <td id='19' valign='bottom' align='center' background='img/m1.png'></td>\
    <td id='18' valign='bottom' align='center' background='img/m2.png'></td>\
    <td id='17' valign='bottom' align='center' background='img/m1.png'></td>\
    <td id='16' valign='bottom' align='center' background='img/m2.png'></td>\
    <td id='15' valign='bottom' align='center' background='img/m1.png'></td>\
    <td id='14' valign='bottom' align='center' background='img/m2.png'></td>\
    <td id='13' valign='bottom' align='center' background='img/m1.png'></td>\
</tr>\
<tr style='background-color: #FA0;'>\
    <th>24</th>\
    <th>23</th>\
    <th>22</th>\
    <th>21</th>\
    <th>20</th>\
    <th>19</th>\
    <th>18</th>\
    <th>17</th>\
    <th>16</th>\
    <th>15</th>\
    <th>14</th>\
    <th>13</th>\
</tr>\
<tr>\
    <th id='p2status' colspan='13' style='background-color: #FA0;'>&nbsp;</th>\
</tr>\
</table>";
//#### BOARD2
var board2 = 
"<table>\
    <tr>\
        <th rowspan=6 id='sidepanel' style='background-color: #728;'></th>\
        <td rowspan=3 id='k1' style='background-color: #FA0;'></td>\
        <th colspan=13 id='p1status' style='background-color: #FA0;'>&nbsp;</th>\
        <td rowspan=6 id='rightpanel' style='background-color: #FA0;'></td>\
        <th rowspan=6 id='sidepanel' style='background-color: #728;'></th>\
    </tr>\
    <tr style='background-color: #FA0;'>\
    <th>12</th>\
    <th>11</th>\
    <th>10</th>\
    <th>09</th>\
    <th>08</th>\
    <th>07</th>\
        <th id='bar' rowspan=4 width='30'>e<br>m<br>p<br>t<br>y</th>\
    <th>06</th>\
    <th>05</th>\
    <th>04</th>\
    <th>03</th>\
    <th>02</th>\
    <th>01</th>\
    </tr>\
    <tr>\
    <td id='12' valign='top' align='center' background='img/t1.png' ></td>\
    <td id='11' valign='top' align='center' background='img/t2.png' ></td>\
    <td id='10' valign='top' align='center' background='img/t1.png' ></td>\
    <td id='09' valign='top' align='center' background='img/t2.png' ></td>\
    <td id='08' valign='top' align='center' background='img/t1.png' ></td>\
    <td id='07' valign='top' align='center' background='img/t2.png' ></td>\
    <td id='06' valign='top' align='center' background='img/t1.png' ></td>\
    <td id='05' valign='top' align='center' background='img/t2.png' ></td>\
    <td id='04' valign='top' align='center' background='img/t1.png' ></td>\
    <td id='03' valign='top' align='center' background='img/t2.png' ></td>\
    <td id='02' valign='top' align='center' background='img/t1.png' ></td>\
    <td id='01' valign='top' align='center' background='img/t2.png' ></td>\
</tr>\
<tr>\
    <td rowspan=3 id='k2' style='background-color: #FA0;'></td>\
    <td id='13' valign='bottom' align='center' background='img/m2.png' ></td>\
    <td id='14' valign='bottom' align='center' background='img/m1.png' ></td>\
    <td id='15' valign='bottom' align='center' background='img/m2.png' ></td>\
    <td id='16' valign='bottom' align='center' background='img/m1.png' ></td>\
    <td id='17' valign='bottom' align='center' background='img/m2.png' ></td>\
    <td id='18' valign='bottom' align='center' background='img/m1.png' ></td>\
    <td id='19' valign='bottom' align='center' background='img/m2.png' ></td>\
    <td id='20' valign='bottom' align='center' background='img/m1.png' ></td>\
    <td id='21' valign='bottom' align='center' background='img/m2.png' ></td>\
    <td id='22' valign='bottom' align='center' background='img/m1.png' ></td>\
    <td id='23' valign='bottom' align='center' background='img/m2.png' ></td>\
    <td id='24' valign='bottom' align='center' background='img/m1.png' ></td>\
    </td>\
</tr>\
<tr style='background-color: #FA0;'>\
    <th>13</th>\
    <th>14</th>\
    <th>15</th>\
    <th>16</th>\
    <th>17</th>\
    <th>18</th>\
    <th>19</th>\
    <th>20</th>\
    <th>21</th>\
    <th>22</th>\
    <th>23</th>\
    <th>24</th>\
</tr>\
<tr>\
    <th id='p2status' colspan='13' style='background-color: #FA0;'>&nbsp;</th>\
</tr>\
</table>";
//####
var board3 = 
"<table>\
    <tr>\
        <th rowspan=6 id='sidepanel'></th>\
        <td rowspan=3 id='k1' style='background-color: #FA0;'></td>\
        <th colspan=13 id='p1status' style='background-color: #FA0;'>&nbsp;</th>\
        <td rowspan=6 id='rightpanel' style='background-color: #FA0;'></td>\
        <th rowspan=6 id='sidepanel' style='background-color: #FA0;'></th>\
    </tr>\
<tr style='background-color: #FA0;'>\
    <th>24</th>\
    <th>23</th>\
    <th>22</th>\
    <th>21</th>\
    <th>20</th>\
    <th>19</th>\
        <th id='bar' rowspan=4 width='30'>e<br>m<br>p<br>t<br>y</th>\
    <th>18</th>\
    <th>17</th>\
    <th>16</th>\
    <th>15</th>\
    <th>14</th>\
    <th>13</th>\
</tr>\
    <tr>\
    <td id='24' valign='top' align='center' background='img/t2.png'></td>\
    <td id='23' valign='top' align='center' background='img/t1.png'></td>\
    <td id='22' valign='top' align='center' background='img/t2.png'></td>\
    <td id='21' valign='top' align='center' background='img/t1.png'></td>\
    <td id='20' valign='top' align='center' background='img/t2.png'></td>\
    <td id='19' valign='top' align='center' background='img/t1.png'></td>\
    <td id='18' valign='top' align='center' background='img/t2.png'></td>\
    <td id='17' valign='top' align='center' background='img/t1.png'></td>\
    <td id='16' valign='top' align='center' background='img/t2.png'></td>\
    <td id='15' valign='top' align='center' background='img/t1.png'></td>\
    <td id='14' valign='top' align='center' background='img/t2.png'></td>\
    <td id='13' valign='top' align='center' background='img/t1.png'></td>\
</tr>\
<tr>\
    <td rowspan=3 id='k2' style='background-color: #FA0;'></td>\
    <td id='01' valign='bottom' align='center' background='img/m1.png'></td>\
    <td id='02' valign='bottom' align='center' background='img/m2.png'></td>\
    <td id='03' valign='bottom' align='center' background='img/m1.png'></td>\
    <td id='04' valign='bottom' align='center' background='img/m2.png'></td>\
    <td id='05' valign='bottom' align='center' background='img/m1.png'></td>\
    <td id='06' valign='bottom' align='center' background='img/m2.png'></td>\
    <td id='07' valign='bottom' align='center' background='img/m1.png'></td>\
    <td id='08' valign='bottom' align='center' background='img/m2.png'></td>\
    <td id='09' valign='bottom' align='center' background='img/m1.png'></td>\
    <td id='10' valign='bottom' align='center' background='img/m2.png'></td>\
    <td id='11' valign='bottom' align='center' background='img/m1.png'></td>\
    <td id='12' valign='bottom' align='center' background='img/m2.png'></td>\
</tr>\
<tr style='background-color: #FA0;'>\
    <th>01</th>\
    <th>02</th>\
    <th>03</th>\
    <th>04</th>\
    <th>05</th>\
    <th>06</th>\
    <th>07</th>\
    <th>08</th>\
    <th>09</th>\
    <th>10</th>\
    <th>11</th>\
    <th>12</th>\
</tr>\
<tr>\
    <th id='p2status' colspan='13' style='background-color: #FA0;'>&nbsp;</th>\
</tr>\
</table>";
//########################################################################
var board4 = 
"<table border=2>\
    <tr>\
        <th rowspan=6 id='sidepanel' style='background-color: #728;'></th>\
        <td rowspan=3 id='k1' style='background-color: #FA0;'></td>\
        <th colspan=13 id='p1status' style='background-color: #FA0;'>&nbsp;</th>\
        <td rowspan=6 id='rightpanel' style='background-color: #FA0;'></td>\
        <th rowspan=6 id='sidepanel' style='background-color: #728;'></th>\
    </tr>\
    <tr style='background-color: #FA0;'>\
        <th>13</td>\
        <th>14</td>\
        <th>15</td>\
        <th>16</td>\
        <th>17</td>\
        <th>18</td>\
            <th id='bar' rowspan=6 width='30'>e<br>m<br>p<br>t<br>y</th>\
        <th>19</td>\
        <th>20</td>\
        <th>21</td>\
        <th>22</td>\
        <th>23</td>\
        <th>24</td>\
    </tr>\
    <tr>\
        <td id='13' valign='top' align='center' background='img/t2.png' ></td>\
    <td id='14' valign='top' align='center' background='img/t1.png' ></td>\
    <td id='15' valign='top' align='center' background='img/t2.png' ></td>\
    <td id='16' valign='top' align='center' background='img/t1.png' ></td>\
    <td id='17' valign='top' align='center' background='img/t2.png' ></td>\
    <td id='18' valign='top' align='center' background='img/t1.png' ></td>\
    <td id='19' valign='top' align='center' background='img/t2.png' ></td>\
    <td id='20' valign='top' align='center' background='img/t1.png' ></td>\
    <td id='21' valign='top' align='center' background='img/t2.png' ></td>\
    <td id='22' valign='top' align='center' background='img/t1.png' ></td>\
    <td id='23' valign='top' align='center' background='img/t2.png' ></td>\
    <td id='24' valign='top' align='center' background='img/t1.png' ></td>\
</tr>\
<tr>\
    <td rowspan=3 id='k2' style='background-color: #FA0;'></td>\
    <td id='12' valign='bottom' align='center' background='img/m1.png' ></td>\
    <td id='11' valign='bottom' align='center' background='img/m2.png' ></td>\
    <td id='10' valign='bottom' align='center' background='img/m1.png' ></td>\
    <td id='09' valign='bottom' align='center' background='img/m2.png' ></td>\
    <td id='08' valign='bottom' align='center' background='img/m1.png' ></td>\
    <td id='07' valign='bottom' align='center' background='img/m2.png' ></td>\
    <td id='06' valign='bottom' align='center' background='img/m1.png' ></td>\
    <td id='05' valign='bottom' align='center' background='img/m2.png' ></td>\
    <td id='04' valign='bottom' align='center' background='img/m1.png' ></td>\
    <td id='03' valign='bottom' align='center' background='img/m2.png' ></td>\
    <td id='02' valign='bottom' align='center' background='img/m1.png' ></td>\
    <td id='01' valign='bottom' align='center' background='img/m2.png' ></td>\
</tr>\
<tr style='background-color: #FA0;'>\
    <th>12</td>\
    <th>11</td>\
    <th>10</td>\
    <th>09</td>\
    <th>08</td>\
    <th>07</td>\
    <th>06</td>\
    <th>05</td>\
    <th>04</td>\
    <th>03</td>\
    <th>02</td>\
    <th>01</td>\
</tr>\
<tr>\
    <th id='p2status' colspan='13' style='background-color: #FA0;'>&nbsp;</th>\
</tr>\
</table>";
//############


//##########
function layboard(arrayin) {
	var game = document.getElementById("game").innerHTML;
		console.log('savegame='+game);
	if (arrayin == "board1") {
		document.getElementById("myboard").innerHTML = board1;
		console.log('loading board1');
	} else if (arrayin == "board2") {
		document.getElementById("myboard").innerHTML = board2;
		console.log('loading board2');
	} else if (arrayin == "board3") {
		document.getElementById("myboard").innerHTML = board3;
		console.log('loading board3');
	} else if (arrayin == "board4") {
		document.getElementById("myboard").innerHTML = board4;
		console.log('loading board4');
	} else {
		document.getElementById("myboard").innerHTML = "Board Not Found... You Shouldnt See This";
		console.log("Board Not Found... You Shouldn't See This");
	}
	setboard(game ? game : 'backgammon');
    setevents();
}

function pieceValue(e) {
    if ( typeof e == 'number') {
        if (e > 0) { return 1; }
        if (e < 0) { return -1; }
    }
}

//#############################################
function move(e) {

    console.log(e);
    console.log(e.align);
    console.log('typeof e=' + typeof e);
    console.log('typeof e.from=' + typeof e['from']);
    console.log('typeof e.to=' + typeof e['to']);

    var from,to,board;

    if ( typeof e == 'object' && typeof e['from'] == 'string') {
        from = e['from'];
        to = e['to'];
    }

    console.log('move from/to' + from + '/' + to);
    // here  we process what is there and can we even do this.. 
    // should clear the from and to before calling this so i don't have to 
    if (e.board[from] == 0) {
        alert ("nothing to move");
        return(e.board); // and bail..
    } 

    var piecevalue = pieceValue(e.board[from]);
//    alert('piecevalue = ' + piecevalue + ' to=' + e.board[to]);
    if (pieceValue(e.board[to]) == pieceValue(e.board[from])
        || e.board[to] == 0) {
        e.board[from] -= piecevalue;
        e.board[to] += piecevalue;
    }





    console.log('board.from=' + e.board[from] 
        + 'board.to=' + e.board[to]);

    return e.board;
}
//#############################################

var moveprocessor = function() {
    console.log(this);
    var id = this.id;
    console.log(this.innerHTML);
    console.log("background = " + this.background);
    console.log("align = " + this.align);
    console.log("background = " + this.background);
    console.log("from is " + 
        document.getElementById("from").innerHTML);
    // first.. if we haven't picked a piece, then the from should be
    // blank. If the place we're grabbing is ==0, then drop out with an err. 
    if (document.getElementById("from").innerHTML == "") {
        if (myBoard[id] != 0) {
            document.getElementById("from").textContent = this.id;
        } else {
            alert('nothing to move');
            return;
        }
    } else if (document.getElementById("to").innerHTML == "") {
        document.getElementById("to").textContent = this.id;
    }
    if ( document.getElementById("from").innerHTML != '' 
        && document.getElementById("to").innerHTML != '' ) {

        setboard( move({
            'from':document.getElementById("from").innerHTML,
            'to':document.getElementById("to").innerHTML,
            'board':myBoard
        }));

        document.getElementById("from").innerHTML = '';
        document.getElementById("to").innerHTML = '';
    }
  }

function setevents() {
  document.getElementById('01').onclick =moveprocessor;
  document.getElementById('02').onclick =moveprocessor;
  document.getElementById('03').onclick =moveprocessor;
  document.getElementById('04').onclick =moveprocessor;
  document.getElementById('05').onclick =moveprocessor;
  document.getElementById('06').onclick =moveprocessor;
  document.getElementById('07').onclick =moveprocessor;
  document.getElementById('08').onclick =moveprocessor;
  document.getElementById('09').onclick =moveprocessor;
  document.getElementById('10').onclick =moveprocessor;
  document.getElementById('11').onclick =moveprocessor;
  document.getElementById('12').onclick =moveprocessor;
  document.getElementById('13').onclick =moveprocessor;
  document.getElementById('14').onclick =moveprocessor;
  document.getElementById('15').onclick =moveprocessor;
  document.getElementById('16').onclick =moveprocessor;
  document.getElementById('17').onclick =moveprocessor;
  document.getElementById('18').onclick =moveprocessor;
  document.getElementById('19').onclick =moveprocessor;
  document.getElementById('20').onclick =moveprocessor;
  document.getElementById('21').onclick =moveprocessor;
  document.getElementById('22').onclick =moveprocessor;
  document.getElementById('23').onclick =moveprocessor;
  document.getElementById('24').onclick =moveprocessor;
}


//#################################################################
/*
Getting stuff out of an element summary

- nodeValue is a little more confusing to use, but faster than innerHTML.
- innerHTML parses content as HTML and takes longer.
- textContent uses straight text, does not parse HTML, and is faster.
- innerText Takes styles into consideration. It won't get hidden text for instance.

innerText didn't exist in firefox until FireFox 45 according to caniuse but is now supported in all major browsers.
*/
//#################################################################

layboard('board1');
//var backgammonBoddard = boards['hypergammon'];
//document.getElementById("game").innerHTML = "backgammon";
myBoard = boards['backgammon'];
setboard(myBoard);
console.log(myBoard);

//myBoard = move({'from':'08','to':'05','board':myBoard});
//myBoard = move({'from':'06','to':'05','board':myBoard});
//var newboard = move({'from':'06','to':'11','board':myBoard});
//alert('after=' + myBoard['06']);
setboard(myBoard);

var foo  =   document.getElementById('24');
//alert('foo.firstelemet ' + foo.td#9.firstElement);
