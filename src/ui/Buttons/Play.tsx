
interface PlayButton {
    fn?:()=>void;
    disabled?:boolean;  
}

const PlayButton = ({fn,disabled=false}:PlayButton) => {
  return (
    <button disabled={disabled}  onClick={fn} className='rounded-full w-24 h-24 text-center bg-gradient-to-b from-[#C8191B] to-[#602E44] text-xl  text-white tracking-widest font-bold  transition-transform transform active:scale-95 active:shadow-inner sm:w-24 sm:h-24 sm:text-xl md:w-28 md:h-28 lg:w-28 lg:h-28'>Jugar</button>
  )
}

export default PlayButton 