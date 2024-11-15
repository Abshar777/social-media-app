import img from "../../assets/demon-slayer-tanjiro-unsheathing-the-sword-desktop-wallpaper.jpg";

const ImageMsg = ({own=true,id=""}:{own:boolean,id?:string}) => {
    const colors = [
        { from: "#FF4B2B", to: "#D4145A" },
      ];
    const index = Math.floor(Math.random() * colors.length);
  return (
   <div id={id} className={`w-full  px-[.3rem] py-[.2rem] flex items-center justify-${!own?"start":"end"}`}>
     <div    style={{
                background: `${own&&`linear-gradient(to right, ${colors[index].from}, ${colors[index].to})`}`,
              }} className={` ${!own&&"bg-zinc-800"}  px-[.2rem] py-[.2rem] rounded-lg md:h-auto md:max-w-[45%] max-w-[80%]`} >
        <img src={img} className="w-full rounded-lg h-full object-cover" alt="" />
      <h1>image</h1>
    </div>
   </div>
  )
}

export default ImageMsg
