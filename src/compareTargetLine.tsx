const compareTargetLine = (boundCandidates: any[]) => {
    
    boundCandidates.forEach((val, ind, arr) => {
        const attackLength = calculateAttackLength(arr.slice(), val);
    });
}

const calculateAttackLength : any = (fullMap : any[], square : any[], counter : number = 0, prevNumber: number = 0) => {
    const y = square[0];
    const x = square[1];
    const color = fullMap[y][x];
    const opponent = (color === 'W') ? 'B' : 'W';
    const nFullMap = fullMap.slice();

    if ((y > 1 && x > 1) &&
        (nFullMap[y-1][x-1] === opponent) && 
        (nFullMap[y-2][x-2] === 'V')) 
        {
            nFullMap[y][x] = 'V';
            nFullMap[y-1][x-1] = 'V';
            nFullMap[y-2][x-2] = color;
            return calculateAttackLength(nFullMap, [y-2, x-2], counter +1);
    }
    

    return counter;
}


export {compareTargetLine};