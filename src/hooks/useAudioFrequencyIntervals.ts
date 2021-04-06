import { useRef } from "react";
import {
    extractIntervals, IIntervalRule, IIntervalValue,
} from "../utils/audioArrayUtils";
import { IAudioFrame } from "./audio-nodes/useAudioAnalyzer";

export interface IIntervalsGet {

    /*
     Calculate intervals now.
     */
    update: () => void;

    /*
     Getter function for intervals.
     */
    get: () => IIntervalValue[]
}

export const useAudioFrequencyIntervals = (audioData: IAudioFrame,
    intervalRules: IIntervalRule[]): IIntervalsGet => {

    const intervals = useRef<IIntervalValue[]>([]);

    const update = () => {
        intervals.current = extractIntervals(audioData.getFrequencyData(), intervalRules);
    };

    const get = () => intervals.current;

    return {
        update,
        get,
    };
};