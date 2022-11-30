import { generateValue } from './MathUtil';
import { generateMergeSortArray } from './MergeSortUtil';
import { generateCountSortArray } from './CountingSortUtil';
import { generateRadixSortArray } from './RadixSortUtil';
import { generateBucketSortArray } from './BucketSortUtil';
import SortingAlgorithms from '../../algorithm/sortingalgorithms/allSorts';
import { isCountingSort, isMergeSort, isRadixOrBucket } from './GeneralUtil';

/**
 * Resets the given array.
 *
 * @method
 * @category ArrayUtil
 * @param {string} visualizerAlgorithm Algorithm used.
 * @param {Object[]} arr Array to be reset.
 * @returns {Object[]} Array that has been reset.
 */
export const resetArray = (visualizerAlgorithm, arr) => {
  if (isRadixOrBucket(visualizerAlgorithm)) {
    return arrayCopy(arr);
  }

  return arrayCopy(arr).map((x) => {
    let tempArrElement = x;
    if (isCountingSort(visualizerAlgorithm)) {
      tempArrElement.isShown = true;
    } else if (isMergeSort(visualizerAlgorithm)) {
      tempArrElement.isShift = false;
    } else {
      tempArrElement.isSwap = false;
    }
    return tempArrElement;
  });
};

/**
 * Creates a deep copy of the array.
 *
 * @method
 * @category ArrayUtil
 * @param {Object[]} arr Array to be copied.
 * @returns {Object[]} Deep copy of the input array.
 */
export const arrayCopy = (arr) => {
  return JSON.parse(JSON.stringify(arr));
};

/**
 * Retrieves the animation array based on the given array and algorithm selected.
 *
 * @method
 * @category ArrayUtil
 * @param {string} visualizerAlgorithm The current algorithm of the visualizer.
 * @param {Object[]} arrayData Given array.
 * @returns {any[]} An array that contains all the animation steps.
 */
export const getAnimationArr = (visualizerAlgorithm, arrayData) => {
  const sortAlgo = SortingAlgorithms[visualizerAlgorithm];
  return sortAlgo(arrayCopy(arrayData));
};

/**
 * Object used to map the names of each algorithm to its generated array.
 *
 * @method
 * @category ArrayUtil
 * @const {Object}
 */
const arrayGenerator = {
  'Insertion Sort': (size) => generateDefaultArray(size),
  'Bubble Sort': (size) => generateDefaultArray(size),
  'Quick Sort': (size) => generateDefaultArray(size),
  'Shell Sort': (size) => generateDefaultArray(size),
  'Heap Sort': (size) => generateDefaultArray(size),
  'Selection Sort': (size) => generateDefaultArray(size),
  'Merge Sort': (size) => generateMergeSortArray(size),
  'Counting Sort': (size) => generateCountSortArray(size),
  'Radix Sort': (size) => generateRadixSortArray(size),
  'Bucket Sort': (size) => generateBucketSortArray(size),
};

/**
 * Generates a random array based on the size chosen and the algorithm selected.
 *
 * @method
 * @category ArrayUtil
 * @param {number} size Size of array selected by user.
 * @param {string} visualizerAlgorithm The current algorithm of the visualizer.
 * @returns {Object[]} Random array generated.
 */
export const generateArray = (size, visualizerAlgorithm) => {
  return arrayGenerator[visualizerAlgorithm](size);
};

/**
 * Generates the default array. Used by all sorting algorithms involving swaps only.
 *
 * @category ArrayUtil
 * @param {number} size Size of array selected by user.
 * @returns {Object[]} Random array generated.
 */
const generateDefaultArray = (size) => {
  let array = [];
  let list = [5,67,890,1388,45,124,9,8,380,1325,95,49,2489,689,56]
  for (let i = 0; i < size; i++) {
    array.push({
      id: i,
      height: list[i],
      isSwap: false,
    });
  }
  return array;
};
