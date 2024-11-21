import React, { useEffect, useRef, useState } from "react";
import Msg from "../chat/msg";
import ImageMsg from "../chat/imageMsg";
import Replay from "../chat/replay";
import AudioMsg from "../chat/audioMsg";
import DocMessage from "../chat/docMessage";
import PollMessage from "../chat/pollMessage";
import Saprater from "../chat/saprater";

const Conversation = ({}) => {
  return (
    <div className="w-full flex-col-reverse flex   text-sm px-[.4rem] pt-[1rem]">
      <Msg id="hello" own={false} />
      <Saprater />
      {/* {arr.map((e, i) => {
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
      })} */}
      <ImageMsg  own={true} />
      <ImageMsg id="textl" own={false} />
      <Replay own={false}/>
     <AudioMsg own={!true}/>
     <AudioMsg own={true}/>
     <DocMessage own={false}/>
     <DocMessage own={true}/>
     <PollMessage own={false}/>
     <PollMessage own={true}/>
    </div>
  );
};

export default Conversation;
