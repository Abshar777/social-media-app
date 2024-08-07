interface prop {
  img?: string;
  video: string;
}

const ImgCover = ({ video }: prop) => {
  return (
    <div className="hidden  relative  w-full h-full overflow-hidden p-[1rem] rounded-2xl   lg:flex items-center justify-end">
      <div className="img z-[-1]  w-[87%] h-full py-[.5rem] absolute ">
        <video
          playsInline
          autoPlay={true}
          loop={true}
          muted={true}
          src={video}
          className="h-full   w-full rounded-2xl   object-cover dark:brightness-[0.7] "
        />
      </div>
    </div>
  );
};

export default ImgCover;
