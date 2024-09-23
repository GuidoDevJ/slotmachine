import Image from 'next/image';
import LogoCasino from '../../../public/Logo.svg';
export const Logo =()=>{
    return (
        <div className="flex items-center justify-center mt-10">
            <Image src={LogoCasino} alt="logo" width={100} height={100}/>
        </div>
    )
}