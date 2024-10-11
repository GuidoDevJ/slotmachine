import DropDown from "../DropDown"

const Header = () => {
  return (
    <nav className='w-full h-[8vh] flex justify-between items-center  p-[20px] md:p-[30px] bg-[#D81515]'>
      <div className="w-full">
        <h1 className='text-2xl md:text-2xl lg:text-3xl  text-center font-bold font-sans'>Tragamonedas</h1>
      </div>
      <div className="absolute right-0">
        <DropDown/>
      </div>
    </nav>
  )
}

export default Header