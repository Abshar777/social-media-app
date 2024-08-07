import img from "../../assets/demon-slayer-tanjiro-unsheathing-the-sword-desktop-wallpaper.jpg";
import { motion, useAnimation } from "framer-motion";
const ChatNav = () => {
  const hoverAnimation = useAnimation();

  return (
    <motion.div
      onHoverStart={() => hoverAnimation.start("animate")}
      onHoverEnd={() => hoverAnimation.start("initial")}
      className="w-full hover:bg-zinc-800 transition-all ease-in cursor-pointer duration-200 h-full hover: flex items-center px-[1rem] justify-between"
    >
      <div className="flex h-full items-center gap-6">
        <div className="cricle overflow-hidden rounded-full  h-[3rem] w-[3rem]">
          <img className="w-full h-full object-cover" src={img} alt="" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg capitalize">abshar</h1>
          <p className="text-sm">online</p>
        </div>
        <motion.div
          initial={"initial"}
          animate={hoverAnimation}
          variants={{
            animate: { x: 0, opacity: 1 },
            initial: { x: -20, opacity: 0 },
          }}
          className="flex h-full py-3 items-start"
        >
          <i className="ri-arrow-right-s-line"></i>
        </motion.div>
      </div>
      <div className="flex h-full items-center gap">
        <i className="ri-phone-fill hover:bg-zinc-900 transition-all ease-in duration-200 rounded-full w-[2.5rem] h-[2.5rem] flex items-center justify-center"></i>
        <i className="ri-video-on-fill hover:bg-zinc-900 transition-all ease-in duration-200 rounded-full w-[2.5rem] h-[2.5rem] flex items-center justify-center"></i>
        <i className="ri-search-line hover:bg-zinc-900 transition-all ease-in duration-200 rounded-full w-[2.5rem] h-[2.5rem] flex items-center justify-center"></i>
        <i className="ri-more-line hover:bg-zinc-900 transition-all ease-in duration-200 rounded-full w-[2.5rem] h-[2.5rem] flex items-center justify-center"></i>
      </div>
    </motion.div>
  );
};

export default ChatNav;
