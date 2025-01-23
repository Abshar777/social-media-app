"use client";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  Poster,
  Track,
} from "@vidstack/react";
import Video from "@/assets/video.mp4";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";
import { useEffect, useRef } from "react";

interface Props {
  video: string;
}

const textTracks = [
  {
    src: "https://files.vidstack.io/sprite-fight/subs/english.vtt",
    label: "English",
    language: "en-US",
    kind: "subtitles",
    type: "vtt",
    default: true,
  },
  {
    src: "https://files.vidstack.io/sprite-fight/subs/spanish.vtt",
    label: "Spanish",
    language: "es-ES",
    kind: "subtitles",
    type: "vtt",
  },
  {
    src: "https://files.vidstack.io/sprite-fight/chapters.vtt",
    language: "en-US",
    kind: "chapters",
    type: "vtt",
    default: true,
  },
];

const VideoPlayer = ({ video }: Props) => {
  console.log(video);
  const player = useRef<MediaPlayerInstance>(null);

  useEffect(() => {
    // Call whenever you like - also available on `useMediaRemote`.
    player.current!.startLoading();

    // Call when poster should start loading.
    player.current!.startLoadingPoster();
  }, []);

  return (
    <MediaPlayer
      className="w-full top-0 h-full object-cover relative"
      src={video+".mp4"}
      ref={player}
      load="custom"
      title="Sprite Fight"
      poster="https://files.vidstack.io/sprite-fight/poster.webp"
    >
      <MediaProvider>
      {/* <Poster className="vds-poster" />
        {textTracks.map((track) => (
          <Track
            src={track.src}
            kind={track.kind as TextTrackKind}
            label={track.label}
            lang={track.language}
            default={track.default}
            key={track.src}
          />
        ))} */}
      </MediaProvider>
      <DefaultVideoLayout
        thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
        icons={defaultLayoutIcons}
      />
    </MediaPlayer>
  );
};

export default VideoPlayer;
