import DropDown from "../DropDown"

const Header = () => {
  return (
    <nav className='w-full h-[8vh] flex justify-between bg-[#D81515] pt-2'>
      <div className="w-[80%]">
        <h1 className='text-2xl md:text-3xl lg:text-4xl  text-center font-bold font-sans'>Tragamonedas</h1>
      </div>
      <div className="w-[20%] flex justify-center items-center">
        <DropDown/>

      </div>
    </nav>
  )
}

export default Header