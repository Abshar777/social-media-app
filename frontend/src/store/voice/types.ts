import WaveSurfer from "wavesurfer.js";

export interface IAudioStore {
    activePlayer: WaveSurfer | null;
    setActivePlayer: (player: WaveSurfer | null) => void;
}
