import { useState } from "react";

export const useAudioDelay = (context: AudioContext,
    maxDelayTime: number,
    delayTime: number,
    initMethod?: (node: DelayNode) => void) => {

    const [node] = useState(() => {
        const delayNode = context.createDelay(maxDelayTime);
        delayNode.delayTime.value = delayTime;

        if (initMethod) {
            initMethod(delayNode);
        }
        return delayNode;
    });
    return node;
};
