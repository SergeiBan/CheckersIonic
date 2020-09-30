import React, { FC } from 'react';
import { Square } from '../components/Square';
import { findBoundSpots } from '../components/FindBound';
// import { compareTargetLine } from '../compareTargetLine';
import { deepCopyFunction } from '../deepCopy';
import { highlightPieces } from '../highlightPieces';

export class Board extends React.Component<{}, {squares: any, blackIsNext: boolean, squareIsPicked: boolean, pickedSquare: any}> {
    constructor(props: any) {
        super(props);
        this.state = {
            squares: [
                    ['V', 'B', 'V', 'B', 'V', 'B', 'V', 'B', 'V', 'B'], 
                    ['B', 'V', 'B', 'V', 'B', 'V', 'B', 'V', 'B', 'V'],
                    ['V', 'B', 'V', 'B', 'V', 'B', 'V', 'B', 'V', 'B'], 
                    ['B', 'V', 'B', 'V', 'B', 'V', 'B', 'V', 'B', 'V'],
                    ['V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V'],
                    ['V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V'], 
                    ['V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W'], 
                    ['W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V'], 
                    ['V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W'],
                    ['W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V']
                    ],
            blackIsNext: true,
            squareIsPicked: false,
            pickedSquare: [0, 0],
        }
    }

    handleClick(rowNumber: any, spotNumber: any) {

        const value = this.state.squares[rowNumber][spotNumber];

        if ((value === 'W' && this.state.blackIsNext) ||
            value === 'B' && !this.state.blackIsNext) {
                this.setState({
                    pickedSquare: [rowNumber, spotNumber],
                    squareIsPicked: true,
                });
            return;
        }

        const pickedRow = this.state.pickedSquare[0];
        const pickedSpot = this.state.pickedSquare[1];

        const pickedOne = this.state.squares[pickedRow][pickedSpot];
        if (
            (pickedOne === 'W') && 
            (rowNumber === pickedRow - 1) &&
        ((spotNumber === pickedSpot - 1) || (spotNumber === pickedSpot + 1)) &&
        (value === 'V')
        ) {
            const newSquares = this.state.squares.slice();
            newSquares[pickedRow][pickedSpot] = 'V';
            newSquares[rowNumber][spotNumber] = 'W';
            this.setState({ squares: newSquares, 
                            blackIsNext: false, 
                            squareIsPicked: false,
                            });
            return;
        }
        if (
            (pickedOne === 'B') && 
            (rowNumber === pickedRow + 1) &&
        ((spotNumber === pickedSpot - 1) || (spotNumber === pickedSpot + 1)) &&
        (value === 'V')
        ) {
            const newSquares = this.state.squares.slice();
            newSquares[pickedRow][pickedSpot] = 'V';
            newSquares[rowNumber][spotNumber] = 'B';
            this.setState({ squares: newSquares, blackIsNext: true, squareIsPicked: false });

            const clonedSquares = deepCopyFunction(this.state.squares);
            const boundSpots = findBoundSpots(clonedSquares, !this.state.blackIsNext);
            if (boundSpots.length === 0) {return};
            console.log(highlightPieces(deepCopyFunction(clonedSquares), deepCopyFunction(boundSpots)));
            return;
        }
        
        
    }

    renderSquare(rowNumber: any, spotNumber: any) {
        return (
            <Square 
                content = {this.state.squares[rowNumber][spotNumber]}
                onClick = {() => this.handleClick(rowNumber, spotNumber)}
            />
        )
    }
        
    render() {
        const fullBoard = Array(10);
        {
            this.state.squares.map((val: any, ind: any) => {
                this.state.squares[ind].map((val2: any, ind2: any) => {
                    fullBoard.push(this.renderSquare(ind, ind2));
                });
            });
        }
        return (
            <div className="board">
                   {fullBoard}
            </div>
                
        );
    }
}