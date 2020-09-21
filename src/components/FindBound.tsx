import React, { FC } from 'react';

const findBoundSpots = (squares: any[], white: boolean) => {

    const firstRow = 2;
    const lastRow = squares.length - 3;
    const firstSpot = 2;
    const lastSpot = squares[0].length - 3;

    const color = (white) ? 'W' : 'B';
    
    const candidates = Array();
    const bound = Array();
    for(let i = firstRow; i <= lastRow; i++) {
        for(let j = firstSpot; j <= lastSpot; j++) {
            if(squares[i][j] === color) {
                candidates.push([i, j]);
            }
        }
    }

    const boundCandidates = findPrey(candidates, squares, color);
    return boundCandidates;
}

const findPrey = (candidates: any[], squares: any[], color: string) => {
    const theyAreBound = Array();
    const opponent = (color === 'W') ? 'B' : 'W';
    
    candidates.forEach(square => {
        const y = square[0];
        const x = square[1];
        if ((squares[y-1][x-1] === opponent) && 
        (squares[y-2][x-2] === 'V')) {
            theyAreBound.push(square);
            return;
        }
        if ((squares[y-1][x+1] === opponent) && 
        (squares[y-2][x+2] === 'V')) {
            theyAreBound.push(square);
            return;
        }
        if ((squares[y+1][x-1] === opponent) && 
        (squares[y+2][x-2] === 'V')) {
            theyAreBound.push(square);
            return;
        }
        if ((squares[y+1][x+1] === opponent) && 
        (squares[y+2][x+2] === 'V')) {
            theyAreBound.push(square);
            return;
        }
    });
    
    return theyAreBound;
}

export {findBoundSpots};