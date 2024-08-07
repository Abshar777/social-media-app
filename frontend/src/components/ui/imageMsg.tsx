import img from "../../assets/demon-slayer-tanjiro-unsheathing-the-sword-desktop-wallpaper.jpg";

const ImageMsg = ({own=true}:{own:boolean}) => {
    const colors = [
        { from: "#FF4B2B", to: "#D4145A" },
      ];
    const index = Math.floor(Math.random() * colors.length);
  return (
   <div className={`w-full px-[.3rem] py-[.2rem] flex items-center justify-${!own?"start":"end"}`}>
     <div    style={{
                background: `${own&&`linear-gradient(to right, ${colors[index].from}, ${colors[index].to})`}`,
              }} className={` ${!own&&"bg-zinc-800"}  px-[.5rem] py-[.3rem] rounded-lg  max-w-[45%]`} >
        <img src={img} className="w-full rounded-lg h-full object-cover" alt="" />
      <h1>image</h1>
    </div>
   </div>
  )
}

export default ImageMsg
