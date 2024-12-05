import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import MicrophonePlugin from "wavesurfer.js/dist/plugins/record";

export const useWaveSurfer = (waveformRef: React.RefObject<HTMLElement>, onRecordEnd: Function, onProgress: Function,onPause?:Function,onPlay?:Function,onFinish?:Function) => {
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const recordPlugin = useRef<MicrophonePlugin | null>(null);

  useEffect(() => {
    if (!waveformRef.current) return;

    waveSurferRef.current?.destroy();
    waveSurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#34374B",
      progressColor: "#ffff",
      dragToSeek: true,
      hideScrollbar: true,
      normalize: true,
      barGap: 1,
      height: 20,
      barHeight: 20,
      barRadius: 20,
      barWidth: 5,
    });

    const plugin = MicrophonePlugin.create({
      audioBitsPerSecond: 128000,
      renderRecordedAudio: true,
      scrollingWaveform: true,
    });

    recordPlugin.current = waveSurferRef.current.registerPlugin(plugin);

    recordPlugin.current.on("record-end", (blob: Blob) => onRecordEnd(blob));
    recordPlugin.current.on("record-progress", (time: number) => onProgress(time));
    waveSurferRef.current.on("pause", () => onPause && onPause());
    waveSurferRef.current.on("play", () => onPlay && onPlay());
    waveSurferRef.current.on("finish", () => onFinish && onFinish());    

    return () => waveSurferRef.current?.destroy();
  }, [waveformRef]);

  return { waveSurferRef, recordPlugin };
};
