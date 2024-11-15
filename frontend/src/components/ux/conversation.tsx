import React, { useEffect, useRef, useState } from "react";
import Date from "../ui/date";
import Msg from "../chat/msg";
import ImageMsg from "../chat/imageMsg";
import Replay from "../chat/replay";
import AudioMsg from "../chat/audioMsg";

const Conversation = ({ arr, fn }: { arr: number[]; fn: () => void }) => {
  return (
    <div className="w-full text-sm px-[.4rem] pt-[1rem]">
      <Msg id="hello" own={false} />
      <Date />
      {arr.map((e, i) => {
        const start = i == 0 || arr[i - 1] % 3 == 0 ? true : false;
        let end = false;
        if (!start)
          end = i == arr.length - 1 || arr[i + 1] % 3 == 0 ? true : false;
        return (
          <Msg
            id={`text${i}`}
            type="msg"
            own={e % 3 ? !false : !true}
            start={start}
            end={end}
            key={i}
          />
        );
      })}
      <ImageMsg  own={true} />
      <ImageMsg id="textl" own={false} />
      <Replay own={false}/>
     <AudioMsg own={!true}/>
     <AudioMsg own={true}/>
    </div>
  );
};

export default Conversation;
