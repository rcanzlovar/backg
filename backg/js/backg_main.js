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
currentVersion = "";
//$Id$
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

// next check for whether either site can be bearing off
// count white pieces in their home board
    var whitepieces = 0;
    var slots =['24','23','22','21','20','19','k1'];
    var i = 0;
    while (slots[i]){
        if ( runningBoard[slots[i]] < 0 ) {
            whitepieces += runningBoard[slots[i]];
        }
        i++;
    }

    if (whitepieces == -15) {
        console.log('white can bear off now');
        setStatus('white can bear off now');
    }

// count black pieces in their home board
    var blackpieces = 0;
    i = 0;
    slots = ['01','02','03','04','05','06','k2'];
    while (slots[i]){
        if ( runningBoard[slots[i]] > 0 ) {
            blackpieces += runningBoard[slots[i]];
        }
        i++;
    }

    if (blackpieces == 15) {
        console.log('black can bear off now');
        setStatus('black can bear off now');
    }


    console.log('black pieces',blackpieces);
    console.log('white pieces',whitepieces);
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

var playerColor = function (e) {
    if ( typeof e == 'number') {
        if (e > 0) { return 'black'; }
        if (e < 0) { return 'white'; }
    }
    return 0;
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
    //SHIFT HAPPENS
    var shift = to -  from;


    logMove((thisPiece < 0 ? 'white' : 'black') + ' move '+ shift + ' ' + from + ' / ' + to);
    // here  we process what is there and can we even do this..
    // should clear the from and to before calling this so i don't have to
    if (e.board[from] == 0) {
        console.log ("nothing to move");
        return(e.board); // and bail..
    }

    console.log('board.from=' + from
        + ' board.to=' + to + ' thispiece=' + thisPiece);
    console.log('e.board.from=' + e.board[from]);
    console.log('e.board.to=' + e.board[to]);

    if (pieceValue(e.board[to]) != pieceValue(e.board[from])) {
//     logMove(pieceValue(e.board[to]), pieceValue(e.board[from]));
        // not one of us.. if it's too many, just bail
        if (Math.abs(pieceValue(to)) > 1 ) {
            // too many, can't land there, return
            return myBoard;
        } else if (pieceValue(to) == thisPiece ) {
            //THE BUG IS HERE
            console.log('destination has a blot')
            if (thisPiece > 0) {
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
//# # # # # # # # # # # # # # # # # # # # # 
// starting over, maybe simpler
function processMove(arrayin) {
    console.log(arrayin);
    console.log(this);
    console.log(this.id);

    var to, from;

    var id = this.id;
    window.toCalc = -1;
    window.fromCalc = -1;

console.log('>',document.getElementById('from').innerText,'<');

    if (document.getElementById('from').innerText === '') {
        fromCalc = getValue(id);
        from = id;
        console.log('set from to ',id);
        document.getElementById('from').innerText = id;
        document.getElementById('to').innerText = '';
        document.getElementById('action').style.display = 'inline';
        return;
    } else {
        toCalc = getValue(id);
        to = id;
        document.getElementById('to').innerText = id;
    }
    from = document.getElementById('from').innerText;
    console.log('from,to',from,to);

}
function getValue (id) {
    var retval = Number(id);
    if (!isNaN(retval)) {
        return retval;

    } else  {
       switch(id) {
        case 'b1':
            retval = 0;
            break;
        case 'b2':
            retval = 25;
            break;
        case 'k1':
            retval = 25;
            break;
        case 'k2':
            retval = 0;
            break;
        default:
    
    }
    }
    return retval;



}
var bogus = function() {
console.log(document.getElementById('from'))
console.log(document.getElementById('to'))

    if (document.getElementById('from') === '') {
        document.getElementById('from').innerText = from = id;
        console.log('processMove: from = ',from);
        document.getElementById('action').style.display = 'inline';
        return 1; // nothing else to do
    } else {
        document.getElementById('to').innerText = to = id;
        console.log('processMove: to = ',to);
    }
    console.log('from - to', from, to);


}
///## # # # # # # # 
function getCellValue(id) {
    var calcValue; 


    switch(id) {
        case 'b1':
            calcValue = 0;
            break;
        case 'b2':
            calcValue = 25;
            break;
        case 'k1':
            calcValue = 25;
            break;
        case 'k2':
            calcValue = 0;
            break;
        default:
    }
    return calcValue;
 }       
 /// # # # # # # # # # # # # # # # # # # #
var moveprocessor = function(arrayin) {

    setStatus("...");

    var id = this.id;
    console.log('id = ' + id);
    logMove('id = ' + id);

    var fromCalc = undefined;

    player = window.player;
    logMove("player = " + player);
    logMove("b1 = " + runningBoard['b1']);
    logMove("b2 = " + runningBoard['b2']);
    logMove ("player is " + (player == -1 ? 'white' : (player == 1 ? 'black' : 'unkown') ));

// very first thing to check - are we on the bar? if so, and we're trying something 
// else than moving off the bar, then piss off and don't mark a move in progress
    // white playing and a negative value on b1
    if ( runningBoard['b1'] < 0 
        && player == -1) {
        console.log('moving a white piece make fromCalc 0');
            fromCalc = 0;
        if (id != 'b1') {
            setStatus('White must move off the bar first');
            clearMove();
            return 0;
        } 
    } // else fall through to do the move below... 


    // black playing and a positive value on b2
    if ( runningBoard['b2'] > 0 
        && player == 1) {
        console.log('moving a black piece make fromCalc 25');
        fromCalc = 25;
        if (id != 'b2') {
            setStatus('Black must move off the bar first');
            clearMove();
            return 0;
        } 
    } // else fall through to do the move below... 




    // first.. if we haven't picked a piece, then the from should be
    // blank. If the place we're grabbing is ==0, then drop out with an err.
    var to = '';
    var from = '';

    fromCalc = from;
    // from should be something bu the end of this
    if (document.getElementById("from").innerText == '') {
//        document.getElementById('from').innerText = id;
        document.getElementById('from').innerText = from = id;
        console.log('moveprocessor: from = ',from);
        document.getElementById('action').style.display = 'inline';
        return 1;
    }
    from = document.getElementById('from').innerText;

    logMove('***id=',id);
    logMove('***b1=',runningBoard['b1']);
    logMove('***b2=',runningBoard['b2']);
    logMove('***iwindow.player=',window.player );
    logMove('***from=',document.getElementById['from'] );
    
    console.log('***b1=',runningBoard['b1']);
    console.log('***b2=',runningBoard['b2']);
    console.log('***player=',document.getElementById['player'] );
    console.log('***from=',document.getElementById['from'] );


     
    if (from == 'k1' || from == 'k2') {
        if (runningBoard['short'] != 'dutchgammon') {
            if (from =='k1') {
                    fromCalc = 25;
            }
            if (from =='k2') {
                    fromCalc = 0;
            }
        } else {
            // dutch gammon starts with pieces in the kitty
            setStatus("you can't move a piece from there");
            clearMove();
        document.getElementById('action').style.display = 'inline';
            return 0;
        }
    }



// all of the special froms are handled, now look into the to's 

//        to = document.getElementById("to").innerText;
    if (from != '' && from != id) {
//        if (document.getElementById['to'] == '') {
            document.getElementById('to').innerText = id;
            to = document.getElementById('to').innerText = id;
//        } 
    }
    console.log('move to=',to,' from=',from);
    console.log('fromCalc=',fromCalc);


    if (fromCalc && to != 0 ) {
        var shift = fromCalc - to; 
        console.log('shift happens to be ',shift);
    }
//    var shift = to - fromCalc; 
//    var shift = fromCalc - from; 
//    var shift = from - fromCalc; 
    console.log('to',to);
    console.log('from',from);
    console.log('fromCalc',fromCalc);
    console.log('shift',shift);
    if ( Math.abs(shift) > 6) {
        setStatus("can't move more than 6");
        return 0;
    }
    // this doesnt prevent us from putting someone on the 
    // bar, it's just further down
    if (to == 'b1' || to == 'b2') {
        setStatus("you can't just drop it on the bar");
        return 0;
    }

    if (shift != 0 && pieceValue(shift) == pieceValue(runningBoard[from])) {
        console.log('shift same - is good?'); 
    } else {
        console.log('shift not the same, bad');
        setStatus('wrong direction buddy');
        clearMove();
        return 0;
    }

    console.log('from',from)
//    console.log('from value ',document.getElementById['from'].innerText)
    console.log ('thisboard[' + id + ']',thisBoard[id]);
//    console.log ('runningBoard[' + id + ']',runningBoard[id]);
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
        document.getElementById('action').style.display = 'inline';
        document.getElementById("from").textContent = this.id;
    } else if (document.getElementById("to").innerText == "") {
        // from wasnt blank and we d
        document.getElementById("to").textContent = this.id;
    }
    from = document.getElementById("from").innerText;
    to = document.getElementById("to").innerText;
    if ( from != ''
        && to != '' ) {
        if (pieceValue(runningBoard[from]) != pieceValue(runningBoard[to])) {
            if (Math.abs(runningBoard[to]) > 1 ) {
                // can't land there 
                setStatus (from + " can't land on  " + to + " because other pieces there");
                clearMove();
                return 0;
            } else if (runningBoard[to] == - pieceValue(runningBoard[from])) {
                // blot handling 
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

// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
function setStatus(message) {
    document.getElementById("p2status").innerText = message;
}

// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
function clearMove() {
    document.getElementById("from").innerText = '';
    document.getElementById("to").innerText = '';
    document.getElementById('action').style.display = 'none';
    document.getElementById('action').style.display = 'block';
}

// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
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
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
function setevents(arrayin) {
    var myBoard;
    var cells = [
        '01','02','03','04','05','06','07','08',
        '09','10','11','12','13','14','15','16',
        '17','18','19','20','21','22','23','24',
        'b1','b2','k1','k2'];
    cells.forEach(myFunction);

            function myFunction(item, index) {
                document.getElementById(item).onclick = processMove;
            }

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


function thingShow(thing) {
//thingShow(document.getElementById('log'))
    if (thing.style.display === 'none') {
        thing.style.display = 'inline';
    } else {
        thing.style.display = 'none';
    }
}
function togglePlayer(thing) {
    console.log(thing);
    logMove(thing);
    console.log(thing.value);
    // make the status toggle reflect the select. 
    document.player = document.getElementById('player_select').value;
}

// document.player = document.getElementById('player_select').value 