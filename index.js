let template = document.getElementById('app');

let maze = 
    [
		['*', '*', '*', '*', ' ', ' ', '*', ' ', '*', '*'],
		['*', ' ', ' ', ' ', '*', '*', ' ', '*', ' ', '*'],
		['*', ' ', '*', ' ', ' ', '*', ' ', '*', ' ', '*'],
		['*', ' ', '*', '*', ' ', '*', ' ', '*', '*', '*'],
		['*', ' ', ' ', '*', ' ', ' ', ' ', '*', ' ', ' '],
		['*', ' ', '*', '*', ' ', '*', ' ', '*', ' ', '*'],
		['*', ' ', ' ', ' ', ' ', '*', ' ', ' ', ' ', '*'],
		['*', '*', '*', '*', '*', '*', '*', '*', ' ', '*'],
    ];   

////////////////// DRAWING MAZE //////////////////

let size = 73;

let height = maze.length;
let width = maze[0].length;

let canvas = document.createElementNS('http://www.w3.org/2000/svg' , 'svg');

canvas.setAttribute('width' , width*size);
canvas.setAttribute('height' , height*size);

let appendElement = (canvas , node , maze) => {
    let colors = {
        '*' : '#1670f0',
        ' ' : 'white'
    };

    let blockRef = document.createElementNS('http://www.w3.org/2000/svg' , 'rect')
        blockRef.setAttribute('height' , size);
        blockRef.setAttribute('width' , size);
        blockRef.setAttribute('x' , node.x*size);
        blockRef.setAttribute('y' , node.y*size);
        blockRef.setAttribute('fill' , colors[maze[node.y][node.x]]);      
    canvas.appendChild(blockRef);
}

maze.map((row , y , arr) => {
    row.map((col , x) => {
        appendElement(canvas , {x , y} , maze);
    })
});

template.appendChild(canvas);

/////////////////// CIRCLE //////////////////

let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('stroke', 'black');
    circle.setAttribute('stroke-width', '2');
    circle.setAttribute('fill', '#1670f0');


/////////////////// PICK POSITION /////////////////


document.getElementById('print').innerHTML = 'Choose starting position!'

let rowY , colX;
function pickStart(event) {

    let done = false;

    let play = document.getElementById('play');
        play.style.visibility = 'visible'
    document.getElementById('print').innerHTML = 'Starting position chosen!'

    if (!done) {

        clickX = event.offsetX;
        clickY = event.offsetY;
        

        colX = Math.floor(clickX / 73);
        rowY = Math.floor(clickY / 73);

        if (maze[rowY][colX] != '*') {
            
            circle.setAttribute('r', 30);        
            circle.setAttribute('cx', colX * 73 + 35);
            circle.setAttribute('cy', rowY * 73 + 35);
        
            canvas.appendChild(circle);
            template.appendChild(canvas);

            done = true;
            console.log(clickX , clickY);
            console.log(rowY , colX);
        }
        if (maze[rowY][colX] == '*') {
            document.getElementById('print').innerHTML = 'You are stuck in the wall!'
        }
    }
}  



/////////////////// PLAY ///////////////////



function play(event) { 

    let maze = 
    [
		['*', '*', '*', '*', ' ', ' ', '*', ' ', '*', '*'],
		['*', ' ', ' ', ' ', '*', '*', ' ', '*', ' ', '*'],
		['*', ' ', '*', ' ', ' ', '*', ' ', '*', ' ', '*'],
		['*', ' ', '*', '*', ' ', '*', ' ', '*', '*', '*'],
		['*', ' ', ' ', '*', ' ', ' ', ' ', '*', ' ', ' '],
		['*', ' ', '*', '*', ' ', '*', ' ', '*', ' ', '*'],
		['*', ' ', ' ', ' ', ' ', '*', ' ', ' ', ' ', '*'],
		['*', '*', '*', '*', '*', '*', '*', '*', ' ', '*'],
    ];   


    let end = false;
    let exitExist = false;

    let start = {row:rowY , col:colX , path: []};
    
    let startPosition = {row:rowY , col:colX};

    let queue = [];

    let steps = 0;
    let pathLength = 1000;

    let shortestPath = [];
    let exit = {};

    algorithm(maze);
    
    function algorithm(pos , maze) {

        queue.push(start);

        while(queue.length > 0) {
    
            let pos = queue.shift();
        
            addNode({row:pos.row + 1, col:pos.col, path:pos.path});
            addNode({row:pos.row - 1, col:pos.col, path:pos.path});
            addNode({row:pos.row, col:pos.col + 1, path:pos.path});
            addNode({row:pos.row, col:pos.col - 1, path:pos.path});
        }

        if(!exitExist) {
            console.log("You will never leave the maze!!!");
            document.getElementById('print').innerHTML = 'You will never leave the maze!';

            let clear = document.getElementById('clear');
                clear.style.visibility = 'visible';

            let play = document.getElementById('play');
                play.style.visibility = 'hidden';
        }
    }

    function addNode(pos) {

        if(!In(pos)) {
            end = true;
            show(pos);

        // printing path
            shortestPath.forEach(position => {
                let circelPath = document.createElementNS('http://www.w3.org/2000/svg' , 'circle');
                    circelPath.setAttribute('stroke', 'black');
                    circelPath.setAttribute('stroke-width', '2');
                    circelPath.setAttribute('fill', 'yellow');      
                    circelPath.setAttribute('r' , 20);
                    circelPath.setAttribute('cx' , position.col * 73 + 35);
                    circelPath.setAttribute('cy' , position.row * 73 + 35);
                                
                canvas.appendChild(circelPath);

            });

            return;
        }

        if(maze[pos.row][pos.col] === ' ') {
            let newPath = pos.path.slice();

            newPath.push({row:pos.row, col:pos.col});
            queue.push({row:pos.row, col:pos.col, path:newPath});

            maze[pos.row][pos.col] = 'x';

        }
    }

    // error solutions

    function In(pos) {
        if(pos.row >= 0 && pos.row < maze.length && pos.col  >= 0 && pos.col < maze[0].length) {
           return true;
        }
    }

    function show(pos) {
        let path = pos.path;

        if (pathLength > path.length) {
            pathLength = path.length;
            shortestPath = path;

            exit = {row:pos.row , col:pos.col};
        }    
    }  

    // error solutions


    if (end) {


        exitExist = true;
        console.log('step', steps - steps , 'START' , startPosition);
        
        shortestPath.forEach(node => {
            
            steps ++;
            console.log('step' ,steps , node);
        });

        console.log('step' ,steps + 1 , `EXIT` , exit); 

        document.getElementById("print").innerHTML = 'You escaped in ' + (steps + 1) + ' moves!';
    
        let clear = document.getElementById('clear');
            clear.style.visibility = 'visible';

        let play = document.getElementById('play');
            play.style.visibility = 'hidden';

    }
}

