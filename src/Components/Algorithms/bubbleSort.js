export function getBubbleSortAnimations(stateArray) {
    if(stateArray.length <= 1) return stateArray
    const animate = []
    const dummyArray = stateArray.slice()
    bubbleSortHelper(stateArray, 0, dummyArray, animate)
    return animate

}

function bubbleSortHelper(primaryArray, startIndex, secondaryArray, animate) {
    let k = startIndex
    for(;k<secondaryArray.length;k++){
        let i = startIndex
        let j = i + 1
        for(;j<secondaryArray.length-k;i++,j++) {
            animate.push(['select', i, j])
            if(secondaryArray[i] > secondaryArray[j]){
                animate.push(['swap', i, secondaryArray[j], j, secondaryArray[i]])
                animate.push(['deselect', i, j])
                let temp = secondaryArray[i]
                secondaryArray[i] = secondaryArray[j]
                secondaryArray[j] = temp
            }else{
                animate.push(['swap', i, secondaryArray[i], j, secondaryArray[j]])
                animate.push(['deselect', i, j])
            }
        }
    }
}
