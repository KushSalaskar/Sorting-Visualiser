export function getMergeSortAnimations(array) {
    let animations  = [];
    let dummyArray = array.slice();
    mergeSort(dummyArray, 0, dummyArray.length - 1, animations);
    return animations;
}


function mergeSort(auxillaryArray, startIndex, endIndex, animations) {
    if(startIndex === endIndex)
        return;
    const middleIndex = Math.floor((startIndex + endIndex)/2);
    mergeSort(auxillaryArray, startIndex, middleIndex, animations);
    mergeSort(auxillaryArray, middleIndex + 1, endIndex, animations);
    merge(auxillaryArray, startIndex, middleIndex, endIndex, animations);
}

function merge(auxillaryArray, startIndex, middleIndex, endIndex, animations) {
    let sortArray = [];
    let i = startIndex;
    let j = middleIndex + 1;
    while(i <= middleIndex && j <= endIndex) {
        animations.push(["select", i, j]);
        animations.push(["deselect", i, j]);
        if(auxillaryArray[i] <= auxillaryArray[j]) {
            sortArray.push(auxillaryArray[i++]);
        }
        else {
            sortArray.push(auxillaryArray[j++]);
        }
    }
    while(i <= middleIndex) {
        animations.push(["select", i, i]);
        animations.push(["deselect", i, i]);
        sortArray.push(auxillaryArray[i++]);
    }
    while(j <= endIndex) {
        animations.push(["select", j, j]);
        animations.push(["deselect", j, j]);
        sortArray.push(auxillaryArray[j++]);
    }
    for (let i = startIndex; i <= endIndex; i++) {
        animations.push(["select", i, i - startIndex]);
        animations.push(["swap", i, sortArray[i - startIndex]]);
        animations.push(["deselect", i, i - startIndex]);
        auxillaryArray[i] = sortArray[i - startIndex];
    }
}

