import VideoPlayer from "@/components/global/videoPlayer";
import { cn } from "@/lib/utils";
import { Skeleton } from "@nextui-org/react";
import { Upload } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface Props {}

const File = (props: Props) => {
  const [video, setvideo] = useState<string | undefined>(undefined);
  const [thumbnail, setThumbnail] = useState<string | undefined>();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loading, setloading] = useState(true);
  const generateThumbnail = () => {
    const video = videoRef.current;
    if (!video) return;
    setloading(true);
    video.currentTime = 2;
    video.onseeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        console.log(context, canvas);
        const dataUrl = canvas.toDataURL("image/png");
        setThumbnail(dataUrl);
      }
      setloading(false)
      video.onseeked=()=>null;
    }
  };
  useEffect(() => {
    
    if(video)generateThumbnail();
    
  }, [video]);
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <label
        htmlFor="file"
        className="bg-neutral-900 cursor-pointer flex items-center justify-center shadow-xl w-[15rem] h-[10rem] rounded-lg"
      >
        <div className="flex gap-2">
          <Upload className="text-zinc-700 text-small" />
          <p className="text-zinc-700 ">Upload</p>
        </div>
        <input
          onChange={(e) => {
            
            const url = URL.createObjectURL(e.target.files?.[0] as File);
            // setThumbnail(url)
            setvideo(url);
          }}
          id="file"
          className=""
          type="file"
          hidden
        />
      </label>
   <div className="flex gap-x-4 p-6">
   <div className="w-[15rem] rounded-lg h-[10rem] overflow-hidden">
        <video
        muted
          ref={videoRef}
          src={video}
          className="w-full  h-full object-cover hidden "
        />
       {video&&<VideoPlayer video={video} />}
      </div>
      <div className="w-[15rem] rounded-lg h-[10rem] overflow-hidden">
        {loading&&<Skeleton className={"w-full h-full "}/>}
        <img className={cn("w-full h-full object-cover",!thumbnail&&"hidden")} src={thumbnail}  />
      </div>
   </div>
    </div>
  );
};

export default File;
