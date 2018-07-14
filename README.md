# Backgammon game to be played between two people on mobiles. 

## 8-may-18 Built the interface so far, sets up a choice of 5 different starting positions. 
working on the movement dynamics now. Added the project to github to facilitate working on multiple machines. 

### todo things for backgammon:
when i load dutch gammon, the white pieces are displayed as black

- check a move against dice before committing it
- bundling the individual moves into a transaction. 
 

## 14-aug-18 
### todo things for backgammon:
- make moving off the bar posible
- easily replaced dice randomizer
- make transparent board layout pieces so that I can...
- highlight cells based on:
* move in progress
* possible moves
- highlight can change the onClick of each cell so that if you click on a dead cell (because either you don't have any pieces on it or you can't land there) This is an important feature becuase it allows a person who doesn't know the game yet to be guided in where to go. 
- integrate gameplay to a a server or blockchain
* will i need to redo the whole game logic in solidity? 
* interface between the two will be by transaction
- save game logs to local storage and... 
- build game layout based on the local storage saved game(s)



