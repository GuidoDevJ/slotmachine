import Link from "next/link"

const Footer = () => {
  return (
    <footer className='w-full h-[10vh] flex justify-center items-center bg-[#DF3132]'>
      <div className="w-[200px] flex flex-col text-[#e6e6e6]">
        <p>Developed by <Link target="_blank" href={"https://www.linkedin.com/in/guidogauna/"}>Guido</Link></p>
        <p>Design by <Link target="_blank" href={"https://www.linkedin.com/in/celestequintanauxui/"}>Celeste</Link></p>
      </div>
    </footer>
  )
}

export default Footer