import { useState } from "react";

export const useAudioFilter = (
    context: AudioContext,
    type: BiquadFilterType,
    frequencyValue: number,
    gainValue?: number,
    initMethod ?: (node: BiquadFilterNode) => void) => {

    const [node] = useState(() => {
        const biquadFilterNode = context.createBiquadFilter();
        biquadFilterNode.type = type;
        biquadFilterNode.frequency.value = frequencyValue;

        if (gainValue) {
            biquadFilterNode.gain.value = gainValue;
        }
        if (initMethod) {
            initMethod(biquadFilterNode);
        }

        return biquadFilterNode;
    });

    return node;
};
