import { useEffect } from 'react';

interface IAudioConnectNodesProps {
    /**
     * Ordered audio nodes to apply to the audioSourceNode.
     */
    nodes?: AudioNode[];
    /**
     * The node which provides the audio source.
     */
    audioSourceNode: MediaElementAudioSourceNode | MediaStreamAudioSourceNode;
    /**
     * The audio destination. If provided, the audio will be heard
     * through the speakers.
     */
    audioDestination?: AudioDestinationNode;
}

/**
 * React component used to connect multiple audio nodes together.
 * Can be used to simply play audio, apply filters to the source node
 * or just connect multiple nodes together.
 */
export const AudioConnectNodes = (props: IAudioConnectNodesProps) => {

    useEffect(() => {
        const audioNodes: AudioNode[] = [];
        if (props.nodes) {
            for (const node of props.nodes) {
                audioNodes.push(node);
            }
        }

        if (props.audioDestination) {
            audioNodes.push(props.audioDestination);
        }
        audioNodes.reduce(
            (previousValue, currentValue) => previousValue.connect(currentValue),
            props.audioSourceNode);
    }, []);

    return null;
};

