export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSort(array, animations);
  return animations;
}

export function bubbleSort (array, animations) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      animations.push([j, j + 1, "false"]);
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        animations.push([j, j + 1, "true"]);
      }
      animations.push([j, j + 1, "back"]);
    }
  }
  return array;
}

export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  console.log(array.length - 1)
  quickSort(array, 0, array.length - 1, animations);
  return animations;
}

export function quickSort (array, low, high, animations) {
  if (low < high) {
    let pivot = partition(array, low, high, animations);
    quickSort(array, low, pivot - 1, animations);
    quickSort(array, pivot + 1, high, animations);
  }
  return array;
}

export function partition (array, low, high, animations) {
  let pi = array[high];
  let i = (low - 1);

  for (let j = low; j <= high - 1; j++) {
    animations.push([j, high, "compare"]);
    if (array[j] < pi) {
      i++;
      animations.push([j, i, "indexswap"]);
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      animations.push([j, i, "indexback"]);
    }
  }
  animations.push([i + 1, high, "pivotswap"]);
  let second_temp = array[i + 1];
  array[i + 1] = array[high];
  array[high] = second_temp;
  animations.push([i + 1, high, "pivotback"]);
  return (i + 1);
}

export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  heapSort(array, animations);
  return animations;
}

export function heapSort(array, animations) {
  var n = array.length;

  for (var i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, animations);
  }

  for (var i = n - 1; i > 0; i--) {
      animations.push([i, 0, "rootendswap"]);
      var temp = array[0];
      array[0] = array[i];
      array[i] = temp;
      animations.push([i, 0, "rootendback"]);
      heapify(array, i, 0, animations);
  }
  return array;
}

export function heapify(array, n, i, animations) {
  var largest = i; 
  var l = 2 * i + 1; 
  var r = 2 * i + 2; 

  if (l < n && array[l] > array[largest]) {
    largest = l;
    animations.push([largest, i, "leftcompare"]);
  }

  if (r < n && array[r] > array[largest]) {
    largest = r;
    animations.push([largest, i, "rightcompare"]);
  }

  if (largest != i) {
      animations.push([largest, i, "rootswap"]);
      var swap = array[i];
      array[i] = array[largest];
      array[largest] = swap;
      animations.push([largest, i, "rootback"]);
      heapify(array, n, largest, animations);
  }
}
