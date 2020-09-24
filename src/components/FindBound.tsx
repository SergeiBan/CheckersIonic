import React, { FC } from 'react';

const findBoundSpots = (allSquares: any[], white: boolean) => {
    const color = (white) ? 'W' : 'B';
    const candidates = Array();
    for(let i = 0; i < allSquares.length; i++) {
        console.log(allSquares[0]);
        for(let j = 0; j < allSquares[0].length; j++) {
            if(allSquares[i][j] !== color) {
                continue;
            }
            const newSquares = allSquares.slice();
            const targetCounter = findPrey([i, j], newSquares, color);
            candidates.push(targetCounter);
        }
    }

    return candidates;
}

const findPrey : any = (square: any[], squares: any[], color: string, targets : number = 0) => {
    const opponent = (color === 'W') ? 'B' : 'W';
    
    const y = square[0];
    const x = square[1];
    if ((y > 1 && x > 1) &&
        (squares[y-1][x-1] === opponent) && 
        (squares[y-2][x-2] === 'V')) {
            const newSquares = squares.slice();
            newSquares[y][x] = 'V';
            newSquares[y-1][x-1] = 'V';
            newSquares[y-2][x-2] = color;
            return findPrey([y-2, x-2], newSquares, color, targets+1);
        }
    if ((y > 1 && x < 8) &&
        (squares[y-1][x+1] === opponent) && 
        (squares[y-2][x+2] === 'V')) {
            const newSquares = squares.slice();
            newSquares[y][x] = 'V';
            newSquares[y-1][x+1] = 'V';
            newSquares[y-2][x+2] = color;
            return findPrey([y-2, x+2], newSquares, color, targets+1);
        }
    if ((y < 8 && x > 1) &&
        (squares[y+1][x-1] === opponent) && 
        (squares[y+2][x-2] === 'V')) {
            const newSquares = squares.slice();
            newSquares[y][x] = 'V';
            newSquares[y+1][x-1] = 'V';
            newSquares[y+2][x-2] = color;
            return findPrey([y+2, x-2], newSquares, color, targets+1);
        }
    if ((y < 8 && x < 8) &&
        (squares[y+1][x+1] === opponent) && 
        (squares[y+2][x+2] === 'V')) {
            const newSquares = squares.slice();
            newSquares[y][x] = 'V';
            newSquares[y+1][x+1] = 'V';
            newSquares[y+2][x+2] = color;
            return findPrey([y+2, x+2], newSquares, color, targets+1);
        }
    return [squares, targets];
}

export {findBoundSpots};