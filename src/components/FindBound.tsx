import { analytics } from 'ionicons/icons';
import React, { FC } from 'react';
import { isConstructorDeclaration } from 'typescript';
import { deepCopyFunction } from '../deepCopy';

const findBoundSpots = (allSquares: any[], white: boolean) => {
    const color = (white) ? 'W' : 'B';
    const candidates = Array();
    const bestShot = [[], 0];

    for(let i = 0; i < allSquares.length; i++) {
        for(let j = 0; j < allSquares[0].length; j++) {

            if(allSquares[i][j] !== color) {
                continue;
            }
            
            const targetCounter = findPrey([i, j], allSquares, color, 0);
            if (targetCounter.length) {
                candidates.push(targetCounter);
            }
        }
    }

    return candidates;
}


const findPrey : any = (square: any, squares: any, color: string, targets : number) => {
    
    const opponent = (color === 'W') ? 'B' : 'W';

    const squareResult = Array();

    const selectActive = (initialPiece: any, currentPiece: any, map: any, res: number) => {
        
        const y = currentPiece[0];
        const x = currentPiece[1];

        const challenges = Array();

        if ( y > 1 && x > 1) { challenges.push([y-1, x-1, y-2, x-2]); }
        if ( y > 1 && x < squares.length - 2) { challenges.push([y-1, x+1, y-2, x+2]); }
        if ( y < squares.length - 2 && x > 1) { challenges.push([y+1, x-1, y+2, x-2]); }
        if ( y < squares.length - 2 && x < squares.length - 2) { challenges.push([y+1, x+1, y+2, x+2]); }


        challenges.forEach((val: any[]) => {
            if (map[val[0]][val[1]] === opponent && map[val[2]][val[3]] === 'V') {
                const newMap = deepCopyFunction(map);
                newMap[y][x] = 'V';
                newMap[val[0]][val[1]] = 'V';
                newMap[val[2]][val[3]] = color;
                // squareResult.push(initialPiece, [val[2], val[3]], newMap, (res + 1));
                selectActive(initialPiece, [val[2], val[3]], newMap, (res + 1));
            }
            return;
        });
        if (res > 0) {
            console.log(res);
            squareResult.push(initialPiece, currentPiece, map, res);
            res = 0;
        }
    }

    selectActive(square, square, squares, 0);

    return squareResult;
}


export {findBoundSpots};