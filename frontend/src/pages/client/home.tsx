import { motion  } from "framer-motion";
import ConaverstationLayout from "../../components/chat/conaverstationLayout";
import Nav from "../../components/ux/nav";
import SideBar from "../../components/ux/sideBar";

const Home = () => {
  return (
   <motion.div layout className="w-full p-[.3rem] h-screen overflow-hidden">
    <motion.div initial={{scale:2.6,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:.7,ease:"easeInOut"}} className="w-full h-full overflow-hidden rounded-lg bg-neutral-900">
      <Nav/>
      <div className="flex  w-full h-full overflow-x-scroll">
        <SideBar/>
        <ConaverstationLayout/>
      </div>
    </motion.div>
   </motion.div>
  )
}

export default Home
