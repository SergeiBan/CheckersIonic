export const highlightPieces = (map: any, candidates: any) => {
    candidates.forEach((el: any) => {
    });
    
    const sortedCandidates = candidates.sort((a: any, b: any) => b[4] - a[4]);
    if (sortedCandidates) {
        console.log(sortedCandidates)
        const y = sortedCandidates[0][0][0];
        const x = sortedCandidates[0][0][1];
        
    }   
    
    
    return;
}