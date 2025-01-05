import Link from "next/link"
import DropDown from "../DropDown"

const Header = () => {
  return (
    <nav className='w-full h-[8vh] flex justify-between items-center  p-[20px] md:p-[30px] bg-[#DF3132]'>
      <div className="w-full">
        <h1 className='text-2xl md:text-2xl lg:text-3xl  text-center font-bold font-sans text-white'>
          <Link href='/config'>Tragamonedas</Link>
        </h1>
      </div>
      <div className="absolute right-0">
        <DropDown/>
      </div>
    </nav>
  )
}

export default Header