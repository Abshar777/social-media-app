interface prop {
  img?: string;
  video: string;
}

const ImgCover = ({ video }: prop) => {
  return (
    <div className="hidden  relative  w-full h-full overflow-hidden p-[1rem] rounded-2xl   lg:flex items-center justify-end">
      <div className="img   w-[87%] h-full py-[.5rem] relative ">
        
        <video
          playsInline
          autoPlay={true}
          loop={true}
          muted={true}
          src={video}
          className="h-full absolute top-0   z-0  w-full rounded-2xl   object-cover dark:brightness-[0.7] "
        />
        <div className="w-full h-full relative p-5 ">
          {/* <h1 className="text-2xl uppercase font-bold bg-black w-fit p-4 rounded-xl">Regular Chats</h1> */}
        </div>
      </div>
    </div>
  );
};

export default ImgCover;
