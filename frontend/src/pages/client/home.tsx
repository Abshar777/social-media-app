import { motion  } from "framer-motion"
import Chats from "../../components/ux/chats"
import Nav from "../../components/ux/nav"
import SideBar from "../../components/ux/sideBar"
import { useAuth } from "../../hooks/useAuth"

const Home = () => {
  useAuth()
  return (
   <motion.div layout className="w-full p-[.3rem] h-[98.9vh] overflow-hidden">
    <motion.div initial={{scale:2.6,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:.7,ease:"easeInOut"}} className="w-full h-full overflow-hidden rounded-lg bg-neutral-900">
      <Nav/>
      <div className="flex  w-full h-full overflow-x-scroll">
        <SideBar/>
        <Chats/>
       
      </div>
    </motion.div>
   </motion.div>
  )
}

export default Home
