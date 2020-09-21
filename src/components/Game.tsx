import React, { FC } from 'react';
import { Square } from '../components/Square';
import { Board } from '../components/Board';

export class Game extends React.Component {
    render() {
        return (
            <Board />
        );
    }
}