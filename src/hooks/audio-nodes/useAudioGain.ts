import { useState } from "react";

export const useAudioGain = (context: AudioContext,
    initialGain: number = 1,
    initMethod?: (node: GainNode) => void) => {

    const [node] = useState(() => {
        const gainNode = context.createGain();
        gainNode.gain.value = initialGain;

        if (initMethod) {
            initMethod(gainNode);
        }
        return gainNode;
    });
    return node;
};
