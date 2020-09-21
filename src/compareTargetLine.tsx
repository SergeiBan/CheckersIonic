const compareTargetLine = (boundCandidates: any[]) => {
    
    boundCandidates.forEach((val, ind, arr) => {
        const attackLength = calculateAttackLength(arr.slice(), val);
        console.log(attackLength);
    });
}

const calculateAttackLength = (fullMap : any[], square : any[], counter : number = 0, prevNumber: number = 0) => {
    const y = square[0];
    const x = square[1];
    const color = fullMap[y][x];
    const opponent = (color === 'W') ? 'B' : 'W';

    if ((fullMap[y-1][x-1] === opponent) && 
        (fullMap[y-2][x-2] === 'V')) {
            fullMap[y][x] = 'V';
            fullMap[y-1][x-1] === 'V';
            fullMap[y-2][x-2] === 'color';
            counter++;
    }
    

    return counter;
}


export {compareTargetLine};