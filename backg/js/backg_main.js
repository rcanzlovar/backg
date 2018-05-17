//backgammon_main.js
// 2018 rca
// support routines for backgamon mobile game
//
// p1 = black = positive numbers
// p2 = white = negative numbers

var myBoard = {};

//###################################################
var setboard = function (e) {
    console.log('setboard: typeof e ' + typeof e);
    console.log('setboard: e:');
    console.log(e);

    // our working board.. should it be kept somewhere more global?
	  var backgammonBoard;

	  if (( typeof e == 'array' || typeof e == 'object')
        && typeof e['10'] == 'number') {

        console.log('set backgammonboard from passed board')
        console.log(e);
        backgammonBoard = e;
	  } else if (typeof e == 'string') {
        console.log('setboard: create new  backgammonboard ' + e)
        console.log(getBoardLayout(e));

        backgammonBoard = getBoardLayout(e);
        console.log(e);
	  }



    for (var key  in backgammonBoard) {
//    	console.log('value = '+ backgammonBoard[key]);
//    	console.log('key=' + key);

        if (key == null ) {
    		console.log('ERROR null key? does this even happen?');
    	} else {
            // try to set the board pieces, and if there isn't a matching HTML element, print a warning
            try {
                document.getElementById(key).innerHTML =
                  makestack({
                    'point':'m',
                    'stack':4,
                    'pieces':backgammonBoard[key]});
            }
            catch(err) { }
                //nothing. i dont care.
                // i just don't want this to stop the loop
//                console.log("WARN: " + key + " " + err.message);
        }

    }
    console.log('just before calling setevents from setboard')
    console.log(backgammonBoard);


    setevents({'board':backgammonBoard});

    try {
        document.getElementById("p1status").innerHTML = backgammonBoard["long"];
        document.getElementById("p1status").innerHTML += "<a href='" + backgammonBoard["url"] + "' target='_blank'>About</a>";
    }
    catch(err) { console.log("p1status: " + err.message); }

    return(backgammonboard);


}
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
function    setupGame (argument) {
    document.getElementById("boardLayout").innerHTML = getBoardLayout(this.value);
    myBoard = setboard({'board':myBoard});
    console.log("myBoard after");
    console.log(myBodard);
    console.log("Setup Board with this value=" + this.value)
    return(myBoard);
}

// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
//##########
function layboard(arrayin) {
    // get the  HTML for the board
        console.log('layboard: srrayin = ');
        console.log(arrayin);


    document.getElementById("displayBoard").innerHTML =  rotateBoard(arrayin);


    console.log('myBoard');
    console.log(myBoard);
    document.getElementById('displayBoard').innerHTML = getBoardLayout('nackgammon');
        setevents({'board':myBoard});
//    console.log('html = ' + foo);
//    console.log('previously: ' + document.getElementById("displayBoard").innerHTML);

//    console.log('after: ' + document.getElementById("displayBoard").innerHTML);
    if (myBoard != {} && myBoard != '') {
        setboard({'board':myBoard});
    }
}

//    var game = document.getElementById("game").innerHTML;
//        console.log('savegame='+game);

function bullshit() {

    var thisBoard;

    if ((typeof arrayin  == 'string') ) {
        console.log('layboard: loading board ' + arrayin);
        getBoardLayout(arrayin);
        setboard(arrayin);

        // set up an initial board
        setboard(this.value);
        console.log("Setup Board with this value=")
        console.log(this.value);
    } else {

        setevents({'board':thisBoard});

        //    if ((typeof  arrayin == 'object') || (typeof arrayin  == 'array')) { }
    	if (arrayin == "board1") {
    		document.getElementById("displayBoard").innerHTML = board1;
    		console.log('loading board1');
    	} else if (arrayin == "board2") {
    		document.getElementById("displayBoard").innerHTML = board2;
    		console.log('loading board2');
    	} else if (arrayin == "board3") {
    		document.getElementById("displayBoard").innerHTML = board3;
    		console.log('loading board3');
    	} else if (arrayin == "board4") {
    		document.getElementById("displayBoard").innerHTML = board4;
    		console.log('loading board4');
    	} else {
    		document.getElementById("displayBoard").innerHTML = "Board Not Found... You Shouldn't See This";
    		console.log("Board Not Found... You Shouldn't See This");
    	}

    }
    // tjis s where the board was getting set up.
    if ((typeof arrayin  == 'object') || (typeof arrayin  == 'array')) {
        console.log('layboard: arrayin.board ' + typeof arrayin['board']);
        if (typeof  arrayin['board'] == 'array') {
            var thisBoard = arrayin['board'];
        }

        if (typeof  thisBoard == 'array' || typeof thisBoard == 'object') {
            setboard(thisBoard);
        } else {
            setboard(game ? game : 'backgammon');
        }
    }
}

//#############################################
// return +1 or -1 based on whether this is a positive or negative number
function pieceValue(e) {
    if ( typeof e == 'number') {
        if (e > 0) { return 1; }
        if (e < 0) { return -1; }
    }
}

//#############################################
function move(e) {

    console.log(e);
    console.log('typeof e=' + typeof e);
    console.log('typeof e.from=' + typeof e['from']);
    console.log('typeof e.to=' + typeof e['to']);

    var from,to,board;

    if ( typeof e == 'object' && typeof e['from'] == 'string') {
        board = e['board'];
    }
    if ( typeof e == 'object' && typeof e['from'] == 'string') {
        from = e['from'];
        to = e['to'];
    }

    var thisPiece = pieceValue(e.board[from]);

    logMove((thisPiece < 0 ? 'white' : 'black') + ' move ' + from + ' / ' + to);
    // here  we process what is there and can we even do this..
    // should clear the from and to before calling this so i don't have to
    if (e.board[from] == 0) {
        console.log ("nothing to move");
        return(e.board); // and bail..
    }

    console.log('board.from=' + from
        + ' board.to=' + to + 'thispiece' + thisPiece);
    console.log('e.board.from=' + e.board[from]);
    console.log('board.from=' + board[from]);
    console.log(' board ');
    console.log( board);

//    alert('piecevalue = ' + piecevalue + ' to=' + e.board[to]);

    if (pieceValue(e.board[to]) != pieceValue(e.board[from])) {
        // not one of us.. if it's too many, just bail
        if (Math.abs(pieceValue(to)) > 1 ) {
            // too many, can't land there, return
            return myBoard;
        } else if (Math.abs(pieceValue(to) == 1 )) {
            console.log('destination has a blot')
            if (thispiece > 0) {
                move(from,'b1',board);
            } else {
                move(from,'b2',board);
            }
        }
    }
    e.board[from] -= thisPiece;
    e.board[to] += thisPiece;

//     else if ( pieceValue(to) == 0 || pieceValue(e.board[to]) == pieceValue(e.board[from] ))
    //either empty or full of friendlies...
        // if we are here, then this wasn't a 0 ir a


    console.log('board.from=' + board[from]
        + ' board.to=' + board[to]);

    return e.board;
}
//#############################################
function logMove(message) {
    console.log(message)
    ;
    document.getElementById("log").innerText += message + "\n";
}
//#############################################
// make sure we have a from and a to,
//chechk against dice rolls
// call the move function and
//chalk the dice as taken
// empty from and to
// check if there are stil dice, end turn if there arent

var moveprocessor = function(arrayind) {
    var mvpBoard;





    if (typeof  arrayin == 'array' && arrayin('board') != null) {
        myboard = arrayin['board'];
    }
    console.log("moveprocessor: this = ");
    console.log(this);
    console.log("moveprocessor: myboard (should be array of numbers) = ");
    console.log(this.mvpBoard );
    var from = document.getElementById("from").innerText;
    var to = document.getElementById("to").innerText;
    console.log('to/from: '+ to + ' / ' + from);
    console.log('moveprocessor: myBoard');
    console.log(mvpBoard);
    console.log(document.getElementById("to").innerHTML);

    var id = this.id;
    console.log('id = ' + id);
    //console.log(this.innerHTML);

// still need to figure out this
//    console.log("background = " + this.background);
//
    // first.. if we haven't picked a piece, then the from should be
    // blank. If the place we're grabbing is ==0, then drop out with an err.
    if (document.getElementById("from").innerHTML == "") {
        if (myBoard[id] != 0) {
            document.getElementById("from").textContent = this.id;
        } else {
            document.getElementById("from").innerHTML = '';
            document.getElementById("to").innerHTML = '';
            alert('nothing to movei ',id);
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

// appl the move triggers on all the places that pieces could be
function setevents(arrayin) {
    var myBoard;
    console.log('inside setevents, what is arrayin?',typeof arrayin);
    console.log(arrayin);
    if (typeof  arrayin == 'object' && arrayin['board'] != null) {
        myBoard  = arrayin ['board'] ;
    }
    console.log('setevents: myboard = ');
    console.log(myBoard );
  // set bar
  document.getElementById('b1').onclick =moveprocessor;
  document.getElementById('b2').onclick =moveprocessor;
  // set kitties
  document.getElementById('k1').onclick =moveprocessor;
  document.getElementById('k2').onclick =moveprocessor;
  // gotta be a better way...
  document.getElementById('01').onclick =moveprocessor({'board':myBoard});
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
//################################o#################################
//setboard(myBoard);
//layboard('board1');
//myBoard = setboard('nackgammon');
//console.log('### after initial setup of board myBoard = ',myBoard);
//move({'from':'06','to':'04','board':myBoard});
//var backgammonBowwddard = boards['hypergammon'];
//document.getElementById("game").innerHTML = "backgammon";

/*
//myBoard = boards['backgammon'];
var myBoard = setboard('backgammon');
console.log(myBoard);

//myBoard = move({'from':'08','to':'05','board':myBoard});
//myBoard = move({'from':'06','to':'05','board':myBoard});
//var newboard = move({'from':'06','to':'11','board':myBoard});
//alert('after=' + myBoard['06']);

var foo  =   document.getElementById('24');
//alert('foo.firstelemet ' + foo.td#9.firstElement);

makeBoardSelect();
*/
