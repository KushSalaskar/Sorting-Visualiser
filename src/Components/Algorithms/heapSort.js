export function getHeapSortAnimations(stateArray) {
    if (stateArray.length <= 1) return stateArray
    let animate = []
    let dummyArray = stateArray.slice()
    doHeapSort(dummyArray, animate)
    return animate
}


function doHeapSort(secondaryArray, animate) {
    let n = secondaryArray.length
    for(var i = parseInt(n/2); i >= 0; i--){
        heapify(secondaryArray, n, i, animate)
    }

    for(var j = n-1; j > 0; j--){
        animate.push(['select', 0, j])
        animate.push(['swap', j, secondaryArray[0], 0, secondaryArray[j]])
        animate.push(['deselect', 0, j])
        let temp = secondaryArray[0]
        secondaryArray[0] = secondaryArray[j]
        secondaryArray[j] = temp

        heapify(secondaryArray, j, 0, animate)
    }

}





function heapify(secondaryArray, n, i, animate){
    var largest = i
    var l = 2 * i + 1
    var r = 2 * i + 2

    if((l < n) && (secondaryArray[largest] < secondaryArray[l])){
        largest = l
    }
    if((r < n) && (secondaryArray[largest] < secondaryArray[r])){
        largest = r
    }
    
    if(largest !== i){
        animate.push(['select', largest, i])
        animate.push(['swap', largest, secondaryArray[i], i, secondaryArray[largest]])
        animate.push(['deselect', largest, i])
        let temp = secondaryArray[i]
        secondaryArray[i] = secondaryArray[largest]
        secondaryArray[largest] = temp

        heapify(secondaryArray, n, largest, animate)
    } 
}






