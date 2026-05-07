import Link from "next/link"

const Footer = () => {
  return (
    <footer className="w-full h-[10vh] flex justify-center items-center bg-[#DF3132]" role="contentinfo">
      <div className="w-[200px] flex flex-col text-[#e6e6e6] text-sm">
        <p>
          Developed by{' '}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/guidogauna/"
            className="underline hover:text-white transition-colors"
          >
            Guido
          </Link>
        </p>
        <p>
          Design by{' '}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/celestequintanauxui/"
            className="underline hover:text-white transition-colors"
          >
            Celeste
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
