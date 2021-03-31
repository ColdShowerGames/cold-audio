import { useState } from "react";

export const useUrlAudioContext = (url: string) => {
    const [mediaElement] = useState(() => {
        const audio = new Audio(url);
        audio.crossOrigin = "anonymous";
        return audio;
    });

    const [audioContext] = useState(new AudioContext());
    const [sourceNode] = useState(() => {
        return audioContext.createMediaElementSource(mediaElement);
    });

    return {
        context: audioContext,
        destinationNode: audioContext.destination,
        sourceNode,
        mediaElement,
    };
};