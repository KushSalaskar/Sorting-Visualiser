export function getQuickSortAnimations(stateArray) {
    if(stateArray.length <= 1) return stateArray
    const dummyArray = stateArray.slice()
    const animate = []
    doQuickSort(stateArray, dummyArray, 0, stateArray.length-1, animate)
    return animate
}


function doQuickSort(primaryArray, secondaryArray, lowIndex, highIndex, animate) {
    if(lowIndex < highIndex){
        var part = partition(secondaryArray, lowIndex, highIndex, animate)

        doQuickSort(primaryArray, secondaryArray, lowIndex, part-1, animate)
        doQuickSort(primaryArray, secondaryArray, part+1, highIndex, animate)
    }
}


function partition(secondaryArray, lowIndex, highIndex, animate) {
    var i = lowIndex - 1
    let pivotIndex = highIndex

    for(let j = lowIndex; j < highIndex; ++j) {
        animate.push(['select', i+1, highIndex])
        animate.push(['deselect', i+1, highIndex])
        if(secondaryArray[j] <= secondaryArray[pivotIndex]){
            
            i++

            animate.push(['select', i, j])
            animate.push(['swap', i, secondaryArray[j], j, secondaryArray[i]])
            animate.push(['deselect', i, j])
            let temp = secondaryArray[j]
            secondaryArray[j] = secondaryArray[i]
            secondaryArray[i] = temp

        }
    }

    animate.push(['select', highIndex, i+1])
    animate.push(['swap', pivotIndex, secondaryArray[i+1], i+1, secondaryArray[pivotIndex]])
    animate.push(['deselect', highIndex, i+1])

    let temp = secondaryArray[pivotIndex]
    secondaryArray[pivotIndex] = secondaryArray[i+1]
    secondaryArray[i+1] = temp

    return i+1
}