import { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import Audio from "@/assets/spotifydown.com - When life gives you lemons.mp3";
import { AnimatePresence, motion } from "framer-motion";
import img from "@/assets/demon-slayer-tanjiro-unsheathing-the-sword-desktop-wallpaper.jpg";
import useAudioStore from "@/store/voice/store";
import { formatDuration } from "@/util/formatTime";

type AudioMsgProps = {
  id?: string;
  own: boolean;
  start?: boolean;
  end?: boolean;
  mid?: boolean;
};

const AudioMsg = ({
  id,
  own = true,
  start = false,
  end = false,
  mid = false,
}: AudioMsgProps) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const { activePlayer, setActivePlayer } = useAudioStore();
  const [show, setShow] = useState(false);
  const [play, setPlay] = useState(false);
  const [duration, setDuration] = useState(0);
  const colors = [{ from: "#FF4B2B", to: "#D4145A" }];
  const index = Math.floor(Math.random() * colors.length);
 

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: !own ? "#34374B" : "#dcc8d5",
        progressColor: "#ffff",
        url: Audio,
        dragToSeek: true,
        hideScrollbar: true,
        normalize: true,
        barGap: 1,
        height: 20,
        barHeight: 20,
        barRadius: 20,
        barWidth: 5,
      });

      wavesurfer.current.on("ready", () => {
        const audioDuration = wavesurfer.current?.getDuration() || 0;
        setDuration(audioDuration);
      });
      wavesurfer.current.on("finish", () => setPlay(false));
      wavesurfer.current.on("pause", () => setPlay(false));
      wavesurfer.current.on("play", () => setPlay(true));
      
    }

    return () => {
      wavesurfer.current && wavesurfer.current.destroy();
    };
  }, []);

  const handlePlayPause = () => {
    if (activePlayer && activePlayer !== wavesurfer.current) {
      activePlayer.pause();
      setPlay(false);
    }
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
      setActivePlayer(wavesurfer.current);
    }
  };

  return (
    <motion.div
      id={id}
      className={`w-full px-[.3rem] py-[.2rem] flex items-center justify-${
        !own ? "start" : "end"
      }`}
    >
      <motion.div
        onHoverStart={() => setShow(!show)}
        onHoverEnd={() => setShow(!show)}
        layout
        style={{
          background: `${
            own &&
            `linear-gradient(to right, ${colors[index].from}, ${colors[index].to})`
          }`,
        }}
        className={` ${
          !own && "bg-zinc-800"
        } cursor-pointer lg:min-w-[30%] md:min-w-[60%] min-w-[80%] px-[.5rem] py-[.3rem] flex flex-col ${
          own ? "rounded-l-full" : "rounded-r-full"
        } ${end && "rounded-br-full"} ${
          own ? "rounded-l-full" : "rounded-r-full"
        } ${own&&end && "rounded-br-full"}  ${!own && end && "rounded-bl-full"}  ${own&&start && "rounded-tr-full"} ${!own && start && "rounded-tl-full"} ${!mid&&!start&&!end&&"rounded-full"} max-w-1/2`}
      >
        <div className="w-full h-full flex-flex-col">
          <motion.div
            layout
            className={`flex ${!own && "flex-row"} items-center relative gap-`}
          >
            <AnimatePresence mode="popLayout">
              {play ? (
                <motion.i
                  onClick={handlePlayPause}
                  initial={{ rotate: "90deg" }}
                  animate={{ rotate: "0deg" }}
                  exit={{ rotate: "180deg" }}
                  className={`ri-pause-circle-fill text-3xl active:scale-[.9] ${
                    !own && "mt-1"
                  }`}
                ></motion.i>
              ) : (
                <motion.i
                  onClick={handlePlayPause}
                  style={{ scaleX: -1 }}
                  exit={{ rotate: "360deg" }}
                  animate={{ rotate: "180deg" }}
                  initial={{ rotate: "360deg" }}
                  className={`ri-play-circle-fill text-3xl active:scale-[.9] ${
                    !own && "mt-1"
                  }`}
                ></motion.i>
              )}
            </AnimatePresence>
            <div className="flex-1 w-3/4 h-full px-2">
              <div ref={waveformRef} className="py-4 w-full" />
            </div>
            <div className="w-[2.5rem] overflow-hidden h-[2.5rem] bg-zinc-900 rounded-full">
              <img src={img} className="w-full h-full object-cover" />
            </div>
          </motion.div>
          <div className="w-full  px-10 flex justify-between">
            <p className="text-white/40 text-xs -mt-3">
              {formatDuration(duration)}
            </p>
            <div className="flex gap-2 -mt-3">
              <p className="text-white/40 text-xs ">11:00pm</p>
              <i className="ri-check-double-line text-violet-500"></i>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AudioMsg;
