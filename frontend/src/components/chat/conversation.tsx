import React, { useEffect, useRef, useState } from "react";
import Msg from "./msg";
import ImageMsg from "./imageMsg";
import Replay from "./replay";
import AudioMsg from "./audioMsg";
import DocMessage from "./docMessage";
import PollMessage from "./pollMessage";
import Saprater from "./saprater";

const Conversation = ({}) => {
  return (
    <div className="w-full flex-col-reverse flex   text-sm px-[.4rem] pt-[1rem]">
      <Msg id="start" cont="start" start={true} own={false} />
      <Replay own={false}/>
      <Msg id="mid" cont="mid"  mid={true} own={false} />
      <Msg id="end" cont="end"  end={true} own={false} />
      <Msg id="start" cont="start" start={true} own={true} />
      <Msg id="mid" cont="mid"  mid={true} own={true} />
      <Msg id="end" cont="end"  end={true} own={true} />
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
      <Msg id="mid" cont="mid"   own={true} />
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
