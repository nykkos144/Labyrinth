let maze = 
    [
		['*', '*', '*', ' ', '*', '*', '*'],
		['*', 's', '*', ' ', ' ', '*', '*'],
		['*', ' ', '*', '*', ' ', ' ', ' '],
		['*', ' ', ' ', '*', ' ', '*', '*'],
		['*', ' ', ' ', ' ', ' ', '*', '*'],
		['*', '*', '*', ' ', '*', '*', '*'],
		['*', ' ', ' ', ' ', '*', '*', '*'],
		['*', ' ', '*', '*', '*', '*', '*'],
		['*', ' ', '*', '*', '*', '*', '*'],
    ];   


let queue = [{row:1 , col:1}];

let path = [{}];

let minSteps = 1000000;
let minExit = {};

let startPosition = queue[0];

let steps = 0;

while (queue.length > 0) {

    steps += 1;

    let {row , col} = queue.shift();

    
    tryPosition({row:row + 1 , col} , maze , queue , steps);
    tryPosition({row:row - 1 , col} , maze , queue , steps);
    tryPosition({row , col:col + 1} , maze , queue , steps);
    tryPosition({row , col:col - 1} , maze , queue , steps);

    path.push({row,col})


}
    
function tryPosition(position , maze , queue , steps , path) {

    let exit = position;
    
    if (position.row < 0 || position.row >= maze.length || position.col < 0 || position.col >= maze[0].length) {      
        
        if (minSteps > steps) {
            minSteps = steps;
            minExit = position;
        }
        if (position == minExit) {
            console.log('exit');
            console.log(minSteps);
            return;
        }

    }

    else if (maze[position.row][position.col] === ' ') {
        
        queue.push(position);
        maze[position.row][position.col] = steps;
        steps += 1;
        return;

    }

    if  ( 
        position.row + 1 == '*' || position.row + 1 == steps
    && position.row - 1 == '*' || position.row - 1 == steps
    && position.col + 1 == '*' || position.col + 1 == steps
    && position.col - 1 == '*' || position.col - 1 == steps
    && position != {row:2 , col:6}) {

        console.log("No path to exit the labyrinth");
        return;
    
    }   
}       
    
    console.log(maze)
