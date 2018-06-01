//backgammon_main.js
// 2018 rca
// support routines for backgamon mobile game
//
// p1 = black = positive numbers
// p2 = white = negative numbers
// backg_main.js:var setBoard = function (e) {
// backg_main.js:function    setupGame (argument) {
// backg_main.js:function layboard(arrayin) {
// backg_main.js:function bullshit() {
// backg_main.js:function pieceValue(e) {
// backg_main.js:function move(e) {
// backg_main.js:function logMove(message) {
// backg_main.js:// call the move function and
// backg_main.js:var moveprocessor = function(arrayin) {
// backg_main.js:function setevents(arrayin) {
// backg_main.js:function rotateBoard(argument) {
// backg_main.js:function makeBoardSelect () {
// backg_main.js:function getBoardLayout(argument) {
// blox.js:function makestack  (e) {

//var myBoard = {};

//###################################################
var setBoard = function (e) {
    // we should gt a board and a layout. 

    validateBoard(e);
    // our working board.. should it be kept somewhere more global?
	var backgammonBoard;

	if (typeof e == 'array' 
        || typeof e == 'object') {
        if (typeof e['10'] == 'number') {
            backgammonBoard = e; 
        } else if (typeof e['board'] == 'object' 
            || typeof e['board'] == 'array') { 
            backgammonBoard = e['board']; 
        } 
	} else if (typeof e == 'string') { 
        console.log('setboard: create new game ' + e)
        //should save this sometimes
        document.getElementById('log').innerText = '';  

        backgammonBoard = getBoardLayout(e);
	}

    for (var key  in backgammonBoard) {
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
        }
    }
    setevents(backgammonBoard);
    try {
        document.getElementById("p1status").innerHTML = backgammonBoard["long"];
        document.getElementById("p1status").innerHTML += "<a href='" + backgammonBoard["url"] + "' target='_blank'>About</a>";
    }
    catch(err) { console.log("p1status: " + err.message); }
//    return(backgammonboard);
}
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
//this is called like this: 
//    setupGame({'board':window.runningBoard,'layout':'backgammon'});
function    setupGame (argument) {
//                setupGame({'board':runningBoard,'layout':'backgammon'});
    var thisBoard = argument.board;
    var thisBoard = argument['board'];

    var layout =  argument['layout'];

    console.log("Setup Board with this initial layout=" + layout)
    thisBoard   = getBoardLayout(layout);

    for (var key  in thisBoard) {
        runningBoard[key] = thisBoard[key];
    }

    // this board is a structure already
    document.getElementById('log').innerText = 'new ' + layout + ' game\n'
    setBoard(thisBoard);
    return(thisBoard);
}


// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
// make sure we have the right number of pieces and that we have the same number of each
function validateBoard (inboard) {
    var totalpieces = 0;
    var balance = 0;

    if (typeof inboard =='string') { return 0; }
    for (var key  in inboard) {
        if (key == null ) {
            console.log('######## validateBoard: null key - bailing');
            setStatus('ERROR validateBoard: null key - bailing');
            return 0;
        }
        if (typeof inboard[key] == 'number') {
            balance += inboard[key];
            totalpieces += pieceValue(inboard[key]) * inboard[key];
        }
    }
    if (balance != 0 ) {
        console.log('######## inboard balance (should be 0) ',balance);
        setStatus('ERROR piece imbalance (should be 0) ',balance);
        return 0;
    }
    if (!(totalpieces == 30  || (totalpieces == 6 && inboard.short == 'hypergammon'))) {
        console.log('######## incorrect number of pieces ',totalpieces);
        setStatus('ERROR incorrect number of pieces ',totalpieces);
//        return 0; // dont make this fatel yet
    }
    return 1;
}
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
//##########
function layboard(arrayin) {
    // get the  HTML for the board
    console.log('layboard: arrayin = ');
    console.log(arrayin);

    document.getElementById("displayBoard").innerHTML =  rotateBoard(arrayin);
    setevents({'board':runningBoard});

    console.log('runningBoard');
    console.log(runningBoard);
//    document.getElementById('displayBoard').innerHTML = getBoardLayout('nackgammon');
//    console.log('html = ' + foo);
//    console.log('previously: ' + document.getElementById("displayBoard").innerHTML);

//    console.log('after: ' + document.getElementById("displayBoard").innerHTML);
    console.log('layboard wt the end runningboard',runningBoard);
    if (runningBoard != {} && runningBoard != '') {
        setBoard({'board':runningBoard});
    }
}


//#############################################
// return +1 or -1 based on whether this is a positive or negative number
//return 0 if it isn't a string or if the value is 0
function pieceValue(e) {
    if ( typeof e == 'number') {
        if (e > 0) { return 1; }
        if (e < 0) { return -1; }
        if (e == 0) { return 0; }
    } else { return 0; }
}

//#############################################
function move(e) {

    console.log(e);
//    console.log('move: typeof e=' + typeof e);
//    console.log('tmove: ypeof e.from=' + typeof e['from']);
//    console.log('tmove: ypeof e.to=' + typeof e['to']);

    var from,to,board;

    if ( typeof e == 'object' && typeof e['from'] == 'string') {
        board = e['board'];
        from = e['from'];
        to = e['to'];
    }
//TRYTRY
    try {
        var thisPiece = pieceValue(e.board[from]);
    }
    catch(err) {
        console.log(err); 
        console.log(e); 
    }
    // don't enforce but throw an error if it's 
    var shift = to -  from;


    logMove((thisPiece < 0 ? 'white' : 'black') + ' move '+ shift + ' ' + from + ' / ' + to);
    // here  we process what is there and can we even do this..
    // should clear the from and to before calling this so i don't have to
    if (e.board[from] == 0) {
        console.log ("nothing to move");
        return(e.board); // and bail..
    }

    console.log('board.from=' + from
        + ' board.to=' + to + 'thispiece' + thisPiece);
    console.log('e.board.from=' + e.board[from]);

    if (pieceValue(e.board[to]) != pieceValue(e.board[from])) {
        // not one of us.. if it's too many, just bail
        if (Math.abs(pieceValue(to)) > 1 ) {
            // too many, can't land there, return
            return myBoard;
        } else if (Math.abs(pieceValue(to) == 1 )) {
            console.log('destination has a blot')
            if (thispiece > 0) {
                move(from,'b1',e.board);
            } else {
                move(from,'b2',e.board);
            }
        }
    }
    // after all is said and done, here is where it is done. 
    e.board[from] -= thisPiece;
    e.board[to] += thisPiece;
    console.log('board.' + from + '=' + board[from]
        + ' board.' + to + '=' + board[to]);
    clearMove();

    return e.board;
}
//#############################################
function logMove(message) {
    console.log(message) ;
    document.getElementById("log").innerText += message + "\n";
}
//#############################################
// make sure we have a from and a to
//chechk against dice rolls
// call the move function and
//chalk the dice as taken
// empty from and to
// check if there are stil dice, end turn if there aren
var rolldice = function() {
    return [5,2];
}
var foo = function() {

//    var diceroll = [{'roll',5},{'roll':2}];
//   for (var i = diceroll.length - 1; i >= 0; i--) {
//        console.log('DICE ARE ROLLING',diceroll[i]);
 //       return diceroll;
//    }
    return diceroll;
}

var moveprocessor = function(arrayin) {

            setStatus(" ");
    var id = this.id;
    console.log('id = ' + id);

    console.log(runningBoard[id]);

    var thisBoard = {};
    if (typeof  arrayin == 'array' && arrayin('board') != null) {
        thisBoard = arrayin['board'];
    } else {
        thisBoard = window.runningBoard;
    }

//    console.log("moveprocessor: myboard (should be array of numbers) = ");
//    console.log(thisBoard );

/*
    var from = document.getElementById("from").innerText;
    var to = document.getElementById("to").innerText;
    console.log('from,to,id',from,to,id);
//    if (from == '') { return;} // bail 
    if (from == '') { 
        document.getElementById('from').innerText = id;
    } else {
        document.getElementById('to').innerText = id;
    } // bail 

    from = document.getElementById("from").innerText;
    to = document.getElementById("to").innerText;

    console.log('to/from: '+ to + ' / ' + from);
    console.log('moveprocessor: myBoard');
    console.log(thisBoard);
    console.log(document.getElementById("to").innerHTML);
*/
    //console.log(this.innerHTML);

// still need to figure out this
//    console.log("background = " + this.background);
//
    // first.. if we haven't picked a piece, then the from should be
    // blank. If the place we're grabbing is ==0, then drop out with an err.
    var from = document.getElementById("from").innerText;
    var to = document.getElementById("to").innerText;
    console.log(typeof to);
    console.log(to);
    if (to == '' && from != '') {
        to = id;
    } 

    if (from == 'k1' || from == 'k2') {
        if (runningBoard['short'] != 'dutchgammon') {
            // dutch gammon starts with pieces in the kitty
            setStatus("you can't move a piece there");
            clearMove();
            return 0;
        }
    }

    var moveCalc = from;
    // handle picking ujp a piece from the bar 
    if (from =='b1') {
            moveCalc = 0;
    }
    if (from =='b2') {
            moveCalc = 25;
    }

    var shift = moveCalc - to; 
//    var shift = to - moveCalc; 
//    var shift = moveCalc - from; 
//    var shift = from - moveCalc; 
    console.log('to',to);
    console.log('from',from);
    console.log('movecalc',moveCalc);
    console.log('shift',shift);
    if ( Math.abs(shift) > 6) {
        setStatus("can't do that");
        return 0;
    }
    if (pieceValue(shift) == pieceValue(runningBoard[from])) {
        console.log('shift same - is good?'); 
    } else {
        console.log('shift not the same, bad');
        setStatus('wrong direction buddy');
        clearMove();
        return 0;
    }

    console.log('from',from)
    console.log('from value ',document.getElementById['from'])
    console.log ('thisboard[' + id + ']',thisBoard[id]);
//    console.log ('runningboard[' + id + ']',runningBoard[id]);
//    console.log (thisBoard);

    // if there is nothing in from yet.. 
    if (document.getElementById("from").innerText == ""){
        // if there is nothing on the place where we clicked, 
        //  then 
        // - give a message
        // - clear the to and from fields
        // - return to caller 
        if (thisBoard[id] == 0) {
            clearMove()
//            alert('no pieces on ' + this.id + ' to move');
            setStatus('no pieces on ' + this.id + ' to move');
            return 0;
        }
        // otherwise put this value  i
        document.getElementById('action').style.display = 'block';
        document.getElementById("from").textContent = this.id;
    } else if (document.getElementById("to").innerText == "") {
        // from wasnt blank and we d
        document.getElementById("to").textContent = this.id;
    }
    from = document.getElementById("from").innerText;
    to = document.getElementById("to").innerText;
    if ( from != ''
        && to != '' ) {
        if (pieceValue(runningboard[from]) != pieceValue(runningBoard[to])) {
            if (Math.abs(runningBoard[to]) > 1 ) {
                // can't land there 
//                alert('cant land on  ',to,' because other side there');
                setStatus ("can't land on  " + to + " because other pieces there");
                clearMove();
                return 0;
            } else if (Math.abs(runningBoard[to]) == 1 ) {
                // blot 
//                setBoard( move({
//                    'from':to,
//                    'to':'b1',
//                    'board':runningBoard
//                }));
                setBoard( 
                    pieceValue(runningBoard[from]) > 0 
                    ? move({'from':to,
                        'to':'b1',
                        'board':runningBoard})
                    : move({'from':to,
                        'to':'b2',
                        'board':runningBoard}));
            }
    
        }
        setBoard( move({
            'from':from,
            'to':to,
            'board':runningBoard
        }));
        clearMove();
    }
}

function setStatus(message) {
    document.getElementById("p2status").innerText = message;
}

function clearMove() {
    document.getElementById("from").innerText = '';
    document.getElementById("to").innerText = '';
    document.getElementById('action').style.display = 'none';
}

// appl the move triggers on all the places that pieces could be
function xxxsetevents(arrayin) {
    var myBoard;

    console.log('inside setevents, what is arrayin?',typeof arrayin);
    console.log(arrayin);
    if (typeof  arrayin == 'object') {
        if (arrayin['board'] != null) {
            myBoard  = arrayin.board;
        } else {
            myBoard  = arrayin;
        }
    } 
    console.log('setevents: myboard = ');
    console.log(myBoard );
    console.log(window.runningBoard );
}
function setevents(arrayin) {
    var myBoard;
  // set bar
  document.getElementById('b1').onclick = moveprocessor;

  document.getElementById('b2').onclick = moveprocessor;
  //#######
  // set kitties
  document.getElementById('k1').onclick = moveprocessor;
  document.getElementById('k2').onclick = moveprocessor;
  // gotta be a better way...
  document.getElementById('01').onclick = moveprocessor;
  document.getElementById('02').onclick = moveprocessor;
  document.getElementById('03').onclick = moveprocessor;
  document.getElementById('04').onclick = moveprocessor;
  document.getElementById('05').onclick = moveprocessor;
  document.getElementById('06').onclick = moveprocessor;
  document.getElementById('07').onclick = moveprocessor;
  document.getElementById('08').onclick = moveprocessor;
  document.getElementById('09').onclick = moveprocessor;
  document.getElementById('10').onclick = moveprocessor;
  document.getElementById('11').onclick = moveprocessor;
  document.getElementById('12').onclick = moveprocessor;
  document.getElementById('13').onclick = moveprocessor;
  document.getElementById('14').onclick = moveprocessor;
  document.getElementById('15').onclick = moveprocessor;
  document.getElementById('16').onclick = moveprocessor;
  document.getElementById('17').onclick = moveprocessor;
  document.getElementById('18').onclick = moveprocessor;
  document.getElementById('19').onclick = moveprocessor;
  document.getElementById('20').onclick = moveprocessor;
  document.getElementById('21').onclick = moveprocessor;
  document.getElementById('22').onclick = moveprocessor;
  document.getElementById('23').onclick = moveprocessor;
  document.getElementById('24').onclick = moveprocessor;
}


//#################################################################
/*
Getting stuff out of an element summary

- nodeValue is a little more confusing to use, but faster than innerHTML.
- innerHTML parses content as HTML and takes longer.
- textContent uses straight text, does not parse HTML, and is faster.
- innerText Takes styles into consideration. It won't get hidden text for instance.

innerText didn't exist in firefox until FireFox 45 according to caniuse but is now supported in all major browsers.

//myBoard = move({'from':'08','to':'05','board':myBoard});
//myBoard = move({'from':'06','to':'05','board':myBoard});
//alert('after=' + myBoard['06']);
makeBoardSelect();
*/


// set up the board here. We can rotate the board and flip it by using a different one. 
function rotateBoard(argument) {
    if (typeof argument == "string" ) {
       return boardlayout[argument];
    } else { 
       console.log("ERR: no valid argument passed in, default to backgammon");
       return boardlayout['backgammon'];
    }
}

function makeBoardSelect () {
    for (var i = boards.length - 1; i >= 0; i--) {
        console.log(boards[i].long);
    }
}

function getBoardLayout(argument) {
    return(boards[argument]);
}