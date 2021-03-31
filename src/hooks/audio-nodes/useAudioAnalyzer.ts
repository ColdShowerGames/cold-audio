import { useRef, useState } from "react";

export interface IAnalyzedAudioSample {
    getFrequencyData: () => Uint8Array;
    getTimeData: () => Uint8Array;
    getAverageFrequency: () => number;
    getAverageTime: () => number;
    node: AnalyserNode;
}

export const useAudioAnalyzer = (context: AudioContext): IAnalyzedAudioSample => {
    const [node] = useState(() => context.createAnalyser());
    const freqData = useRef(new Uint8Array(node.frequencyBinCount));
    const timeData = useRef(new Uint8Array(node.frequencyBinCount));

    const getFrequencyData = () => {
        node.getByteFrequencyData(freqData.current);
        return freqData.current;
    }

    const getTimeData = () => {
        node.getByteTimeDomainData(timeData.current);
        return timeData.current;
    }

    const getAverageFrequency = () => {
        node.getByteFrequencyData(freqData.current);
        return freqData.current.reduce((acc, val) => acc + val, 0) /
               node.frequencyBinCount;
    };

    const getAverageTime = () => {
        node.getByteTimeDomainData(timeData.current);
        return timeData.current.reduce((acc, val) => acc + Math.abs(val - 12.8), 0) /
               node.frequencyBinCount;
    };

    return {
        getTimeData: getTimeData,
        getAverageTime: getAverageTime,
        getFrequencyData: getFrequencyData,
        getAverageFrequency: getAverageFrequency,
        node: node
    };
}
