import animationData from "@/assets/lottie/chat.json"
import Lottie from "lottie-react"

const ChatLotiie = () => {
    return  <Lottie className="h-[7rem]" animationData={animationData} controls={false} loop={true} />
}

export default ChatLotiie
