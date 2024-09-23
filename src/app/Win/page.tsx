"use client" 
import { useReward } from "@/stores/rewards"

const WinPage = () => {
    const reward = useReward((state)=>state.reward)
  return (
    <div className="w-full h-[100vh] bg-win-bg bg-cover bg-center flex justify-center items-center">
        <div>
            <h1 className="text-6xl font-moul font-bold bg-custom-gradient bg-clip-text text-transparent">!FELICITACIONES!</h1>
            <p className="text-center mt-4 text-white font-inter font-thin">Te ganaste 1 <span>{reward}</span></p>
        </div>
    </div>
  )
}

export default WinPage