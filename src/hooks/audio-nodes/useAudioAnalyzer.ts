import { useRef, useState } from "react";

export interface IAudioFrame {
    updateFrequencyData: () => void;
    updateTimeData: () => void;
    getFrequencyData: () => Uint8Array;
    getTimeData: () => Uint8Array;
    node: AnalyserNode;
}

export const useAudioAnalyzer = (context: AudioContext): IAudioFrame => {
    const [node] = useState(() => context.createAnalyser());
    const freqData = useRef(new Uint8Array(node.frequencyBinCount));
    const timeData = useRef(new Uint8Array(node.frequencyBinCount));

    const updateFrequencyData = () => node.getByteFrequencyData(freqData.current);
    const updateTimeData = () => node.getByteTimeDomainData(timeData.current);

    const getFrequencyData = () => freqData.current
    const getTimeData = () => timeData.current


    return {
        updateFrequencyData,
        updateTimeData,
        getTimeData,
        getFrequencyData,
        node
    };
}
