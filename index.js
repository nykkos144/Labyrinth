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

// path and position

let start = findStartPosition(maze)
    
function findStartPosition(maze) {
    for (let row = 0; row < maze.length ; row ++) {
        for (let col = 0; col < maze[0].length ; col ++) {
            if (maze[row][col] == 's') {
                return {row:row , col:col , path: []};
            }
        }
    }
}
// path and position


// just position
let startPosition = StartPosition(maze)
    
function StartPosition(maze) {
    for (let row = 0; row < maze.length ; row ++) {
        for (let col = 0; col < maze[0].length ; col ++) {
            if (maze[row][col] == 's') {
                return {row:row , col:col};
            }
        }
    }
}

let queue = [];

let steps = 0;

let pathLength = 300;
let shortestPath = [];
let exit = {};

let end = false;

algorithm(maze);
 
function algorithm(maze) {

    queue.push(start);

    while(queue.length > 0) {

        let pos = queue.shift();
 
        addNode({row:pos.row + 1, col:pos.col, path:pos.path});
        addNode({row:pos.row - 1, col:pos.col, path:pos.path});
        addNode({row:pos.row, col:pos.col+1, path:pos.path});
        addNode({row:pos.row, col:pos.col-1, path:pos.path});
    }

    if(!end) {
        console.log("You will never leave the maze!!!");
    }
}

function addNode(pos) {

    if(!inMaze(pos)) {
        end = true;
        show(pos);
        return;
    }

    if(maze[pos.row][pos.col] === ' ') {
        let newPath = pos.path.slice();
                
        newPath.push({row:pos.row, col:pos.col});
        queue.push({row:pos.row, col:pos.col, path:newPath});
        maze[pos.row][pos.col] = 0;

    }
}

// 'position not defined' solution --------------|

function inMaze(pos) {
    if(pos.row >= 0 && pos.row < maze.length && pos.col  >= 0 && pos.col < maze[0].length) {
       return true;
    }
}
// 'position not defined' solution --------------|

function show(pos) {
    let path = pos.path;

    if (pathLength > path.length) {
        pathLength = path.length
        shortestPath = path;
        exit = {row:pos.row , col:pos.col};
    }    
    
}

if (end) {
    console.log('step', steps - steps , 'START' , startPosition);

    shortestPath.forEach(node => { 

        steps ++;
        console.log('step' ,steps , node)
    });

    console.log('step' ,steps + 1 , `EXIT` , exit);
}
