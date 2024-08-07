import React from 'react'

const Replay = ({own=false}:{own:boolean}) => {
    const colors = [
        { from: "#FF4B2B", to: "#D4145A" },
      ];
    const index = Math.floor(Math.random() * colors.length);
  return (
   <div className={`w-full px-[.3rem] py-[.2rem] flex items-center justify-${!own?"start":"end"}`}>
     <div    style={{
                background: `${own&&`linear-gradient(to right, ${colors[index].from}, ${colors[index].to})`}`,
              }} className={` ${!own&&"bg-zinc-800"} w-fit px-[.5rem] py-[.3rem] ${own?"rounded-l-lg":"rounded-r-lg"}   max-w-1/2`} >
      <h1>ajjjajajjj</h1>
    </div>
   </div>
  )
}

export default Replay
