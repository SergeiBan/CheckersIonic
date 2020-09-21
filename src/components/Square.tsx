import React, { FC } from 'react';

export class Square extends React.Component<{content: string, onClick: any}, {}> {
    constructor(props: any){
        super(props);
    }
    
    render() {
        const classes : any = {
            'W': 'white',
            'B': 'black',
            'V': 'void',
        }
        let className = 'square ' + classes[this.props.content];
        return (
            <button className={className} onClick={this.props.onClick}>
                {this.props.content}
            </button>
        );
    }
}
