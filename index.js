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

let steps = 0;

let start = {row: 1, col: 1, path: []};
let queue = [];

let minSteps = 1000000;
let shortestPath = [];

let end = false;

algorithm(maze);
 
function algorithm(maze) {

    queue.push(start);

    while(queue.length > 0) {

        steps += 1
        let pos = queue.shift();
 
        addNode({row:pos.row+1, col:pos.col, path:pos.path});
        addNode({row:pos.row-1, col:pos.col, path:pos.path});
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
        let secondPath = pos.path.slice();
        
        if (minSteps > steps) {
            minSteps = steps;
        }
        secondPath.push({row:pos.row, col:pos.col});
        queue.push({row:pos.row, col:pos.col, path:secondPath});

        maze[pos.row][pos.col] = steps;
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

    console.log('Shortest path: ')

    path.forEach(step => {
        console.log(step);
    });
    console.log("Exit");
    
}


console.log(maze)