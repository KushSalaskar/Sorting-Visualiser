export function getSelectionSortAnimations(stateArray) {
    if(stateArray.length <= 1) return stateArray
    const dummyArray = stateArray.slice()
    const animate = []
    doSelectionSort(stateArray, dummyArray, animate)
    return animate
}

function doSelectionSort(primaryArray, secondaryArray, animate) {
    for(let i = 0; i < secondaryArray.length-1 ; i++){
        let min = i
        for(let j = i+1; j<secondaryArray.length; j++){
            animate.push(['select',j,min])
            animate.push(['deselect',j,min])
            if(secondaryArray[j] < secondaryArray[min]){
                min = j
            }
        }
        animate.push(['select', min, i])
        animate.push(['swap', min, secondaryArray[i], i, secondaryArray[min]])
        animate.push(['deselect', min, i])
        let temp = secondaryArray[min]
        secondaryArray[min] = secondaryArray[i]
        secondaryArray[i] = temp
    }
}