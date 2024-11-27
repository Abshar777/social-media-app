import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import WaveSurfer from "wavesurfer.js";
import MicrophonePlugin from "wavesurfer.js/dist/plugins/record";

const ChatInput = () => {
  const addMotion = useAnimationControls();
  const [chat, setChat] = useState("");
  const [send, setsend] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const waveformRef = useRef<HTMLElement | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState("00:00");
  const record = useRef<MicrophonePlugin | null>(null);
  const [isPause, setIsPause] = useState(true);
  const [IsRecordEnd, setIsRecordEnd] = useState(false);
  const [url,setUrl]=useState("")
  const sendIconClassName = ` ml-1 hover:bg-zinc-800  rounded-full w-[2.5rem] h-[2.5rem] flex items-center justify-center`;
  useEffect(() => {
    if (!showDropdown) addMotion.start("initial");
    else addMotion.start("animate");
  }, [showDropdown]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (waveformRef.current) {
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

      const recordPlugin = MicrophonePlugin.create({
        audioBitsPerSecond: 128000,
        renderRecordedAudio: true,
        scrollingWaveform: true,
      });

      record.current = waveSurferRef.current.registerPlugin(recordPlugin);

      record.current.on("record-end", (blob) => {
        const url = URL.createObjectURL(blob);
        setUrl(url)
        console.log("end", url);
        setIsPause(true);
        setIsRecordEnd(true)
      });
      record.current.on("record-progress", (time: number) => {
        setIsRecordEnd(false)
        const minutes = Math.floor((time % 3600000) / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        setProgress(
          [minutes, seconds].map((v) => (v < 10 ? "0" + v : v)).join(":")
        );
      });
      waveSurferRef.current.on("play", () => {
        setIsPause(false);
      });
      waveSurferRef.current.on("pause", () => {
        setIsPause(true);
        console.log('puase the record');
        
      });
      waveSurferRef.current.on("finish", () => setIsPause(true));
    }
    return () => {
      waveSurferRef.current?.destroy();
    };
  }, []);
  const startRecording = () => {
    if (!record.current) return;
    setsend(true);
    setIsRecording(true);
    setIsPause(false);
    record.current
      .startRecording()
      .then(() => {
        console.log("recording started");
      })
      .catch((err) => {
        console.log(err, "recording error");
      });
  };

  const stopRecording = () => {
    if (!record.current) return;
    record.current.stopRecording();
    // setIsRecording(false);
  };

  const playRecording = () => {
    if (!waveSurferRef.current) return;
    waveSurferRef.current.play();
  };

  const pauseRecording = () => {
    if (!waveSurferRef.current) return;
    waveSurferRef.current.pause();
  };
  const dltRecording = () => {
    if (!waveSurferRef.current) return;
    if (isRecording) {
      record.current?.stopRecording();
      setIsRecording(false);
    }
    waveSurferRef.current.empty();
    setProgress("00:00");
    setsend(false);
  };

  const handleInput = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 192)}px`;

      (document.getElementById("chatBox") as HTMLDivElement).style.alignItems =
        textarea.scrollHeight <= 35 ? "center" : "end";
    }
  };

  useEffect(()=>{
    navigator.permissions.query({name:"notifications" }).then((result) => {
      console.log(result.state); // 'granted', 'denied', or 'prompt'
    });
    MicrophonePlugin.getAvailableAudioDevices().then((devices) => {
      console.log(devices); 
    });
  })
  return (
    <div
      id="chatBox"
      className="w-full overflow-hidden -mt-1 md:mb-0  md:mt-0  h-full flex px-1 items-center"
    >
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <i className="ri-emoji-sticker-line hover:bg-zinc-800 transition-all ease-in duration-200 rounded-full w-[2.5rem] h-[2.5rem] flex items-center justify-center"></i>
          </TooltipTrigger>
          <TooltipContent className={`bg-zinc-900 `}>Emojis</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <DropdownMenu
              onOpenChange={() => {
                setShowDropdown(!showDropdown);
              }}
            >
              <DropdownMenuTrigger className="cursor-pointer" asChild>
                <div className="">
                  <motion.i
                    animate={addMotion}
                    variants={{
                      initial: { rotate: 0 },
                      animate: { rotate: "180deg" },
                    }}
                    className="ri-apps-2-add-line mr-2 hover:bg-zinc-800  rounded-full w-[2.5rem] h-[2.5rem] flex items-center justify-center"
                  ></motion.i>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-neutral-900" align="start">
                <DropdownMenuItem>
                  <i className="ri-article-fill mx-1 text-primary"></i>{" "}
                  Documents
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <i className="ri-gallery-fill mx-1 text-green-700"></i> Galary
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <i className="ri-camera-fill mx-1 text-rose-700"></i> Camera
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <i className="ri-user-fill mx-1 text-orange-500"></i> Friend
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <i className="ri-chat-poll-line mx-1 text-cyan-500"></i> Poll
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          <TooltipContent className={`bg-zinc-900 ${showDropdown && "hidden"}`}>
            Add
          </TooltipContent>
        </Tooltip>
        <textarea
          ref={textareaRef}
          onInput={handleInput}
          value={chat}
          onChange={(e) => {
            setChat(e.target.value);
            if (e.target.value.trim()) setsend(true);
            else setsend(false);
          }}
          rows={1}
          placeholder="message heare"
          name=""
          className={`resize-none w-full ${
            isRecording && "hidden"
          }  flex items-center md:mt-1   outline-0 rounded-lg px-[.5rem] py-[.4rem] md:py-[.2rem] md:px-[.5rem] bg-zinc-800`}
          id=""
        ></textarea>

        <div className={`flex flex-col ${!isRecording && "hidden"} w-full`}>
          <div className="flex w-full items-center justify-end gap-3">
            {send && (
              <>
                {" "}
                <motion.i
                  onClick={dltRecording}
                  initial={{ rotate: "90deg" }}
                  animate={{ rotate: "0deg" }}
                  exit={{ rotate: "180deg" }}
                  className={
                    sendIconClassName + " ri-delete-bin-7-fill text-danger-500"
                  }
                ></motion.i>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {progress}
                </motion.p>
              </>
            )}
            <div
              className="px-[.5rem] py-[.4rem] md:py-[.2rem] md:px-[.5rem] w-1/4  rounded-xl"
              ref={waveformRef as any}
            ></div>
            {(send && isRecording&&!isPause) && (
              <motion.i
                onClick={!IsRecordEnd?stopRecording:pauseRecording}
                initial={{ rotate: "90deg" }}
                animate={{ rotate: "0deg" }}
                exit={{ rotate: "180deg" }}
                className={
                  sendIconClassName +
                  `  ri-pause-circle-line text-lg text-danger-500`
                }
              ></motion.i>
            )}
            {send && isPause &&(
              <motion.i
                onClick={playRecording}
                initial={{ rotate: "90deg" }}
                animate={{ rotate: "0deg" }}
                exit={{ rotate: "180deg" }}
                className={
                  sendIconClassName +
                  " ri-play-circle-line text-lg text-violet-700"
                }
              ></motion.i>
            )}
          </div>
        </div>

        <Tooltip>
          <TooltipTrigger>
            <AnimatePresence mode="popLayout">
              {!send ? (
                <motion.i
                  onClick={startRecording}
                  initial={{ rotate: "90deg" }}
                  animate={{ rotate: "0deg" }}
                  exit={{ rotate: "180deg" }}
                  className={sendIconClassName + " ri-mic-2-line"}
                ></motion.i>
              ) : (
                <motion.i
                  onClick={() => {
                    stopRecording();
                  }}
                  style={{ scaleX: -1 }}
                  exit={{ rotate: "360deg" }}
                  animate={{ rotate: "180deg" }}
                  initial={{ rotate: "360deg" }}
                  className={sendIconClassName + " ri-send-plane-2-line"}
                ></motion.i>
              )}
            </AnimatePresence>
          </TooltipTrigger>
          <TooltipContent className={`bg-zinc-900 `}>
            {send ? "send" : "voice"}
          </TooltipContent>
        </Tooltip>
        
      </TooltipProvider>
    </div>
  );
};

export default ChatInput;
