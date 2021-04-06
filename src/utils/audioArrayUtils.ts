import { arrayChunks } from "./arrayUtils";

export interface IIntervalRule {
    /**
     * The index to start decomposing the array.
     * Upon selection of the array, this start index Includes the elements at that index.
     */
    startIndex: number;
    /**
     * The index to stop decomposing the array.
     * Upon selection of the array, this end index EXCLUDES the element at that index.
     */
    endIndex: number;
    /**
     * Number of elements in the resulting array formed from the selected subarray from
     * start and end index.
     */
    results: number;
}

export interface IIntervalValue {
    /**
     * Values of this interval. The length of this array is equal to the 'results'
     * given in the interval rule.
     */
    values: number[];
    /**
     * The average of this interval
     */
    average: number;
}

/**
 * Utility function used to interpret frequency data by allowing you to
 * easily split the frequency array into multiple arrays.
 * @param freqData The frequencyData array
 * @param intervalRules The rules of how to split the frequencyData.
 * With each rule given, it will return one array of values.
 * A returned "sub-array" contains data about a selected
 * frequency range, which is then split into 'results' chunks, which
 * are later averaged.
 */
export const extractIntervals = (freqData: Uint8Array,
    intervalRules: IIntervalRule[]): IIntervalValue[] => {

    const intervals: IIntervalValue[] = [];

    intervalRules.forEach(rule => {
        if (rule.endIndex <= rule.startIndex || rule.results > rule.endIndex -
            rule.startIndex || rule.results < 0 || rule.startIndex < 0) {
            throw new Error(`Invalid arguments to split intervals!` +
                            ` Cannot split interval [${rule.startIndex}, ${rule.endIndex}] into ${rule.results} chunks`);
        }
        const intervalValues: number[] = [];
        let intervalAvg = 0;

        const selectedArray = freqData.slice(rule.startIndex, rule.endIndex);
        const chunks = arrayChunks(selectedArray, selectedArray.length / rule.results);

        chunks.forEach(chunk => {
            const chunkAvg = chunk.reduce((acc, val) => acc + val, 0) / chunk.length;
            intervalValues.push(chunkAvg);
            intervalAvg += chunkAvg;
        });

        intervalAvg /= chunks.length;
        intervals.push({
            values: intervalValues,
            average: intervalAvg,
        });
    });

    return intervals;
};