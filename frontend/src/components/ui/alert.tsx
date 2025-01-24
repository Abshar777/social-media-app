import React from 'react'

interface prop{
    cont:string;
}

const Alert = ({cont}:prop) => {
  return (
   <div className="w-full flex items-center justify-center">
     <p
    style={{ border: "1px dashed red" }}
    className=" text-sm  bg-[#ff000033] p-2 rounded-lg text-center"
  >
    {cont}
  </p>
   </div>
  )
}

export default Alert
