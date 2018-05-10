
var DEBUG = 0; // verbose while i'm writing 

function makestack  (e) {
	var stack = 4; // how many in each stack?

	var point = 'm'; // working var for making the stack

	var marker = ''; // one piece
	var stacker = ''; //seveeral pieces
	var out = '';

	var br = "<br>";

	if (typeof e == "array" || typeof e == "object")  {

		// bp4 =  black piece 4stack 
//		var color = "b";
		// defau;lt color is black
		var color = "b";
		// but it can be white if the value is negative.. fix that.. 

		var pieces = 0; // what we were passed
		var remain = 0; // working var for making the stack
		// how many pieces are we drawing?
		if (typeof e['pieces'] == 'string' || typeof e['pieces'] == 'number') {
		    pieces = e['pieces']; 
		}
		// if it's negative, make the color w for white and reverse the sign 
		if (pieces < 0) {
			color = 'w';
			remain = pieces *= -1;
		} else {
			remain = pieces;
		}

		// if we explicitly pass a color, then go with it - this gets the last say
		if (typeof e['color'] == 'string') {
		    color = e['color']; 
		}


		// point is m for stalagmites, t for stalagtites (top of board) 
		if (typeof e['point'] == 'string') {
			point = e['point'];
		}


		// how many in a stack? 
		if (typeof e['stack'] == 'number') {
			stack = e['stack'];
		}

		marker = "<img src='img/" + color + 'p' + '1' + ".gif' alt='X'>";
		if (typeof e['marker'] == 'string') {
		    var marker = e['marker']; 
		}

		stacker = "<img src='img/" + color + 'p' + stack + ".png' alt='XX'>";
		if (typeof e['stacker'] == 'string') {
			stacker = e['stacker'];
		}
	}
	/*
	if (DEBUG) {
		console.log('pieces='+pieces);
		console.log('marker='+marker);
		console.log('stacker='+stacker);
		console.log('pieces='+pieces);

	    br = "\n";
	    stacker = "XXXX";
	    marker = "X";
	}	
	*/



	if (remain > 5 ) {
		while (remain > stack) {
			remain -= stack;

		    if (point == 'm'){
				out = stacker +  out; 
		    } else {
 				out += stacker; 
		    }


		    if (remain > 0) {
		    	if (point == 'm'){
					out = br + out; 
		    	} else {
 					out += br; 
		    	}
		    }
		    	
		}
	} 

	for (var i = remain-1; i >= 0; i--) {
		if (point == 'm') {
			out = marker + out;
		} else {
			out += marker;
		}
		if (i > 0 && point == 'm') {
			out = br + out;
		} else {
			out += br;
		}
	}
	
	return out;
}
DEBUG=1

if (DEBUG) {
	for (var i = 15; i >= 0; i--) {

		makestack({
			'point':'t',
			'stack':4,
			'pieces':i,
			'color':'w'
		});

		makestack({
			'point':'m',
			'stack':4,
			'pieces':i,
			'color':'b'
		});
	}
}