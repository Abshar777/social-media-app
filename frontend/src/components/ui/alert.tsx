import React from 'react'

interface prop{
    cont:string;
}

const Alert = ({cont}:prop) => {
  return (
    <p
    style={{ border: "1px dashed red" }}
    className=" text-sm  bg-[#ff000033] p-2 rounded-lg text-center"
  >
    {cont}
  </p>
  )
}

export default Alert
