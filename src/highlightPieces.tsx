export const highlightPieces = (map: any, candidates: any) => {
    
    if (!candidates) { return; }
    
    const sortedCandidates = candidates.sort((a: any, b: any) => b[4] - a[4]);
    const maxAttack = sortedCandidates[0][0][4];
    
    sortedCandidates.forEach((candidate: any) => {
        const y = candidate[0][0];
        const x = candidate[0][1];   
        map[y][x] = (map[y][x] === 'W') ? 'W B' : 'B B';
    });        
    
    return map;
}